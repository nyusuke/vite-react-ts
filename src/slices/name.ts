import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import nameAPI from "src/api/nameAPI";
import getAsyncErrorMessage from "src/utils/getAsyncErrorMessage";
import { GENERAL_ERROR_MESSAGE } from "src/constants";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk, RootState } from "src/store";
import type { AxiosError } from "axios";
import type {
  CommonlyUsedState,
  RejectedWithValueAction,
} from "src/types/common";
import type { NameType } from "src/types/name";

// ADAPTER
// ================================================================================

// Adapter Example
// https://redux-toolkit.js.org/api/createEntityAdapter#examples
// Adapter Related Types
// https://redux-toolkit.js.org/api/createEntityAdapter#return-value
const namesAdapter = createEntityAdapter<NameType>({
  selectId: (data) => data.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// SLICE
// ================================================================================

const initialAsyncState: CommonlyUsedState = {
  isLoading: false,
  hasError: false,
  message: undefined,
};

const slice = createSlice({
  name: "name",
  initialState: namesAdapter.getInitialState(initialAsyncState),
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
  },

  extraReducers: (builder) => {
    builder
      // Get Names
      // ----------------------------------------
      .addCase(getNames.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getNames.fulfilled, (state, action) => {
        state.isLoading = false;
        namesAdapter.setAll(state, action.payload);
      })
      .addCase(getNames.rejected, (state, action) => {
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

export const getNames = createAsyncThunk(
  "name/getNames",
  async (_, thunkAPI) => {
    try {
      const response = await nameAPI.getNames();
      return response.data;
    } catch (err) {
      const message: string = getAsyncErrorMessage(
        err as Error | AxiosError<NameType, any>
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// SELECTOR
// ================================================================================

export const nameSelectors = namesAdapter.getSelectors<RootState>(
  (state) => state.name
);
