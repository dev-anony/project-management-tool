function Avatar({ member, size = 8 }) {
  const sizePx = size * 4; // Tailwind 'rem-ish' -> px approximation for inline style
  return (
    <button
      title={`${member.name} (${member.username || ''})`}
      className="rounded-full overflow-hidden flex items-center justify-center border-0 focus:outline-none focus:ring-2 focus:ring-offset-1"
      style={{ width: sizePx, height: sizePx }}
      aria-label={`Member ${member.name}`}
    >
      {member.avatarUrl ? (
        <span
          className="block bg-cover bg-center"
          style={{ width: sizePx, height: sizePx, backgroundImage: `url(${member.avatarUrl})` }}
          aria-hidden
        />
      ) : (
        <span className="text-xs font-medium">{member.initials || member.name?.[0] || '?'}</span>
      )}
      {member.isAdmin && <span className="sr-only">Admin</span>}
    </button>
  );
}

function Icon({ children, className = 'w-5 h-5' }) {
  return <span className={`${className} inline-block`} aria-hidden>{children}</span>;
}

export default function BoardHeader({
    title = 'Board title',
    search = 'Search...',
    //members = [],
    powerUps = [],
    //onShare = () => {},
    onOpenMenu = () => {},
    onDashBoard = () => {},
    onTitleChange = () => {},
    setSearch = () => {},
    className = ''
  }) 
{
  return (
    <header
      className={`w-full bg-white dark:bg-slate-900
      border-b border-slate-200 dark:border-slate-700
      p-3 flex items-center justify-between ${className}`}
    >

      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onDashBoard}
          className="px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Icon>
            <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
              <path d="M15 3.5H1V2h14zm-2 5.25H3v-1.5h10zM11 14H5v-1.5h6z"/>
              </svg>
          </Icon>
        </button>

        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange?.(e.target.value)}
          className="text-lg font-semibold bg-transparent border border-slate-300 dark:border-slate-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch?.(e.target.value)}
          placeholder="Search..."
          className="w-full border border-slate-300 dark:border-slate-600 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <nav className="flex items-center gap-2">
          {powerUps.map((p) => (
            <button
              key={p.id}
              onClick={() => p.onClick?.()}
              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {p.icon && <Icon>{p.icon}</Icon>}
              <span className="text-sm">{p.label}</span>
            </button>
          ))}
        </nav>

        <button className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
          <Icon>
            <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
              <path d="M15 3.5H1V2h14zm-2 5.25H3v-1.5h10zM11 14H5v-1.5h6z" />
            </svg>
          </Icon>
        </button>

        <button
          onClick={onOpenMenu}
          className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Icon>
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm7 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm7 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
          </Icon>
        </button>
      </div>
    </header>
  );
}
