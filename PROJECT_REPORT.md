# AuraTwin: Project Report & Technical Overview

## 1. Project Overview

**AuraTwin** is a sophisticated, AI-powered "digital twin" platform designed to model, visualize, and encourage renewable energy adoption among residents of Bangalore, India. It serves as a personal bridge to a sustainable future by providing homeowners with actionable, data-driven insights and fostering community engagement through gamification.

The application is built on a modern, scalable tech stack featuring **Next.js** for the frontend, **Firebase** for the backend (including Firestore and Authentication), and **Google's Genkit** for its powerful generative AI capabilities.

### Single-Line Description
> AuraTwin is an AI-powered digital twin platform that helps users in Bangalore track and reduce their energy consumption through personalized advice, solar potential analysis, and community-driven gamification.

---

## 2. Core Features

### 2.1. Authentication
- **Secure Sign-Up & Login:** Users can create an account or sign in using their email and password.
- **Firebase Auth:** All authentication logic is handled securely by Firebase Authentication, which manages password hashing and user sessions. Upon registration, a corresponding user profile is created in the Firestore database.

### 2.2. User Dashboard
- **Central Hub:** The main dashboard serves as the user's mission control center, providing an at-a-glance overview of key energy metrics.
- **KPI Cards:** Displays key performance indicators such as "Total Capacity," "Carbon Offset," and "Homes Powered" with trend indicators.
- **Data Visualizations:**
    - **Energy Production vs. Potential:** An area chart that visualizes the user's actual energy production against their estimated potential over time.
    - **Solar Adoption by District:** A bar chart showing the distribution of solar adoption across different districts in Bangalore, providing a community-level perspective.
- **Recent Activity Feed:** A live-updating table that shows the most recent user profile updates on the platform, fostering a sense of an active community. This feed fetches data directly from Firestore.

### 2.3. Gamification System
- **Aura Points:** A points-based reward system to incentivize eco-friendly behavior. Users earn Aura Points for completing missions. The current balance is always visible in the dashboard header.
- **Missions Page:** A dedicated page where users can view and complete challenges (e.g., "Reduce energy use by 5%"). Completing a mission updates the user's `auraPoints` in Firestore.

### 2.4. AI-Powered Tools
- **AI Energy Coach:**
    - **Functionality:** Users input their monthly energy usage, home size, and household size. A Genkit AI flow analyzes this data and provides a personalized energy profile analysis and a list of actionable recommendations for conservation.
    - **Tech:** Utilizes a server-side Genkit flow (`energy-coach-flow.ts`) with a predefined Zod schema for strongly-typed inputs and outputs.
- **AI Solar Potential Estimator:**
    - **Functionality:** Users enter a physical address in Bangalore. An AI flow then simulates a solar analysis for that location, estimating the potential annual energy production (in kWh) and providing a summary of fictional factors (like roof orientation and sun exposure).
    - **Tech:** Powered by a Genkit flow (`solar-potential-flow.ts`) that is prompted to act as a solar energy expert.
- **AI Data Anonymization Engine:**
    - **Functionality:** A tool for developers or data analysts to see how AI can recommend and apply privacy-preserving transformations to user data. Users can input a JSON object, select a sensitivity level, and the AI will suggest an anonymization strategy and output the transformed data.
    - **Tech:** Uses a Genkit flow (`anonymize-data-for-privacy.ts`) to demonstrate advanced data privacy techniques.

### 2.5. Community & Profile
- **Community Leaderboard:** An anonymized leaderboard that ranks the top energy producers by district. This fosters friendly competition and encourages community participation.
- **User Profile Management:** A dedicated page where users can view and update their personal information (first name, last name). All changes are written back to their user document in Firestore.

---

## 3. Technology Stack

- **Framework:** **Next.js** (App Router)
- **Language:** **TypeScript**
- **UI Components:** **ShadCN/UI**
- **Styling:** **Tailwind CSS**
- **Backend-as-a-Service (BaaS):** **Firebase**
  - **Authentication:** Firebase Authentication
  - **Database:** Firestore (NoSQL)
  - **Hosting:** Firebase App Hosting
- **Generative AI:** **Firebase Genkit** with the Google Gemini model.
- **Data Visualization:** **Recharts** for charts and graphs.
- **Form Management:** React Hooks and `useActionState` for handling server actions.

---

## 4. Architecture Deep Dive

### 4.1. Frontend Architecture (Next.js)

The frontend is built using the Next.js App Router, which enables a powerful combination of Server Components and Client Components.

- **`src/app/`**: This directory contains all routes, pages, and layouts.
    - **`(auth)/` Route Group:** Contains authentication-related pages like `/login` and `/register`.
    - **`dashboard/` Route Group:** Contains all protected routes accessible only to authenticated users.
        - **`layout.tsx`:** The main layout for the dashboard, which sets up the sidebar and header.
        - **`protected-layout.tsx`:** A crucial Client Component that wraps all dashboard pages. It uses the `useUser` hook to check for an authenticated user and redirects to `/login` if none is found.
    - **`layout.tsx` (Root):** The application's root layout. It sets up the `ThemeProvider`, global styles, fonts, and the top-level `FirebaseClientProvider`.
- **`src/components/`**: Home to all reusable React components.
    - **`ui/`:** Core, unstyled components provided by ShadCN/UI.
    - **`dashboard/`:** Components specifically designed for the dashboard, such as `KpiCard` and `OverviewChart`.
- **`src/firebase/`**: This directory is the heart of the Firebase integration.
    - **`index.ts` & `provider.tsx`:** Manages the entire Firebase setup. `initializeFirebase` handles app initialization, while `FirebaseProvider` uses React Context to make Firebase services available to the entire app via custom hooks (`useAuth`, `useFirestore`, `useUser`).
    - **`firestore/`:** Contains custom hooks like `useDoc` and `useCollection` for real-time data fetching from Firestore, complete with loading and error states.
- **`src/ai/`**: Contains all Genkit-related code.
    - **`genkit.ts`:** Initializes the Genkit instance and configures the AI plugin (Google AI).
    - **`flows/`:** Each file in this directory defines a specific server-side AI function (e.g., `getEnergyAdvice`). These flows define input/output schemas using Zod and contain the prompts sent to the LLM.

### 4.2. Backend Architecture (Firebase)

The backend is fully managed by Firebase, simplifying infrastructure and allowing for rapid development.

- **Firestore (Database):** A NoSQL, document-based database.
    - **`docs/backend.json`:** This file acts as a **schema blueprint** for our database. It defines the structure and properties of our data "entities."
        - **`User` Entity:** Stores user profile information, including `firstName`, `lastName`, `email`, `district`, and `auraPoints`. The document ID is the same as the Firebase Auth UID.
        - **`Mission` Entity:** Stores the available missions, including a `title` and `reward` value.
    - **Data Structure:**
        - `/users/{userId}`: Stores individual user profiles.
        - `/missions/{missionId}`: Stores challenges for the gamification system.
- **Firebase Authentication:**
    - Handles all user sign-up and sign-in flows securely. The app uses **email/password** as its authentication provider.
- **Firestore Security Rules (`firestore.rules`):**
    - This file is critical for securing user data. The rules enforce a strict security model:
        - **User Ownership:** Users can only read and write to their own document in the `/users` collection.
        - **Dashboard Features:** Authenticated users are allowed to *list* users and missions. This is necessary to power the "Recent Activity" feed and the "Missions" page. Write access to missions is denied to users.
- **Firebase App Hosting:**
    - Provides a fully-managed, serverless hosting environment for the Next.js application, complete with CI/CD via GitHub integration.

---

This report provides a complete picture of the AuraTwin application, from its high-level features to its detailed technical implementation.
