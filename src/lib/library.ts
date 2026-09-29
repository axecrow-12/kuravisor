import libNd from "@/locales/library/nd";
import libSn from "@/locales/library/sn";
import type { Language } from "./store";

/*
 * Offline crop health library. Drives the Crop Doctor symptom checker,
 * treatment plans and the knowledge base. Guidance is general; product
 * choice and rates must always follow the label and local AGRITEX advice.
 */

export interface Crop {
  id: string;
  label: string;
  icon: string;
}

export const CROPS: Crop[] = [
  { id: "maize", label: "Maize", icon: "grass" },
  { id: "tomato", label: "Tomato", icon: "nutrition" },
  { id: "potato", label: "Potato", icon: "egg" },
  { id: "groundnut", label: "Groundnut", icon: "spa" },
  { id: "beans", label: "Beans", icon: "eco" },
  { id: "cabbage", label: "Cabbage", icon: "psychiatry" },
];

export interface Symptom {
  id: string;
  label: string;
}

export const SYMPTOMS: Symptom[] = [
  { id: "chewed", label: "Holes or ragged, chewed leaves" },
  { id: "frass", label: "Sawdust-like droppings in the funnel (whorl)" },
  { id: "caterpillars", label: "Caterpillars or worms on the plant" },
  { id: "windowpane", label: "See-through “windows” eaten in leaves" },
  { id: "insect_clusters", label: "Tiny insects clustered under leaves or on shoots" },
  { id: "sticky", label: "Sticky leaves or black sooty mould" },
  { id: "curled", label: "Curled, twisted or cupped leaves" },
  { id: "yellow_lower", label: "Yellowing that starts on older, lower leaves" },
  { id: "yellow_v", label: "Yellow V shape from the leaf tip along the middle vein" },
  { id: "purple", label: "Purple or reddish leaves on young plants" },
  { id: "edge_scorch", label: "Leaf edges turn yellow then brown and dry" },
  { id: "streaks", label: "Thin, broken yellow streaks along the leaves" },
  { id: "stunted", label: "Plant is small and stunted" },
  { id: "mosaic", label: "Patchy light and dark green (mosaic) leaves" },
  { id: "target_spots", label: "Brown spots with rings like a target" },
  { id: "grey_rectangles", label: "Long grey or tan rectangular spots between veins" },
  { id: "cigar_lesions", label: "Long, cigar-shaped grey-green or tan patches" },
  { id: "water_soaked", label: "Dark, water-soaked patches that spread fast" },
  { id: "white_mould", label: "White fuzzy growth under leaves in wet weather" },
  { id: "round_spots", label: "Small round brown or black spots on leaves" },
  { id: "rust_pustules", label: "Rusty orange-brown powdery bumps on leaves" },
  { id: "mines", label: "Pale winding tunnels or blotches inside leaves" },
  { id: "fruit_holes", label: "Small holes in fruit or tubers" },
  { id: "wilting", label: "Plant wilts even when the soil is moist" },
];

export function symptomLabel(id: string): string {
  return SYMPTOMS.find((s) => s.id === id)?.label ?? id;
}

export type ConditionType = "pest" | "disease" | "nutrient";
export type Severity = "low" | "medium" | "high";

export interface Condition {
  id: string;
  name: string;
  type: ConditionType;
  crops: string[];
  severity: Severity;
  /** How quickly to act, shown on the treatment plan banner. */
  urgency: string;
  summary: string;
  symptoms: string[];
  /** Short action list shown right after a diagnosis. */
  firstSteps: string[];
  chemical?: {
    activeIngredients: string;
    application: string;
    timing: string;
    safety: string;
  };
  organic: { name: string; how: string }[];
  prevention: string[];
}

const SPRAY_SAFETY =
  "Read and follow the product label. Wear gloves, a mask and long sleeves. Do not spray in wind or midday heat, keep away from water sources, and observe the pre-harvest interval on the label.";

export const CONDITIONS: Condition[] = [
  {
    id: "fall-armyworm",
    name: "Fall Armyworm",
    type: "pest",
    crops: ["maize"],
    severity: "high",
    urgency: "Act within 1 to 2 days to limit yield loss",
    summary:
      "A caterpillar that feeds inside the maize funnel (whorl) and later on the cob. Young larvae scrape leaves leaving see-through patches; older larvae chew large ragged holes and leave sawdust-like droppings. Uncontrolled, it can destroy much of a crop.",
    symptoms: ["chewed", "frass", "caterpillars", "windowpane"],
    firstSteps: [
      "Check 10 plants in 5 places across the field to see how many are hit",
      "Crush egg masses and small larvae you can see in the funnel",
      "If more than about 1 in 5 young plants are damaged, treat the field now",
      "Scout again after 3 days",
    ],
    chemical: {
      activeIngredients: "Emamectin benzoate, chlorantraniliprole or spinetoram",
      application: "Direct the spray into the funnel of each plant, early morning or late afternoon",
      timing: "When damage passes the action level; repeat only as the label allows and rotate product groups",
      safety: SPRAY_SAFETY,
    },
    organic: [
      { name: "Ash or sand in the funnel", how: "Put a pinch of fine wood ash or dry sand into each infested funnel to kill and deter young larvae." },
      { name: "Handpicking", how: "On small plots, remove and crush larvae from the funnels early in the morning when they are most active." },
      { name: "Neem extract", how: "Soak crushed neem seeds or leaves in water overnight, strain, and spray into funnels." },
    ],
    prevention: [
      "Plant early, at the start of the rains, so plants outgrow the peak moth period",
      "Scout the field at least once a week while plants are young",
      "Intercrop with legumes such as beans or cowpeas",
      "Keep fields free of grassy weeds that host the pest",
    ],
  },
  {
    id: "maize-streak",
    name: "Maize Streak Virus",
    type: "disease",
    crops: ["maize"],
    severity: "high",
    urgency: "No cure once infected; act now to protect healthy plants",
    summary:
      "A virus spread by small leafhoppers. Leaves show thin, broken yellow streaks running along the veins. Plants infected young stay stunted and produce small or no cobs.",
    symptoms: ["streaks", "stunted", "yellow_lower"],
    firstSteps: [
      "Pull out and destroy badly infected young plants",
      "Control leafhoppers in the field and nearby grass",
      "Note which variety you planted; choose a streak-tolerant one next season",
    ],
    organic: [
      { name: "Roguing", how: "Remove infected plants early so they do not act as a source for leafhoppers to spread the virus." },
    ],
    prevention: [
      "Plant certified maize seed of a streak-tolerant variety",
      "Avoid late planting next to older maize fields",
      "Keep grass weeds around the field short",
    ],
  },
  {
    id: "grey-leaf-spot",
    name: "Grey Leaf Spot",
    type: "disease",
    crops: ["maize"],
    severity: "medium",
    urgency: "Treat within a week if spots reach the leaves above the cob",
    summary:
      "A fungal disease favoured by warm, humid weather and fields planted to maize every year. Long, narrow grey or tan rectangular spots form between the leaf veins, starting on lower leaves.",
    symptoms: ["grey_rectangles", "yellow_lower"],
    firstSteps: [
      "Check whether spots have reached the leaves around and above the cob",
      "If they have before grain fill, a fungicide spray will pay off",
      "Plan to rotate this field away from maize next season",
    ],
    chemical: {
      activeIngredients: "A strobilurin (e.g. azoxystrobin) mixed with a triazole (e.g. propiconazole)",
      application: "Foliar spray covering the ear leaf and leaves above it",
      timing: "Around tasselling if disease is moving up the plant",
      safety: SPRAY_SAFETY,
    },
    organic: [
      { name: "Residue management", how: "After harvest, bury or remove infected maize stover so the fungus does not carry over." },
    ],
    prevention: [
      "Rotate maize with legumes such as groundnut or soya",
      "Plant a tolerant hybrid",
      "Avoid very dense planting that keeps leaves wet",
    ],
  },
  {
    id: "northern-leaf-blight",
    name: "Northern Leaf Blight",
    type: "disease",
    crops: ["maize"],
    severity: "medium",
    urgency: "Monitor closely; treat if it reaches upper leaves before grain fill",
    summary:
      "A fungal disease causing long, cigar-shaped grey-green to tan patches on leaves. It spreads in cool, wet weather and can reduce grain fill when upper leaves are affected.",
    symptoms: ["cigar_lesions", "yellow_lower"],
    firstSteps: [
      "Check how far up the plant the patches have spread",
      "Spray a fungicide if upper leaves are affected before tasselling",
      "Rotate away from maize next season",
    ],
    chemical: {
      activeIngredients: "A strobilurin and triazole mix (e.g. azoxystrobin + propiconazole)",
      application: "Foliar spray covering the upper canopy",
      timing: "At first signs on upper leaves, before or at tasselling",
      safety: SPRAY_SAFETY,
    },
    organic: [
      { name: "Crop hygiene", how: "Bury or remove crop residues after harvest to reduce the fungus for next season." },
    ],
    prevention: ["Plant resistant hybrids", "Rotate with legumes", "Manage residues after harvest"],
  },
  {
    id: "nitrogen-deficiency",
    name: "Nitrogen Deficiency",
    type: "nutrient",
    crops: ["maize", "tomato", "potato", "cabbage", "beans", "groundnut"],
    severity: "medium",
    urgency: "Top dress within a week for best response",
    summary:
      "The plant is not getting enough nitrogen. Older, lower leaves turn pale yellow first; in maize the yellow forms a V from the leaf tip along the midrib. Growth is slow and yields drop.",
    symptoms: ["yellow_lower", "yellow_v", "stunted"],
    firstSteps: [
      "Top dress with a nitrogen fertilizer such as AN or urea at the rate your extension officer recommends",
      "Apply when the soil is moist, placing it near the plant and covering it",
      "Weed the field so crops, not weeds, get the fertilizer",
    ],
    organic: [
      { name: "Manure and compost", how: "Work well-rotted manure or compost into the soil before planting and as a side dressing." },
      { name: "Legume rotation", how: "Grow groundnut, beans or soya before maize to leave nitrogen in the soil." },
    ],
    prevention: [
      "Split nitrogen into two top dressings rather than one",
      "Test soil where possible and add manure every season",
      "Rotate cereals with legumes",
    ],
  },
  {
    id: "phosphorus-deficiency",
    name: "Phosphorus Deficiency",
    type: "nutrient",
    crops: ["maize", "tomato", "beans", "groundnut"],
    severity: "low",
    urgency: "Correct at the next planting; little can be done late in the season",
    summary:
      "Young plants show purple or reddish leaves and grow slowly. It is common in cold, wet or acidic soils and where no basal fertilizer was applied.",
    symptoms: ["purple", "stunted"],
    firstSteps: [
      "Check whether basal fertilizer was applied at planting",
      "Plan to apply a basal compound (e.g. Compound D) at planting next season",
      "Consider liming if your soil is acidic",
    ],
    organic: [
      { name: "Manure at planting", how: "Place well-rotted manure in planting holes or furrows before seeding." },
    ],
    prevention: ["Apply basal fertilizer at planting", "Correct acidic soils with lime", "Add organic matter every season"],
  },
  {
    id: "potassium-deficiency",
    name: "Potassium Deficiency",
    type: "nutrient",
    crops: ["maize", "tomato", "potato", "cabbage"],
    severity: "low",
    urgency: "Correct at the next planting",
    summary:
      "The edges of older leaves turn yellow, then brown and dry, while the centre of the leaf stays green. Stalks can be weak and fruit quality poor.",
    symptoms: ["edge_scorch", "yellow_lower"],
    firstSteps: [
      "Use a basal fertilizer that contains potassium (the K in NPK) next planting",
      "Return crop residues and ash to the soil",
    ],
    organic: [
      { name: "Wood ash", how: "Spread a thin layer of wood ash, which is rich in potassium, and work it into the soil." },
    ],
    prevention: ["Use a balanced NPK basal fertilizer", "Return crop residues to the field"],
  },
  {
    id: "early-blight",
    name: "Early Blight",
    type: "disease",
    crops: ["tomato", "potato"],
    severity: "medium",
    urgency: "Start treatment within a few days",
    summary:
      "A fungal disease that forms brown spots with rings like a target, starting on older, lower leaves which then turn yellow and drop. It spreads in warm weather with dew or rain.",
    symptoms: ["target_spots", "yellow_lower"],
    firstSteps: [
      "Remove and destroy the lowest infected leaves",
      "Spray a protective fungicide, covering both sides of the leaves",
      "Water at the base of plants, not over the leaves",
    ],
    chemical: {
      activeIngredients: "Mancozeb, chlorothalonil or copper oxychloride",
      application: "Foliar spray with good coverage of lower leaves",
      timing: "At first spots, then at the interval on the label during wet weather",
      safety: SPRAY_SAFETY,
    },
    organic: [
      { name: "Leaf removal and mulch", how: "Remove the lowest leaves and mulch the soil so rain does not splash spores up onto plants." },
      { name: "Copper spray", how: "Copper-based products are allowed in many organic systems; follow the label." },
    ],
    prevention: [
      "Rotate tomatoes and potatoes with non-related crops for 2 to 3 years",
      "Stake plants and space them for airflow",
      "Use drip or furrow irrigation instead of overhead watering",
    ],
  },
  {
    id: "late-blight",
    name: "Late Blight",
    type: "disease",
    crops: ["tomato", "potato"],
    severity: "high",
    urgency: "Act today; it can destroy a field within days in wet weather",
    summary:
      "A fast-spreading disease in cool, wet weather. Dark, water-soaked patches appear on leaves and stems, often with white fuzzy growth underneath. Fruit and tubers rot.",
    symptoms: ["water_soaked", "white_mould", "wilting"],
    firstSteps: [
      "Remove and destroy infected plants away from the field (do not compost)",
      "Spray the rest of the crop with a suitable fungicide straight away",
      "Keep checking daily while the weather stays wet",
    ],
    chemical: {
      activeIngredients: "Metalaxyl + mancozeb, or cymoxanil + mancozeb; mancozeb alone as a protectant",
      application: "Foliar spray with full coverage, including stems",
      timing: "Immediately, then at label intervals during wet, cool weather",
      safety: SPRAY_SAFETY,
    },
    organic: [
      { name: "Destroy infected plants", how: "Uproot, bag or burn infected plants to slow the spread to healthy ones." },
    ],
    prevention: [
      "Use certified disease-free seed potatoes",
      "Space and stake plants so leaves dry quickly",
      "Avoid overhead watering in the evening",
    ],
  },
  {
    id: "tuta-absoluta",
    name: "Tomato Leaf Miner (Tuta absoluta)",
    type: "pest",
    crops: ["tomato"],
    severity: "high",
    urgency: "Act within days; populations build up very quickly",
    summary:
      "A small moth whose larvae tunnel inside tomato leaves, making pale blotches, and bore into fruit, leaving small holes. Heavy attacks can wipe out a tomato crop.",
    symptoms: ["mines", "fruit_holes", "chewed"],
    firstSteps: [
      "Pick and destroy mined leaves and damaged fruit",
      "Set pheromone or water traps to monitor and catch moths",
      "Spray a registered insecticide if damage is spreading",
    ],
    chemical: {
      activeIngredients: "Spinosad, chlorantraniliprole, emamectin benzoate or indoxacarb",
      application: "Foliar spray; rotate between product groups to avoid resistance",
      timing: "When mines are first seen and moth catches rise",
      safety: SPRAY_SAFETY,
    },
    organic: [
      { name: "Traps", how: "Use pheromone traps, or a basin of soapy water with a light above it at night, to catch adult moths." },
      { name: "Sanitation", how: "Remove and bury infested leaves and fruit deeply, or seal them in a bag in the sun." },
    ],
    prevention: [
      "Start with clean, pest-free seedlings",
      "Remove old tomato crops and volunteer plants promptly after harvest",
      "Avoid planting tomatoes next to an infested field",
    ],
  },
  {
    id: "aphids",
    name: "Aphids",
    type: "pest",
    crops: ["cabbage", "beans", "groundnut", "tomato", "potato"],
    severity: "medium",
    urgency: "Treat within a week, sooner if plants are young",
    summary:
      "Small soft-bodied insects that cluster under leaves and on young shoots, sucking sap. Leaves curl and become sticky with honeydew, which grows black sooty mould. Aphids also spread viruses.",
    symptoms: ["insect_clusters", "sticky", "curled", "stunted"],
    firstSteps: [
      "Check undersides of leaves and growing tips",
      "Wash off small colonies with a strong jet of water or soapy water",
      "Spray a registered insecticide only if colonies keep spreading",
    ],
    chemical: {
      activeIngredients: "Acetamiprid, imidacloprid or lambda-cyhalothrin (follow label)",
      application: "Foliar spray reaching the underside of leaves",
      timing: "When colonies are spreading; avoid spraying flowering crops when bees are active",
      safety: SPRAY_SAFETY,
    },
    organic: [
      { name: "Soap spray", how: "Mix about 1 tablespoon of liquid soap in 1 litre of water and spray the undersides of leaves." },
      { name: "Garlic and chilli spray", how: "Soak crushed garlic and chilli in water overnight, strain, add a little soap and spray." },
      { name: "Natural enemies", how: "Ladybirds and lacewings eat aphids; avoid broad-spectrum sprays that kill them." },
    ],
    prevention: [
      "Avoid excess nitrogen fertilizer, which produces soft growth aphids love",
      "Remove weeds that host aphids",
      "Plant flowers nearby to attract natural enemies",
    ],
  },
  {
    id: "diamondback-moth",
    name: "Diamondback Moth",
    type: "pest",
    crops: ["cabbage"],
    severity: "high",
    urgency: "Act within a few days",
    summary:
      "The main pest of cabbage and other brassicas. Small green caterpillars eat the underside of leaves leaving see-through “windows”, then holes. Heavy attacks ruin heads.",
    symptoms: ["windowpane", "chewed", "caterpillars"],
    firstSteps: [
      "Check the undersides of outer leaves for small green caterpillars",
      "Spray a Bt (Bacillus thuringiensis) product or other registered insecticide",
      "Rotate insecticide groups; this pest quickly becomes resistant",
    ],
    chemical: {
      activeIngredients: "Bacillus thuringiensis (Bt), spinosad, emamectin benzoate or chlorantraniliprole",
      application: "Spray under leaves in the late afternoon",
      timing: "When larvae are young; repeat at label intervals, rotating groups",
      safety: SPRAY_SAFETY,
    },
    organic: [
      { name: "Bt spray", how: "Bt is a natural bacterium that only affects caterpillars and is safe for people and bees." },
      { name: "Handpicking", how: "Remove caterpillars and eggs on small plots every few days." },
    ],
    prevention: [
      "Do not plant brassicas all year round in the same place",
      "Destroy crop remains after harvest",
      "Use overhead irrigation in dry weather, which washes off young larvae",
    ],
  },
  {
    id: "groundnut-leaf-spot",
    name: "Groundnut Leaf Spot",
    type: "disease",
    crops: ["groundnut"],
    severity: "medium",
    urgency: "Start sprays within a week of first spots",
    summary:
      "Early and late leaf spot are fungal diseases that cause round brown to black spots on groundnut leaves. Leaves drop early, which lowers pod yield.",
    symptoms: ["round_spots", "yellow_lower"],
    firstSteps: [
      "Confirm spots on lower leaves across several plants",
      "Begin fungicide sprays and continue at label intervals",
      "Plan rotation away from groundnut next season",
    ],
    chemical: {
      activeIngredients: "Chlorothalonil, mancozeb, or a triazole such as tebuconazole",
      application: "Foliar spray with full canopy coverage",
      timing: "From first spots, then every 10 to 14 days in wet weather",
      safety: SPRAY_SAFETY,
    },
    organic: [
      { name: "Rotation and hygiene", how: "Rotate with cereals and remove volunteer groundnut plants." },
    ],
    prevention: ["Rotate groundnut with maize or other cereals", "Plant tolerant varieties", "Plant at the recommended time"],
  },
  {
    id: "groundnut-rosette",
    name: "Groundnut Rosette",
    type: "disease",
    crops: ["groundnut"],
    severity: "high",
    urgency: "No cure; remove infected plants and protect the rest",
    summary:
      "A virus disease spread by aphids. Plants are severely stunted and bushy with small, mottled or yellow leaves. Infected young plants produce few or no pods.",
    symptoms: ["stunted", "mosaic", "insect_clusters"],
    firstSteps: [
      "Pull out and destroy infected plants early",
      "Control aphids on the remaining crop",
      "Note infected areas and choose a resistant variety next season",
    ],
    organic: [
      { name: "Dense early planting", how: "Plant early and at recommended close spacing; aphids are less attracted to a dense, full canopy." },
    ],
    prevention: ["Plant rosette-resistant varieties", "Plant early in the season", "Use recommended close spacing"],
  },
  {
    id: "bean-rust",
    name: "Bean Rust",
    type: "disease",
    crops: ["beans"],
    severity: "medium",
    urgency: "Treat within a week if spreading",
    summary:
      "A fungal disease that forms small rusty orange-brown powdery bumps, mostly on the underside of leaves. Heavy infection causes leaves to yellow and drop early.",
    symptoms: ["rust_pustules", "yellow_lower"],
    firstSteps: [
      "Check undersides of leaves for rusty powder that rubs off on your finger",
      "Spray a suitable fungicide if more than a few leaves are affected",
    ],
    chemical: {
      activeIngredients: "Mancozeb, or a triazole such as tebuconazole",
      application: "Foliar spray covering both sides of leaves",
      timing: "At first signs, repeat at label intervals",
      safety: SPRAY_SAFETY,
    },
    organic: [{ name: "Remove infected leaves", how: "Pick off the worst leaves and avoid working in the crop when it is wet." }],
    prevention: ["Plant resistant varieties", "Rotate beans with cereals", "Destroy crop residues after harvest"],
  },
];

export function getCondition(id: string): Condition | undefined {
  return CONDITIONS.find((c) => c.id === id);
}

/** Symptoms worth asking about for a crop (those used by its conditions). */
export function symptomsForCrop(cropId: string): Symptom[] {
  const ids = new Set(
    CONDITIONS.filter((c) => c.crops.includes(cropId)).flatMap((c) => c.symptoms),
  );
  return SYMPTOMS.filter((s) => ids.has(s.id));
}

/**
 * Ranks conditions for a crop by symptom overlap (Jaccard similarity, so
 * picking unrelated symptoms lowers a match). Returns the best three.
 */
export function diagnose(cropId: string, symptomIds: string[]) {
  if (symptomIds.length === 0) return [];
  const picked = new Set(symptomIds);
  return CONDITIONS.filter((c) => c.crops.includes(cropId))
    .map((c) => {
      const hits = c.symptoms.filter((s) => picked.has(s)).length;
      const union = new Set([...c.symptoms, ...symptomIds]).size;
      return { id: c.id, score: union ? hits / union : 0 };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export interface Guide {
  id: string;
  title: string;
  icon: string;
  summary: string;
  sections: { heading: string; points: string[] }[];
}

export const GUIDES: Guide[] = [
  {
    id: "pfumvudza",
    title: "Pfumvudza/Intwasa Planting",
    icon: "agriculture",
    summary:
      "Conservation agriculture on a small plot: planting stations, mulch and no ploughing to get more from less land and rain.",
    sections: [
      {
        heading: "Prepare the plot",
        points: [
          "Clear weeds without ploughing; keep crop residues as mulch",
          "Mark rows about 75 cm apart and stations about 60 cm apart along each row",
          "Dig planting holes about 15 cm wide, long and deep before the rains",
        ],
      },
      {
        heading: "Plant",
        points: [
          "Put manure or basal fertilizer in each hole and cover lightly with soil",
          "Plant after good rains, at the seed rate advised by AGRITEX",
          "Cover the soil between stations with mulch such as grass or stover",
        ],
      },
      {
        heading: "Look after the crop",
        points: [
          "Keep the plot weed-free, especially in the first six weeks",
          "Top dress with nitrogen fertilizer at the right stage",
          "Scout weekly for pests such as fall armyworm",
        ],
      },
    ],
  },
  {
    id: "crop-rotation",
    title: "Crop Rotation",
    icon: "autorenew",
    summary:
      "Changing crops on each plot every season breaks pest and disease cycles and lets legumes feed the soil.",
    sections: [
      {
        heading: "Why rotate",
        points: [
          "Diseases like grey leaf spot build up when maize follows maize",
          "Legumes such as groundnut, beans and soya add nitrogen to the soil",
          "Different root depths use nutrients from different soil layers",
        ],
      },
      {
        heading: "A simple plan",
        points: [
          "Season 1: maize (cereal)",
          "Season 2: groundnut, soya or beans (legume)",
          "Season 3: a vegetable or a different cereal, then repeat",
          "Keep tomato, potato and pepper off the same plot for 2 to 3 years",
        ],
      },
    ],
  },
  {
    id: "scouting",
    title: "Scouting Your Field",
    icon: "search",
    summary:
      "A weekly walk through the field catches pests and diseases early, when they are cheap to control.",
    sections: [
      {
        heading: "How to scout",
        points: [
          "Walk the field in a W pattern so you cover all parts",
          "Stop at 5 places and check 10 plants at each",
          "Look at the funnel, both sides of the leaves, stems and fruit",
          "Record what you find in KuraVisor with a Crop Doctor scan",
        ],
      },
      {
        heading: "Decide on action",
        points: [
          "Count how many of the 50 plants are affected",
          "Act when damage passes the level advised for that pest",
          "Scout again a few days after any treatment to check it worked",
        ],
      },
    ],
  },
  {
    id: "safe-spraying",
    title: "Safe Pesticide Use",
    icon: "health_and_safety",
    summary: "Protect yourself, your family and your buyers when you use crop chemicals.",
    sections: [
      {
        heading: "Before spraying",
        points: [
          "Read the label: crop, pest, rate and pre-harvest interval",
          "Wear gloves, a mask, boots and long sleeves",
          "Check your sprayer for leaks and calibrate it with water",
        ],
      },
      {
        heading: "While spraying",
        points: [
          "Spray in the cool of the morning or evening when there is little wind",
          "Never eat, drink or smoke while handling chemicals",
          "Keep children and animals away",
        ],
      },
      {
        heading: "After spraying",
        points: [
          "Wash yourself and your clothes separately",
          "Triple-rinse empty containers and never reuse them for food or water",
          "Store chemicals locked away from food and children",
        ],
      },
    ],
  },
  {
    id: "post-harvest",
    title: "Post-Harvest Handling & Storage",
    icon: "warehouse",
    summary:
      "Good drying, sorting and storage cut losses and prevent aflatoxin, a poison produced by moulds on maize and groundnuts.",
    sections: [
      {
        heading: "Drying and sorting",
        points: [
          "Dry grain well before storage; it should crack cleanly when bitten",
          "Dry on tarpaulins, not bare soil",
          "Sort out mouldy, broken or insect-damaged grain and pods",
        ],
      },
      {
        heading: "Storage",
        points: [
          "Clean the store and remove old grain before the new harvest",
          "Use hermetic (airtight) bags or treated grain where possible",
          "Keep bags off the floor on pallets and away from walls",
          "Check stored grain every few weeks for insects and moulds",
        ],
      },
    ],
  },
];

export function getGuide(id: string): Guide | undefined {
  return GUIDES.find((g) => g.id === id);
}

export const TIPS = [
  "Check the undersides of leaves for armyworm eggs. Early manual removal can prevent large infestations without chemicals.",
  "Split your nitrogen top dressing into two applications. Plants use it better and less is washed away by heavy rain.",
  "Walk your field in a W pattern once a week. Checking 50 plants gives a fair picture of the whole field.",
  "Rotate maize with a legume such as groundnut or soya to add nitrogen and break disease cycles.",
  "Spray in the cool of the morning or evening. Chemicals work better and drift less when there is little wind.",
  "Mulch keeps soil moist for longer and stops rain splashing disease spores onto lower leaves.",
  "Dry grain on a tarpaulin, not bare soil. It stays cleaner and dries more evenly.",
  "Record every expense, even small ones. Knowing your cost per kg shows which crops really pay.",
  "Keep tomatoes and potatoes off the same plot for two to three years to reduce blight.",
  "Plant at the start of the rains. Early crops are usually less damaged by fall armyworm.",
];

export function tipOfTheDay(lang: Language = "en"): string {
  const start = new Date(new Date().getFullYear(), 0, 0).getTime();
  const day = Math.floor((Date.now() - start) / 86_400_000);
  const i = day % TIPS.length;
  return TRANSLATIONS[lang]?.tips[i] ?? TIPS[i];
}

/*
 * Translations of the library. English above is the source; sn and nd
 * files mirror its structure. Chemical active ingredients, product names
 * and numbers are never translated. Any missing text, or a list whose
 * length differs from the English one, falls back to English so steps can
 * never be misaligned.
 */

export interface ConditionText {
  name: string;
  urgency: string;
  summary: string;
  firstSteps: string[];
  chemical?: { application: string; timing: string };
  organic: { name: string; how: string }[];
  prevention: string[];
}

export interface GuideText {
  title: string;
  summary: string;
  sections: { heading: string; points: string[] }[];
}

export interface LibraryText {
  spraySafety: string;
  symptoms: Record<string, string>;
  conditions: Record<string, ConditionText>;
  guides: Record<string, GuideText>;
  tips: string[];
}

const TRANSLATIONS: Partial<Record<Language, LibraryText>> = { sn: libSn, nd: libNd };

/** Same length as the English list, or the English list. */
function sameShape<T>(translated: T[] | undefined, english: T[]): T[] {
  return translated && translated.length === english.length ? translated : english;
}

export function localizeSymptom(id: string, lang: Language): string {
  return TRANSLATIONS[lang]?.symptoms[id] ?? symptomLabel(id);
}

export function localizeCondition(c: Condition, lang: Language): Condition {
  const lib = TRANSLATIONS[lang];
  const tr = lib?.conditions[c.id];
  if (!lib || !tr) return c;
  return {
    ...c,
    name: tr.name,
    urgency: tr.urgency,
    summary: tr.summary,
    firstSteps: sameShape(tr.firstSteps, c.firstSteps),
    chemical: c.chemical && {
      ...c.chemical,
      application: tr.chemical?.application ?? c.chemical.application,
      timing: tr.chemical?.timing ?? c.chemical.timing,
      safety: lib.spraySafety,
    },
    organic: sameShape(tr.organic, c.organic),
    prevention: sameShape(tr.prevention, c.prevention),
  };
}

export function localizeGuide(g: Guide, lang: Language): Guide {
  const tr = TRANSLATIONS[lang]?.guides[g.id];
  if (!tr) return g;
  const sections = sameShape(tr.sections, g.sections).map((sec, i) =>
    sec === g.sections[i] ? sec : { heading: sec.heading, points: sameShape(sec.points, g.sections[i].points) },
  );
  return { ...g, title: tr.title, summary: tr.summary, sections };
}

/** Lists what a language is missing, for checking new translations. */
export function missingTranslations(lang: Language): string[] {
  const lib = TRANSLATIONS[lang];
  if (!lib) return lang === "en" ? [] : ["everything"];
  const missing: string[] = [];
  for (const s of SYMPTOMS) if (!lib.symptoms[s.id]) missing.push(`symptom ${s.id}`);
  for (const c of CONDITIONS) {
    const tr = lib.conditions[c.id];
    if (!tr) {
      missing.push(`condition ${c.id}`);
      continue;
    }
    if (tr.firstSteps.length !== c.firstSteps.length) missing.push(`${c.id}.firstSteps length`);
    if (tr.organic.length !== c.organic.length) missing.push(`${c.id}.organic length`);
    if (tr.prevention.length !== c.prevention.length) missing.push(`${c.id}.prevention length`);
    if (!!tr.chemical !== !!c.chemical) missing.push(`${c.id}.chemical`);
  }
  for (const g of GUIDES) {
    const tr = lib.guides[g.id];
    if (!tr) {
      missing.push(`guide ${g.id}`);
      continue;
    }
    if (tr.sections.length !== g.sections.length) missing.push(`${g.id}.sections length`);
    tr.sections.forEach((sec, i) => {
      if (g.sections[i] && sec.points.length !== g.sections[i].points.length)
        missing.push(`${g.id}.sections[${i}].points length`);
    });
  }
  if (lib.tips.length !== TIPS.length) missing.push("tips length");
  return missing;
}
