import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

import { Container } from '~/components/container';
import { useStore } from '~/store/store';

export default function Onboarding() {
  const { updateIsFirstTime } = useStore();
  const router = useRouter();
  const animation = useRef<LottieView>(null);

  return (
    <Container>
      <View className="flex-1 items-center justify-evenly  ">
        <LottieView
          renderMode="SOFTWARE"
          autoPlay
          loop
          ref={animation}
          style={{
            width: '85%',
            height: 300,
            backgroundColor: 'transparent',
          }}
          source={require('../assets/animation.json')}
        />
        <View className="gap-8 px-4">
          <Text variant="headlineMedium" style={{ textAlign: 'center' }}>
            To-Do List{' '}
          </Text>
          <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
            This productive tool is designed to help you better manage your task project-wise
            conveniently!{' '}
          </Text>
          <Button
            mode="outlined"
            onPress={async () => {
              await updateIsFirstTime(false);
              router.replace('/(app)');
            }}>
            Let's Get Started
          </Button>
        </View>
      </View>
    </Container>
  );
}
