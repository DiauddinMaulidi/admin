import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TambahSekolah() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    namaSekolah: "",
    kepsek: "",
    totalSiswa: "",
    totalLaki: "",
    totalPr: "",
    statusSekolah: "",
    jumlahGuru: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addData = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/pendidikan", form);
    navigate("/pendidikan");
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const labelStyle = {
    fontWeight: "600",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #020617)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <form onSubmit={addData}
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "#fff",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: "20px", color: "#0f172a" }}>
          Tambah Sekolah
        </h2>

        <div style={{ display: "grid", gap: "15px" }}>
          <div>
            <label style={labelStyle}>Nama Sekolah</label>
            <input name="namaSekolah" style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Nama Kepala Sekolah</label>
            <input name="kepsek" style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Total Siswa</label>
            <input name="totalSiswa" style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Jumlah Siswa Laki-Laki</label>
            <input name="totalLaki" style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Jumlah Siswa Perempuan</label>
            <input name="totalPr" style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Status Sekolah</label>
            <input name="statusSekolah" style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Jumlah Guru</label>
            <input name="jumlahGuru" style={inputStyle} onChange={handleChange} />
          </div>
        </div>

        <button
            type="submit"
          style={{
            marginTop: "25px",
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "#16a34a",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
