

var express = require('express');
var router = express.Router();
var db = require('../db');
//


router.get('/item/:ID/delete', function(req, res, next){
  let query = "SELECT * FROM Menu WHERE ID = ?"
  db.get().query(query, [req.params.ID], function(err, row){
    if (err) {
      res.send("There was a database error: " + err);
    }
    
    res.render('confirm',{item: row})

  })
})

router.post('/item/:ID/delete',function(req, res, next){
  let query = "DELETE FROM Menu WHERE ID = ?"
  db.get().query(query, [req.params.ID], function(err, row){
    if (err) {
      res.send("There was a database error: " + err);
    }
    
    res.redirect("/")

  })
})


router.get('/item/:ID/detail', function(req, res, next){
  let query = 'SELECT * FROM taste JOIN Menu on taste.ID = Menu.otherid Where Menu.ID = ?';
  db.get().query(query, [req.params.ID], function(err, row){
    if(err){
      res.send("There was a database error: " + err);
    }
    res.render('detail', {items: row});

  })



})
//
//
router.get('/item/:ID', function(req,res,next){
  let query = "SELECT * FROM taste JOIN Menu on taste.ID = Menu.otherid Where Menu.ID = ?";
  db.get().query(query, [req.params.ID],function(err, row){
    if (err) {
      res.send("There was a database error: " + err);
    }
    res.render('edit', {item: row[0]});
  });
});

router.post('/item/:ID', function(req,res,next){
  let query = "UPDATE Menu SET Name=?, Recipe=?, Country=? WHERE id=?";
  
  db.get().query(query,[req.body.Name,req.body.Recipe,req.body.Country, req.params.ID], function(err,row){
   
    if(err){
      res.send("There was a database error: " + err);
    }
    res.redirect('/')
  });


});
//


//
router.get('/create', function(req, res, next){
  let query = 'SELECT * FROM taste ';
  db.get().query(query,function(err,rows){
    res.render('create',{rows:rows});


  })

});

router.post('/create', function(req, res, next){
  let query = "INSERT INTO Menu (Name, Recipe, Country,Description, otherid) VALUES (?, ?, ?, ?, ?)";
  db.get().query(query,[req.body.Name,req.body.Recipe,req.body.Country,req.body.Description,req.body.Taste], function(err,rows){
    if(err){
      res.send("There was a database error: " + err);
    }
    res.redirect('/');
  })
});


/* publisher publisherid forigien Combine those two */
/*
router.get('/', function(req, res, next){
  let query = "SELECT * FROM Menu ";
  let parameters =  [];
  
  if (req.query.sort){
  if (req.query.order == 'DESC'){
    query += ' ORDER BY ' + req.query.sort + " DESC";
  } else {
    query += ' ORDER BY ' + req.query.sort + " ASC";
}
}
db.get().query(query, parameters, function(err, row, sort, order){
  if (err) {
    res.send("There was a database error: " + err);
  }
  res.render('index',{items:row, sort:req.query.sort, order:req.query.order})
});
});

*/
router.get('/', function(req, res, next) {
  let query = 'SELECT * FROM taste JOIN Menu on taste.ID = Menu.otherid';
  let parameters=[];
  if(req.query.q){
   query += " WHERE Name LIKE ?";
   parameters.push('%' + req.query.q + '%');
  }
  if(req.query.w){
    query += " WHERE Recipe LIKE ?";
    parameters.push('%' + req.query.w + '%');
   }
   if(req.query.e){
    query += " WHERE Country LIKE ?";
    parameters.push('%' + req.query.e + '%');
   }
   if(req.query.r){
    query += " WHERE taste LIKE ?";
    parameters.push('%' + req.query.r + '%');
   }
   

  

  if (req.query.sort){
    if (req.query.order == 'DESC'){
      query += ' ORDER BY ' + req.query.sort + " DESC";
    } else {
      query += ' ORDER BY ' + req.query.sort + " ASC";
  }
  }

  db.get().query(query, parameters, function(err, row, sort, order){
    if (err) {
      res.send("There was a database error: " + err);
    }
    res.render('index',{items:row, sort:req.query.sort, order:req.query.order})
  });

  
});



//taste


router.get('/taste', function(req, res, next){
  let query = 'SELECT * FROM taste ';
  db.get().query(query,function(err,row){
    res.render('taste',{rows:row});
  })

});

router.get('/taste/:ID/delete', function(req, res, next){
  let query = "SELECT * FROM Menu WHERE otherid = ? "
  db.get().query(query, [req.params.ID], function(err, row){
    let query = "SELECT * FROM taste WHERE ID = ?"
      db.get().query(query, [req.params.ID], function(err, row2){
       
        if (err) {
          res.send("There was a database error: " + err);
        }else if(row.length>0){
          res.render('deletewrong',{item: row})
        }else{
          res.render('confirmtaste',{item: row2})
      }
    
        
      })

    

  })
})

router.post('/taste/:ID/delete',function(req, res, next){
  let query = "DELETE FROM taste WHERE ID = ?"
  db.get().query(query, [req.params.ID], function(err, row){
    if (err) {
      res.send("There was a database error: " + err);
    }
    
    res.redirect("/taste")

  })
})

router.get('/taste/:ID', function(req,res,next){
  let query = "SELECT * FROM taste Where ID = ?";
  db.get().query(query, [req.params.ID],function(err, row){
    if (err) {
      res.send("There was a database error: " + err);
    }
    res.render('tasteedit', {item: row[0]});
  });
});

router.post('/taste/:ID', function(req,res,next){
  let query = "UPDATE taste SET taste=? WHERE ID=?";
  
  db.get().query(query,[req.body.taste,req.params.ID], function(err,row){
    if(err){
      res.send("There was a database error: " + err);
    }
    res.redirect('/taste')
  });
});


router.get('/createtaste', function(req, res, next){
  let query = 'SELECT * FROM taste ';
  db.get().query(query,function(err,rows){
    res.render('createtaste',{rows:rows});


  })

});

router.post('/createtaste', function(req, res, next){
  let query = "INSERT INTO taste (taste) VALUES (?)";
  db.get().query(query,[req.body.taste], function(err,rows){
    if(err){
      res.send("There was a database error: " + err);
    }
    res.redirect('taste');
  })
});






 module.exports = router;