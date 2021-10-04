var express = require('express');
var router = express.Router();
var empModel = require("../modules/users");
var employee = empModel.find({});
/* GET home page. */
router.get('/', function(req, res, next) {
  employee.exec(function(err, data){
    if(err) throw err;
    res.render('index', { title: "City Records" , records : data});
  })
});


router.post("/search/", function(req,res,next){

  var fltrcity = req.body.bycity;
  var fltrpop = req.body.bypop;
  var fltrstate = req.body.bystate;
  console.log(fltrcity);
  console.log(fltrpop);
  console.log(fltrstate);

  if(fltrcity != "" && fltrpop !="" && fltrstate !=""){
    var flterParameter = { $and : [{ city : fltrcity},
       {$and : [{pop : fltrpop},{state : fltrstate}]}]} 
  }else if (fltrcity != "" && fltrpop =="" && fltrstate !=""){
    var flterParameter = { $and : [{ city : fltrcity},{state : fltrstate}]}
  }else if (fltrcity== "" && fltrpop !="" && fltrstate!=""){
    var flterParameter = { $and : [{ pop : fltrpop},{state : fltrstate}]}
  }else if (fltrcity!= "" && fltrpop !="" && fltrstate==""){
    var flterParameter = { $and : [{ pop : fltrpop},{city : fltrcity}]}
  }else if (fltrcity!= "" && fltrpop =="" && fltrstate==""){
    var flterParameter = {city : fltrcity}
  }else if (fltrcity== "" && fltrpop !="" && fltrstate==""){
    var flterParameter = {pop : fltrpop}
  }else if (fltrcity== "" && fltrpop =="" && fltrstate!=""){
    var flterParameter = {state : fltrstate}
  }else{
    var flterParameter ={}
  }
  var employeeFilter = empModel.find(flterParameter);
  employeeFilter.exec(function(err, data){
    if(err) throw err;
    res.render('index', { title: "City Records" , records : data});
  })
})


module.exports = router;
