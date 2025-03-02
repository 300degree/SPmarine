import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import { ErrorResponse, ErrorResponseSchema, PlansResponse } from '../../types';

type PlansState = {
  result: PlansResponse[] | undefined;
  isPending: boolean;
  isError: boolean;
  error: ErrorResponse | undefined;
};

const initialState: PlansState = {
  result: undefined,
  isPending: true,
  isError: false,
  error: undefined,
};

export const plansAsync = createAsyncThunk<
  PlansResponse[],
  void,
  { rejectValue: ErrorResponse }
>('plans/plansAsync', async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get<PlansResponse[]>(
      `https://67b086673fc4eef538e7a359.mockapi.io/orders`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const parsedError = ErrorResponseSchema.safeParse(error.response.data);
      if (parsedError.success) {
        return rejectWithValue(parsedError.data);
      } else {
        return rejectWithValue({
          message: 'Unexpected error format',
          statusCode: 500,
          error: null,
        });
      }
    }
    return rejectWithValue({
      message: 'Network or unexpected error',
      statusCode: 500,
      error: null,
    });
  }
});

const plansSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      plansAsync.fulfilled,
      (
        state: PlansState,
        action: PayloadAction<PlansResponse[] | undefined>,
      ) => {
        state.result = action.payload;
        state.error = undefined;
        state.isError = false;
        state.isPending = false;
      },
    );
    builder.addCase(plansAsync.pending, (state: PlansState) => {
      state.result = undefined;
      state.isError = false;
      state.isPending = true;
      state.error = undefined;
    });
    builder.addCase(
      plansAsync.rejected,
      (state: PlansState, action: PayloadAction<ErrorResponse | undefined>) => {
        state.result = undefined;
        state.isError = false;
        state.isPending = false;
        state.error = action.payload as ErrorResponse;
      },
    );
  },
});

export const {} = plansSlice.actions;
export const plansSelector = (store: RootState) => store.plansReducer;
export default plansSlice.reducer;
