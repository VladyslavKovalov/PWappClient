import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthHttp } from 'angular2-jwt';
import { Config } from '../config';

/**
 * Identity service (to Identity Web API controller).
 */
@Injectable() export class IdentityService {
    headers: Headers;
    options: RequestOptions;

    constructor(private authHttp: AuthHttp, private http: Http) {
        // Creates header for post requests.
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    public GetCurrentUserData(Websocketid?: string): Observable<any> {
        let body: any = JSON.stringify(Websocketid);
        // Sends an authenticated request.
        return this.authHttp.post(Config.SERVER_URL + "api/identity/GetCurrentUserData", body, this.options)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                // Error on get request.
                return Observable.throw(error);
            });
    }

    public GetAllUsers(): Observable<any> {
        // Sends an authenticated request.
        return this.authHttp.get(Config.SERVER_URL + "api/identity/GetAllUsers")
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                // Error on get request.
                return Observable.throw(error);
            });
    }

    /**
     * Creates a new user.
     *
     * @param model User's data
     * @return An IdentityResult
     */
    public Create(model: any): Observable<any> {
        let body: string = JSON.stringify(model);

        return this.http.post(Config.SERVER_URL + "api/identity/Create", body, this.options)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                // Error on post request.
                return Observable.throw(error);
            });
    }

    /**
     * Deletes a user through AuthHttp.
     *
     * @param username Username of the user
     * @return An IdentityResult
     */
    public Delete(username: string): Observable<any> {
        let body: string = JSON.stringify(username);

        // Sends an authenticated request.
        return this.authHttp.post("http://localhost:5000/api/identity/Delete", body, this.options)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                // Error on post request.
                return Observable.throw(error);
            });
    }


    /**
     * Send transaction to user by username
     */
    public SendTransactionToUser(username: string, summ: number): Observable<any> {
        let summy: string = summ.toString();

        let colors: string[] = [username, summy];

        let body: any = JSON.stringify(colors);

        // Sends an authenticated request.
        return this.authHttp.post(Config.SERVER_URL + "api/identity/SendTransactionToUser", body, this.options)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                // Error on post request.
                return Observable.throw(error);
            });
    }

    // Add other methods.
}