import { GraphinContext } from "@antv/graphin";
import { useContext, useEffect } from "react";
import { CanvasClickProps } from "./CanvasClickProps.interface";

export const CanvasClick = ({ deselectNode }: CanvasClickProps) => {
  const { graph } = useContext(GraphinContext);

  useEffect(() => {
    const handleClick = () => {
      deselectNode();
    };

    graph.on("canvas:click", handleClick);
    return () => {
      graph.off("canvas:click", handleClick);
    };
  }, [graph, deselectNode]);

  return null;
};
