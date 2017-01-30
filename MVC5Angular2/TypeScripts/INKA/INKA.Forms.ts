module INKA {

    export class Form {
        static Submit(buttonId: string, formId: string, postUrl: string, success: any) {
            $(`#${buttonId}`).attr("disabled", "disabled");

            AJAX.SubmitForm(formId, postUrl, (res: ResponseViewModel) => {
                if (res.Success) {
                    if (success != undefined && success != null) {
                        if (typeof success === "function") {
                            success(res);
                        }
                        else if (typeof success === "string") {
                            window.location.href = success;
                        }
                    }
                    else {
                        window.location.reload();
                    }
                }
                else {
                    if (res.ValidationError) {
                        Messages.Alert("Beviteli mező ellenőrzés", Messages.Validation(res.Data));
                    }
                    else {
                        Messages.Alert("Hibaüzenet", Messages.FormatAlertMessage(res.Message, res.Hibakod));
                    }

                    if (DEBUG) {
                        Messages.Alert("DEBUG: " + res.Data, res.Message);
                    }
                    $(`#${buttonId}`).removeAttr("disabled");
                }
            });
            return false;
        }
    }

}