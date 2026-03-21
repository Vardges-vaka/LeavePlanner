import { useTranslation } from "react-i18next";
import {
  Header_public,
  Footer_public,
} from "../../../00_components/_components.index.js";
import {
  Hero,
  Features,
  How_It_Works,
  CTA_Banner,
} from "./01_home_comps/_home_comps.index.js";
import "./_styles/home.css";

const Home = () => {
  const { t } = useTranslation("home");

  return (
    <div className="home">
      <Header_public />
      <Hero t={t} />
      <Features t={t} />
      <How_It_Works t={t} />
      <CTA_Banner t={t} />
      <Footer_public />
    </div>
  );
};

export default Home;
