import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'my-app',
    templateUrl: '/TypeScripts/apps/Utemezes/app.component.html',
    styleUrls: ['/TypeScripts/apps/Utemezes/app.component.css']
})
export class AppComponent implements OnInit {
    name = 'Angular';
    valamik = {};

    constructor(private http: Http) {
        console.log("ctor");
    }

    ngOnInit(): void {
        console.log("iniiit");
    }

    onclick(): void {
        INKA.Messages.Prompt("hiba", "hülyevagy, mit kattintgatsz?", null);

        this.valamik = this.http.get('sdf')
            .toPromise()
            .then(resp => resp.json().data)
            .catch(function (error: any): Promise<any> {
                return Promise.reject(error.message || error);
            });
    }
}
