import { GraphQLClient } from 'graphql-request';

const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`

const client = new GraphQLClient(endpoint, { next: { revalidate: 10 } });


export default client;