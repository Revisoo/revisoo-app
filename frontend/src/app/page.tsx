import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #080806;
          color: #f0e8d8;
          font-family: 'Source Serif 4', Georgia, serif;
          min-height: 100vh;
        }

        .page { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

        /* ── NAV ── */
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 0;
          border-bottom: 1px solid rgba(200,168,74,0.15);
        }
        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #c8a84a;
          text-decoration: none;
          text-transform: uppercase;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        .nav-links a {
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #8a7a5a;
          text-decoration: none;
          transition: color 0.15s;
        }
        .nav-links a:hover { color: #f0e8d8; }

        /* ── MASTHEAD ── */
        .masthead {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-bottom: 1px solid rgba(200,168,74,0.15);
          padding: 5rem 0 4rem;
        }
        .masthead-left {
          border-right: 1px solid rgba(200,168,74,0.15);
          padding-right: 3rem;
        }
        .masthead-right {
          padding-left: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .masthead-kicker {
          font-size: 0.58rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #6a5c3a;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .masthead-kicker::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(200,168,74,0.2);
        }
        .masthead-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.5rem, 7vw, 6.5rem);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.02em;
          color: #f0e8d8;
          margin-bottom: 2rem;
        }
        .masthead-title em {
          font-style: italic;
          color: #c8a84a;
        }
        .masthead-desc {
          font-size: 1.05rem;
          font-weight: 300;
          color: #8a7a5a;
          line-height: 1.7;
          max-width: 34ch;
          font-style: italic;
        }
        .masthead-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .meta-item {}
        .meta-label {
          font-size: 0.55rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #5a4e30;
          margin-bottom: 0.35rem;
        }
        .meta-value {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #c8a84a;
          line-height: 1;
        }
        .meta-value span {
          font-size: 0.7rem;
          font-weight: 400;
          color: #6a5c3a;
          font-family: 'Source Serif 4', serif;
          margin-left: 0.25rem;
        }
        .cta-row {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .btn-primary {
          display: inline-block;
          background: #c8a84a;
          color: #080806;
          font-family: 'Playfair Display', serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.85rem 1.75rem;
          border-radius: 1px;
          transition: background 0.15s, transform 0.1s;
        }
        .btn-primary:hover {
          background: #dbb95c;
          transform: translateY(-1px);
        }
        .btn-ghost {
          display: inline-block;
          color: #8a7a5a;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          border-bottom: 1px solid rgba(138,122,90,0.3);
          padding-bottom: 0.1rem;
          transition: color 0.15s, border-color 0.15s;
        }
        .btn-ghost:hover {
          color: #f0e8d8;
          border-color: rgba(240,232,216,0.3);
        }

        /* ── HOW IT WORKS ── */
        .how {
          padding: 4.5rem 0;
          border-bottom: 1px solid rgba(200,168,74,0.15);
        }
        .section-header {
          display: flex;
          align-items: baseline;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .section-kicker {
          font-size: 0.58rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #5a4e30;
          white-space: nowrap;
        }
        .section-rule {
          flex: 1;
          height: 1px;
          background: rgba(200,168,74,0.15);
        }
        .steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-left: 1px solid rgba(200,168,74,0.1);
        }
        .step {
          padding: 0 2rem 0 1.5rem;
          border-right: 1px solid rgba(200,168,74,0.1);
          position: relative;
        }
        .step-num {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 900;
          color: rgba(200,168,74,0.12);
          line-height: 1;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .step-label {
          font-size: 0.55rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c8a84a;
          margin-bottom: 0.5rem;
        }
        .step-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #f0e8d8;
          margin-bottom: 0.6rem;
          line-height: 1.25;
        }
        .step-desc {
          font-size: 0.78rem;
          font-weight: 300;
          color: #6a5c3a;
          line-height: 1.7;
          font-style: italic;
        }
        .step-desc code {
          font-style: normal;
          font-family: monospace;
          font-size: 0.72rem;
          background: rgba(200,168,74,0.08);
          color: #c8a84a;
          padding: 0.1em 0.4em;
          border-radius: 2px;
        }

        /* ── WHAT YOU GET ── */
        .what {
          padding: 4.5rem 0;
          border-bottom: 1px solid rgba(200,168,74,0.15);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }
        .what-left {}
        .what-right {
          border-left: 1px solid rgba(200,168,74,0.15);
          padding-left: 4rem;
        }
        .what-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 900;
          line-height: 1.05;
          color: #f0e8d8;
          margin-bottom: 1.5rem;
        }
        .what-title em { font-style: italic; color: #c8a84a; }
        .what-body {
          font-size: 0.9rem;
          font-weight: 300;
          color: #8a7a5a;
          line-height: 1.8;
          font-style: italic;
          margin-bottom: 2rem;
        }
        .feature-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .feature-item {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          padding: 0.85rem 0;
          border-bottom: 1px solid rgba(240,232,216,0.04);
        }
        .feature-item:first-child { border-top: 1px solid rgba(240,232,216,0.04); }
        .feature-num {
          font-family: 'Playfair Display', serif;
          font-size: 0.65rem;
          color: #5a4e30;
          width: 1.5rem;
          flex-shrink: 0;
        }
        .feature-text {
          font-size: 0.82rem;
          color: #b0a080;
          font-weight: 300;
          line-height: 1.5;
        }
        .feature-text strong {
          color: #d8c898;
          font-weight: 600;
        }

        /* ── EXAMPLE NOTE ── */
        .example {
          padding: 4.5rem 0;
          border-bottom: 1px solid rgba(200,168,74,0.15);
        }
        .note-preview {
          margin-top: 2.5rem;
          border: 1px solid rgba(200,168,74,0.12);
          background: rgba(15,13,9,0.6);
          padding: 2rem 2.5rem;
          position: relative;
          overflow: hidden;
        }
        .note-preview::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 60%, #080806 100%);
          pointer-events: none;
          z-index: 1;
        }
        .note-preview-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(200,168,74,0.1);
        }
        .note-preview-tag {
          font-size: 0.5rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          border: 1px solid rgba(122,171,106,0.4);
          color: #7aab6a;
          padding: 0.15em 0.55em;
          border-radius: 1px;
        }
        .note-preview-meta {
          font-size: 0.58rem;
          color: #5a4e30;
          letter-spacing: 0.1em;
        }
        .note-preview-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #f0e8d8;
          margin-bottom: 1rem;
        }
        .note-preview-body {
          font-size: 0.82rem;
          color: #8a7a5a;
          line-height: 1.8;
          font-weight: 300;
          font-style: italic;
        }
        .note-preview-body strong { color: #b0a080; font-style: normal; font-weight: 600; }
        .note-preview-link {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c8a84a;
          text-decoration: none;
          border-bottom: 1px solid rgba(200,168,74,0.3);
          padding-bottom: 0.1rem;
          white-space: nowrap;
          transition: border-color 0.15s;
        }
        .note-preview-link:hover { border-color: #c8a84a; }

        /* ── FOOTER ── */
        .footer {
          padding: 2.5rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #5a4e30;
          text-transform: uppercase;
        }
        .footer-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        .footer-links a {
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #5a4e30;
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer-links a:hover { color: #8a7a5a; }

        @media (max-width: 768px) {
          .masthead { grid-template-columns: 1fr; }
          .masthead-left { border-right: none; border-bottom: 1px solid rgba(200,168,74,0.15); padding-right: 0; padding-bottom: 2.5rem; margin-bottom: 2.5rem; }
          .masthead-right { padding-left: 0; }
          .steps { grid-template-columns: 1fr 1fr; gap: 2rem 0; }
          .what { grid-template-columns: 1fr; gap: 2.5rem; }
          .what-right { border-left: none; padding-left: 0; border-top: 1px solid rgba(200,168,74,0.15); padding-top: 2.5rem; }
          .footer { flex-direction: column; gap: 1.5rem; text-align: center; }
        }
      `}</style>

      <div className="page">

        {/* NAV */}
        <nav className="nav">
          <a href="/" className="nav-logo">Revisoo</a>
          <ul className="nav-links">
            <li><Link href="/leaderboard">Leaderboard</Link></li>
            <li><Link href="/notes/itsaryan">Example Notes</Link></li>
            <li><Link href="/claim">Claim Handle</Link></li>
          </ul>
        </nav>

        {/* MASTHEAD */}
        <section className="masthead">
          <div className="masthead-left">
            <p className="masthead-kicker">Passive Learning System</p>
            <h1 className="masthead-title">
              Your notes.<br />
              <em>Every day.</em><br />
              Automatic.
            </h1>
            <p className="masthead-desc">
              Revisoo runs quietly in the background. While you sleep, it generates rich study notes from your syllabus and publishes them — ready to read each morning.
            </p>
          </div>
          <div className="masthead-right">
            <div className="masthead-meta">
              <div className="meta-item">
                <p className="meta-label">Setup time</p>
                <p className="meta-value">5<span>min</span></p>
              </div>
              <div className="meta-item">
                <p className="meta-label">Daily effort</p>
                <p className="meta-value">0<span>min</span></p>
              </div>
              <div className="meta-item">
                <p className="meta-label">Note length</p>
                <p className="meta-value">600<span>+ words</span></p>
              </div>
              <div className="meta-item">
                <p className="meta-label">AI providers</p>
                <p className="meta-value">2<span>free</span></p>
              </div>
            </div>
            <div className="cta-row">
              <Link href="/claim" className="btn-primary">Claim your handle</Link>
              <Link href="/leaderboard" className="btn-ghost">View leaderboard →</Link>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how">
          <div className="section-header">
            <p className="section-kicker">Getting started</p>
            <div className="section-rule" />
          </div>
          <div className="steps">
            <div className="step">
              <p className="step-num">01</p>
              <p className="step-label">First</p>
              <h3 className="step-title">Claim your handle</h3>
              <p className="step-desc">
                Pick a username at <Link href="/claim" style={{color:'#c8a84a', textDecoration:'none'}}>/claim</Link>. This is your public identity on the leaderboard and your note feed URL.
              </p>
            </div>
            <div className="step">
              <p className="step-num">02</p>
              <p className="step-label">Then</p>
              <h3 className="step-title">Install the script</h3>
              <p className="step-desc">
                Download the Revisoo script and run <code>pip install -r requirements.txt</code>. Needs Python 3.9+.
              </p>
            </div>
            <div className="step">
              <p className="step-num">03</p>
              <p className="step-label">Next</p>
              <h3 className="step-title">Configure it</h3>
              <p className="step-desc">
                Add your username, a free Groq or Gemini API key, and your study plan. The script walks you through it.
              </p>
            </div>
            <div className="step">
              <p className="step-num">04</p>
              <p className="step-label">Finally</p>
              <h3 className="step-title">Let it run</h3>
              <p className="step-desc">
                Run <code>python syllo.py schedule</code> to set a daily schedule. Notes generate and publish automatically — no further input needed.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section className="what">
          <div className="what-left">
            <div className="section-header" style={{marginBottom:'1.5rem'}}>
              <p className="section-kicker">What it does</p>
              <div className="section-rule" />
            </div>
            <h2 className="what-title">
              Not summaries.<br /><em>Real notes.</em>
            </h2>
            <p className="what-body">
              Each note is generated with full context — your syllabus, the topic&apos;s place in the curriculum, and what you&apos;ve already covered. The result reads like a knowledgeable friend explaining something over coffee.
            </p>
            <Link href="/notes/itsaryan" className="btn-ghost">See an example dispatch →</Link>
          </div>
          <div className="what-right">
            <ul className="feature-list">
              {[
                ['Opening hook', 'Starts with a real-world scenario or analogy — no dry definitions'],
                ['Concept explained simply', 'Plain language first, technical depth second'],
                ['Named examples', 'Specific companies, systems, and real problems — not "for example, a database"'],
                ['How it actually works', 'Components, trade-offs, and the why behind each decision'],
                ['Common mistakes', 'What juniors get wrong that seniors don&apos;t'],
                ['Key takeaways', '4–6 specific, punchy bullets you\'ll actually remember'],
              ].map(([title, desc], i) => (
                <li key={i} className="feature-item">
                  <span className="feature-num">0{i + 1}</span>
                  <span className="feature-text"><strong>{title}</strong> — {desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* EXAMPLE NOTE PREVIEW */}
        <section className="example">
          <div className="section-header">
            <p className="section-kicker">From the dispatch</p>
            <div className="section-rule" />
          </div>
          <div className="note-preview">
            <div className="note-preview-header">
              <span className="note-preview-tag">Daily</span>
              <span className="note-preview-meta">Week 1 · Day 1 — System Design</span>
            </div>
            <h3 className="note-preview-title">What is System Design?</h3>
            <p className="note-preview-body">
              Imagine you&apos;re a software engineer at a startup, tasked with building a new social media platform. You&apos;ve got the features and UI figured out — but how do you design the underlying system to handle millions of users, ensure data consistency, and stay online when half your servers catch fire?
              <br /><br />
              <strong>System design</strong> is the process of defining the architecture, components, and interactions of a complex system to meet specific requirements. It&apos;s about trade-offs: scalability vs. simplicity, consistency vs. availability, speed vs. cost...
            </p>
            <Link href="/notes/itsaryan" className="note-preview-link">Read full dispatch →</Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <span className="footer-logo">Revisoo</span>
          <ul className="footer-links">
            <li><Link href="/claim">Claim handle</Link></li>
            <li><Link href="/leaderboard">Leaderboard</Link></li>
            <li><Link href="/notes/itsaryan">Example notes</Link></li>
            <li><a href="https://github.com/Revisoo/revisoo-script" target="_blank" rel="noopener">GitHub</a></li>
          </ul>
        </footer>

      </div>
    </>
  );
}
