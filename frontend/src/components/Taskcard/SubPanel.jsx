import {MEMBER_COLORS} from "./CardConstants";

export const Avatar = ({ name, size = 56 }) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const bg = MEMBER_COLORS[name.charCodeAt(0) % MEMBER_COLORS.length];
  return (
    <div
      title={name}
      style={{ width: size, height: size, background: bg, fontSize: size * 0.36 }}
      className="rounded-full text-white font-bold shrink-0 flex items-center justify-center border-2 border-white"
    >
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
      >
        ‹
      </button>
      <span className="font-bold text-[13px] text-[#172b4d]">{title}</span>
    </div>
    {children}
  </div>
);