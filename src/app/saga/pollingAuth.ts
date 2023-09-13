import { put, call } from 'redux-saga/effects';
// , select, delay 
import axios from 'axios';
import Config from '../config';
import Utils from '../utils';
import SagaPoll from '../utils/SagaPoll';

import * as appActions from '../actions';
import Cookies from 'js-cookie';

class PollToken extends SagaPoll {
  *pollSync(firstToken: string, user_id: string, org_id: string, flag: boolean): any {
    try {
      yield call(refreshToken, firstToken, user_id, org_id, flag);
    } catch (error) {
      Utils.handleError(error);
    } finally {
      this.pollTaskId = null;
    }
  }
}

export function* refreshToken(token: any, user_id: string, org_id: string, flag: boolean): any {
  try {
    axios.create({
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'withCredentials': false,
        'mode': 'no-cors',
      },
    });
    const response: any = yield axios.post(Config.VALIDATE_URL, { Token: token });
    if (response.data.IsValid === true) {
      const payload: any = {
        isToken: response.data.IsValid,
        isValid: response.data.isValid,
        userEmail: response.data.UserEmail,
        userName: response.data.UserName,
        userId: response.data.UserId,
        orgId: response.data.OrgId,
        orgName: response.data.OrgName,
        orgAbbre: response.data.OrgAbbre,
        sessionId: response.data.SessionId
      };
      Cookies.set('_token', response.data.Token, { path: "" })
      // localStorage.setItem('token', response.data.Token);
      localStorage.setItem('SessionId', response.data.SessionId);
      localStorage.setItem('user_id', response.data.UserId);
      localStorage.setItem('org_id', response.data.OrgId);
      localStorage.setItem('OrgAbbre', response.data.OrgAbbre);
      localStorage.setItem('OrgDate', response.data.OrgDate);
      yield put(appActions.saveToken(response.data.Token));
    } else {
      window.location.href = Config.SIGN_IN_URL + '?url_new_insight=' + window.location.href.replaceAll('&', "and");
    }
  } catch (error) {
    Utils.handleError(error);
    Cookies.remove('_token');
    window.location.href = Config.SIGN_IN_URL + '?url_new_insight=' + window.location.href.replaceAll('&', "and");
  }
}

export default new PollToken();
