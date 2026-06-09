"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Send, Clock } from "lucide-react";

const CONVERSATIONS = [
  {
    id: "c1",
    dealer: "AutoHuis Rotterdam",
    verified: true,
    lastMsg: "Bedankt voor uw interesse! Wanneer schikt een proefrit?",
    lastTime: "14:32",
    unread: 1,
    car: "Audi Q5 50 TFSI e · € 47.950",
    messages: [
      { from: "dealer", text: "Goedemiddag! Wij zagen uw aanvraag voor een Audi Q5. Wij hebben precies wat u zoekt.", time: "13:15" },
      { from: "user", text: "Interessant! Heeft de auto een panoramadak en Apple CarPlay?", time: "13:45" },
      { from: "dealer", text: "Ja, beide zijn aanwezig! Daarnaast heeft de auto ook LED-matrix verlichting en stoelverwarming voor en achter.", time: "14:10" },
      { from: "dealer", text: "Bedankt voor uw interesse! Wanneer schikt een proefrit?", time: "14:32" },
    ],
  },
  {
    id: "c2",
    dealer: "Premium Cars NL",
    verified: true,
    lastMsg: "De auto is nog beschikbaar, we houden hem graag voor u apart.",
    lastTime: "Gisteren",
    unread: 0,
    car: "Audi Q5 45 TFSI e · € 52.000",
    messages: [
      { from: "dealer", text: "Goedemorgen! Wij hebben een bijzondere Q5 voor u met zeer lage kilometerstand.", time: "09:00" },
      { from: "user", text: "Is de prijs nog bespreekbaar?", time: "11:30" },
      { from: "dealer", text: "De auto is nog beschikbaar, we houden hem graag voor u apart.", time: "11:45" },
    ],
  },
];

export default function BerichtenPage() {
  const [active, setActive] = useState("c1");
  const [input, setInput] = useState("");

  const conv = CONVERSATIONS.find(c => c.id === active)!;

  return (
    <div className="flex h-[calc(100vh-0px)] overflow-hidden">
      {/* Conversation list */}
      <div className="w-72 bg-white border-r border-slate-100 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-100">
          <h1 className="font-bold text-slate-900">Berichten</h1>
          <p className="text-xs text-slate-500 mt-0.5">Chat anoniem totdat jij contact initieert</p>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
          {CONVERSATIONS.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`w-full text-left px-4 py-4 hover:bg-slate-50 transition-colors ${active === c.id ? "bg-slate-50" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 flex-shrink-0">
                    {c.dealer.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-slate-900 text-sm truncate">{c.dealer}</span>
                      {c.verified && <BadgeCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />}
                    </div>
                    <div className="text-xs text-slate-400 truncate">{c.car}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-xs text-slate-400">{c.lastTime}</span>
                  {c.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-xs text-slate-500 mt-1.5 truncate pl-10">{c.lastMsg}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col bg-slate-50">
        {/* Chat header */}
        <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
            {conv.dealer.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">{conv.dealer}</span>
              {conv.verified && <BadgeCheck className="w-4 h-4 text-blue-500" />}
            </div>
            <div className="text-xs text-slate-500">{conv.car}</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {conv.messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.from === "user"
                  ? "bg-slate-900 text-white rounded-br-md"
                  : "bg-white border border-slate-100 text-slate-700 rounded-bl-md shadow-sm"
              }`}>
                {msg.text}
                <div className={`text-xs mt-1.5 flex items-center gap-1 ${msg.from === "user" ? "text-slate-400 justify-end" : "text-slate-400"}`}>
                  <Clock className="w-2.5 h-2.5" />{msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-slate-100 px-4 py-3">
          <div className="flex items-end gap-2">
            <textarea
              className="flex-1 resize-none text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-200 min-h-[40px] max-h-32"
              placeholder="Typ een bericht..."
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={1}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); setInput(""); } }}
            />
            <Button
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-4 py-2.5 flex-shrink-0"
              disabled={!input.trim()}
              onClick={() => setInput("")}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Jouw telefoonnummer is verborgen. Deel het alleen als jij er klaar voor bent.
          </p>
        </div>
      </div>
    </div>
  );
}
