import OurTeamSection from "./components/home/ourteam";
import OurServices from "./components/home/ourservices";
import OurExpertise from "./components/home/ourexpertise";
import Homehero from "./components/home/homehero";

export default function Home() {
  return (
    <>
      <Homehero />
      <OurServices />
      <OurTeamSection />
      <OurExpertise />
       
    </>
  );
}
