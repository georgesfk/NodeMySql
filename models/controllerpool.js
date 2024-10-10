const conn = require('./mysqlconfig.js')

// avec callback
// exports.findAll = function(nomtable,callback) {
//        let sql = "SELECT * FROM " + nomtable ;
//        conn.query(sql, function(err,rows) {
//               if (err) { console.log(err); }
//                callback(rows)
//        })
// }


// retour avec promesse 
exports.findAll = function(nomtable) {
       return new Promise((resolve, reject) => {
       const sql = "SELECT * FROM " + nomtable;
       conn.query(sql, (err, rows) => {
       if (err) {
       console.error(err);
       return reject(err);
       }
       resolve(rows);
       });
       });
       };



exports.addArticle = function( datas , callback ) {
      // console.log(datas.pri)
       conn.query("INSERT INTO article (nom,prix) VALUES (?,?)",[datas.nom,datas.prix],function(err){
              if (err) { console.log(err); }
              callback();
       }) ;
}