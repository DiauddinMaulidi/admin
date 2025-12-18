import { useState } from "react";

export default function UmkmDetail({ data }) {
  const baseUrl = "http://localhost:5000/assets/";

  const images = data.images.map((img) =>
    img.startsWith("http") ? img : baseUrl + img
  );

  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div
      style={{
        display: "flex",
        gap: 32,
        padding: 24,
        background: "#fff",
        borderRadius: 8,
        maxWidth: "100%",
        margin: "auto",
      }}
    >
      {/* KIRI */}
      <div style={{ width: "40%" }}>
        <img
          src={activeImage}
          alt={data.judul}
          style={{
            width: "100%",
            height: 250,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="thumb"
              onClick={() => setActiveImage(img)}
              style={{
                width: 70,
                height: 70,
                objectFit: "cover",
                borderRadius: 6,
                cursor: "pointer",
                border:
                  activeImage === img
                    ? "2px solid #e60023"
                    : "1px solid #ddd",
              }}
            />
          ))}
        </div>
      </div>

      {/* KANAN */}
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0, color: 'black' }}>{data.judul}</h2>
        </div>

        <div style={{ color: "#c9af04", fontSize: 27, margin: "6px 0" }}>
          ★★★★★
        </div>

        <h1 style={{ fontSize: 28, color: 'black', margin: "10px 0" }}>
          Rp.{data.harga.toLocaleString("id-ID")}
        </h1>

        <p style={{ lineHeight: 1.6, color: 'black' }}>{data.subJudul}</p>

        <a
          href={`https://wa.me/62${data.no_wa}`}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "green",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: 6,
            textDecoration: "none",
            fontWeight: 600,
            marginTop: 10,
          }}
        >
            Hubungi Penjual
        </a>

        <div
          style={{
            marginTop: 14,
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#555",
          }}
        >
          <span>Bagikan:</span>
        </div>
      </div>
    </div>
  );
}
