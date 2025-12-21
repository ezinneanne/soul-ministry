<script setup>
import { computed } from 'vue';
import { Download, Share2, Sparkles, Printer } from 'lucide-vue-next';
import certificateContractPdf from '../assets/Certificate_of_Covenant_Renewed.pdf';
import signatureImg from '../assets/signature.jpg';

const props = defineProps(['user', 'aiContent']);

const handlePrint = () => {
  window.print();
};

const handleDownloadPdf = () => {
  const link = document.createElement('a');
  link.href = certificateContractPdf;
  link.download = 'New-Believers-Contract.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleShare = async () => {
  const shareData = {
    title: 'Certificate of Salvation',
    text: `${props.user?.fullName} made a decision to follow Jesus Christ on ${props.user?.date}! 🎉`,
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      console.log('Shared successfully');
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard! Share it with your friends.');
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Error sharing:', error);
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
      }
    }
  }
};

const formattedDate = computed(() => {
  return new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
});

const firstName = computed(() => {
  return props.user?.fullName.split(' ')[0] || 'Friend';
});
</script>

<template>
  <div v-if="user" class="max-w-5xl mx-auto w-full pb-20">
    
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center p-3 bg-green-100 text-green-700 rounded-full mb-4">
        <Sparkles class="h-6 w-6 mr-2" />
        <span class="font-semibold">Congratulations! A New Chapter Begins.</span>
      </div>
      <h2 class="text-4xl font-serif font-bold text-slate-900 mb-2">Welcome to the Family, {{ firstName }}</h2>
      <p class="text-slate-600">Your decision today is marked and celebrated. Here is your certificate of covenant.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div class="lg:col-span-2">
        <div 
          class="bg-[#fffdf5] border-[12px] border-double border-slate-800 p-8 md:p-12 text-center relative shadow-2xl"
          id="printable-certificate"
        >
          <div class="absolute top-4 left-4 border-t-2 border-l-2 border-brand-800 w-16 h-16 opacity-20"></div>
          <div class="absolute bottom-4 right-4 border-b-2 border-r-2 border-brand-800 w-16 h-16 opacity-20"></div>

          <div class="mb-8">
            <h3 class="text-lg uppercase tracking-[0.3em] text-slate-500 mb-2">Certificate of</h3>
            <h1 class="text-4xl md:text-5xl font-serif font-bold text-brand-900">Covenant</h1>
          </div>

          <p class="text-slate-600 italic text-lg mb-6">This certifies that</p>
          
          <div class="text-3xl md:text-4xl font-serif text-slate-900 border-b-2 border-slate-300 pb-2 inline-block min-w-[300px] mb-6">
            {{ user.fullName }}
          </div>

          <p class="text-slate-600 text-lg mb-6 leading-relaxed">
            Has publicly declared their faith and decision to follow Jesus Christ on<br/>
            <span class="font-semibold text-slate-800">{{ user.date || formattedDate }}</span>
          </p>

          <p class="text-slate-700 text-base mb-8 leading-relaxed max-w-3xl mx-auto">
            Having confessed Him as Savior, Redeemer, and Lord, this child of God is now a
            new creation, washed by His blood, sealed by His Spirit, and forever written in the
            Lamb's Book of Life.
          </p>

          <p class="text-slate-700 text-base mb-8 leading-relaxed max-w-3xl mx-auto">
            From this day forward, you belong to Christ alone. You are chosen, beloved, and
            set apart to live for His glory and bear fruit for His Kingdom.
          </p>

          <p class="text-slate-600 italic text-sm mb-10 max-w-2xl mx-auto">
            "I have been crucified with Christ. It is no longer I who live, but Christ who lives in
            me. And the life I now live in the flesh I live by faith in the Son of God, who loved
            me and gave Himself for me." – Galatians 2:20
          </p>

          <div class="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 mt-12">
            <div class="text-center order-2 sm:order-1">
              <img :src="signatureImg" alt="Esther Akinsiun's signature" class="w-32 sm:w-40 h-auto mb-2 mx-auto" />
              <div class="w-32 sm:w-40 border-b border-slate-400 mb-2 mx-auto"></div>
              <p class="text-xs uppercase tracking-widest text-slate-500">Signature</p>
            </div>
            
            <div class="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center shadow-inner relative order-1 sm:order-2">
              <div class="w-16 h-16 sm:w-20 sm:h-20 border-2 border-white/50 rounded-full flex items-center justify-center">
                <Sparkles class="text-white h-8 w-8 sm:h-10 sm:w-10 opacity-80" />
              </div>
            </div>

            <div class="text-center order-3">
              <div class="text-lg sm:text-xl font-serif font-bold text-brand-800 leading-none mb-1">Esther Akinsiun</div>
              <div class="w-32 sm:w-40 border-b border-slate-400 mb-2 mx-auto"></div>
              <p class="text-xs uppercase tracking-widest text-slate-500">Kingdom Recruiter</p>
            </div>
          </div>
          
          <div class="mt-10 text-sm text-slate-500 font-serif italic">
            "{{ aiContent?.scriptureReference || "John 3:16" }}"
          </div>
        </div>

        <div class="mt-6 flex flex-col sm:flex-row gap-4 justify-center print:hidden">
          <button @click="handlePrint" class="flex items-center justify-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition">
            <Printer class="h-5 w-5" /> Print / Save PDF
          </button>
          <button @click="handleShare" class="flex items-center justify-center gap-2 border border-slate-300 bg-white text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-50 transition">
            <Share2 class="h-5 w-5" /> Share
          </button>
        </div>
      </div>

      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
          <h3 class="text-xl font-serif font-bold text-slate-800 mb-4 border-b pb-2">A Prayer for You</h3>
          <p class="text-slate-600 italic leading-relaxed mb-4">
            "{{ aiContent?.prayer }}"
          </p>
        </div>

        <div class="bg-brand-600 p-6 rounded-xl shadow-lg text-white">
          <h3 class="text-xl font-serif font-bold mb-3">Next Steps</h3>
          <p class="text-brand-100 mb-4 text-sm">
            We have already sent a copy of these resources to <span class="font-semibold text-white">{{ user.email }}</span>.
          </p>
          <ul class="space-y-3 text-sm">
            <li class="flex gap-3 items-start cursor-pointer hover:text-white/90 transition" @click="handleDownloadPdf">
              <div class="bg-white/20 p-1 rounded-full mt-0.5"><Download class="h-3 w-3" /></div>
              <span>Download the "New Believer's Contract" PDF</span>
            </li>
            <li class="flex gap-3 items-start">
              <div class="bg-white/20 p-1 rounded-full mt-0.5"><Share2 class="h-3 w-3" /></div>
              <a href="https://t.me/+5aUxn5sd7xNiODdk" target="_blank" rel="noopener noreferrer" class="hover:text-white/90 transition underline">Join our online community group</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>