import { useForm } from "react-hook-form";

import { Error as Entity } from "../../../http/entities";
import { BasePageUtils } from "../../../utils/BasePageUtils";
import { errorsPage as strings } from "../../../constants/strings/fa";
import { setPagePropsAction } from "../../../state/page/pageActions";
import { setShownModalAction } from "../../../state/layout/layoutActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm();
        super("Errors", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            pageNumber: 1,
            item: null,
            items: null,
            action: null,
        };
    }

    onLoad() {
        super.onLoad();
        this.fillForm();
    }

    onShowModal(e, modal, item) {
        e.stopPropagation();
        this.dispatch(
            setPagePropsAction({
                modal,
                item,
            })
        );
        this.dispatch(setShownModalAction(modal));
    }

    async fillForm() {
        const promise = this.entity.getPaginate(
            this.pageState.props?.pageNumber ?? 1
        );
        super.fillForm(promise);
    }
}
