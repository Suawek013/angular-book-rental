
# Angular Book Rental
> Web application serving as a catalog of books.
> 
> Available at: https://angular-book-rental.herokuapp.com/ 


![Screenshot_2](https://user-images.githubusercontent.com/58706334/126484580-9a8b25ba-3920-47bb-ac66-7e701c9f82bc.jpg)









## Getting started
1. Make sure that you have Node 12.14 or newer installed. See instructions [here](https://nodejs.org/en/).

2. Make sure that you have the Angular CLI installed globally. Check details [here](https://angular.io/cli).
    ```
    npm install -g @angular/cli
    ```
3. Make sure that you have installed dependencies ('node_modules' folder) in 'library-server' folder via command:
    ```
    npm install
    ```


### How can you Host Angular App?
* You need to be in client ("cd client" in new terminal) folder, then just type:

    ```
    ng serve
    ```

### How can you Host Node JS Server?
* You need to be in server ("cd server" in new terminal) folder, then just type:

    ```
    npm run start:server
    ```
### Admin account
    e-mail: admin
    password: admin
 If admin is blocked you can change permission in database by editing permission to 'admin'
 at Users table or add new user by database with email 'admin' and password 'admin'.
 Then you can configure new admin account by logging in on site
> ![Screenshot_7](https://user-images.githubusercontent.com/58706334/118716546-3c4e5780-b825-11eb-9094-4fcebbc54f99.jpg)






# Useful tools to work with app
- Code edit - Visual Studio Code: https://code.visualstudio.com/
- Development workflow - Github Desktop: https://desktop.github.com/
- Browse database - DataDB Browser: https://sqlitebrowser.org/dl/
- Database Diagram Online - https://app.quickdatabasediagrams.com/#/d/zIDYvq

# Details & Settings

### Changing api url for production
Change apiUrl variable in file client/src/environments/environment.prod.ts

### Heroku limits
- If an app has a free web dyno, and that dyno receives no web traffic in a 30-minute period, it will sleep.
- Personal accounts are given a base of 550 free dyno hours each month.
https://devcenter.heroku.com/articles/free-dyno-hours

# Testing
### Google Chrome version we are using - 90.0.4430.78
####   How to check chrome version:
 - Click on the Menu icon in the upper right corner of the screen.
 - Next click on Help, and then About Google Chrome.
 - Your Chrome browser version number can be found here.

## Cypress startup guide
* You need to be in cypress ("cd cypress in new terminal") folder, then just type:

    ```
    npx cypress open
    ```
