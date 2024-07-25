import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

import { Container } from '~/components/Container';
import { useStore } from '~/store/store';

export default function Onboarding() {
  const { updateIsFirstTime } = useStore();
  const router = useRouter();
  return (
    <Container>
      <View className="justify-end  ">
        <Text className="mb-2 text-center text-lg text-gray-600">To-Do List Tasky</Text>

        <Text className="my-1 pt-6 text-left text-lg">
          This productive tool is designed to help you better manage your task project-wise
          conveniently!{' '}
        </Text>
      </View>

      <Button
        title="Let's Get Started "
        onPress={async () => {
          await updateIsFirstTime(false);
          router.replace('/(app)');
        }}
      />
    </Container>
  );
}
