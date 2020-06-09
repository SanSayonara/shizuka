import { Client, Channel, SnowflakeUtil } from 'discord.js';
import Config from '../Interfaces/Config';
import PluginInterface from '../Interfaces/PluginInterface';
import TimerConfig from '../Interfaces/TimerConfig';

import Time from './time';
import PluginLoaderBase from './pluginLoader';

class ShizukaEngine extends Client {
    protected config: Config;
    public TimeUtils: Time;
    public PluginLoader: PluginLoaderBase = new PluginLoaderBase(this);
    public Plugins: Map<string, PluginInterface> = new Map();
    public singleServer?: Channel;
    public server?: any;

    constructor(config: Config) {
        super();
        this.config = config;
        this.TimeUtils = new Time(config.timezone);

        if (config.singleServer) {
            this.addSingleServerFunctionalities(config.serverId);
        }

        this.loadPlugins();
        this.startTimers();

        //this.on("message", message => console.log(message))
    }

    private loadPlugins() {
        if (this.config.plugins !== undefined) {
            this.PluginLoader.getPlugins(this.Plugins, this.config.plugins);
        } else {
            this.PluginLoader.getPlugins(this.Plugins);
        }
    }

    private addSingleServerFunctionalities(serverId: any) {
        //this.server = this.guilds.fetch(serverId)
    }

    private startTimers() {
        this.Plugins.forEach(plugin => {
            plugin.timers.forEach(timerConfig => {
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