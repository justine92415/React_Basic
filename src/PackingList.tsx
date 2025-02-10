import { useState } from 'react';
import { IItem, ItemsWithActionsProps, SortBy } from './type';
import Item from './Item';

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}: ItemsWithActionsProps) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems: IItem[] = [];

  if (sortBy === SortBy.Input) sortedItems = items;

  if (sortBy === SortBy.Description)
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === SortBy.Packed)
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value={SortBy.Input}>Sort by input order</option>
          <option value={SortBy.Description}>Sort by description</option>
          <option value={SortBy.Packed}>Sort by status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
