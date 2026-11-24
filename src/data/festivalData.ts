export interface FestivalEvent {
  id: string;
  name: string;
  category: 'music' | 'dance' | 'singing' | 'drama' | 'fashion' | 'art' | 'gaming' | 'tech';
  day: 1 | 2 | 3;
  dateStr: string;
  startTime: string;
  endTime: string;
  venue: string;
  prizePool: string;
  teamSize: string;
  entryType: 'Solo' | 'Team' | 'Solo / Team';
  tagline: string;
  description: string;
  rules: string[];
  coordinator: {
    name: string;
    phone: string;
  };
  featured?: boolean;
}

export interface Performer {
  id: string;
  name: string;
  role: string;
  genre: string;
  day: number;
  dateStr: string;
  time: string;
  stage: string;
  image: string;
  bio: string;
  spotifyUrl?: string;
  instagramUrl?: string;
  isHeadliner?: boolean;
  highlightTrack?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'concert' | 'dance' | 'drama' | 'crowd' | 'bts';
  imageUrl: string;
  caption: string;
  year: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'Title Sponsor' | 'Powered By' | 'Associate Sponsor' | 'Media Partner' | 'Beverage & Food';
  logoText: string;
  industry: string;
  accentColor: string;
  website: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Registration' | 'Passes & Entry' | 'Accommodation' | 'Competitions' | 'General';
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  image: string;
}

export const FESTIVAL_INFO = {
  name: "AURA 2026",
  tagline: "Where Talent Meets the Extraordinary",
  shortIntro: "North India's most electrifying inter-collegiate cultural phenomenon. 3 days of unapologetic creativity, pulse-racing music, explosive dance battles, and high-stakes competitions.",
  collegeName: "Apex Institute of Science, Design & Technology (AISDT)",
  fullAddress: "Grand Campus Arena, Tech Knowledge City, Sector 62, New Delhi - 110001, India",
  dates: "March 19 - 21, 2026",
  timing: "Gates Open: 09:00 AM | Star Nights: 06:30 PM Onwards",
  heroVideoPoster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop",
  stats: [
    { label: "Footfall Expected", value: 18000, suffix: "+", icon: "Users" },
    { label: "Universities & Colleges", value: 85, suffix: "+", icon: "GraduationCap" },
    { label: "Events & Competitions", value: 48, suffix: "+", icon: "Trophy" },
    { label: "Total Prize Pool", value: 15, prefix: "₹", suffix: " Lakhs+", icon: "Sparkles" },
    { label: "Star Night Artists", value: 12, suffix: "+", icon: "Mic2" }
  ]
};

export const EVENT_CATEGORIES = [
  { id: 'all', name: 'All Events', icon: 'Sparkles', count: 48 },
  { id: 'music', name: 'Music', icon: 'Music2', count: 8 },
  { id: 'dance', name: 'Dance', icon: 'Flame', count: 7 },
  { id: 'singing', name: 'Singing', icon: 'Mic', count: 6 },
  { id: 'drama', name: 'Drama & Theatre', icon: 'Theater', count: 5 },
  { id: 'fashion', name: 'Fashion Show', icon: 'Sparkle', count: 4 },
  { id: 'art', name: 'Art & Photography', icon: 'Camera', count: 6 },
  { id: 'gaming', name: 'Gaming Arena', icon: 'Gamepad2', count: 6 },
  { id: 'tech', name: 'Tech & Innovations', icon: 'Cpu', count: 6 }
] as const;

export const FESTIVAL_EVENTS: FestivalEvent[] = [
  // DAY 1
  {
    id: 'battle-of-bands',
    name: 'Sync-Shock: Battle of the Bands',
    category: 'music',
    day: 1,
    dateStr: 'Thursday, March 19, 2026',
    startTime: '04:00 PM',
    endTime: '08:00 PM',
    venue: 'Main Amphitheatre (Stage Alpha)',
    prizePool: '₹1,00,000',
    teamSize: '4 - 8 Members',
    entryType: 'Team',
    tagline: 'High-voltage electric guitar riffs and soaring anthems.',
    description: 'The ultimate rock and fusion band warfare. Teams perform original tracks plus an iconic rock cover. Sound checks provided prior to stage call.',
    rules: [
      'Time limit: 20 minutes (including 5 min setup and soundcheck).',
      'At least one original composition is mandatory.',
      'Drum kit provided; bands must bring own guitars, pedals, and processors.',
      'Profanity and offensive content will lead to immediate disqualification.'
    ],
    coordinator: { name: 'Aarav Malhotra', phone: '+91 98112 34567' },
    featured: true
  },
  {
    id: 'nukkad-natak',
    name: 'Awaaz: Street Play (Nukkad Natak)',
    category: 'drama',
    day: 1,
    dateStr: 'Thursday, March 19, 2026',
    startTime: '11:00 AM',
    endTime: '03:00 PM',
    venue: 'Central Courtyard Circle',
    prizePool: '₹60,000',
    teamSize: '12 - 25 Members',
    entryType: 'Team',
    tagline: 'Thumping daflis and thunderous voices raising social awareness.',
    description: 'Traditional Indian street theatre competition tackling contemporary social, environmental, and human dilemmas.',
    rules: [
      'Time limit: 18 minutes + 2 minutes warning bell.',
      'Only acoustic percussion instruments (dafli, dholak, manjira) allowed.',
      'No electronic amplification or pre-recorded audio.',
      'Script must be original or appropriately credited.'
    ],
    coordinator: { name: 'Pooja Verma', phone: '+91 98223 45678' }
  },
  {
    id: 'western-solo-singing',
    name: 'Acoustic Soul: Western Solo Vocal',
    category: 'singing',
    day: 1,
    dateStr: 'Thursday, March 19, 2026',
    startTime: '01:30 PM',
    endTime: '04:30 PM',
    venue: 'Acoustic Auditorium (Hall B)',
    prizePool: '₹25,000',
    teamSize: 'Solo (+1 Accompanist)',
    entryType: 'Solo',
    tagline: 'Pure pitch, soulful falsettos, and acoustic magic.',
    description: 'Showcase your vocal range and emotive singing in Western genres including Pop, Soul, Jazz, R&B, and Rock ballads.',
    rules: [
      'Time limit: 5 minutes per performer.',
      'One live accompanist (guitar/keyboard) or one backing track allowed.',
      'Judging based on vocal clarity, pitch accuracy, expression, and stage presence.'
    ],
    coordinator: { name: 'Rohan Mehra', phone: '+91 98334 56789' }
  },
  {
    id: 'valorant-championship',
    name: 'CyberStrike: Valorant 5v5 Invitational',
    category: 'gaming',
    day: 1,
    dateStr: 'Thursday, March 19, 2026',
    startTime: '10:00 AM',
    endTime: '07:00 PM',
    venue: 'Esports Dome (Lan Arena 1)',
    prizePool: '₹75,000',
    teamSize: '5 Players (+1 Sub)',
    entryType: 'Team',
    tagline: 'Precision tactical gunplay on 240Hz mechanical rigs.',
    description: 'Double elimination LAN tournament. High-speed gigabit fiber connection, tournament spec gear, and live caster stream on Twitch/YouTube.',
    rules: [
      'Tournament mode standard 5v5 on Mumbai servers.',
      'Map veto process conducted before each match.',
      'BYOP (Bring Your Own Peripherals) allowed after referee inspection.',
      'Toxicity or exploitation of game glitches will result in forfeits.'
    ],
    coordinator: { name: 'Kabir Sengupta', phone: '+91 98445 67890' },
    featured: true
  },
  {
    id: 'shutter-speed',
    name: 'ChromaLens: 48-Hour Photo Marathon',
    category: 'art',
    day: 1,
    dateStr: 'Thursday, March 19, 2026',
    startTime: '10:00 AM',
    endTime: '06:00 PM',
    venue: 'Campus-wide / Media Hub',
    prizePool: '₹30,000',
    teamSize: 'Solo',
    entryType: 'Solo',
    tagline: 'Capture the heart, sweat, and neon glory of AURA.',
    description: 'Themes will be announced at 10:00 AM on Day 1. Contestants must submit a photo series of 5 raw and edited photographs reflecting festival energy.',
    rules: [
      'Photos must be shot on campus within the festival timeframe.',
      'EXIF data must be intact in the submitted raw files.',
      'Basic color grading allowed; generative AI replacement prohibited.'
    ],
    coordinator: { name: 'Sneha Kapoor', phone: '+91 98556 78901' }
  },

  // DAY 2
  {
    id: 'western-group-dance',
    name: 'Groove Genesis: Western Mega Dance Battle',
    category: 'dance',
    day: 2,
    dateStr: 'Friday, March 20, 2026',
    startTime: '03:00 PM',
    endTime: '07:30 PM',
    venue: 'Main Amphitheatre (Stage Alpha)',
    prizePool: '₹1,20,000',
    teamSize: '10 - 24 Members',
    entryType: 'Team',
    tagline: 'Synchronized chaos, gravity-defying flips, and sheer adrenaline.',
    description: 'The crowning dance event of the fest. Top collegiate dance crews clash with hip-hop, locking-popping, contemporary, and urban choreography.',
    rules: [
      'Performance duration: 8 to 12 minutes.',
      'Props allowed but must be cleared within 60 seconds.',
      'Dangerous props (fire, powdered color, sharp metals) strictly prohibited.',
      'Audio track must be submitted in MP3 format 2 hours before the event.'
    ],
    coordinator: { name: 'Divya Khurana', phone: '+91 98667 89012' },
    featured: true
  },
  {
    id: 'nexus-runway',
    name: 'Vogue Nexus: Cyberpunk Fashion Runway',
    category: 'fashion',
    day: 2,
    dateStr: 'Friday, March 20, 2026',
    startTime: '06:00 PM',
    endTime: '09:00 PM',
    venue: 'Auditorium Grand Stage',
    prizePool: '₹1,00,000',
    teamSize: '12 - 20 Models + Designers',
    entryType: 'Team',
    tagline: 'Futuristic silhouettes, neon couture, and avant-garde glamour.',
    description: 'Theme: "Metropolis 2099 — Organic Meets Cybernetic". College design teams present their couture collection with bespoke lights and soundtracks.',
    rules: [
      'Total stage time: 15 minutes per team including intro narration.',
      'Judging criteria: Costume creativity, garment craft, runway walk, and thematic cohesion.',
      'Design portfolios must be submitted to the jury 1 hour prior.'
    ],
    coordinator: { name: 'Tanvi Singhania', phone: '+91 98778 90123' },
    featured: true
  },
  {
    id: 'rap-beatbox-cypher',
    name: 'Gully Spit: Street Rap & Beatbox Cypher',
    category: 'singing',
    day: 2,
    dateStr: 'Friday, March 20, 2026',
    startTime: '01:00 PM',
    endTime: '04:00 PM',
    venue: 'Underground Steps Stage',
    prizePool: '₹40,000',
    teamSize: 'Solo',
    entryType: 'Solo',
    tagline: 'Raw bars, multi-syllabic rhymes, and 808 bass throat drops.',
    description: '1v1 elimination cyphers judged by underground hip-hop royalty. Live beatbox battle followed by freestyle rap knockout rounds.',
    rules: [
      'Round 1: 60-second showcase of original verse/beat.',
      'Round 2: 1v1 face-off with 45-second rebuttals.',
      'No personal hate speech or defamatory remarks.'
    ],
    coordinator: { name: 'Varun Joshi', phone: '+91 98889 01234' }
  },
  {
    id: 'robowars-heavyweight',
    name: 'MechaClash: 15kg & 30kg RoboWars',
    category: 'tech',
    day: 2,
    dateStr: 'Friday, March 20, 2026',
    startTime: '11:00 AM',
    endTime: '05:00 PM',
    venue: 'Reinforced Steel Arena (Open Lawns)',
    prizePool: '₹80,000',
    teamSize: '3 - 6 Members',
    entryType: 'Team',
    tagline: 'Sparks fly and titanium bends in destructive combat robotics.',
    description: 'Remote controlled bots equipped with spinners, flippers, and drum weapons battling inside a polycarbonate bulletproof enclosure.',
    rules: [
      'Weight categories: Featherweight (15kg) and Middleweight (30kg).',
      'Matches last 3 minutes or until one bot is immobilized for 10 seconds.',
      'Failsafe weapon switches and wireless kill switches mandatory.'
    ],
    coordinator: { name: 'Nikhil Rathi', phone: '+91 98990 12345' },
    featured: true
  },
  {
    id: 'monologue-drama',
    name: 'Abhinay: The Mono-Act Soliloquy',
    category: 'drama',
    day: 2,
    dateStr: 'Friday, March 20, 2026',
    startTime: '10:30 AM',
    endTime: '01:30 PM',
    venue: 'Black Box Studio (Hall C)',
    prizePool: '₹25,000',
    teamSize: 'Solo',
    entryType: 'Solo',
    tagline: 'One spotlight. One actor. Raw emotional intensity.',
    description: 'Dramatic monologue competition in Hindi or English, interpreting classic plays, cinematic adaptations, or original screenplays.',
    rules: [
      'Time limit: 6 to 8 minutes.',
      'Minimalist props permitted (table, chair, jacket).',
      'Evaluated on emotional resonance, voice modulation, and character embodiment.'
    ],
    coordinator: { name: 'Priya Nair', phone: '+91 98101 23456' }
  },

  // DAY 3
  {
    id: 'all-styles-cypher',
    name: 'Red Bull Dance Clash: 1v1 All-Styles',
    category: 'dance',
    day: 3,
    dateStr: 'Saturday, March 21, 2026',
    startTime: '12:00 PM',
    endTime: '04:00 PM',
    venue: 'Central Dance Arena (Open Circle)',
    prizePool: '₹50,000',
    teamSize: 'Solo',
    entryType: 'Solo',
    tagline: 'DJ drops a random track. You bring the fire.',
    description: 'Dancers face off against random tracks across Funk, Hip-Hop, Afrobeats, Electro, and Bollywood. Crowd cheers factor into tiebreakers.',
    rules: [
      'Prelims: 45-second judge selection round.',
      'Top 16 brackets: 2 rounds of 45 seconds each.',
      'Respect the circle; physical contact or aggressive posturing causes penalty.'
    ],
    coordinator: { name: 'Divya Khurana', phone: '+91 98667 89012' }
  },
  {
    id: 'hack-a-fest',
    name: 'ByteBurst: 24-Hour AI & Web3 Hackathon',
    category: 'tech',
    day: 3,
    dateStr: 'Saturday, March 21, 2026',
    startTime: '09:00 AM (Starts Day 2)',
    endTime: '03:00 PM (Pitch Finals)',
    venue: 'Innovation Sandbox Hub',
    prizePool: '₹1,50,000',
    teamSize: '2 - 4 Members',
    entryType: 'Team',
    tagline: 'Code all night, pitch to venture capitalists by dawn.',
    description: 'Build functional prototypes solving real problems in AI Agents, Smart Campus, Green Tech, or Decentralized Apps. Free pizza, caffeine, and mentor support.',
    rules: [
      'All code must be committed to GitHub during the hackathon window.',
      'APIs and open source libraries allowed with proper disclosures.',
      'Live 5-minute product demo and 3-minute jury Q&A.'
    ],
    coordinator: { name: 'Aditya Chhabra', phone: '+91 98212 34567' },
    featured: true
  },
  {
    id: 'bgmi-mobile-clash',
    name: 'Battle Royale: BGMI Mobile Squad Finals',
    category: 'gaming',
    day: 3,
    dateStr: 'Saturday, March 21, 2026',
    startTime: '11:00 AM',
    endTime: '04:30 PM',
    venue: 'Esports Dome (Lan Arena 2)',
    prizePool: '₹60,000',
    teamSize: '4 Players (+1 Sub)',
    entryType: 'Team',
    tagline: 'Erangel & Miramar tactical supremacy on 90FPS displays.',
    description: '16 invited squads clash across 5 intense match maps. Point system based on finish points plus position placement multipliers.',
    rules: [
      'Official smartphones only; tablets and emulators strictly barred.',
      'Screen recording and anti-cheat client inspection required.',
      'Teaming with other squads will lead to lifetime blacklisting.'
    ],
    coordinator: { name: 'Kabir Sengupta', phone: '+91 98445 67890' }
  },
  {
    id: 'live-graffiti',
    name: 'Neon Canvas: Live Street Art & Graffiti',
    category: 'art',
    day: 3,
    dateStr: 'Saturday, March 21, 2026',
    startTime: '10:00 AM',
    endTime: '03:00 PM',
    venue: 'Art Alley Boulevard',
    prizePool: '₹35,000',
    teamSize: '1 - 3 Members',
    entryType: 'Solo / Team',
    tagline: 'Transform a blank 8x8 foot canvas into an electric mural.',
    description: 'Artists are provided spray cans, acrylics, and brushes to bring a visionary mural to life around the theme of "Tomorrow\'s Echoes".',
    rules: [
      'Time duration: 5 hours uninterrupted.',
      'Protective respirators and basic spray paint colors provided.',
      'Original sketch concept must be shown to judges prior to start.'
    ],
    coordinator: { name: 'Sneha Kapoor', phone: '+91 98556 78901' }
  },
  {
    id: 'unplugged-classical-fusion',
    name: 'Raag & Resonance: Classical Instrumental Fusion',
    category: 'music',
    day: 3,
    dateStr: 'Saturday, March 21, 2026',
    startTime: '01:00 PM',
    endTime: '04:30 PM',
    venue: 'Acoustic Auditorium (Hall A)',
    prizePool: '₹50,000',
    teamSize: '2 - 6 Members',
    entryType: 'Team',
    tagline: 'Sitar, tabla, violin, and synths uniting East and West.',
    description: 'Explore the infinite tapestry of Indian Classical ragas fused with modern jazz, rock, and ambient world music.',
    rules: [
      'Time limit: 12 minutes on stage.',
      'At least one traditional Indian classical instrument is required.',
      'Jury evaluates raga improvisation, rhythmic complex taals, and musicality.'
    ],
    coordinator: { name: 'Aarav Malhotra', phone: '+91 98112 34567' }
  }
];

export const HEADLINERS_AND_PERFORMERS: Performer[] = [
  {
    id: 'lost-frequencies-edm',
    name: 'LOST FREQUENCIES & NIKHIL CHINAPA',
    role: 'Global EDM Headliner',
    genre: 'Melodic Deep House / Festival Progressive',
    day: 3,
    dateStr: 'Saturday, March 21, 2026',
    time: '08:00 PM - 11:00 PM',
    stage: 'Main Amphitheatre (Stage Alpha)',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600&auto=format&fit=crop',
    bio: 'Multi-platinum international festival headliner known worldwide for chart-topping anthems like "Are You With Me" and "Where Are You Now". Joined by Indian electronic music pioneer Nikhil Chinapa for a 3-hour audio-visual spectacle featuring laser arrays, CO2 cryo-jets, and pyrotechnics.',
    isHeadliner: true,
    highlightTrack: 'Where Are You Now (Live Festival Mix)',
    spotifyUrl: 'https://open.spotify.com',
    instagramUrl: 'https://instagram.com'
  },
  {
    id: 'the-yellow-diary',
    name: 'THE YELLOW DIARY',
    role: 'Indie Rock Powerhouse',
    genre: 'Alternative Pop-Rock / Neo-Fusion',
    day: 1,
    dateStr: 'Thursday, March 19, 2026',
    time: '07:30 PM - 10:00 PM',
    stage: 'Main Amphitheatre (Stage Alpha)',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1200&auto=format&fit=crop',
    bio: 'India’s most celebrated alt-rock band combining emotive poetry with soaring synthesizers and heavy guitar riffs. Their anthems like "Roz Roz" and "Rab Raakha" will illuminate Day 1’s night sky under the stars.',
    isHeadliner: false,
    highlightTrack: 'Roz Roz (Acoustic & Electric)',
    spotifyUrl: 'https://open.spotify.com',
    instagramUrl: 'https://instagram.com'
  },
  {
    id: 'jonita-gandhi',
    name: 'JONITA GANDHI & THE LIVE BAND',
    role: 'Bollywood & Global Pop Star',
    genre: 'Bollywood / Contemporary Pop / Polyglot',
    day: 2,
    dateStr: 'Friday, March 20, 2026',
    time: '07:30 PM - 10:30 PM',
    stage: 'Main Amphitheatre (Stage Alpha)',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop',
    bio: 'The mesmerizing voice behind "The Breakup Song", "Chellama", and "Current Laga Re". Jonita brings her electrifying 9-piece band for an unforgettable night of Bollywood pop, acoustic interludes, and high-energy dance numbers.',
    isHeadliner: false,
    highlightTrack: 'Arabic Kuthu & Global Medley',
    spotifyUrl: 'https://open.spotify.com',
    instagramUrl: 'https://instagram.com'
  },
  {
    id: 'seedhe-maut',
    name: 'SEEDHE MAUT (Calm & Encore)',
    role: 'Hip-Hop Headliner',
    genre: 'Desi Hip-Hop / Grime / Underground Trap',
    day: 2,
    dateStr: 'Friday, March 20, 2026',
    time: '05:00 PM - 07:00 PM',
    stage: 'Underground Steps Stage',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
    bio: 'New Delhi’s prodigal sons and the vanguard of Indian hip-hop. Calm and Encore ABJ bring their explosive flows, razor-sharp lyricism, and legendary mosh pits for the ultimate college rap throwdown.',
    isHeadliner: false,
    highlightTrack: 'Nanchaku & 11K',
    spotifyUrl: 'https://open.spotify.com',
    instagramUrl: 'https://instagram.com'
  },
  {
    id: 'anubhav-singh-bassi',
    name: 'ANUBHAV SINGH BASSI',
    role: 'Celebrity Comedy Night',
    genre: 'Stand-up Comedy / Storytelling',
    day: 1,
    dateStr: 'Thursday, March 19, 2026',
    time: '05:30 PM - 07:00 PM',
    stage: 'Auditorium Grand Stage',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=1200&auto=format&fit=crop',
    bio: 'One of India’s most beloved storytellers and stand-up icons. Known for record-breaking specials like "Bas Kar Bassi", his relatable college hostel anecdotes and comedic timing will leave the auditorium in uncontrollable laughter.',
    isHeadliner: false,
    highlightTrack: 'Hostel Diaries Live',
    instagramUrl: 'https://instagram.com'
  },
  {
    id: 'shadow-symphony',
    name: 'SHADOW & LIGHT',
    role: 'Contemporary Classical',
    genre: 'Indie Classical / Jazz Fusion',
    day: 3,
    dateStr: 'Saturday, March 21, 2026',
    time: '04:30 PM - 06:30 PM',
    stage: 'Acoustic Auditorium (Hall A)',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
    bio: 'Acclaimed duo blending Indian classical ragas with contemporary jazz piano, rich vocal textures, and soulful cinematic landscapes. An ethereal sunset performance to remember.',
    isHeadliner: false,
    highlightTrack: 'Dua & Twilight Raga',
    spotifyUrl: 'https://open.spotify.com',
    instagramUrl: 'https://instagram.com'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Star Night Euphoria',
    category: 'concert',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
    caption: 'Over 12,000 festival-goers illuminating the night sky with smartphone torches during the headline DJ set.',
    year: '2025'
  },
  {
    id: 'gal-2',
    title: 'Urban Dance Crew Clash',
    category: 'dance',
    imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200&auto=format&fit=crop',
    caption: 'A 24-member collegiate crew executing a gravity-defying freeze in the Western Group Dance Finals.',
    year: '2025'
  },
  {
    id: 'gal-3',
    title: 'Electric Guitar Solo in Battle of the Bands',
    category: 'concert',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop',
    caption: 'Lead guitarist shredding under crimson stage lasers at Stage Alpha.',
    year: '2025'
  },
  {
    id: 'gal-4',
    title: 'Nukkad Natak Social Resonance',
    category: 'drama',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1200&auto=format&fit=crop',
    caption: 'Street play artists striking a powerful formation at the Central Circle.',
    year: '2024'
  },
  {
    id: 'gal-5',
    title: 'The Electric Sea of Attendees',
    category: 'crowd',
    imageUrl: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1200&auto=format&fit=crop',
    caption: 'Pulsating crowd energy captured during the grand finale confetti blast.',
    year: '2025'
  },
  {
    id: 'gal-6',
    title: 'Runway Couture in Motion',
    category: 'bts',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
    caption: 'Final model lineup before hitting the 60-foot neon runway at Vogue Nexus.',
    year: '2025'
  },
  {
    id: 'gal-7',
    title: 'Backstage Soundcheck & Prep',
    category: 'bts',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    caption: 'Behind the scenes at the audio console tuning 48 audio channels.',
    year: '2025'
  },
  {
    id: 'gal-8',
    title: 'Live Street Art Mural in Progress',
    category: 'dance',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
    caption: 'Fine arts students collaborating on an 8x8 foot spray-painted masterpiece.',
    year: '2025'
  }
];

export const SPONSORS: Sponsor[] = [
  {
    id: 'sp-1',
    name: 'RED BULL ENERGY',
    tier: 'Title Sponsor',
    logoText: 'Red Bull',
    industry: 'Energy Drinks & Extreme Sports',
    accentColor: '#FF007A',
    website: 'https://www.redbull.com'
  },
  {
    id: 'sp-2',
    name: 'INTEL GAMING & CORE ULTRA',
    tier: 'Powered By',
    logoText: 'intel. CORE Ultra',
    industry: 'High-Performance Computing',
    accentColor: '#00F0FF',
    website: 'https://www.intel.com'
  },
  {
    id: 'sp-3',
    name: 'SPOTIFY INDIA',
    tier: 'Powered By',
    logoText: 'Spotify',
    industry: 'Music Streaming Partner',
    accentColor: '#1DB954',
    website: 'https://www.spotify.com'
  },
  {
    id: 'sp-4',
    name: 'ONEPLUS TECH',
    tier: 'Associate Sponsor',
    logoText: '1+ ONEPLUS',
    industry: 'Smartphones & Wearables',
    accentColor: '#FF0000',
    website: 'https://www.oneplus.com'
  },
  {
    id: 'sp-5',
    name: 'BOAT AUDIO',
    tier: 'Associate Sponsor',
    logoText: 'boAt',
    industry: 'Official Audio Gear',
    accentColor: '#E11D48',
    website: 'https://www.boat-lifestyle.com'
  },
  {
    id: 'sp-6',
    name: 'BOOKMYSHOW',
    tier: 'Media Partner',
    logoText: 'bookmyshow',
    industry: 'Ticketing & Experience Partner',
    accentColor: '#E50914',
    website: 'https://in.bookmyshow.com'
  },
  {
    id: 'sp-7',
    name: 'MTV INDIA',
    tier: 'Media Partner',
    logoText: 'MTV Youth',
    industry: 'Television & Digital Broadcast',
    accentColor: '#FACC15',
    website: 'https://www.mtvindia.com'
  },
  {
    id: 'sp-8',
    name: 'DOMINOS & COCA-COLA',
    tier: 'Beverage & Food',
    logoText: 'Dominos x Coke',
    industry: 'Official Hunger & Thirst Zone',
    accentColor: '#0070F3',
    website: 'https://www.dominos.co.in'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Registration',
    question: 'How do I register for individual or team competitions?',
    answer: 'You can register directly through our online registration portal on this website! Select your preferred event, specify whether you are competing solo or as a team, and fill in your college details. Once submitted, your digital pass with a unique QR code will be generated instantly.'
  },
  {
    id: 'faq-2',
    category: 'Passes & Entry',
    question: 'Is entry free for college students from other universities?',
    answer: 'Yes! General fest entry and Star Night access is completely free for all bona fide students carrying a valid physical College ID card alongside their digital AURA 2026 pass.'
  },
  {
    id: 'faq-3',
    category: 'Accommodation',
    question: 'Are hostel accommodations available for outstation participants?',
    answer: 'Yes, affordable hostel accommodations with Wi-Fi, bedding, and meals are provided inside our campus residences for outstation collegiate teams. When registering, make sure to select the "Accommodation Needed" checkbox and our hospitality lead will reach out with check-in procedures.'
  },
  {
    id: 'faq-4',
    category: 'Competitions',
    question: 'Can one participant register for multiple events?',
    answer: 'Absolutely! You can participate in multiple competitions provided the event schedules and timings do not overlap. If you wish to compete in multiple categories, submit a registration for each event to obtain your respective competition slots.'
  },
  {
    id: 'faq-5',
    category: 'Passes & Entry',
    question: 'What are the rules and prohibited items at the venue?',
    answer: 'For safety, cigarettes, alcoholic beverages, sharp items, flammable materials, outside commercial food/beverages, and large professional DSLR lenses without media badges are strictly prohibited. Strict bag screening is enforced at all gates.'
  },
  {
    id: 'faq-6',
    category: 'General',
    question: 'How will prize money be distributed to winners?',
    answer: 'Prize money is disbursed via direct NEFT / UPI bank transfer within 7 business days following the festival valedictory ceremony. Trophies and physical winner certificates are awarded on the main stage right after each grand finale.'
  }
];

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    id: 'com-1',
    name: 'Devansh Singhal',
    role: 'Overall Student Convener',
    department: 'Computer Science & Engineering',
    email: 'convener.aura@aisdt.ac.in',
    phone: '+91 98111 22334',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'com-2',
    name: 'Ananya Deshmukh',
    role: 'President, Cultural Council',
    department: 'Design & Media Arts',
    email: 'cultural.council@aisdt.ac.in',
    phone: '+91 98222 33445',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'com-3',
    name: 'Prof. Dr. Rajeshwari Sen',
    role: 'Faculty Dean & Fest Patron',
    department: 'Dean of Student Welfare',
    email: 'dean.welfare@aisdt.ac.in',
    phone: '+91 11 2789 4400',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'com-4',
    name: 'Vikramaditya Roy',
    role: 'Head of Security & Logistics',
    department: 'Mechanical & Automation',
    email: 'security.aura@aisdt.ac.in',
    phone: '+91 98333 44556',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop'
  }
];
