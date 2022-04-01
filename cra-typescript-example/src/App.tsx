import { Routes, Route} from "react-router-dom";
import MainPage from "./MainPage";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
