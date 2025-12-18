import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Dashboard = () => {
  const [jumlah, setJumlah] = useState(0)
  const [jumlahSekolah, setJumlahSekolah] = useState(0)
  const [jumlahDusun, setJumlahDusun] = useState(0)
  const [jumlahKeluarga, setJumlahKeluarga] = useState(0)
  const [jumlahKesehatan, setJumlahKesehatan] = useState(0)
  const navigate = useNavigate();

    const loadData = async () => {
      const res = await axios.get("http://localhost:5000/penduduk_tembeng/sum");
      setJumlah(res.data);
    };

    const loadDataDusun = async () => {
      const res = await axios.get("http://localhost:5000/penduduk_tembeng/dusun/sum");
      setJumlahDusun(res.data);
    };

    const loadDataKeluarga = async () => {
      const res = await axios.get("http://localhost:5000/penduduk_tembeng/keluarga");
      setJumlahKeluarga(res.data);
    };

    const loadDataSekolah = async () => {
      const res = await axios.get("http://localhost:5000/pendidikan/sum");
      setJumlahSekolah(res.data);
    };

    const loadDataKesehatan = async () => {
      const res = await axios.get("http://localhost:5000/kesehatan/sum");
      setJumlahKesehatan(res.data);
    };



    useEffect(()=> {
      loadData()
      loadDataDusun()
      loadDataKeluarga()
      loadDataSekolah()
      loadDataKesehatan()
    }, [])

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
            gridColumn="span 3"
            backgroundColor="#5a4bb7"
            color="#fff"
            borderRadius="8px"
            display="flex"
            flexDirection="column"
            p="20px"
          >
            <Typography variant="h3" fontWeight="700">{jumlahDusun}</Typography>
            <Typography variant="h6">Wilayah Desa</Typography>

            <Box flexGrow={1} />

            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="text"
                sx={{ color: "#fff", textTransform: "none" }}
                endIcon={<span style={{ fontSize: "16px" }}>➜</span>}
                onClick={() => navigate("/dusun")}
              >
                Lihat Detail
              </Button>
            </Box>
          </Box>

        <Box
          gridColumn="span 3"
          backgroundColor="#00a7d1"
          color="#fff"
          borderRadius="8px"
          display="flex"
          flexDirection="column"
          p="20px"
        >
          <Typography variant="h3" fontWeight="700">{jumlah.totalPenduduk}</Typography>
          <Typography variant="h6">Penduduk</Typography>

          <Box flexGrow={1} />

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="text"
              sx={{ color: "#fff", textTransform: "none" }}
              endIcon={<span style={{ fontSize: "16px" }}>➜</span>}
              onClick={() => navigate("/penduduk")}
            >
              Lihat Detail
            </Button>
          </Box>
        </Box>

        <Box
            gridColumn="span 3"
            backgroundColor="#0c9b57"
            color="#fff"
            borderRadius="8px"
            display="flex"
            flexDirection="column"
            p="20px"
          >
            <Typography variant="h3" fontWeight="700">{jumlahKeluarga.jumlah}</Typography>
            <Typography variant="h6">Keluarga</Typography>

            <Box flexGrow={1} />

            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="text"
                sx={{ color: "#fff", textTransform: "none" }}
                endIcon={<span style={{ fontSize: "16px" }}>➜</span>}
                onClick={() => navigate("/keluarga")}
              >
                Lihat Detail
              </Button>
            </Box>
          </Box>

          <Box
            gridColumn="span 3"
            backgroundColor="#F79A19"
            color="#fff"
            borderRadius="8px"
            display="flex"
            flexDirection="column"
            p="20px"
          >
            <Typography variant="h3" fontWeight="700">{jumlahSekolah}</Typography>
            <Typography variant="h6">Sekolah</Typography>

            <Box flexGrow={1} />

            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="text"
                sx={{ color: "#fff", textTransform: "none" }}
                endIcon={<span style={{ fontSize: "16px" }}>➜</span>}
                onClick={() => navigate("/pendidikan")}
              >
                Lihat Detail
              </Button>
            </Box>
          </Box>

          <Box
            gridColumn="span 3"
            backgroundColor="#DE1A58"
            color="#fff"
            borderRadius="8px"
            display="flex"
            flexDirection="column"
            p="20px"
          >
            <Typography variant="h3" fontWeight="700">{jumlahKesehatan}</Typography>
            <Typography variant="h6">Kesehatan</Typography>

            <Box flexGrow={1} />

            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="text"
                sx={{ color: "#fff", textTransform: "none" }}
                endIcon={<span style={{ fontSize: "16px" }}>➜</span>}
                onClick={() => navigate("/kesehatan")}
              >
                Lihat Detail
              </Button>
            </Box>
          </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;
