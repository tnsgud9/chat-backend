import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UsersController {
  constructor(private readonly userService: UserService) {}
}
