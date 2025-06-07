import padiImage from '../assets/padi.png';

export function renderHome() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="min-h-screen flex flex-col justify-center">
      <div class="container mx-auto py-12 px-6 md:px-12 lg:px-16">
        <div class="flex flex-col md:flex-row items-center justify-between gap-10">
          <div class="w-full md:w-1/2 flex flex-col items-start text-left space-y-6">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              SISTEM CERDAS<br>DETEKSI PENYAKIT<br>PADA TANAMAN PADI
            </h1>
            <p class="text-gray-600 text-lg md:text-xl leading-relaxed">
              Upload gambar daun tanaman padi anda,<br>Dan biarkan AI kami menganalisis dan memberikan<br>Diagnosis akurat tentang kondisi kesehatan<br>tanaman padi anda
            </p>
            <button onclick="window.navigate('diagnose')" class="mt-6 bg-[#28A745] text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300">
              MULAI DIAGNOSIS SEKARANG
            </button>
          </div>
          <div class="w-full md:w-1/2 flex justify-center">
            <img src="${padiImage}" alt="Tanaman Padi" class="w-full max-w-md rounded-xl shadow-lg object-cover transition-transform duration-300 hover:scale-105">
          </div>
        </div>
      </div>
    </div>
  `;
}