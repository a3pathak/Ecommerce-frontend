import { createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axios';
import { dispatch } from "../store";

const initialState = {
    isLoading: false,
    error: null,
    users: [],
    userEdit: null
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        // START LOADING
        startLoading(state){
            state.isLoading = true;
        },

        // HAS ERROR
        hasError(state, action){
            state.isLoading = false;
            state.error = action.payload;
        },

        // GET ALL USER
        getAllUser(state, action){
            state.isLoading = false;
            const users = action.payload
            state.users = users;
        },
        
        // GET USER
        getUserData(state, action){
            state.isLoading = false;
            state.userEdit = action.payload
        }
    }
});

export default slice.reducer;

export const {
    getAllUser,
    getUserData
} = slice.actions;

export function getUserAll(){
    return async () => {
        dispatch(slice.actions.startLoading());
        try{
            const response = await axios.get('/users');
            dispatch(slice.actions.getAllUser(response.data));
        }
        catch(error){
            dispatch(slice.actions.hasError(error));
        }
    }
}
  

export function getUser(ID){
    return async () =>{
        dispatch(slice.actions.startLoading());
        try{
            const response = await axios.get(`/user/${ID}`);
            dispatch(slice.actions.getUserData(response.data));
        }
        catch(error){
            dispatch(slice.actions.hasError(error));
        }
    }
}