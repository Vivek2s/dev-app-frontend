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
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: [ './signup.component.scss' ]
})
export class SignupComponent implements OnInit {
	// variables start
	@Input() enableSignUpModel: boolean = false; // for enabling sign up model
	@Output() notify = new EventEmitter(); // emiting output to other component

	registerForm: FormGroup;
	authObj = { inUse: false };
	userImage = '';
	buttonText: string = '';
	isError: boolean = false;
	errorMessage: string = '';
	isDisabled: boolean = false;
	course = 'undergrad';

	openLoginModel: boolean = false; // for login model

	// variables end

	constructor(
		private _fb: FormBuilder,
		private _cookieService: CookieService,
		private _scriptService: ScriptService,
		private zone: NgZone,
	) {}

	ngOnInit(): void {
		this.initRegisterForm(); // form init
		setTimeout(() => {
			this.oauthInit(); // third party login api init
		}, 1000);

		this.buttonText = 'Sign Up';
	}

	signup(){
		jQuery('#signup-form').removeClass('slide-up')
		jQuery('#login-form').addClass('slide-up')
	}
	
	// initializing register form
	initRegisterForm() {
		this.registerForm = this._fb.group({
			fullname: [ '', Validators.required ],
			username: [ '', Validators.compose([ Validators.required, GlobalValidator.emailFormat ]) ],
			passwordGroup: this._fb.group(
				{
					password: [ '', Validators.required ],
					confirmPassword: [ '', Validators.required ]
				},
				{ validator: GlobalValidator.passwordCompared }
			),
			phone: [ '', Validators.compose([ Validators.required, GlobalValidator.phoneFormat ]) ],
			role: [ '', Validators.required ]
		});
	}

	// function fire on sign-up button click
	onSignup() {
		let role = 'STUDENT';
		console.log(this.course);

		this.registerForm.controls['role'].setValue(role);

		if (this.authObj.inUse) {
			this.zone.run(() => {
				this.registerForm.removeControl('passwordGroup');
			});
		}
		if (!this.registerForm.valid) {
			window.toastNotification('Please fill form in proper details');
			return true;
		}

		let data = this.makeData(this.registerForm.value);
		console.log(data);

		if (data.roles == 'MENTOR' && !data.university) return true;
		else {
			this.buttonText = 'Sign Up...';
			this.isDisabled = true;
			// this.signupLoginService.register(data).subscribe(
			// 	async (response) => {
			// 		// console.log(response);

			// 		if (response.access_token) {
			// 			this.successLoginReq(response);
			// 		}
			// 	},
			// 	(error) => {
			// 		this.buttonText = 'Sign Up';
			// 		this.errorMessage = error.message || 'Server Error';
			// 		console.log(error, '***', this.errorMessage, '879789897');
			// 		this.isError = true;
			// 		this.isDisabled = false;
			// 	}
			// );
		}
	}

	// making initial user data to send through api
	makeData(form) {
		return {
			username: form.username,
			password: this.authObj.inUse ? this.authObj['password'] : form.passwordGroup.password,
			roles: 'STUDENT',
			course: this.course,
			university: undefined,
			student_details: {
				full_name: form.fullname,
				contact: form.phone
			},
			full_name: form.fullname,
			metas: [
				{
					key: 'mobile',
					value: form.phone
				},
				{
					key: 'image',
					value: this.userImage || ''
				}
			],
			authenticate: this.authObj.inUse ? this.authObj['authenticate'] : null,
			grant_type: 'password',
			source: 'web-app'
		};
	}

	// initializing third party login FB and GMAIL start
	async oauthInit() {
		let fbInit = await OauthHelper.init(this._scriptService, 'facebook');
		let googleInit = await OauthHelper.init(this._scriptService, 'auth2');
		this.attachSignin(googleInit, document.getElementById('googleBtn'));
	}

	attachSignin(googleInit, element) {
		let self = this;
		googleInit.attachClickHandler(
			element,
			{},
			(googleUser) => {
				let profile = googleUser.getBasicProfile();
				let auth = googleUser.getAuthResponse();
				this.userImage = profile.getImageUrl();
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

				self.zone.run(() => {
					self.authObj = Object.assign({ inUse: true }, data);
					self.loginRequest(data, 'googleSignup', {
						name: profile.getName(),
						email: profile.getEmail()
					});
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
			console.log(response);
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
					self.authObj = Object.assign({ inUse: true }, data);
					self.userImage = response.picture.data.url;
					self.loginRequest(data, 'fbSignup', {
						name: response.name,
						email: response.email
					});
				});
			}
		});
	}

	loginRequest(loginData, type, responseData = null) {
		let data = Object.assign({ grant_type: 'password' }, loginData);
		// this.signupLoginService.login(data).subscribe(
		// 	(response) => {
		// 		if (response.access_token) {
		// 			this.successLoginReq(response);
		// 		}
		// 	},
		// 	(error) => {
		// 		if ((type == 'fbSignup' || type == 'googleSignup') && error.error == 'E_RESOURCE_NOT_FOUND') {
		// 			this.registerForm.patchValue({
		// 				fullname: responseData.name,
		// 				username: responseData.email
		// 			});
		// 			return;
		// 		}
		// 		this.isDisabled = false;
		// 		this.buttonText = 'Login';
		// 		console.log(error, 'Error');
		// 		this.errorMessage = error.error_description;
		// 		this.isError = true;
		// 	}
		// );
	}

	// initializing third party login FB and GMAIL end

	// sending request to register a user
	async successLoginReq(response) {
		console.log(response);
		try {
			// let uuid = UUID.UUID();
			let cookie = {
				token: response.access_token,
				scope: response.scope.split(','),
				role: response.scope.split(',')[0],
				// course:response.user.course[0],
				user: response.user,
				// uuid: uuid
			};
			let update_uuid = {
				user_id: response.user._id,
				// uuid: uuid
			};
			// await this.signupLoginService.updatedLoggedinUUID(update_uuid);
			this._cookieService.createCookie('storage', cookie, response.expires_in, 'object');

			// if (!this.signupLoginService.isEmptyObject(response.application) && cookie.role == 'student') {
			// 	// this._routeStore.setData({ route: 'applications', data: response.application });
			// 	this._cookieService.createCookie('premium-account', response.application, 864000);
			// 	// this.zone.run(() => this._router.navigate([ '/student/paid-service' ]));
			// } else {
			// 	// this.zone.run(() => this._router.navigate([ '/', cookie.role ]));
			// }

			// console.log(location.host, '***', cookie);
			// this.firebaseStore.isLoginUser.next({ isUserLogin: true });

			// for redirecting the user to platform

			if (location.host === 'home.unirely.com' || location.host.includes('localhost')) {
				console.log('inside if of redirection');
				setTimeout(() => {
					console.log('inside settimeout of redirection');
					window.open(
						`https://staging.unirely.com/student/home`,
					);
				}, 200);
			} else if (location.host === 'unirely.com') {
				setTimeout(() => {
					window.open(
						`https://app.unirely.com/student/home`,
					);
				}, 200);
			}
			this.closeModel();
			this.isDisabled = false;
		} catch (error) {
			console.log(error);
		}
	}

	// for listening output event from other component
	childListener(event) {
		switch (event.type) {
			case 'close':
				this.closeModel();
				break;
			case 'signup':
				this.openLoginModel = false;
				break;
			default:
				break;
		}
	}

	// close sign up model
	closeModel() {
		this.enableSignUpModel = false;
		this.notify.emit({
			type: 'close'
		});
	}
}
