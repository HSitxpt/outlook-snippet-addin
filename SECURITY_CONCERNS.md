# Security Concerns - GitHub Pages Hosting

## ⚠️ Current Risk Assessment

### Information Exposed in Public Repository:
- **Physical Address**: Lindholmspiren 3-5, Gothenburg, Sweden
- **Contact Names**: Jim Lindkvist, Henrik Simpanen
- **EORI Number**: BE0656563009 (European customs identifier)
- **Organization Number**: 502082-6615 (Swedish company registration)

### Security Risks:

1. **Low Risk**:
   - Physical address (likely already public on website)
   - Organization number (public record in Sweden)

2. **Medium Risk**:
   - Contact names (could be used for social engineering)
   - EORI number (could potentially be misused for customs fraud)

3. **Main Concern**:
   - All information is visible in the public GitHub repository
   - Anyone can view the source code and see this data
   - Information is hardcoded in JavaScript files

## ✅ Recommended Solutions

### Option 1: Make Information User-Editable (Recommended)
- Add input fields in the form for address, EORI, etc.
- Store in localStorage (user's browser only)
- Not exposed in repository

### Option 2: Use Private Repository
- Make repository private
- Use GitHub Pages with private repos (requires GitHub Pro/Team)
- Or use alternative hosting (Azure Static Web Apps, Netlify, etc.)

### Option 3: External Configuration
- Store sensitive data in a separate config file
- Host config on private server or use environment variables
- Load via API call (requires backend)

### Option 4: Minimal Exposure
- Only include truly public information
- Remove EORI and organization number from hardcoded values
- Make them optional fields users fill in

## 🔒 Immediate Action Items

1. **Review**: Is this information already public on your website?
2. **Decision**: Can EORI/Org number be made user-editable instead?
3. **Consider**: Moving to private hosting if data is sensitive

## 📋 Best Practice

For Outlook add-ins with sensitive business information:
- Use user-editable fields when possible
- Store defaults in localStorage (client-side only)
- Consider private hosting for sensitive data
- Review what information truly needs to be in the add-in

