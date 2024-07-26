import { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';

import { useStore } from '~/store/store';
import { taskFilters } from '~/utils/constants';

export default function Header() {
  const [visible, setVisible] = useState(false);
  const { updateFilter, filter: selectedFilter } = useStore();

  const handleMenuItemPress = (item: string) => {
    updateFilter(item);
    closeMenu();
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
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
            leadingIcon={selectedFilter === filter ? 'check' : undefined}
          />
        ))}
      </Menu>
    </Appbar.Header>
  );
}
