TaskCollection = new Mongo.Collection('taskCollection')		//Create a new collection via MongoDB

if (Meteor.isClient){		//If it is a client (Internet browser) connecting.

	Template.body.helpers({
		task: function (){		//When 'task' is refrenced 
			return TaskCollection.find({}, {sort: {createdAt: -1}});	//Get all the objects from the TaskCollection, ordered from newest to oldest.
		}
	})

	Template.body.events({
		'submit #messageInput': function (event){		//When the 'sumbit' action is performed by the element with the id of 'messageInput', pass the event information to a function.
			TaskCollection.insert({						//Add data to the TaskCollection.
				text: event.target.message.value,		//The text of the task.
				createdAt: new Date()					//The current date, used to show the newly added tasks first.
			})
			event.target.message.value = ""				//Clear the text input field
			return false								//Prevent the entire webpage from refreshing
		}
	})

}