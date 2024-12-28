export interface CatEntity {
  url: string;
  id: string;
  base64: string;
  width: number;
  height: number;
}

export type CatEntities = CatEntity[];
