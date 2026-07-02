import React from 'react';

import Navigation from "@/components/Website/Home/Navigation";
import Hero from "@/components/Website/Home/Hero";
import Highlights from "@/components/Website/Home/Highlights";
import WhyAttend from "@/components/Website/Home/WhyAttend";
import WhoShouldAttend from "@/components/Website/Home/WhoShouldAttend";
import Agenda from "@/components/Website/Home/Agenda";
import Stats from "@/components/Website/Home/Stats";
import Speakers from "@/components/Website/Home/Speakers";
import Venue from "@/components/Website/Home/Venue";
import CTA from "@/components/Website/Home/CTA";
import FAQ from "@/components/Website/Home/FAQ";
import { faqData } from '../../data/faqData';  

function Home() {
  return (
   <div className="min-h-screen bg-black text-white font-manrope">
      {/* <Navigation /> */}
      <Hero />
      <Highlights />
      <WhyAttend />
      <WhoShouldAttend />
      <Agenda />
      <Stats />
      <Speakers />
      <Venue />
      <FAQ faqs={faqData} />
      <CTA />
    </div>
  );
}

export default Home;