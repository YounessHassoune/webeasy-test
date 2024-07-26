import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import {} from 'expo-asset';

export default function NoTasks() {
  return (
    <View className={styles.container}>
      <View className={styles.innerContainer}>
        <Image
          source={require('../assets/todo.png')}
          style={{
            width: 100,
            height: 100,
          }}
        />
        <Text variant="titleLarge">Start Your Tasks</Text>
        <Text variant="bodyLarge" style={styles.bodyText}>
          Add your first task.
        </Text>
        <Text variant="bodyLarge" style={styles.bodyText}>
          tap the plus button to get started
        </Text>
      </View>
    </View>
  );
}

const styles = {
  container: 'flex-1 justify-center ',
  innerContainer: '-top-[64] items-center',
  bodyText: {
    color: '#444343',
  },
};
