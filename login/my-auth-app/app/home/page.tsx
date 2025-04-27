
import { redirect } from 'next/navigation';
import { getLoginSessionFromCookies } from '../../lib/auth';

export default async function HomePage() {
  const session = await getLoginSessionFromCookies();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Welcome, {session.username}!</h1>
    </div>
  );
}
