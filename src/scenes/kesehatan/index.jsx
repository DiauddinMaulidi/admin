import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import DownloadOptions from "../../components/DownloadOptions";
import { useNavigate } from "react-router-dom";

export default function Kesehatan() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/kesehatan/admin");

      const formatted = res.data.map((item, index) => ({
      id: item.id,
      no: index + 1,
      jenis_kesehatan: item.jenis_data,
      nama_dusun: item.nama_dusun,
      jumlah: item.total
    }));

      setRows(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteData = async (id) => {
      await axios.delete(`http://localhost:5000/kesehatan/${id}`);
      loadData();
    };

  useEffect(() => {
    loadData();
  }, []);

  const filteredRows = rows.filter((row) =>
    row.jenis_kesehatan.toLowerCase().includes(search.toLowerCase()) ||
    row.nama_dusun.toLowerCase().includes(search.toLowerCase()) ||
    String(row.jumlah).includes(search)
  );

  const columns = [
    {
      field: "no",
      headerName: "No",
      width: 70,
      sortable: false,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1
    },
    {
      field: "aksi",
      headerName: "AKSI",
      width: 180,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => navigate(`/kesehatan/edit/${params.row.id}`)}
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

          <button
            onClick={() => deleteData(params.row.id)}
            style={{
              background: "#e74c3c",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              border: "none",
            }}
          >
            Hapus
          </button>
        </div>
      ),
    },
    {
      field: "jenis_kesehatan",
      headerName: "Jenis Kesehatan",
      width: 350
    },
    {
      field: "nama_dusun",
      headerName: "Nama Dusun",
      width: 350
    },
    {
      field: "jumlah",
      headerName: "Jumlah",
      width: 200
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Data Kesehatan Desa Tembeng Putik</h2>
      <button
          onClick={() => navigate("/kesehatan/tambah")}
          style={{
            background: "green",
            color: "#fff",
            padding: "8px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "none",
          }}
        >
          Tambah Data
        </button>

      {/* SEARCH & DOWNLOAD */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 15
        }}
      >
        <input
          type="text"
          placeholder="Cari jenis kesehatan / dusun..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: 8,
            width: 300,
            borderRadius: 5,
            border: "1px solid #ccc"
          }}
        />

        <DownloadOptions data={filteredRows} />
      </div>

      {/* DATAGRID */}
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0
              }
            }
          }}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}
