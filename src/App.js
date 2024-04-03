import Router from "./routes/router";
import { ToastContainer } from "react-toastify";

function App({ isApp = true }) {
  const Container = isApp ? "div" : "Fragment";
  return (
    <Container>
      <ToastContainer stacked />
      <Router />
    </Container>
  );
}

export default App;
