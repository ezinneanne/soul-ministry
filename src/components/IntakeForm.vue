<script setup>
import { ref } from 'vue';
import { User, Mail, Phone, Heart, Calendar, ArrowRight } from 'lucide-vue-next';

const emit = defineEmits(['next', 'update-user']);

const formData = ref({
  fullName: '',
  email: '',
  phone: '',
  date: '',
  prayerRequest: ''
});

const handleSubmit = () => {
  emit('update-user', { ...formData.value });
  emit('next');
};
</script>

<template>
  <div class="max-w-xl mx-auto w-full">
    <div class="text-center mb-10">
      <h2 class="text-3xl font-serif font-bold text-slate-900 mb-4">Tell Us About Yourself</h2>
      <p class="text-slate-600">We want to pray with you and customize your experience.</p>
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-6">
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
        <div class="relative">
          <User class="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input
            required
            v-model="formData.fullName"
            type="text"
            class="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
          <div class="relative">
            <Mail class="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              required
              v-model="formData.email"
              type="email"
              class="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
              placeholder="john@example.com"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
          <div class="relative">
            <Phone class="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              required
              v-model="formData.phone"
              type="tel"
              class="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-2">Date of Decision</label>
        <div class="relative">
          <Calendar class="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input
            required
            v-model="formData.date"
            type="text"
            class="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
            placeholder="December 20, 2025"
          />
        </div>
        <p class="text-xs text-slate-500 mt-1 ml-1">Enter the date you made this decision (e.g., December 20, 2025)</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-2">How can we pray for you today?</label>
        <div class="relative">
          <Heart class="absolute left-3 top-3 h-5 w-5 text-rose-400" />
          <textarea
            required
            v-model="formData.prayerRequest"
            rows="3"
            class="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition resize-none"
            placeholder="I'm seeking peace regarding..."
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        class="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-4 rounded-lg transition-all shadow-lg hover:shadow-brand-500/30 mt-4"
      >
        Begin The Journey <ArrowRight class="h-5 w-5" />
      </button>
    </form>
  </div>
</template>