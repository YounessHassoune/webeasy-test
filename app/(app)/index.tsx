import { BottomSheetModal, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text, FAB, Appbar, Menu } from 'react-native-paper';
import uuid from 'react-native-uuid';

import { Container } from '~/components/Container';
import { renderBackdrop } from '~/components/modal';
import NoTasks from '~/components/no-tasks';
import TaskList from '~/components/task-list';
import { TaskStatus } from '~/hooks/use-tasks';
import { useStore } from '~/store/store';
import { taskFilterIcons, taskFilters } from '~/utils/constants';

export default function Home() {
  const [title, seTitle] = useState('');
  const [description, setDescription] = useState('');
  const { tasks, addTask } = useStore();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '70%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const createNewTask = () => {
    if (title.length < 2) {
      console.error('Title must be at least 2 characters long');
      return;
    }
    const task = {
      id: uuid.v4() as string,
      title,
      description,
      date: new Date(),
      status: TaskStatus.PROGRESS,
    };
    addTask(task);
  };

  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(taskFilters[0]);

  const handleMenuItemPress = (item) => {
    setSelectedItem(item);
    closeMenu();
  };
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <>
      <Container>
        <View className={contentContainer.container}>
          <View className="absolute left-0 right-0 top-0">
            <Appbar.Header
              mode="small"
              elevated
              statusBarHeight={0}
              style={{
                backgroundColor: 'transparent',
              }}>
              <Appbar.Content title="Tasks" />
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchorPosition="bottom"
                anchor={<Appbar.Action icon="filter" onPress={openMenu} />}>
                {taskFilters.map((filter) => (
                  <Menu.Item
                    key={filter}
                    onPress={() => handleMenuItemPress(filter)}
                    title={filter}
                    leadingIcon={selectedItem === filter ? taskFilterIcons[filter] : undefined}
                  />
                ))}
              </Menu>
            </Appbar.Header>
          </View>
          <View className="top-[64] flex-1 ">
            {tasks.length > 0 ? <TaskList tasks={tasks} /> : <NoTasks />}
          </View>
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={handlePresentModalPress}
            mode="elevated"
            size="medium"
          />
        </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          keyboardBehavior="fillParent"
          keyboardBlurBehavior="restore"
          backdropComponent={renderBackdrop}>
          <BottomSheetView style={styles.contentContainer}>
            <Text variant="headlineMedium">Add new task :</Text>
            <TextInput
              label="title"
              mode="outlined"
              render={(innerProps) => <BottomSheetTextInput {...(innerProps as any)} />}
              value={title}
              onChangeText={(text) => seTitle(text)}
              style={styles.item}
            />
            <TextInput
              label="description"
              style={{ minHeight: 100, ...styles.item }}
              mode="outlined"
              render={(innerProps) => <BottomSheetTextInput {...(innerProps as any)} />}
              multiline
              defaultValue={description}
              onChangeText={(text) => setDescription(text)}
            />
            <Button
              mode="contained"
              onPress={() => createNewTask()}
              icon="plus-circle"
              contentStyle={styles.buttonContent}
              style={{ ...styles.item, ...styles.button }}>
              Add
            </Button>
          </BottomSheetView>
        </BottomSheetModal>
      </Container>
    </>
  );
}
const styles = {
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  item: {
    marginTop: 40,
  },
  button: {
    padding: 5,
    borderRadius: 5,
  },
  buttonContent: {
    flexDirection: 'row-reverse' as const,
  },
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
