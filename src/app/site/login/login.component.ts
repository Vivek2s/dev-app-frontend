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
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
	// variables start
	@Input() enableLoginModel: boolean = false; // for enabling login model
	@Output() notifyLogin = new EventEmitter(); // emiting output to other component

	loginForm: FormGroup;
	buttonText: string = '';
	isError: boolean = false;
	errorMessage: string = '';
	errorData: any;
	auth2: any;
	isDisabled: boolean = false;
	isResendError: boolean = false;
	visiblePassword: boolean;
	loginSSO:boolean = false;
	// variables end

	constructor(
		private _fb: FormBuilder,
		private _cookieService: CookieService,
		private _scriptService: ScriptService,
		private _signupLoginService: SignupLoginService,
		private zone: NgZone,
		private _router: Router
	) {}

	ngOnInit(): void {
		this.formInit();
	}

	// initializing login form
	formInit() {
		this.buttonText = 'Login';

		this.loginForm = this._fb.group({
			username: [ '', Validators.compose([ Validators.required, GlobalValidator.emailFormat ]) ],
			password: [ '', Validators.required ],
			organisation: [ '']
		});
	}

	getError(){
		let message = "";
		if( !this.loginForm.get('username').touched){
			message = 'Please enter your email';
		}
		if(this.loginForm.get('username').touched &&
			!this.loginForm.get('username').valid &&
			!this.loginForm.get('username').errors?.emailFormat){
			message = 'Please enter your email';
		}
		else if(this.loginForm.get('username').errors?.emailFormat){
			message = "Email should be valid";
		}
		else if(!this.loginForm.get('password').touched){
			message = "Please enter your password";
		}
		
		console.log('message')
		if(message)
			window.toastNotification(message);
	}
	// function call on login button
	onLogin() {
		if (!this.loginForm.valid) {
			this.getError();
			return true;
		}
		this.isDisabled = true;
		this.loginRequest(this.loginForm.value, 'password');
	}

	// for sending login request to server
	loginRequest(loginData, type, responseData = null) {
		this.isResendError = false;
		this.isError = false;

		let data = Object.assign({ grant_type: 'password' }, loginData);
		this._signupLoginService.login(data).subscribe(
			async (response) => {
				if (response.access_token) {
					let cookie = {
						token: response.access_token,
						scope: response.scope.split(','),
						user: response.user,
					};
					this.isDisabled = false;
					this._cookieService.createCookie('storage', cookie, response.expires_in, 'object');

					this.zone.run(() => this._router.navigate([ '/profile' ]));
				}
			},
			(error) => {
				this.isDisabled = false;
				this.buttonText = 'Login';


				let regex = /reject/gi;
				if (error.error == 403 && !regex.test(error.error_description)) this.isResendError = true;
				this.errorData = error;
				this.errorMessage = error.error_description;
				console.log("erroror", error);
				window.toastNotification(this.errorMessage);
				this.isError = true;
			}
		);
	}

	login(){
		jQuery('#login-form').removeClass('slide-up')
		jQuery('#signup-form').addClass('slide-up')
	}

	async ssoLogin(){
		console.log(this.loginForm.get('organisation').value, "value");
		let org = this.loginForm.get('organisation').value;
		if(!org)
			return;

		let organisation =	await this._signupLoginService.sso(org);
		if(!organisation.sso)
			console.log("Organisation Not Found");

		window.location = "http://localhost:4000/login/sso/"+org;

		
	}
}
