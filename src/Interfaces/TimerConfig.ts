interface TimerConfig {
    method: () => never,
    time: string,
    isAbsolute: boolean
}

export default TimerConfig;