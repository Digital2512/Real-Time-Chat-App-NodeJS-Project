# Real-time Chat Application

## Overview

This project is a simple real-time chat application built using HTML, CSS, JavaScript, and Node.js with Socket.IO. The application allows users to join a public chat room, send private messages to individual users, or create and join group chats. The application also supports the retrieval of chat histories for public, private, and group messages.

## Features

- **User Authentication**: Users can join the chat by entering their username.
- **Public Chat**: Users can participate in a public chat room where messages are visible to all connected users.
- **Private Messaging**: Users can send private messages to individual users.
- **Group Chat**: Users can create and join group chats, where messages are visible only to members of the group.
- **Chat History**: Users can view the chat history for public, private, and group messages.
- **User List**: Displays a list of all connected users.
- **Group Management**: Users can create and join groups dynamically.

## File Structure

- **index.html**: The main HTML file containing the user interface for the chat application.
- **style.css**: Basic styling for the chat application.
- **app.js**: The client-side JavaScript file that handles the Socket.IO communication and user interactions.
- **server.js**: The server-side Node.js file that sets up the server, handles Socket.IO events, and manages the chat logic.

## Future Enchancements

- **Authentication**: Implement user authentication to secure private and group chats.
- **Encryption**: Encrypt messages to protect user privacy.
- **User Interface**: Enhance the UI to make it more user-friendly and responsive.
- **Persistent Storage**: Store messages in a database to persist chat history across server restarts.