import jwt, { SignOptions } from 'jsonwebtoken';
import Environment from '../Config/Environment';

export interface JwtAuthenticationConfig {
    authorizationHeaderPrefix: string;
    jwtSigningOptions: SignOptions;
}

export interface VerifiedTokenInterface {
    id: string;
    iat: number;
    exp: number;
    iss: string;
}

export class JwtAuthentication {
    public _appKey: string;
    public _config: JwtAuthenticationConfig;

    constructor() {
        this._config = {
            authorizationHeaderPrefix: 'Bearer',
            jwtSigningOptions: {
                expiresIn: '1h',
                algorithm: 'HS256',
            },
        };
        this._appKey = Environment.get('APP_KEY');
        if (!this._appKey) return;
    }

    public generateToken(id: number): Promise<string | undefined> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                {
                    ...this._config,
                    ...{ id },
                },
                this._appKey,
                this._config.jwtSigningOptions,
                (err, token) => {
                    if (err) reject(undefined);

                    resolve(token);
                }
            );
        });
    }

    public verifyToken(token: string, secret?: string) {
        if (!token) return null;

        return jwt.verify(token, secret ?? this._appKey);
    }

    public getUserIdFromToken(request: any, specifiedToken?: string | null) {
        const token = specifiedToken ?? this.getAuthenticationInformation(request);
        if (!token) return null;

        const verifiedToken: any = this.validateAuthenticationInformation(token);
        if (!verifiedToken) return null;

        return verifiedToken?.id ?? null;
    }

    public validateAuthenticationInformation(credencial: string) {
        return this.verifyToken(credencial);
    }

    public getAuthenticationInformation(request: any): string | null {
        return this.getTokenFromHeader(request);
    }

    public getTokenFromHeader(request: any): string | null {
        const authHeader = request.headers.authorization;

        if (!authHeader) return null;

        const tokenParts = authHeader.split(' ');
        if (tokenParts.length !== 2) return null;

        const type = tokenParts[0];
        const token = tokenParts[1];
        if (!type || !token) return null;

        if (type && token && type == 'Bearer') return token;

        return null;
    }
}