const app = require('express')()
const MongoClient = require('mongodb').MongoClient
const port = process.env.PORT || 7777

const bodyParser = require('body-parser')

const urlLocal = '127.0.0.1:27017/test'
const urlMLab = 'ntpsan:admin@ds145329.mlab.com:45329/research-ntp'

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

MongoClient.connect('mongodb://' + urlMLab, function (err, db) {
  if (err) return console.log(err)
  console.log('connected to the mongoDB !')
//   this.myCollection = db.collection('test_collection')
  this.myCollection = db.collection('test')
  app.listen(port, function () {
    console.log('Starting node.js on port ' + port)
  })
})

app.get('/', function (req, res) {
  res.send('<h1>Hello Node.js</h1>')
})

app.get('/index', function (req, res) {
  res.send('<h1>This is index page</h1>')
})

app.get('/lists', function (req, res) {
  this.myCollection.find({}).toArray((err, items) => {
    if (err) console.log(err)
    res.json(items)
  })
})

app.get('/user/:id', function (req, res) {
//   var id = req.params.id
  console.log(req.params)
})

app.post('/newuser', function (req, res) {
  var json = req.body
  console.log(req.body)
  this.myCollection.insert({
    band: json.band,
    name: json.name,
    description: json.position
  }, function (err, result) {
    if (err) console.log(err)
    res.send('Add DB ' + json.name + ' Completed!')
  })
// res.send('Add new ' + json.name + ' Completed!')
})
