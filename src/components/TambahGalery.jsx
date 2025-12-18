import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function TambahGallery() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    images: [],
  });

  // HANDLE INPUT TEXT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const files = e.target.files?.[0];
    if (!files) return;

    setForm({ ...form, images: files });
  };

  // SUBMIT DATA
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.images.length === 0) {
      alert("Minimal 1 gambar harus diunggah");
      return;
    }

    const formData = new FormData();
    formData.append("nama", form.nama);
    formData.append("image", form.images);

    try {
        await axios.post("http://localhost:5000/penduduk_tembeng/gallery", formData);

      navigate("/gallery");
    } catch (err) {
      alert("Gagal menyimpan gambar");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Tambah Gambar</h2>

      <form onSubmit={handleSubmit} className="form card-umkm" style={{display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px'}}>

        <input
          type="text"
          name="nama"
          placeholder="Nama Gambar"
          value={form.nama}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="images"
          accept="image/*"
          onChange={handleImage}
        />

        {form.images && (
              <div style={{ marginTop: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
                <button type="button" className="btn">
                  Hapus gambar
                </button>
                <span style={{ fontSize: "13px", color: "#666" }}>
                  {form.images.name} • {(form.images.size / 1024).toFixed(0)} KB
                </span>
              </div>
            )}

        {/* PREVIEW IMAGE */}
        {/* <div className="preview-wrapper" style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
          {preview.map((img, i) => (
            <img key={i} src={img} alt="" className="preview-img" style={{width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd'}} />
          ))}
        </div> */}

        <button type="submit" className="btn-simpan">
          Simpan UMKM
        </button>
      </form>
    </div>
  );
}
