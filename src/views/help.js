export function renderHelp() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="container mx-auto py-20 px-6 text-center max-w-2xl">
      <h1 class="text-4xl font-bold text-black mb-4">BUTUH BANTUAN? TENANG, KAMI SIAP MEMBANTU</h1>
      <p class="text-gray-600 mb-6">SEMUA YANG PERLU ANDA KETAHUI TENTANG PENGGUNAAN APLIKASI KAMI, ADA DI SINI</p>
      <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button onclick="navigate('faq')" class="bg-[#28A745] text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300">LIHAT FAQ</button>
        <a href="tel:+6282151844743" class="border border-gray-300 text-black py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300 inline-block text-center">HUBUNGI DUKUNGAN</a>
      </div>
    </div>
  `;
}
