# Prototype Pollution DVWA
The Prototype Pollution DVWA is designed specifically to illustrate and educate on prototype pollution vulnerabilities, covering both client-side and server-side scenarios. This repository serves as an learning platform for security enthusiasts, developers, and students aiming to understand and mitigate prototype pollution risks in their applications.

# Getting Started
1. **Clone the Repository:** Start by cloning this repository to your local machine to set up the DVWA environment.
2. **Install Server Side Dependencies:** Navigate to the cloned repository directory and install necessary dependencies.
```
    cd prototype-pollution-dvwa
    npm install
```
3. **Install Client Side Dependencies:** Navigate to the client directory inside the cloned repository directory and install necessary dependencies.
```
cd prototype-pollution-dvwa/client
npm install
```
4. **Run the Application Server:** Launch the DVWA server.
```
cd prototype-pollution-dvwa
npm start
```
5. **Run the Application Client:** Launch the DVWA client to start exploring the vulnerabilities.
```
cd prototype-pollution-dvwa/client
npm start
```

# Exploiting the Vulnerabilities
## Client Side Prototype Pollution
The client side prototype pollution vulnerability exists in the application's use of an insecure version of lodash's `merge` function which allows for properties to be added to an objects `__proto__` property which results in any properties added to the prototype to be inherited by all objects in the application.

The entry point for this vulnerability is via the use of URL Query Parameters to allow a user to define UI settings. By passing syntax that would create a JavaScript Object when parsed and including a `__proto__` declaration an attacker can add arbitrary properties to the JavaScript Object Prototype.

The exploitation of this vulnerability can be accomplished by setting an `admin` property to a truthy value on the Object Prototype, resulting in the user object having an `admin` property that resolves to true. This application's UI looks for this property to be true in order to reveal parts of the UI that a standard user would not normally have access to.

Once you have the application running you can illustrate this vulnerability by navigating to `http://localhost:3000/?userSettings={"__proto__":{"admin":1}}`. If performed successfully you will see a flag appear in the UI of the application.

## Server Side Prototype Pollution
The server side prototype pollution vulnerability exists in the application's use of an insecure version of lodash's `merge` function which allows for properties to be added to an objects `__proto__` property which results in any properties added to the prototype to be inherited by all objects in the application.

The entry point for this vulnerability is via the `POST /settings` endpoint which allows users to update their stored UI settings for their user in the application. By passing a JSON object which includes a `__proto__` declaration an attacker can add arbitrary properties to the JavaScript Object Prototype.

The attack method for this vulnerability is accomplished by crafting a malicious `POST` request to the `/settings` endpoint in which the body contains a JSON Object with a `__proto__` property which contains an `admin` property set to a truthy value. This is ultimately merged using the insecure lodash `merge` function resulting in the `admin` property being added to the JavaScript Object Prototype which is subsequently inherited by all Objects within the application.

```curl --location 'localhost:5001/settings' \
--header 'Content-Type: application/json' \
--data '{
    "userSettings": {
        "dark": "true",
        "__proto__": {
            "admin": 1
        }
    }
}'```

The exploitation of this vulnerability is ultimately to exflitrate information that only and admin user of the application would normally have access to. Once the Object Prototype has been polluted with an `admin` property, all user objects within the application will have an `admin` property and thus bypass any checks for admin privileges. This can ultimately be exploited by submitting a `GET` request to the `/admin` endpoint.

```curl --location 'localhost:5001/admin'```

If you have completed the attack successfully you will receive a flag back from the request rather than a 403 error.