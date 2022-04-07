# DA219A-FullStack-Lab1

# Project Title
DA217A - Lab1: A simple 2FA password generator.

## Description
A simple 2FA password generator where the password is refreshed every 12 seconds, or upon manual refresh of the webpage.

### Dependencies
* nodemon: v2.0.15
* axios: v0.25.0
* moment: v2.29.1
* randomstring: v1.2.2

### Installing
* Clone from github https://github.com/sam-hur/DA217A-backend-lab1 or download as zip.
* Ensure `npm` is configured on the system
* If required to install dependencies manually:
	> npm i nodemon --save-dev;
	> npm i moment axios randomstring -S;

### Executing the program (Terminal)
* Step 1: Open a UNIX terminal e.g., GitBash
* Step 2: Make sure npm is installed
* Step 2: Download the appropriate NPM modules according to the package.json file
* Step 3: (Optional) Download nodemon globally using npm.
* Step 4:
			Run as user: 
			``` 
				npm start
			``` 
			(Optional) Run as dev using nodemon:
			```
				npm run dev
			```
* Step 4: The app should open in your default web-browser. Tested on Chrome and Microsoft Edge.
* Step 5: If the app did not open, then navigate manually to the following address:
			```
				http://localhost:3000
			```
* Step 6: Enjoy!

### Executing the program (Heroku)
* Step 1: Simply navigate to 

## Authors
Sam Hurenkamp

## Version History
* 1.0.0
    * Initial Release

## License
ISC
