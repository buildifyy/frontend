import { GraphinData } from "@antv/graphin";

export interface GraphProps {
  readonly data: GraphinData;
  readonly setSelectedNode: (val: string) => void;
  readonly handleDeselectNode: () => void;
  readonly setShouldExpand: (val: boolean) => void;
  readonly setRightClickedNode: (val: string) => void;
}
