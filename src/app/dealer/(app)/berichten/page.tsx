"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Send, Clock, ArrowLeft } from "lucide-react";

type Message = { from: "dealer" | "buyer"; text: string; time: string };
type Conversation = {
  id: string;
  buyer: string;
  car: string;
  lastMsg: string;
  lastTime: string;
  unread: number;
  leadScore: number;
  buyIntent: string;
  messages: Message[];
};

const INIT_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    buyer: "J. de Vries",
    car: "Audi Q5 · Budget € 35k–55k",
    lastMsg: "Heeft de auto ook een trekhaak?",
    lastTime: "14:45",
    unread: 2,
    leadScore: 96,
    buyIntent: "Binnen 30 dagen",
    messages: [
      { from: "dealer", text: "Goedemiddag! Wij hebben een Audi Q5 50 TFSI e uit 2022 die perfect aansluit op uw zoekopdracht. Alle must-have opties zijn aanwezig.", time: "13:00" },
      { from: "buyer", text: "Goed om te horen! Is Apple CarPlay en het panoramadak aanwezig?", time: "13:20" },
      { from: "dealer", text: "Ja, beide zijn standaard aanwezig op dit model. Tevens heeft de auto LED-matrix verlichting en stoelverwarming voor en achter.", time: "13:35" },
      { from: "buyer", text: "Mooi. Wat is de vraagprijs?", time: "14:10" },
      { from: "dealer", text: "Wij vragen € 47.950 voor deze auto. Dit is inclusief volledige garantie en één jaar gratis onderhoud.", time: "14:20" },
      { from: "buyer", text: "Heeft de auto ook een trekhaak?", time: "14:45" },
    ],
  },
  {
    id: "c2",
    buyer: "M. Janssen",
    car: "BMW X3 · Budget € 40k–65k",
    lastMsg: "Wanneer kan ik langskomen voor een proefrit?",
    lastTime: "Gisteren",
    unread: 0,
    leadScore: 88,
    buyIntent: "Binnen 1 week",
    messages: [
      { from: "dealer", text: "Goedemorgen! Wij hebben een mooie BMW X3 M40i voor u. Bouwjaar 2022, 29.000 km.", time: "09:15" },
      { from: "buyer", text: "Interessant! Is de auto dealer-onderhouden?", time: "10:30" },
      { from: "dealer", text: "Ja, volledig dealer-onderhouden bij BMW. Alle servicebewijzen aanwezig.", time: "10:45" },
      { from: "buyer", text: "Wanneer kan ik langskomen voor een proefrit?", time: "11:00" },
    ],
  },
  {
    id: "c3",
    buyer: "R. Bakker",
    car: "VW Golf R · Budget € 35k–48k",
    lastMsg: "Bedankt voor de informatie!",
    lastTime: "Ma",
    unread: 0,
    leadScore: 74,
    buyIntent: "Binnen 3 maanden",
    messages: [
      { from: "dealer", text: "Hallo! Wij hebben een Golf R uit 2021 voor u. Akropolisgris, 45.000 km.", time: "10:00" },
      { from: "buyer", text: "Is er nog ruimte voor onderhandeling op de prijs?", time: "11:15" },
      { from: "dealer", text: "Wij kunnen € 500 tegemoetkomen. De auto is verder volledig uitgerust.", time: "11:30" },
      { from: "buyer", text: "Bedankt voor de informatie!", time: "12:00" },
    ],
  },
];

function nowTime() {
  return new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
}

function scoreColor(score: number) {
  if (score >= 85) return "text-orange-600 bg-orange-50 border-orange-200";
  if (score >= 65) return "text-green-700 bg-green-50 border-green-200";
  return "text-yellow-700 bg-yellow-50 border-yellow-200";
}

export default function DealerBerichtenPage() {
  const [conversations, setConversations] = useState<Conversation[]>(INIT_CONVERSATIONS);
  const [activeId, setActiveId] = useState("c1");
  const [input, setInput] = useState("");
  const [showList, setShowList] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const conv = conversations.find(c => c.id === activeId)!;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conv.messages.length]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const time = nowTime();
    setConversations(prev => prev.map(c => {
      if (c.id !== activeId) return c;
      return {
        ...c,
        messages: [...c.messages, { from: "dealer", text, time }],
        lastMsg: text,
        lastTime: time,
      };
    }));
    setInput("");
  }

  function selectConv(id: string) {
    setActiveId(id);
    setShowList(false);
    setConversations(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
  }

  const totalUnread = conversations.reduce((n, c) => n + c.unread, 0);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Conversation list */}
      <div className={`${showList ? "flex" : "hidden md:flex"} w-full md:w-80 bg-white border-r border-slate-100 flex-col flex-shrink-0`}>
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-slate-900">Berichten</h1>
              <p className="text-xs text-slate-500 mt-0.5">Chat met geïnteresseerde kopers</p>
            </div>
            {totalUnread > 0 && (
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                {totalUnread}
              </span>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
          {conversations.map(c => (
            <button
              key={c.id}
              onClick={() => selectConv(c.id)}
              className={`w-full text-left px-4 py-4 hover:bg-slate-50 transition-colors ${activeId === c.id ? "bg-slate-50 border-l-2 border-slate-900" : ""}`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 flex-shrink-0">
                    {c.buyer.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 text-sm truncate">{c.buyer}</div>
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
              <div className="flex items-center gap-2 pl-10">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${scoreColor(c.leadScore)}`}>
                  {c.leadScore}%
                </span>
                <span className="text-xs text-slate-400 truncate">{c.buyIntent}</span>
              </div>
              <div className="text-xs text-slate-500 mt-1 pl-10 truncate">{c.lastMsg}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className={`${showList ? "hidden md:flex" : "flex"} flex-1 flex-col bg-slate-50 min-w-0`}>
        {/* Header */}
        <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3">
          <button
            className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
            onClick={() => setShowList(true)}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600 flex-shrink-0">
            {conv.buyer.split(" ").map(w => w[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-slate-900">{conv.buyer}</div>
            <div className="text-xs text-slate-500 truncate">{conv.car}</div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${scoreColor(conv.leadScore)}`}>
              {conv.leadScore}% lead
            </span>
            <span className="text-xs text-slate-500 hidden sm:block">{conv.buyIntent}</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {conv.messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "dealer" ? "justify-end" : "justify-start"}`}>
              {msg.from === "buyer" && (
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 flex-shrink-0 mr-2 mt-1">
                  {conv.buyer.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
              )}
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.from === "dealer"
                  ? "bg-slate-900 text-white rounded-br-md"
                  : "bg-white border border-slate-100 text-slate-700 rounded-bl-md shadow-sm"
              }`}>
                {msg.text}
                <div className={`text-xs mt-1 flex items-center gap-1 ${msg.from === "dealer" ? "text-slate-400 justify-end" : "text-slate-400"}`}>
                  <Clock className="w-2.5 h-2.5" />{msg.time}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t border-slate-100 px-4 py-3">
          <div className="flex items-end gap-2">
            <textarea
              className="flex-1 resize-none text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-200 min-h-[44px] max-h-32"
              placeholder="Typ een bericht aan de koper..."
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={1}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
            <Button
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-4 h-11 flex-shrink-0"
              disabled={!input.trim()}
              onClick={send}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Druk op Enter om te versturen · Shift+Enter voor nieuwe regel
          </p>
        </div>
      </div>
    </div>
  );
}
