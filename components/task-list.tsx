import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import Task from './task';

import { type Task as TaskTpe } from '~/hooks/use-tasks';

interface TaskListProps {
  tasks: TaskTpe[];
}
export default function TaskList({ tasks }: TaskListProps) {
  return (
    <View className={styles.container}>
      <FlashList
        showsVerticalScrollIndicator={false}
        data={tasks}
        renderItem={({ item }) => <Task task={item} />}
        keyExtractor={(_, index) => `task-${index}`}
        estimatedItemSize={10}
        contentContainerStyle={{ paddingHorizontal: 2, paddingVertical: 2 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListEmptyComponent={
          <View>
            <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
              Sorry! No Task found
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = {
  container: 'flex-1 px-2 ',
};
