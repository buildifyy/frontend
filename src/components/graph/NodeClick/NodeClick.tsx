import { useContext, useEffect } from "react";
import { GraphinContext } from "@antv/graphin";
import { IG6GraphEvent, INode, NodeConfig } from "@antv/g6";
import { NodeClickProps } from "./NodeClickProps.interface";

export const NodeClick = ({ setSelectedNode }: NodeClickProps) => {
  const { graph, apis } = useContext(GraphinContext);

  useEffect(() => {
    const handleClick = (evt: IG6GraphEvent) => {
      const node = evt.item as INode;
      const model = node.getModel() as NodeConfig;
      apis.focusNodeById(model.id);

      setSelectedNode(model.id);
    };

    graph.on("node:click", handleClick);
    return () => {
      graph.off("node:click", handleClick);
    };
  }, [graph, apis, setSelectedNode]);

  return null;
};
