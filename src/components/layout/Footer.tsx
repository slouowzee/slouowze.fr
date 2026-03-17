import { PrivacyPolicy } from "./PrivacyPolicy";

export function Footer({ onShowPrivacy }: { onShowPrivacy?: () => void }) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text-sm text-muted-foreground flex flex-col gap-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <p>&copy; {currentYear} Pilet Gaël. Tous droits réservés.</p>
        {onShowPrivacy && (
          <div className="md:ml-auto">
            <PrivacyPolicy onClick={onShowPrivacy} />
          </div>
        )}
      </div>
      <p className="text-xs italic opacity-70">
        Ce site utilise un cookie totalement anonyme pour un comptage de vue par navigateur.
      </p>
    </footer>
  );
}
