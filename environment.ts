interface IEnv {
  apollo: {
    introspection: boolean;
    playground: boolean;
  };
  port: number | string;
}

export const environment: IEnv = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === "true",
    playground: process.env.APOLLO_PLAYGROUND === "true"
  },
  port: process.env.PORT || 4000
};
