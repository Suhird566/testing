import { useEffect, useRef } from "react";
import mermaid from "mermaid";

export default function MermaidDiagram({ code }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!code || !ref.current) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      securityLevel: "loose",
    });

    const id = `mermaid-${Math.random().toString(36).slice(2)}`;

    mermaid
      .render(id, code)
      .then(({ svg }) => {
        ref.current.innerHTML = svg;
      })
      .catch((err) => {
        console.error("Mermaid render error:", err);
        ref.current.innerHTML = `
          <pre style="
            color:#f87171;
            white-space:pre-wrap;
            font-size:13px;
          ">
Mermaid error:
${String(err)}

Code:
${code}
          </pre>
        `;
      });
  }, [code]);

  return (
    <div
      ref={ref}
      style={{
        background: "#0b1220",
        padding: 20,
        borderRadius: 14,
        overflow: "auto",
        border: "1px solid #1e293b",
        minHeight: 260,
      }}
    />
  );
}
