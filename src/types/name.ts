export type NameType = {
  id: string;
  name: string;
  category: string[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};

export interface NameState {
  isLoading: boolean;
  hasError: boolean;
  message: string | undefined;
  // names: NameType[] | undefined;
  // name: NameType | undefined;
}
