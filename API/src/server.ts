import express from 'express';

const app = express();

app.get('/', (request, response)=>{
    return response.json({message: 'ta no ar, pega ele ai cpx hahaha. ta2.'})
})

app.listen(3333, ()=>{
    console.log('server started on port: 3333!');
});
