///<reference path="../Scripts/typings/handlebars/handlebars.d.ts" />
///<reference path="../Scripts/typings/custom.d.ts" />

module Enco {
    export enum SortOrder {
        None,
        Ascending,
        Descending
    }

    export enum PagerStyle {
        NonVisible,
        Disabled
    }

    export class DetailSearchObject {
        public Property: string;
        public Value: string;
        public Comparator: string;
    }

    export class Grid {

        private options = {
            pageSize: 10,
            pagerSize: 5,
            serverSide: false,
            hasPager: true,
            deletecontainer: true,
            pagerStyle: PagerStyle.Disabled, // "NonVisible" or "Disabled"
            pagerContentVisible: false,
            emptyMessage: '<span class="no_grid_data">Nincs megjelenítendő adat</span>',
            errorMessage: '<span class="error_grid_data">Hiba történt az adatok lekérése közben</span>',
            loadingMessage: '<span class="loading_grid_data">Adatok betöltése...</span>',
            defaultLongDateFormat: "yyyy.MM.dd HH:mm",
            defaultShortDateFormat: "yyyy.MM.dd"
        };

        public resultData = Object();
        public filteredResultData = Object();
        public pageShowed = 1;
        public maxPages = 1;
        public sortOrder = SortOrder.None;
        public searchPropertiesData = Object();

        public requestParams = Object();
        public requestConfig = Object();

        public outparamX = Object();

        public Load(params: any, config?: any, outparam?: any) {
            var SELF = this;

            try {
                this.outparamX = outparam;
            }
            catch (e) { }


            //Checking requirements
            if (!window.jQuery) {
                console.debug("jQuery is missing");
            }

            try {
                Handlebars;
            } catch (e) {
                console.debug("Handlebars templating is missing");
            }
            //end - Checking requirements

            Handlebars.registerHelper('Date', function (value) {
                return Enco.Grid.Date(value, SELF.options.defaultShortDateFormat);
            });

            Handlebars.registerHelper('Ezres', function (value) {
                var x = value;
                var parts = x.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                return parts.join(".");
            });

            Handlebars.registerHelper('NullableEzres', function (value) {
                if (value == undefined || value == null) {
                    return "";
                }
                else {
                    var x = value;
                    var parts = x.toString().split(".");
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    return parts.join(".");
                }
            });

            Handlebars.registerHelper('DateF', function (value, format = undefined) {
                if (format == undefined) {
                    return Enco.Grid.Date(value);
                }
                else {
                    return Enco.Grid.Date(value, format);
                }
            });

            Handlebars.registerHelper('ShortDate', function (value) {
                return Enco.Grid.Date(value, SELF.options.defaultShortDateFormat);
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

            Handlebars.registerHelper('NullableDateF', function (value, format = undefined) {
                if (value == undefined || value == null) {
                    return "";
                }
                else {
                    if (format == undefined) {
                        return Enco.Grid.Date(value);
                    }
                    else {
                        return Enco.Grid.Date(value, format);
                    }
                }
            });

            Handlebars.registerHelper('NullableShortDate', function (value) {
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

            Handlebars.registerHelper('Selected', function (value, diff) {
                if (diff == value) {
                    return "selected";
                }
                else {
                    return "";
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

            SELF.REQUEST(params, config, null, true);
            //INNEN LETT KISZEDVE

        }

        public REQUEST(params: any, config: any = undefined, searchData: any = null, render: boolean = false) {
            var SELF = this;

            if (config != undefined) {
                config = this.FillDefaults(config);
            }

            SELF.requestParams = params;
            SELF.requestConfig = config;

            var URL = params.url,
                URL_DATA = params.data,
                TEMPLATE = params.templateName,
                CONTAINER = params.containerName,
                HEADER = params.headerName,
                PAGER = params.pagerName,
                GRID = params.gridName,
                PAGERCUSTOMSTYLE = params.pagerCustomStyle,
                METHODTYPE = typeof (params.methodType) === 'undefined' ? "GET" : params.methodType,
                COUNTERNAME = params.counterName,
                PAGESIZE = params.pageSizesContainer,

                SUCCESS = params.success,
                ERROR = params.error,
                COMPLETE = params.complete;

            if (searchData != null) {
                URL_DATA = this.MergeObjects(URL_DATA, searchData);
            }

            $("#" + CONTAINER).html(this.options.loadingMessage);

            $.ajax({
                url: URL,
                data: URL_DATA,
                type: METHODTYPE,
                async: true,
                success: function (result) {
                    //
                    try {
                        SELF.outparamX.Data = result;
                    }
                    catch (e) { }
                    if (result.Data == undefined) {
                        SELF.resultData = result;
                    }
                    else {
                        SELF.resultData = result.Data;
                        $("#" + COUNTERNAME).html(result.Data.length);
                    }

                    SELF.filteredResultData = SELF.resultData;
                    try {
                        $("#" + GRID + " th[data-sortable]").each(function () {
                            $(this).css("cursor", "pointer");
                            $(this).addClass("sortable");

                            if (render) {
                                $(this).click(function () {
                                    var prop = $(this).attr("data-sort-val");
                                    if (SELF.sortOrder == SortOrder.Descending || SELF.sortOrder == SortOrder.None) {
                                        SELF.sortOrder = SortOrder.Ascending;
                                        $(this).removeClass("sortdesc");
                                        $(this).addClass("sortasc");
                                    }
                                    else {
                                        SELF.sortOrder = SortOrder.Descending;
                                        $(this).removeClass("sortasc");
                                        $(this).addClass("sortdesc");
                                    }

                                    SELF.filteredResultData = SELF.Sort(SELF.filteredResultData, prop, SELF.sortOrder);
                                    SELF.RenderPage(TEMPLATE, CONTAINER, SELF.pageShowed, SELF.filteredResultData, PAGERCUSTOMSTYLE, PAGER, render);
                                });
                            }
                        });

                        if (render) {

                            // Újra engedélyezi a kereső mező használatát az oldal betöltése után.
                            var elem = document.getElementById("searchButton");
                            if (elem != null) {
                                (<HTMLInputElement>document.getElementById("searchButton")).disabled = false;
                            }

                            if ($("[data-search-for='" + GRID + "']").length != 0) {
                                var searchDiv = $("[data-search-for='" + GRID + "']");

                                var globalTb = $("[data-search-for='" + GRID + "'] [data-search*='global']");
                                var globalBtn = $("[data-search-for='" + GRID + "'] [data-searchbutton-global]");

                                var detailHidden = $("[data-search-for='" + GRID + "'] [data-search-detail-hidden]");
                                var detailTbs = $("[data-search-for='" + GRID + "'] [data-search*='detail']");
                                var detailBtn = $("[data-search-for='" + GRID + "'] [data-searchbutton-detail]");

                                ///KLIENS OLDALI KERESÉS
                                if (searchDiv.attr("data-search-mode") == "client") {

                                    //Globaláis kereső
                                    //Kézi keresés
                                    if (globalTb.attr("data-search").indexOf("manual") != -1) {
                                        globalBtn.click(function () {
                                            SELF.filteredResultData = SELF.FilterGlobal(SELF.resultData, globalTb.val(), globalTb.attr("data-search-in").split(" "));
                                            SELF.RenderPage(TEMPLATE, CONTAINER, 1, SELF.filteredResultData, PAGERCUSTOMSTYLE, PAGER, render);
                                        });
                                    }
                                    //Automatikus keresés
                                    else {
                                        globalTb.on('input propertychange paste', function () {
                                            SELF.filteredResultData = SELF.FilterGlobal(SELF.resultData, globalTb.val(), globalTb.attr("data-search-in").split(" "));
                                            SELF.RenderPage(TEMPLATE, CONTAINER, 1, SELF.filteredResultData, PAGERCUSTOMSTYLE, PAGER, render);
                                        });
                                    }

                                    //Részletes kereső
                                    //Kézi keresés
                                    if (detailHidden.attr("data-search-detail-hidden") == "manual") {
                                        detailBtn.click(function () {
                                            var objs = Array();
                                            var names = detailTbs.attrs("data-search-in");
                                            for (var i = 0; i < names.length; i++) {
                                                var obbj = new DetailSearchObject();
                                                obbj.Property = names[i];
                                                obbj.Comparator = $("[data-search-in='" + names[i] + "']").attr("data-search-compare");
                                                obbj.Value = $("[data-search-in='" + names[i] + "']").val();
                                                objs.push(obbj);
                                            }

                                            SELF.filteredResultData = SELF.FilterDetail(SELF.resultData, objs);

                                            SELF.RenderPage(TEMPLATE, CONTAINER, 1, SELF.filteredResultData, PAGERCUSTOMSTYLE, PAGER, render);
                                        });
                                    }
                                    //Automatikus keresés bármelyik mezőbe gépeléskor
                                    else {
                                        detailTbs.each(function () {
                                            $(this).on('input propertychange paste', function () {
                                                var objs = Array();
                                                var names = detailTbs.attrs("data-search-in");
                                                for (var i = 0; i < names.length; i++) {
                                                    var obbj = new DetailSearchObject();
                                                    obbj.Property = names[i];
                                                    obbj.Comparator = $("[data-search-in='" + names[i] + "']").attr("data-search-compare");
                                                    obbj.Value = $("[data-search-in='" + names[i] + "']").val();
                                                    objs.push(obbj);
                                                }

                                                SELF.filteredResultData = SELF.FilterDetail(SELF.resultData, objs);

                                                SELF.RenderPage(TEMPLATE, CONTAINER, 1, SELF.filteredResultData, PAGERCUSTOMSTYLE, PAGER, render);
                                            });
                                        });
                                    }
                                }

                                //SZERVER OLDALI KERESŐ
                                else {

                                    //Globaláis kereső
                                    //Kézi keresés
                                    if (globalTb.attr("data-search").indexOf("manual") != -1) {
                                        globalBtn.click(function () {
                                            SELF.searchPropertiesData = Object();
                                            if (globalTb.val() != "") SELF.searchPropertiesData[globalTb.attr("data-server-side-name")] = globalTb.val();
                                            SELF.searchPropertiesData["pageNumber"] = SELF.pageShowed;
                                            SELF.REQUEST(params, config, SELF.searchPropertiesData);
                                        });
                                    }
                                    //Automatikus keresés
                                    else {
                                        globalTb.on('input propertychange paste', function () {
                                            SELF.searchPropertiesData = Object();
                                            if (globalTb.val() != "") SELF.searchPropertiesData[globalTb.attr("data-server-side-name")] = globalTb.val();
                                            SELF.searchPropertiesData["pageNumber"] = SELF.pageShowed;
                                            SELF.REQUEST(params, config, SELF.searchPropertiesData);
                                        });
                                    }

                                    //Részletes kereső
                                    //Kézi keresés
                                    if (detailHidden.attr("data-search-detail-hidden") == "manual") {
                                        detailBtn.click(function () {
                                            SELF.searchPropertiesData = Object();
                                            SELF.searchPropertiesData["pageNumber"] = SELF.pageShowed;
                                            var names = detailTbs.attrs("data-search-in");
                                            for (var i = 0; i < names.length; i++) {
                                                SELF.searchPropertiesData[names[i]] = $("[data-search-in='" + names[i] + "']").val();
                                            }
                                            SELF.REQUEST(params, config, SELF.searchPropertiesData);
                                        });
                                    }
                                    //Automatikus keresés bármelyik mezőbe gépeléskor
                                    else {
                                        detailTbs.each(function () {
                                            $(this).on('input propertychange paste', function () {
                                                SELF.searchPropertiesData = Object();
                                                SELF.searchPropertiesData["pageNumber"] = SELF.pageShowed;
                                                var names = detailTbs.attrs("data-search-in");
                                                for (var i = 0; i < names.length; i++) {
                                                    SELF.searchPropertiesData[names[i]] = $("[data-search-in='" + names[i] + "']").val();
                                                }
                                                SELF.REQUEST(params, config, SELF.searchPropertiesData);
                                            });
                                        });
                                    }
                                }
                            }
                        }

                        SELF.RenderPage(TEMPLATE, CONTAINER, SELF.pageShowed, SELF.resultData, PAGERCUSTOMSTYLE, PAGER, render);

                    }
                    catch (e) { }

                    //
                    try {
                        SUCCESS(result);
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
        }

        static BindHTML(templateId: string, obj: any) {

            Handlebars.registerHelper('Nullable', function (value) {
                if (value == undefined || value == null) {
                    return "";
                }
                else {
                    return value;
                }
            });

            Handlebars.registerHelper('Ezres', function (value) {
                var x = value;
                var parts = x.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                return parts.join(".");
            });

            Handlebars.registerHelper('NullableEzres', function (value) {
                if (value == undefined || value == null) {
                    return "";
                }
                else {
                    var x = value;
                    var parts = x.toString().split(".");
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    return parts.join(".");
                }
            });

            Handlebars.registerHelper('Selected', function (value, diff) {
                if (diff == value) {
                    return "selected";
                }
                else {
                    return "";
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

            var source = $("#" + templateId).html();
            var template = Handlebars.compile(source);
            return template(obj);
        }

        private FillDefaults(params: any) {
            if (params.pageSize == undefined) params.pageSize = this.options.pageSize;
            else this.options.pageSize = params.pageSize;

            if (params.emptyMessage == undefined) params.emptyMessage = this.options.emptyMessage;
            else this.options.emptyMessage = params.emptyMessage;

            if (params.errorMessage == undefined) params.errorMessage = this.options.errorMessage;
            else this.options.errorMessage = params.errorMessage;

            if (params.serverSide == undefined) params.serverSide = this.options.serverSide;
            else this.options.serverSide = params.serverSide;

            if (params.hasPager == undefined) params.hasPager = this.options.hasPager
            else this.options.hasPager = params.hasPager;

            if (params.deletecontainer == undefined) params.deletecontainer = this.options.deletecontainer
            else this.options.deletecontainer = params.deletecontainer;
        }

        private MergeObjects(obj1: any, obj2: any) {
            var objmerge = Object();

            for (var p1 in obj1) {
                objmerge[p1] = obj1[p1];
            }

            for (var p2 in obj2) {
                objmerge[p2] = obj2[p2];
            }

            return objmerge;
        }

        private Sort(list: any, property: string, dir: SortOrder) {

            var ord = "<";
            if (dir == SortOrder.Descending) {
                ord = ">";
            }
            else {
                ord = "<";
            }

            for (var i = 0; i < list.length; i++) {
                for (var j = list.length - 1; j > i; j--) {
                    try {
                        var propp = property + ".toLowerCase()";
                        //console.log("try: " + propp);
                        //console.log(eval("list[" + (j - 1) + "]." + property));
                        if (eval("list[" + (j - 1) + "]." + property + "== null || list[" + (j - 1) + "]." + property + "== undefined")) {
                            var t = list[j];
                            list[j] = list[j - 1];
                            list[j - 1] = t;
                        }
                        else if (eval("list[" + j + "]." + propp + ord + "list[" + (j - 1) + "]." + propp)) {
                            var t = list[j];
                            list[j] = list[j - 1];
                            list[j - 1] = t;
                        }
                    }
                    catch (e) {
                        //console.log("catch: " + property);
                        //console.log("catchx: " + (eval("list[" + j + "]." + property));
                        if (eval("list[" + (j - 1) + "]." + property + "== null")) {
                            var t = list[j];
                            list[j] = list[j - 1];
                            list[j - 1] = t;
                        }
                        else if (eval("list[" + j + "]." + property + ord + "list[" + (j - 1) + "]." + property)) {
                            var t = list[j];
                            list[j] = list[j - 1];
                            list[j - 1] = t;
                        }
                    }
                }
            }
            console.log("done");
            return list;
        }

        private FilterGlobal(list: any, keyword: string, properties: string[]) {
            if (list == undefined || list.length == 0 || keyword == "") {
                return list;
            }
            else {
                return list.filter(function (e) {
                    var passed = false;

                    try {
                        for (var i = 0; i < properties.length; i++) {
                            if (eval("e." + properties[i] + ".toLowerCase()").indexOf(keyword.toLowerCase()) != -1) {
                                passed = passed || true;
                            }
                        }
                    }
                    catch (e) { }

                    return passed;
                });
            }
        }

        private FilterDetail(list: any, searchobjects: DetailSearchObject[]) {


            if (list == undefined || list.length == 0) {
                return list;
            }
            else {
                return list.filter(function (e) {
                    var passed = true;

                    for (var i = 0; i < searchobjects.length; i++) {
                        try {
                            //Ha üres, akkor nem törődünk vele
                            if (searchobjects[i].Value == undefined || searchobjects[i].Value == null || searchobjects[i].Value == "") {
                            }

                            else if (searchobjects[i].Comparator == "d=") {
                                var SELF = this;
                                var ertek = searchobjects[i].Value;
                            }
                            //Contains
                            else if (searchobjects[i].Comparator == "*=") {

                                if (eval("e." + searchobjects[i].Property + ".toLowerCase()").indexOf(searchobjects[i].Value.toLowerCase()) != -1) {
                                    passed = passed && true;
                                }
                                else {
                                    passed = passed && false;
                                }
                            }
                            //Starts with
                            else if (searchobjects[i].Comparator == "^=") {
                                if (eval("e." + searchobjects[i].Property + ".toLowerCase()").indexOf(searchobjects[i].Value.toLowerCase()) == 0) {
                                    passed = passed && true;
                                }
                                else {
                                    passed = passed && false;
                                }
                            }
                            //Ends with
                            else if (searchobjects[i].Comparator == "$=") {
                                var valu = eval("e." + searchobjects[i].Property + ".toLowerCase()");
                                if (valu.indexOf(searchobjects[i].Value.toLowerCase(), valu.length - searchobjects[i].Value.toLowerCase().length) != -1) {
                                    passed = passed && true;
                                }
                                else {
                                    passed = passed && false;
                                }
                            }
                            else {
                                if (eval("e." + searchobjects[i].Property + ".toLowerCase()" + " " + searchobjects[i].Comparator + " '" + searchobjects[i].Value + ".toLowerCase()" + "'")) {
                                    passed = passed && true;
                                }
                                else {
                                    passed = passed && false;
                                }
                            }

                        }
                        catch (e) { }
                    }
                    return passed;
                });
            }
        }

        private RenderPager(list: any, pagerstyle: string, pagerid: string, page: number, template: string, container: string, render: boolean) {
            var SELF = this;

            if (!SELF.options.hasPager) {
                return;
            }

            SELF.maxPages = Math.ceil(list.length / SELF.options.pageSize);

            var pageHTML = '';

            if (SELF.maxPages > 1) {

                pageHTML += '<ul class="pager">';
                if (SELF.options.pagerContentVisible) {
                    pageHTML += '<li class="firstButton pagerButton firstButton' + pagerstyle + '"><<</li>';
                    pageHTML += '<li class="prewButton pagerButton prewButton' + pagerstyle + '"><</li>';
                }
                else {
                    pageHTML += '<li class="firstButton pagerButton firstButton' + pagerstyle + '"></li>';
                    pageHTML += '<li class="prewButton pagerButton prewButton' + pagerstyle + '"></li>';
                }

                var pgParatlan = SELF.options.pagerSize % 2 != 0 ? SELF.options.pagerSize : SELF.options.pagerSize + 1;
                var pgSiz = (pgParatlan - 1) / 2;

                if (pgParatlan < SELF.maxPages) {

                    var pageMinus2 = page - pgSiz < 1 ? 1 : page - pgSiz;
                    var pagePlus2 = page + pgSiz > SELF.maxPages ? SELF.maxPages : page + pgSiz;

                    //if (SELF.maxPages - page < pgSiz + 1) {
                    //	pageMinus2 = page - (pgParatlan - (SELF.maxPages - page));
                    //}

                    //if (page - pgSiz < pgSiz + 1) {
                    //	pagePlus2 = page + (pgParatlan - (page + pgSiz - 1));
                    //}

                    if (pageMinus2 != 1) {
                        pageHTML += ' ... ';
                    }

                    for (var i = pageMinus2; i <= pagePlus2; i++) {
                        pageHTML += '<li class="innerButton pagerButton innerButton' + pagerstyle + '" data-page="' + i + '">' + i + '</li>';
                    }

                    if (pagePlus2 != SELF.maxPages) {
                        pageHTML += ' ... ';
                    }
                }
                else {
                    for (var i = 1; i <= SELF.maxPages; i++) {
                        pageHTML += '<li class="innerButton pagerButton innerButton' + pagerstyle + '" data-page="' + i + '">' + i + '</li>';
                    }
                }

                if (SELF.options.pagerContentVisible) {
                    pageHTML += '<li class="nextButton pagerButton nextButton' + pagerstyle + '">></li>';
                    pageHTML += '<li class="lastButton pagerButton lastButton' + pagerstyle + '">>></li>';
                }
                else {
                    pageHTML += '<li class="nextButton pagerButton nextButton' + pagerstyle + '"></li>';
                    pageHTML += '<li class="lastButton pagerButton lastButton' + pagerstyle + '"></li>';
                }


                $("#" + pagerid).html(pageHTML);

                $(".firstButton").click(function () {
                    SELF.pageShowed = 1;
                    if (SELF.options.serverSide) {
                        SELF.searchPropertiesData["pageNumber"] = SELF.pageShowed;
                        SELF.REQUEST(SELF.requestParams, SELF.requestConfig, SELF.searchPropertiesData);
                    }
                    else {
                        SELF.RenderPage(template, container, SELF.pageShowed, SELF.filteredResultData, pagerstyle, pagerid, false);
                    }
                });

                $(".prewButton").click(function () {
                    SELF.pageShowed = SELF.pageShowed > 1 ? SELF.pageShowed - 1 : 1;
                    if (SELF.options.serverSide) {
                        SELF.searchPropertiesData["pageNumber"] = SELF.pageShowed;
                        SELF.REQUEST(SELF.requestParams, SELF.requestConfig, SELF.searchPropertiesData);
                    }
                    else {
                        SELF.RenderPage(template, container, SELF.pageShowed, SELF.filteredResultData, pagerstyle, pagerid, false);
                    }
                });

                $(".nextButton").click(function () {
                    SELF.pageShowed = SELF.pageShowed < SELF.maxPages ? SELF.pageShowed + 1 : SELF.maxPages;
                    if (SELF.options.serverSide) {
                        SELF.searchPropertiesData["pageNumber"] = SELF.pageShowed;
                        SELF.REQUEST(SELF.requestParams, SELF.requestConfig, SELF.searchPropertiesData);
                    }
                    else {
                        SELF.RenderPage(template, container, SELF.pageShowed, SELF.filteredResultData, pagerstyle, pagerid, false);
                    }
                });

                $(".lastButton").click(function () {
                    SELF.pageShowed = SELF.maxPages;
                    if (SELF.options.serverSide) {
                        SELF.searchPropertiesData["pageNumber"] = SELF.pageShowed;
                        SELF.REQUEST(SELF.requestParams, SELF.requestConfig, SELF.searchPropertiesData);
                    }
                    else {
                        SELF.RenderPage(template, container, SELF.pageShowed, SELF.filteredResultData, pagerstyle, pagerid, false);
                    }
                });

                $(".innerButton").each(function () {
                    $(this).click(function () {
                        SELF.pageShowed = parseInt($(this).attr("data-page"));
                        if (SELF.options.serverSide) {
                            SELF.searchPropertiesData["pageNumber"] = SELF.pageShowed;
                            SELF.REQUEST(SELF.requestParams, SELF.requestConfig, SELF.searchPropertiesData);
                        }
                        else {
                            SELF.RenderPage(template, container, SELF.pageShowed, SELF.filteredResultData, pagerstyle, pagerid, false);
                        }
                    });
                });
            }
            else {
                $("#" + pagerid).html(pageHTML);
            }
        }

        private GetPage(list: any, page: number, pagercuststyle: string) {

            if (!this.options.hasPager) {
                return list;
            }

            if (page == 1) {
                if (this.options.pagerStyle == PagerStyle.NonVisible) {
                    $(".prewButton").hide();
                    $(".firstButton").hide();
                }
                else if (this.options.pagerStyle == PagerStyle.Disabled) {
                    $(".prewButton").addClass("disabledPager");
                    $(".firstButton").addClass("disabledPager");
                }
            }
            else {
                if (this.options.pagerStyle == PagerStyle.NonVisible) {
                    $(".prewButton").show();
                    $(".firstButton").show();
                }
                else if (this.options.pagerStyle == PagerStyle.Disabled) {
                    $(".prewButton").removeClass("disabledPager");
                    $(".firstButton").removeClass("disabledPager");
                }
            }

            if (this.maxPages == page) {
                if (this.options.pagerStyle == PagerStyle.NonVisible) {
                    $(".nextButton").hide();
                    $(".lastButton").hide();
                }
                else if (this.options.pagerStyle == PagerStyle.Disabled) {
                    $(".nextButton").addClass("disabledPager");
                    $(".lastButton").addClass("disabledPager");
                }
            }
            else {
                if (this.options.pagerStyle == PagerStyle.NonVisible) {
                    $(".nextButton").show();
                    $(".lastButton").show();
                }
                else if (this.options.pagerStyle == PagerStyle.Disabled) {
                    $(".nextButton").removeClass("disabledPager");
                    $(".lastButton").removeClass("disabledPager");
                }
            }

            $("[data-page]").removeClass("actualPager actualPager" + pagercuststyle);
            $("[data-page]").removeClass("actualPager actualPager" + pagercuststyle);
            $("[data-page='" + page + "']").addClass("actualPager actualPager" + pagercuststyle);
            $("[data-page='" + page + "']").addClass("actualPager actualPager" + pagercuststyle);

            return this.SkipTake(list, (page - 1) * this.options.pageSize, this.options.pageSize);
        }

        private SkipTake(list: any, skip: number, take: number) {
            return list.slice(skip, skip + take);
        }

        private RenderPage(templ: string, container: string, page: number, data: any, pagercustomstyle: string, pagerid: string, render: boolean) {
            this.RenderPager(data, pagercustomstyle, pagerid, page, templ, container, render);
            if ((data == undefined || data.length == 0) && this.options.deletecontainer) {
                $("#" + container).html(this.options.emptyMessage);
            }
            else {
                var pagedData = Array();
                try {
                    pagedData = this.GetPage(data, page, pagercustomstyle);
                }
                catch (e) {
                    pagedData = data;
                }
                var source = $("#" + templ).html();
                var template = Handlebars.compile(source);
                $("#" + container).html(template(pagedData));
            }
        }

        public static Date(date: string, format: string = "yyyy. MM. dd") {

            var d: Date;
            d = eval("new " + date.replace(/\//g, ""));

            var o = {
                "M+": d.getMonth() + 1, //month
                "d+": d.getDate(),    //day
                "H+": d.getHours(),   //hour
                "m+": d.getMinutes(), //minute
                "s+": d.getSeconds(), //second
                "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
                "S": d.getMilliseconds() //millisecond
            }

            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        }
    }
}
