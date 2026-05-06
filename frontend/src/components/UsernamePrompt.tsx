'use client';

import { useState } from 'react';

interface Props {
  onSubmit: (username: string) => void;
}

export default function UsernamePrompt({ onSubmit }: Props) {
  const [value, setValue] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSubmit(trimmed);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Source+Serif+4:wght@300;400&display=swap');

        .prompt-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(8,8,6,0.85);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 1.5rem;
          animation: backdropIn 0.25s ease;
        }

        .prompt-modal {
          background: #0f0d09;
          border: 1px solid rgba(200,168,74,0.3);
          border-radius: 2px;
          padding: 2rem 2.25rem;
          width: 100%;
          max-width: 360px;
          animation: modalIn 0.3s cubic-bezier(0.16,1,0.3,1);
        }

        .prompt-kicker {
          font-family: 'Source Serif 4', serif;
          font-size: 0.6rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8a7a5a;
          margin-bottom: 0.6rem;
        }

        .prompt-headline {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #f0e8d8;
          line-height: 1.25;
          margin-bottom: 0.5rem;
        }

        .prompt-sub {
          font-family: 'Source Serif 4', serif;
          font-size: 0.78rem;
          font-weight: 300;
          color: #6a5c3a;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .prompt-input {
          width: 100%;
          background: rgba(240,232,216,0.04);
          border: 1px solid rgba(200,168,74,0.25);
          border-radius: 1px;
          padding: 0.75rem 0.85rem;
          color: #f0e8d8;
          font-family: 'Source Serif 4', serif;
          font-size: 0.9rem;
          font-weight: 300;
          outline: none;
          margin-bottom: 0.85rem;
          transition: border-color 0.2s;
          letter-spacing: 0.03em;
        }

        .prompt-input:focus {
          border-color: rgba(200,168,74,0.55);
        }

        .prompt-btn {
          width: 100%;
          background: #c8a84a;
          border: none;
          border-radius: 1px;
          padding: 0.75rem;
          color: #080806;
          font-family: 'Playfair Display', serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.15s;
        }

        .prompt-btn:hover { background: #dbb95c; }
        .prompt-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        @keyframes backdropIn {
          from { opacity: 0; } to { opacity: 1; }
        }

        @keyframes modalIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div className="prompt-backdrop">
        <div className="prompt-modal">
          <p className="prompt-kicker">Identity check</p>
          <h2 className="prompt-headline">Enter your handle<br />to track your streak</h2>
          <p className="prompt-sub">Your learning record awaits.</p>
          <form onSubmit={handleSubmit}>
            <input
              className="prompt-input"
              type="text"
              placeholder="your_handle"
              value={value}
              onChange={e => setValue(e.target.value)}
              autoFocus
              autoComplete="off"
              autoCapitalize="none"
            />
            <button className="prompt-btn" type="submit" disabled={!value.trim()}>
              Track Streak
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
