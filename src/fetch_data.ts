/*--------

	This script will: 
	-  fetch users data and will store them inside {db:master , collection: users}
	-  fetch posts and comments and will map the result inside {db:`${userId}` , collection: posts }

--------*/


import * as https from 'https';

// Load the keys from .env file

import { load } from 'dotenv';

load();

// Load utility functions and db

import FX from './functions';

import db from './db';

// fetch users data and store in master db

console.log("Fetching data,\nPlease Wait...\n\n");

https.get(process.env.FETCH_USERS,res=>{
	let response='';
	
	res.on('data',data=>response+=data);

	res.on('end',()=>db.collection('users').insertMany(JSON.parse(response)));
});

/* fetch posts and comments,
   map comments with postId,
   and store the posts over users DB
*/

https.get(process.env.FETCH_POSTS,res=>{
	let response='';
	
	res.on('data',data=>response+=data);

	res.on('end',()=>{

		let posts = JSON.parse(response);

		https.get(process.env.FETCH_COMMENTS,res=>{
			
			let response='';
			
			res.on('data',data=>response+=data);

			res.on('end',()=>{

				let comments = JSON.parse(response);

				FX.mapCommentsToPosts(posts,comments)
				.then(posts=>

					FX.storePostsToUsersDb(db,posts)
					.then(response=>{
						console.log("final response :\n",response);
						process.exit(0);
					})
					.catch(err=>console.log(err))
				);
			});
		});
	});
});