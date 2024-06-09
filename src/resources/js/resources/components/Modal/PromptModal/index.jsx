import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Modal } from "../..";
import { MODAL_RESULT } from "../../../../constants";

function PromptModal() {
    const layoutState = useSelector((state) => state.layoutReducer);
    const [modalResult, setModalResult] = useState(undefined);

    useEffect(() => {
        if (modalResult === MODAL_RESULT.OK) {
            if (
                typeof layoutState?.shownModal?.props?.onSubmit === "function"
            ) {
                layoutState?.shownModal?.props?.onSubmit(true);
            }
        } else if (modalResult === MODAL_RESULT.CANCEL) {
            if (
                typeof layoutState?.shownModal?.props?.onCancel === "function"
            ) {
                layoutState?.shownModal?.props?.onCancel();
            }
        }
        setModalResult(undefined);
    }, [modalResult]);

    const renderFooter = () => {
        return (
            <div className="btns d-flex mtd-10">
                <button
                    className="btn btn-success"
                    type="button"
                    title={`${layoutState?.shownModal?.props?.submitTitle}`}
                    onClick={() => setModalResult(MODAL_RESULT.OK)}
                >
                    {layoutState?.shownModal?.props?.submitTitle}
                </button>
                <button
                    className="btn btn-border"
                    type="button"
                    title={`${layoutState?.shownModal?.props?.cancelTitle}`}
                    onClick={() => setModalResult(MODAL_RESULT.CANCEL)}
                >
                    {layoutState?.shownModal?.props?.cancelTitle}
                </button>
            </div>
        );
    };

    return (
        <Modal
            id="promptModal"
            title={`${layoutState?.shownModal?.props?.title}`}
            modalResult={modalResult}
            footer={renderFooter()}
        >
            {layoutState?.shownModal?.props?.description}
        </Modal>
    );
}

export default PromptModal;
