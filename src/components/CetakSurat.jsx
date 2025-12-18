import React, { useEffect, useState } from "react";
import axios from "axios";
import printJS from "print-js";
import SuratPrintTemplate from "./pages/SuratTidakMampuPrint";

export default function Surat() {
  const [penduduk, setPenduduk] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [nomorSurat, setNomorSurat] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [dari, setDari] = useState("");
  const [sampai, setSampai] = useState("");
  const [penandaTangan, setPenandaTangan] = useState("");

  // Ambil data penduduk + nomor surat
  useEffect(() => {
    axios
      .get("http://localhost:5000/penduduk_tembeng")
      .then((res) => setPenduduk(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/surat/number")
      .then((res) => setNomorSurat(res.data.last + 1))
      .catch((err) => console.log(err));
  }, []);

  // Ketika user pilih dari datalist
  const handleSelectPenduduk = (value) => {
    setSearchText(value);

    const warga = penduduk.find(
      (p) => `${p["NIK"]} - ${p["NAMA_LENGKAP"]}` === value
    );

    setSelected(warga || null);
  };

  const handleSubmit = () => {
    if (!selected) {
      alert("Pilih identitas pemohon terlebih dahulu");
      return;
    }

    const data = {
      nomor_surat: nomorSurat,
      pemohon_id: selected.id,
      keperluan,
      berlaku_dari: dari,
      berlaku_sampai: sampai,
      penanda_tangan: penandaTangan,
    };

    axios
      .post("http://localhost:5000/surat/sktm", data)
      .then(() => alert("Surat berhasil disimpan"))
      .catch((err) => console.log(err));
  };

  // ================= PREVIEW + PRINT / DOWNLOAD PDF =================
  const handlePreviewAndPrint = () => {
    if (!selected) {
      alert("Pilih penduduk terlebih dahulu!");
      return;
    }

    // Render template ke sebuah node sementara agar dapat diambil HTML-nya
    // Kita buat elemen div secara dinamis, render template lewat React secara manual
    // Simpler: gunakan existing hidden DOM (id="area-print") yang sudah berisi template
    const printElem = document.getElementById("area-print");
    if (!printElem) {
      alert("Area print tidak ditemukan. Pastikan komponen SuratPrintTemplate ada di DOM.");
      return;
    }

    // Isi data ke dalam template: kita mount template sebelumnya sudah berisi binding dari state,
    // tetapi untuk memastikan isi terbaru, kita revisualize innerHTML (we rely on the hidden node below).
    // Ambil innerHTML
    const html = printElem.innerHTML;

    // Panggil printJS dengan raw html — ini akan membuka dialog print & user bisa pilih "Save as PDF"
    printJS({
      printable: html,
      // ignoreElements: ['print-header', 'print-footer'],
      type: "raw-html",
      // documentTitle: `Surat-${nomorSurat}`,
      // scanStyles: false,
      style: `
        @page { size: auto; margin: 20mm; }
        body { font-family: 'Times New Roman', serif; color: #000; }
      `,
    });
  };
  // =================================================================

  return (
    <div style={{ padding: "20px" }}>
      <h2>Surat Keterangan Kurang Mampu</h2>

      {/* Nomor Surat */}
      <div className="form-group mt-3">
        <label>Nomor Surat</label>
        <input className="form-control" value={nomorSurat} disabled />
      </div>

      {/* Identitas Pemohon */}
      <div className="mt-4">
        <h5>Keterangan Pemohon</h5>

        <label>NIK / Nama</label>
        <input
          list="penduduk-list"
          value={searchText}
          onChange={(e) => handleSelectPenduduk(e.target.value)}
          placeholder="Silakan masukan NIK / Nama..."
          className="form-control"
        />

        {/* DATALIST RENDER */}
        <datalist id="penduduk-list">
          {penduduk.map((p) => (
            <option
              key={p.id}
              value={`${p["NIK"]} - ${p["NAMA_LENGKAP"]}`}
            />
          ))}
        </datalist>

        {selected && (
          <div className="mt-3">
            <div className="row">
              <div className="col-md-6">
                <label>Nama</label>
                <input
                  className="form-control"
                  value={selected["NAMA_LENGKAP"]}
                  disabled
                />

                <label className="mt-2">NIK</label>
                <input
                  className="form-control"
                  value={selected["NIK"]}
                  disabled
                />

                <label className="mt-2">Tempat Lahir</label>
                <input
                  className="form-control"
                  value={selected["TEMPAT_LAHIR"]}
                  disabled
                />

                <label className="mt-2">Tanggal Lahir</label>
                <input
                  className="form-control"
                  value={selected["TANGGAL_LAHIR"]}
                  disabled
                />
              </div>

              <div className="col-md-6">
                <label>Jenis Kelamin</label>
                <input
                  className="form-control"
                  value={selected["JENIS_KELAMIN"]}
                  disabled
                />

                <label className="mt-2">Agama</label>
                <input
                  className="form-control"
                  value={selected["AGAMA"]}
                  disabled
                />

                <label className="mt-2">Status Perkawinan</label>
                <input
                  className="form-control"
                  value={selected["STATUS_PERKAWINAN"]}
                  disabled
                />

                <label className="mt-2">Pekerjaan</label>
                <input
                  className="form-control"
                  value={selected["PEKERJAAN"]}
                  disabled
                />

                <label className="mt-2">Alamat</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={selected["ALAMAT_LENGKAP"]}
                  disabled
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Keperluan */}
      <div className="mt-3">
        <label>Keperluan</label>
        <textarea
          className="form-control"
          placeholder="Masukkan Keperluan"
          value={keperluan}
          onChange={(e) => setKeperluan(e.target.value)}
        ></textarea>
      </div>

      {/* Tanggal Berlaku */}
      <div className="mt-4">
        <h5>Lainnya</h5>

        <label>Berlaku Dari</label>
        <input
          type="date"
          className="form-control"
          value={dari}
          onChange={(e) => setDari(e.target.value)}
        />

        <label className="mt-2">Sampai</label>
        <input
          type="date"
          className="form-control"
          value={sampai}
          onChange={(e) => setSampai(e.target.value)}
        />
      </div>

      {/* Penanda Tangan */}
      <div className="mt-4">
        <h5>Penanda Tangan</h5>

        <label>Tertanda Atas Nama</label>
        <select
          className="form-control"
          onChange={(e) => setPenandaTangan(e.target.value)}
          value={penandaTangan}
        >
          <option value="">-- Pilih --</option>
          <option value="Kepala Desa">Kepala Desa</option>
          <option value="Sekretaris Desa">Sekretaris Desa</option>
        </select>
      </div>

      {/* Button */}
      <div className="mt-4 d-flex justify-content-between">
        <button className="btn btn-danger" onClick={() => window.history.back()}>Batal</button>

        <div>
          <button className="btn btn-success me-2" onClick={handleSubmit}>
            Simpan
          </button>

          <button className="btn btn-info" onClick={handlePreviewAndPrint}>
            Preview & Download PDF
          </button>
        </div>
      </div>

      {/* HIDDEN AREA: SuratPrintTemplate dirender di sini supaya bisa diambil innerHTML */}
      <div style={{ display: "none" }}>
        <div id="area-print">
          <SuratPrintTemplate
            data={{
              nomor_surat: nomorSurat,
              nama: selected?.["NAMA_LENGKAP"],
              nik: selected?.["NIK"],
              ttl: `${selected?.["TEMPAT_LAHIR"] || "-"}, ${selected?.["TANGGAL_LAHIR"] || "-"}`,
              jk: selected?.["JENIS_KELAMIN"],
              agama: selected?.["AGAMA"],
              status: selected?.["STATUS_PERKAWINAN"],
              pekerjaan: selected?.["PEKERJAAN"],
              alamat: selected?.["ALAMAT_LENGKAP"],
              keperluan,
              dari,
              sampai,
              penanda_tangan: penandaTangan,
            }}
          />
        </div>
      </div>
    </div>
  );
}
