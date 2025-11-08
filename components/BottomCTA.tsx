import Link from "next/link"; import site from "@/content/site.json";
export default function BottomCTA(){ return (
  <section className="mt-16 border-t border-outline bg-panel">
    <div className="container mx-auto py-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <h2 className="text-heading text-2xl font-semibold">Ready to start?</h2>
      <div className="flex gap-3">
        <a href={"tel:"+site.phoneDigits} className="rounded-full bg-primary text-primaryfg px-5 py-3">Call Now</a>
        <Link href="/contact" className="rounded-full border border-outline text-ink px-5 py-3">Get A Quote</Link>
      </div>
    </div>
  </section>
); }