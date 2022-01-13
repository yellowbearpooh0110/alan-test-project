import React from "react";
import { HashMap } from "react-move";
import { BTreeDataType } from "../Helpers";

const barColour = "#348AA7";

export interface BSTreeNodeProps {
  data: BTreeDataType;
  state: HashMap;
}

export const BSTreeNode: React.FC<BSTreeNodeProps> = (props) => {
  const { data, state } = props;
  const radius = 20;

  return (
    <g
      className="bar-group"
      transform={`translate(${props.state.x}, ${props.state.y})`}
      style={{ width: "20px" }}
    >
      <circle
        r={radius}
        cx={radius}
        cy={radius}
        style={{
          fill: barColour,
          opacity: props.state.opacity
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
        {data.node.value}
      </text>
    </g>
  );
};
