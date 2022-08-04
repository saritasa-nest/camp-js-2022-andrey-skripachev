import { Immerable, OmitImmerable } from "./immerable";
import { ValidationErrors } from "./validation-errors";

/**  */
export class ValidationErrorResponse extends Immerable {

  public readonly data?: ValidationErrors;

  public readonly detail: string;

  public constructor(data: InitArgs) {
    super();
    this.data = data.data;
    this.detail = data.detail;
  }

}

type InitArgs = OmitImmerable<ValidationErrorResponse>;
