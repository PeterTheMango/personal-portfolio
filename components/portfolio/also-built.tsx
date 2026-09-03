import Image from "next/image";
import { alsoBuilt } from "./content";

export function AlsoBuilt() {
  return (
    <section className="pf-section">
      <h2 className="pf-label" style={{ marginBottom: 6 }} data-reveal>
        Also built
      </h2>
      <div className="pf-list">
        {alsoBuilt.map((item) => (
          <a
            key={item.title}
            className="pf-row"
            href={item.href}
            target="_blank"
            rel="noopener"
            data-reveal
          >
            <span className="pf-row-thumb">
              <Image src={item.image} alt={item.title} fill sizes="64px" />
            </span>
            <span className="pf-row-title">{item.title}</span>
            <span className="pf-row-desc">{item.description}</span>
            <span className="pf-row-year">{item.year}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
