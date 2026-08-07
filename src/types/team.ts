export type Certification = {
  provider: string;
  title: string;
  issued: string;
  credentialId?: string;
  credentialUrl?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  type: 'direction' | 'member' | 'collaborator';
  translations: Record<'fr' | 'en' | 'nl', { role: string; bio: string }>;
  specialties: string[];
  certifications: Certification[];
  createdAt?: string;
};
