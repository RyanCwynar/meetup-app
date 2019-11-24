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
    mutation createGroup($name: String!, $description: String){
        createGroup(name: $name, description: $description){
            id
            name
            description
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
            usersAttending{
                id
                name
            }
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

export const joinGroup = gql`
    mutation joinGroup($id: String!){
        joinGroup(groupId: $id){
            id
            name
            owner{
                name
            }
            members{
                id
                name
            }
            events{
                id
                name
            }
        }
    }
`

export const leaveGroup = gql`
    mutation leaveGroup($id: String!){
        leaveGroup(groupId: $id){
            id
            name
            owner{
                name
            }
            members{
                id
                name
            }
            events{
                id
                name
            }
        }
    }
`