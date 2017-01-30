var INKA;
(function (INKA) {
    var Ertesitesbeallitas = (function () {
        function Ertesitesbeallitas() {
        }
        Ertesitesbeallitas.Delete = function (errorDataString, buttonId, deleteUrl, deleteData, indexUrl) {
            $("[id='" + buttonId + "']").attr("disabled", "disabled");
            INKA.AJAX.POST(deleteUrl, deleteData, function (res) {
                if (res.Success) {
                    INKA.Navigation.OpenSplitLeft(indexUrl);
                }
                else {
                    if (res.ValidationError) {
                        INKA.Messages.Alert("Hibaüzenet", "A kiválasztott " + errorDataString + " nem létezik");
                        $("[id='" + buttonId + "']").removeAttr("disabled");
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", "Hiba történt a kiválasztott " + errorDataString + " törlése közben");
                        $("[id='" + buttonId + "']").removeAttr("disabled");
                    }
                }
                if (DEBUG) {
                    INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
                }
            });
        };
        Ertesitesbeallitas.Submit = function (errorMessage, buttonId, formId, postUrl, indexUrl) {
            $("#" + buttonId).attr("disabled", "disabled");
            INKA.AJAX.SubmitForm(formId, postUrl, function (res) {
                if (res.Success) {
                    INKA.Navigation.OpenSplitLeft(indexUrl);
                }
                else {
                    if (res.ValidationError) {
                        INKA.Messages.Alert("Beviteli mező ellenőrzés", INKA.Messages.Validation(res.Data));
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", errorMessage);
                    }
                    if (DEBUG) {
                        INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
                    }
                    $("#" + buttonId).removeAttr("disabled");
                }
            });
            return false;
        };
        return Ertesitesbeallitas;
    }());
    INKA.Ertesitesbeallitas = Ertesitesbeallitas;
    var Torzsadat = (function () {
        function Torzsadat() {
        }
        Torzsadat.Delete = function (errorDataString, buttonId, deleteUrl, deleteData, indexUrl) {
            $("[id='" + buttonId + "']").attr("disabled", "disabled");
            INKA.AJAX.POST(deleteUrl, deleteData, function (res) {
                if (res.Success) {
                    INKA.Navigation.OpenSplitLeft(indexUrl);
                }
                else {
                    if (res.ValidationError) {
                        INKA.Messages.Alert("Hibaüzenet", "A kiválasztott " + errorDataString + " nem létezik");
                        $("[id='" + buttonId + "']").removeAttr("disabled");
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", "Hiba történt a kiválasztott " + errorDataString + " törlése közben");
                        $("[id='" + buttonId + "']").removeAttr("disabled");
                    }
                }
                if (DEBUG) {
                    INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
                }
            });
        };
        Torzsadat.Submit = function (errorMessage, buttonId, formId, postUrl, indexUrl) {
            $("#" + buttonId).attr("disabled", "disabled");
            INKA.AJAX.SubmitForm(formId, postUrl, function (res) {
                if (res.Success) {
                    INKA.Navigation.OpenSplitLeft(indexUrl);
                }
                else {
                    if (res.ValidationError) {
                        INKA.Messages.Alert("Beviteli mező ellenőrzés", INKA.Messages.Validation(res.Data));
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", errorMessage);
                    }
                    if (DEBUG) {
                        INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
                    }
                    $("#" + buttonId).removeAttr("disabled");
                }
            });
            return false;
        };
        return Torzsadat;
    }());
    INKA.Torzsadat = Torzsadat;
    var Tanacsado = (function () {
        function Tanacsado() {
        }
        Tanacsado.Submit = function (errorMessage, buttonId, formId, postUrl, indexUrl) {
            $("#" + buttonId).attr("disabled", "disabled");
            INKA.AJAX.SubmitForm(formId, postUrl, function (res) {
                if (res.Success) {
                    INKA.Navigation.OpenSplitLeft(indexUrl);
                }
                else {
                    if (res.ValidationError) {
                        INKA.Messages.Alert("Beviteli mező ellenőrzés", INKA.Messages.Validation(res.Data));
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", errorMessage);
                    }
                    if (DEBUG) {
                        INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
                    }
                    $("#" + buttonId).removeAttr("disabled");
                }
            });
            return false;
        };
        return Tanacsado;
    }());
    INKA.Tanacsado = Tanacsado;
    var Account = (function () {
        function Account() {
        }
        Account.Submit = function (errorMessage, buttonId, formId, postUrl, indexUrl) {
            INKA.AJAX.SubmitForm(formId, postUrl, function (res) {
                if (res.Success) {
                    INKA.Navigation.CloseSecondPopup();
                    INKA.Messages.Alert("Sikeres regisztráció", "Kérjük legyen türelemmel, míg az ügyintézőink jóváhagyják a regisztrációját.<br /> Amint jóváhagyták a regisztrációját, e-mailben értesítjük!");
                    if (res.Message)
                        INKA.Messages.Alert("", res.Message);
                }
                else {
                    if (res.ValidationError) {
                        INKA.Messages.Alert("Beviteli mező ellenőrzés", INKA.Messages.Validation(res.Data));
                    }
                    else {
                        if (res.Message) {
                            INKA.Messages.Alert("Hibaüzenet", errorMessage + ":" + "<br>" + res.Message);
                        }
                        else {
                            INKA.Messages.Alert("Hibaüzenet", errorMessage);
                        }
                        $("input").removeClass("error");
                    }
                    if (DEBUG) {
                        INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
                    }
                    $("#" + buttonId).removeAttr("disabled");
                }
            }, undefined, false);
            return false;
        };
        return Account;
    }());
    INKA.Account = Account;
    var UserHandling = (function () {
        function UserHandling() {
        }
        UserHandling.Submit = function (errorMessage, buttonId, formId, postUrl, indexUrl) {
            $("#" + buttonId).attr("disabled", "disabled");
            INKA.AJAX.SubmitForm(formId, postUrl, function (res) {
                if (res.Success) {
                    INKA.Navigation.ClosePopup();
                    //INKA.Navigation.OpenTab(indexUrl);
                    //if (res.Message)
                    //    INKA.Messages.Alert("", res.Message);
                    INKA.Messages.Alert("", "Sikeres módosítás");
                    window.location.reload();
                }
                else {
                    if (res.ValidationError) {
                        INKA.Messages.Alert("Beviteli mező ellenőrzés", INKA.Messages.Validation(res.Data));
                    }
                    else if (res.ConcurrencyError) {
                        INKA.Messages.Prompt("Többszörös hozzáférés", "Az adatot már valaki módosította, kérjük töltse újra az oldalt!<br><br>Újratöltődjön az oldal automatikusan?", function () {
                            INKA.Navigation.OpenTab(indexUrl);
                        });
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", errorMessage);
                        $("input").removeClass("error");
                    }
                    if (DEBUG) {
                        INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
                    }
                    $("#" + buttonId).removeAttr("disabled");
                }
            });
            return false;
        };
        UserHandling.Delete = function (errorDataString, buttonId, deleteUrl, deleteData, indexUrl) {
            $("[id='" + buttonId + "']").attr("disabled", "disabled");
            INKA.AJAX.POST(deleteUrl, deleteData, function (res) {
                if (res.Success) {
                    window.location.reload();
                }
                else {
                    if (res.ValidationError) {
                        INKA.Messages.Alert("Hibaüzenet", "A kiválasztott " + errorDataString + " nem létezik");
                        $("[id='" + buttonId + "']").removeAttr("disabled");
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", "Hiba történt a kiválasztott " + errorDataString + " törlése közben");
                        $("[id='" + buttonId + "']").removeAttr("disabled");
                    }
                }
                if (DEBUG) {
                    INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
                }
            });
        };
        return UserHandling;
    }());
    INKA.UserHandling = UserHandling;
    var Beszerzesiterv = (function () {
        function Beszerzesiterv() {
        }
        Beszerzesiterv.Submit = function (errorMessage, buttonId, formId, postUrl, indexUrl) {
            $("#" + buttonId).attr("disabled", "disabled");
            INKA.AJAX.SubmitForm(formId, postUrl, function (res) {
                if (res.Success) {
                    window.location.reload();
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
        Beszerzesiterv.Delete = function (errorDataString, buttonId, deleteUrl, deleteData, indexUrl) {
            $("[id='" + buttonId + "']").attr("disabled", "disabled");
            INKA.AJAX.POST(deleteUrl, deleteData, function (res) {
                if (res.Success) {
                    INKA.Navigation.OpenSplitLeft(indexUrl);
                }
                else {
                    if (res.ValidationError) {
                        INKA.Messages.Alert("Hibaüzenet", "A kiválasztott " + errorDataString + " nem létezik");
                        $("[id='" + buttonId + "']").removeAttr("disabled");
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", INKA.Messages.FormatAlertMessage(res.Message, res.Hibakod));
                        $("[id='" + buttonId + "']").removeAttr("disabled");
                    }
                }
                if (DEBUG) {
                    INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
                }
            });
        };
        return Beszerzesiterv;
    }());
    INKA.Beszerzesiterv = Beszerzesiterv;
    var DokumentumSablon = (function () {
        function DokumentumSablon() {
        }
        DokumentumSablon.Submit = function (errorMessage, buttonId, formId, postUrl, reloadFunction, fileUpload) {
            $("#" + buttonId).attr("disabled", "disabled");
            INKA.AJAX.SubmitForm(formId, postUrl, function (res) {
                if (res.Success) {
                    //INKA.Navigation.OpenSplitLeft(indexUrl + "/" + res.Data);
                    //window.location.href = indexUrl + "/" + res.Data;
                    reloadFunction(res);
                }
                else {
                    if (res.ValidationError) {
                        INKA.Messages.Alert("Beviteli mező ellenőrzés", INKA.Messages.Validation(res.Data));
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", errorMessage);
                    }
                    if (DEBUG) {
                        INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
                    }
                    $("#" + buttonId).removeAttr("disabled");
                }
            }, null, fileUpload);
            return false;
        };
        DokumentumSablon.Delete = function (errorDataString, buttonId, deleteUrl, deleteData, indexUrl) {
            $("[id='" + buttonId + "']").attr("disabled", "disabled");
            INKA.AJAX.POST(deleteUrl, deleteData, function (res) {
                if (res.Success) {
                    INKA.Navigation.OpenTab(indexUrl);
                }
                else {
                    if (res.ValidationError) {
                        INKA.Messages.Alert("Hibaüzenet", "A kiválasztott " + errorDataString + " nem létezik");
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", "Hiba történt a kiválasztott " + errorDataString + " törlése közben");
                    }
                    $("[id='" + buttonId + "']").removeAttr("disabled");
                }
                if (DEBUG) {
                    INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
                }
            });
        };
        return DokumentumSablon;
    }());
    INKA.DokumentumSablon = DokumentumSablon;
    var DokumentumSablonVerzio = (function () {
        function DokumentumSablonVerzio() {
        }
        DokumentumSablonVerzio.Delete = function (errorDataString, buttonId, deleteUrl, deleteData, success) {
            $("[id='" + buttonId + "']").attr("disabled", "disabled");
            INKA.AJAX.POST(deleteUrl, deleteData, function (res) {
                if (res.Success) {
                    success();
                }
                else {
                    if (res.ValidationError) {
                        INKA.Messages.Alert("Hibaüzenet", "A kiválasztott " + errorDataString + " nem létezik");
                        $("[id='" + buttonId + "']").removeAttr("disabled");
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", "Hiba történt a kiválasztott " + errorDataString + " törlése közben");
                        $("[id='" + buttonId + "']").removeAttr("disabled");
                    }
                }
                if (DEBUG) {
                    INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
                }
            });
        };
        DokumentumSablonVerzio.Submit = function (errorMessage, buttonId, formId, postUrl, indexUrl, uploadFile) {
            $("#" + buttonId).attr("disabled", "disabled");
            INKA.AJAX.SubmitForm(formId, postUrl, function (res) {
                if (res.Success) {
                    window.location.href = indexUrl;
                }
                else {
                    if (res.ValidationError) {
                        INKA.Messages.Alert("Beviteli mező ellenőrzés", INKA.Messages.Validation(res.Data));
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", errorMessage);
                    }
                    if (DEBUG) {
                        INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
                    }
                    $("#" + buttonId).removeAttr("disabled");
                }
            }, null, uploadFile);
            return false;
        };
        return DokumentumSablonVerzio;
    }());
    INKA.DokumentumSablonVerzio = DokumentumSablonVerzio;
    var AjanlatiDokumentacio = (function () {
        function AjanlatiDokumentacio() {
        }
        AjanlatiDokumentacio.Validate = function (errorMessage, buttonId, formId, validateUrl, success) {
            INKA.AJAX.SubmitForm(formId, validateUrl, function (res) {
                if (res.Success) {
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
        AjanlatiDokumentacio.Kitoltes = function (errorMessage, buttonId, formId, kitoltesUrl, callback) {
            INKA.AJAX.SubmitForm(formId, kitoltesUrl, function (res) {
                try {
                    callback(res);
                }
                catch (e) {
                    callback();
                }
            });
        };
        AjanlatiDokumentacio.DownloadFilledDocument = function (errorMessage, buttonId, formData, postUrl, indexUrl) {
            INKA.Messages.ProgressOn();
            $("#" + buttonId).attr("disabled", "disabled");
            var postData;
            if (typeof (formData) === "function") {
                postData = formData();
            }
            else if (typeof (formData) === "string") {
                postData = $("#" + formData).serializeObject();
            }
            INKA.AJAX.CreateXHRObjectAndSendData(postUrl, "POST", "arraybuffer", postData, function () {
                //load
                if (this.status === 200 && this.readyState === 4) {
                    if (this.response.byteLength > 0) {
                        var blob = new Blob([this.response], { type: 'application/octet-stream' });
                        INKA.Messages.ProgressOff();
                        saveAs(blob, "Doksi_" + Date.now().toString() + ".docx");
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", "A kért dokumentum nem található!");
                        INKA.Messages.ProgressOff();
                    }
                }
                else {
                    INKA.Messages.Alert("Hibaüzenet", this.statusText);
                }
                $("#" + buttonId).removeAttr("disabled");
            }, function () {
                //error
                INKA.Messages.Alert("Hibaüzenet", this.statusText);
            }, function () {
                //abort
                INKA.Messages.Alert("Hibaüzenet", "A művelet megszakadt, próbálja újra!");
            });
            return false;
        };
        return AjanlatiDokumentacio;
    }());
    INKA.AjanlatiDokumentacio = AjanlatiDokumentacio;
    var KozbeszInditas = (function () {
        function KozbeszInditas() {
        }
        //static Delete(errorDataString: string, buttonId: string, deleteUrl: string, deleteData: any, indexUrl: string) {
        //	$("[id='" + buttonId + "']").attr("disabled", "disabled");
        //	INKA.AJAX.POST(deleteUrl, deleteData, function (res) {
        //		if (res.Success) {
        //			INKA.Navigation.OpenSplitLeft(indexUrl);
        //		}
        //		else {
        //			if (res.ValidationError) {
        //				INKA.Messages.Alert("Hibaüzenet", "A kiválasztott " + errorDataString + " nem létezik");
        //				$("[id='" + buttonId + "']").removeAttr("disabled");
        //			}
        //			else {
        //				INKA.Messages.Alert("Hibaüzenet", "Hiba történt a kiválasztott " + errorDataString + " törlése közben");
        //				$("[id='" + buttonId + "']").removeAttr("disabled");
        //			}
        //		}
        //		if (DEBUG) {
        //			INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
        //		}
        //	});
        //}
        KozbeszInditas.LoadLast = function (kozbeszId, Area) {
            INKA.AJAX.POST("/" + Area + "/KozbeszerzesiEljarasInditasa/LoadLastState/", { id: kozbeszId }, function (res) {
                switch (res) {
                    case "Adatlap":
                        INKA.Navigation.OpenStep("/" + Area + "/KozbeszerzesiEljarasInditasa/Adatlap/" + kozbeszId);
                        $(".step").removeClass("selected");
                        $("#adatlap").addClass("selected");
                        break;
                    case "Utemezes":
                        INKA.Navigation.OpenStep("/" + Area + "/KozbeszerzesiEljarasInditasa/Utemezes/" + kozbeszId);
                        $(".step").removeClass("selected");
                        $("#utemezes").addClass("selected");
                        break;
                    case "BiralatiSzempontok":
                        INKA.Navigation.OpenStep("/" + Area + "/KozbeszerzesiEljarasInditasa/BiralatiSzempontok/" + kozbeszId);
                        $(".step").removeClass("selected");
                        $("#ertekelesi_szempontok").addClass("selected");
                        break;
                    case "DokumentumTartalomjegyzek":
                        INKA.Navigation.OpenStep("/" + Area + "/KozbeszerzesiEljarasInditasa/DokumentumTartalomjegyzek", { Id: kozbeszId, felhivas: true }, "GET");
                        $(".step").removeClass("selected");
                        $("#ajanlati_felhivas").addClass("selected");
                        break;
                    case "DokumentumKitoltes":
                        INKA.Navigation.OpenStep("/" + Area + "/KozbeszerzesiEljarasInditasa/DokumentumKitoltes", { id: kozbeszId, Felhivas: true }, "GET");
                        $(".step").removeClass("selected");
                        $("#ajanlati_felhivas").addClass("selected");
                        break;
                    case "DokumentumTartalomjegyzek":
                        INKA.Navigation.OpenStep("/" + Area + "/KozbeszerzesiEljarasInditasa/DokumentumTartalomjegyzek", { Id: kozbeszId, felhivas: false }, "GET");
                        $(".step").removeClass("selected");
                        $("#ajanlati_dokumentacio").addClass("selected");
                        break;
                    case "AjanlatiDokumentacio":
                        //INKA.Navigation.OpenStep("/" + Area + "/KozbeszerzesiEljarasInditasa/DokumentumKitoltes", { KozbeszId: kozbeszId, Felhivas: false }, "GET");
                        INKA.Navigation.OpenStep("/" + Area + "/KozbeszerzesiEljarasInditasa/AjanlatiDokumentacio", { Id: kozbeszId, inditas: false }, "GET");
                        $(".step").removeClass("selected");
                        $("#ajanlati_dokumentacio").addClass("selected");
                        break;
                    case "Inditas":
                        INKA.Navigation.OpenStep("/" + Area + "/KozbeszerzesiEljarasInditasa/Inditas", { Id: kozbeszId }, "GET");
                        $(".step").removeClass("selected");
                        $("#inditas").addClass("selected");
                        break;
                }
            });
        };
        //static LoadLastTanacsado(kozbeszId) {
        //	INKA.AJAX.POST("/Tanacsado/KozbeszerzesiEljarasInditasa/LoadLastState/", { id: kozbeszId }, function (res) {
        //		switch (res) {
        //			case "adatlap":
        //				INKA.Navigation.OpenStep("/Tanacsado/KozbeszerzesiEljarasInditasa/Adatlap/" + kozbeszId);
        //				$(".step").removeClass("selected");
        //				$("#adatlap").addClass("selected");
        //				break;
        //			case "utemezes":
        //				INKA.Navigation.OpenStep("/Tanacsado/KozbeszerzesiEljarasInditasa/Utemezes/" + kozbeszId);
        //				$(".step").removeClass("selected");
        //				$("#utemezes").addClass("selected");
        //				break;
        //			case "birszemp":
        //				INKA.Navigation.OpenStep("/Tanacsado/KozbeszerzesiEljarasInditasa/BiralatiSzempontok/" + kozbeszId);
        //				$(".step").removeClass("selected");
        //				$("#biralati_szempontok").addClass("selected");
        //				break;
        //		}
        //	});
        //}
        KozbeszInditas.Next = function (errorMessage, buttonId, nextStepId, formId, postUrl, nextUrl) {
            $("#" + buttonId).attr("disabled", "disabled");
            return INKA.KozbeszInditas.NextData(errorMessage, buttonId, nextStepId, $("#" + formId).serializeObject(), postUrl, nextUrl);
        };
        KozbeszInditas.NextData = function (errorMessage, buttonId, nextStepId, formdata, postUrl, nextUrl) {
            $("#" + buttonId).attr("disabled", "disabled");
            INKA.AJAX.POST(postUrl, formdata, function (res) {
                if (res.Success) {
                    INKA.Navigation.OpenStep(nextUrl);
                    $(".step").removeClass("selected");
                    $("#" + nextStepId).addClass("selected");
                }
                else {
                    if (res.ValidationError) {
                        INKA.Messages.Alert("Beviteli mező ellenőrzés", INKA.Messages.Validation(res.Data));
                    }
                    else {
                        if (res.Data == 10000) {
                            INKA.Messages.Prompt('Figyelmeztetés', res.Message, function () {
                                INKA.Navigation.OpenStep(nextUrl);
                            });
                        }
                        else {
                            INKA.Messages.Alert("Hibaüzenet", res.Message);
                        }
                    }
                    if (DEBUG) {
                        INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
                    }
                    $("#" + buttonId).removeAttr("disabled");
                }
            });
            return false;
        };
        KozbeszInditas.ZoomAndOffset = function (naptarContainerId, zoomlevel, offset, kozbeszId, zoomUrl) {
            INKA.AJAX.POST(zoomUrl, { id: kozbeszId, zoomLevel: zoomlevel, offset: offset }, function (res) {
                $("#" + naptarContainerId).html(res);
            });
            return false;
        };
        return KozbeszInditas;
    }());
    INKA.KozbeszInditas = KozbeszInditas;
    var KozbeszFolyamat = (function () {
        function KozbeszFolyamat() {
        }
        KozbeszFolyamat.LoadLast = function (kozbeszId, Area) {
            INKA.AJAX.POST("/" + Area + "/KozbeszerzesiEljarasFolyamat/LoadLastState/", { id: kozbeszId }, function (res) {
                switch (res) {
                    case "Ajanlattetel":
                        INKA.Navigation.OpenStep("/" + Area + "/KozbeszerzesiEljarasFolyamat/Ajanlattetel/" + kozbeszId);
                        $(".step").removeClass("selected");
                        $("#ajanlatteteli_szakasz").addClass("selected");
                        break;
                    case "Bontas":
                        INKA.Navigation.OpenStep("/" + Area + "/KozbeszerzesiEljarasFolyamat/Bontas/" + kozbeszId);
                        $(".step").removeClass("selected");
                        $("#bontas").addClass("selected");
                        break;
                    case "Biralat":
                        INKA.Navigation.OpenStep("/" + Area + "/KozbeszerzesiEljarasFolyamat/Biralat/" + kozbeszId);
                        $(".step").removeClass("selected");
                        $("#ertekelesi_szakasz").addClass("selected");
                        break;
                    case "DontesElokeszitese":
                        INKA.Navigation.OpenStep("/" + Area + "/KozbeszerzesiEljarasFolyamat/DontesElokeszitese/" + kozbeszId);
                        $(".step").removeClass("selected");
                        $("#dontes_elokeszites").addClass("selected");
                        break;
                    case "Lezaras":
                        INKA.Navigation.OpenStep("/" + Area + "/KozbeszerzesiEljarasFolyamat/Lezaras/" + kozbeszId);
                        $(".step").removeClass("selected");
                        $("#lezaras").addClass("selected");
                        break;
                }
            });
        };
        KozbeszFolyamat.Next = function (errorMessage, buttonId, nextStepId, formId, postUrl, nextUrl) {
            $("#" + buttonId).attr("disabled", "disabled");
            INKA.AJAX.SubmitForm(formId, postUrl, function (res) {
                if (res.Success) {
                    INKA.Navigation.OpenStep(nextUrl);
                    $(".step").removeClass("selected");
                    $("#" + nextStepId).addClass("selected");
                }
                else {
                    if (res.ValidationError) {
                        INKA.Messages.Alert("Beviteli mező ellenőrzés", INKA.Messages.Validation(res.Data));
                    }
                    else {
                        INKA.Messages.Alert("Hibaüzenet", errorMessage);
                    }
                    if (DEBUG) {
                        INKA.Messages.Alert("DEBUG: " + res.Data, res.Message);
                    }
                    $("#" + buttonId).removeAttr("disabled");
                }
            });
            return false;
        };
        return KozbeszFolyamat;
    }());
    INKA.KozbeszFolyamat = KozbeszFolyamat;
    var KerdesValidation = (function () {
        function KerdesValidation() {
        }
        KerdesValidation.Hossz = function (minLen, maxLen) {
            if (minLen > -1 && maxLen > -1 && minLen > maxLen) {
                return ["A minimum hossznak kisebbnek vagy egyenlőnek kell lennie mint a maximum hossz!"];
            }
            return [];
        };
        KerdesValidation.Egyedi = function (elemek) {
            var megvan = [];
            for (var i = 0; i < elemek.length; i++) {
                if (megvan.indexOf(elemek[i]) != -1 && elemek[i] != "") {
                    return ["A megadott értékek között nem szerepelhet ugyanolyan!"];
                }
                else {
                    megvan.push(elemek[i]);
                }
            }
            return [];
        };
        KerdesValidation.IntervallumSzam = function (kMin, kMax, vMin, vMax, dMin, dMax) {
            var hibak = [];
            if (parseFloat(kMin.replace(",", ".")) > parseFloat(kMax.replace(",", "."))) {
                hibak.push("A kezdőérték minimumának kisebbenek kell lennie a maximumtól");
            }
            if (parseFloat(vMin.replace(",", ".")) > parseFloat(vMax.replace(",", "."))) {
                hibak.push("A végérték minimumának kisebbenek kell lennie a maximumtól");
            }
            if (parseFloat(dMin.replace(",", ".")) > parseFloat(dMax.replace(",", "."))) {
                hibak.push("A minimum differenciának kisebbenek kell lennie a maximumtól");
            }
            if (parseFloat(kMin.replace(",", ".")) > parseFloat(vMin.replace(",", "."))) {
                hibak.push("A végérték minimuma nagyobb kell hogy legyen mint a kezdőérték minimuma");
            }
            if (parseFloat(kMax.replace(",", ".")) > parseFloat(vMax.replace(",", "."))) {
                hibak.push("A végérték maximuma nagyobb kell hogy legyen mint a kezdőérték maximuma");
            }
            var miV = parseFloat(vMin.replace(",", "."));
            var maK = parseFloat(kMax.replace(",", "."));
            var miD = parseFloat(dMin.replace(",", "."));
            var maD = parseFloat(dMax.replace(",", "."));
            var dif = miV - maK;
            if (miV > maK && dif < miD) {
                hibak.push("A megadott feltételekkel a minimum differencia nem teljesíthető");
            }
            if (miV > maK && dif > maD) {
                hibak.push("A megadott feltételekkel a maximum differencia nem teljesíthető");
            }
            return hibak;
        };
        KerdesValidation.IntervallumDatum = function (kMin, kMax, vMin, vMax, dMin, dMax) {
            var hibak = [];
            var dateformat = "YYYY. MM. DD.";
            if (new Date(moment(kMin, dateformat)) > new Date(moment(kMax, dateformat))) {
                hibak.push("A kezdőérték minimumának kisebbenek kell lennie a maximumtól");
            }
            if (new Date(moment(vMin, dateformat)) > new Date(moment(vMax, dateformat))) {
                hibak.push("A végérték minimumának kisebbenek kell lennie a maximumtól");
            }
            if (parseFloat(dMin.replace(",", ".")) > parseFloat(dMax.replace(",", "."))) {
                hibak.push("A minimum differenciának kisebbenek kell lennie a maximumtól");
            }
            if (new Date(moment(kMin, dateformat)) > new Date(moment(vMin, dateformat))) {
                hibak.push("A végérték minimuma nagyobb kell hogy legyen mint a kezdőérték minimuma");
            }
            if (new Date(moment(kMax, dateformat)) > new Date(moment(vMax, dateformat))) {
                hibak.push("A végérték maximuma nagyobb kell hogy legyen mint a kezdőérték maximuma");
            }
            var miV = new Date(moment(vMin, dateformat)).getTime();
            var maK = new Date(moment(kMax, dateformat)).getTime();
            var miD = parseFloat(dMin.replace(",", "."));
            var maD = parseFloat(dMax.replace(",", "."));
            var timeDiff = Math.abs(miV - maK);
            var dif = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (miV > maK && dif < miD) {
                hibak.push("A megadott feltételekkel a minimum differencia nem teljesíthető");
            }
            if (miV > maK && dif > maD) {
                hibak.push("A megadott feltételekkel a maximum differencia nem teljesíthető");
            }
            return hibak;
        };
        return KerdesValidation;
    }());
    INKA.KerdesValidation = KerdesValidation;
})(INKA || (INKA = {}));
//# sourceMappingURL=INKA_Control.js.map