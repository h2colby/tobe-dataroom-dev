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
  region: Region;
  notes?: string;
  timeline?: string;
}

export const opportunities: Opportunity[] = [
  {
    id: 'cardinal',
    codename: 'CARDINAL',
    location: 'Broken Arrow, OK',
    status: 'contracted',
    sector: 'Industrial R&D',
    region: 'oklahoma',
    timeline: 'Q2 2026',
    notes: 'First commercial deployment. Strategic partner.',
  },
  {
    id: 'transit',
    codename: 'TRANSIT',
    location: 'Portland, OR',
    status: 'quoting',
    value: '$19M',
    capacity: '500 kg/day',
    sector: 'Transit / FCEB',
    region: 'northwest',
    notes: '14-bus fuel cell pilot. Buy America compliant.',
  },
  {
    id: 'refinery',
    codename: 'REFINERY',
    location: 'Tulsa, OK',
    status: 'loi',
    value: '$8.2M',
    capacity: '500 kg/day',
    sector: 'Specialty Chemicals',
    region: 'oklahoma',
    notes: '3-year offtake @ $15/kg',
  },
  {
    id: 'forge-steel',
    codename: 'FORGE-STEEL',
    location: 'Bethlehem, PA',
    status: 'quoting',
    value: '$7M → $49M',
    sector: 'Steel / Industrial',
    region: 'northeast',
    notes: '7 sites potential. Converting from liquid H2.',
  },
  {
    id: 'phoenix',
    codename: 'PHOENIX',
    location: 'Los Angeles, CA',
    status: 'quoting',
    value: '$6-9M',
    capacity: '1,250 kg/day',
    sector: 'E-Fuels',
    region: 'west',
    notes: '10× T-125 skids. Scale to 50 units.',
  },
  {
    id: 'forge',
    codename: 'FORGE',
    location: 'Sand Springs, OK',
    status: 'loi',
    value: '$3.6M',
    capacity: '133 kg/day',
    sector: 'Combustion Systems',
    region: 'oklahoma',
    notes: '3-year offtake @ $25/kg',
  },
  {
    id: 'horizon',
    codename: 'HORIZON',
    location: 'Texas',
    status: 'loi',
    value: '$2-3M',
    capacity: '250 kg/day',
    sector: 'Mobility / Fueling',
    region: 'south',
    notes: '10× T-25 fleet fueling stations.',
  },
  {
    id: 'campus',
    codename: 'CAMPUS',
    location: 'Tulsa, OK',
    status: 'loi',
    value: '$691K',
    capacity: '32 kg/day',
    sector: 'Academic / Research',
    region: 'oklahoma',
    notes: '3-year offtake @ $20/kg. Currently paying $105/kg.',
  },
  {
    id: 'vault',
    codename: 'VAULT',
    location: 'Utah',
    status: 'quoting',
    value: '$172K',
    sector: 'Industrial',
    region: 'mountain',
    notes: 'Facility visit pending.',
  },
  {
    id: 'europa',
    codename: 'EUROPA',
    location: 'Germany 🇩🇪',
    status: 'interest',
    value: '$168K',
    sector: 'International',
    region: 'international',
    notes: 'Website quote request. H2 Core Systems.',
  },
  {
    id: 'titan',
    codename: 'TITAN',
    location: 'Houston, TX',
    status: 'interest',
    sector: 'EPC / Infrastructure',
    region: 'south',
    notes: 'Major global EPC. Greentown Labs intro.',
  },
  {
    id: 'scholar',
    codename: 'SCHOLAR',
    location: 'Tulsa, OK',
    status: 'interest',
    sector: 'Academic',
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
  opportunities: 12,
};
