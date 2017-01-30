var INKA;
(function (INKA) {
    var Form = (function () {
        function Form() {
        }
        Form.Submit = function (buttonId, formId, postUrl, success) {
            $("#" + buttonId).attr("disabled", "disabled");
            INKA.AJAX.SubmitForm(formId, postUrl, function (res) {
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
                        INKA.Messages.Alert("Beviteli mező ellenőrzés", INKA.Messages.Validation(res.Data));
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", INKA.Messages.FormatAlertMessage(res.Message, res.Hibakod));
                    }
                    if (DEBUG) {
                        INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
                    }
                    $("#" + buttonId).removeAttr("disabled");
                }
            });
            return false;
        };
        return Form;
    }());
    INKA.Form = Form;
})(INKA || (INKA = {}));
//# sourceMappingURL=INKA.Forms.js.map