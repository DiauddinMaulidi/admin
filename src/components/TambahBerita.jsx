import React, { useState, useRef } from "react";

export default function Berita() {
  const [title, setTitle] = useState("");
  const [penulis, setPenulis] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Judul wajib diisi.";
    if (!subtitle.trim()) e.subtitle = "Sub judul wajib diisi.";
    if (!imageFile) e.image = "Silakan pilih gambar.";
    else if (!/^image\//.test(imageFile.type)) e.image = "File harus berupa gambar.";
    else if (imageFile.size > 5 * 1024 * 1024) e.image = "Ukuran gambar maksimal 5MB.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setErrors((prev) => ({ ...prev, image: undefined }));

    const reader = new FileReader();
    reader.onload = (ev) => setPreviewUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
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
      fd.append("title", title);
      fd.append("penulis", penulis);
      fd.append("subtitle", subtitle);
      fd.append("image", imageFile);

      // ⬇️ URL backend upload
      const res = await fetch("http://localhost:5000/berita", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Upload gagal");

      // Reset form
      setTitle("");
      setPenulis("");
      setSubtitle("");
      handleRemoveImage();
      setErrors({});
      alert("Berhasil disimpan!");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "20px" }}>
          Tambah Berita
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

            {imageFile && (
              <div style={{ marginTop: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
                <button type="button" className="btn" onClick={handleRemoveImage}>
                  Hapus gambar
                </button>
                <span style={{ fontSize: "13px", color: "#666" }}>
                  {imageFile.name} • {(imageFile.size / 1024).toFixed(0)} KB
                </span>
              </div>
            )}
            {errors.image && <p className="error-text">{errors.image}</p>}
          </div>
        </div>

        {/* Title */}
        <div className="form-group">
          <label className="form-label">Judul</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Masukkan judul"
            style={{color: "black"}}
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </div>

        {/* Penulis */}
        <div className="form-group">
          <label className="form-label">Penulis</label>
          <input
            type="text"
            value={penulis}
            onChange={(e) => setPenulis(e.target.value)}
            className="form-input"
            placeholder="Sebutkan Penulis"
            style={{color: "black"}}
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </div>

        {/* Subtitle */}
        <div className="form-group">
          <label className="form-label">Sub Judul</label>
          <textarea
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="form-input"
            placeholder="Masukkan sub judul"
          />
          {errors.subtitle && <p className="error-text">{errors.subtitle}</p>}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? "Menyimpan..." : "Simpan"}
          </button>

          <button
            type="button"
            className="btn"
            onClick={() => {
              setTitle("");
              setSubtitle("");
              handleRemoveImage();
              setErrors({});
            }} >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
