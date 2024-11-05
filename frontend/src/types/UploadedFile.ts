export type UploadedFile = {
  id: number;
  name: string;
  size: number;
  totalViews: number;
  user?: {
    username: string;
  };
  createdAt: string;
  tag: string;
};
