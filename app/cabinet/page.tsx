import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { UserCard } from '../../components/index';

export default async function Cabinet() {
  const session = await getServerSession(options);

  if (!session) {
    redirect('api/auth/signin?callbackUrl=/cabinet');
  }

  return (
    <section>
      <h1 className="text-center">Cabinet</h1>
      <UserCard user={session?.user} />
    </section>
  );
}
