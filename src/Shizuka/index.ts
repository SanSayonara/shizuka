import { Client } from 'discord.js';
import Config from '../Interfaces/Config';
import PluginLoaderBase from './pluginLoader';

class ShizukaEngine extends Client {
    protected config: Config;
    public PluginLoader: PluginLoaderBase = new PluginLoaderBase(this);
    public Plugins: Map<string, Object> = new Map();

    constructor(config: Config) {
        super();
        this.config = config;
        this.loadPlugins();
    }

    private loadPlugins() {
        if (this.config.plugins !== undefined) {
            this.Plugins = this.PluginLoader.getPlugins(this.config.plugins);
        } else {
            this.Plugins = this.PluginLoader.getPlugins();
        }
    }
}

function Shizuka(token: string, config: Config) {
    let bot = new ShizukaEngine(config);

    bot.login(token);
}

export default Shizuka;
export { ShizukaEngine };