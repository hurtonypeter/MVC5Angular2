module INKA{
    export class Helpers {
        static GenerateGuid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

		static LoadMyTemplate(templateId: string): string {
			var elements = $("#" + templateId).children();
			INKA.Helpers.UnTemplatizeNames(elements);

			var htm = $("#" + templateId).html();

			INKA.Helpers.TemplatizeNames(elements);

			return htm;
		}

		static TemplatizeNames(elements: any) {
			for (var i = 0; i < elements.length; i++) {
				if ($(elements[i]).attr("id") != undefined) {
					$(elements[i]).attr("id", "t-" + $(elements[i]).attr("id"));
				}

				INKA.Helpers.TemplatizeNames($(elements[i]).children());
			}
		}

		static UnTemplatizeNames(elements: any) {
			for (var i = 0; i < elements.length; i++) {
				if ($(elements[i]).attr("id") != undefined) {
					$(elements[i]).attr("id", $(elements[i]).attr("id").replace("t-", ""));
				}

				INKA.Helpers.UnTemplatizeNames($(elements[i]).children());
			}
		}

		static LoadSearchSection() {
			$("#SearchSection").html($("#toSearchSection").html());
			$("#toSearchSection").remove();
		}

		static ToggleDetailSearchBox(elementid: string) {
			if ($("#" + elementid).css("display") == "none") {
				$("#" + elementid).show();
			}
			else {
				$("#" + elementid).hide();
			}
        }
    
	}
} 