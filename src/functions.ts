export default {
	mapCommentsToPosts:(posts:any,comments:any)=>new Promise((resolve,reject)=>

		resolve(posts.map(post=>{
			post.comments=comments.filter(comment=>comment.postId === post.id);
			return post;
		}))
	),
	storePostsToUsersDb:(db:any,posts:any)=>{
		
		let postsObj =posts.reduce((obj,currentPost)=>{
			let {userId} = currentPost;	

			if(userId)
			obj[userId]?obj[userId].push(currentPost):obj[userId]=[currentPost];

			return obj;
		},{});

		return Promise.all(Object.keys(postsObj).map(userId=>

			new Promise((resolve,reject)=>{

				db.useDb(`${userId}`).collection('posts').insertMany(postsObj[userId],
					(err,result)=>{
					
					if(err) reject(err);
					
					resolve(`Posts successfully saved to Db with userId : ${userId}`);
				});
			})
		)
	)}
};