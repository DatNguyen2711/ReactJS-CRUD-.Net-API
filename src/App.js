import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignup from "./Components/APINET7/LoginSignup-firebaseAuth";
import DenseTable from "./Components/APINET7/Manage";
import SignIn from "./Components/APINET7/SignIn";
import Account from "./Components/APINET7/Account";
import SignUp from "./Components/APINET7/SignUp";
import { AuthContextProvider } from "./Context/AuthContext";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/account" element={<Account />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
