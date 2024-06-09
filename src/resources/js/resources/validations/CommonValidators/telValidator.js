import { validation } from "../../../constants/strings/fa";

const telValidator = (schema, field, required = true) => {
    schema = schema.matches(
        /^([0][1-9][0-9]{9})+$/,
        validation.notValidMessage.replace(":field", field)
    );
    if (required) {
        schema = schema.required(
            validation.requiredMessage.replace(":field", field)
        );
    }
    return schema;
};

export default telValidator;
