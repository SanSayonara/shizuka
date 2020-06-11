import { ShizukaEngine } from '../../Shizuka'
import { Message } from 'discord.js';
import PluginInterface from '../../Interfaces/PluginInterface';
import TimerConfig from '../../Interfaces/TimerConfig';
import CommandProcessor from '../CommandProcessor';
import Logger from '../../Shizuka/Logger';
import pluginFilesManager from '../../Shizuka/pluginFilesManager';
import PluginDataManager from '../../Shizuka/pluginDataManager';

class Example implements PluginInterface {
    static requirements: string[] = ["CommandProcessor"];
    public timers: TimerConfig[] = [{
        method: this.exampleTimer,
        time: '1m',
        isAbsolute: false
    }];

    private shizuka: ShizukaEngine;
    private Logger: Logger;
    private fileManager: pluginFilesManager;
    private dataManager: PluginDataManager;

    private command: CommandProcessor;

    constructor(shizuka: ShizukaEngine, logger: Logger, fileManager: pluginFilesManager, dataManager: any) {
        this.shizuka = shizuka;
        this.Logger = logger;
        this.fileManager = fileManager;
        this.dataManager = new dataManager({});
        this.command = this.shizuka.Plugins.get("CommandProcessor")!;

        this.command.onCommand("example", this.exampleCommandHandler.bind(this));

        this.exampleFileManagerUsage();
        this.saveGreeting("Ohayou gozaimasu! ^^");
    }

    public async exampleFileManagerUsage() {
        const exampleData = {
            "nickname": "Shizuka"
        }
        const exampleDataJSON = JSON.stringify(exampleData);
    
        try {
            await this.fileManager.writeFile('test.json', exampleDataJSON);
            const pluginDirArray = await this.fileManager.readdir('./');
            const exampleFileData = await this.fileManager.readFile('test.json');

            this.Logger.debug(`Plugin files path: ${this.fileManager.path}`);
            this.Logger.debug(`Plugin Files directory array content: `, pluginDirArray);
            this.Logger.debug(`test.json content: `, exampleFileData.toString());
        } catch (error) {
            throw new Error(error);
        }
    }

    public saveGreeting(greeting: string) {
        this.dataManager.data["greeting"] = greeting;
    }

    public exampleCommandHandler(message: Message, args: string[]): void {
        message.reply(this.dataManager.data.greeting);
    }

    public exampleTimer(): void {
        this.Logger.debug("timed! (this word exists?)");
    }
}

module.exports = Example;