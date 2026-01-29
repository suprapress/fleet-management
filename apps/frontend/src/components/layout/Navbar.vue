<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <nav :class="[
        'fixed w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-slate-900/90 backdrop-blur-md py-4 shadow-lg border-b border-white/5' : 'bg-transparent py-6'
    ]">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <!-- Brand -->
            <div class="flex items-center gap-3">
                <div
                    class="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-900/50">
                    IJP
                </div>
                <div class="flex flex-col">
                    <span class="text-white font-bold text-lg leading-none tracking-wide">INTAN JAYA</span>
                    <span class="text-slate-400 text-xs tracking-widest uppercase">Pratama</span>
                </div>
            </div>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-8">
                <a href="#"
                    class="text-slate-300 hover:text-white transition-colors text-sm font-medium uppercase tracking-wider">Beranda</a>
                <a href="#about"
                    class="text-slate-300 hover:text-white transition-colors text-sm font-medium uppercase tracking-wider">Tentang
                    Kami</a>
                <a href="#services"
                    class="text-slate-300 hover:text-white transition-colors text-sm font-medium uppercase tracking-wider">Layanan</a>
                <a href="#technology"
                    class="text-slate-300 hover:text-white transition-colors text-sm font-medium uppercase tracking-wider">Teknologi</a>
            </div>

            <!-- CTA -->
            <button
                class="hidden md:block bg-transparent border border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm uppercase tracking-wide">
                Hubungi Kami
            </button>

            <!-- Mobile Menu Button -->
            <button class="md:hidden text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </div>
    </nav>
</template>
