import { Chart } from 'chart.js/auto';

let chartInstance = null;

export function renderHistory(page = 1) {
  const history = JSON.parse(localStorage.getItem('diagnosisHistory') || '[]');
  console.log('Diagnosis History:', history);

  const itemsPerPage = 6;
  const totalItems = history.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  let currentItems = history.slice(startIndex, endIndex);

  const diseaseCounts = history.reduce((acc, d) => {
    if (d.disease) {
      acc[d.disease] = (acc[d.disease] || 0) + 1;
    }
    return acc;
  }, {});
  console.log('Disease Counts:', diseaseCounts);

  const totalThisMonth = history.filter(d => {
    const dateParts = d.date.split(', ')[0].split('/');
    const diagnosisDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    const now = new Date();
    return diagnosisDate.getMonth() === now.getMonth() && diagnosisDate.getFullYear() === now.getFullYear();
  }).length;
  console.log('Total This Month:', totalThisMonth);

  const uniqueDiseases = Object.keys(diseaseCounts).length;
  const mostCommonDisease = Object.keys(diseaseCounts).length > 0
    ? Object.keys(diseaseCounts).reduce((a, b) => diseaseCounts[a] > diseaseCounts[b] ? a : b)
    : "Tidak Ada";

  const diseaseLabels = Object.keys(diseaseCounts).length > 0 ? Object.keys(diseaseCounts) : ["Belum Ada Data"];
  const diseaseValues = Object.keys(diseaseCounts).length > 0 ? Object.values(diseaseCounts) : [1];
  console.log('Pie Chart Data:', { labels: diseaseLabels, values: diseaseValues });

  const content = document.getElementById('content');
  if (!content) {
    console.error('Elemen #content tidak ditemukan di DOM');
    return;
  }

  content.innerHTML = `
    <div class="container mx-auto py-10 px-6">
      <h1 class="text-4xl font-bold text-black text-center">RIWAYAT DIAGNOSA</h1>
      <p class="text-gray-600 text-center mt-2">Lihat semua diagnosis penyakit tanaman padi yang pernah Anda lakukan sebelumnya. Data disimpan secara lokal di browser Anda.</p>
      
      <!-- Distribusi Penyakit dan Statistik -->
      <div class="flex justify-between mt-6 flex-col md:flex-row gap-6">
        <div class="w-full md:w-1/3">
          <div class="bg-white rounded-lg shadow-md p-4">
            <h3 class="text-lg font-semibold text-black">Distribusi Penyakit</h3>
            <p class="text-gray-600 mt-2">Statistik penyakit yang terdeteksi</p>
            <div class="mt-4">
              <canvas id="diseaseChart" class="max-h-48 w-full"></canvas>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="bg-white rounded-lg shadow-md p-4">
              <p class="text-gray-600">Total Diagnosis</p>
              <p class="text-2xl font-bold text-black">${totalItems}</p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-4">
              <p class="text-gray-600">Bulan Ini</p>
              <p class="text-2xl font-bold text-black">${totalThisMonth}</p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-4">
              <p class="text-gray-600">Penyakit Terdeteksi</p>
              <p class="text-2xl font-bold text-black">${uniqueDiseases} Jenis</p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-4">
              <p class="text-gray-600">Penyakit Terbanyak</p>
              <p class="text-2xl font-bold text-black">${mostCommonDisease}</p>
            </div>
          </div>
        </div>
        <div class="w-full md:w-2/3">
          <!-- Filter Section -->
          <div class="flex justify-between mb-4 flex-col md:flex-row gap-4">
            <input type="text" id="searchInput" placeholder="Cari berdasarkan nama penyakit..." class="w-full md:w-1/3 p-2 rounded-lg border border-gray-300">
            <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <select id="diseaseFilter" class="p-2 rounded-lg border border-gray-300">
                <option value="">Semua Penyakit</option>
                ${Object.keys(diseaseCounts).map(disease => `<option value="${disease}">${disease}</option>`).join('')}
              </select>
              <select id="timeFilter" class="p-2 rounded-lg border border-gray-300">
                <option value="">Semua Waktu</option>
                <option value="thisMonth">Bulan Ini</option>
                <option value="thisYear">Tahun Ini</option>
              </select>
              <button id="applyFilters" class="bg-[#28A745] text-white py-2 px-4 rounded-lg hover:bg-green-600">Terapkan</button>
            </div>
          </div>
          <!-- Diagnosis Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4" id="diagnosisCards">
            ${
              currentItems.length > 0
                ? currentItems.map(d => `
                    <div class="bg-white rounded-lg shadow-md p-4 flex flex-col">
                      <img src="${d.image || 'https://via.placeholder.com/150'}" alt="${d.disease}" class="rounded-lg h-40 w-full object-cover">
                      <p class="text-gray-600 mt-2 font-semibold">${d.disease}</p>
                      <p class="text-gray-600 text-sm flex-grow">${d.date}</p>
                      <div class="flex justify-between mt-2">
                        <a href="#" data-id="${d.id}" class="text-[#28A745] hover:underline detail-link">Lihat Detail</a>
                        <button data-id="${d.id}" class="text-red-600 hover:text-red-800 delete-btn">Hapus</button>
                      </div>
                    </div>
                  `).join('')
                : '<p class="text-gray-600 col-span-3 text-center">Belum ada riwayat diagnosis.</p>'
            }
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="flex justify-center mt-6" id="pagination">
        <button class="mx-2 text-gray-600 px-3 py-1 rounded ${page === 1 ? 'cursor-not-allowed opacity-50' : ''}" data-page="history" data-current-page="${page}" data-total-pages="${totalPages}"><</button>
        ${Array.from({ length: totalPages }, (_, i) => i + 1).map(i => `
          <button class="mx-2 ${page === i ? 'bg-[#28A745] text-white' : 'text-gray-600'} px-4 py-2 rounded" data-page="history" data-current-page="${page}" data-total-pages="${totalPages}">${i}</button>
        `).join('')}
        <button class="mx-2 text-gray-600 px-3 py-1 rounded ${page === totalPages ? 'cursor-not-allowed opacity-50' : ''}" data-page="history" data-current-page="${page}" data-total-pages="${totalPages}">></button>
      </div>
    </div>
  `;

  if (chartInstance) {
    chartInstance.destroy();
  }

  setTimeout(() => {
    const ctx = document.getElementById('diseaseChart')?.getContext('2d');
    console.log('Canvas element after timeout:', document.getElementById('diseaseChart'));
    if (ctx) {
      chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: diseaseLabels,
          datasets: [{
            data: diseaseValues,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#4CAF50'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#4CAF50'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: { enabled: true }
          }
        }
      });
    } else {
      console.error('Canvas context untuk diseaseChart tidak ditemukan setelah timeout');
    }
  }, 100);

  let filteredHistory = [...history];

  const updateDiagnosisCards = (filteredData, currentPage = 1) => {
    const itemsPerPage = 6;
    const filteredTotalItems = filteredData.length;
    const filteredTotalPages = Math.ceil(filteredTotalItems / itemsPerPage);
    const filteredStartIndex = (currentPage - 1) * itemsPerPage;
    const filteredEndIndex = Math.min(filteredStartIndex + itemsPerPage, filteredTotalItems);
    const filteredCurrentItems = filteredData.slice(filteredStartIndex, filteredEndIndex);

    const diagnosisCards = document.getElementById('diagnosisCards');
    if (diagnosisCards) {
      diagnosisCards.innerHTML = filteredCurrentItems.length > 0
        ? filteredCurrentItems.map(d => `
            <div class="bg-white rounded-lg shadow-md p-4 flex flex-col">
              <img src="${d.image || 'https://via.placeholder.com/150'}" alt="${d.disease}" class="rounded-lg h-40 w-full object-cover">
              <p class="text-gray-600 mt-2 font-semibold">${d.disease}</p>
              <p class="text-gray-600 text-sm flex-grow">${d.date}</p>
              <div class="flex justify-between mt-2">
                <a href="#" data-id="${d.id}" class="text-[#28A745] hover:underline detail-link">Lihat Detail</a>
                <button data-id="${d.id}" class="text-red-600 hover:text-red-800 delete-btn">Hapus</button>
              </div>
            </div>
          `).join('')
        : '<p class="text-gray-600 col-span-3 text-center">Tidak ada riwayat diagnosis yang sesuai.</p>';
    }

    const pagination = document.getElementById('pagination');
    if (pagination) {
      pagination.innerHTML = `
        <button class="mx-2 text-gray-600 px-3 py-1 rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}" data-page="history" data-current-page="${currentPage}" data-total-pages="${filteredTotalPages}"><</button>
        ${Array.from({ length: filteredTotalPages }, (_, i) => i + 1).map(i => `
          <button class="mx-2 ${currentPage === i ? 'bg-[#28A745] text-white' : 'text-gray-600'} px-4 py-2 rounded" data-page="history" data-current-page="${currentPage}" data-total-pages="${filteredTotalPages}">${i}</button>
        `).join('')}
        <button class="mx-2 text-gray-600 px-3 py-1 rounded ${currentPage === filteredTotalPages ? 'cursor-not-allowed opacity-50' : ''}" data-page="history" data-current-page="${currentPage}" data-total-pages="${filteredTotalPages}">></button>
      `;
    }

    addEventListeners(filteredData, currentPage);
  };

  const applyFilters = () => {
    const searchInput = document.getElementById('searchInput');
    const plantFilter = document.getElementById('plantFilter');
    const diseaseFilter = document.getElementById('diseaseFilter');
    const timeFilter = document.getElementById('timeFilter');

    const searchTerm = searchInput.value.toLowerCase().trim();
    const plant = plantFilter.value;
    const disease = diseaseFilter.value;
    const time = timeFilter.value;
    console.log('Filter values:', { searchTerm, plant, disease, time });

    let filteredData = [...history];

    if (searchTerm) {
      filteredData = filteredData.filter(d => d.disease?.toLowerCase().includes(searchTerm));
    }

    if (plant && plant !== '') {
      filteredData = filteredData.filter(d => d.plantType === plant);
    }

    if (disease && disease !== '') {
      filteredData = filteredData.filter(d => d.disease === disease);
    }

    if (time === 'thisMonth') {
      filteredData = filteredData.filter(d => {
        const dateParts = d.date.split(', ')[0].split('/');
        const diagnosisDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        const now = new Date();
        return diagnosisDate.getMonth() === now.getMonth() && diagnosisDate.getFullYear() === now.getFullYear();
      });
    } else if (time === 'thisYear') {
      filteredData = filteredData.filter(d => {
        const dateParts = d.date.split(', ')[0].split('/');
        const diagnosisDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        const now = new Date();
        return diagnosisDate.getFullYear() === now.getFullYear();
      });
    }

    console.log('Filtered history:', filteredData);
    filteredHistory = filteredData;
    updateDiagnosisCards(filteredHistory, 1);
  };

  const addEventListeners = (data, currentPage) => {
    const applyFiltersButton = document.getElementById('applyFilters');
    const searchInput = document.getElementById('searchInput');

    if (applyFiltersButton) {
      const newApplyFiltersButton = applyFiltersButton.cloneNode(true);
      applyFiltersButton.parentNode.replaceChild(newApplyFiltersButton, applyFiltersButton);
      newApplyFiltersButton.addEventListener('click', applyFilters);

      const newSearchInput = searchInput.cloneNode(true);
      searchInput.parentNode.replaceChild(newSearchInput, searchInput);
      newSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          applyFilters();
        }
      });
    } else {
      console.error('Tombol applyFilters tidak ditemukan');
    }

    const detailLinks = document.querySelectorAll('.detail-link');
    console.log('Detail links found:', detailLinks.length);
    detailLinks.forEach(link => {
      link.removeEventListener('click', handleDetailLinkClick);
      link.addEventListener('click', handleDetailLinkClick);
    });

    function handleDetailLinkClick(e) {
      e.preventDefault();
      console.log('Tombol Lihat Detail diklik:', e.target.getAttribute('data-id'));
      const id = parseInt(e.target.getAttribute('data-id'));
      const diagnosis = data.find(d => d.id === id);
      if (diagnosis) {
        window.navigate('detail', diagnosis);
      }
    }

    const paginationButtons = document.querySelectorAll('#pagination button');
    console.log('Pagination buttons found:', paginationButtons.length);
    paginationButtons.forEach(button => {
      button.removeEventListener('click', handlePaginationClick);
      button.addEventListener('click', handlePaginationClick);
    });

    function handlePaginationClick(e) {
      console.log('Tombol Paginasi diklik:', e.target.textContent);
      const pageType = e.target.getAttribute('data-page');
      const currentPage = parseInt(e.target.getAttribute('data-current-page'));
      const totalPages = parseInt(e.target.getAttribute('data-total-pages'));
      if (e.target.textContent.trim() === '<' && currentPage > 1) {
        updateDiagnosisCards(filteredHistory, currentPage - 1);
      } else if (e.target.textContent.trim() === '>' && currentPage < totalPages) {
        updateDiagnosisCards(filteredHistory, currentPage + 1);
      } else if (!isNaN(parseInt(e.target.textContent.trim()))) {
        updateDiagnosisCards(filteredHistory, parseInt(e.target.textContent.trim()));
      }
    }
  };

  addEventListeners(history, page);
}