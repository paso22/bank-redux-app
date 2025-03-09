import {applyMiddleware, combineReducers, createStore} from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";
import {configureStore} from "@reduxjs/toolkit";

//OLD WAY :

// const rootReducer = combineReducers({
//     customer: customerReducer,
//     account: accountReducer
// });
// createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

//NEW WAY - with RTK :
const store = configureStore({
    reducer: {
        customer: customerReducer,
        account: accountReducer
    }
})

export default store;
