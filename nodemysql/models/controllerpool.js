const conn = require('./mysqlconfig.js')

exports.findAll = function(nomtable,callback) {
       let sql = "SELECT * FROM " + nomtable ;
       conn.query(sql, function(err,rows) {
              if (err) { console.log(err); }
               callback(rows)
       })
}

exports.addArticle = function( datas , callback ) {
      // console.log(datas.pri)
       conn.query("INSERT INTO article (nom,prix) VALUES (?,?)",[datas.nom,datas.prix],function(err){
              if (err) { console.log(err); }
              callback();
       }) ;
}

