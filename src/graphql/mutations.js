import gql from "graphql-tag";

export const oauth = gql`
 mutation oAuthRegistration($email: String!, $name: String!){
     oauth(email: $email, name: $name){
        token
        user{
            name
            email
        }
     }
 }`;