import React from "react";
import { Button } from "@mui/material";
import axios from "axios";

const Deletebtn = ({ productId, setProductData }) => {
  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_LINK}/${productId}`)

      .then((response) => {
        if (response.status === 200) {
          setProductData((prev) =>
            prev.filter((item) => item.id !== productId)
          );
        }
      })
      .catch((error) => {});
  };
  return (
    <div>
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default Deletebtn;
