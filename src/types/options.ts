export type OptionsType<T = string, U = string> = {
  code: T;
  nameJapanese: string;
  nameEnglish?: string;
  children?: OptionsType<U>[];
};

export interface OptionsState {
  isLoading: boolean;
  hasError: boolean;
  serverMessage: string;
  organizationBase: OptionsType[];
}
