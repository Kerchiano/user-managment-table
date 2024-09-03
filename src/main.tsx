import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import UserTable from "./features/UserTable";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <UserTable />
    </Provider>
);
