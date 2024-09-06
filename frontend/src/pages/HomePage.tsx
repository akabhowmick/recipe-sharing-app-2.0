import { SiteDescription } from "../components/HomePageComponents/SiteDescription.tsx";
import { FeaturedMeals } from "../components/HomePageComponents/FeaturedMeals.tsx";
import { Hero } from "../components/HomePageComponents/Hero.tsx";

export const HomePage = () => {

  return (
    <>
      <Hero />
      <FeaturedMeals />
      <SiteDescription />
    </>
  );
};
