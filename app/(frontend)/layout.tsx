import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { CookieBanner } from "@/components/CookieBanner";
import { DealPopup } from "@/components/DealPopup";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ChatWidget />
      <CookieBanner />
      <DealPopup />
    </>
  );
}
