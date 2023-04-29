import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import { GraphinData, Utils } from "@antv/graphin";
import { Graph } from "./components/graph/Graph";
import { useEffect, useState } from "react";

const App = () => {
  const [selectedNode, setSelectedNode] = useState<string | undefined>();
  const [initData, setInitData] = useState(Utils.mock(30).tree().graphin());

  const handleDeselectNode = () => {
    setSelectedNode(undefined);
  };

  useEffect(() => {
    const transformData = () => {
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

      setInitData(transformedData);
    };

    transformData();
  }, [initData]);

  return (
    <>
      <Graph
        data={initData ? initData : { nodes: [], edges: [] }}
        setSelectedNode={setSelectedNode}
        handleDeselectNode={handleDeselectNode}
      />
      {selectedNode ? (
        <div className="absolute top-20 right-5 h-[calc(100%-100px)] text-white z-50 w-80 p-2 rounded-md bg-popup">
          <div className="flex justify-between items-center">
            <p className="text-lg">Selected Node</p>
            <CloseOutlined onClick={() => setSelectedNode(undefined)} />
          </div>
          <Divider className="my-2 bg-[#1f1f1f]" />
          <div className="flex flex-col gap-2  overflow-y-auto h-[calc(100%-50px)]">
            Node Details
            <div className="rounded-md bg-[#1f1f1f] p-2 whitespace-pre">
              {JSON.stringify(
                initData.nodes.find((node) => node.id === selectedNode),
                null,
                "\t"
              )}
            </div>
            Child Relationship:
            <div className="rounded-md bg-[#1f1f1f] p-2 whitespace-pre">
              {JSON.stringify(
                initData.edges.filter((edge) => edge.source === selectedNode),
                null,
                "\t"
              )}
            </div>
            Parent Relationship
            <div className="rounded-md bg-[#1f1f1f] p-2 whitespace-pre">
              {JSON.stringify(
                initData.edges.filter((edge) => edge.target === selectedNode),
                null,
                "\t"
              )}
            </div>
          </div>
        </div>
      ) : null}
      <div className="absolute top-5 right-5">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          size={"large"}
          className="flex items-center bg-popup"
        >
          Add
        </Button>
      </div>
    </>
  );
};

export default App;
