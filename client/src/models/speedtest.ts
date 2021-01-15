export interface SpeedtestEvent {
    type: 'ping' | 'download' | 'upload' | 'testStart' | 'testEnd';
    progress: number;
    timestamp: string;
}

type SpeedData = {
    bandwidth: number;
    bytes: number;
    elapsed: number;
    progress?: number;
};

type PingData = {
    jitter: number;
    latency: number;
    progress?: number;
};

export interface DownloadEvent extends SpeedtestEvent {
    download: SpeedData;
}

export interface UploadEvent extends SpeedtestEvent {
    upload: SpeedData;
}

export interface PingEvent extends SpeedtestEvent {
    ping: {
        jitter: number;
        latency: number;
        progress?: number;
    };
}

export interface SpeedtestResult {
    timestamp: string;
    ping: PingData;
    download: SpeedData;
    upload: SpeedData;
    packetLoss: number;
    isp?: string;
    interface?: {
        internalIp: string;
        name: string;
        macAddr: string;
        isVpn: boolean;
        externalIp: string;
    };
    server?: {
        id: number;
        host_functional: string;
        name: string;
        location: string;
        country: string;
        host: string;
        port: number;
        ip: string;
    };
    result: {
        id: string;
        url: string;
    };
}
