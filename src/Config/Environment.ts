// import { Obj } from "../Common/Utility/Obj";

export default class Environment {
    private static environment: { [key: string]: any } = {};

    /**
     * Comprueba si estamos ejecutando en modo de desarrollo
     * @returns
     */
    public static isDevelopment(): boolean {
        console.log('Development: TRUE');
        return this.isDev();
    }

    /**
     * Comprueba si estamos ejecutando en modo de desarrollo
     * @returns
     */
    public static isDev(): boolean {
        return this.environment.NODE_ENV === "development";
    }

    /**
     * Comprueba si estamos ejecutando en modo de producción
     * @returns
     */
    public static isProduction(): boolean {
        return this.isProd();
    }

    /**
     * Comprueba si estamos ejecutando en modo de producción
     * @returns
     */
    public static isProd(): boolean {
        return this.environment.NODE_ENV === "production";
    }

    /**
     * Comprueba si estamos ejecutando en algún otro entorno
     * @param env
     * @returns
     */
    public static is(env: string): boolean {
        return this.environment.NODE_ENV === env;
    }

    /**
     * Obtiene el valor de NODE_ENV
     * @returns
     */
    public static getEnv(): string {
        return this.environment.NODE_ENV;
    }

    /**
     * Obtiene un valor del entorno
     * @param key
     * @param _default
     * @returns
     */
    public static get<T>(key: string, _default: any = null): T {
        return this.environment[key] ?? _default;
    }

    /**
     * Comprueba si existe un valor en el entorno
     * @param key
     * @returns
     */
    public static has(key: string): boolean {
        return (this.environment[key] ?? undefined) !== undefined;
    }

    private static parseEnvObject(env: any) {
        const newEnv = JSON.parse(JSON.stringify(env || {}));

        for (let key in newEnv) {
            if (newEnv[key] === "") {
                newEnv[key] = null;

                continue;
            }

            //   if (Obj.isBoolean(newEnv[key])) {
            //     newEnv[key] = Boolean(newEnv[key]);
            //   }

            //   if (Obj.isNumber(newEnv[key])) {
            //     newEnv[key] = Number(newEnv[key]);
            //   }
        }

        return newEnv;
    }

    public static load(env: any) {
        this.environment = this.parseEnvObject(env);
    }
}