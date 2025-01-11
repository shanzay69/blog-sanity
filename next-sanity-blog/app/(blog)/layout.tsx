import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  VisualEditing,
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";

import AlertBanner from "./alert-banner";
import PortableText from "./portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import Link from "next/link";
import CommentSec from "./commentsec/page";


export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await sanityFetch({ query: settingsQuery });
  const footer = data?.footer || [];
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${inter.variable} text-black`}>
      <body>
        <section className="min-h-screen">
           <AlertBanner />
          <main>{children}</main>
          <CommentSec/>
          <footer className="bg-black-1 border-black-2 border-t bg-slate-600">
  <div className="container mx-auto px-5">
    {footer.length > 0 ? (
      <PortableText
        className="prose-sm text-pretty bottom-0 w-full max-w-none py-12 text-center md:py-20"
        value={footer as PortableTextBlock[]}
      />
    ) : (
      <div className="flex flex-col items-center py-28 lg:flex-row">
        <h3 className="mb-8 text-center text-1xl font-bold leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-3xl">
          Thanks For Visite it.
        </h3>
        <div className="flex items-center space-x-2">
          <p className="uppercase">© 2025 shanza khan BestCarsBlog</p>
        </div>
        <div className="flex flex-col items-center justify-center lg:w-1/2 lg:flex-row lg:pl-4">
          <Link
            href="/"
            className="mx-3 mb-6 border border-black bg-black py-4 px-14 font-bold rounded-lg text-white transition-colors duration-200 hover:bg-cyan-700 hover:text-white lg:mb-0 lg:px-8"
          >
            Back To Home
          </Link>
        </div>
      </div>
    )}
  </div>
</footer>
        </section>
        {isDraftMode && <VisualEditing />}
        <SpeedInsights />
        
      </body>
    </html>
  );
}
