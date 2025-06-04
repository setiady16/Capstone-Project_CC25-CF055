import { renderHome } from '../views/home.js';
import { renderDiagnose } from '../views/diagnose.js';
import { renderHistory } from '../views/history.js';
import { renderHelp } from '../views/help.js';
import { renderDetail } from '../views/detail.js';
import { renderFAQ } from '../views/faq.js';
import { renderInferensi } from '../views/inferensi.js';
import logo from '../assets/logo.png';
import background from '../assets/background.jpg';

export const plantDiseases = [
  { id: 1, name: "Bercak Daun", symptoms: "Bercak coklat atau hitam pada daun...", treatment: "Gunakan fungisida..." },
  { id: 2, name: "Hawar Daun", symptoms: "Daun menguning dan layu...", treatment: "Pangkas daun yang terinfeksi..." },
  { id: 3, name: "Blast (Penyakit Blas)", symptoms: "Bercak abu-abu hingga coklat pada daun...", treatment: "Gunakan varietas tahan..." },
  { id: 4, name: "Brown Spot (Bercak Coklat)", symptoms: "Bercak kecil coklat tua...", treatment: "Aplikasikan pupuk seimbang..." },
  { id: 5, name: "Sheath Blight (Hawar Pelepah)", symptoms: "Bercak hijau-abu-abu pada pelepah...", treatment: "Gunakan fungisida seperti validamycin..." },
  { id: 6, name: "Tungro", symptoms: "Daun menguning dari ujung...", treatment: "Gunakan varietas tahan..." },
  { id: 7, name: "Bacterial Leaf Blight (Hawar Daun Bakteri)", symptoms: "Garis-garis abu-abu hingga putih...", treatment: "Gunakan bakterisida berbahan tembaga..." },
  { id: 8, name: "False Smut (Smut Palsu)", symptoms: "Malai padi berubah menjadi massa spora...", treatment: "Gunakan fungisida pada fase pembentukan malai..." }
];

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

let isProcessing = false;

// Set background dan logo saat aplikasi dimulai
document.body.style.backgroundImage = `url(${background})`;
const logoImageElement = document.getElementById('logoImage');
if (logoImageElement) {
  logoImageElement.setAttribute('src', logo);
} else {
  console.error('Elemen logoImage tidak ditemukan di DOM. Pastikan index.html memiliki <img id="logoImage"> di navbar.');
}

window.navigate = function(page, params = {}) {
  const content = document.getElementById('content');
  const loadingSpinner = document.getElementById('loadingSpinner');
  content.classList.add('opacity-0');
  loadingSpinner.classList.remove('hidden');

  setTimeout(() => {
    content.innerHTML = '';
    console.log('Navigating to page:', page, 'with params:', params);
    switch (page) {
      case 'home':
        renderHome();
        break;
      case 'diagnose':
        renderDiagnose();
        break;
      case 'history':
        renderHistory(params.page || 1);
        break;
      case 'help':
        renderHelp();
        break;
      case 'detail':
        renderDetail(params);
        break;
      case 'faq':
        renderFAQ();
        break;
      case 'inferensi':
        renderInferensi();
        break;
      default:
        console.log('Halaman tidak ditemukan:', page);
        break;
    }
    content.classList.remove('opacity-0');
    loadingSpinner.classList.add('hidden');
    setupEventListeners();
  }, 300);
};

window.analyzeImage = async function(file) {
  if (isProcessing) return;
  isProcessing = true;
  const loadingSpinner = document.getElementById('loadingSpinner');
  loadingSpinner.classList.remove('hidden');

  try {
    if (!file) {
      alert('Silakan unggah gambar terlebih dahulu!');
      return;
    }
    const validFormats = ['image/jpeg', 'image/png'];
    if (!validFormats.includes(file.type)) {
      alert('Format gambar tidak didukung! Gunakan JPG atau PNG.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran gambar melebihi 10MB!');
      return;
    }

    const base64Image = await fileToBase64(file);
    const detectedDiseaseId = Math.floor(Math.random() * plantDiseases.length);
    const disease = plantDiseases[detectedDiseaseId];

    const history = JSON.parse(localStorage.getItem('diagnosisHistory') || '[]');
    const diagnosis = {
      id: Date.now(),
      image: base64Image,
      disease: disease.name,
      date: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
      details: disease,
      plantType: 'Padi'
    };
    history.push(diagnosis);
    localStorage.setItem('diagnosisHistory', JSON.stringify(history));
    window.navigate('detail', diagnosis);
  } catch (error) {
    console.error('Error analyzing image:', error);
    alert('Terjadi kesalahan saat menganalisis gambar.');
  } finally {
    isProcessing = false;
    loadingSpinner.classList.add('hidden');
  }
};

window.deleteDiagnosis = function(id, page = 1) {
  const modal = document.getElementById('deleteModal');
  if (modal) {
    modal.classList.remove('hidden');
    const confirmBtn = modal.querySelector('#confirmDelete');
    const cancelBtn = modal.querySelector('#cancelDelete');

    confirmBtn.addEventListener('click', () => {
      let history = JSON.parse(localStorage.getItem('diagnosisHistory') || '[]');
      history = history.filter(d => d.id !== parseInt(id));
      localStorage.setItem('diagnosisHistory', JSON.stringify(history));
      modal.classList.add('hidden');
      window.navigate('history', { page });
    });

    cancelBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }
};

let currentEventListeners = [];

function setupEventListeners() {
  currentEventListeners.forEach(({ element, event, handler }) => {
    element.removeEventListener(event, handler);
  });
  currentEventListeners = [];

  const content = document.getElementById('content');
  const fileInput = document.getElementById('fileInput');

  if (fileInput) {
    const fileUploadHandler = (e) => {
      const file = e.target.files[0];
      if (file) window.analyzeImage(file).catch(err => console.error(err));
    };
    fileInput.addEventListener('change', fileUploadHandler);
    currentEventListeners.push({ element: fileInput, event: 'change', handler: fileUploadHandler });
  }

  if (content) {
    const clickHandler = (e) => {
      const link = e.target.closest('a[data-id]');
      const deleteBtn = e.target.closest('.delete-btn');

      if (link) {
        e.preventDefault();
        const id = link.getAttribute('data-id');
        const history = JSON.parse(localStorage.getItem('diagnosisHistory') || '[]');
        const diagnosis = history.find(d => d.id == id);
        if (diagnosis) window.navigate('detail', diagnosis);
      }

      if (deleteBtn) {
        const id = deleteBtn.getAttribute('data-id');
        const currentPage = parseInt(document.querySelector('button[data-current-page]')?.getAttribute('data-current-page') || '1');
        window.deleteDiagnosis(id, currentPage);
      }
    };
    content.addEventListener('click', clickHandler);
    currentEventListeners.push({ element: content, event: 'click', handler: clickHandler });
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker terdaftar dengan sukses:', registration);
    })
    .catch((err) => {
      console.error('Gagal mendaftar Service Worker:', err);
    });
}

window.navigate('home');