# Snabb Fix - "Installation is taking longer than expected"

## Problem: Installation misslyckas

Detta händer vanligtvis när Outlook inte kan nå filerna på GitHub Pages.

## Lösning i 3 steg

### Steg 1: Kontrollera att filerna är pushade

1. Öppna terminalen i denna mapp
2. Kör:
   ```bash
   git add .
   git commit -m "Add ITXPT Labeling Templates"
   git push
   ```

### Steg 2: Aktivera GitHub Pages

1. Gå till: https://github.com/HSitxpt/outlook-snippet-addin/settings/pages
2. **Source**: Deploy from a branch
3. **Branch**: `main` / `(root)`
4. Klicka **Save**
5. **Vänta 1-2 minuter**

### Steg 3: Testa URL:erna

**VIKTIGT**: Testa dessa i webbläsaren INNAN du installerar!

1. Öppna: https://hsitxpt.github.io/outlook-snippet-addin/taskpane.html
   - Du BÖR se ITXPT UI
   - Om 404 → Filerna är inte pushade eller GitHub Pages är inte aktiverat

2. Om URL:en fungerar → Installera `manifest-itxpt.xml` i Outlook
3. Om URL:en INTE fungerar → Gå tillbaka till steg 1-2

## Varför misslyckas installationen?

Outlook kan inte nå filerna om:
- ❌ GitHub Pages inte är aktiverat
- ❌ Filerna inte är pushade
- ❌ URL:erna ger 404

**Lösningen är alltid**: Kontrollera att URL:erna fungerar i webbläsaren först!

