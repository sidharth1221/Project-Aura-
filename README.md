# AuraTwin: Digital Twin for Renewable Energy

AuraTwin is a Next.js web application designed to model, visualize, and encourage renewable energy adoption. It acts as a "digital twin" platform, providing homeowners and policymakers with actionable insights for a sustainable future. The platform is built with a modern tech stack, including Firebase for the backend, Google's Genkit for AI features, and ShadCN/Tailwind for the UI.

## ✨ Features

- **Authentication**: Secure user sign-up and login functionality using Firebase Authentication.
- **User Dashboard**: A central hub for users to view key metrics, charts, and recent activity related to energy production and potential.
- **AI Energy Coach**: An AI-powered assistant that analyzes user-provided data (energy usage, home size) and provides personalized, actionable recommendations for energy conservation.
- **AI Solar Potential Estimator**: Utilizes an AI flow to simulate a solar analysis for a given address, estimating annual energy production and providing a summary.
- **AI Data Anonymization**: A tool for developers and data analysts to see how AI can recommend and apply privacy-preserving transformations to user data.
- **Community Leaderboard**: Anonymized leaderboards to foster friendly competition and community engagement by showcasing top energy producers by district.
- **User Profile Management**: Allows users to view and update their personal information, which is stored securely in Firestore.
- **Responsive & Themed UI**: Built with ShadCN/UI and Tailwind CSS, the application is fully responsive and includes a light/dark mode theme toggle.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Components**: [ShadCN/UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend-as-a-Service (BaaS)**: [Firebase](https://firebase.google.com/)
  - **Authentication**: Firebase Authentication
  - **Database**: Firestore (NoSQL)
- **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
- **Deployment**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📂 Project Structure

This project follows a structure conventional for Next.js applications using the App Router.

```
.
├── docs/
│   └── backend.json      # Defines the data schema (entities) for Firestore.
├── public/               # Static assets.
├── src/
│   ├── ai/               # Genkit AI flows and configuration.
│   │   ├── flows/        # Individual AI flows for features.
│   │   └── genkit.ts     # Genkit initialization.
│   ├── app/              # Next.js App Router.
│   │   ├── (auth)/       # Route group for auth pages.
│   │   ├── dashboard/    # Protected routes for the user dashboard.
│   │   ├── globals.css   # Global styles and Tailwind CSS theme variables.
│   │   ├── layout.tsx    # Root layout for the entire application.
│   │   └── page.tsx      # The public landing page.
│   ├── components/       # Reusable React components.
│   │   ├── dashboard/    # Components specific to the dashboard.
│   │   ├── ui/           # Core UI components from ShadCN/UI.
│   │   └── *.tsx         # Other shared components.
│   ├── firebase/         # Firebase configuration and custom hooks.
│   │   ├── config.ts     # Firebase project configuration keys.
│   │   ├── index.ts      # Main Firebase initialization and exports.
│   │   ├── provider.tsx  # React Context provider for Firebase services.
│   │   └── ...           # Custom hooks for auth (useUser) and Firestore (useDoc, useCollection).
│   ├── hooks/            # General-purpose React hooks.
│   └── lib/              # Utility functions, static data, etc.
│       ├── data.ts       # Mock data for dashboard charts and tables.
│       ├── utils.ts      # Utility functions (e.g., `cn` for classnames).
│       └── ...
├── .env                  # Environment variables.
├── apphosting.yaml       # Firebase App Hosting deployment config.
├── firestore.rules       # Security rules for the Firestore database.
├── next.config.ts        # Next.js configuration file.
├── package.json          # Project dependencies and scripts.
└── tsconfig.json         # TypeScript configuration.
```

### Key File Explanations

- **`src/app/layout.tsx`**: The root layout that wraps all pages. It sets up the global font, theme provider, and Firebase context provider.
- **`src/app/dashboard/layout.tsx`**: A nested layout specifically for the dashboard routes. It includes the main sidebar and header and wraps content in a `ProtectedDashboardLayout` to ensure only authenticated users can access it.
- **`src/app/dashboard/protected-layout.tsx`**: A Client Component that handles the core authentication check. It uses the `useUser` hook and redirects to `/login` if no user is signed in.
- **`src/firebase/index.ts` & `provider.tsx`**: These files manage the entire Firebase integration. `initializeFirebase` creates the app instance, and `FirebaseProvider` uses React Context to make the Firebase Auth and Firestore services available throughout the component tree via custom hooks (`useAuth`, `useFirestore`, `useUser`).
- **`src/ai/genkit.ts` & `src/ai/flows/*.ts`**: This is the heart of the AI functionality. `genkit.ts` initializes the AI plugin. Each file in the `flows` directory defines a specific AI-powered server action (e.g., `getEnergyAdvice`), including its Zod schema for typed inputs/outputs and the prompt sent to the LLM.
- **`firestore.rules`**: This is a critical security file. It defines the access control rules for the Firestore database, ensuring that users can only read and write their own data.
- **`docs/backend.json`**: This file serves as a blueprint for the database structure. It defines the "entities" (like the `User` object) and their properties, providing a schema that helps maintain data consistency.

## 🏃‍♂️ Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add your Firebase project credentials. These are typically provided when you set up a Firebase project.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

This will start the Next.js development server, usually on `http://localhost:9002`.

---

This `README.md` provides a comprehensive overview for any developer looking to understand, run, or contribute to the AuraTwin project.