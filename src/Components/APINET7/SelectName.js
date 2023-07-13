import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({
  data,
  setProductData,
  setResetkey,
}) {
  const [personName, setPersonName] = useState([]);
  const [names, setNames] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const getAllProductsName = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_LINK);
      const apiData = response.data;
      const apiNames = apiData.map((item) => item.name);
      setNames(apiNames);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProductsName();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? [value] : value);
    setSelectedValues(value);
    FilterByname(value);
  };

  const FilterByname = async (selectedValues) => {
    const response = await axios.post(
      process.env.REACT_APP_LINK_SEARCH_NAMELIST,
      selectedValues
    );
    setProductData(response.data);
    return response.data;
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
