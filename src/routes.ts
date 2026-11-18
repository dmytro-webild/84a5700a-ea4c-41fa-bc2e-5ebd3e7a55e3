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
  { path: '/about', label: 'About', pageFile: 'AboutPage' },
];
