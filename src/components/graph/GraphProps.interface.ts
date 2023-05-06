import { GraphinData } from "@antv/graphin";

export interface GraphProps {
  readonly data: GraphinData;
  readonly setSelectedNode: (val: string) => void;
  readonly handleDeselectNode: () => void;
  readonly setNodeToExpand: (val: string) => void;
  readonly setNodeToHide: (val: string) => void;
}
