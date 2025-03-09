import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {amount, purpose}
                };
            },

            reducer(state, action) {
                if (state.loan > 0)
                    return;

                state.loan += action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance += action.payload;
            }
        },
        payLoan(state, action) {
            state.balance -= state.loan;
            state.loan = "";
            state.purpose = "";
        },
        convertingCurrency(state, action) {
            state.isLoading = true
        }
    }
});

export const {withdraw, payLoan, requestLoan} = accountSlice.actions;

export function deposit(amount, currency) {
    if (currency === "USD") {
        return {type: "account/deposit", payload: amount};
    }

    return async function (dispatch, getState) {
        dispatch({type: "account/convertingCurrency"});

        const res = await fetch(`SOME_EXCHANGE_API_URL?amount=${amount}&currency=${currency}`);
        const data = await res.json();
        const convertedAmount = data.converted.amount; // assume api returns in that structure

        return dispatch({type: "account/deposit", payload: convertedAmount});
    }
}

export default accountSlice.reducer;