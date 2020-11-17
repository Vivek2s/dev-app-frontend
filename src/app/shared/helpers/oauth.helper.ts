import { environment } from './../../../environments/environment';

declare const FB:any, gapi: any;
export class OauthHelper{

    static async init(ScriptService, name) {

        return new Promise( async(resolve, reject)=>{
            await ScriptService.loadScript(name);
            let auth:any
            switch(name){
                    case 'facebook':
                                        auth = FB.init({
                                            appId: environment.FB_APP_ID,
                                            cookie: false,  // enable cookies to allow the server to access
                                            // the session
                                            xfbml: true,  // parse social plugins on this page
                                            version: 'v2.8' // use graph api version 2.5
                                        });
                                        resolve(auth)
                                        break;
                    case 'auth2': 
                                        await gapi.load('auth2', async()=>{
                                        auth = gapi.auth2.init({
                                            client_id: environment.GOOGLE_CLIENT_ID,
                                            // cookiepolicy: 'single_host_origin',
                                            scope: 'profile email'
                                        })
                                       resolve(auth)
                                    })
                                        break;
                    default: break;
            }
        });
    }
	
}
