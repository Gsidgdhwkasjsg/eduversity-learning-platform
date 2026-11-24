export interface TeamMember {
  name: string;
  email: string;
}

export interface RegistrationRecord {
  id: string; // e.g., AURA-26-8923
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  department: string;
  yearOfStudy: string;
  eventId: string;
  eventName: string;
  participationType: 'individual' | 'team';
  teamName?: string;
  teamMembers?: TeamMember[];
  needsAccommodation: boolean;
  qrPayload: string;
  createdAt: string;
}

const STORAGE_KEY = 'aura_2026_registrations_v1';

// Seed initial realistic registrations so the admin table / organizer view is populated and exciting right away!
const INITIAL_SAMPLE_REGISTRATIONS: RegistrationRecord[] = [
  {
    id: 'AURA-26-1042',
    fullName: 'Rhea Chakraborty',
    email: 'rhea.c@miranda.du.ac.in',
    phone: '+91 98711 02938',
    collegeName: 'Miranda House, Delhi University',
    department: 'English Literature',
    yearOfStudy: '3rd Year',
    eventId: 'western-group-dance',
    eventName: 'Groove Genesis: Western Mega Dance Battle',
    participationType: 'team',
    teamName: 'Tempest Crew',
    teamMembers: [
      { name: 'Rhea Chakraborty', email: 'rhea.c@miranda.du.ac.in' },
      { name: 'Simran Walia', email: 'simran.w@gmail.com' },
      { name: 'Avani Singhal', email: 'avani.s@gmail.com' },
      { name: 'Tanya Basu', email: 'tanya.b@gmail.com' }
    ],
    needsAccommodation: false,
    qrPayload: 'AURA2026:AURA-26-1042:western-group-dance:TempestCrew',
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
  },
  {
    id: 'AURA-26-1088',
    fullName: 'Kunal Singhania',
    email: 'kunal.singh@iitd.ac.in',
    phone: '+91 98199 44321',
    collegeName: 'IIT Delhi',
    department: 'Electrical Engineering',
    yearOfStudy: '4th Year',
    eventId: 'battle-of-bands',
    eventName: 'Sync-Shock: Battle of the Bands',
    participationType: 'team',
    teamName: 'The Crimson Distortion',
    teamMembers: [
      { name: 'Kunal Singhania', email: 'kunal.singh@iitd.ac.in' },
      { name: 'Farhan Zaidi', email: 'farhan.z@gmail.com' },
      { name: 'Neil Sen', email: 'neil.s@gmail.com' },
      { name: 'Dev Sharma', email: 'dev.sharma@gmail.com' }
    ],
    needsAccommodation: false,
    qrPayload: 'AURA2026:AURA-26-1088:battle-of-bands:TheCrimsonDistortion',
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
  },
  {
    id: 'AURA-26-1194',
    fullName: 'Zainab Qureshi',
    email: 'zainab.q@nift.ac.in',
    phone: '+91 97188 55432',
    collegeName: 'NIFT New Delhi',
    department: 'Fashion Design & Tech',
    yearOfStudy: '3rd Year',
    eventId: 'nexus-runway',
    eventName: 'Vogue Nexus: Cyberpunk Fashion Runway',
    participationType: 'team',
    teamName: 'House of Cyberia',
    teamMembers: [
      { name: 'Zainab Qureshi', email: 'zainab.q@nift.ac.in' },
      { name: 'Aakash Verma', email: 'aakash.v@gmail.com' },
      { name: 'Esha Malhotra', email: 'esha.m@gmail.com' }
    ],
    needsAccommodation: false,
    qrPayload: 'AURA2026:AURA-26-1194:nexus-runway:HouseOfCyberia',
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString()
  },
  {
    id: 'AURA-26-1250',
    fullName: 'Pranav Nair',
    email: 'pranav.nair@b振りbits-pilani.ac.in',
    phone: '+91 99401 22334',
    collegeName: 'BITS Pilani',
    department: 'Computer Science',
    yearOfStudy: '2nd Year',
    eventId: 'valorant-championship',
    eventName: 'CyberStrike: Valorant 5v5 Invitational',
    participationType: 'team',
    teamName: 'Viper Esports',
    teamMembers: [
      { name: 'Pranav Nair', email: 'pranav.nair@bits.ac.in' },
      { name: 'Raghav B', email: 'raghav.b@gmail.com' },
      { name: 'Tarun G', email: 'tarun.g@gmail.com' },
      { name: 'Sameer K', email: 'sameer.k@gmail.com' },
      { name: 'Aryan P', email: 'aryan.p@gmail.com' }
    ],
    needsAccommodation: true,
    qrPayload: 'AURA2026:AURA-26-1250:valorant-championship:ViperEsports',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString()
  }
];

class RegistrationDatabase {
  private cache: RegistrationRecord[] = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.cache = JSON.parse(stored);
      } else {
        this.cache = INITIAL_SAMPLE_REGISTRATIONS;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cache));
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or disabled, using in-memory store', e);
      this.cache = INITIAL_SAMPLE_REGISTRATIONS;
    }
  }

  public getAll(): RegistrationRecord[] {
    this.init();
    return [...this.cache].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getById(id: string): RegistrationRecord | undefined {
    return this.cache.find((r) => r.id.toLowerCase() === id.toLowerCase());
  }

  public isDuplicate(email: string, eventId: string): boolean {
    const cleanEmail = email.trim().toLowerCase();
    return this.cache.some(
      (r) => r.email.trim().toLowerCase() === cleanEmail && r.eventId === eventId
    );
  }

  public create(
    data: Omit<RegistrationRecord, 'id' | 'qrPayload' | 'createdAt'>
  ): { success: boolean; record?: RegistrationRecord; error?: string } {
    // 1. Duplicate verification
    if (this.isDuplicate(data.email, data.eventId)) {
      return {
        success: false,
        error: `This email (${data.email}) is already registered for "${data.eventName}". You cannot register twice for the same event.`
      };
    }

    // 2. Generate unique Ticket Pass ID: AURA-26-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const passId = `AURA-26-${randomSuffix}`;

    // 3. Construct QR payload
    const qrPayload = JSON.stringify({
      fest: 'AURA-2026',
      ticketId: passId,
      name: data.fullName,
      email: data.email,
      event: data.eventName,
      college: data.collegeName,
      type: data.participationType
    });

    const newRecord: RegistrationRecord = {
      ...data,
      id: passId,
      qrPayload,
      createdAt: new Date().toISOString()
    };

    this.cache.unshift(newRecord);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cache));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }

    return {
      success: true,
      record: newRecord
    };
  }

  public delete(id: string): boolean {
    const initialLen = this.cache.length;
    this.cache = this.cache.filter((r) => r.id !== id);
    if (this.cache.length !== initialLen) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cache));
      return true;
    }
    return false;
  }

  public exportToCSV(): string {
    const records = this.getAll();
    const headers = [
      'Ticket ID',
      'Full Name',
      'Email',
      'Phone',
      'College',
      'Department',
      'Year',
      'Event Name',
      'Participation Type',
      'Team Name',
      'Team Members Count',
      'Accommodation Needed',
      'Registered At'
    ];

    const rows = records.map((r) => [
      `"${r.id}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.collegeName.replace(/"/g, '""')}"`,
      `"${r.department.replace(/"/g, '""')}"`,
      `"${r.yearOfStudy}"`,
      `"${r.eventName.replace(/"/g, '""')}"`,
      `"${r.participationType}"`,
      `"${(r.teamName || 'N/A').replace(/"/g, '""')}"`,
      r.teamMembers ? r.teamMembers.length : 1,
      r.needsAccommodation ? 'YES' : 'NO',
      `"${new Date(r.createdAt).toLocaleString()}"`
    ]);

    return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  }
}

export const regDb = new RegistrationDatabase();
