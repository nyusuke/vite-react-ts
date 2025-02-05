// Basic
// ========================================
export type SelectOption<T = string> = {
  label: string;
  value: T;
};

// https://stackoverflow.com/questions/56006111/is-it-possible-to-define-a-non-empty-array-type-in-typescript
export type NonEmptyArray<T> = [T, ...T[]];
// https://qiita.com/uhyo/items/583ddf7af3b489d5e8e9
export type RequireOne<T, K extends keyof T = keyof T> = K extends keyof T
  ? PartialRequire<T, K>
  : never;
type PartialRequire<O, K extends keyof O> = {
  [P in K]-?: O[P];
} & O;

// Async
// ========================================
export type CommonlyUsedState = {
  isLoading: boolean;
  hasError: boolean;
  message: string | undefined;
};

export type CommonType = {
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
};

export type ErrorResponse = Error & {
  statusCode?: number;
  message: string;
};

// Redux
// ========================================

// https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
export interface RejectedWithValueAction<ThunkArg, RejectedValue> {
  type: string;
  payload: RejectedValue;
  error: { message: "Rejected" };
  meta: {
    requestId: string;
    arg: ThunkArg;
    aborted: boolean;
  };
}
