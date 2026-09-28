import type { Metadata } from "next";

export const metadata: Metadata = { title: "Crop Doctor" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
