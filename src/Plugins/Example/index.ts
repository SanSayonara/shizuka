import { ShizukaEngine } from '../../Shizuka'

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
        console.log(this.command);

        this.command.on("siria", (message: any, args: any) => {
            message.reply("viva Siria!");
        })

        console.log("Example plugin loaded successfully!")
    }

    exampleTimer() {
        console.log("timed! (this word exists?)");
    }
}

module.exports = Example;