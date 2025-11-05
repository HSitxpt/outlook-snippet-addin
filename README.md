# Outlook Snippet Add-in

Detta repo innehåller två Outlook-add-ins:

## 1. Insert Snippet (Original)
Enkel add-in för att infoga snippets i emails.
- **Manifest**: `manifest.xml`
- **UI**: `index.html`
- **Beskrivning**: Insert structured email snippets like test results, compliance checks, etc.

## 2. ITXPT Labeling Templates (Ny)
Avancerad add-in för ITXPT labeling-processen med strukturera templates.
- **Manifest**: `manifest-itxpt.xml`
- **UI**: `taskpane.html`
- **Beskrivning**: Insert structured templates for labeling tests, deadlines, and process stages into your emails.

## Funktioner (ITXPT Version)

- **Deadline-hantering**: Infoga deadline-datum och tid
- **Processsteg**: Markera var i processen och koppla till Planner-tickets
- **Testresultat**: Strukturera och dokumentera tester
- **Ytterligare information**: Lägg till anteckningar

## Installation

### ITXPT Labeling Templates

1. Gå till **outlook.office.com**
2. **Inställningar** → **Integrerade program**
3. **+ Lägg till** → **Lägg till från en fil**
4. Välj `manifest-itxpt.xml`
5. Klicka **Lägg till**

Add-in kommer automatiskt laddas när du öppnar eller komponerar ett email.

## GitHub Pages

Add-ins är publicerade på GitHub Pages:
- Base URL: `https://hsitxpt.github.io/outlook-snippet-addin/`
- Ikoner: `/assets/icon-64.png` och `/assets/icon-128.png`

## Filsstruktur

```
outlook-snippet-addin/
├── manifest.xml              # Original Insert Snippet manifest
├── manifest-itxpt.xml        # ITXPT Labeling Templates manifest
├── index.html                # Original Insert Snippet UI
├── taskpane.html             # ITXPT Labeling Templates UI
├── taskpane.js               # ITXPT JavaScript logic
├── taskpane.css              # ITXPT Styling
├── commands.html             # Commands page (för ribbon-knappar)
├── help.html                 # Help page
└── assets/                   # Ikoner
    ├── icon-64.png
    └── icon-128.png
```

## Licens

Detta projekt är skapat för internt bruk.

