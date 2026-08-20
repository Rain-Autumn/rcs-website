export type ResearchStatus =
  "planned" | "in-preparation" | "in-progress" | "published";

export type EvidenceKind = "measured" | "reproduced" | "external" | "estimated";

export type ResearchProject = {
  id: `RCS-RP-${string}`;
  slug: string;
  status: ResearchStatus;
  title: string;
  question: string;
  summary: string;
  topics: string[];
  evidence: EvidenceKind[];
  publicationDate?: string;
  doi?: string;
  publicationUrl?: string;
  authorOrcid?: string;
};

export type ResearchSubmissionResponse = {
  ok: boolean;
  reference?: string;
  message: string;
  fieldErrors?: Record<string, string[]>;
};
