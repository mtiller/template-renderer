import "./App.css";
import { TemplateRenderer } from "../pkg";

function App() {
  return (
    <TemplateRenderer
      content="This is a sample...x = {{ x }}"
      values={{ x: 5 }}
    ></TemplateRenderer>
  );
}

export default App;
