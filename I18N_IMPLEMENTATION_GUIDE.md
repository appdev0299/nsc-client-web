# Multi-Language (i18n) Implementation Guide

## Overview
This project now supports multi-language functionality using `next-intl` with sub-path routing.

## Installation Required

**IMPORTANT:** You need to install the `next-intl` package first. Run this command in PowerShell as Administrator or in a terminal with execution permissions:

```bash
npm install next-intl
```

## URL Structure

- **Thai (Default):** `https://domain.com/th/...`
- **English:** `https://domain.com/en/...`
- **Root redirect:** Visiting `/` will automatically redirect to `/th` (default locale)

## Files Created

### 1. Configuration Files
- `src/i18n/request.ts` - i18n configuration and locale validation
- `src/middleware.ts` - Next.js middleware for locale routing
- `next.config.mjs` - Updated with next-intl plugin

### 2. Translation Files
- `messages/th.json` - Thai translations
- `messages/en.json` - English translations

### 3. Components
- `src/components/LanguageSwitcher.tsx` - Language toggle component
- `src/app/[locale]/layout.tsx` - Locale-specific layout wrapper

## How to Use Translations in Components

### Client Components
```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('nav');
  
  return <h1>{t('services')}</h1>; // Outputs: "บริการ" (TH) or "Services" (EN)
}
```

### Server Components
```tsx
import { useTranslations } from 'next-intl';

export default async function MyServerComponent() {
  const t = await useTranslations('common');
  
  return <button>{t('search')}</button>;
}
```

## Adding the Language Switcher to Header

Add this to your header component:

```tsx
import LanguageSwitcher from '@/components/LanguageSwitcher';

// In your header JSX:
<LanguageSwitcher className="ml-4" />
```

## Migration Steps for Existing Pages

### Before (Old Structure):
```
src/app/(app)/packages/page.tsx
```

### After (New Structure):
```
src/app/[locale]/(app)/packages/page.tsx
```

**You need to move all existing pages under the `[locale]` folder.**

## Quick Migration Script

Here's what needs to be done:

1. Move `src/app/(app)` → `src/app/[locale]/(app)`
2. Move `src/app/(auth)` → `src/app/[locale]/(auth)`
3. Move `src/app/dashboard` → `src/app/[locale]/dashboard`
4. Keep `src/app/api` as is (API routes don't need localization)

## Adding New Translations

1. Open `messages/th.json` and `messages/en.json`
2. Add your new keys following the existing structure:

```json
{
  "mySection": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

3. Use in components:
```tsx
const t = useTranslations('mySection');
<h1>{t('title')}</h1>
```

## Dynamic Values in Translations

```json
{
  "welcome": "Welcome, {name}!"
}
```

```tsx
t('welcome', { name: 'John' }) // "Welcome, John!"
```

## Supported Locales

Currently configured:
- `th` (Thai) - Default
- `en` (English)

To add more languages:
1. Update `src/i18n/request.ts`: Add to `locales` array
2. Create new translation file: `messages/[locale].json`
3. Update `src/middleware.ts`: Add to matcher pattern
4. Update `LanguageSwitcher.tsx`: Add language name

## Testing

After installation:
1. Run `npm run dev`
2. Visit `http://localhost:3000` - should redirect to `/th`
3. Visit `http://localhost:3000/en` - should show English version
4. Use the language switcher to toggle between languages

## Important Notes

- All existing links need to be updated to include locale prefix
- Use `next-intl`'s `Link` component for internal navigation
- The middleware handles automatic locale detection from browser preferences
- Translation files are loaded on-demand for better performance

## Next Steps

1. Install `next-intl` package
2. Move existing pages to `[locale]` folder structure
3. Replace hardcoded text with translation keys
4. Add LanguageSwitcher to your header
5. Test all routes with both locales
