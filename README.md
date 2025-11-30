# Agency Portal Dashboard

A Next.js 16 application for viewing agency and contact information with view-limiting functionality. Built as a technical assignment.

## 🚀 Features

* **Authentication:** Secure user login via **Clerk**.
* **Data Parsing:** Server-side parsing of CSV data (Agencies & Contacts) with robust error handling.
* **View Limits:** Enforces a limit of 50 contact views per day per user.
* **Upgrade Prompt:** Displays a professional call-to-action when the daily limit is exceeded.
* **Responsive UI:** Clean, professional dashboard using Tailwind CSS.

## 🛠 Tech Stack

* **Framework:** Next.js 16 (App Router)
* **Auth:** Clerk
* **Styling:** Tailwind CSS
* **Language:** TypeScript
* **Deployment:** Vercel

## 📐 System Design

```mermaid
graph TD
    User[User] -->|Visits App| Middleware{Auth Check}
    Middleware -- Not Logged In --> Login[Clerk Sign In]
    Middleware -- Logged In --> Dashboard[Dashboard Page]
    
    subgraph Data Loading
    CSV[CSV Files] -->|Read & Parse| DataLoader[Data Loader Utility]
    DataLoader -->|Merge Agencies & Contacts| CleanData[Cleaned Data Object]
    end

    Dashboard -->|Request Data| CleanData
    Dashboard -->|Render| AgencyList[Agency List Table]

    AgencyList -->|Click 'View Contacts'| LimitCheck{Check Daily Limit}
    
    LimitCheck -- Limit Reached --> Upgrade[Show Upgrade Prompt]
    LimitCheck -- Limit Available --> DetailPage[Agency Detail Page]
    
    DetailPage -->|Fetch Specific Agency| CleanData
    DetailPage -->|Increment Count| UserDB[User View Limit Storage]
    DetailPage -->|Render| ContactTable[Contacts Table]
```
📦 How to Run Locally
Clone the repository

Bash

git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME
Install dependencies

Bash

npm install
Set up Environment Variables Create a .env.local file and add your Clerk keys:

Bash

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
Run the development server

Bash

npm run dev