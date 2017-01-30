var Enco;
(function (Enco) {
    var NaptarSzint;
    (function (NaptarSzint) {
        NaptarSzint[NaptarSzint["Napi"] = 4] = "Napi";
        NaptarSzint[NaptarSzint["HaromNapi"] = 3] = "HaromNapi";
        NaptarSzint[NaptarSzint["Heti"] = 2] = "Heti";
        NaptarSzint[NaptarSzint["KetHeti"] = 1] = "KetHeti";
        NaptarSzint[NaptarSzint["Havi"] = 0] = "Havi";
    })(NaptarSzint = Enco.NaptarSzint || (Enco.NaptarSzint = {}));
    var JsonToTypedObject = (function () {
        function JsonToTypedObject() {
        }
        //AZ IEquality miatt kell, mert az nem jön át JSON-ben
        JsonToTypedObject.ToNaptarElem = function (obj) {
            var ne = new NaptarElem(new Date(), obj.Tulajdonos, obj.Leiras, obj.IsOraPerces);
            ne.Datum = obj.Datum;
            return ne;
        };
        JsonToTypedObject.ToNaptarFejlecElem = function (obj) {
            var nfe = new NaptarFejlecElem();
            nfe.Also = obj.Also;
            nfe.Felso = obj.Felso;
            nfe.OriginalDates = new List();
            for (var i = 0, item; item = obj.OriginalDates[i]; i++) {
                var d = new Datum(new Date());
                d.Year = item.Year;
                d.Month = item.Month;
                d.Day = item.Day;
                d.Hour = item.Hour;
                d.Minute = item.Minute;
                nfe.OriginalDates.Add(d);
            }
            return nfe;
        };
        JsonToTypedObject.ToNaptarElemList = function (objarr) {
            var nel = new List();
            for (var i = 0, item; item = objarr[i]; i++) {
                nel.Add(JsonToTypedObject.ToNaptarElem(item));
            }
            return nel;
        };
        return JsonToTypedObject;
    }());
    Enco.JsonToTypedObject = JsonToTypedObject;
    var EncoObject = (function () {
        function EncoObject() {
        }
        EncoObject.prototype.Equals = function (o) {
            return JSON.stringify(this) == JSON.stringify(o);
        };
        return EncoObject;
    }());
    Enco.EncoObject = EncoObject;
    var Tuple = (function () {
        function Tuple(item1, item2) {
            this.Item1 = item1;
            this.Item2 = item2;
        }
        return Tuple;
    }());
    Enco.Tuple = Tuple;
    var List = (function () {
        function List() {
            this.inner = Array();
        }
        List.prototype.FromArray = function (items) {
            this.inner = items;
            this.Count = this.inner.length;
        };
        List.prototype.Add = function (item) {
            this.inner.push(item);
            this.Count = this.inner.length;
        };
        List.prototype.ElementAt = function (index) {
            return this.inner[index];
        };
        List.prototype.IndexOf = function (item) {
            for (var i = 0; i < this.inner.length; i++) {
                if (this.inner[i].Equals(item)) {
                    return i;
                }
            }
            return -1;
        };
        List.prototype.ToArray = function () {
            return this.inner;
        };
        List.prototype.RemoveAt = function (index) {
            this.inner.splice(index, 1);
            this.Count = this.inner.length;
        };
        List.prototype.Contains = function (item) {
            var isin = false;
            for (var i = 0; i < this.inner.length; i++) {
                if (this.inner[i].Equals(item)) {
                    return true;
                }
            }
            return isin;
        };
        return List;
    }());
    Enco.List = List;
    var Dictionary = (function () {
        function Dictionary() {
            this.inner = Object();
        }
        Dictionary.prototype.AddOrSet = function (key, value) {
            this.inner[JSON.stringify(key)] = value;
        };
        Dictionary.prototype.Get = function (key) {
            return this.inner[JSON.stringify(key)];
        };
        Dictionary.prototype.GetStringKey = function (key) {
            return this.inner[key];
        };
        Dictionary.prototype.GetAll = function () {
            return this.inner;
        };
        return Dictionary;
    }());
    Enco.Dictionary = Dictionary;
    var Datum = (function () {
        function Datum(d) {
            this.Year = d.getFullYear();
            this.Month = d.getMonth() + 1;
            this.Day = d.getDate();
            this.Hour = d.getHours();
            this.Minute = d.getMinutes();
        }
        Datum.prototype.twoDigit = function (num) {
            return ("0" + num).slice(-2);
        };
        Datum.prototype.Equals = function (o) {
            return (this.Year == o.Year && this.Month == o.Month && this.Day == o.Day);
        };
        Datum.prototype.toString = function () {
            if (this.twoDigit(this.Hour) == "00" && this.twoDigit(this.Minute) == "00") {
                return this.Year + ". " + this.twoDigit(this.Month) + ". " + this.twoDigit(this.Day) + ". ";
            }
            else {
                return this.Year + ". " + this.twoDigit(this.Month) + ". " + this.twoDigit(this.Day) + ". "
                    + this.twoDigit(this.Hour) + ":" + this.twoDigit(this.Minute);
            }
        };
        return Datum;
    }());
    Enco.Datum = Datum;
    var NaptarFejlecElem = (function () {
        function NaptarFejlecElem() {
        }
        return NaptarFejlecElem;
    }());
    Enco.NaptarFejlecElem = NaptarFejlecElem;
    var NaptarFejlecElemJson = (function () {
        function NaptarFejlecElemJson() {
        }
        return NaptarFejlecElemJson;
    }());
    Enco.NaptarFejlecElemJson = NaptarFejlecElemJson;
    var NaptarElem = (function () {
        function NaptarElem(datum, tulajdonos, leiras, isoraperces) {
            this.Datum = new Datum(datum).toString();
            this.Tulajdonos = tulajdonos;
            this.Leiras = leiras;
            this.IsOraPerces = isoraperces;
        }
        NaptarElem.prototype.Equals = function (o) {
            return this.Leiras.indexOf(o.Leiras) != -1 || o.Leiras.indexOf(this.Leiras) != -1;
        };
        return NaptarElem;
    }());
    Enco.NaptarElem = NaptarElem;
    var NaptarSor = (function () {
        function NaptarSor() {
        }
        return NaptarSor;
    }());
    Enco.NaptarSor = NaptarSor;
    var AktualisEsemenyElemJson = (function () {
        function AktualisEsemenyElemJson() {
        }
        return AktualisEsemenyElemJson;
    }());
    Enco.AktualisEsemenyElemJson = AktualisEsemenyElemJson;
    var AktualisEsemenyJson = (function () {
        function AktualisEsemenyJson() {
        }
        return AktualisEsemenyJson;
    }());
    Enco.AktualisEsemenyJson = AktualisEsemenyJson;
    var NaptarGenerator = (function () {
        function NaptarGenerator() {
        }
        NaptarGenerator.GetCorrespondingFejlec = function (d, fejlecek) {
            for (var i = 0, item; item = fejlecek[i]; i++) {
                if (item.OriginalDates.Contains(d)) {
                    return item;
                }
            }
            return null;
        };
        return NaptarGenerator;
    }());
    Enco.NaptarGenerator = NaptarGenerator;
    var Calendar = (function () {
        function Calendar(elemek, fromm) {
            if (fromm === void 0) { fromm = null; }
            this.fejlecek = Array();
            //alert(elemek);
            if (elemek == null || elemek == undefined)
                return;
            this.ZoomSzint = elemek.ZoomSzint;
            this.EsemenyNeve = elemek.EsemenyNeve;
            try {
                var fromTime = fromm == null ? new Date() : fromm;
                var toTime = new Date();
                this.AktualisEsemeny = new Tuple(this.EsemenyNeve, null);
                this.AktualisEsemeny.Item2 = new Dictionary();
                for (var i = 0, item; item = elemek.Esemenyek[i]; i++) {
                    var list = JsonToTypedObject.ToNaptarElemList(item.Elemek);
                    var flec = JsonToTypedObject.ToNaptarFejlecElem(item.Fejlec);
                    this.AktualisEsemeny.Item2.AddOrSet(flec, list);
                    this.fejlecek.push(flec);
                }
            }
            catch (e) {
            }
        }
        Calendar.prototype.AddOrModify = function (datum, elem) {
            var d = new Datum(datum);
            var fejl = NaptarGenerator.GetCorrespondingFejlec(d, this.fejlecek);
            for (var p in this.AktualisEsemeny.Item2.GetAll()) {
                var idx = this.AktualisEsemeny.Item2.GetStringKey(p).IndexOf(elem);
                if (idx != -1) {
                    this.AktualisEsemeny.Item2.GetStringKey(p).RemoveAt(idx);
                }
            }
            try {
                var idx = this.AktualisEsemeny.Item2.Get(fejl).IndexOf(elem);
                if (idx == -1) {
                    this.AktualisEsemeny.Item2.Get(fejl).Add(elem);
                }
                else {
                    this.AktualisEsemeny.Item2.Get(fejl).RemoveAt(idx);
                    this.AktualisEsemeny.Item2.Get(fejl).Add(elem);
                }
            }
            catch (e) {
            }
        };
        return Calendar;
    }());
    Enco.Calendar = Calendar;
})(Enco || (Enco = {}));
//# sourceMappingURL=Calendar.js.map