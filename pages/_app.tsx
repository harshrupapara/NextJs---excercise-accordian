import "@/styles/globals.css";
import { Rubik_Mono_One, Inter } from "next/font/google";
import type { AppProps } from "next/app";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const rubik = Rubik_Mono_One({
  weight: "400",
  preload: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${rubik.style.fontFamily};
        }
        p {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
