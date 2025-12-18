import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DownloadOptions from "../../components/DownloadOptions";


export default function Dusun() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();

  // LOAD DATA
  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/penduduk_tembeng/dusun");
    setData(res.data);
    setFilteredData(res.data);
  };

  useEffect(() => {
    loadData();
  }, [data]);

  // KOLOM UNTUK DATA GRID
  const columns = [
    { field: "id", headerName: "ID", width: 70 },

    {
      field: "aksi",
      headerName: "AKSI",
      width: 180,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => navigate(`/dusun/edit/${params.row.id}`)}
            style={{
              background: "#3498db",
              color: "#fff",
              padding: "5px 10px",
              marginRight: "5px",
              borderRadius: "5px",
              border: "none",
            }}
          >
            Edit
          </button>

        </div>
      ),
    },

    {
      field: "dusun",
      headerName: "NAMA DUSUN",
      width: 200,
    },
    { field: "kepala_dusun", headerName: "KEPALA DUSUN", width: 180 },
    { field: "nik", headerName: "NIK", width: 180 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Data Dusun Tembeng Putik</h2>

      <div style={{display: 'flex', justifyContent:'flex-end'}}>
        <DownloadOptions data={data} />
      </div>

      {/* DATA GRID */}
      <div style={{ height: 400, width: "100%", marginTop: "15px" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,  // default rows per page
                page: 0        // default halaman (opsional)
              }
            }
          }}
          checkboxSelection={false}
        />
      </div>

    </div>
  );
}
