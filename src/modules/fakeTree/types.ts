export interface ITreeData {
  id: number;
  title: string;
  children?: ITreeData[];
  level?: number;
  isExpanded?: boolean;
  isChecked?: boolean;
}
