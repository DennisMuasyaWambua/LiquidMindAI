export type Product = {
  name: string;
  type: 'Software' | 'Service';
  status: 'Active' | 'Inactive';
};

export type Payment = {
  id: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Due' | 'Overdue';
};

export type Issue = {
  id: string;
  summary: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  reportedDate: string;
  priority: 'High' | 'Medium' | 'Low';
};

export type Client = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
  role: string;
  renewalDate: string;
  contractValue: number;
  riskScore: number; // 0-100
  products: Product[];
  paymentHistory: Payment[];
  issues: Issue[];
};

export const clients: Client[] = [
  {
    id: '1',
    name: 'Innovate Corp',
    email: 'contact@innovatecorp.com',
    avatar: 'https://picsum.photos/seed/innovate/100/100',
    company: 'Innovate Corp',
    role: 'Tech Solutions',
    renewalDate: '2024-10-15',
    contractValue: 75000,
    riskScore: 25,
    products: [
      { name: 'QuantumDB', type: 'Software', status: 'Active' },
      { name: 'Analytics Suite', type: 'Software', status: 'Active' },
    ],
    paymentHistory: [
      { id: 'pay_1', amount: 6250, date: '2024-07-01', status: 'Paid' },
      { id: 'pay_2', amount: 6250, date: '2024-06-01', status: 'Paid' },
    ],
    issues: [
      { id: 'iss_1', summary: 'API latency spikes', status: 'Resolved', reportedDate: '2024-06-20', priority: 'High' },
    ],
  },
  {
    id: '2',
    name: 'Synergy Ltd',
    email: 'ceo@synergyltd.com',
    avatar: 'https://picsum.photos/seed/synergy/100/100',
    company: 'Synergy Ltd',
    role: 'Logistics',
    renewalDate: '2024-08-22',
    contractValue: 50000,
    riskScore: 85,
    products: [
      { name: 'FleetManager Pro', type: 'Software', status: 'Active' },
    ],
    paymentHistory: [
      { id: 'pay_3', amount: 4166, date: '2024-07-05', status: 'Paid' },
      { id: 'pay_4', amount: 4166, date: '2024-06-05', status: 'Overdue' },
    ],
    issues: [
      { id: 'iss_2', summary: 'GPS tracking inaccurate', status: 'In Progress', reportedDate: '2024-07-10', priority: 'High' },
      { id: 'iss_3', summary: 'Login issues on mobile', status: 'Open', reportedDate: '2024-07-18', priority: 'Medium' },
    ],
  },
  {
    id: '3',
    name: 'Apex Industries',
    email: 'ops@apexind.com',
    avatar: 'https://picsum.photos/seed/apex/100/100',
    company: 'Apex Industries',
    role: 'Manufacturing',
    renewalDate: '2025-01-30',
    contractValue: 120000,
    riskScore: 10,
    products: [
      { name: 'SupplyChain OS', type: 'Software', status: 'Active' },
      { name: 'Factory-AI', type: 'Software', status: 'Active' },
      { name: 'Premium Support', type: 'Service', status: 'Active' },
    ],
    paymentHistory: [
      { id: 'pay_5', amount: 10000, date: '2024-07-15', status: 'Paid' },
    ],
    issues: [],
  },
  {
    id: '4',
    name: 'NextGen Retail',
    email: 'pm@nextgenretail.io',
    avatar: 'https://picsum.photos/seed/nextgen/100/100',
    company: 'NextGen Retail',
    role: 'E-commerce',
    renewalDate: '2024-09-05',
    contractValue: 45000,
    riskScore: 60,
    products: [
      { name: 'Commerce-Flow', type: 'Software', status: 'Active' },
    ],
    paymentHistory: [
      { id: 'pay_6', amount: 3750, date: '2024-07-10', status: 'Paid' },
    ],
    issues: [
      { id: 'iss_4', summary: 'Search functionality slow', status: 'Open', reportedDate: '2024-07-22', priority: 'Low' },
    ],
  },
  {
    id: '5',
    name: 'HealthFirst Group',
    email: 'admin@healthfirst.org',
    avatar: 'https://picsum.photos/seed/healthfirst/100/100',
    company: 'HealthFirst Group',
    role: 'Healthcare',
    renewalDate: '2024-11-20',
    contractValue: 250000,
    riskScore: 15,
    products: [
      { name: 'PatientRecord Secure', type: 'Software', status: 'Active' },
      { name: 'Compliance Reporting', type: 'Service', status: 'Active' },
    ],
    paymentHistory: [
      { id: 'pay_7', amount: 20833, date: '2024-07-01', status: 'Paid' },
    ],
    issues: [],
  },
];

export const financialData = {
  revenue: [
    { month: 'Jan', revenue: 150500 },
    { month: 'Feb', revenue: 145300 },
    { month: 'Mar', revenue: 162400 },
    { month: 'Apr', revenue: 158900 },
    { month: 'May', revenue: 175100 },
    { month: 'Jun', revenue: 180200 },
    { month: 'Jul', revenue: 195600 },
  ],
  expenses: [
    { month: 'Jan', expenses: 80000 },
    { month: 'Feb', expenses: 82500 },
    { month: 'Mar', expenses: 85000 },
    { month: 'Apr', expenses: 83000 },
    { month: 'May', expenses: 92000 },
    { month: 'Jun', expenses: 95000 },
    { month: 'Jul', expenses: 98000 },
  ],
  profit: [
    { month: 'Jan', profit: 70500 },
    { month: 'Feb', profit: 62800 },
    { month: 'Mar', profit: 77400 },
    { month: 'Apr', profit: 75900 },
    { month: 'May', profit: 83100 },
    { month: 'Jun', profit: 85200 },
    { month: 'Jul', profit: 97600 },
  ],
};

export const sampleTransactionData = `Date,Amount,Vendor,Category,Status
2024-07-01,-15000.00,"AWS","Cloud Services","Processed"
2024-07-01,-2500.00,"Slack","Communication","Processed"
2024-07-02,-850.00,"Figma","Design Tools","Processed"
2024-07-03,25000.00,"Innovate Corp","Invoice Payment","Completed"
2024-07-04,-120.00,"Office Supplies Co.","Office Supplies","Processed"
2024-07-05,-500000.00,"DataCenter Hosting","Infrastructure","Flagged"
2024-07-06,15000.00,"Synergy Ltd","Invoice Payment","Completed"
2024-07-07,-3200.00,"Marketing Agency X","Marketing","Processed"
`;

export type ClientData = {
  products: string[],
  paymentHistory: string,
  recentIssues: string[],
  futureNeeds: string,
};

export function getClientDataForAI(clientId: string): ClientData | null {
  const client = clients.find(c => c.id === clientId);
  if (!client) return null;

  return {
    products: client.products.map(p => p.name),
    paymentHistory: client.paymentHistory.every(p => p.status === 'Paid') ? 'All payments are up to date.' : 'Some payments are due or overdue.',
    recentIssues: client.issues.map(i => `${i.summary} (Priority: ${i.priority}, Status: ${i.status})`),
    futureNeeds: client.riskScore > 50 ? 'Client is at risk of churn, focus on retention.' : 'Client is stable, potential for upsell to premium services.',
  }
}
