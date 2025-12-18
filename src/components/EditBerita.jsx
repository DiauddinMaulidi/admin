import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBerita() {
    const {id} = useParams();
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const [form, setForm] = useState({
        judul: "",
        penulis: "",
        subJudul: "",
        images: null,
    })

    const [previewUrl, setPreviewUrl] = useState("");
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const resultBerita = await axios.get(`http://localhost:5000/penduduk_tembeng/berita/edit/${id}`);

                const row = resultBerita.data;

                setForm({
                    judul: row.judul || "",
                    penulis: row.penulis || "",
                    subJudul: row.subJudul || "",
                    images: null,
                });

                if (row.images) {
                    setPreviewUrl(`http://localhost:5000/assets/${row.images}`);
                }
            } catch (error) {
                console.error(error);
                alert("Gagal memuat data berita");
            }
        };

        loadData();
    }, [id])

  const validate = () => {
    const e = {};

    if (!form.judul.trim()) e.judul = "Judul wajib diisi.";
    if (!form.penulis.trim()) e.penulis = "Sub judul wajib diisi.";
    if (!form.subJudul.trim()) e.subJudul = "Sub judul wajib diisi.";

    if (!form.images && !previewUrl) {
        e.images = "Silakan pilih gambar.";
    }

    if (form.images) {
      if (!/^image\//.test(form.images.type))
        e.images = "File harus berupa gambar";
      if (form.images.size > 5 * 1024 * 1024)
        e.images = "Ukuran maksimal 5MB";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm({ ...form, images: file });
    setErrors({ ...errors, images: null });

    const reader = new FileReader();
    reader.onload = (ev) => setPreviewUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

    const resetForm = () => {
        setForm({
            judul: "",
            penulis: "",
            subJudul: "",
            images: null,
        });
        setPreviewUrl("");
        setErrors({});
        if (inputRef.current) inputRef.current.value = "";
    };


  const handleRemoveImage = () => {
    setForm({ ...form, images: null });
    setPreviewUrl("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    setSubmitting(true);

    try {
      // FORM DATA untuk dikirim ke backend
      const fd = new FormData();
      fd.append("judul", form.judul);
      fd.append("penulis", form.penulis);
      fd.append("subJudul", form.subJudul);
      if (form.images) fd.append("images", form.images);

      await axios.put(
        `http://localhost:5000/penduduk_tembeng/berita/${id}`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Berita berhasil diperbarui");
      navigate("/berita");
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui berita");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "20px" }}>
          Edit Berita
        </h2>

        {/* Image input */}
        <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
          <div className="image-preview-box">
            {previewUrl ? (
              <img src={previewUrl} alt="preview" className="preview-img" />
            ) : (
              <span style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
                Preview<br />Kosong
              </span>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <label className="form-label">Gambar</label>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input"
            />
            {errors.images && <p className="error-text">{errors.images}</p>}

            {form.images && (
              <div style={{ marginTop: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
                <button type="button" className="btn" onClick={handleRemoveImage}>
                  Hapus gambar
                </button>
                <span style={{ fontSize: "13px", color: "#666" }}>
                  {form.images.name} • {(form.images.size / 1024).toFixed(0)} KB
                </span>
              </div>
            )}
            {errors.images && <p className="error-text">{errors.images}</p>}
          </div>
        </div>

        {/* judul */}
        <div className="form-group">
          <label className="form-label">Judul</label>
          <input
            type="text"
            value={form.judul}
            onChange={(e) => setForm({...form, judul: e.target.value})}
            className="form-input"
            placeholder="Masukkan judul"
            style={{color: "black"}}
          />
          {errors.judul && <p className="error-text">{errors.judul}</p>}
        </div>

        {/* Penulis */}
        <div className="form-group">
          <label className="form-label">Penulis</label>
          <input
            type="text"
            value={form.penulis}
            onChange={(e) => setForm({...form, penulis: e.target.value})}
            className="form-input"
            placeholder="Sebutkan Penulis"
            style={{color: "black"}}
          />
          {errors.judul && <p className="error-text">{errors.judul}</p>}
        </div>

        {/* subJudul */}
        <div className="form-group">
          <label className="form-label">Deskripsi</label>
          <textarea
            value={form.subJudul}
            onChange={(e) => setForm({...form, subJudul: e.target.value})}
            className="form-input"
            placeholder="Masukkan deskripsi"
            style={{color: "black"}}
          />
          {errors.subJudul && <p className="error-text">{errors.subJudul}</p>}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? "Menyimpan..." : "Update"}
          </button>

          <button
            type="button"
            className="btn"
            onClick={resetForm} >
                Reset
          </button>
        </div>
      </form>
    </div>
  );
}
