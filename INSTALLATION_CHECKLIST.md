# Installation Checklist - "Takes longer than expected"

## ⚠️ VIKTIGT: Kontrollera dessa INNAN du installerar

### 1. Är filerna pushade till GitHub? ✅

```bash
git status
```

Om det finns ändringar:
```bash
git add taskpane.html taskpane.js taskpane.css manifest-itxpt.xml
git commit -m "Add ITXPT Labeling Templates"
git push
```

**Vänta 1-2 minuter** efter push!

### 2. Är GitHub Pages aktiverat? ✅

1. Gå till: https://github.com/HSitxpt/outlook-snippet-addin/settings/pages
2. Kontrollera:
   - **Source**: Deploy from a branch
   - **Branch**: `main` / `(root)`
3. Om det inte är aktiverat → Klicka **Save**
4. Vänta 1-2 minuter

### 3. Fungerar URL:erna? ✅ TESTA DETTA FÖRST!

Öppna i webbläsaren:

**Taskpane HTML:**
```
https://hsitxpt.github.io/outlook-snippet-addin/taskpane.html
```
**Du BÖR se**: ITXPT Labeling Templates UI med formulär

**Om du får 404 eller fel:**
- ❌ Filerna är inte pushade → Pusha först!
- ❌ GitHub Pages är inte aktiverat → Aktivera först!
- ❌ Vänta 1-2 minuter efter push/aktivering

**Ikoner:**
```
https://hsitxpt.github.io/outlook-snippet-addin/assets/icon-64.png
https://hsitxpt.github.io/outlook-snippet-addin/assets/icon-128.png
```
**Du BÖR se**: Ikon-bilder

### 4. Validera manifestet ✅

```bash
npx office-addin-manifest validate manifest-itxpt.xml
```

**Om det finns fel** → Fixa dem först!

### 5. Installera i Outlook ✅

**ENDAST NÄR STEG 1-4 ÄR KLARA!**

1. Gå till **outlook.office.com**
2. **Inställningar** → **Integrerade program**
3. **+ Lägg till** → **Lägg till från en fil**
4. Välj `manifest-itxpt.xml`
5. Klicka **Lägg till**

## Vanliga problem

### "Installation is taking longer than expected"

**Orsaker:**
- ❌ GitHub Pages är inte aktiverat
- ❌ Filerna är inte pushade
- ❌ URL:erna fungerar inte (404)

**Lösning:**
1. Kontrollera att URL:erna fungerar i webbläsaren
2. Om de inte fungerar → Pusha filer och aktivera GitHub Pages
3. Vänta 1-2 minuter
4. Försök installera igen

### "Failed to load resource"

- Kontrollera att alla filer finns i repo
- Kontrollera att GitHub Pages är aktiverat
- Vänta lite efter push

## Snabb fix

**Om inget fungerar:**
1. Pusha alla filer: `git push`
2. Aktivera GitHub Pages
3. Vänta 2 minuter
4. Testa URL:erna i webbläsaren
5. Om de fungerar → Installera manifest-itxpt.xml

