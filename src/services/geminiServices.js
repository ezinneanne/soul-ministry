// Static collection of encouraging Bible verses
const verses = [
  { ref: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope." },
  { ref: "Isaiah 41:10", text: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand." },
  { ref: "Philippians 4:6-7", text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God." },
  { ref: "Joshua 1:9", text: "Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go." },
  { ref: "Matthew 11:28", text: "Come to me, all who labor and are heavy laden, and I will give you rest." },
  { ref: "Romans 8:28", text: "And we know that for those who love God all things work together for good, for those who are called according to his purpose." },
  { ref: "Psalm 23:4", text: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me." },
  { ref: "2 Corinthians 12:9", text: "My grace is sufficient for you, for my power is made perfect in weakness." },
  { ref: "Psalm 46:1", text: "God is our refuge and strength, a very present help in trouble." },
  { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths." }
];

// Static collection of prayers (Use {name} as a placeholder)
const prayers = [
  "Lord, we lift up {name} to You today. We ask that You surround them with Your peace that surpasses all understanding. Whatever burden they are carrying, may they feel it lift as they trust in You.",
  "Heavenly Father, thank You for {name}. We ask for wisdom and clarity in their life right now. Guide their steps, open the right doors, and give them the courage to walk through them.",
  "God, we pray for {name}’s heart today. Heal any hurts, calm any fears, and remind them that they are deeply loved by You. Let Your presence be tangible in their life this week.",
  "Lord Jesus, we bring {name} before Your throne of grace. Grant them strength for the journey ahead. May they know that they never walk alone, for You are always by their side.",
  "Father, bless {name} abundantly. We ask for a breakthrough in their situation. Turn their worry into worship and their uncertainty into confidence in Your plan.",
  "Lord, we ask for Your protection over {name}. Guard their mind and heart. Fill them with hope and a fresh sense of purpose as they seek You today.",
  "God of all comfort, be near to {name}. Let them feel Your embrace. We declare that no weapon formed against them shall prosper, and they will see Your goodness in the land of the living.",
  "Abba Father, we pray for {name}’s specific needs right now. You know every detail. We trust You to provide, to heal, and to restore. Let their testimony be one of Your faithfulness.",
  "Lord, give {name} rest. In the midst of a busy and noisy world, help them find a quiet place to hear Your voice. Renew their strength like the eagle's.",
  "Jesus, we thank You for the new beginning You are offering {name}. Wash away the past and give them a vision for a bright and holy future walking with You."
];

// Static collection of encouragements
const encouragements = [
  "Taking this step of faith is the beginning of a beautiful journey. You are seen, known, and loved by God.",
  "Remember, faith isn't about having all the answers; it's about trusting the One who does.",
  "God hears your prayers. Even when silence feels loud, He is working on your behalf.",
  "You are not alone in this. The same God who created the stars knows your name and your story.",
  "Keep your eyes fixed on Jesus. He is the author and perfecter of your faith.",
  "Today is a new day. God's mercies are new every morning, specifically for you.",
  "Your prayer has been heard. Trust the timing of your life to the Master of time."
];

// Helper to get random item
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generatePastoralCare = async (user) => {
  // We keep this async to match the original function signature 
  // so we don't break the component calling it.
  
  // 1. Pick a random verse
  const verse = getRandom(verses);
  
  // 2. Pick a random prayer and inject the user's name
  const rawPrayer = getRandom(prayers);
  const personalizedPrayer = rawPrayer.replace("{name}", user.fullName || "friend");
  
  // 3. Pick a random encouragement
  const encouragement = getRandom(encouragements);


  // Add a 2-second delay to simulate "processing"
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return structure matches what the AI used to return
  return {
    prayer: personalizedPrayer,
    encouragement: encouragement,
    scriptureReference: `${verse.text} — ${verse.ref}`
  };
};