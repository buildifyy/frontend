import { GraphinData } from "@antv/graphin";

export interface GraphProps {
  readonly data: GraphinData;
  readonly setSelectedNode: (val: string) => void;
}
