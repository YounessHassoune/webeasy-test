import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Text, TextInput, Button } from 'react-native-paper';
import uuid from 'react-native-uuid';

import { renderBackdrop } from './backdrop';

import { useModal } from '~/hooks/use-modal';
import { TaskStatus } from '~/hooks/use-tasks';
import { useStore } from '~/store/store';

type ModalProps = Omit<BottomSheetModalProps, 'children'> & {
  title?: string;
  children?: React.ReactNode;
};

export const Modal = forwardRef<BottomSheetModal, ModalProps>(
  ({ snapPoints = ['25%', '70%'], ...props }, ref) => {
    const { ref: modalRef, dismiss } = useModal();

    const [title, seTitle] = useState('');
    const [description, setDescription] = useState('');
    const { addTask } = useStore();

    useImperativeHandle(ref, () => modalRef.current as BottomSheetModal);

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
      dismiss();
    };
    return (
      <BottomSheetModal
        {...props}
        ref={modalRef}
        snapPoints={snapPoints}
        index={1}
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
            mode="outlined"
            onPress={() => createNewTask()}
            icon="plus-circle"
            contentStyle={styles.buttonContent}
            style={{ ...styles.item, ...styles.button }}>
            Add
          </Button>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

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
};
