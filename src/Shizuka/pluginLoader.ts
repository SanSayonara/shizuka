import path from 'path';
import fs from 'fs';
import { ShizukaEngine } from '../Shizuka';
import PluginInterface from '../Interfaces/PluginInterface';

const PLUGINS_FOLDER = path.join(__dirname, '../Plugins');

class PluginLoaderBase {
    protected shizukaInstance: ShizukaEngine;

    constructor(shizukaInstance: ShizukaEngine) {
        this.shizukaInstance = shizukaInstance;
    }

    public getPluginsNames() {
        const pluginsNames: string[] = fs.readdirSync(PLUGINS_FOLDER);

        return pluginsNames.sort();
    }

    public addPluginToMap(pluginName: string, pluginMap: Map<string, Object>) {
        const PluginBase = require(`../Plugins/${pluginName}`);
        const requirements = PluginBase.requirements;

        if (pluginMap.has(pluginName)) {
            return;
        }

        requirements.forEach((requiredPluginName: string) => {
            this.addPluginToMap(requiredPluginName, pluginMap);
        });

        pluginMap.set(pluginName, new PluginBase(this.shizukaInstance));
    }

    public getPlugins(pluginsMap: Map<string, Object>, pluginList?: string[]) {
        const pluginsNames: string[] = pluginList ? pluginList : this.getPluginsNames();

        pluginsNames.forEach(pluginName => {
            this.addPluginToMap(pluginName, pluginsMap);
        });
    }
}

export default PluginLoaderBase;