import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditDusun() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pendudukList, setPendudukList] = useState([]);

  const [form, setForm] = useState({
    dusun: "",
    kepala_dusun_lama: "",
    kepala_dusun_id: "",
    searchText: "",
  });

  useEffect(() => {
    const loadData = async () => {
      const dusunRes = await axios.get(
        `http://localhost:5000/penduduk_tembeng/dusun/edit/${id}`
      );

      const row = dusunRes.data;

      setForm((f) => ({
        ...f,
        dusun: row.dusun,
        kepala_dusun_lama: row.kepala_dusun,
        kepala_dusun_id: row.kepala_dusun_id,
      }));

      const pendudukRes = await axios.get(
        "http://localhost:5000/penduduk_tembeng"
      );
      setPendudukList(pendudukRes.data);
    };

    loadData();
  }, [id]);

  // Ketika user memilih dari datalist
  const handleSelectPenduduk = (value) => {
    const selected = pendudukList.find(
      (p) =>
        `${p["NIK"]} - ${p["NAMA_LENGKAP"]}` === value
    );

    if (selected) {
      setForm({
        ...form,
        kepala_dusun_id: selected.id,
        searchText: value,
      });
    } else {
      setForm({ ...form, searchText: value });
    }
  };

  const updateData = async () => {
    await axios.put(
      `http://localhost:5000/penduduk_tembeng/dusun/${id}`,
      form
    );
    navigate("/dusun");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "450px" }}>
      <h2>Edit Data Dusun</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

        {/* NAMA DUSUN */}
        <div>
          <label>Nama Dusun</label>
          <input
            value={form.dusun}
            onChange={(e) => setForm({ ...form, dusun: e.target.value })}
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          />
        </div>

        {/* KEPALA DUSUN LAMA */}
        <div>
          <label>Kepala Dusun Sebelumnya</label>
          <input
            readOnly
            value={form.kepala_dusun_lama}
            style={{
              width: "100%",
              padding: "8px",
              background: "#eee",
              borderRadius: "5px",
            }}
          />
        </div>

        {/* SEARCH NIK / NAMA */}
        <div>
          <label>Cari NIK / Nama Kepala Dusun Baru</label>

          <input
            list="penduduk-list"
            value={form.searchText}
            onChange={(e) => handleSelectPenduduk(e.target.value)}
            placeholder="Silakan masukan NIK / Nama..."
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #aaa",
            }}
          />

          <datalist id="penduduk-list">
            {pendudukList.map((p) => (
              <option
                key={p.id}
                value={`${p["NIK"]} - ${p["NAMA_LENGKAP"]}`}
              />
            ))}
          </datalist>
        </div>

        <button
          onClick={updateData}
          style={{
            background: "orange",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "15px",
            cursor: "pointer",
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
}
