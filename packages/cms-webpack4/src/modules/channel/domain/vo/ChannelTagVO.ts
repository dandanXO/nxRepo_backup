// NOTICE: VO
import {ChannelTag} from "./ChannelTag";

export type ChannelTagVO = Omit<ChannelTag, "showPermission" | "showTermAndCondition">
