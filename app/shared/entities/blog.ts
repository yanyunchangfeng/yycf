export interface BlogParams {
  params: {
    id: string;
  };
}

export interface BlogEntity {
  url: string;
  id: string;
  base64: string;
}

export type BlogEntities = BlogEntity[];
