import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  UserAll: [],
  UserEdit: null,
};

const slice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllUsers(state, action) {
      state.isLoading = false;
      const UserAll = action.payload;
      state.UserAll = UserAll;
    },
    getUser(state, action) {
      state.isLoading = false;
      const UserEdit = action.payload;
      state.UserEdit = UserEdit;
    },
  },
});

export default slice.reducer;

export const { getAllUsers, getUser } = slice.actions;

export function getUserAll() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/Users');
      dispatch(slice.actions.getAllUsers(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserDetail(ID) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`User/${ID}`);
      dispatch(slice.actions.getUser(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
