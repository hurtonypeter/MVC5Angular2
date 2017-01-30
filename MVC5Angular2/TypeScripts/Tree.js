var Enco;
(function (Enco) {
    var TreeView = (function () {
        function TreeView() {
            this.options = {
                emptyMessage: '<span class="no_grid_data">Nincs megjelenítendő adat</span>',
                errorMessage: '<span class="error_grid_data">Hiba történt az adatok lekérése közben</span>',
                loadingMessage: '<span class="loading_grid_data">Adatok betöltése...</span>',
                defaultLongDateFormat: "yyyy.MM.dd HH:mm",
                defaultShortDateFormat: "yyyy.MM.dd"
            };
            this.resultData = Object();
            this.collapseClick = function (elem) { };
            this.oncollapse = function (elem) { };
        }
        TreeView.prototype.Load = function (params, config) {
            var SELF = this;
            //Checking requirements
            if (!window.jQuery) {
                console.debug("jQuery is missing");
            }
            try {
                Handlebars;
            }
            catch (e) {
                console.debug("Handlebars templating is missing");
            }
            //end - Checking requirements
            Handlebars.registerHelper('Date', function (value) {
                return Enco.Grid.Date(value, SELF.options.defaultShortDateFormat);
            });
            Handlebars.registerHelper('DateF', function (value, format) {
                if (format === void 0) { format = undefined; }
                if (format == undefined) {
                    return Enco.Grid.Date(value);
                }
                else {
                    return Enco.Grid.Date(value, format);
                }
            });
            Handlebars.registerHelper('Add', function (value, toAdd) {
                var toa = eval(toAdd);
                return value + toa;
            });
            Handlebars.registerHelper('MultAdd', function (value, toMult, toAdd) {
                return value * parseInt(toMult) + parseInt(toAdd);
            });
            Handlebars.registerHelper('Mult', function (value, toAdd) {
                var toa = eval(toAdd);
                return value * toa;
            });
            Handlebars.registerHelper('MultIf', function (value, toAdd) {
                if (value == 0) {
                    return 0;
                }
                else {
                    return toAdd;
                }
            });
            Handlebars.registerHelper('LongDate', function (value) {
                return Enco.Grid.Date(value, SELF.options.defaultLongDateFormat);
            });
            Handlebars.registerHelper('Nullable', function (value) {
                if (value == undefined || value == null) {
                    return "";
                }
                else {
                    return value;
                }
            });
            Handlebars.registerHelper('NullableDate', function (value) {
                if (value == undefined || value == null) {
                    return "";
                }
                else {
                    return Enco.Grid.Date(value, SELF.options.defaultShortDateFormat);
                }
            });
            Handlebars.registerHelper('NullableLongDate', function (value) {
                if (value == undefined || value == null) {
                    return "";
                }
                else {
                    return Enco.Grid.Date(value, SELF.options.defaultLongDateFormat);
                }
            });
            Handlebars.registerHelper("if2", function (v1, operator, v2, options) {
                switch (operator) {
                    case "==":
                        return (v1 == v2) ? options.fn(this) : options.inverse(this);
                    case "!=":
                        return (v1 != v2) ? options.fn(this) : options.inverse(this);
                    case "===":
                        return (v1 === v2) ? options.fn(this) : options.inverse(this);
                    case "!==":
                        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                    case "&&":
                        return (v1 && v2) ? options.fn(this) : options.inverse(this);
                    case "||":
                        return (v1 || v2) ? options.fn(this) : options.inverse(this);
                    case "<":
                        return (v1 < v2) ? options.fn(this) : options.inverse(this);
                    case "<=":
                        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                    case ">":
                        return (v1 > v2) ? options.fn(this) : options.inverse(this);
                    case ">=":
                        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                    case "isNull":
                        return (v1 == null) ? options.fn(this) : options.inverse(this);
                    case "isNotNull":
                        return (v1 != null) ? options.fn(this) : options.inverse(this);
                    default:
                        return eval("" + v1 + operator + v2) ? options.fn(this) : options.inverse(this);
                }
            });
            if (config != undefined) {
                config = this.FillDefaults(config);
            }
            var URL = params.url, URL_DATA = params.data, TEMPLATE = params.templateName, CONTAINER = params.containerName, HEADER = params.headerName, TREE = params.treeName, COLLAPSE = params.collapse, ONCOLLAPSE = params.oncollapse, SUCCESS = params.success, ERROR = params.error, COMPLETE = params.complete;
            $("#" + CONTAINER).html(this.options.loadingMessage);
            $.ajax({
                url: URL,
                data: URL_DATA,
                type: "GET",
                async: true,
                success: function (data) {
                    //
                    SELF.resultData = data;
                    SELF.collapseClick = COLLAPSE;
                    SELF.oncollapse = ONCOLLAPSE;
                    try {
                        SELF.RenderPage(SELF.resultData, TEMPLATE, CONTAINER);
                    }
                    catch (e) { }
                    //
                    try {
                        SUCCESS(data);
                    }
                    catch (e) {
                        try {
                            SUCCESS();
                        }
                        catch (e2) { }
                    }
                },
                error: function () {
                    //
                    $("#" + CONTAINER).html(SELF.options.errorMessage);
                    //
                    try {
                        ERROR();
                    }
                    catch (e) { }
                },
                complete: function () {
                    try {
                        if (COMPLETE) {
                            COMPLETE();
                        }
                    }
                    catch (ex) { }
                }
            });
        };
        TreeView.prototype.RenderPage = function (list, template, container) {
            var me = this, pageHTML = '';
            pageHTML = Enco.TreeView.BindHTML(template, list, 0);
            $("#" + container).html(pageHTML);
            $(".collapseButton").off("click");
            $(".collapseButton").click(function () {
                if (typeof (me.collapseClick) != "undefined") {
                    me.collapseClick(this);
                }
                else {
                    if ($(this).hasClass("opened")) {
                        $.each($(this).parents(".cancollapse").first().find('.opened').get().reverse(), function (index, el) {
                            $(el).parents(".cancollapse").first().find('.documents').first().toggle();
                            $(el).parents(".cancollapse").first().find('.documents').first().children('.fill').children('.cancollapse').toggle();
                            $(el).toggleClass("opened");
                            if (typeof (me.oncollapse) != "undefined") {
                                me.oncollapse(this);
                            }
                        });
                    }
                    else {
                        $(this).parents(".cancollapse").first().find('.documents').first().toggle();
                        $(this).parents(".cancollapse").first().find('.documents').first().children('.fill').children('.cancollapse').toggle();
                        $(this).toggleClass("opened");
                        if (typeof (me.oncollapse) != "undefined") {
                            me.oncollapse(this);
                        }
                    }
                }
            });
        };
        TreeView.BindHTML = function (templateId, obj, level) {
            var source = $("#" + templateId).html(), template = Handlebars.compile(source), pageHTML = '';
            for (var i = 0; i < obj.length; i++) {
                obj[i]['LEVEL'] = level;
                var tmp = template(obj[i]);
                var tmp = "<container>" + tmp + "</container>";
                //var liIndex = tmp.indexOf('</div>') + 6;
                //pageHTML += tmp.substr(0, liIndex) + Enco.TreeView.BindHTML(templateId, obj[i].Children) + tmp.substr(liIndex);
                if (obj[i].Children != undefined) {
                    pageHTML += $(tmp).find("#recursiveContent").html(Enco.TreeView.BindHTML(templateId, obj[i].Children, level + 1)).removeAttr("id").end().html();
                }
                else {
                    pageHTML += $(tmp).html();
                }
            }
            return pageHTML;
        };
        TreeView.prototype.FillDefaults = function (params) {
            if (params.emptyMessage == undefined)
                params.emptyMessage = this.options.emptyMessage;
            if (params.errorMessage == undefined)
                params.errorMessage = this.options.errorMessage;
        };
        return TreeView;
    }());
    Enco.TreeView = TreeView;
})(Enco || (Enco = {}));
//# sourceMappingURL=Tree.js.map