import type { tagStyles } from "./tagStyles";

export type TagColor = keyof typeof tagStyles;

export type PrincipalTag = {
  id: string;
  label: string;
  color: TagColor;
};

export type SecondaryTag = {
  id: string;
  label: string;
  parentId: string;
  color: TagColor;
};