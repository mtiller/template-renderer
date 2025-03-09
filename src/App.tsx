import "./App.css";
import { TemplateRenderer } from "../pkg";
import { useEffect, useState } from "react";

const initialTemplate = "This is a sample...x = {{ x }}";

const initialValue = { x: 5 };

function App() {
  const [template, setTemplate] = useState<string>(initialTemplate);
  const [valueText, setValueText] = useState<string>(
    JSON.stringify(initialValue)
  );
  const [value, setValue] = useState<any>(initialValue);

  useEffect(() => {
    try {
      const val = JSON.parse(valueText);
      setValue(val);
    } catch (e) {
      console.error(e);
    }
  }, [valueText]);
  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex" }}>
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <textarea
          style={{ flexGrow: 1 }}
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
        style={{ flexGrow: 1 }}
        content={template}
        values={value}
      ></TemplateRenderer>
    </div>
  );
}

export default App;
