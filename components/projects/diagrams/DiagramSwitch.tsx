import type { DiagramKey } from "@/content/types";
import { AgentArchitecture } from "./AgentArchitecture";
import { DelayPropagation } from "./DelayPropagation";
import { HybridAgentFlow } from "./HybridAgentFlow";
import { RagPipeline } from "./RagPipeline";
import { RcaWorkflow } from "./RcaWorkflow";
import { SegmentationFlow } from "./SegmentationFlow";

/**
 * Maps a project's `diagram` key to its component.
 *
 * To add a diagram: build the component in this folder, add its key to
 * `DiagramKey` in content/types.ts, and register it here.
 *
 * NOTE: `EnsemblePipeline.tsx` is still on disk but intentionally NOT
 * registered — it belonged to the Bankruptcy Prediction project, which was
 * removed. To bring that project back, restore its entry in
 * content/projects.ts, re-add "ensemble" to `DiagramKey`, and import it here.
 */
const DIAGRAMS: Record<DiagramKey, () => React.JSX.Element> = {
  agent: AgentArchitecture,
  hybrid: HybridAgentFlow,
  propagation: DelayPropagation,
  rag: RagPipeline,
  rca: RcaWorkflow,
  segmentation: SegmentationFlow,
};

export function DiagramSwitch({ diagram }: { diagram?: DiagramKey }) {
  if (!diagram) return null;
  const Diagram = DIAGRAMS[diagram];
  return <Diagram />;
}
