import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { User as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { searchUserSchema as schema } from "../../../validations";
import { usersPage as strings } from "../../../../constants/strings/fa";
import { BASE_PATH } from "../../../../constants";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("Users", strings, form);
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
                    name: this.useForm.getValues("name") ?? "",
                    family: this.useForm.getValues("family") ?? "",
                });

                break;
        }

        super.onAction(props);
    }

    onPosts(item) {
        this.navigate(`${BASE_PATH}/posts/${item?.id}`);
    }

    async fillForm(data = null) {
        const promise = this.entity.getPaginate(
            data?.name ?? "",
            data?.family ?? "",
            this.pageState.props?.pageNumber ?? 1
        );
        super.fillForm(promise);
    }
}
