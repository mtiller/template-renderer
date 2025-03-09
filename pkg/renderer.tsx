import { useTemplate } from "./template";

export interface TemplateRendererProps {
  content: string;
  values: Record<string, any>;
  style?: React.CSSProperties;
}

export const TemplateRenderer = (props: TemplateRendererProps) => {
  const rendered = useTemplate(props.content, props.values);
  return <div style={props.style}>{rendered}</div>;
};
