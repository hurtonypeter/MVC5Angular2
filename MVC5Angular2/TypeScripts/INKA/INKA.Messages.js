var INKA;
(function (INKA) {
    var Messages = (function () {
        function Messages() {
        }
        Messages.ClosePrompt = function () {
            this.SetLevel(0);
            $("#prompt #title").html("");
            $("#prompt #message").html("");
            $("#prompt #leftButton").html("");
            $("#prompt #rightButton").html("");
            $("#prompt").hide();
            if (this.MessageQueueP.length != 0) {
                var p = this.MessageQueueP.pop();
                INKA.Messages.Prompt(p.Title, p.Message, p.Yes, p.No);
            }
            if (this.MessageQueueA.length != 0) {
                var a = this.MessageQueueA.pop();
                INKA.Messages.Alert(a.Title, a.Message);
            }
        };
        Messages.Prompt = function (title, message, yes, no, bezarasNeve) {
            if (no === void 0) { no = undefined; }
            if (bezarasNeve === void 0) { bezarasNeve = "Mégse"; }
            if ($("#prompt").css("display") != "none") {
                var pp = new INKA.PromptParams();
                pp.Message = message;
                pp.Title = title;
                pp.Yes = yes;
                pp.No = no;
                this.MessageQueueP.push(pp);
                return;
            }
            $("#prompt #title").html(title);
            $("#prompt #message").html(message);
            $("#prompt #leftButton").html('<button id="yesbuttonPrompt"><span>Igen</span></button>');
            $("#prompt #rightButton").html('<button id="nobuttonPrompt"><span>' + bezarasNeve + '</span></button>');
            $("#yesbuttonPrompt").click(function () {
                INKA.Messages.ClosePrompt();
                yes();
            });
            $("#nobuttonPrompt").click(function () {
                INKA.Messages.ClosePrompt();
                try {
                    no();
                }
                catch (e) { }
            });
            $("#prompt").show();
            var docH = window.innerHeight;
            var promptH = $("#prompt .promptMessage").height();
            var promptT = docH / 2 - promptH / 2;
            promptT = promptT < 10 ? 10 : promptT;
            //$("#prompt .promptMessage").css("top", promptT + "px");
        };
        Messages.ProgressOn = function () {
            $(".loadingModal").show();
        };
        Messages.ProgressOff = function () {
            $(".loadingModal").hide();
        };
        Messages.FormatAlertMessage = function (message, errorCode) {
            return message + (errorCode !== null && errorCode !== "" ? "<br /><br />Hibak\u00F3d: " + errorCode : "");
        };
        Messages.Alert = function (title, message, reloadurl, reloadhow, secondurl) {
            if (reloadurl === void 0) { reloadurl = undefined; }
            if (reloadhow === void 0) { reloadhow = INKA.ReloadHow.Redirect; }
            if (secondurl === void 0) { secondurl = undefined; }
            if ($("#prompt").css("display") != "none") {
                var ap = new INKA.AlertParams();
                ap.Message = message;
                ap.Title = title;
                this.MessageQueueA.push(ap);
                return;
            }
            $("#prompt #title").html(title);
            $("#prompt #message").html(message);
            $("#prompt #rightButton").html('<button id="closeButton"><span>OK</span></button>');
            $("#closeButton").click(function () {
                INKA.Messages.ClosePrompt();
                if (typeof reloadurl !== "undefined") {
                    switch (reloadhow) {
                        case INKA.ReloadHow.OpenSplitLeft:
                            INKA.Navigation.OpenSplitLeft(reloadurl, {});
                            if (secondurl != undefined)
                                INKA.Navigation.OpenSplitRight(secondurl, {});
                            break;
                        case INKA.ReloadHow.OpenSplitRight:
                            INKA.Navigation.OpenSplitRight(reloadurl, {});
                            break;
                        case INKA.ReloadHow.OpenStep:
                            INKA.Navigation.OpenStep(reloadurl, {});
                            break;
                        case INKA.ReloadHow.OpenTab:
                            INKA.Navigation.OpenTab(reloadurl, {});
                            break;
                        case INKA.ReloadHow.Redirect:
                            window.location.href = reloadurl;
                            break;
                        case INKA.ReloadHow.WindowReload:
                            window.location.reload();
                            break;
                    }
                }
            });
            $("#prompt").show();
            var docH = window.innerHeight;
            var promptH = $("#prompt .promptMessage").height();
            var promptT = docH / 2 - promptH / 2;
            promptT = promptT < 10 ? 10 : promptT;
            //$("#prompt .promptMessage").css("top", promptT + "px");
        };
        Messages.Validation = function (valid) {
            var mes = "Nincs minden adat megfelelően kitöltve:<br><br>";
            var names = $(".field-validation-valid").attrs("data-valmsg-for");
            for (var i = 0; i < names.length; i++) {
                $("[name='" + names[i] + "']").removeClass("error");
                $("[data-valmsg-for='" + names[i] + "']").html("");
            }
            for (var prop in valid) {
                if (valid[prop].length != 0) {
                    //if (valid[prop].length == 0) {
                    //	$("[name='" + prop + "']").removeClass("error");
                    //	$("[data-valmsg-for='" + prop + "']").html("");
                    //}
                    //else {
                    $("[name='" + prop + "']").addClass("error");
                    $("[data-valmsg-for='" + prop + "']").html("");
                    for (var i = 0; i < valid[prop].length; i++) {
                        mes += "<li>" + valid[prop][i] + "</li>";
                        if (valid[prop][i] != "") {
                            $("[data-valmsg-for='" + prop + "']").html($("[data-valmsg-for='" + prop + "']").html() + valid[prop][i] + "<br>");
                        }
                    }
                }
            }
            return mes;
        };
        Messages.Info = function (message, padding) {
            if (padding === void 0) { padding = "0"; }
            var x = '<table style="margin: ' + padding + 'px 0 0 ' + padding + 'px;"><tbody><tr><td style="vertical-align: top;"><img src="/Content/images/sarga/felkialtojel.png"></td><td><span>';
            x += message + '</span></td></tr></tbody></table>';
            return x;
        };
        Messages.SetLevel = function (level) {
            if (level == 0) {
                $("#prompt").removeClass("MessageLevelOne");
            }
            if (level == 1) {
                $("#prompt").addClass("MessageLevelOne");
            }
        };
        return Messages;
    }());
    Messages.MessageQueueP = Array();
    Messages.MessageQueueA = Array();
    INKA.Messages = Messages;
})(INKA || (INKA = {}));
//# sourceMappingURL=INKA.Messages.js.map