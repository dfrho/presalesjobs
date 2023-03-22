import { GraphQLClient } from 'graphql-request'

const hygraph = new GraphQLClient(process.env.HYGRAPH_URL)

export default hygraph
