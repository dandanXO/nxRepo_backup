/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const texas = $root.texas = (() => {

    /**
     * Namespace texas.
     * @exports texas
     * @namespace
     */
    const texas = {};

    /**
     * DEADLINE_TYPE enum.
     * @name texas.DEADLINE_TYPE
     * @enum {number}
     * @property {number} DT_NONE=0 DT_NONE value
     * @property {number} START=1 START value
     * @property {number} OPERATION=2 OPERATION value
     * @property {number} END=3 END value
     */
    texas.DEADLINE_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DT_NONE"] = 0;
        values[valuesById[1] = "START"] = 1;
        values[valuesById[2] = "OPERATION"] = 2;
        values[valuesById[3] = "END"] = 3;
        return values;
    })();

    /**
     * OPERATION_TYPE enum.
     * @name texas.OPERATION_TYPE
     * @enum {number}
     * @property {number} OT_NONE=0 OT_NONE value
     * @property {number} OT_CHECK=1 OT_CHECK value
     * @property {number} OT_BET=2 OT_BET value
     * @property {number} OT_CALL=3 OT_CALL value
     * @property {number} OT_RAISE=4 OT_RAISE value
     * @property {number} OT_FOLD=5 OT_FOLD value
     * @property {number} OT_ALL_IN=6 OT_ALL_IN value
     * @property {number} OT_CHECK_OR_FOLD=7 OT_CHECK_OR_FOLD value
     * @property {number} OT_CALL_ANY=8 OT_CALL_ANY value
     */
    texas.OPERATION_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "OT_NONE"] = 0;
        values[valuesById[1] = "OT_CHECK"] = 1;
        values[valuesById[2] = "OT_BET"] = 2;
        values[valuesById[3] = "OT_CALL"] = 3;
        values[valuesById[4] = "OT_RAISE"] = 4;
        values[valuesById[5] = "OT_FOLD"] = 5;
        values[valuesById[6] = "OT_ALL_IN"] = 6;
        values[valuesById[7] = "OT_CHECK_OR_FOLD"] = 7;
        values[valuesById[8] = "OT_CALL_ANY"] = 8;
        return values;
    })();

    /**
     * CARD_TYPE enum.
     * @name texas.CARD_TYPE
     * @enum {number}
     * @property {number} CT_NONE=0 CT_NONE value
     * @property {number} CT_NO_PAIR=1 CT_NO_PAIR value
     * @property {number} CT_PAIR=2 CT_PAIR value
     * @property {number} CT_TWO_PAIR=3 CT_TWO_PAIR value
     * @property {number} CT_TRIPS=4 CT_TRIPS value
     * @property {number} CT_STRAIGHT=5 CT_STRAIGHT value
     * @property {number} CT_FLUSH=6 CT_FLUSH value
     * @property {number} CT_FULL_HOUSE=7 CT_FULL_HOUSE value
     * @property {number} CT_QUADS=8 CT_QUADS value
     * @property {number} CT_STRAIGHT_FLUSH=9 CT_STRAIGHT_FLUSH value
     * @property {number} CT_ROYAL_STRAIGHT_FLUSH=10 CT_ROYAL_STRAIGHT_FLUSH value
     */
    texas.CARD_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "CT_NONE"] = 0;
        values[valuesById[1] = "CT_NO_PAIR"] = 1;
        values[valuesById[2] = "CT_PAIR"] = 2;
        values[valuesById[3] = "CT_TWO_PAIR"] = 3;
        values[valuesById[4] = "CT_TRIPS"] = 4;
        values[valuesById[5] = "CT_STRAIGHT"] = 5;
        values[valuesById[6] = "CT_FLUSH"] = 6;
        values[valuesById[7] = "CT_FULL_HOUSE"] = 7;
        values[valuesById[8] = "CT_QUADS"] = 8;
        values[valuesById[9] = "CT_STRAIGHT_FLUSH"] = 9;
        values[valuesById[10] = "CT_ROYAL_STRAIGHT_FLUSH"] = 10;
        return values;
    })();

    /**
     * ROUND_TYPE enum.
     * @name texas.ROUND_TYPE
     * @enum {number}
     * @property {number} RT_NONE=0 RT_NONE value
     * @property {number} RT_PRE_FLOP=1 RT_PRE_FLOP value
     * @property {number} RT_FLOP=2 RT_FLOP value
     * @property {number} RT_TURN=3 RT_TURN value
     * @property {number} RT_RIVER=4 RT_RIVER value
     * @property {number} RT_ENDING=5 RT_ENDING value
     */
    texas.ROUND_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "RT_NONE"] = 0;
        values[valuesById[1] = "RT_PRE_FLOP"] = 1;
        values[valuesById[2] = "RT_FLOP"] = 2;
        values[valuesById[3] = "RT_TURN"] = 3;
        values[valuesById[4] = "RT_RIVER"] = 4;
        values[valuesById[5] = "RT_ENDING"] = 5;
        return values;
    })();

    texas.TableState = (function() {

        /**
         * Properties of a TableState.
         * @memberof texas
         * @interface ITableState
         * @property {string|null} [gameCode] TableState gameCode
         * @property {Array.<number>|null} [pots] TableState pots
         * @property {Array.<number>|null} [specialSeatIndex] TableState specialSeatIndex
         * @property {Array.<texas.ISeatState>|null} [seatStates] TableState seatStates
         * @property {Array.<number>|null} [sharedCards] TableState sharedCards
         * @property {texas.ROUND_TYPE|null} [round] TableState round
         * @property {number|null} [totalPot] TableState totalPot
         */

        /**
         * Constructs a new TableState.
         * @memberof texas
         * @classdesc Represents a TableState.
         * @implements ITableState
         * @constructor
         * @param {texas.ITableState=} [properties] Properties to set
         */
        function TableState(properties) {
            this.pots = [];
            this.specialSeatIndex = [];
            this.seatStates = [];
            this.sharedCards = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TableState gameCode.
         * @member {string} gameCode
         * @memberof texas.TableState
         * @instance
         */
        TableState.prototype.gameCode = "";

        /**
         * TableState pots.
         * @member {Array.<number>} pots
         * @memberof texas.TableState
         * @instance
         */
        TableState.prototype.pots = $util.emptyArray;

        /**
         * TableState specialSeatIndex.
         * @member {Array.<number>} specialSeatIndex
         * @memberof texas.TableState
         * @instance
         */
        TableState.prototype.specialSeatIndex = $util.emptyArray;

        /**
         * TableState seatStates.
         * @member {Array.<texas.ISeatState>} seatStates
         * @memberof texas.TableState
         * @instance
         */
        TableState.prototype.seatStates = $util.emptyArray;

        /**
         * TableState sharedCards.
         * @member {Array.<number>} sharedCards
         * @memberof texas.TableState
         * @instance
         */
        TableState.prototype.sharedCards = $util.emptyArray;

        /**
         * TableState round.
         * @member {texas.ROUND_TYPE} round
         * @memberof texas.TableState
         * @instance
         */
        TableState.prototype.round = 0;

        /**
         * TableState totalPot.
         * @member {number} totalPot
         * @memberof texas.TableState
         * @instance
         */
        TableState.prototype.totalPot = 0;

        /**
         * Creates a new TableState instance using the specified properties.
         * @function create
         * @memberof texas.TableState
         * @static
         * @param {texas.ITableState=} [properties] Properties to set
         * @returns {texas.TableState} TableState instance
         */
        TableState.create = function create(properties) {
            return new TableState(properties);
        };

        /**
         * Encodes the specified TableState message. Does not implicitly {@link texas.TableState.verify|verify} messages.
         * @function encode
         * @memberof texas.TableState
         * @static
         * @param {texas.ITableState} message TableState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameCode != null && Object.hasOwnProperty.call(message, "gameCode"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameCode);
            if (message.pots != null && message.pots.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.pots.length; ++i)
                    writer.int32(message.pots[i]);
                writer.ldelim();
            }
            if (message.specialSeatIndex != null && message.specialSeatIndex.length) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork();
                for (let i = 0; i < message.specialSeatIndex.length; ++i)
                    writer.int32(message.specialSeatIndex[i]);
                writer.ldelim();
            }
            if (message.seatStates != null && message.seatStates.length)
                for (let i = 0; i < message.seatStates.length; ++i)
                    $root.texas.SeatState.encode(message.seatStates[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.sharedCards != null && message.sharedCards.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (let i = 0; i < message.sharedCards.length; ++i)
                    writer.int32(message.sharedCards[i]);
                writer.ldelim();
            }
            if (message.round != null && Object.hasOwnProperty.call(message, "round"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.round);
            if (message.totalPot != null && Object.hasOwnProperty.call(message, "totalPot"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.totalPot);
            return writer;
        };

        /**
         * Encodes the specified TableState message, length delimited. Does not implicitly {@link texas.TableState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.TableState
         * @static
         * @param {texas.ITableState} message TableState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TableState message from the specified reader or buffer.
         * @function decode
         * @memberof texas.TableState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.TableState} TableState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.TableState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameCode = reader.string();
                    break;
                case 2:
                    if (!(message.pots && message.pots.length))
                        message.pots = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.pots.push(reader.int32());
                    } else
                        message.pots.push(reader.int32());
                    break;
                case 3:
                    if (!(message.specialSeatIndex && message.specialSeatIndex.length))
                        message.specialSeatIndex = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.specialSeatIndex.push(reader.int32());
                    } else
                        message.specialSeatIndex.push(reader.int32());
                    break;
                case 4:
                    if (!(message.seatStates && message.seatStates.length))
                        message.seatStates = [];
                    message.seatStates.push($root.texas.SeatState.decode(reader, reader.uint32()));
                    break;
                case 5:
                    if (!(message.sharedCards && message.sharedCards.length))
                        message.sharedCards = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.sharedCards.push(reader.int32());
                    } else
                        message.sharedCards.push(reader.int32());
                    break;
                case 6:
                    message.round = reader.int32();
                    break;
                case 7:
                    message.totalPot = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TableState message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.TableState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.TableState} TableState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TableState message.
         * @function verify
         * @memberof texas.TableState
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TableState.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                if (!$util.isString(message.gameCode))
                    return "gameCode: string expected";
            if (message.pots != null && message.hasOwnProperty("pots")) {
                if (!Array.isArray(message.pots))
                    return "pots: array expected";
                for (let i = 0; i < message.pots.length; ++i)
                    if (!$util.isInteger(message.pots[i]))
                        return "pots: integer[] expected";
            }
            if (message.specialSeatIndex != null && message.hasOwnProperty("specialSeatIndex")) {
                if (!Array.isArray(message.specialSeatIndex))
                    return "specialSeatIndex: array expected";
                for (let i = 0; i < message.specialSeatIndex.length; ++i)
                    if (!$util.isInteger(message.specialSeatIndex[i]))
                        return "specialSeatIndex: integer[] expected";
            }
            if (message.seatStates != null && message.hasOwnProperty("seatStates")) {
                if (!Array.isArray(message.seatStates))
                    return "seatStates: array expected";
                for (let i = 0; i < message.seatStates.length; ++i) {
                    let error = $root.texas.SeatState.verify(message.seatStates[i]);
                    if (error)
                        return "seatStates." + error;
                }
            }
            if (message.sharedCards != null && message.hasOwnProperty("sharedCards")) {
                if (!Array.isArray(message.sharedCards))
                    return "sharedCards: array expected";
                for (let i = 0; i < message.sharedCards.length; ++i)
                    if (!$util.isInteger(message.sharedCards[i]))
                        return "sharedCards: integer[] expected";
            }
            if (message.round != null && message.hasOwnProperty("round"))
                switch (message.round) {
                default:
                    return "round: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.totalPot != null && message.hasOwnProperty("totalPot"))
                if (!$util.isInteger(message.totalPot))
                    return "totalPot: integer expected";
            return null;
        };

        /**
         * Creates a TableState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.TableState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.TableState} TableState
         */
        TableState.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.TableState)
                return object;
            let message = new $root.texas.TableState();
            if (object.gameCode != null)
                message.gameCode = String(object.gameCode);
            if (object.pots) {
                if (!Array.isArray(object.pots))
                    throw TypeError(".texas.TableState.pots: array expected");
                message.pots = [];
                for (let i = 0; i < object.pots.length; ++i)
                    message.pots[i] = object.pots[i] | 0;
            }
            if (object.specialSeatIndex) {
                if (!Array.isArray(object.specialSeatIndex))
                    throw TypeError(".texas.TableState.specialSeatIndex: array expected");
                message.specialSeatIndex = [];
                for (let i = 0; i < object.specialSeatIndex.length; ++i)
                    message.specialSeatIndex[i] = object.specialSeatIndex[i] | 0;
            }
            if (object.seatStates) {
                if (!Array.isArray(object.seatStates))
                    throw TypeError(".texas.TableState.seatStates: array expected");
                message.seatStates = [];
                for (let i = 0; i < object.seatStates.length; ++i) {
                    if (typeof object.seatStates[i] !== "object")
                        throw TypeError(".texas.TableState.seatStates: object expected");
                    message.seatStates[i] = $root.texas.SeatState.fromObject(object.seatStates[i]);
                }
            }
            if (object.sharedCards) {
                if (!Array.isArray(object.sharedCards))
                    throw TypeError(".texas.TableState.sharedCards: array expected");
                message.sharedCards = [];
                for (let i = 0; i < object.sharedCards.length; ++i)
                    message.sharedCards[i] = object.sharedCards[i] | 0;
            }
            switch (object.round) {
            case "RT_NONE":
            case 0:
                message.round = 0;
                break;
            case "RT_PRE_FLOP":
            case 1:
                message.round = 1;
                break;
            case "RT_FLOP":
            case 2:
                message.round = 2;
                break;
            case "RT_TURN":
            case 3:
                message.round = 3;
                break;
            case "RT_RIVER":
            case 4:
                message.round = 4;
                break;
            case "RT_ENDING":
            case 5:
                message.round = 5;
                break;
            }
            if (object.totalPot != null)
                message.totalPot = object.totalPot | 0;
            return message;
        };

        /**
         * Creates a plain object from a TableState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.TableState
         * @static
         * @param {texas.TableState} message TableState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TableState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.pots = [];
                object.specialSeatIndex = [];
                object.seatStates = [];
                object.sharedCards = [];
            }
            if (options.defaults) {
                object.gameCode = "";
                object.round = options.enums === String ? "RT_NONE" : 0;
                object.totalPot = 0;
            }
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                object.gameCode = message.gameCode;
            if (message.pots && message.pots.length) {
                object.pots = [];
                for (let j = 0; j < message.pots.length; ++j)
                    object.pots[j] = message.pots[j];
            }
            if (message.specialSeatIndex && message.specialSeatIndex.length) {
                object.specialSeatIndex = [];
                for (let j = 0; j < message.specialSeatIndex.length; ++j)
                    object.specialSeatIndex[j] = message.specialSeatIndex[j];
            }
            if (message.seatStates && message.seatStates.length) {
                object.seatStates = [];
                for (let j = 0; j < message.seatStates.length; ++j)
                    object.seatStates[j] = $root.texas.SeatState.toObject(message.seatStates[j], options);
            }
            if (message.sharedCards && message.sharedCards.length) {
                object.sharedCards = [];
                for (let j = 0; j < message.sharedCards.length; ++j)
                    object.sharedCards[j] = message.sharedCards[j];
            }
            if (message.round != null && message.hasOwnProperty("round"))
                object.round = options.enums === String ? $root.texas.ROUND_TYPE[message.round] : message.round;
            if (message.totalPot != null && message.hasOwnProperty("totalPot"))
                object.totalPot = message.totalPot;
            return object;
        };

        /**
         * Converts this TableState to JSON.
         * @function toJSON
         * @memberof texas.TableState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TableState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TableState;
    })();

    texas.SeatState = (function() {

        /**
         * Properties of a SeatState.
         * @memberof texas
         * @interface ISeatState
         * @property {number|null} [index] SeatState index
         * @property {number|null} [bet] SeatState bet
         * @property {texas.IOperationReq|null} [lastOperation] SeatState lastOperation
         * @property {number|null} [balance] SeatState balance
         */

        /**
         * Constructs a new SeatState.
         * @memberof texas
         * @classdesc Represents a SeatState.
         * @implements ISeatState
         * @constructor
         * @param {texas.ISeatState=} [properties] Properties to set
         */
        function SeatState(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SeatState index.
         * @member {number} index
         * @memberof texas.SeatState
         * @instance
         */
        SeatState.prototype.index = 0;

        /**
         * SeatState bet.
         * @member {number} bet
         * @memberof texas.SeatState
         * @instance
         */
        SeatState.prototype.bet = 0;

        /**
         * SeatState lastOperation.
         * @member {texas.IOperationReq|null|undefined} lastOperation
         * @memberof texas.SeatState
         * @instance
         */
        SeatState.prototype.lastOperation = null;

        /**
         * SeatState balance.
         * @member {number} balance
         * @memberof texas.SeatState
         * @instance
         */
        SeatState.prototype.balance = 0;

        /**
         * Creates a new SeatState instance using the specified properties.
         * @function create
         * @memberof texas.SeatState
         * @static
         * @param {texas.ISeatState=} [properties] Properties to set
         * @returns {texas.SeatState} SeatState instance
         */
        SeatState.create = function create(properties) {
            return new SeatState(properties);
        };

        /**
         * Encodes the specified SeatState message. Does not implicitly {@link texas.SeatState.verify|verify} messages.
         * @function encode
         * @memberof texas.SeatState
         * @static
         * @param {texas.ISeatState} message SeatState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.index);
            if (message.bet != null && Object.hasOwnProperty.call(message, "bet"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.bet);
            if (message.lastOperation != null && Object.hasOwnProperty.call(message, "lastOperation"))
                $root.texas.OperationReq.encode(message.lastOperation, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.balance);
            return writer;
        };

        /**
         * Encodes the specified SeatState message, length delimited. Does not implicitly {@link texas.SeatState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.SeatState
         * @static
         * @param {texas.ISeatState} message SeatState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeatState message from the specified reader or buffer.
         * @function decode
         * @memberof texas.SeatState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.SeatState} SeatState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.SeatState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.index = reader.int32();
                    break;
                case 2:
                    message.bet = reader.int32();
                    break;
                case 3:
                    message.lastOperation = $root.texas.OperationReq.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.balance = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SeatState message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.SeatState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.SeatState} SeatState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SeatState message.
         * @function verify
         * @memberof texas.SeatState
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SeatState.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.index != null && message.hasOwnProperty("index"))
                if (!$util.isInteger(message.index))
                    return "index: integer expected";
            if (message.bet != null && message.hasOwnProperty("bet"))
                if (!$util.isInteger(message.bet))
                    return "bet: integer expected";
            if (message.lastOperation != null && message.hasOwnProperty("lastOperation")) {
                let error = $root.texas.OperationReq.verify(message.lastOperation);
                if (error)
                    return "lastOperation." + error;
            }
            if (message.balance != null && message.hasOwnProperty("balance"))
                if (!$util.isInteger(message.balance))
                    return "balance: integer expected";
            return null;
        };

        /**
         * Creates a SeatState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.SeatState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.SeatState} SeatState
         */
        SeatState.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.SeatState)
                return object;
            let message = new $root.texas.SeatState();
            if (object.index != null)
                message.index = object.index | 0;
            if (object.bet != null)
                message.bet = object.bet | 0;
            if (object.lastOperation != null) {
                if (typeof object.lastOperation !== "object")
                    throw TypeError(".texas.SeatState.lastOperation: object expected");
                message.lastOperation = $root.texas.OperationReq.fromObject(object.lastOperation);
            }
            if (object.balance != null)
                message.balance = object.balance | 0;
            return message;
        };

        /**
         * Creates a plain object from a SeatState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.SeatState
         * @static
         * @param {texas.SeatState} message SeatState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeatState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.index = 0;
                object.bet = 0;
                object.lastOperation = null;
                object.balance = 0;
            }
            if (message.index != null && message.hasOwnProperty("index"))
                object.index = message.index;
            if (message.bet != null && message.hasOwnProperty("bet"))
                object.bet = message.bet;
            if (message.lastOperation != null && message.hasOwnProperty("lastOperation"))
                object.lastOperation = $root.texas.OperationReq.toObject(message.lastOperation, options);
            if (message.balance != null && message.hasOwnProperty("balance"))
                object.balance = message.balance;
            return object;
        };

        /**
         * Converts this SeatState to JSON.
         * @function toJSON
         * @memberof texas.SeatState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeatState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeatState;
    })();

    texas.DealCardsEvent = (function() {

        /**
         * Properties of a DealCardsEvent.
         * @memberof texas
         * @interface IDealCardsEvent
         * @property {texas.ROUND_TYPE|null} [type] DealCardsEvent type
         * @property {texas.ICardSet|null} [cardSet] DealCardsEvent cardSet
         */

        /**
         * Constructs a new DealCardsEvent.
         * @memberof texas
         * @classdesc Represents a DealCardsEvent.
         * @implements IDealCardsEvent
         * @constructor
         * @param {texas.IDealCardsEvent=} [properties] Properties to set
         */
        function DealCardsEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DealCardsEvent type.
         * @member {texas.ROUND_TYPE} type
         * @memberof texas.DealCardsEvent
         * @instance
         */
        DealCardsEvent.prototype.type = 0;

        /**
         * DealCardsEvent cardSet.
         * @member {texas.ICardSet|null|undefined} cardSet
         * @memberof texas.DealCardsEvent
         * @instance
         */
        DealCardsEvent.prototype.cardSet = null;

        /**
         * Creates a new DealCardsEvent instance using the specified properties.
         * @function create
         * @memberof texas.DealCardsEvent
         * @static
         * @param {texas.IDealCardsEvent=} [properties] Properties to set
         * @returns {texas.DealCardsEvent} DealCardsEvent instance
         */
        DealCardsEvent.create = function create(properties) {
            return new DealCardsEvent(properties);
        };

        /**
         * Encodes the specified DealCardsEvent message. Does not implicitly {@link texas.DealCardsEvent.verify|verify} messages.
         * @function encode
         * @memberof texas.DealCardsEvent
         * @static
         * @param {texas.IDealCardsEvent} message DealCardsEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DealCardsEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.cardSet != null && Object.hasOwnProperty.call(message, "cardSet"))
                $root.texas.CardSet.encode(message.cardSet, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified DealCardsEvent message, length delimited. Does not implicitly {@link texas.DealCardsEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.DealCardsEvent
         * @static
         * @param {texas.IDealCardsEvent} message DealCardsEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DealCardsEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DealCardsEvent message from the specified reader or buffer.
         * @function decode
         * @memberof texas.DealCardsEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.DealCardsEvent} DealCardsEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DealCardsEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.DealCardsEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.cardSet = $root.texas.CardSet.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DealCardsEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.DealCardsEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.DealCardsEvent} DealCardsEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DealCardsEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DealCardsEvent message.
         * @function verify
         * @memberof texas.DealCardsEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DealCardsEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.cardSet != null && message.hasOwnProperty("cardSet")) {
                let error = $root.texas.CardSet.verify(message.cardSet);
                if (error)
                    return "cardSet." + error;
            }
            return null;
        };

        /**
         * Creates a DealCardsEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.DealCardsEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.DealCardsEvent} DealCardsEvent
         */
        DealCardsEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.DealCardsEvent)
                return object;
            let message = new $root.texas.DealCardsEvent();
            switch (object.type) {
            case "RT_NONE":
            case 0:
                message.type = 0;
                break;
            case "RT_PRE_FLOP":
            case 1:
                message.type = 1;
                break;
            case "RT_FLOP":
            case 2:
                message.type = 2;
                break;
            case "RT_TURN":
            case 3:
                message.type = 3;
                break;
            case "RT_RIVER":
            case 4:
                message.type = 4;
                break;
            case "RT_ENDING":
            case 5:
                message.type = 5;
                break;
            }
            if (object.cardSet != null) {
                if (typeof object.cardSet !== "object")
                    throw TypeError(".texas.DealCardsEvent.cardSet: object expected");
                message.cardSet = $root.texas.CardSet.fromObject(object.cardSet);
            }
            return message;
        };

        /**
         * Creates a plain object from a DealCardsEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.DealCardsEvent
         * @static
         * @param {texas.DealCardsEvent} message DealCardsEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DealCardsEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "RT_NONE" : 0;
                object.cardSet = null;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.texas.ROUND_TYPE[message.type] : message.type;
            if (message.cardSet != null && message.hasOwnProperty("cardSet"))
                object.cardSet = $root.texas.CardSet.toObject(message.cardSet, options);
            return object;
        };

        /**
         * Converts this DealCardsEvent to JSON.
         * @function toJSON
         * @memberof texas.DealCardsEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DealCardsEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DealCardsEvent;
    })();

    texas.TurnStartEvent = (function() {

        /**
         * Properties of a TurnStartEvent.
         * @memberof texas
         * @interface ITurnStartEvent
         * @property {Array.<texas.OPERATION_TYPE>|null} [operationTypes] TurnStartEvent operationTypes
         * @property {number|null} [minBet] TurnStartEvent minBet
         * @property {number|null} [maxBet] TurnStartEvent maxBet
         * @property {number|null} [minRaise] TurnStartEvent minRaise
         */

        /**
         * Constructs a new TurnStartEvent.
         * @memberof texas
         * @classdesc Represents a TurnStartEvent.
         * @implements ITurnStartEvent
         * @constructor
         * @param {texas.ITurnStartEvent=} [properties] Properties to set
         */
        function TurnStartEvent(properties) {
            this.operationTypes = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TurnStartEvent operationTypes.
         * @member {Array.<texas.OPERATION_TYPE>} operationTypes
         * @memberof texas.TurnStartEvent
         * @instance
         */
        TurnStartEvent.prototype.operationTypes = $util.emptyArray;

        /**
         * TurnStartEvent minBet.
         * @member {number} minBet
         * @memberof texas.TurnStartEvent
         * @instance
         */
        TurnStartEvent.prototype.minBet = 0;

        /**
         * TurnStartEvent maxBet.
         * @member {number} maxBet
         * @memberof texas.TurnStartEvent
         * @instance
         */
        TurnStartEvent.prototype.maxBet = 0;

        /**
         * TurnStartEvent minRaise.
         * @member {number} minRaise
         * @memberof texas.TurnStartEvent
         * @instance
         */
        TurnStartEvent.prototype.minRaise = 0;

        /**
         * Creates a new TurnStartEvent instance using the specified properties.
         * @function create
         * @memberof texas.TurnStartEvent
         * @static
         * @param {texas.ITurnStartEvent=} [properties] Properties to set
         * @returns {texas.TurnStartEvent} TurnStartEvent instance
         */
        TurnStartEvent.create = function create(properties) {
            return new TurnStartEvent(properties);
        };

        /**
         * Encodes the specified TurnStartEvent message. Does not implicitly {@link texas.TurnStartEvent.verify|verify} messages.
         * @function encode
         * @memberof texas.TurnStartEvent
         * @static
         * @param {texas.ITurnStartEvent} message TurnStartEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TurnStartEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.operationTypes != null && message.operationTypes.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.operationTypes.length; ++i)
                    writer.int32(message.operationTypes[i]);
                writer.ldelim();
            }
            if (message.minBet != null && Object.hasOwnProperty.call(message, "minBet"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.minBet);
            if (message.maxBet != null && Object.hasOwnProperty.call(message, "maxBet"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.maxBet);
            if (message.minRaise != null && Object.hasOwnProperty.call(message, "minRaise"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.minRaise);
            return writer;
        };

        /**
         * Encodes the specified TurnStartEvent message, length delimited. Does not implicitly {@link texas.TurnStartEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.TurnStartEvent
         * @static
         * @param {texas.ITurnStartEvent} message TurnStartEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TurnStartEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TurnStartEvent message from the specified reader or buffer.
         * @function decode
         * @memberof texas.TurnStartEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.TurnStartEvent} TurnStartEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TurnStartEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.TurnStartEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.operationTypes && message.operationTypes.length))
                        message.operationTypes = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.operationTypes.push(reader.int32());
                    } else
                        message.operationTypes.push(reader.int32());
                    break;
                case 2:
                    message.minBet = reader.int32();
                    break;
                case 3:
                    message.maxBet = reader.int32();
                    break;
                case 4:
                    message.minRaise = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TurnStartEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.TurnStartEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.TurnStartEvent} TurnStartEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TurnStartEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TurnStartEvent message.
         * @function verify
         * @memberof texas.TurnStartEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TurnStartEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.operationTypes != null && message.hasOwnProperty("operationTypes")) {
                if (!Array.isArray(message.operationTypes))
                    return "operationTypes: array expected";
                for (let i = 0; i < message.operationTypes.length; ++i)
                    switch (message.operationTypes[i]) {
                    default:
                        return "operationTypes: enum value[] expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        break;
                    }
            }
            if (message.minBet != null && message.hasOwnProperty("minBet"))
                if (!$util.isInteger(message.minBet))
                    return "minBet: integer expected";
            if (message.maxBet != null && message.hasOwnProperty("maxBet"))
                if (!$util.isInteger(message.maxBet))
                    return "maxBet: integer expected";
            if (message.minRaise != null && message.hasOwnProperty("minRaise"))
                if (!$util.isInteger(message.minRaise))
                    return "minRaise: integer expected";
            return null;
        };

        /**
         * Creates a TurnStartEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.TurnStartEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.TurnStartEvent} TurnStartEvent
         */
        TurnStartEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.TurnStartEvent)
                return object;
            let message = new $root.texas.TurnStartEvent();
            if (object.operationTypes) {
                if (!Array.isArray(object.operationTypes))
                    throw TypeError(".texas.TurnStartEvent.operationTypes: array expected");
                message.operationTypes = [];
                for (let i = 0; i < object.operationTypes.length; ++i)
                    switch (object.operationTypes[i]) {
                    default:
                    case "OT_NONE":
                    case 0:
                        message.operationTypes[i] = 0;
                        break;
                    case "OT_CHECK":
                    case 1:
                        message.operationTypes[i] = 1;
                        break;
                    case "OT_BET":
                    case 2:
                        message.operationTypes[i] = 2;
                        break;
                    case "OT_CALL":
                    case 3:
                        message.operationTypes[i] = 3;
                        break;
                    case "OT_RAISE":
                    case 4:
                        message.operationTypes[i] = 4;
                        break;
                    case "OT_FOLD":
                    case 5:
                        message.operationTypes[i] = 5;
                        break;
                    case "OT_ALL_IN":
                    case 6:
                        message.operationTypes[i] = 6;
                        break;
                    case "OT_CHECK_OR_FOLD":
                    case 7:
                        message.operationTypes[i] = 7;
                        break;
                    case "OT_CALL_ANY":
                    case 8:
                        message.operationTypes[i] = 8;
                        break;
                    }
            }
            if (object.minBet != null)
                message.minBet = object.minBet | 0;
            if (object.maxBet != null)
                message.maxBet = object.maxBet | 0;
            if (object.minRaise != null)
                message.minRaise = object.minRaise | 0;
            return message;
        };

        /**
         * Creates a plain object from a TurnStartEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.TurnStartEvent
         * @static
         * @param {texas.TurnStartEvent} message TurnStartEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TurnStartEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.operationTypes = [];
            if (options.defaults) {
                object.minBet = 0;
                object.maxBet = 0;
                object.minRaise = 0;
            }
            if (message.operationTypes && message.operationTypes.length) {
                object.operationTypes = [];
                for (let j = 0; j < message.operationTypes.length; ++j)
                    object.operationTypes[j] = options.enums === String ? $root.texas.OPERATION_TYPE[message.operationTypes[j]] : message.operationTypes[j];
            }
            if (message.minBet != null && message.hasOwnProperty("minBet"))
                object.minBet = message.minBet;
            if (message.maxBet != null && message.hasOwnProperty("maxBet"))
                object.maxBet = message.maxBet;
            if (message.minRaise != null && message.hasOwnProperty("minRaise"))
                object.minRaise = message.minRaise;
            return object;
        };

        /**
         * Converts this TurnStartEvent to JSON.
         * @function toJSON
         * @memberof texas.TurnStartEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TurnStartEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TurnStartEvent;
    })();

    texas.NextTurnEvent = (function() {

        /**
         * Properties of a NextTurnEvent.
         * @memberof texas
         * @interface INextTurnEvent
         * @property {Array.<texas.OPERATION_TYPE>|null} [operationTypes] NextTurnEvent operationTypes
         * @property {number|null} [minBet] NextTurnEvent minBet
         * @property {number|null} [maxBet] NextTurnEvent maxBet
         */

        /**
         * Constructs a new NextTurnEvent.
         * @memberof texas
         * @classdesc Represents a NextTurnEvent.
         * @implements INextTurnEvent
         * @constructor
         * @param {texas.INextTurnEvent=} [properties] Properties to set
         */
        function NextTurnEvent(properties) {
            this.operationTypes = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NextTurnEvent operationTypes.
         * @member {Array.<texas.OPERATION_TYPE>} operationTypes
         * @memberof texas.NextTurnEvent
         * @instance
         */
        NextTurnEvent.prototype.operationTypes = $util.emptyArray;

        /**
         * NextTurnEvent minBet.
         * @member {number} minBet
         * @memberof texas.NextTurnEvent
         * @instance
         */
        NextTurnEvent.prototype.minBet = 0;

        /**
         * NextTurnEvent maxBet.
         * @member {number} maxBet
         * @memberof texas.NextTurnEvent
         * @instance
         */
        NextTurnEvent.prototype.maxBet = 0;

        /**
         * Creates a new NextTurnEvent instance using the specified properties.
         * @function create
         * @memberof texas.NextTurnEvent
         * @static
         * @param {texas.INextTurnEvent=} [properties] Properties to set
         * @returns {texas.NextTurnEvent} NextTurnEvent instance
         */
        NextTurnEvent.create = function create(properties) {
            return new NextTurnEvent(properties);
        };

        /**
         * Encodes the specified NextTurnEvent message. Does not implicitly {@link texas.NextTurnEvent.verify|verify} messages.
         * @function encode
         * @memberof texas.NextTurnEvent
         * @static
         * @param {texas.INextTurnEvent} message NextTurnEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NextTurnEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.operationTypes != null && message.operationTypes.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.operationTypes.length; ++i)
                    writer.int32(message.operationTypes[i]);
                writer.ldelim();
            }
            if (message.minBet != null && Object.hasOwnProperty.call(message, "minBet"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.minBet);
            if (message.maxBet != null && Object.hasOwnProperty.call(message, "maxBet"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.maxBet);
            return writer;
        };

        /**
         * Encodes the specified NextTurnEvent message, length delimited. Does not implicitly {@link texas.NextTurnEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.NextTurnEvent
         * @static
         * @param {texas.INextTurnEvent} message NextTurnEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NextTurnEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NextTurnEvent message from the specified reader or buffer.
         * @function decode
         * @memberof texas.NextTurnEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.NextTurnEvent} NextTurnEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NextTurnEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.NextTurnEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.operationTypes && message.operationTypes.length))
                        message.operationTypes = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.operationTypes.push(reader.int32());
                    } else
                        message.operationTypes.push(reader.int32());
                    break;
                case 2:
                    message.minBet = reader.int32();
                    break;
                case 3:
                    message.maxBet = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NextTurnEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.NextTurnEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.NextTurnEvent} NextTurnEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NextTurnEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NextTurnEvent message.
         * @function verify
         * @memberof texas.NextTurnEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NextTurnEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.operationTypes != null && message.hasOwnProperty("operationTypes")) {
                if (!Array.isArray(message.operationTypes))
                    return "operationTypes: array expected";
                for (let i = 0; i < message.operationTypes.length; ++i)
                    switch (message.operationTypes[i]) {
                    default:
                        return "operationTypes: enum value[] expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        break;
                    }
            }
            if (message.minBet != null && message.hasOwnProperty("minBet"))
                if (!$util.isInteger(message.minBet))
                    return "minBet: integer expected";
            if (message.maxBet != null && message.hasOwnProperty("maxBet"))
                if (!$util.isInteger(message.maxBet))
                    return "maxBet: integer expected";
            return null;
        };

        /**
         * Creates a NextTurnEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.NextTurnEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.NextTurnEvent} NextTurnEvent
         */
        NextTurnEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.NextTurnEvent)
                return object;
            let message = new $root.texas.NextTurnEvent();
            if (object.operationTypes) {
                if (!Array.isArray(object.operationTypes))
                    throw TypeError(".texas.NextTurnEvent.operationTypes: array expected");
                message.operationTypes = [];
                for (let i = 0; i < object.operationTypes.length; ++i)
                    switch (object.operationTypes[i]) {
                    default:
                    case "OT_NONE":
                    case 0:
                        message.operationTypes[i] = 0;
                        break;
                    case "OT_CHECK":
                    case 1:
                        message.operationTypes[i] = 1;
                        break;
                    case "OT_BET":
                    case 2:
                        message.operationTypes[i] = 2;
                        break;
                    case "OT_CALL":
                    case 3:
                        message.operationTypes[i] = 3;
                        break;
                    case "OT_RAISE":
                    case 4:
                        message.operationTypes[i] = 4;
                        break;
                    case "OT_FOLD":
                    case 5:
                        message.operationTypes[i] = 5;
                        break;
                    case "OT_ALL_IN":
                    case 6:
                        message.operationTypes[i] = 6;
                        break;
                    case "OT_CHECK_OR_FOLD":
                    case 7:
                        message.operationTypes[i] = 7;
                        break;
                    case "OT_CALL_ANY":
                    case 8:
                        message.operationTypes[i] = 8;
                        break;
                    }
            }
            if (object.minBet != null)
                message.minBet = object.minBet | 0;
            if (object.maxBet != null)
                message.maxBet = object.maxBet | 0;
            return message;
        };

        /**
         * Creates a plain object from a NextTurnEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.NextTurnEvent
         * @static
         * @param {texas.NextTurnEvent} message NextTurnEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NextTurnEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.operationTypes = [];
            if (options.defaults) {
                object.minBet = 0;
                object.maxBet = 0;
            }
            if (message.operationTypes && message.operationTypes.length) {
                object.operationTypes = [];
                for (let j = 0; j < message.operationTypes.length; ++j)
                    object.operationTypes[j] = options.enums === String ? $root.texas.OPERATION_TYPE[message.operationTypes[j]] : message.operationTypes[j];
            }
            if (message.minBet != null && message.hasOwnProperty("minBet"))
                object.minBet = message.minBet;
            if (message.maxBet != null && message.hasOwnProperty("maxBet"))
                object.maxBet = message.maxBet;
            return object;
        };

        /**
         * Converts this NextTurnEvent to JSON.
         * @function toJSON
         * @memberof texas.NextTurnEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NextTurnEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NextTurnEvent;
    })();

    texas.OperationReq = (function() {

        /**
         * Properties of an OperationReq.
         * @memberof texas
         * @interface IOperationReq
         * @property {texas.OPERATION_TYPE|null} [type] OperationReq type
         * @property {number|null} [amount] OperationReq amount
         */

        /**
         * Constructs a new OperationReq.
         * @memberof texas
         * @classdesc Represents an OperationReq.
         * @implements IOperationReq
         * @constructor
         * @param {texas.IOperationReq=} [properties] Properties to set
         */
        function OperationReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OperationReq type.
         * @member {texas.OPERATION_TYPE} type
         * @memberof texas.OperationReq
         * @instance
         */
        OperationReq.prototype.type = 0;

        /**
         * OperationReq amount.
         * @member {number} amount
         * @memberof texas.OperationReq
         * @instance
         */
        OperationReq.prototype.amount = 0;

        /**
         * Creates a new OperationReq instance using the specified properties.
         * @function create
         * @memberof texas.OperationReq
         * @static
         * @param {texas.IOperationReq=} [properties] Properties to set
         * @returns {texas.OperationReq} OperationReq instance
         */
        OperationReq.create = function create(properties) {
            return new OperationReq(properties);
        };

        /**
         * Encodes the specified OperationReq message. Does not implicitly {@link texas.OperationReq.verify|verify} messages.
         * @function encode
         * @memberof texas.OperationReq
         * @static
         * @param {texas.IOperationReq} message OperationReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperationReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.amount);
            return writer;
        };

        /**
         * Encodes the specified OperationReq message, length delimited. Does not implicitly {@link texas.OperationReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.OperationReq
         * @static
         * @param {texas.IOperationReq} message OperationReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperationReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OperationReq message from the specified reader or buffer.
         * @function decode
         * @memberof texas.OperationReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.OperationReq} OperationReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OperationReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.OperationReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.amount = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OperationReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.OperationReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.OperationReq} OperationReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OperationReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OperationReq message.
         * @function verify
         * @memberof texas.OperationReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OperationReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    break;
                }
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount))
                    return "amount: integer expected";
            return null;
        };

        /**
         * Creates an OperationReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.OperationReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.OperationReq} OperationReq
         */
        OperationReq.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.OperationReq)
                return object;
            let message = new $root.texas.OperationReq();
            switch (object.type) {
            case "OT_NONE":
            case 0:
                message.type = 0;
                break;
            case "OT_CHECK":
            case 1:
                message.type = 1;
                break;
            case "OT_BET":
            case 2:
                message.type = 2;
                break;
            case "OT_CALL":
            case 3:
                message.type = 3;
                break;
            case "OT_RAISE":
            case 4:
                message.type = 4;
                break;
            case "OT_FOLD":
            case 5:
                message.type = 5;
                break;
            case "OT_ALL_IN":
            case 6:
                message.type = 6;
                break;
            case "OT_CHECK_OR_FOLD":
            case 7:
                message.type = 7;
                break;
            case "OT_CALL_ANY":
            case 8:
                message.type = 8;
                break;
            }
            if (object.amount != null)
                message.amount = object.amount | 0;
            return message;
        };

        /**
         * Creates a plain object from an OperationReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.OperationReq
         * @static
         * @param {texas.OperationReq} message OperationReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OperationReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "OT_NONE" : 0;
                object.amount = 0;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.texas.OPERATION_TYPE[message.type] : message.type;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = message.amount;
            return object;
        };

        /**
         * Converts this OperationReq to JSON.
         * @function toJSON
         * @memberof texas.OperationReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OperationReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OperationReq;
    })();

    texas.OperationCast = (function() {

        /**
         * Properties of an OperationCast.
         * @memberof texas
         * @interface IOperationCast
         * @property {number|null} [seatIndex] OperationCast seatIndex
         * @property {texas.OPERATION_TYPE|null} [type] OperationCast type
         * @property {number|null} [amount] OperationCast amount
         */

        /**
         * Constructs a new OperationCast.
         * @memberof texas
         * @classdesc Represents an OperationCast.
         * @implements IOperationCast
         * @constructor
         * @param {texas.IOperationCast=} [properties] Properties to set
         */
        function OperationCast(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OperationCast seatIndex.
         * @member {number} seatIndex
         * @memberof texas.OperationCast
         * @instance
         */
        OperationCast.prototype.seatIndex = 0;

        /**
         * OperationCast type.
         * @member {texas.OPERATION_TYPE} type
         * @memberof texas.OperationCast
         * @instance
         */
        OperationCast.prototype.type = 0;

        /**
         * OperationCast amount.
         * @member {number} amount
         * @memberof texas.OperationCast
         * @instance
         */
        OperationCast.prototype.amount = 0;

        /**
         * Creates a new OperationCast instance using the specified properties.
         * @function create
         * @memberof texas.OperationCast
         * @static
         * @param {texas.IOperationCast=} [properties] Properties to set
         * @returns {texas.OperationCast} OperationCast instance
         */
        OperationCast.create = function create(properties) {
            return new OperationCast(properties);
        };

        /**
         * Encodes the specified OperationCast message. Does not implicitly {@link texas.OperationCast.verify|verify} messages.
         * @function encode
         * @memberof texas.OperationCast
         * @static
         * @param {texas.IOperationCast} message OperationCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperationCast.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seatIndex != null && Object.hasOwnProperty.call(message, "seatIndex"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seatIndex);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.amount);
            return writer;
        };

        /**
         * Encodes the specified OperationCast message, length delimited. Does not implicitly {@link texas.OperationCast.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.OperationCast
         * @static
         * @param {texas.IOperationCast} message OperationCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperationCast.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OperationCast message from the specified reader or buffer.
         * @function decode
         * @memberof texas.OperationCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.OperationCast} OperationCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OperationCast.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.OperationCast();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seatIndex = reader.int32();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    message.amount = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OperationCast message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.OperationCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.OperationCast} OperationCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OperationCast.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OperationCast message.
         * @function verify
         * @memberof texas.OperationCast
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OperationCast.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seatIndex != null && message.hasOwnProperty("seatIndex"))
                if (!$util.isInteger(message.seatIndex))
                    return "seatIndex: integer expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    break;
                }
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount))
                    return "amount: integer expected";
            return null;
        };

        /**
         * Creates an OperationCast message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.OperationCast
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.OperationCast} OperationCast
         */
        OperationCast.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.OperationCast)
                return object;
            let message = new $root.texas.OperationCast();
            if (object.seatIndex != null)
                message.seatIndex = object.seatIndex | 0;
            switch (object.type) {
            case "OT_NONE":
            case 0:
                message.type = 0;
                break;
            case "OT_CHECK":
            case 1:
                message.type = 1;
                break;
            case "OT_BET":
            case 2:
                message.type = 2;
                break;
            case "OT_CALL":
            case 3:
                message.type = 3;
                break;
            case "OT_RAISE":
            case 4:
                message.type = 4;
                break;
            case "OT_FOLD":
            case 5:
                message.type = 5;
                break;
            case "OT_ALL_IN":
            case 6:
                message.type = 6;
                break;
            case "OT_CHECK_OR_FOLD":
            case 7:
                message.type = 7;
                break;
            case "OT_CALL_ANY":
            case 8:
                message.type = 8;
                break;
            }
            if (object.amount != null)
                message.amount = object.amount | 0;
            return message;
        };

        /**
         * Creates a plain object from an OperationCast message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.OperationCast
         * @static
         * @param {texas.OperationCast} message OperationCast
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OperationCast.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seatIndex = 0;
                object.type = options.enums === String ? "OT_NONE" : 0;
                object.amount = 0;
            }
            if (message.seatIndex != null && message.hasOwnProperty("seatIndex"))
                object.seatIndex = message.seatIndex;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.texas.OPERATION_TYPE[message.type] : message.type;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = message.amount;
            return object;
        };

        /**
         * Converts this OperationCast to JSON.
         * @function toJSON
         * @memberof texas.OperationCast
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OperationCast.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OperationCast;
    })();

    texas.StandReq = (function() {

        /**
         * Properties of a StandReq.
         * @memberof texas
         * @interface IStandReq
         */

        /**
         * Constructs a new StandReq.
         * @memberof texas
         * @classdesc Represents a StandReq.
         * @implements IStandReq
         * @constructor
         * @param {texas.IStandReq=} [properties] Properties to set
         */
        function StandReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new StandReq instance using the specified properties.
         * @function create
         * @memberof texas.StandReq
         * @static
         * @param {texas.IStandReq=} [properties] Properties to set
         * @returns {texas.StandReq} StandReq instance
         */
        StandReq.create = function create(properties) {
            return new StandReq(properties);
        };

        /**
         * Encodes the specified StandReq message. Does not implicitly {@link texas.StandReq.verify|verify} messages.
         * @function encode
         * @memberof texas.StandReq
         * @static
         * @param {texas.IStandReq} message StandReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StandReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified StandReq message, length delimited. Does not implicitly {@link texas.StandReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.StandReq
         * @static
         * @param {texas.IStandReq} message StandReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StandReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StandReq message from the specified reader or buffer.
         * @function decode
         * @memberof texas.StandReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.StandReq} StandReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StandReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.StandReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StandReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.StandReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.StandReq} StandReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StandReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StandReq message.
         * @function verify
         * @memberof texas.StandReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StandReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a StandReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.StandReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.StandReq} StandReq
         */
        StandReq.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.StandReq)
                return object;
            return new $root.texas.StandReq();
        };

        /**
         * Creates a plain object from a StandReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.StandReq
         * @static
         * @param {texas.StandReq} message StandReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StandReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this StandReq to JSON.
         * @function toJSON
         * @memberof texas.StandReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StandReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StandReq;
    })();

    texas.StandReply = (function() {

        /**
         * Properties of a StandReply.
         * @memberof texas
         * @interface IStandReply
         */

        /**
         * Constructs a new StandReply.
         * @memberof texas
         * @classdesc Represents a StandReply.
         * @implements IStandReply
         * @constructor
         * @param {texas.IStandReply=} [properties] Properties to set
         */
        function StandReply(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new StandReply instance using the specified properties.
         * @function create
         * @memberof texas.StandReply
         * @static
         * @param {texas.IStandReply=} [properties] Properties to set
         * @returns {texas.StandReply} StandReply instance
         */
        StandReply.create = function create(properties) {
            return new StandReply(properties);
        };

        /**
         * Encodes the specified StandReply message. Does not implicitly {@link texas.StandReply.verify|verify} messages.
         * @function encode
         * @memberof texas.StandReply
         * @static
         * @param {texas.IStandReply} message StandReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StandReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified StandReply message, length delimited. Does not implicitly {@link texas.StandReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.StandReply
         * @static
         * @param {texas.IStandReply} message StandReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StandReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StandReply message from the specified reader or buffer.
         * @function decode
         * @memberof texas.StandReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.StandReply} StandReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StandReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.StandReply();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StandReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.StandReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.StandReply} StandReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StandReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StandReply message.
         * @function verify
         * @memberof texas.StandReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StandReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a StandReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.StandReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.StandReply} StandReply
         */
        StandReply.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.StandReply)
                return object;
            return new $root.texas.StandReply();
        };

        /**
         * Creates a plain object from a StandReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.StandReply
         * @static
         * @param {texas.StandReply} message StandReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StandReply.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this StandReply to JSON.
         * @function toJSON
         * @memberof texas.StandReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StandReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StandReply;
    })();

    texas.SitReq = (function() {

        /**
         * Properties of a SitReq.
         * @memberof texas
         * @interface ISitReq
         * @property {number|null} [seatIndex] SitReq seatIndex
         */

        /**
         * Constructs a new SitReq.
         * @memberof texas
         * @classdesc Represents a SitReq.
         * @implements ISitReq
         * @constructor
         * @param {texas.ISitReq=} [properties] Properties to set
         */
        function SitReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SitReq seatIndex.
         * @member {number} seatIndex
         * @memberof texas.SitReq
         * @instance
         */
        SitReq.prototype.seatIndex = 0;

        /**
         * Creates a new SitReq instance using the specified properties.
         * @function create
         * @memberof texas.SitReq
         * @static
         * @param {texas.ISitReq=} [properties] Properties to set
         * @returns {texas.SitReq} SitReq instance
         */
        SitReq.create = function create(properties) {
            return new SitReq(properties);
        };

        /**
         * Encodes the specified SitReq message. Does not implicitly {@link texas.SitReq.verify|verify} messages.
         * @function encode
         * @memberof texas.SitReq
         * @static
         * @param {texas.ISitReq} message SitReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SitReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seatIndex != null && Object.hasOwnProperty.call(message, "seatIndex"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seatIndex);
            return writer;
        };

        /**
         * Encodes the specified SitReq message, length delimited. Does not implicitly {@link texas.SitReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.SitReq
         * @static
         * @param {texas.ISitReq} message SitReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SitReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SitReq message from the specified reader or buffer.
         * @function decode
         * @memberof texas.SitReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.SitReq} SitReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SitReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.SitReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seatIndex = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SitReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.SitReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.SitReq} SitReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SitReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SitReq message.
         * @function verify
         * @memberof texas.SitReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SitReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seatIndex != null && message.hasOwnProperty("seatIndex"))
                if (!$util.isInteger(message.seatIndex))
                    return "seatIndex: integer expected";
            return null;
        };

        /**
         * Creates a SitReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.SitReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.SitReq} SitReq
         */
        SitReq.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.SitReq)
                return object;
            let message = new $root.texas.SitReq();
            if (object.seatIndex != null)
                message.seatIndex = object.seatIndex | 0;
            return message;
        };

        /**
         * Creates a plain object from a SitReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.SitReq
         * @static
         * @param {texas.SitReq} message SitReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SitReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.seatIndex = 0;
            if (message.seatIndex != null && message.hasOwnProperty("seatIndex"))
                object.seatIndex = message.seatIndex;
            return object;
        };

        /**
         * Converts this SitReq to JSON.
         * @function toJSON
         * @memberof texas.SitReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SitReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SitReq;
    })();

    texas.SitReply = (function() {

        /**
         * Properties of a SitReply.
         * @memberof texas
         * @interface ISitReply
         * @property {number|null} [seatIndex] SitReply seatIndex
         */

        /**
         * Constructs a new SitReply.
         * @memberof texas
         * @classdesc Represents a SitReply.
         * @implements ISitReply
         * @constructor
         * @param {texas.ISitReply=} [properties] Properties to set
         */
        function SitReply(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SitReply seatIndex.
         * @member {number} seatIndex
         * @memberof texas.SitReply
         * @instance
         */
        SitReply.prototype.seatIndex = 0;

        /**
         * Creates a new SitReply instance using the specified properties.
         * @function create
         * @memberof texas.SitReply
         * @static
         * @param {texas.ISitReply=} [properties] Properties to set
         * @returns {texas.SitReply} SitReply instance
         */
        SitReply.create = function create(properties) {
            return new SitReply(properties);
        };

        /**
         * Encodes the specified SitReply message. Does not implicitly {@link texas.SitReply.verify|verify} messages.
         * @function encode
         * @memberof texas.SitReply
         * @static
         * @param {texas.ISitReply} message SitReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SitReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seatIndex != null && Object.hasOwnProperty.call(message, "seatIndex"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seatIndex);
            return writer;
        };

        /**
         * Encodes the specified SitReply message, length delimited. Does not implicitly {@link texas.SitReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.SitReply
         * @static
         * @param {texas.ISitReply} message SitReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SitReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SitReply message from the specified reader or buffer.
         * @function decode
         * @memberof texas.SitReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.SitReply} SitReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SitReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.SitReply();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seatIndex = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SitReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.SitReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.SitReply} SitReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SitReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SitReply message.
         * @function verify
         * @memberof texas.SitReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SitReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seatIndex != null && message.hasOwnProperty("seatIndex"))
                if (!$util.isInteger(message.seatIndex))
                    return "seatIndex: integer expected";
            return null;
        };

        /**
         * Creates a SitReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.SitReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.SitReply} SitReply
         */
        SitReply.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.SitReply)
                return object;
            let message = new $root.texas.SitReply();
            if (object.seatIndex != null)
                message.seatIndex = object.seatIndex | 0;
            return message;
        };

        /**
         * Creates a plain object from a SitReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.SitReply
         * @static
         * @param {texas.SitReply} message SitReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SitReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.seatIndex = 0;
            if (message.seatIndex != null && message.hasOwnProperty("seatIndex"))
                object.seatIndex = message.seatIndex;
            return object;
        };

        /**
         * Converts this SitReply to JSON.
         * @function toJSON
         * @memberof texas.SitReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SitReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SitReply;
    })();

    texas.GameDataReq = (function() {

        /**
         * Properties of a GameDataReq.
         * @memberof texas
         * @interface IGameDataReq
         * @property {number|null} [seatIndex] GameDataReq seatIndex
         */

        /**
         * Constructs a new GameDataReq.
         * @memberof texas
         * @classdesc Represents a GameDataReq.
         * @implements IGameDataReq
         * @constructor
         * @param {texas.IGameDataReq=} [properties] Properties to set
         */
        function GameDataReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameDataReq seatIndex.
         * @member {number} seatIndex
         * @memberof texas.GameDataReq
         * @instance
         */
        GameDataReq.prototype.seatIndex = 0;

        /**
         * Creates a new GameDataReq instance using the specified properties.
         * @function create
         * @memberof texas.GameDataReq
         * @static
         * @param {texas.IGameDataReq=} [properties] Properties to set
         * @returns {texas.GameDataReq} GameDataReq instance
         */
        GameDataReq.create = function create(properties) {
            return new GameDataReq(properties);
        };

        /**
         * Encodes the specified GameDataReq message. Does not implicitly {@link texas.GameDataReq.verify|verify} messages.
         * @function encode
         * @memberof texas.GameDataReq
         * @static
         * @param {texas.IGameDataReq} message GameDataReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameDataReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seatIndex != null && Object.hasOwnProperty.call(message, "seatIndex"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seatIndex);
            return writer;
        };

        /**
         * Encodes the specified GameDataReq message, length delimited. Does not implicitly {@link texas.GameDataReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.GameDataReq
         * @static
         * @param {texas.IGameDataReq} message GameDataReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameDataReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameDataReq message from the specified reader or buffer.
         * @function decode
         * @memberof texas.GameDataReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.GameDataReq} GameDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameDataReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.GameDataReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seatIndex = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameDataReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.GameDataReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.GameDataReq} GameDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameDataReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameDataReq message.
         * @function verify
         * @memberof texas.GameDataReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameDataReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seatIndex != null && message.hasOwnProperty("seatIndex"))
                if (!$util.isInteger(message.seatIndex))
                    return "seatIndex: integer expected";
            return null;
        };

        /**
         * Creates a GameDataReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.GameDataReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.GameDataReq} GameDataReq
         */
        GameDataReq.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.GameDataReq)
                return object;
            let message = new $root.texas.GameDataReq();
            if (object.seatIndex != null)
                message.seatIndex = object.seatIndex | 0;
            return message;
        };

        /**
         * Creates a plain object from a GameDataReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.GameDataReq
         * @static
         * @param {texas.GameDataReq} message GameDataReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameDataReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.seatIndex = 0;
            if (message.seatIndex != null && message.hasOwnProperty("seatIndex"))
                object.seatIndex = message.seatIndex;
            return object;
        };

        /**
         * Converts this GameDataReq to JSON.
         * @function toJSON
         * @memberof texas.GameDataReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameDataReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameDataReq;
    })();

    texas.GameDataReply = (function() {

        /**
         * Properties of a GameDataReply.
         * @memberof texas
         * @interface IGameDataReply
         * @property {number|null} [seatIndex] GameDataReply seatIndex
         * @property {number|null} [totalGames] GameDataReply totalGames
         * @property {number|null} [vpip] GameDataReply vpip
         * @property {number|null} [af] GameDataReply af
         */

        /**
         * Constructs a new GameDataReply.
         * @memberof texas
         * @classdesc Represents a GameDataReply.
         * @implements IGameDataReply
         * @constructor
         * @param {texas.IGameDataReply=} [properties] Properties to set
         */
        function GameDataReply(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameDataReply seatIndex.
         * @member {number} seatIndex
         * @memberof texas.GameDataReply
         * @instance
         */
        GameDataReply.prototype.seatIndex = 0;

        /**
         * GameDataReply totalGames.
         * @member {number} totalGames
         * @memberof texas.GameDataReply
         * @instance
         */
        GameDataReply.prototype.totalGames = 0;

        /**
         * GameDataReply vpip.
         * @member {number} vpip
         * @memberof texas.GameDataReply
         * @instance
         */
        GameDataReply.prototype.vpip = 0;

        /**
         * GameDataReply af.
         * @member {number} af
         * @memberof texas.GameDataReply
         * @instance
         */
        GameDataReply.prototype.af = 0;

        /**
         * Creates a new GameDataReply instance using the specified properties.
         * @function create
         * @memberof texas.GameDataReply
         * @static
         * @param {texas.IGameDataReply=} [properties] Properties to set
         * @returns {texas.GameDataReply} GameDataReply instance
         */
        GameDataReply.create = function create(properties) {
            return new GameDataReply(properties);
        };

        /**
         * Encodes the specified GameDataReply message. Does not implicitly {@link texas.GameDataReply.verify|verify} messages.
         * @function encode
         * @memberof texas.GameDataReply
         * @static
         * @param {texas.IGameDataReply} message GameDataReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameDataReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seatIndex != null && Object.hasOwnProperty.call(message, "seatIndex"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seatIndex);
            if (message.totalGames != null && Object.hasOwnProperty.call(message, "totalGames"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.totalGames);
            if (message.vpip != null && Object.hasOwnProperty.call(message, "vpip"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.vpip);
            if (message.af != null && Object.hasOwnProperty.call(message, "af"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.af);
            return writer;
        };

        /**
         * Encodes the specified GameDataReply message, length delimited. Does not implicitly {@link texas.GameDataReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.GameDataReply
         * @static
         * @param {texas.IGameDataReply} message GameDataReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameDataReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameDataReply message from the specified reader or buffer.
         * @function decode
         * @memberof texas.GameDataReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.GameDataReply} GameDataReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameDataReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.GameDataReply();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seatIndex = reader.int32();
                    break;
                case 2:
                    message.totalGames = reader.int32();
                    break;
                case 3:
                    message.vpip = reader.float();
                    break;
                case 4:
                    message.af = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameDataReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.GameDataReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.GameDataReply} GameDataReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameDataReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameDataReply message.
         * @function verify
         * @memberof texas.GameDataReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameDataReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seatIndex != null && message.hasOwnProperty("seatIndex"))
                if (!$util.isInteger(message.seatIndex))
                    return "seatIndex: integer expected";
            if (message.totalGames != null && message.hasOwnProperty("totalGames"))
                if (!$util.isInteger(message.totalGames))
                    return "totalGames: integer expected";
            if (message.vpip != null && message.hasOwnProperty("vpip"))
                if (typeof message.vpip !== "number")
                    return "vpip: number expected";
            if (message.af != null && message.hasOwnProperty("af"))
                if (typeof message.af !== "number")
                    return "af: number expected";
            return null;
        };

        /**
         * Creates a GameDataReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.GameDataReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.GameDataReply} GameDataReply
         */
        GameDataReply.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.GameDataReply)
                return object;
            let message = new $root.texas.GameDataReply();
            if (object.seatIndex != null)
                message.seatIndex = object.seatIndex | 0;
            if (object.totalGames != null)
                message.totalGames = object.totalGames | 0;
            if (object.vpip != null)
                message.vpip = Number(object.vpip);
            if (object.af != null)
                message.af = Number(object.af);
            return message;
        };

        /**
         * Creates a plain object from a GameDataReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.GameDataReply
         * @static
         * @param {texas.GameDataReply} message GameDataReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameDataReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seatIndex = 0;
                object.totalGames = 0;
                object.vpip = 0;
                object.af = 0;
            }
            if (message.seatIndex != null && message.hasOwnProperty("seatIndex"))
                object.seatIndex = message.seatIndex;
            if (message.totalGames != null && message.hasOwnProperty("totalGames"))
                object.totalGames = message.totalGames;
            if (message.vpip != null && message.hasOwnProperty("vpip"))
                object.vpip = options.json && !isFinite(message.vpip) ? String(message.vpip) : message.vpip;
            if (message.af != null && message.hasOwnProperty("af"))
                object.af = options.json && !isFinite(message.af) ? String(message.af) : message.af;
            return object;
        };

        /**
         * Converts this GameDataReply to JSON.
         * @function toJSON
         * @memberof texas.GameDataReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameDataReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameDataReply;
    })();

    texas.BuyInRangeReq = (function() {

        /**
         * Properties of a BuyInRangeReq.
         * @memberof texas
         * @interface IBuyInRangeReq
         */

        /**
         * Constructs a new BuyInRangeReq.
         * @memberof texas
         * @classdesc Represents a BuyInRangeReq.
         * @implements IBuyInRangeReq
         * @constructor
         * @param {texas.IBuyInRangeReq=} [properties] Properties to set
         */
        function BuyInRangeReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new BuyInRangeReq instance using the specified properties.
         * @function create
         * @memberof texas.BuyInRangeReq
         * @static
         * @param {texas.IBuyInRangeReq=} [properties] Properties to set
         * @returns {texas.BuyInRangeReq} BuyInRangeReq instance
         */
        BuyInRangeReq.create = function create(properties) {
            return new BuyInRangeReq(properties);
        };

        /**
         * Encodes the specified BuyInRangeReq message. Does not implicitly {@link texas.BuyInRangeReq.verify|verify} messages.
         * @function encode
         * @memberof texas.BuyInRangeReq
         * @static
         * @param {texas.IBuyInRangeReq} message BuyInRangeReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BuyInRangeReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified BuyInRangeReq message, length delimited. Does not implicitly {@link texas.BuyInRangeReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.BuyInRangeReq
         * @static
         * @param {texas.IBuyInRangeReq} message BuyInRangeReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BuyInRangeReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BuyInRangeReq message from the specified reader or buffer.
         * @function decode
         * @memberof texas.BuyInRangeReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.BuyInRangeReq} BuyInRangeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BuyInRangeReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.BuyInRangeReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BuyInRangeReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.BuyInRangeReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.BuyInRangeReq} BuyInRangeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BuyInRangeReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BuyInRangeReq message.
         * @function verify
         * @memberof texas.BuyInRangeReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BuyInRangeReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a BuyInRangeReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.BuyInRangeReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.BuyInRangeReq} BuyInRangeReq
         */
        BuyInRangeReq.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.BuyInRangeReq)
                return object;
            return new $root.texas.BuyInRangeReq();
        };

        /**
         * Creates a plain object from a BuyInRangeReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.BuyInRangeReq
         * @static
         * @param {texas.BuyInRangeReq} message BuyInRangeReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BuyInRangeReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this BuyInRangeReq to JSON.
         * @function toJSON
         * @memberof texas.BuyInRangeReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BuyInRangeReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BuyInRangeReq;
    })();

    texas.BuyInRangeReply = (function() {

        /**
         * Properties of a BuyInRangeReply.
         * @memberof texas
         * @interface IBuyInRangeReply
         * @property {number|null} [min] BuyInRangeReply min
         * @property {number|null} [max] BuyInRangeReply max
         */

        /**
         * Constructs a new BuyInRangeReply.
         * @memberof texas
         * @classdesc Represents a BuyInRangeReply.
         * @implements IBuyInRangeReply
         * @constructor
         * @param {texas.IBuyInRangeReply=} [properties] Properties to set
         */
        function BuyInRangeReply(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BuyInRangeReply min.
         * @member {number} min
         * @memberof texas.BuyInRangeReply
         * @instance
         */
        BuyInRangeReply.prototype.min = 0;

        /**
         * BuyInRangeReply max.
         * @member {number} max
         * @memberof texas.BuyInRangeReply
         * @instance
         */
        BuyInRangeReply.prototype.max = 0;

        /**
         * Creates a new BuyInRangeReply instance using the specified properties.
         * @function create
         * @memberof texas.BuyInRangeReply
         * @static
         * @param {texas.IBuyInRangeReply=} [properties] Properties to set
         * @returns {texas.BuyInRangeReply} BuyInRangeReply instance
         */
        BuyInRangeReply.create = function create(properties) {
            return new BuyInRangeReply(properties);
        };

        /**
         * Encodes the specified BuyInRangeReply message. Does not implicitly {@link texas.BuyInRangeReply.verify|verify} messages.
         * @function encode
         * @memberof texas.BuyInRangeReply
         * @static
         * @param {texas.IBuyInRangeReply} message BuyInRangeReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BuyInRangeReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.min != null && Object.hasOwnProperty.call(message, "min"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.min);
            if (message.max != null && Object.hasOwnProperty.call(message, "max"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.max);
            return writer;
        };

        /**
         * Encodes the specified BuyInRangeReply message, length delimited. Does not implicitly {@link texas.BuyInRangeReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.BuyInRangeReply
         * @static
         * @param {texas.IBuyInRangeReply} message BuyInRangeReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BuyInRangeReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BuyInRangeReply message from the specified reader or buffer.
         * @function decode
         * @memberof texas.BuyInRangeReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.BuyInRangeReply} BuyInRangeReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BuyInRangeReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.BuyInRangeReply();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.min = reader.int32();
                    break;
                case 2:
                    message.max = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BuyInRangeReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.BuyInRangeReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.BuyInRangeReply} BuyInRangeReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BuyInRangeReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BuyInRangeReply message.
         * @function verify
         * @memberof texas.BuyInRangeReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BuyInRangeReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.min != null && message.hasOwnProperty("min"))
                if (!$util.isInteger(message.min))
                    return "min: integer expected";
            if (message.max != null && message.hasOwnProperty("max"))
                if (!$util.isInteger(message.max))
                    return "max: integer expected";
            return null;
        };

        /**
         * Creates a BuyInRangeReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.BuyInRangeReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.BuyInRangeReply} BuyInRangeReply
         */
        BuyInRangeReply.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.BuyInRangeReply)
                return object;
            let message = new $root.texas.BuyInRangeReply();
            if (object.min != null)
                message.min = object.min | 0;
            if (object.max != null)
                message.max = object.max | 0;
            return message;
        };

        /**
         * Creates a plain object from a BuyInRangeReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.BuyInRangeReply
         * @static
         * @param {texas.BuyInRangeReply} message BuyInRangeReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BuyInRangeReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.min = 0;
                object.max = 0;
            }
            if (message.min != null && message.hasOwnProperty("min"))
                object.min = message.min;
            if (message.max != null && message.hasOwnProperty("max"))
                object.max = message.max;
            return object;
        };

        /**
         * Converts this BuyInRangeReply to JSON.
         * @function toJSON
         * @memberof texas.BuyInRangeReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BuyInRangeReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BuyInRangeReply;
    })();

    texas.BuyInReq = (function() {

        /**
         * Properties of a BuyInReq.
         * @memberof texas
         * @interface IBuyInReq
         * @property {number|null} [amount] BuyInReq amount
         */

        /**
         * Constructs a new BuyInReq.
         * @memberof texas
         * @classdesc Represents a BuyInReq.
         * @implements IBuyInReq
         * @constructor
         * @param {texas.IBuyInReq=} [properties] Properties to set
         */
        function BuyInReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BuyInReq amount.
         * @member {number} amount
         * @memberof texas.BuyInReq
         * @instance
         */
        BuyInReq.prototype.amount = 0;

        /**
         * Creates a new BuyInReq instance using the specified properties.
         * @function create
         * @memberof texas.BuyInReq
         * @static
         * @param {texas.IBuyInReq=} [properties] Properties to set
         * @returns {texas.BuyInReq} BuyInReq instance
         */
        BuyInReq.create = function create(properties) {
            return new BuyInReq(properties);
        };

        /**
         * Encodes the specified BuyInReq message. Does not implicitly {@link texas.BuyInReq.verify|verify} messages.
         * @function encode
         * @memberof texas.BuyInReq
         * @static
         * @param {texas.IBuyInReq} message BuyInReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BuyInReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.amount);
            return writer;
        };

        /**
         * Encodes the specified BuyInReq message, length delimited. Does not implicitly {@link texas.BuyInReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.BuyInReq
         * @static
         * @param {texas.IBuyInReq} message BuyInReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BuyInReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BuyInReq message from the specified reader or buffer.
         * @function decode
         * @memberof texas.BuyInReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.BuyInReq} BuyInReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BuyInReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.BuyInReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.amount = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BuyInReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.BuyInReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.BuyInReq} BuyInReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BuyInReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BuyInReq message.
         * @function verify
         * @memberof texas.BuyInReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BuyInReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount))
                    return "amount: integer expected";
            return null;
        };

        /**
         * Creates a BuyInReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.BuyInReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.BuyInReq} BuyInReq
         */
        BuyInReq.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.BuyInReq)
                return object;
            let message = new $root.texas.BuyInReq();
            if (object.amount != null)
                message.amount = object.amount | 0;
            return message;
        };

        /**
         * Creates a plain object from a BuyInReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.BuyInReq
         * @static
         * @param {texas.BuyInReq} message BuyInReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BuyInReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.amount = 0;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = message.amount;
            return object;
        };

        /**
         * Converts this BuyInReq to JSON.
         * @function toJSON
         * @memberof texas.BuyInReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BuyInReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BuyInReq;
    })();

    texas.RoundCast = (function() {

        /**
         * Properties of a RoundCast.
         * @memberof texas
         * @interface IRoundCast
         * @property {texas.ROUND_TYPE|null} [type] RoundCast type
         * @property {Array.<number>|null} [cards] RoundCast cards
         */

        /**
         * Constructs a new RoundCast.
         * @memberof texas
         * @classdesc Represents a RoundCast.
         * @implements IRoundCast
         * @constructor
         * @param {texas.IRoundCast=} [properties] Properties to set
         */
        function RoundCast(properties) {
            this.cards = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoundCast type.
         * @member {texas.ROUND_TYPE} type
         * @memberof texas.RoundCast
         * @instance
         */
        RoundCast.prototype.type = 0;

        /**
         * RoundCast cards.
         * @member {Array.<number>} cards
         * @memberof texas.RoundCast
         * @instance
         */
        RoundCast.prototype.cards = $util.emptyArray;

        /**
         * Creates a new RoundCast instance using the specified properties.
         * @function create
         * @memberof texas.RoundCast
         * @static
         * @param {texas.IRoundCast=} [properties] Properties to set
         * @returns {texas.RoundCast} RoundCast instance
         */
        RoundCast.create = function create(properties) {
            return new RoundCast(properties);
        };

        /**
         * Encodes the specified RoundCast message. Does not implicitly {@link texas.RoundCast.verify|verify} messages.
         * @function encode
         * @memberof texas.RoundCast
         * @static
         * @param {texas.IRoundCast} message RoundCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoundCast.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.cards != null && message.cards.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.cards.length; ++i)
                    writer.int32(message.cards[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified RoundCast message, length delimited. Does not implicitly {@link texas.RoundCast.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.RoundCast
         * @static
         * @param {texas.IRoundCast} message RoundCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoundCast.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoundCast message from the specified reader or buffer.
         * @function decode
         * @memberof texas.RoundCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.RoundCast} RoundCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoundCast.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.RoundCast();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    if (!(message.cards && message.cards.length))
                        message.cards = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.cards.push(reader.int32());
                    } else
                        message.cards.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoundCast message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.RoundCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.RoundCast} RoundCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoundCast.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoundCast message.
         * @function verify
         * @memberof texas.RoundCast
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoundCast.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.cards != null && message.hasOwnProperty("cards")) {
                if (!Array.isArray(message.cards))
                    return "cards: array expected";
                for (let i = 0; i < message.cards.length; ++i)
                    if (!$util.isInteger(message.cards[i]))
                        return "cards: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a RoundCast message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.RoundCast
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.RoundCast} RoundCast
         */
        RoundCast.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.RoundCast)
                return object;
            let message = new $root.texas.RoundCast();
            switch (object.type) {
            case "RT_NONE":
            case 0:
                message.type = 0;
                break;
            case "RT_PRE_FLOP":
            case 1:
                message.type = 1;
                break;
            case "RT_FLOP":
            case 2:
                message.type = 2;
                break;
            case "RT_TURN":
            case 3:
                message.type = 3;
                break;
            case "RT_RIVER":
            case 4:
                message.type = 4;
                break;
            case "RT_ENDING":
            case 5:
                message.type = 5;
                break;
            }
            if (object.cards) {
                if (!Array.isArray(object.cards))
                    throw TypeError(".texas.RoundCast.cards: array expected");
                message.cards = [];
                for (let i = 0; i < object.cards.length; ++i)
                    message.cards[i] = object.cards[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a RoundCast message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.RoundCast
         * @static
         * @param {texas.RoundCast} message RoundCast
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoundCast.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.cards = [];
            if (options.defaults)
                object.type = options.enums === String ? "RT_NONE" : 0;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.texas.ROUND_TYPE[message.type] : message.type;
            if (message.cards && message.cards.length) {
                object.cards = [];
                for (let j = 0; j < message.cards.length; ++j)
                    object.cards[j] = message.cards[j];
            }
            return object;
        };

        /**
         * Converts this RoundCast to JSON.
         * @function toJSON
         * @memberof texas.RoundCast
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoundCast.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoundCast;
    })();

    texas.GameWinCast = (function() {

        /**
         * Properties of a GameWinCast.
         * @memberof texas
         * @interface IGameWinCast
         * @property {Array.<texas.GameWinCast.IPlayer>|null} [players] GameWinCast players
         * @property {Array.<number>|null} [pots] GameWinCast pots
         * @property {Array.<number>|null} [winPlayerSeats] GameWinCast winPlayerSeats
         */

        /**
         * Constructs a new GameWinCast.
         * @memberof texas
         * @classdesc Represents a GameWinCast.
         * @implements IGameWinCast
         * @constructor
         * @param {texas.IGameWinCast=} [properties] Properties to set
         */
        function GameWinCast(properties) {
            this.players = [];
            this.pots = [];
            this.winPlayerSeats = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameWinCast players.
         * @member {Array.<texas.GameWinCast.IPlayer>} players
         * @memberof texas.GameWinCast
         * @instance
         */
        GameWinCast.prototype.players = $util.emptyArray;

        /**
         * GameWinCast pots.
         * @member {Array.<number>} pots
         * @memberof texas.GameWinCast
         * @instance
         */
        GameWinCast.prototype.pots = $util.emptyArray;

        /**
         * GameWinCast winPlayerSeats.
         * @member {Array.<number>} winPlayerSeats
         * @memberof texas.GameWinCast
         * @instance
         */
        GameWinCast.prototype.winPlayerSeats = $util.emptyArray;

        /**
         * Creates a new GameWinCast instance using the specified properties.
         * @function create
         * @memberof texas.GameWinCast
         * @static
         * @param {texas.IGameWinCast=} [properties] Properties to set
         * @returns {texas.GameWinCast} GameWinCast instance
         */
        GameWinCast.create = function create(properties) {
            return new GameWinCast(properties);
        };

        /**
         * Encodes the specified GameWinCast message. Does not implicitly {@link texas.GameWinCast.verify|verify} messages.
         * @function encode
         * @memberof texas.GameWinCast
         * @static
         * @param {texas.IGameWinCast} message GameWinCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameWinCast.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.players != null && message.players.length)
                for (let i = 0; i < message.players.length; ++i)
                    $root.texas.GameWinCast.Player.encode(message.players[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.pots != null && message.pots.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.pots.length; ++i)
                    writer.int32(message.pots[i]);
                writer.ldelim();
            }
            if (message.winPlayerSeats != null && message.winPlayerSeats.length) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork();
                for (let i = 0; i < message.winPlayerSeats.length; ++i)
                    writer.int32(message.winPlayerSeats[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified GameWinCast message, length delimited. Does not implicitly {@link texas.GameWinCast.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.GameWinCast
         * @static
         * @param {texas.IGameWinCast} message GameWinCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameWinCast.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameWinCast message from the specified reader or buffer.
         * @function decode
         * @memberof texas.GameWinCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.GameWinCast} GameWinCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameWinCast.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.GameWinCast();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.players && message.players.length))
                        message.players = [];
                    message.players.push($root.texas.GameWinCast.Player.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message.pots && message.pots.length))
                        message.pots = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.pots.push(reader.int32());
                    } else
                        message.pots.push(reader.int32());
                    break;
                case 3:
                    if (!(message.winPlayerSeats && message.winPlayerSeats.length))
                        message.winPlayerSeats = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.winPlayerSeats.push(reader.int32());
                    } else
                        message.winPlayerSeats.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameWinCast message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.GameWinCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.GameWinCast} GameWinCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameWinCast.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameWinCast message.
         * @function verify
         * @memberof texas.GameWinCast
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameWinCast.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (let i = 0; i < message.players.length; ++i) {
                    let error = $root.texas.GameWinCast.Player.verify(message.players[i]);
                    if (error)
                        return "players." + error;
                }
            }
            if (message.pots != null && message.hasOwnProperty("pots")) {
                if (!Array.isArray(message.pots))
                    return "pots: array expected";
                for (let i = 0; i < message.pots.length; ++i)
                    if (!$util.isInteger(message.pots[i]))
                        return "pots: integer[] expected";
            }
            if (message.winPlayerSeats != null && message.hasOwnProperty("winPlayerSeats")) {
                if (!Array.isArray(message.winPlayerSeats))
                    return "winPlayerSeats: array expected";
                for (let i = 0; i < message.winPlayerSeats.length; ++i)
                    if (!$util.isInteger(message.winPlayerSeats[i]))
                        return "winPlayerSeats: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a GameWinCast message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.GameWinCast
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.GameWinCast} GameWinCast
         */
        GameWinCast.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.GameWinCast)
                return object;
            let message = new $root.texas.GameWinCast();
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".texas.GameWinCast.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i) {
                    if (typeof object.players[i] !== "object")
                        throw TypeError(".texas.GameWinCast.players: object expected");
                    message.players[i] = $root.texas.GameWinCast.Player.fromObject(object.players[i]);
                }
            }
            if (object.pots) {
                if (!Array.isArray(object.pots))
                    throw TypeError(".texas.GameWinCast.pots: array expected");
                message.pots = [];
                for (let i = 0; i < object.pots.length; ++i)
                    message.pots[i] = object.pots[i] | 0;
            }
            if (object.winPlayerSeats) {
                if (!Array.isArray(object.winPlayerSeats))
                    throw TypeError(".texas.GameWinCast.winPlayerSeats: array expected");
                message.winPlayerSeats = [];
                for (let i = 0; i < object.winPlayerSeats.length; ++i)
                    message.winPlayerSeats[i] = object.winPlayerSeats[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a GameWinCast message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.GameWinCast
         * @static
         * @param {texas.GameWinCast} message GameWinCast
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameWinCast.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.players = [];
                object.pots = [];
                object.winPlayerSeats = [];
            }
            if (message.players && message.players.length) {
                object.players = [];
                for (let j = 0; j < message.players.length; ++j)
                    object.players[j] = $root.texas.GameWinCast.Player.toObject(message.players[j], options);
            }
            if (message.pots && message.pots.length) {
                object.pots = [];
                for (let j = 0; j < message.pots.length; ++j)
                    object.pots[j] = message.pots[j];
            }
            if (message.winPlayerSeats && message.winPlayerSeats.length) {
                object.winPlayerSeats = [];
                for (let j = 0; j < message.winPlayerSeats.length; ++j)
                    object.winPlayerSeats[j] = message.winPlayerSeats[j];
            }
            return object;
        };

        /**
         * Converts this GameWinCast to JSON.
         * @function toJSON
         * @memberof texas.GameWinCast
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameWinCast.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        GameWinCast.Player = (function() {

            /**
             * Properties of a Player.
             * @memberof texas.GameWinCast
             * @interface IPlayer
             * @property {number|null} [seatIndex] Player seatIndex
             * @property {number|null} [winBet] Player winBet
             * @property {Array.<number>|null} [winPotsIndex] Player winPotsIndex
             * @property {Array.<number>|null} [winPotsBet] Player winPotsBet
             * @property {texas.ICardSet|null} [cardSet] Player cardSet
             * @property {Array.<number>|null} [useCards] Player useCards
             * @property {number|null} [balance] Player balance
             * @property {boolean|null} [showWinner] Player showWinner
             * @property {number|null} [totalBet] Player totalBet
             */

            /**
             * Constructs a new Player.
             * @memberof texas.GameWinCast
             * @classdesc Represents a Player.
             * @implements IPlayer
             * @constructor
             * @param {texas.GameWinCast.IPlayer=} [properties] Properties to set
             */
            function Player(properties) {
                this.winPotsIndex = [];
                this.winPotsBet = [];
                this.useCards = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Player seatIndex.
             * @member {number} seatIndex
             * @memberof texas.GameWinCast.Player
             * @instance
             */
            Player.prototype.seatIndex = 0;

            /**
             * Player winBet.
             * @member {number} winBet
             * @memberof texas.GameWinCast.Player
             * @instance
             */
            Player.prototype.winBet = 0;

            /**
             * Player winPotsIndex.
             * @member {Array.<number>} winPotsIndex
             * @memberof texas.GameWinCast.Player
             * @instance
             */
            Player.prototype.winPotsIndex = $util.emptyArray;

            /**
             * Player winPotsBet.
             * @member {Array.<number>} winPotsBet
             * @memberof texas.GameWinCast.Player
             * @instance
             */
            Player.prototype.winPotsBet = $util.emptyArray;

            /**
             * Player cardSet.
             * @member {texas.ICardSet|null|undefined} cardSet
             * @memberof texas.GameWinCast.Player
             * @instance
             */
            Player.prototype.cardSet = null;

            /**
             * Player useCards.
             * @member {Array.<number>} useCards
             * @memberof texas.GameWinCast.Player
             * @instance
             */
            Player.prototype.useCards = $util.emptyArray;

            /**
             * Player balance.
             * @member {number} balance
             * @memberof texas.GameWinCast.Player
             * @instance
             */
            Player.prototype.balance = 0;

            /**
             * Player showWinner.
             * @member {boolean} showWinner
             * @memberof texas.GameWinCast.Player
             * @instance
             */
            Player.prototype.showWinner = false;

            /**
             * Player totalBet.
             * @member {number} totalBet
             * @memberof texas.GameWinCast.Player
             * @instance
             */
            Player.prototype.totalBet = 0;

            /**
             * Creates a new Player instance using the specified properties.
             * @function create
             * @memberof texas.GameWinCast.Player
             * @static
             * @param {texas.GameWinCast.IPlayer=} [properties] Properties to set
             * @returns {texas.GameWinCast.Player} Player instance
             */
            Player.create = function create(properties) {
                return new Player(properties);
            };

            /**
             * Encodes the specified Player message. Does not implicitly {@link texas.GameWinCast.Player.verify|verify} messages.
             * @function encode
             * @memberof texas.GameWinCast.Player
             * @static
             * @param {texas.GameWinCast.IPlayer} message Player message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Player.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seatIndex != null && Object.hasOwnProperty.call(message, "seatIndex"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seatIndex);
                if (message.winBet != null && Object.hasOwnProperty.call(message, "winBet"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.winBet);
                if (message.winPotsIndex != null && message.winPotsIndex.length) {
                    writer.uint32(/* id 3, wireType 2 =*/26).fork();
                    for (let i = 0; i < message.winPotsIndex.length; ++i)
                        writer.int32(message.winPotsIndex[i]);
                    writer.ldelim();
                }
                if (message.winPotsBet != null && message.winPotsBet.length) {
                    writer.uint32(/* id 4, wireType 2 =*/34).fork();
                    for (let i = 0; i < message.winPotsBet.length; ++i)
                        writer.int32(message.winPotsBet[i]);
                    writer.ldelim();
                }
                if (message.cardSet != null && Object.hasOwnProperty.call(message, "cardSet"))
                    $root.texas.CardSet.encode(message.cardSet, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.useCards != null && message.useCards.length) {
                    writer.uint32(/* id 6, wireType 2 =*/50).fork();
                    for (let i = 0; i < message.useCards.length; ++i)
                        writer.int32(message.useCards[i]);
                    writer.ldelim();
                }
                if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.balance);
                if (message.showWinner != null && Object.hasOwnProperty.call(message, "showWinner"))
                    writer.uint32(/* id 8, wireType 0 =*/64).bool(message.showWinner);
                if (message.totalBet != null && Object.hasOwnProperty.call(message, "totalBet"))
                    writer.uint32(/* id 9, wireType 0 =*/72).int32(message.totalBet);
                return writer;
            };

            /**
             * Encodes the specified Player message, length delimited. Does not implicitly {@link texas.GameWinCast.Player.verify|verify} messages.
             * @function encodeDelimited
             * @memberof texas.GameWinCast.Player
             * @static
             * @param {texas.GameWinCast.IPlayer} message Player message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Player.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Player message from the specified reader or buffer.
             * @function decode
             * @memberof texas.GameWinCast.Player
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {texas.GameWinCast.Player} Player
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Player.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.GameWinCast.Player();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.seatIndex = reader.int32();
                        break;
                    case 2:
                        message.winBet = reader.int32();
                        break;
                    case 3:
                        if (!(message.winPotsIndex && message.winPotsIndex.length))
                            message.winPotsIndex = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.winPotsIndex.push(reader.int32());
                        } else
                            message.winPotsIndex.push(reader.int32());
                        break;
                    case 4:
                        if (!(message.winPotsBet && message.winPotsBet.length))
                            message.winPotsBet = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.winPotsBet.push(reader.int32());
                        } else
                            message.winPotsBet.push(reader.int32());
                        break;
                    case 5:
                        message.cardSet = $root.texas.CardSet.decode(reader, reader.uint32());
                        break;
                    case 6:
                        if (!(message.useCards && message.useCards.length))
                            message.useCards = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.useCards.push(reader.int32());
                        } else
                            message.useCards.push(reader.int32());
                        break;
                    case 7:
                        message.balance = reader.int32();
                        break;
                    case 8:
                        message.showWinner = reader.bool();
                        break;
                    case 9:
                        message.totalBet = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Player message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof texas.GameWinCast.Player
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {texas.GameWinCast.Player} Player
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Player.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Player message.
             * @function verify
             * @memberof texas.GameWinCast.Player
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Player.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seatIndex != null && message.hasOwnProperty("seatIndex"))
                    if (!$util.isInteger(message.seatIndex))
                        return "seatIndex: integer expected";
                if (message.winBet != null && message.hasOwnProperty("winBet"))
                    if (!$util.isInteger(message.winBet))
                        return "winBet: integer expected";
                if (message.winPotsIndex != null && message.hasOwnProperty("winPotsIndex")) {
                    if (!Array.isArray(message.winPotsIndex))
                        return "winPotsIndex: array expected";
                    for (let i = 0; i < message.winPotsIndex.length; ++i)
                        if (!$util.isInteger(message.winPotsIndex[i]))
                            return "winPotsIndex: integer[] expected";
                }
                if (message.winPotsBet != null && message.hasOwnProperty("winPotsBet")) {
                    if (!Array.isArray(message.winPotsBet))
                        return "winPotsBet: array expected";
                    for (let i = 0; i < message.winPotsBet.length; ++i)
                        if (!$util.isInteger(message.winPotsBet[i]))
                            return "winPotsBet: integer[] expected";
                }
                if (message.cardSet != null && message.hasOwnProperty("cardSet")) {
                    let error = $root.texas.CardSet.verify(message.cardSet);
                    if (error)
                        return "cardSet." + error;
                }
                if (message.useCards != null && message.hasOwnProperty("useCards")) {
                    if (!Array.isArray(message.useCards))
                        return "useCards: array expected";
                    for (let i = 0; i < message.useCards.length; ++i)
                        if (!$util.isInteger(message.useCards[i]))
                            return "useCards: integer[] expected";
                }
                if (message.balance != null && message.hasOwnProperty("balance"))
                    if (!$util.isInteger(message.balance))
                        return "balance: integer expected";
                if (message.showWinner != null && message.hasOwnProperty("showWinner"))
                    if (typeof message.showWinner !== "boolean")
                        return "showWinner: boolean expected";
                if (message.totalBet != null && message.hasOwnProperty("totalBet"))
                    if (!$util.isInteger(message.totalBet))
                        return "totalBet: integer expected";
                return null;
            };

            /**
             * Creates a Player message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof texas.GameWinCast.Player
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {texas.GameWinCast.Player} Player
             */
            Player.fromObject = function fromObject(object) {
                if (object instanceof $root.texas.GameWinCast.Player)
                    return object;
                let message = new $root.texas.GameWinCast.Player();
                if (object.seatIndex != null)
                    message.seatIndex = object.seatIndex | 0;
                if (object.winBet != null)
                    message.winBet = object.winBet | 0;
                if (object.winPotsIndex) {
                    if (!Array.isArray(object.winPotsIndex))
                        throw TypeError(".texas.GameWinCast.Player.winPotsIndex: array expected");
                    message.winPotsIndex = [];
                    for (let i = 0; i < object.winPotsIndex.length; ++i)
                        message.winPotsIndex[i] = object.winPotsIndex[i] | 0;
                }
                if (object.winPotsBet) {
                    if (!Array.isArray(object.winPotsBet))
                        throw TypeError(".texas.GameWinCast.Player.winPotsBet: array expected");
                    message.winPotsBet = [];
                    for (let i = 0; i < object.winPotsBet.length; ++i)
                        message.winPotsBet[i] = object.winPotsBet[i] | 0;
                }
                if (object.cardSet != null) {
                    if (typeof object.cardSet !== "object")
                        throw TypeError(".texas.GameWinCast.Player.cardSet: object expected");
                    message.cardSet = $root.texas.CardSet.fromObject(object.cardSet);
                }
                if (object.useCards) {
                    if (!Array.isArray(object.useCards))
                        throw TypeError(".texas.GameWinCast.Player.useCards: array expected");
                    message.useCards = [];
                    for (let i = 0; i < object.useCards.length; ++i)
                        message.useCards[i] = object.useCards[i] | 0;
                }
                if (object.balance != null)
                    message.balance = object.balance | 0;
                if (object.showWinner != null)
                    message.showWinner = Boolean(object.showWinner);
                if (object.totalBet != null)
                    message.totalBet = object.totalBet | 0;
                return message;
            };

            /**
             * Creates a plain object from a Player message. Also converts values to other types if specified.
             * @function toObject
             * @memberof texas.GameWinCast.Player
             * @static
             * @param {texas.GameWinCast.Player} message Player
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Player.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults) {
                    object.winPotsIndex = [];
                    object.winPotsBet = [];
                    object.useCards = [];
                }
                if (options.defaults) {
                    object.seatIndex = 0;
                    object.winBet = 0;
                    object.cardSet = null;
                    object.balance = 0;
                    object.showWinner = false;
                    object.totalBet = 0;
                }
                if (message.seatIndex != null && message.hasOwnProperty("seatIndex"))
                    object.seatIndex = message.seatIndex;
                if (message.winBet != null && message.hasOwnProperty("winBet"))
                    object.winBet = message.winBet;
                if (message.winPotsIndex && message.winPotsIndex.length) {
                    object.winPotsIndex = [];
                    for (let j = 0; j < message.winPotsIndex.length; ++j)
                        object.winPotsIndex[j] = message.winPotsIndex[j];
                }
                if (message.winPotsBet && message.winPotsBet.length) {
                    object.winPotsBet = [];
                    for (let j = 0; j < message.winPotsBet.length; ++j)
                        object.winPotsBet[j] = message.winPotsBet[j];
                }
                if (message.cardSet != null && message.hasOwnProperty("cardSet"))
                    object.cardSet = $root.texas.CardSet.toObject(message.cardSet, options);
                if (message.useCards && message.useCards.length) {
                    object.useCards = [];
                    for (let j = 0; j < message.useCards.length; ++j)
                        object.useCards[j] = message.useCards[j];
                }
                if (message.balance != null && message.hasOwnProperty("balance"))
                    object.balance = message.balance;
                if (message.showWinner != null && message.hasOwnProperty("showWinner"))
                    object.showWinner = message.showWinner;
                if (message.totalBet != null && message.hasOwnProperty("totalBet"))
                    object.totalBet = message.totalBet;
                return object;
            };

            /**
             * Converts this Player to JSON.
             * @function toJSON
             * @memberof texas.GameWinCast.Player
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Player.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Player;
        })();

        return GameWinCast;
    })();

    texas.CardSet = (function() {

        /**
         * Properties of a CardSet.
         * @memberof texas
         * @interface ICardSet
         * @property {Array.<number>|null} [cards] CardSet cards
         * @property {texas.CARD_TYPE|null} [type] CardSet type
         * @property {number|null} [cardStrength] CardSet cardStrength
         */

        /**
         * Constructs a new CardSet.
         * @memberof texas
         * @classdesc Represents a CardSet.
         * @implements ICardSet
         * @constructor
         * @param {texas.ICardSet=} [properties] Properties to set
         */
        function CardSet(properties) {
            this.cards = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CardSet cards.
         * @member {Array.<number>} cards
         * @memberof texas.CardSet
         * @instance
         */
        CardSet.prototype.cards = $util.emptyArray;

        /**
         * CardSet type.
         * @member {texas.CARD_TYPE} type
         * @memberof texas.CardSet
         * @instance
         */
        CardSet.prototype.type = 0;

        /**
         * CardSet cardStrength.
         * @member {number} cardStrength
         * @memberof texas.CardSet
         * @instance
         */
        CardSet.prototype.cardStrength = 0;

        /**
         * Creates a new CardSet instance using the specified properties.
         * @function create
         * @memberof texas.CardSet
         * @static
         * @param {texas.ICardSet=} [properties] Properties to set
         * @returns {texas.CardSet} CardSet instance
         */
        CardSet.create = function create(properties) {
            return new CardSet(properties);
        };

        /**
         * Encodes the specified CardSet message. Does not implicitly {@link texas.CardSet.verify|verify} messages.
         * @function encode
         * @memberof texas.CardSet
         * @static
         * @param {texas.ICardSet} message CardSet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CardSet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cards != null && message.cards.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.cards.length; ++i)
                    writer.int32(message.cards[i]);
                writer.ldelim();
            }
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.cardStrength != null && Object.hasOwnProperty.call(message, "cardStrength"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.cardStrength);
            return writer;
        };

        /**
         * Encodes the specified CardSet message, length delimited. Does not implicitly {@link texas.CardSet.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.CardSet
         * @static
         * @param {texas.ICardSet} message CardSet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CardSet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CardSet message from the specified reader or buffer.
         * @function decode
         * @memberof texas.CardSet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.CardSet} CardSet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CardSet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.CardSet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.cards && message.cards.length))
                        message.cards = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.cards.push(reader.int32());
                    } else
                        message.cards.push(reader.int32());
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    message.cardStrength = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CardSet message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.CardSet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.CardSet} CardSet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CardSet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CardSet message.
         * @function verify
         * @memberof texas.CardSet
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CardSet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cards != null && message.hasOwnProperty("cards")) {
                if (!Array.isArray(message.cards))
                    return "cards: array expected";
                for (let i = 0; i < message.cards.length; ++i)
                    if (!$util.isInteger(message.cards[i]))
                        return "cards: integer[] expected";
            }
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    break;
                }
            if (message.cardStrength != null && message.hasOwnProperty("cardStrength"))
                if (!$util.isInteger(message.cardStrength))
                    return "cardStrength: integer expected";
            return null;
        };

        /**
         * Creates a CardSet message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.CardSet
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.CardSet} CardSet
         */
        CardSet.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.CardSet)
                return object;
            let message = new $root.texas.CardSet();
            if (object.cards) {
                if (!Array.isArray(object.cards))
                    throw TypeError(".texas.CardSet.cards: array expected");
                message.cards = [];
                for (let i = 0; i < object.cards.length; ++i)
                    message.cards[i] = object.cards[i] | 0;
            }
            switch (object.type) {
            case "CT_NONE":
            case 0:
                message.type = 0;
                break;
            case "CT_NO_PAIR":
            case 1:
                message.type = 1;
                break;
            case "CT_PAIR":
            case 2:
                message.type = 2;
                break;
            case "CT_TWO_PAIR":
            case 3:
                message.type = 3;
                break;
            case "CT_TRIPS":
            case 4:
                message.type = 4;
                break;
            case "CT_STRAIGHT":
            case 5:
                message.type = 5;
                break;
            case "CT_FLUSH":
            case 6:
                message.type = 6;
                break;
            case "CT_FULL_HOUSE":
            case 7:
                message.type = 7;
                break;
            case "CT_QUADS":
            case 8:
                message.type = 8;
                break;
            case "CT_STRAIGHT_FLUSH":
            case 9:
                message.type = 9;
                break;
            case "CT_ROYAL_STRAIGHT_FLUSH":
            case 10:
                message.type = 10;
                break;
            }
            if (object.cardStrength != null)
                message.cardStrength = object.cardStrength | 0;
            return message;
        };

        /**
         * Creates a plain object from a CardSet message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.CardSet
         * @static
         * @param {texas.CardSet} message CardSet
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CardSet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.cards = [];
            if (options.defaults) {
                object.type = options.enums === String ? "CT_NONE" : 0;
                object.cardStrength = 0;
            }
            if (message.cards && message.cards.length) {
                object.cards = [];
                for (let j = 0; j < message.cards.length; ++j)
                    object.cards[j] = message.cards[j];
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.texas.CARD_TYPE[message.type] : message.type;
            if (message.cardStrength != null && message.hasOwnProperty("cardStrength"))
                object.cardStrength = message.cardStrength;
            return object;
        };

        /**
         * Converts this CardSet to JSON.
         * @function toJSON
         * @memberof texas.CardSet
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CardSet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CardSet;
    })();

    texas.GameBalanceCast = (function() {

        /**
         * Properties of a GameBalanceCast.
         * @memberof texas
         * @interface IGameBalanceCast
         * @property {Array.<texas.GameBalanceCast.IPlayer>|null} [players] GameBalanceCast players
         */

        /**
         * Constructs a new GameBalanceCast.
         * @memberof texas
         * @classdesc Represents a GameBalanceCast.
         * @implements IGameBalanceCast
         * @constructor
         * @param {texas.IGameBalanceCast=} [properties] Properties to set
         */
        function GameBalanceCast(properties) {
            this.players = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameBalanceCast players.
         * @member {Array.<texas.GameBalanceCast.IPlayer>} players
         * @memberof texas.GameBalanceCast
         * @instance
         */
        GameBalanceCast.prototype.players = $util.emptyArray;

        /**
         * Creates a new GameBalanceCast instance using the specified properties.
         * @function create
         * @memberof texas.GameBalanceCast
         * @static
         * @param {texas.IGameBalanceCast=} [properties] Properties to set
         * @returns {texas.GameBalanceCast} GameBalanceCast instance
         */
        GameBalanceCast.create = function create(properties) {
            return new GameBalanceCast(properties);
        };

        /**
         * Encodes the specified GameBalanceCast message. Does not implicitly {@link texas.GameBalanceCast.verify|verify} messages.
         * @function encode
         * @memberof texas.GameBalanceCast
         * @static
         * @param {texas.IGameBalanceCast} message GameBalanceCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameBalanceCast.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.players != null && message.players.length)
                for (let i = 0; i < message.players.length; ++i)
                    $root.texas.GameBalanceCast.Player.encode(message.players[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GameBalanceCast message, length delimited. Does not implicitly {@link texas.GameBalanceCast.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.GameBalanceCast
         * @static
         * @param {texas.IGameBalanceCast} message GameBalanceCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameBalanceCast.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameBalanceCast message from the specified reader or buffer.
         * @function decode
         * @memberof texas.GameBalanceCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.GameBalanceCast} GameBalanceCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameBalanceCast.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.GameBalanceCast();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.players && message.players.length))
                        message.players = [];
                    message.players.push($root.texas.GameBalanceCast.Player.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameBalanceCast message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.GameBalanceCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.GameBalanceCast} GameBalanceCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameBalanceCast.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameBalanceCast message.
         * @function verify
         * @memberof texas.GameBalanceCast
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameBalanceCast.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (let i = 0; i < message.players.length; ++i) {
                    let error = $root.texas.GameBalanceCast.Player.verify(message.players[i]);
                    if (error)
                        return "players." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GameBalanceCast message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.GameBalanceCast
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.GameBalanceCast} GameBalanceCast
         */
        GameBalanceCast.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.GameBalanceCast)
                return object;
            let message = new $root.texas.GameBalanceCast();
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".texas.GameBalanceCast.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i) {
                    if (typeof object.players[i] !== "object")
                        throw TypeError(".texas.GameBalanceCast.players: object expected");
                    message.players[i] = $root.texas.GameBalanceCast.Player.fromObject(object.players[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GameBalanceCast message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.GameBalanceCast
         * @static
         * @param {texas.GameBalanceCast} message GameBalanceCast
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameBalanceCast.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.players = [];
            if (message.players && message.players.length) {
                object.players = [];
                for (let j = 0; j < message.players.length; ++j)
                    object.players[j] = $root.texas.GameBalanceCast.Player.toObject(message.players[j], options);
            }
            return object;
        };

        /**
         * Converts this GameBalanceCast to JSON.
         * @function toJSON
         * @memberof texas.GameBalanceCast
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameBalanceCast.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        GameBalanceCast.Player = (function() {

            /**
             * Properties of a Player.
             * @memberof texas.GameBalanceCast
             * @interface IPlayer
             * @property {number|null} [seatIndex] Player seatIndex
             * @property {number|null} [balance] Player balance
             */

            /**
             * Constructs a new Player.
             * @memberof texas.GameBalanceCast
             * @classdesc Represents a Player.
             * @implements IPlayer
             * @constructor
             * @param {texas.GameBalanceCast.IPlayer=} [properties] Properties to set
             */
            function Player(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Player seatIndex.
             * @member {number} seatIndex
             * @memberof texas.GameBalanceCast.Player
             * @instance
             */
            Player.prototype.seatIndex = 0;

            /**
             * Player balance.
             * @member {number} balance
             * @memberof texas.GameBalanceCast.Player
             * @instance
             */
            Player.prototype.balance = 0;

            /**
             * Creates a new Player instance using the specified properties.
             * @function create
             * @memberof texas.GameBalanceCast.Player
             * @static
             * @param {texas.GameBalanceCast.IPlayer=} [properties] Properties to set
             * @returns {texas.GameBalanceCast.Player} Player instance
             */
            Player.create = function create(properties) {
                return new Player(properties);
            };

            /**
             * Encodes the specified Player message. Does not implicitly {@link texas.GameBalanceCast.Player.verify|verify} messages.
             * @function encode
             * @memberof texas.GameBalanceCast.Player
             * @static
             * @param {texas.GameBalanceCast.IPlayer} message Player message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Player.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seatIndex != null && Object.hasOwnProperty.call(message, "seatIndex"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seatIndex);
                if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.balance);
                return writer;
            };

            /**
             * Encodes the specified Player message, length delimited. Does not implicitly {@link texas.GameBalanceCast.Player.verify|verify} messages.
             * @function encodeDelimited
             * @memberof texas.GameBalanceCast.Player
             * @static
             * @param {texas.GameBalanceCast.IPlayer} message Player message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Player.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Player message from the specified reader or buffer.
             * @function decode
             * @memberof texas.GameBalanceCast.Player
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {texas.GameBalanceCast.Player} Player
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Player.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.GameBalanceCast.Player();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.seatIndex = reader.int32();
                        break;
                    case 2:
                        message.balance = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Player message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof texas.GameBalanceCast.Player
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {texas.GameBalanceCast.Player} Player
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Player.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Player message.
             * @function verify
             * @memberof texas.GameBalanceCast.Player
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Player.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seatIndex != null && message.hasOwnProperty("seatIndex"))
                    if (!$util.isInteger(message.seatIndex))
                        return "seatIndex: integer expected";
                if (message.balance != null && message.hasOwnProperty("balance"))
                    if (!$util.isInteger(message.balance))
                        return "balance: integer expected";
                return null;
            };

            /**
             * Creates a Player message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof texas.GameBalanceCast.Player
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {texas.GameBalanceCast.Player} Player
             */
            Player.fromObject = function fromObject(object) {
                if (object instanceof $root.texas.GameBalanceCast.Player)
                    return object;
                let message = new $root.texas.GameBalanceCast.Player();
                if (object.seatIndex != null)
                    message.seatIndex = object.seatIndex | 0;
                if (object.balance != null)
                    message.balance = object.balance | 0;
                return message;
            };

            /**
             * Creates a plain object from a Player message. Also converts values to other types if specified.
             * @function toObject
             * @memberof texas.GameBalanceCast.Player
             * @static
             * @param {texas.GameBalanceCast.Player} message Player
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Player.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.seatIndex = 0;
                    object.balance = 0;
                }
                if (message.seatIndex != null && message.hasOwnProperty("seatIndex"))
                    object.seatIndex = message.seatIndex;
                if (message.balance != null && message.hasOwnProperty("balance"))
                    object.balance = message.balance;
                return object;
            };

            /**
             * Converts this Player to JSON.
             * @function toJSON
             * @memberof texas.GameBalanceCast.Player
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Player.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Player;
        })();

        return GameBalanceCast;
    })();

    texas.AllTableState = (function() {

        /**
         * Properties of an AllTableState.
         * @memberof texas
         * @interface IAllTableState
         * @property {Array.<number>|null} [sharedCards] AllTableState sharedCards
         * @property {Array.<texas.IAllSeatState>|null} [seatStates] AllTableState seatStates
         */

        /**
         * Constructs a new AllTableState.
         * @memberof texas
         * @classdesc Represents an AllTableState.
         * @implements IAllTableState
         * @constructor
         * @param {texas.IAllTableState=} [properties] Properties to set
         */
        function AllTableState(properties) {
            this.sharedCards = [];
            this.seatStates = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AllTableState sharedCards.
         * @member {Array.<number>} sharedCards
         * @memberof texas.AllTableState
         * @instance
         */
        AllTableState.prototype.sharedCards = $util.emptyArray;

        /**
         * AllTableState seatStates.
         * @member {Array.<texas.IAllSeatState>} seatStates
         * @memberof texas.AllTableState
         * @instance
         */
        AllTableState.prototype.seatStates = $util.emptyArray;

        /**
         * Creates a new AllTableState instance using the specified properties.
         * @function create
         * @memberof texas.AllTableState
         * @static
         * @param {texas.IAllTableState=} [properties] Properties to set
         * @returns {texas.AllTableState} AllTableState instance
         */
        AllTableState.create = function create(properties) {
            return new AllTableState(properties);
        };

        /**
         * Encodes the specified AllTableState message. Does not implicitly {@link texas.AllTableState.verify|verify} messages.
         * @function encode
         * @memberof texas.AllTableState
         * @static
         * @param {texas.IAllTableState} message AllTableState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AllTableState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sharedCards != null && message.sharedCards.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.sharedCards.length; ++i)
                    writer.int32(message.sharedCards[i]);
                writer.ldelim();
            }
            if (message.seatStates != null && message.seatStates.length)
                for (let i = 0; i < message.seatStates.length; ++i)
                    $root.texas.AllSeatState.encode(message.seatStates[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AllTableState message, length delimited. Does not implicitly {@link texas.AllTableState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.AllTableState
         * @static
         * @param {texas.IAllTableState} message AllTableState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AllTableState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AllTableState message from the specified reader or buffer.
         * @function decode
         * @memberof texas.AllTableState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.AllTableState} AllTableState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AllTableState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.AllTableState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.sharedCards && message.sharedCards.length))
                        message.sharedCards = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.sharedCards.push(reader.int32());
                    } else
                        message.sharedCards.push(reader.int32());
                    break;
                case 2:
                    if (!(message.seatStates && message.seatStates.length))
                        message.seatStates = [];
                    message.seatStates.push($root.texas.AllSeatState.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AllTableState message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.AllTableState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.AllTableState} AllTableState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AllTableState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AllTableState message.
         * @function verify
         * @memberof texas.AllTableState
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AllTableState.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.sharedCards != null && message.hasOwnProperty("sharedCards")) {
                if (!Array.isArray(message.sharedCards))
                    return "sharedCards: array expected";
                for (let i = 0; i < message.sharedCards.length; ++i)
                    if (!$util.isInteger(message.sharedCards[i]))
                        return "sharedCards: integer[] expected";
            }
            if (message.seatStates != null && message.hasOwnProperty("seatStates")) {
                if (!Array.isArray(message.seatStates))
                    return "seatStates: array expected";
                for (let i = 0; i < message.seatStates.length; ++i) {
                    let error = $root.texas.AllSeatState.verify(message.seatStates[i]);
                    if (error)
                        return "seatStates." + error;
                }
            }
            return null;
        };

        /**
         * Creates an AllTableState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.AllTableState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.AllTableState} AllTableState
         */
        AllTableState.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.AllTableState)
                return object;
            let message = new $root.texas.AllTableState();
            if (object.sharedCards) {
                if (!Array.isArray(object.sharedCards))
                    throw TypeError(".texas.AllTableState.sharedCards: array expected");
                message.sharedCards = [];
                for (let i = 0; i < object.sharedCards.length; ++i)
                    message.sharedCards[i] = object.sharedCards[i] | 0;
            }
            if (object.seatStates) {
                if (!Array.isArray(object.seatStates))
                    throw TypeError(".texas.AllTableState.seatStates: array expected");
                message.seatStates = [];
                for (let i = 0; i < object.seatStates.length; ++i) {
                    if (typeof object.seatStates[i] !== "object")
                        throw TypeError(".texas.AllTableState.seatStates: object expected");
                    message.seatStates[i] = $root.texas.AllSeatState.fromObject(object.seatStates[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an AllTableState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.AllTableState
         * @static
         * @param {texas.AllTableState} message AllTableState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AllTableState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.sharedCards = [];
                object.seatStates = [];
            }
            if (message.sharedCards && message.sharedCards.length) {
                object.sharedCards = [];
                for (let j = 0; j < message.sharedCards.length; ++j)
                    object.sharedCards[j] = message.sharedCards[j];
            }
            if (message.seatStates && message.seatStates.length) {
                object.seatStates = [];
                for (let j = 0; j < message.seatStates.length; ++j)
                    object.seatStates[j] = $root.texas.AllSeatState.toObject(message.seatStates[j], options);
            }
            return object;
        };

        /**
         * Converts this AllTableState to JSON.
         * @function toJSON
         * @memberof texas.AllTableState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AllTableState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AllTableState;
    })();

    texas.AllSeatState = (function() {

        /**
         * Properties of an AllSeatState.
         * @memberof texas
         * @interface IAllSeatState
         * @property {number|null} [index] AllSeatState index
         * @property {number|null} [balance] AllSeatState balance
         * @property {texas.ICardSet|null} [cardSet] AllSeatState cardSet
         * @property {Array.<number>|null} [useCards] AllSeatState useCards
         */

        /**
         * Constructs a new AllSeatState.
         * @memberof texas
         * @classdesc Represents an AllSeatState.
         * @implements IAllSeatState
         * @constructor
         * @param {texas.IAllSeatState=} [properties] Properties to set
         */
        function AllSeatState(properties) {
            this.useCards = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AllSeatState index.
         * @member {number} index
         * @memberof texas.AllSeatState
         * @instance
         */
        AllSeatState.prototype.index = 0;

        /**
         * AllSeatState balance.
         * @member {number} balance
         * @memberof texas.AllSeatState
         * @instance
         */
        AllSeatState.prototype.balance = 0;

        /**
         * AllSeatState cardSet.
         * @member {texas.ICardSet|null|undefined} cardSet
         * @memberof texas.AllSeatState
         * @instance
         */
        AllSeatState.prototype.cardSet = null;

        /**
         * AllSeatState useCards.
         * @member {Array.<number>} useCards
         * @memberof texas.AllSeatState
         * @instance
         */
        AllSeatState.prototype.useCards = $util.emptyArray;

        /**
         * Creates a new AllSeatState instance using the specified properties.
         * @function create
         * @memberof texas.AllSeatState
         * @static
         * @param {texas.IAllSeatState=} [properties] Properties to set
         * @returns {texas.AllSeatState} AllSeatState instance
         */
        AllSeatState.create = function create(properties) {
            return new AllSeatState(properties);
        };

        /**
         * Encodes the specified AllSeatState message. Does not implicitly {@link texas.AllSeatState.verify|verify} messages.
         * @function encode
         * @memberof texas.AllSeatState
         * @static
         * @param {texas.IAllSeatState} message AllSeatState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AllSeatState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.index);
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.balance);
            if (message.cardSet != null && Object.hasOwnProperty.call(message, "cardSet"))
                $root.texas.CardSet.encode(message.cardSet, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.useCards != null && message.useCards.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (let i = 0; i < message.useCards.length; ++i)
                    writer.int32(message.useCards[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified AllSeatState message, length delimited. Does not implicitly {@link texas.AllSeatState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof texas.AllSeatState
         * @static
         * @param {texas.IAllSeatState} message AllSeatState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AllSeatState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AllSeatState message from the specified reader or buffer.
         * @function decode
         * @memberof texas.AllSeatState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {texas.AllSeatState} AllSeatState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AllSeatState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.texas.AllSeatState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.index = reader.int32();
                    break;
                case 2:
                    message.balance = reader.int32();
                    break;
                case 3:
                    message.cardSet = $root.texas.CardSet.decode(reader, reader.uint32());
                    break;
                case 4:
                    if (!(message.useCards && message.useCards.length))
                        message.useCards = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.useCards.push(reader.int32());
                    } else
                        message.useCards.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AllSeatState message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof texas.AllSeatState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {texas.AllSeatState} AllSeatState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AllSeatState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AllSeatState message.
         * @function verify
         * @memberof texas.AllSeatState
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AllSeatState.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.index != null && message.hasOwnProperty("index"))
                if (!$util.isInteger(message.index))
                    return "index: integer expected";
            if (message.balance != null && message.hasOwnProperty("balance"))
                if (!$util.isInteger(message.balance))
                    return "balance: integer expected";
            if (message.cardSet != null && message.hasOwnProperty("cardSet")) {
                let error = $root.texas.CardSet.verify(message.cardSet);
                if (error)
                    return "cardSet." + error;
            }
            if (message.useCards != null && message.hasOwnProperty("useCards")) {
                if (!Array.isArray(message.useCards))
                    return "useCards: array expected";
                for (let i = 0; i < message.useCards.length; ++i)
                    if (!$util.isInteger(message.useCards[i]))
                        return "useCards: integer[] expected";
            }
            return null;
        };

        /**
         * Creates an AllSeatState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof texas.AllSeatState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {texas.AllSeatState} AllSeatState
         */
        AllSeatState.fromObject = function fromObject(object) {
            if (object instanceof $root.texas.AllSeatState)
                return object;
            let message = new $root.texas.AllSeatState();
            if (object.index != null)
                message.index = object.index | 0;
            if (object.balance != null)
                message.balance = object.balance | 0;
            if (object.cardSet != null) {
                if (typeof object.cardSet !== "object")
                    throw TypeError(".texas.AllSeatState.cardSet: object expected");
                message.cardSet = $root.texas.CardSet.fromObject(object.cardSet);
            }
            if (object.useCards) {
                if (!Array.isArray(object.useCards))
                    throw TypeError(".texas.AllSeatState.useCards: array expected");
                message.useCards = [];
                for (let i = 0; i < object.useCards.length; ++i)
                    message.useCards[i] = object.useCards[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from an AllSeatState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof texas.AllSeatState
         * @static
         * @param {texas.AllSeatState} message AllSeatState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AllSeatState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.useCards = [];
            if (options.defaults) {
                object.index = 0;
                object.balance = 0;
                object.cardSet = null;
            }
            if (message.index != null && message.hasOwnProperty("index"))
                object.index = message.index;
            if (message.balance != null && message.hasOwnProperty("balance"))
                object.balance = message.balance;
            if (message.cardSet != null && message.hasOwnProperty("cardSet"))
                object.cardSet = $root.texas.CardSet.toObject(message.cardSet, options);
            if (message.useCards && message.useCards.length) {
                object.useCards = [];
                for (let j = 0; j < message.useCards.length; ++j)
                    object.useCards[j] = message.useCards[j];
            }
            return object;
        };

        /**
         * Converts this AllSeatState to JSON.
         * @function toJSON
         * @memberof texas.AllSeatState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AllSeatState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AllSeatState;
    })();

    return texas;
})();

export { $root as default };
