
type EnvironmentVariable<T> = {
  env: string,
  default?: T
}

type Variable<T> = T | EnvironmentVariable<T>;

type ConfigurationData = {
  environment: Variable<"standalone" | "cloud-function">;
  database: {
    url: Variable<string>,
    user: Variable<string>,
    password: Variable<string>
  }
}

const env: Map<string, string | undefined> = new Map(Object.entries(process.env));
export const config: ConfigurationData = require("./configuration.json");

export class Configuration {

  static get<T>(variable: Variable<T>): T | undefined {
    if (typeof variable === "string") {
      return variable;
    } 
    
    const envVariable = variable as EnvironmentVariable<T>;
    if (envVariable.env) {
      const envValue = env.get(envVariable.env);
      if (!envValue) {
        console.warn("Environment variable \'" + envVariable.env + "\' is not defined!");
      }
      return env.get(envVariable.env) as T ?? envVariable.default;
    }

    return undefined;
  }

}
