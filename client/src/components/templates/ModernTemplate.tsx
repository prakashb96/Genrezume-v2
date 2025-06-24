import A4Template from "./A4Template";
import { ResumeData } from "@shared/schema";

interface ModernTemplateProps {
  data: Partial<ResumeData>;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  return <A4Template data={data} />;
}