/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompareAadhaar } from "./CompareAadhaar";
import type { CompareEkyc } from "./CompareEkyc";
import type { CompareFace } from "./CompareFace";
import type { ComparePan } from "./ComparePan";

export type Data = {
    compare_aadhaar?: CompareAadhaar;
    compare_ekyc?: CompareEkyc;
    compare_face?: CompareFace;
    compare_pan?: ComparePan;
    uid?: string;
    user_picture_1?: string;
    user_picture_2?: string;
};
