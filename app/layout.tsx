import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og-v2.png`;

  return {
    title: { default: "Ruang Sinergi", template: "%s · Ruang Sinergi" },
    description: "Portal pembelajaran multidisiplin SMK Negeri 1 Semarang.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/favicon.svg" },
    openGraph: { title: "Ruang Sinergi", description: "Belajar lintas keahlian untuk masa depan yang lebih siap.", images: [image] },
    twitter: { card: "summary_large_image", title: "Ruang Sinergi", description: "Belajar lintas keahlian untuk masa depan yang lebih siap.", images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
