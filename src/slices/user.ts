import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import userAPI from "src/api/userAPI";
import getAsyncErrorMessage from "src/utils/getAsyncErrorMessage";
import { GENERAL_ERROR_MESSAGE } from "src/constants";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk, RootState } from "src/store";
import type { AxiosError } from "axios";
import type {
  CommonlyUsedState,
  RejectedWithValueAction,
} from "src/types/common";
import type { UserType } from "src/types/user";

// ADAPTER
// ================================================================================

// Adapter Example
// https://redux-toolkit.js.org/api/createEntityAdapter#examples
// Adapter Related Types
// https://redux-toolkit.js.org/api/createEntityAdapter#return-value
const usersAdapter = createEntityAdapter<UserType>({
  selectId: (data) => data.id,
  sortComparer: (a, b) => a.firstName.localeCompare(b.firstName),
});

// SLICE
// ================================================================================

const initialAsyncState: CommonlyUsedState = {
  isLoading: false,
  hasError: false,
  message: undefined,
};

const slice = createSlice({
  name: "user",
  initialState: usersAdapter.getInitialState(initialAsyncState),
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.hasError = true;
      state.message = action.payload;
    },

    resetMessage(state) {
      state.isLoading = false;
      state.hasError = false;
      state.message = undefined;
    },

    setMessage(state, action: PayloadAction<string>): void {
      state.isLoading = false;
      state.message = action.payload;
    },

    updateGrid(state, action: PayloadAction<UserType[]>): void {
      usersAdapter.setAll(state, action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      // Get Users
      // ----------------------------------------
      .addCase(getUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        usersAdapter.setAll(state, action.payload);
      })
      .addCase(getUsers.rejected, (state, action) => {
        // console.log(action);
        // actionはwithValueでpayloadがある
        const rejectedWithValueAction = action as RejectedWithValueAction<
          undefined,
          string
        >;
        const message: string =
          rejectedWithValueAction.payload !== ""
            ? rejectedWithValueAction.payload
            : GENERAL_ERROR_MESSAGE;
        state.isLoading = false;
        state.hasError = true;
        state.message = message;
      });
  },
});

export const { reducer } = slice;

// Thunk
// ================================================================================

export const resetMessage =
  (): AppThunk =>
  (dispatch): void => {
    dispatch(slice.actions.resetMessage());
  };

export const updateGrid =
  (users: UserType[]): AppThunk =>
  (dispatch): void => {
    dispatch(slice.actions.updateGrid(users));
  };

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkAPI) => {
    try {
      const response = await userAPI.getUsers();
      return response.data;
    } catch (err) {
      const message: string = getAsyncErrorMessage(
        err as Error | AxiosError<UserType, any>
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// SELECTOR
// ================================================================================

export const userSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.user
);
