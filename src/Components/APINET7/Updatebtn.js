import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({ data, setProductData, productId }) {
  console.log("data", data);
  console.log("productId", productId);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editData, setEditData] = React.useState(
    data.find((item, index) => {
      return item.id === productId;
    })
  );
  const [name, setName] = useState(editData.name);
  const [firstName, setFirstName] = useState(editData.firstName);
  const [lastName, setLastName] = useState(editData.lastName);
  const [place, setPlace] = useState(editData.place);

  console.log("editData", editData);

  const handleNameChange = (event) => {
    setName((editData.name = event.target.value));
  };
  const handleFirstNameChange = (event) => {
    setFirstName((editData.firstName = event.target.value));
  };
  const handleLastNameChange = (event) => {
    setLastName((editData.lastName = event.target.value));
  };
  const handlePlaceChange = (event) => {
    setPlace((editData.place = event.target.value));
  };
  const updateProduct = () => {
    axios
      .put(`${process.env.REACT_APP_LINK}/${productId}`, editData)
      .then((response) => {
        if (response.status === 200) {
          setProductData((prevProductData) =>
            prevProductData.map((item) =>
              item.id === productId ? editData : item
            )
          );
          handleClose();
        }
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "30px" }}
            >
              Update a Hero
            </Typography>

            <TextField
              fullWidth
              label="Name"
              id="name"
              value={editData.name}
              onChange={handleNameChange}
              sx={{ marginBottom: "30px" }}
            />
            <TextField
              fullWidth
              label="First Name"
              id="firstName"
              value={editData.firstName}
              onChange={handleFirstNameChange}
              sx={{ marginBottom: "30px" }}
            />
            <TextField
              fullWidth
              label="Last Name"
              id="lastName"
              value={editData.lastName}
              onChange={handleLastNameChange}
              sx={{ marginBottom: "30px" }}
            />
            <TextField
              fullWidth
              label="Place"
              id="place"
              value={editData.place}
              onChange={handlePlaceChange}
              sx={{ marginBottom: "30px" }}
            />

            <div style={{ display: "flex", gap: 10, float: "right" }}>
              <Button
                style={{ backgroundColor: "red" }}
                size="medium"
                variant="contained"
              >
                Cancel
              </Button>
              <Button variant="contained" size="medium" onClick={updateProduct}>
                Save
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
