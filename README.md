# WhereIsIt - Lost and Found Items Platform

## Project Description
WhereIsIt is a React-based web application built with Vite that serves as a lost and found items platform. It allows users to register, log in, and manage lost and found items by adding new posts, browsing existing items, and viewing detailed information. The platform aims to help users recover lost belongings and connect with finders in their community.

## Features
- User authentication with Firebase (email/password and Google sign-in)
- Add lost or found items with details including title, description, category, location, date, and thumbnail image
- Browse and search lost and found items by title or location
- View detailed information about each item
- Manage user's own posts (view and track lost/found items)
- Protected routes for adding items and viewing user-specific data
- Informative homepage with banner, about us, latest items, community impact, testimonials, and FAQ sections

## Technologies Used
- React 18 with Vite for fast development and build
- React Router DOM for client-side routing
- Firebase Authentication for user management
- Axios for API requests
- Tailwind CSS for styling
- React DatePicker for date selection
- SweetAlert2 for user-friendly alerts and notifications

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd WhereIsIt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add your Firebase configuration and API endpoint URL as environment variables, for example:
     ```
     VITE_API_LINK=https://your-api-endpoint.com
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` (or the port shown in the terminal).

## Usage Overview
- Register or log in to access full features.
- Browse lost and found items on the homepage or via the "Lost & Found Items" page.
- Use the search bar to filter items by title or location.
- Add new lost or found items via the "Add Lost Item" page (requires login).
- View details of items and manage your own posts in the "My Items" section.

## Folder Structure
```
src/
├── Components/           # Reusable UI components (Navbar, Footer, FAQ, etc.)
├── Components/HomeComponent/  # Homepage specific components (Banner, LatestItems, Testimonials, etc.)
├── Firebase/             # Firebase configuration
├── Pages/                # Page components for routes (HomePage, Login, Register, AddLostItem, etc.)
├── Provider/             # Context providers (AuthProvider)
├── Router/               # Routing components (AppRouter, PrivateRoutes)
├── assets/               # Static assets like images and icons
├── App.jsx               # Main app component (if used)
├── main.jsx              # Entry point rendering the app
```

## Authentication
- Firebase Authentication is used for user registration and login.
- Supports email/password and Google sign-in.
- Authenticated users can add and manage lost/found items.
- JWT tokens are stored in localStorage for session management.

## API Usage
- The app communicates with a backend API to fetch and post lost and found items.
- API base URL is configured via environment variable `VITE_API_LINK`.
- Endpoints include:
  - `GET /getAllitems` - Fetch all lost and found items
  - `POST /Additems` - Add a new lost or found item

## License
This project is open source and available under the MIT License.
