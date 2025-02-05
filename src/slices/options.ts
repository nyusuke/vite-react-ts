import { createSlice } from "@reduxjs/toolkit";
import axios from "../lib/axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk } from "../store";

interface OptionsState {
  isLoaded: boolean;
  organization: string[];
}

const initialState: OptionsState = {
  isLoaded: false,
  organization: [],
};

const slice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    getBoard(
      state: OptionsState,
      action: PayloadAction<{ organization: string[] }>
    ): void {
      const { organization } = action.payload;
      state.organization = organization;
      state.isLoaded = true;
    },
  },
});

export const { reducer } = slice;

export const getBoard =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    const response = await axios.get<{ organization: string[] }>(
      "/api/options/organization"
    );

    dispatch(slice.actions.getBoard(response.data));
  };

export default slice;
