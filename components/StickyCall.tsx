export default function StickyCall({ phone }: { phone: string }) {
  const tel = "tel:" + phone.replace(/\D/g,"");
  return (
    <a href={tel} aria-label="Call now"
      className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3 shadow-xl border border-outline bg-primary text-primaryfg hover:opacity-90">
      <span>Call Now</span>
    </a>
  );
}