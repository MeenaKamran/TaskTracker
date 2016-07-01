var mongoose = require('mongoose');
var UserParent = mongoose.model('UserParent');
var UserChild = mongoose.model('UserChild');

module.exports = (function() {
	return {
		registerParent: function(req, res){
			console.log("req.body ", req.body);
			var newUserParent = UserParent({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.pswd});
			newUserParent.save(function(err, result){
				if (err) {
					console.log("was not able to save the UserParent, while registering");
				} else {
					console.log("Successfully registered and saved the UserParent");
					res.json(result);
				}
			})
		},

		loginParent: function(req, res){
			console.log("req.params.email & req.params.pswd: ", req.params.parentEmail, req.params.parentPswd);
			UserParent.find({email: req.params.parentEmail, password: req.params.parentPswd}).populate('_children').exec(function(err, result){
				if (err) {
					console.log("error finding the parent, parent doesn't exist ", err);
				} else {
					console.log("Successfully found the parent user ", result);
					// console.log("Children are ", result);
					res.json(result);
				}
			})
		}

	}

}) ();