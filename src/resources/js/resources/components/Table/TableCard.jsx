import React from "react";

import Table from "./Table";

function TableCard({ table }) {
  return (
    <div className="section fix-mr15">
      <div className="block">
        <Table
          renderHeader={table.renderHeader}
          renderItems={table.renderItems}
          renderFooter={table?.renderFooter}
        />
      </div>
    </div>
  );
}

export default TableCard;
