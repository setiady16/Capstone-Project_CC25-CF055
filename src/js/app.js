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
  { 
    name: "Bacterial leaf blight", 
    symptoms: "Penyakit Bacterial Leaf Blight (BLB) atau hawar daun bakteri pada padi disebabkan oleh bakteri Xanthomonas oryzae pv. oryzae. Gejala awal ditandai dengan munculnya bercak-bercak kecil berwarna hijau pucat atau kekuningan di tepi daun, yang kemudian meluas membentuk garis-garis memanjang berwarna kuning hingga kecokelatan. Pada kondisi lembap, sering terlihat cairan bakteri berwarna kuning seperti susu yang mengering di permukaan daun. Serangan parah menyebabkan daun mengering dari ujung secara progresif (kresek), pertumbuhan tanaman terhambat, dan malai menjadi hampa. Penyakit ini menyebar cepat melalui air irigasi, percikan hujan, atau peralatan pertanian yang terkontaminasi, terutama pada musim hujan dengan kelembaban tinggi.", 
    treatment: "Pengendalian Bacterial Leaf Blight memerlukan pendekatan terpadu. Gunakan varietas padi yang resisten seperti IR64 atau Ciherang untuk mengurangi risiko infeksi. Hindari pemupukan nitrogen berlebihan karena dapat memicu kerentanan tanaman. Lakukan rotasi tanaman dengan palawija untuk memutus siklus hidup bakteri. Untuk lahan yang terinfeksi, aplikasi bakterisida berbahan aktif tembaga oksiklorida atau streptomycin sulfat dapat membantu menekan perkembangan penyakit. Pastikan sanitasi lahan dengan membersihkan sisa tanaman sakit dan gulma inang. Pengelolaan air yang baik dengan sistem intermitten (pengairan berselang) sangat efektif mengurangi kelembaban berlebih. Pada kasus berat, penyemprotan agen hayati seperti Pseudomonas fluorescens dapat digunakan sebagai alternatif pengendalian ramah lingkungan. Pemantauan rutin sejak fase vegetatif penting untuk deteksi dini dan penanganan tepat waktu." 
  },
  { 
    name: "Brown Spot", 
    symptoms: "Brown spot atau bercak cokelat adalah penyakit tanaman yang disebabkan oleh jamur Bipolaris oryzae. Gejala utama yang terlihat adalah munculnya bercak-bercak kecil berbentuk oval atau bulat berwarna cokelat pada daun, yang lama-kelamaan dapat melebar dan menyatu. Bercak ini sering dikelilingi oleh area kuning, dan dalam kondisi parah, daun bisa mengering dan mati. Pada tanaman padi, penyakit ini dapat menyerang gabah, menyebabkan bintik-bintik cokelat pada kulit gabah yang mengurangi kualitas hasil panen. Penyakit ini biasanya berkembang pesat di lingkungan lembap dengan kelembaban tinggi dan suhu hangat.", 
    treatment: "Untuk mengendalikan brown spot, disarankan untuk melakukan beberapa langkah pencegahan dan pengobatan. Pertama, gunakan benih yang sehat dan resisten terhadap penyakit. Kedua, hindari penanaman terlalu rapat agar sirkulasi udara baik dan mengurangi kelembaban. Jika terinfeksi, aplikasikan fungisida berbahan aktif seperti mancozeb atau azoxystrobin sesuai dosis anjuran. Selain itu, praktik rotasi tanaman dengan jenis yang tidak rentan dapat memutus siklus hidup jamur. Pastikan juga membersihkan sisa-sisa tanaman yang terinfeksi untuk mencegah penyebaran spora jamur. Pengelolaan air yang baik, seperti menghindari genangan air, juga dapat mengurangi risiko infeksi brown spot." 
  },
  { 
    name: "Leaf Smut", 
    symptoms: "Penyakit leaf smut pada padi, yang disebabkan oleh jamur Entyloma oryzae, menunjukkan gejala khas berupa munculnya bercak-bercak memanjang berwarna kuning pucat hingga keputihan pada daun. Awalnya, bercak ini muncul di bagian ujung atau tepi daun, kemudian secara bertahap meluas ke bagian tengah daun. Seiring perkembangan penyakit, bercak-bercak tersebut berubah warna menjadi kecokelatan dan menyebabkan daun mengering. Pada kasus yang parah, daun menjadi rapuh dan mudah patah, sehingga mengurangi kemampuan tanaman dalam melakukan fotosintesis. Hal ini berdampak signifikan terhadap pertumbuhan tanaman dan hasil panen. Penyakit ini cenderung berkembang pesat pada kondisi lingkungan yang lembap dan hangat, terutama selama musim hujan, sehingga memerlukan pengawasan ekstra pada periode tersebut.", 
    treatment: "Penanganan leaf smut memerlukan pendekatan terpadu yang mencakup tindakan pencegahan dan pengendalian. Langkah pertama yang penting adalah menggunakan benih sehat bersertifikat untuk memastikan tanaman bebas dari patogen sejak awal. Rotasi tanaman dengan jenis tanaman lain yang tidak rentan terhadap penyakit ini dapat membantu memutus siklus hidup jamur. Pengaturan jarak tanam yang tidak terlalu rapat juga diperlukan untuk menjaga sirkulasi udara yang baik, sehingga mengurangi kelembaban di sekitar tanaman yang dapat memicu pertumbuhan jamur. Jika serangan sudah terjadi, aplikasi fungisida berbahan aktif seperti tricyclazole atau kasugamycin dapat dilakukan sesuai dengan dosis yang dianjurkan. Selain itu, menjaga kebersihan lahan dengan membersihkan sisa-sisa tanaman yang terinfeksi dan gulma sangat penting untuk mencegah penyebaran spora jamur. Pengelolaan air yang baik, termasuk menghindari penggenangan air berlebihan dan memastikan drainase yang memadai, juga membantu menekan perkembangan penyakit. Dengan menerapkan langkah-langkah ini secara konsisten, dampak negatif leaf smut terhadap produktivitas padi dapat diminimalkan." 
  },
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

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://127.0.0.1:5000/predict_padi', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    if (response.ok && data.predicted_class) {
      const confidence = data.confidence;
      const diseaseName = data.predicted_class;
      const diseaseInfo = plantDiseases.find(d => d.name === diseaseName); 

      const base64Image = await fileToBase64(file);
      const history = JSON.parse(localStorage.getItem('diagnosisHistory') || '[]');
      const diagnosis = {
        id: Date.now(),
        image: base64Image,
        disease: confidence >= 0.5 ? diseaseInfo.name : "Data tidak bisa diklasifikasi",
        date: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
        details: confidence >= 0.5 ? { 
          symptoms: diseaseInfo.symptoms, 
          treatment: diseaseInfo.treatment 
        } : null,
        plantType: 'Padi'
      };
      history.push(diagnosis);
      localStorage.setItem('diagnosisHistory', JSON.stringify(history));
      window.navigate('detail', diagnosis);
    } else {
      alert('Error: ' + data.error);
    }
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
    .then(() => console.log('Service Worker terdaftar'))
    .catch(err => console.error('Gagal mendaftar Service Worker:', err));
}

window.navigate('home');