export interface Content {
  summary: string;
  details: string;
}

export interface TabbedProps {
  content: Content[];
}

export interface TabProps {
  num: number;
  activeTab: number;
  onClick: (num: number) => void;
}

export interface TabContentProps {
  item: Content;
}
