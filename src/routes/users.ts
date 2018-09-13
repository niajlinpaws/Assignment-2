import { Router, Request, Response , NextFunction } from 'express';

const router: Router = Router();

import db from '../db';

import DM from '../display_messages';

/* GET users listing. */
router.get('/:id?', function(req: Request, res: Response, next: NextFunction) {
	var {id} = req.params;
	
	db.collection('users').find(id ? {id:id*1}:{}).toArray((err : Error,data)=>{
	  	if(err) return next(err);		

	  	return res.status(200).json({
	  		data,
	  		message:DM.done
	  	});
	});
});

/* GET users posts listing by userId. */
router.get('/:id/posts', function(req: Request, res: Response, next: NextFunction) {
  	var {id} = req.params;

	db.useDb(id).collection('posts').find({}).toArray((err : Error,data)=>{
	  	if(err) return next(err);

	  	return res.status(200).json({
	  		data,
	  		message:DM.done
	  	});
	});	
});

/* UPDATE an user. */
router.patch('/:id', function(req: Request, res: Response, next: NextFunction) {
  	var {id} = req.params;

	db.collection('users').updateOne({id:id*1},{$set:req.body},(err : Error,data)=>{
	  	if(err) return next(err);

	  	return res.status(200).json({
	  		data,
	  		message:DM.done
	  	});
	});
});

export default router;