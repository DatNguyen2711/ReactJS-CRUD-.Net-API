import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [user, SetUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      SetUser(currentUser);
      console.log(currentUser);
    });
    return () => unsubscribe();
  }, []);
  const logout = async () => {
    try {
      await signOut(auth);
      console.log("log out rồi nhé");
      navigate("/signup");

      SetUser({});
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleLogout = () => {};

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-4 text-center">Account</h2>

              <div
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "10px",
                  fontSize: "1.0rem",
                  fontWeight: "normal",
                }}
              >
                User email: {user?.email}
              </div>

              <MDBBtn
                size="lg"
                onClick={logout}
                style={{ backgroundColor: "#dc3545", color: "white" }}
              >
                Logout
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Account;
