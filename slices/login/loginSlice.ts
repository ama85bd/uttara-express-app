import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ILoginCredential, IUserLogin } from '../../models/user';
import Auth from '../../api/auth';

interface LoginState {
  loginCredential: ILoginCredential | null;
  status: string;
  isAuthenticated: boolean;
}

const initialState: LoginState = {
  loginCredential: null,
  status: 'idle',
  isAuthenticated: false,
};

export const loginUser = createAsyncThunk<ILoginCredential, IUserLogin>(
  'login/loginUser',
  async (data, thunkAPI) => {
    try {
      const response = await Auth.loginUser(data);
      // const user = response.result;

      return response;
    } catch (error: any) {
      console.log('thunk error', error);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    signOut: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      console.log('action loging', action);
      console.log('state loging', state);
      state.status = 'pendingUserRegister';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log('action loging fulfilled', action);
      state.loginCredential = action.payload;
      state.status = 'idle';
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      // console.log('state loging rejected', state);
      console.log('action loging rejected', action);
      // showToast('error', 'Rejected!');
      throw action.payload;
    });
  },
});

export const { signOut } = loginSlice.actions;
