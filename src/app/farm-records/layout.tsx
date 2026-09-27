import type { Metadata } from "next";

export const metadata: Metadata = { title: "Farm Records" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
