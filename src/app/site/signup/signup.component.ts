import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalValidator } from '../../shared/validators/global.validator';
import { CookieService } from 'src/app/shared/services/cookie.service';
import { ScriptService } from 'src/app/shared/services/script.service';
import { SignupLoginService } from '../../shared/services/signup-login.service';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var window: any;
@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: [ './signup.component.scss' ]
})
export class SignupComponent implements OnInit {

	registerForm: FormGroup;
	buttonText: string = '';
	isError: boolean = false;
	errorMessage: string = '';
	isDisabled: boolean = false;

	constructor(
		private _fb: FormBuilder,
		private _cookieService: CookieService,
		private _router: Router,
		private zone: NgZone,
		private _signupLoginService: SignupLoginService
	) {}

	ngOnInit(): void {
		this.initRegisterForm();
	}

	signup(){
		jQuery('#signup-form').removeClass('slide-up')
		jQuery('#login-form').addClass('slide-up')
	}
	
	// initializing register form
	initRegisterForm() {
		this.registerForm = this._fb.group({
			username: [ '', Validators.compose([ Validators.required, GlobalValidator.emailFormat ]) ],
			passwordGroup: this._fb.group(
				{
					password: [ '', [Validators.required, GlobalValidator.noWhitespaceValidator, GlobalValidator.passwordFormatCheck] ],
					confirmPassword: [ '', [Validators.required, GlobalValidator.noWhitespaceValidator, GlobalValidator.passwordFormatCheck] ]
				},
				{ validator: GlobalValidator.passwordCompared }
			)
		});
	}

	getError(){
		let message = "Please fill up all the fields";

		if( (!this.registerForm.get('username').touched) || (this.registerForm.get('username').touched &&
			!this.registerForm.get('username').valid &&
			!this.registerForm.get('username').errors?.emailFormat) ){
			message = 'Please enter your email';
		}
		else if(this.registerForm.get('username').errors?.emailFormat){
			message = "Email should be valid";
		}
		else if( (!this.registerForm.get('passwordGroup').get('password').touched)
				|| (this.registerForm.get('passwordGroup').get('password').touched &&
			this.registerForm.get('passwordGroup').get('password').value.trim() == "" )){
			message = "Please enter your password";
		}
		else if(this.registerForm.get('passwordGroup').get('password').errors?.pwdFormat ){
			message = "Minimum six characters, at least one letter and one number"
		}
		else if(
			(!this.registerForm.get('passwordGroup').get('confirmPassword').touched)
			|| (this.registerForm.get('passwordGroup').get('confirmPassword').touched &&
			this.registerForm.get('passwordGroup').get('confirmPassword').value.trim() == "") ){
			message = "Please enter confirm password";
		}
		else if(this.registerForm.get('passwordGroup').errors?.match){
			message = "Password & Confirm Password does not match";
		}
		
		console.log('testtetttttt', this.registerForm.get('passwordGroup').get('password').errors)
		window.toastNotification(message);
	}
	// function fire on sign-up button click
	onSignup() {
		console.log(this.registerForm);

		if (!this.registerForm.valid) {
			this.getError();
			return true;
		}

		let data = this.makeData(this.registerForm.value);
		console.log(data);

			//this.buttonText = 'Sign Up...';
			this.isDisabled = true;
			this._signupLoginService.register(data).subscribe(
				async (response) => {
					if (response.access_token) {
						this.successLoginReq(response);
					}
				},
				(error) => {
					this.errorMessage = error && error.error ? error.error.message : 'Server Error';
					console.log(error);
					window.toastNotification(this.errorMessage);
					this.isDisabled = false;
				}
			);
		
	}

	// making initial user data to send through api
	makeData(form) {
		return {
			username: form.username,
			password: form.passwordGroup.password,
			grant_type: 'password'
		};
	}

	
	// sending request to register a user
	async successLoginReq(response) {
		try {
			let cookie = {
				token: response.access_token,
				user: response.user
			};
			this._cookieService.createCookie('storage', cookie, response.expires_in, 'object');
			this.zone.run(() => this._router.navigate([ '/profile' ]));
			this.isDisabled = false;
		} catch (error) {
			console.log(error);
		}
	}
}
