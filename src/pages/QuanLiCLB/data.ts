export const KEYS = {
    CLUBS: 'th05_clubs',
    REGISTRATIONS: 'th05_registrations',
    HISTORY: 'th05_history',
} as const;

export function load<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

export function save(key: string, data: unknown): void {
    localStorage.setItem(key, JSON.stringify(data));
}