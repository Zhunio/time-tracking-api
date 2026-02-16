export class RegisterDto {
  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  dateOfBirth!: string;
  isAdmin?: boolean;
}
