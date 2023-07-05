# Titly App
This is an api for titly app, a url shortening application

---

## Specifications
1. User can register and login with their username and password 
2. User are authenticated with Passport using Local strategy
3. Implement basic auth
4. User can get urls
5. Users can create shorter urls given an original longer urls
6. Users are able to delete urls
7. Test application
---

## Setup
- Install NodeJS, mongodb, Redis
- api documentation at https://titly.onrender.com/api/docs/
---
## Base URL
- https://titly.onrender.com


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  username |  string |  required |
|  password |   string |  required  |


### Url
| field  |  data_type | constraints  |
|---|---|---|
|  createdAt |  date |  required |
|  originalUrl | string  |  required|
|  shortened Url  |  string |  required  |
|  qrcodeUrl     | string  |  required |
|  customUrl |   string |  required 
|  clicks |   number |  required 




## APIs
---

### Signup User

- Route: auth/signup
- Method: POST
- Body: 
```
{
  
  "username": 'jon_doe",
  "password": "Password",
}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "username": 'jon_doe",
        "password": "Password",
        
    }
}
```
---
### Login User

- Route: auth/login
- Method: POST
- Body: 
```
{
  "password": "Password",
  "username": 'jon_doe",
}
```

- Responses

Success
```
{
    message: 'Login successful',
}
```

---
### Create a  shortenedurl

- Route: /api/shorten
- Method: POST
- Body: 
```
{
        OriginalUrl: 'somelongUrl.com',

}
```

- Responses

Success
```
{
    shortenedUrl: 'https://titly.onrender.com/something',
    
}
```
---
### Get the originalUrl by providing the associated shortenedUrl

- Route: /:id
- Method: GET
- Responses

Success
```
{
    shortenedUrl: 'https://titly.onrender.com/something',
    OriginalUrl: 'somelongUrl.com',
    clicks: integerNUmber
}
```
---

### Get urls

- Route: /api/shorten
- Method: GET
- Query params: 
    - usersId
- Responses

Success
```
{
    shortenedUrl: 'https://titly.onrender.com/something',
    OriginalUrl: 'somelongUrl.com',
    clicks: integerNUmber
}
```
---

...

## author
- Billiamin Abbas