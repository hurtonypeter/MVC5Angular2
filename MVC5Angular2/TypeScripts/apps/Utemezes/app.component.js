"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.name = 'Angular';
        this.valamik = {};
        console.log("ctor");
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log("iniiit");
    };
    AppComponent.prototype.onclick = function () {
        INKA.Messages.Prompt("hiba", "h�lyevagy, mit kattintgatsz?", null);
        this.valamik = this.http.get('sdf')
            .toPromise()
            .then(function (resp) { return resp.json().data; })
            .catch(function (error) {
            return Promise.reject(error.message || error);
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: '/TypeScripts/apps/Utemezes/app.component.html',
        styleUrls: ['/TypeScripts/apps/Utemezes/app.component.css']
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map