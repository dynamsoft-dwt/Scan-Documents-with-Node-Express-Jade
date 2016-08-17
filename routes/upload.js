var express = require('express'); 
var router = express.Router(); 
var multer = require('multer');

router.use(multer({dest:"./UploadedImages/", 
	rename: function (fieldname, filename) {
		return filename;
	},
	onFileUploadStart:function(file){
		console.log("upload start");
	},
	onFileUploadComplete:function(file){
		console.log("upload complete");
	}
}));
router.use(function(req,res,next){
	res.end();
});

module.exports = router;