export interface SDSEntry {
  id: string
  productName: string
  manufacturer: string
  hazards: string[]
  hazardSymbols: string[]
  ppe: string[]
  firstAid: {
    eyes: string
    skin: string
    inhaled: string
    ingested: string
  }
  doNotMix: string[]
  surfaces: string
  storageNotes: string
  supabasePath: string | null  // fill in after uploading to Supabase Storage
}

export const SDS_SHEETS: SDSEntry[] = [
  {
    id: 'dawn-platinum',
    productName: 'Dawn Platinum Soap',
    manufacturer: 'Procter & Gamble',
    hazards: ['Eye irritant', 'May cause skin irritation with prolonged exposure'],
    hazardSymbols: ['❗ Harmful/Irritant'],
    ppe: ['Gloves for prolonged use'],
    firstAid: {
      eyes: 'Flush with water for 15 minutes. Seek medical attention if irritation persists.',
      skin: 'Wash with soap and water. Remove contaminated clothing.',
      inhaled: 'Move to fresh air. Seek medical attention if symptoms persist.',
      ingested: 'Do not induce vomiting. Rinse mouth. Seek medical attention.',
    },
    doNotMix: [],
    surfaces: 'Dishes, general surfaces. NOT a disinfectant.',
    storageNotes: 'Store at room temperature. Keep away from children.',
    supabasePath: null,
  },
  {
    id: 'lysol-all-purpose',
    productName: 'Lysol All Purpose Cleaner',
    manufacturer: 'Reckitt Benckiser',
    hazards: ['Eye and skin irritant', 'Disinfectant — follow dwell time instructions'],
    hazardSymbols: ['❗ Harmful/Irritant'],
    ppe: ['Gloves for prolonged use', 'Eye protection if splashing risk'],
    firstAid: {
      eyes: 'Flush immediately with water for 15–20 minutes. Seek medical attention.',
      skin: 'Wash with soap and water. Remove contaminated clothing.',
      inhaled: 'Move to fresh air. Seek medical attention if symptoms persist.',
      ingested: 'Do not induce vomiting. Drink water. Seek medical attention immediately.',
    },
    doNotMix: ['Do not mix with bleach', 'Do not mix with ammonia-based products'],
    surfaces: 'Hard non-porous surfaces: counters, sinks, toilets (exterior), appliance exteriors.',
    storageNotes: 'Store in original container. Keep at room temperature.',
    supabasePath: null,
  },
  {
    id: 'odoban-floor',
    productName: 'OdoBan No Rinse Neutral pH Floor Cleaner',
    manufacturer: 'ODO Industries / Clean Control Corp',
    hazards: ['SERIOUS eye irritant', 'Wear eye protection when mixing or applying'],
    hazardSymbols: ['❗ Serious Eye Irritant'],
    ppe: ['Eye protection when mixing or using', 'Gloves recommended'],
    firstAid: {
      eyes: 'IMMEDIATELY flush with water for AT LEAST 15 minutes. Seek medical attention.',
      skin: 'Wash with soap and water.',
      inhaled: 'Move to fresh air.',
      ingested: 'Rinse mouth. Drink water. Seek medical attention.',
    },
    doNotMix: ['Do not mix with other chemicals'],
    surfaces: 'Hard floor surfaces: tile, vinyl, laminate, sealed wood. DILUTE ONLY — ½ tbsp per 32 oz bottle.',
    storageNotes: 'Store in original container, cool dry place.',
    supabasePath: null,
  },
  {
    id: 'weiman-cooktop',
    productName: 'Weiman Cooktop Cream Cleaner',
    manufacturer: 'Weiman Products LLC',
    hazards: ['Eye and skin irritant'],
    hazardSymbols: ['❗ Harmful/Irritant'],
    ppe: ['Gloves for extended use'],
    firstAid: {
      eyes: 'Flush with water for 15 minutes. Seek medical attention if irritation persists.',
      skin: 'Wash with soap and water.',
      inhaled: 'Move to fresh air.',
      ingested: 'Rinse mouth. Seek medical attention.',
    },
    doNotMix: [],
    surfaces: 'Glass, ceramic, and smooth-top cooktops ONLY.',
    storageNotes: 'Store at room temperature. Keep away from children.',
    supabasePath: null,
  },
  {
    id: 'weiman-stainless',
    productName: 'Weiman Stainless Steel Cleaner',
    manufacturer: 'Weiman Products LLC',
    hazards: ['Eye and skin irritant'],
    hazardSymbols: ['❗ Harmful/Irritant'],
    ppe: ['Gloves for extended use'],
    firstAid: {
      eyes: 'Flush with water for 15 minutes.',
      skin: 'Wash with soap and water.',
      inhaled: 'Move to fresh air.',
      ingested: 'Rinse mouth. Seek medical attention.',
    },
    doNotMix: [],
    surfaces: 'Stainless steel EXTERIOR surfaces only — fridge, microwave, oven exterior. Do not use on interior.',
    storageNotes: 'Store at room temperature.',
    supabasePath: null,
  },
  {
    id: 'bkf-spray',
    productName: 'Bar Keepers Friend MORE Spray + Foam',
    manufacturer: 'Bar Keepers Friend / Servaas Laboratories',
    hazards: ['Causes serious eye damage', 'Skin irritant'],
    hazardSymbols: ['⚠️ Serious Eye Damage', '❗ Skin Irritant'],
    ppe: ['Eye protection REQUIRED', 'Gloves required'],
    firstAid: {
      eyes: 'IMMEDIATELY flush with water for 15–20 minutes. Seek medical attention urgently.',
      skin: 'Wash thoroughly with soap and water. Remove contaminated clothing.',
      inhaled: 'Move to fresh air. Seek medical attention if breathing difficulty.',
      ingested: 'Do not induce vomiting. Seek medical attention immediately.',
    },
    doNotMix: ['Do not mix with bleach or other cleaners'],
    surfaces: 'Porcelain, ceramic, fiberglass, fiberglass shower doors. NOT for use on natural stone, marble, or cast iron.',
    storageNotes: 'Store upright in original container.',
    supabasePath: null,
  },
  {
    id: 'bkf-soft',
    productName: 'Bar Keepers Friend Soft Cleanser',
    manufacturer: 'Bar Keepers Friend / Servaas Laboratories',
    hazards: ['Causes serious eye damage', 'Skin irritant'],
    hazardSymbols: ['⚠️ Serious Eye Damage', '❗ Skin Irritant'],
    ppe: ['Eye protection REQUIRED', 'Gloves required'],
    firstAid: {
      eyes: 'IMMEDIATELY flush with water for 15–20 minutes. Seek medical attention urgently.',
      skin: 'Wash thoroughly with soap and water.',
      inhaled: 'Move to fresh air.',
      ingested: 'Do not induce vomiting. Seek medical attention immediately.',
    },
    doNotMix: ['Do not mix with bleach or other cleaners'],
    surfaces: 'Porcelain, ceramic, fiberglass tubs and sinks. Rinse thoroughly after use — residue is slippery.',
    storageNotes: 'Store upright at room temperature.',
    supabasePath: null,
  },
  {
    id: 'zep-glass',
    productName: 'Zep Window and Glass Cleaner',
    manufacturer: 'Zep Inc.',
    hazards: ['Pressurized aerosol — keep away from heat', 'Eye and skin irritant', 'Flammable aerosol'],
    hazardSymbols: ['🔥 Flammable', '🔵 Pressurized Container', '❗ Irritant'],
    ppe: ['Eye protection if splashing risk', 'Use in well-ventilated area'],
    firstAid: {
      eyes: 'Flush with water for 15 minutes.',
      skin: 'Wash with soap and water.',
      inhaled: 'Move to fresh air. Seek medical attention if symptoms persist.',
      ingested: 'Seek medical attention immediately.',
    },
    doNotMix: ['Do not mix with other chemicals'],
    surfaces: 'Mirrors, glass windows, chrome, reflective surfaces. Do NOT use on electronic screens.',
    storageNotes: 'Store away from heat, sparks, and open flame. Do not puncture.',
    supabasePath: null,
  },
  {
    id: 'lysol-toilet',
    productName: 'Lysol Toilet Bowl Cleaner',
    manufacturer: 'Reckitt Benckiser',
    hazards: ['CORROSIVE — causes severe skin and eye burns', 'Acid-based product'],
    hazardSymbols: ['🧪 CORROSIVE'],
    ppe: ['Gloves REQUIRED', 'Eye protection REQUIRED'],
    firstAid: {
      eyes: 'IMMEDIATELY flush with water for 15–20 minutes. Seek medical attention immediately.',
      skin: 'IMMEDIATELY wash with large amounts of water. Remove contaminated clothing. Seek medical attention.',
      inhaled: 'Move to fresh air. Seek medical attention if breathing difficulty.',
      ingested: 'Do not induce vomiting. Drink large amounts of water. Seek emergency medical attention.',
    },
    doNotMix: [
      '⛔ NEVER mix with bleach — creates toxic chlorine gas',
      '⛔ NEVER mix with any other cleaning products',
      '⛔ Toilet bowls and urinals ONLY — not for other surfaces',
    ],
    surfaces: 'Toilet bowl and urinal INTERIOR (porcelain/ceramic) ONLY.',
    storageNotes: 'Store in original container away from other chemicals. Keep out of reach of children.',
    supabasePath: null,
  },
  {
    id: 'easyoff-oven',
    productName: 'EasyOff Oven Cleaner',
    manufacturer: 'Reckitt Benckiser',
    hazards: ['HIGHLY CORROSIVE', 'Flammable aerosol', 'Causes severe skin burns and eye damage', 'May cause respiratory irritation'],
    hazardSymbols: ['🧪 CORROSIVE', '🔥 Flammable', '☠️ Toxic if inhaled'],
    ppe: ['Gloves REQUIRED', 'Eye protection REQUIRED', 'Well-ventilated area REQUIRED — open windows/doors', 'Avoid inhaling spray'],
    firstAid: {
      eyes: 'IMMEDIATELY flush with water for 15–20 minutes. Seek emergency medical attention.',
      skin: 'IMMEDIATELY remove contaminated clothing. Wash with large amounts of water. Seek medical attention.',
      inhaled: 'Move to fresh air immediately. Seek emergency medical attention if breathing difficulty.',
      ingested: 'Do not induce vomiting. Seek emergency medical attention immediately.',
    },
    doNotMix: [
      '⛔ Do not mix with any other cleaners',
      '⛔ Do not use on aluminum, tin, or non-oven surfaces',
      '⛔ Do not use in enclosed space without ventilation',
    ],
    surfaces: 'Oven INTERIOR and racks ONLY. Deep clean / commercial use only. Not for regular cleaning.',
    storageNotes: 'Store away from heat, ignition sources. Keep tightly sealed. Store upright.',
    supabasePath: null,
  },
]
