import type { Metadata } from "next";
import { SubjectsDirectory } from "@/components/Views";

export const metadata: Metadata = { title: "Matérias — PUColab" };

export default function Page() {
  return <SubjectsDirectory />;
}
