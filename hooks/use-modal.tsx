import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useCallback } from 'react';

export const useModal = () => {
  const ref = useRef<BottomSheetModal>(null);

  const present = useCallback(() => {
    ref.current?.present();
  }, []);

  const dismiss = useCallback(() => {
    ref.current?.dismiss();
  }, []);

  return { ref, present, dismiss };
};
