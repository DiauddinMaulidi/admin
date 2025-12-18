import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPendidikan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    namaSekolah: "",
    kepsek: "",
    totalSiswa: "",
    totalLaki: "",
    totalPerempuan: "",
    statusSekolah: "",
    jumlahGuru: ""
  });

  useEffect(() => {
    const getDetail = async () => {
      const res = await axios.get(
        `http://localhost:5000/pendidikan/edit/${id}`
      );
      const row = res.data;

      setForm({
        namaSekolah: row["nama_sekolah"] || "",
        kepsek: row["kepsek"] || "",
        totalSiswa: row["total_siswa"] || "",
        totalLaki: row["total_laki"] || "",
        totalPerempuan: row["total_perempuan"] || "",
        statusSekolah: row["status_sekolah"] || "",
        jumlahGuru: row["jumlah_guru"]
      });
    };

    getDetail();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateData = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:5000/pendidikan/edit/${id}`, form);
    navigate("/pendidikan");
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
            <label style={labelStyle}>Nama Sekolah</label>
            <input name="namaSekolah" value={form.namaSekolah} onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Nama Kepala Sekolah</label>
            <input name="kepsek" value={form.kepsek} style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Total Siswa</label>
            <input name="totalSiswa" value={form.totalSiswa} style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Jumlah Siswa Laki-Laki</label>
            <input name="totalLaki" value={form.totalLaki} style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Jumlah Siswa Perempuan</label>
            <input name="totalPerempuan" value={form.totalPerempuan} style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Status Sekolah</label>
            <input name="statusSekolah" value={form.statusSekolah} style={inputStyle} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Jumlah Guru</label>
            <input name="jumlahGuru" value={form.jumlahGuru} style={inputStyle} onChange={handleChange} />
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
