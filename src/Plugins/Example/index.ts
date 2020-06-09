import { ShizukaEngine } from '../../Shizuka'
import { Message } from 'discord.js';
import PluginInterface from '../../Interfaces/PluginInterface';
import TimerConfig from '../../Interfaces/TimerConfig';
import CommandProcessor from '../CommandProcessor';

class Example implements PluginInterface {
    static requirements: string[] = ["CommandProcessor"];
    public timers: TimerConfig[] = [{
        method: this.exampleTimer,
        time: '1m',
        isAbsolute: false
    }];
    private shizuka: ShizukaEngine;

    private command: CommandProcessor;

    constructor(shizuka: ShizukaEngine) {
        this.shizuka = shizuka;
        this.command = this.shizuka.Plugins.get("CommandProcessor")!;

        this.command.on("example", this.exampleCommandHandler.bind(this));

        console.log("Example plugin loaded successfully!")
    }

    public exampleCommandHandler(message: Message, args: string[]): void {
        message.reply("Ohayou gozaimasu! ^^")
    }

    public exampleTimer(): void {
        console.log("timed! (this word exists?)");
    }
}

module.exports = Example;