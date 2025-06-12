# Capstone-Project

## Penggunaan Website
### 1. Deteksi Penyakit padi
User akan masuk kehalaman dashboard dan menekan tombol Mulai Diagnosis Sekarang.
![Dashboard](https://github.com/Donsss/IMAGE/blob/main/capstone/dashboard.png)
User me-upload gambar penyakit pada tanaman padi.
![Diagnosis](https://github.com/Donsss/IMAGE/blob/main/capstone/diagnosa.png)
Sistem akan menampilkan hasilnya.
![Detail Diagnosis](https://github.com/Donsss/IMAGE/blob/main/capstone/hasil%20diagnosa.png)

### 2. Prediksi Jenis Tanaman
User masuk kehalaman Prediksi tanaman, kemudian memasukkan inputan berdasarkan parameter kandungan tanah.
![Prediksi Tanaman](https://github.com/Donsss/IMAGE/blob/main/capstone/prediksi%20tanaman.png)

Menampilkan hasil prediksi beserta dekripsinya.
![Deskripsi Tanaman](https://github.com/Donsss/IMAGE/blob/main/capstone/dekripsi%20tanaman.png)

## Cara Menjalankan Website di Localhost

## Prasyarat
Sebelum memulai, pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (versi LTS disarankan)
- [Python](https://www.python.org/) (versi 3.7 atau lebih baru)

### 1. Clone Repository
Clone repository ini ke direktori lokal Anda
```
git clone https://github.com/setiady16/Capstone-Project_CC25-CF055.git
```

### 2. Setup Environment Python
Jalankan perintah berikut di terminal/shell untuk menyiapkan environment Python:
```
cd api
python -m venv env
.\env\Scripts\activate
pip install -r requirements.txt
```


### 3. Menjalankan Aplikasi Python
Setelah environment terpasang, jalankan aplikasi Flask dengan perintah:
```
python app.py
```
Biarkan terminal ini tetap terbuka selama pengembangan.

### 4. Setup Node.js
Buka terminal baru (tanpa menutup terminal sebelumnya) dan jalankan:
```
npm install
npm run build
npm install -g serve
npm run dev
```

### 5. Akses Aplikasi
Aplikasi akan berjalan pada:
```
Frontend: http://localhost:5173
Backend: http://127.0.0.1:5000
```
