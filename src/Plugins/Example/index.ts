import { ShizukaEngine } from '../../Shizuka'
import { Message } from 'discord.js';

class Example {
    static requirements: string[] = ["CommandProcessor"];
    public timers = [{
        method: this.exampleTimer,
        time: '1m',
        isAbsolute: false
    }];
    private shizuka: ShizukaEngine;

    private command: any;

    constructor(shizuka: ShizukaEngine) {
        this.shizuka = shizuka;
        this.command = this.shizuka.Plugins.get("CommandProcessor");

        this.command.on("example", this.exampleCommandHandler.bind(this));

        console.log("Example plugin loaded successfully!")
    }

    public exampleCommandHandler(message: Message, args: string[]) {
        message.reply("Ohayou gozaimasu! ^^")
    }

    public exampleTimer() {
        console.log("timed! (this word exists?)");
    }
}

module.exports = Example;