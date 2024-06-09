import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Keyword as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { searchKeywordSchema as schema } from "../../../validations";
import { keywordsPage as strings } from "../../../../constants/strings/fa";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("Keywords", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            pageNumber: 1,
            itemsCount: 0,
            item: null,
            items: null,
            action: null,
        };
    }

    onLoad() {
        super.onLoad();
        this.fillForm();
    }

    onAction(props) {
        switch (props.action) {
            case "SET_PAGE":
                props.action = null;
                this.onSubmit({
                    keyword: this.useForm.getValues("keyword") ?? "",
                });

                break;
        }

        super.onAction(props);
    }

    async fillForm(data = null) {
        const promise = this.entity.getPaginate(
            data?.keyword ?? "",
            this.pageState.props?.pageNumber ?? 1
        );
        super.fillForm(promise);
    }
}
