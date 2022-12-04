import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Icon from "@mui/material/Icon";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Headers";
// import { abc } from "../../mockData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { CleaningServices } from "@mui/icons-material";

const Watchlist = () => {
  const { user } = useAuthContext();
  const history = useNavigate();

  
  const [abc, setAbc] = useState([]);
  const [rows, setRows] = useState([]);

 
  const url = "http://localhost:8080/temp/".concat(user.id);
  console.log(url);

  let temp = [];
  async function fetchData() {
    await fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setAbc(response);
      });
    console.log(abc);
    for (var key in abc) {
      if (!abc.hasOwnProperty(key)) continue;
      let newData = [];
      const url = "https://finnhub.io/api/v1/quote?symbol=".concat(
        abc[key].symbol,
        "&token=c94i99aad3if4j50rvn0"
      );
      await axios
        .get(url)
        .then((res) => {
          const pData = res.data;
          newData.push(pData);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(newData);

      const ab = {
        id: abc[key].symbol,
        name: abc[key].name,
        symbol: abc[key].symbol,
        today: newData[0]["c"],
        Percent: newData[0]["dp"],
      };
      // console.log(pData[key].name)
      temp.push(ab);
    }
    setRows(temp);
  }

  useEffect(() => {
    fetchData();
  }, [rows]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "name",
      headerName: " Company Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "symbol",
      headerName: "Symbol",
      flex: 0.5,
      cellClassName: "symbol-column--cell",
    },
    {
      field: "today",
      headerName: "Today",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Percent",
      headerName: "Percent",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Buy",
      headerName: "Buy",
      sortable: false,
      renderCell: (params) => {
       
        const Add = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          //console.log(thisRow)
          //     history('/addStock',{state:thisRow});
          return;
        };

        return (
          <Button onClick={Add} variant="contained" color="success">
            Buy
          </Button>
        );
      },
    },
    {
      field: "Sell",
      headerName: "Sell",
      sortable: false,
      renderCell: (params) => {
        const Remove = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          return alert(JSON.stringify(thisRow.name, null, 4));
          return;
        };

        return (
          <Button onClick={Remove} variant="outlined" color="error">
            Sell
          </Button>
        );
      },
    },

    {
      field: "Delete",
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => {
        const Delete = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          return alert(JSON.stringify(thisRow.name, null, 4));
        };

        return <DeleteIcon onClick={Delete}></DeleteIcon>;
      },
    },
    {
      field: "Details",
      headerName: "Details",
      sortable: false,
      renderCell: (params) => {
        const Details = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          console.log(thisRow);
          history("/details", { state: thisRow });
          return;
        };

        return <AddCircleOutlineIcon onClick={Details} ></AddCircleOutlineIcon>;
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Watchlist" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Watchlist;
