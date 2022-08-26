
import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId


export const CommentSchema = new Schema({
  eventId: {type: ObjectId, required: true, ref: 'Event'},
  creatorId: {type:ObjectId, required: true},
  body: {type: String}
},{
timestamps: true, toJSON: {virtuals: true}

})

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true

})

CommentSchema.virtual('Event', {
  localField: 'eventId',
  foreignField: '_id',
  ref: 'Event',
  justOne: true
})

