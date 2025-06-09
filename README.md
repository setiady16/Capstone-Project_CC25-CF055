# Capstone-Project

## Prasyarat
Sebelum memulai, pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (versi LTS disarankan)
- [Python](https://www.python.org/) (versi 3.7 atau lebih baru)
- [Pipenv](https://pipenv.pypa.io/) (untuk manajemen environment Python)

## Cara Menjalankan Website di Localhost

### 1. Clone Repository
Clone repository ini ke direktori lokal Anda
```
git clone https://github.com/setiady16/Capstone-Project_CC25-CF055.git
```

### 2. Setup Environment Python
Jalankan perintah berikut di terminal/shell untuk menyiapkan environment Python:
```
cd api
pipenv install
pipenv shell
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
