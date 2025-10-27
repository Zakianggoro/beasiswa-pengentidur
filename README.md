# 🎓 BeasiswaKu - Scholarship Discovery Platform

BeasiswaKu is a modern web application that helps Indonesian students discover and apply for scholarships. The platform features an AI-powered chatbot, comprehensive scholarship database, deadline calendar, and helpful articles to guide students through their scholarship application journey.

## ✨ Features

- 🔍 **Advanced Search & Filter** - Find scholarships by category, location, and funding type
- 🤖 **AI Chatbot (BEBOT)** - Get personalized scholarship recommendations powered by Google Gemini AI
- 📅 **Deadline Calendar** - Track scholarship deadlines with an interactive calendar view
- 📚 **Articles & Tips** - Access comprehensive guides on writing essays, preparing for interviews, and more
- 📱 **Responsive Design** - Fully optimized for mobile, tablet, and desktop devices
- 🗄️ **Real-time Database** - Dynamic content management with Supabase

## 🚀 Tech Stack

### Frontend
- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **UI Library**: [React 18+](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend & Database
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth (ready to implement)

### AI Integration
- **AI Model**: [Google Gemini AI](https://ai.google.dev/) (`gemini-pro`)
- **Package**: `@google/generative-ai`

### Additional Tools
- **Linting**: ESLint
- **Package Manager**: npm/yarn/pnpm

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Supabase account
- Google AI API key

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/beasiswaku.git
cd beasiswaku
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Variables**

Create a `.env.local` file in the root directory:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

4. **Database Setup**

Create the following table in your Supabase database:
```sql
CREATE TABLE Beasiswa (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  organizer VARCHAR(255) NOT NULL,
  deadline DATE,
  tipe VARCHAR(100),
  lokasi VARCHAR(100),
  path TEXT,
  tingkat VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure
```
beasiswaku/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Homepage/Dashboard
│   │   ├── cari-beasiswa/          # Scholarship search page
│   │   │   └── page.tsx
│   │   ├── artikel/                # Articles listing
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Article detail page
│   │   ├── deadline/               # Deadline calendar
│   │   │   └── page.tsx
│   │   ├── bebot/                  # AI Chatbot
│   │   │   └── page.tsx
│   │   ├── recommendation/         # Scholarship details
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── database/
│       └── supabaseClient.ts       # Supabase configuration
├── public/
│   ├── components/
│   │   └── placeholder/            # Scholarship images
│   └── images/                     # Article images
├── .env.local                      # Environment variables
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🎯 Key Pages

### 1. Dashboard (`/`)
- Featured scholarships with images
- Category cards (S1/S2/S3)
- Quick tips & recommendations
- Responsive grid layout

### 2. Search Scholarships (`/cari-beasiswa`)
- Advanced filtering system
- Real-time search
- Scholarship cards with deadline countdown
- Category, location, and funding type filters

### 3. Deadline Calendar (`/deadline`)
- Interactive calendar view
- Click dates to see scholarships
- Upcoming deadlines section
- Days remaining countdown

### 4. Articles (`/artikel`)
- Category filtering
- Featured article banner
- Article cards with images
- Tips and guides for scholarship applicants

### 5. AI Chatbot (`/bebot`)
- Powered by Google Gemini AI
- Context-aware responses
- Quick action buttons
- Conversation history

### 6. Scholarship Detail (`/recommendation/[id]`)
- Complete scholarship information
- Organizer details
- Deadline and location
- Direct application link

## 🎨 Design Features

- **Mobile-First Design** - Optimized for all screen sizes
- **Hamburger Menu** - Collapsible sidebar on mobile
- **Loading Skeletons** - Smooth loading experience
- **Hover Effects** - Interactive card animations
- **Image Optimization** - Next.js Image component for performance
- **Dark Overlays** - Mobile menu with backdrop

## 🔧 Configuration

### Tailwind CSS
The project uses custom Tailwind configuration for responsive breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### TypeScript
Strict mode enabled for type safety throughout the application.

## 🙏 Acknowledgments

- Google Gemini AI for powering the chatbot
- Supabase for the database infrastructure
- Lucide for the beautiful icon set
- All contributors and supporters

## 📧 Contact

For questions, please contact:
- Email: mzakianggoro324@gmail.com
- Website: https://beasiswa-pengentidur.vercel.app/
