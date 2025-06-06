export const lineItems = [
  { name: "UL_Midwest_FamilyAnim", content: "Family Animation", geo: "Midwest", device: "CTV", audience: "HomeLife Optimizers", bid: "$36", cap: "$8,000", freq: "3/day" },
  { name: "UL_ExclNY_Lifestyle", content: "Lifestyle/Reality", geo: "US excl. NYC/SF", device: "CTV", audience: "HomeLife Optimizers", bid: "$30", cap: "$6,000", freq: "2/day" },
  { name: "UL_South_Reality", content: "Reality Shows", geo: "South", device: "CTV", audience: "Budget Shoppers", bid: "$28", cap: "$5,000", freq: "2/day" },
  { name: "UL_Northwest_Kids", content: "Kids Content", geo: "Northwest", device: "Mobile", audience: "Parents with Young Kids", bid: "$34", cap: "$7,500", freq: "3/day" },
  { name: "UL_Nationwide_News", content: "News", geo: "Nationwide", device: "CTV", audience: "News Watchers", bid: "$40", cap: "$10,000", freq: "1/day" }
];

export const isConfirmation = (text) => [
  "Campaign parameters identified.",
  "Historical patterns retrieved.",
  "Pricing insights gathered.",
  "Audience definition synthesized.",
  "Line items successfully constructed."
].includes(text);

export const samplePrompts = [
    "Setup a June awareness campaign for Unilever with $250K",
    "Create a custom audience for a P&G household campaign",
    "Help me choose CTV bid prices for a pharma brand avoiding Tier 1 cities"
];

export const reasoningSteps = [
    `1. **Parse campaign intent from user prompt (advertiser, budget, objective)**\nDetected brand: Unilever\nDetected goal: awareness\nDetected budget: $250K`,
    `2. **Retrieve historical buying patterns using advertiser-specific LLM**\nPast behavior shows preference for Family/Reality content\nCTV-only execution, avoidance of Tier 1 urban DMAs`,
    `3. **Query yield management system for optimal pricing and inventory by content, geo, device**\nFloor CPMs: Family Animation = $32, Reality = $28\nRegional savings in Midwest: ~15% below national`,
    `4. **Synthesize Custom Audience Definition**\nSegment: HomeLife Optimizers\nTraits: Parents w/ young kids, retail shopping behavior, clean home intent, CTV-first`,
    `5. **Build executable ad server line items to match above constraints**`
]; 