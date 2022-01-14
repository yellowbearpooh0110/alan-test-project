import React from "react";
import { HashMap } from "react-move";
import { BTreeNode } from "../Helpers";

const barColour = "#348AA7";

export interface BSTreeNodeProps {
  data: BTreeNode;
  state: HashMap;
  handleRemove: (node: BTreeNode) => void;
}

export const BSTreeNode: React.FC<BSTreeNodeProps> = (props) => {
  const { data, state, handleRemove } = props;
  const radius = 20;

  return (
    <g
      className="bar-group"
      transform={`translate(${props.state.x}, ${props.state.y})`}
    >
      <circle
        r={radius}
        cx={radius}
        cy={radius}
        style={{
          fill: barColour,
          opacity: props.state.opacity
        }}
        onClick={(event) => {
          event.preventDefault();
          handleRemove(data);
        }}
      />
      <text
        className="name-label"
        x={radius}
        y={radius}
        textAnchor="middle"
        alignmentBaseline="middle"
        style={{ opacity: state.opacity }}
      >
        {data.value}
      </text>
    </g>
  );
};
