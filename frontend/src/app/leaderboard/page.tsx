import { getLeaderboard } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function LeaderboardPage() {
  const data = await getLeaderboard();
  const entries = data.entries;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080806; color: #f0e8d8; font-family: 'Source Serif 4', Georgia, serif; min-height: 100vh; }

        .lb-page { max-width: 700px; margin: 0 auto; padding: 3rem 1.5rem; }

        .lb-header { margin-bottom: 2.5rem; border-bottom: 2px solid rgba(200,168,74,0.25); padding-bottom: 1.5rem; }

        .lb-kicker {
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8a7a5a;
          margin-bottom: 0.5rem;
        }

        .lb-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.02em;
        }

        .lb-title em { font-style: italic; color: #c8a84a; }

        .lb-date {
          margin-top: 0.75rem;
          font-size: 0.62rem;
          color: #5a4e30;
          letter-spacing: 0.1em;
          font-style: italic;
        }

        .lb-table { width: 100%; border-collapse: collapse; }

        .lb-thead th {
          text-align: left;
          font-size: 0.55rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #6a5c3a;
          padding: 0 0 0.75rem;
          border-bottom: 1px solid rgba(200,168,74,0.15);
          font-family: 'Source Serif 4', serif;
          font-weight: 300;
        }

        .lb-thead th:last-child, .lb-row td:last-child { text-align: right; }

        .lb-row { animation: rowIn 0.4s ease both; }

        .lb-row td {
          padding: 1.1rem 0;
          border-bottom: 1px solid rgba(240,232,216,0.04);
          vertical-align: middle;
        }

        .rank-num {
          font-family: 'Playfair Display', serif;
          font-size: 0.75rem;
          font-weight: 400;
          color: #5a4e30;
          width: 36px;
        }

        .rank-1 .rank-num { color: #c8a84a; font-size: 1rem; font-weight: 700; }
        .rank-2 .rank-num { color: #a0a0a0; font-size: 0.9rem; }
        .rank-3 .rank-num { color: #9a7050; font-size: 0.85rem; }

        .username-cell {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 400;
          color: #f0e8d8;
        }

        .rank-1 .username-cell { font-weight: 700; }

        .streak-cell {
          font-size: 0.72rem;
          color: #8a7a5a;
          text-align: center;
          width: 80px;
        }

        .streak-val {
          color: #c8a84a;
          font-family: 'Playfair Display', serif;
          font-size: 0.9rem;
        }

        .score-cell {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #f0e8d8;
          text-align: right;
        }

        .rank-1 .score-cell { color: #c8a84a; }

        .empty {
          padding: 3rem 0;
          text-align: center;
          font-style: italic;
          color: #5a4e30;
          font-size: 0.85rem;
        }

        @keyframes rowIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div className="lb-page">
        <header className="lb-header">
          <p className="lb-kicker">Syllo — Learning Ledger</p>
          <h1 className="lb-title">The <em>Leaderboard</em></h1>
          <p className="lb-date">Top learners by Syllo Score · Updated every 60 seconds</p>
        </header>

        {entries.length === 0 ? (
          <p className="empty">No entries yet. Be the first to claim the board.</p>
        ) : (
          <table className="lb-table">
            <thead className="lb-thead">
              <tr>
                <th style={{ width: 36 }}>#</th>
                <th>Handle</th>
                <th style={{ textAlign: 'center', width: 80 }}>Streak</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr
                  key={entry.username}
                  className={`lb-row rank-${i + 1}`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <td className="rank-num">{i + 1}</td>
                  <td className="username-cell">@{entry.username}</td>
                  <td className="streak-cell">
                    <span className="streak-val">{entry.current_streak}</span>d
                  </td>
                  <td className="score-cell">{entry.syllo_score.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
