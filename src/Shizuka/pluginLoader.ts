import path from 'path';
import fs from 'fs';
import { ShizukaEngine } from '../Shizuka';
import PluginInterface from '../Interfaces/PluginInterface';
import Logger from './Logger';

const PLUGINS_FOLDER = path.join(__dirname, '../Plugins');

class PluginLoaderBase {
    protected shizukaInstance: ShizukaEngine;
    protected logLevel: string | number;
    protected Logger: Logger;

    constructor(shizukaInstance: ShizukaEngine, logLevel: string | number) {
        this.shizukaInstance = shizukaInstance;
        this.logLevel = logLevel;
        this.Logger = new Logger("[PLUGIN LOADER]", this.logLevel);
    }

    public getPluginsNames() {
        const pluginsNames: string[] = fs.readdirSync(PLUGINS_FOLDER);

        return pluginsNames.sort();
    }

    public addPluginToMap(pluginName: string, pluginMap: Map<string, Object>) {
        const PluginBase = require(`../Plugins/${pluginName}`);
        const PluginLogger = new Logger(`[PLUGINS][${pluginName}]`, this.logLevel);
        const requirements = PluginBase.requirements;

        if (pluginMap.has(pluginName)) {
            return;
        }

        requirements.forEach((requiredPluginName: string) => {
            this.addPluginToMap(requiredPluginName, pluginMap);
        });

        pluginMap.set(pluginName, new PluginBase(this.shizukaInstance, PluginLogger));

        this.Logger.info(`Plugin ${pluginName} loaded successfully`);
    }

    public loadPlugins(pluginsMap: Map<string, Object>, pluginList?: string[]) {
        const pluginsNames: string[] = pluginList ? pluginList : this.getPluginsNames();

        pluginsNames.forEach(pluginName => {
            this.Logger.debug(`Loading plugin ${pluginName}...`);

            this.addPluginToMap(pluginName, pluginsMap);
        });
    }
}

export default PluginLoaderBase;