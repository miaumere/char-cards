export interface IUserDto {
    id: number;
    username: string;
}

export class UserDto implements IUserDto {
    id: number = 0;
    username: string = '';
}
