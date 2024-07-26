import { Button, type ButtonProps } from 'react-native-paper';

interface FilterButtonProps extends ButtonProps {}

export function FilterButton(props: FilterButtonProps) {
  return <Button {...props} />;
}
