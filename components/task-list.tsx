import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';

import Task from './task';

import { type Task as TaskTpe } from '~/hooks/use-tasks';

interface TaskListProps {
  tasks: TaskTpe[];
}
export default function TaskList({ tasks }: TaskListProps) {
  return (
    <View className={styles.container}>
      <FlashList
        data={tasks}
        renderItem={({ item }) => <Task task={item} />}
        keyExtractor={(_, index) => `task-${index}`}
        estimatedItemSize={10}
        contentContainerStyle={{ paddingHorizontal: 2, paddingVertical: 2 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
      {/* <ScrollView
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
            key={`chip-${filter}`}
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
      </ScrollView> */}
    </View>
  );
}

const styles = {
  container: 'flex-1 px-2 ',
};
