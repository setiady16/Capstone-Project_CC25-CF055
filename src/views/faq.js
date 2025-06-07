export function renderFAQ() {
    const faqs = [
        {
            question: "Bagaimana cara mengunggah gambar?",
            answer: "Klik 'click to browse' atau drag-and-drop gambar pada area yang disediakan di halaman Diagnosa.",
        },
        {
            question: "Format gambar apa yang didukung?",
            answer: "Format yang didukung adalah JPG, PNG, dan JPEG dengan ukuran maksimum 10MB.",
        },
        {
            question: "Apakah data saya aman?",
            answer: "Data diagnosis disimpan secara lokal di browser Anda dan tidak dikirim ke server.",
        },
    ];

    const content = document.getElementById('content');
    content.innerHTML = `
    <div class="container mx-auto py-12 px-6">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-black">BUTUH BANTUAN? TENANG, KAMI SIAP MEMBANTU</h1>
        <p class="text-gray-600 text-lg mt-3 max-w-2xl mx-auto">
          SEMUA YANG PERLU ANDA KETAHUI TENTANG PENGGUNAAN APLIKASI KAMI, ADA DI SINI
        </p>
      </div>
      
      <div class="bg-white rounded-xl shadow-lg p-8 mt-10 space-y-6">
        ${faqs.map(faq => `
          <div class="border-b pb-4">
            <h3 class="text-xl font-semibold text-black">${faq.question}</h3>
            <p class="text-gray-700 mt-2 leading-relaxed">${faq.answer}</p>
          </div>
        `).join('')}
      </div>

      <div class="text-center mt-8">
        <button onclick="navigate('help')" class="bg-[#28A745] text-white text-lg py-3 px-8 rounded-full hover:bg-green-600 transition duration-200">
          Kembali ke Bantuan
        </button>
      </div>
    </div>
  `;
}
