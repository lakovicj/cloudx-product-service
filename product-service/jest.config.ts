import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.paths.json";

const config: Config = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: "node",
  modulePaths: [compilerOptions.baseUrl],
  moduleDirectories: ["<rootDir>", "node_modules"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};

export default config;
