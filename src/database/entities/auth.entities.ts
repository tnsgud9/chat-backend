import { Permission } from 'src/common/enums/permission.enum';

export class AuthEntity {
  id: string;
  username: string;
  password: string;
  permission: Permission;
  nickname: string;
}
