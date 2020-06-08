import TimerConfig from './TimerConfig';

interface PluginInterface {
    requirements: string[],
    timers: TimerConfig[] | [];
}

export default PluginInterface;