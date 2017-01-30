module INKA {
	export class AJAX {
		static GET(url: string, data: any, success: any, error: any = undefined) {
			INKA.Messages.ProgressOn();
			$.ajax({
				async: true,
				url: url,
				data: data,
				type: "GET",
				success: function (res) {
					INKA.Messages.ProgressOff();
					try {
						success(res);
					}
					catch (e1) {
						try {
							success();
						}
						catch (e2) {
						}
					}
				},
				error: function (err) {
					INKA.Messages.ProgressOff();
					try {
						error(err);
					}
					catch (e3) {
						try {
							error();
						}
						catch (e4) {
						}
					}
				},
			});
		}

        static POST(url: string, data: any, success: any, error: any = undefined, withFileUpload: boolean = false) {
 
			var ajaxSettings = {
				async: true,
                url: url,

				data: data,
				type: "POST",
				success: function (res) {
					INKA.Messages.ProgressOff();
					try {
						success(res);
					}
					catch (e1) {
						try {
							success();
						}
						catch (e2) {
						}
					}
				},
				error: function (err) {
					INKA.Messages.ProgressOff();
					try {
						error(err);
					}
					catch (e3) {
						try {
							error();
						}
						catch (e4) {
						}
					}
				}
			};

			if (withFileUpload) {
				$.extend(ajaxSettings, {
					cache: false,
					contentType: false,
					processData: false
				});
			}

			INKA.Messages.ProgressOn();
			$.ajax(ajaxSettings);
		}

		static SubmitForm(data: any, url: string, success: any, error: any = undefined, withFileUpload: boolean = false) {
			var postData;
			if (typeof (data) === "function") {
				postData = data();
			} else if (typeof (data) === "string") {
				postData = $("#" + data).serializeObject();
			}

			INKA.AJAX.POST(url, postData, success, error, withFileUpload);
		}

		static CreateXHRObjectAndSendData(url: string, method: string, responseType: string, data: any,
			loadEvent: any, errorEvent: any, abortEvent: any) {
			var xhr = new XMLHttpRequest();

			xhr.open(method, url, true);

			xhr.responseType = responseType;

			xhr.addEventListener('load', loadEvent, false);
			xhr.addEventListener('error', errorEvent, false);
			xhr.addEventListener('abort', abortEvent, false);

			var form_data = new FormData();

			for (var key in data) {
				form_data.append(key, data[key]);
			}
             var token = $('[name=__RequestVerificationToken]').val();
             form_data.append("__RequestVerificationToken", token);
   
			xhr.send(form_data);
		}
	}
}