<script setup>
import { ref, onMounted } from 'vue';
import { generatePastoralCare } from '../services/geminiServices.js';
import { CheckCircle, Loader2 } from 'lucide-vue-next';

// Props & Emits
const props = defineProps(['user']);
const emit = defineEmits(['next', 'set-ai-content']);

// Pipedream webhook
const PIPEDREAM_WEBHOOK_URL = 'https://eo3t8plkfekuf34.m.pipedream.net';

const videoEnded = ref(false);
const wantsMoreTime = ref(false);
const aiLoading = ref(false);
const isCommitting = ref(false);
const generatedContent = ref(null);

// Handle when video ends
const handleVideoEnd = () => {
  videoEnded.value = true;
};

// Trigger AI generation on first mount
onMounted(async () => {
  if (props.user) {
    aiLoading.value = true;
    try {
      const content = await generatePastoralCare(props.user);
      generatedContent.value = content;
      emit('set-ai-content', content);
    } catch (e) {
      console.error("AI generation failed:", e);
    } finally {
      aiLoading.value = false;
    }
  }

  // YouTube API for detecting video end
  // Load YouTube IFrame API
  if (!window.YT) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  // Initialize player when API is ready
  window.onYouTubeIframeAPIReady = () => {
    new window.YT.Player('youtube-player', {
      events: {
        'onStateChange': (event) => {
          // YT.PlayerState.ENDED = 0
          if (event.data === 0) {
            handleVideoEnd();
          }
        }
      }
    });
  };

  // Fallback: Show button after 3 minutes if video end not detected
  setTimeout(() => {
    if (!videoEnded.value) {
      videoEnded.value = true;
    }
  }, 180000); // 3 minutes
});

// Called when user clicks the continue button
const handleDecision = async () => {
  isCommitting.value = true;

  try {
    // FIXED: Changed condition to actually send when URL is present
    if (PIPEDREAM_WEBHOOK_URL && PIPEDREAM_WEBHOOK_URL.includes('pipedream.net')) {
      await fetch(PIPEDREAM_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...props.user,
          aiGeneratedPrayer: generatedContent.value?.prayer,
          aiGeneratedEncouragement: generatedContent.value?.encouragement,
          timestamp: new Date().toISOString()
        })
      });
      console.log("Webhook sent successfully!");
    } else {
      console.log("Pipedream webhook not configured yet");
    }
  } catch (error) {
    console.error("Webhook failed:", error);
  } finally {
    isCommitting.value = false;
    emit('next');
  }
};
</script>

<template>
  <div class="max-w-4xl mx-auto w-full flex flex-col items-center">
    <!-- Video Embed -->
    <div class="w-full aspect-video bg-black rounded-xl shadow-2xl overflow-hidden relative">
      <iframe
        id="youtube-player"
        class="w-full h-full"
        src="https://www.youtube.com/embed/6FnTOiMOCcI?autoplay=1&mute=1&controls=1&enablejsapi=1"
        title="Important Message"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <!-- Text Below Video -->
    <div class="mt-8 text-center max-w-2xl">
      <h3 class="text-2xl font-serif font-semibold text-slate-800 mb-3">
        {{ !videoEnded
          ? "Please Watch This Important Message"
          : "The Choice is Yours" }}
      </h3>
      <p class="text-slate-600 mb-8">
        {{ !videoEnded
          ? "Take a moment to watch the message. We're preparing a personalized prayer for you."
          : "You have watched the message. Ready to make a decision?" }}
      </p>
    </div>

    <!-- Controls After Video Ends -->
    <div v-if="videoEnded" class="flex flex-col md:flex-row gap-4 justify-center">
      <!-- Yes, Make the Decision -->
      <button
        @click="handleDecision"
        :disabled="isCommitting"
        class="flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-brand-500/30 transition-all transform hover:scale-105"
      >
        <Loader2 v-if="isCommitting" class="h-6 w-6 animate-spin" />
        <CheckCircle v-else class="h-6 w-6" />
        I Make This Decision Today
      </button>

      <!-- I need more time text toggle -->
      <button
        @click="wantsMoreTime = true"
        class="px-8 py-4 text-slate-500 hover:text-slate-700 font-medium transition"
      >
        I need more time
      </button>
    </div>

    <!-- Display message if user wants more time -->
    <p
      v-if="wantsMoreTime"
      class="mt-4 text-slate-600 italic text-center max-w-xl"
    >
      That's okay! You can come back to this decision when you are ready.
    </p>
  </div>
</template>