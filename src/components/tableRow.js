import React from "react";

const TableRow = (props) => {
  return (
    <tr>
      <td>{props.idx}</td>
      <td>{props.roll_number}</td>
      <td>{props.result}</td>
    </tr>
  );
};

export default TableRow;
