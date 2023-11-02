/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * MSG_TYPE enum.
 * @exports MSG_TYPE
 * @enum {number}
 * @property {number} DEFAULT=0 DEFAULT value
 * @property {number} CONNECTED=1 CONNECTED value
 * @property {number} UNLOGIN=2 UNLOGIN value
 * @property {number} PING=3 PING value
 * @property {number} PONG=4 PONG value
 * @property {number} CLOSE=5 CLOSE value
 * @property {number} SEND_COMMAND=6 SEND_COMMAND value
 * @property {number} SERVER_AUTH=10 SERVER_AUTH value
 * @property {number} SYNC_ONLINE_STATUS=11 SYNC_ONLINE_STATUS value
 * @property {number} SYNC_PLAYER_BALANCE=12 SYNC_PLAYER_BALANCE value
 * @property {number} GAME_PLAYER_SETTLED=13 GAME_PLAYER_SETTLED value
 * @property {number} SYNC_PLAYER_GAME_DATA=14 SYNC_PLAYER_GAME_DATA value
 * @property {number} SYNC_PLAYER_DATA=15 SYNC_PLAYER_DATA value
 * @property {number} PLAYER_WIN_MSG=17 PLAYER_WIN_MSG value
 * @property {number} REGISTRY_SYNC_SERVER_DATA=20 REGISTRY_SYNC_SERVER_DATA value
 * @property {number} SYNC_GAME_SERVER_DATA=21 SYNC_GAME_SERVER_DATA value
 * @property {number} ADD_PLAYER_BONUS=22 ADD_PLAYER_BONUS value
 * @property {number} FREEZE_BALANCE=23 FREEZE_BALANCE value
 * @property {number} PLAYER_LOGIN_REQ=100 PLAYER_LOGIN_REQ value
 * @property {number} PLAYER_LOGIN_REPLY=101 PLAYER_LOGIN_REPLY value
 * @property {number} PLAYER_LOGOUT_REQ=102 PLAYER_LOGOUT_REQ value
 * @property {number} PLAYER_LOGOUT_REPLY=103 PLAYER_LOGOUT_REPLY value
 * @property {number} PLAYER_BALANCE_EVENT=104 PLAYER_BALANCE_EVENT value
 * @property {number} BALANCE_HISTORY_REQ=105 BALANCE_HISTORY_REQ value
 * @property {number} BALANCE_HISTORY_REPLY=106 BALANCE_HISTORY_REPLY value
 * @property {number} BONUS_HISTORY_REQ=107 BONUS_HISTORY_REQ value
 * @property {number} BONUS_HISTORY_REPLY=108 BONUS_HISTORY_REPLY value
 * @property {number} PLAYER_BALANCE_REQ=109 PLAYER_BALANCE_REQ value
 * @property {number} PLAYER_INFO_CHANGE=110 PLAYER_INFO_CHANGE value
 * @property {number} PLAYER_GAME_DATA_REQ=111 PLAYER_GAME_DATA_REQ value
 * @property {number} PLAYER_GAME_DATA_REPLY=112 PLAYER_GAME_DATA_REPLY value
 * @property {number} PLAYER_BALANCE_FORCE_REQ=113 PLAYER_BALANCE_FORCE_REQ value
 * @property {number} ROOM_LIST_REQ=200 ROOM_LIST_REQ value
 * @property {number} ROOM_LIST_REPLY=201 ROOM_LIST_REPLY value
 * @property {number} ENTER_ROOM_REQ=202 ENTER_ROOM_REQ value
 * @property {number} ENTER_ROOM_REPLY=203 ENTER_ROOM_REPLY value
 * @property {number} EXIT_ROOM_REQ=204 EXIT_ROOM_REQ value
 * @property {number} EXIT_ROOM_REPLY=205 EXIT_ROOM_REPLY value
 * @property {number} SWITCH_TABLE_REQ=206 SWITCH_TABLE_REQ value
 * @property {number} TABLE_LIST_REQ=207 TABLE_LIST_REQ value
 * @property {number} TABLE_LIST_REPLY=208 TABLE_LIST_REPLY value
 * @property {number} GLOBAL_NOTICE=209 GLOBAL_NOTICE value
 * @property {number} TABLE_PLAYERS_EVENT=300 TABLE_PLAYERS_EVENT value
 * @property {number} TABLE_TIME_EVENT=301 TABLE_TIME_EVENT value
 * @property {number} GAME_BALANCE_EVENT=302 GAME_BALANCE_EVENT value
 * @property {number} CHAT_EXPRESSION_REQ=303 CHAT_EXPRESSION_REQ value
 * @property {number} CHAT_EXPRESSION_EVENT=304 CHAT_EXPRESSION_EVENT value
 * @property {number} CHAT_VOICE_REQ=305 CHAT_VOICE_REQ value
 * @property {number} CHAT_VOICE_EVENT=306 CHAT_VOICE_EVENT value
 * @property {number} PRIVATE_TABLE_READY_REQ=307 PRIVATE_TABLE_READY_REQ value
 * @property {number} PRIVATE_TABLE_READY_EVENT=308 PRIVATE_TABLE_READY_EVENT value
 * @property {number} TP_GAME_START_EVENT=1000 TP_GAME_START_EVENT value
 * @property {number} TP_BUTTON_EVENT=1001 TP_BUTTON_EVENT value
 * @property {number} TP_DEAL_CARDS=1002 TP_DEAL_CARDS value
 * @property {number} TP_STATE_EVENT=1003 TP_STATE_EVENT value
 * @property {number} TP_OPERATION_REQ=1004 TP_OPERATION_REQ value
 * @property {number} TP_OPERATION_EVENT=1005 TP_OPERATION_EVENT value
 * @property {number} TP_SHOW_CARDS_EVENT=1006 TP_SHOW_CARDS_EVENT value
 * @property {number} TP_GAME_END_EVENT=1007 TP_GAME_END_EVENT value
 * @property {number} TP_ALL_SEAT_CARDS=1008 TP_ALL_SEAT_CARDS value
 * @property {number} RUMMY_GAME_START_EVENT=2000 RUMMY_GAME_START_EVENT value
 * @property {number} RUMMY_BUTTON_EVENT=2001 RUMMY_BUTTON_EVENT value
 * @property {number} RUMMY_DEAL_CARDS=2002 RUMMY_DEAL_CARDS value
 * @property {number} RUMMY_STATE_EVENT=2003 RUMMY_STATE_EVENT value
 * @property {number} RUMMY_OPERATION_REQ=2004 RUMMY_OPERATION_REQ value
 * @property {number} RUMMY_OPERATION_EVENT=2005 RUMMY_OPERATION_EVENT value
 * @property {number} RUMMY_DECLARE_REQ=2006 RUMMY_DECLARE_REQ value
 * @property {number} RUMMY_DECLARE_EVENT=2007 RUMMY_DECLARE_EVENT value
 * @property {number} RUMMY_GROUP_REQ=2008 RUMMY_GROUP_REQ value
 * @property {number} RUMMY_CONFIRM_REQ=2009 RUMMY_CONFIRM_REQ value
 * @property {number} RUMMY_GAME_END_EVENT=2010 RUMMY_GAME_END_EVENT value
 * @property {number} RUMMY_SEAT_CARDS=2011 RUMMY_SEAT_CARDS value
 * @property {number} RUMMY_HISTORY_EVENT=2012 RUMMY_HISTORY_EVENT value
 * @property {number} RUMMY_SEAT_SCORE=2013 RUMMY_SEAT_SCORE value
 * @property {number} TEXAS_ROUND_CAST=3000 TEXAS_ROUND_CAST value
 * @property {number} TEXAS_TABLE_STATE=3001 TEXAS_TABLE_STATE value
 * @property {number} TEXAS_DEAL_CARDS_EVENT=3002 TEXAS_DEAL_CARDS_EVENT value
 * @property {number} TEXAS_OPERATION_REQ=3003 TEXAS_OPERATION_REQ value
 * @property {number} TEXAS_OPERATION_CAST=3004 TEXAS_OPERATION_CAST value
 * @property {number} TEXAS_TURN_START_EVENT=3005 TEXAS_TURN_START_EVENT value
 * @property {number} TEXAS_GAME_WIN_CAST=3006 TEXAS_GAME_WIN_CAST value
 * @property {number} TEXAS_GAME_BALANCE_CAST=3007 TEXAS_GAME_BALANCE_CAST value
 * @property {number} TEXAS_NEXT_TURN_EVENT=3008 TEXAS_NEXT_TURN_EVENT value
 * @property {number} TEXAS_ALL_TABLE_STATE=3009 TEXAS_ALL_TABLE_STATE value
 * @property {number} TEXAS_STAND_REQ=3010 TEXAS_STAND_REQ value
 * @property {number} TEXAS_STAND_REPLY=3011 TEXAS_STAND_REPLY value
 * @property {number} TEXAS_SIT_REQ=3012 TEXAS_SIT_REQ value
 * @property {number} TEXAS_SIT_REPLY=3013 TEXAS_SIT_REPLY value
 * @property {number} TEXAS_GAME_DATA_REQ=3014 TEXAS_GAME_DATA_REQ value
 * @property {number} TEXAS_GAME_DATA_REPLY=3015 TEXAS_GAME_DATA_REPLY value
 * @property {number} TEXAS_BUY_IN_RANGE_REQ=3016 TEXAS_BUY_IN_RANGE_REQ value
 * @property {number} TEXAS_BUY_IN_RANGE_REPLY=3017 TEXAS_BUY_IN_RANGE_REPLY value
 * @property {number} TEXAS_BUY_IN_REQ=3018 TEXAS_BUY_IN_REQ value
 * @property {number} AB_HISTORY_RESULT_EVENT=4000 AB_HISTORY_RESULT_EVENT value
 * @property {number} AB_GAME_START_EVENT=4001 AB_GAME_START_EVENT value
 * @property {number} AB_STATE_EVENT=4002 AB_STATE_EVENT value
 * @property {number} AB_OPERATION_REQ=4003 AB_OPERATION_REQ value
 * @property {number} AB_OPERATION_EVENT=4004 AB_OPERATION_EVENT value
 * @property {number} AB_DEAL_CARDS_EVENT=4005 AB_DEAL_CARDS_EVENT value
 * @property {number} AB_GAME_END_EVENT=4006 AB_GAME_END_EVENT value
 * @property {number} AB_TOP_LIST_EVENT=4007 AB_TOP_LIST_EVENT value
 * @property {number} AB_ROOM_INFO=4008 AB_ROOM_INFO value
 * @property {number} AB_RANK_PLAYERS_EVEVT=4009 AB_RANK_PLAYERS_EVEVT value
 * @property {number} AB_STATE_EVENT_2=4011 AB_STATE_EVENT_2 value
 * @property {number} SEVEN_HISTORY_EVENT=5000 SEVEN_HISTORY_EVENT value
 * @property {number} SEVEN_STATE_EVENT=5001 SEVEN_STATE_EVENT value
 * @property {number} SEVEN_BET_REQ=5002 SEVEN_BET_REQ value
 * @property {number} SEVEN_BET_EVENT=5003 SEVEN_BET_EVENT value
 * @property {number} SEVEN_TABLE_PLAYERS_EVENT=5004 SEVEN_TABLE_PLAYERS_EVENT value
 * @property {number} SEVEN_TOP_PLAYERS_REQ=5005 SEVEN_TOP_PLAYERS_REQ value
 * @property {number} SEVEN_TOP_PLAYERS_REPLY=5006 SEVEN_TOP_PLAYERS_REPLY value
 * @property {number} SEVEN_GAME_END_EVENT=5007 SEVEN_GAME_END_EVENT value
 * @property {number} SEVEN_GAME_START_EVENT=5008 SEVEN_GAME_START_EVENT value
 * @property {number} SEVEN_BATCH_BET_EVENT=5009 SEVEN_BATCH_BET_EVENT value
 * @property {number} DT_HISTORY_EVENT=5100 DT_HISTORY_EVENT value
 * @property {number} DT_STATE_EVENT=5101 DT_STATE_EVENT value
 * @property {number} DT_BET_REQ=5102 DT_BET_REQ value
 * @property {number} DT_BET_EVENT=5103 DT_BET_EVENT value
 * @property {number} DT_TABLE_PLAYERS_EVENT=5104 DT_TABLE_PLAYERS_EVENT value
 * @property {number} DT_TOP_PLAYERS_REQ=5105 DT_TOP_PLAYERS_REQ value
 * @property {number} DT_TOP_PLAYERS_REPLY=5106 DT_TOP_PLAYERS_REPLY value
 * @property {number} DT_GAME_END_EVENT=5107 DT_GAME_END_EVENT value
 * @property {number} DT_GAME_START_EVENT=5108 DT_GAME_START_EVENT value
 * @property {number} DT_BATCH_BET_EVENT=5109 DT_BATCH_BET_EVENT value
 * @property {number} WINGO_HISTORY_EVENT=5200 WINGO_HISTORY_EVENT value
 * @property {number} WINGO_STATE_EVENT=5201 WINGO_STATE_EVENT value
 * @property {number} WINGO_BET_REQ=5202 WINGO_BET_REQ value
 * @property {number} WINGO_TABLE_PLAYERS_EVENT=5204 WINGO_TABLE_PLAYERS_EVENT value
 * @property {number} WINGO_TOP_PLAYERS_REQ=5205 WINGO_TOP_PLAYERS_REQ value
 * @property {number} WINGO_TOP_PLAYERS_REPLY=5206 WINGO_TOP_PLAYERS_REPLY value
 * @property {number} WINGO_GAME_END_EVENT=5207 WINGO_GAME_END_EVENT value
 * @property {number} WINGO_GAME_START_EVENT=5208 WINGO_GAME_START_EVENT value
 * @property {number} WINGO_BATCH_BET_EVENT=5209 WINGO_BATCH_BET_EVENT value
 * @property {number} FP_HISTORY_EVENT=5300 FP_HISTORY_EVENT value
 * @property {number} FP_STATE_EVENT=5301 FP_STATE_EVENT value
 * @property {number} FP_BET_REQ=5302 FP_BET_REQ value
 * @property {number} FP_TABLE_PLAYERS_EVENT=5304 FP_TABLE_PLAYERS_EVENT value
 * @property {number} FP_TOP_PLAYERS_REQ=5305 FP_TOP_PLAYERS_REQ value
 * @property {number} FP_TOP_PLAYERS_REPLY=5306 FP_TOP_PLAYERS_REPLY value
 * @property {number} FP_GAME_END_EVENT=5307 FP_GAME_END_EVENT value
 * @property {number} FP_GAME_START_EVENT=5308 FP_GAME_START_EVENT value
 * @property {number} FP_BATCH_BET_EVENT=5309 FP_BATCH_BET_EVENT value
 * @property {number} BTP_HISTORY_EVENT=5400 BTP_HISTORY_EVENT value
 * @property {number} BTP_STATE_EVENT=5401 BTP_STATE_EVENT value
 * @property {number} BTP_BET_REQ=5402 BTP_BET_REQ value
 * @property {number} BTP_TABLE_PLAYERS_EVENT=5404 BTP_TABLE_PLAYERS_EVENT value
 * @property {number} BTP_TOP_PLAYERS_REQ=5405 BTP_TOP_PLAYERS_REQ value
 * @property {number} BTP_TOP_PLAYERS_REPLY=5406 BTP_TOP_PLAYERS_REPLY value
 * @property {number} BTP_GAME_END_EVENT=5407 BTP_GAME_END_EVENT value
 * @property {number} BTP_GAME_START_EVENT=5408 BTP_GAME_START_EVENT value
 * @property {number} BTP_BATCH_BET_EVENT=5409 BTP_BATCH_BET_EVENT value
 * @property {number} CARROM_STATE_EVENT=6001 CARROM_STATE_EVENT value
 * @property {number} CARROM_STRIKE_RESULT_REQ=6002 CARROM_STRIKE_RESULT_REQ value
 * @property {number} CARROM_GAME_END_EVENT=6003 CARROM_GAME_END_EVENT value
 * @property {number} CARROM_RESULT_REQ=6004 CARROM_RESULT_REQ value
 * @property {number} CARROM_SYNC_GAME_DATA_REQ=6005 CARROM_SYNC_GAME_DATA_REQ value
 * @property {number} CARROM_HIT_REQ=6006 CARROM_HIT_REQ value
 * @property {number} CARROM_GUIDE_REQ=6007 CARROM_GUIDE_REQ value
 * @property {number} CARROM_GUIDE_REPLY=6008 CARROM_GUIDE_REPLY value
 * @property {number} POOL_AIM=7000 POOL_AIM value
 * @property {number} POOL_TECH_BALL=7001 POOL_TECH_BALL value
 * @property {number} POOL_FREE_BALL=7002 POOL_FREE_BALL value
 * @property {number} POOL_OPEN_TECHBALL=7003 POOL_OPEN_TECHBALL value
 * @property {number} POOL_SELECT_HOLE=7004 POOL_SELECT_HOLE value
 * @property {number} POOL_SELECT_BALL=7005 POOL_SELECT_BALL value
 * @property {number} POOL_CHARGE=7006 POOL_CHARGE value
 * @property {number} POOL_PRE_HIT=7007 POOL_PRE_HIT value
 * @property {number} POOL_HIT=7008 POOL_HIT value
 * @property {number} POOL_TALK=7009 POOL_TALK value
 * @property {number} POOL_PING=7010 POOL_PING value
 * @property {number} POOL_RESULT=7011 POOL_RESULT value
 * @property {number} POOL_TIMEOUT=7012 POOL_TIMEOUT value
 * @property {number} POOL_START_GAME=7200 POOL_START_GAME value
 * @property {number} POOL_READY=7100 POOL_READY value
 * @property {number} POOL_STARTTURN=7101 POOL_STARTTURN value
 * @property {number} POOL_GIVE_UP=7102 POOL_GIVE_UP value
 * @property {number} POOL_PLAYING=7201 POOL_PLAYING value
 * @property {number} POOL_LOOKING=7202 POOL_LOOKING value
 * @property {number} POOL_FOUL=7203 POOL_FOUL value
 * @property {number} POOL_PRAISE=7204 POOL_PRAISE value
 * @property {number} POOL_RESETBALL=7205 POOL_RESETBALL value
 * @property {number} POOL_WIN=7301 POOL_WIN value
 * @property {number} POOL_LOSE=7302 POOL_LOSE value
 * @property {number} POOL_SETTLE=7303 POOL_SETTLE value
 * @property {number} QA_TABLE_STATE_EVENT=8001 QA_TABLE_STATE_EVENT value
 * @property {number} QA_QUESTION_EVENT=8002 QA_QUESTION_EVENT value
 * @property {number} QA_ANSWER_REQ=8003 QA_ANSWER_REQ value
 * @property {number} QA_ANSWER_EVENT=8004 QA_ANSWER_EVENT value
 * @property {number} QA_GAME_END_EVENT=8005 QA_GAME_END_EVENT value
 * @property {number} QA_SEND_ROBOT_EVENT=8006 QA_SEND_ROBOT_EVENT value
 * @property {number} SHOT_STATE_REQ=8101 SHOT_STATE_REQ value
 * @property {number} SHOT_STATE_EVENT=8102 SHOT_STATE_EVENT value
 * @property {number} SHOT_BUY_REQ=8103 SHOT_BUY_REQ value
 * @property {number} SHOT_RESULT_REQ=8104 SHOT_RESULT_REQ value
 * @property {number} SHOT_PRE_HIT_REQ=8105 SHOT_PRE_HIT_REQ value
 * @property {number} RB_STATE_REQ=8110 RB_STATE_REQ value
 * @property {number} RB_STATE_REPLY=8111 RB_STATE_REPLY value
 * @property {number} RB_BET_REQ=8112 RB_BET_REQ value
 * @property {number} RB_BET_REPLY=8113 RB_BET_REPLY value
 * @property {number} RB_RANK_LIST_REQ=8114 RB_RANK_LIST_REQ value
 * @property {number} RB_RANK_LIST_REPLY=8115 RB_RANK_LIST_REPLY value
 * @property {number} RB_GIVE_UP_FREE=8116 RB_GIVE_UP_FREE value
 * @property {number} TRUCO_ONLINE_EVENT=9001 TRUCO_ONLINE_EVENT value
 * @property {number} TRUCO_GAME_START_EVENT=9002 TRUCO_GAME_START_EVENT value
 * @property {number} TRUCO_STATE_EVENT=9003 TRUCO_STATE_EVENT value
 * @property {number} TRUCO_DEAL_CARDS=9004 TRUCO_DEAL_CARDS value
 * @property {number} TRUCO_PLAYER_OPTION=9005 TRUCO_PLAYER_OPTION value
 * @property {number} TRUCO_OPERATION_REQ=9006 TRUCO_OPERATION_REQ value
 * @property {number} TRUCO_OPERATION_EVENT=9007 TRUCO_OPERATION_EVENT value
 * @property {number} TRUCO_TURN_END_EVENT=9008 TRUCO_TURN_END_EVENT value
 * @property {number} TRUCO_GAME_END_EVENT=9009 TRUCO_GAME_END_EVENT value
 * @property {number} TRUCO_OPERATION_FAILED=9010 TRUCO_OPERATION_FAILED value
 * @property {number} TRUCO_SCORE_EVENT=9011 TRUCO_SCORE_EVENT value
 * @property {number} TRUCO_SHOW_CARDS_EVENT=9012 TRUCO_SHOW_CARDS_EVENT value
 * @property {number} TRUCO_TEAM_SCORE_EVENT=9013 TRUCO_TEAM_SCORE_EVENT value
 * @property {number} TRUCO_CONFIRM_REQ=9014 TRUCO_CONFIRM_REQ value
 * @property {number} TRUCO_WIN_CARDS=9015 TRUCO_WIN_CARDS value
 * @property {number} TRUCO_TEAM_OPERATION=9016 TRUCO_TEAM_OPERATION value
 * @property {number} TRUCO_SEAT_CARDS=9017 TRUCO_SEAT_CARDS value
 * @property {number} CRASH_HISTORY_RESULT_EVENT=10001 CRASH_HISTORY_RESULT_EVENT value
 * @property {number} CRASH_GAME_START_EVENT=10002 CRASH_GAME_START_EVENT value
 * @property {number} CRASH_PLAYERS_EVEVT=10003 CRASH_PLAYERS_EVEVT value
 * @property {number} CRASH_STATE_EVENT=10004 CRASH_STATE_EVENT value
 * @property {number} CRASH_BET_REQ=10005 CRASH_BET_REQ value
 * @property {number} CRASH_BET_EVENT=10006 CRASH_BET_EVENT value
 * @property {number} CRASH_GAME_END_EVENT=10007 CRASH_GAME_END_EVENT value
 * @property {number} CRASH_PLAYER_LIST_REQ=10008 CRASH_PLAYER_LIST_REQ value
 * @property {number} CRASH_PLAYER_LIST_EVENT=10009 CRASH_PLAYER_LIST_EVENT value
 * @property {number} CRASH_PLAYER_SETTLEMENT_REQ=10010 CRASH_PLAYER_SETTLEMENT_REQ value
 * @property {number} CRASH_PLAYER_SETTLEMENT_RESP=10011 CRASH_PLAYER_SETTLEMENT_RESP value
 * @property {number} SLOTS1_STATE_REQ=10101 SLOTS1_STATE_REQ value
 * @property {number} SLOTS1_STATE_REPLY=10102 SLOTS1_STATE_REPLY value
 * @property {number} SLOTS1_BET_REQ=10103 SLOTS1_BET_REQ value
 * @property {number} SLOTS1_BET_REPLY=10104 SLOTS1_BET_REPLY value
 * @property {number} SLOTS2_STATE_REQ=10201 SLOTS2_STATE_REQ value
 * @property {number} SLOTS2_STATE_REPLY=10202 SLOTS2_STATE_REPLY value
 * @property {number} SLOTS2_BET_REQ=10203 SLOTS2_BET_REQ value
 * @property {number} SLOTS2_BET_REPLY=10204 SLOTS2_BET_REPLY value
 * @property {number} SLOTS3_STATE_REQ=10301 SLOTS3_STATE_REQ value
 * @property {number} SLOTS3_STATE_REPLY=10302 SLOTS3_STATE_REPLY value
 * @property {number} SLOTS3_BET_REQ=10303 SLOTS3_BET_REQ value
 * @property {number} SLOTS3_BET_REPLY=10304 SLOTS3_BET_REPLY value
 * @property {number} SJB_STATE_REQ=10401 SJB_STATE_REQ value
 * @property {number} SJB_STATE_RESP=10402 SJB_STATE_RESP value
 * @property {number} SJB_GAMESTART_REQ=10403 SJB_GAMESTART_REQ value
 * @property {number} SJB_GAMESTART_REPLY=10404 SJB_GAMESTART_REPLY value
 * @property {number} SJB_BLOCK_REQ=10405 SJB_BLOCK_REQ value
 * @property {number} SJB_BLOCK_RESP=10406 SJB_BLOCK_RESP value
 * @property {number} EGYPT_STATE_REQ=10501 EGYPT_STATE_REQ value
 * @property {number} EGYPT_STATE_RESP=10502 EGYPT_STATE_RESP value
 * @property {number} EGYPT_GAMESTART_REQ=10503 EGYPT_GAMESTART_REQ value
 * @property {number} EGYPT_GAMESTART_RESP=10504 EGYPT_GAMESTART_RESP value
 * @property {number} EGYPT_BLOCK_REQ=10505 EGYPT_BLOCK_REQ value
 * @property {number} EGYPT_BLOCK_RESP=10506 EGYPT_BLOCK_RESP value
 * @property {number} AZTEC_STATE_REQ=10601 AZTEC_STATE_REQ value
 * @property {number} AZTEC_STATE_RESP=10602 AZTEC_STATE_RESP value
 * @property {number} AZTEC_GAMESTART_REQ=10603 AZTEC_GAMESTART_REQ value
 * @property {number} AZTEC_GAMESTART_RESP=10604 AZTEC_GAMESTART_RESP value
 * @property {number} AZTEC_BLOCK_REQ=10605 AZTEC_BLOCK_REQ value
 * @property {number} AZTEC_BLOCK_RESP=10606 AZTEC_BLOCK_RESP value
 * @property {number} JLB_STATE_REQ=10701 JLB_STATE_REQ value
 * @property {number} JLB_STATE_RESP=10702 JLB_STATE_RESP value
 * @property {number} JLB_GAMESTART_REQ=10703 JLB_GAMESTART_REQ value
 * @property {number} JLB_GAMESTART_RESP=10704 JLB_GAMESTART_RESP value
 * @property {number} JLB_BLOCK_REQ=10705 JLB_BLOCK_REQ value
 * @property {number} JLB_BLOCK_RESP=10706 JLB_BLOCK_RESP value
 * @property {number} DRAGON_STATE_REQ=10801 DRAGON_STATE_REQ value
 * @property {number} DRAGON_STATE_RESP=10802 DRAGON_STATE_RESP value
 * @property {number} DRAGON_GAMESTART_REQ=10803 DRAGON_GAMESTART_REQ value
 * @property {number} DRAGON_GAMESTART_RESP=10804 DRAGON_GAMESTART_RESP value
 * @property {number} DRAGON_BLOCK_REQ=10805 DRAGON_BLOCK_REQ value
 * @property {number} DRAGON_BLOCK_RESP=10806 DRAGON_BLOCK_RESP value
 * @property {number} ZEUS_STATE_REQ=10901 ZEUS_STATE_REQ value
 * @property {number} ZEUS_STATE_RESP=10902 ZEUS_STATE_RESP value
 * @property {number} ZEUS_GAMESTART_REQ=10903 ZEUS_GAMESTART_REQ value
 * @property {number} ZEUS_GAMESTART_RESP=10904 ZEUS_GAMESTART_RESP value
 * @property {number} ZEUS_BLOCK_REQ=10905 ZEUS_BLOCK_REQ value
 * @property {number} ZEUS_BLOCK_RESP=10906 ZEUS_BLOCK_RESP value
 * @property {number} FRUIT_STATE_REQ=11001 FRUIT_STATE_REQ value
 * @property {number} FRUIT_STATE_RESP=11002 FRUIT_STATE_RESP value
 * @property {number} FRUIT_GAMESTART_REQ=11003 FRUIT_GAMESTART_REQ value
 * @property {number} FRUIT_GAMESTART_RESP=11004 FRUIT_GAMESTART_RESP value
 * @property {number} FRUIT_BLOCK_REQ=11005 FRUIT_BLOCK_REQ value
 * @property {number} FRUIT_BLOCK_RESP=11006 FRUIT_BLOCK_RESP value
 * @property {number} SJB02_STATE_REQ=11101 SJB02_STATE_REQ value
 * @property {number} SJB02_STATE_RESP=11102 SJB02_STATE_RESP value
 * @property {number} SJB02_GAMESTART_REQ=11103 SJB02_GAMESTART_REQ value
 * @property {number} SJB02_GAMESTART_RESP=11104 SJB02_GAMESTART_RESP value
 * @property {number} SJB02_BLOCK_REQ=11105 SJB02_BLOCK_REQ value
 * @property {number} SJB02_BLOCK_RESP=11106 SJB02_BLOCK_RESP value
 * @property {number} SPARTA_STATE_REQ=11201 SPARTA_STATE_REQ value
 * @property {number} SPARTA_STATE_RESP=11202 SPARTA_STATE_RESP value
 * @property {number} SPARTA_GAMESTART_REQ=11203 SPARTA_GAMESTART_REQ value
 * @property {number} SPARTA_GAMESTART_RESP=11204 SPARTA_GAMESTART_RESP value
 * @property {number} SPARTA_BLOCK_REQ=11205 SPARTA_BLOCK_REQ value
 * @property {number} SPARTA_BLOCK_RESP=11206 SPARTA_BLOCK_RESP value
 * @property {number} MONEY_STATE_REQ=11301 MONEY_STATE_REQ value
 * @property {number} MONEY_STATE_RESP=11302 MONEY_STATE_RESP value
 * @property {number} MONEY_GAMESTART_REQ=11303 MONEY_GAMESTART_REQ value
 * @property {number} MONEY_GAMESTART_RESP=11304 MONEY_GAMESTART_RESP value
 * @property {number} MONEY_BLOCK_REQ=11305 MONEY_BLOCK_REQ value
 * @property {number} MONEY_BLOCK_RESP=11306 MONEY_BLOCK_RESP value
 * @property {number} TIGER_STATE_REQ=11401 TIGER_STATE_REQ value
 * @property {number} TIGER_STATE_RESP=11402 TIGER_STATE_RESP value
 * @property {number} TIGER_GAMESTART_REQ=11403 TIGER_GAMESTART_REQ value
 * @property {number} TIGER_GAMESTART_RESP=11404 TIGER_GAMESTART_RESP value
 * @property {number} TIGER_BLOCK_REQ=11405 TIGER_BLOCK_REQ value
 * @property {number} TIGER_BLOCK_RESP=11406 TIGER_BLOCK_RESP value
 * @property {number} ZEUS02_STATE_REQ=11501 ZEUS02_STATE_REQ value
 * @property {number} ZEUS02_STATE_RESP=11502 ZEUS02_STATE_RESP value
 * @property {number} ZEUS02_GAMESTART_REQ=11503 ZEUS02_GAMESTART_REQ value
 * @property {number} ZEUS02_GAMESTART_RESP=11504 ZEUS02_GAMESTART_RESP value
 * @property {number} ZEUS02_BLOCK_REQ=11505 ZEUS02_BLOCK_REQ value
 * @property {number} ZEUS02_BLOCK_RESP=11506 ZEUS02_BLOCK_RESP value
 * @property {number} BULL_STATE_REQ=11601 BULL_STATE_REQ value
 * @property {number} BULL_STATE_RESP=11602 BULL_STATE_RESP value
 * @property {number} BULL_GAMESTART_REQ=11603 BULL_GAMESTART_REQ value
 * @property {number} BULL_GAMESTART_RESP=11604 BULL_GAMESTART_RESP value
 * @property {number} BULL_BLOCK_REQ=11605 BULL_BLOCK_REQ value
 * @property {number} BULL_BLOCK_RESP=11606 BULL_BLOCK_RESP value
 * @property {number} WOLF_STATE_REQ=11701 WOLF_STATE_REQ value
 * @property {number} WOLF_STATE_RESP=11702 WOLF_STATE_RESP value
 * @property {number} WOLF_GAMESTART_REQ=11703 WOLF_GAMESTART_REQ value
 * @property {number} WOLF_GAMESTART_RESP=11704 WOLF_GAMESTART_RESP value
 * @property {number} WOLF_BLOCK_REQ=11705 WOLF_BLOCK_REQ value
 * @property {number} WOLF_BLOCK_RESP=11706 WOLF_BLOCK_RESP value
 * @property {number} TIGER02_STATE_REQ=11801 TIGER02_STATE_REQ value
 * @property {number} TIGER02_STATE_RESP=11802 TIGER02_STATE_RESP value
 * @property {number} TIGER02_GAMESTART_REQ=11803 TIGER02_GAMESTART_REQ value
 * @property {number} TIGER02_GAMESTART_RESP=11804 TIGER02_GAMESTART_RESP value
 * @property {number} TIGER02_BLOCK_REQ=11805 TIGER02_BLOCK_REQ value
 * @property {number} TIGER02_BLOCK_RESP=11806 TIGER02_BLOCK_RESP value
 * @property {number} LPIG_STATE_REQ=11901 LPIG_STATE_REQ value
 * @property {number} LPIG_STATE_RESP=11902 LPIG_STATE_RESP value
 * @property {number} LPIG_GAMESTART_REQ=11903 LPIG_GAMESTART_REQ value
 * @property {number} LPIG_GAMESTART_RESP=11904 LPIG_GAMESTART_RESP value
 * @property {number} LPIG_BLOCK_REQ=11905 LPIG_BLOCK_REQ value
 * @property {number} LPIG_BLOCK_RESP=11906 LPIG_BLOCK_RESP value
 * @property {number} NMOUSE_STATE_REQ=12101 NMOUSE_STATE_REQ value
 * @property {number} NMOUSE_STATE_RESP=12102 NMOUSE_STATE_RESP value
 * @property {number} NMOUSE_GAMESTART_REQ=12103 NMOUSE_GAMESTART_REQ value
 * @property {number} NMOUSE_GAMESTART_RESP=12104 NMOUSE_GAMESTART_RESP value
 * @property {number} NMOUSE_BLOCK_REQ=12105 NMOUSE_BLOCK_REQ value
 * @property {number} NMOUSE_BLOCK_RESP=12106 NMOUSE_BLOCK_RESP value
 * @property {number} NCOW_STATE_REQ=12201 NCOW_STATE_REQ value
 * @property {number} NCOW_STATE_RESP=12202 NCOW_STATE_RESP value
 * @property {number} NCOW_GAMESTART_REQ=12203 NCOW_GAMESTART_REQ value
 * @property {number} NCOW_GAMESTART_RESP=12204 NCOW_GAMESTART_RESP value
 * @property {number} NCOW_BLOCK_REQ=12205 NCOW_BLOCK_REQ value
 * @property {number} NCOW_BLOCK_RESP=12206 NCOW_BLOCK_RESP value
 * @property {number} NTIGER_STATE_REQ=12301 NTIGER_STATE_REQ value
 * @property {number} NTIGER_STATE_RESP=12302 NTIGER_STATE_RESP value
 * @property {number} NTIGER_GAMESTART_REQ=12303 NTIGER_GAMESTART_REQ value
 * @property {number} NTIGER_GAMESTART_RESP=12304 NTIGER_GAMESTART_RESP value
 * @property {number} NTIGER_BLOCK_REQ=12305 NTIGER_BLOCK_REQ value
 * @property {number} NTIGER_BLOCK_RESP=12306 NTIGER_BLOCK_RESP value
 * @property {number} NRABIT_STATE_REQ=12401 NRABIT_STATE_REQ value
 * @property {number} NRABIT_STATE_RESP=12402 NRABIT_STATE_RESP value
 * @property {number} NRABIT_GAMESTART_REQ=12403 NRABIT_GAMESTART_REQ value
 * @property {number} NRABIT_GAMESTART_RESP=12404 NRABIT_GAMESTART_RESP value
 * @property {number} NRABIT_BLOCK_REQ=12405 NRABIT_BLOCK_REQ value
 * @property {number} NRABIT_BLOCK_RESP=12406 NRABIT_BLOCK_RESP value
 * @property {number} BGAMING_OPEN_REQ=12001 BGAMING_OPEN_REQ value
 * @property {number} BGAMING_OPEN_RESP=12002 BGAMING_OPEN_RESP value
 * @property {number} EVOPLAY_OPEN_REQ=12003 EVOPLAY_OPEN_REQ value
 * @property {number} EVOPLAY_OPEN_RESP=12004 EVOPLAY_OPEN_RESP value
 * @property {number} PGSOFT_OPEN_REQ=12005 PGSOFT_OPEN_REQ value
 * @property {number} PGSOFT_OPEN_RESP=12006 PGSOFT_OPEN_RESP value
 * @property {number} PPSOFT_OPEN_REQ=12007 PPSOFT_OPEN_REQ value
 * @property {number} PPSOFT_OPEN_RESP=12008 PPSOFT_OPEN_RESP value
 * @property {number} JILIGAMES_OPEN_REQ=12009 JILIGAMES_OPEN_REQ value
 * @property {number} JILIGAMES_OPEN_RESP=12010 JILIGAMES_OPEN_RESP value
 */
$root.MSG_TYPE = (function() {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "DEFAULT"] = 0;
    values[valuesById[1] = "CONNECTED"] = 1;
    values[valuesById[2] = "UNLOGIN"] = 2;
    values[valuesById[3] = "PING"] = 3;
    values[valuesById[4] = "PONG"] = 4;
    values[valuesById[5] = "CLOSE"] = 5;
    values[valuesById[6] = "SEND_COMMAND"] = 6;
    values[valuesById[10] = "SERVER_AUTH"] = 10;
    values[valuesById[11] = "SYNC_ONLINE_STATUS"] = 11;
    values[valuesById[12] = "SYNC_PLAYER_BALANCE"] = 12;
    values[valuesById[13] = "GAME_PLAYER_SETTLED"] = 13;
    values[valuesById[14] = "SYNC_PLAYER_GAME_DATA"] = 14;
    values[valuesById[15] = "SYNC_PLAYER_DATA"] = 15;
    values[valuesById[17] = "PLAYER_WIN_MSG"] = 17;
    values[valuesById[20] = "REGISTRY_SYNC_SERVER_DATA"] = 20;
    values[valuesById[21] = "SYNC_GAME_SERVER_DATA"] = 21;
    values[valuesById[22] = "ADD_PLAYER_BONUS"] = 22;
    values[valuesById[23] = "FREEZE_BALANCE"] = 23;
    values[valuesById[100] = "PLAYER_LOGIN_REQ"] = 100;
    values[valuesById[101] = "PLAYER_LOGIN_REPLY"] = 101;
    values[valuesById[102] = "PLAYER_LOGOUT_REQ"] = 102;
    values[valuesById[103] = "PLAYER_LOGOUT_REPLY"] = 103;
    values[valuesById[104] = "PLAYER_BALANCE_EVENT"] = 104;
    values[valuesById[105] = "BALANCE_HISTORY_REQ"] = 105;
    values[valuesById[106] = "BALANCE_HISTORY_REPLY"] = 106;
    values[valuesById[107] = "BONUS_HISTORY_REQ"] = 107;
    values[valuesById[108] = "BONUS_HISTORY_REPLY"] = 108;
    values[valuesById[109] = "PLAYER_BALANCE_REQ"] = 109;
    values[valuesById[110] = "PLAYER_INFO_CHANGE"] = 110;
    values[valuesById[111] = "PLAYER_GAME_DATA_REQ"] = 111;
    values[valuesById[112] = "PLAYER_GAME_DATA_REPLY"] = 112;
    values[valuesById[113] = "PLAYER_BALANCE_FORCE_REQ"] = 113;
    values[valuesById[200] = "ROOM_LIST_REQ"] = 200;
    values[valuesById[201] = "ROOM_LIST_REPLY"] = 201;
    values[valuesById[202] = "ENTER_ROOM_REQ"] = 202;
    values[valuesById[203] = "ENTER_ROOM_REPLY"] = 203;
    values[valuesById[204] = "EXIT_ROOM_REQ"] = 204;
    values[valuesById[205] = "EXIT_ROOM_REPLY"] = 205;
    values[valuesById[206] = "SWITCH_TABLE_REQ"] = 206;
    values[valuesById[207] = "TABLE_LIST_REQ"] = 207;
    values[valuesById[208] = "TABLE_LIST_REPLY"] = 208;
    values[valuesById[209] = "GLOBAL_NOTICE"] = 209;
    values[valuesById[300] = "TABLE_PLAYERS_EVENT"] = 300;
    values[valuesById[301] = "TABLE_TIME_EVENT"] = 301;
    values[valuesById[302] = "GAME_BALANCE_EVENT"] = 302;
    values[valuesById[303] = "CHAT_EXPRESSION_REQ"] = 303;
    values[valuesById[304] = "CHAT_EXPRESSION_EVENT"] = 304;
    values[valuesById[305] = "CHAT_VOICE_REQ"] = 305;
    values[valuesById[306] = "CHAT_VOICE_EVENT"] = 306;
    values[valuesById[307] = "PRIVATE_TABLE_READY_REQ"] = 307;
    values[valuesById[308] = "PRIVATE_TABLE_READY_EVENT"] = 308;
    values[valuesById[1000] = "TP_GAME_START_EVENT"] = 1000;
    values[valuesById[1001] = "TP_BUTTON_EVENT"] = 1001;
    values[valuesById[1002] = "TP_DEAL_CARDS"] = 1002;
    values[valuesById[1003] = "TP_STATE_EVENT"] = 1003;
    values[valuesById[1004] = "TP_OPERATION_REQ"] = 1004;
    values[valuesById[1005] = "TP_OPERATION_EVENT"] = 1005;
    values[valuesById[1006] = "TP_SHOW_CARDS_EVENT"] = 1006;
    values[valuesById[1007] = "TP_GAME_END_EVENT"] = 1007;
    values[valuesById[1008] = "TP_ALL_SEAT_CARDS"] = 1008;
    values[valuesById[2000] = "RUMMY_GAME_START_EVENT"] = 2000;
    values[valuesById[2001] = "RUMMY_BUTTON_EVENT"] = 2001;
    values[valuesById[2002] = "RUMMY_DEAL_CARDS"] = 2002;
    values[valuesById[2003] = "RUMMY_STATE_EVENT"] = 2003;
    values[valuesById[2004] = "RUMMY_OPERATION_REQ"] = 2004;
    values[valuesById[2005] = "RUMMY_OPERATION_EVENT"] = 2005;
    values[valuesById[2006] = "RUMMY_DECLARE_REQ"] = 2006;
    values[valuesById[2007] = "RUMMY_DECLARE_EVENT"] = 2007;
    values[valuesById[2008] = "RUMMY_GROUP_REQ"] = 2008;
    values[valuesById[2009] = "RUMMY_CONFIRM_REQ"] = 2009;
    values[valuesById[2010] = "RUMMY_GAME_END_EVENT"] = 2010;
    values[valuesById[2011] = "RUMMY_SEAT_CARDS"] = 2011;
    values[valuesById[2012] = "RUMMY_HISTORY_EVENT"] = 2012;
    values[valuesById[2013] = "RUMMY_SEAT_SCORE"] = 2013;
    values[valuesById[3000] = "TEXAS_ROUND_CAST"] = 3000;
    values[valuesById[3001] = "TEXAS_TABLE_STATE"] = 3001;
    values[valuesById[3002] = "TEXAS_DEAL_CARDS_EVENT"] = 3002;
    values[valuesById[3003] = "TEXAS_OPERATION_REQ"] = 3003;
    values[valuesById[3004] = "TEXAS_OPERATION_CAST"] = 3004;
    values[valuesById[3005] = "TEXAS_TURN_START_EVENT"] = 3005;
    values[valuesById[3006] = "TEXAS_GAME_WIN_CAST"] = 3006;
    values[valuesById[3007] = "TEXAS_GAME_BALANCE_CAST"] = 3007;
    values[valuesById[3008] = "TEXAS_NEXT_TURN_EVENT"] = 3008;
    values[valuesById[3009] = "TEXAS_ALL_TABLE_STATE"] = 3009;
    values[valuesById[3010] = "TEXAS_STAND_REQ"] = 3010;
    values[valuesById[3011] = "TEXAS_STAND_REPLY"] = 3011;
    values[valuesById[3012] = "TEXAS_SIT_REQ"] = 3012;
    values[valuesById[3013] = "TEXAS_SIT_REPLY"] = 3013;
    values[valuesById[3014] = "TEXAS_GAME_DATA_REQ"] = 3014;
    values[valuesById[3015] = "TEXAS_GAME_DATA_REPLY"] = 3015;
    values[valuesById[3016] = "TEXAS_BUY_IN_RANGE_REQ"] = 3016;
    values[valuesById[3017] = "TEXAS_BUY_IN_RANGE_REPLY"] = 3017;
    values[valuesById[3018] = "TEXAS_BUY_IN_REQ"] = 3018;
    values[valuesById[4000] = "AB_HISTORY_RESULT_EVENT"] = 4000;
    values[valuesById[4001] = "AB_GAME_START_EVENT"] = 4001;
    values[valuesById[4002] = "AB_STATE_EVENT"] = 4002;
    values[valuesById[4003] = "AB_OPERATION_REQ"] = 4003;
    values[valuesById[4004] = "AB_OPERATION_EVENT"] = 4004;
    values[valuesById[4005] = "AB_DEAL_CARDS_EVENT"] = 4005;
    values[valuesById[4006] = "AB_GAME_END_EVENT"] = 4006;
    values[valuesById[4007] = "AB_TOP_LIST_EVENT"] = 4007;
    values[valuesById[4008] = "AB_ROOM_INFO"] = 4008;
    values[valuesById[4009] = "AB_RANK_PLAYERS_EVEVT"] = 4009;
    values[valuesById[4011] = "AB_STATE_EVENT_2"] = 4011;
    values[valuesById[5000] = "SEVEN_HISTORY_EVENT"] = 5000;
    values[valuesById[5001] = "SEVEN_STATE_EVENT"] = 5001;
    values[valuesById[5002] = "SEVEN_BET_REQ"] = 5002;
    values[valuesById[5003] = "SEVEN_BET_EVENT"] = 5003;
    values[valuesById[5004] = "SEVEN_TABLE_PLAYERS_EVENT"] = 5004;
    values[valuesById[5005] = "SEVEN_TOP_PLAYERS_REQ"] = 5005;
    values[valuesById[5006] = "SEVEN_TOP_PLAYERS_REPLY"] = 5006;
    values[valuesById[5007] = "SEVEN_GAME_END_EVENT"] = 5007;
    values[valuesById[5008] = "SEVEN_GAME_START_EVENT"] = 5008;
    values[valuesById[5009] = "SEVEN_BATCH_BET_EVENT"] = 5009;
    values[valuesById[5100] = "DT_HISTORY_EVENT"] = 5100;
    values[valuesById[5101] = "DT_STATE_EVENT"] = 5101;
    values[valuesById[5102] = "DT_BET_REQ"] = 5102;
    values[valuesById[5103] = "DT_BET_EVENT"] = 5103;
    values[valuesById[5104] = "DT_TABLE_PLAYERS_EVENT"] = 5104;
    values[valuesById[5105] = "DT_TOP_PLAYERS_REQ"] = 5105;
    values[valuesById[5106] = "DT_TOP_PLAYERS_REPLY"] = 5106;
    values[valuesById[5107] = "DT_GAME_END_EVENT"] = 5107;
    values[valuesById[5108] = "DT_GAME_START_EVENT"] = 5108;
    values[valuesById[5109] = "DT_BATCH_BET_EVENT"] = 5109;
    values[valuesById[5200] = "WINGO_HISTORY_EVENT"] = 5200;
    values[valuesById[5201] = "WINGO_STATE_EVENT"] = 5201;
    values[valuesById[5202] = "WINGO_BET_REQ"] = 5202;
    values[valuesById[5204] = "WINGO_TABLE_PLAYERS_EVENT"] = 5204;
    values[valuesById[5205] = "WINGO_TOP_PLAYERS_REQ"] = 5205;
    values[valuesById[5206] = "WINGO_TOP_PLAYERS_REPLY"] = 5206;
    values[valuesById[5207] = "WINGO_GAME_END_EVENT"] = 5207;
    values[valuesById[5208] = "WINGO_GAME_START_EVENT"] = 5208;
    values[valuesById[5209] = "WINGO_BATCH_BET_EVENT"] = 5209;
    values[valuesById[5300] = "FP_HISTORY_EVENT"] = 5300;
    values[valuesById[5301] = "FP_STATE_EVENT"] = 5301;
    values[valuesById[5302] = "FP_BET_REQ"] = 5302;
    values[valuesById[5304] = "FP_TABLE_PLAYERS_EVENT"] = 5304;
    values[valuesById[5305] = "FP_TOP_PLAYERS_REQ"] = 5305;
    values[valuesById[5306] = "FP_TOP_PLAYERS_REPLY"] = 5306;
    values[valuesById[5307] = "FP_GAME_END_EVENT"] = 5307;
    values[valuesById[5308] = "FP_GAME_START_EVENT"] = 5308;
    values[valuesById[5309] = "FP_BATCH_BET_EVENT"] = 5309;
    values[valuesById[5400] = "BTP_HISTORY_EVENT"] = 5400;
    values[valuesById[5401] = "BTP_STATE_EVENT"] = 5401;
    values[valuesById[5402] = "BTP_BET_REQ"] = 5402;
    values[valuesById[5404] = "BTP_TABLE_PLAYERS_EVENT"] = 5404;
    values[valuesById[5405] = "BTP_TOP_PLAYERS_REQ"] = 5405;
    values[valuesById[5406] = "BTP_TOP_PLAYERS_REPLY"] = 5406;
    values[valuesById[5407] = "BTP_GAME_END_EVENT"] = 5407;
    values[valuesById[5408] = "BTP_GAME_START_EVENT"] = 5408;
    values[valuesById[5409] = "BTP_BATCH_BET_EVENT"] = 5409;
    values[valuesById[6001] = "CARROM_STATE_EVENT"] = 6001;
    values[valuesById[6002] = "CARROM_STRIKE_RESULT_REQ"] = 6002;
    values[valuesById[6003] = "CARROM_GAME_END_EVENT"] = 6003;
    values[valuesById[6004] = "CARROM_RESULT_REQ"] = 6004;
    values[valuesById[6005] = "CARROM_SYNC_GAME_DATA_REQ"] = 6005;
    values[valuesById[6006] = "CARROM_HIT_REQ"] = 6006;
    values[valuesById[6007] = "CARROM_GUIDE_REQ"] = 6007;
    values[valuesById[6008] = "CARROM_GUIDE_REPLY"] = 6008;
    values[valuesById[7000] = "POOL_AIM"] = 7000;
    values[valuesById[7001] = "POOL_TECH_BALL"] = 7001;
    values[valuesById[7002] = "POOL_FREE_BALL"] = 7002;
    values[valuesById[7003] = "POOL_OPEN_TECHBALL"] = 7003;
    values[valuesById[7004] = "POOL_SELECT_HOLE"] = 7004;
    values[valuesById[7005] = "POOL_SELECT_BALL"] = 7005;
    values[valuesById[7006] = "POOL_CHARGE"] = 7006;
    values[valuesById[7007] = "POOL_PRE_HIT"] = 7007;
    values[valuesById[7008] = "POOL_HIT"] = 7008;
    values[valuesById[7009] = "POOL_TALK"] = 7009;
    values[valuesById[7010] = "POOL_PING"] = 7010;
    values[valuesById[7011] = "POOL_RESULT"] = 7011;
    values[valuesById[7012] = "POOL_TIMEOUT"] = 7012;
    values[valuesById[7200] = "POOL_START_GAME"] = 7200;
    values[valuesById[7100] = "POOL_READY"] = 7100;
    values[valuesById[7101] = "POOL_STARTTURN"] = 7101;
    values[valuesById[7102] = "POOL_GIVE_UP"] = 7102;
    values[valuesById[7201] = "POOL_PLAYING"] = 7201;
    values[valuesById[7202] = "POOL_LOOKING"] = 7202;
    values[valuesById[7203] = "POOL_FOUL"] = 7203;
    values[valuesById[7204] = "POOL_PRAISE"] = 7204;
    values[valuesById[7205] = "POOL_RESETBALL"] = 7205;
    values[valuesById[7301] = "POOL_WIN"] = 7301;
    values[valuesById[7302] = "POOL_LOSE"] = 7302;
    values[valuesById[7303] = "POOL_SETTLE"] = 7303;
    values[valuesById[8001] = "QA_TABLE_STATE_EVENT"] = 8001;
    values[valuesById[8002] = "QA_QUESTION_EVENT"] = 8002;
    values[valuesById[8003] = "QA_ANSWER_REQ"] = 8003;
    values[valuesById[8004] = "QA_ANSWER_EVENT"] = 8004;
    values[valuesById[8005] = "QA_GAME_END_EVENT"] = 8005;
    values[valuesById[8006] = "QA_SEND_ROBOT_EVENT"] = 8006;
    values[valuesById[8101] = "SHOT_STATE_REQ"] = 8101;
    values[valuesById[8102] = "SHOT_STATE_EVENT"] = 8102;
    values[valuesById[8103] = "SHOT_BUY_REQ"] = 8103;
    values[valuesById[8104] = "SHOT_RESULT_REQ"] = 8104;
    values[valuesById[8105] = "SHOT_PRE_HIT_REQ"] = 8105;
    values[valuesById[8110] = "RB_STATE_REQ"] = 8110;
    values[valuesById[8111] = "RB_STATE_REPLY"] = 8111;
    values[valuesById[8112] = "RB_BET_REQ"] = 8112;
    values[valuesById[8113] = "RB_BET_REPLY"] = 8113;
    values[valuesById[8114] = "RB_RANK_LIST_REQ"] = 8114;
    values[valuesById[8115] = "RB_RANK_LIST_REPLY"] = 8115;
    values[valuesById[8116] = "RB_GIVE_UP_FREE"] = 8116;
    values[valuesById[9001] = "TRUCO_ONLINE_EVENT"] = 9001;
    values[valuesById[9002] = "TRUCO_GAME_START_EVENT"] = 9002;
    values[valuesById[9003] = "TRUCO_STATE_EVENT"] = 9003;
    values[valuesById[9004] = "TRUCO_DEAL_CARDS"] = 9004;
    values[valuesById[9005] = "TRUCO_PLAYER_OPTION"] = 9005;
    values[valuesById[9006] = "TRUCO_OPERATION_REQ"] = 9006;
    values[valuesById[9007] = "TRUCO_OPERATION_EVENT"] = 9007;
    values[valuesById[9008] = "TRUCO_TURN_END_EVENT"] = 9008;
    values[valuesById[9009] = "TRUCO_GAME_END_EVENT"] = 9009;
    values[valuesById[9010] = "TRUCO_OPERATION_FAILED"] = 9010;
    values[valuesById[9011] = "TRUCO_SCORE_EVENT"] = 9011;
    values[valuesById[9012] = "TRUCO_SHOW_CARDS_EVENT"] = 9012;
    values[valuesById[9013] = "TRUCO_TEAM_SCORE_EVENT"] = 9013;
    values[valuesById[9014] = "TRUCO_CONFIRM_REQ"] = 9014;
    values[valuesById[9015] = "TRUCO_WIN_CARDS"] = 9015;
    values[valuesById[9016] = "TRUCO_TEAM_OPERATION"] = 9016;
    values[valuesById[9017] = "TRUCO_SEAT_CARDS"] = 9017;
    values[valuesById[10001] = "CRASH_HISTORY_RESULT_EVENT"] = 10001;
    values[valuesById[10002] = "CRASH_GAME_START_EVENT"] = 10002;
    values[valuesById[10003] = "CRASH_PLAYERS_EVEVT"] = 10003;
    values[valuesById[10004] = "CRASH_STATE_EVENT"] = 10004;
    values[valuesById[10005] = "CRASH_BET_REQ"] = 10005;
    values[valuesById[10006] = "CRASH_BET_EVENT"] = 10006;
    values[valuesById[10007] = "CRASH_GAME_END_EVENT"] = 10007;
    values[valuesById[10008] = "CRASH_PLAYER_LIST_REQ"] = 10008;
    values[valuesById[10009] = "CRASH_PLAYER_LIST_EVENT"] = 10009;
    values[valuesById[10010] = "CRASH_PLAYER_SETTLEMENT_REQ"] = 10010;
    values[valuesById[10011] = "CRASH_PLAYER_SETTLEMENT_RESP"] = 10011;
    values[valuesById[10101] = "SLOTS1_STATE_REQ"] = 10101;
    values[valuesById[10102] = "SLOTS1_STATE_REPLY"] = 10102;
    values[valuesById[10103] = "SLOTS1_BET_REQ"] = 10103;
    values[valuesById[10104] = "SLOTS1_BET_REPLY"] = 10104;
    values[valuesById[10201] = "SLOTS2_STATE_REQ"] = 10201;
    values[valuesById[10202] = "SLOTS2_STATE_REPLY"] = 10202;
    values[valuesById[10203] = "SLOTS2_BET_REQ"] = 10203;
    values[valuesById[10204] = "SLOTS2_BET_REPLY"] = 10204;
    values[valuesById[10301] = "SLOTS3_STATE_REQ"] = 10301;
    values[valuesById[10302] = "SLOTS3_STATE_REPLY"] = 10302;
    values[valuesById[10303] = "SLOTS3_BET_REQ"] = 10303;
    values[valuesById[10304] = "SLOTS3_BET_REPLY"] = 10304;
    values[valuesById[10401] = "SJB_STATE_REQ"] = 10401;
    values[valuesById[10402] = "SJB_STATE_RESP"] = 10402;
    values[valuesById[10403] = "SJB_GAMESTART_REQ"] = 10403;
    values[valuesById[10404] = "SJB_GAMESTART_REPLY"] = 10404;
    values[valuesById[10405] = "SJB_BLOCK_REQ"] = 10405;
    values[valuesById[10406] = "SJB_BLOCK_RESP"] = 10406;
    values[valuesById[10501] = "EGYPT_STATE_REQ"] = 10501;
    values[valuesById[10502] = "EGYPT_STATE_RESP"] = 10502;
    values[valuesById[10503] = "EGYPT_GAMESTART_REQ"] = 10503;
    values[valuesById[10504] = "EGYPT_GAMESTART_RESP"] = 10504;
    values[valuesById[10505] = "EGYPT_BLOCK_REQ"] = 10505;
    values[valuesById[10506] = "EGYPT_BLOCK_RESP"] = 10506;
    values[valuesById[10601] = "AZTEC_STATE_REQ"] = 10601;
    values[valuesById[10602] = "AZTEC_STATE_RESP"] = 10602;
    values[valuesById[10603] = "AZTEC_GAMESTART_REQ"] = 10603;
    values[valuesById[10604] = "AZTEC_GAMESTART_RESP"] = 10604;
    values[valuesById[10605] = "AZTEC_BLOCK_REQ"] = 10605;
    values[valuesById[10606] = "AZTEC_BLOCK_RESP"] = 10606;
    values[valuesById[10701] = "JLB_STATE_REQ"] = 10701;
    values[valuesById[10702] = "JLB_STATE_RESP"] = 10702;
    values[valuesById[10703] = "JLB_GAMESTART_REQ"] = 10703;
    values[valuesById[10704] = "JLB_GAMESTART_RESP"] = 10704;
    values[valuesById[10705] = "JLB_BLOCK_REQ"] = 10705;
    values[valuesById[10706] = "JLB_BLOCK_RESP"] = 10706;
    values[valuesById[10801] = "DRAGON_STATE_REQ"] = 10801;
    values[valuesById[10802] = "DRAGON_STATE_RESP"] = 10802;
    values[valuesById[10803] = "DRAGON_GAMESTART_REQ"] = 10803;
    values[valuesById[10804] = "DRAGON_GAMESTART_RESP"] = 10804;
    values[valuesById[10805] = "DRAGON_BLOCK_REQ"] = 10805;
    values[valuesById[10806] = "DRAGON_BLOCK_RESP"] = 10806;
    values[valuesById[10901] = "ZEUS_STATE_REQ"] = 10901;
    values[valuesById[10902] = "ZEUS_STATE_RESP"] = 10902;
    values[valuesById[10903] = "ZEUS_GAMESTART_REQ"] = 10903;
    values[valuesById[10904] = "ZEUS_GAMESTART_RESP"] = 10904;
    values[valuesById[10905] = "ZEUS_BLOCK_REQ"] = 10905;
    values[valuesById[10906] = "ZEUS_BLOCK_RESP"] = 10906;
    values[valuesById[11001] = "FRUIT_STATE_REQ"] = 11001;
    values[valuesById[11002] = "FRUIT_STATE_RESP"] = 11002;
    values[valuesById[11003] = "FRUIT_GAMESTART_REQ"] = 11003;
    values[valuesById[11004] = "FRUIT_GAMESTART_RESP"] = 11004;
    values[valuesById[11005] = "FRUIT_BLOCK_REQ"] = 11005;
    values[valuesById[11006] = "FRUIT_BLOCK_RESP"] = 11006;
    values[valuesById[11101] = "SJB02_STATE_REQ"] = 11101;
    values[valuesById[11102] = "SJB02_STATE_RESP"] = 11102;
    values[valuesById[11103] = "SJB02_GAMESTART_REQ"] = 11103;
    values[valuesById[11104] = "SJB02_GAMESTART_RESP"] = 11104;
    values[valuesById[11105] = "SJB02_BLOCK_REQ"] = 11105;
    values[valuesById[11106] = "SJB02_BLOCK_RESP"] = 11106;
    values[valuesById[11201] = "SPARTA_STATE_REQ"] = 11201;
    values[valuesById[11202] = "SPARTA_STATE_RESP"] = 11202;
    values[valuesById[11203] = "SPARTA_GAMESTART_REQ"] = 11203;
    values[valuesById[11204] = "SPARTA_GAMESTART_RESP"] = 11204;
    values[valuesById[11205] = "SPARTA_BLOCK_REQ"] = 11205;
    values[valuesById[11206] = "SPARTA_BLOCK_RESP"] = 11206;
    values[valuesById[11301] = "MONEY_STATE_REQ"] = 11301;
    values[valuesById[11302] = "MONEY_STATE_RESP"] = 11302;
    values[valuesById[11303] = "MONEY_GAMESTART_REQ"] = 11303;
    values[valuesById[11304] = "MONEY_GAMESTART_RESP"] = 11304;
    values[valuesById[11305] = "MONEY_BLOCK_REQ"] = 11305;
    values[valuesById[11306] = "MONEY_BLOCK_RESP"] = 11306;
    values[valuesById[11401] = "TIGER_STATE_REQ"] = 11401;
    values[valuesById[11402] = "TIGER_STATE_RESP"] = 11402;
    values[valuesById[11403] = "TIGER_GAMESTART_REQ"] = 11403;
    values[valuesById[11404] = "TIGER_GAMESTART_RESP"] = 11404;
    values[valuesById[11405] = "TIGER_BLOCK_REQ"] = 11405;
    values[valuesById[11406] = "TIGER_BLOCK_RESP"] = 11406;
    values[valuesById[11501] = "ZEUS02_STATE_REQ"] = 11501;
    values[valuesById[11502] = "ZEUS02_STATE_RESP"] = 11502;
    values[valuesById[11503] = "ZEUS02_GAMESTART_REQ"] = 11503;
    values[valuesById[11504] = "ZEUS02_GAMESTART_RESP"] = 11504;
    values[valuesById[11505] = "ZEUS02_BLOCK_REQ"] = 11505;
    values[valuesById[11506] = "ZEUS02_BLOCK_RESP"] = 11506;
    values[valuesById[11601] = "BULL_STATE_REQ"] = 11601;
    values[valuesById[11602] = "BULL_STATE_RESP"] = 11602;
    values[valuesById[11603] = "BULL_GAMESTART_REQ"] = 11603;
    values[valuesById[11604] = "BULL_GAMESTART_RESP"] = 11604;
    values[valuesById[11605] = "BULL_BLOCK_REQ"] = 11605;
    values[valuesById[11606] = "BULL_BLOCK_RESP"] = 11606;
    values[valuesById[11701] = "WOLF_STATE_REQ"] = 11701;
    values[valuesById[11702] = "WOLF_STATE_RESP"] = 11702;
    values[valuesById[11703] = "WOLF_GAMESTART_REQ"] = 11703;
    values[valuesById[11704] = "WOLF_GAMESTART_RESP"] = 11704;
    values[valuesById[11705] = "WOLF_BLOCK_REQ"] = 11705;
    values[valuesById[11706] = "WOLF_BLOCK_RESP"] = 11706;
    values[valuesById[11801] = "TIGER02_STATE_REQ"] = 11801;
    values[valuesById[11802] = "TIGER02_STATE_RESP"] = 11802;
    values[valuesById[11803] = "TIGER02_GAMESTART_REQ"] = 11803;
    values[valuesById[11804] = "TIGER02_GAMESTART_RESP"] = 11804;
    values[valuesById[11805] = "TIGER02_BLOCK_REQ"] = 11805;
    values[valuesById[11806] = "TIGER02_BLOCK_RESP"] = 11806;
    values[valuesById[11901] = "LPIG_STATE_REQ"] = 11901;
    values[valuesById[11902] = "LPIG_STATE_RESP"] = 11902;
    values[valuesById[11903] = "LPIG_GAMESTART_REQ"] = 11903;
    values[valuesById[11904] = "LPIG_GAMESTART_RESP"] = 11904;
    values[valuesById[11905] = "LPIG_BLOCK_REQ"] = 11905;
    values[valuesById[11906] = "LPIG_BLOCK_RESP"] = 11906;
    values[valuesById[12101] = "NMOUSE_STATE_REQ"] = 12101;
    values[valuesById[12102] = "NMOUSE_STATE_RESP"] = 12102;
    values[valuesById[12103] = "NMOUSE_GAMESTART_REQ"] = 12103;
    values[valuesById[12104] = "NMOUSE_GAMESTART_RESP"] = 12104;
    values[valuesById[12105] = "NMOUSE_BLOCK_REQ"] = 12105;
    values[valuesById[12106] = "NMOUSE_BLOCK_RESP"] = 12106;
    values[valuesById[12201] = "NCOW_STATE_REQ"] = 12201;
    values[valuesById[12202] = "NCOW_STATE_RESP"] = 12202;
    values[valuesById[12203] = "NCOW_GAMESTART_REQ"] = 12203;
    values[valuesById[12204] = "NCOW_GAMESTART_RESP"] = 12204;
    values[valuesById[12205] = "NCOW_BLOCK_REQ"] = 12205;
    values[valuesById[12206] = "NCOW_BLOCK_RESP"] = 12206;
    values[valuesById[12301] = "NTIGER_STATE_REQ"] = 12301;
    values[valuesById[12302] = "NTIGER_STATE_RESP"] = 12302;
    values[valuesById[12303] = "NTIGER_GAMESTART_REQ"] = 12303;
    values[valuesById[12304] = "NTIGER_GAMESTART_RESP"] = 12304;
    values[valuesById[12305] = "NTIGER_BLOCK_REQ"] = 12305;
    values[valuesById[12306] = "NTIGER_BLOCK_RESP"] = 12306;
    values[valuesById[12401] = "NRABIT_STATE_REQ"] = 12401;
    values[valuesById[12402] = "NRABIT_STATE_RESP"] = 12402;
    values[valuesById[12403] = "NRABIT_GAMESTART_REQ"] = 12403;
    values[valuesById[12404] = "NRABIT_GAMESTART_RESP"] = 12404;
    values[valuesById[12405] = "NRABIT_BLOCK_REQ"] = 12405;
    values[valuesById[12406] = "NRABIT_BLOCK_RESP"] = 12406;
    values[valuesById[12001] = "BGAMING_OPEN_REQ"] = 12001;
    values[valuesById[12002] = "BGAMING_OPEN_RESP"] = 12002;
    values[valuesById[12003] = "EVOPLAY_OPEN_REQ"] = 12003;
    values[valuesById[12004] = "EVOPLAY_OPEN_RESP"] = 12004;
    values[valuesById[12005] = "PGSOFT_OPEN_REQ"] = 12005;
    values[valuesById[12006] = "PGSOFT_OPEN_RESP"] = 12006;
    values[valuesById[12007] = "PPSOFT_OPEN_REQ"] = 12007;
    values[valuesById[12008] = "PPSOFT_OPEN_RESP"] = 12008;
    values[valuesById[12009] = "JILIGAMES_OPEN_REQ"] = 12009;
    values[valuesById[12010] = "JILIGAMES_OPEN_RESP"] = 12010;
    return values;
})();

export { $root as default };
