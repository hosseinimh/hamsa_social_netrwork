import { validation } from "../../../constants/strings/fa";

const numberValidator = (
    schema,
    field,
    min = null,
    max = null,
    required = true
) => {
    schema = schema.typeError(
        validation.numberMessage.replace(":field", field)
    );
    if (min) {
        schema = schema.min(
            min,
            validation.minNumberMessage
                .replace(":field", field)
                .replace(":min", min)
        );
    }
    if (max) {
        schema = schema.max(
            max,
            validation.maxNumberMessage
                .replace(":field", field)
                .replace(":max", max)
        );
    }
    if (required) {
        schema = schema.required(
            validation.requiredMessage.replace(":field", field)
        );
    }
    return schema;
};

export default numberValidator;
