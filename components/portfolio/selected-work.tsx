import Image from "next/image";
import { selectedWork } from "./content";

export function SelectedWork() {
  return (
    <section id="work" className="pf-work">
      <div className="pf-section-head" data-reveal>
        <h2 className="pf-label">Selected work</h2>
        <span className="pf-caption">Two projects, written up in depth</span>
      </div>

      <div className="pf-work-grid">
        {selectedWork.map((item) => (
          <div key={item.id} id={item.id} className="pf-card" data-reveal>
            {item.imageSrc ? (
              <div className="pf-card-media">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 720px) 100vw, 480px"
                />
              </div>
            ) : (
              /* Awaiting a real screenshot from the owner. */
              <div className="pf-card-media pf-card-media--empty">
                {item.placeholderLabel}
              </div>
            )}
            <div className="pf-card-body">
              <div className="pf-card-title-row">
                <span className="pf-card-title">{item.title}</span>
                <span className="pf-card-year">{item.year}</span>
              </div>
              <p className="pf-card-desc">{item.description}</p>
              <div className="pf-card-foot">
                <span className="pf-card-status">{item.status}</span>
                <span className="pf-card-state">{item.state}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
