import {connect} from 'mongoose';

export async function startConnection() {
   await connect('mongodb+srv://suco:suco@cluster0-v4pj1.mongodb.net/test?retryWrites=true&w=majority',{
       useNewUrlParser: true,
       useUnifiedTopology: true
   });
   console.log('Database is connected');
}

