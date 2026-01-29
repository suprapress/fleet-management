<template>
  <div class="relative min-h-screen flex items-center overflow-hidden bg-slate-900 py-20 lg:py-0">
    <!-- Dynamic Background Effect -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute top-0 right-0 w-3/4 h-3/4 bg-teal-900/10 rounded-full blur-3xl filter opacity-30 transform translate-x-1/3 -translate-y-1/3">
      </div>
      <div
        class="absolute bottom-0 left-0 w-3/4 h-3/4 bg-blue-900/10 rounded-full blur-3xl filter opacity-30 transform -translate-x-1/3 translate-y-1/3">
      </div>
    </div>

    <div class="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
      <div class="text-center lg:text-left order-2 lg:order-1">
        <h2 class="text-teal-500 font-bold tracking-widest mb-4">PT. INTAN JAYA PRATAMA</h2>
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 uppercase leading-tight">
          Standar Baru<br />
          Efisiensi Logistik<br />
          Pertambangan.
        </h1>
        <p class="text-slate-300 text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
          Menggabungkan armada tangguh dengan teknologi pemantauan real-time untuk produktivitas tanpa henti.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button
            class="bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 px-8 rounded-lg uppercase tracking-wider transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-teal-500/25">
            Jelajahi Solusi
          </button>
          <button
            class="border border-slate-600 hover:border-teal-500 text-slate-300 hover:text-white font-bold py-4 px-8 rounded-lg uppercase tracking-wider transition-colors">
            Hubungi Kami
          </button>
        </div>
      </div>

      <div class="order-1 lg:order-2 flex justify-center lg:justify-end relative">
        <div
          class="relative w-full max-w-lg lg:max-w-xl transform hover:scale-105 transition-transform duration-500 ease-out">
          <div class="absolute inset-0 bg-teal-500/20 blur-3xl rounded-full opacity-40"></div>
          <img src="@/assets/fleet_service.png" alt="Modern Fleet Management System"
            class="relative z-10 w-full h-auto drop-shadow-2xl animate-float" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
