const tanaman = [
  {
    nama: "Padi",
    nitrogen: { min: 20, max: 40 },
    fosfor: { min: 10, max: 30 },
    kalium: { min: 15, max: 35 },
    suhu: { min: 20, max: 35 },
    kelembaban: { min: 50, max: 90 },
    phTanah: { min: 5.5, max: 7.5 },
    curahHujan: { min: 100, max: 200 },
    deskripsi: "Tanah ini sangat cocok untuk tanaman padi. Pastikan drainase baik dan lakukan penyiangan rutin untuk hasil optimal."
  },
  {
    nama: "Jagung",
    nitrogen: { min: 15, max: 35 },
    fosfor: { min: 10, max: 25 },
    kalium: { min: 10, max: 30 },
    suhu: { min: 25, max: 35 },
    kelembaban: { min: 40, max: 70 },
    phTanah: { min: 5.0, max: 6.5 },
    curahHujan: { min: 50, max: 100 },
    deskripsi: "Tanah ini ideal untuk tanaman jagung. Perhatikan penyiraman teratur dan gunakan pupuk tambahan jika perlu."
  },
  {
    nama: "Kacang Tanah",
    nitrogen: { min: 10, max: 25 },
    fosfor: { min: 15, max: 30 },
    kalium: { min: 20, max: 40 },
    suhu: { min: 20, max: 30 },
    kelembaban: { min: 40, max: 70 },
    phTanah: { min: 5.5, max: 7.0 },
    curahHujan: { min: 50, max: 100 },
    deskripsi: "Tanah ini cocok untuk tanaman kacang tanah. Jaga kelembapan dan hindari genangan air."
  },
  {
    nama: "Tanaman Toleran Rendah",
    nitrogen: { min: 0, max: 10 },
    fosfor: { min: 0, max: 10 },
    kalium: { min: 0, max: 10 },
    suhu: { min: 0, max: 15 },
    kelembaban: { min: 0, max: 20 },
    phTanah: { min: 0, max: 5 },
    curahHujan: { min: 0, max: 50 },
    deskripsi: "Tanah ini memiliki nilai rendah. Pertimbangkan tanaman toleran seperti rumput atau konsultasi dengan ahli agronomi untuk rekomendasi lebih lanjut."
  }
];

export function renderInferensi() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="container mx-auto py-12 px-6">
      <h1 class="text-4xl font-bold text-[#1f2937] text-center mb-4">Inferensi Model Tanah</h1>
      <p class="text-[#4b5563] text-center mb-8 max-w-2xl mx-auto">Masukkan data tanah untuk mendapatkan rekomendasi tanaman yang sesuai berdasarkan analisis AI.</p>
      <div class="bg-white rounded-xl shadow-2xl p-8 mt-6 max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="flex flex-col">
            <label for="nitrogen" class="text-[#374151] font-medium mb-2">Nitrogen (N)</label>
            <input type="number" id="nitrogen" placeholder="Masukkan nilai" class="border border-[#d1d5db] rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#28A745] transition duration-200">
          </div>
          <div class="flex flex-col">
            <label for="fosfor" class="text-[#374151] font-medium mb-2">Fosfor (P)</label>
            <input type="number" id="fosfor" placeholder="Masukkan nilai" class="border border-[#d1d5db] rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#28A745] transition duration-200">
          </div>
          <div class="flex flex-col">
            <label for="kalium" class="text-[#374151] font-medium mb-2">Kalium (K)</label>
            <input type="number" id="kalium" placeholder="Masukkan nilai" class="border border-[#d1d5db] rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#28A745] transition duration-200">
          </div>
          <div class="flex flex-col">
            <label for="suhu" class="text-[#374151] font-medium mb-2">Suhu (°C)</label>
            <input type="number" id="suhu" placeholder="Masukkan nilai" class="border border-[#d1d5db] rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#28A745] transition duration-200">
          </div>
          <div class="flex flex-col">
            <label for="kelembaban" class="text-[#374151] font-medium mb-2">Kelembaban (%)</label>
            <input type="number" id="kelembaban" placeholder="Masukkan nilai" class="border border-[#d1d5db] rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#28A745] transition duration-200">
          </div>
          <div class="flex flex-col">
            <label for="phTanah" class="text-[#374151] font-medium mb-2">pH Tanah</label>
            <input type="number" id="phTanah" placeholder="Masukkan nilai" class="border border-[#d1d5db] rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#28A745] transition duration-200" step="0.1">
          </div>
          <div class="flex flex-col">
            <label for="curahHujan" class="text-[#374151] font-medium mb-2">Curah Hujan (mm)</label>
            <input type="number" id="curahHujan" placeholder="Masukkan nilai" class="border border-[#d1d5db] rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#28A745] transition duration-200">
          </div>
        </div>
        <div class="flex justify-center mt-8">
          <button onclick="window.inferensiModel()" class="bg-[#28A745] text-white py-3 px-8 rounded-lg hover:bg-[#1f8b3b] transition duration-200 flex items-center font-medium">
            <i class="fas fa-search mr-2"></i>Prediksi Sekarang
          </button>
        </div>
        <div id="result" class="mt-10 text-center opacity-0 transition-opacity duration-500">
          <h2 class="text-xl font-semibold text-[#1f2937] mb-4">Hasil Prediksi: <span id="prediction" class="text-[#28A745]"></span></h2>
          <div class="mt-6 border border-[#e5e7eb] rounded-lg p-6 w-full max-w-3xl mx-auto bg-[#f9fafb]">
            <p class="font-semibold text-[#1f2937]">Deskripsi:</p>
            <p id="description" class="text-[#4b5563] mt-2"></p>
          </div>
          <div id="chartContainer" class="mt-6 max-w-3xl mx-auto">
            <canvas id="soilChart"></canvas>
          </div>
        </div>
      </div>
      <button onclick="window.navigate('home')" class="mt-8 bg-[#28A745] text-white py-3 px-8 rounded-lg block mx-auto hover:bg-[#1f8b3b] transition duration-200 flex items-center font-medium">
        <i class="fas fa-home mr-2"></i>Kembali ke Beranda
      </button>
    </div>
  `;
  content.classList.remove('opacity-0');
}

window.inferensiModel = async function() {
  const button = document.querySelector('button[onclick="window.inferensiModel()"]');
  if (!button) {
    console.error('Tombol "Prediksi Sekarang" tidak ditemukan.');
    return;
  }
  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sedang Memproses...';
  button.disabled = true;

  const nitrogen = parseFloat(document.getElementById('nitrogen').value) || 0;
  const fosfor = parseFloat(document.getElementById('fosfor').value) || 0;
  const kalium = parseFloat(document.getElementById('kalium').value) || 0;
  const suhu = parseFloat(document.getElementById('suhu').value) || 0;
  const kelembaban = parseFloat(document.getElementById('kelembaban').value) || 0;
  const phTanah = parseFloat(document.getElementById('phTanah').value) || 0;
  const curahHujan = parseFloat(document.getElementById('curahHujan').value) || 0;

  const inputs = [nitrogen, fosfor, kalium, suhu, kelembaban, phTanah, curahHujan];
  console.log('Input values:', inputs);

  if (inputs.some(val => val < 0)) {
    alert('Nilai tidak boleh negatif!');
    button.innerHTML = originalText;
    button.disabled = false;
    return;
  }
  if (phTanah < 0 || phTanah > 14) {
    alert('Nilai pH harus antara 0 dan 14!');
    button.innerHTML = originalText;
    button.disabled = false;
    return;
  }
  if (inputs.some(val => isNaN(val))) {
    alert('Harap masukkan semua nilai dengan benar!');
    button.innerHTML = originalText;
    button.disabled = false;
    return;
  }

  const loadingSpinner = document.getElementById('loadingSpinner');
  loadingSpinner.classList.remove('hidden');

  try {
    const result = await Promise.race([
      new Promise((resolve) => setTimeout(resolve, 5000, 'timeout')),
      (async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        let prediction = 'Tidak Diketahui';
        let description = 'Data tanah tidak sesuai dengan rekomendasi tanaman utama. Pertimbangkan analisis lebih lanjut.';

        for (const tanamanItem of tanaman) {
          const isMatch =
            nitrogen >= tanamanItem.nitrogen.min && nitrogen <= tanamanItem.nitrogen.max &&
            fosfor >= tanamanItem.fosfor.min && fosfor <= tanamanItem.fosfor.max &&
            kalium >= tanamanItem.kalium.min && kalium <= tanamanItem.kalium.max &&
            suhu >= tanamanItem.suhu.min && suhu <= tanamanItem.suhu.max &&
            kelembaban >= tanamanItem.kelembaban.min && kelembaban <= tanamanItem.kelembaban.max &&
            phTanah >= tanamanItem.phTanah.min && phTanah <= tanamanItem.phTanah.max &&
            curahHujan >= tanamanItem.curahHujan.min && curahHujan <= tanamanItem.curahHujan.max;

          if (isMatch) {
            prediction = tanamanItem.nama;
            description = tanamanItem.deskripsi;
            break;
          }
        }

        const predictionElement = document.getElementById('prediction');
        const descriptionElement = document.getElementById('description');
        if (predictionElement && descriptionElement) {
          predictionElement.textContent = prediction;
          descriptionElement.textContent = description;

          let history = JSON.parse(localStorage.getItem('diagnosisHistory') || '[]');
          const inference = {
            id: Date.now(),
            prediction: prediction,
            date: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
            details: { description: description }
          };
          history.push(inference);
          localStorage.setItem('diagnosisHistory', JSON.stringify(history));

          const resultDiv = document.getElementById('result');
          if (resultDiv) {
            resultDiv.classList.remove('opacity-0');
            resultDiv.classList.add('opacity-100');
          }

          const ctx = document.getElementById('soilChart').getContext('2d');
          if (ctx) {
            new Chart(ctx, {
              type: 'bar',
              data: {
                labels: ['Nitrogen', 'Fosfor', 'Kalium', 'Suhu', 'Kelembaban', 'pH Tanah', 'Curah Hujan'],
                datasets: [{
                  label: 'Nilai Input',
                  data: [nitrogen, fosfor, kalium, suhu, kelembaban, phTanah, curahHujan],
                  backgroundColor: ['#28A745', '#34D399', '#FBBF24', '#3B82F6', '#EC4899', '#8B5CF6', '#EF4444'],
                  borderColor: ['#1f8b3b', '#2aa57b', '#d4a017', '#2563eb', '#db2777', '#7c3aed', '#dc2626'],
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Nilai'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Parameter'
                    }
                  }
                },
                plugins: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: 'Analisis Input Tanah'
                  }
                }
              }
            });
          } else {
            console.error('Canvas context untuk soilChart tidak ditemukan.');
          }
        } else {
          console.error('Elemen #prediction atau #description tidak ditemukan.');
        }
        return 'success';
      })()
    ]);

    if (result === 'timeout') {
      throw new Error('Proses prediksi terlalu lama, coba lagi.');
    }
  } catch (error) {
    console.error('Error during inference:', error);
    alert('Terjadi kesalahan: ' + error.message);
    const predictionElement = document.getElementById('prediction');
    const descriptionElement = document.getElementById('description');
    if (predictionElement && descriptionElement) {
      predictionElement.textContent = 'Gagal';
      descriptionElement.textContent = 'Gagal memproses prediksi. Silakan coba lagi atau periksa input.';
    }
  } finally {
    button.innerHTML = originalText;
    button.disabled = false;
    loadingSpinner.classList.add('hidden');
  }
};