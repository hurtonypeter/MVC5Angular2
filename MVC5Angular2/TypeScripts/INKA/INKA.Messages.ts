module INKA {
    export class Messages {
        private static MessageQueueP: INKA.PromptParams[] = Array();
        private static MessageQueueA: INKA.AlertParams[] = Array();

        private static ClosePrompt() {
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
        }

        static Prompt(title: string, message: string, yes: any, no: any = undefined, bezarasNeve: string = "Mégse") {
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
            $("#prompt #rightButton").html('<button id="nobuttonPrompt"><span>' + bezarasNeve+'</span></button>');
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
        }

        static ProgressOn() {
            $(".loadingModal").show();
        }

        static ProgressOff() {
            $(".loadingModal").hide();
        }

        static FormatAlertMessage(message: string, errorCode: string): string {
            return message + (errorCode !== null && errorCode !== "" ? `<br /><br />Hibakód: ${errorCode}` : "");
        }

        static Alert(title: string, message: string, reloadurl: string = undefined, reloadhow: ReloadHow = ReloadHow.Redirect, secondurl: string = undefined) {

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
                        case ReloadHow.OpenSplitLeft: INKA.Navigation.OpenSplitLeft(reloadurl, {});
                            if (secondurl != undefined) INKA.Navigation.OpenSplitRight(secondurl, {});
                            break;
                        case ReloadHow.OpenSplitRight: INKA.Navigation.OpenSplitRight(reloadurl, {});
                            break;
                        case ReloadHow.OpenStep: INKA.Navigation.OpenStep(reloadurl, {});
                            break;
                        case ReloadHow.OpenTab: INKA.Navigation.OpenTab(reloadurl, {});
                            break;
                        case ReloadHow.Redirect: window.location.href = reloadurl;
                            break;
                        case ReloadHow.WindowReload: window.location.reload();
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
        }

        static Validation(valid: any) {
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
        }

        static Info(message: string, padding: string = "0") {
            var x = '<table style="margin: ' + padding + 'px 0 0 ' + padding + 'px;"><tbody><tr><td style="vertical-align: top;"><img src="/Content/images/sarga/felkialtojel.png"></td><td><span>';
            x += message + '</span></td></tr></tbody></table>';
            return x;
        }

        static SetLevel(level: number) {
            if (level == 0) {
                $("#prompt").removeClass("MessageLevelOne");
            }
            if (level == 1) {
                $("#prompt").addClass("MessageLevelOne");
            }
        }

        
    }
}