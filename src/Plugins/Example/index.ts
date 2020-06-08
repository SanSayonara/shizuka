import { ShizukaEngine } from '../../Shizuka'

class Example {
    static requirements: string[] = []
    public timers = [{
        method: this.exampleTimer,
        time: '1m',
        isAbsolute: false
    }];
    private shizuka: ShizukaEngine;

    constructor(shizuka: ShizukaEngine) {
        this.shizuka = shizuka;
        console.log("Example plugin loaded successfully!")
    }

    exampleTimer() {
        console.log("timed! (this word exists?)");
    }
}

module.exports = Example;