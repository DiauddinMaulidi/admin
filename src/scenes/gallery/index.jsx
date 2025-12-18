import { useEffect, useState } from "react";
import LightGallery from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import "./Gallery.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "./alert";

export default function Gallery() {
    const navigate = useNavigate()

    const [images, setImages] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const loadData = async () => {
            try {
                const results = await axios.get("http://localhost:5000/penduduk_tembeng/gallery")
                // console.log(results.data);
                setImages(Array.isArray(results.data) ? results.data : [])
            } catch (error) {
                console.error("Gagal memuat berita:", error);
            }
        }

    useEffect(() => {
        loadData()
    }, [])

    const handleOpenDelete = (id) => {
        setDeleteId(id);
        setAlertOpen(true);
    };

    const handleDelete = async () => {
        try {
        await axios.delete(`http://localhost:5000/penduduk_tembeng/gallery/${deleteId}`);
        setAlertOpen(false);
        loadData();
        } catch (err) {
        console.error("Gagal menghapus UMKM:", err);
        }
    };

  return (
    <div className="container">
        <h2 style={{display: 'flex', justifyContent: 'center'}}>Gallery Desa</h2>

        <Alert
          open={alertOpen}
          onOpenChange={setAlertOpen}
          onConfirm={handleDelete}
        />

        <button
            className="btn-tambah"
            onClick={() => navigate("/gallery/tambah")} >
            Tambah Gambar
        </button>

        <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        elementClassNames="gallery-grid"
        >
        {images.map((img, index) => (
            <a
            key={index}
            href={img.images}
            data-src={img.images}
            className="image-wrapper"
            >
            <img src={img.images} alt={img.nama} />

            <button
                className="delete-btn"
                onClick={(e) => handleOpenDelete(img.id)}
            >
                Hapus
            </button>
            </a>
        ))}
        </LightGallery>
    </div>
  );
}
