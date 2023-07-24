import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import _ from 'lodash';
import Config from '../config';
import { localStorage } from '../utils';
import { Object } from '../types';
import Cookies from 'js-cookie';
import * as appActions from '../actions';
// import queryString from 'query-string';
// import { message } from 'antd';

type optionsType = object | undefined | null;

export class Api {
  instance: AxiosInstance;
  getDefaultHeader?(): Object<any> {
    return { 'content-type': 'application/json' };
  }

  constructor(instance?: AxiosInstance, getDefaultHeader?: () => Object<any>) {
    if (instance) {
      this.instance = instance;
      this.getDefaultHeader = getDefaultHeader;
    } else {
      this.instance = axios.create({
        baseURL: Config.MSS_SERVICES_URL,
      });
    }
  }

  getDefaultOptions(isAuth = true) {
    // const token = cookie.getItem(cookie.keys.TOKEN) || null;
    // let auth = isAuth ? { Authorization: 'Bearer ' + token } : {};
    return {
      headers: {
        ...(typeof this.getDefaultHeader === 'function' ? this.getDefaultHeader() : {}),
        // ...auth,
      },
    };
  }

  attachToken(payload: any = {}) {
    const token = Cookies.get('_token');
    //const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('sessionId');
    return {
      ...payload,
      Token: token,
      SessionId: sessionId,
    };
  }

  handleError(error: AxiosError) {
    if (error.message === 'Network Error') {
      // Toast.error('Network error!');
    } else if (error.response && error.response.status === 403) {
      // if (error.response.data) {
      //   if (error.response.data.message === 'UserRoleInvalid') {
      //     global.store.dispatch(appActions.setBuildData({
      //       modalBuild: true,
      //       typeBuild: false,
      //     }));
      //   }
      // }

    } else if (error.response && error.response.status === 401) {
      Cookies.remove('_token');
      window.location.href = Config.SIGN_IN_URL + '?url_new_insight=' + window.location.href.replaceAll('&', "and");
    }
  }

  async createPromise(response: Promise<AxiosResponse>): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      response.then(
        (result: any) => {
          if (result.status === 200) {
            Cookies.set('_token', result.data.Token, { path: "" })
            //localStorage.setItem('token', result.data.Token);
          }
          if (result.status === 200 && result.data.BuildData === 1) {
            global.store.dispatch(appActions.setBuildData({
              modalBuild: true,
              typeBuild: true,
            }));
          }
          if (result.status === 200 && result.data.BuildData === 2) {
            global.store.dispatch(appActions.setBuildData({
              modalBuild: true,
              typeBuild: false,
            }));
          }
          resolve(result);
        },
        error => {
          this.handleError(error);
          reject(error);
        }
      );
    });
  }

  fetch(url: string, options = {}) {
    return this.createPromise(this.get(url, options, false));
  }

  get(url: string, options: any = {}, isAuth = true): Promise<AxiosResponse> {
    const finalOptions = _.merge(this.getDefaultOptions(isAuth), options);
    return this.createPromise(this.instance.get(url, finalOptions));
  }

  put(url: string, payload: any = null, options: any = {}, isAuth = true): Promise<AxiosResponse> {
    const finalOptions = _.merge(this.getDefaultOptions(isAuth), options);
    const finalPayload = this.attachToken(payload);
    return this.createPromise(this.instance.put(url, finalPayload, finalOptions));
  }

  post(url: string, payload: any = null, options: optionsType = {}, isAuth = true): Promise<AxiosResponse> {
    const finalOptions = _.merge(this.getDefaultOptions(isAuth), options);
    const finalPayload = this.attachToken(payload);
    return this.createPromise(this.instance.post(url, finalPayload, finalOptions));
  }

  delete(url: string, payload: any = null, options: any = {}, isAuth = true): Promise<AxiosResponse> {
    const finalOptions: AxiosRequestConfig = _.merge(this.getDefaultOptions(isAuth), options);
    const finalPayload = this.attachToken(payload);

    if (finalPayload) {
      finalOptions.data = finalPayload;
    }

    return this.createPromise(this.instance.request({ method: 'DELETE', url, ...finalOptions }));
  }
}

export default new Api();
