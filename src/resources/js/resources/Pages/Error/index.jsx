import React from "react";
import { useSelector } from "react-redux";

import {
    CustomLink,
    InputTextAreaColumn,
    InputTextColumn,
    ListPage,
    Modal,
    TableFooter,
    TableItems,
} from "../../components";
import { PageUtils } from "./PageUtils";
import utils from "../../../utils/Utils";
import { errorsPage as strings, general } from "../../../constants/strings/fa";

const Errors = () => {
    const pageState = useSelector((state) => state.pageReducer);
    const columnsCount = 2;
    const pageUtils = new PageUtils();

    const renderModal = () => {
        let { date, time } = utils.getTimezoneDate(
            pageState?.props?.item?.createdAt,
            general.locale
        );
        return (
            <Modal id="errorModal" title={strings.errorDetails}>
                <InputTextAreaColumn
                    field="message"
                    readonly={true}
                    showLabel
                    textAlign="left"
                    direction="ltr"
                    value={pageState?.props?.item?.message}
                />
                <InputTextColumn
                    field="date"
                    readonly={true}
                    showLabel
                    icon="icon-calendar-1"
                    value={`${date} - ${time}`}
                />
            </Modal>
        );
    };

    const renderHeader = () => (
        <tr>
            <th>{strings.message}</th>
            <th style={{ width: "150px" }}>{strings.date}</th>
        </tr>
    );

    const renderItems = () => {
        const children = pageState?.props?.items?.map((item) => {
            let { date, time } = utils.getTimezoneDate(
                item.createdAt,
                general.locale
            );
            return (
                <React.Fragment key={item.id}>
                    <tr>
                        <td style={{ direction: "ltr" }}>
                            <CustomLink
                                onClick={(e) =>
                                    pageUtils?.onShowModal(
                                        e,
                                        "errorModal",
                                        item
                                    )
                                }
                            >
                                {`${item.message?.substring(0, 100)} ...`}
                            </CustomLink>
                        </td>
                        <td className="d-flex-wrap just-around">
                            <div>{date}</div>
                            <div>{time}</div>
                        </td>
                    </tr>
                </React.Fragment>
            );
        });

        return <TableItems columnsCount={columnsCount}>{children}</TableItems>;
    };

    const renderFooter = () => (
        <TableFooter columnsCount={columnsCount} pageUtils={pageUtils} />
    );

    return (
        <ListPage
            pageUtils={pageUtils}
            table={{ renderHeader, renderItems, renderFooter }}
            hasAdd={false}
        >
            {pageState?.props?.item && renderModal()}
        </ListPage>
    );
};

export default Errors;
