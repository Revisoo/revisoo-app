const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export interface UserResponse {
  username: string;
  created_at: string;
}

export interface NoteResponse {
  id: string;
  username: string;
  syllabus_id: string;
  topic: string;
  week_number: number;
  day_number: number | null;
  note_type: 'daily' | 'weekly';
  word_count: number;
  content: string;
  pushed_at: string;
  valid_until: string;
}

export interface StreakResponse {
  username: string;
  current_streak: number;
  longest_streak: number;
  freeze_count: number;
  last_view_date: string | null;
}

export interface LeaderboardEntry {
  username: string;
  syllo_score: number;
  current_streak: number;
}

export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error(err.detail ?? res.statusText), { status: res.status });
  }
  return res.json();
}

export function checkUsername(username: string): Promise<{ available: boolean }> {
  return apiFetch(`/api/v1/users/check/${encodeURIComponent(username)}`);
}

export function claimUsername(username: string): Promise<UserResponse> {
  return apiFetch('/api/v1/users/claim', {
    method: 'POST',
    body: JSON.stringify({ username }),
  });
}

export function getNotes(username: string): Promise<NoteResponse[]> {
  return apiFetch(`/api/v1/notes/${encodeURIComponent(username)}`);
}

export function recordView(username: string): Promise<StreakResponse> {
  return apiFetch('/api/v1/streaks/record-view', {
    method: 'POST',
    body: JSON.stringify({ username }),
  });
}

export function getLeaderboard(): Promise<LeaderboardResponse> {
  return apiFetch('/api/v1/leaderboard');
}
