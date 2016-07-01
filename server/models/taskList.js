var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskListSchema = new mongoose.Schema({
		_userChild: {type: Schema.Types.ObjectId, ref: 'UserChild'},
		taskDesc: {type: String, minlength:5, required:true},
		points: {type: Number},
		when: {type: String},
		_days: [{type: Schema.Types.ObjectId, ref: 'Dates'}]
}, {timestamps: true});
mongoose.model('TaskList', TaskListSchema);