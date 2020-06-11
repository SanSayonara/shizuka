import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const fsAccess = promisify(fs.access);
const fsMkdir = promisify(fs.mkdir);
const fsReaddir = promisify(fs.readdir);
const fsReadFile = promisify(fs.readFile);
const fsWriteFile = promisify(fs.writeFile);

const PLUGINS_FILES_PATH: string = '../../PluginFiles/';

class pluginFilesManager {
    public path: string;

    constructor(pluginName: string) {
        this.path = path.resolve(__dirname, PLUGINS_FILES_PATH, pluginName);

        if (!this.existsSync(this.path)) {
            fs.mkdirSync(this.path);
        }

    }

    public createPluginDirPath(dirPath: string) {
        return path.resolve(this.path, dirPath);
    }

    public async exists(filePath: string) {
        const accessPath = path.resolve(this.path, filePath);
        const exists = fs.existsSync(accessPath);

        return exists;
    }

    public existsSync(filePath: string) {
        const accessPath = path.resolve(this.path, filePath);
        const exists = fs.existsSync(accessPath);

        return exists;
    }

    public async mkdir(dirPath: string, ...args: any) {
        const newDirPath = this.createPluginDirPath(dirPath)

        return await fsMkdir(newDirPath, ...args);
    }

    public mkdirSync(dirPath: string, ...args: any) {
        const newDirPath = this.createPluginDirPath(dirPath)

        return fs.mkdirSync(newDirPath, ...args);
    }

    public async readdir(dirPath: string, ...args: any) {
        const newDirPath = this.createPluginDirPath(dirPath)

        return await fsReaddir(newDirPath, ...args);
    }

    public readdirSync(dirPath: string, ...args: any) {
        const newDirPath = this.createPluginDirPath(dirPath)

        return fs.readdirSync(newDirPath, ...args);
    }

    public async readFile(dirPath: string, ...args: any) {
        const newDirPath = this.createPluginDirPath(dirPath)

        return await fsReadFile(newDirPath, ...args);
    }

    public readFileSync(dirPath: string, ...args: any) {
        const newDirPath = this.createPluginDirPath(dirPath)

        return fs.readFileSync(newDirPath, ...args);
    }

    public async writeFile(dirPath: string, data: any, ...args: any) {
        const newDirPath = this.createPluginDirPath(dirPath)

        return await fsWriteFile(newDirPath, data, ...args);
    }

    public writeFileSync(dirPath: string, data: any, ...args: any) {
        const newDirPath = this.createPluginDirPath(dirPath)

        return fs.writeFileSync(newDirPath, data, ...args);
    }
};

export default pluginFilesManager;