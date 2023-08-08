import {createRoot} from "react-dom/client";
import {MainView} from "./components/main-view/main-view";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "./redux/store";

// Main component (will eventually use all the others)
const ClassicFlixApplication = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Container>
          <MainView />
        </Container>
      </PersistGate>
    </Provider>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<ClassicFlixApplication />);
