import MessageModel, { MESSAGES } from "../models/Message.model";

export default class MessageController {
    getMessagesByEmail(email) {
        if (!email) throw new Error("Email cannot be empty");

        return MESSAGES.filter(
            (message) => message.from === email || message.to === email
        );
    }

    sendMessage(from, to, message, timestamp, type, status) {
        if (!from || !to || !message || !timestamp || !type || !status)
            throw new Error("Please enter a valid message");

        const id = Math.random().toString(16).slice(2);
        const message = new MessageModel(
            id,
            from,
            to,
            message,
            timestamp,
            type,
            status
        );

        MESSAGES.push(message.get());
    }

    removeMessage(id) {
        if (!id) throw new Error("Please enter an id");

        const index = MESSAGES.findIndex((message) => message.id === id);
        if (index === -1)
            throw new Error("Cannot find the message by given id");

        MESSAGES.splice(index, 1);
    }

    getMessageWith(user, another) {
        if (!user || !another) throw new Error("Please enter all the details");

        const messages = MESSAGES.filter(
            (message) =>
                (message.from === user && message.to === another) ||
                (message.to === user && message.from === another)
        );

        return messages;
    }
}
