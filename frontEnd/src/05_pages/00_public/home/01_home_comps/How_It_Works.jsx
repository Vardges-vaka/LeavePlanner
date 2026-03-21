import { getSteps } from "../02_home_helpers/_home_helpers.index.js";
import "../_styles/how_It_Works.css";

const How_It_Works = ({ t }) => {
  const steps = getSteps(t);
  return (
    <section className="home_how">
      <div className="home_howInner">
        <h2 className="home_sectionTitle">{t("howTitle")}</h2>
        <p className="home_sectionSubtitle">{t("howSubtitle")}</p>
        <div className="home_howSteps">
          {steps.map((s, i) => (
            <div className="home_howStep" key={i}>
              <div className="home_howNumber">{i + 1}</div>
              <h3 className="home_howStepTitle">{s.title}</h3>
              <p className="home_howStepDesc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default How_It_Works;
