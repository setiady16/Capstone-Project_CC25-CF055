# Capstone-Project CC25-CF055

## Sistem Cerdas Deteksi Penyakit pada Tanaman Padi
Proyek ini bertujuan untuk membangun aplikasi web yang dapat membantu petani dalam mendeteksi penyakit pada tanaman padi serta memberikan referensi tingkat pH tanah yang sesuai untuk tanaman padi. Proyek ini merupakan kolaborasi lintas jalur pembelajaran Machine Learning dan Front-End serta Back-End Developer, dengan memanfaatkan model machine learning dan pengembangan aplikasi web modern yang responsif dan fungsional.

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

Demo website : [Youtube](https://www.youtube.com/watch?v=Bd5pAyd-f5g&feature=youtu.be)

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

## Tim Kami
| Name | University | Student ID | Learning Path |
|---------|---------|---------|---------|
| Dondi Setiawan |  Universitas Palangka Raya |  MC359D5Y2184 | Machine Learning | 
| Dimas Aditia Anugerah Setiady |  Universitas Kristen Immanuel |  MC240D5Y0910 | Machine Learning |   
| Samuel Rama Silo Padang |  Universitas Kristen Immanuel |  MC240D5Y1724 | Machine Learning |   
| Yaaman Nazara |  Universitas Kristen Immanuel | FC240D5Y0978  | Front-end & Back-End |   
| Kearifan Yopimar |  Universitas Kristen Immanuel |  FC240D5Y0979 | Front-end & Back-End |   
