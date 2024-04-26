
// Sign In function
/**
 * Checks if a username exists in the backend database
 * @param username The username to check for existance
 * @returns A boolean if username is avaliable return true, else return false
 */
export function checkUsernameExistance(username: string): boolean {
    // fetch to see if username is available
    console.log('Checking username existance')
    return true;
}

/**
 * Checks if an email is already registered in the backend database
 * @param email The email to check if it is already registered
 * @returns A boolean if email is registered return true, else return false
 */
export function checkEmailRegistered(email: string): boolean {
    // fetch to see if email is already registered
    console.log('Checking email registration')
    return false;
}

/**
 * Add a new user to the backend database
 * @param username The username of the new user
 * @param email The email of the new user
 * @param password The password of the new user
 */
export function addUser(username: string, email: string, password: string) {
    console.log('Adding user to database')
    // fetch to add user to database
}

/**
 * Sign in a user who uses credentails
 * @param email The email of the user
 * @param password The password of the user
 * @returns A user object if the user is signed in, else return null
 */
export function signInUser(email: string, password: string): any {
    console.log('Signing in user')
    // fetch to sign in user
    return { id: "1", name: "Test User" };
}

interface TimetableTitle {
    title: string,
    id: string
}

/**
 * Fetch the user's timetable title from the backend database
 * @param userId The id of the user
 * @returns An erray of timetable titles and ids
 */
export function fetchTimetableTitles(userId: string): TimetableTitle[] {
    console.log('Fetching timetable titles')
    // fetch to get timetable titles
    // const graphqlQuery = {
    //     query: `
    //      query {
    //        hello {
    //             text
    //         }
    //      }
    //     `
    // }
    // fetch('http://localhost:8080/graphql', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(graphqlQuery),
    // })
    //     .then(res => res.json())
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err))

    return [
        { title: "Fall 2023", id: '23456412345' },
        { title: "Winter 2024", id: "123456543" },
        { title: "Summer 2024", id: "123456543" },
        { title: "Fall 2024", id: "123456543" },
        { title: "My Summer Timetable", id: "123456543" }];
}

/**
 * Fetch the timetable from the backend database
 * @param userId The id of the user
 * @param timetableTitle The title of the timetable to fetch
 * @returns 
 */
export function fetchTimetable(userId: string, timetableTitle: string): any {
    console.log('Fetching timetable')
    // fetch to get timetable
    return { title: timetableTitle, courses: [] };
}