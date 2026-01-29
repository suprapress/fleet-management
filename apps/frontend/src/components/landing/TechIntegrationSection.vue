<template>
  <div class="py-24 bg-slate-900 text-white overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center gap-12">
        <div class="w-full md:w-1/2">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 uppercase">
            Dioperasikan dengan <span class="text-teal-500">Presisi Data</span>
          </h2>
          <p class="text-slate-400 mb-8 leading-relaxed">
            Setiap pergerakan armada dipantau dan dianalisis untuk memastikan efisiensi maksimal dan keamanan
            operasional.
          </p>

          <ul class="space-y-6">
            <li class="flex items-start group">
              <div
                class="bg-slate-800 p-3 mr-4 rounded-xl shadow-lg border border-slate-700 group-hover:border-teal-500 transition-colors">
                <span class="text-xl">📱</span>
              </div>
              <div>
                <h3 class="font-bold text-lg mb-1 text-white group-hover:text-teal-400 transition-colors">P2H Digital
                </h3>
                <p class="text-sm text-slate-400">Pemeriksaan Harian Kendaraan terdigitalisasi via aplikasi mobile
                  mempercepat pelaporan dan akurasi data.</p>
              </div>
            </li>
            <li class="flex items-start group">
              <div
                class="bg-slate-800 p-3 mr-4 rounded-xl shadow-lg border border-slate-700 group-hover:border-teal-500 transition-colors">
                <span class="text-xl">📡</span>
              </div>
              <div>
                <h3 class="font-bold text-lg mb-1 text-white group-hover:text-teal-400 transition-colors">Live
                  Monitoring</h3>
                <p class="text-sm text-slate-400">Dashboard pusat kendali untuk memantau posisi, kecepatan, dan status
                  muatan unit secara real-time.</p>
              </div>
            </li>
            <li class="flex items-start group">
              <div
                class="bg-slate-800 p-3 mr-4 rounded-xl shadow-lg border border-slate-700 group-hover:border-teal-500 transition-colors">
                <span class="text-xl">🛡️</span>
              </div>
              <div>
                <h3 class="font-bold text-lg mb-1 text-white group-hover:text-teal-400 transition-colors">Safety
                  Analytics</h3>
                <p class="text-sm text-slate-400">Analisa perilaku pengemudi dan deteksi kelelahan untuk mencegah
                  insiden sebelum terjadi.</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="w-full md:w-1/2 relative">
          <div
            class="w-full h-96 bg-slate-800 rounded-sm border-2 border-slate-700 flex items-center justify-center relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-tr from-teal-900/20 to-transparent"></div>
            <span class="text-slate-600 font-mono text-xl group-hover:text-teal-500 transition-colors">
              [ DASHBOARD PREVIEW ]
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
