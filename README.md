# Titly App
This is an api for titly app, a url shortening application

---

## Specifications
1. User can register and login with their username and password 
2. User authentication by Passport local strategy
3. endpoints authentication and authorization
4. User can get urls
5. Users can create shorter urls by providing an existing valid longer urls
6. authrnticated Users are able to delete urls
7. unit and integration testing using supertest and jest
---

## Setup
- Install NodeJS, mongodb, Redis
---
## Base URL
- https://titly.onrender.com
- api documentation at https://titly.onrender.com/api/docs/

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

### User signup

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
### User login

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
### Create a shorter url

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

### Get all user urls by their userId

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