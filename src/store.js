import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/User";
import { addressReducer } from "./Reducers/Address";
import { productReducer } from "./Reducers/Product";
import { reviewReducer } from "./Reducers/Review";
import { cartreducer } from "./Reducers/Cart";
import { orderReducer } from "./Reducers/Order";
import { invoiceReducer } from "./Reducers/Invoice";
import { adminImgReducer } from "./Reducers/AdminImg";

const store=configureStore({
    reducer:{
        user:userReducer,
        address:addressReducer,
        product:productReducer,
        review:reviewReducer,
        cart:cartreducer,
        order:orderReducer,
    
        invoice:invoiceReducer,
        adminImg:adminImgReducer
    }
})

export default store