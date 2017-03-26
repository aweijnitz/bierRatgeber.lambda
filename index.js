'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = "amzn1.ask.skill.d3bccf1d-bf41-4135-9518-1d33d982bb71";  // TODO replace with your app ID (OPTIONAL).

var languageStrings = {
    "en": {
        "translation": {
            "FACTS": [
                "A Helles!",
                "Ein Augustiner",
                "A Weissen",
                "A Kellerbier",
                "A kaltes Export!",
                "Aun Tegernseer"
            ],
            "SKILL_NAME" : "Bier ratgeber",
            "GET_FACT_MESSAGE" : "Here you go! Have: ",
            "HELP_MESSAGE" : "You can say tell me what to have, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Cheers! and Goodbye!"
        }
    },
    "en-US": {
        "translation": {
            "FACTS": [
                "A Helles!",
                "Ein Augustiner",
                "A Weissen",
                "A Kellerbier",
                "A kaltes Export!",
                "Aun Tegernseer"
            ],
            "SKILL_NAME" : "German Beer Companion"
        }
    },
    "en-GB": {
        "translation": {
            "FACTS": [
                "A Helles!",
                "Ein Augustiner",
                "A Weissen",
                "A Kellerbier",
                "A kaltes Export!",
                "Aun Tegernseer"
            ],
            "SKILL_NAME" : "German Beer Companion"
        }
    },
    "de": {
        "translation": {
            "FACTS": [
                "A Helles!",
                "Ein Augustiner",
                "A Weissen",
                "A Kellerbier",
                "A kaltes Export!",
                "Aun Tegernseer"
            ],
            "SKILL_NAME" : "Bier Ratgeber",
            "GET_FACT_MESSAGE" : "Klar gib's Bier! Hier, nimm: ",
            "HELP_MESSAGE" : "Du kannst sagen, „Frage Bier Ratgeber“, oder du kannst „Beenden“ sagen... Bier Hier",
            "HELP_REPROMPT" : "Wie kann ich dir helfen? Hast du durst auf Bier?",
            "STOP_MESSAGE" : "Prost!"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        var factArr = this.t('FACTS');
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];

        // Create speech output
        var speechOutput = this.t("GET_FACT_MESSAGE") + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};