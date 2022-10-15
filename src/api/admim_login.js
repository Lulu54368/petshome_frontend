
import pkg from 'jwt-decode';
import $ from 'jquery';

const {jwt_decode} = pkg;

const BASE_URL = "http://localhost:8080/api/v1"
//process.env.REACT_APP_BASE_URL

//const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
//const currentUser=currentUserSubject.asObservable()


var token = ""
function login(username, password) {
    const url = BASE_URL + '/auth/auth/login';
    const requestInit = {
        method: 'POST',
        // mode: 'no-cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    }
   
    fetch(url, requestInit)
    .then(res => {
        if(res.ok) {
            alert("Logged in successfully")
            return res.json();
            
        }
        else {
            return Promise.reject();
        }
    })
    .then(user => {
      
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        token = user.token;
        console.log(JSON.stringify(user))
       

        return user;
    })
    .catch((e) => {
        console.log('Failed to sign in, try again ' + e);
        $('.App .error_message').html('Failed to sign in, try again');
       // document.location.href = '/login';
    });
}

function signUp(username, password) {
    const url = BASE_URL + '/auth/user/register';
    const requestInit = {
        method: 'POST',
        // mode: 'no-cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
       
            'password': password,
            'username': username,
           
        })
    }

    fetch(url, requestInit)
    .then(res => {
        
        if(res.ok) {
            console.log('registered done!');
            login(username, password);
            return res.json();
        }
        else {
            return Promise.reject();
        }
    })
    .then(data => {
        console.log(data);
        //document.location.href = '/home';
    })
    .catch((e) => {alert('Failed to sign up, try again');
    console.log(e)});
}

function isLoggedIn() {
    return token !== '';
}
function getToken(){
    return token;
}
function getUserId() {
    if(isLoggedIn()) {
        
        const jwt =jwt_decode(token)

        return jwt.userId;
    } 
    return undefined;
}

export {
    getToken,
    login,
    signUp,
    isLoggedIn,
    getUserId
}