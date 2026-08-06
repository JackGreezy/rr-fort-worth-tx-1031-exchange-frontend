(() => {
  const CONTACT_PATH = "/api/contact";
  const originalFetch = window.fetch.bind(window);
  let widgetPromise;
  let widgetId;
  let pendingChallenge;

  const isContactRequest = (input, init) => {
    const method = String((init && init.method) || (input instanceof Request && input.method) || "GET").toUpperCase();
    if (method !== "POST") return false;
    try {
      const raw = typeof input === "string" || input instanceof URL ? input : input.url;
      return new URL(raw, window.location.href).pathname === CONTACT_PATH;
    } catch {
      return false;
    }
  };

  const loadTurnstile = () => new Promise((resolve, reject) => {
    if (window.turnstile) return resolve();
    const existing = document.querySelector('script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]');
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Security verification could not load."));
    document.head.appendChild(script);
  });

  const ensureWidget = () => {
    if (widgetPromise) return widgetPromise;
    widgetPromise = (async () => {
      const configResponse = await originalFetch("/api/turnstile/sitekey", { cache: "no-store" });
      const config = await configResponse.json();
      if (!config.siteKey) throw new Error("Security verification is not configured.");
      await loadTurnstile();
      const container = document.createElement("div");
      container.id = "contact-turnstile-invisible";
      container.hidden = true;
      document.body.appendChild(container);
      widgetId = window.turnstile.render(container, {
        sitekey: config.siteKey,
        size: "invisible",
        execution: "execute",
        appearance: "interaction-only",
        action: "contact",
        callback: (token) => {
          if (pendingChallenge) pendingChallenge.resolve(token);
          pendingChallenge = undefined;
        },
        "error-callback": () => {
          if (pendingChallenge) pendingChallenge.reject(new Error("Security verification failed."));
          pendingChallenge = undefined;
        },
        "timeout-callback": () => {
          if (pendingChallenge) pendingChallenge.reject(new Error("Security verification timed out."));
          pendingChallenge = undefined;
        },
      });
      return widgetId;
    })();
    return widgetPromise;
  };

  const challenge = async () => {
    await ensureWidget();
    if (pendingChallenge) return pendingChallenge.promise;
    let resolve;
    let reject;
    const promise = new Promise((ok, fail) => { resolve = ok; reject = fail; });
    pendingChallenge = { promise, resolve, reject };
    window.turnstile.reset(widgetId);
    window.turnstile.execute(widgetId);
    return promise;
  };

  const hasToken = (body) => {
    if (body instanceof FormData || body instanceof URLSearchParams) {
      return Boolean(body.get("cf-turnstile-response") || body.get("turnstileToken") || body.get("turnstile_token"));
    }
    if (typeof body === "string") {
      try {
        const value = JSON.parse(body);
        return Boolean(value["cf-turnstile-response"] || value.turnstileToken || value.turnstile_token);
      } catch {
        return false;
      }
    }
    return false;
  };

  window.fetch = async (input, init) => {
    if (!isContactRequest(input, init) || hasToken(init && init.body)) {
      return originalFetch(input, init);
    }

    const token = await challenge();
    const next = { ...(init || {}) };
    if (next.body instanceof FormData || next.body instanceof URLSearchParams) {
      next.body.set("cf-turnstile-response", token);
    } else if (typeof next.body === "string") {
      try {
        const body = JSON.parse(next.body);
        body.turnstileToken = token;
        next.body = JSON.stringify(body);
      } catch {
        const params = new URLSearchParams(next.body);
        params.set("cf-turnstile-response", token);
        next.body = params;
      }
    }
    return originalFetch(input, next);
  };

  document.addEventListener("submit", async (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || event.defaultPrevented || form.dataset.turnstileSubmitting === "true") return;
    const method = String(form.method || "GET").toUpperCase();
    let path = "";
    try { path = new URL(form.action || window.location.href, window.location.href).pathname; } catch { return; }
    if (method !== "POST" || path !== CONTACT_PATH) return;

    event.preventDefault();
    try {
      const token = await challenge();
      let field = form.querySelector('input[name="cf-turnstile-response"]');
      if (!field) {
        field = document.createElement("input");
        field.type = "hidden";
        field.name = "cf-turnstile-response";
        form.appendChild(field);
      }
      field.value = token;
      form.dataset.turnstileSubmitting = "true";
      form.submit();
    } catch (error) {
      form.dispatchEvent(new CustomEvent("turnstile-error", { detail: error }));
      window.alert("Security verification failed. Please refresh the page and try again.");
    }
  });
})();
