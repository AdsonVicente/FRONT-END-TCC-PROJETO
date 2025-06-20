import { jwtDecode } from 'jwt-decode';

export function getAdminIdFromToken(): string | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    return decoded.sub as string;
  } catch {
    return null;
  }
}
