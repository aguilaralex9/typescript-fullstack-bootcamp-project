export const handleSort = (order: 'asc' | 'desc', setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>) => {
    setSortOrder(order);
  };