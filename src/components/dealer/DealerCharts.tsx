"use client";

import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";

const leadsData = [
  { week: "W1", leads: 8, matches: 2, reacties: 5 },
  { week: "W2", leads: 14, matches: 4, reacties: 9 },
  { week: "W3", leads: 11, matches: 3, reacties: 7 },
  { week: "W4", leads: 18, matches: 6, reacties: 12 },
  { week: "W5", leads: 15, matches: 5, reacties: 10 },
  { week: "W6", leads: 22, matches: 8, reacties: 15 },
  { week: "W7", leads: 19, matches: 6, reacties: 13 },
  { week: "W8", leads: 27, matches: 10, reacties: 18 },
];

const conversionData = [
  { maand: "Jan", ratio: 12 },
  { maand: "Feb", ratio: 15 },
  { maand: "Mar", ratio: 13 },
  { maand: "Apr", ratio: 18 },
  { maand: "Mei", ratio: 16 },
  { maand: "Jun", ratio: 21 },
];

export default function DealerCharts() {
  return (
    <>
      {/* Leads over time */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-slate-900">Leads & matches</h3>
            <p className="text-sm text-slate-500">Afgelopen 8 weken</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={leadsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
            />
            <Legend />
            <Line type="monotone" dataKey="leads" stroke="#0f172a" strokeWidth={2} dot={false} name="Leads" />
            <Line type="monotone" dataKey="matches" stroke="#2563eb" strokeWidth={2} dot={false} name="Matches" />
            <Line type="monotone" dataKey="reacties" stroke="#16a34a" strokeWidth={2} dot={false} name="Reacties" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion rate */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-slate-900">Conversieratio</h3>
            <p className="text-sm text-slate-500">Percentage leads → verkoop</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={conversionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="maand" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip
              contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
              formatter={(v) => [`${v}%`, "Conversie"]}
            />
            <Bar dataKey="ratio" fill="#0f172a" radius={[6, 6, 0, 0]} name="Conversie" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
