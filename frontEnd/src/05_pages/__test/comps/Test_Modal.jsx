import { useState } from "react";
import { ModalGeneric, ButtonGeneric } from "../../../00_components/_components.index.js";
import "../styles/test_Toggler.css"; // Reuse test styles

const Test_Modal = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [sizesOpen, setSizesOpen] = useState({ s: false, m: false, l: false, xl: false, full: false });
  const [noFooterOpen, setNoFooterOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoadingConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoadingOpen(false);
    }, 2000);
  };

  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    marginBottom: "3rem",
    padding: "1.5rem",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
  };

  const groupStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  };

  return (
    <div>
      <h1 className="testPage_heading">ModalGeneric Showcase</h1>

      <section style={sectionStyle}>
        <h2>1. Basic Modal</h2>
        <div style={groupStyle}>
          <ButtonGeneric text="Open Basic Modal" onClick={() => setBasicOpen(true)} />
          <ModalGeneric 
            isOpen={basicOpen}
            title="Basic Configuration"
            content={<p>This is a standard default modal. It uses size "m" and has a header, body, and footer. Try clicking the overlay!</p>}
            onCancel={() => setBasicOpen(false)}
            onConfirm={() => { alert("Confirmed!"); setBasicOpen(false); }}
          />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>2. Sizes</h2>
        <div style={groupStyle}>
          {Object.keys(sizesOpen).map(sz => (
            <div key={sz}>
              <ButtonGeneric text={`Open Size: ${sz}`} onClick={() => setSizesOpen(prev => ({...prev, [sz]: true}))} />
              <ModalGeneric 
                isOpen={sizesOpen[sz]}
                title={`Size: ${sz}`}
                size={sz}
                content={<p>This modal is rendered with size prop set to "{sz}".</p>}
                onCancel={() => setSizesOpen(prev => ({...prev, [sz]: false}))}
                onConfirm={() => setSizesOpen(prev => ({...prev, [sz]: false}))}
              />
            </div>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>3. Custom Footer / No Footer</h2>
        <div style={groupStyle}>
          <ButtonGeneric text="Open No Footer Modal" onClick={() => setNoFooterOpen(true)} />
          <ModalGeneric 
            isOpen={noFooterOpen}
            title="No Default Footer"
            hideFooter={true}
            onCancel={() => setNoFooterOpen(false)}
            closeOnOverlayClick={false}
          >
            <p style={{ marginBottom: "1rem" }}>This modal hides the default footer and disables overlay clicking!</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <ButtonGeneric version="secondary" text="Left Context Action" />
              <ButtonGeneric version="primary" text="Close Manually" onClick={() => setNoFooterOpen(false)} />
            </div>
          </ModalGeneric>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>4. Loading State & Dataset</h2>
        <div style={groupStyle}>
          <ButtonGeneric text="Open Loading Modal" onClick={() => setLoadingOpen(true)} />
          <ModalGeneric 
            isOpen={loadingOpen}
            title="Async Operation"
            content={<p>Click confirm to simulate a 2-second API call.</p>}
            onCancel={() => setLoadingOpen(false)}
            onConfirm={handleLoadingConfirm}
            loading={loading}
            confirmText="Save Changes"
            cancelText="Abort"
            data_test_prop="metadata-passed"
          />
        </div>
      </section>

    </div>
  );
};

export default Test_Modal;
