import { ScrollView, View } from 'react-native';
import { Chip } from 'react-native-paper';

import { type Task } from '~/hooks/use-tasks';
import { taskFilterIcons, taskFilters } from '~/utils/constants';

interface TaskListProps {
  tasks: Task[];
}
export default function TaskList({ tasks }: TaskListProps) {
  return (
    <View className={styles.container}>
      <ScrollView
        style={{
          top: 64,
          maxHeight: 50,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          height: 'auto',
        }}>
        {taskFilters.map((filter) => (
          <Chip
            rippleColor="transparent"
            mode={filter === 'All' ? 'flat' : 'outlined'}
            icon={taskFilterIcons[filter]}
            onPress={() => console.log('Pressed')}
            style={{
              height: 50,
              marginHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {filter}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = {
  container: 'flex-1',
};
