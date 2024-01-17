export const MESSAGES = [
    {
        id: 0,
        from: "canberk@hacettepe.edu.tr",
        to: "brad@hacettepe.edu.tr",
        message: "Hello there",
        timestamp: 0,
        type: "unread",
        status: "okay",
    },
];

export default class MessageModel {
    constructor(id, from, to, message, timestamp, type, status) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.message = message;
        this.timestamp = timestamp;
        this.type = type;
        this.status = status;
    }

    get() {
        return {
            id: this.id,
            from: this.from,
            to: this.to,
            message: this.message,
            timestamp: this.timestamp,
            type: this.type,
            status: this.status,
        };
    }
}
