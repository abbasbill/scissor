# Titly App
This is an api for a titly app

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

---
## Base URL
- somehostsite.com


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  username |  string |  required |
|  password |   string |  required  |


### Url
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  createdAt |  date |  required |
|  originalUrl | string  |  required|
|  shortened Url  |  string |  required  |
|  qrcodeUrl     | string  |  required |
|  customUrl |   string |  required 
|  clicks |   number |  required 




## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "password": "Password1",
  "username": 'jon_doe",
}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "password": "Password1",
        "username": 'jon_doe",
    }
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "password": "Password1",
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
### Create Order

- Route: /order
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
    shortenedUrl: 'myDomainName.com/something',
    
}
```
---
### Get url

- Route: /shorten/:id
- Method: GET
- Responses

Success
```
{
    shortenedUrl: 'myDomainName.com/something',
    OriginalUrl: 'somelongUrl.com',
    createdAt: Mon Oct 31 2022 08:35:00 GMT+0100,
    clicks: integerNUmber
}
```
---

### Get urls

- Route: /urls
- Method: GET
- Query params: 
    - usersId
- Responses

Success
```
{
     shortenedUrl: 'myDomainName.com/something',
    OriginalUrl: 'somelongUrl.com',
    createdAt: Mon Oct 31 2022 08:35:00 GMT+0100,
    clicks: integerNUmber
}
```
---

...

## author
- Billiamin Abbas