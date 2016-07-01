var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserParentSchema = new mongoose.Schema({
	firstName: {type:String, required: true},
	lastName: {type:String, required: true},
	email: {type:String, required: true},
	password: {type:String, required: true},
	_children: [{type: Schema.Types.ObjectId, ref:'UserChild'}]
}, {timestamps: true });
mongoose.model('UserParent', UserParentSchema);