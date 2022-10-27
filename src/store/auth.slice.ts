import { createSlice } from "@reduxjs/toolkit";
import { User } from "screens/projec-list/search-panel";
import * as auth from 'auth-provider' // 引入交易相关的方法
import { AuthForm, bootstrapUser } from "context/auto-context";
import { AppDispatch, RootState } from "store";

// 鉴权相关，也就是保存user
interface State {
  user: User | null
}

const initialState: State = {
  user: null
}

export const authSlice = createSlice( {
  name: 'auth',
  initialState,
  reducers: {
    setUser(state,action) {
      state.user = action.payload
    }
  }
})

// actionCreator
export const {setUser} = authSlice.actions

// selector
export const selecUser = (state:RootState) => state.auth.user

// thunk
export const login =  (form: AuthForm) => (dispatch: AppDispatch) => auth.login(form).then(user => dispatch(setUser(user)));
export const register = (form :AuthForm) => (dispatch: AppDispatch) => auth.register(form).then(user => dispatch(setUser(user)))
export const logout = () => (dispatch: AppDispatch) => auth.logout().then(() => dispatch(setUser(null)));
export const bootstrap = () => (dispatch: AppDispatch) => bootstrapUser().then(user => dispatch(setUser(user)))