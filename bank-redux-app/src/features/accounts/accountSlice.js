const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
};

export default function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposit" :
            return {
                ...state,
                balance: state.balance + action.payload,
                isLoading: false
            }
        case "account/withdraw" :
            return {
                ...state,
                balance: state.balance - action.payload
            }
        case "account/requestLoan" :
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.loanPurpose,
                balance: state.balance + action.payload.amount
            }
        case "account/payLoan" :
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan
            }
        case "account/convertingCurrency" :
            return {
                ...state,
                isLoading: true
            }

        default :
            return state;
    }
}

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

export function withdraw(amount) {
    return {type: "account/withdraw", payload: amount};
}

export function requestLoan(amount, purpose) {
    return {type: "account/requestLoan", payload: {amount: amount, loanPurpose: purpose}};
}

export function payLoan() {
    return {type: "account/payLoan"};
}