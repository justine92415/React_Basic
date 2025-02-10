import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';
import { IItem } from './type';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Charger', quantity: 1, packed: false },
];

export function App() {
  const [items, setItems] = useState<IItem[]>([]);

  function handleAddItems(item: IItem): void {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id: number): void {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id: number): void {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList(): void {
    const confirmed = window.confirm(
      'Are you sure you want to clear the list?'
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
