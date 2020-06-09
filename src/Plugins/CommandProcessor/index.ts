import { ShizukaEngine } from '../../Shizuka'
import { Message } from 'discord.js';

import { EventEmitter } from 'events';

class CommandProcessor extends EventEmitter {
    static requirements: string[] = []
    public timers = [];
    private shizuka: ShizukaEngine;

    public COMMAND_PREFIX: string = "!";

    constructor(shizuka: ShizukaEngine) {
        super();
        this.shizuka = shizuka;
        shizuka.on("message", this.handleMessage.bind(this));

        console.log("CommandProcessor plugin loaded successfully!")
    }

    public processCommand(message: string) {
        message = message.slice(1);
        const args = message.split(' ');
        const command: string = args.shift()!.toLowerCase();

        return { command, args };
    }

    private handleMessage(message: Message) {
        let { content } = message;
        if (content[0] === this.COMMAND_PREFIX) {
            const { command, args } = this.processCommand(content);

            this.emit(command, message, args);
        }
    }

}

module.exports = CommandProcessor;