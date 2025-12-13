import React from "react";
import HeaderClient from "../components/HeaderClient";
import CardFlip from "../components/CardFlip";
import { getAllPostsMetadata } from "../providers/mdxProvider";
import Footer from "../components/Footer";
import LenisProvider from "../providers/LenisProvider";

function AboutPage() {
  const posts = getAllPostsMetadata();
  return (
    <>
      <LenisProvider>
        <HeaderClient posts={posts} />

        <main className="bg-[#030712] text-black py-12 px-6 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side: Title & Pronunciation */}
          <div className="flex-shrink-0">
            <div
              style={{ clipPath: "polygon(5% 0, 100% 0%, 95% 100%, 0% 100%)" }}
              className="bg-blue-400  text-[#030712]text-5xl sm:text-6xl font-extrabold px-6 py-2 inline-block mb-4"
            >
              CodersYap
            </div>
            <div className="text-5xl sm:text-6xl font-black tracking-tight italic text-white mb-2">
              /ˈkoʊ.dɚz.jæp/
            </div>
          </div>

          {/* Right Side: Description */}
          <div className="max-w-xl text-white font-mono text-md leading-relaxed">
            <p className="mb-4">
              This is CodersYap, a space where I share development insights,
              document experiments, and occasionally a reflection. 
            </p>
            <p className="mb-4">
              It also serves as my personal footnotes: a record of how far I’ve
              come, the lessons I’ve learned, and a portfolio of projects and
              thoughts along the way.
            </p>
          </div>
        </main>
        <hr className="border-t border-gray-800 border-2" />
        <section className="bg-[#030712] text-white py-14 px-6 lg:px-24 flex flex-col justify-center">
          <div className="mx-auto text-5xl sm:text-6xl font-black tracking-tight  text-white mb-2">
            Our Teams
          </div>
          <CardFlip></CardFlip>
        </section>
        <Footer></Footer>
      </LenisProvider>
    </>
  );
}

export default AboutPage;
