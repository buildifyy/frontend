import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Popover,
  Select,
  theme,
} from "antd";
import { GraphinData, IUserEdge, IUserNode } from "@antv/graphin";
import { Graph } from "./components/graph/Graph";
import { useEffect, useState } from "react";

const App = () => {
  const { Option } = Select;
  const [selectedNode, setSelectedNode] = useState<string | undefined>();
  const [initData, setInitData] = useState<GraphinData>({
    nodes: [],
    edges: [],
  });
  const [openNewNodePopover, setOpenNewNodePopover] = useState<boolean>(false);
  const [newAdded, setNewAdded] = useState<boolean>(true);
  const [form] = Form.useForm();
  const [nodeToExpand, setNodeToExpand] = useState<string>();
  const [nodeToHide, setNodeToHide] = useState<string>();

  useEffect(() => {
    form.validateFields(["label"]);
  }, [form]);

  const handleCloseNodePopover = () => {
    setOpenNewNodePopover(false);
  };

  const handleOpenNewNodePopoverChange = (newOpen: boolean) => {
    setOpenNewNodePopover(newOpen);
  };

  const handleDeselectNode = () => {
    setSelectedNode(undefined);
  };

  const handleSubmit = async () => {
    await form.validateFields();

    const newId = crypto.randomUUID().toString();
    const newLabel = form.getFieldValue("label");
    const newParent = form.getFieldValue("parent");
    const newTargets = form.getFieldValue("target") as string[];
    const newEdges: IUserEdge[] = [];

    if (newParent) {
      newEdges.push({
        source: newParent,
        target: newId,
      });
    }

    if (newTargets) {
      newTargets.forEach((targetId) => {
        newEdges.push({
          source: newId,
          target: targetId,
        });
      });
    }

    setInitData({
      nodes: [
        ...initData.nodes,
        {
          id: newId,
          label: newLabel,
          type: "graphin-circle",
          style: {
            label: {
              value: newLabel,
            },
          },
        },
      ],
      edges: [...initData.edges, ...newEdges],
    });

    form.resetFields();
    setNewAdded(true);
    setOpenNewNodePopover(false);
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
      setNewAdded(false);
    };

    if (newAdded) {
      transformData();
    }
  }, [newAdded, initData]);

  useEffect(() => {
    const transformTemplateToNodeAndEdges = (
      template: any,
      nodes: IUserNode[],
      edges: IUserEdge[]
    ) => {
      nodes.push({
        id: template["id"],
        data: template["name"],
        style: {
          label: {
            value: template["name"],
            offset: [0, 20],
          },
        },
      });

      const children = template["children"] as [];
      children.forEach((child) => {
        edges.push({
          source: template["id"],
          target: child["id"],
        });
        transformTemplateToNodeAndEdges(child, nodes, edges);
      });
    };

    const transformData = (data: []) => {
      const nodes: IUserNode[] = [];
      const edges: IUserEdge[] = [];
      data.forEach((template) => {
        transformTemplateToNodeAndEdges(template, nodes, edges);
      });
      setInitData({ nodes: nodes, edges: edges });
    };

    fetch("http://localhost:5127/templates?style=tree")
      .then((res) => res.json())
      .then((data) => transformData(data));
  }, []);

  useEffect(() => {
    const expandData = (templates: any[]) => {
      const nodes: IUserNode[] = [];
      const edges: IUserEdge[] = [];
      templates.forEach((template) => {
        nodes.push({
          id: template["id"],
          data: template["name"],
          style: {
            label: {
              value: template["name"],
              offset: [0, 20],
            },
          },
        });
        edges.push({
          source: nodeToExpand || "",
          target: template["id"],
        });
      });

      setInitData({
        nodes: [...initData.nodes, ...nodes],
        edges: [...initData.edges, ...edges],
      });
    };

    if (nodeToExpand) {
      fetch(`http://localhost:5127/templates/${nodeToExpand}/children`)
        .then((res) => res.json())
        .then((data) => expandData(data));
      setNodeToExpand(undefined);
    }
  }, [nodeToExpand, initData]);

  useEffect(() => {
    if (nodeToHide) {
      const allNodes = [...initData.nodes];
      const allEdges = [...initData.edges];
      const updatedNodes = allNodes.filter((node) => node.id !== nodeToHide);
      const updatedEdges = allEdges.filter(
        (edge) => edge.source !== nodeToHide && edge.target !== nodeToHide
      );

      setInitData({
        nodes: [...updatedNodes],
        edges: [...updatedEdges],
      });
      setNodeToHide(undefined);
    }
  }, [nodeToHide, initData]);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Graph
        data={initData}
        setSelectedNode={setSelectedNode}
        handleDeselectNode={handleDeselectNode}
        setNodeToExpand={setNodeToExpand}
        setNodeToHide={setNodeToHide}
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
            <div className="rounded-md bg-[#1f1f1f] p-2 whitespace-pre-wrap">
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
        <Popover
          trigger="click"
          title="Add Node"
          open={openNewNodePopover}
          onOpenChange={handleOpenNewNodePopoverChange}
          content={
            <Form form={form} labelCol={{ span: 6 }} className="max-w-md">
              <Form.Item
                label="Label"
                name="label"
                rules={[{ required: true, message: "Please input a label!" }]}
                className="mb-2"
              >
                <Input />
              </Form.Item>
              <Form.Item label="Parent" name="parent" className="mb-2">
                <Select placeholder="Select a parent">
                  {initData.nodes.map((node) => {
                    return (
                      <Option
                        key={node.id}
                        value={node.id}
                        label={node.style?.label?.value}
                      >
                        {node.style?.label?.value}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item label="Target" name="target" className="mb-2">
                <Select mode="multiple" placeholder="Select target node/s">
                  {initData.nodes.map((node) => {
                    return (
                      <Option
                        key={node.id}
                        value={node.id}
                        label={node.style?.label?.value}
                      >
                        {node.style?.label?.value}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <div className="flex justify-between mt-4">
                <Form.Item className="mb-0">
                  <Button
                    type="default"
                    className="items-end"
                    onClick={handleCloseNodePopover}
                  >
                    Cancel
                  </Button>
                </Form.Item>
                <Form.Item className="mb-0">
                  <Button
                    type="primary"
                    className="items-end bg-[#1554ad]"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Form>
          }
          overlayInnerStyle={{ backgroundColor: "#2F2F2F" }}
          placement="leftTop"
        >
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            size={"large"}
            className="flex items-center bg-popup hover:bg-inherit"
          >
            Add
          </Button>
        </Popover>
      </div>
    </ConfigProvider>
  );
};

export default App;
