import { GraphinData, Utils } from "@antv/graphin";
import { Graph } from "./components/graph/Graph";
import { useState } from "react";

const App = () => {
  const [selectedNode, setSelectedNode] = useState<string>("");
  const [initData] = useState(Utils.mock(30).tree().graphin());

  const transformData = (): GraphinData => {
    const transformedData: GraphinData = { nodes: [], edges: [] };

    transformedData.nodes = initData.nodes.map((node) => {
      return {
        ...node,
        style: {
          ...node.style,
          keyshape: {
            ...node.style?.keyshape,
            size: 30,
          },
          label: {
            ...node.style?.label,
            offset: [0, 20],
          },
        },
      };
    });

    transformedData.edges = [...initData.edges];

    return transformedData;
  };

  return (
    <>
      <div className="absolute top-5 right-5 h-[calc(100%-40px)] text-white z-50 w-80 p-2 rounded-md bg-popup overflow-y-auto">
        {selectedNode ? (
          <div className="flex flex-col gap-2">
            Node Details
            <div className="rounded-md bg-[#1f1f1f] p-2 whitespace-pre">
              {JSON.stringify(
                initData.nodes.find((node) => node.id === selectedNode), null, "\t"
              )}
            </div>
            Child Relationship:
            <div className="rounded-md bg-[#1f1f1f] p-2 whitespace-pre">
              {JSON.stringify(
                initData.edges.filter((edge) => edge.source === selectedNode), null, "\t"
              )}
            </div>
            Parent Relationship
            <div className="rounded-md bg-[#1f1f1f] p-2 whitespace-pre">
              {JSON.stringify(
                initData.edges.filter((edge) => edge.target === selectedNode), null, "\t"
              )}
            </div>
          </div>
        ) : null}
      </div>
      <Graph data={transformData()} setSelectedNode={setSelectedNode} />
    </>
  );
};

export default App;
