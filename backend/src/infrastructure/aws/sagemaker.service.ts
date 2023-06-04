import { SageMakerRuntimeClient } from "@aws-sdk/client-sagemaker-runtime";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SagemakerService {
  readonly #client: SageMakerRuntimeClient;

  constructor() {
    this.#client = new SageMakerRuntimeClient({ region: "eu-central-1" });
  }

  public client(): SageMakerRuntimeClient {
    return this.#client;
  }
}