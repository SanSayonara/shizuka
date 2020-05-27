import { ShizukaEngine } from '../../Shizuka'

class Example {
    static requirements: string[] = []
    private shizuka: ShizukaEngine;
    constructor(shizuka: ShizukaEngine) {
        this.shizuka = shizuka;
        console.log("Example plugin loaded successfully!")
    }
}

module.exports = Example;