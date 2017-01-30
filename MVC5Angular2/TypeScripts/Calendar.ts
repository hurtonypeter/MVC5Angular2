module Enco {

	export enum NaptarSzint {
		Napi = 4,
		HaromNapi = 3,
		Heti = 2,
		KetHeti = 1,
		Havi = 0
	}

	export interface IEquality {
		Equals(o: any): boolean;
	}

	export class JsonToTypedObject {

		//AZ IEquality miatt kell, mert az nem jön át JSON-ben
		public static ToNaptarElem(obj: NaptarElem): NaptarElem {
			var ne: NaptarElem = new NaptarElem(new Date(), obj.Tulajdonos, obj.Leiras, obj.IsOraPerces);
			ne.Datum = obj.Datum;
			return ne;
		}

		public static ToNaptarFejlecElem(obj: NaptarFejlecElemJson): NaptarFejlecElem {
			var nfe: NaptarFejlecElem = new NaptarFejlecElem();
			nfe.Also = obj.Also;
			nfe.Felso = obj.Felso;
			nfe.OriginalDates = new List<Datum>();
			for (var i = 0, item: Datum; item = obj.OriginalDates[i]; i++) {
				var d: Datum = new Datum(new Date());
				d.Year = item.Year;
				d.Month = item.Month;
				d.Day = item.Day;
				d.Hour = item.Hour;
				d.Minute = item.Minute;
				nfe.OriginalDates.Add(d);
			}

			return nfe;
		}

		public static ToNaptarElemList(objarr: NaptarElem[]): List<NaptarElem> {
			var nel: List<NaptarElem> = new List<NaptarElem>();

			for (var i = 0, item: NaptarElem; item = objarr[i]; i++) {
				nel.Add(JsonToTypedObject.ToNaptarElem(item));
			}

			return nel;
		}
	}

	export class EncoObject implements IEquality {
		public Equals(o: any): boolean {
			return JSON.stringify(this) == JSON.stringify(o);
		}
	}

	export class Tuple<T1, T2>{
		public Item1: T1;
		public Item2: T2;

		public constructor(item1: T1, item2: T2) {
			this.Item1 = item1;
			this.Item2 = item2;
		}
	}

	export class List<T extends IEquality>{
		private inner: T[] = Array();

		public Count: number;

		public FromArray(items: T[]) {
			this.inner = items;
			this.Count = this.inner.length;
		}

		public Add(item: T) {
			this.inner.push(item);
			this.Count = this.inner.length;
		}

		public ElementAt(index: number): T {
			return this.inner[index];
		}

		public IndexOf(item: T): number {
			for (var i = 0; i < this.inner.length; i++) {
				if (this.inner[i].Equals(item)) {
					return i;
				}
			}

			return -1;
		}

		public ToArray(): T[] {
			return this.inner;
		}

		public RemoveAt(index: number) {
			this.inner.splice(index, 1);
			this.Count = this.inner.length;
		}

		public Contains(item: T): boolean {
			var isin: boolean = false;

			for (var i = 0; i < this.inner.length; i++) {
				if (this.inner[i].Equals(item)) {
					return true;
				}
			}

			return isin;
		}
	}

	export class Dictionary<Tkey, Tval>{
		private inner: any;

		public constructor() {
			this.inner = Object();
		}

		public AddOrSet(key: Tkey, value: Tval) {
			this.inner[JSON.stringify(key)] = value;
		}

		public Get(key: Tkey): Tval {
			return this.inner[JSON.stringify(key)];
		}

		public GetStringKey(key: string): Tval {
			return this.inner[key];
		}

		public GetAll() {
			return this.inner;
		}

	}

	export class Datum implements IEquality {
		public Year: number;
		public Month: number;
		public Day: number;
		public Hour: number;
		public Minute: number;

		public constructor(d: Date) {
			this.Year = d.getFullYear();
			this.Month = d.getMonth() + 1;
			this.Day = d.getDate();
			this.Hour = d.getHours();
			this.Minute = d.getMinutes();
		}

		private twoDigit(num: number): string {
			return ("0" + num).slice(-2);
		}

		public Equals(o: Datum): boolean {
			return (this.Year == o.Year && this.Month == o.Month && this.Day == o.Day);
		}

        public toString(): string {
            if (this.twoDigit(this.Hour) == "00" && this.twoDigit(this.Minute) == "00") {
                return this.Year + ". " + this.twoDigit(this.Month) + ". " + this.twoDigit(this.Day) + ". ";
            } else {
                return this.Year + ". " + this.twoDigit(this.Month) + ". " + this.twoDigit(this.Day) + ". "
                    + this.twoDigit(this.Hour) + ":" + this.twoDigit(this.Minute);
            }
        }
    }

	export class NaptarFejlecElem {
		public Felso: string;
		public Also: string;
		public OriginalDates: List<Datum>;
	}

	export class NaptarFejlecElemJson {
		public Felso: string;
		public Also: string;
		public OriginalDates: Datum[];

	}

	export class NaptarElem implements IEquality {
		public Datum: string;
		public Tulajdonos: string;
        public Leiras: string;
        public IsOraPerces: boolean;

        public constructor(datum: Date, tulajdonos: string, leiras: string, isoraperces: boolean) {
            this.Datum = new Datum(datum).toString();
			this.Tulajdonos = tulajdonos;
            this.Leiras = leiras;
            this.IsOraPerces = isoraperces;
		}

		public Equals(o: NaptarElem): boolean {
			return this.Leiras.indexOf(o.Leiras) != -1 || o.Leiras.indexOf(this.Leiras) != -1;
		}
	}

	export class NaptarSor {
		public SorFelirat: string;
		public Esemenyek: Tuple<Date, NaptarElem>;
	}

	export class AktualisEsemenyElemJson {
		public Fejlec: NaptarFejlecElemJson;
		public Elemek: NaptarElem[];
	}
	export class AktualisEsemenyJson {
		public EsemenyNeve: string;
		public ZoomSzint: NaptarSzint;
		public Esemenyek: AktualisEsemenyElemJson[];
	}

	export class NaptarGenerator {
		public static GetCorrespondingFejlec(d: Datum, fejlecek: NaptarFejlecElem[]): NaptarFejlecElem {
			for (var i = 0, item; item = fejlecek[i]; i++) {
				if (item.OriginalDates.Contains(d)) {
					return item;
				}
			}

			return null;
		}


	}

	export class Calendar {
		public EsemenyNeve: string;
		public ZoomSzint: NaptarSzint;

		public AktualisEsemeny: Tuple<string, Dictionary<NaptarFejlecElem, List<NaptarElem>>>;

		private fejlecek: NaptarFejlecElem[] = Array();

		public constructor(elemek: AktualisEsemenyJson, fromm: Date = null) {

			//alert(elemek);
			if (elemek == null || elemek == undefined) return;

			this.ZoomSzint = elemek.ZoomSzint;
			this.EsemenyNeve = elemek.EsemenyNeve;
			try {
				var fromTime: Date = fromm == null ? new Date() : fromm;
				var toTime: Date = new Date();

				this.AktualisEsemeny = new Tuple<string, Dictionary<NaptarFejlecElem, List<NaptarElem>>>(this.EsemenyNeve, null);
				this.AktualisEsemeny.Item2 = new Dictionary<NaptarFejlecElem, List<NaptarElem>>();


				for (var i = 0, item: AktualisEsemenyElemJson; item = elemek.Esemenyek[i]; i++) {
					var list = JsonToTypedObject.ToNaptarElemList(item.Elemek);
					var flec = JsonToTypedObject.ToNaptarFejlecElem(item.Fejlec);
					this.AktualisEsemeny.Item2.AddOrSet(flec, list);
					this.fejlecek.push(flec);
				}
			}
			catch (e) {
				//alert(e);
			}
		}

		public AddOrModify(datum: Date, elem: NaptarElem) {
            var d: Datum = new Datum(datum);
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
		}

	}
} 