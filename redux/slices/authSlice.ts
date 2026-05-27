import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  pendingRoute: null,
  userName: '',
  idUser: '',
};

const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    saveInfoToken: (
      state,
      {payload}: PayloadAction<{userName: string; idUser: string}>,
    ) => {
      state.userName = payload.userName;
      state.idUser = payload.idUser;
    },
  },
});

export const {saveInfoToken} = authSlice.actions;

export default authSlice.reducer;
