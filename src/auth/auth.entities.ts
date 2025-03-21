import { Permission } from 'src/common/enums/permission.enum';

export class AuthEntity {
  id: string;
  username: string;
  password: string;
  nickname: string;
  permission: Permission;
}
