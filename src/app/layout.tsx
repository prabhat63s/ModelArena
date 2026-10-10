import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ReduxProvider from '@/redux/redux-provider';
import Layout from "@/layout";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ModelArena",
  description: "Send one prompt to many AI models and compare their answers side by side.",
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en" className="dark">
      <body className={`${sans.variable} font-sans antialiased`} suppressHydrationWarning>
        <ReduxProvider>
          <Layout>
            {children}
          </Layout>
        </ReduxProvider>
      </body>
    </html>
  );
}

export default RootLayout;
