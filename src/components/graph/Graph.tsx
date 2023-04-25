import Graphin, { Behaviors } from "@antv/graphin";

export const Graph = () => {
  const { ZoomCanvas } = Behaviors;
  const data = {
    nodes: [
      {
        id: "node-0",
        x: 100,
        y: 100,
      },
      {
        id: "node-1",
        x: 200,
        y: 200,
      },
      {
        id: "node-2",
        x: 100,
        y: 300,
      },
    ],
    edges: [
      {
        source: "node-0",
        target: "node-1",
      },
    ],
  };

  return (
    <Graphin data={data} layout={{ type: "preset" }} theme={{ mode: "dark" }}>
      <ZoomCanvas />
    </Graphin>
  );
};
