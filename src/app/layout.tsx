import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@/styles/globals.css";
import ReduxProvider from '@/redux/redux-provider';
import Layout from "@/layout";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ModelArena",
  description: "Open Graph setting",
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.className} antialiased`} suppressHydrationWarning>
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
