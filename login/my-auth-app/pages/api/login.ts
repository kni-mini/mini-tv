import type { NextApiRequest, NextApiResponse } from 'next';
import { setLoginSession } from '../../lib/auth';
import { verifyUser } from '../../lib/auth';


export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).end('Method not allowed');
    }
  
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Missing username or password' });
    }
  
    const user = await verifyUser(username, password);
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    await setLoginSession(res, { username: user.username });
  
    return res.status(200).json({ message: 'Logged in' });
  }
  