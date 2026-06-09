export default function FacturenPage() {
  const invoices = [
    { nr: "INV-2025-0042", date: "05 jun 2025", desc: "25 credits pack", amount: "59,00" },
    { nr: "INV-2025-0031", date: "12 mei 2025", desc: "10 credits pack", amount: "29,00" },
    { nr: "INV-2025-0018", date: "20 apr 2025", desc: "50 credits pack", amount: "99,00" },
  ];
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Facturen</h1>
      <p className="text-slate-500 mb-8">Overzicht van alle facturen en betalingen.</p>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-4 text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3 border-b bg-slate-50">
          <div>Factuurnummer</div>
          <div>Datum</div>
          <div>Omschrijving</div>
          <div className="text-right">Bedrag</div>
        </div>
        {invoices.map((inv, i) => (
          <div key={i} className="grid grid-cols-4 items-center px-5 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
            <div className="text-sm font-mono text-blue-600">{inv.nr}</div>
            <div className="text-sm text-slate-500">{inv.date}</div>
            <div className="text-sm text-slate-900 font-medium">{inv.desc}</div>
            <div className="text-sm font-bold text-slate-900 text-right">€ {inv.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
