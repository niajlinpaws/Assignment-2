import * as createError from 'http-errors';

import * as express from 'express';

import * as path from 'path';

import { load } from 'dotenv';

load();

import usersRouter from './routes/users';

const port: any = process.env.PORT || 3000;

const app: express.Application = express();
	

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/users',usersRouter);

// catch 404 and forward to error handler
app.use(function(req : express.Request, res : express.Response, next: express.NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req : express.Request, res : express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

});

app.listen(port,()=>console.log(`Server started,\n\nListening on port:${port}`));