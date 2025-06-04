// views/diagnose.js
import cloudIcon from '../assets/cloud-computing.png';
import { fileToBase64, plantDiseases } from '../js/app.js';

export function renderDiagnose() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="container mx-auto py-12 px-6">
      <h1 class="text-4xl font-bold text-black text-center">PLANT LEAF DISEASE DIAGNOSIS</h1>
      <p class="text-gray-600 text-center mt-2">Upload an image of your plant leaf and our AI will analyze it to identify potential diseases and provide treatment recommendations.</p>
      <div class="bg-white rounded-lg shadow-md p-6 mt-6 max-w-md mx-auto">
        <h2 class="text-lg font-semibold text-black">UPLOAD LEAF IMAGE</h2>
        <div id="dropZone" class="border-dashed border-2 border-blue-500 rounded-lg p-8 text-center mt-4 bg-blue-50 max-w-md mx-auto transition-colors duration-300">
          <div class="flex flex-col items-center">
            <img src="${cloudIcon}" alt="Cloud Icon" class="h-12 w-12 object-contain mb-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Upload file</h3>
            <p class="text-gray-600">Drag & Drop your files or <span class="text-blue-500 cursor-pointer hover:underline" onclick="document.getElementById('fileInput').click()">Browse</span></p>
            <p class="text-gray-500 text-sm mt-2">Supported formats: PNG, JPG, JPEG (MAX size: 10MB)</p>
            <input type="file" id="fileInput" accept="image/jpeg,image/png" class="absolute inset-0 opacity-0 cursor-pointer">
            <button id="analyzeButton" class="mt-6 bg-[#28A745] text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300 w-full">ANALYZE NOW</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  const analyzeButton = document.getElementById('analyzeButton');

  if (dropZone && fileInput && analyzeButton) {
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('border-[#28A745]', 'bg-green-50');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('border-[#28A745]', 'bg-green-50');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('border-[#28A745]', 'bg-green-50');
      const file = e.dataTransfer.files[0];
      if (file) {
        window.analyzeImage(file).catch(err => console.error('Error analyzing image:', err));
      }
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        window.analyzeImage(file).catch(err => console.error('Error analyzing image:', err));
      }
    });

    analyzeButton.addEventListener('click', () => {
      fileInput.click();
    });
  }
}