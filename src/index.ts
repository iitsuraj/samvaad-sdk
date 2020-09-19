import sdk from 'matrix-js-sdk';
// import sdk, { InteractiveAuth } from 'matrix-js-sdk';

interface createLogin {
  user_id: string;
  access_token: string;
  home_server: string;
  device_id: string;
  well_known: wellKnow;
}
interface wellKnow {
  [key: string]: {
    base_url: string;
  };
}
class SamvaadClient {
  baseUrl: string;
  idBaseUrl: string;
  client: any;

  constructor(baseUrl: string, idBaseUrl: string) {
    this.baseUrl = baseUrl;
    this.idBaseUrl = idBaseUrl;
    this.createClient();
  }

  createClient(): void {
    this.client = sdk.createClient({
      baseUrl: this.baseUrl,
      idBaseUrl: this.idBaseUrl,
    });
  }

  getClient(): any {
    return this.client;
  }

  async createLogin(username: string, password: string): Promise<createLogin> {
    const isEmail = username.indexOf('@') > 0;
    let identifier = {};
    if (isEmail) {
      identifier = {
        type: 'm.id.thirdparty',
        medium: 'email',
        address: username,
      };
    } else {
      identifier = {
        type: 'm.id.user',
        user: username,
      };
    }
    const loginParams = {
      password: password,
      identifier: identifier,
    };

    return await this.client.login('m.login.password', loginParams);
  }
  // _makeRegisterRequest(auth: any, password: string, email: string, username: string): any {
  //   // We inhibit login if we're trying to register with an email address: this
  //   // avoids a lot of complex race conditions that can occur if we try to log
  //   // the user in one one or both of the tabs they might end up with after
  //   // clicking the email link.
  //   let inhibitLogin = true;

  //   // Only send inhibitLogin if we're sending username / pw params
  //   // (Since we need to send no params at all to use the ones saved in the
  //   // session).
  //   if (!password) inhibitLogin = false;

  //   const registerParams = {
  //     username: username,
  //     password: password,
  //     auth: null,
  //     inhibit_login: false,
  //   };
  //   if (auth) registerParams.auth = auth;
  //   if (inhibitLogin !== undefined && inhibitLogin !== null) {
  //     registerParams.inhibit_login = inhibitLogin;
  //   }
  //   return this.client.registerRequest(registerParams);
  // }

  // _requestCallback(auth: any, username: string, email: string, password: string): any {
  //   // This wrapper just exists because the js-sdk passes a second
  //   // 'busy' param for backwards compat. This throws the tests off
  //   // so discard it here.
  //   return this._makeRegisterRequest(auth, username, email, password);
  // }

  // async createRegistration(username: string, email: string, password: string): Promise<void> {
  //   const authLogic = new InteractiveAuth({
  //     matrixClient: this.client,
  //     doRequest: this._requestCallback,
  //   });
  // }

  // check guest login / registration is enabled or not
  // make a request for login
  // make a request for registration
}

// export default new SamvaadClient('https://m.samvaad.im', 'https://vector.im');

export default SamvaadClient;

// class Register {
//   username: string;
//   password: string;
//   email: string;
//   client: any;

//   constructor(username: string, password: string, email: string) {
//     this.email = email;
//     this.username = username;
//     this.password = password;
//     this.client = new SamvaadClient('https://m.samvaad.im', 'https://vector.im').getClient();
//   }

//   _makeRegisterRequest(auth: any): any {
//     // We inhibit login if we're trying to register with an email address: this
//     // avoids a lot of complex race conditions that can occur if we try to log
//     // the user in one one or both of the tabs they might end up with after
//     // clicking the email link.
//     let inhibitLogin = true;

//     // Only send inhibitLogin if we're sending username / pw params
//     // (Since we need to send no params at all to use the ones saved in the
//     // session).
//     if (!this.password) inhibitLogin = false;

//     const registerParams = {
//       username: this.username,
//       password: this.password,
//       auth: null,
//       inhibit_login: false,
//     };
//     if (auth) registerParams.auth = auth;
//     if (inhibitLogin !== undefined && inhibitLogin !== null) {
//       registerParams.inhibit_login = inhibitLogin;
//     }
//     return this.client.registerRequest(registerParams);
//   }

//   _requestCallback(auth: any): any {
//     // This wrapper just exists because the js-sdk passes a second
//     // 'busy' param for backwards compat. This throws the tests off
//     // so discard it here.
//     return this._makeRegisterRequest(auth);
//   }

//   _getUIAuthInputs(): { emailAddress: string } {
//     return {
//       emailAddress: this.email,
//     };
//   }
//   getClientSecret() : string {
//    return this.client.generateClientSecret();
//   }
//   _requestEmailToken(email:string, clientSecret:string, sendAttempt, sessionId) {
//     return this.state.matrixClient.requestRegisterEmailToken(
//         emailAddress,
//         clientSecret,
//         sendAttempt,
//         this.props.makeRegistrationUrl({
//             client_secret: clientSecret,
//             hs_url: this.state.matrixClient.getHomeserverUrl(),
//             is_url: this.state.matrixClient.getIdentityServerUrl(),
//             session_id: sessionId,
//         }),
//     );
// },

//   async createRegistration(): Promise<void> {
//     const authLogic = new InteractiveAuth({
//       matrixClient: this.client,
//       doRequest: this._requestCallback,
//       inputs: this._getUIAuthInputs(),
//       clientSecret: this.getClientSecret(),
//       requestEmailToken: this._requestEmailToken,
//     });
//   }
// }
