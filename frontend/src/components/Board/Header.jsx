function Avatar({ member, size = 8 }) {
  const sizePx = size * 4;
  return (
    <button
      title={`${member.name} (${member.username || ""})`}
      style={{
        width: sizePx,
        height: sizePx,
        borderRadius: "50%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #e2e8f0",
        background: "#eef2ff",
        cursor: "pointer",
        padding: 0,
        flexShrink: 0,
      }}
      aria-label={`Member ${member.name}`}
    >
      {member.avatarUrl ? (
        <span
          style={{
            display: "block",
            width: sizePx,
            height: sizePx,
            backgroundImage: `url(${member.avatarUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
      ) : (
        <span style={{ fontSize: 12, fontWeight: 600, color: "#4f46e5" }}>
          {member.initials || member.name?.[0] || "?"}
        </span>
      )}
    </button>
  );
}

function IconBtn({ onClick, title, children }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        color: "#64748b",
        transition: "background 0.12s, color 0.12s",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#f1f5f9";
        e.currentTarget.style.color = "#1e293b";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "#64748b";
      }}
    >
      {children}
    </button>
  );
}

export default function BoardHeader({
  title = "Board title",
  search = "",
  powerUps = [],
  onOpenMenu = () => {},
  onDashBoard = () => {},
  onTitleChange = () => {},
  setSearch = () => {},
  className = "",
}) {
  return (
    <header
      className={className}
      style={{
        width: "100%",
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        padding: "0 16px",
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        boxSizing: "border-box",
      }}
    >
      {/* Left side */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
        {/* Dashboard / menu icon */}
        <IconBtn onClick={onDashBoard} title="Dashboard">
          <svg viewBox="0 0 16 16" width={16} height={16} fill="currentColor">
            <path d="M15 3.5H1V2h14zm-2 5.25H3v-1.5h10zM11 14H5v-1.5h6z" />
          </svg>
        </IconBtn>

        {/* Board title input */}
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange?.(e.target.value)}
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#1e293b",
            background: "transparent",
            border: "1.5px solid transparent",
            borderRadius: 7,
            padding: "4px 8px",
            outline: "none",
            minWidth: 0,
            maxWidth: 240,
            transition: "border-color 0.12s, background 0.12s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#818cf8";
            e.currentTarget.style.background = "#f8f9ff";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.background = "transparent";
          }}
        />
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        {/* Search input */}
        <div style={{ position: "relative" }}>
          <svg
            viewBox="0 0 16 16"
            width={13}
            height={13}
            fill="none"
            stroke="#94a3b8"
            strokeWidth={1.8}
            style={{
              position: "absolute",
              left: 9,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          >
            <circle cx={6.5} cy={6.5} r={4.5} />
            <path d="M10.5 10.5L14 14" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch?.(e.target.value)}
            placeholder="Search…"
            style={{
              height: 32,
              paddingLeft: 28,
              paddingRight: 10,
              fontSize: 13,
              color: "#1e293b",
              background: "#f8fafc",
              border: "1.5px solid #e2e8f0",
              borderRadius: 8,
              outline: "none",
              width: 180,
              transition: "border-color 0.12s, background 0.12s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#818cf8";
              e.currentTarget.style.background = "#fff";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.background = "#f8fafc";
            }}
          />
        </div>

        {/* Power-ups */}
        {powerUps.map((p) => (
          <button
            key={p.id}
            onClick={() => p.onClick?.()}
            style={{
              height: 32,
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "0 10px",
              borderRadius: 8,
              border: "1.5px solid #e2e8f0",
              background: "#f8fafc",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 500,
              color: "#475569",
              transition: "background 0.12s, border-color 0.12s, color 0.12s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#eef2ff";
              e.currentTarget.style.borderColor = "#c7d2fe";
              e.currentTarget.style.color = "#4f46e5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f8fafc";
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.color = "#475569";
            }}
          >
            {p.icon && <span style={{ fontSize: 14 }}>{p.icon}</span>}
            {p.label}
          </button>
        ))}

        {/* Three-dot menu */}
        <IconBtn onClick={onOpenMenu} title="More options">
          <svg viewBox="0 0 20 20" width={16} height={16} fill="currentColor">
            <circle cx={4} cy={10} r={1.5} />
            <circle cx={10} cy={10} r={1.5} />
            <circle cx={16} cy={10} r={1.5} />
          </svg>
        </IconBtn>
      </div>
    </header>
  );
}