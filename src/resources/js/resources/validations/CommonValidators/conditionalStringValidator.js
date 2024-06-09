import stringValidator from "./stringValidator";

const conditionalStringValidator = (
    yup,
    field,
    baseField,
    condition,
    min = null,
    max = null,
    required = true
) => {
    return yup.string().when(baseField, (baseField) => {
        if (
            baseField?.length > 0 &&
            baseField[0]?.length > 0 &&
            baseField[0].find((item) => item === condition)
        ) {
            return stringValidator(yup.string(), field, min, max, required);
        }
    });
};

export default conditionalStringValidator;
