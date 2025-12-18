import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DownloadOptions from "../../components/DownloadOptions";



export default function Pendidikan() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // LOAD DATA
  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/pendidikan");
    setData(res.data);
    setFilteredData(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // SEARCH FILTER
  useEffect(() => {
    const result = data.filter((item) => {
      return (
        item["nama_sekolah"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["kepsek"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["total_siswa"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["total_laki"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["total_perempuan"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["status_sekolah"]?.toLowerCase().includes(search.toLowerCase()) ||
        item["jumlah_guru"]?.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredData(result);
  }, [search, data]);

  // DELETE DATA
  const deleteData = async (id) => {
    await axios.delete(`http://localhost:5000/pendidikan/${id}`);
    loadData();
  };

  // KOLOM UNTUK DATA GRID
  const columns = [
    { field: "id", headerName: "NO", width: 70 },

    {
      field: "aksi",
      headerName: "AKSI",
      width: 180,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => navigate(`/pendidikan/edit/${params.row.id}`)}
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

    { field: "nama_sekolah", headerName: "NAMA SEKOLAH", width: 200 },
    { field: "kepsek", headerName: "KEPALA SEKOLAH", width: 200 },
    { field: "total_siswa", headerName: "TOTAL SISWA", width: 150 },
    { field: "total_laki", headerName: "LAKI-LAKI", width: 150 },
    { field: "total_perempuan", headerName: "PEREMPUAN", width: 150 },
    { field: "status_sekolah", headerName: "STATUS SEKOLAH", width: 150 },
    { field: "jumlah_guru", headerName: "JUMLAH GURU", width: 130 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Data Sekolah di Tembeng Putik</h2>

      <div>
        <button
          onClick={() => navigate("/pendidikan/tambah")}
          style={{
            background: "green",
            color: "#fff",
            padding: "8px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "none",
          }}
        >
          Tambah Sekolah
        </button>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Cari sekolah..."
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
      <div style={{ height: 400, width: "100%", marginTop: "15px" }}>
        <DataGrid
          rows={filteredData}
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
          checkboxSelection={false}
        />
      </div>

    </div>
  );
}
