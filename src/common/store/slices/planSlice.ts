import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import { ErrorResponse, ErrorResponseSchema, PlansResponse } from '../../types';

type PlanState = {
  result: PlansResponse | undefined;
  isPending: boolean;
  isError: boolean;
  error: ErrorResponse | undefined;
};

const initialState: PlanState = {
  result: undefined,
  isPending: true,
  isError: false,
  error: undefined,
};

export const planAsync = createAsyncThunk<
  PlansResponse,
  { id: string },
  { rejectValue: ErrorResponse }
>(
  'plans/plansAsync',
  async ({ id }: { id: string }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get<PlansResponse>(
        `https://67b086673fc4eef538e7a359.mockapi.io/orders/${id}`,
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
  },
);

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      planAsync.fulfilled,
      (state: PlanState, action: PayloadAction<PlansResponse | undefined>) => {
        state.result = action.payload;
        state.error = undefined;
        state.isError = false;
        state.isPending = false;
      },
    );
    builder.addCase(planAsync.pending, (state: PlanState) => {
      state.result = undefined;
      state.isError = false;
      state.isPending = true;
      state.error = undefined;
    });
    builder.addCase(
      planAsync.rejected,
      (state: PlanState, action: PayloadAction<ErrorResponse | undefined>) => {
        state.result = undefined;
        state.isError = false;
        state.isPending = false;
        state.error = action.payload as ErrorResponse;
      },
    );
  },
});

export const {} = planSlice.actions;
export const planSelector = (store: RootState) => store.planReducer;
export default planSlice.reducer;
