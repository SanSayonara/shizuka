class Logger {
    protected loggerName: string;

    protected loggerLevel = 20;

    static LEVELS_VALUES = {
        DEBUG: 10,
        INFO: 20,
        WARNING: 30,
        ERROR: 40,
        CRITICAL: 50
    };

    constructor(loggerName: string, loggerLevel: number | string = 'INFO') {
        this.loggerName = `[SHIZUKA]${loggerName}`;

        if (typeof loggerLevel === 'string') {
            this.loggerLevel = Logger.getLoggerLevel(loggerLevel);
        } else {
            this.loggerLevel = loggerLevel;
        }
    }

    static getLoggerLevel(level: string): number {
        switch (level) {
            case 'DEBUG':
                return Logger.LEVELS_VALUES.DEBUG;
            default:
            case 'INFO':
                return Logger.LEVELS_VALUES.INFO;
            case 'WARNING':
                return Logger.LEVELS_VALUES.WARNING;
            case 'ERROR':
                return Logger.LEVELS_VALUES.ERROR;
            case 'CRITICAL':
                return Logger.LEVELS_VALUES.CRITICAL;
        }
    }

    public critical(message: string): void {
        if (this.loggerLevel <= Logger.LEVELS_VALUES.CRITICAL) {
            console.error(`${this.loggerName}[CRITICAL]: ${message}`);
        }
    }

    public error(message: string): void {
        if (this.loggerLevel <= Logger.LEVELS_VALUES.ERROR) {
            console.error(`${this.loggerName}[ERROR]: ${message}`);
        }
    }

    public warning(message: string): void {
        if (this.loggerLevel <= Logger.LEVELS_VALUES.WARNING) {
            console.warn(`${this.loggerName}[WARNING]: ${message}`);
        }
    }

    public info(message: string): void {
        if (this.loggerLevel <= Logger.LEVELS_VALUES.INFO) {
            console.info(`${this.loggerName}[INFO]: ${message}`);
        }
    }

    public debug(message: string): void {
        if (this.loggerLevel <= Logger.LEVELS_VALUES.DEBUG) {
            console.debug(`${this.loggerName}[DEBUG]: ${message}`);
        }
    }
}

export default Logger;
