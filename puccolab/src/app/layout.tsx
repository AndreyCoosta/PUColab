import type { Metadata } from "next";
import { Space_Grotesk, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/Topbar";
import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import MainContent from "@/components/MainContent";
import SubmitModal from "@/components/SubmitModal";
import Providers from "@/components/Providers";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const body = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "PUColab — Materiais e Fóruns da PUC",
  description: "Materiais de estudo e fóruns por disciplina, feitos por estudantes da PUC.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <Providers />
        <Topbar />
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-4 px-3.5 pb-[70px] pt-4 min-[761px]:grid-cols-[210px_minmax(0,1fr)] min-[761px]:gap-6 min-[761px]:px-5 min-[761px]:pb-20 min-[761px]:pt-6 min-[1081px]:grid-cols-[220px_minmax(0,1fr)_300px]">
          <SidebarLeft />
          <MainContent>{children}</MainContent>
          <SidebarRight />
        </div>
        <SubmitModal />
      </body>
    </html>
  );
}
