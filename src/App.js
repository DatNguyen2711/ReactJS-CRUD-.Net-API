import { Route, Routes } from "react-router-dom";
import "./App.css";
// import LoginSignup from "./Components/APINET7/LoginSignup-firebaseAuth";
// import DenseTable from "./Components/APINET7/Manage";
import SignIn from "./Components/APINET7/SignIn";
import Account from "./Components/APINET7/Account";
import SignUp from "./Components/APINET7/SignUp";
import { AuthContextProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Components/APINET7/ProtectedRoutes";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
