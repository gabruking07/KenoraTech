import type { Metadata } from "next";
import { AdminContentManager } from "@/components/admin/AdminContentManager";

export const metadata: Metadata = {
  title: "Services",
  description: "Manage service sections."
};

export default function ServicesPage() {
  return <AdminContentManager type="services" title="Services" description="Add and manage your service offerings." titleLabel="Service name" descriptionLabel="Service description" defaults={[
    { title: "Web Development", description: "We build fast, responsive and scalable websites using modern technologies to help your brand stand out." },
    { title: "Mobile Development", description: "Custom mobile applications for iOS and Android that deliver seamless experiences and real results." },
    { title: "UI/UX Design", description: "We design intuitive, engaging and user-centered interfaces that leave a lasting impression." },
    { title: "Cloud & DevOps", description: "We help you scale, deploy and manage applications in the cloud with reliability and security." },
    { title: "Digital Marketing", description: "Data-driven marketing strategies to increase visibility, generate leads and grow your online presence." },
    { title: "Cybersecurity", description: "We protect your digital assets with advanced security solutions and proactive risk management." }
  ]} />;
}
