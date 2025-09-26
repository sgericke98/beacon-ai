# 🚀 Beacon Platform

> **AI-Powered Business Intelligence Platform**  
> Transform your business data into actionable insights with intelligent agents.

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

## ✨ Features

### 🤖 **AI Agents**
- **Data Cleaning Agent** - AI-powered deduplication for accounts and contract names
- **Lead-to-Cash Analysis** - Comprehensive sales process analytics with revenue leakage detection
- **Coming Soon**: People, Finance, and Strategy agents

### 🎨 **Modern UI/UX**
- **Professional Dashboard** - Clean, intuitive interface with real-time status indicators
- **Responsive Design** - Optimized for all devices and screen sizes
- **Dark Mode Support** - Elegant dark theme with smooth transitions
- **Interactive Components** - Hover effects, animations, and smooth transitions

### 🛠 **Technical Stack**
- **Next.js 14+** - App Router with Server Components
- **TypeScript** - Full type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **shadcn/ui** - Beautiful, accessible component library
- **TanStack Query** - Powerful data fetching and caching
- **React Hook Form + Zod** - Form handling with validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/beacon-platform.git
   cd beacon-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
beacon/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── dashboard/        # Dashboard pages
│   ├── agents/           # Agent pages
│   └── setup/            # Setup pages
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── AppSidebar.tsx
│   │   ├── ChatAgent.tsx
│   │   ├── DataCleaningAgent.tsx
│   │   └── LeadToCashAgent.tsx
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions
├── public/
│   └── assets/           # Static assets
└── package.json
```

## 🎯 Available Agents

### 📊 **Data Cleaning Agent**
- **Purpose**: AI-powered deduplication and data quality improvement
- **Features**: 
  - Automatic duplicate detection
  - Data consistency validation
  - Real-time processing indicators
  - 99.9% accuracy rate

### 💰 **Lead-to-Cash Analysis Agent**
- **Purpose**: Comprehensive sales process analytics
- **Features**:
  - Revenue leakage detection
  - Contract analysis
  - Billing discrepancy identification
  - Revenue optimization insights

### 🔮 **Coming Soon**
- **People Agents** - HR analytics and talent acquisition
- **Finance Agents** - Financial forecasting and budget analysis
- **Strategy Agents** - Market analysis and competitive intelligence

## 🛠 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Preview
npm run preview      # Preview production build
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_APP_NAME=Beacon Platform
```

## 🎨 Design System

### Colors
- **Primary**: Custom gradient system
- **Accent**: Complementary accent colors
- **Success**: Green for positive states
- **Warning**: Orange for caution states
- **Info**: Blue for informational states

### Typography
- **Headings**: Bold, semibold weights
- **Body**: Regular, medium weights
- **Captions**: Light, small sizes

### Components
- **Cards**: Elevated with shadows and borders
- **Buttons**: Multiple variants with hover states
- **Badges**: Status indicators with color coding
- **Sidebar**: Professional navigation with status indicators

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 🔧 Configuration

### Next.js Configuration
The project uses Next.js 14+ with App Router. Key configurations:
- **Image Optimization**: Enabled with custom settings
- **Webpack**: Custom alias resolution
- **Output**: Standalone for deployment

### Tailwind Configuration
Custom Tailwind setup with:
- **Design Tokens**: CSS variables for theming
- **Custom Colors**: Primary, accent, and semantic colors
- **Custom Shadows**: Elegant shadow system
- **Custom Animations**: Smooth transitions

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Docker
```bash
# Build Docker image
docker build -t beacon-platform .

# Run container
docker run -p 3000:3000 beacon-platform
```

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.beacon-platform.com](https://docs.beacon-platform.com)
- **Issues**: [GitHub Issues](https://github.com/your-org/beacon-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/beacon-platform/discussions)

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Vercel** - For the deployment platform
- **Tailwind CSS** - For the utility-first CSS framework
- **shadcn/ui** - For the beautiful component library
- **Radix UI** - For accessible component primitives

---

<div align="center">

**Built with ❤️ by the Beacon Team**

[Website](https://beacon-platform.com) • [Documentation](https://docs.beacon-platform.com) • [Support](https://support.beacon-platform.com)

</div>