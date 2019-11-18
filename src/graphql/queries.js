import gql from "graphql-tag";

export const tokenTest = gql`
    query {
        tokenTest
    }
`
export const getMe = gql`
query {
    me{
        name
        auth0id
        ownerOf {
            id
            name
        }
        memberOf{
            id
            name
        }
    }
}
`

export const getGroup = gql`
query getGroup($id: String!){
    group(id: $id){
        id
        name
        owner{
            name
        }
        events{
            id
            name
        }
    }
}
`

export const getEvent = gql`
query getEvent($id: String!){
    event(id: $id){
        id
        name
        owner{
            name
        }
        events{
            id
            name
        }
    }
}
`