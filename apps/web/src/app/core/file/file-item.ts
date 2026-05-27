export interface FileItem {
  id: number;
  name: string;
  children?: FileItem[];
}
