import { NewsletterForm } from "~/features/leads/NewsletterForm";
import { SiteLayout } from "~/features/layout/SiteLayout";

export default function SiteRoute() {
  return <SiteLayout newsletter={<NewsletterForm source="footer" />} />;
}
