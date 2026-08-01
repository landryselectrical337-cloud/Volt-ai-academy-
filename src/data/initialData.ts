import { NecArticle, SalesScenario, LessonDeck } from "../types";

export const INITIAL_NEC_ARTICLES: NecArticle[] = [
  {
    id: "nec-110",
    articleNumber: "110",
    title: "Requirements for Electrical Installations",
    category: "General",
    summary: "Fundamental safety rules including examination, installation, equipment working space clearances, and proper terminations.",
    commonRules: [
      "Article 110.12: Mechanical execution of work in a neat and workmanlike manner.",
      "Article 110.16: Arc-flash hazard warning markings on switchboards and panelboards.",
      "Article 110.26: Working space depth (minimum 3 ft clear working depth) and width (30 inches or width of equipment)."
    ],
    keySections: [
      { code: "110.12", title: "Workmanlike Manner", description: "Unused openings closed, cables neatly supported and secured." },
      { code: "110.14(C)", title: "Temperature Limitations", description: "Conductor ampacity selection based on terminal temperature ratings (60°C, 75°C, or 90°C)." },
      { code: "110.26(A)", title: "Working Clearances", description: "Clear working space depth: 3 ft for 0-600V nominal to ground." }
    ]
  },
  {
    id: "nec-210",
    articleNumber: "210",
    title: "Branch Circuits & GFCI/AFCI Requirements",
    category: "Wiring & Protection",
    summary: "Branch circuit ratings, mandatory GFCI & AFCI protection locations in dwelling and non-dwelling units.",
    commonRules: [
      "Article 210.8: GFCI protection required in bathrooms, kitchens, outdoors, basements, garages, and near sinks.",
      "Article 210.12: AFCI protection required for all 120V, 15A/20A branch circuits supplying dwelling family rooms, bedrooms, kitchens, hallways.",
      "Article 210.52: Dwelling unit receptacle outlet spacing (no point along floor line >6 ft from a receptacle)."
    ],
    keySections: [
      { code: "210.8(A)", title: "Dwelling Unit GFCI", description: "Mandatory GFCI protection for receptacles in bathrooms, outdoors, crawl spaces, basements, kitchens, sinks." },
      { code: "210.11(C)", title: "Required Branch Circuits", description: "At least two 20A small appliance circuits, one 20A laundry circuit, one 20A bathroom circuit." },
      { code: "210.19(A)", title: "Voltage Drop Recommendation", description: "Limit total voltage drop to 3% on branch circuit and 5% total for feeder + branch circuit." }
    ]
  },
  {
    id: "nec-220",
    articleNumber: "220",
    title: "Branch-Circuit, Feeder, and Service Load Calculations",
    category: "Calculations",
    summary: "Standard and optional calculation methods for sizing dwelling and commercial service equipment and feeders.",
    commonRules: [
      "Article 220.12: General lighting load calculations (3 VA/sq ft for dwelling units).",
      "Article 220.52: Small appliance circuit loads at 1,500 VA each.",
      "Article 220.82: Optional calculation method for dwelling units."
    ],
    keySections: [
      { code: "220.14", title: "Other Loads", description: "180 VA per general receptacle outlet on 15A or 20A circuits." },
      { code: "220.82", title: "Optional Dwelling Calculation", description: "First 10 kW @ 100% + remaining load @ 40% + AC/Heating at 100%." }
    ]
  },
  {
    id: "nec-250",
    articleNumber: "250",
    title: "Grounding and Bonding",
    category: "Wiring & Protection",
    summary: "The backbone of electrical safety: system grounding, grounding electrode conductors (GEC), equipment grounding conductors (EGC), and bonding.",
    commonRules: [
      "Article 250.50: All grounding electrodes present at building must be bonded together.",
      "Article 250.64: GEC installation rules (continuous without splice unless using irreversible compression).",
      "Article 250.122: Sizing Equipment Grounding Conductors based on overcurrent device rating."
    ],
    keySections: [
      { code: "250.52(A)", title: "Grounding Electrodes", description: "Metal underground water pipe, concrete-encased electrode (Ufer), ground rods (25 ohms or supplemental rod)." },
      { code: "250.102", title: "Bonding Conductors", description: "Bonding equipment to ensure electrical continuity and safety fault current path." }
    ]
  },
  {
    id: "nec-310",
    articleNumber: "310",
    title: "Conductors for General Wiring & Ampacity Tables",
    category: "Wiring Methods",
    summary: "Conductor sizing, insulation types (THHN, THWN, XHHW, USE), ampacity adjustment factors for temperature and bundle count.",
    commonRules: [
      "Table 310.16: Allowable ampacities of insulated conductors in raceway or cable.",
      "Article 310.15(C)(1): Conductor bundling adjustment factor (>3 current-carrying conductors in raceway).",
      "Article 310.15(B)(1): Ambient temperature correction factors."
    ],
    keySections: [
      { code: "310.16", title: "Ampacity Table", description: "Copper and aluminum conductor current capacities at 60°C, 75°C, and 90°C." },
      { code: "310.14", title: "Conductor Temperature Rating", description: "Equipment terminal rating limits allowable ampacity column (most terminals 75°C max)." }
    ]
  },
  {
    id: "nec-430",
    articleNumber: "430",
    title: "Motors, Motor Circuits, and Controllers",
    category: "Equipment",
    summary: "Motor branch-circuit short-circuit and ground-fault protection, overload protection, and disconnect sizing.",
    commonRules: [
      "Article 430.22: Motor branch circuit conductors sized at 125% of motor full-load current (FLC).",
      "Article 430.52: Rating of short-circuit and ground-fault protective devices (Inverse time breaker up to 250% FLC).",
      "Article 430.102: Disconnecting means located in sight from motor location."
    ],
    keySections: [
      { code: "430.248", title: "Single-Phase Motor FLC Table", description: "Standard Full-Load Current values for AC motors." },
      { code: "430.250", title: "Three-Phase Motor FLC Table", description: "Full-Load Current values for 3-phase motors." }
    ]
  },
  {
    id: "nec-680",
    articleNumber: "680",
    title: "Swimming Pools, Fountains, and Similar Installations",
    category: "Special Occupancies",
    summary: "Special bonding, GFCI protection, clearance rules, and waterproof wiring methods for aquatic environments.",
    commonRules: [
      "Article 680.26: Equipotential bonding ring around swimming pools (solid #8 AWG bare copper).",
      "Article 680.22: Receptacle location (minimum 6 ft from inside pool wall with GFCI)."
    ],
    keySections: [
      { code: "680.26", title: "Equipotential Bonding", description: "Bonds pool steel, metallic equipment, and perimeter surface within 3 ft." }
    ]
  }
];

export const INITIAL_SALES_SCENARIOS: SalesScenario[] = [
  {
    id: "scen-200a-upgrade",
    title: "100A to 200A Main Service Upgrade",
    description: "Homeowner wants to add central AC and an EV Charger, but their existing 100A Fused Panel is full and non-compliant.",
    category: "Residential Upgrade",
    difficulty: "Beginner",
    estimatedJobValue: 3800,
    customerPersona: {
      name: "Arthur Pendelton",
      role: "Suburban Homeowner",
      personality: "Analytical, price-sensitive, skeptical about permits and utility inspection fees.",
      primaryObjection: "Why does it cost $3,800? My handyman said he could just add a double breaker for $300."
    },
    keyCodesToMention: ["NEC 230.79", "NEC 220.82", "NEC 250.50 (Grounding)"]
  },
  {
    id: "scen-ev-charger",
    title: "Level 2 EV Charger Installation & Load Management",
    description: "Client bought a Tesla Model Y and wants a 48A hardwired EV Wall Connector in a detached garage 60ft away.",
    category: "EV Charger",
    difficulty: "Intermediate",
    estimatedJobValue: 1850,
    customerPersona: {
      name: "Dr. Elena Vance",
      role: "Tech Professional",
      personality: "Tech-savvy, values safety & fast charging, asks detailed technical questions.",
      primaryObjection: "Can't I just plug it into a regular 120V outlet or use a dryer outlet splitter?"
    },
    keyCodesToMention: ["NEC 625.40 (EV Dedicated Branch Circuit)", "NEC 625.54 (GFCI for EV Receptacles)", "NEC 300.5 (Underground Conduit Depth)"]
  },
  {
    id: "scen-subpanel-install",
    title: "Workshop Subpanel & Dedicated Machine Circuits",
    description: "Homeowner is building a woodworking shop in their garage requiring a 60A 240V subpanel and dust collector circuit.",
    category: "Residential Upgrade",
    difficulty: "Intermediate",
    estimatedJobValue: 2400,
    customerPersona: {
      name: "Mark Kowalski",
      role: "Hobbyist Woodworker",
      personality: "Enthusiastic, hands-on, wants to understand ground vs neutral isolation in subpanels.",
      primaryObjection: "Why do you have to run a 4-wire feed (2 hots, neutral, ground) instead of 3-wire?"
    },
    keyCodesToMention: ["NEC 250.24(A)(5) (Isolated Neutral in Subpanel)", "NEC 250.32", "NEC 210.8"]
  },
  {
    id: "scen-generator-hookup",
    title: "Whole-Home Standby Generator Transfer Switch",
    description: "Rural homeowner experienced winter storm power outages and wants a 22kW Generac generator with automatic transfer switch (ATS).",
    category: "Emergency Generator",
    difficulty: "Advanced",
    estimatedJobValue: 9200,
    customerPersona: {
      name: "Sarah Jenkins",
      role: "Rural Property Owner",
      personality: "Safety-conscious, concerned about family comfort during grid blackout, worried about utility backfeeding.",
      primaryObjection: "Why do I need a whole automatic transfer switch? Can't I just use suicide cord into my dryer outlet?"
    },
    keyCodesToMention: ["NEC 702 (Optional Standby Systems)", "NEC 702.5 (Transfer Equipment)", "NEC 220.87"]
  }
];

export const INITIAL_LESSON_DECKS: LessonDeck[] = [
  {
    id: "deck-nec-fundamentals",
    title: "NEC Fundamentals: Grounding, Bonding & Arc-Flash Safety",
    category: "NEC Code",
    tierLevel: 1,
    durationMinutes: 20,
    summary: "Master the fundamental difference between System Grounding, Equipment Grounding, and Equipotential Bonding under NEC Article 250.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video embed
    slides: [
      {
        slideNumber: 1,
        title: "Grounding vs. Bonding: The Core Safety Pillar",
        bullets: [
          "Grounding connects the electrical system to earth for lightning & surges (NEC 250.50).",
          "Bonding joins metallic non-current carrying parts to build a low-impedance fault path back to the breaker.",
          "Grounding protects equipment; Bonding trips breakers instantly to save human lives!"
        ],
        keyTakeaway: "Never confuse Grounding (Earth connection) with Bonding (Fault-current trip path).",
        speakerNotes: "Emphasize to the apprentices that a ground rod alone will NOT trip a breaker! Only a solid bonded ground wire back to the neutral bus will trip a breaker in a ground fault."
      },
      {
        slideNumber: 2,
        title: "Subpanels: The Isolated Neutral Rule",
        bullets: [
          "In Main Service Panel: Neutral and Ground ARE bonded together (NEC 250.24).",
          "In ALL Subpanels: Neutral and Ground MUST BE ISOLATED from each other!",
          "If bonded in subpanel, neutral current flows over metal conduits and ground wires creating shock hazards."
        ],
        keyTakeaway: "Float the neutral bus in every subpanel. Remove the green bonding screw!",
        speakerNotes: "Show the class a real subpanel bus bar. Point to the floating neutral bar vs the bonded ground bar attached directly to the metal enclosure."
      },
      {
        slideNumber: 3,
        title: "NFPA 70E Arc Flash & PPE Protocol",
        bullets: [
          "Arc Flash boundary calculation before removing panel dead-front covers.",
          "PPE Category selection: Category 1 (4 cal/cm²) to Category 4 (40 cal/cm² suit).",
          "Lockout/Tagout (LOTO): Test for zero voltage with calibrated multimeter before touching!"
        ],
        keyTakeaway: "Treat every circuit as LIVE until locked out, tagged out, and verified with a 3-point meter check.",
        speakerNotes: "Always perform Live-Dead-Live test: Check known live source, check locked out circuit, re-check known live source."
      },
      {
        slideNumber: 4,
        title: "GFCI & AFCI Code Evolution",
        bullets: [
          "GFCI protects PEOPLE from electric shock (5mA threshold).",
          "AFCI protects PROPERTY from electrical fires caused by arcing (parallel & series arcs).",
          "NEC 2026 mandates GFCI/AFCI across nearly all residential 120V circuits and outdoor 240V equipment."
        ],
        keyTakeaway: "Understand the difference between a ground fault (leakage to earth) and arc fault (sparking wires).",
        speakerNotes: "Explain why combination AFCI/GFCI breakers save contractors call-backs by diagnosing exact fault types."
      }
    ],
    quiz: [
      {
        question: "Where in a residential electrical installation MUST the main bonding jumper (bonding neutral to ground) be installed?",
        options: [
          "A) In every subpanel throughout the house",
          "B) ONLY at the main service disconnecting means (or main panel)",
          "C) At the meter socket and subpanels, but not main panel",
          "D) Grounding neutral is never permitted"
        ],
        correctIndex: 1,
        explanation: "NEC 250.24(A)(5) specifies that neutral and ground bonding jumper is installed ONLY at the main service equipment. Subpanels must keep neutrals floating."
      },
      {
        question: "What is the primary function of Equipment Grounding Conductors (EGC)?",
        options: [
          "A) To carry normal load return current back to the utility transformer",
          "B) To conduct high voltage surges into the ground rods",
          "C) To create a low-impedance ground-fault path to trip the overcurrent device (breaker)",
          "D) To save electricity bill costs"
        ],
        correctIndex: 2,
        explanation: "Equipment Grounding Conductors bond non-current-carrying metal enclosures to ensure a fault immediately causes enough current flow to trip the circuit breaker."
      }
    ]
  },
  {
    id: "deck-business-pricing",
    title: "Contractor Business Mastery: Pricing, Profit & Disclaimers",
    category: "Business Mastery",
    tierLevel: 4,
    durationMinutes: 25,
    summary: "How to transition from a journeyworker to a profitable electrical contractor business owner. Calculating overhead, markup, labor rates, and legal contracts.",
    slides: [
      {
        slideNumber: 1,
        title: "The True Cost of an Electrical Hour",
        bullets: [
          "Paying yourself $45/hr is NOT your billable rate!",
          "Real hourly cost = Wage + Payroll taxes + Health Insurance + Van payment & fuel + Tool depreciation + General Liability + License fees.",
          "Most successful electrical contractors need an hourly billable rate of $125 - $220/hr to stay profitable!"
        ],
        keyTakeaway: "Know your break-even billable rate before quoting jobs.",
        speakerNotes: "Walk through the Math: $45 wage + $35 overhead = $80 cost. Add 25% profit margin = $106.67/hr minimum price."
      },
      {
        slideNumber: 2,
        title: "Flat-Rate Pricing vs. Time & Materials (T&M)",
        bullets: [
          "Time & Materials penalizes speed: fast expert electricians earn LESS money!",
          "Flat-rate upfront pricing sets clear customer expectations and rewards high efficiency.",
          "Customer agrees to total price ($1,200) upfront rather than arguing over hourly clock."
        ],
        keyTakeaway: "Transition your business to upfront flat-rate menu pricing for higher customer satisfaction and profits.",
        speakerNotes: "Give example: Replacing a main breaker in 45 minutes flat rate $650 vs T&M 1hr @ $120 = losing $530 in earned value!"
      },
      {
        slideNumber: 3,
        title: "Protective Legal Disclaimers & Privacy Compliance",
        bullets: [
          "Concealed Wall Wiring Disclaimer: Customer agrees contractor is not liable for existing code violations behind drywall.",
          "Utility Interruption & Permit Notice: Permits are mandatory; customer covers utility hookup fees.",
          "Customer Privacy & Data Law: Protect customer contact info, photos of property, and invoice records under CCPA/privacy rules."
        ],
        keyTakeaway: "Never start a job without a signed estimate containing standard contractor protective clauses.",
        speakerNotes: "Always include a change order clause: Any work required by inspector not in original scope requires signed written approval."
      }
    ],
    quiz: [
      {
        question: "If your total monthly business overhead is $6,000 and you have 100 billable labor hours per month, what is your overhead burden per billable hour?",
        options: [
          "A) $30/hr",
          "B) $60/hr",
          "C) $100/hr",
          "D) $600/hr"
        ],
        correctIndex: 1,
        explanation: "$6,000 overhead divided by 100 billable hours = $60/hr overhead burden that must be added on top of technician wages."
      }
    ]
  }
];
