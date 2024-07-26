import { useState } from 'react';
import { Card, Text, Button, IconButton } from 'react-native-paper';

import { TaskStatus, type Task as TaskTpe } from '~/hooks/use-tasks';
import { useStore } from '~/store/store';
import { taskCardIcon } from '~/utils/constants';
import { truncateDescription } from '~/utils/truncate';

interface TaskProps {
  task: TaskTpe;
}

export default function Task({ task }: TaskProps) {
  const { deleteTask, updateTask } = useStore();
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };
  return (
    <Card
      onPress={toggleContentVisibility}
      mode={task.status === TaskStatus.DONE ? 'contained' : 'elevated'}>
      <Card.Title
        title={task.title}
        titleStyle={[
          task.status === TaskStatus.DONE && {
            textDecorationLine: 'line-through',
          },
        ]}
        subtitle={!isContentVisible ? truncateDescription(task.description) : ''}
        right={(props) => (
          <IconButton {...props} icon={taskCardIcon[task.status]} onPress={() => {}} />
        )}
      />
      {isContentVisible && (
        <Card.Content>
          <Text variant="bodyMedium">{task.description}</Text>
        </Card.Content>
      )}
      {isContentVisible && (
        <Card.Actions>
          {task.status !== TaskStatus.DONE && (
            <Button
              icon="check-circle"
              onPress={(event) => {
                event.stopPropagation();
                updateTask({
                  ...task,
                  status: TaskStatus.DONE,
                });
                toggleContentVisibility();
              }}>
              Done
            </Button>
          )}

          <Button
            icon="delete"
            onPress={(event) => {
              event.stopPropagation();
              deleteTask(task.id);
            }}>
            Delete
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
}
