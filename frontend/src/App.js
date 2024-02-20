import { Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <div>
      <Route path="/" component={Homepage} exact />
      {/* { <Route path='/chats' />} */}
    </div>
  );
}

export default App;
