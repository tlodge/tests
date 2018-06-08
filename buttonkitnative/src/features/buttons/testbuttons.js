export const testbuttons = [
    {
        "category": "Security",
        "categoryId": "118",
        "buttons": [
            {
                "buttonId": "usersbutton",
                "name": "moosers",
                "description": "users",
                "type": "information",
                "batch": false,
                "returntype": "users"
            }
        ]
    },
    {
        "category": "Concierge",
        "categoryId": "116",
        "buttons": [
            {
                "buttonId": "0x549fe611da61000",
                "name": "takeaway",
                "description": "takeaway menu",
                "type": "action",
                "questions": {

                    "navigation": {

                        "root": "foodtype",

                        "default": {

                            "foodtype": "indianstarters",
                            "indianstarters": "indianmain",
                            "indianmain": "indiandessert",
                            "indiandessert": "indiannotes",
                            "indiannotes": "indiancalculation",
                            "chinesemain": "chinesecalculation"
                        },

                        "rules": {

                            "foodtype": {

                                "completetoproceed": true,

                                "next": [
                                    {
                                        "operator": "equals", "operand": 1, "true": "indianstarters"
                                    },
                                    {
                                        "operator": "equals", "operand": 2, "true": "chinesemain"
                                    }
                                ]
                            }
                        },

                        "options": {
                            "showprogress": true
                        }

                    },

                    "style": {

                    },

                    "library": {

                        "foodtype": {

                            "questionId": "foodtype",

                            "question": "What kind of food would you like?",

                            "description": "",

                            "type": "options",

                            "values": {
                                "options": [
                                    { "value": 1, "label": "indian" }, { "value": 2, "label": "chinese" }
                                ]
                            },

                            "options": {
                                "compulsory": true,
                                "completetoproceed": true,
                                "multiple": false
                            }

                        },

                        "indianstarters": {

                            "questionId": "indianstarters",

                            "question": "Please choose a starter!",

                            "description": "",

                            "type": "options",

                            "values": {
                                "options": [
                                    { "value": "saagstarter", "label": "saag aloo" }, { "value": "papadum", "label": "papadum" }
                                ]
                            },

                            "options": {
                                "compulsory": false,
                                "completetoproceed": false,
                                "autoproceed": true,
                                "multiple": true
                            }
                        },

                        "indianmain": {

                            "questionId": "indianmain",

                            "question": "Please choose a main",

                            "description": "",

                            "type": "options",

                            "values": {
                                "options": [
                                    { "value": "kormamain", "label": "chicken korma" }, { "value": "chickentika", "label": "chicken tika" }, { "value": "dopiaza", "label": "lamb dopiaza" }
                                ]
                            },

                            "options": {
                                "compulsory": true,
                                "completetoproceed": false,
                                "multiple": true
                            }

                        },

                        "indiandessert": {

                            "questionId": "indiandessert",

                            "question": "Please choose a dessert or two",

                            "description": "",

                            "type": "options",

                            "values": {
                                "options": [
                                    { "value": "sweets", "label": "indian sweet selection" }, { "value": "cheesecake", "label": "cheesecake" }
                                ]
                            },

                            "options": {
                                "compulsory": true,
                                "completetoproceed": false,
                                "multiple": true
                            }

                        },

                        "indiannotes": {

                            "questionId": "indiannotes",

                            "question": "Please provide any other info you feel may be relevant",

                            "description": "",

                            "type": "freetext",

                            "values": {},

                            "options": {
                                "compulsory": false,
                                "completetoproceed": true,
                                "length": "large"
                            }

                        },

                        "indiancalculation": {

                            "questionId": "indiancalculation",

                            "question": "Your caluculation",

                            "description": "",

                            "type": "function",

                            "values": {},

                            "options": {
                                "compulsory": true,
                                "completetoproceed": false
                            }
                        },

                        "chinesemain": {

                            "questionId": "chinesemain",

                            "question": "Please choose a chinese main",

                            "description": "",

                            "type": "options",

                            "values": {
                                "options": [
                                    { "value": "duckmain", "label": "duck" }, { "value": "stirfry", "label": "stirfry" }, { "value": "pork", "label": "sweet and sour pork" }
                                ]
                            },

                            "options": {
                                "compulsory": true,
                                "completetoproceed": false,
                                "multiple": true
                            }

                        },

                        "chinesecalculation": {

                            "questionId": "chinesecalculation",

                            "question": "Your caluculation",

                            "description": "",

                            "type": "function",

                            "values": {},

                            "options": {
                                "compulsory": true,
                                "completetoproceed": false
                            }
                        }
                    }
                }
            },
            {
                "buttonId": "0x549fe611da000000",
                "name": "parcel pickup",
                "description": "use this when a parcel is being picked up.",
                "type": "action",
                "batch": false,
                "questions": [
                    {
                        "questionId": "datastoreitem",
                        "question": "the parcel being picked up",
                        "type": "datastoreitem",
                        "values": {
                            "storeId": "parcels"
                        },
                        "number": 1,
                        "persist": false
                    },
                    {
                        "questionId": "signature",
                        "question": "please provide your signature",
                        "type": "signature",
                        "values": {},
                        "number": 2,
                        "persist": false
                    }
                ]
            },
            {
                "buttonId": "0x549fe5ca5b000000",
                "name": "parcel delivery",
                "description": "Use this when a new parcel has been delivered and you want to notify the user and record the parcel on the system",
                "type": "action",
                "batch": true,
                "questions": [
                    {
                        "questionId": "user",
                        "question": "which user would you like to notify?",
                        "type": "users",
                        "values": {},
                        "number": 1,
                        "persist": true
                    },
                    {
                        "questionId": "type",
                        "question": "delivery type",
                        "type": "options",
                        "values": {
                            "options": "amazon,registered letter, parcel, groceries, flowers, other",
                            "multiple": "single",
                            "none": false
                        },
                        "number": 2,
                        "persist": false
                    },
                    {
                        "questionId": "funcy",
                        "question": "your unique parcel(s) code",
                        "type": "function",
                        "values": {
                            "url": "/api/v1/unique"
                        },
                        "number": 3,
                        "persist": false
                    }
                ]
            },
            {
                "buttonId": "0x549fe6e161800000",
                "name": "collected parcels",
                "description": "collected parcels",
                "type": "information",
                "batch": false,
                "returntype": "tabular"
            },
            {
                "buttonId": "0x5564b15bba000000",
                "name": "register",
                "description": "register a user",
                "type": "action",
                "batch": false,
                "questions": [
                    {
                        "questionId": "0x5569b929d0400000",
                        "question": "please provide your details",
                        "type": "register",
                        "values": {},
                        "number": 0,
                        "persist": false
                    }
                ]
            }
        ]
    }
]
