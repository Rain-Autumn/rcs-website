import { permanentRedirect } from "next/navigation";

type PageProps = { params: Promise<{ locale: string }> };

export default async function LegacySquadronPage({ params }: PageProps) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/evidence-engine`);
}
