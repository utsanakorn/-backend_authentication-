import { Slot, useSegments, useRouter } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'
import { useEffect, useState } from 'react'
import { Session } from "@supabase/supabase-js"
import { supabase } from '../lib/supabase'

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => 
    {
      setSession(session);
      setInitialized(true);
    });

  const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => 
  {
      setSession(session);
  });

  return () => 
  {
    authListener.subscription.unsubscribe();
  };
}, []);

  useEffect(() => {
    if (!initialized) return;
  
    const inAppGroup = segments[0] === '(app)';

    if (session && !inAppGroup) 
    {
    router.replace("/home");
    }
    else if (!session && inAppGroup)
    {
      router.replace("/sign-in");
    }
  }, [session, segments, initialized]);
  
  if (!initialized)
  {
    return 
    (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  return <Slot />
}