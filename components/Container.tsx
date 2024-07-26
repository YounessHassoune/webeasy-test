import { SafeAreaView } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView style={{ flex: 1, padding: 12 }}>{children}</SafeAreaView>;
};
