import React, { useEffect } from "react";
import utils from "../../../utils/Utils";

const Table = ({
    items,
    renderHeader,
    renderItems,
    renderFooter = null,
    containerClassName = "",
    dataTableClassName = "",
    className = "",
    style = {},
}) => {
    useEffect(() => {
        if (items) {
            utils.convertNumberToPersion();
        }
    }, [items]);

    return (
        <div className={`dataTables_wrapper no-footer ${containerClassName}`}>
            <div
                className={`dataTables_scrollBody ${dataTableClassName}`}
                style={{
                    position: "relative",
                    overflow: "auto",
                    width: "100%",
                }}
            >
                <table
                    className={`nowrap dataTable dtr-inline collapsed no-footer ${className}`}
                    style={style}
                >
                    <thead style={style}>{renderHeader()}</thead>
                    <tbody style={style}>{renderItems()}</tbody>
                    {renderFooter && <tfoot>{renderFooter()}</tfoot>}
                </table>
                <div className="table-ft"></div>
            </div>
        </div>
    );
};

export default Table;
