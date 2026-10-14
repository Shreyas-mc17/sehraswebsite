// Single source of truth for site config and content.
// Edit copy, phone numbers, images and FAQs here — every page and the SEO data read from this file.

const img = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const site = {
  name: 'Sehras',
  title: 'Sehras — Wedding & Event Planners in Bengaluru',
  tagline: 'Weddings & Celebrations',
  description:
    'Sehras plans, designs and hosts weddings, birthdays, corporate events, baby showers, house warmings and naming ceremonies in Bengaluru and across India — led personally by founder Shreyas.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sehras.com').replace(/\/$/, ''),
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  locale: 'en_IN',
  founder: 'Shreyas',
  phone: '+919353127120',
  phoneDisplay: '+91 93531 27120',
  whatsapp: '919353127120',
  // Studio address, shown in the footer and in the business schema.
  street: '2nd floor, left house, 327, 2nd Cross Rd, Talacauvery Layout, Amrutahalli, Byatarayanapura',
  city: 'Bengaluru',
  region: 'Karnataka',
  postalCode: '560092',
  country: 'IN',
  keywords: [
    'wedding planner Bengaluru',
    'luxury wedding planner',
    'destination wedding planner India',
    'event management Bengaluru',
    'birthday party planner Bengaluru',
    'corporate event planner Bengaluru',
    'baby shower decoration',
    'house warming function',
    'naming ceremony decoration',
    'wedding decor',
    'sangeet mehendi planning',
    'wedding hospitality',
    'Sehras',
  ],
  designer: {
    name: 'Varshitha',
    phone: '+918088924308',
    phoneDisplay: '+91 80889 24308',
    whatsapp: '918088924308',
  },
} as const;

export const waLink = (text: string, number: string = site.whatsapp) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#experiences', label: 'Experiences' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#designer', label: 'Designer' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/about/', label: 'About' },
] as const;

export const heroSlides = [
  { src: img('1519225421980-715cb0215aed', 2000), alt: 'Bride and groom at a luxury wedding ceremony' },
  { src: img('1583939003579-730e3918a45a', 2000), alt: 'Indian wedding couple in traditional attire' },
  { src: img('1519741497674-611481863552', 2000), alt: 'Wedding venue decorated with flowers' },
  { src: img('1606216794074-735e91aa2c92', 2000), alt: 'Bride and groom hands with mehendi' },
];

export type Service = {
  slug: string;
  num: string;
  title: string;
  short: string;
  metaDescription: string;
  image: string;
  icon: string; // SVG path data, 40x40 viewBox
  intro: string[];
  includes: string[];
  idealFor: string;
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: 'wedding-design',
    num: 'I',
    title: 'Wedding Design',
    short: 'Concept, styling and full creative direction — from the colour story to the last floral stem — tailored to your families and your story.',
    metaDescription:
      'Luxury wedding design and creative direction by Sehras, Bengaluru — concept, colour story, mandap and stage design, florals and styling for every ceremony.',
    image: img('1519741497674-611481863552', 1600),
    icon: 'M20 4 L24 16 L36 20 L24 24 L20 36 L16 24 L4 20 L16 16 Z',
    intro: [
      'Every Sehras wedding begins with a design story. We listen to how your families celebrate, the traditions you want honoured and the feeling you want guests to carry home — then translate it into a single creative direction across every ceremony.',
      'From the colour palette and mandap architecture to invitations, signage and table styling, one design lead holds the vision so every detail feels considered and nothing looks borrowed.',
    ],
    includes: [
      'Mood boards, colour story and ceremony-by-ceremony concepts',
      'Mandap, stage and entrance design',
      'Floral direction and styling',
      'Lighting design for day and night functions',
      'Stationery, signage and welcome experiences',
      'On-site styling supervision',
    ],
    idealFor: 'Couples who want a cohesive, personal look across every function — not a catalogue setup.',
    faqs: [
      { q: 'Can you work with a venue we have already booked?', a: 'Yes. We design around your venue — its architecture, light and rules — and adapt the concept so it feels intentional rather than imposed.' },
      { q: 'How early should we start the design process?', a: 'Ideally four to six months before the wedding, so there is time for concepts, approvals and custom fabrication. Shorter timelines are possible — just talk to Shreyas.' },
    ],
  },
  {
    slug: 'event-planning',
    num: 'II',
    title: 'Event Planning',
    short: 'Sangeet, mehendi, haldi and reception, planned with precise timelines and vendor coordination so nothing is left to chance.',
    metaDescription:
      'End-to-end wedding and event planning in Bengaluru — sangeet, mehendi, haldi, engagement and reception timelines, budgets and vendor coordination by Sehras.',
    image: img('1606216794074-735e91aa2c92', 1600),
    icon: 'M7 9 h26 v24 h-26 Z M7 16 H33 M14 5 V12 M26 5 V12',
    intro: [
      'A wedding is many events, not one. We plan each function — engagement, haldi, mehendi, sangeet, the ceremony and reception — as its own experience, then stitch them into a schedule that flows.',
      'Budgets, vendor shortlists, contracts, rehearsals and run-sheets are managed by our team, with regular check-ins so your family always knows where things stand.',
    ],
    includes: [
      'Budget planning and tracking',
      'Vendor sourcing, negotiation and contracts',
      'Function-wise timelines and run-sheets',
      'Entertainment, artists and sangeet choreography coordination',
      'Catering and menu tastings',
      'Rehearsals and family briefings',
    ],
    idealFor: 'Families who want one accountable team managing every function and vendor.',
    faqs: [
      { q: 'Do you plan individual functions, or only full weddings?', a: 'Both. Many families bring us in for the full wedding, but we also plan standalone engagements, sangeets and receptions.' },
      { q: 'Will we have a single point of contact?', a: 'Yes — Shreyas leads every wedding personally and stays your main point of contact from the first call to the final farewell.' },
    ],
  },
  {
    slug: 'destination-weddings',
    num: 'III',
    title: 'Destination Weddings',
    short: 'Venues across India and abroad, scouted and managed end-to-end — travel, stay, permissions and logistics included.',
    metaDescription:
      'Destination wedding planning by Sehras — Coorg, Goa, Udaipur, Kerala and abroad. Venue scouting, guest travel, stays, permissions and on-ground logistics.',
    image: img('1583939003579-730e3918a45a', 1600),
    icon: 'M20 6 a14 14 0 1 0 0.01 0 Z M6 20 H34 M20 6 C13 13 13 27 20 34 C27 27 27 13 20 6',
    intro: [
      'Hills, beaches, palaces or a vineyard abroad — we scout and shortlist venues that suit your guest count, traditions and budget, then manage everything it takes to move a whole celebration there.',
      'Travel, room blocks, local permissions, vendor transport and contingency plans for weather are all handled by our team, so your guests arrive to a wedding that feels effortless.',
    ],
    includes: [
      'Destination and venue scouting with recce visits',
      'Guest travel, room blocks and airport transfers',
      'Local permissions and vendor logistics',
      'Welcome kits and itinerary planning for guests',
      'Weather and contingency planning',
      'Full on-ground team for the wedding days',
    ],
    idealFor: 'Couples hosting family and friends for a multi-day celebration away from home.',
    faqs: [
      { q: 'Which destinations do you work in?', a: 'We plan weddings across India — including Coorg, Goa, Udaipur, Jaipur and Kerala — and can manage international destinations on request.' },
      { q: 'Do you handle guest travel and accommodation?', a: 'Yes. Room blocks, transfers, guest itineraries and a hospitality desk are part of our destination planning.' },
    ],
  },
  {
    slug: 'hospitality-guest-care',
    num: 'IV',
    title: 'Hospitality & Guest Care',
    short: 'Dedicated guest relations, curated stays, transport and concierge support so every visiting family feels held, not handled.',
    metaDescription:
      'Wedding hospitality and guest management by Sehras — hospitality desks, RSVP tracking, room allocation, transport, welcome kits and concierge for every guest.',
    image: img('1654157085616-cd80ec5fca2f', 1600),
    icon: 'M8 30 H32 M10 30 C10 20 15 14 20 14 C25 14 30 20 30 30 M20 10 V14',
    intro: [
      'Hospitality is where Sehras began. We believe guests remember how they were looked after long after they forget the décor — so every family is hosted as if they were our own.',
      'From RSVPs and room allocation to airport pickups, welcome hampers and a staffed hospitality desk, our team anticipates what guests need before they ask.',
    ],
    includes: [
      'RSVP tracking and guest database',
      'Room allocation and check-in management',
      'Airport, station and venue transfers',
      'Welcome hampers and personalised itineraries',
      'Staffed hospitality desk and concierge',
      'Special care for elders and VIP guests',
    ],
    idealFor: 'Weddings with many outstation guests or a large extended family.',
    faqs: [
      { q: 'Can you manage hospitality even if someone else plans the wedding?', a: 'Yes. Hospitality and guest care can be booked as a standalone service alongside your existing planner.' },
      { q: 'How do you track guests and rooms?', a: 'We maintain a live guest sheet covering travel, rooms, dietary needs and special requests, shared with your family throughout.' },
    ],
  },
  {
    slug: 'decor-styling',
    num: 'V',
    title: 'Décor & Styling',
    short: 'Set design, florals, lighting and table styling crafted to transform any venue into a single, cohesive atmosphere.',
    metaDescription:
      'Wedding décor and styling in Bengaluru by Sehras — mandap and stage décor, fresh florals, lighting, entrances and table styling for every function.',
    image: img('1465495976277-4387d4b0b4c6', 1600),
    icon: 'M20 20 C14 12 14 6 20 4 C26 6 26 12 20 20 C28 14 34 14 36 20 C34 26 28 26 20 20 C26 28 26 34 20 36 C14 34 14 28 20 20 C12 26 6 26 4 20 C6 14 12 14 20 20',
    intro: [
      'Our décor team brings the design story to life — building sets, sourcing fresh florals and layering light until the venue feels like a single, deliberate world.',
      'Every function gets its own atmosphere: bright and playful for haldi, intimate for mehendi, grand for the ceremony, and glamorous for the reception.',
    ],
    includes: [
      'Mandap, stage and backdrop fabrication',
      'Fresh and preserved floral installations',
      'Ambient, stage and architectural lighting',
      'Entrance, aisle and photo-moment design',
      'Table styling, linens and tableware',
      'Same-day turnarounds between functions',
    ],
    idealFor: 'Anyone who wants the venue to feel transformed, not simply decorated.',
    faqs: [
      { q: 'Do you use fresh flowers?', a: 'Yes — fresh florals are our default, with preserved or artificial elements used only where the setting or season calls for it.' },
      { q: 'Can décor be changed between two functions at the same venue?', a: 'Yes. We plan quick turnarounds so the same space can look completely different from the afternoon to the evening.' },
    ],
  },
  {
    slug: 'on-day-coordination',
    num: 'VI',
    title: 'On-Day Coordination',
    short: 'A dedicated team present through every hour of the celebration, so your family is fully present in the moment, not managing it.',
    metaDescription:
      'Wedding day coordination by Sehras — a dedicated on-site team running timelines, vendors, rituals and guest flow so your family can enjoy every moment.',
    image: img('1660455559502-8f71b47443c4', 1600),
    icon: 'M20 6 a14 14 0 1 0 0.01 0 Z M20 11 V20 L26 24',
    intro: [
      'On the day, the best thing your family can do is be guests at their own wedding. Our coordination team runs every hour so you can.',
      'We manage vendor arrivals, ritual timings with the priest, stage queues, photo schedules, food service and send-offs — quietly, and without anyone needing to ask.',
    ],
    includes: [
      'Detailed hour-by-hour run-sheet',
      'Vendor arrivals, set-up and handover',
      'Ritual and muhurtham timekeeping',
      'Stage, photography and guest-flow management',
      'Emergency kit and backup plans',
      'Pack-down and closing checks',
    ],
    idealFor: 'Families who have planned themselves but want professionals to run the day.',
    faqs: [
      { q: 'How many coordinators will be on site?', a: 'It depends on guest count and the number of venues — we confirm team size once we understand your schedule.' },
      { q: 'When do you need to be briefed?', a: 'We like to start at least four weeks before the wedding to meet vendors, walk the venue and build the run-sheet.' },
    ],
  },
];

// Home page "Ceremonies" rail — one card per function of an Indian wedding.
// "What we do" on the homepage. `event` must match an option in EnquiryForm so the card preselects it.
export const occasions = [
  {
    title: 'Weddings',
    event: 'Wedding',
    cta: 'wedding',
    text: 'Engagement to reception, at home or at a destination — designed, planned and hosted end to end.',
    tags: ['Engagement', 'Sangeet & Mehendi', 'Muhurtham', 'Reception'],
    icon: 'M5 23a8 8 0 1 0 16 0a8 8 0 1 0 -16 0 M19 23a8 8 0 1 0 16 0a8 8 0 1 0 -16 0 M16 10 L20 5 L24 10 L20 14 Z',
  },
  {
    title: 'Birthdays',
    event: 'Birthday',
    cta: 'birthday',
    text: 'First birthdays to milestone sixtieths — themed décor, entertainment and catering, all taken care of.',
    tags: ['Kids’ themes', 'Milestone birthdays', 'Surprise parties'],
    icon: 'M8 34 H32 M10 34 V22 H30 V34 M10 27 C13 29 15 29 17 27 S22 25 24 27 S28 29 30 27 M20 22 V16 M20 9 C18 11 18 13 20 14 C22 13 22 11 20 9 Z',
  },
  {
    title: 'Corporate Events',
    event: 'Corporate event',
    cta: 'corporate event',
    text: 'Conferences, launches, offsites and award nights, run to the minute and presented with polish.',
    tags: ['Conferences', 'Product launches', 'Offsites & awards'],
    icon: 'M6 14 H34 V33 H6 Z M15 14 V9 H25 V14 M6 22 H34 M18 22 V26 H22 V22',
  },
  {
    title: 'Baby Showers',
    event: 'Baby shower',
    cta: 'baby shower',
    text: 'Seemantham, godh bharai or a modern shower — soft styling, rituals and games for the family.',
    tags: ['Seemantham', 'Godh bharai', 'Themed showers'],
    icon: 'M12 6 A8 8 0 1 0 28 6 M8 18 H32 C32 26 27 30 20 30 C13 30 8 26 8 18 Z M13 34 A2 2 0 1 0 13.1 34 M27 34 A2 2 0 1 0 27.1 34',
  },
  {
    title: 'House Warming',
    event: 'House warming',
    cta: 'house warming',
    text: 'Griha pravesha with puja arrangements, floral décor and catering, so you can welcome guests home.',
    tags: ['Griha pravesha', 'Puja arrangements', 'Catering'],
    icon: 'M5 19 L20 7 L35 19 M10 15 V34 H30 V15 M17 34 V25 H23 V34',
  },
  {
    title: 'Naming Ceremony',
    event: 'Naming ceremony',
    cta: 'naming ceremony',
    text: 'Namakarana and cradle ceremonies, arranged with care for tradition and an intimate family lunch.',
    tags: ['Namakarana', 'Cradle ceremony', 'Family lunch'],
    icon: 'M7 24 H33 C33 30 27 33 20 33 C13 33 7 30 7 24 Z M20 20 C17 17 17 13 20 8 C23 13 23 17 20 20 Z',
  },
];

export const otherOccasions = ['Anniversaries', 'Engagements', 'Pujas & festivals', 'Retirement parties', 'Reunions'];

export const ceremonies = [
  { name: 'Engagement', note: 'The first promise, made beautifully — intimate set-ups and ring ceremonies.', image: img('1465495976277-4387d4b0b4c6', 900), alt: 'Couple holding hands showing their rings' },
  { name: 'Haldi', note: 'Sunshine yellows, marigolds and laughter — bright, playful and joyfully messy.', image: img('1671531776382-f32dff368120', 900), alt: 'Couple in yellow and gold traditional attire' },
  { name: 'Mehendi', note: 'Henna, music and floor seating — an afternoon for the women of the family.', image: img('1686865604150-43f95d61416c', 900), alt: 'Bridal hands with traditional henna' },
  { name: 'Sangeet', note: 'Choreography, live music and a dance floor that belongs to both families.', image: img('1665960213530-3fb10da1f25e', 900), alt: 'Bride and groom celebrating at their sangeet' },
  { name: 'Muhurtham', note: 'The sacred hour — mandap, rituals and timings kept with quiet precision.', image: img('1654157085616-cd80ec5fca2f', 900), alt: 'Mangalya tied with yellow thread on coconuts, ready for the muhurtham' },
  { name: 'Reception', note: 'Lights, glamour and a grand welcome for every guest you love.', image: img('1583939003579-730e3918a45a', 900), alt: 'Wedding venue lit up for the evening reception' },
];

export const promises = [
  { title: 'One point of contact', text: `${site.founder} leads every event personally, from the first call to the final goodbye.` },
  { title: 'Planned in-house', text: 'Design, planning, décor and hospitality are handled by one coordinated team.' },
  { title: 'Hospitality first', text: 'We look after every guest as warmly as we would our own family.' },
];

export const processSteps = [
  { title: 'Consultation', text: 'Shreyas meets you to understand the occasion, your traditions, the guest list and the budget you have in mind.' },
  { title: 'Proposal', text: 'We share a clear plan covering venue, design, catering and timeline, along with a transparent quote for your approval.' },
  { title: 'Planning', text: 'Our team books and manages every vendor, keeps you updated at each step and handles the details on your behalf.' },
  { title: 'Event day', text: 'We manage the day from set-up to send-off, so you and your family can spend your time with your guests.' },
];

export const experiences = [
  {
    tag: 'Live Photo Station',
    title: 'Printed photographs, ready in seconds.',
    text: 'A styled photo station at your venue where guests can take a picture and leave with a printed keepsake. Digital copies are shared with them as well.',
    image: img('1522673607200-164d1b6ce486'),
    alt: 'Guests gathered around a live photo station at a wedding',
  },
  {
    tag: 'Professional Makeup',
    title: 'Expert makeup for you and your family.',
    text: 'Celebrity-trained makeup artists for the hosts, family and guests, from the main look to touch-ups through the evening.',
    image: img('1487412947147-5cebf100ffc2'),
    alt: 'Makeup artist applying bridal makeup',
  },
  {
    tag: 'Live Sketch Artist',
    title: 'Hand-drawn portraits for your guests.',
    text: 'A live sketch artist draws quick portraits of your guests during the event — a personal keepsake they can take home.',
    image: img('1513364776144-60967b0f800f'),
    alt: 'Live sketch artist drawing a portrait at an event',
  },
];

export const stats = [
  { value: 120, suffix: '+', label: 'Events hosted' },
  { value: 15, suffix: '+', label: 'Cities & destinations' },
  { value: 98, suffix: '%', label: 'Guests who’d return for the next event' },
];

export const galleryFilters = [
  { id: 'all', label: 'All' },
  { id: 'south', label: 'South Indian' },
  { id: 'punjabi', label: 'Punjabi & Sikh' },
  { id: 'karnataka', label: 'Karnataka' },
  { id: 'details', label: 'Details & Rituals' },
  { id: 'candid', label: 'Candid' },
] as const;

type Shape = 'tall' | 'wide' | '';
const g = (set: string, id: string, alt: string, shape: Shape = '') => ({
  set,
  shape,
  alt,
  src: img(id, shape === 'wide' ? 1600 : 1000),
});

// Curated starting set — swap in real Sehras event photography when available.
export const gallery = [
  g('signature', '1519741497674-611481863552', 'Wedding mandap decorated with flowers', 'tall'),
  g('signature', '1465495976277-4387d4b0b4c6', 'Couple holding hands showing their wedding rings'),
  g('signature', '1606216794074-735e91aa2c92', 'Bride and groom hands with mehendi'),
  g('signature', '1583939003579-730e3918a45a', 'Wedding venue lit up in the evening', 'tall'),
  g('south', '1769500809146-953b80aaa98e', 'South Indian bride in silk saree and temple jewellery', 'tall'),
  g('south', '1769500810743-5e5dd4fd5848', 'South Indian bride and groom in traditional attire'),
  g('south', '1769500811478-f7d0f896d1a2', 'Bride in traditional South Indian attire'),
  g('south', '1769500801394-ca7dbd6cd433', 'South Indian bride adorned with gold temple jewellery', 'wide'),
  g('south', '1686865604150-43f95d61416c', 'Bridal hands with traditional henna'),
  g('punjabi', '1665960213530-3fb10da1f25e', 'Punjabi bride and groom at their wedding', 'tall'),
  g('punjabi', '1630526720753-aa4e71acf67d', 'Bride in red and white wedding dress outdoors'),
  g('punjabi', '1640953146604-2596432ee1eb', 'Couple in traditional Punjabi wedding attire'),
  g('punjabi', '1665960211002-0ecf92bed0ac', 'Bride and groom in traditional wedding clothing', 'wide'),
  g('punjabi', '1688850771088-ea838f3ed5ce', 'Couple in traditional Indian wedding attire'),
  g('punjabi', '1644214630472-46b766be71f9', 'Bride and groom walking together', 'tall'),
  g('punjabi', '1576470189712-50fe3ec06b04', 'Groom in a sherwani at a Sikh wedding'),
  g('punjabi', '1735052709798-2abcc8c0d6e1', 'Groom in a white turban before the ceremony'),
  g('punjabi', '1652454107511-824c26392845', 'Bride and groom sharing a tender moment', 'wide'),
  g('punjabi', '1671531776382-f32dff368120', 'Couple in yellow and gold wedding attire'),
  g('details', '1654156577076-e0350ba86cc1', 'Hands joined during a wedding ritual'),
  g('details', '1707576763859-19e8c69450ad', 'Bride in red bridal wear by a window', 'tall'),
  g('details', '1650873441621-08dbceadb7b8', 'Bridal necklace with beaded detailing'),
  g('details', '1650873442237-3838533a50be', 'Gold bridal jewellery with intricate design'),
  g('details', '1660455559502-8f71b47443c4', 'Guests seated together at a wedding', 'wide'),
  g('details', '1650873442159-65dda3860134', 'Gold and silver bridal necklace detail'),
  g('details', '1644214630464-421b5386f65a', 'Bride and groom sharing a quiet moment outdoors'),
  g('karnataka', '1756376748107-12c98ec6b969', 'Kannada bride and groom in silk saree and sherwani', 'tall'),
  g('karnataka', '1654764746590-841871176bc0', 'Karnataka bride in a Mysore silk saree'),
  g('karnataka', '1727430228383-aa1fb59db8bf', 'Bride in Karnataka silk saree and temple jewellery'),
  g('karnataka', '1756483482418-3f3e4c13f9b0', 'Guests in silk sarees at a Karnataka wedding archway', 'wide'),
  g('karnataka', '1726981448126-c7fc9237cdb5', 'Karnataka bride in a gold bridal drape'),
  g('karnataka', '1654157085616-cd80ec5fca2f', 'Mangalya tied with yellow thread on coconuts for the muhurtham'),
  g('karnataka', '1688789913221-071a44294edf', 'Bride in a red and green Karnataka saree', 'tall'),
  g('karnataka', '1650873441618-7b754482bddd', 'Gold and silver Karnataka bridal saree drape'),
  g('karnataka', '1617627143750-d86bc21e42bb', 'Bride in a red and blue Karnataka saree'),
  g('candid', '1606800052052-a08af7148866', 'Family embracing at a celebration'),
  g('candid', '1520854221256-17451cc331bf', 'Children playing at a wedding'),
];

export const designerItems = [
  { title: 'Sarees & Saree Art', text: 'Hand-picked silk and designer sarees, plus hand-painted saree and blouse art for a look that’s entirely your own.', image: img('1650873441618-7b754482bddd', 1000), alt: 'Bridal saree with intricate gold border work' },
  { title: 'Bangles & Bridal Sets', text: 'Bangles, necklaces and full jewellery sets across gold, silver and antique finishes for every ceremony.', image: img('1611591437281-460bfbe1220a', 1000), alt: 'Gold bangles and bridal bracelets' },
  { title: 'Handcrafted Ornaments', text: 'Hair pins, adornments and artistic creations, handcrafted in small batches — no two pieces exactly alike.', image: img('1599643477877-530eb83abc8e', 1000), alt: 'Handcrafted bridal ornaments' },
];

export const testimonials = [
  { quote: 'Shreyas and his team didn’t just plan our wedding — they understood our family before they touched a single detail. Every guest felt looked after.', author: 'Ananya & Rohit', place: 'Bengaluru' },
  { quote: 'We hosted 400 guests across three cities and never once felt the chaos. Sehras carried it so we didn’t have to.', author: 'The Hegde Family', place: 'Coorg' },
  { quote: 'The kind of hospitality you remember for years — warm, precise and never overbearing. Worth every rupee.', author: 'Priya & Karthik', place: 'Goa' },
];

export const faqs = [
  { q: 'What kinds of events does Sehras plan?', a: 'We plan weddings and all their functions, as well as birthdays, corporate events, baby showers, house warmings, naming ceremonies and other family celebrations.' },
  { q: 'Where is Sehras based, and do you travel?', a: 'Our studio is in Bengaluru, Karnataka. We plan events across India and at destinations abroad, and our own team travels to run each one.' },
  { q: 'Who will plan our event?', a: 'Every event is led personally by our founder, Shreyas, who remains your single point of contact from the first conversation to the final goodbye.' },
  { q: 'How far in advance should we book?', a: 'For weddings we recommend six to twelve months. Smaller celebrations can usually be arranged in a few weeks. Please call us to check availability for your date.' },
  { q: 'Can we book only décor, catering or on-day coordination?', a: 'Yes. Each service can be booked on its own or combined into full-service planning.' },
  { q: 'How do we get started?', a: `Please send an enquiry through the form or message us on WhatsApp at ${site.phoneDisplay}. Shreyas will get back to you personally within 24 hours.` },
];
