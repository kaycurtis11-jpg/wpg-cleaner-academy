export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface LessonContent {
  slug: string
  title: string
  type: 'lesson' | 'quiz' | 'checklist' | 'video'
  content?: string
  bullets?: string[]
  sections?: { heading: string; bullets: string[] }[]
  warning?: string
  tip?: string
  questions?: QuizQuestion[]
  items?: { label: string; note?: string }[]
  videos?: { title: string; embedId: string; source?: 'youtube' | 'drive' }[]
  image?: { src: string; alt: string; caption?: string }
}

export interface ModuleData {
  slug: string
  title: string
  description: string
  icon: string
  color: string
  estimatedMinutes: number
  track: 'all' | 'residential' | 'commercial'
  lessons: LessonContent[]
}

export const MODULES: ModuleData[] = [
  {
    slug: 'welcome',
    title: 'Welcome & Company Culture',
    description: 'Learn about WPG Local Cleaners, our mission, values, and what it means to be part of our team.',
    icon: '🏠',
    color: 'blue',
    estimatedMinutes: 10,
    track: 'all',
    lessons: [
      {
        slug: 'welcome-message',
        title: 'Welcome to the Team',
        type: 'lesson',
        content: 'You are joining a professional residential cleaning operation that services households across Winnipeg. Residential cleaning requires consistency, reliability, and attention to detail. Clients expect the same standard every visit — this handbook outlines how to meet that standard. By accepting a cleaning assignment, you agree to follow the scope of work and expectations outlined here.',
        tip: 'Take time to read this entire module before your first clean. Preparation is the foundation of professionalism.',
      },
      {
        slug: 'vision-mission',
        title: 'Our Vision & Mission',
        type: 'lesson',
        content: 'Our vision is to transform the cleaning industry into a space where every cleaner is recognized, valued, and empowered. We aspire to set a new standard for professionalism and quality by fostering a supportive work environment that prioritizes fair compensation and seamless operations.',
        sections: [
          {
            heading: 'Our Mission',
            bullets: [
              'Elevate the Cleaning Industry — Transform the perception of cleaning into a respected profession',
              'Fair Compensation — Ensure our cleaners receive equitable pay for their hard work',
              'Supportive Workplace — Provide a positive environment where cleaners feel valued and empowered',
              'Streamlined Operations — Manage administrative tasks, allowing cleaners to focus on their craft',
              'Commitment to Quality — Deliver exceptional service that exceeds client expectations',
              'Community Well-Being — Foster cleaner, healthier environments for our clients',
            ],
          },
        ],
      },
      {
        slug: 'management-team',
        title: 'Our Management Team',
        type: 'lesson',
        sections: [
          {
            heading: 'Kayla Curtis — Founder & CEO',
            bullets: [
              'Kayla founded WPG Local Cleaners in 2024',
              'Oversees the business backend, focusing on systems, growth, and supporting both clients and cleaners',
              'Phone: 647-762-0130 (emergencies only)',
              'Email: kayla@wpglocalcleaners.ca',
            ],
          },
          {
            heading: 'Kris Ann — Communications Manager',
            bullets: [
              'Keeps WPG Local Cleaners running smoothly day-to-day',
              'Handles scheduling, client communications, and quality standards',
              'Phone: 204-805-4249',
              'Email: info@wpglocalcleaners.ca',
            ],
          },
          {
            heading: 'Desiree — Operations Manager',
            bullets: [
              'Assists with client bookings, supplies, and ensuring every detail is taken care of',
              'Phone: 204-500-1894',
              'Email: support@wpglocalcleaners.ca',
            ],
          },
        ],
        tip: 'Save these numbers in your phone before your first clean.',
      },
      {
        slug: 'what-success-looks-like',
        title: 'What Success Looks Like',
        type: 'lesson',
        content: 'Success at WPG Local Cleaners means showing up prepared, completing every task to standard, treating clients with respect, and communicating proactively. Our clients trust us in their homes — that trust is earned by every cleaner on every visit.',
        bullets: [
          'Every task on the checklist is completed before leaving',
          'You arrive on time and finish within the scheduled window',
          'You communicate proactively if anything unexpected comes up',
          'You treat every home as if it were your own',
          'You represent WPG Local Cleaners professionally at all times',
          'You ask questions when unsure — never guess on a client\'s property',
        ],
      },
      {
        slug: 'welcome-quiz',
        title: 'Knowledge Check',
        type: 'quiz',
        questions: [
          {
            id: 'w1',
            question: 'What is the management operations hours for regular support?',
            options: ['8am–8pm every day', '9am–5pm every day', '9am–5pm Monday–Friday only', '24/7'],
            correct: 1,
            explanation: 'Management operates 9am–5pm every day. For evenings and emergencies only, contact Kayla at 647-762-0130.',
          },
          {
            id: 'w2',
            question: 'Who should you contact in an emergency outside of regular hours?',
            options: ['Desiree at 204-500-1894', 'Kris Ann at 204-805-4249', 'Kayla at 647-762-0130', 'No one — wait until morning'],
            correct: 2,
            explanation: 'For emergencies only, contact Kayla (Owner) at 647-762-0130 if management is not otherwise available.',
          },
          {
            id: 'w3',
            question: 'What does WPG Local Cleaners\' mission focus on?',
            options: ['Maximizing profit above all else', 'Fair compensation, quality, and elevating the profession', 'Completing as many cleans as possible per day', 'Keeping costs as low as possible'],
            correct: 1,
            explanation: 'Our mission centres on fair compensation, a supportive workplace, quality service, and transforming cleaning into a respected profession.',
          },
        ],
      },
    ],
  },

  {
    slug: 'employment-path',
    title: 'Employee vs. Contractor Path',
    description: 'Understand the difference between employee and independent contractor roles and choose the path that fits your goals.',
    icon: '🔀',
    color: 'purple',
    estimatedMinutes: 15,
    track: 'all',
    lessons: [
      {
        slug: 'path-overview',
        title: 'Two Paths — One Team',
        type: 'lesson',
        content: 'WPG Local Cleaners works with both employees and independent contractors. Neither option is better — the best choice depends on your personal goals, desired flexibility, and long-term plans. This module explains both clearly so you can make an informed decision.',
        warning: 'This information is general in nature and does not constitute tax or legal advice. We strongly recommend consulting a qualified accountant or tax professional regarding your specific situation.',
      },
      {
        slug: 'employee-path',
        title: 'Employee Path',
        type: 'lesson',
        sections: [
          {
            heading: 'What It Means to Be an Employee',
            bullets: [
              'You are paid on a regular payroll schedule',
              'CPP (Canada Pension Plan) and EI (Employment Insurance) are deducted from your pay',
              'Vacation pay is included as required by Manitoba law',
              'The company provides all required cleaning supplies and equipment',
              'Your schedule is set by management',
              'You are covered under the company\'s liability insurance',
            ],
          },
          {
            heading: 'Long-Term Opportunities',
            bullets: [
              'Potential for advancement to Team Lead or Trainer roles',
              'More structured performance reviews',
              'Priority for new client assignments',
              'Eligibility for recognition programs and bonuses',
            ],
          },
        ],
      },
      {
        slug: 'contractor-path',
        title: 'Independent Contractor Path',
        type: 'lesson',
        sections: [
          {
            heading: 'What It Means to Be an Independent Contractor',
            bullets: [
              'You are paid a higher gross rate per job — this reflects the additional responsibilities you carry as a business owner',
              'You operate as your own business and set your own availability',
              'You are responsible for remitting your own taxes to the CRA',
              'You must pay both employee and employer portions of CPP contributions',
              'You are NOT eligible for EI unless you have purchased self-employed EI coverage',
              'You are required to carry your own Commercial General Liability (CGL) insurance — proof required before first job',
              'You may use your own equipment or request company supplies depending on your contract',
            ],
          },
          {
            heading: 'A Key Advantage: Business Expense Deductions',
            bullets: [
              'As a contractor, you can deduct eligible business expenses from your income before tax — employees cannot do this',
              'This means your effective tax rate on what you earn is often lower than an employee making the same gross amount',
              'The more legitimate expenses you track and claim, the less taxable income you have',
            ],
          },
          {
            heading: 'Eligible Business Expenses to Track',
            bullets: [
              'Gas & mileage — every kilometer driven to and from a client location is deductible. Keep a log or use a mileage app',
              'Gas explained: you can deduct the portion of your gas costs used for work travel — this adds up significantly over a year of cleaning',
              'Cleaning supplies you purchase for work',
              'Portion of your phone bill used for work communication',
              'Insurance premiums — your CGL policy (~$50/month via Zensurance) is fully deductible',
              'Professional development and training costs',
            ],
          },
          {
            heading: 'Financial Responsibilities',
            bullets: [
              'Track all business income — you will receive a T4A at year end',
              'Set aside approximately 25–30% of income for taxes',
              'Track mileage from day one using an app like MileIQ, Everlance, or TripLog — they run in the background automatically',
              'File as self-employed with the CRA each year',
            ],
          },
        ],
        warning: 'Consult a tax professional. Contractor tax obligations can be complex and penalties for non-compliance can be significant.',
        tip: 'Mileage is one of the biggest deductions most cleaners overlook. If you drive 15,000 km for work in a year at the CRA rate of $0.72/km, that\'s $10,800 off your taxable income.',
      },
      {
        slug: 'path-comparison',
        title: 'Side-by-Side Comparison',
        type: 'lesson',
        sections: [
          {
            heading: 'Employee',
            bullets: [
              '✅ Regular, predictable pay schedule',
              '✅ CPP & EI deducted automatically',
              '✅ Vacation pay included',
              '✅ All supplies provided',
              '✅ Company liability coverage',
              '⚠️ Schedule set by management',
              '⚠️ Less flexibility',
            ],
          },
          {
            heading: 'Independent Contractor',
            bullets: [
              '✅ Higher gross pay per job — reflects the responsibilities you carry',
              '✅ Set your own availability',
              '✅ Choose which jobs to accept',
              '✅ Deduct business expenses — gas, supplies, insurance, phone',
              '✅ Lower effective tax rate through expense deductions',
              '✅ Work as your own boss',
              '⚠️ Responsible for own taxes and CPP (both portions)',
              '⚠️ Must carry own CGL insurance (~$50/month via Zensurance)',
              '⚠️ No EI protection (unless self-purchased)',
            ],
          },
        ],
        tip: 'Neither option is better. The best choice depends on your personal goals, desired flexibility, and long-term plans.',
      },
      {
        slug: 'contractor-insurance',
        title: 'Contractor Insurance Requirements',
        type: 'lesson',
        content: 'As an independent contractor with WPG Local Cleaners, you are required to obtain your own Commercial General Liability (CGL) insurance before beginning work. This is a condition of working with us — not a suggestion.',
        sections: [
          {
            heading: 'Required: Commercial General Liability (CGL) Insurance',
            bullets: [
              'CGL insurance is mandatory for all independent contractors at WPG Local Cleaners',
              'Minimum coverage: $2 million — this is the standard for independent service contractors in Manitoba',
              'You must provide a Certificate of Insurance to management before your first job',
              'CGL protects you if you accidentally damage a client\'s property — without it, you are personally liable',
            ],
          },
          {
            heading: 'WCB Coverage',
            bullets: [
              'WPG pays into WCB for all employees and for contractors who do not carry their own WCB or personal accident coverage',
              'If you are injured on the job and do not have your own WCB coverage, you are protected through WPG\'s WCB account',
              'If you already carry your own WCB or personal accident insurance, inform management',
            ],
          },
          {
            heading: 'How to Get CGL Coverage',
            bullets: [
              'WPG Local Cleaners recommends Zensurance — an online Canadian broker built for small businesses and independent contractors',
              'Zensurance is fast, fully online, and typically costs approximately $50/month for cleaning contractors',
              'Visit zensurance.com and select "Cleaning Services" — you can get a quote and certificate in minutes',
              'Other options: Intact, Aviva, Economical, or any independent broker',
              'Ask for a Certificate of Insurance — this is the document management requires before your first job',
            ],
          },
          {
            heading: 'Employees',
            bullets: [
              'Employees are covered under WPG Local Cleaners\' WCB account and commercial liability insurance',
              'Employees do not need to carry their own insurance',
              'Any work-related injury must still be reported to management immediately',
            ],
          },
        ],
        warning: 'You cannot begin working as an independent contractor until management has received your Certificate of Insurance. Get this sorted before your first job.',
        tip: 'This information is general guidance. Consult an insurance broker for advice specific to your situation.',
      },
      {
        slug: 'path-quiz',
        title: 'Knowledge Check',
        type: 'quiz',
        questions: [
          {
            id: 'ep1',
            question: 'As an independent contractor, who is responsible for remitting your taxes to the CRA?',
            options: ['WPG Local Cleaners remits on your behalf', 'You are responsible for your own taxes', 'Your taxes are automatically deducted', 'You do not need to pay taxes as a contractor'],
            correct: 1,
            explanation: 'Independent contractors are solely responsible for remitting their own taxes to the CRA. WPG Local Cleaners will issue a T4A but will not deduct or remit taxes on your behalf.',
          },
          {
            id: 'ep2',
            question: 'Which of the following is a benefit available to employees but NOT independent contractors?',
            options: ['Flexibility to set your own schedule', 'Ability to deduct business expenses', 'EI (Employment Insurance) coverage', 'Choosing which jobs to accept'],
            correct: 2,
            explanation: 'Employees have EI deducted and are eligible for EI benefits. Independent contractors are not eligible unless they have specifically purchased self-employed EI coverage.',
          },
        ],
      },
    ],
  },

  {
    slug: 'policies',
    title: 'Company Policies',
    description: 'Attendance, professionalism, privacy, communication, and safety standards you are expected to follow on every job.',
    icon: '📋',
    color: 'green',
    estimatedMinutes: 15,
    track: 'all',
    lessons: [
      {
        slug: 'attendance-policy',
        title: 'Attendance & Reliability',
        type: 'lesson',
        content: 'It is YOUR responsibility to ensure that a cleaning is completed if you accept the job. We have a community of vetted cleaners that may help you fulfill the contract, although it is your responsibility alone to arrange for a substitute.',
        warning: 'Incomplete or missed cleans without reasonable substitution may result in reassignment to another cleaner.',
        bullets: [
          'Accept only jobs you are fully committed to completing',
          'If you cannot make it, arrange a vetted substitute before the appointment',
          'Notify management as early as possible if there are any issues',
          'Arrive within the time frame provided',
          'Complete the clean within the scheduled window',
          'If you need more than 30 minutes extra, text the manager on duty for client approval',
          'If a "max time" is set for a job, stick to it strictly',
        ],
      },
      {
        slug: 'professionalism',
        title: 'Professionalism Standards',
        type: 'lesson',
        sections: [
          {
            heading: 'On Every Job You Must',
            bullets: [
              'Arrive in clean, appropriate clothing',
              'Be respectful and courteous to clients at all times',
              'Keep all client information strictly confidential',
              'Never invite others into a client\'s home',
              'Never use client\'s personal belongings or food',
              'Never discuss client information with other cleaners',
            ],
          },
          {
            heading: 'Client Privacy & Property',
            bullets: [
              'Treat every client\'s home as if it were your own',
              'Do not look through drawers, cabinets, or personal items unnecessarily',
              'If you accidentally damage something, report it immediately — do not hide it',
              'Follow all access instructions exactly (door codes, key lockboxes, etc.)',
              'Lock up exactly as instructed when leaving',
            ],
          },
          {
            heading: 'Communication Expectations',
            bullets: [
              'Respond promptly to management messages during business hours',
              'Use the Slack group to connect with other cleaners',
              'Always assume the client may be home unless stated otherwise in the job notes',
              'If a client is present, introduce yourself professionally',
            ],
          },
        ],
      },
      {
        slug: 'jobber-policy',
        title: 'Using Jobber',
        type: 'lesson',
        content: 'Jobber is the app WPG Local Cleaners uses to manage all scheduling and job tracking. You are required to use it on every job.',
        bullets: [
          'Check your assigned schedule in Jobber before each workday',
          'Review all job notes and scope of work before arriving at a property',
          'Access entry codes, key locations, and special instructions from Jobber',
          'Mark jobs as complete in Jobber immediately after finishing',
          'If you are unsure how to use Jobber, contact management before your first clean',
        ],
        tip: 'All pertinent information for your booking — including entry codes, key locations, and client notes — will be listed in the job instructions inside Jobber.',
      },
      {
        slug: 'policies-quiz',
        title: 'Knowledge Check',
        type: 'quiz',
        questions: [
          {
            id: 'p1',
            question: 'You accepted a cleaning job but something came up and you can\'t make it. What should you do?',
            options: [
              'Call the client directly to cancel',
              'Simply not show up and let management know afterwards',
              'Arrange a vetted substitute yourself and notify management as early as possible',
              'Ask management to find a replacement for you',
            ],
            correct: 2,
            explanation: 'It is your responsibility to arrange a substitute from the vetted cleaner community. Management should be notified as early as possible, but finding the substitute is your responsibility.',
          },
          {
            id: 'p2',
            question: 'You accidentally knock over and break a client\'s decorative item. What do you do?',
            options: [
              'Leave it and hope the client doesn\'t notice',
              'Try to fix or replace it yourself without telling anyone',
              'Report it to management immediately and honestly',
              'Move it somewhere it won\'t be noticed',
            ],
            correct: 2,
            explanation: 'Always report accidents immediately and honestly. Clients trust us in their homes — transparency is essential to maintaining that trust.',
          },
          {
            id: 'p3',
            question: 'Where will you find the entry code and special instructions for a client\'s home?',
            options: ['The client will text you directly', 'In the Jobber job instructions', 'In the company Slack channel', 'You need to call management before each job'],
            correct: 1,
            explanation: 'All pertinent information including entry codes, key locations, and special instructions are listed in the Jobber job instructions.',
          },
        ],
      },
    ],
  },

  {
    slug: 'whmis',
    title: 'WHMIS & Safety',
    description: 'Workplace Hazardous Materials Information System — essential safety training for working with cleaning chemicals.',
    icon: '⚠️',
    color: 'red',
    estimatedMinutes: 20,
    track: 'all',
    lessons: [
      {
        slug: 'what-is-whmis',
        title: 'What is WHMIS?',
        type: 'lesson',
        content: 'WHMIS (Workplace Hazardous Materials Information System) is Canada\'s system for ensuring workers know how to safely use hazardous products at work. As a cleaner, you may work with products that can cause injury if used incorrectly.',
        sections: [
          {
            heading: 'Hazardous Products You May Use',
            bullets: [
              'Disinfectants (e.g. Lysol All Purpose Cleaner)',
              'Toilet bowl cleaners (e.g. Lysol Toilet Bowl Cleaner — corrosive)',
              'Glass cleaners (e.g. Zep Window Cleaner)',
              'Floor cleaners (e.g. OdoBan Floor Cleaner)',
              'Degreasers and abrasive cleaners (e.g. Bar Keepers Friend)',
              'Oven cleaners (e.g. EasyOff — highly corrosive)',
            ],
          },
        ],
        tip: 'Most safety information is shown directly on the product label. Always read it before using any product.',
      },
      {
        slug: 'hazard-symbols',
        title: 'WHMIS Hazard Symbols',
        type: 'lesson',
        content: 'You must be able to recognize these 9 WHMIS hazard symbols. They appear on product labels and Safety Data Sheets.',
        image: {
          src: 'https://gtgehlzvrllvhmbwhpgw.supabase.co/storage/v1/object/public/sds-sheets/whmis-symbols.png',
          alt: 'WHMIS GHS Hazard Symbols Chart',
          caption: 'The 9 standardized WHMIS 2015 / GHS hazard symbols',
        },
        sections: [
          {
            heading: 'The 9 Hazard Symbols',
            bullets: [
              '🔥 FLAMMABLE — Can catch fire easily. Keep away from heat and open flames. (e.g. EasyOff Oven Cleaner)',
              '🧪 CORROSIVE — Causes skin and eye burns on contact. Gloves + eye protection required. (e.g. Lysol Toilet Bowl Cleaner)',
              '💥 EXPLOSIVE — Risk of explosion. Handle with care, keep away from heat.',
              '🔵 COMPRESSED GAS — Pressurized container. Keep away from heat. (e.g. Zep Window Cleaner aerosol)',
              '🔶 OXIDIZING — Can cause or intensify fire. Store away from flammables.',
              '☠️ TOXIC — Can cause serious health effects or death. Follow all PPE requirements.',
              '⚕️ HEALTH HAZARD — May cause long-term health effects with repeated exposure.',
              '❗ HARMFUL/IRRITANT — Can cause skin, eye, or respiratory irritation.',
              '🌿 DANGER FOR THE ENVIRONMENT — Harmful to aquatic life. Dispose of properly.',
            ],
          },
        ],
        warning: 'Never use a product if you cannot identify its hazard symbols. If a label is missing or damaged, do not use the product.',
      },
      {
        slug: 'labels-and-sds',
        title: 'Labels & Safety Data Sheets',
        type: 'lesson',
        sections: [
          {
            heading: 'Checking Labels',
            bullets: [
              'Always make sure the original label is intact before using a product',
              'Never use an unlabelled container',
              'Secondary bottles (spray bottles) must be labelled with: product name, hazard information or symbols, and "See SDS" or QR code',
              'If a label is missing or damaged — do not use the product',
            ],
          },
          {
            heading: 'Safety Data Sheets (SDS)',
            bullets: [
              'Every hazardous product has a Safety Data Sheet (SDS)',
              'SDS sheets explain: health risks, required PPE, first aid instructions, spill and emergency procedures',
              'SDS sheets are available in the janitorial closet binder and via QR code on-site',
              'Know how to access SDS sheets BEFORE using any product',
            ],
          },
        ],
        tip: 'SDS sheets are also available in the Product Knowledge Center of this app.',
      },
      {
        slug: 'safe-use-ppe',
        title: 'Safe Use & PPE',
        type: 'lesson',
        sections: [
          {
            heading: 'Always Follow These Rules',
            bullets: [
              'Follow label instructions for every product',
              'Wear required PPE — at minimum, gloves for all cleaning tasks',
              'Wear eye protection when using corrosive, foaming, or aerosol products',
              'NEVER mix chemicals — especially bleach with acids (e.g. toilet bowl cleaner) or ammonia',
              'Use products only for their intended purpose and surface type',
              'Use products only in well-ventilated areas when specified on the label',
              'Dilute products to the correct ratio — over-concentration is wasteful and unsafe',
            ],
          },
          {
            heading: 'If a Spill, Splash, or Exposure Occurs',
            bullets: [
              '1. Stop work immediately if the situation is unsafe',
              '2. Follow the first-aid instructions on the label or SDS',
              '3. For eye exposure: flush with water for 15+ minutes',
              '4. For skin exposure: wash thoroughly with soap and water',
              '5. Report the incident to management immediately',
              '6. Seek medical attention if symptoms persist',
            ],
          },
        ],
        warning: 'Never mix bleach-based products with acid-based products (like toilet bowl cleaner) — this creates toxic chlorine gas.',
      },
      {
        slug: 'whmis-quiz',
        title: 'WHMIS Certification Quiz',
        type: 'quiz',
        questions: [
          {
            id: 'wh1',
            question: 'What does WHMIS stand for?',
            options: [
              'Workplace Health and Management Information Standards',
              'Workplace Hazardous Materials Information System',
              'Worker Hazard Management and Inspection System',
              'Workplace Handling and Materials Instruction Sheet',
            ],
            correct: 1,
            explanation: 'WHMIS stands for Workplace Hazardous Materials Information System — Canada\'s system for ensuring workers know how to safely use hazardous products.',
          },
          {
            id: 'wh2',
            question: 'You find an unlabelled spray bottle under the sink at a client\'s home. What do you do?',
            options: [
              'Use it — it\'s probably just water',
              'Smell it to figure out what it is',
              'Do not use it and report it to management',
              'Label it yourself based on what you think it contains',
            ],
            correct: 2,
            explanation: 'Never use an unlabelled container. You cannot know the product\'s hazards without a label. Do not use it and report it to management.',
          },
          {
            id: 'wh3',
            question: 'Which of the following chemical combinations must NEVER happen?',
            options: [
              'Mixing Dawn soap with warm water',
              'Using Lysol All Purpose Cleaner on counters',
              'Mixing bleach-based products with toilet bowl cleaner',
              'Using OdoBan floor cleaner on tile',
            ],
            correct: 2,
            explanation: 'Bleach mixed with acid-based products (like toilet bowl cleaner) creates toxic chlorine gas. This combination is extremely dangerous and must never occur.',
          },
          {
            id: 'wh4',
            question: 'What should you do first if cleaning product splashes in your eyes?',
            options: [
              'Continue working and rinse later',
              'Call management immediately before doing anything',
              'Flush eyes with water for at least 15 minutes',
              'Apply eye drops from your bag',
            ],
            correct: 2,
            explanation: 'Immediate flushing with water for 15+ minutes is the first-aid response for eye exposure. Then follow up with management and seek medical attention if needed.',
          },
          {
            id: 'wh5',
            question: 'Where can you find Safety Data Sheets (SDS) for cleaning products?',
            options: [
              'You need to look them up online for each product',
              'In the janitorial closet binder and via QR code on site, and in the Product Knowledge Center of this app',
              'Only available from the manufacturer directly',
              'SDS sheets are not required for cleaning products',
            ],
            correct: 1,
            explanation: 'SDS sheets are available in the janitorial closet binder, via QR code on site, and in the Product Knowledge Center of this training app.',
          },
        ],
      },
    ],
  },

  {
    slug: 'products',
    title: 'Product Knowledge Center',
    description: 'Every approved cleaning product — uses, safety notes, and how to apply them correctly.',
    icon: '🧴',
    color: 'yellow',
    estimatedMinutes: 20,
    track: 'all',
    lessons: [
      {
        slug: 'products-overview',
        title: 'Product Overview',
        type: 'lesson',
        content: 'Depending on your contract, WPG Local Cleaners may provide commercial cleaning products to be used and kept on site. All cleaning products we use are listed below along with safety notes. There is also a QR code accessible on-site in the janitorial closet for Safety Data Sheets.',
        warning: 'Never mix cleaning products. Read the label of every product before use. When in doubt, ask management.',
      },
      {
        slug: 'products-detail',
        title: 'Approved Product List',
        type: 'lesson',
        sections: [
          {
            heading: 'Dawn Platinum Soap',
            bullets: [
              'USES: Dishwashing, light degreasing, pre-cleaning surfaces. Use diluted on sealed granite or other surfaces.',
              'SAFETY: Mild detergent — NOT a disinfectant. May cause eye irritation. Safe for frequent use when diluted.',
              'NOTE: Always rinse food-contact surfaces after use.',
            ],
          },
          {
            heading: 'Lysol All Purpose Cleaner',
            bullets: [
              'USES: Disinfects and cleans hard, non-porous surfaces — toilets, counters, sinks, etc.',
              'SAFETY: Disinfectant. Can cause eye & skin irritation. Wear gloves for prolonged use. Do not mix with other cleaners.',
              'NOTE: Follow label dwell time for disinfecting (product must stay wet on surface for specified time).',
            ],
          },
          {
            heading: 'OdoBan No Rinse Neutral pH Floor Cleaner',
            bullets: [
              'USES: Routine cleaning of hard floor surfaces — tile, vinyl, laminate, sealed wood.',
              'SAFETY: Causes serious eye irritation. Wear eye protection when mixing or using.',
              '⚠️ CRITICAL: Dilute properly — ONLY ½ tbsp per 32 oz spray bottle. Over-concentration causes sticky floors.',
              'NOTE: Do not mix with other chemicals.',
            ],
          },
          {
            heading: 'Weiman Cooktop Cream Cleaner',
            bullets: [
              'USES: Cleans and polishes glass, ceramic, and smooth-top cooktops. Removes grease and burnt-on food.',
              'SAFETY: Eye and skin irritant. Wear gloves for extended use.',
              'NOTE: Rinse food-contact surfaces after use.',
            ],
          },
          {
            heading: 'Weiman Stainless Steel Cleaner',
            bullets: [
              'USES: Stainless steel surfaces — fridge, microwave & oven EXTERIOR only.',
              'SAFETY: Can cause skin & eye irritation. Wear proper PPE.',
            ],
          },
          {
            heading: 'Bar Keepers Friend MORE Spray + Foam',
            bullets: [
              'USES: Porcelain, ceramic, fiberglass, and other hard non-porous surfaces including fiberglass shower doors.',
              'SAFETY: Can cause skin irritation and SERIOUS EYE DAMAGE. Always wear eye protection.',
            ],
          },
          {
            heading: 'Bar Keepers Friend Soft Cleanser',
            bullets: [
              'USES: Porcelain, ceramic, fiberglass — great for most tubs & sinks.',
              'SAFETY: Can cause skin irritation and serious eye damage. Wear eye protection.',
              'NOTE: Rinse bathtubs thoroughly after use — residue can be slippery.',
            ],
          },
          {
            heading: 'Zep Window and Glass Cleaner',
            bullets: [
              'USES: Mirrors, glass (windows, interior glass), chrome, and other reflective surfaces.',
              'SAFETY: Pressurized aerosol — keep away from heat. May irritate eyes or skin. Use in well-ventilated areas.',
              'NOTE: Do NOT use on electronic screens.',
            ],
          },
          {
            heading: 'Lysol Toilet Bowl Cleaner',
            bullets: [
              'USES: Toilet bowls and urinals ONLY (porcelain/ceramic interiors).',
              'SAFETY: CORROSIVE — causes severe skin and eye burns. Gloves and eye protection REQUIRED.',
              '⚠️ DANGER: Do not mix with bleach or other cleaners. NOT for sinks, counters, floors, or other surfaces.',
            ],
          },
          {
            heading: 'EasyOff Oven Cleaner',
            bullets: [
              'USES: Oven interiors, oven racks, heavily baked-on grease (commercial or deep-clean use only).',
              'SAFETY: HIGHLY CORROSIVE & FLAMMABLE aerosol. Gloves and eye protection required. Well-ventilated areas only.',
              '⚠️ DANGER: Avoid skin/eye contact and inhaling spray. Do not use on aluminum or non-oven surfaces.',
            ],
          },
        ],
      },
      {
        slug: 'products-quiz',
        title: 'Knowledge Check',
        type: 'quiz',
        questions: [
          {
            id: 'pr1',
            question: 'How much OdoBan floor cleaner should you use in a 32 oz spray bottle?',
            options: ['1 full tablespoon', '½ tablespoon (½ tbsp)', '2 tablespoons', 'Fill halfway'],
            correct: 1,
            explanation: 'Only ½ tbsp per 32 oz spray bottle. Over-concentration is the most common cause of sticky floors — a very common client complaint.',
          },
          {
            id: 'pr2',
            question: 'Is Dawn Platinum soap a disinfectant?',
            options: ['Yes, it kills 99.9% of bacteria', 'No, it is a mild detergent only', 'Yes, when used full-strength', 'Only when mixed with hot water'],
            correct: 1,
            explanation: 'Dawn Platinum is a mild detergent — NOT a disinfectant. Use Lysol All Purpose Cleaner when disinfection is required.',
          },
          {
            id: 'pr3',
            question: 'Which product should you use to clean the INTERIOR of an oven during a deep clean?',
            options: ['Bar Keepers Friend Soft Cleanser', 'Lysol All Purpose Cleaner', 'EasyOff Oven Cleaner', 'Dawn Platinum Soap'],
            correct: 2,
            explanation: 'EasyOff Oven Cleaner is specifically for oven interiors and racks during deep-clean or commercial use. It requires gloves, eye protection, and good ventilation.',
          },
          {
            id: 'pr4',
            question: 'The Lysol Toilet Bowl Cleaner can also be used on sinks and counters. True or False?',
            options: ['True — it\'s an all-purpose cleaner', 'False — it is for toilet bowls ONLY'],
            correct: 1,
            explanation: 'FALSE. Lysol Toilet Bowl Cleaner is corrosive and is ONLY for toilet bowls and urinals. Never use it on sinks, counters, floors, or other surfaces.',
          },
        ],
      },
    ],
  },

  {
    slug: 'residential',
    title: 'Residential Cleaning Academy',
    description: 'Master the standard residential cleaning procedure — room by room, task by task.',
    icon: '🏡',
    color: 'teal',
    estimatedMinutes: 30,
    track: 'residential',
    lessons: [
      {
        slug: 'residential-intro',
        title: 'Residential Cleaning Overview',
        type: 'lesson',
        content: 'Residential cleaning is the core of what WPG Local Cleaners does. Every home is different, but our standard is always the same. A customized checklist is created for the majority of recurring clients. If there is not one available, complete all tasks in the standard checklist above the Extras/Deep Cleaning section.',
        bullets: [
          'Always review the Jobber job notes before entering any home',
          'Work top-to-bottom, back-to-front in each room',
          'Dust and dry tasks before wet tasks (e.g. dust first, mop last)',
          'Use a fresh mop head for each home',
          'Use client\'s vacuum whenever possible to reduce cross-contamination',
          'Pick up all floor mats and clean underneath them',
        ],
      },
      {
        slug: 'general-cleaning',
        title: 'General Areas',
        type: 'checklist',
        items: [
          { label: 'Dust all surfaces: furniture, shelves, decor, door frames & vents' },
          { label: 'Dust all light fixtures & clean ceiling fan' },
          { label: 'Straighten up and organize all living spaces' },
          { label: 'Disinfect all high-touch surfaces: doorknobs & light switches' },
          { label: 'Clean windows/window sills & mirrors' },
          { label: 'Dust blinds & curtains' },
          { label: 'Sweep/Vacuum & mop all floors', note: 'Always pick up floor mats and clean underneath' },
        ],
      },
      {
        slug: 'kitchen-cleaning',
        title: 'Kitchen',
        type: 'checklist',
        items: [
          { label: 'Clean & sanitize all surfaces' },
          { label: 'Wipe cupboards & backsplash' },
          { label: 'Clean inside microwave' },
          { label: 'Wash dishes & clean sink' },
          { label: 'Empty all garbages' },
          { label: 'Wipe down all appliance exteriors', note: 'Stove top, oven, microwave, and refrigerator exterior' },
        ],
        tip: 'Use Weiman Stainless Steel Cleaner on stainless appliance exteriors. Use Weiman Cooktop Cream on glass/ceramic cooktops.',
      },
      {
        slug: 'bedroom-cleaning',
        title: 'Bedrooms',
        type: 'checklist',
        items: [
          { label: 'Dust all surfaces' },
          { label: 'Make beds' },
          { label: 'Change bedsheets', note: 'Only if sheets are left out by the client' },
          { label: 'Clean mirrors & windows' },
          { label: 'Vacuum and/or mop' },
        ],
      },
      {
        slug: 'bathroom-cleaning',
        title: 'Bathrooms',
        type: 'checklist',
        items: [
          { label: 'Clean & sanitize toilets, sinks, & showers/bathtubs', note: 'Always clean sides AND behind the toilet' },
          { label: 'Clean mirrors, windows & other surfaces' },
          { label: 'Empty & clean trash can' },
          { label: 'Clean light fixtures' },
          { label: 'Clean baseboards' },
        ],
        warning: 'Never forget to clean the sides and BEHIND the toilet. This is one of the most common client complaints.',
        tip: 'Use Lysol Toilet Bowl Cleaner for bowl interior only. Use Lysol All Purpose for toilet exterior, sinks, and surfaces.',
      },
      {
        slug: 'deep-clean',
        title: 'Deep Clean Extras',
        type: 'checklist',
        items: [
          { label: 'Clean inside oven', note: 'Use EasyOff — gloves and eye protection required' },
          { label: 'Clean inside fridge' },
          { label: 'Clean baseboards (wet wipe)' },
          { label: 'Wash & fold laundry', note: 'Only if included in estimate' },
          { label: 'Vacuum/mop under beds & furniture' },
          { label: 'Vacuum under couch cushions' },
          { label: 'Wash walls' },
          { label: 'Clean exterior & interior of garbage bin' },
          { label: 'Wash doors' },
        ],
        tip: 'Deep clean extras are only performed when marked as "Included in estimate" on the client checklist. Never do these unless confirmed.',
      },
      {
        slug: 'move-in-out',
        title: 'Move In / Move Out Clean',
        type: 'checklist',
        items: [
          { label: 'ALL AREAS: Dust/wet wipe fans & blinds' },
          { label: 'ALL AREAS: Clean INSIDE window sills' },
          { label: 'ALL AREAS: Wash windows' },
          { label: 'ALL AREAS: Dust all light fixtures' },
          { label: 'ALL AREAS: Clean inside all closets' },
          { label: 'ALL AREAS: Dust & wet wipe all shelving' },
          { label: 'ALL AREAS: Dust & wet wipe all doors' },
          { label: 'ALL AREAS: Clean & disinfect light switches' },
          { label: 'ALL AREAS: Dust all baseboards' },
          { label: 'ALL AREAS: Vacuum all floors & mop all hard surfaces' },
          { label: 'KITCHEN: Dust on top of cabinets' },
          { label: 'KITCHEN: Clean exterior of all appliances' },
          { label: 'KITCHEN: Clean exterior & interior of cabinets' },
          { label: 'KITCHEN: Vacuum & wet wipe INSIDE all drawers & cabinets' },
          { label: 'KITCHEN: Clean backsplash' },
          { label: 'KITCHEN: Clean inside & outside of microwave' },
          { label: 'KITCHEN: Polish all stainless steel' },
          { label: 'KITCHEN: Clean & polish sink' },
          { label: 'KITCHEN: Clean INTERIOR of oven' },
          { label: 'KITCHEN: Clean INTERIOR of fridge' },
          { label: 'KITCHEN: Clean BEHIND oven & fridge (if moved by client)' },
          { label: 'BATHROOM: Dust & spot clean walls' },
          { label: 'BATHROOM: Dust & wet wipe light fixtures' },
          { label: 'BATHROOM: Clean exterior & interior of cabinets' },
          { label: 'BATHROOM: Clean & disinfect toilet — GET BEHIND' },
          { label: 'BATHROOM: Clean & scrub shower head, hose, walls, doors & bathtub' },
          { label: 'BATHROOM: Clean & disinfect sinks & counters' },
        ],
        tip: 'Move In/Out cleans also include: cleaning the freezer, behind and all sides of all kitchen appliances, inside all cupboards and drawers, wipe down doors, and spot clean walls as needed.',
      },
      {
        slug: 'common-feedback',
        title: 'Common Client Feedback & How to Avoid It',
        type: 'lesson',
        sections: [
          {
            heading: '"The floors feel sticky"',
            bullets: [
              'Cause: Floor mix was not diluted enough',
              'Fix: Use ONLY ½ tbsp OdoBan per 32 oz spray bottle — revise your dilution',
            ],
          },
          {
            heading: '"There is still crumbs/dirt on the floor after vacuuming"',
            bullets: [
              'Cause: Vacuum may be clogged and needs cleaning',
              'Fix: Wash the vacuum filter with water and air dry. Use the client\'s vacuum whenever possible to reduce cross-contamination.',
            ],
          },
          {
            heading: '"The sides and behind the toilet were not cleaned"',
            bullets: ['Cause: This area is easy to miss', 'Fix: Make it part of your routine — always clean ALL sides and behind the toilet'],
          },
          {
            heading: '"Things were not moved when dusting/vacuuming"',
            bullets: [
              'Cause: Skipping around items instead of moving them',
              'Fix: Move smaller objects like chairs and bins. Go as far as the vacuum can reach under beds and furniture.',
              'Always pick up ALL floor mats and clean underneath them.',
            ],
          },
        ],
        warning: 'Always rinse bathtubs well if using BFK (Bar Keepers Friend) soft soap — residue can be slippery.',
      },
      {
        slug: 'residential-videos',
        title: 'Training Videos',
        type: 'video',
        videos: [
          { title: 'Cleaning 101', embedId: '0rNMpFcebcc' },
          { title: 'How to Deep Clean a Home', embedId: 'JflYB9gHCek' },
          { title: 'Move In / Move Out Clean', embedId: 'XJSeBnIf_pk' },
          { title: 'Bathroom Cleaning', embedId: 'GVeHi7TSEgI' },
          { title: 'How To Clean Glass Shower Doors', embedId: 'VTOs3exVxHc' },
          { title: 'How To Clean Tubs & Showers', embedId: 'ExEDcKK8u4E' },
          { title: 'Kitchen Cleaning', embedId: '3Vryfeo7rrE' },
          { title: 'How To Clean Your Refrigerator', embedId: 'Yj3VZVCrFkU' },
          { title: 'How To Clean Your Oven', embedId: 'kEwvNgWIZAU' },
          { title: 'How To Clean a Glass Stove', embedId: 'aV3_Cmf6kMk' },
          { title: 'How To Clean a Gas Stove', embedId: 'U5GdB42-rdM' },
          { title: 'Floor Cleaning', embedId: 'did-T8pkKK4' },
          { title: 'How To Clean Windows Without Streaks', embedId: 'ZyRnWSx1VTg' },
        ],
      },
      {
        slug: 'residential-quiz',
        title: 'Residential Cleaning Quiz',
        type: 'quiz',
        questions: [
          {
            id: 'r1',
            question: 'What is the correct order of operations when cleaning a room?',
            options: [
              'Wet tasks first, then dry tasks',
              'Floors first, then surfaces',
              'Top-to-bottom, back-to-front; dust/dry tasks before wet tasks',
              'It doesn\'t matter as long as everything gets done',
            ],
            correct: 2,
            explanation: 'Always work top-to-bottom so dust falls to lower surfaces. Dry tasks (dusting) before wet tasks (mopping) so you\'re not dragging wet dirt across a just-vacuumed floor.',
          },
          {
            id: 'r2',
            question: 'A client has left their vacuum accessible. Should you use it?',
            options: [
              'No, always use your own vacuum',
              'Yes — using the client\'s vacuum reduces cross-contamination between homes and prolongs your equipment',
              'Only if your vacuum is broken',
              'It doesn\'t matter either way',
            ],
            correct: 1,
            explanation: 'WPG Local Cleaners urges you to use the client\'s vacuum whenever possible. This reduces cross-contamination between homes and extends the life of your equipment.',
          },
          {
            id: 'r3',
            question: 'During a regular clean, you notice the inside of the oven is very dirty. Should you clean it?',
            options: [
              'Yes — always clean the oven if it\'s dirty',
              'Only if you have extra time',
              'Only if it is marked as "Included in estimate" or specifically requested',
              'Take a photo and send it to management',
            ],
            correct: 2,
            explanation: 'Oven interior cleaning is a deep-clean extra. Only perform it if it is marked as "Included in estimate" or specifically requested by the client. Never add services without confirmation.',
          },
        ],
      },
    ],
  },

  {
    slug: 'commercial',
    title: 'Commercial Cleaning Academy',
    description: 'Standards and procedures for professional commercial cleaning — offices, washrooms, and common areas.',
    icon: '🏢',
    color: 'indigo',
    estimatedMinutes: 20,
    track: 'commercial',
    lessons: [
      {
        slug: 'commercial-intro',
        title: 'Commercial Cleaning Overview',
        type: 'lesson',
        content: 'Commercial cleaning requires the same attention to detail as residential, with additional considerations for professionalism, security, and working in occupied business environments.',
        bullets: [
          'Always follow the client\'s specific security procedures',
          'Never move important paperwork or business documents',
          'Do not move or lift items over 25 lbs unless specifically agreed upon',
          'Be especially mindful of noise levels in occupied offices',
          'Never discuss what you observe in a client\'s business with anyone',
          'Always check for visible safety hazards before beginning',
        ],
      },
      {
        slug: 'commercial-general',
        title: 'General Areas',
        type: 'checklist',
        items: [
          { label: 'Empty garbage & recycling', note: 'Use client-supplied liners' },
          { label: 'Vacuum carpets and carpet tiles' },
          { label: 'Sweep & damp mop hard floors' },
          { label: 'Dust horizontal surfaces', note: 'Up to 5 ft or as far as the extendable duster can reach' },
          { label: 'Wipe desks, tables, and counters', note: 'Clear surfaces only — do NOT move important paperwork' },
          { label: 'Clean interior glass on doors & partitions' },
          { label: 'Clean windows as needed' },
          { label: 'Spot clean light marks on walls & doors' },
          { label: 'Straighten furniture', note: 'No lifting or moving items over 25 lbs unless otherwise agreed' },
          { label: 'Light dusting of accessible vents, ledges & baseboards (as needed)' },
          { label: 'Check for any spills or visible safety hazards' },
        ],
      },
      {
        slug: 'commercial-washrooms',
        title: 'Washrooms',
        type: 'checklist',
        items: [
          { label: 'Empty garbage & replace liners' },
          { label: 'Clean & disinfect toilets, sinks & high-touch surfaces' },
          { label: 'Clean mirrors' },
          { label: 'Dust light fixtures' },
          { label: 'Dust & spot clean walls, baseboards & accessible vents' },
          { label: 'Spot clean partitions & doors' },
          { label: 'Sweep & mop all floors' },
          { label: 'Refill soap/paper', note: 'Supplies are provided on-site by the client' },
        ],
      },
      {
        slug: 'commercial-kitchenette',
        title: 'Kitchenettes & Breakrooms',
        type: 'checklist',
        items: [
          { label: 'Clean exterior surfaces of appliances' },
          { label: 'Wipe counters & tables' },
          { label: 'Clean sinks & faucets' },
          { label: 'Empty garbage & recycling' },
          { label: 'Spot clean backsplash' },
          { label: 'Sweep or Vacuum & Mop floors' },
        ],
      },
      {
        slug: 'commercial-addons',
        title: 'Possible Add-Ons',
        type: 'lesson',
        content: 'The following are add-on services that may be included in a commercial contract. Only perform these if specifically included in your scope of work.',
        bullets: [
          'Complete cleaning of interior windows',
          'Interior of fridge',
          'Interior of microwave',
          'Interior of oven',
        ],
        warning: 'Never perform add-on services unless they are confirmed as part of your contract. If a client requests extra services on the spot, contact management before proceeding.',
      },
      {
        slug: 'commercial-videos',
        title: 'Training Videos',
        type: 'video',
        videos: [
          { title: 'How To Clean an Office', embedId: '4t2U-TKDmUg' },
          { title: 'How To Clean a Commercial Washroom', embedId: 's03XgZi3VBo' },
          { title: 'Mopping Techniques', embedId: 'TXt-XwHywOY' },
          { title: 'How To Vacuum Properly', embedId: 'vk4SlLFuRwM' },
          { title: 'How To Clean Windows Without Streaks', embedId: 'ZyRnWSx1VTg' },
        ],
      },
      {
        slug: 'commercial-quiz',
        title: 'Commercial Cleaning Quiz',
        type: 'quiz',
        questions: [
          {
            id: 'c1',
            question: 'You notice a client\'s desk has important-looking documents spread across it. What do you do?',
            options: [
              'Stack them neatly in a pile',
              'Move them to a drawer',
              'Clean around them — do not move paperwork',
              'Ask the client before touching anything',
            ],
            correct: 2,
            explanation: 'For commercial cleaning, you wipe clear surfaces only — do NOT move important paperwork or business documents. If the whole desk is covered, skip it and note it.',
          },
          {
            id: 'c2',
            question: 'Who provides soap and paper supplies in commercial washrooms?',
            options: [
              'WPG Local Cleaners provides all supplies',
              'The client provides soap and paper supplies on-site',
              'You purchase them and get reimbursed',
              'You do not refill supplies in commercial washrooms',
            ],
            correct: 1,
            explanation: 'In commercial settings, soap and paper supplies are provided by the client on-site. Your job is to refill them from the client\'s supply, not to purchase them.',
          },
        ],
      },
    ],
  },

  {
    slug: 'first-clean',
    title: 'First Clean Playbook',
    description: 'Everything you need to know from accepting the job to locking up and leaving — step by step.',
    icon: '🗝️',
    color: 'orange',
    estimatedMinutes: 15,
    track: 'all',
    lessons: [
      {
        slug: 'before-you-go',
        title: 'Before You Leave Home',
        type: 'lesson',
        bullets: [
          'Open Jobber and review all job notes, scope of work, and special instructions',
          'Note the entry method: door code, key lockbox, client present, etc.',
          'Check the estimated time — plan your travel to arrive on time',
          'Confirm you have all required supplies and equipment',
          'Check the address and plan parking in advance',
        ],
        tip: 'For your first time at a new client\'s home, arrive 5 minutes early. This gives you time to find parking and locate the entry.',
      },
      {
        slug: 'arrival',
        title: 'Arrival Procedures',
        type: 'lesson',
        content: 'Always assume the client is home unless otherwise stated under "instructions" in Jobber. If there is a code provided for the door, garage, or a key left under the front mat, it will be listed in the job instructions.',
        bullets: [
          'Park in a respectful location — do not block driveways or neighbours',
          'Bring all supplies inside in an organized manner',
          'Knock or ring the doorbell if the client may be home',
          'Introduce yourself professionally: "Hi, I\'m [name] from WPG Local Cleaners"',
          'If using a key or code, follow the exact entry instructions from Jobber',
        ],
        warning: 'Never share entry codes with anyone. Treat all access information as strictly confidential.',
      },
      {
        slug: 'during-clean',
        title: 'During the Clean',
        type: 'lesson',
        bullets: [
          'Follow the client checklist exactly — every task, every room',
          'Work efficiently within the scheduled time window',
          'If you are going to exceed the time by more than 30 minutes, text the manager on duty',
          'If there is a "max time" set, stick to it — you will be paid according to the client\'s rate',
          'Never take photos of the home without authorization',
          'Before and after photos may be required — check your Jobber job notes',
          'If you discover damage that was already there, photograph and report it immediately',
        ],
        tip: 'Working in an occupied home: be mindful of noise, be respectful of the client\'s space, and keep interactions professional but friendly.',
      },
      {
        slug: 'lock-up',
        title: 'Lock-Up & Completion',
        type: 'lesson',
        bullets: [
          'Do a final walk-through of every room before leaving',
          'Ensure all lights are off (unless instructed otherwise)',
          'Lock all doors and windows as instructed',
          'Return any keys to the exact location specified',
          'Re-enter the entry code if required by the client\'s system',
          'Mark the job as COMPLETE in Jobber immediately after leaving',
          'Leave the home in better condition than you found it',
        ],
        warning: 'Never leave a client\'s home unlocked. If you encounter any issues with the lock-up, contact management immediately before leaving.',
      },
      {
        slug: 'running-late',
        title: 'Running Late or Issues',
        type: 'lesson',
        bullets: [
          'If you are running more than 15 minutes late, text management immediately',
          'Management will contact the client on your behalf',
          'Do not contact the client directly unless instructed to',
          'If you cannot make it at all, arrange a substitute and notify management ASAP',
          'Document any issues (damage, concerns, access problems) with photos and report via Jobber or Slack',
        ],
      },
      {
        slug: 'reading-jobber-notes',
        title: 'Reading Client Notes in Jobber',
        type: 'lesson',
        content: 'Every job in Jobber has a notes section. These notes are not optional reading — they contain information that directly affects how you do the job. Skipping them is one of the most common causes of client complaints and re-cleans.',
        sections: [
          {
            heading: 'What You Will Find in Job Notes',
            bullets: [
              'Entry method — door code, key lockbox location, garage code, or "client will be home"',
              'Pets — whether pets are present and any instructions (keep door closed, do not let dog outside)',
              'Rooms to skip — locked rooms, home office, nursery, or areas the client has specifically excluded',
              'Client preferences — preferred products, areas to focus on, things not to touch',
              'Special instructions — before/after photos required, specific cleaning methods the client has requested',
              'Allergies or sensitivities — scent-free products only, latex gloves not permitted, etc.',
              'Maximum time — the maximum number of hours the client has approved for this visit',
            ],
          },
          {
            heading: 'How to Read Notes Effectively',
            bullets: [
              'Read the full job notes before you leave home — not in the driveway',
              'If a note is unclear, text management before you arrive — not after you\'ve already done the wrong thing',
              'Notes override your standard checklist — if a client says skip the office, skip the office',
              'If something in the notes is missing (e.g. a door code that doesn\'t work), contact management immediately',
              'After photos — if notes say "take before/after photos," do it for every room, not just the ones you think look impressive',
            ],
          },
          {
            heading: 'Common Mistakes From Not Reading Notes',
            bullets: [
              '🐾 Letting a pet outside or into a restricted area',
              '🚪 Cleaning a room the client specifically asked to be skipped',
              '🧴 Using scented products when the client has a sensitivity',
              '⏱ Going over the max time without client approval',
              '🔐 Not knowing the entry code and calling management from the doorstep',
              '📸 Finishing the job without the required before/after photos',
            ],
          },
        ],
        warning: 'If you notice something in the notes that conflicts with what you see on-site (e.g., the entry code doesn\'t work, a room that was supposed to be accessible is locked), contact management before making any judgment calls.',
        tip: 'Build a habit: open Jobber the night before each job. Read the notes, check the entry method, confirm the address. You will never be caught off guard.',
      },
      {
        slug: 'jobber-video',
        title: 'How to Use Jobber',
        type: 'video',
        videos: [
          { title: 'How to Use Jobber — WPG Local Cleaners Walkthrough', embedId: '1J9hx5VBOKMDldVHp1PKk_PWJaeJqaCKC', source: 'drive' },
        ],
      },
    ],
  },

  {
    slug: 'client-communication',
    title: 'Client Communication',
    description: 'Scenario-based training for handling client interactions professionally — complaints, requests, and difficult situations.',
    icon: '💬',
    color: 'pink',
    estimatedMinutes: 15,
    track: 'all',
    lessons: [
      {
        slug: 'communication-basics',
        title: 'Communication Basics',
        type: 'lesson',
        content: 'Your interactions with clients represent WPG Local Cleaners. Every conversation — in person or by message — should be professional, calm, and solution-focused.',
        bullets: [
          'Be warm and professional — a smile goes a long way',
          'Never argue with a client or become defensive',
          'When in doubt, say: "Let me check with my manager and get back to you"',
          'Never make promises you cannot keep',
          'Never discuss pricing, discounts, or service changes — always refer to management',
        ],
      },
      {
        slug: 'scenarios',
        title: 'Common Scenarios & Responses',
        type: 'lesson',
        sections: [
          {
            heading: 'Client Says: "You Missed a Spot"',
            bullets: [
              'DO: "I\'m so sorry about that — let me take care of that right now."',
              'If you\'ve already left: "I\'m sorry to hear that. I\'ll let management know and we\'ll make it right."',
              'DON\'T: Get defensive or make excuses',
            ],
          },
          {
            heading: 'Client Asks for Extra Work Not in the Scope',
            bullets: [
              'DO: "That\'s not included in today\'s service, but I\'d be happy to let management know — they can arrange it for a future visit."',
              'DON\'T: Agree to do extra work without management approval',
              'DON\'T: Quote prices — you are not authorized to change service agreements',
            ],
          },
          {
            heading: 'Client Has a Complaint About the Clean',
            bullets: [
              'DO: Listen fully, apologize sincerely, and say "I\'ll let management know immediately."',
              'DO: Contact management via Slack or text as soon as possible',
              'DON\'T: Argue, minimize the complaint, or blame products/equipment',
            ],
          },
          {
            heading: 'You Cannot Access the Property',
            bullets: [
              'DO: Check Jobber job notes for all entry instructions first',
              'DO: Try all entry methods listed',
              'DO: If still unable to access, text management immediately — do not leave without notifying them',
              'DON\'T: Leave without making contact',
            ],
          },
          {
            heading: 'Client Is Present and Watching You Work',
            bullets: [
              'DO: Carry on professionally — this is normal',
              'DO: Be friendly and answer questions politely',
              'DON\'T: Feel rushed or pressured to skip steps',
              'DO: If the client asks you to do something different, do it politely and note it in Jobber',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'supplies-equipment',
    title: 'Supplies & Equipment',
    description: 'Tools of the trade — what WPG provides, how to use and care for equipment, and proper storage.',
    icon: '🧹',
    color: 'gray',
    estimatedMinutes: 10,
    track: 'all',
    lessons: [
      {
        slug: 'equipment-list',
        title: 'Equipment You May Be Provided',
        type: 'lesson',
        content: 'Depending on your contract, WPG Local Cleaners may provide the following tools upon request.',
        sections: [
          {
            heading: 'Cleaning Tools',
            bullets: [
              'Cleaning kit (caddy with supplies)',
              'Microfiber cloths — safe for use on all surfaces',
              'Glass cloths — for streak-free glass and mirrors',
              'Magic eraser — for wall spots and baseboards',
              'Non-scratch sponges',
              'Extendable dusters',
              'Cleaning brushes of various sizes',
              'Toilet brush — we recommend using client\'s when available',
              'Oven scraper',
              'Squeegee',
              'Spray bottles for mixing products — label all bottles correctly',
            ],
          },
          {
            heading: 'Vacuum & Mop',
            bullets: [
              'Backup Vacuum — clients almost always supply a vacuum; ours is provided as a backup ONLY',
              'Flat Mop & Extra Mop Pads — use a FRESH mop head for each home',
            ],
          },
          {
            heading: 'Bags',
            bullets: [
              'Blue bags — for clean rags',
              'Black bags — for dirty rags',
              'Garbage bags',
            ],
          },
        ],
        warning: 'When washing microfiber cloths: use ONLY laundry detergent. Never use fabric softener — it clogs the fibers and reduces effectiveness.',
      },
      {
        slug: 'equipment-care',
        title: 'Equipment Care & Best Practices',
        type: 'lesson',
        bullets: [
          'Use a fresh mop head for every home — never cross-contaminate between clients',
          'Separate clean and dirty rags in their respective blue/black bags',
          'Wash microfiber cloths with laundry detergent only — no fabric softener',
          'Use the client\'s vacuum whenever possible to reduce wear on company equipment',
          'Wash vacuum filter with water and air dry when needed',
          'Label all spray bottles with the product name and hazard info',
          'Never mix products in an unmarked bottle',
          'Report any damaged or missing equipment to management promptly',
        ],
      },
    ],
  },

  {
    slug: 'incident-reporting',
    title: 'Incident Reporting',
    description: 'How to handle damage, injuries, safety concerns, and client complaints — step-by-step workflows.',
    icon: '🚨',
    color: 'red',
    estimatedMinutes: 10,
    track: 'all',
    lessons: [
      {
        slug: 'incident-types',
        title: 'Types of Incidents',
        type: 'lesson',
        content: 'Incidents happen — what matters is how you respond. Prompt, honest reporting protects you, the client, and WPG Local Cleaners.',
        sections: [
          {
            heading: 'Reportable Incidents',
            bullets: [
              'Property damage (accidental breakage, scratches, spills)',
              'Personal injury (to yourself or anyone on the property)',
              'Near misses (something almost happened)',
              'Chemical spills or exposure',
              'Security concerns (suspicious activity, missing items)',
              'Client complaints or conflict',
              'Access issues (cannot enter property)',
            ],
          },
        ],
      },
      {
        slug: 'incident-workflows',
        title: 'How to Report — Step by Step',
        type: 'lesson',
        sections: [
          {
            heading: 'Damage to Client Property',
            bullets: [
              '1. Do not attempt to hide, fix, or minimize the damage',
              '2. Take clear photos immediately',
              '3. Contact management via Slack or text while still on site',
              '4. Note the damage in the Jobber job completion notes',
              '5. Leave the area as-is — do not attempt repairs',
            ],
          },
          {
            heading: 'Personal Injury',
            bullets: [
              '1. Stop work and ensure your safety first',
              '2. Administer first aid if needed',
              '3. Call 911 if it is a serious emergency',
              '4. Contact management immediately',
              '5. Document everything including time, location, and circumstances',
            ],
          },
          {
            heading: 'Chemical Exposure',
            bullets: [
              '1. Stop work immediately',
              '2. Follow first aid on the product label or SDS',
              '3. For eye exposure: flush with water for 15+ minutes',
              '4. For skin: wash thoroughly with soap and water',
              '5. Seek medical attention if symptoms persist',
              '6. Report to management immediately',
            ],
          },
        ],
        warning: 'Never leave a client\'s property after an incident without first contacting management. Prompt reporting is always better than delayed reporting.',
      },
    ],
  },

  {
    slug: 'earnings',
    title: 'Earnings & Compensation',
    description: 'Understand how you are paid, what deductions mean, and how to track income and expenses.',
    icon: '💰',
    color: 'green',
    estimatedMinutes: 15,
    track: 'all',
    lessons: [
      {
        slug: 'employee-earnings',
        title: 'Employee Compensation',
        type: 'lesson',
        content: 'As an employee, you start at $19/hour and are paid biweekly. Vacation pay (4%) is included in every paycheque. Taxes, CPP, and EI are all deducted automatically — you receive a T4 at year-end and file a standard tax return.',
        sections: [
          {
            heading: 'What\'s Included',
            bullets: [
              '$19/hour starting rate',
              'Biweekly pay',
              '4% vacation pay, paid out each pay period',
              'CPP and EI deducted and matched/remitted by the company',
              'WCB coverage provided',
              'T4 slip at year-end',
              'Tips: any tips left by clients are yours and paid out on your regular pay schedule',
            ],
          },
        ],
        tip: 'Questions about your pay? Contact management at support@wpglocalcleaners.ca',
      },
      {
        slug: 'contractor-earnings',
        title: 'Contractor Compensation',
        type: 'lesson',
        content: 'As a contractor, you start at $23/hour with more frequent payouts. You receive your full amount with no deductions — but you are responsible for setting aside taxes and filing as self-employed. The upside: you can deduct business expenses like mileage, supplies, and insurance.',
        sections: [
          {
            heading: 'What\'s Included',
            bullets: [
              '$23/hour starting rate',
              'More frequent payouts',
              'Submit invoices or log jobs in the company system',
              'No deductions — full gross paid every time',
              'WCB covered by WPG if you don\'t carry your own',
              'T4A slip at year-end',
              'Tips: any tips left by clients are yours and paid out according to your pay schedule',
            ],
          },
          {
            heading: 'Your Responsibilities',
            bullets: [
              'Set aside 25–30% of income for taxes',
              'File as self-employed (T1 + T2125)',
              'Pay both portions of CPP (11.9% total)',
              'Carry liability insurance (required before starting)',
            ],
          },
          {
            heading: 'Common Deductible Expenses',
            bullets: [
              'Mileage: $0.72/km (first 5,000 km) — track every trip',
              'Cleaning supplies and equipment you purchase',
              'Business portion of your phone',
              'Liability insurance premiums (~$50/month)',
            ],
          },
        ],
        warning: 'This is general information only. Consult a tax professional for advice specific to your situation.',
        tip: 'Mileage adds up fast — 30 km/day, 5 days/week is over $5,600 in deductions per year.',
      },
    ],
  },

  {
    slug: 'faq',
    title: 'FAQ Center',
    description: 'Answers to the most common questions from WPG Local Cleaners team members.',
    icon: '❓',
    color: 'blue',
    estimatedMinutes: 5,
    track: 'all',
    lessons: [
      {
        slug: 'faq-main',
        title: 'Frequently Asked Questions',
        type: 'lesson',
        sections: [
          {
            heading: 'What do I do when I arrive at a house?',
            bullets: [
              'Always assume the client is home unless otherwise stated under "instructions" in Jobber.',
              'If there is a code for the door, garage, or a key left under the front mat, it will be listed in the Jobber instructions.',
            ],
          },
          {
            heading: 'What do I do if I need more time?',
            bullets: [
              'Do your best to stay within the allocated time — you are paid according to what the client is charged.',
              'If you need to go more than 30 minutes over, text the manager on-duty so they can contact the client for permission.',
              'If there is a "max" time, stick to it strictly.',
            ],
          },
          {
            heading: 'What\'s the difference between a deep clean and a regular clean?',
            bullets: [
              'Deep cleaning goes further to remove dirt, grime, soap scum, and buildup.',
              'Example: hand washing vs. dusting the baseboards.',
              'Deep cleans take more time — you will be given a longer scheduled window.',
            ],
          },
          {
            heading: 'What extra things do I do during a Move-Out/Move-In clean?',
            bullets: [
              'In addition to the standard checklist: clean the freezer, behind and all sides of kitchen appliances (oven, fridge, microwave), inside all cupboards and drawers, wipe down all doors, and spot clean walls as needed.',
            ],
          },
          {
            heading: 'What if I can\'t access the property?',
            bullets: [
              'First, check all Jobber job notes for all entry instructions.',
              'Try all entry methods listed.',
              'If you still cannot access it, text management immediately.',
              'Do not leave without notifying management.',
            ],
          },
          {
            heading: 'Who do I contact if something goes wrong?',
            bullets: [
              'During business hours (9am–5pm): Kris Ann at 204-805-4249 or Desiree at 204-500-1894',
              'After hours emergencies only: Kayla at 647-762-0130',
              'You can also message in the Slack group',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'growth',
    title: 'Growth & Recognition',
    description: 'Your career path at WPG Local Cleaners — milestones, badges, and advancement opportunities.',
    icon: '⭐',
    color: 'yellow',
    estimatedMinutes: 5,
    track: 'all',
    lessons: [
      {
        slug: 'career-path',
        title: 'Your Career Path',
        type: 'lesson',
        sections: [
          {
            heading: '🌱 New Cleaner',
            bullets: [
              'Just getting started — completing onboarding and first cleans',
              'Focus: Following the checklist, building confidence, learning products',
              'Milestone: Complete all Academy modules and pass the final certification',
            ],
          },
          {
            heading: '✅ Certified Cleaner',
            bullets: [
              'Completed the full Academy and passed the final certification',
              'Trusted to work independently on all standard cleans',
              'Milestone: 10 completed cleans with positive feedback',
            ],
          },
          {
            heading: '🏅 Senior Cleaner',
            bullets: [
              'Consistently high quality, reliable attendance, positive client feedback',
              'Eligible for priority job assignments',
              'Milestone: 50 completed cleans, no unresolved complaints',
            ],
          },
          {
            heading: '🎓 Trainer',
            bullets: [
              'Experienced enough to guide new cleaners',
              'May shadow new cleaners on their first jobs',
              'Milestone: Senior Cleaner status + management recommendation',
            ],
          },
          {
            heading: '👑 Team Lead',
            bullets: [
              'Leads teams on larger jobs or multi-cleaner assignments',
              'Point of contact for team questions on-site',
              'Milestone: Trainer status + demonstrated leadership',
            ],
          },
        ],
        tip: 'Your career progression is tracked automatically in your Academy dashboard. Keep completing cleans and you\'ll see your milestones grow.',
      },
    ],
  },

  {
    slug: 'certification',
    title: 'Final Certification',
    description: 'Demonstrate your knowledge across all Academy modules. A passing grade of 80% is required.',
    icon: '🎓',
    color: 'gold',
    estimatedMinutes: 20,
    track: 'all',
    lessons: [
      {
        slug: 'final-exam',
        title: 'Final Certification Exam',
        type: 'quiz',
        questions: [
          {
            id: 'f1',
            question: 'What is the correct dilution ratio for OdoBan floor cleaner?',
            options: ['1 tablespoon per 32 oz', '½ tablespoon per 32 oz', '2 tablespoons per 32 oz', 'Use full strength'],
            correct: 1,
            explanation: 'ONLY ½ tablespoon per 32 oz spray bottle. Over-concentration causes sticky floors — one of the most common client complaints.',
          },
          {
            id: 'f2',
            question: 'You accept a cleaning job and then realize you cannot make it. What is the correct action?',
            options: [
              'Simply cancel through Jobber',
              'Call the client to reschedule',
              'Arrange a vetted substitute yourself and notify management as early as possible',
              'Ask management to handle everything',
            ],
            correct: 2,
            explanation: 'It is YOUR responsibility to arrange a substitute. Management should be notified but finding the replacement is on you.',
          },
          {
            id: 'f3',
            question: 'Which combination of chemicals must NEVER be mixed?',
            options: [
              'Dawn soap and warm water',
              'Bleach-based products and toilet bowl cleaner (acid-based)',
              'OdoBan and water',
              'Lysol All Purpose and a microfiber cloth',
            ],
            correct: 1,
            explanation: 'Bleach + acid-based products (like toilet bowl cleaner) creates toxic chlorine gas. This is extremely dangerous.',
          },
          {
            id: 'f4',
            question: 'During a regular clean, should you clean the inside of the oven if it\'s dirty?',
            options: [
              'Yes, always clean it if it needs it',
              'Only if you have extra time',
              'Only if it is specifically included in the estimate or requested',
              'Never — oven interiors are never cleaned',
            ],
            correct: 2,
            explanation: 'Oven interior is a deep-clean extra. Only perform it if confirmed in the scope of work.',
          },
          {
            id: 'f5',
            question: 'What should you do if you accidentally break something at a client\'s home?',
            options: [
              'Try to fix or replace it discreetly',
              'Move it somewhere it won\'t be noticed',
              'Report it to management immediately and honestly, with photos',
              'Leave a note for the client',
            ],
            correct: 2,
            explanation: 'Always report accidents immediately and honestly. Transparency protects everyone and maintains trust.',
          },
          {
            id: 'f6',
            question: 'Which product is safe to use on a client\'s electronic TV screen?',
            options: ['Zep Window and Glass Cleaner', 'Lysol All Purpose Cleaner', 'A dry microfiber cloth only', 'OdoBan diluted with water'],
            correct: 2,
            explanation: 'Never use any spray products on electronic screens. A dry (or very slightly damp) microfiber cloth is the only safe option.',
          },
          {
            id: 'f7',
            question: 'Where do you find entry codes and special instructions for each job?',
            options: ['The client will text you before your arrival', 'In the Jobber job instructions', 'Management will call you on the day', 'They are posted on the front door'],
            correct: 1,
            explanation: 'All entry codes, key locations, and special instructions are listed in the Jobber job instructions.',
          },
          {
            id: 'f8',
            question: 'As an independent contractor, you are responsible for which of the following?',
            options: [
              'Nothing — WPG handles all taxes',
              'Only income tax — CPP is not required for contractors',
              'Remitting your own taxes, both employee and employer CPP, and your own insurance',
              'Filing taxes annually but no CPP is required',
            ],
            correct: 2,
            explanation: 'Independent contractors are responsible for their own taxes, both portions of CPP, and should carry their own liability insurance.',
          },
          {
            id: 'f9',
            question: 'You are running 20 minutes late to a cleaning job. What should you do?',
            options: [
              'Nothing — 20 minutes is fine',
              'Text management immediately so they can inform the client',
              'Call the client directly to let them know',
              'Speed up to try to arrive on time',
            ],
            correct: 1,
            explanation: 'If running more than 15 minutes late, text management immediately. Management will contact the client. Do not contact the client directly unless instructed.',
          },
          {
            id: 'f10',
            question: 'What is the minimum passing score for this Final Certification?',
            options: ['70%', '75%', '80%', '90%'],
            correct: 2,
            explanation: 'A minimum passing grade of 80% is required to earn your WPG Local Cleaners Academy Certification.',
          },
        ],
      },
    ],
  },

  {
    slug: 'graduation',
    title: 'Graduation & Next Steps',
    description: 'You\'re certified! Here\'s everything you need before your first clean.',
    icon: '🎉',
    color: 'gold',
    estimatedMinutes: 5,
    track: 'all',
    lessons: [
      {
        slug: 'next-steps',
        title: 'You Did It — What\'s Next',
        type: 'lesson',
        content: 'Congratulations on completing WPG Local Cleaners Academy! You are now certified and ready to represent our team. Here is your first-shift preparation checklist.',
        sections: [
          {
            heading: 'Before Your First Clean',
            bullets: [
              '✅ Download Jobber and log in with your provided credentials',
              '✅ Join the WPG Local Cleaners Slack group',
              '✅ Save management contact numbers in your phone',
              '✅ Review your first job notes in Jobber 24 hours before',
              '✅ Ensure you have all required supplies',
              '✅ Plan your route and parking',
            ],
          },
          {
            heading: 'Key Contacts',
            bullets: [
              'Kris Ann (Communications): 204-805-4249 | info@wpglocalcleaners.ca',
              'Desiree (Operations): 204-500-1894 | support@wpglocalcleaners.ca',
              'Kayla (Owner — emergencies only): 647-762-0130 | kayla@wpglocalcleaners.ca',
              'General line: 204-500-1894',
              'Hours: 9am–5pm daily',
            ],
          },
          {
            heading: 'Remember',
            bullets: [
              'Consistency and reliability are everything',
              'When in doubt, ask — never guess on a client\'s property',
              'Every client trusts us in their home — honour that',
              'You represent WPG Local Cleaners on every job',
              'We are here to support you — use us',
            ],
          },
        ],
        tip: 'You are now part of a team committed to elevating the cleaning profession. Welcome, and thank you for taking your training seriously.',
      },
    ],
  },
]

export function getModule(slug: string): ModuleData | undefined {
  return MODULES.find(m => m.slug === slug)
}

export function getLesson(moduleSlug: string, lessonSlug: string): LessonContent | undefined {
  const mod = getModule(moduleSlug)
  return mod?.lessons.find(l => l.slug === lessonSlug)
}
