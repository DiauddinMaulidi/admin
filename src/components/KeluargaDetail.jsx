import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function KeluargaDetail() {
    const {id} = useParams();

    const [kepalaKeluarga, setKepalaKeluarga] = useState([]);
    const [jumlahKeluarga, setJumlahKeluarga] = useState(0);
    const [anggotaKeluarga, setAnggotaKeluarga] = useState([]);


    useEffect(() => {
        const loadData = async () => {
            const res = await axios.get(`http://localhost:5000/penduduk_tembeng/keluarga/detail/${id}`)
            setKepalaKeluarga(res.data.kepala_keluarga);
            setJumlahKeluarga(res.data);
            setAnggotaKeluarga(res.data.anggota_keluarga);
        };
        loadData()
    }, [id])

    return (
    <div className="container-fluid mt-4">
        <h2>Data Anggota Keluarga</h2>

      {/* RINCIAN KELUARGA */}
      <div className="card mb-4" style={{ width: "100%", maxWidth: "100%", display: "block" }}>
        <div className="card-header fw-bold">Rincian Keluarga</div>

        {/* Hilangkan padding supaya table bisa full */}
        <div className="card-body p-0">
          <table
            className="table table-bordered mb-0"
            style={{
              width: "100%",
              tableLayout: "fixed",
            }}
          >
            <tbody>
              <tr>
                <th style={{ width: "30%" }}>Nomor Kartu Keluarga (KK)</th>
                <td style={{ width: "10px" }}>:</td>
                <td>{kepalaKeluarga["NOMOR_KK"]}</td>
              </tr>

              <tr>
                <th>Kepala Keluarga</th>
                <td>:</td>
                <td>{kepalaKeluarga["NAMA_LENGKAP"]}</td>
              </tr>

              <tr>
                <th>Alamat</th>
                <td>:</td>
                <td>{kepalaKeluarga['ALAMAT_LENGKAP']}</td>
              </tr>

              <tr>
                <th>Jumlah Anggota</th>
                <td>:</td>
                <td>{jumlahKeluarga.jumlah_anggota}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* TABEL ANGGOTA */}
      <h5 className="mb-3">Daftar Anggota Keluarga</h5>

      <div className="table-responsive">
        <table className="table table-bordered align-middle w-100">
          <thead className="table-light">
            <tr>
              <th style={{ width: "50px" }}>NO</th>
              <th>NIK</th>
              <th>NAMA</th>
              <th>TANGGAL LAHIR</th>
              <th>JENIS KELAMIN</th>
              <th>HUBUNGAN</th>
            </tr>
          </thead>

          <tbody>
            {anggotaKeluarga.map((anggota, index) => (
                <tr key={anggota.id}>
                    <td>{index+1}</td>
                    <td>{anggota["NIK"]}</td>
                    <td>{anggota["NAMA_LENGKAP"]}</td>
                    <td>{anggota["TANGGAL_LAHIR"]}</td>
                    <td>{anggota["JENIS_KELAMIN"]}</td>
                    <td>{anggota["KEDUDUKAN_DALAM_KELUARGA"]}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
