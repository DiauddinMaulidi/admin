import React from "react";

export default function SuratPrintTemplate({ data }) {
  const d = data || {};

  return (
    <div style={{
      width: "210mm",
      minHeight: "297mm",
      padding: "20mm",
      boxSizing: "border-box",
      background: "#fff",
      fontFamily: "Times New Roman, serif"
    }}>
      {/* Kop surat (ubah sesuai kebutuhan) */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h3 style={{ margin: 0 }}>PEMERINTAH KABUPATEN XYZ</h3>
        <h4 style={{ margin: "4px 0" }}>DESA TEMBENG PUTIK</h4>
        <p style={{ margin: 0 }}>Alamat Desa - Kecamatan - Kabupaten</p>
      </div>

      <hr style={{ border: "1px solid #000", marginBottom: 20 }} />

      <h2 style={{ textAlign: "center", textDecoration: "underline", marginTop: 0 }}>SURAT KETERANGAN TIDAK MAMPU</h2>
      <p style={{ textAlign: "center", marginTop: 4 }}>Nomor: {d.nomor_surat || "-"}</p>

      <div style={{ marginTop: 16, lineHeight: 1.6 }}>
        <p>Yang bertanda tangan di bawah ini menerangkan bahwa:</p>

        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
          <tbody>
            <tr>
              <td style={{ width: 160, verticalAlign: "top", padding: 4 }}>Nama</td>
              <td style={{ padding: 4 }}>: {d.nama || "-"}</td>
            </tr>
            <tr>
              <td style={{ verticalAlign: "top", padding: 4 }}>NIK</td>
              <td style={{ padding: 4 }}>: {d.nik || "-"}</td>
            </tr>
            <tr>
              <td style={{ verticalAlign: "top", padding: 4 }}>Tempat / Tgl Lahir</td>
              <td style={{ padding: 4 }}>: {d.ttl || "-"}</td>
            </tr>
            <tr>
              <td style={{ verticalAlign: "top", padding: 4 }}>Jenis Kelamin</td>
              <td style={{ padding: 4 }}>: {d.jk || "-"}</td>
            </tr>
            <tr>
              <td style={{ verticalAlign: "top", padding: 4 }}>Agama</td>
              <td style={{ padding: 4 }}>: {d.agama || "-"}</td>
            </tr>
            <tr>
              <td style={{ verticalAlign: "top", padding: 4 }}>Status</td>
              <td style={{ padding: 4 }}>: {d.status || "-"}</td>
            </tr>
            <tr>
              <td style={{ verticalAlign: "top", padding: 4 }}>Pekerjaan</td>
              <td style={{ padding: 4 }}>: {d.pekerjaan || "-"}</td>
            </tr>
            <tr>
              <td style={{ verticalAlign: "top", padding: 4 }}>Alamat</td>
              <td style={{ padding: 4 }}>: {d.alamat || "-"}</td>
            </tr>
          </tbody>
        </table>

        <p style={{ marginTop: 12 }}>
          Bahwa orang tersebut di atas benar merupakan warga Desa Tembeng Putik
          yang kondisinya tergolong kurang mampu.
        </p>

        <p><strong>Keperluan:</strong> {d.keperluan || "-"}</p>

        <p>
          Berlaku: {d.dari || "-"} s/d {d.sampai || "-"}
        </p>
      </div>

      <div style={{ marginTop: 60, display: "flex", justifyContent: "flex-end" }}>
        <div style={{ textAlign: "center" }}>
          <div>Tembeng Putik, {new Date().getFullYear()}</div>
          <div style={{ marginTop: 8 }}>{d.penanda_tangan || "Kepala Desa"}</div>
          <div style={{ height: 60 }}></div>
          <div>(_____________________)</div>
        </div>
      </div>
    </div>
  );
}
