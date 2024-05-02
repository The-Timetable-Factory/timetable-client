
// Sign In function
/**
 * Checks if a username exists in the backend database
 * @param username The username to check for existance
 * @returns A boolean if username is avaliable return true, else return false
 */

export async function checkUsernameExistance(username: string): Promise<boolean> {
    try {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                query {
                    checkUsernameExistence(username: "${username}")
                  }
                `
            }),
        });

        const resData = await response.json();

        return resData.data.checkUsernameExistence;
    } catch (err) {
        console.log('Database error: ', err);
        throw new Error('Failed to check username existence');
    }
}

/**
 * Checks if an email is already registered in the backend database
 * @param email The email to check if it is already registered
 * @returns A boolean if email is registered return true, else return false
 */
export async function checkEmailRegistered(email: string): Promise<boolean> {
    // fetch to see if email is already registered
    try {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                query {
                    checkEmailRegistered(email: "${email}")
                  }
                `
            }),
        });

        const resData = await response.json();

        return resData.data.checkUsernameExistence;
    } catch (err) {
        console.log('Database error: ', err);
        throw new Error('Failed to check username existence');
    }
}

/**
 * Register a new user to the backend database
 * @param username The username of the new user
 * @param email The email of the new user
 * @param password The password of the new user
 */
export async function registerUser(username: string, email: string, password: string): Promise<{ username: string, email: string }> {
    try {
        console.log('Registering user from server.ts')
        console.log('username: ', username)
        console.log('email: ', email)
        console.log('password: ', password)
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                mutation{
                    registerUser(userInput: {username: "${username}", email: "${email}", password: "${password}" }){
                      username
                      email
                    }
                  }
                `
            }),
        });

        const resData = await response.json();
        console.log(resData);

        return { username: resData.data.registerUser.username, email: resData.data.registerUser.email };
    } catch (err) {
        console.log('Database error: ', err);
        throw new Error('Failed to add user to database');
    }
}

/**
 * Sign in a user who uses credentails
 * @param email The email of the user
 * @param password The password of the user
 * @returns A user object if the user is signed in, else return null
 */
export async function signInUser(email: string, password: string): Promise<{ username: string, email: string }> {
    console.log('Signing in user')
    // fetch to sign in user
    try {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                query {
                    signIn(signInData: {email:"${email}", password: "${password}"}){
                      username
                      email
                    }
                  }
                `
            }),
        });

        const resData = await response.json();
        console.log(resData);
        return { username: resData.data.signIn.username, email: resData.data.signIn.email };

    } catch (err) {
        console.log('Database error: ', err);
        throw new Error('Failed to sign in user');

    }


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