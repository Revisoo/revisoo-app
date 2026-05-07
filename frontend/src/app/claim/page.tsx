'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { checkUsername, claimUsername } from '@/lib/api';

export default function ClaimPage() {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isValid = /^[a-zA-Z0-9_]{3,32}$/.test(username);

  useEffect(() => {
    if (!username) { setStatus('idle'); return; }
    if (!isValid) { setStatus('invalid'); return; }

    setStatus('checking');
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await checkUsername(username);
        setStatus(res.available ? 'available' : 'taken');
      } catch {
        setStatus('idle');
      }
    }, 300);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [username]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status !== 'available' || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      await claimUsername(username);
      localStorage.setItem('syllo_username', username);
      router.push(`/notes/${username}`);
    } catch (err: unknown) {
      const e = err as { status?: number };
      if (e.status === 409) setError('Username already taken.');
      else setError('Something went wrong. Try again.');
      setSubmitting(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #080806;
          color: #f0e8d8;
          font-family: 'Source Serif 4', Georgia, serif;
          min-height: 100vh;
        }

        .claim-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .claim-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 50% 0%, rgba(180,140,60,0.08) 0%, transparent 70%),
            repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(240,232,216,0.025) 80px),
            repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(240,232,216,0.015) 80px);
          pointer-events: none;
        }

        .masthead {
          text-align: center;
          margin-bottom: 3rem;
          animation: fadeUp 0.7s ease both;
        }

        .masthead-label {
          font-family: 'Source Serif 4', serif;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #8a7a5a;
          margin-bottom: 0.75rem;
        }

        .masthead-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.02em;
          color: #f0e8d8;
        }

        .masthead-title em {
          font-style: italic;
          color: #c8a84a;
        }

        .masthead-rule {
          width: 100%;
          max-width: 360px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #8a7a5a, transparent);
          margin: 1.25rem auto 0;
        }

        .card {
          background: rgba(15,13,9,0.9);
          border: 1px solid rgba(200,168,74,0.2);
          border-radius: 2px;
          padding: 2.5rem 2.5rem;
          width: 100%;
          max-width: 420px;
          animation: fadeUp 0.7s 0.15s ease both;
          backdrop-filter: blur(8px);
          position: relative;
        }

        .card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 2px;
          background: linear-gradient(135deg, rgba(200,168,74,0.04) 0%, transparent 50%);
          pointer-events: none;
        }

        .card-eyebrow {
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8a7a5a;
          margin-bottom: 1.5rem;
        }

        .input-group {
          position: relative;
          margin-bottom: 0.75rem;
        }

        .input-prefix {
          position: absolute;
          left: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6a5c3a;
          font-size: 1rem;
          font-style: italic;
          font-family: 'Playfair Display', serif;
          pointer-events: none;
        }

        input[type="text"] {
          width: 100%;
          background: rgba(240,232,216,0.04);
          border: 1px solid rgba(200,168,74,0.25);
          border-radius: 1px;
          padding: 0.85rem 0.9rem 0.85rem 1.8rem;
          color: #f0e8d8;
          font-family: 'Source Serif 4', serif;
          font-size: 1rem;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          letter-spacing: 0.03em;
        }

        input[type="text"]:focus {
          border-color: rgba(200,168,74,0.6);
          background: rgba(200,168,74,0.04);
        }

        .status-line {
          height: 1.4rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          margin-bottom: 1.25rem;
        }

        .status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .status-available .status-dot { background: #7aab6a; }
        .status-available { color: #7aab6a; }
        .status-taken .status-dot { background: #c06060; }
        .status-taken { color: #c06060; }
        .status-invalid { color: #6a5c3a; }
        .status-checking { color: #8a7a5a; animation: pulse 1s infinite; }

        button[type="submit"] {
          width: 100%;
          background: #c8a84a;
          border: none;
          border-radius: 1px;
          padding: 0.9rem;
          color: #080806;
          font-family: 'Playfair Display', serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.15s, opacity 0.15s, transform 0.1s;
        }

        button[type="submit"]:hover:not(:disabled) {
          background: #dbb95c;
          transform: translateY(-1px);
        }

        button[type="submit"]:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          transform: none;
        }

        .error-msg {
          margin-top: 0.75rem;
          font-size: 0.72rem;
          color: #c06060;
          letter-spacing: 0.05em;
        }

        .footnote {
          margin-top: 1.5rem;
          font-size: 0.62rem;
          color: #5a4e30;
          letter-spacing: 0.08em;
          text-align: center;
          line-height: 1.7;
          animation: fadeUp 0.7s 0.3s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      <div className="claim-page">
        <div className="masthead">
          <p className="masthead-label">Syllo — Learning Ledger</p>
          <h1 className="masthead-title">Claim Your<br /><em>Dispatch</em></h1>
          <div className="masthead-rule" />
        </div>

        <div className="card">
          <p className="card-eyebrow">Issue your identifier</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-prefix">@</span>
              <input
                type="text"
                placeholder="your_handle"
                value={username}
                onChange={e => setUsername(e.target.value)}
                maxLength={32}
                autoFocus
                autoComplete="off"
                autoCapitalize="none"
              />
            </div>

            <div className={`status-line ${status === 'available' ? 'status-available' : status === 'taken' ? 'status-taken' : status === 'invalid' ? 'status-invalid' : status === 'checking' ? 'status-checking' : ''}`}>
              {status === 'available' && <><span className="status-dot" />Handle is available</>}
              {status === 'taken' && <><span className="status-dot" />Handle is taken</>}
              {status === 'invalid' && <span>3–32 chars, letters, numbers, underscores</span>}
              {status === 'checking' && <span>Checking…</span>}
            </div>

            <button type="submit" disabled={status !== 'available' || submitting}>
              {submitting ? 'Claiming…' : 'Claim Handle'}
            </button>

            {error && <p className="error-msg">{error}</p>}
          </form>
        </div>

        <p className="footnote">
          No account. No password.<br />
          Your handle is your identity in the ledger.
        </p>
      </div>
    </>
  );
}
