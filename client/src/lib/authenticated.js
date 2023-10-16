import { mussetoken } from "../lib/login.js";

let token = "";

mussetoken.subscribe((mussetoken) => {
    token = mussetoken;
});

if (token === "" && typeof window !== "undefined") {
    const t = localStorage.getItem("mussetoken");
    if(t){
        token = t;
    }
}

function notLoggedIn() {
    alert("Du er ikke logget inn.");
    return {};
}

async function authenticatedRequest(url, method, data, params) {
    if (!token) {
        return notLoggedIn();
    }

    let headers = {"Authorization": `Bearer ${token}`, }; // Add JWT to header.
    
    if ((method == "POST" || method == "PUT") && data.length > 0){
        headers["Content-Type"] = "application/json";
    }

    let reqObj = { method: method, headers: headers };
    if (data.length > 0) {
        reqObj.body = data;
    }

    return fetch(`${url}?${params}`, reqObj).then(response => {
        if (response.status == 200) {
            return response.json();
        } else if (response.status == 401) {
            return notLoggedIn();
        }
    }).catch(error => {
        
    });
}

export async function authenticatedGetRequest(url, params) {
    return authenticatedRequest(url, "GET", "", params);
}

export async function authenticatedPostRequest(url, data, params) {
    return authenticatedRequest(url, "POST", data, params);
}

export async function authenticatedPutRequest(url, data, params) {
    return authenticatedRequest(url, "PUT", data, params);
}
