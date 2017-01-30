///<reference path="../../Scripts/typings/custom.d.ts" />
var INKA;
(function (INKA) {
    var Navigation = (function () {
        function Navigation() {
        }
        Navigation.GlobalInit = function () {
            INKA.Navigation.InitDateTimeFields();
            INKA.Navigation.InitNumberFields();
            INKA.Navigation.InitMovingTextArea();
            tinymce.init({
                id: 'yourId',
                theme: "modern",
                entity_encoding: "raw",
                skin: 'light',
                selector: "textarea.MCE",
                height: 500,
                language: "hu_HU",
                menubar: false,
                plugins: "fullpage fullscreen media nonbreaking pagebreak preview print spellchecker visualchars table insertdatetime advlist charmap, colorpicker lists textcolor  wordcount visualblocks textpattern tabfocus directionality hr code",
                toolbar: [
                    "undo redo | cut copy paste | preview print | formatselect fontsizeselect removeformat | visualblocks visualchars | fullscreen",
                    "bold italic underline strikethrough subscript superscript | forecolor backcolor | alignleft aligncenter alignright alignjustify| bullist numlist | outdent indent",
                    "nonbreaking pagebreak table insertdatetime hr blockquote charmap",
                ]
            });
        };
        Navigation.InitMovingTextArea = function () {
            $(".movingTextarea").movingTextarea({ to: 100, max: 280 });
        };
        Navigation.InitDateTimeFields = function () {
            $.each($('.datepicker'), function (index, el) {
                var query;
                if (el.id) {
                    query = "input[id='" + el.id + "']";
                }
                else {
                    query = "input[name='" + el.name + "']";
                }
                $(query).datetimepicker({
                    timepicker: false,
                    format: 'Y. m. d.',
                    lang: 'hu',
                    dayOfWeekStart: 1,
                    scrollMonth: false,
                    scrollInput: false
                });
            });
            $.each($('.datetimepicker'), function (index, el) {
                var query;
                if (el.id) {
                    query = "input[id='" + el.id + "']";
                }
                else {
                    query = "input[name='" + el.name + "']";
                }
                $(query).datetimepicker({
                    format: 'Y. m. d.    H:i',
                    lang: 'hu',
                    dayOfWeekStart: 1,
                    step: 15,
                    scrollMonth: false,
                    scrollInput: false
                });
            });
        };
        Navigation.NavigateToLezartListFor = function (area) {
            window.location.href = "/" + area + "/KozbeszerzesiEljaras/Index/?lezarasbol=true";
        };
        Navigation.InitNumberFields = function () {
            var decimalseparator = ",";
            $(".egesz").number(true, 0, decimalseparator, " ");
            $(".valos").number(true, 2, decimalseparator, " ");
            $(".valos").removeClass("valos");
            $(".valosNoOverride").number(false, 2, decimalseparator, " ");
            $(".valos6").number(true, 2, decimalseparator, " ");
        };
        Navigation.OpenTo = function (container, url, loadwhat, data, methodType) {
            if (data === void 0) { data = {}; }
            if (methodType === void 0) { methodType = 'GET'; }
            $("#" + container).html("betöltés...");
            console.log(url);
            var success = function (res) {
                $("#" + container).html(res);
                try {
                    INKA.Navigation.GlobalInit();
                    if (loadwhat == INKA.LoadWhat.TabReady) {
                        TabReady();
                    }
                    if (loadwhat == INKA.LoadWhat.StepReady) {
                        StepReady();
                    }
                    if (loadwhat == INKA.LoadWhat.SplitLeft) {
                        SplitLeftReady();
                    }
                    if (loadwhat == INKA.LoadWhat.SplitRight) {
                        SplitRightReady();
                    }
                }
                catch (e) {
                }
            }, error = function (err) {
                $("#" + container).html("Hiba történt az oldal beöltésekor<br><br>" + err.responseText);
            };
            if (methodType === 'GET') {
                INKA.AJAX.GET(url, data, success, error);
            }
            else if (methodType === 'POST') {
                INKA.AJAX.POST(url, data, success, error, false);
            }
            return false;
        };
        Navigation.OpenTab = function (url, data, methodType) {
            if (data === void 0) { data = {}; }
            if (methodType === void 0) { methodType = 'GET'; }
            $("#SearchSection").html("");
            return INKA.Navigation.OpenTo("tabContent", url, INKA.LoadWhat.TabReady, data, methodType);
        };
        Navigation.OpenStep = function (url, data, methodType) {
            if (data === void 0) { data = {}; }
            if (methodType === void 0) { methodType = 'GET'; }
            $("#SearchSection").html("");
            return INKA.Navigation.OpenTo("stepContent", url, INKA.LoadWhat.StepReady, data, methodType);
        };
        Navigation.OpenSplitLeft = function (url, data, methodType) {
            if (data === void 0) { data = {}; }
            if (methodType === void 0) { methodType = 'GET'; }
            $("#SearchSection").html("");
            INKA.Navigation.CloseSplitRight();
            return INKA.Navigation.OpenTo("leftCol", url, INKA.LoadWhat.SplitLeft, data, methodType);
        };
        Navigation.OpenSplitRight = function (url, data, methodType) {
            if (data === void 0) { data = {}; }
            if (methodType === void 0) { methodType = 'GET'; }
            $("#leftCol").addClass("openedCol");
            $("#rightCol").addClass("openedCol");
            $("#leftCol").trigger("rightOpened");
            return INKA.Navigation.OpenTo("rightCol", url, INKA.LoadWhat.SplitRight, data, methodType);
        };
        Navigation.CloseSplitRight = function () {
            $("#rightCol").removeClass("openedCol");
            $("#rightCol").html("");
        };
        Navigation.OpenPopup = function (title, url, yes, savegombneve, savegombCss, bezarasneve) {
            if (savegombneve === void 0) { savegombneve = "Mentés"; }
            if (savegombCss === void 0) { savegombCss = "popupyesbutton"; }
            if (bezarasneve === void 0) { bezarasneve = "Mégse"; }
            $("#popupform #popuptitle").html(title);
            $("#popupform #popupcontent").html("betöltés...");
            INKA.AJAX.GET(url, {}, function (res) {
                $("#popupform #popupcontent").html(res);
                try {
                    INKA.Navigation.GlobalInit();
                    var docH = window.innerHeight;
                    var promptH = $("#popupform .").height();
                    var promptT = docH / 2 - promptH / 2;
                    promptT = promptT < 10 ? 10 : promptT;
                    $("#popupform .popupBody").css("top", promptT + "px");
                }
                catch (e) {
                }
                try {
                    PopupReady();
                }
                catch (e) {
                }
            }, function (err) {
                $("#popupform #popupcontent").html("Hiba történt az oldal beöltésekor<br><br>" + err.responseText);
            });
            if (yes == "static") {
                $("#popupform #popuprightButton").html('<button id="popupstaticbutton"><span>Bezárás</span></button>');
                $("#popupstaticbutton").click(function () {
                    INKA.Navigation.ClosePopup();
                });
            }
            else if (yes == undefined) {
                $("#popupform #popuprightButton").html('<button id="popupnobutton"><span>Bezárás</span></button>');
                $("#popupform #popupleftButton").html('');
            }
            else {
                $("#popupform #popupleftButton").html('<button id="' + savegombCss + '"><span>' + savegombneve + '</span></button>');
                $("#" + savegombCss).click(function () {
                    yes();
                });
                $("#popupform #popuprightButton").html('<button id="popupnobutton"><span>' + bezarasneve + '</span></button>');
            }
            /*
            if (yes != undefined) {
                $("#popupform #popupleftButton").html('<button id="popupyesbutton">Mentés</button>');
                $("#popupyesbutton").click(function () {
                    yes();
                });
                $("#popupform #popuprightButton").html('<button id="popupnobutton">Mégse</button>');
            }
            else {
                $("#popupform #popuprightButton").html('<button id="popupnobutton">Bezárás</button>');
            }*/
            $("#popupnobutton").click(function () {
                INKA.Navigation.ClosePopup();
            });
            $("#popupform").show();
        };
        Navigation.ClosePopup = function () {
            $("#popupform #popuptitle").html("");
            $("#popupform #popupcontent").html("");
            $("#popupform #popupleftButton").html("");
            $("#popupform #popuprightButton").html("");
            $("#popupform").hide();
        };
        Navigation.OpenSecondPopup = function (title, url, yes) {
            $("#popupform2 #popuptitle").html(title);
            $("#popupform2 #popupcontent").html("betöltés...");
            if (url.indexOf("html:") == 0) {
                var uu = "<input type=\"hidden\" id=\"popupopened\">" + url.replace("html:", "");
                $("#popupform2 #popupcontent").html(uu);
                try {
                    INKA.Navigation.GlobalInit();
                    var docH = window.innerHeight;
                    var promptH = $("#popupform2 .popupBody2").height();
                    var promptT = docH / 2 - promptH / 2;
                    promptT = promptT < 10 ? 10 : promptT;
                }
                catch (e) {
                }
                try {
                    PopupReady();
                }
                catch (e) {
                }
            }
            else {
                INKA.AJAX.GET(url, {}, function (res) {
                    $("#popupform2 #popupcontent").html(res);
                    try {
                        INKA.Navigation.GlobalInit();
                        var docH = window.innerHeight;
                        var promptH = $("#popupform2 .popupBody2").height();
                        var promptT = docH / 2 - promptH / 2;
                        promptT = promptT < 10 ? 10 : promptT;
                    }
                    catch (e) {
                    }
                    try {
                        PopupReady();
                    }
                    catch (e) {
                    }
                }, function (err) {
                    $("#popupform2 #popupcontent").html("Hiba történt az oldal beöltésekor<br><br>" + err.responseText);
                });
            }
            $("#popupform2 #popupleftButton").html('<button id="popupyesbutton2"><span>Mentés</span></button>');
            $("#popupform2 #popuprightButton").html('<button id="popupnobutton2"><span>Mégse</span></button>');
            $("#popupyesbutton2").click(function () {
                yes();
            });
            $("#popupnobutton2").click(function () {
                INKA.Navigation.CloseSecondPopup();
            });
            $("#popupform2").show();
        };
        Navigation.OpenSecondPopup2 = function (title, url, yes, savegombneve, savegombCss, bezarasneve) {
            if (savegombneve === void 0) { savegombneve = "Mentés"; }
            if (savegombCss === void 0) { savegombCss = "popupyesbutton2"; }
            if (bezarasneve === void 0) { bezarasneve = "Mégse"; }
            $("#popupform2 #popuptitle").html(title);
            $("#popupform2 #popupcontent").html("betöltés...");
            INKA.AJAX.GET(url, {}, function (res) {
                $("#popupform2 #popupcontent").html(res);
                try {
                    INKA.Navigation.GlobalInit();
                    var docH = window.innerHeight;
                    var promptH = $("#popupform2 .popupBody2").height();
                    var promptT = docH / 2 - promptH / 2;
                    promptT = promptT < 10 ? 10 : promptT;
                }
                catch (e) {
                }
                try {
                    PopupReady();
                }
                catch (e) {
                }
            }, function (err) {
                $("#popupform2 #popupcontent").html("Hiba történt az oldal beöltésekor<br><br>" + err.responseText);
            });
            if (yes == "static") {
                $("#popupform2 #popuprightButton").html('<button id="popupstaticbutton2"><span>Bezárás</span></button>');
                $("#popupstaticbutton2").click(function () {
                    INKA.Navigation.CloseSecondPopup();
                });
            }
            else if (yes == undefined) {
                $("#popupform2 #popuprightButton").html('<button id="popupnobutton2"><span>Bezárás</span></button>');
                $("#popupform2 #popupleftButton").html('');
            }
            else {
                $("#popupform2 #popupleftButton").html('<button id="' + savegombCss + '"><span>' + savegombneve + '</span></button>');
                $("#" + savegombCss).click(function () {
                    yes();
                });
                $("#popupform2 #popuprightButton").html('<button id="popupnobutton2"><span>' + bezarasneve + '</span></button>');
            }
            /*
            if (yes != undefined) {
                $("#popupform #popupleftButton").html('<button id="popupyesbutton">Mentés</button>');
                $("#popupyesbutton").click(function () {
                    yes();
                });
                $("#popupform #popuprightButton").html('<button id="popupnobutton">Mégse</button>');
            }
            else {
                $("#popupform #popuprightButton").html('<button id="popupnobutton">Bezárás</button>');
            }*/
            $("#popupnobutton2").click(function () {
                INKA.Navigation.CloseSecondPopup();
            });
            $("#popupform2").show();
        };
        Navigation.OpenUnclosablePopup = function (title, url) {
            $("#popupform2 #popuptitle").html(title);
            $("#popupform2 #popupcontent").html("betöltés...");
            if (url.indexOf("html:") == 0) {
                var uu = "<input type=\"hidden\" id=\"popupopened\">" + url.replace("html:", "");
                $("#popupform2 #popupcontent").html(uu);
                try {
                    INKA.Navigation.GlobalInit();
                    var docH = window.innerHeight;
                    var promptH = $("#popupform2 .popupBody2").height();
                    var promptT = docH / 2 - promptH / 2;
                    promptT = promptT < 10 ? 10 : promptT;
                }
                catch (e) {
                }
                try {
                    PopupReady();
                }
                catch (e) {
                }
            }
            else {
                INKA.AJAX.GET(url, {}, function (res) {
                    $("#popupform2 #popupcontent").html(res);
                    try {
                        INKA.Navigation.GlobalInit();
                        var docH = window.innerHeight;
                        var promptH = $("#popupform2 .popupBody2").height();
                        var promptT = docH / 2 - promptH / 2;
                        promptT = promptT < 10 ? 10 : promptT;
                    }
                    catch (e) {
                    }
                    try {
                        PopupReady();
                    }
                    catch (e) {
                    }
                }, function (err) {
                    $("#popupform2 #popupcontent").html("Hiba történt az oldal beöltésekor<br><br>" + err.responseText);
                });
            }
            $("#popupform2").show();
        };
        Navigation.OpenCustomPopup = function (title, url, buttons) {
            $("#customPopupform #popuptitle").html(title);
            $("#customPopupform #popupcontent").html("betöltés...");
            if (url.indexOf("html:") == 0) {
                var uu = "<input type=\"hidden\" id=\"popupopened\">" + url.replace("html:", "");
                $("#customPopupform #popupcontent").html(uu);
                try {
                    INKA.Navigation.GlobalInit();
                    var docH = window.innerHeight;
                    var promptH = $("#customPopupform .customPopupBody").height();
                    var promptT = docH / 2 - promptH / 2;
                    promptT = promptT < 10 ? 10 : promptT;
                }
                catch (e) {
                }
                try {
                    PopupReady();
                }
                catch (e) {
                }
            }
            else {
                INKA.AJAX.GET(url, {}, function (res) {
                    $("#customPopupform #popupcontent").html(res);
                    try {
                        INKA.Navigation.GlobalInit();
                        var docH = window.innerHeight;
                        var promptH = $("#customPopupform .customPopupBody").height();
                        var promptT = docH / 2 - promptH / 2;
                        promptT = promptT < 10 ? 10 : promptT;
                    }
                    catch (e) {
                    }
                    try {
                        PopupReady();
                    }
                    catch (e) {
                    }
                }, function (err) {
                    $("#customPopupform #popupcontent").html("Hiba történt az oldal beöltésekor<br><br>" + err.responseText);
                });
            }
            $("#customPopupform #popupButtons").html("");
            for (var i = 0; i < buttons.length; i++) {
                $("#customPopupform #popupButtons").append('<span><button id="' + buttons[i].Id + '" class="' + buttons[i].Class + '"><span>' + buttons[i].Text + '</span></button></span>');
                $("button#" + buttons[i].Id).click(buttons[i].Onclick);
            }
            //$("#popupform2 #popupleftButton").html('<button id="popupyesbutton2">Mentés</button>');
            //$("#popupform2 #popuprightButton").html('<button id="popupnobutton2">Mégse</button>');
            //$("#popupyesbutton2").click(function () {
            //	yes();
            //});
            //$("#popupnobutton2").click(function () {
            //	INKA.Navigation.CloseSecondPopup();
            //});
            $("#customPopupform").show();
        };
        //static OpenFileUploadPopup(title, ismultiupload) {
        //    $("#popupform #popuptitle").html(title);
        //    $("#popupform #popupcontent").html("betöltés...");
        //    INKA.AJAX.GET("/FileUpload/Index", { isMulti: ismultiupload }, function (res) {
        //        $("#popupform #popupcontent").html(res);
        //        try {
        //              INKA.Navigation.GlobalInit();
        //            var docH = window.innerHeight;
        //            var promptH = $("#popupform .").height();
        //            var promptT = docH / 2 - promptH / 2;
        //            promptT = promptT < 10 ? 10 : promptT;
        //            $("#popupform .popupBody").css("top", promptT + "px");
        //        } catch (e) {
        //        }
        //        try {
        //            PopupReady();
        //        } catch (e) {
        //        }
        //    }, function (err) {
        //            $("#popupform #popupcontent").html("Hiba történt az oldal beöltésekor<br><br>" + err.responseText);
        //        });
        //    $("#popupform #popupleftButton").html('<button id="popupyesbutton"><span>Mentés</span></button>');
        //    $("#popupform #popuprightButton").html('<button id="popupnobutton"><span>Mégse</span></button>');
        //    //if (yes == "static") {
        //    //    $("#popupform #popuprightButton").html('<button id="popupstaticbutton"><span>Bezárás</span></button>');
        //    //    $("#popupstaticbutton").click(function () {
        //    //        INKA.Navigation.ClosePopup();
        //    //    });
        //    //} else if (yes == undefined) {
        //    //    $("#popupform #popuprightButton").html('<button id="popupnobutton"></button><span>Bezárás</span>');
        //    //    $("#popupform #popupleftButton").html('');
        //    //} else {
        //    //    $("#popupform #popupleftButton").html('<button id="' + savegombCss + '"><span>' + savegombneve + '</span></button>');
        //    //    $("#" + savegombCss).click(function () {
        //    //        yes();
        //    //    });
        //    //    $("#popupform #popuprightButton").html('<button id="popupnobutton"><span>' + bezarasneve + '</span></button>');
        //    //}
        //    $("#popupyesbutton").click(function () {
        //        //INKA.AJAX.SubmitForm(
        //        //    function () {
        //        //        var formdata = new FormData($('#fileuploader')[0]);
        //        //        return formdata;
        //        //    },
        //        //    '/FileUpload/Upload', INKA.Navigation.ClosePopup(), undefined, true);
        //     //   $('#fileuploader').submit();
        //    });
        //    $("#popupnobutton").click(function () {
        //        INKA.Navigation.ClosePopup();
        //    });
        //    $("#popupform").show();
        //}
        Navigation.CloseSecondPopup = function () {
            $("#popupform2 #popuptitle").html("");
            $("#popupform2 #popupcontent").html("");
            $("#popupform2 #popupleftButton").html("");
            $("#popupform2 #popuprightButton").html("");
            $("#popupform2").hide();
        };
        Navigation.CloseCustomPopup = function () {
            $("#customPopupform #popuptitle").html("");
            $("#customPopupform #popupcontent").html("");
            $("#customPopupform #popupButtons").html("");
            $("#customPopupform").hide();
        };
        Navigation.LoadStepSubtitle = function (url) {
            $("#customStepSubtitle").html("");
            return INKA.Navigation.OpenTo("customStepSubtitle", url, INKA.LoadWhat.None, {}, "GET");
        };
        return Navigation;
    }());
    INKA.Navigation = Navigation;
})(INKA || (INKA = {}));
//# sourceMappingURL=INKA.Navigation.js.map