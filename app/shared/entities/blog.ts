export interface BlogParams {
  params: {
    id: string;
  };
}

export interface BlogEntity {
  src: string;
  id: string;
  base64: string;
}

export type BlogEntities = BlogEntity[];
