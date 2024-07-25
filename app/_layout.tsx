import { Slot } from 'expo-router';

import { StoreProvider } from '../store/store';

export default function Root() {
  return (
    <StoreProvider>
      <Slot />
    </StoreProvider>
  );
}
