import React from "react";
import "./global.styles/App.scss";

// router
import { BrowserRouter } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import store from "./redux/store";

// components
import Navbar from "./components/navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <div className="App">
          <AppRoutes />
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
