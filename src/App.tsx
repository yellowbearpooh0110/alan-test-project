import NodeGroup from "react-move/NodeGroup";
import "./styles.css";
import { RandomNum, BTree, getLayer, getSequence, BTreeNode } from "./Helpers";
import { BSTreeNode } from "./Components";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  const [data, setData] = useState<Array<BTreeNode>>([]);
  const { current: btree } = useRef<BTree>(new BTree());

  const layerHeight = 50;
  const distance = 80;

  const width = useMemo((): number => {
    const maxPosition = Math.max(...data.map((item) => item.position));
    return (Math.pow(2, getLayer(maxPosition)) - 1) * distance;
  }, [distance, data]);

  // const height = useMemo((): number => {
  //   const maxPosition = Math.max(...data.map((item) => item.position));
  //   return (getLayer(maxPosition) + 1) * layerHeight;
  // }, [layerHeight, data]);

  useEffect(() => {}, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.keyCode === 32) {
      const newNode = btree.addNode(RandomNum());
      setData([...data, newNode]);
    }
  };

  const handleRemove = (node: BTreeNode) => {
    btree.removeNode(node);
    setData(data.filter((ele) => ele.index !== node.index));
  };

  const startTransition = (d: BTreeNode) => {
    return {
      x:
        500 +
        (width / Math.pow(2, getLayer(d.position) + 1)) *
          (getSequence(d.position) * 2 + 1) -
        width / 2,
      y: getLayer(d.position) * layerHeight,
      opacity: 0
    };
  };

  const enterTransition = (d: BTreeNode) => {
    return {
      opacity: [1],
      timing: { duration: 250 }
    };
  };

  const updateTransition = (d: BTreeNode) => {
    return {
      x: [
        500 +
          (width / Math.pow(2, getLayer(d.position) + 1)) *
            (getSequence(d.position) * 2 + 1) -
          width / 2
      ],
      y: [getLayer(d.position) * layerHeight],
      timing: { duration: 300 }
    };
  };

  const leaveTransition = (d: BTreeNode, i: number) => {
    return {
      x: [
        500 +
          (width / Math.pow(2, getLayer(d.position) + 1)) *
            (getSequence(d.position) * 2 + 1) -
          width / 2
      ],
      y: [-layerHeight],
      opacity: [0],
      timing: { duration: 250 }
    };
  };

  return (
    <div className="App">
      <h1>Alan Test Project</h1>
      <div onKeyDown={handleKeyDown} tabIndex={0}>
        <svg
          width="100%"
          style={{ border: "1px solid black" }}
          viewBox={`0 0 1000 1000`}
        >
          <g>
            <NodeGroup
              data={data}
              keyAccessor={(data: BTreeNode) => data.index}
              start={startTransition}
              enter={enterTransition}
              update={updateTransition}
              leave={leaveTransition}
            >
              {(nodes) => (
                <g>
                  {nodes.map((props) => (
                    <BSTreeNode {...props} handleRemove={handleRemove} />
                  ))}
                </g>
              )}
            </NodeGroup>
          </g>
        </svg>
      </div>
    </div>
  );
}
