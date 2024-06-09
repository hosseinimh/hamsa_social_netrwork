import * as yup from "yup";

import { nameValidator } from "../CommonValidators";
import { keywordsPage as strings } from "../../../constants/strings/fa";

const searchKeywordSchema = yup.object().shape({
    keyword: nameValidator(yup.string(), strings.keyword, null, 20, false),
});

export default searchKeywordSchema;
