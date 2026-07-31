import type { Metadata } from "next";
import { CareersPage } from "@/components/careers/careers-page";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join KenoraTech and help build thoughtful digital products for ambitious businesses."
};

export default function Page() {
  return <CareersPage />;
}
