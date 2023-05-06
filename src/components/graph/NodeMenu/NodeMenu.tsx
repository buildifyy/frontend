import { ContextMenuValue, Components } from "@antv/graphin";
import { Menu } from "antd";
import { NodeMenuProps } from "./NodeMenuProps.interface";

export const NodeMenu = ({ setNodeToExpand, setNodeToHide }: NodeMenuProps) => {
  const { ContextMenu } = Components;

  const MyMenu = (value: ContextMenuValue) => {
    const handleClick = (e: { key: unknown }) => {
      const { onClose, id } = value;
      if (e.key === "expand") {
        setNodeToExpand(id);
      } else {
        setNodeToHide(id);
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
    <ContextMenu style={{ borderRadius: "10px" }} bindType="node">
      {(value) => {
        return <MyMenu {...value} />;
      }}
    </ContextMenu>
  );
};
