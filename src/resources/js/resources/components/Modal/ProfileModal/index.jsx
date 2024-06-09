import React from "react";

import Modal from "../Modal";
import InputTextColumn from "../../Input/InputTextColumn";
import { profileModal as strings } from "../../../../constants/strings/fa";

function ProfileModal() {
    return (
        <Modal id="profileModal" title={"محمود حسینی - hosseinimh"}>
            <InputTextColumn
                field="nameModal"
                readonly={true}
                strings={strings}
                showLabel
                icon="icon-user"
                value={"محمود"}
                inputStyle={{ opacity: "1" }}
            />
            <InputTextColumn
                field="familyModal"
                readonly={true}
                strings={strings}
                showLabel
                icon="icon-user"
                value={"حسینی"}
                inputStyle={{ opacity: "1" }}
            />
        </Modal>
    );
}

export default ProfileModal;
