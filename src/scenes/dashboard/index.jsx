import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [jumlah, setJumlah] = useState({});
  const [jumlahSekolah, setJumlahSekolah] = useState(0);
  const [jumlahDusun, setJumlahDusun] = useState(0);
  const [jumlahKeluarga, setJumlahKeluarga] = useState({});
  const [jumlahKesehatan, setJumlahKesehatan] = useState(0);

  const navigate = useNavigate();

  const loadData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/penduduk_tembeng/sum`
    );
    setJumlah(res.data);
  };

  const loadDataDusun = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/penduduk_tembeng/dusun/sum`
    );
    setJumlahDusun(res.data);
  };

  const loadDataKeluarga = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/penduduk_tembeng/keluarga`
    );
    setJumlahKeluarga(res.data);
  };

  const loadDataSekolah = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/pendidikan/sum`
    );
    setJumlahSekolah(res.data);
  };

  const loadDataKesehatan = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/kesehatan/sum`
    );
    setJumlahKesehatan(res.data);
  };

  useEffect(() => {
    loadData();
    loadDataDusun();
    loadDataKeluarga();
    loadDataSekolah();
    loadDataKesehatan();
  }, []);

  const cardGrid = {
    gridColumn: {
      xs: "span 1", // mobile: full width
      sm: "span 3", // desktop: 4 card per baris
    },
  };

  const cardStyle = {
    color: "#fff",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    p: "20px",
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" />
      </Box>

      {/* GRID */}
      <Box
        display="grid"
        sx={{
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",   // mobile
            sm: "repeat(12, 1fr)",  // desktop
            md: "repeat(12, 1fr)",  // desktop
          },
        }}
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Wilayah Desa */}
        <Box sx={cardGrid} bgcolor="#5a4bb7" {...cardStyle}>
          <Typography variant="h3" fontWeight="700">
            {jumlahDusun}
          </Typography>
          <Typography variant="h6">Wilayah Desa</Typography>

          <Box flexGrow={1} />

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="text"
              sx={{ color: "#fff", textTransform: "none" }}
              onClick={() => navigate("/dusun")}
            >
              Lihat Detail ➜
            </Button>
          </Box>
        </Box>

        {/* Penduduk */}
        <Box sx={cardGrid} bgcolor="#00a7d1" {...cardStyle}>
          <Typography variant="h3" fontWeight="700">
            {jumlah.totalPenduduk || 0}
          </Typography>
          <Typography variant="h6">Penduduk</Typography>

          <Box flexGrow={1} />

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="text"
              sx={{ color: "#fff", textTransform: "none" }}
              onClick={() => navigate("/penduduk")}
            >
              Lihat Detail ➜
            </Button>
          </Box>
        </Box>

        {/* Keluarga */}
        <Box sx={cardGrid} bgcolor="#0c9b57" {...cardStyle}>
          <Typography variant="h3" fontWeight="700">
            {jumlahKeluarga.jumlah || 0}
          </Typography>
          <Typography variant="h6">Keluarga</Typography>

          <Box flexGrow={1} />

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="text"
              sx={{ color: "#fff", textTransform: "none" }}
              onClick={() => navigate("/keluarga")}
            >
              Lihat Detail ➜
            </Button>
          </Box>
        </Box>

        {/* Sekolah */}
        <Box sx={cardGrid} bgcolor="#F79A19" {...cardStyle}>
          <Typography variant="h3" fontWeight="700">
            {jumlahSekolah}
          </Typography>
          <Typography variant="h6">Sekolah</Typography>

          <Box flexGrow={1} />

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="text"
              sx={{ color: "#fff", textTransform: "none" }}
              onClick={() => navigate("/pendidikan")}
            >
              Lihat Detail ➜
            </Button>
          </Box>
        </Box>

        {/* Kesehatan */}
        <Box sx={cardGrid} bgcolor="#DE1A58" {...cardStyle}>
          <Typography variant="h3" fontWeight="700">
            {jumlahKesehatan}
          </Typography>
          <Typography variant="h6">Kesehatan</Typography>

          <Box flexGrow={1} />

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="text"
              sx={{ color: "#fff", textTransform: "none" }}
              onClick={() => navigate("/kesehatan")}
            >
              Lihat Detail ➜
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
