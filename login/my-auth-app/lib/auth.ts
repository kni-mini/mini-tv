// lib/auth.ts
import { serialize, parse } from 'cookie';
import type { NextApiResponse, NextApiRequest } from 'next';
import { cookies as nextCookies } from 'next/headers'; 

const SESSION_NAME = 'session_id';
const SESSION_SECRET = 'your_very_secret_secret';

export async function setLoginSession(res: NextApiResponse, session: Record<string, any>) {
    const cookie = serialize(SESSION_NAME, JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, 
    });
  
    res.setHeader('Set-Cookie', cookie);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  

export async function getLoginSession(req: NextApiRequest) {
  const cookies = parse(req.headers.cookie || '');
  const session = cookies[SESSION_NAME];
  if (!session) return null;
  
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}


43
export async function getLoginSessionFromCookies() {
  const cookieStore = await nextCookies(); 
  const session = cookieStore.get('session_id')?.value;
  if (!session) return null;

  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}


export async function verifyUser(username: string, password: string) {

  if ((username === 'WRS' && password === 'WRSTheBest')||(username === 'Deans' && password === 'Pass')||(username === 'Club' && password === 'Clubs')) {
    return { username };
  }
  return null;
}
