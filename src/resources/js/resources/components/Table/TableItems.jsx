import React from "react";
import { useSelector } from "react-redux";

import { general } from "../../../constants/strings/fa";

const TableItems = ({ children, columnsCount }) => {
    const layoutState = useSelector((state) => state.layoutReducer);

    if (children?.length > 0) {
        return children;
    } else if (layoutState?.loading) {
        return (
            <tr>
                <td
                    colSpan={columnsCount}
                    style={{ textAlign: "center", padding: "20px 0" }}
                >
                    {general.loading}
                </td>
            </tr>
        );
    }

    return (
        <tr>
            <td
                colSpan={columnsCount}
                style={{ textAlign: "center", padding: "20px 0" }}
            >
                {general.noDataFound}
            </td>
        </tr>
    );
};

export default TableItems;
