import "./App.css";
import { TemplateRenderer } from "../pkg/index.js";
import { useEffect, useState } from "react";

const initialTemplate = `# \`<TemplateRenderer>\`

## Usage

This widget allows you to write Markdown (potentially mixed with HTML)

But it does a few more things.  It also:
- Allows you to evaluate expressions inside {% raw %}\`{{\`{% endraw %} \`...\` {% raw %}\`}}\`{% endraw %}
- Automatically includes plugins to support math rendering
- Automatically sanitizes the output
- Embed custom components (or custom elements)

## Example

If $x={{x}}$ and $y={{y}}$ then...

$$
x+y={{ x+y }}
$$

You can also include graphics with embedded expressions, _e.g.,_

<svg width="300" height="130" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="100" x="0" y="0" rx="0" ry=0" fill="black"/>
  <rect width="{{ width | default(80) }}" height="40" x="{{50*s*s+25}}" y="{{10+40*c*c+8*s}}" rx="20" ry="20" fill="blue" />
  <circle cx="{{100+20*s}}" cy="{{50+10*c}}" r="5" fill="green" stroke="lightgreen"/>
  <circle cx="{{100+20*c}}" cy="{{50+10*s}}" r="5" fill="red" stroke="orange"/>
</svg>

The variables $s$ and $c$ in the SVG are a sine and cosine wave, respectively.  These are computed behind
the scenes as functions of time to demonstrate how templating can be used to produce animations.`;

const initialValue = { x: 5, y: 10 };

function App() {
  const [template, setTemplate] = useState<string>(initialTemplate);
  const [valueText, setValueText] = useState<string>(
    JSON.stringify(initialValue)
  );
  const [value, setValue] = useState<any>(initialValue);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    setInterval(() => setTime((time) => time + 0.03), 50);
  }, []);
  useEffect(() => {
    try {
      const val = JSON.parse(valueText);
      setValue({ ...val, s: Math.sin(time), c: Math.cos(time), time: time });
    } catch (e) {
      console.error(e);
    }
  }, [valueText, time]);
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        gap: 5,
      }}
    >
      <div
        style={{
          flexGrow: 1,
          maxWidth: "50vw",
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <textarea
          style={{ flexGrow: 3 }}
          onChange={(ev) => setTemplate(ev.target.value)}
        >
          {template}
        </textarea>
        <textarea
          style={{ flexGrow: 1 }}
          onChange={(ev) => setValueText(ev.target.value)}
        >
          {valueText}
        </textarea>
      </div>
      <TemplateRenderer
        style={{ marginLeft: "2em", flexGrow: 1, maxWidth: "50vw" }}
        content={template}
        values={value}
      ></TemplateRenderer>
    </div>
  );
}

export default App;
