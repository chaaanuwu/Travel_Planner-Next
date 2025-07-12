# Travel Plannin Application (with node, neon, prisma, uploadthing)
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, clone the repository:
```bash
https://github.com/chaaanuwu/Travel_Planner-Next.git
```

then, install the dependancies:
```bash
npm install
```

##### Github OAuth
Navigate to the [github developers](https://github.com/settings/developers), create a new OAuth app and generate GITHUB_ID and GITHUB_SECRET then paste them on .env.local.

##### Next Auth
Navigate to the [Auth secret generator](https://auth-secret-gen.vercel.app/), generate a AUTH_SECRET key and paste it on .env.local.

##### Database:
Navigate to the [neon.com](https://neon.com/), create an app and generate an API key for the app, then paste the API key on .env {DATABASE_URL}.
Then run these commands:
```bash
npx prisma migrate dev
# then
npx prisma generate
```
It will creates the everything needed for database.

##### Image Storage
Navigate to the [uploadthing.com](https://uploadthing.com/), generate a token and paste it on .env.local {UPLOADTHING_TOKEN}.

##### Google Map
Navigate to the [Google Cloud](https://console.cloud.google.com), create a project and in that project enable "Google Maps Platform" API and "Maps Javascript API".
Then in credentials generate 2 API keys for client and serever, and paste them on the .env.local {GOOGLE_MAPS_API_KEY}, {NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}. (There's no order)

Finally, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Now good to go.


## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Neon.Docs](https://neon.com/docs/introduction) - Neon Docs.
- [Uploadthing.Docs](https://docs.uploadthing.com/) - Uploadthing Documentation.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
