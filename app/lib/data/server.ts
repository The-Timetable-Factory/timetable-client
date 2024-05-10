
// The Timetable Factory Client
//
// Author: Anita Cheung
// Copyright © 2024 Anita Cheung. All rights reserved.

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

        // console.log(resData.data.checkEmailRegistered)

        return resData.data.checkEmailRegistered;
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
 * @return The username, email and accessToken of the user
 */
export async function registerUser(username: string, email: string, password: string): Promise<{ username: string, email: string, accessToken: string }> {
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
                    registerUser(userInput: {username: "${username}", email: "${email}", password: "${password}", provider: CREDENTIALS }){
                      user{
                        username
                        email
                      }
                      accessToken
                    }
                  }
                `
            }),
        });

        const resData = await response.json();
        console.log(resData);

        return { username: resData.data.registerUser.user.username, email: resData.data.registerUser.user.email, accessToken: resData.data.registerUser.accessToken };
    } catch (err) {
        console.log('Database error: ', err);
        throw new Error('Failed to add user to database');
    }
}

/**
 * Sign in a user who uses credentails
 * @param email The email of the user
 * @param password The password of the user
 * @returns The username, email and access token of the user
 */
export async function credentialsSignInUser(email: string, password: string): Promise<{ username: string, email: string, accessToken: string }> {
    console.log('Signing in user credential')
    // fetch to sign in user
    try {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                query {
                    credentialsSignIn(signInData: {email:"${email}", password: "${password}"}){
                      user {
                        username
                        email
                      }
                      accessToken
                    }
                }
                `
            }),
        });

        const resData = await response.json();
        console.log(resData);
        return { username: resData.data.credentialsSignIn.user.username, email: resData.data.credentialsSignIn.user.email, accessToken: resData.data.credentialsSignIn.accessToken };

    } catch (err) {
        console.log('Database error: ', err);
        throw new Error('Failed to sign in user');

    }
}


/**
 * Register a user who uses OAuth
 * @param provider The provider of the user
 * @param email The email of the user
 * @returns The token of the user
 */

export async function OAuthRegisterUser(provider: string, email: string): Promise<{ token: string }> {
    console.log('Registering user OAuth')
    // fetch to register user
    try {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                mutation{
                    OAuthRegisterUser(OAuthSignInData: {provider: ${provider.toUpperCase()}, email: "${email}"}){
                      accessToken
                    }
                  }
                `
            }),
        });

        const resData = await response.json();
        console.log(resData);
        return { token: resData.data.OAuthRegisterUser.accessToken };

    } catch (err) {
        console.log('Database error: ', err);
        throw new Error('Failed to register user');

    }
}

/**
 * Sign in a user who uses OAuth
 * @param provider The provider of the user
 * @param email The email of the user
 * @returns The username and token of the user
 */

export async function OAuthSignInUser(provider: string, email: string): Promise<{ username: string, token: string }> {
    console.log('Signing in user')
    // fetch to sign in user
    try {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                query {
                    OAuthSignIn(OAuthSignInData: {provider: ${provider.toUpperCase()}, email: "${email}"}){
                       user {
                        username
                       }
                       accessToken
                    }
                  }
                `
            }),
        });

        const resData = await response.json();
        console.log(resData);
        return { username: resData.data.OAuthSignIn.username, token: resData.data.OAuthSignIn.accessToken };

    } catch (err) {
        console.log('Database error: ', err);
        throw new Error('Failed to sign in user');

    }
}

export async function updateUsername(username: string, accessToken: string): Promise<{ email: string }> {
    console.log('Updating username')
    // fetch to update username
    try {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
            body: JSON.stringify({
                query: `
                mutation {
                    updateUsername(username: "${username}"){
                      email
                    }
                  }
                `
            }),
        });

        const resData = await response.json();
        console.log(resData);
        return { email: resData.data.updateUsername.email };

    } catch (err) {
        console.log('Database error: ', err);
        throw new Error('Failed to update username');

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