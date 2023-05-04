import Graphin, {
  Behaviors,
  ContextMenuValue,
  Components,
} from "@antv/graphin";
import { NodeClick } from "./NodeClick/NodeClick";
import { GraphProps } from "./GraphProps.interface";
import { CanvasClick } from "./CanvasClick";
import { Menu, message } from "antd";

export const Graph = ({
  data,
  setSelectedNode,
  handleDeselectNode,
  setNodeToExpand,
}: GraphProps) => {
  const { ContextMenu } = Components;
  const { ZoomCanvas } = Behaviors;

  const MyMenu = (value: ContextMenuValue) => {
    const handleClick = (e: { key: unknown }) => {
      const { onClose, id } = value;
      if (e.key === "expand") {
        setNodeToExpand(id);
      } else {
        message.info(`${e.key}:${id}`);
      }
      onClose();
    };

    return (
      <Menu
        onClick={handleClick}
        className="rounded-lg border-none bg-popup"
        items={[
          { key: "expand", label: "Expand" },
          { key: "hide", label: "Hide" },
        ]}
      />
    );
  };

  return (
    <Graphin data={data} layout={{ type: "dagre" }} theme={{ mode: "dark" }}>
      <ZoomCanvas />
      <NodeClick setSelectedNode={setSelectedNode} />
      <CanvasClick deselectNode={handleDeselectNode} />
      <ContextMenu style={{ borderRadius: "10px" }} bindType="node">
        {(value) => {
          return <MyMenu {...value} />;
        }}
      </ContextMenu>
    </Graphin>
  );
};
