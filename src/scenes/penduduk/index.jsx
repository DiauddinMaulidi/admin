import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DownloadOptions from "../../components/DownloadOptions";



export default function Penduduk() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // LOAD DATA
  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/penduduk_tembeng");
    setData(res.data);
    setFilteredData(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const fixDate = (dateString) => {
    if (!dateString) return "-";
    return dateString.split("T")[0];
  };

  // SEARCH FILTER
  useEffect(() => {
    const result = data.filter((item) => {
      return (
        item["NAMA_LENGKAP"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["JENIS_KELAMIN"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["STATUS_PERKAWINAN"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["TEMPAT_LAHIR"]?.toLowerCase().includes(search.toLowerCase()) ||
        fixDate(item["TANGGAL_LAHIR"]).toLowerCase().includes(search.toLowerCase()) ||
        item["AGAMA"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["PENDIDIKAN_TERAKHIR"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["PEKERJAAN"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["KEWARGANEGARAAN"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["ALAMAT_LENGKAP"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["KEDUDUKAN_DALAM_KELUARGA"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["NIK"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["NOMOR_KK"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["KETERANGAN"]?.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredData(result);
  }, [search, data]);

  // DELETE DATA
  const deleteData = async (id) => {
    await axios.delete(`http://localhost:5000/penduduk_tembeng/${id}`);
    loadData();
  };

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
            onClick={() => navigate(`/edit/${params.row.id}`)}
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
      field: "NAMA_LENGKAP",
      headerName: "NAMA LENGKAP",
      width: 200,
    },
    { field: "JENIS_KELAMIN", headerName: "JENIS KELAMIN", width: 130 },
    { field: "STATUS_PERKAWINAN", headerName: "STATUS", width: 150 },
    { field: "TEMPAT_LAHIR", headerName: "TEMPAT LAHIR", width: 150 },
    {
      field: "TANGGAL_LAHIR",
      headerName: "TANGGAL_LAHIR",
      width: 130,
      valueFormatter: (params) => fixDate(params.value),
    },
    { field: "AGAMA", headerName: "AGAMA", width: 120 },
    {
      field: "PENDIDIKAN_TERAKHIR",
      headerName: "PENDIDIKAN",
      width: 160,
    },
    { field: "PEKERJAAN", headerName: "PEKERJAAN", width: 150 },
    { field: "KEWARGANEGARAAN", headerName: "KEWARGANEGARAAN", width: 150 },
    { field: "ALAMAT_LENGKAP", headerName: "ALAMAT LENGKAP", width: 250 },
    { field: "KEDUDUKAN_DALAM_KELUARGA", headerName: "KEDUDUKAN DALAM KELUARGA", width: 180 },
    { field: "NIK", headerName: "NIK", width: 180 },
    { field: "NOMOR_KK", headerName: "NOMOR KK", width: 180 },
    { field: "KETERANGAN", headerName: "KETERANGAN", width: 150 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Data Penduduk Tembeng Putik</h2>

      <div>
        <button
          onClick={() => navigate("/tambah")}
          style={{
            background: "green",
            color: "#fff",
            padding: "8px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "none",
          }}
        >
          Tambah Penduduk
        </button>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Cari warga..."
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

      </div>

      {/* DATA GRID */}
      <div style={{ height: 600, width: "100%", marginTop: "15px" }}>
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
