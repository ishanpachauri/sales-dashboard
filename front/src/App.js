import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { Maintemp } from './Components/Utils/Maintemp';
import { Dashboard } from "./Components/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
          <Route element={<Maintemp />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;