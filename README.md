# portfolio-v2

Personal portfolio built with Next.js 14 App Router, TypeScript, Tailwind CSS v4 and next-intl. Features server-side rendering, bilingual support (IT/EN), dark/light mode and a working contact form via Resend API.

## 🔗 Live

[zywel.vercel.app](https://portfolio-v2-three-bay-23.vercel.app)

## Tech Stack

**Frontend**

- Next.js 14 (App Router, SSG, SSR)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- next-intl (i18n IT/EN)

**Email**

- Resend API
- React Email

**Deploy**

- Vercel (CI/CD on push to main)

## Features

- Bilingual support IT/EN with automatic locale detection
- Dark/light mode with system preference support
- Floating glass navbar with mobile hamburger menu
- Working contact form with email delivery via Resend
- Fully responsive — mobile first
- SSG for optimal performance
- Component-driven architecture with reusable UI components

## Run locally

```bash
git clone https://github.com/zywelf/portfolio-v2
cd portfolio-v2
npm install
```

Create a `.env.local` file in the root:

RESEND_API_KEY=your_api_key_here

Then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## License

MIT
