export function renderDetail(params) {
    const content = document.getElementById('content');
    const { disease, details, image, date } = params;

    content.innerHTML = `
    <div class="container mx-auto py-10 px-6">
      <h1 class="text-4xl font-bold text-black text-center">DETAIL DIAGNOSA</h1>
      <p class="text-gray-600 text-center mt-2">Berikut adalah hasil analisis dan rekomendasi untuk tanaman Anda</p>
      <div class="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 class="text-lg font-semibold text-black">Hasil Analisis</h2>
        <div class="mt-4">
          ${image ? `<img src="${image}" alt="${disease}" class="rounded-lg">` : `<div class="h-48 bg-gray-200 rounded-lg"></div>`}
          <p class="text-gray-600 mt-2">Nama Penyakit: <span class="font-bold">${disease}</span></p>
          ${date ? `<p class="text-gray-600 mt-2">Tanggal: ${date}</p>` : ''}
          <p class="text-gray-600 mt-2">Gejala: ${details.symptoms}</p>
          <p class="text-gray-600 mt-2">Penanganan: ${details.treatment}</p>
        </div>
      </div>
      <button onclick="window.navigate('history')" class="mt-6 bg-[#28A745] text-white py-3 px-6 rounded-lg">Kembali ke Riwayat</button>
    </div>
  `;
}