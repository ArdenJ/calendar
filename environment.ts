interface IEnv {
  apollo: {
    introspection: boolean
    playground: boolean
  }
  port: number | string
  jsonServ: string
}

export const environment: IEnv = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true',
  },
  port: process.env.PORT || 4000,
  jsonServ: 'http://localhost:3001/',
}
