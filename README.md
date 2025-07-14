# Travel Planning Application (with Node, Neon, Prisma, UploadThing)
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, clone the repository:
```bash
git clone https://github.com/chaaanuwu/Travel_Planner-Next.git
cd Travel_Planner-Next
```

Then, install the dependencies:
```bash
npm install
```

##### Github OAuth
Go to the [GitHub Developers](https://github.com/settings/developers), create a new OAuth app, and generate GITHUB_ID and GITHUB_SECRET. Then paste them in your .env.local:
```ini
GITHUB_ID=your_github_client_id  
GITHUB_SECRET=your_github_client_secret
```

##### Next Auth
Generate a secret from [Auth secret generator](https://auth-secret-gen.vercel.app/), and paste it in your .env.local:
```ini
AUTH_SECRET=your_generated_auth_secret
```

##### Database (Neon + Prisma)
1. Go to [neon.com](https://neon.com/) and create a new project.
2. Copy the database connection string and paste it in .env:
   
   ```ini
   DATABASE_URL=your_neon_database_url
   ```
3. Then run the following commands to initialize your database:

   ```bash
    npx prisma migrate dev
    npx prisma generate
   ```

##### Image Upload (UploadThing)
Go to [uploadthing.com](https://uploadthing.com/), generate a token, and paste it in .env.local:

```ini
UPLOADTHING_TOKEN=your_uploadthing_token
```

##### Google Maps API
1. Go to [Google Cloud](https://console.cloud.google.com) and create a new project.
2. Enable the following APIs:
   + Maps JavaScript API
   + Google Maps Platform
3. Create 2 API keys (client and server) and add them in .env.local:

   ```ini
    GOOGLE_MAPS_API_KEY=your_server_key
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_client_key
   ```
🔁 There's no specific order for these keys.

### Run the App Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

#### Now good to go.


## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Neon.Docs](https://neon.com/docs/introduction) - Neon Docs.
- [Uploadthing.Docs](https://docs.uploadthing.com/) - Uploadthing Documentation.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## ✅ All Set
You're ready to build and deploy your travel planner! 🚀🌍
