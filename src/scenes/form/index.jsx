import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios"; // <-- Import Axios

// URL endpoint registrasi di backend Node.js Anda
const REGISTRATION_API_URL = 'http://localhost:5000/register';

const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    // Fungsi yang dipanggil saat form disubmit
    const handleFormSubmit = async (values, { resetForm }) => {
        console.log("Mengirim data registrasi:", values);

        try {
            // Mengirim permintaan POST ke backend Node.js
            const response = await axios.post(REGISTRATION_API_URL, {
                nama: values.nama,
                username: values.username,
                password: values.password, // Password akan di-hash di backend!
            });

            console.log("Registrasi Berhasil:", response.data);
            alert(`Pengguna ${values.username} berhasil dibuat!`);

            // Mengatur ulang formulir setelah berhasil
            resetForm();

        } catch (error) {
            console.error("Registrasi Gagal:", error.response ? error.response.data : error.message);
            // Menampilkan pesan error spesifik dari backend jika ada
            alert(`Gagal: ${error.response?.data?.message || 'Terjadi kesalahan saat menghubungi server.'}`);
        }
    };

    return (
        <Box m="20px">
            <Header title="CREATE USER" subtitle="Create a New User Profile" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            {/* FIELD NAMA */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Nama"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.nama}
                                name="nama"
                                error={!!touched.nama && !!errors.nama}
                                helperText={touched.nama && errors.nama}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/* FIELD USERNAME */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name="username"
                                error={!!touched.username && !!errors.username}
                                helperText={touched.username && errors.username}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/* FIELD PASSWORD */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password" // Menggunakan type="password" untuk keamanan
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New User
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

// --- SCHEMA VALIDASI YUP YANG DIPERBARUI ---
const checkoutSchema = yup.object().shape({
    nama: yup.string().required("Nama wajib diisi"),
    username: yup.string().required("Username wajib diisi"),
    password: yup
        .string()
        .min(6, "Password minimal 6 karakter")
        .required("Password wajib diisi"),
});

// --- NILAI AWAL YANG DIPERBARUI ---
const initialValues = {
    nama: "",
    username: "",
    password: "",
};

export default Form;