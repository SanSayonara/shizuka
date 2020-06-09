interface Config {
    timezone: number,
    singleServer: boolean,
    serverId?: number,
    plugins?: string[],
    logLevel: string
};

export default Config;