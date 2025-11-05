# Kontrollera GitHub Pages

## Steg 1: Testa att filerna finns på GitHub Pages

Öppna dessa URL:er i webbläsaren:

1. **Taskpane HTML**: https://hsitxpt.github.io/outlook-snippet-addin/taskpane.html
   - Du bör se ITXPT Labeling Templates UI
   - Om du får 404 → Filerna är inte pushade eller GitHub Pages är inte aktiverat

2. **Ikoner**: 
   - https://hsitxpt.github.io/outlook-snippet-addin/assets/icon-64.png
   - https://hsitxpt.github.io/outlook-snippet-addin/assets/icon-128.png
   - Du bör se ikonerna

3. **Help page**: https://hsitxpt.github.io/outlook-snippet-addin/help.html
   - Du bör se help-sidan

## Steg 2: Om URL:erna inte fungerar

### A. Kontrollera att filerna är pushade

```bash
git status
```

Om det finns ändringar:
```bash
git add .
git commit -m "Add ITXPT files"
git push
```

### B. Aktivera GitHub Pages

1. Gå till: https://github.com/HSitxpt/outlook-snippet-addin/settings/pages
2. **Source**: Deploy from a branch
3. **Branch**: `main` / `(root)`
4. Klicka **Save**
5. Vänta 1-2 minuter

### C. Kontrollera att GitHub Pages körs

Gå till: https://github.com/HSitxpt/outlook-snippet-addin/actions
- Du bör se en "pages build and deployment" action
- Den bör vara "completed" (grön)

## Steg 3: Om URL:erna fungerar men installation misslyckas

1. **Kontrollera manifestet**:
   - Använd `manifest-itxpt.xml`
   - Validera: `npx office-addin-manifest validate manifest-itxpt.xml`

2. **Testa i Outlook Web App**:
   - outlook.office.com
   - Inställningar → Integrerade program
   - Lägg till från fil

3. **Kontrollera webbläsarkonsolen**:
   - F12 → Console
   - Kolla efter felmeddelanden

## Viktigt

**Installationen kommer misslyckas om GitHub Pages inte är aktiverat eller filerna inte är pushade!**

Kontrollera alltid att URL:erna fungerar i webbläsaren först.

