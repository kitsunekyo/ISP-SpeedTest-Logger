export interface SpeedtestResult {
    timestamp: Date;
    ping: {
        jitter: number;
        latency: number;
    };
    download: {
        bandwidth: number;
        bytes: number;
        elapsed: number;
    };
    upload: {
        bandwidth: number;
        bytes: number;
        elapsed: number;
    };
    isp: string;
    interface: {
        internalIp: string;
        name: string;
        macAddr: string;
        isVpn: boolean;
        externalIp: string;
    };
    server: {
        id: number;
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
