<script setup lang="ts">
const stats = [
  { label: 'Unit Armada', value: '150+', desc: 'Dump Truck & Heavy Equipment' },
  { label: 'Ketersediaan', value: '98%', desc: 'Rata-rata Availability Unit' },
  { label: 'Safety', value: '0', desc: 'Zero Accident Tolerance' },
]
</script>

<template>
  <div class="py-20 bg-slate-800 border-y border-slate-700">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div v-for="(stat, index) in stats" :key="index"
          class="p-6 bg-slate-900/50 hover:bg-slate-900 transition-colors duration-300 border border-slate-700 hover:border-teal-500/50 rounded-xl">
          <div class="text-4xl md:text-5xl font-black text-teal-500 mb-2">{{ stat.value }}</div>
          <div class="text-xl font-bold text-white mb-2 uppercase">{{ stat.label }}</div>
          <p class="text-sm text-slate-400">{{ stat.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
