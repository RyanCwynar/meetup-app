import gql from "graphql-tag";

export const upsertUser = gql`
 mutation upsertUser($name: String!){
     authorize(name: $name){
        id
        auth0id
        name
        role
     }
 }`;

export const createGroup = gql`
    mutation createGroup($name: String!){
        createGroup(name: $name){
            name
        }
    }
`