export type OpportunityStatus = 'contracted' | 'loi' | 'quoting' | 'interest';
export type Region = 'oklahoma' | 'west' | 'south' | 'northeast' | 'northwest' | 'mountain' | 'international';

export interface Opportunity {
  id: string;
  codename: string;
  location: string;
  status: OpportunityStatus;
  value?: string;
  capacity?: string;
  sector: string;
  vertical: string;
  region: Region;
  notes?: string;
  timeline?: string;
  realName?: string;
  kgPerDay?: number;
  pricePerKg?: number;
  contractTerm?: string;
  annualRevenue?: string;
  grossMargin?: number;
}

export const opportunities: Opportunity[] = [
  {
    id: 'showroom',
    codename: 'SHOWROOM',
    location: 'Oklahoma',
    status: 'contracted',
    value: '$250K',
    capacity: '50 kW',
    sector: 'Internal Demo',
    vertical: 'Internal',
    region: 'oklahoma',
    timeline: 'Q2 2026',
    notes: '50kW containerized showroom unit. Active build.',
  },
  {
    id: 'cardinal',
    codename: 'CARDINAL',
    location: 'Oklahoma',
    status: 'contracted',
    sector: 'Industrial R&D',
    vertical: 'Industrial',
    region: 'oklahoma',
    timeline: 'Q2 2026',
    notes: 'First commercial deployment. Strategic partner.',
    realName: 'Zeeco',
    kgPerDay: 50,
    pricePerKg: 30,
    contractTerm: '3-year',
    annualRevenue: '$547K',
  },
  {
    id: 'transit',
    codename: 'TRANSIT',
    location: 'Oregon',
    status: 'quoting',
    value: '$19M',
    capacity: '500 kg/day',
    sector: 'Transit / FCEB',
    vertical: 'Transit',
    region: 'northwest',
    notes: '14-bus fuel cell pilot. Buy America compliant.',
  },
  {
    id: 'refinery',
    codename: 'REFINERY',
    location: 'Oklahoma',
    status: 'loi',
    value: '$8.2M',
    capacity: '500 kg/day',
    sector: 'Specialty Chemicals',
    vertical: 'Chemicals',
    region: 'oklahoma',
    notes: '3-year offtake @ $15/kg',
    realName: 'Regional Refiner',
    kgPerDay: 500,
    pricePerKg: 15,
    contractTerm: '3-year',
    annualRevenue: '$2.74M',
    grossMargin: 87,
  },
  {
    id: 'forge-steel',
    codename: 'FORGE-STEEL',
    location: '7 States',
    status: 'quoting',
    value: '$7M → $49M',
    sector: 'Steel Mills',
    vertical: 'Steel',
    region: 'northeast',
    notes: '7 sites across multiple states. Converting from liquid H2.',
  },
  {
    id: 'phoenix',
    codename: 'PHOENIX',
    location: 'California',
    status: 'quoting',
    value: '$6-9M',
    capacity: '1,250 kg/day',
    sector: 'E-Fuels Production',
    vertical: 'E-Fuels',
    region: 'west',
    notes: '10× T-125 skids. Scale to 50 units.',
  },
  {
    id: 'forge',
    codename: 'FORGE',
    location: 'Oklahoma',
    status: 'loi',
    value: '$3.6M',
    capacity: '133 kg/day',
    sector: 'Combustion R&D',
    vertical: 'Industrial',
    region: 'oklahoma',
    notes: '3-year offtake @ $25/kg',
    realName: 'Combustion R&D Partner',
    kgPerDay: 133,
    pricePerKg: 25,
    contractTerm: '3-year',
    annualRevenue: '$1.21M',
    grossMargin: 92,
  },
  {
    id: 'horizon',
    codename: 'HORIZON',
    location: 'Texas',
    status: 'loi',
    value: '$2-3M',
    capacity: '250 kg/day',
    sector: 'Fleet Fueling',
    vertical: 'Mobility',
    region: 'south',
    notes: '10× T-25 fleet fueling stations.',
  },
  {
    id: 'campus',
    codename: 'CAMPUS',
    location: 'Oklahoma',
    status: 'loi',
    value: '$691K',
    capacity: '32 kg/day',
    sector: 'University Research',
    vertical: 'Academic',
    region: 'oklahoma',
    notes: '3-year offtake @ $20/kg. Currently paying $105/kg.',
    realName: 'State University',
    kgPerDay: 32,
    pricePerKg: 20,
    contractTerm: '3-year',
    annualRevenue: '$230K',
    grossMargin: 90,
  },
  {
    id: 'vault',
    codename: 'VAULT',
    location: 'Utah',
    status: 'quoting',
    value: '$172K',
    sector: 'Industrial Operations',
    vertical: 'Industrial',
    region: 'mountain',
    notes: 'Facility visit pending.',
  },
  {
    id: 'europa',
    codename: 'EUROPA',
    location: 'Germany 🇩🇪',
    status: 'interest',
    value: '$168K',
    sector: 'International Distribution',
    vertical: 'International',
    region: 'international',
    notes: 'Website quote request. European distributor.',
  },
  {
    id: 'titan',
    codename: 'TITAN',
    location: 'Texas',
    status: 'interest',
    sector: 'EPC / Infrastructure',
    vertical: 'EPC',
    region: 'south',
    notes: 'Major global EPC. Cleantech accelerator intro.',
  },
  {
    id: 'scholar',
    codename: 'SCHOLAR',
    location: 'Oklahoma',
    status: 'interest',
    sector: 'Faculty Research',
    vertical: 'Academic',
    region: 'oklahoma',
    notes: 'Faculty sabbatical collaboration.',
  },
];

export const statusColors: Record<OpportunityStatus, string> = {
  contracted: '#00ff88',
  loi: '#ff6b35',
  quoting: '#ffcc00',
  interest: '#00d4ff',
};

export const statusLabels: Record<OpportunityStatus, string> = {
  contracted: 'CONTRACTED',
  loi: 'LOI SIGNED',
  quoting: 'ACTIVE QUOTE',
  interest: 'INTEREST',
};

export const pipelineStats = {
  totalPipeline: '$100M+',
  activeQuotes: '$32M',
  opportunities: 13,
  signedCapacity: '2,165 kg/day',
  sectors: 7,
  regions: 5,
};
