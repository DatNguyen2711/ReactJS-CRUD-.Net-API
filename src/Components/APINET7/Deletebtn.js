import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { Popconfirm } from "antd";

const Deletebtn = ({ productId, setProductData }) => {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const handleDelete = () => {
    setConfirmVisible(true); 

  };

  const handleConfirmDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_LINK}/${productId}`)
      .then((response) => {
        if (response.status === 200) {
          setProductData((prev) =>
            prev.filter((item) => item.id !== productId)
          );
        }
      })
      .catch((error) => {
        // Xử lý lỗi (nếu cần)
      });

    setConfirmVisible(false); // Ẩn Popconfirm
  };

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete
      </Button>

      <Popconfirm
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmVisible(false)}
        title="Delete the hero"
        description="Are you sure to delete this Hero?"
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete</Button>
      </Popconfirm>
    </div>
  );
};

export default Deletebtn;
