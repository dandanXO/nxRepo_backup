export type IContainer = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onMouseDown?: (event: unknown) => void;
}
