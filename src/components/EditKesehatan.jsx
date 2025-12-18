import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditKesehatan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    jenisData: "",
    namaDusun: "",
    total: 0,
  });

  const dusunOptions = [
        "Tembeng Putik Baret I",
        "Tembeng Putik Baret II",
        "Tembeng Putik Timuk I",
        "Tembeng Putik Timuk II",
        "Lengkok Lendang"
    ];

  useEffect(() => {
    const getDetail = async () => {
      const res = await axios.get(
        `http://localhost:5000/kesehatan/edit/${id}`
      );
      const row = res.data;

      setForm({
        jenisData: row["jenis_data"] || "",
        namaDusun: row["nama_dusun"] || "",
        total: row["total"] || 0,
      });
    };

    getDetail();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateData = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:5000/kesehatan/edit/${id}`, form);
    navigate("/kesehatan");
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
  };

  const labelStyle = {
    fontWeight: "600",
    marginBottom: "6px",
    display: "block",
    color: "#0f172a",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617, #0f172a)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <form onSubmit={updateData}
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "#ffffff",
          borderRadius: "14px",
          padding: "28px",
          boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginBottom: "22px" }}>Edit Penduduk</h2>

        <div style={{ display: "grid", gap: "15px" }}>
          <div>
            <label style={labelStyle}>Jenis Data Kesehatan</label>
            <input name="jenisData" value={form.jenisData} onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Nama Dusun</label>
            <select
              name="namaDusun"
              value={form.namaDusun}
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
            <input name="total" value={form.total} style={inputStyle} onChange={handleChange} />
          </div>
        </div>

        <button
            type="submit"
            style={{
                marginTop: "25px",
                width: "100%",
                padding: "13px",
                borderRadius: "8px",
                border: "none",
                background: "#f97316",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
            }}
        >
          Update
        </button>
      </form>
    </div>
  );
}
