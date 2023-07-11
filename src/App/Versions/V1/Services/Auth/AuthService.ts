import { JwtAuthentication } from "../../../../../Authentication/jwtAuthentication";
import { IProcessResponse } from "../../../../../Common/Interfaces/ResponseInterface";
import { IUser, IAuthLogin } from "./AuthInterface";

export class AuthService {
    private readonly component: string = 'App/Versions/V1/Services/Auth/AuthService';
    private readonly errorMessage: string = 'Error in component';

    /**
     * Check if username and password are valid 
     * @param data 
     * @returns 
     */
    public async login(data: IAuthLogin): Promise<IProcessResponse<any>> {
        try {

            const login = this.getLogin(data.username, data.password);

            if (login.status === 'error')
                return {
                    status: 'error',
                    message: 'User or Password not valid',
                    error: {
                        code: 'unauthorized',
                        message: 'Unauthorized',
                    }
                };

            const token = await new JwtAuthentication().generateToken(login.id);

            return {
                status: 'success',
                message: 'Success authentication',
                data: token,
            };

        } catch (error) {
            console.error(this.errorMessage + ' Dir: ' + this.component + ' Error: ', error);
            throw error;
        }
    }

    /**
     * TO-DO: Remove this function 
     * Example to get Login, with hardcoded user credentials.
     * User login data should be taken from a database or another source.
     */
    private getLogin(user: string, pass: string) {

        const userData: IUser = {
            id: 1,
            username: 'testUser',
            password: 'testPassword'
        }

        if (user !== userData.username || pass !== userData.password) {
            return {
                status: 'error',
                id: 0
            }
        }

        return {
            status: 'ok',
            id: userData.id
        }
    }
}