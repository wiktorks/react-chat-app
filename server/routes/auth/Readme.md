# Register

Used to save user credentials on the app's database and use them in authentication process.

**URL**: `/auth/register`

**Method**: `POST`

**Content type**: `application/json`

**Data format required**:

```json
{
  "name": "[Valid user name]",
  "email": "[valid email account]",
  "password": "[password meeting requirements]",
  "confirmPassword": "[same password as the above]"
}
```

## Success response

**Code**: `201 CREATED`

**Condition**: If everything is OK and no user with same credentials exists

**Content example**:

```json
{
  "status": "success",
  "message": "User account created"
}
```

## Error response

**Code**: `400 BAD REQUEST`

**Condition** : If one of the conditions is fulfilled:

- User with given credentials exists in database
  `"message": "User [username] exists in database"`
- Password and confirmation don't match
  `"message": "Passwords don't match"`
- Some of the credentials are empty:
  `"message": "Missing credentials"`

**Content** :

```json
{
  "status": "failure",
  "message": "[message from the list]"
}
```

### Or

**Code**: `500 INTERNAL SERVER ERROR`

**Condition**: An unexpected error occurs on the server side

**Content**:

```json
{
  "status": "error",
  "message": "Internal server error"
}
```
