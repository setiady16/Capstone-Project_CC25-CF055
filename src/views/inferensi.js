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
            <p id="description" class="text-[#4b5563] mt-2" style="text-align: justify;"></p>
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

let soilChart; 

//Deskripsi untuk Tanaman
const descriptions = {
  padi: 'Padi (Oryza sativa) adalah tanaman biji-bijian dari famili Poaceae yang menjadi sumber makanan pokok bagi sebagian besar penduduk dunia, terutama di Asia. Tanaman ini tumbuh optimal di lahan basah seperti sawah dengan kondisi tanah berlumpur, pH 5.0–7.5, suhu 20–35°C, dan curah hujan 1000–2500 mm/tahun. Padi membutuhkan sinar matahari penuh selama 8–12 jam/hari serta pengairan yang teratur untuk menghasilkan bulir padi (gabah) yang kemudian diolah menjadi beras. Budidaya padi memerlukan perawatan khusus, seperti pemilihan bibit unggul (misalnya Ciherang atau IR64), pengendalian hama (seperti wereng dan penggerek batang), serta pemupukan seimbang untuk hasil panen maksimal. Selain sebagai penghasil beras, padi juga menghasilkan jerami yang berguna untuk pakan ternak atau pupuk organik. Tanaman ini telah dibudidayakan sejak ribuan tahun dan menjadi komoditas vital di banyak negara, termasuk Indonesia, yang termasuk produsen beras terbesar di dunia. Dengan adaptasi yang baik di iklim tropis, padi tetap menjadi tulang punggung ketahanan pangan global.',
  mangga: 'Mangga (Mangifera indica) adalah tanaman buah tropis yang termasuk dalam famili Anacardiaceae. Pohon mangga dapat tumbuh tinggi hingga 30-40 meter dengan daun lebat berwarna hijau gelap dan bunga kecil berwarna putih kekuningan. Buah mangga memiliki bentuk, ukuran, dan warna yang bervariasi tergantung varietasnya, mulai dari hijau, kuning, hingga merah saat matang. Daging buahnya yang manis, juicy, dan beraroma khas membuatnya menjadi salah satu buah paling populer di dunia. Mangga tumbuh optimal di daerah dengan suhu hangat (24-30°C), curah hujan sedang (800-2500 mm/tahun), dan sinar matahari penuh. Tanaman ini membutuhkan tanah yang subur, berdrainase baik, dengan pH 5.0-7.5. Beberapa varietas mangga terkenal antara lain Harum Manis, Gedong Gincu, dan Manalagi. Mangga tidak hanya dinikmati sebagai buah segar, tetapi juga diolah menjadi jus, selai, atau campuran hidangan. Budidaya mangga relatif mudah, tetapi perlu perhatian terhadap hama seperti lalat buah dan penyakit seperti antraknosa untuk mendapatkan hasil panen yang optimal.',
  jagung: 'Jagung (Zea mays) merupakan salah satu tanaman sereal penting dari famili Poaceae yang dibudidayakan sebagai sumber pangan, pakan ternak, dan bahan baku industri. Tanaman ini memiliki batang tegak yang kokoh dengan tinggi 1-3 meter, daun panjang berbentuk pita, serta bunga jantan dan betina yang terpisah pada satu tanaman. Buah jagung tumbuh dalam tongkol yang dilindungi oleh kelobot, dengan biji berwarna kuning, putih, atau campuran tergantung varietasnya. Jagung tumbuh optimal di daerah beriklim hangat (21-30°C) dengan curah hujan 600-1200 mm/tahun dan sinar matahari penuh. Tanaman ini membutuhkan tanah subur berdrainase baik dengan pH 5.5-7.0. Beberapa varietas unggul seperti Hibrida BISI-2 atau Jagung Manis (Sweet Corn) banyak dibudidayakan petani. Selain dikonsumsi langsung (direbus/bakar), jagung juga diolah menjadi tepung maizena, minyak jagung, atau bahan bioetanol. Budidaya jagung relatif mudah tetapi memerlukan pengendalian hama seperti penggerek batang dan penyakit bulai untuk hasil optimal.',
  pisang: 'Pisang (Musa spp.) adalah tanaman buah tropis dari famili Musaceae yang dikenal dengan batang semu (pseudostem) tersusun dari pelepah daun dan buah berbentuk tandan. Tanaman ini tumbuh optimal di iklim hangat (25-30°C) dengan curah hujan 1500-2500 mm/tahun, menyukai tanah subur berdrainase baik (pH 5.5-7.0). Varietas populer seperti Pisang Ambon, Cavendish, dan Raja menghasilkan buah kaya nutrisi (kalium, vitamin B6) yang bisa dikonsumsi segar atau diolah menjadi keripik, tepung, maupun puree. Pisang termasuk tanaman monokarpik yang berbuah sekali seumur hidup sebelum mati dan digantikan anakan baru. Budidayanya relatif mudah namun perlu waspada terhadap hama (ulat penggerek batang) dan penyakit (layu Fusarium). Selain bernilai ekonomi tinggi untuk pasar lokal/ekspor, daun pisang juga dimanfaatkan sebagai pembungkus makanan tradisional. Tanaman ini cocok dibudidayakan di daerah tropis dengan kelembaban tinggi dan penyinaran matahari cukup.',
  pepaya: 'Pepaya (Carica papaya) merupakan tanaman buah tropis dari famili Caricaceae yang tumbuh sebagai pohon berbatang tunggal dengan tinggi 2-10 meter. Tanaman ini memiliki daun besar bercangap menjari yang tumbuh di ujung batang, serta buah berbentuk bulat hingga memanjang dengan daging buah berwarna oranye kemerahan saat matang. Pepaya tumbuh optimal di daerah beriklim hangat (25-30°C) dengan curah hujan merata 1000-2000 mm/tahun dan sinar matahari penuh. Tanaman ini menyukai tanah gembur, subur, dan berdrainase baik dengan pH 6.0-6.5. Beberapa varietas unggul seperti Pepaya California, Bangkok, dan Hawai dikenal karena produktivitas dan rasanya yang manis. Buah pepaya kaya akan vitamin C, enzim papain, serta serat yang bermanfaat untuk pencernaan. Selain dikonsumsi segar, pepaya juga dapat diolah menjadi selai, dodol, atau bahan kosmetik. Budidaya pepaya relatif mudah tetapi perlu perhatian terhadap hama seperti kutu putih dan penyakit antraknosa.',
  semangka: 'Semangka merupakan tanaman merambat dari famili Cucurbitaceae yang menghasilkan buah besar berkulit hijau gelap dengan daging buah berair berwarna merah atau kuning. Tanaman ini tumbuh optimal di iklim hangat (25-30°C) dengan sinar matahari penuh dan membutuhkan tanah gembur berdrainase baik (pH 6.0-6.8). Varietas populer seperti Semangka Non-Biji, Semangka Kuning, dan Semangka Inul banyak dibudidayakan karena rasanya yang manis dan kandungan airnya yang menyegarkan. Buah semangka kaya akan vitamin A, C, dan likopen yang bermanfaat untuk kesehatan. Tanaman ini relatif mudah dibudidayakan namun rentan terhadap serangan lalat buah dan penyakit layu Fusarium. Semangka biasanya dipanen 70-90 hari setelah tanam dan selain dikonsumsi segar, juga sering diolah menjadi jus atau campuran es buah. Daun tanaman semangka yang lebar dan batangnya yang merambat menjadi ciri khas yang mudah dikenali.',
  jeruk: 'Jeruk adalah tanaman buah dari famili Rutaceae yang menghasilkan buah bulat dengan kulit bertekstur dan daging buah berair berwarna oranye atau kuning. Tanaman ini memiliki daun hijau mengilap dengan aroma khas, batang berkayu, serta bunga putih yang harum. Jeruk tumbuh optimal di daerah beriklim tropis hingga subtropis (20-30°C) dengan sinar matahari penuh dan curah hujan sedang. Beberapa varietas populer seperti Jeruk Manis, Jeruk Nipis, dan Jeruk Keprok dikenal karena rasanya yang segar dan kandungan vitamin C-nya yang tinggi. Buah jeruk banyak dimanfaatkan sebagai konsumsi segar, bahan jus, atau campuran dalam masakan. Tanaman ini menyukai tanah subur berdrainase baik dengan pH 5.5-7.0 dan membutuhkan perawatan terhadap hama seperti kutu daun serta penyakit CVPD (Citrus Vein Phloem Degeneration). Jeruk termasuk tanaman tahunan yang dapat berbuah setelah 2-3 tahun penanaman dengan perawatan yang tepat.',
  kopi: 'Kopi adalah tanaman perkebunan dari famili Rubiaceae yang menghasilkan biji beraroma khas setelah melalui proses penyangraian. Tanaman ini memiliki daun hijau mengilap berbentuk oval, bunga putih beraroma harum, serta buah ceri yang berubah warna dari hijau ke merah saat matang. Kopi tumbuh optimal di daerah tropis dengan ketinggian 800-1.500 mdpl, suhu 18-22°C, dan curah hujan 1.500-2.500 mm/tahun. Jenis utama seperti Arabika (Coffea arabica) dan Robusta (Coffea canephora) dibedakan berdasarkan cita rasa, kadar kafein, serta kondisi tumbuhnya. Tanaman kopi membutuhkan tanah subur berdrainase baik dengan pH 5.5-6.5 dan naungan alami untuk pertumbuhan optimal. Buah kopi dipanen secara selektif, kemudian melalui proses pengupasan, fermentasi, pengeringan, dan penyangraian untuk menghasilkan biji siap seduh. Kopi rentan terhadap hama seperti penggerek buah kopi (PBKo) dan penyakit karat daun (Hemileia vastatrix). Sebagai komoditas bernilai tinggi, kopi tidak hanya dikonsumsi sebagai minuman, tetapi juga menjadi bahan kosmetik dan produk kesehatan.',
  kelapa: 'Kelapa adalah tanaman serbaguna dari famili Arecaceae yang tumbuh di daerah tropis, dikenal sebagai "pohon kehidupan" karena hampir semua bagiannya dapat dimanfaatkan. Tanaman ini memiliki batang tunggal yang tinggi (15-30 meter), daun majemuk berbentuk sirip sepanjang 4-6 meter, serta buah berbiji dengan lapisan serabut tebal dan tempurung keras. Kelapa tumbuh optimal di dataran rendah dengan suhu 27-30°C, curah hujan 1.500-2.500 mm/tahun, dan paparan sinar matahari penuh di daerah berpasir dekat pantai. Buah kelapa menghasilkan daging buah (kopra), air kelapa, dan santan yang kaya nutrisi. Tanaman ini toleran terhadap tanah berpasir dan air asin, dengan sistem perakaran yang kuat. Kelapa mulai berbuah setelah 5-7 tahun dan dapat bertahan hingga puluhan tahun. Selain sebagai bahan pangan, kelapa juga dimanfaatkan untuk industri kosmetik, kerajinan, dan bahan bangunan. Tanaman ini relatif tahan hama tetapi rentan terhadap penyakit seperti busuk pucuk yang disebabkan oleh Phytophthora spp.',
  kapas: 'Kapas adalah tanaman serat penting dari famili Malvaceae yang dibudidayakan untuk serat bijinya yang menjadi bahan baku utama industri tekstil. Tanaman ini memiliki batang berkayu dengan tinggi 1-2 meter, daun lebar berbentuk hati, serta bunga berwarna putih atau kuning yang berkembang menjadi buah berbentuk kapsul. Kapas tumbuh optimal di daerah beriklim tropis hingga subtropis dengan suhu 21-30°C, curah hujan 500-1.000 mm/tahun, dan sinar matahari penuh. Buah kapas yang matang akan pecah dan memperlihatkan serat putih halus yang menyelimuti bijinya. Tanaman ini membutuhkan tanah subur berdrainase baik dengan pH 6.0-7.0 dan relatif tahan kekeringan. Kapas rentan terhadap hama seperti penggerek buah dan penyakit layu Fusarium. Selain sebagai sumber serat alami, biji kapas juga dapat diolah menjadi minyak nabati dan pakan ternak. Tanaman ini biasanya dipanen 150-200 hari setelah tanam tergantung varietasnya.',
  jute: 'Jute adalah tanaman serat alami dari famili Malvaceae yang dikenal sebagai "emas serat" karena kekuatan dan kegunaannya yang luas. Tanaman ini tumbuh tegak dengan ketinggian 2-4 meter, memiliki daun lonjong bergerigi, bunga kuning kecil, serta batang berkayu yang mengandung serat panjang dan kuat. Jute tumbuh optimal di daerah tropis dengan suhu hangat (24-37°C), curah hujan tinggi (1.500-2.500 mm/tahun), dan tanah aluvial yang subur. Tanaman ini biasanya dipanen setelah 120-150 hari saat mulai berbunga, sebelum batangnya menjadi terlalu keras. Serat jute terkenal karena teksturnya yang kasar namun kuat, sering digunakan untuk membuat karung, tali, karpet, dan produk kerajinan. Tanaman ini relatif mudah dibudidayakan dan ramah lingkungan karena bisa tumbuh tanpa pupuk kimia berlebihan. Selain seratnya, daun jute muda juga dapat dikonsumsi sebagai sayuran bergizi di beberapa negara Asia. Jute memainkan peran penting dalam ekonomi pedesaan, terutama di negara-negara produsen utama seperti Bangladesh dan India.',
  melon: 'Melon adalah tanaman buah dari famili Cucurbitaceae yang dikenal dengan buahnya yang manis dan beraroma segar. Tanaman ini tumbuh merambat dengan daun lebar berbulu halus dan bunga kuning kecil. Buah melon memiliki bentuk bulat atau oval dengan kulit bertekstur kasar atau halus, tergantung varietasnya, serta daging buah berwarna oranye, hijau, atau putih yang kaya air. Melon tumbuh optimal di daerah beriklim hangat (18-30°C) dengan sinar matahari penuh dan membutuhkan tanah gembur berdrainase baik (pH 6.0-7.0). Beberapa varietas populer melon antara lain Melon Hijau, Cantaloupe, dan Honeydew yang dibedakan berdasarkan warna daging, rasa, dan teksturnya. Tanaman ini biasanya dipanen 70-90 hari setelah tanam dan memerlukan perhatian terhadap hama seperti kutu daun serta penyakit embun tepung. Selain dikonsumsi segar, melon juga sering dijadikan bahan salad buah, jus, atau campuran es buah karena kandungan vitamin A dan C-nya yang tinggi. Budidaya melon umumnya dilakukan di dataran rendah hingga menengah dengan sistem penyiraman teratur.',
};

window.inferensiModel = async function() {
  const button = document.querySelector('button[onclick="window.inferensiModel()"]');
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

  // Validasi input
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

  try {
    const response = await fetch('http://127.0.0.1:5000/predict_crop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        N: nitrogen,
        P: fosfor,
        K: kalium,
        temperature: suhu,
        humidity: kelembaban,
        ph: phTanah,
        rainfall: curahHujan,
      }),
    });

    const result = await response.json();
    const predictionElement = document.getElementById('prediction');
    const descriptionElement = document.getElementById('description');

    if (response.ok) {
      console.log('Result:', result);
      const labelEncoder = result.labelEncoder;
      console.log('Label Encoder:', labelEncoder); 
      predictionElement.textContent = labelEncoder;
      const descriptionText = descriptions[labelEncoder] || 'Deskripsi tidak tersedia.';
      descriptionElement.textContent = descriptionText;
      
      const ctx = document.getElementById('soilChart').getContext('2d');

      if (soilChart) {
        soilChart.destroy();
      }

      // Buat grafik baru
      soilChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Nitrogen', 'Fosfor', 'Kalium', 'Suhu', 'Kelembaban', 'pH Tanah', 'Curah Hujan'],
          datasets: [{
            label: 'Nilai Input',
            data: inputs,
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

      const resultDiv = document.getElementById('result');
      resultDiv.classList.remove('opacity-0');
      resultDiv.classList.add('opacity-100');

    } else {
      console.error('Error:', result.error); // Log kesalahan
      throw new Error(result.error || 'Gagal mendapatkan prediksi.');
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    alert('Terjadi kesalahan: ' + error.message);
    predictionElement.textContent = 'Gagal';
    descriptionElement.textContent = 'Gagal memproses prediksi. Silakan coba lagi.';
  } finally {
    button.innerHTML = originalText;
    button.disabled = false;
  }
};