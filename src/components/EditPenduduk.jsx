import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPenduduk() {
  const { id } = useParams();
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
  });

  const fixDate = (d) => (d ? d.split("T")[0] : "");

  useEffect(() => {
    const getDetail = async () => {
      const res = await axios.get(
        `http://localhost:5000/penduduk_tembeng/edit/${id}`
      );
      const row = res.data;

      setForm({
        nama: row["NAMA_LENGKAP"] || "",
        jenisKelamin: row["JENIS_KELAMIN"] || "",
        statusPerkawinan: row["STATUS_PERKAWINAN"] || "",
        tempatLahir: row["TEMPAT_LAHIR"] || "",
        tanggalLahir: fixDate(row["TANGGAL_LAHIR"]) || "",
        agama: row["AGAMA"] || "",
        pendidikan: row["PENDIDIKAN_TERAKHIR"] || "",
        pekerjaan: row["PEKERJAAN"] || "",
        kewarganegaraan: row["KEWARGANEGARAAN"] || "",
        alamat: row["ALAMAT_LENGKAP"] || "",
        kedudukan: row["KEDUDUKAN_DALAM_KELUARGA"] || "",
        nik: row["NIK"] || "",
        nomorKK: row["NOMOR_KK"] || "",
      });
    };

    getDetail();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateData = async () => {
    await axios.put(`http://localhost:5000/penduduk_tembeng/${id}`, form);
    navigate("/");
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
      <div
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
            <label style={labelStyle}>Nama Lengkap</label>
            <input name="nama" value={form.nama} onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Jenis Kelamin</label>
            <input
              name="jenisKelamin"
              value={form.jenisKelamin}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Status Perkawinan</label>
            <input
              name="statusPerkawinan"
              value={form.statusPerkawinan}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <div>
              <label style={labelStyle}>Tempat Lahir</label>
              <input
                name="tempatLahir"
                value={form.tempatLahir}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Tanggal Lahir</label>
              <input
                type="date"
                name="tanggalLahir"
                value={form.tanggalLahir}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Agama</label>
            <input name="agama" value={form.agama} onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Pendidikan</label>
            <input
              name="pendidikan"
              value={form.pendidikan}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Pekerjaan</label>
            <input
              name="pekerjaan"
              value={form.pekerjaan}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Kewarganegaraan</label>
            <input
              name="kewarganegaraan"
              value={form.kewarganegaraan}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Alamat Lengkap</label>
            <input
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Kedudukan dalam Keluarga</label>
            <input
              name="kedudukan"
              value={form.kedudukan}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <div>
              <label style={labelStyle}>NIK</label>
              <input name="nik" value={form.nik} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Nomor KK</label>
              <input
                name="nomorKK"
                value={form.nomorKK}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        <button
          onClick={updateData}
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
          Update Data
        </button>
      </div>
    </div>
  );
}
