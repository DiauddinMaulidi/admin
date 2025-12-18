import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function TambahUmkm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    judul: "",
    subJudul: "",
    harga: "",
    no_wa: "",
    images: [],
  });

  const [preview, setPreview] = useState([]);

  // HANDLE INPUT TEXT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
        alert("Maksimal 5 gambar");
        return;
    }

    setForm({ ...form, images: files });
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  // SUBMIT DATA
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.images.length === 0) {
      alert("Minimal 1 gambar harus diunggah");
      return;
    }

    const formData = new FormData();
    formData.append("judul", form.judul);
    formData.append("subJudul", form.subJudul);
    formData.append("harga", form.harga);
    formData.append("no_wa", form.no_wa);

    form.images.forEach((img) => {
      formData.append("images", img);
    });

    try {
        await axios.post("http://localhost:5000/penduduk_tembeng/umkm", formData);

      navigate("/umkm");
    } catch (err) {
      console.error("Gagal menambahkan UMKM:", err);
      alert("Gagal menyimpan data");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Tambah UMKM</h2>

      <form onSubmit={handleSubmit} className="form card-umkm" style={{display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px'}}>

        <input
          type="text"
          name="judul"
          placeholder="Nama Produk / UMKM"
          value={form.judul}
          onChange={handleChange}
          required
        />

        <textarea
          name="subJudul"
          placeholder="Deskripsi UMKM"
          value={form.subJudul}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="harga"
          placeholder="Harga (contoh: Rp25.000)"
          value={form.harga}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="no_wa"
          placeholder="Nomor WhatsApp (+628xxxx)"
          value={form.no_wa}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleImage}
        />

        {/* PREVIEW IMAGE */}
        <div className="preview-wrapper" style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
          {preview.map((img, i) => (
            <img key={i} src={img} alt="" className="preview-img" style={{width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd'}} />
          ))}
        </div>

        <button type="submit" className="btn-simpan">
          Simpan UMKM
        </button>
      </form>
    </div>
  );
}
