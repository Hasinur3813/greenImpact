export interface Column<T> {
  key: keyof T | "action";
  label: string;
  render?: (row: T) => React.ReactNode;
}
