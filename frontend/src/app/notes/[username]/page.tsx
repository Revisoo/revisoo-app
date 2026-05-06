'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getNotes, recordView, NoteResponse, StreakResponse } from '@/lib/api';
import UsernamePrompt from '@/components/UsernamePrompt';

const STORAGE_KEY = 'syllo_username';

function Badge({ type }: { type: string }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.15em 0.55em',
      fontSize: '0.55rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      border: `1px solid ${type === 'daily' ? 'rgba(122,171,106,0.5)' : 'rgba(100,140,200,0.5)'}`,
      color: type === 'daily' ? '#7aab6a' : '#6a9acc',
      borderRadius: '1px',
      fontFamily: "'Source Serif 4', serif",
      fontWeight: 300,
    }}>
      {type}
    </span>
  );
}

function NoteCard({ note }: { note: NoteResponse }) {
  const date = new Date(note.pushed_at);
  const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <article style={{
      borderTop: '1px solid rgba(200,168,74,0.12)',
      paddingTop: '1.75rem',
      paddingBottom: '1.75rem',
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      gap: '1.5rem',
    }}>
      <div style={{ paddingTop: '0.15rem' }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6a5c3a', marginBottom: '0.4rem' }}>
          Wk {note.week_number}{note.day_number != null ? ` · Day ${note.day_number}` : ''}
        </p>
        <p style={{ fontSize: '0.65rem', color: '#5a4e30', marginBottom: '0.6rem', fontStyle: 'italic' }}>{formatted}</p>
        <Badge type={note.note_type} />
        <p style={{ fontSize: '0.58rem', color: '#5a4e30', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
          {note.word_count} words
        </p>
      </div>
      <div>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#f0e8d8',
          marginBottom: '0.35rem',
          lineHeight: 1.2,
        }}>{note.topic}</h3>
        <p style={{
          fontSize: '0.6rem',
          color: '#8a7a5a',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>{note.syllabus_id}</p>
        <p style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: '0.875rem',
          fontWeight: 300,
          color: '#b0a080',
          lineHeight: 1.75,
          whiteSpace: 'pre-wrap',
        }}>{note.content}</p>
      </div>
    </article>
  );
}

export default function NotesPage() {
  const params = useParams();
  const pageUsername = params.username as string;

  const [notes, setNotes] = useState<NoteResponse[]>([]);
  const [streak, setStreak] = useState<StreakResponse | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotes(pageUsername).then(setNotes).finally(() => setLoading(false));
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      recordView(stored).then(setStreak).catch(() => {});
    } else {
      setShowPrompt(true);
    }
  }, [pageUsername]);

  async function handleIdentify(username: string) {
    localStorage.setItem(STORAGE_KEY, username);
    setShowPrompt(false);
    try {
      const s = await recordView(username);
      setStreak(s);
    } catch {}
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080806; color: #f0e8d8; font-family: 'Source Serif 4', Georgia, serif; min-height: 100vh; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {showPrompt && <UsernamePrompt onSubmit={handleIdentify} />}

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '3rem 1.5rem' }}>
        {/* Header */}
        <header style={{ marginBottom: '2.5rem', borderBottom: '2px solid rgba(200,168,74,0.25)', paddingBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8a7a5a', marginBottom: '0.5rem' }}>
            Syllo — Notes Dispatch
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.75rem, 5vw, 3rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}>
              @{pageUsername}
            </h1>
            {streak && (
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: '#c8a84a', lineHeight: 1 }}>
                  {streak.current_streak}
                </p>
                <p style={{ fontSize: '0.58rem', color: '#8a7a5a', letterSpacing: '0.2em', textTransform: 'uppercase' }}>day streak</p>
                {streak.freeze_count > 0 && (
                  <p style={{ fontSize: '0.58rem', color: '#6a9acc', letterSpacing: '0.1em', marginTop: '0.2rem' }}>
                    {streak.freeze_count} freeze{streak.freeze_count !== 1 ? 's' : ''} remaining
                  </p>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Notes */}
        {loading ? (
          <p style={{ color: '#5a4e30', fontStyle: 'italic', fontSize: '0.85rem' }}>Loading dispatch…</p>
        ) : notes.length === 0 ? (
          <p style={{ color: '#5a4e30', fontStyle: 'italic', fontSize: '0.85rem' }}>No notes published yet.</p>
        ) : (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            {notes.map(note => <NoteCard key={note.id} note={note} />)}
          </div>
        )}
      </div>
    </>
  );
}
