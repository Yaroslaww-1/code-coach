/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { Auth } from "common/auth/auth-context";
import { Toast } from "common/toast/toast-context";

const BASE_URL = process.env.REACT_APP_API_URL || "/api";

export class Api {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(config => {
      config.headers.Authorization = btoa(`Bearer ${Auth.getToken()}`);
      return config;
    });

    this.instance.interceptors.response.use(response => {
      console.log("DASsa", response.status, response.data);
      if (response.status !== 200) {
        console.log(response.data);
      }
      return response;
    });
  }

  async get<Response>(url: string, params?: object): Promise<Response> {
    return await this.instance
      .get(url, { params })
      .then(this.parseResponse<Response>)
      .catch(this.parseError<Response>);
  }

  async post<Response>(url: string, payload: object): Promise<Response> {
    return await this.instance
      .post(url, payload)
      .then(this.parseResponse<Response>)
      .catch(this.parseError<Response>);
  }

  async put<Response>(url: string, payload: object): Promise<Response> {
    return await this.instance
      .put(url, payload)
      .then(this.parseResponse<Response>)
      .catch(this.parseError<Response>);
  }

  async delete<Response>(url: string): Promise<Response> {
    return await this.instance
      .delete(url)
      .then(this.parseResponse<Response>)
      .catch(this.parseError<Response>);
  }

  private parseResponse<Response>(response: AxiosResponse): Response {
    return response.data;
  }

  private parseError<Response>(error: AxiosError): Response {
    const data = error.response?.data as any;
    const message = data?.message;
    Toast.registerError(message);
    return error.response?.data as Response;
  }
}

export default new Api();