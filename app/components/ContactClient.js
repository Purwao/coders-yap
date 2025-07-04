'use client';

import React from "react";
import HeaderClient from "../components/HeaderClient";
import Footer from "../components/Footer";
import LenisProvider from "../providers/LenisProvider";

export default function ContactClient({ posts }) {
  // Accordion data
  const faqs = [
    {
      question: "How can I reach out to you?",
      answer: "You can email me directly at purwao.dev@gmail.com. I try to respond to all emails within 48 hours, unless I'm deep in code or battling a particularly nasty bug."
    },
    {
      question: "Do you take blog post requests?",
      answer: "Absolutely! If there's a specific topic you'd like me to cover, send me an email with your suggestion. While I can't promise to write about everything requested, I'll definitely consider it if it aligns with the blog's focus."
    },
    {
      question: "Can I contribute to Coders Yap?",
      answer: "Currently, Coders Yap is a personal blog, but I'm open to guest posts if the content fits the vibe. Pitch me your idea via email and we can discuss it further."
    },
    {
      question: "How often do you post new content?",
      answer: "I aim for at least 2-3 posts per month, but as any developer knows, sometimes life (and bugs) get in the way. The quality of rant matters more than the frequency!"
    },
    {
      question: "Can I use your code snippets in my projects?",
      answer: "Yes! All code shared on Coders Yap is free to use. Attribution is appreciated but not required. Just don't blame me if it breaks your production environment at 3 AM."
    }
  ];

  const [activeIndex, setActiveIndex] = React.useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <LenisProvider>
        <HeaderClient posts={posts} />
     <main className="bg-[#030712] text-white py-12 px-6 lg:px-24">
  {/* Hero Section */}
  <div className="max-w-4xl mx-auto text-center ">
    <div 
      style={{ clipPath: "polygon(5% 0, 100% 0%, 95% 100%, 0% 100%)" }}
      className="bg-blue-400 text-[#030712] text-4xl sm:text-6xl font-extrabold px-8 py-3 inline-block mb-6"
    >
      Get In Touch
    </div>
    <h1 className="text-4xl sm:text-4xl font-black mb-6">
      Let&apos;s rant about OUR code!   
    </h1>
    <p className="font-mono text-md text-gray-300 max-w-2xl mx-auto">
      Whether you&apos;ve got feedback, a burning question, or want to suggest a topic for my next rant, 
      I&apos;m all ears. Well, metaphorically. I don&apos;t actually have ears on this website.
    </p>
  </div>
</main>
        <hr className="border-t border-gray-800 border-2" />
        
        {/* Contact Section */}
        <section className="bg-[#030712] text-white py-14 px-6 lg:px-24">
          <div className="mx-auto text-5xl sm:text-6xl font-black tracking-tight text-white mb-12 text-center">
            Contact & FAQs
          </div>
          
          <div className="max-w-3xl mx-auto">
            {/* Accordion */}
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4 border-b border-gray-700">
                <button
                  className="w-full cursor-pointer flex justify-between items-center py-4 text-left font-mono font-bold text-lg focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{faq.question}</span>
                  <span className="text-blue-400 text-2xl">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="pb-4 font-mono text-gray-300">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Direct Contact */}
            <div className="mt-12 p-6 bg-gray-900 rounded-lg">
              <h3 className="text-2xl font-bold font-mono mb-4 text-blue-400">Direct Contact</h3>
              <p className="font-mono mb-4">
                For direct inquiries, email me at:{" "}
                <a href="mailto:purwao.dev@gmail.com" className="text-blue-400 underline">
                  purwao.dev@gmail.com
                </a>
              </p>
              <p className="font-mono">
                For blog post requests, please include &quot;[Blog Request]&quot; in the subject line 
                and as much detail as possible about what you&apos;d like to see covered.
              </p>
            </div>
          </div>
        </section>
        
        <Footer></Footer>
      </LenisProvider>
    </>
  );
}