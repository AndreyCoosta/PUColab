import { SubjectView } from "@/components/Views";

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <SubjectView code={decodeURIComponent(code)} />;
}
