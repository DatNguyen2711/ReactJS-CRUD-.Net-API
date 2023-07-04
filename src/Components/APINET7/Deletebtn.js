import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { Popconfirm } from "antd";
import styled, { createGlobalStyle } from "styled-components";
const Deletebtn = ({ productId, setProductData }) => {
  const [selectDelete, confirmDelete] = useState(false);
  const handleConfirmDelete = () => {
    confirmDelete(true); // Cập nhật trạng thái selectDelete thành true
    handleDelete(); // Gọi hàm xóa
  };
  const confirmDeletecss= {
    backgroundColor:"red",
    color:"white",
    width:"800px"
  };
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
      <Popconfirm
        sx={{ backgroundColor: "red" }}
        style={confirmDeletecss}
        title="Delete the task"
        description="Are you sure to delete this task?"
        okText="Yes"
        cancelText="No"
        onConfirm={handleConfirmDelete}
      >
        <Button danger>Delete</Button>
      </Popconfirm>
    </div>
  );
};

export default Deletebtn;
