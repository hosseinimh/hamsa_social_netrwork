import stringValidator from "./stringValidator";
import { validation } from "../../../constants/strings/fa";

const dateValidator = (schema, field, required = true) => {
    const regex = required
        ? /^([1][3-4][0-9]{2}\/((0[1-6]\/(0[1-9]|[1-2][0-9]|3[0-1]))|(0[7-9]\/(0[1-9]|[1-2][0-9]|30))|(1[0-1]\/(0[1-9]|[1-2][0-9]|30))|(12\/(0[1-9]|[1-2][0-9]))))+$/
        : /^([1][3-4][0-9]{2}\/((0[1-6]\/(0[1-9]|[1-2][0-9]|3[0-1]))|(0[7-9]\/(0[1-9]|[1-2][0-9]|30))|(1[0-1]\/(0[1-9]|[1-2][0-9]|30))|(12\/(0[1-9]|[1-2][0-9]))))*$/;
    return stringValidator(schema, field, 10, 10, required).matches(
        regex,
        validation.notValidMessage.replace(":field", field)
    );
};

export default dateValidator;
