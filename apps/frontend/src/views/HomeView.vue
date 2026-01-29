<script setup lang="ts">
import Navbar from '../components/layout/Navbar.vue'
import Footer from '../components/layout/Footer.vue'
import HeroSection from '../components/landing/HeroSection.vue'
import AboutSection from '../components/landing/AboutSection.vue'
import ServicesSection from '../components/landing/ServicesSection.vue'
import TechIntegrationSection from '../components/landing/TechIntegrationSection.vue'
import FleetStatsSection from '../components/landing/FleetStatsSection.vue'
import RecruitmentSection from '../components/landing/RecruitmentSection.vue'
</script>

<template>
  <main class="bg-slate-900 min-h-screen text-slate-200 font-sans selection:bg-teal-500 selection:text-white">
    <Navbar />

    <HeroSection />
    <AboutSection />
    <ServicesSection />

    <!-- Technology Section -->
    <div id="technology">
      <TechIntegrationSection />
    </div>

    <!-- Stats Section -->
    <FleetStatsSection />

    <!-- Recruitment/Career Section -->
    <div id="carrier">
      <RecruitmentSection />
    </div>

    <div id="contact">
      <Footer />
    </div>
  </main>
</template>
