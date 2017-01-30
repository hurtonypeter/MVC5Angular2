module INKA {
	export class Sablon {

		static Validate(formId: string, success: any) {
			var url = '/Common/SablonKezeles/Validate';
			INKA.AJAX.SubmitForm(formId, url, function (res) {
				if (res.Success) {
					INKA.Messages.Validation({});
					try {
						success(res);
					}
					catch (e) {
						success();
					}
				}
				else {
					INKA.Messages.Prompt("Beviteli mező ellenőrzés",
						INKA.Messages.Validation(res.Data) + "<br><br><strong>Szeretné folytatni?</strong>", function () {
							try {
								success(res);
							}
							catch (e) {
								success();
							}
						});
				}
			});
		}

		static Kitoltes(formId: string, isTest: boolean, success: any) {
			var url = '/Common/SablonKezeles/Kitoltes';
			if (isTest) {
				url += 'Teszt';
			}
			INKA.AJAX.SubmitForm(formId, url, function (res) {
				if (res.Success) {
					try {
						success(res);
					}
					catch (e) {
						success();
					}
				}
				else {
					INKA.Messages.Alert("Hibaüzenet", res.Message);
				}
			});
		}

		static Letoltes(sablonVerzioId: string, reszvetelId: string, fajlnev: string, isTest: boolean) {
			var url = '/Common/SablonKezeles/Letoltes';

			if (fajlnev == "") {
				fajlnev = "Doksi_" + Date.now().toString() + ".docx";
			}
			if (fajlnev.indexOf(".docx") == -1) {
				fajlnev += ".docx";
			}

            INKA.AJAX.CreateXHRObjectAndSendData(url, "GET", "arraybuffer", { SablonVerzioId: sablonVerzioId, reszvetelId: reszvetelId, isTest: isTest },
				function () {
					//load
					if (this.status === 200 && this.readyState === 4) {
						if (this.response.byteLength > 0) {
							var blob = new Blob([this.response], { type: 'application/octet-stream' });
							INKA.Messages.ProgressOff();
							saveAs(blob, fajlnev);
						} else {
							INKA.Messages.Alert("Hibaüzenet", "A kért dokumentum nem található!");
							INKA.Messages.ProgressOff();
						}
					} else {
						INKA.Messages.Alert("Hibaüzenet", this.statusText);
					}
				}, function () {
					//error
					INKA.Messages.Alert("Hibaüzenet", this.statusText);
				}, function () {
					//abort
					INKA.Messages.Alert("Hibaüzenet", "A művelet megszakadt, próbálja újra!");
				});


			return false;
		}

		static CsakLetoltes(url: string, fajlnev: string) {

			if (fajlnev == "") {
				fajlnev = "Doksi_" + Date.now().toString() + ".docx";
			}
			if (fajlnev.indexOf(".docx") == -1) {
				fajlnev += ".docx";
			}

			INKA.Messages.ProgressOn();
			INKA.AJAX.CreateXHRObjectAndSendData(url, "GET", "arraybuffer", {  },
				function () {
					//load
					if (this.status === 200 && this.readyState === 4) {
						if (this.response.byteLength > 0) {
							var blob = new Blob([this.response], { type: 'application/octet-stream' });
							INKA.Messages.ProgressOff();
							saveAs(blob, fajlnev);
						} else {
							INKA.Messages.Alert("Hibaüzenet", "A kért dokumentum nem található!");
							INKA.Messages.ProgressOff();
						}
					} else {
						INKA.Messages.Alert("Hibaüzenet", this.statusText);
						INKA.Messages.ProgressOff();
					}
				}, function () {
					//error
					INKA.Messages.Alert("Hibaüzenet", this.statusText);
					INKA.Messages.ProgressOff();
				}, function () {
					//abort
					INKA.Messages.Alert("Hibaüzenet", "A művelet megszakadt, próbálja újra!");
					INKA.Messages.ProgressOff();
				});


			return false;
		}
	}

	export class SablonExtra {

		static Validate(formId: any, url: string, success: any) {
			INKA.AJAX.SubmitForm(formId, url, function (res) {
				if (res.Success) {
					INKA.Messages.Validation({});
					try {
						success(res);
					}
					catch (e) {
						success();
					}
				}
				else {
					INKA.Messages.Prompt("Beviteli mező ellenőrzés",
						INKA.Messages.Validation(res.Data) + "<br><br><strong>Szeretné folytatni?</strong>", function () {
							try {
								success(res);
							}
							catch (e) {
								success();
							}
						});
				}
			});
		}

		static Kitoltes(formId: string, url: string, success: any) {
			INKA.AJAX.SubmitForm(formId, url, function (res) {
				if (res.Success) {
					try {
						success(res);
					}
					catch (e) {
						success();
					}
				}
				else {
					INKA.Messages.Alert("Hibaüzenet", res.Message);
				}
			});
		}

		static Letoltes(sablonVerzioId: string, reszvetelId: string, fajlnev: string, isTest: boolean) {
			var url = '/Common/SablonKezeles/Letoltes';

			if (fajlnev == "") {
				fajlnev = "Doksi_" + Date.now().toString() + ".docx";
			}
			if (fajlnev.indexOf(".docx") == -1) {
				fajlnev += ".docx";
			}

			INKA.AJAX.CreateXHRObjectAndSendData(url, "GET", "arraybuffer", { SablonVerzioId: sablonVerzioId, reszvetelId: reszvetelId, isTest: isTest },
				function () {
					//load
					if (this.status === 200 && this.readyState === 4) {
						if (this.response.byteLength > 0) {
							var blob = new Blob([this.response], { type: 'application/octet-stream' });
							INKA.Messages.ProgressOff();
							saveAs(blob, fajlnev);
						} else {
							INKA.Messages.Alert("Hibaüzenet", "A kért dokumentum nem található!");
							INKA.Messages.ProgressOff();
						}
					} else {
						INKA.Messages.Alert("Hibaüzenet", this.statusText);
					}
				}, function () {
					//error
					INKA.Messages.Alert("Hibaüzenet", this.statusText);
				}, function () {
					//abort
					INKA.Messages.Alert("Hibaüzenet", "A művelet megszakadt, próbálja újra!");
				});


			return false;
		}


	}
} 