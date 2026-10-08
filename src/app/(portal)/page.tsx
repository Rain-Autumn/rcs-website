import { LanguageGate } from '@/components/ui/LanguageGate';
import { StructuredData } from '@/components/seo/StructuredData';
import { portalStructuredData } from '@/lib/structured-data';

export default function LanguageEntryPage() {
  return (
    <>
      <StructuredData data={portalStructuredData()} />
      <LanguageGate />
    </>
  );
}
