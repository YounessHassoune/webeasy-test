import { View } from 'react-native';
import { FAB } from 'react-native-paper';

import { Container } from '~/components/container';
import Header from '~/components/header';
import { Modal } from '~/components/modal';
import NoTasks from '~/components/no-tasks';
import TaskList from '~/components/task-list';
import { useModal } from '~/hooks/use-modal';
import { useStore } from '~/store/store';

export default function Home() {
  const { tasks, filteredTasks } = useStore();
  const { ref, present } = useModal();

  return (
    <>
      <Container>
        <View className={contentContainer.container}>
          <View className="absolute left-0 right-0 top-0">
            <Header />
          </View>
          <View className="top-[64] flex-1 ">
            {tasks.length > 0 ? <TaskList tasks={filteredTasks} /> : <NoTasks />}
          </View>
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => present()}
            mode="elevated"
            size="medium"
          />
        </View>
        <Modal ref={ref} />
      </Container>
    </>
  );
}
const styles = {
  fab: {
    position: 'absolute' as const,
    borderRadius: 50,
    bottom: 10,
    right: 10,
  },
};

const contentContainer = {
  container: 'flex-1 flex  bg-grey-200 justify-center',
};
