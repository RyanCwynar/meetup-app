import gql from "graphql-tag";

export const getMe = gql`
query {
    me{
        id
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
        description
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

export const getGroups = gql`
query getGroups{
    groups{
        id
        name
        description
        owner{
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
        group{
            id
            name
        }
        latitude
        longitude
        mapUrl
        addressText
        addressHtml
        description
        date
        startTime
        endTime
        usersAttending{
            id
            name
        }
    }
}
`

export const getEvents = gql`
query getEvents{
    events{
        id
        name
        group{
            name
        }
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

export const searchEvents = gql`
 query searchEvents($searchTerm: String){
     searchEvents(searchTerm: $searchTerm){
        id
        name
        group{
            name
        }
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
