import { buildSchema } from "graphql";

export const playerSchema = buildSchema(`
    type Device {
        id: String
        is_active: Boolean
        is_private_session: Boolean
        is_restricted: Boolean
        name: String
        type: String
        volume_percent: Int
        supports_volume: Boolean
    }
    
    type Query {
        getAvailableDevices: [Device!]!
    }
    type Mutation {
        transferPlayback(deviceId: String!): Boolean!
    }

`);
