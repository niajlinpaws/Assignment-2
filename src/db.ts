import { createConnection } from 'mongoose';

import { load } from 'dotenv';

load();

export default createConnection(process.env.MONGO_URI,{
	useNewUrlParser : true , 
	poolSize: 10 // Maintain up to 10 socket connections
});