import { SageMakerRuntimeClient } from "@aws-sdk/client-sagemaker-runtime";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SagemakerService {
  readonly #client: SageMakerRuntimeClient;

  constructor() {
    this.#client = new SageMakerRuntimeClient({});
  }

  public client(): SageMakerRuntimeClient {
    return this.#client;
  }
}