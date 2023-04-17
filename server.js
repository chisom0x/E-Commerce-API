const mongoose = require('mongoose')
const createSearchEndpoint = require('./Controllers/searchController');
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})
const app = require('./app')


const DB = process.env.DATABASE

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>console.log('DB connected'))

app.use('/api/ecommerce/search', createSearchEndpoint(mongoose.connection.collection('search')));

const port = 3000
app.listen(port, ()=>{
    console.log(`Listening on ${port}`)
})