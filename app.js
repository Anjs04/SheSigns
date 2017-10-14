var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});

// Add global LUIS recognizer to bot
var luisAppUrl = process.env.LUIS_APP_URL || 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/82bca758-4b23-4790-83c0-aa82ed0ec5ef?subscription-key=0490ffc5956a4e36897c32f1544f55ea&timezoneOffset=0&verbose=true&q=';
bot.recognizer(new builder.LuisRecognizer(luisAppUrl));



bot.dialog('throw smth', [
    function (session, args, next) {
      // try extracting entities
if(args.intent && args.intent.entities)
{
  var personEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'person');
  var throwableObjectEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'throwableObject');
  var throwingVerbEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'throwingVerb');

  console.log(personEntity);
  console.log(throwableObjectEntity);
  console.log(throwingVerbEntity);

  if(throwableObjectEntity)
  {
    //session.send(personEntity.entity);
    if(throwableObjectEntity.entity === 'ball')
    {
      session.send({
            text: "You sent:",
            attachments: [
              {
                contentType:"video/mp4",
                contentUrl: "http://media.auslan.org.au/mp4video/76/7630_1.mp4",
                name: "person/object"
              },
              {
                contentType:"video/mp4",
                contentUrl: "http://media.auslan.org.au/mp4video/56/56590_1.mp4",
                name: "throw"
              },
                {
                    contentType:"video/mp4",
                    contentUrl: "http://media.auslan.org.au/mp4video/30/30140_1.mp4",
                    name: "ball"
                }
            ]
        });
    }
    elseif(throwableObjectEntity.entity === 'can')
    {
      session.send({
            text: "You sent:",
            attachments: [
              {
                contentType:"video/mp4",
                contentUrl: "http://media.auslan.org.au/auslan/49/4930.mp4",
                name: "girl"
              },
              {
                contentType:"video/mp4",
                contentUrl: "http://media.auslan.org.au/mp4video/56/56590_1.mp4",
                name: "throw"
              },
                {
                    contentType:"video/mp4",
                    contentUrl: "http://media.auslan.org.au/auslan/46/46050.mp4",
                    name: "can"
                }
            ]
        });
    }
  }
}

//var object = session.dialogData.throwableObject =
       // session.send("step1");
       session.send({
             text: "You sent:",
             attachments: [
               {
                 contentType:"video/mp4",
                 contentUrl: "http://media.auslan.org.au/auslan/49/4930.mp4",
                 name: "girl"
               },
               {
                 contentType:"video/mp4",
                 contentUrl: "http://media.auslan.org.au/mp4video/56/56590_1.mp4",
                 name: "throw"
               },
                 {
                     contentType:"video/mp4",
                     contentUrl: "http://media.auslan.org.au/mp4video/30/30140_1.mp4",
                     name: "ball"
                 }
             ]
         });

        session.endDialog();
    }]).triggerAction({
    matches: 'throw smth'
});
