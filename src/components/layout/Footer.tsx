export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text-sm text-muted-foreground flex flex-col gap-2">
      <p>&copy; {currentYear} Pilet Gaël. Tous droits réservés.</p>
      <p className="text-xs italic opacity-70">
        Ce site utilise un cookie totalement anonyme pour un comptage de vue par navigateur.
      </p>
    </footer>
  );
}
