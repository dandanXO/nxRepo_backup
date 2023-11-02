/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * ERROR_CODE enum.
 * @exports ERROR_CODE
 * @enum {number}
 * @property {number} NONE=0 NONE value
 * @property {number} TOKEN_INVALID=100 TOKEN_INVALID value
 * @property {number} PLAYER_NOT_FOUND=101 PLAYER_NOT_FOUND value
 * @property {number} REPLACE=102 REPLACE value
 * @property {number} KICK=103 KICK value
 * @property {number} GAME_ID_INVALID=200 GAME_ID_INVALID value
 * @property {number} ROOM_ID_INVALID=201 ROOM_ID_INVALID value
 * @property {number} ALREADY_IN_ROOM=202 ALREADY_IN_ROOM value
 * @property {number} NOT_IN_ROOM=203 NOT_IN_ROOM value
 * @property {number} NO_BALANCE=204 NO_BALANCE value
 * @property {number} ROBOT_ENOUGH=205 ROBOT_ENOUGH value
 * @property {number} CAN_NOT_EXIT=206 CAN_NOT_EXIT value
 * @property {number} OPERATION_INVALID=207 OPERATION_INVALID value
 * @property {number} CLUB_ID_INVALID=208 CLUB_ID_INVALID value
 * @property {number} TABLE_ID_INVALID=209 TABLE_ID_INVALID value
 * @property {number} ENTER_FAIL=210 ENTER_FAIL value
 * @property {number} SERVER_MAINTAIN=211 SERVER_MAINTAIN value
 * @property {number} LOAN_STATUS=212 LOAN_STATUS value
 * @property {number} TABLE_NO_INVALID=213 TABLE_NO_INVALID value
 * @property {number} BALANCE_NOT_ENOUGH=214 BALANCE_NOT_ENOUGH value
 * @property {number} PRIVATE_TABLE_INIT_BET_ERROR=215 PRIVATE_TABLE_INIT_BET_ERROR value
 */
$root.ERROR_CODE = (function() {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "NONE"] = 0;
    values[valuesById[100] = "TOKEN_INVALID"] = 100;
    values[valuesById[101] = "PLAYER_NOT_FOUND"] = 101;
    values[valuesById[102] = "REPLACE"] = 102;
    values[valuesById[103] = "KICK"] = 103;
    values[valuesById[200] = "GAME_ID_INVALID"] = 200;
    values[valuesById[201] = "ROOM_ID_INVALID"] = 201;
    values[valuesById[202] = "ALREADY_IN_ROOM"] = 202;
    values[valuesById[203] = "NOT_IN_ROOM"] = 203;
    values[valuesById[204] = "NO_BALANCE"] = 204;
    values[valuesById[205] = "ROBOT_ENOUGH"] = 205;
    values[valuesById[206] = "CAN_NOT_EXIT"] = 206;
    values[valuesById[207] = "OPERATION_INVALID"] = 207;
    values[valuesById[208] = "CLUB_ID_INVALID"] = 208;
    values[valuesById[209] = "TABLE_ID_INVALID"] = 209;
    values[valuesById[210] = "ENTER_FAIL"] = 210;
    values[valuesById[211] = "SERVER_MAINTAIN"] = 211;
    values[valuesById[212] = "LOAN_STATUS"] = 212;
    values[valuesById[213] = "TABLE_NO_INVALID"] = 213;
    values[valuesById[214] = "BALANCE_NOT_ENOUGH"] = 214;
    values[valuesById[215] = "PRIVATE_TABLE_INIT_BET_ERROR"] = 215;
    return values;
})();

export { $root as default };
