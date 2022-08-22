import { Immerable, OmitImmerable } from "./immerable";

export class QueryParams extends Immerable {

  public readonly maximumReceivesCount: number;

  public readonly sorting: 

  public constructor(data: InitArgs) {

  }
}

type InitArgs = OmitImmerable<QueryParams>;
