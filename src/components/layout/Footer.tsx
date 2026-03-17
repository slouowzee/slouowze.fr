import { PrivacyPolicy } from "./PrivacyPolicy";
import { SocialLinks } from "@/components/modules/profile/SocialLinks";

export function Footer({ onShowPrivacy }: { onShowPrivacy?: () => void }) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text-sm text-muted-foreground flex flex-col gap-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <p>&copy; {currentYear} Pilet Gaël. Tous droits réservés.</p>
        {onShowPrivacy && (
          <div className="hidden md:block md:ml-auto">
            <PrivacyPolicy onClick={onShowPrivacy} />
          </div>
        )}
      </div>
      <p className="text-xs italic opacity-70">
        Ce site utilise un cookie totalement anonyme pour un comptage de vue par navigateur.
      </p>

      {/* Mobile-only social icons*/}
      <div className="md:hidden flex flex-col items-center gap-4 pt-6 pb-2">
        <SocialLinks showLabel={false} direction="flex-row" className="gap-6" />
        {onShowPrivacy && (
          <PrivacyPolicy onClick={onShowPrivacy} />
        )}
      </div>
    </footer>
  );
}
