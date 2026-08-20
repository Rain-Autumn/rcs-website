export type InfrastructureNodeId =
  "internet" | "dns" | "ovh" | "debian" | "nginx" | "application";

export type InfrastructureNode = {
  id: InfrastructureNodeId;
  index: string;
  label: string;
  eyebrow: string;
  description: string;
  status: string;
  detail: string;
};

export type AgentId = "one" | "ephemeral" | "two";

export type Agent = {
  id: AgentId;
  code: string;
  name: string;
  role: string;
  summary: string;
};
