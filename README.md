# Trend Focus – E-Commerce Website

**Trend Focus** is a modern, full-stack e-commerce web application built with React, Vite, Supabase, TypeScript, and Tailwind CSS. It provides a scalable, performant shopping platform.

## 🔗 Live Demo  
[E-Commerce Website (Trend Focus)](https://e-commerce-website-02w5.onrender.com)  

---

## 🚀 Features

- User authentication (signup, login) via **Supabase Auth**  
- Product catalog with list & detail views  
- Search functionality  
- Shopping cart for users  
- Order placement and management  
- Inventory management (backed via Supabase database)  
- Responsive UI (desktop + mobile)  
- Clean component design using **shadcn-ui**  
- Styling with **Tailwind CSS**  
- State management and API interaction via Supabase client  

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React + Vite + TypeScript |
| **UI / Styling** | Tailwind CSS, shadcn-ui |
| **Backend / Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |
| **Deployment** | (Your deployment platform / provider) |

---

## 📁 Repository Structure

```

E-Commerce-Website/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── supabase/
│   └── …
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── …

````

- `src/supabase/` — Contains Supabase client configuration and helpers  
- `src/components/` — Reusable UI components  
- `src/pages/` — Application’s page-level components / routes  

---

## 🛠️ Getting Started (Local Development)

### Prerequisites

- Node.js (v16+ recommended)  
- Yarn or npm  
- A Supabase project (for authentication, database, and storage)  

### Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/suyash1702/E-Commerce-Website.git
   cd E-Commerce-Website
````

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Rename or create a `.env` or `.env.local` file in the project root, and add:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   # Add other envs you need (storage, etc.)
   ```

4. **Set up Supabase database**

   * Use the SQL files in the root (like `SETUP_DATABASE.sql`, `FIX_RLS_POLICIES_COMPLETE.sql`) to create your schema and set permissions.
   * Make sure your Supabase RLS (Row-Level Security) policies are correctly configured as per the SQL scripts.
   * See Supabase docs for how to run SQL in the dashboard. ([Supabase][1])

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Build for production**

   ```bash
   npm run build
   ```

---

## ✅ Deployment

To deploy this app for production:

1. Build the app using `npm run build`.
2. Serve the built files using a static host (Netlify, Vercel, or any static file host).
3. Ensure your environment variables (Supabase URL, anon key) are set in your hosting environment.

---

## 💡 Usage

* **Sign up / Login** — Create or use an existing account to access user features
* **Browse Products** — View available products, view details
* **Search** — Use the search bar to find products
* **Cart** — Add or remove items, view total
* **Checkout** — Place orders (or simulate order placement)
* **Manage Inventory** — *(For admin or dev)* Use SQL scripts + Supabase dashboard to add / update products

---

## 🧪 Testing & Environment

* *(If you have tests)*: Run your test suite via:

  ```bash
  npm test
  ```

* *(Optional)*: Use Supabase’s **Row-Level Security (RLS)** for granular data access control.

---

## 👥 Contributing

Contributions are very welcome! If you'd like to contribute:

1. Fork the repo
2. Create a new branch (`git checkout -b feature/X`)
3. Make your changes & commit (`git commit -m "Add feature X"`)
4. Push (`git push origin feature/X`)
5. Open a Pull Request

Please follow best practices: write clean code, test features, and update documentation.

---

## 📚 Resources & References

* [Supabase React Quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs) ([Supabase][2])
* [Supabase + React Auth Tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-react) ([Supabase][1])

---

## ⚠️ Known Issues / To-Do

* [ ] Payment integration (Stripe / PayPal)
* [ ] Order history page (if not implemented)
* [ ] Admin dashboard for managing users / orders
* [ ] Image upload for products using Supabase Storage
* [ ] Better error handling & UI feedback

---

## 📄 License

Specify your license here (e.g., MIT, Apache 2.0, etc.)

---

## 🙏 Acknowledgments

* Built using **React + Vite**
* UI components from **shadcn-ui**
* Powered by **Supabase** (Auth + Database)
* Styling done via **Tailwind CSS**

---

If you like, I can **auto-generate a polished README.md** tailored to *all the features your repo currently has* (by reading the structure). Do you want me to do that?

[1]: https://supabase.com/docs/guides/getting-started/tutorials/with-react?utm_source=chatgpt.com "Build a User Management App with React | Supabase Docs"
[2]: https://supabase.com/docs/guides/getting-started/quickstarts/reactjs?utm_source=chatgpt.com "Use Supabase with React | Supabase Docs"
