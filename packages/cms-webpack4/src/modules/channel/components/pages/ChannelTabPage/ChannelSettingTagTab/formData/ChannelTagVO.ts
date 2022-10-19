// NOTICE: VO
import {ChannelTagDTO} from "../../../../../api/dto/ChannelTagDTO";

export type ChannelTagVO = Omit<ChannelTagDTO, "showPermission" | "showTermAndCondition">
