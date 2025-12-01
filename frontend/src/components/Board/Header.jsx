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
    //members = [],
    powerUps = [],
    //onShare = () => {},
    onOpenMenu = () => {},
    onDashBoard = () => {},
    onTitleChange = () => {},
    className = ''
  }) 
{
  return (
    <header className={`w-full bg-white dark:bg-slate-900 
    border-b border-slate-200 dark:border-slate-700 
    p-3 flex items-center justify-between ${className}`}>

      <div className="flex items-center gap-3">
        {/* View switcher */}
        <button
          onClick={onDashBoard}
          aria-label="Views"
          className="px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2"
        >
          <Icon>
            {/* list + chevron down (simplified SVG) */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M2 7v8a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V7A2 2 0 0 0 6 5H4A2 2 0 0 0 2 7zM9 7v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H11a2 2 0 0 0-2 2zM16 7v10a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2z" />
            </svg>
          </Icon>
        </button>

        {/* Title */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="text-lg font-semibold leading-tight bg-transparent border border-slate-300 dark:border-slate-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={title}
              onChange={(e) => onTitleChange?.(e.target.value)}
              aria-label="Board name input"
            />
          </div>
        </div>

        {/* Members facepile 
        <div className="flex items-center -space-x-2 ml-3" aria-hidden={false}>
          {members.slice(0, 8).map((m, idx) => (
            <div key={m.id || idx} className="z-10" style={{ zIndex: members.length - idx }}>
              <Avatar member={m} size={7} />
            </div>
          ))}
          {members.length > 8 && (
            <div className="ml-2 text-sm text-slate-600">+{members.length - 8}</div>
          )}
        </div> 
        */}
      </div>

      <div className="flex items-center gap-2">
        {/* Power-ups list (icons + links) */}
        <nav className="flex items-center gap-2">
          {powerUps.map(p => (
            <button key={p.id} onClick={() => p.onClick?.()} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2">
              {p.icon && <Icon>{p.icon}</Icon>}
              <span className="text-sm">{p.label}</span>
            </button>
          ))}
        </nav>

        {/* Filter button */}
        <button className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2" aria-label="Filter cards">
          <Icon>
            <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor"><path d="M15 3.5H1V2h14zm-2 5.25H3v-1.5h10zM11 14H5v-1.5h6z"/></svg>
          </Icon>
        </button>

        {/* Share button 
        <button onClick={onShare} className="flex items-center gap-2 px-3 py-1 rounded bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:ring-2" aria-label="Share board">
          <Icon>
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor"><path d="M5 1.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5"/><path d="M1 4a4 4 0 1 1 8 0 4 4 0 0 1-8 0m11.25 4.75V11h1.5V8.75H16v-1.5h-2.25V5h-1.5v2.25H10v1.5z"/></svg>
          </Icon>
          <span className="font-medium">Share</span>
        </button>
        */}

        {/* Menu toggle */}
        <button onClick={onOpenMenu} aria-expanded="false" aria-label="Show menu" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2">
          <Icon>
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm7 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm7 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
          </Icon>
        </button>
      </div>
    </header>
  );
}
