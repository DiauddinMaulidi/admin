import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

export default function CetakSurat() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "NO", width: 70 },
    {
      field: "aksi",
      headerName: "AKSI",
      width: 150,
      renderCell: (params) => (
        <div>
          <Button
            onClick={() => navigate(`/cetaksurat/cetak/${params.row.id}`)}
            style={{
              background: "#3498db",
              color: "#fff",
              padding: "5px 10px",
              marginRight: "5px",
              borderRadius: "5px",
              border: "none",
            }}
          >
            Cetak
          </Button>
        </div>
      ),
      sortable: false,
    },
    { field: "nama", headerName: "NAMA SURAT", width: 400 },
    { field: "kode", headerName: "KODE / KLASIFIKASI", width: 180 },
    { field: "lampiran", headerName: "LAMPIRAN", width: 250 },
  ];

  const rows = [
    { id: 1, nama: "Keterangan Kurang Mampu", kode: "S-21", lampiran: "" },
  ];

  return (
    <div className="datatable-wrapper px-4">
      <h3 className="title-dark">Daftar Jenis Surat</h3>

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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >

      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        sx={{
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
          backgroundColor: "transparent",
        }}
      />
    </Box>

    </div>
  );
}
