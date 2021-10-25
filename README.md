# City Hotel

## Abstract

City Hotel is an application that allows the user to interact with a hotel by logging in/out, viewing all bookings and make new bookings for multiple nights and filtering the different rooms by type.

## Installation

1. Clone down [client side app](https://github.com/karmacarlos/overlook-2021) to your local machine.
2. Clone down [local server](https://github.com/turingschool-examples/overlook-api) to a different folder.
3. Run `npm install` on your root folder of the two cloned down repo.
4. In local server folder, run `npm start` to launch local server.
5. In client app folder, run `npm start` and visit the opened port in browser.
6. Start messing around on the page!

## To Run the Tests

Run the tests suite using the command:

```bash
npm test
```

The test results will output to the terminal.

## Usage and Demonstration

   * The user can log in into the application
  
![Screen Shot 2021-10-25 at 6 55 34 AM](https://user-images.githubusercontent.com/81398850/138699868-eb9b387f-e9d0-4c6c-9b94-a6d1ad26dcc9.png)

   * The user can see a dashboard where it can make a multiple days booking
  
![Screen Shot 2021-10-25 at 6 56 34 AM](https://user-images.githubusercontent.com/81398850/138700229-b481ecfe-37b8-40c8-91f4-8edba8e58627.png)

   * The user can see all available rooms for those dates and filter them by room type
  
![Screen Shot 2021-10-25 at 6 57 10 AM](https://user-images.githubusercontent.com/81398850/138700452-288e9b99-7810-41a8-937c-3094c5c155f6.png)

   * The user can see a booking preview before booking
   
![Screen Shot 2021-10-25 at 6 57 25 AM](https://user-images.githubusercontent.com/81398850/138700670-12786512-c699-48d8-ab62-2539f1857e67.png)


## Programming Languages and Dependencies

**This app was developed using:**

- HTML
- CSS
- SCSS
- JavaScript
- NPM
- Mocha/Chai 
- Fetch API
- Webpack
- Dayjs

## Wins and Challenges

**Wins**

- Solidified understanding and application of asynchronous JS
- Proficient management of accessibility standards achieving a score of 100 by lighthouse report
- Proficient use of iterator methods combining 3 data sets to return an user request keeping a performance above 95 by lighthouse report
- Demonstrated solid understanding of OOP by having 4 classes interacting with each other containing all the necessary logic inside.
- Solid implementation of TDD by writing all test and the implementation later, making sure the functionality of each class performed as planned.
- Proficient use of Github projects feature including issues to plan an execute project within 1 week
- Use of SCSS files to style the application while keeping DRY code

**Challenges**

- On the planning stage it was a challenge to try to anticipate all the different behaviors an properties that my classes needed to fullfil SRP and OOP standards.
- During the implementation it was a challenge to anticipate sad paths for the test suites.

## Future Additions

- Add a manager feature.
- Make the app responsive to different screen sizes.
- Improve styling by adding micro-modals, icons and more details to the elements.

## Contributions

_This app was developed by:_

- [Carlos Gomez](https://github.com/karmacarlos)

_Carlos Gomez student of front-end engineering at the Turing School of Software & Design._

**Project Manager**

- [Hannah Hudson](https://github.com/hannahhch)

[Project spec](https://frontend.turing.edu/projects/overlook.html) and assets provided by the [Turing School of Software & Design](https://turing.edu/).
