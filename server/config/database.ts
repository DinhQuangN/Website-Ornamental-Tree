import mongoose from 'mongoose';

mongoose
	.connect(`${process.env.MONGO_DB}`, {
		retryWrites: true,
		w: 'majority'
	})
	.then(() => console.log('DB connect success'))
	.catch(error => console.log(error));
