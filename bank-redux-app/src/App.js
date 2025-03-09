import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import {useSelector} from "react-redux";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import AccountOperations from "./features/accounts/AccountOperations";

function App() {

    const customer = useSelector(store => store.customer.fullName);

    return (
        <div>
            <h1>🏦 The React-Redux Bank ⚛️</h1>
            {!customer &&
                <CreateCustomer/>}
            {customer &&
                <>
                    <Customer/>
                    <AccountOperations/>
                    <BalanceDisplay/>
                </>}
        </div>
    );
}

export default App;
