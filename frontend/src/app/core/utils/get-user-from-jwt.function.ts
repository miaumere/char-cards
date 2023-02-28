import jwtDecode from 'jwt-decode';
import { UserDto } from 'src/app/modules/login/models/user-dto.model';

export function getUserFromJWT(): UserDto | null {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        return null;
    }
    try {
        const tokenPayload: { unique_name: number; Username: string } =
            jwtDecode(authToken);

        const user: UserDto = {
            id: tokenPayload.unique_name,
            username: tokenPayload.Username,
        };
        return user;
    } catch (e) {
        console.error(e);
        return null;
    }
}
