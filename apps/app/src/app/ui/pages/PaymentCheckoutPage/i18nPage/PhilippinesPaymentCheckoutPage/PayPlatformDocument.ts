import { dragonPayDocumentMap } from './payPlatformDocumentMap/dragonPayDocumentMap';
import { skyPayDocumentMap } from './payPlatformDocumentMap/skyPayDocumentMap';

interface IContent {
  title: string;
  content: React.ReactNode;
}

type TPayMethodDocumentMapContent = {
  isOnline: boolean;
  logo: string;
  receiverTitleKey?: string;
  contents?: IContent[];
  instruction1Title?: string;
  instruction1Content?: string;
  instruction2Title?: string;
  instruction2Content?: string;
  instruction3Title?: string;
  instruction3Content?: string;
  instruction4Title?: string;
  instruction4Content?: string;
};

export interface IPayMethodDocumentMap {
  [key: string]: TPayMethodDocumentMapContent;
}

export class PayPlatformDocument {
  private payMethodDocumentMap: IPayMethodDocumentMap;

  private payPlatformMapPayMethodDocument: {
    [key: string]: IPayMethodDocumentMap;
  } = {
    sky_pay: skyPayDocumentMap,
    dragon_pay: dragonPayDocumentMap,
  };

  constructor(payPlatform: string) {
    this.payMethodDocumentMap =
      this.payPlatformMapPayMethodDocument[payPlatform] || {};
  }

  getPayMethodDocument = (
    payMethod: string | undefined,
    key: keyof TPayMethodDocumentMapContent
  ) => {
    if (payMethod === undefined) return null;
    try {
      return this.payMethodDocumentMap[payMethod][key];
    } catch (error) {
      return 'payMethod Not found';
    }
  };
}
