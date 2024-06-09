import { validation } from "../../../constants/strings/fa";

const emailValidator = (schema, field, required = true) => {
    schema = schema
        .email(validation.notValidMessage.replace(":field", field))
        .matches(
            /@[^.]*\./,
            validation.notValidMessage.replace(":field", field)
        )
        .min(
            5,
            validation.minMessage.replace(":field", field).replace(":min", "5")
        )
        .max(
            50,
            validation.maxMessage.replace(":field", field).replace(":max", "50")
        );
    if (required) {
        schema = schema.required(
            validation.requiredMessage.replace(":field", field)
        );
    }
    return schema;
};

export default emailValidator;
