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

export const createEvent = gql`
    mutation createEvent($name: String!, $description: String, $group: String!, $start: String, $end: String){
        createEvent(event: {
            name: $name
            description: $description
            group: $group
            startTime: $start
            endTime: $end
        }){
            name
            description
            startTime
            endTime
            usersAttending
        }
    }
`


export const joinEvent = gql`
    mutation joinEvent($id: String!){
        joinEvent(eventId: $id){
            name
            description
            startTime
            endTime
            usersAttending{
                id
                name
            }
        }
    }
`


export const leaveEvent = gql`
    mutation leaveEvent($id: String!){
        leaveEvent(eventId: $id){
            name
            description
            startTime
            endTime
            usersAttending{
                id
                name
            }
        }
    }
`