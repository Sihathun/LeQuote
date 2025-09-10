# LeQuote - Random Quote Generator
## Created by Sin Sihathun

Visit the deployed project at [Le-Quote](https://le-quote.vercel.app/)

## Description
A lightweight React-based Vite app that lets users click a button to receive a random quote from an Appwrite database. Users can also submit their own quotes to be stored in the database.

## Technologies Used
- Frontend: React (via Vite)
- Backend / Database: Appwrite — handles storing and retrieving quotes

## Setup Instructions
```# Clone the repository
git clone https://github.com/Sihathun/LeQuote.git
cd LeQuote

# Install dependencies
npm install

# Start the development server
npm run dev

# To build for production
npm run build
```

### Architecture Overview
- Frontend (React + Vite): Presents the UI with a button to fetch random quotes and a form to submit new ones.
- Backend (Appwrite): Hosts a database that stores quotes. The frontend interacts with Appwrite using its SDK to:
  * Fetch a random quote when the button is clicked
  * Submit a new quote via the quote form, which is then saved into the database
