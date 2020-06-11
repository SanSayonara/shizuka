import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const PLUGIN_FILES_PATH = '../../PluginFiles/';

const fsReadFile = promisify(fs.readFile);
const fsWriteFile = promisify(fs.writeFile);

class PluginDataManager {
    public DATA_PATH: string;
    public data: Record<any, any>;

    constructor(pluginName: string, defaultData: object) {
        const dataDir = path.resolve(__dirname, PLUGIN_FILES_PATH, pluginName, 'data');
        const defaultDataJSON = JSON.stringify(defaultData);

        this.DATA_PATH = path.resolve(dataDir, 'data.json');

        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
        };

        if (!fs.existsSync(this.DATA_PATH)) {
            fs.writeFileSync(this.DATA_PATH, defaultDataJSON);
        };

        this.data = this.getSync();
    }

    public async get() {
        if (this.data === undefined) {
            const dataJSON = await fsReadFile(this.DATA_PATH);
            const dataObject = JSON.parse(dataJSON.toString());

            this.data = dataObject;
        }

        return this.data;
    }

    public getSync() {
        if (this.data === undefined) {
            const dataJSON = fs.readFileSync(this.DATA_PATH).toString();
            const dataObject = JSON.parse(dataJSON);
            this.data = dataObject;
        }
        return this.data;
    }

    public async save(data = this.data) {
        const dataJSON = JSON.stringify(data);

        await fsWriteFile(this.DATA_PATH, dataJSON);
    }

    public saveSync(data = this.data) {
        const dataJSON = JSON.stringify(data);

        fs.writeFileSync(this.DATA_PATH, dataJSON);
    }
}

export default PluginDataManager;