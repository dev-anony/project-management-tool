import { useState } from "react";
import { LABEL_COLORS, COVER_COLORS, MEMBER_COLORS, DEMO_MEMBERS } from "./cardConstants";

// ── Avatar (modal size) ───────────────────────────────────────────────────────
export const Avatar = ({ name, size = 56 }) => {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const bg = MEMBER_COLORS[name.charCodeAt(0) % MEMBER_COLORS.length];
  return (
    <div title={name}
      style={{ width: size, height: size, background: bg, fontSize: size * 0.36 }}
      className="rounded-full text-white font-bold shrink-0 flex items-center justify-center border-2 border-white">
      {initials}
    </div>
  );
};

// ── SubPanel wrapper ──────────────────────────────────────────────────────────
export const SubPanel = ({ title, onBack, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-3">
      <button
        onClick={onBack}
        className="text-[#5e6c84] text-xl leading-none p-0 bg-transparent border-none cursor-pointer hover:text-[#172b4d] transition-colors"
        title="Back"
      >‹</button>
      <span className="font-bold text-[13px] text-[#172b4d]">{title}</span>
    </div>
    {children}
  </div>
);

// ── Label panel ───────────────────────────────────────────────────────────────
export const LabelPanel = ({ labels, onLabels, onBack }) => {
  const toggle = id =>
    onLabels(labels.includes(id) ? labels.filter(l => l !== id) : [...labels, id]);

  return (
    <SubPanel title="Labels" onBack={onBack}>
      <div className="flex flex-col gap-[6px]">
        {LABEL_COLORS.map(c => {
          const active = labels.includes(c.id);
          return (
            <div
              key={c.id}
              onClick={() => toggle(c.id)}
              className={`flex items-center gap-2 px-2 py-[5px] rounded-md cursor-pointer transition-colors ${
                active ? "bg-[#e4f0f6]" : "hover:bg-[#f4f5f7]"
              }`}
            >
              <div
                className="w-[22px] h-[22px] rounded-full shrink-0 border-[2px] transition-all"
                style={{
                  background: c.bg,
                  borderColor: active ? "#0079bf" : "transparent",
                  boxShadow: active ? "0 0 0 2px #fff inset" : "none",
                }}
              />
              <div
                className="flex-1 h-[18px] rounded-sm"
                style={{ background: c.bg, opacity: active ? 1 : 0.65 }}
              />
              <span className="text-[11px] text-[#172b4d] w-12 text-right">{c.label}</span>
              {active && <span className="text-[#0079bf] text-[13px] font-bold leading-none">✓</span>}
            </div>
          );
        })}
      </div>
    </SubPanel>
  );
};

// ── Cover panel ───────────────────────────────────────────────────────────────
export const CoverPanel = ({ cover, onCover, onBack }) => (
  <SubPanel title="Cover Color" onBack={onBack}>
    {cover && (
      <button
        onClick={() => { onCover(null); onBack(); }}
        className="w-full mb-3 px-2 py-[6px] text-[12px] bg-[#f4f5f7] border border-[#dfe1e6] rounded-md cursor-pointer hover:bg-[#e4e6ea] transition-colors"
      >
        Remove cover
      </button>
    )}
    <div className="grid grid-cols-5 gap-[6px]">
      {COVER_COLORS.map(c => (
        <div
          key={c}
          onClick={() => { onCover(c); onBack(); }}
          className="w-[28px] h-[28px] rounded-md cursor-pointer transition-transform hover:scale-110"
          style={{
            background: c,
            outline: cover === c ? "3px solid #0079bf" : "2px solid transparent",
            outlineOffset: 2,
          }}
        />
      ))}
    </div>
  </SubPanel>
);

// ── Due Date panel ────────────────────────────────────────────────────────────
export const DueDatePanel = ({ dueDate, onDueDate, onBack }) => {
  const [val, setVal] = useState(dueDate || "");
  const save = () => { onDueDate(val || null); onBack(); };

  return (
    <SubPanel title="Due Date" onBack={onBack}>
      <input
        type="date"
        value={val}
        onChange={e => setVal(e.target.value)}
        className="w-full px-2 py-[6px] border border-[#dfe1e6] rounded-md text-[13px] focus:outline-none focus:border-[#0079bf]"
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={save}
          className="flex-1 px-2 py-[6px] bg-[#0079bf] text-white border-none rounded-md cursor-pointer text-[12px] hover:bg-[#005fa3] transition-colors"
        >
          Save
        </button>
        {dueDate && (
          <button
            onClick={() => { onDueDate(null); onBack(); }}
            className="flex-1 px-2 py-[6px] bg-[#f4f5f7] border border-[#dfe1e6] rounded-md cursor-pointer text-[12px] hover:bg-[#e4e6ea] transition-colors"
          >
            Remove
          </button>
        )}
      </div>
    </SubPanel>
  );
};

// ── Members panel ─────────────────────────────────────────────────────────────
export const MembersPanel = ({ members, onMembers, onBack }) => {
  const [search, setSearch] = useState("");
  const filtered = DEMO_MEMBERS.filter(n => n.toLowerCase().includes(search.toLowerCase()));
  const toggle = name =>
    onMembers(members.includes(name) ? members.filter(m => m !== name) : [...members, name]);

  return (
    <SubPanel title="Members" onBack={onBack}>
      <input
        type="text"
        placeholder="Search members…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-2 py-[5px] border border-[#dfe1e6] rounded-md text-[12px] mb-2 focus:outline-none focus:border-[#0079bf]"
      />
      <div className="flex flex-col gap-[4px] max-h-[180px] overflow-y-auto">
        {filtered.map(name => {
          const active = members.includes(name);
          return (
            <div
              key={name}
              onClick={() => toggle(name)}
              className={`flex items-center gap-2 px-[6px] py-[5px] rounded-md cursor-pointer transition-colors ${
                active ? "bg-[#e4f0f6]" : "hover:bg-[#f4f5f7]"
              }`}
            >
              <Avatar name={name} size={26} />
              <span className="text-[12px] flex-1 text-[#172b4d]">{name}</span>
              {active && <span className="text-[#0079bf] text-[13px] font-bold">✓</span>}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-[11px] text-[#5e6c84] text-center py-2">No members found</p>
        )}
      </div>
    </SubPanel>
  );
};

// ── Checklist panel ───────────────────────────────────────────────────────────
export const ChecklistPanel = ({ checklist, onChecklist, onBack }) => {
  const [title, setTitle] = useState("Checklist");
  const add = () => {
    onChecklist([...checklist, { id: Date.now(), text: "Item 1", done: false }]);
    onBack();
  };

  return (
    <SubPanel title="Add Checklist" onBack={onBack}>
      <div className="text-[11px] text-[#5e6c84] mb-2">Title</div>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full px-2 py-[6px] border border-[#dfe1e6] rounded-md text-[13px] mb-2 focus:outline-none focus:border-[#0079bf]"
      />
      <button
        onClick={add}
        className="w-full px-[10px] py-[7px] bg-[#0079bf] text-white border-none rounded-md cursor-pointer text-[13px] hover:bg-[#005fa3] transition-colors"
      >
        Add
      </button>
    </SubPanel>
  );
};