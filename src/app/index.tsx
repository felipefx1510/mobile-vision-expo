import { Redirect } from 'expo-router';

import { useAuth } from '@/context/auth-context';

export default function IndexRoute() {
  const { user } = useAuth();
  return <Redirect href={user ? '/inicio' : '/login'} />;
}
