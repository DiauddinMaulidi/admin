import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TambahKesehatan() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    jenisKesehatan: "",
    namaDusun: "",
    jumlah: 0
  });

    const dusunOptions = [
        "Tembeng Putik Baret I",
        "Tembeng Putik Baret II",
        "Tembeng Putik Timuk I",
        "Tembeng Putik Timuk II",
        "Lengkok Lendang"
    ];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addData = async (e) => {
    e.preventDefault();

    if (!form.jenisKesehatan || !form.namaDusun || !form.jumlah) {
      alert("Semua field wajib diisi");
      return;
    }

    await axios.post("http://localhost:5000/kesehatan", form);
    navigate("/kesehatan");
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
          Tambah Data Kesehatan
        </h2>

        <div style={{ display: "grid", gap: "15px" }}>
          <div>
            <label style={labelStyle}>Jenis Data Kesehatan</label>
            <input name="jenisKesehatan" style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Nama Dusun</label>
            <select
              name="namaDusun"
              value={form.nama_desa}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">-- Pilih Dusun --</option>
              {dusunOptions.map((dusun, i) => (
                <option key={i} value={dusun}>
                  {dusun}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Total Masyarakat</label>
            <input name="jumlah" style={inputStyle} onChange={handleChange} />
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
