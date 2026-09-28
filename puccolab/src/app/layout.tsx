import { Space_Grotesk, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/Topbar";
import SidebarLeft from "@/components/SidebarLeft";

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

export const metadata = { title: "PUColab — Materiais e Fóruns da PUC" };

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
        <Topbar />
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 pb-20 pt-6 md:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_300px]">
          <SidebarLeft />
          <main className="min-w-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
