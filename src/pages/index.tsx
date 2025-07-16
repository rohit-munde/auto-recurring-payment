import Checkout from "@/components/Checkout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>INR Payment Platform</title>
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <Checkout />
      </main>
    </>
  );
}
