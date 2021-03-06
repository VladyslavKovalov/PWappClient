import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/scan';
import { Subject } from 'rxjs/Subject';
import { SigninService } from '../services/signin.service';
import { IdentityService } from '../services/identity.service';
import { CustomValidators } from 'ng2-validation';
import { SubmitButton } from '../shared/submitButton';
import { AuthenticationService } from '../services/authentication.service';

export function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {
        [key: string]: any
    } => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];

        if (password.value !== confirmPassword.value) {
            return {
                mismatchedPasswords: true
            };
        }
    }
}

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    userName: string = null;
    complexForm: FormGroup;
    SubmitButton = new SubmitButton("Submit");

    constructor(public authenticationService: AuthenticationService, fb: FormBuilder, private Signin: SigninService, private router: Router, public identity: IdentityService) {
        this.complexForm = fb.group({
            // To add a validator, we must first convert the string value into an array.
            //The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            'username': ["", [Validators.required, CustomValidators.email]],
            // We can use more than one validator per field.
            // If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
            'password': ["", [Validators.required, Validators.minLength(6)]],

            'passwordCheck': ["", Validators.required],

            'name': ["", [Validators.required, Validators.minLength(2)]],
        },
            { validator: matchingPasswords('password', 'passwordCheck') }
        )
    }

    signup(): void {
        this.SubmitButton.deactivate();
        this.identity.Create(this.complexForm.value)
            .subscribe(
            (res: any) => {
                // IdentityResult.
                if (res.succeeded) {
                 
                    this.authenticationService.signin(this.complexForm.value.username, this.complexForm.value.password).subscribe(
                        x => { this.SubmitButton.activate(); this.authenticationService.scheduleRefresh();  this.router.navigate(["Home"]); },
                        e => {
                            this.SubmitButton.activate();
                           
                        }
                    );





                
                } else {
                    console.log("registration notdone");
                    this.userName = "username is already exist";
                    this.SubmitButton.activate();
                    //  this.errorMessages = res.errors;
                }
            },
            (error: any) => {
                console.log("registration notdone!!!");

                // Error on post request.
                let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';

                console.log(errMsg);

                //  this.errorMessage = "Server error. Try later.";
            });
    }

    click$: Observable<any> = new Subject().map((value: any) => {
        const val = value;

        console.log('heeeey');
        this.signup();
    });

    subscription: any = this.click$.subscribe(
        x => console.log('onNext: %s', JSON.stringify(x)),
        e => console.log('onError: %s', e),
        () => console.log('onCompleted'));

    login() {
        if (this.Signin.signin(this.complexForm.value.firstName, this.complexForm.value.lastName))
        { this.router.navigate(['Home']) }
    };

    ngOnInit() {
    }
}