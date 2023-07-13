import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { Popconfirm } from "antd";

const Deletebtn = ({ productId, setProductData, setResetkey }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_LINK}/${productId}`
      );
      if (response.status === 200) {
        setProductData((prev) => prev.filter((item) => item.id !== productId));
        setResetkey((prev) => prev + 1);
      }
    } catch (error) {}
  };

  return (
    <div>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        okText="Yes"
        cancelText="No"
        onConfirm={handleDelete}
      >
        <Button style={{ backgroundColor: "red", color: "white" }}>
          Delete
        </Button>
      </Popconfirm>
    </div>
  );
};

export default Deletebtn;
