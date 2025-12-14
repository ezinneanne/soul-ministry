<script setup>
import { ref } from 'vue';
import { AppStep } from './types.js';
import IntakeForm from './components/IntakeForm.vue';
import VideoExperience from './components/VideoExperience.vue';
import Certificate from './components/Certificate.vue';
import { ShieldCheck, ChevronRight } from 'lucide-vue-next';

const currentStep = ref(AppStep.LANDING);
const user = ref(undefined);
const aiContent = ref(null);

const handleUpdateUser = (data) => {
  user.value = user.value ? { ...user.value, ...data } : data;
};

const handleAiContent = (content) => {
  aiContent.value = content;
};

const nextStep = (step) => {
  currentStep.value = step;
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-brand-200">
    <header class="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2 font-serif font-bold text-2xl text-slate-800">
           <ShieldCheck class="text-brand-600 h-8 w-8" />
           <span>Esther Akinsiun</span>
        </div>
        
        <div v-if="currentStep > AppStep.LANDING" class="flex items-center gap-2 text-sm font-medium text-slate-500">
          <div class="h-2 w-2 rounded-full transition-colors duration-300" :class="currentStep >= AppStep.INTAKE ? 'bg-brand-600' : 'bg-slate-200'"></div>
          <div class="h-2 w-8 rounded-full transition-colors duration-300" :class="currentStep >= AppStep.VIDEO ? 'bg-brand-600' : 'bg-slate-200'"></div>
          <div class="h-2 w-2 rounded-full transition-colors duration-300" :class="currentStep >= AppStep.CERTIFICATE ? 'bg-brand-600' : 'bg-slate-200'"></div>
        </div>
      </div>
    </header>

    <main class="flex-grow flex flex-col justify-center px-4 py-12 sm:px-6">
      <transition name="fade" mode="out-in">
        
        <div v-if="currentStep === AppStep.LANDING" class="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
          <div class="bg-brand-50 p-4 rounded-full mb-6">
            <ShieldCheck class="h-16 w-16 text-brand-600" />
          </div>
          <h1 class="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6 leading-tight">
            Find Peace.<br/>Find Purpose.
          </h1>
          <p class="text-xl text-slate-600 mb-10 leading-relaxed">
            You are not here by accident. A journey of a thousand miles begins with a single step. We invite you to discover a life of faith today.
          </p>
          <button 
            @click="nextStep(AppStep.INTAKE)"
            class="bg-brand-600 hover:bg-brand-700 text-white text-lg font-semibold px-10 py-4 rounded-full shadow-lg shadow-brand-500/30 transition-all transform hover:scale-105 flex items-center gap-2"
          >
            Start Your Journey <ChevronRight />
          </button>
        </div>

        <IntakeForm 
          v-else-if="currentStep === AppStep.INTAKE"
          @next="nextStep(AppStep.VIDEO)" 
          @update-user="handleUpdateUser" 
        />

        <VideoExperience 
          v-else-if="currentStep === AppStep.VIDEO"
          :user="user"
          @next="nextStep(AppStep.CERTIFICATE)" 
          @set-ai-content="handleAiContent" 
        />

        <Certificate 
          v-else-if="currentStep === AppStep.CERTIFICATE"
          :user="user" 
          :aiContent="aiContent" 
        />

      </transition>
    </main>

    <footer class="bg-white border-t border-slate-100 py-8">
      <div class="max-w-6xl mx-auto px-4 text-center text-slate-400 text-sm">
        <p>© {{ new Date().getFullYear() }} Esther Akinsiun Worship Ministry. All rights reserved.</p>
        <div class="flex justify-center gap-4 mt-2">
          <a href="https://www.instagram.com/estherakinsiun/" class="hover:text-slate-600 transition">Instagram</a>
        </div>
      </div>
    </footer>
  </div>
</template>