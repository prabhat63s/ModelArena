import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "@/styles/globals.css";
import ReduxProvider from '@/redux/redux-provider';
import Layout from "@/layout";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ModelArena",
  description: "Send one prompt to several AI models and compare their answers.",
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
