import { useTemplate } from "./template";

export interface TemplateRendererProps {
  content: string;
  values: Record<string, any>;
}

export const TemplateRenderer = (props: TemplateRendererProps) => {
  const rendered = useTemplate(props.content, props.values);
  return <div>{rendered}</div>;
};
