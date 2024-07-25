import { Redirect, Slot, Stack } from 'expo-router';
import { Text } from 'react-native';
import { Container } from '~/components/Container';

import { useStore } from '~/store/store';

export default function AppLayout() {
  const { isFirstTime, isLoading } = useStore();

  console.log('hhh', isFirstTime);

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

  return <Stack />;
}
