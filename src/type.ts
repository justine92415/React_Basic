export interface ItemProps {
  item: IItem;
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
}

export interface ItemsProps {
  items: IItem[];
}

export interface ItemsWithActionsProps extends ItemsProps {
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
  onClearList: () => void;
}

export interface IItem {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

export enum SortBy {
  Input = 'input',
  Description = 'description',
  Packed = 'packed',
}
