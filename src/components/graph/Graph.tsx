import Graphin, { Behaviors } from "@antv/graphin";
import { NodeClick } from "./NodeClick/NodeClick";
import { GraphProps } from "./GraphProps.interface";
import { CanvasClick } from "./CanvasClick";

export const Graph = ({
  data,
  setSelectedNode,
  handleDeselectNode,
}: GraphProps) => {
  const { ZoomCanvas } = Behaviors;

  return (
    <Graphin data={data} layout={{ type: "dagre" }} theme={{ mode: "dark" }}>
      <ZoomCanvas />
      <NodeClick setSelectedNode={setSelectedNode} />
      <CanvasClick deselectNode={handleDeselectNode} />
    </Graphin>
  );
};
