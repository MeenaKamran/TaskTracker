var mongoose = require('mongoose');
var UserParent = mongoose.model('UserParent');
var UserChild = mongoose.model('UserChild');

module.exports = (function () {
	return {
		addChild: function(req, res){
			console.log("in addChild method of userChilds controller");
			console.log("req.params.parentId: ", req.params.parentId);
			UserParent.findOne(({_id: req.params.parentId}), function(err, result) {
				var ChildUser = new UserChild({userName: req.body.userName, childName: req.body.childName, password: req.body.password});
				ChildUser._userParent = result._id;
				result._children.push(ChildUser);
				ChildUser.save(function(err){
					if (err) {
						console.log("error saving new Child ", err);
					} else {
						console.log("Successfully saved the child");
						result.save(function(err, output){
							if (err){
								console.log("Couldn't saved the child within the ParentUser array ", err);
							} else {
								console.log("Successfully saved the ParentUser with the newChild ", output);
								res.json(output);
							}
						})
					}
				})
			})
		},

		getChildren: function(req, res){
			UserParent.find({_id: req.params.parentId}).populate('_children').exec(function(err, results){
				if (err) {
					console.log("error retreiving the Children within the userParent collection: ", err);
				} else {
					console.log("Successfully retreived the Children for that userParent ", results);
					res.json(results);
				}
			})
		},

		delChild: function(req, res){
			console.log("in delChild, of userChilds controller");
			UserChild.remove({_id:req.params.childId}, function(err, result){
				if (err){
					console.log("there was an error deleting the child ", err);
				} else {
					console.log("Successfully deleted the child ");
					UserParent.update(({_id:req.params.parentId},{$pullAll:{_children:[req.params.childId]}}), function(err, result){
						if (err) {
							console.log("Couldn't find the UserParent, in order to remove the child from the Children array ", err);
						} else {
							console.log("found the ParentUser, in order to delete the child from the _children array ", result);
							res.json(result);
						}
					})
				}
			})
		},

		editChild: function(req, res){
			console.log("in editChild, req.body is: ", req.body);

			UserChild.findByIdAndUpdate(req.body._id,{userName: req.body.userName, childName:req.body.childName, password:req.body.password}, function(err, result){
				if (err) {
					console.log("Error updating the childUser: ", err);
				} else {
					console.log("Successfully updated the ChildUser: ", result);
					res.json(result);
				}
			})
		}

	}
}) ();