import * as yup from "yup";

import { nameValidator } from "../CommonValidators";
import { usersPage as strings } from "../../../constants/strings/fa";

const searchUserSchema = yup.object().shape({
    name: nameValidator(yup.string(), strings.name, null, 50, false),
    family: nameValidator(yup.string(), strings.family, null, 50, false),
});

export default searchUserSchema;
