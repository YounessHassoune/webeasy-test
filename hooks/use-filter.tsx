import { useState } from 'react';

function useFilter(initialFilter: string) {
  const [selectedItem, setSelectedItem] = useState(initialFilter);

  const handleFilterChange = (item: string) => {
    setSelectedItem(item);
  };

  return {
    selectedItem,
    handleFilterChange,
  };
}

export default useFilter;
