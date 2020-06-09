import { ShizukaEngine } from '../../Shizuka'
import { Message } from 'discord.js';
import PluginInterface from '../../Interfaces/PluginInterface';
import TimerConfig from '../../Interfaces/TimerConfig';
import CommandProcessor from '../CommandProcessor';
import Logger from '../../Shizuka/Logger';

class Example implements PluginInterface {
    static requirements: string[] = ["CommandProcessor"];
    public timers: TimerConfig[] = [{
        method: this.exampleTimer,
        time: '1m',
        isAbsolute: false
    }];

    private shizuka: ShizukaEngine;
    private Logger: Logger;

    private command: CommandProcessor;

    constructor(shizuka: ShizukaEngine, logger: Logger) {
        this.shizuka = shizuka;
        this.Logger = logger;
        this.command = this.shizuka.Plugins.get("CommandProcessor")!;

        this.command.onCommand("example", this.exampleCommandHandler.bind(this));
    }

    public exampleCommandHandler(message: Message, args: string[]): void {
        message.reply("Ohayou gozaimasu! ^^")
    }

    public exampleTimer(): void {
        this.Logger.debug("timed! (this word exists?)");
    }
}

module.exports = Example;