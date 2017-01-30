var INKA;
(function (INKA) {
    var Helpers = (function () {
        function Helpers() {
        }
        Helpers.GenerateGuid = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
        Helpers.LoadMyTemplate = function (templateId) {
            var elements = $("#" + templateId).children();
            INKA.Helpers.UnTemplatizeNames(elements);
            var htm = $("#" + templateId).html();
            INKA.Helpers.TemplatizeNames(elements);
            return htm;
        };
        Helpers.TemplatizeNames = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                if ($(elements[i]).attr("id") != undefined) {
                    $(elements[i]).attr("id", "t-" + $(elements[i]).attr("id"));
                }
                INKA.Helpers.TemplatizeNames($(elements[i]).children());
            }
        };
        Helpers.UnTemplatizeNames = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                if ($(elements[i]).attr("id") != undefined) {
                    $(elements[i]).attr("id", $(elements[i]).attr("id").replace("t-", ""));
                }
                INKA.Helpers.UnTemplatizeNames($(elements[i]).children());
            }
        };
        Helpers.LoadSearchSection = function () {
            $("#SearchSection").html($("#toSearchSection").html());
            $("#toSearchSection").remove();
        };
        Helpers.ToggleDetailSearchBox = function (elementid) {
            if ($("#" + elementid).css("display") == "none") {
                $("#" + elementid).show();
            }
            else {
                $("#" + elementid).hide();
            }
        };
        return Helpers;
    }());
    INKA.Helpers = Helpers;
})(INKA || (INKA = {}));
//# sourceMappingURL=INKA.Helpers.js.map