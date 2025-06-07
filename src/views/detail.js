export function renderDetail(params) {
    const content = document.getElementById('content');
    const { disease, details, image, date } = params;

    content.innerHTML = `
    <div class="container mx-auto py-10 px-4 md:px-6 max-w-3xl">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 text-center">DETAIL DIAGNOSA</h1>
      <p class="text-gray-500 text-center mt-3 mb-8">Berikut adalah hasil analisis dan rekomendasi untuk tanaman Anda</p>
      
      <div class="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-3">Hasil Analisis</h2>
        
        <div class="mt-6 space-y-5">
          ${image ? 
            `<img src="${image}" alt="${disease}" class="w-full h-64 object-cover rounded-lg shadow-sm">` : 
            `<div class="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>`
          }
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-gray-700 mb-1">
              <span class="font-medium text-gray-900">Nama Penyakit:</span> 
              <span class="ml-2 text-gray-800 font-semibold">${disease}</span>
            </p>
            
            ${date ? `
            <p class="text-gray-700 mt-3">
              <span class="font-medium text-gray-900">Tanggal Diagnosa:</span> 
              <span class="ml-2">${date}</span>
            </p>` : ''}
          </div>
          
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-semibold text-blue-800 mb-2">Gejala yang Terdeteksi:</h3>
            <p class="text-gray-700 leading-relaxed text-justify">${details ? details.symptoms : 'Informasi gejala tidak tersedia.'}</p>
          </div>
          
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="font-semibold text-green-800 mb-2">Rekomendasi Penanganan:</h3>
            <p class="text-gray-700 leading-relaxed text-justify">${details ? details.treatment : 'Informasi penanganan tidak tersedia.'}</p>
          </div>
        </div>
      </div>
      
      <button onclick="window.navigate('history')" class="mt-8 w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition duration-200 shadow-md">
        Kembali ke Riwayat
      </button>
    </div>
  `;
}