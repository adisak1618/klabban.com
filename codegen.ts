import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://klabban.local/graphql",
  documents: "src/gql/**/*.graphql",
  config: {
    maybeValue: "T | undefined",
    inputMaybeValue: "T | null | undefined"
  },
  generates: {
    './src/gql/generated/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node']
    }
  }
};

export default config;
