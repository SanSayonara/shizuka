import { ShizukaEngine } from '../../Shizuka'
import { Message } from 'discord.js';

import { EventEmitter } from 'events';
import PluginInterface from '../../Interfaces/PluginInterface';
import Logger from '../../Shizuka/Logger';

class CommandProcessor extends EventEmitter implements PluginInterface {
    static requirements: string[] = []
    public timers = [];

    private shizuka: ShizukaEngine;
    private Logger: Logger;

    public COMMAND_PREFIX: string = "!";
    public onCommand = this.on;

    constructor(shizuka: ShizukaEngine, logger: Logger) {
        super();

        this.shizuka = shizuka;
        this.Logger = logger;

        shizuka.on("message", this.handleMessage.bind(this));
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
            this.Logger.debug(`${message.author.username} emited the command ${command} with the following arguments: ${args.join(", ")}`);
        }
    }

}

module.exports = CommandProcessor;
export default CommandProcessor;