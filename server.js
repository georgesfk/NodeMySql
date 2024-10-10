const express = require('express') // npm i express --save 
const jsonfile = require("jsonfile")
const port = 8080 ;
const app = express(); 

const bdd = require('./models/controllerpool.js')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// on déclare le répertoire des vues ainsi  
app.set('views', __dirname + '/views');
// on déclare le moteur de template à utiliser (ici ejs pour embedded js)
app.set("view engine", "ejs") 

//-- Routage -- 
app.get('/', function(req,res){
    res.render("index")
})

app.get('/data1', function(req,res) {
    res.render("data1",{ message : "voici le message pour data1", cpt:12 })
})

app.get('/data2/:etudiant/:lid', function(req,res) {
    console.log(req.params)
    res.render("data2",{ etudiant : req.params.etudiant, sonid: req.params.lid })
})


app.get('/data3', function(req,res) {
   jsonfile.readFile('donnees.json','utf-8',function (err,datas) {
      if (err) {
        // gérer l'erreur
      }
        res.render("data3",{ datas : datas } )
    })
    /* 
    dans donnees.json
    {
        "resultat1" : "resultat un ",
        "resultat2" : 4444
    }
    */
})

//c méthode avec comme argument 2 -> fonction de callback (obsolète)
// app.get('/data4', function(req,res) {
//      bdd.findAll("article", function(articles){
//         console.log(articles);
//         res.render("data4",{ articles: articles })
//      })
// })


app.get('/data4', async function(req, res) {
    try {
    const articles = await bdd.findAll("article");
    console.log(articles);
    res.render("data4", { articles: articles });
    } catch (error) {
    console.error(error);
    res.status(500).send("un pb est survenu sur l'appel findAll article.");
    }
   });
   

// affichage du formulaire
app.get('/form1', function(req,res) {
    res.render("form1")
})

 app.post("/add_article",function(req,res){
    console.log(req.body)
    bdd.addArticle(req.body,function(){
        console.log("article ajouté")
        res.json({ok:"ok"})
    })
 })

app.listen(port, function() {
    console.log("j'ecoute sur le port " + port ) 
})
