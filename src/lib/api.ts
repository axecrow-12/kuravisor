/*
 * Client for the KuraVisor backend (see backend/src/server.ts).
 * Set NEXT_PUBLIC_API_URL to point the app at a deployed server.
 */

export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000").replace(
  /\/$/,
  "",
);

export class ApiError extends Error {
  constructor(
    message: string,
    /** 0 when the server could not be reached at all. */
    public status: number,
  ) {
    super(message);
  }
}

export interface AuthResponse {
  token: string;
  user: { id: string; name: string; email: string };
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch {
    throw new ApiError("Can't reach the KuraVisor server. Check your internet connection.", 0);
  } finally {
    clearTimeout(timer);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data.message ?? `Request failed (${res.status}).`, res.status);
  }
  return data as T;
}

export function login(email: string, password: string) {
  return post<AuthResponse>("/api/auth/login", { email, password });
}

export function register(name: string, email: string, password: string) {
  return post<AuthResponse>("/api/auth/register", { name, email, password });
}
