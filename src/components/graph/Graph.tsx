import Graphin, { Behaviors } from "@antv/graphin";
import { NodeClick } from "./NodeClick/NodeClick";
import { GraphProps } from "./GraphProps.interface";

export const Graph = ({ data, setSelectedNode }: GraphProps) => {
  const { ZoomCanvas } = Behaviors;

  return (
    <Graphin data={data} layout={{ type: "dagre" }} theme={{ mode: "dark" }}>
      <ZoomCanvas />
      <NodeClick setSelectedNode={setSelectedNode} />
    </Graphin>
  );
};
