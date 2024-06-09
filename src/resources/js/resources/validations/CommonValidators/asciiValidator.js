import stringValidator from "./stringValidator";
import { validation } from "../../../constants/strings/fa";

const asciiValidator = (schema, field, min = 2, max = 50, required = true) => {
    const regex = required ? /^[a-zA-Z ]+$/ : /^[a-zA-Z ]*$/;
    return stringValidator(schema, field, min, max, required).matches(
        regex,
        validation.asciiStringMessage.replace(":field", field)
    );
};

export default asciiValidator;
