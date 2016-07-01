var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserChildSchema = new mongoose.Schema({
	userName: {type:String, required: true},
	childName: {type:String, required: true},
	password: {type:String, required: true},
	_userParent: {type: Schema.Types.ObjectId, ref:'UserParent'},
	_taskList: [{type: Schema.Types.ObjectId, ref: 'TaskList'}]
}, {timestamps: true });
mongoose.model('UserChild', UserChildSchema);
