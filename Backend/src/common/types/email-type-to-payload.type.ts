import { EmailTypeEnum } from '../enums/email-type.enum';
import { EmailCombinedPayloadType } from './email-combined-payload.type';
import { PickRequired } from './pick-required.type';

export type EmailTypeToPayloadType = {
  [EmailTypeEnum.WELCOME]: PickRequired<
    EmailCombinedPayloadType,
    'frontUrl' | 'name' | 'imageUrl'
  >;
  [EmailTypeEnum.FORGOT_PASSWORD]: PickRequired<
    EmailCombinedPayloadType,
    'frontUrl' | 'name' | 'imageUrl' | 'password'
  >;
  [EmailTypeEnum.OLD_VISIT]: PickRequired<EmailCombinedPayloadType, 'frontUrl'>;
  [EmailTypeEnum.LOGOUT]: PickRequired<
    EmailCombinedPayloadType,
    'frontUrl' | 'name' | 'imageUrl'
  >;
};
