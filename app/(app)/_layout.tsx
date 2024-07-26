import { Redirect, Stack } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '~/components/container';
import { useStore } from '~/store/store';

export default function AppLayout() {
  const { isFirstTime, isLoading } = useStore();

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }

  if (isLoading) {
    return (
      <Container>
        <Text> add new task</Text>
      </Container>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Tasks', headerShown: false }} />
    </Stack>
  );
}
