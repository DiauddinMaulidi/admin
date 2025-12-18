import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TambahPenduduk() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    jenisKelamin: "",
    statusPerkawinan: "",
    tempatLahir: "",
    tanggalLahir: "",
    agama: "",
    pendidikan: "",
    pekerjaan: "",
    kewarganegaraan: "",
    alamat: "",
    kedudukan: "",
    nik: "",
    nomorKK: "",
    ket: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addData = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/penduduk_tembeng", form);
    navigate("/penduduk");
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
          Tambah Penduduk
        </h2>

        <div style={{ display: "grid", gap: "15px" }}>
          <div>
            <label style={labelStyle}>Nama</label>
            <input name="nama" style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Jenis Kelamin</label>
            <input name="jenisKelamin" style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Status Perkawinan</label>
            <input name="statusPerkawinan" style={inputStyle} onChange={handleChange} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <div>
              <label style={labelStyle}>Tempat Lahir</label>
              <input name="tempatLahir" style={inputStyle} onChange={handleChange} />
            </div>
            <div>
              <label style={labelStyle}>Tanggal Lahir</label>
              <input
                type="date"
                name="tanggalLahir"
                style={inputStyle}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Agama</label>
            <input name="agama" style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Pendidikan</label>
            <input name="pendidikan" style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Pekerjaan</label>
            <input name="pekerjaan" style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Kewarganegaraan</label>
            <input name="kewarganegaraan" style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Alamat</label>
            <input name="alamat" style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Kedudukan</label>
            <input name="kedudukan" style={inputStyle} onChange={handleChange} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <div>
              <label style={labelStyle}>NIK</label>
              <input name="nik" style={inputStyle} onChange={handleChange} />
            </div>
            <div>
              <label style={labelStyle}>Nomor KK</label>
              <input name="nomorKK" style={inputStyle} onChange={handleChange} />
            </div>
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
          Simpan Data
        </button>
      </form>
    </div>
  );
}
