export interface Route {
  path: string;
  label: string;
  pageFile: string;
}

export const routes: Route[] = [
  { path: '/', label: 'Home', pageFile: 'HomePage' },
  { path: '/ebook', label: 'Ebook Guide', pageFile: 'EbookPage' },
  { path: '/do-it-with-us', label: 'Do It With Us', pageFile: 'DoItWithUsPage' },
  { path: '/name-generator', label: 'Name Generator', pageFile: 'NameGeneratorPage' },
  { path: '/add-ons', label: 'Add-ons & Design', pageFile: 'AddonsPage' },
  { path: '/about', label: 'About', pageFile: 'AboutPage' },
  { path: '/legal', label: 'Legal & Privacy', pageFile: 'LegalPage' },
  { path: '/terms', label: 'Terms of Service', pageFile: 'LegalPage' },
  { path: '/privacy', label: 'Privacy Policy', pageFile: 'LegalPage' },
  { path: '/refund-policy', label: 'Refund Policy', pageFile: 'LegalPage' },
];
