import axios, { AxiosInstance, AxiosResponse } from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "/api";

class Api {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async get<Response>(url: string, params?: object): Promise<Response> {
    return await this.instance
      .get(url, { params })
      .then(this.parseResponse<Response>);
  }

  async post<Response>(url: string, payload: object): Promise<Response> {
    return await this.instance
      .post(url, payload)
      .then(this.parseResponse<Response>);
  }

  async put<Response>(url: string, payload: object): Promise<Response> {
    return await this.instance
      .put(url, payload)
      .then(this.parseResponse<Response>);
  }

  async delete<Response>(url: string): Promise<Response> {
    return await this.instance
      .delete(url)
      .then(this.parseResponse<Response>);
  }

  private parseResponse<Response>(response: AxiosResponse): Response {
    return response.data;
  }
}

export default new Api();