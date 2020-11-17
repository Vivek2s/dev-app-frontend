import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalValidator } from '../../shared/validators/global.validator';
import { CookieService } from 'src/app/shared/services/cookie.service';
import { ScriptService } from 'src/app/shared/services/script.service';
import { OauthHelper } from '../../shared/helpers/oauth.helper';
declare var jQuery: any;
declare var window: any;
declare var FB: any, gapi: any;
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
	// variables end

	constructor(
		private _fb: FormBuilder,
		private _cookieService: CookieService,
		private _scriptService: ScriptService,
		private zone: NgZone
	) {}

	ngOnInit(): void {
		this.formInit();
		this.oauthInit();
	}

	// initializing login form
	formInit() {
		this.buttonText = 'Login';

		this.loginForm = this._fb.group({
			username: [ '', Validators.compose([ Validators.required, GlobalValidator.emailFormat ]) ],
			password: [ '', Validators.required ],
			remember_me: false
		});
	}

	// function call on login button
	onLogin() {
		if (!this.loginForm.valid) return true;

		this.buttonText = 'Login...';
		this.isDisabled = true;
		this.loginRequest(this.loginForm.value, 'password');
	}

	// initializing third party login FB and GMAIL start
	async oauthInit() {
		let fbInit = await OauthHelper.init(this._scriptService, 'facebook');
		let googleInit = await OauthHelper.init(this._scriptService, 'auth2');
		this.attachSignin(googleInit, document.getElementById('googleBtnLogin'));
	}

	attachSignin(googleInit, element) {
		let self = this;
		googleInit.attachClickHandler(
			element,
			{},
			(googleUser) => {
				let profile = googleUser.getBasicProfile();
				console.log('profile image url..........', profile.getImageUrl());
				let auth = googleUser.getAuthResponse();
				console.log(googleUser.getId(), '..........Id');
				console.log('Access Token', googleUser.getAuthResponse());
				let data = {
					username: profile.getEmail(),
					password: auth.access_token,
					authenticate: {
						type: 'google',
						id: profile.getId()
					}
				};

				let response = Object.assign(
					{ inUse: true, name: profile.getName(), email: profile.getEmail(), image: profile.getImageUrl() },
					data
				);
				self.zone.run(() => {
					self.loginRequest(data, 'googleSignup', response);
				});
			},
			(error) => {}
		);
	}

	async fbLogin() {
		let fbLogin = await FB.login(
			async (response: any) => {
				console.log(response);
				if (response.status === 'connected') {
					this.fbUserProfile(response.authResponse.userID, response.authResponse.accessToken);
				} else {
					//   console.log("unknown")
				}
			},
			{ scope: 'email' }
		);
	}

	fbUserProfile(userId, accessToken) {
		let self = this;
		FB.api('/' + userId + '?fields=id,name,first_name,email,picture.type(large)', async (response) => {
			console.log(response, 'fffffffffffffffffffbbbbbbbbbbb');
			if (response.email) {
				let data = {
					username: response.email,
					password: accessToken,
					authenticate: {
						type: 'facebook',
						id: userId
					}
				};

				self.zone.run(() => {
					response = Object.assign(
						{
							inUse: true,
							password: accessToken,
							authenticate: {
								type: 'facebook',
								id: userId
							}
						},
						response
					);
					self.loginRequest(data, 'fbSignup', response);
				});
			}
		});
	}
	// initializing third party login FB and GMAIL start

	// for sending login request to server
	loginRequest(loginData, type, responseData = null) {
		this.isResendError = false;
		this.isError = false;

		let data = Object.assign({ grant_type: 'password' }, loginData);
		// this.signupLoginService.login(data).subscribe(
		// 	async (response) => {
		// 		if (response.access_token) {
		// 			let uuid = UUID.UUID();
		// 			console.log('uuid   ', response.user);
		// 			let cookie = {
		// 				token: response.access_token,
		// 				scope: response.scope.split(','),
		// 				role: response.scope.split(',')[0],
		// 				// course:response.user.course[0],
		// 				user: response.user,
		// 				uuid: uuid
		// 			};
		// 			console.log(cookie.role);
		// 			let update_uuid = {
		// 				user_id: response.user._id,
		// 				uuid: uuid
		// 			};
		// 			await this.signupLoginService.updatedLoggedinUUID(update_uuid);
		// 			this.isDisabled = false;
		// 			this._cookieService.createCookie('storage', cookie, response.expires_in, 'object', cookie.role);

		// 			if (!this.signupLoginService.isEmptyObject(response.application) && cookie.role == 'student') {
		// 				// this._routeStore.setData({ route: 'applications', data: response.application });
		// 				this._cookieService.createCookie('premium-account', response.application, 864000);
		// 				// this.zone.run(() => this._router.navigate([ '/student/paid-service' ]));
		// 			} else {
		// 				// this.zone.run(() => this._router.navigate([ '/', cookie.role ]));
		// 			}

		// 			this.firebaseStore.isLoginUser.next({ isUserLogin: true });
		// 			// for redirecting the user to platform
		// 			if (location.host == 'home.unirely.com' || location.host.includes('localhost')) {
		// 				window.open(`https://staging.unirely.com/`);
		// 			} else if (location.host == 'unirely.com') {
		// 				window.open(`https://app.unirely.com/`);
		// 			}
		// 			this.closeModel();
		// 		}
		// 	},
		// 	(error) => {
		// 		if ((type == 'fbSignup' || type == 'googleSignup') && error.error == 'E_RESOURCE_NOT_FOUND') {
		// 			// this._routeStore.setData({ route: type, data: responseData });
		// 			// this.zone.run(() => this._router.navigate([ '/signup' ]));

		// 			return;
		// 		}
		// 		this.isDisabled = false;
		// 		this.buttonText = 'Login';

		// 		console.log('errorerrorerrorerror', error);

		// 		let regex = /reject/gi;
		// 		if (error.error == 403 && !regex.test(error.error_description)) this.isResendError = true;
		// 		this.errorData = error;
		// 		this.errorMessage = error.error_description;
		// 		this.isError = true;
		// 	}
		// );
	}

	// for resending request for verification
	async resendVerification() {
		try {
			this.isError = false;
			this.isResendError = false;
			let data = {
				username: this.loginForm.get('username').value
			};
			// this.signupLoginService.resendVerification(data).subscribe(
			// 	(response) => {
			// 		if (response['success']) this.errorMessage = 'Successfully sent verification email';
			// 		this.isError = true;
			// 	},
			// 	(error) => {
			// 		console.log(error, 'Error');
			// 	}
			// );
		} catch (error) {
			console.log(error, 'Error');
		}
	}

	// close login model
	closeModel(type = 'close') {
		this.enableLoginModel = false;
		this.notifyLogin.emit({
			type: type
		});
	}

	login(){
		jQuery('#login-form').removeClass('slide-up')
		jQuery('#signup-form').addClass('slide-up')
	}
}
