import Hero from "../components/home/Hero";
import Featured from "../components/home/Featured";
import Description from "../components/home/Description";
import Services from "../components/home/Services";
import PricingTable from "../components/home/PricingTable";
import FAQ from "../components/home/FAQ";
import Testimonial from "../components/home/Testimonial";
import CallToAction from "../components/home/CallToAction";

export default function Home() {
  return (
    <main>
      <Hero />
      <Featured />
      <Description />
      <Services />
      <PricingTable />
      <FAQ />
      <Testimonial />
      <CallToAction />
    </main>
  );
}
