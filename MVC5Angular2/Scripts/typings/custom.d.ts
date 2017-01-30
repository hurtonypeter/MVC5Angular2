interface Window {
    jQuery: Window;
}

interface JQuery {
    movingTextarea(params?: any): any;
    serializeObject(): Object;
    attrs(att: string): Array<string>;
    datetimepicker(options: any): any;
    number(number: any, decmial: any, decSep: string, thouSep: string): any;
}

declare class tinymce {
	static init: any;
}


declare var DEBUG: any;

declare var PopupReady: any;
declare var TabReady: any;
declare var StepReady: any;
declare var SplitLeftReady: any;
declare var SplitRightReady: any;

declare function saveAs(blob: any, name: string): any;
declare function moment(date: string, format: string): any;
