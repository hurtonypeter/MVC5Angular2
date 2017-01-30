var INKA;
(function (INKA) {
    var AJAX = (function () {
        function AJAX() {
        }
        AJAX.GET = function (url, data, success, error) {
            if (error === void 0) { error = undefined; }
            INKA.Messages.ProgressOn();
            $.ajax({
                async: true,
                url: url,
                data: data,
                type: "GET",
                success: function (res) {
                    INKA.Messages.ProgressOff();
                    try {
                        success(res);
                    }
                    catch (e1) {
                        try {
                            success();
                        }
                        catch (e2) {
                        }
                    }
                },
                error: function (err) {
                    INKA.Messages.ProgressOff();
                    try {
                        error(err);
                    }
                    catch (e3) {
                        try {
                            error();
                        }
                        catch (e4) {
                        }
                    }
                },
            });
        };
        AJAX.POST = function (url, data, success, error, withFileUpload) {
            if (error === void 0) { error = undefined; }
            if (withFileUpload === void 0) { withFileUpload = false; }
            var ajaxSettings = {
                async: true,
                url: url,
                data: data,
                type: "POST",
                success: function (res) {
                    INKA.Messages.ProgressOff();
                    try {
                        success(res);
                    }
                    catch (e1) {
                        try {
                            success();
                        }
                        catch (e2) {
                        }
                    }
                },
                error: function (err) {
                    INKA.Messages.ProgressOff();
                    try {
                        error(err);
                    }
                    catch (e3) {
                        try {
                            error();
                        }
                        catch (e4) {
                        }
                    }
                }
            };
            if (withFileUpload) {
                $.extend(ajaxSettings, {
                    cache: false,
                    contentType: false,
                    processData: false
                });
            }
            INKA.Messages.ProgressOn();
            $.ajax(ajaxSettings);
        };
        AJAX.SubmitForm = function (data, url, success, error, withFileUpload) {
            if (error === void 0) { error = undefined; }
            if (withFileUpload === void 0) { withFileUpload = false; }
            var postData;
            if (typeof (data) === "function") {
                postData = data();
            }
            else if (typeof (data) === "string") {
                postData = $("#" + data).serializeObject();
            }
            INKA.AJAX.POST(url, postData, success, error, withFileUpload);
        };
        AJAX.CreateXHRObjectAndSendData = function (url, method, responseType, data, loadEvent, errorEvent, abortEvent) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.responseType = responseType;
            xhr.addEventListener('load', loadEvent, false);
            xhr.addEventListener('error', errorEvent, false);
            xhr.addEventListener('abort', abortEvent, false);
            var form_data = new FormData();
            for (var key in data) {
                form_data.append(key, data[key]);
            }
            var token = $('[name=__RequestVerificationToken]').val();
            form_data.append("__RequestVerificationToken", token);
            xhr.send(form_data);
        };
        return AJAX;
    }());
    INKA.AJAX = AJAX;
})(INKA || (INKA = {}));
//# sourceMappingURL=INKA.AJAX.js.map