import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { dispatch } from "../store";

const initialState = {
    isLoading: false,
    error: null,
    productAll: [],
    productEdit: null
}

const slice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        startLoading(state){
            state.isLoading = true;
        },
        hasError(state, action){
            state.isLoading = false;
            state.error = action.payload;
        },
        getAllProducts(state, action){
            state.isLoading = false;
            const productAll = action.payload;
            state.productAll = productAll
        },
        getProduct(state, action){  
            state.isLoading = false;
            const productEdit = action.payload;
            state.productEdit = productEdit;
        }
    }
});

export default slice.reducer;

export const {
    getAllProducts,
    getProduct
} = slice.actions;

export function                 getProductAll(){
    return async () => {
        dispatch(slice.actions.startLoading());
        try{
            const response = await axios.get('/products');
            dispatch(slice.actions.getAllProducts(response.data)); 
        }
        catch(error){
            dispatch(slice.actions.hasError(error));
        }
    }
}

export function getPruductDetail(ID){
    return async () => {
        dispatch(slice.actions.startLoading());
        try{
            const response = await axios.get(`product/${ID}`);
            dispatch(slice.actions.getProduct(response.data));
        }
        catch(error){
            dispatch(slice.actions.hasError(error));
        }
    }
}