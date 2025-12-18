import { useState, useContext } from "react"; // <-- Tambahkan useState
import { Box, IconButton, useTheme, Menu, MenuItem } from "@mui/material"; // <-- Import Menu dan MenuItem
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate

import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"; // <-- Import ikon Logout

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate(); // <-- Inisialisasi hook navigasi

    // --- STATE UNTUK MENGONTROL MENU PROFILE ---
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl); // Status menu terbuka atau tertutup

    // Fungsi untuk membuka menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Fungsi untuk menutup menu
    const handleClose = () => {
        navigate("/profile")
        setAnchorEl(null);
    };

    // --- FUNGSI LOGOUT ---
    const handleLogout = () => {
        // 1. Hapus token dari Local Storage
        localStorage.removeItem('token');

        // 2. Tutup menu
        handleClose();

        // 3. Arahkan pengguna kembali ke halaman login
        navigate('/login');
    };
    // ------------------------------------------

    return (
        <Box display="flex" justifyContent="end" p={2}>

            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>

                {/* --- ICON PROFILE YANG MEMBUKA MENU LOGOUT --- */}
                <IconButton
                    onClick={handleClick} // Fungsi yang membuka menu
                    aria-controls={open ? 'profile-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>

            {/* --- KOMPONEN MENU DROPDOWN --- */}
            <Menu
                anchorEl={anchorEl}
                id="profile-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                // Posisi menu agar muncul di bawah ikon
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {/* Opsi 1: Profile (Opsional, Anda bisa menambahkan link ke halaman profile) */}
                <MenuItem onClick={handleClose}>
                    <PersonOutlinedIcon sx={{ mr: 1 }} /> Profile Saya
                </MenuItem>

                {/* Opsi 2: Tombol Logout */}
                <MenuItem onClick={handleLogout}>
                    <LogoutOutlinedIcon sx={{ mr: 1 }} /> Logout
                </MenuItem>
            </Menu>
            {/* ------------------------------------- */}
        </Box>
    );
};

export default Topbar;