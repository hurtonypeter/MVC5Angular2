var INKA;
(function (INKA) {
    var Sablon = (function () {
        function Sablon() {
        }
        Sablon.Validate = function (formId, success) {
            var url = '/Common/SablonKezeles/Validate';
            INKA.AJAX.SubmitForm(formId, url, function (res) {
                if (res.Success) {
                    INKA.Messages.Validation({});
                    try {
                        success(res);
                    }
                    catch (e) {
                        success();
                    }
                }
                else {
                    INKA.Messages.Prompt("Beviteli mező ellenőrzés", INKA.Messages.Validation(res.Data) + "<br><br><strong>Szeretné folytatni?</strong>", function () {
                        try {
                            success(res);
                        }
                        catch (e) {
                            success();
                        }
                    });
                }
            });
        };
        Sablon.Kitoltes = function (formId, isTest, success) {
            var url = '/Common/SablonKezeles/Kitoltes';
            if (isTest) {
                url += 'Teszt';
            }
            INKA.AJAX.SubmitForm(formId, url, function (res) {
                if (res.Success) {
                    try {
                        success(res);
                    }
                    catch (e) {
                        success();
                    }
                }
                else {
                    INKA.Messages.Alert("Hibaüzenet", res.Message);
                }
            });
        };
        Sablon.Letoltes = function (sablonVerzioId, reszvetelId, fajlnev, isTest) {
            var url = '/Common/SablonKezeles/Letoltes';
            if (fajlnev == "") {
                fajlnev = "Doksi_" + Date.now().toString() + ".docx";
            }
            if (fajlnev.indexOf(".docx") == -1) {
                fajlnev += ".docx";
            }
            INKA.AJAX.CreateXHRObjectAndSendData(url, "GET", "arraybuffer", { SablonVerzioId: sablonVerzioId, reszvetelId: reszvetelId, isTest: isTest }, function () {
                //load
                if (this.status === 200 && this.readyState === 4) {
                    if (this.response.byteLength > 0) {
                        var blob = new Blob([this.response], { type: 'application/octet-stream' });
                        INKA.Messages.ProgressOff();
                        saveAs(blob, fajlnev);
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", "A kért dokumentum nem található!");
                        INKA.Messages.ProgressOff();
                    }
                }
                else {
                    INKA.Messages.Alert("Hibaüzenet", this.statusText);
                }
            }, function () {
                //error
                INKA.Messages.Alert("Hibaüzenet", this.statusText);
            }, function () {
                //abort
                INKA.Messages.Alert("Hibaüzenet", "A művelet megszakadt, próbálja újra!");
            });
            return false;
        };
        Sablon.CsakLetoltes = function (url, fajlnev) {
            if (fajlnev == "") {
                fajlnev = "Doksi_" + Date.now().toString() + ".docx";
            }
            if (fajlnev.indexOf(".docx") == -1) {
                fajlnev += ".docx";
            }
            INKA.Messages.ProgressOn();
            INKA.AJAX.CreateXHRObjectAndSendData(url, "GET", "arraybuffer", {}, function () {
                //load
                if (this.status === 200 && this.readyState === 4) {
                    if (this.response.byteLength > 0) {
                        var blob = new Blob([this.response], { type: 'application/octet-stream' });
                        INKA.Messages.ProgressOff();
                        saveAs(blob, fajlnev);
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", "A kért dokumentum nem található!");
                        INKA.Messages.ProgressOff();
                    }
                }
                else {
                    INKA.Messages.Alert("Hibaüzenet", this.statusText);
                    INKA.Messages.ProgressOff();
                }
            }, function () {
                //error
                INKA.Messages.Alert("Hibaüzenet", this.statusText);
                INKA.Messages.ProgressOff();
            }, function () {
                //abort
                INKA.Messages.Alert("Hibaüzenet", "A művelet megszakadt, próbálja újra!");
                INKA.Messages.ProgressOff();
            });
            return false;
        };
        return Sablon;
    }());
    INKA.Sablon = Sablon;
    var SablonExtra = (function () {
        function SablonExtra() {
        }
        SablonExtra.Validate = function (formId, url, success) {
            INKA.AJAX.SubmitForm(formId, url, function (res) {
                if (res.Success) {
                    INKA.Messages.Validation({});
                    try {
                        success(res);
                    }
                    catch (e) {
                        success();
                    }
                }
                else {
                    INKA.Messages.Prompt("Beviteli mező ellenőrzés", INKA.Messages.Validation(res.Data) + "<br><br><strong>Szeretné folytatni?</strong>", function () {
                        try {
                            success(res);
                        }
                        catch (e) {
                            success();
                        }
                    });
                }
            });
        };
        SablonExtra.Kitoltes = function (formId, url, success) {
            INKA.AJAX.SubmitForm(formId, url, function (res) {
                if (res.Success) {
                    try {
                        success(res);
                    }
                    catch (e) {
                        success();
                    }
                }
                else {
                    INKA.Messages.Alert("Hibaüzenet", res.Message);
                }
            });
        };
        SablonExtra.Letoltes = function (sablonVerzioId, reszvetelId, fajlnev, isTest) {
            var url = '/Common/SablonKezeles/Letoltes';
            if (fajlnev == "") {
                fajlnev = "Doksi_" + Date.now().toString() + ".docx";
            }
            if (fajlnev.indexOf(".docx") == -1) {
                fajlnev += ".docx";
            }
            INKA.AJAX.CreateXHRObjectAndSendData(url, "GET", "arraybuffer", { SablonVerzioId: sablonVerzioId, reszvetelId: reszvetelId, isTest: isTest }, function () {
                //load
                if (this.status === 200 && this.readyState === 4) {
                    if (this.response.byteLength > 0) {
                        var blob = new Blob([this.response], { type: 'application/octet-stream' });
                        INKA.Messages.ProgressOff();
                        saveAs(blob, fajlnev);
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", "A kért dokumentum nem található!");
                        INKA.Messages.ProgressOff();
                    }
                }
                else {
                    INKA.Messages.Alert("Hibaüzenet", this.statusText);
                }
            }, function () {
                //error
                INKA.Messages.Alert("Hibaüzenet", this.statusText);
            }, function () {
                //abort
                INKA.Messages.Alert("Hibaüzenet", "A művelet megszakadt, próbálja újra!");
            });
            return false;
        };
        return SablonExtra;
    }());
    INKA.SablonExtra = SablonExtra;
})(INKA || (INKA = {}));
//# sourceMappingURL=INKA.Sablon.js.map