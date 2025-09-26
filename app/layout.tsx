import "./globals.css";
import Providers from "./providers";

export const metadata = { 
  title: "Beacon Platform",
  description: "AI-powered agents that transform your business data into actionable insights"
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
