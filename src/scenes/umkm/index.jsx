import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Alert from "./alert";
import UmkmDetail from "../../components/Umkm";

export default function Umkm() {
  const navigate = useNavigate();
  const [dataUmkm, setDataUmkm] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const loadData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/penduduk_tembeng/umkm"
      );
      setDataUmkm(res.data);
    } catch (err) {
      console.error("Gagal memuat UMKM:", err);
    }
  };

  const handleOpenDelete = (id) => {
    setDeleteId(id);
    setAlertOpen(true);
  };

  const deleteData = async () => {
    try {
      await axios.delete(`http://localhost:5000/penduduk_tembeng/umkm/${deleteId}`);
      // console.log(tes)
      setAlertOpen(false);
      loadData();
    } catch (err) {
      console.error("Gagal menghapus UMKM:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <h2 className="title">UMKM Desa</h2>

      <Alert
        open={alertOpen}
        onOpenChange={setAlertOpen}
        onConfirm={deleteData}
      />

      <button
        className="btn-tambah"
        onClick={() => navigate("/umkm/tambah")}
      >
        Tambah UMKM
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }} className="card-umkm">
        {dataUmkm.map((item) => (
          <div key={item.id} style={{position: "relative"}}>
            <div style={{display: "flex", position: "absolute", width: "100%", justifyContent: "end", gap: 3, padding: 5}}>
              <button
                onClick={() => navigate(`/umkm/edit/${item.id}`)}
                style={{
                  top: 16,
                  right: 16,
                  zIndex: 10,
                  background: "green",
                  border: "none",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleOpenDelete(item.id)}
                style={{
                  top: 16,
                  right: 16,
                  zIndex: 10,
                  background: "#e60023",
                  border: "none",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                Hapus
              </button>
            </div>

            <UmkmDetail data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
