import utils from "../../../utils/Utils";
import { validation } from "../../../constants/strings/fa";

const fileValidator = (
    schema,
    field,
    max = null,
    extensions = null,
    required = true
) => {
    schema = schema
        .test(
            "required",
            validation.requiredMessage.replace(":field", field),
            (file) => {
                if (!file || file.length === 0 || file.size === 0) {
                    if (!required) {
                        return true;
                    }
                    return false;
                }

                return true;
            }
        )
        .test(
            "fileSize",
            validation.fileMaxSizeMessage.replace(":field", field),
            (file) => {
                if (!file?.size || file.size < max) {
                    return true;
                }
                return false;
            }
        )
        .test("fileType", validation.fileTypeMessage, (file) => {
            if (!file || !extensions || extensions?.length === 0) {
                return true;
            }
            try {
                if (
                    extensions.includes(
                        utils.getExtension(file[0]?.name)[0].toLowerCase()
                    )
                ) {
                    return true;
                }
                return false;
            } catch {}
            return false;
        });
    if (!required) {
        schema = schema.nullable();
    }
    return schema;
};

export default fileValidator;
