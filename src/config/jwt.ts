import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: 'qwer123nmk',
      signOptions: { expiresIn: '2d' },
    };
  },
};
