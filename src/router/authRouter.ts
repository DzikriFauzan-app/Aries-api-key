import { KeyRegistry } from "../auth/keyRegistry";

const registry = new KeyRegistry();

export const checkAuthStatus = (apiKey: string) => {
    const keyData = registry.validate(apiKey);
    
    if (keyData && keyData.role === 'OWNER') {
        return {
            status: "AUTHORIZED",
            role: keyData.role,
            owner: keyData.owner,
            permissions: keyData.scopes,
            message: `Welcome, Sovereign Owner ${keyData.owner}`
        };
    }
    
    return {
        status: "UNAUTHORIZED",
        role: "GUEST",
        message: "Invalid or insufficient Key"
    };
};
