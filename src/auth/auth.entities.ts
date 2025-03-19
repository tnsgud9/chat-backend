import { Permission } from 'src/common/enums/permission.enum';

export class AuthEntity {
  uid: string;
  username: string;
  password: string;
  nickname: string;
  permission: Permission;
}
