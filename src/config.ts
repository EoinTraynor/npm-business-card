export interface CardConfig {
  name: string;
  handle: string;
  jobTitle: string;
  company: string;
  tagline: string;
  links: {
    website: string;
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export const cardConfig: CardConfig = {
  name: 'Eoin Traynor',
  handle: 'eointraynor',
  jobTitle: 'Engineering Manager',
  company: 'CrowdStrike',
  tagline: 'Engineering leadership, cloud security & scale.',
  links: {
    website: 'https://www.eointraynor.com',
    github: 'https://github.com/EoinTraynor',
    linkedin: 'https://www.linkedin.com/in/eointraynor/',
    twitter: 'https://twitter.com/EoinTraynor1',
  },
};
