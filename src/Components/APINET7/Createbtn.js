import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const Createbtn = ({ data, setProductData, setResetkey }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const buttonStyle = {
    backgroundColor: "green",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [place, setPlace] = useState("");

  const createProduct = async () => {
    const productData = {
      name: name,
      firstname: firstName,
      lastname: lastName,
      place: place,
    };

    // Cách thứ nhất để kiểm tra thuộc tính null, rỗng, undefined của đối tượng
    // const checkProperties = (productData) => {
    //   for (let key in productData) {
    //     if (productData[key] === "") {
    //       return false;
    //     }
    //   }
    //   return true;
    // };

    // Cách thứ hai để kiểm tra thuộc tính null, rỗng, undefined của đối tượng
    const checkProperties = (productData) => {
      return Object.values(productData).every((value) => value !== "");
    };

    try {
      if (checkProperties(productData)) {
        const response = await axios.post(
          process.env.REACT_APP_LINK,
          productData
        );

        if (response.status === 200) {
          const response = await axios.get(process.env.REACT_APP_LINK);
          setProductData(response.data);
        }
        setResetkey(prev => prev+1)
        return response.data;
      } else {
        alert("mày điền thiếu rồi");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button style={buttonStyle} onClick={handleOpen}>
        Create a hẻo
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Create a hẻo
          </Typography>
          <TextField
            sx={{ marginBottom: "30px", width: "530px" }}
            id="standard-basic"
            label="Name"
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: "30px", width: "530px" }}
            id="standard-basic"
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            variant="standard"
          />
          <TextField
            sx={{ marginBottom: "30px", width: "530px" }}
            id="standard-basic"
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            variant="standard"
          />
          <TextField
            sx={{ marginBottom: "30px", width: "530px" }}
            id="standard-basic"
            label="Place"
            onChange={(e) => setPlace(e.target.value)}
            variant="standard"
          />
          <div style={{ display: "flex", gap: 10, float: "right" }}>
            <Button
              style={{ backgroundColor: "red" }}
              onClose={handleClose}
              variant="contained"
            >
              Cancel
            </Button>

            <Button
              open={open}
              onClose={handleClose}
              variant="contained"
              onClick={createProduct}
            >
              Create
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Createbtn;
