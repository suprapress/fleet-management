<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  whatsapp: '',
  experience: '',
  position: ''
})

const submitForm = () => {
  console.log('Form submitted:', formData.value)
  // TODO: Implement actual submission logic
  alert('Terima kasih. Data Anda telah kami terima.')
}
</script>

<template>
  <div class="py-24 bg-slate-900 text-white">
    <div class="container mx-auto px-4 max-w-4xl">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 uppercase">Bergabung Bersama <span class="text-teal-500">Tim
            Elite</span></h2>
        <p class="text-slate-400">Jadilah bagian dari revolusi logistik pertambangan modern.</p>
      </div>

      <div class="bg-slate-800 p-8 md:p-12 border border-slate-700 rounded-2xl shadow-2xl">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold mb-2 text-slate-300">Nama Lengkap</label>
              <input v-model="formData.name" type="text"
                class="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="Nama sesuai KTP" required>
            </div>
            <div>
              <label class="block text-sm font-bold mb-2 text-slate-300">Nomor WhatsApp</label>
              <input v-model="formData.whatsapp" type="tel"
                class="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="08..." required>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold mb-2 text-slate-300">Pengalaman Kerja (Tahun)</label>
              <input v-model="formData.experience" type="number"
                class="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="Contoh: 3" required>
            </div>
            <div>
              <label class="block text-sm font-bold mb-2 text-slate-300">Posisi yang Diminati</label>
              <select v-model="formData.position"
                class="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-teal-500 transition-colors appearance-none"
                required>
                <option value="" disabled selected>Pilih Posisi</option>
                <option value="driver">Driver Dump Truck</option>
                <option value="mechanic">Mekanik Alat Berat</option>
                <option value="admin">Admin Logistik</option>
                <option value="safety">Safety Officer</option>
              </select>
            </div>
          </div>

          <div class="pt-4">
            <button type="submit"
              class="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 uppercase tracking-wider transition-colors rounded-lg shadow-lg hover:shadow-teal-900/50 hover:-translate-y-1 transform duration-200">
              Kirim Lamaran
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
