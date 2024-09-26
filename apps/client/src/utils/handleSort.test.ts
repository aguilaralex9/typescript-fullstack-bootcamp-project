import { handleSort } from './handleSort';

describe('handleSort', () => {
  it('should call setSortOrder with "asc" when sorting by ascending order', () => {
    const setSortOrder = jest.fn();

    handleSort('asc', setSortOrder);

    expect(setSortOrder).toHaveBeenCalledWith('asc');
  });

  it('should call setSortOrder with "desc" when sorting by descending order', () => {
    const setSortOrder = jest.fn(); 

    handleSort('desc', setSortOrder);

    expect(setSortOrder).toHaveBeenCalledWith('desc');
  });
});
