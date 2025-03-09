import { useEffect, useState } from "react";
import nunjucks from "nunjucks";

export function useTemplate(template: string, values: Record<string, any>) {
  const [rendered, setRendered] = useState<string>("");

  useEffect(() => {
    nunjucks.renderString(
      template,
      { ...values, Math: Math },
      (err, result) => {
        if (err) setRendered("Rendering error: " + err.message);
        else setRendered(result ?? "No rendered output");
      }
    );
  }, [template, values]);

  return rendered;
}
