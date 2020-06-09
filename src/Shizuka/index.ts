import { Client, Channel, SnowflakeUtil } from 'discord.js';
import Config from '../Interfaces/Config';
import PluginInterface from '../Interfaces/PluginInterface';
import TimerConfig from '../Interfaces/TimerConfig';

import Time from './time';
import PluginLoaderBase from './pluginLoader';
import Logger from './Logger';

class ShizukaEngine extends Client {
    protected config: Config;
    protected Logger: Logger;
    public TimeUtils: Time;
    public PluginLoader: PluginLoaderBase;
    public Plugins: Map<string, any> = new Map();
    public singleServer?: Channel;
    public server?: any;

    constructor(config: Config) {
        super();
        this.config = config;
        this.Logger = new Logger("[ENGINE]", this.config.logLevel);
        this.TimeUtils = new Time(this.config.timezone);
        this.PluginLoader = new PluginLoaderBase(this, this.config.logLevel);

        this.Logger.info("Starting new Shizuka instance...")

        if (config.singleServer) {
            this.addSingleServerFunctionalities(config.serverId);
        }

        this.loadPlugins();
        this.startTimers();
    }

    private loadPlugins() {
        this.Logger.info("Loading plugins...");

        if (this.config.plugins !== undefined) {
            this.PluginLoader.loadPlugins(this.Plugins, this.config.plugins);
        } else {
            this.PluginLoader.loadPlugins(this.Plugins);
        }
    }

    private addSingleServerFunctionalities(serverId: any) {
        //this.server = this.guilds.fetch(serverId)
    }

    private startTimers() {
        this.Logger.debug("Starting timers...");

        this.Plugins.forEach((plugin, pluginName) => {
            this.Logger.debug(`Starting ${pluginName} timers...`);

            plugin.timers.forEach((timerConfig: TimerConfig) => {
                timerConfig.method = timerConfig.method.bind(plugin);
                //@ts-ignore
                this.addTimer(timerConfig)
            });
        });
    }

    public addTimer(timerConfig: TimerConfig) {
        const nextCallMs: number = this.TimeUtils.convertToMs(timerConfig);

        setTimeout(() => {
            timerConfig.method();
            this.addTimer(timerConfig)
        }, nextCallMs);
    }
}

function Shizuka(token: string, config: Config) {
    let bot = new ShizukaEngine(config);

    bot.login(token);
}

export default Shizuka;
export { ShizukaEngine };