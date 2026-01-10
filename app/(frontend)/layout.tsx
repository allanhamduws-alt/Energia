import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { CookieBanner } from "@/components/CookieBanner";
import { DealPopup } from "@/components/DealPopup";
import { InquiryCartProvider, InquiryCartButton, InquiryCartDrawer } from "@/components/inquiry";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <InquiryCartProvider>
      <Header />
      {children}
      <Footer />
      <ChatWidget />
      <CookieBanner />
      <DealPopup />
      <InquiryCartButton />
      <InquiryCartDrawer />
    </InquiryCartProvider>
  );
}
