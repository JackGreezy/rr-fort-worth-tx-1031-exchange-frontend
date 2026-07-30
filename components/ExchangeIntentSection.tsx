const styles = `.rr-exchange-intent{font:inherit;color:inherit;padding:clamp(4rem,8vw,7rem) clamp(1.25rem,4vw,3rem);background:color-mix(in srgb,currentColor 3%,Canvas);border-block:1px solid color-mix(in srgb,currentColor 14%,transparent)}
.rr-exchange-intent *{box-sizing:border-box}
.rr-exchange-intent__inner{width:min(1180px,100%);margin:0 auto}
.rr-exchange-intent__eyebrow{margin:0 0 .85rem;font-size:.76rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.7}
.rr-exchange-intent h2{max-width:940px;margin:0;font:inherit;font-size:clamp(2rem,4.5vw,4rem);font-weight:600;line-height:1.07;letter-spacing:-.025em}
.rr-exchange-intent h3{margin:0;font:inherit;font-size:clamp(1.25rem,2.2vw,1.7rem);font-weight:600;line-height:1.2}
.rr-exchange-intent__lede{max-width:880px;margin:1.25rem 0 0;font-size:clamp(1rem,1.5vw,1.2rem);line-height:1.75;opacity:.78}
.rr-exchange-intent__block{margin-top:clamp(3.5rem,7vw,6rem)}
.rr-exchange-intent__block-head{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(280px,.9fr);gap:clamp(1.5rem,5vw,5rem);align-items:end}
.rr-exchange-intent__block-head p{margin:0;line-height:1.75;opacity:.72}
.rr-exchange-intent__reason-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 clamp(1.5rem,5vw,4rem);margin-top:2rem;border-bottom:1px solid color-mix(in srgb,currentColor 16%,transparent)}
.rr-exchange-intent__reason{display:block;padding:1.3rem 0;border-top:1px solid color-mix(in srgb,currentColor 16%,transparent);color:inherit;text-decoration:none}
.rr-exchange-intent__reason strong{display:block;font-size:1.06rem;line-height:1.35}
.rr-exchange-intent__reason span{display:block;margin-top:.45rem;font-size:.92rem;line-height:1.6;opacity:.66}
.rr-exchange-intent__coordination{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1.4rem;margin-top:2rem}
.rr-exchange-intent__coordination div{padding-top:1.1rem;border-top:1px solid currentColor}
.rr-exchange-intent__coordination strong{display:block;margin-bottom:.55rem}
.rr-exchange-intent__coordination p{margin:0;font-size:.92rem;line-height:1.65;opacity:.68}
.rr-exchange-intent__table-wrap{margin-top:2rem;overflow-x:auto;border-block:1px solid color-mix(in srgb,currentColor 18%,transparent)}
.rr-exchange-intent table{width:100%;min-width:760px;border-collapse:collapse;text-align:left}
.rr-exchange-intent th,.rr-exchange-intent td{padding:1rem;vertical-align:top;border-bottom:1px solid color-mix(in srgb,currentColor 13%,transparent);line-height:1.55}
.rr-exchange-intent th{font-size:.76rem;letter-spacing:.08em;text-transform:uppercase}
.rr-exchange-intent td:first-child{font-weight:700}
.rr-exchange-intent__resources{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 1.5rem;margin-top:2rem}
.rr-exchange-intent__resource{display:block;padding:1.15rem 0;border-top:1px solid color-mix(in srgb,currentColor 16%,transparent);color:inherit;text-decoration:none}
.rr-exchange-intent__resource strong{display:block;line-height:1.35}
.rr-exchange-intent__resource span{display:block;margin-top:.4rem;font-size:.9rem;line-height:1.55;opacity:.64}
.rr-exchange-intent__guide{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2rem;align-items:center;margin-top:clamp(3.5rem,7vw,6rem);padding:clamp(1.6rem,4vw,3rem);border:1px solid currentColor}
.rr-exchange-intent__guide p{max-width:760px;margin:.8rem 0 0;line-height:1.7;opacity:.72}
.rr-exchange-intent__actions{display:flex;flex-wrap:wrap;gap:.8rem;align-items:center}
.rr-exchange-intent__cta{display:inline-flex;max-width:100%;align-items:center;justify-content:center;padding:.95rem 1.25rem;border:1px solid currentColor;color:inherit;text-decoration:none;font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.rr-exchange-intent__cta--primary{background:currentColor}
.rr-exchange-intent__cta--primary span{color:Canvas}
.rr-exchange-intent__disclosure{max-width:960px;margin:1.4rem 0 0;font-size:.75rem;line-height:1.55;opacity:.56}
@media(max-width:900px){.rr-exchange-intent__block-head{grid-template-columns:1fr}.rr-exchange-intent__coordination{grid-template-columns:repeat(2,minmax(0,1fr))}.rr-exchange-intent__resources{grid-template-columns:repeat(2,minmax(0,1fr))}.rr-exchange-intent__guide{grid-template-columns:1fr}.rr-exchange-intent__actions{align-items:stretch}}
@media(max-width:620px){.rr-exchange-intent__reason-grid,.rr-exchange-intent__coordination,.rr-exchange-intent__resources{grid-template-columns:1fr}.rr-exchange-intent__actions{flex-direction:column}.rr-exchange-intent__cta{width:100%}}`;
const markup = `<section class="rr-exchange-intent" id="rr-exchange-path">
<div class="rr-exchange-intent__inner">
<p class="rr-exchange-intent__eyebrow">Property Sale &amp; 1031 Exchange Planning</p>
<h2>A Fort Worth property sale deserves an exchange plan before the clock starts.</h2>
<p class="rr-exchange-intent__lede">Owners considering property across Fort Worth can begin with the proposed sale, expected equity, debt, management goals, and replacement criteria. We coordinate the starting point while the appropriate professionals handle regulated work.</p>
<div class="rr-exchange-intent__block" id="rr-selling-reasons">
<div class="rr-exchange-intent__block-head">
<h3>Identify the burden, risk, or opportunity driving the Fort Worth sale.</h3>
<p>A Fort Worth property can be profitable and still be the wrong fit for its owner. We help translate the reason for selling into criteria for control, workload, liquidity, financing, geography, and risk.</p>
</div>
<div class="rr-exchange-intent__reason-grid"><a class="rr-exchange-intent__reason" href="/tax-deferral-strategies"><strong>Leaving Active Property Management</strong><span>Use the Fort Worth exchange to compare another managed property, a different direct asset, a net-lease acquisition, a DST, and a taxable sale when tenants or capital work are driving the decision.</span></a><a class="rr-exchange-intent__reason" href="/tax-deferral-strategies"><strong>Selling Inherited Investment Property</strong><span>Before the Fort Worth exchange advances, organize ownership, basis, use, co-owner objectives, and estate questions so a listing or contract does not limit the available choices.</span></a><a class="rr-exchange-intent__reason" href="/tax-deferral-strategies"><strong>Finding Replacement Property</strong><span>Build the Fort Worth exchange search around exchange equity, debt, income, control, management capacity, diligence, and realistic closing probability.</span></a><a class="rr-exchange-intent__reason" href="/tax-deferral-strategies"><strong>Reducing Day-to-Day Landlord Work</strong><span>For the Fort Worth exchange, review passive and professionally managed paths without overlooking sponsor risk, fees, liquidity limits, property exposure, or reduced control.</span></a><a class="rr-exchange-intent__reason" href="/tax-deferral-strategies"><strong>Starting Before Closing</strong><span>Engage the independent qualified intermediary and align the Fort Worth exchange team before the relinquished-property proceeds can reach the seller.</span></a><a class="rr-exchange-intent__reason" href="/tax-deferral-strategies"><strong>Buying Before the Current Property Sells</strong><span>Explore reverse-exchange and financing questions when the preferred replacement opportunity for the Fort Worth exchange appears before the planned disposition is complete.</span></a></div>
</div>
<div class="rr-exchange-intent__block">
<div class="rr-exchange-intent__block-head">
<h3>Coordinate the Fort Worth sale plan through replacement closing.</h3>
<p>We help organize the Fort Worth transaction, introduce the independent professionals the facts require, and keep open questions visible. The qualified intermediary, CPA, attorney, brokers, lenders, inspectors, and licensed securities professionals remain responsible for their regulated work.</p>
</div>
<div class="rr-exchange-intent__coordination">
<div><strong>Before the Sale</strong><p>For the Fort Worth exchange, clarify ownership, use, basis questions, debt, expected equity, management goals, and the professionals already involved.</p></div>
<div><strong>While Under Contract</strong><p>Confirm the qualified intermediary, closing instructions, calendar, lender needs, and a written brief for the Fort Worth exchange.</p></div>
<div><strong>During Identification</strong><p>Compare primary and backup candidates against the Fort Worth exchange for diligence, financing, control, workload, risk, and ability to close.</p></div>
<div><strong>Through Replacement Closing</strong><p>Keep the Fort Worth exchange team aligned on title, inspections, environmental review, insurance, entity documents, funding directions, and advisor questions.</p></div>
</div>
</div>
<div class="rr-exchange-intent__block" id="rr-replacement-comparison">
<div class="rr-exchange-intent__block-head">
<h3>Compare ownership paths against the same Fort Worth sale objective.</h3>
<p>The Fort Worth comparison is not active property versus a simplified passive option. Each path should be reviewed for decision rights, diligence, leverage, fees, transfer limits, property risk, and a realistic closing schedule.</p>
</div>
<div class="rr-exchange-intent__table-wrap">
<table>
<thead><tr><th>Decision</th><th>Direct Property</th><th>Net-Lease Property</th><th>DST Interest</th></tr></thead>
<tbody>
<tr><td>Control</td><td>The owner directs leasing, financing, improvements, and disposition.</td><td>The owner controls the real estate subject to the tenant and lease.</td><td>The sponsor controls the trust and the property.</td></tr>
<tr><td>Management</td><td>The owner or a hired manager operates the asset.</td><td>The lease assigns specified obligations to the tenant.</td><td>Professional management removes day-to-day landlord decisions.</td></tr>
<tr><td>Liquidity</td><td>Liquidity generally requires a property sale or refinance.</td><td>Liquidity depends on a future sale, refinance, tenant, and lease market.</td><td>Private-placement interests are generally illiquid and transfer-restricted.</td></tr>
<tr><td>Primary Review</td><td>Title, leases, condition, operations, market, financing, and closing feasibility.</td><td>Tenant, guaranty, lease terms, property condition, residual value, and reletting market.</td><td>Offering documents, sponsor, fees, conflicts, leverage, property risks, and suitability.</td></tr>
</tbody>
</table>
</div>
</div>
<div class="rr-exchange-intent__block">
<div class="rr-exchange-intent__block-head">
<h3>Continue with the Fort Worth transaction issue that needs attention.</h3>
<p>Technical identification rules remain available, while these Fort Worth resources lead with the sale, replacement search, professional coordination, and ownership decisions that usually come first.</p>
</div>
<div class="rr-exchange-intent__resources"><a class="rr-exchange-intent__resource" href="/tax-deferral-strategies"><strong>Tax Deferral Strategies</strong><span>Direct property, net-lease, DST, equity, debt, and backup-path planning for the Fort Worth exchange.</span></a><a class="rr-exchange-intent__resource" href="/contact"><strong>Contact</strong><span>Management burden, taxable-sale consequences, and alternatives related to the Fort Worth exchange.</span></a><a class="rr-exchange-intent__resource" href="/contact"><strong>Contact</strong><span>Basis, ownership, qualifying use, co-owner, and timing questions before the Fort Worth exchange.</span></a><a class="rr-exchange-intent__resource" href="/contact"><strong>Contact</strong><span>Control, workload, sponsor, fee, liquidity, and diversification tradeoffs within the Fort Worth exchange.</span></a><a class="rr-exchange-intent__resource" href="/contact"><strong>Contact</strong><span>Independent intermediary timing, proceeds, documents, and handoffs for the Fort Worth exchange.</span></a><a class="rr-exchange-intent__resource" href="/contact"><strong>Contact</strong><span>Offering, eligibility, risk, fee, liquidity, and suitability review when a DST enters the Fort Worth exchange.</span></a></div>
</div>
<div class="rr-exchange-intent__guide" id="rr-owner-guide">
<div><h3>Get the Fort Worth 1031 Owner’s Guide.</h3><p>Use the Fort Worth planning guide to collect ownership, basis, debt, equity, timing, management, and replacement details before a closing or identification deadline limits the choices.</p></div>
<div class="rr-exchange-intent__actions">
<a class="rr-exchange-intent__cta rr-exchange-intent__cta--primary" href="/contact?request=guide"><span>Request the Owner's Guide</span></a>
<a class="rr-exchange-intent__cta" href="/contact">Talk Through a Planned Sale</a>
<a class="rr-exchange-intent__cta" href="tel:8179853561">Call 817-985-3561</a>
</div>
</div>
<p class="rr-exchange-intent__disclosure">Educational coordination only. Tax and legal conclusions belong to the property owner’s CPA and counsel. Qualified-intermediary, brokerage, lending, and securities work must be handled by the appropriate independent professionals. DST interests are securities and require eligibility, availability, offering-document, fee, risk, and suitability review through appropriately licensed professionals.</p>
</div>
</section>`;

export default function ExchangeIntentSection() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div dangerouslySetInnerHTML={{ __html: markup }} />
    </>
  );
}
