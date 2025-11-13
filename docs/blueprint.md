# **App Name**: AuraTwin

## Core Features:

- User Profile Management: Create and manage user profiles, storing user data in Cloud SQL (PostgreSQL) based on Firebase Auth UID.
- Solar API Integration: Integrate with the Google Solar API to fetch solar potential reports based on address/coordinates, caching results in Cloud SQL.
- Real-time Energy Data Fetching: Fetch real-time energy data from solar inverter APIs (e.g., Enode), handling errors and retries gracefully.
- Data Storage in TimescaleDB: Store time-series energy data in a TimescaleDB hypertable within Cloud SQL, tagged by user_id and device_id.
- Data Aggregation & Anonymization: Aggregate data, apply a tool to decide how to anonymize user's data to protect PII and join the potential energy with actualized enrgy metrics based on district using a SQL query against Cloud SQL.
- Asynchronous Data Polling: Set up a Cloud Scheduler job to trigger the carbonSenseService Cloud Function via Cloud Pub/Sub for scheduled data polling.
- Aura Dashboard: React-based dashboard with charts of key analytics such as potential solar capacity in user's location

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) to evoke trust, stability, and intelligence related to the subject of energy.
- Background color: Very light blue (#E8EAF6), a desaturated variant of the primary color for a calm, supportive backdrop.
- Accent color: Soft purple (#9575CD), analogous to the primary color, adding a touch of creativity and differentiation for interactive elements.
- Body and headline font: 'Inter', a grotesque-style sans-serif for a neutral and modern feel.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use clear, consistent icons to represent energy-related data and actions.
- Subtle transitions and animations for data updates and user interactions to enhance user experience.