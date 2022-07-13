import { QueryParameter } from '../variables/interfaces';

/** Query Parameters. */
export class QueryParameters {
  private parameters: readonly QueryParameter[];

  public constructor(parameters: readonly QueryParameter[]) {
    this.parameters = parameters;
  }

  /**
   * Finds the value of the parameter and returns it.
   * @param optionName Name of the option.
   * @returns Value of the option.
   */
  public getOption(optionName: string): string | null {
    const optionParameter = this.parameters.find(({ name }) => name === optionName);

    if (optionParameter === undefined) {
      return null;
    }

    return optionParameter.value.toString();
  }

  /**
   * @returns A copy of the query parameters.
   */
  public getOptions(): QueryParameter[] {
    const parametersCopy: QueryParameter[] = [];
    this.parameters.forEach(({ name, value }) => {
      parametersCopy.push({ name, value });
    });
    return parametersCopy;
  }

  /**
   * Replaces the parameter with a new value, or creates a new parameter.
   * @param optionName Parameter to be replaced.
   * @param newValue The new value of the parameter.
   */
  public replaceOption(optionName: string, newValue: string): void {
    const newParameters: QueryParameter[] = [];
    let isMatchedOption = false;

    for (const { name, value } of this.parameters) {
      if (name === optionName) {
        newParameters.push({ name, value: newValue });
        isMatchedOption = true;
      } else {
        newParameters.push({ name, value });
      }
    }

    if (!isMatchedOption) {
      newParameters.push({ name: optionName, value: newValue });
    }

    this.parameters = newParameters;
  }
}
