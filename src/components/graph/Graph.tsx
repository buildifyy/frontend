import Graphin, { Behaviors, IG6GraphEvent } from "@antv/graphin";
import { NodeClick } from "./NodeClick/NodeClick";
import { GraphProps } from "./GraphProps.interface";
import { CanvasClick } from "./CanvasClick";
import { ContextMenu } from "@antv/graphin-components";
import { createRef, useEffect, useState } from "react";
import { Button, Popover } from "antd";

export const Graph = ({
  data,
  setSelectedNode,
  handleDeselectNode,
  setShouldExpand,
  setRightClickedNode,
}: GraphProps) => {
  const graphinRef = createRef<Graphin>();
  const [contextMenuOpen, setContextMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    graphinRef?.current?.graph.on("node:contextmenu", (e: IG6GraphEvent) => {
      e.item !== null ? setRightClickedNode(e.item?.get("id")) : null;
      setContextMenuOpen(true);
    });
  }, []);

  const { ZoomCanvas } = Behaviors;

  const handleExpand = () => {
    setShouldExpand(true);
    setContextMenuOpen(false);
  };

  return (
    <Graphin
      data={data}
      layout={{ type: "dagre" }}
      theme={{ mode: "dark" }}
      ref={graphinRef}
    >
      <ZoomCanvas />
      <NodeClick setSelectedNode={setSelectedNode} />
      <CanvasClick deselectNode={handleDeselectNode} />
      <ContextMenu style={{ borderRadius: "10px" }}>
        <Popover
          content={
            <div className="flex flex-col gap-y-2">
              <Button type="default" onClick={handleExpand}>
                Expand
              </Button>
              <Button type="default">Hide</Button>
            </div>
          }
          open={contextMenuOpen}
        />
      </ContextMenu>
    </Graphin>
  );
};
