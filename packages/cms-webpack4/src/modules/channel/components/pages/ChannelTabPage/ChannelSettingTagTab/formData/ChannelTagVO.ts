// NOTICE: VO
import {ChannelTag} from "../../../../../api/dto/ChannelTag";

export type ChannelTagVO = Omit<ChannelTag, "showPermission" | "showTermAndCondition">
