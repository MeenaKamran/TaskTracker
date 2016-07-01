var mongoose = require('mongoose');
var UserChild = mongoose.model('UserChild');
var TaskList = mongoose.model('TaskList');

module.exports = (function () {
	return {
		showTasks: function(req, res){
			UserChild.find({_id:req.params.childId}).populate('_taskList').exec(function(err, result) {
				if (err) {
					console.log("there was an error retreiving the TaskList for that child. ", err);
				} else {
					console.log("Successfully retreived the TaskList: ", result);
					res.json(result);
				}
			})
		},
		addTask: function(req, res){
			console.log("in addTask method of taskLists controller");
			console.log("req.body: ", req.body);
			console.log("req.body._userChild: ", req.body._userChild);
			UserChild.findOne({_id: req.body._userChild}, function(err, result){
				if (err){
					console.log("Couldn't find that child, when adding a task! ", err);
				} else {
					var choreList = new TaskList({taskDesc:req.body.taskDesc, points:req.body.points, when:req.body.when});
					choreList._userChild = result._id;
					result._taskList.push(choreList);
					choreList.save(function(err){
						if (err) {
							console.log("couldn't save the task, for that child! ", err);
						} else {
							console.log("Successfully saved the task, for that child! ");
							result.save(function(err, output){
								if (err) {
									console.log("Couldn't push the task in the _taskList, for that child! ", err);
								} else {
									console.log("Successfully push the task in the _taskList, for that child! ", output);
									res.json(output);
								}
							})
						}
					})
				}
			})
		},
		editTask: function(req, res){
			console.log("in editTask method of taskLists controller");
			console.log("req.body: ",req.body);
			TaskList.findByIdAndUpdate(req.body._id,{taskDesc:req.body.taskDesc, points:req.body.points, when:req.body.when}, function(err, result){
				if (err){
					console.log("Error updating the task");
				} else {
					console.log("Successfully updated the task in taskLists: ",result);
					res.json(result);
				}
			})
		},
		deleteTask: function(req, res){
			console.log("in deleteTask method of taskLists controller");
			console.log("req.body: ",req.body);
			TaskList.remove({_id:req.body._id}, function(err, result){
				if (err){
					console.log("there was an error deleting the task from taskList ", err);
				} else {
					console.log("Successfully deleted the task from taskList: ");
					UserChild.update(({_id:req.body._userChild},{$pullAll:{_taskList:[req.body._id]}}), function(err, result){
						if (err){
							console.log("Couldn't remove the taskId from the _taskList in UserChild: ", err);
						} else {
							console.log("Successfully removed the taskId from the _taskList in UserChild: ", result);
							res.json(result);
						}
					})
				}
			})
		}
	}

}) ();