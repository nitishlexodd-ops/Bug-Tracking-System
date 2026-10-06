export default function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand-lockup" aria-label="DevTrack">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 28 28" fill="none">
              <path d="M6 8.5h16M6 14h10M6 19.5h13" />
              <circle cx="22" cy="14" r="2" />
            </svg>
          </span>
          <span className="brand-name">DEVTRACK</span>
          <span className="brand-divider" />
          <span className="brand-caption">MINI BUG TRACKER</span>
        </div>
        <div className="workspace-label">
          <span className="workspace-dot" />
          <span>Internal workspace</span>
        </div>
      </div>
    </header>
  );
}