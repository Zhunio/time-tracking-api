export class CreateUserDto {
  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  dateOfBirth!: string;
  isAdmin?: boolean;
}
