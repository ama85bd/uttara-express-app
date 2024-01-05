import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMerchantRegister } from '../../models/user';
import Auth from '../../api/auth';

interface MerchantRegisterState {
  merchantRegister: IMerchantRegister | null;
  status: string;
}

const initialState: MerchantRegisterState = {
  merchantRegister: null,
  status: 'idle',
};

export const merchantRegisterAsync = createAsyncThunk<
  IMerchantRegister,
  { user: IMerchantRegister }
>('merchantRegister/merchantRegisterAsync', async ({ user }) => {
  try {
    return await Auth.merchantRegister(user);
  } catch (error) {
    console.log(error);
  }
});

export const changePasswordSlice = createSlice({
  name: 'merchantRegister',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(merchantRegisterAsync.pending, (state, action) => {
      console.log(action);
      console.log('action.payload pending', action.payload);
      state.status = 'pendingChangePassword';
    });
    builder.addCase(merchantRegisterAsync.fulfilled, (state, action) => {
      state.merchantRegister = action.payload;
      console.log('action.payload', action.payload);
      state.status = 'idle';
    });
    builder.addCase(merchantRegisterAsync.rejected, (state, action) => {
      state.status = 'idle';
      console.log('action.payload reject', action.payload);
    });
  },
});
