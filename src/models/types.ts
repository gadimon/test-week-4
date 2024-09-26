import { Status } from '../utils/status'

export interface Beeper{
    id: string;
    name: string;
    status: string;
    created_at: Date;
    detonated_at?: Date;
    latitude: number;
    longitube: number;
}