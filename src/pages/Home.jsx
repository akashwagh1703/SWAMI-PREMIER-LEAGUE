import Hero from '../components/Hero/Hero';
import Poster from '../components/Poster/Poster';
import EntryFee from '../components/EntryFee/EntryFee';
import MatchFormat from '../components/MatchFormat/MatchFormat';
import Awards from '../components/Awards/Awards';
import Dates from '../components/Dates/Dates';
import Venue from '../components/Venue/Venue';
import Contact from '../components/Contact/Contact';

function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Poster />
      <EntryFee />
      <MatchFormat />
      <Awards />
      <Dates />
      <Venue />
      <Contact />
    </div>
  );
}

export default Home;
