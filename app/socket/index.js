/*
 *
 * Primary file for socket module
 */
'use strict';
const helper = require('../helpers');

module.exports = (io,app) => {
    let allrooms = app.locals.chatroom;

    io.of('/roomsList').on('connection', socket => {
        socket.on('getChatRooms', () => {
            socket.emit('chatRoomsList', JSON.stringify(allrooms)); 
        });

        socket.on('createNewRoom', newRoomInput => {
            // // Check to see if a room with the same name exists or not
            // // If not, create one and broadcast it to everyone
            // if (!helper.findRoomByName(allrooms, newRoomInput)){
            //    // create a new room and broadcast to all
            //     allrooms.push({
            //         room: newRoomInput,
            //         roomID: helper.randomHex(),
            //         users: []
            //     });

            //     // Emit an updated list to the creator
            //     socket.emit('chatRoomsList', JSON.stringify(allrooms));
            //     // Emit an updated list to the world!
            //     socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
            // }
            console.log(newRoomInput);
        });
    });
}
