import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { PageLayout, Table } from "../";
import { general as strings } from "../../../constants/strings/fa";

const ListPage = ({
    pageUtils,
    children,
    renderTopList = null,
    hasAdd = true,
    backUrl = null,
    renderButtons = null,
    table,
    tableContainerClassName = "",
    tableDataTableClassName = "",
}) => {
    const navigate = useNavigate();
    const layoutState = useSelector((state) => state.layoutReducer);

    return (
        <PageLayout pageUtils={pageUtils}>
            <div className="section fix-mr15">
                {renderTopList && (
                    <div style={{ margin: "1rem 0" }}>{renderTopList()}</div>
                )}
                {(hasAdd || backUrl || renderButtons) && (
                    <div style={{ margin: "1rem", marginTop: "1.875rem" }}>
                        {hasAdd && (
                            <button
                                className="btn btn-primary mx-rdir-10"
                                type="button"
                                title={pageUtils.strings.add}
                                onClick={pageUtils.onAdd}
                                disabled={layoutState?.loading}
                            >
                                {pageUtils.strings.add}
                            </button>
                        )}
                        {backUrl && (
                            <button
                                className="btn btn-border mx-rdir-10"
                                type="button"
                                title={strings.back}
                                onClick={() => navigate(backUrl)}
                                disabled={layoutState?.loading}
                            >
                                {strings.back}
                            </button>
                        )}
                        {renderButtons ? renderButtons() : <></>}
                    </div>
                )}
                {children}
                <div className="block">
                    <Table
                        renderHeader={table.renderHeader}
                        renderItems={table.renderItems}
                        renderFooter={table?.renderFooter}
                        containerClassName={tableContainerClassName}
                        dataTableClassName={tableDataTableClassName}
                    />
                </div>
            </div>
        </PageLayout>
    );
};

export default ListPage;
