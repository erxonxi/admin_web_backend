export interface User {
    username: string;
    first_name: string;
    last_name:   string;
    email: string;
    role: string;
    createdAt: Date;
}

export interface Script {
    id: number;
    name: string;
    content:   string;
    history: [];
}

export interface HistoryExecution {
    id: number;
    script_id: number;
    script: Script;
    log: string;
    createdAt: Date;
}