import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import '../global.css';

import { StoreProvider } from '../store/store';

export default function Root() {
  return (
    <GestureHandlerRootView className={styles.container}>
      <PaperProvider>
        <BottomSheetModalProvider>
          <StoreProvider>
            <Slot />
          </StoreProvider>
        </BottomSheetModalProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = {
  container: 'flex-1',
};
