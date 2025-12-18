import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function DownloadOptions({ data }) {
  const [open, setOpen] = useState(false);

  // DOWNLOAD CSV
  const downloadCSV = () => {
    const header = Object.keys(data[0]);
    const rows = data.map((row) =>
      header.map((key) => row[key]).join(",")
    );

    const csvContent = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data_penduduk.csv";
    a.click();
  };

  // DOWNLOAD XLSX (border + rapi)
  const downloadXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const range = XLSX.utils.decode_range(ws["!ref"]);

    // Border + Bold Header
    for (let R = range.s.r; R <= range.e.r; R++) {
      for (let C = range.s.c; C <= range.e.c; C++) {
        const addr = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[addr]) continue;

        ws[addr].s = {
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
          font: R === 0 ? { bold: true } : {},
        };
      }
    }

    // Auto width
    ws["!cols"] = Object.keys(data[0]).map((key) => ({
      wch: Math.max(
        key.length,
        ...data.map((i) => String(i[key]).length)
      ) + 2,
    }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Penduduk");

    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([buf], { type: "application/octet-stream" });
    saveAs(file, "data_penduduk.xlsx");
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "10px 16px",
          background: "#fff",
          color: "black",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Download Data ▼
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "45px",
            left: "20px",
            background: "white",
            color: "black",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "150px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 10,
          }}
        >
          <div
            onClick={() => {
              downloadCSV();
              setOpen(false);
            }}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
            }}
          >
            Download CSV
          </div>

          <div
            onClick={() => {
              downloadXLSX();
              setOpen(false);
            }}
            style={{ padding: "10px", cursor: "pointer" }}
          >
            Download XLSX
          </div>
        </div>
      )}
    </div>
  );
}
