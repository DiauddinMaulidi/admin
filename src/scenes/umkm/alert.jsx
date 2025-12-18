import { AlertDialog } from "@base-ui/react/alert-dialog";

export default function Alert({ open, onOpenChange, onConfirm }) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>

        {/* BACKDROP */}
        <AlertDialog.Backdrop
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }} />

        {/* POPUP */}
        <AlertDialog.Popup
          style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "350px", background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)"}} >
          {/* TITLE */}
          <AlertDialog.Title
            style={{ color: "black", fontSize: "20px", fontWeight: "600", marginBottom: "10px", }} >
            Hapus data ini?
          </AlertDialog.Title>

          {/* DESCRIPTION */}
          <AlertDialog.Description style={{   fontSize: "15px",   color: "#555",   marginBottom: "20px", }} >
            Jika dihapus anda akan kehilangan beritanya.
          </AlertDialog.Description>

          {/* ACTION BUTTONS */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>

            <AlertDialog.Close
              style={{ padding: "8px 12px", background: "#ddd", borderRadius: "6px", border: "none", cursor: "pointer", }} >
              Batal
            </AlertDialog.Close>

            <AlertDialog.Close
              onClick={onConfirm}
              style={{
                padding: "8px 12px",
                background: "#e74c3c",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Hapus
            </AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
