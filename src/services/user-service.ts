
import { config } from '../config';
import { isBoolean, isNumber, isString } from '../lib/validate-primitives';
import { UserDto } from '../models/user-dto';

export type LoginUserOpts = {
  userName: string;
  password: string;
};

export type RegisterUserOpts = {
  email: string;
} & LoginUserOpts;

export class UserService {

  static async verifyUser(): Promise<UserDto | undefined> {
    let url: string;
    let rawResp: Response;
    let user: UserDto;
    url = `${config.EZD_API_BASE_URL}/v1/user/verify`;
    rawResp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if(rawResp.status !== 200) {
      return;
    }
    let rawRespBody = await rawResp.json();
    if(
      isBoolean(rawRespBody?.result)
      && (rawRespBody.result === false)
    ) {
      return;
    }
    // console.log('rawRespBody');
    // console.log(rawRespBody);
    user = UserDto.deserialize(rawRespBody?.result?.user);
    // if(isNumber(rawRespBody?.result?.exp)) {
    //   console.log(rawRespBody.result.exp);
    //   console.log(new Date(rawRespBody.result.exp * 1000));
    // }
    return user;
  }

  static async loginUser(opts: LoginUserOpts) {
    let url: string;
    let rawResp: Response;
    url = `${config.EZD_API_BASE_URL}/v1/user/login`;
    const body = {
      userName: opts.userName,
      password: opts.password,
    };
    rawResp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    if(rawResp.status !== 200) {
      return;
    }
    console.log(rawResp);
    let respBody = await rawResp.json();
    console.log({
      respBody,
    });
    let token: unknown = respBody.token;
    if(!isString(token)) {
      return;
    }
    return token;
  }


  static async registerUser(opts: RegisterUserOpts) {
    let url: string;
    let rawResp: Response;
    url = `${config.EZD_API_BASE_URL}/v1/users/register`;
    const body = {
      email: opts.email,
      userName: opts.userName,
      password: opts.password,
    };
    rawResp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS',
      },
      body: JSON.stringify(body),
    });
    if(rawResp.status !== 200) {
      const rawRespBody = await rawResp.json();
      console.log(rawRespBody);
    }
    await new Promise((resolve) => setTimeout(resolve, 2e3));
    return rawResp;
  }
}
