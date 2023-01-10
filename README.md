# Secured User Authentication System - MERN Stack Project
It's a user authenticating system which is made using the `MERN Stack` and after authenticating the user it redirects to `/dashboard` where it shows your entered information and if the user has already logged in the previous session then it will directly redirect to `/dashboard`.

## Additionalities.
- **`Web Token`** : To get track of the previous login session the application uses `Json Web Token`.
- **`Password Hashing`** : This is the functionality that makes this project **secured** as it doesn't save your password directly as string in database, instead it hashes the password with the help of `bcrypt.js` and then saves that hashed password in the database, hence the passwords can't be breached.
- **`Front-end Routing`** : This functionality allows us to navigate through different endpoints without any reaload and hence increase the **User Experiance**. This is done using `react-router-dom` library.

## The Looks
**Landing Page**

![image](https://user-images.githubusercontent.com/69182611/211269739-ff06dbc0-3027-4f66-9521-19b0129c44d5.png)

**Login Page**

![image](https://user-images.githubusercontent.com/69182611/211269826-937f31ab-b096-432a-9fb7-4967461210e6.png)

**Sign-Up Page**

![image](https://user-images.githubusercontent.com/69182611/211270001-a866f114-57b5-472c-ab58-84bec2b48ab4.png)

**Dashboard Page**

![image](https://user-images.githubusercontent.com/69182611/211270219-b2e386b6-d3b6-4879-8f62-a9c5e8a6ee31.png)
