import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  FormControl,
  OutlinedInput,
  useFormControl,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Deletebtn from "./Deletebtn";
import Updatebtn from "./Updatebtn";
import Createbtn from "./Createbtn";
import FormHelperText from "@mui/material/FormHelperText";
import SelectName from "./SelectName";
function MyFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {}, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

export default function DenseTable() {
  const [data, setProductData] = useState([]);
  const [resetKey, setResetkey] = useState(1);
  const getAllProducts = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_LINK);
      setProductData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const [searchVal, setSearchVal] = useState("");

  const getAllProductsByName = async (searchVal) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LINK_SEARCH_NAME}name=${searchVal}`
      );

      setProductData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          sx={{ margin: 3, height: "44.5px" }}
          variant="contained"
          onClick={getAllProducts}
        >
          Show my record
        </Button>
        <Createbtn
          setResetkey={setResetkey}
          data={data}
          setProductData={setProductData}
        />
        <div style={{ marginLeft: "70px" }}>
          <FormControl sx={{ width: "25ch" }}>
            <OutlinedInput
              placeholder="Please enter text"
              onChange={(e) => {
                if (e.target.value === "") {
                  getAllProducts();
                }
                setSearchVal(e.target.value);
              }}
            />
            <MyFormHelperText />
          </FormControl>
        </div>
        <Button
          style={{ height: "56px", backgroundColor: "orangered" }}
          variant="contained"
          size="large"
          onClick={() => getAllProductsByName(searchVal)}
        >
          Search
        </Button>
        <SelectName setProductData={setProductData} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 260 }} size="small" aria-label="a dense table">
          <TableHead style={{ backgroundColor: "gray", height: "30px" }}>
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">First name&nbsp;</TableCell>
              <TableCell align="center">Last name&nbsp;</TableCell>
              <TableCell align="center">Place&nbsp;</TableCell>
              <TableCell align="center">Action&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.firstName}</TableCell>
                <TableCell align="center">{row.lastName}</TableCell>
                <TableCell align="center">{row.place}</TableCell>
                <TableCell
                  align="center"
                  style={{ display: "flex", justifyContent: "center", gap: 10 }}
                >
                  <Deletebtn
                    productId={row.id}
                    setResetkey={setResetkey}
                    setProductData={setProductData}
                  />

                  <Updatebtn
                    productId={row.id}
                    data={data}
                    setProductData={setProductData}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
