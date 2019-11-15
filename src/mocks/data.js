import faker from 'faker'
export const event = (id = '', groupName = '') => {
    return {
        id: id || faker.lorem.slug(),
        groupName: groupName || faker.company.catchPhrase(),
        name: faker.company.catchPhrase(),
        description: faker.lorem.sentence()
    }
}
export const group = (id = '') => {
    return {
        id: id || faker.lorem.slug(),
        name: faker.company.catchPhrase(),
        description: faker.lorem.sentence()
    }
}

export const groupsList = () => {
    const n = Math.round(4 + 10 * Math.random());
    let result = [];
    for (let i = 0; i < n; i++) {
        result.push(group())
    }
    return result;
}

export const eventsList = (groupName = '') => {
    const n = Math.round(4 + 10 * Math.random());
    let result = [];
    for (let i = 0; i < n; i++) {
        result.push(event('', groupName))
    }
    return result;
}
