'use client'; // (1) Home page ke sections — sirf tarteeb, frame SiteShell deta hai

import Hero from './Hero';
import Marquee from './Marquee';
import ShopSection from './ShopSection';
import Collections from './Collections';
import WhyUs from './WhyUs';
import Story from './Story';
import Testimonials from './Testimonials';
import ContactCTA from './ContactCTA';

// (2) Home ke hisse tarteeb se
export default function Storefront({ products = [] }) {
  return (
    <>
      <Hero />
      <Marquee />
      <ShopSection products={products} />
      <Collections products={products} />
      <WhyUs />
      <Story />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
