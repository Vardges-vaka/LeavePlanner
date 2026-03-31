import { useState, useCallback, useRef } from "react";
import {
  ButtonGeneric,
  Header_public,
  Footer_public,
} from "../00_components/_components.index.js";
import "./test.css";

const VERSIONS = ["primary", "secondary", "normal"];
const SIZES = ["xs", "s", "m", "l", "xl", "xxl"];

const Test = () => {
  const [log, setLog] = useState("Click any button to see events here...");
  const btnRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const handleClick = useCallback((label) => {
    setLog(`onClick → "${label}" at ${new Date().toLocaleTimeString()}`);
    switch (label) {
      case "primary":
        setLoading(true);
        break;
      case "secondary":
        setLoading(false);
        break;
      case "normal":
        setLoading3(!loading3);
        break;
    }
  }, []);

  const handleDataClick = useCallback((e) => {
    const { userid, action } = e.target.dataset;
    setLog(`data_* click → userId: ${userid}, action: ${action}`);
  }, []);

  const handleRefClick = useCallback(() => {
    if (btnRef.current) {
      btnRef.current.focus();
      setLog(`Ref focused → tagName: ${btnRef.current.tagName}`);
    }
  }, []);

  return (
    <>
      <Header_public />{" "}
      <div className="testPage">
        <h1 className="testPage_heading">ButtonGeneric Showcase</h1>
        <p className="testPage_subtitle">
          Every prop variation rendered side-by-side.
        </p>

        {/* ── Event log ─────────────────────────────────────── */}
        <div className="testPage_log">{log}</div>

        {/* ═══════════════════════════════════════════════════
          1. VERSIONS — text only
          ═══════════════════════════════════════════════════ */}
        <div className="testPage_section">
          <h2 className="testPage_sectionTitle">1. Versions (text only)</h2>
          <p className="testPage_sectionDesc">
            primary / secondary / normal — default size M.
          </p>
          <div className="testPage_row">
            {/* {VERSIONS.map((v) => (
              <ButtonGeneric
                key={v}
                text={v.charAt(0).toUpperCase() + v.slice(1)}
                version={v}
                onClick={() => handleClick(v)}
                loading={loading}
              />
            ))} */}
            <ButtonGeneric
              text="primary"
              version="primary"
              onClick={() => handleClick("primary")}
              loading={loading}
            />
            <ButtonGeneric
              text="secondary"
              version="secondary"
              onClick={() => handleClick("secondary")}
              loading={loading2}
            />
            <ButtonGeneric
              text="normal"
              version="normal"
              onClick={() => handleClick("normal")}
              loading={loading3}
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
          2. SIZES
          ═══════════════════════════════════════════════════ */}
        <div className="testPage_section">
          <h2 className="testPage_sectionTitle">2. Sizes</h2>
          <p className="testPage_sectionDesc">
            XS through XXL — shown for each version.
          </p>
          {VERSIONS.map((v) => (
            <div key={v} className="testPage_card">
              <div className="testPage_cardTitle">{v}</div>
              <div className="testPage_row">
                {SIZES.map((s) => (
                  <ButtonGeneric
                    key={s}
                    text={s.toUpperCase()}
                    version={v}
                    size={s}
                    onClick={() => handleClick(`${v} ${s}`)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════
          3. ICON POSITIONS
          ═══════════════════════════════════════════════════ */}
        <div className="testPage_section">
          <h2 className="testPage_sectionTitle">3. Icon positions</h2>
          <p className="testPage_sectionDesc">
            Left only, right only, both sides, icon-only (no text).
          </p>
          <div className="testPage_row">
            <ButtonGeneric
              text="Left icon"
              version="primary"
              icon={{ left: { name: "ArrowLeft" } }}
              onClick={() => handleClick("left icon")}
            />
            <ButtonGeneric
              text="Right icon"
              version="primary"
              icon={{ right: { name: "ArrowRight" } }}
              onClick={() => handleClick("right icon")}
            />
            <ButtonGeneric
              text="Both icons"
              version="primary"
              icon={{
                left: { name: "ChevronLeft" },
                right: { name: "ChevronRight" },
              }}
              onClick={() => handleClick("both icons")}
            />
            <ButtonGeneric
              version="secondary"
              icon={{ left: { name: "X" } }}
              ariaLabel="Close"
              onClick={() => handleClick("icon-only")}
            />
            <ButtonGeneric
              version="normal"
              icon={{ left: { name: "Settings" } }}
              ariaLabel="Settings"
              onClick={() => handleClick("icon-only settings")}
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
          4. ICON TYPES — lucide vs img
          ═══════════════════════════════════════════════════ */}
        <div className="testPage_section">
          <h2 className="testPage_sectionTitle">4. Icon types</h2>
          <p className="testPage_sectionDesc">
            Lucide-react by name vs. custom img src. Mixed on the same button.
          </p>
          <div className="testPage_row">
            <ButtonGeneric
              text="Lucide icon"
              version="primary"
              icon={{ left: { name: "Star" } }}
              onClick={() => handleClick("lucide")}
            />
            <ButtonGeneric
              text="IMG icon"
              version="secondary"
              icon={{
                left: {
                  img: {
                    src: "https://api.iconify.design/mdi:react.svg",
                    alt: "React logo",
                  },
                },
              }}
              onClick={() => handleClick("img icon")}
            />
            <ButtonGeneric
              text="Mixed"
              version="normal"
              icon={{
                left: { name: "Zap" },
                right: {
                  img: {
                    src: "https://api.iconify.design/mdi:github.svg",
                    alt: "GitHub",
                  },
                },
              }}
              onClick={() => handleClick("mixed icons")}
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
          5. SIZES WITH ICONS
          ═══════════════════════════════════════════════════ */}
        <div className="testPage_section">
          <h2 className="testPage_sectionTitle">5. Sizes with icons</h2>
          <p className="testPage_sectionDesc">
            Icons scale proportionally with size.
          </p>
          <div className="testPage_row">
            {SIZES.map((s) => (
              <ButtonGeneric
                key={s}
                text={s.toUpperCase()}
                version="primary"
                size={s}
                icon={{ left: { name: "Download" } }}
                onClick={() => handleClick(`icon size ${s}`)}
              />
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
          6. LOADING STATE
          ═══════════════════════════════════════════════════ */}
        <div className="testPage_section">
          <h2 className="testPage_sectionTitle">6. Loading state</h2>
          <p className="testPage_sectionDesc">
            Spinner overlays content, button auto-disables. Shown per version.
          </p>
          <div className="testPage_row">
            {VERSIONS.map((v) => (
              <ButtonGeneric
                key={v}
                text={`Loading ${v}`}
                version={v}
                loading={true}
                icon={{ left: { name: "Save" } }}
              />
            ))}
          </div>
          <p className="testPage_sectionDesc">Loading at different sizes:</p>
          <div className="testPage_row">
            {SIZES.map((s) => (
              <ButtonGeneric
                key={s}
                text={s.toUpperCase()}
                version="primary"
                size={s}
                loading={true}
              />
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
          7. DISABLED STATE
          ═══════════════════════════════════════════════════ */}
        <div className="testPage_section">
          <h2 className="testPage_sectionTitle">7. Disabled state</h2>
          <p className="testPage_sectionDesc">
            Reduced opacity, cursor not-allowed, no hover effects.
          </p>
          <div className="testPage_row">
            {VERSIONS.map((v) => (
              <ButtonGeneric
                key={v}
                text={`Disabled ${v}`}
                version={v}
                disabled={true}
                icon={{ left: { name: "Ban" } }}
              />
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
          8. FULL WIDTH
          ═══════════════════════════════════════════════════ */}
        <div className="testPage_section">
          <h2 className="testPage_sectionTitle">8. Full width</h2>
          <p className="testPage_sectionDesc">
            Button stretches to container width. Capped at 400px here.
          </p>
          <div className="testPage_fullWidthDemo">
            {VERSIONS.map((v) => (
              <div key={v} style={{ marginBottom: 10 }}>
                <ButtonGeneric
                  text={`Full width ${v}`}
                  version={v}
                  fullWidth={true}
                  icon={{ right: { name: "ArrowRight" } }}
                  onClick={() => handleClick(`fullWidth ${v}`)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
          9. TOOLTIP
          ═══════════════════════════════════════════════════ */}
        <div className="testPage_section">
          <h2 className="testPage_sectionTitle">9. Tooltip</h2>
          <p className="testPage_sectionDesc">
            Hover or focus any button below to see the tooltip.
          </p>
          <div className="testPage_row" style={{ marginTop: 40 }}>
            <ButtonGeneric
              text="Hover me"
              version="primary"
              tooltip="This is a primary action"
              icon={{ left: { name: "Info" } }}
            />
            <ButtonGeneric
              text="Archive"
              version="normal"
              tooltip="Move to archive folder"
              icon={{ left: { name: "Archive" } }}
            />
            <ButtonGeneric
              version="secondary"
              icon={{ left: { name: "Trash2" } }}
              ariaLabel="Delete"
              tooltip="Permanently delete this item"
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
          10. DATA ATTRIBUTES
          ═══════════════════════════════════════════════════ */}
        <div className="testPage_section">
          <h2 className="testPage_sectionTitle">10. data_* attributes</h2>
          <p className="testPage_sectionDesc">
            Click to extract userId and action from e.target.dataset.
          </p>
          <div className="testPage_row">
            <ButtonGeneric
              text="Delete user"
              version="secondary"
              icon={{ left: { name: "UserX" } }}
              data_userId="usr_42"
              data_action="delete"
              onClick={handleDataClick}
            />
            <ButtonGeneric
              text="Approve request"
              version="primary"
              icon={{ left: { name: "CheckCircle" } }}
              data_userId="usr_99"
              data_action="approve"
              onClick={handleDataClick}
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
          11. FORWARDED REF
          ═══════════════════════════════════════════════════ */}
        <div className="testPage_section">
          <h2 className="testPage_sectionTitle">11. forwardRef</h2>
          <p className="testPage_sectionDesc">
            Click &quot;Focus target&quot; to programmatically focus the
            ref-attached button.
          </p>
          <div className="testPage_row">
            <ButtonGeneric
              text="Focus target"
              version="normal"
              onClick={handleRefClick}
            />
            <ButtonGeneric
              ref={btnRef}
              text="I receive focus via ref"
              version="primary"
              icon={{ left: { name: "Crosshair" } }}
              onClick={() => handleClick("ref target clicked")}
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
          12. CUSTOM CLASSNAME
          ═══════════════════════════════════════════════════ */}
        <div className="testPage_section">
          <h2 className="testPage_sectionTitle">12. Custom className</h2>
          <p className="testPage_sectionDesc">
            Passing className=&quot;myCustomBtn&quot; — inspect in DevTools to
            verify it is appended.
          </p>
          <div className="testPage_row">
            <ButtonGeneric
              text="Has custom class"
              version="normal"
              className="myCustomBtn"
              onClick={() => handleClick("custom class")}
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
          13. COMBINED STRESS TEST
          ═══════════════════════════════════════════════════ */}
        <div className="testPage_section">
          <h2 className="testPage_sectionTitle">13. Combined stress test</h2>
          <p className="testPage_sectionDesc">
            Multiple props at once — large primary, loading, fullWidth, with
            tooltip and icons.
          </p>
          <div className="testPage_fullWidthDemo" style={{ marginTop: 40 }}>
            <ButtonGeneric
              text="Submitting application..."
              version="primary"
              size="xl"
              fullWidth={true}
              loading={true}
              tooltip="Please wait while we process"
              icon={{
                left: { name: "Send" },
                right: { name: "Loader" },
              }}
            />
          </div>
        </div>
      </div>
      <Footer_public />
    </>
  );
};

export default Test;
