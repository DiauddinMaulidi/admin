import React from 'react'
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DownloadOptions from "../../components/DownloadOptions";
import { useState, useEffect } from 'react';

const Keluarga = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // LOAD DATA
  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/penduduk_tembeng/keluarga");
    setData(res.data.hasil);
    setFilteredData(res.data.hasil);
  };

  useEffect(() => {
    loadData();
  }, []);

  // SEARCH FILTER
  useEffect(() => {
    const result = data.filter((item) => {
      return (
        item["NOMOR_KK"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["NAMA_LENGKAP"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["NIK"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["JENIS_KELAMIN"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["ALAMAT_LENGKAP"]?.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredData(result);
  }, [search, data]);


  // KOLOM UNTUK DATA GRID
  const columns = [
    { field: "no", headerName: "NO", width: 70 },

    {
      field: "aksi",
      headerName: "AKSI",
      width: 180,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => navigate(`/keluarga/detail/${params.row.id}`)}
            style={{
              background: "#3498db",
              color: "#fff",
              padding: "5px 10px",
              marginRight: "5px",
              borderRadius: "5px",
              border: "none",
            }}
          >
            Detail
          </button>
        </div>
      ),
    },

    { field: "NOMOR_KK", headerName: "NOMOR KK", width: 180 },
    { field: "NAMA_LENGKAP", headerName: "KEPALA KELUARGA", width: 180 },
    { field: "NIK", headerName: "NIK", width: 150 },
    { field: "jumlah_anggota", headerName: "JUMLAH ANGGOTA", width: 180 },
    { field: "JENIS_KELAMIN", headerName: "JENIS KELAMIM", width: 130 },
    { field: "ALAMAT_LENGKAP", headerName: "ALAMAT LENGKAP", width: 250 },
  ];
  return (
    <div style={{ padding: "20px" }}>
      <h2>Data Keluarga</h2>

      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Cari KK..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginBottom: "10px",
            padding: "8px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <DownloadOptions data={data} />

      </div>

      {/* DATA GRID */}
      <div style={{ height: 600, width: "100%", marginTop: "15px" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          getRowId={(row) => row.no}
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
  )
}

export default Keluarga
