/*
######################################
#              #INFO#                #
#              ######                #
#                                    #
#       Filename: reloadEvent.js     #
#    Description: Exports one        #
#    instance of EventEmitter.       #
#      What this script does:        #
#     exports an EventEmitter        #
#                                    #
#                                    #
#                                    #
#                                    #
#                                    #
#                                    #
######################################
*/
const event = require("events")
module.exports = new event.EventEmitter()
