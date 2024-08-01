import { FlashList, ViewToken } from '@shopify/flash-list';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSharedValue } from 'react-native-reanimated';

import Task from './task';

import { type Task as TaskTpe } from '~/hooks/use-tasks';

interface TaskListProps {
  tasks: TaskTpe[];
}
export default function TaskList({ tasks }: TaskListProps) {
  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <View className={styles.container}>
      <FlashList
        showsVerticalScrollIndicator={false}
        data={tasks}
        renderItem={({ item }) => <Task task={item} viewableItems={viewableItems} />}
        keyExtractor={(item, _) => item.id}
        estimatedItemSize={30}
        contentContainerStyle={{ paddingHorizontal: 2, paddingBottom: 80, paddingTop: 2 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListEmptyComponent={
          <View>
            <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
              Sorry! No Task found
            </Text>
          </View>
        }
        onViewableItemsChanged={({ viewableItems: items }) => {
          viewableItems.value = items;
        }}
      />
    </View>
  );
}

const styles = {
  container: 'flex-1 px-2 ',
};
