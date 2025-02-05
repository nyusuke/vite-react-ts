import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import organizationAPI from "src/api/organizationAPI";
import getAsyncErrorMessage from "src/utils/getAsyncErrorMessage";
import { GENERAL_ERROR_MESSAGE } from "src/constants";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk, RootState } from "src/store";
import type { AxiosError } from "axios";
import type {
  CommonlyUsedState,
  RejectedWithValueAction,
} from "src/types/common";
import type { OrganizationType } from "src/types/organization";

// ADAPTER
// ================================================================================

// Adapter Example
// https://redux-toolkit.js.org/api/createEntityAdapter#examples
// Adapter Related Types
// https://redux-toolkit.js.org/api/createEntityAdapter#return-value
const organizationAdapter = createEntityAdapter<OrganizationType>({
  selectId: (data) => data.id,
  sortComparer: (a, b) => a.division.localeCompare(b.division),
});

// SLICE
// ================================================================================

const initialAsyncState: CommonlyUsedState = {
  isLoading: false,
  hasError: false,
  message: undefined,
};

const slice = createSlice({
  name: "organization",
  initialState: organizationAdapter.getInitialState(initialAsyncState),
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

    setMessage(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.message = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Get Organizations
      // ----------------------------------------
      .addCase(getOrganizations.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrganizations.fulfilled, (state, action) => {
        state.isLoading = false;
        organizationAdapter.setAll(state, action.payload);
      })
      .addCase(getOrganizations.rejected, (state, action) => {
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

export const getOrganizations = createAsyncThunk(
  "organization/getOrganizations",
  async (_, thunkAPI) => {
    try {
      const response = await organizationAPI.getOrganizations();
      return response.data;
    } catch (err) {
      const message: string = getAsyncErrorMessage(
        err as Error | AxiosError<OrganizationType, any>
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// SELECTOR
// ================================================================================

export const organizationSelectors =
  organizationAdapter.getSelectors<RootState>((state) => state.organization);
