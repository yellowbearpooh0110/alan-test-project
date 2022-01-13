import NodeGroup from "react-move/NodeGroup";
import "./styles.css";
import {
  RandomNum,
  BTree,
  BTreeDataType,
  getLayer,
  getSequence,
  BTreeNode
} from "./Helpers";
import { BSTreeNode } from "./Components";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  const [data, setData] = useState<Array<BTreeDataType>>([]);
  const { current: btree } = useRef<BTree>(new BTree());

  const layerHeight = 50;
  const distance = 80;

  const width = useMemo((): number => {
    const maxPosition = Math.max(...data.map((item) => item.position));
    return (Math.pow(2, getLayer(maxPosition)) - 1) * distance;
  }, [distance, data]);

  const height = useMemo((): number => {
    const maxPosition = Math.max(...data.map((item) => item.position));
    return (getLayer(maxPosition) + 1) * layerHeight;
  }, [layerHeight, data]);

  useEffect(() => {}, []);

  const handleAdd = (event: MouseEvent) => {
    event.preventDefault();
    btree.addNode(RandomNum());
    setData(btree.getAllNodes());
  };

  const handleRemove = (node: BTreeNode) => {
    btree.removeNode(node);
    setData(btree.getAllNodes());
  };

  const startTransition = (d: BTreeDataType) => {
    return {
      x:
        (width / Math.pow(2, getLayer(d.position) + 1)) *
        (getSequence(d.position) * 2 + 1),
      y: getLayer(d.position) * layerHeight,
      opacity: 0
    };
  };

  const enterTransition = (d: BTreeDataType) => {
    return {
      opacity: [1],
      timing: { duration: 250 }
    };
  };

  const updateTransition = (d: BTreeDataType) => {
    return {
      x: [
        (width / Math.pow(2, getLayer(d.position) + 1)) *
          (getSequence(d.position) * 2 + 1)
      ],
      y: [getLayer(d.position) * layerHeight],
      timing: { duration: 300 }
    };
  };

  const leaveTransition = (d: BTreeDataType, i: number) => {
    return {
      x: [
        (width / Math.pow(2, getLayer(d.position) + 1)) *
          (getSequence(d.position) * 2 + 1)
      ],
      y: [-layerHeight],
      opacity: [0],
      timing: { duration: 250 }
    };
  };

  return (
    <div className="App">
      <h1>Alan Test Project</h1>
      <div>
        <div id="menu">
          <button onClick={handleAdd}>Add item</button>
        </div>
        <div
          style={{
            width: "100%",
            height: 500,
            overflow: "auto"
          }}
        >
          <svg
            width={width ? width + 100 : 100}
            height={height ? height + 100 : 100}
            style={{ overflow: "scroll" }}
          >
            <g>
              <NodeGroup
                data={data}
                keyAccessor={(data: BTreeDataType) => data.node.index}
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
    </div>
  );
}
