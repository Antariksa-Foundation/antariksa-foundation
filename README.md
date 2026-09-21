<div align="center">
  <img src="public/a-logo.png" alt="Antariksa Foundation Logo" width="150" />

  # Antariksa Foundation
  
  **Building the space workforce of the future through experiential learning, community-building, and joint R&D.**
</div>

---

## 🚀 Overview

Welcome to the official public repository for the **[Antariksa Foundation](https://antariksa-foundation.org)** web portal. This platform serves as our primary interface for students, partners, and donors to learn about our mission, explore our courses, join our community, and support our initiatives.

## 🛠️ Tech Stack

This project is built with modern, high-performance web technologies:
* **Frontend:** React.js, Vite, Tailwind CSS
* **Backend / Database:** Supabase (PostgreSQL)
* **Payments & Donations:** Razorpay Integration
* **Hosting:** Vercel

## ⚙️ Local Development

To get this project running on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Antariksa-Foundation/antariksa-foundation-main.git
   cd antariksa-foundation-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add the necessary environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   *(Note: Payment and Cloudflare keys should only be configured in your production Vercel environment to ensure security.)*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📁 Repository Structure

* `/src/components`: Reusable UI components (Navbar, Footer, Hero, etc.)
* `/src/pages`: Main application routes (Home, Who We Are, Support Us, etc.)
* `/public`: Static assets (Logos, Icons, etc.)
* `/supabase`: Edge functions and database schemas

## 🤝 Contributing
For internal team members: Please ensure all changes are tested locally before pushing to the `main` branch. Production deployments are automatically triggered via Vercel upon merging.

---
<div align="center">
  <i>&copy; Antariksa Foundation for Education Skill Development and Exploration</i>
</div>
