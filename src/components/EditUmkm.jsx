import { PhotoIcon } from "@heroicons/react/24/solid";
import "../scenes/umkm/ProfileForm.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUmkm() {
    const [preview, setPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [replaceImages, setReplaceImages] = useState(false);
    const [form, setForm] = useState({
        judul: "",
        images: [],
        subJudul: "",
        harga: 0,
        no_wa: ""
    })
    const {id} = useParams()
    const inputRef = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        const loadData = async () => {
            try {
                const resultUmkm = await axios.get(`http://localhost:5000/penduduk_tembeng/umkm/edit/${id}`)

                const row = resultUmkm.data;

                setForm(prev => ({
                    ...prev,
                    judul: row.judul || "",
                    images: [],
                    subJudul: row.subJudul || "",
                    harga: row.harga || 0,
                    no_wa: row.no_wa || "",
                }))

                let images = row.images;

                if (typeof images === "string") {
                  images = JSON.parse(images);
                }

                if (!Array.isArray(images)) images = [];

                setOldImages(images);
            } catch (error) {
                console.error(error);
                alert("Gagal memuat data berita");
            }
        }

        loadData()
    }, [id])

    const handleImage = (e) => {
        const files = Array.from(e.target.files)
        if (files.length === 0) return alert("Tidak ada gambar")

        setReplaceImages(true);
        setOldImages([]);

        setForm({...form, images: files})

        const previews = files.map((file) =>
          URL.createObjectURL(file)
        );
        setPreview(previews);
    }

    const resetForm = () => {
        setForm({
            judul: "",
            images: [],
            subJudul: "",
            harga: 0,
            no_wa: "",
        });
        setPreview([]);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const formData = new FormData();
        formData.append("judul", form.judul);
        formData.append("subJudul", form.subJudul);
        formData.append("harga", form.harga);
        formData.append("no_wa", form.no_wa);
        formData.append("replaceImages", replaceImages);

        // kirim gambar hanya jika ada upload baru
        if (form.images.length > 0) {
          form.images.forEach((img) =>
            formData.append("images", img)
          );
        }

        await axios.put(
          `http://localhost:5000/penduduk_tembeng/umkm/${id}`,
          formData
        );

        alert("Data UMKM berhasil diperbarui");
        navigate("/umkm")
      } catch (error) {
        console.error(error);
        alert("Gagal memperbarui data");
      }
    };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <section className="section">
        <div className="col-full upload">
            <PhotoIcon className="icon" />
            <label className="upload-label">
              Upload a file
              <input
                ref={inputRef}
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImage} />
            </label>
            <p>PNG, JPG Max 5 images</p>

            <div className="preview-wrapper" style={{display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px'}}>
                {oldImages.map((img, i) => (
                    <img key={i} src={`http://localhost:5000/assets/${img}`} alt="" className="preview-img" style={{width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd'}} />
                ))}
                {preview.map((img, i) => (
                  <img
                    key={`new-${i}`}
                    src={img}
                    alt=""
                    className="preview-img"
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "2px solid #22c55e",
                    }}
                  />
                ))}
            </div>
        </div>

        <div className="grid">
          <div className="col-full">
            <label>Judul</label>
            <input
                value={form.judul}
                onChange={(e) =>
                    setForm({ ...form, judul: e.target.value })
                }
                type="text"
                placeholder="Nama Produk / UMKM" />
          </div>
        </div>

        <div className="grid">
          <div className="col-full">
            <label>Sub Judul</label>
            <textarea
                value={form.subJudul}
                onChange={(e) =>
                  setForm({ ...form, subJudul: e.target.value})
                }
                rows="3"
                placeholder="Deskripsi UMKM"></textarea>
          </div>
        </div>

        <div className="grid">
          <div className="col-full">
            <label>Harga</label>
            <input
                value={form.harga}
                onChange={(e) =>
                  setForm({ ...form, harga: e.target.value})
                }
                type="number"
                placeholder="Harga (contoh: Rp25.000)" />
          </div>
        </div>

        <div className="grid">
          <div className="col-full">
            <label>No WhatshApp</label>
            <input
                value={form.no_wa}
                onChange={(e) =>
                  setForm({ ...form, no_wa: e.target.value})
                }
                type="text"
                placeholder="Nomor WhatsApp (+628xxxx)" />
          </div>
        </div>

      </section>

      <div className="actions">
        <button type="button" className="btn-text" onClick={resetForm}>Reset</button>
        <button type="submit" className="btn-primary">Update</button>
      </div>
    </form>
  );
}
