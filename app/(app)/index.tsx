import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Text } from 'react-native';
import { TextInput } from 'react-native-paper';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';

export default function Home() {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '70%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <Container>
        <Text> add new task</Text>
        <Button onPress={handlePresentModalPress} title="add task" />
        <BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints}>
          <BottomSheetView style={styles.contentContainer}>
            <Text>Add New Task:</Text>
            <TextInput
              label="title"
              value={text}
              mode="outlined"
              onChangeText={(text) => setText(text)}
              style={styles.item}
            />
            <TextInput
              label="description"
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline
              mode="outlined"
              numberOfLines={4}
              style={{ minHeight: 100, ...styles.item }}
            />
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
};
