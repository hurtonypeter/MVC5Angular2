module INKA {
	export class AlertParams {
		public Title: string;
		public Message: string;
	}

	export class PromptParams extends AlertParams {
		public Yes: any;
		public No: any;
	}

	export class CustomButton {
		public Text: string;
		public Class: string;
		public Id: string;
		public Onclick: any;
    }

    export class ResponseViewModel {
        public Success: boolean;
        public ValidationError: boolean;
        public ConcurrencyError: boolean;
        public Message: string;
        public Data: any;
        public Hibakod: string;
    }
}