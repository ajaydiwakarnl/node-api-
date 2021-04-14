const
    mongoose = require('mongoose');
    mongoose.connect(' mongodb://127.0.0.1:27017/angular-admin', { useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
        if(err){
            console.log('error in connection' + err);
        }else{
            console.log('success in connection');
        }
    });

mongoose.set('useFindAndModify', false);

