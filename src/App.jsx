import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calender";
import Penduduk from "./scenes/penduduk";
import Dusun from "./scenes/dusun";

import TambahPenduduk from "./components/TambahPenduduk";
import EditPenduduk from "./components/EditPenduduk";
import HalamanBerita from "./scenes/berita";
import Berita from "./components/TambahBerita";
import EditDusun from "./components/EditDusun";
import Keluarga from "./scenes/keluarga";
import KeluargaDetail from "./components/KeluargaDetail";
import LoginForm from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Outlet } from "react-router-dom";
import Umkm from "./scenes/umkm";
import EditBerita from "./components/EditBerita";
import TambahUmkm from "./components/TambahUmkm";
import EditUmkm from "./components/EditUmkm";
import Gallery from "./scenes/gallery";
import TambahGallery from "./components/TambahGalery";
import Profile from "./scenes/profile";
import Pendidikan from "./scenes/pendidikan";
import TambahSekolah from "./components/TambahSekolah";
import EditPendidikan from "./components/EditPendidikan";
import Kesehatan from "./scenes/kesehatan";
import TambahKesehatan from "./components/TambahKesehatan";
import EditKesehatan from "./components/EditKesehatan";

function Layout({ isSidebar, setIsSidebar }) {
  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          {/* Rute Public */}
          <Route path="/login" element={<LoginForm />} />

          {/* Rute Protected */}
          <Route element={<ProtectedRoute />}>
            <Route
              element={<Layout isSidebar={isSidebar} setIsSidebar={setIsSidebar} />}
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/penduduk" element={<Penduduk />} />
              <Route path="/tambah" element={<TambahPenduduk />} />
              <Route path="/edit/:id" element={<EditPenduduk />} />
              <Route path="/pendidikan" element={<Pendidikan />} />
              <Route path="/pendidikan/tambah" element={<TambahSekolah />} />
              <Route path="/pendidikan/edit/:id" element={<EditPendidikan />} />
              <Route path="/kesehatan" element={<Kesehatan />} />
              <Route path="/kesehatan/tambah" element={<TambahKesehatan />} />
              <Route path="/kesehatan/edit/:id" element={<EditKesehatan />} />
              <Route path="/dusun" element={<Dusun />} />
              <Route path="/dusun/edit/:id" element={<EditDusun />} />
              <Route path="/keluarga" element={<Keluarga />} />
              <Route path="/keluarga/detail/:id" element={<KeluargaDetail />} />
              <Route path="/berita" element={<HalamanBerita />} />
              <Route path="/berita/tambah" element={<Berita />} />
              <Route path="/berita/edit/:id" element={<EditBerita />} />
              <Route path="/umkm" element={<Umkm />} />
              <Route path="/umkm/tambah" element={<TambahUmkm />} />
              <Route path="/umkm/edit/:id" element={<EditUmkm />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/gallery/tambah" element={<TambahGallery />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/form" element={<Form />} />
            </Route>
          </Route>
        </Routes>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
