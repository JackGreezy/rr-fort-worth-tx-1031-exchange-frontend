'use client';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
};

export default function SearchInput({ value, onChange, placeholder, label }: SearchInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-[0.32em] text-heading/70">{label}</label>
      <div className="flex items-center gap-2 rounded-full border border-outline/70 bg-panel px-4 py-2 shadow-[0_4px_12px_rgba(21,34,59,0.08)]">
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              onChange("");
            }
          }}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink/50 focus:outline-none"
          aria-label={label}
        />
        {value && (
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-primary hover:text-accent"
            onClick={() => onChange("")}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

