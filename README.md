# Assignment-2

An application to read and modify users and their posts.

Project Setup

1. npm install
2. create a .env file and add the following parameters:

	PORT=<PORT>

	# Database

	MONGO_URI = <MONGODB CONNECTION STRING>

	# Endpoints

	FETCH_USERS = https://jsonplaceholder.typicode.com/users
	FETCH_POSTS = https://jsonplaceholder.typicode.com/posts
	FETCH_COMMENTS = https://jsonplaceholder.typicode.com/comments	

3. start mongod instance

4. npm run build 
    -  First, it will compile typescript from ./src folder to javascript inside ./build .
    -  Second, it will fetch data from endpoints and store them inside DB according 
   	  to respective users.
    -  Lastly, it will start the server to receive incoming requests.

5. Alternatively,
	- compiling ./src can be run seperately: npm run tsc 
	- fetching data from endpoints can be run as seperate service : npm run fetch_data
	- And, server can also start as a separate service: npm start 
