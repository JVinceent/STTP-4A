/**
 * All site copy, word for word from CooPERA_Website_Prompt.md.
 * Placeholders are wrapped in [ ] so they are easy to find and replace.
 */

export const TEAM_EMAIL = "[TEAM EMAIL]";
export const FACEBOOK_URL = "[Facebook]";
export const LINKEDIN_URL = "[LinkedIn]";

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "plans", label: "Plans" },
  { id: "partnerships", label: "Partnerships" },
] as const;

/** Sections without their own nav link highlight the nearest related link. */
export const SECTION_TO_NAV: Record<string, string | null> = {
  home: "home",
  about: "about",
  services: "services",
  "how-it-works": "services",
  plans: "plans",
  validation: null,
  partnerships: "partnerships",
  team: null,
  contact: "contact",
};

export const HERO = {
  eyebrow: "Kape & Paste · Region IV-A · DOST-SEI STTP+ 2026",
  heading: "Fair prices for the farmers who grow our food.",
  body: "CooPERA helps cooperatives sell with their farmers, not just lend to them. It lines up the buyer, the truck and the price before harvest, so farmers get a fair price, loans get repaid, and every peso is shown on a receipt.",
  figures: [
    {
      value: "₱240 → ₱5–10",
      label:
        "A kilo of tomatoes in Luzon markets (Jan 2026) versus what farmers in Ilocos were paid (Feb 2026).",
      source: "Source: GMA Regional TV.",
    },
    {
      value: "₱19.48",
      label: "What it cost to grow a kilo of tomatoes.",
      source: "Source: PSA, 2021.",
    },
    {
      value: "3 of 3",
      label: "Farmers we interviewed said they sold cheap because a loan or pickers had to be paid.",
      source: "Source: CooPERA farmer interviews, Nov 2026.",
    },
  ],
  chips: [
    { label: "Forecast", value: "5 farms, 12 tons in 2 weeks" },
    { label: "Truck", value: "1 truck, 5 pickups" },
    { label: "Buyer offer", value: "₱30/kg" },
    { label: "Receipt", value: "sent by text" },
  ],
};

export const ABOUT = {
  heading: "Built to answer one question: why does the farmer get the lowest price?",
  mission:
    "We help cooperatives sell with their farmers, not just lend to them. CooPERA lines up the buyer, the truck and the price before harvest, so farmers stop selling at whatever the biyahero offers and cooperatives stop losing loans to bad sales.",
  vision:
    "A Philippines where no farmer sells a harvest alone. Every cooperative knows what its members will harvest, sells it together at a fair price, and pays every farmer on time with a receipt for every peso.",
};

export type Milestone = {
  title: string;
  body: string;
  /** file under /public/photos, or null to show a labelled placeholder */
  photo: { src: string | null; expects: string; alt: string };
  placeholder?: boolean;
};

export const STORY: Milestone[] = [
  {
    title: "[Bootcamp 1: add one sentence]",
    body: "",
    placeholder: true,
    photo: { src: null, expects: "bootcamp-1.jpg", alt: "" },
  },
  {
    title: "Choosing the problem.",
    body: "We weighed hospital referrals, scholarship stipends, typhoon-isolated towns and Laguna Lake water quality. We chose farming, where the pain was clearest.",
    photo: { src: null, expects: "choosing-the-problem.jpg", alt: "" },
  },
  {
    title: "Bootcamp 2 · Systems thinking.",
    body: "We learned to look below the events, at the patterns and structures that keep repeating.",
    photo: { src: null, expects: "bootcamp-2.jpg", alt: "" },
  },
  {
    title: "Listening to cooperatives.",
    body: "San Pedro Multi-Purpose Cooperative in Batangas City keeps one notebook per member, and its manager told us: “Kapag hindi masingil, babagsak ang kooperatiba” (if loans go unpaid, the cooperative falls). SIDC, with more than 80,000 members, runs digital systems but needs help turning data into decisions.",
    photo: {
      src: "/photos/san-pedro-mpc-visit.jpg",
      expects: "san-pedro-mpc-visit.jpg",
      alt: "Our team with staff of San Pedro Multi-Purpose Cooperative in their office in Batangas City",
    },
  },
  {
    title: "Bootcamp 3 · Human-centered design and felt value.",
    body: "We built empathy maps and a point-of-view statement, and learned that a solution has to be worth more to people than the effort of changing.",
    photo: { src: null, expects: "bootcamp-3.jpg", alt: "" },
  },
  {
    title: "Bootcamp 4 · Science communication.",
    body: "We learned not to dictate the problem to the people who live it.",
    photo: { src: null, expects: "bootcamp-4.jpg", alt: "" },
  },
  {
    title: "A DOST consultation.",
    body: "An expert told us farmers sell palay at around ₱13 a kilo, that most farmers are older and use text messages, and that the cooperative is where members’ farms are registered. This moved our focus to the moment of harvest.",
    photo: { src: null, expects: "dost-consultation.jpg", alt: "" },
  },
  {
    title: "Bootcamp 5 · Startups and IP.",
    body: "We mapped how an idea becomes impact, and chose a path we can pilot with a cooperative.",
    photo: { src: null, expects: "bootcamp-5.jpg", alt: "" },
  },
  {
    title: "One concept.",
    body: "On October 31, all six of us combined our ideas into CooPERA: forecast, pool, sell and settle, through the cooperative.",
    photo: { src: null, expects: "one-concept.jpg", alt: "" },
  },
  {
    title: "Listening to farmers.",
    body: "In November we interviewed three farmers in Batangas and Quezon. All three told us the coop lends to them, but at selling time each farmer is on their own.",
    photo: { src: null, expects: "farmer-interview-1.jpg", alt: "" },
  },
  {
    title: "[Bootcamp 6: add one sentence]",
    body: "",
    placeholder: true,
    photo: { src: null, expects: "bootcamp-6.jpg", alt: "" },
  },
  {
    title: "Demo Day · November 28, 2026.",
    body: "General Santos City.",
    photo: { src: null, expects: "demo-day.jpg", alt: "" },
  },
];

export const SERVICES = {
  heading: "One hub of services for the cooperative.",
  body: "Each service fills one gap between harvest and buyer. A cooperative can use one, a few, or all of them. An AI agent prepares each step, and the manager approves anything that involves money or produce.",
  cards: [
    {
      key: "forecast",
      title: "Forecast",
      question: "What might happen?",
      body: "Alerts the manager two weeks ahead which farms will harvest and how much.",
    },
    {
      key: "truck",
      title: "Pool trucks",
      question: "How will it get there?",
      body: "Groups nearby farms into one truck and routes the trucker to every pickup.",
    },
    {
      key: "buyer",
      title: "Find buyers",
      question: "Who will buy it?",
      body: "Offers the harvest to buyers and agrees on the price and grade before pickup.",
    },
    {
      key: "settle",
      title: "Settle",
      question: "Who gets paid what?",
      body: "Pays part in cash at pickup, deducts the loan and freight, and texts the farmer a receipt.",
    },
  ],
  footnote:
    "All services run on the cooperative’s own member, farm and loan records. Farmers need no app; they get text messages.",
} as const;

export const HOW = {
  heading: "See it work.",
  manager: {
    title: "The manager sees",
    stats: [
      { value: "5 farms", label: "12 tons" },
      { value: "Tomato harvest", label: "two weeks ahead" },
      { value: "1 truck", label: "5 pickups" },
    ],
    offer: "Buyer offer: ₱30 per kg",
    action: "Approve booking",
  },
  farmer: {
    title: "The farmer receives",
    name: "Mang Edgar",
    lines: [
      { label: "3,000 kg × ₱30", value: "₱90,000" },
      { label: "Loan", value: "−₱20,000" },
      { label: "Freight share", value: "−₱3,500" },
    ],
    total: "₱66,500",
    caption:
      "Illustrative. At a ₱12/kg middleman price, he would keep ₱16,000. Our pilot will test these numbers.",
  },
};

export const PLANS = {
  heading: "Pay only for what your cooperative needs.",
  body: "Choose services one by one, or take the full package. Farmers never pay.",
  price: "[₱___ / month]",
  priceNote: "Pricing set after the pilot.",
  cards: [
    {
      name: "Single service",
      body: "Any one of Forecast, Pool trucks, Find buyers or Settle. Includes member, farm and loan records.",
      highlight: false,
    },
    {
      name: "Build your own",
      body: "Pick any two or three services.",
      highlight: false,
    },
    {
      name: "Full package",
      body: "All four services working together, with the AI agent connecting each step.",
      highlight: true,
    },
  ],
  tripFee: {
    title: "Per-trip coordination fee",
    body: "8–12% of the pooled freight, about ₱1,120–₱1,680 on a ₱14,000 truck.",
  },
  pilot: {
    title: "Pilot",
    body: "Free for one partner cooperative, one crop, one season.",
    cta: "Request a pilot",
  },
  line: "We own no trucks and buy no produce. The cooperative stays the seller, and money moves through licensed banks and e-wallets.",
};

export const VALIDATION = {
  heading: "Tested with the people who live the problem.",
  cards: [
    {
      title: "San Pedro Multi-Purpose Cooperative, Batangas City",
      body: "A small cooperative; records kept by hand; unpaid loans are the biggest worry.",
      photo: {
        src: "/photos/san-pedro-mpc-interview.jpg",
        expects: "san-pedro-mpc-interview.jpg",
        alt: "Cooperative staff talking with our team across a table of record books at San Pedro Multi-Purpose Cooperative",
      },
    },
    {
      title: "SIDC (Sorosoro Ibaba Development Cooperative)",
      body: "A large cooperative with more than 80,000 members; digital systems that still need data turned into decisions.",
      photo: {
        src: "/photos/sidc-visit.jpg",
        expects: "sidc-visit.jpg",
        alt: "Two members of our team with SIDC officials in the office of the SIDC board chairperson",
      },
    },
    {
      title: "DOST consultation",
      body: "Farmers sell palay at around ₱13 a kilo; text messages reach older farmers best; the cooperative is the right channel.",
      photo: { src: null, expects: "dost-consultation.jpg", alt: "" },
    },
    {
      title: "Three farmers in Batangas and Quezon",
      body: "Growers of tomato, rice and coconut, and eggplant. All three named the same reasons for selling cheap: everyone harvests at once, no truck, one buyer with cash, and a loan and pickers to pay.",
      photo: { src: null, expects: "farmer-interview-1.jpg", alt: "" },
    },
  ],
  quotes: [
    {
      fil: "Halos hindi ko na nahawakan, pinambayad na agad.",
      en: "The money went straight to the loan.",
      who: "Aling Tina, tomato farmer, Lipa, Batangas",
    },
    {
      fil: "Kung may nag-aayos sana kung sino ang may ani at kailan, baka mas madali kaming makapagsabay.",
      en: "If only someone organized who is harvesting and when, we could share a truck.",
      who: "Mang Ruel, eggplant farmer, Dolores, Quezon",
    },
  ],
};

export const PARTNERS = {
  heading: "The partners we’re working toward.",
  body: "These are the institutions whose programs CooPERA fits. Partnerships are not yet confirmed.",
  list: [
    { name: "DOST-SEI STTP+", why: "The program that shaped CooPERA." },
    { name: "DOST CALABARZON / PSTO Batangas", why: "Links to cooperatives in the region." },
    { name: "DA Region IV-A (AMAD) · KADIWA", why: "Buyer links and market programs for cooperatives." },
    {
      name: "Cooperative Development Authority (CDA) Region IV-A",
      why: "The agency that registers and supports cooperatives.",
    },
    { name: "SIDC", why: "A large Batangas cooperative and a possible pilot partner." },
    {
      name: "San Pedro Multi-Purpose Cooperative",
      why: "A small cooperative that helped us understand manual records.",
    },
    {
      name: "Batangas State University · CTI Center for Technopreneurship and Innovation",
      why: "Incubation and mentoring.",
    },
    { name: "Agricultural Training Institute (ATI) IV-A", why: "Digital training for farmers." },
    { name: "PAGASA", why: "Weather data for better forecasts." },
    { name: "LandBank · ACPC", why: "Farm credit that cooperative sales records could support." },
  ],
};

export const TEAM = {
  heading: "The team.",
  photo: {
    src: "/photos/team.jpg",
    alt: "The six members of Kape & Paste sitting together in front of the STTP letters at a DOST-SEI event",
  },
  members: [
    { name: "Emmanuel M. Caritas", file: "team-emmanuel-caritas.jpg" },
    { name: "John Vincent Doria", file: "team-john-vincent-doria.jpg" },
    { name: "John Laurence Mendoza", file: "team-john-laurence-mendoza.jpg" },
    { name: "Adelaide J. B. Dimayacyac", file: "team-adelaide-dimayacyac.jpg" },
    { name: "Raiza E. Gatchalian", file: "team-raiza-gatchalian.jpg" },
    { name: "James Villaflor", file: "team-james-villaflor.jpg" },
  ],
};

export const CONTACT = {
  heading: "Bring CooPERA to your cooperative.",
  body: "We’re looking for one partner cooperative, buyers like KADIWA, and mentors for our first pilot.",
  cta: "Get in touch",
};

export const FOOTER = "© 2026 CooPERA · Kape & Paste · DOST-SEI STTP+ Region IV-A";
