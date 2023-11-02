/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const carrom = $root.carrom = (() => {

    /**
     * Namespace carrom.
     * @exports carrom
     * @namespace
     */
    const carrom = {};

    /**
     * DEADLINE_TYPE enum.
     * @name carrom.DEADLINE_TYPE
     * @enum {number}
     * @property {number} DT_NONE=0 DT_NONE value
     * @property {number} START=1 START value
     * @property {number} OPERATION=2 OPERATION value
     * @property {number} END=3 END value
     */
    carrom.DEADLINE_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DT_NONE"] = 0;
        values[valuesById[1] = "START"] = 1;
        values[valuesById[2] = "OPERATION"] = 2;
        values[valuesById[3] = "END"] = 3;
        return values;
    })();

    carrom.TableStateEvent = (function() {

        /**
         * Properties of a TableStateEvent.
         * @memberof carrom
         * @interface ITableStateEvent
         * @property {string|null} [gameCode] TableStateEvent gameCode
         * @property {number|null} [winBet] TableStateEvent winBet
         * @property {number|null} [piecesType] TableStateEvent piecesType
         * @property {Array.<carrom.ISeatState>|null} [seatStates] TableStateEvent seatStates
         * @property {string|null} [params] TableStateEvent params
         */

        /**
         * Constructs a new TableStateEvent.
         * @memberof carrom
         * @classdesc Represents a TableStateEvent.
         * @implements ITableStateEvent
         * @constructor
         * @param {carrom.ITableStateEvent=} [properties] Properties to set
         */
        function TableStateEvent(properties) {
            this.seatStates = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TableStateEvent gameCode.
         * @member {string} gameCode
         * @memberof carrom.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.gameCode = "";

        /**
         * TableStateEvent winBet.
         * @member {number} winBet
         * @memberof carrom.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.winBet = 0;

        /**
         * TableStateEvent piecesType.
         * @member {number} piecesType
         * @memberof carrom.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.piecesType = 0;

        /**
         * TableStateEvent seatStates.
         * @member {Array.<carrom.ISeatState>} seatStates
         * @memberof carrom.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.seatStates = $util.emptyArray;

        /**
         * TableStateEvent params.
         * @member {string} params
         * @memberof carrom.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.params = "";

        /**
         * Creates a new TableStateEvent instance using the specified properties.
         * @function create
         * @memberof carrom.TableStateEvent
         * @static
         * @param {carrom.ITableStateEvent=} [properties] Properties to set
         * @returns {carrom.TableStateEvent} TableStateEvent instance
         */
        TableStateEvent.create = function create(properties) {
            return new TableStateEvent(properties);
        };

        /**
         * Encodes the specified TableStateEvent message. Does not implicitly {@link carrom.TableStateEvent.verify|verify} messages.
         * @function encode
         * @memberof carrom.TableStateEvent
         * @static
         * @param {carrom.ITableStateEvent} message TableStateEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableStateEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameCode != null && Object.hasOwnProperty.call(message, "gameCode"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameCode);
            if (message.winBet != null && Object.hasOwnProperty.call(message, "winBet"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.winBet);
            if (message.piecesType != null && Object.hasOwnProperty.call(message, "piecesType"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.piecesType);
            if (message.seatStates != null && message.seatStates.length)
                for (let i = 0; i < message.seatStates.length; ++i)
                    $root.carrom.SeatState.encode(message.seatStates[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.params != null && Object.hasOwnProperty.call(message, "params"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.params);
            return writer;
        };

        /**
         * Encodes the specified TableStateEvent message, length delimited. Does not implicitly {@link carrom.TableStateEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof carrom.TableStateEvent
         * @static
         * @param {carrom.ITableStateEvent} message TableStateEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableStateEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TableStateEvent message from the specified reader or buffer.
         * @function decode
         * @memberof carrom.TableStateEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {carrom.TableStateEvent} TableStateEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableStateEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.carrom.TableStateEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameCode = reader.string();
                    break;
                case 2:
                    message.winBet = reader.int32();
                    break;
                case 3:
                    message.piecesType = reader.int32();
                    break;
                case 4:
                    if (!(message.seatStates && message.seatStates.length))
                        message.seatStates = [];
                    message.seatStates.push($root.carrom.SeatState.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.params = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TableStateEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof carrom.TableStateEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {carrom.TableStateEvent} TableStateEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableStateEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TableStateEvent message.
         * @function verify
         * @memberof carrom.TableStateEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TableStateEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                if (!$util.isString(message.gameCode))
                    return "gameCode: string expected";
            if (message.winBet != null && message.hasOwnProperty("winBet"))
                if (!$util.isInteger(message.winBet))
                    return "winBet: integer expected";
            if (message.piecesType != null && message.hasOwnProperty("piecesType"))
                if (!$util.isInteger(message.piecesType))
                    return "piecesType: integer expected";
            if (message.seatStates != null && message.hasOwnProperty("seatStates")) {
                if (!Array.isArray(message.seatStates))
                    return "seatStates: array expected";
                for (let i = 0; i < message.seatStates.length; ++i) {
                    let error = $root.carrom.SeatState.verify(message.seatStates[i]);
                    if (error)
                        return "seatStates." + error;
                }
            }
            if (message.params != null && message.hasOwnProperty("params"))
                if (!$util.isString(message.params))
                    return "params: string expected";
            return null;
        };

        /**
         * Creates a TableStateEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof carrom.TableStateEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {carrom.TableStateEvent} TableStateEvent
         */
        TableStateEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.carrom.TableStateEvent)
                return object;
            let message = new $root.carrom.TableStateEvent();
            if (object.gameCode != null)
                message.gameCode = String(object.gameCode);
            if (object.winBet != null)
                message.winBet = object.winBet | 0;
            if (object.piecesType != null)
                message.piecesType = object.piecesType | 0;
            if (object.seatStates) {
                if (!Array.isArray(object.seatStates))
                    throw TypeError(".carrom.TableStateEvent.seatStates: array expected");
                message.seatStates = [];
                for (let i = 0; i < object.seatStates.length; ++i) {
                    if (typeof object.seatStates[i] !== "object")
                        throw TypeError(".carrom.TableStateEvent.seatStates: object expected");
                    message.seatStates[i] = $root.carrom.SeatState.fromObject(object.seatStates[i]);
                }
            }
            if (object.params != null)
                message.params = String(object.params);
            return message;
        };

        /**
         * Creates a plain object from a TableStateEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof carrom.TableStateEvent
         * @static
         * @param {carrom.TableStateEvent} message TableStateEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TableStateEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.seatStates = [];
            if (options.defaults) {
                object.gameCode = "";
                object.winBet = 0;
                object.piecesType = 0;
                object.params = "";
            }
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                object.gameCode = message.gameCode;
            if (message.winBet != null && message.hasOwnProperty("winBet"))
                object.winBet = message.winBet;
            if (message.piecesType != null && message.hasOwnProperty("piecesType"))
                object.piecesType = message.piecesType;
            if (message.seatStates && message.seatStates.length) {
                object.seatStates = [];
                for (let j = 0; j < message.seatStates.length; ++j)
                    object.seatStates[j] = $root.carrom.SeatState.toObject(message.seatStates[j], options);
            }
            if (message.params != null && message.hasOwnProperty("params"))
                object.params = message.params;
            return object;
        };

        /**
         * Converts this TableStateEvent to JSON.
         * @function toJSON
         * @memberof carrom.TableStateEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TableStateEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TableStateEvent;
    })();

    carrom.SeatState = (function() {

        /**
         * Properties of a SeatState.
         * @memberof carrom
         * @interface ISeatState
         * @property {number|null} [seat] SeatState seat
         * @property {number|null} [timeoutTimes] SeatState timeoutTimes
         * @property {number|null} [score] SeatState score
         * @property {number|null} [red] SeatState red
         * @property {number|null} [white] SeatState white
         * @property {number|null} [black] SeatState black
         * @property {number|null} [strikeNums] SeatState strikeNums
         * @property {number|null} [foulTimes] SeatState foulTimes
         */

        /**
         * Constructs a new SeatState.
         * @memberof carrom
         * @classdesc Represents a SeatState.
         * @implements ISeatState
         * @constructor
         * @param {carrom.ISeatState=} [properties] Properties to set
         */
        function SeatState(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SeatState seat.
         * @member {number} seat
         * @memberof carrom.SeatState
         * @instance
         */
        SeatState.prototype.seat = 0;

        /**
         * SeatState timeoutTimes.
         * @member {number} timeoutTimes
         * @memberof carrom.SeatState
         * @instance
         */
        SeatState.prototype.timeoutTimes = 0;

        /**
         * SeatState score.
         * @member {number} score
         * @memberof carrom.SeatState
         * @instance
         */
        SeatState.prototype.score = 0;

        /**
         * SeatState red.
         * @member {number} red
         * @memberof carrom.SeatState
         * @instance
         */
        SeatState.prototype.red = 0;

        /**
         * SeatState white.
         * @member {number} white
         * @memberof carrom.SeatState
         * @instance
         */
        SeatState.prototype.white = 0;

        /**
         * SeatState black.
         * @member {number} black
         * @memberof carrom.SeatState
         * @instance
         */
        SeatState.prototype.black = 0;

        /**
         * SeatState strikeNums.
         * @member {number} strikeNums
         * @memberof carrom.SeatState
         * @instance
         */
        SeatState.prototype.strikeNums = 0;

        /**
         * SeatState foulTimes.
         * @member {number} foulTimes
         * @memberof carrom.SeatState
         * @instance
         */
        SeatState.prototype.foulTimes = 0;

        /**
         * Creates a new SeatState instance using the specified properties.
         * @function create
         * @memberof carrom.SeatState
         * @static
         * @param {carrom.ISeatState=} [properties] Properties to set
         * @returns {carrom.SeatState} SeatState instance
         */
        SeatState.create = function create(properties) {
            return new SeatState(properties);
        };

        /**
         * Encodes the specified SeatState message. Does not implicitly {@link carrom.SeatState.verify|verify} messages.
         * @function encode
         * @memberof carrom.SeatState
         * @static
         * @param {carrom.ISeatState} message SeatState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            if (message.timeoutTimes != null && Object.hasOwnProperty.call(message, "timeoutTimes"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.timeoutTimes);
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.score);
            if (message.red != null && Object.hasOwnProperty.call(message, "red"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.red);
            if (message.white != null && Object.hasOwnProperty.call(message, "white"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.white);
            if (message.black != null && Object.hasOwnProperty.call(message, "black"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.black);
            if (message.strikeNums != null && Object.hasOwnProperty.call(message, "strikeNums"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.strikeNums);
            if (message.foulTimes != null && Object.hasOwnProperty.call(message, "foulTimes"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.foulTimes);
            return writer;
        };

        /**
         * Encodes the specified SeatState message, length delimited. Does not implicitly {@link carrom.SeatState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof carrom.SeatState
         * @static
         * @param {carrom.ISeatState} message SeatState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeatState message from the specified reader or buffer.
         * @function decode
         * @memberof carrom.SeatState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {carrom.SeatState} SeatState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.carrom.SeatState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat = reader.int32();
                    break;
                case 2:
                    message.timeoutTimes = reader.int32();
                    break;
                case 3:
                    message.score = reader.int32();
                    break;
                case 4:
                    message.red = reader.int32();
                    break;
                case 5:
                    message.white = reader.int32();
                    break;
                case 6:
                    message.black = reader.int32();
                    break;
                case 7:
                    message.strikeNums = reader.int32();
                    break;
                case 8:
                    message.foulTimes = reader.int32();
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
         * @memberof carrom.SeatState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {carrom.SeatState} SeatState
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
         * @memberof carrom.SeatState
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SeatState.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            if (message.timeoutTimes != null && message.hasOwnProperty("timeoutTimes"))
                if (!$util.isInteger(message.timeoutTimes))
                    return "timeoutTimes: integer expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (!$util.isInteger(message.score))
                    return "score: integer expected";
            if (message.red != null && message.hasOwnProperty("red"))
                if (!$util.isInteger(message.red))
                    return "red: integer expected";
            if (message.white != null && message.hasOwnProperty("white"))
                if (!$util.isInteger(message.white))
                    return "white: integer expected";
            if (message.black != null && message.hasOwnProperty("black"))
                if (!$util.isInteger(message.black))
                    return "black: integer expected";
            if (message.strikeNums != null && message.hasOwnProperty("strikeNums"))
                if (!$util.isInteger(message.strikeNums))
                    return "strikeNums: integer expected";
            if (message.foulTimes != null && message.hasOwnProperty("foulTimes"))
                if (!$util.isInteger(message.foulTimes))
                    return "foulTimes: integer expected";
            return null;
        };

        /**
         * Creates a SeatState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof carrom.SeatState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {carrom.SeatState} SeatState
         */
        SeatState.fromObject = function fromObject(object) {
            if (object instanceof $root.carrom.SeatState)
                return object;
            let message = new $root.carrom.SeatState();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.timeoutTimes != null)
                message.timeoutTimes = object.timeoutTimes | 0;
            if (object.score != null)
                message.score = object.score | 0;
            if (object.red != null)
                message.red = object.red | 0;
            if (object.white != null)
                message.white = object.white | 0;
            if (object.black != null)
                message.black = object.black | 0;
            if (object.strikeNums != null)
                message.strikeNums = object.strikeNums | 0;
            if (object.foulTimes != null)
                message.foulTimes = object.foulTimes | 0;
            return message;
        };

        /**
         * Creates a plain object from a SeatState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof carrom.SeatState
         * @static
         * @param {carrom.SeatState} message SeatState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeatState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seat = 0;
                object.timeoutTimes = 0;
                object.score = 0;
                object.red = 0;
                object.white = 0;
                object.black = 0;
                object.strikeNums = 0;
                object.foulTimes = 0;
            }
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.timeoutTimes != null && message.hasOwnProperty("timeoutTimes"))
                object.timeoutTimes = message.timeoutTimes;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = message.score;
            if (message.red != null && message.hasOwnProperty("red"))
                object.red = message.red;
            if (message.white != null && message.hasOwnProperty("white"))
                object.white = message.white;
            if (message.black != null && message.hasOwnProperty("black"))
                object.black = message.black;
            if (message.strikeNums != null && message.hasOwnProperty("strikeNums"))
                object.strikeNums = message.strikeNums;
            if (message.foulTimes != null && message.hasOwnProperty("foulTimes"))
                object.foulTimes = message.foulTimes;
            return object;
        };

        /**
         * Converts this SeatState to JSON.
         * @function toJSON
         * @memberof carrom.SeatState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeatState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeatState;
    })();

    carrom.StrikeResultReq = (function() {

        /**
         * Properties of a StrikeResultReq.
         * @memberof carrom
         * @interface IStrikeResultReq
         * @property {number|null} [winnerSeat] StrikeResultReq winnerSeat
         * @property {Array.<carrom.ISeatState>|null} [seatStates] StrikeResultReq seatStates
         */

        /**
         * Constructs a new StrikeResultReq.
         * @memberof carrom
         * @classdesc Represents a StrikeResultReq.
         * @implements IStrikeResultReq
         * @constructor
         * @param {carrom.IStrikeResultReq=} [properties] Properties to set
         */
        function StrikeResultReq(properties) {
            this.seatStates = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StrikeResultReq winnerSeat.
         * @member {number} winnerSeat
         * @memberof carrom.StrikeResultReq
         * @instance
         */
        StrikeResultReq.prototype.winnerSeat = 0;

        /**
         * StrikeResultReq seatStates.
         * @member {Array.<carrom.ISeatState>} seatStates
         * @memberof carrom.StrikeResultReq
         * @instance
         */
        StrikeResultReq.prototype.seatStates = $util.emptyArray;

        /**
         * Creates a new StrikeResultReq instance using the specified properties.
         * @function create
         * @memberof carrom.StrikeResultReq
         * @static
         * @param {carrom.IStrikeResultReq=} [properties] Properties to set
         * @returns {carrom.StrikeResultReq} StrikeResultReq instance
         */
        StrikeResultReq.create = function create(properties) {
            return new StrikeResultReq(properties);
        };

        /**
         * Encodes the specified StrikeResultReq message. Does not implicitly {@link carrom.StrikeResultReq.verify|verify} messages.
         * @function encode
         * @memberof carrom.StrikeResultReq
         * @static
         * @param {carrom.IStrikeResultReq} message StrikeResultReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StrikeResultReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.winnerSeat != null && Object.hasOwnProperty.call(message, "winnerSeat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.winnerSeat);
            if (message.seatStates != null && message.seatStates.length)
                for (let i = 0; i < message.seatStates.length; ++i)
                    $root.carrom.SeatState.encode(message.seatStates[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified StrikeResultReq message, length delimited. Does not implicitly {@link carrom.StrikeResultReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof carrom.StrikeResultReq
         * @static
         * @param {carrom.IStrikeResultReq} message StrikeResultReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StrikeResultReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StrikeResultReq message from the specified reader or buffer.
         * @function decode
         * @memberof carrom.StrikeResultReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {carrom.StrikeResultReq} StrikeResultReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StrikeResultReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.carrom.StrikeResultReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.winnerSeat = reader.int32();
                    break;
                case 2:
                    if (!(message.seatStates && message.seatStates.length))
                        message.seatStates = [];
                    message.seatStates.push($root.carrom.SeatState.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StrikeResultReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof carrom.StrikeResultReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {carrom.StrikeResultReq} StrikeResultReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StrikeResultReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StrikeResultReq message.
         * @function verify
         * @memberof carrom.StrikeResultReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StrikeResultReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.winnerSeat != null && message.hasOwnProperty("winnerSeat"))
                if (!$util.isInteger(message.winnerSeat))
                    return "winnerSeat: integer expected";
            if (message.seatStates != null && message.hasOwnProperty("seatStates")) {
                if (!Array.isArray(message.seatStates))
                    return "seatStates: array expected";
                for (let i = 0; i < message.seatStates.length; ++i) {
                    let error = $root.carrom.SeatState.verify(message.seatStates[i]);
                    if (error)
                        return "seatStates." + error;
                }
            }
            return null;
        };

        /**
         * Creates a StrikeResultReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof carrom.StrikeResultReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {carrom.StrikeResultReq} StrikeResultReq
         */
        StrikeResultReq.fromObject = function fromObject(object) {
            if (object instanceof $root.carrom.StrikeResultReq)
                return object;
            let message = new $root.carrom.StrikeResultReq();
            if (object.winnerSeat != null)
                message.winnerSeat = object.winnerSeat | 0;
            if (object.seatStates) {
                if (!Array.isArray(object.seatStates))
                    throw TypeError(".carrom.StrikeResultReq.seatStates: array expected");
                message.seatStates = [];
                for (let i = 0; i < object.seatStates.length; ++i) {
                    if (typeof object.seatStates[i] !== "object")
                        throw TypeError(".carrom.StrikeResultReq.seatStates: object expected");
                    message.seatStates[i] = $root.carrom.SeatState.fromObject(object.seatStates[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a StrikeResultReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof carrom.StrikeResultReq
         * @static
         * @param {carrom.StrikeResultReq} message StrikeResultReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StrikeResultReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.seatStates = [];
            if (options.defaults)
                object.winnerSeat = 0;
            if (message.winnerSeat != null && message.hasOwnProperty("winnerSeat"))
                object.winnerSeat = message.winnerSeat;
            if (message.seatStates && message.seatStates.length) {
                object.seatStates = [];
                for (let j = 0; j < message.seatStates.length; ++j)
                    object.seatStates[j] = $root.carrom.SeatState.toObject(message.seatStates[j], options);
            }
            return object;
        };

        /**
         * Converts this StrikeResultReq to JSON.
         * @function toJSON
         * @memberof carrom.StrikeResultReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StrikeResultReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StrikeResultReq;
    })();

    carrom.ResultReq = (function() {

        /**
         * Properties of a ResultReq.
         * @memberof carrom
         * @interface IResultReq
         * @property {string|null} [gameCode] ResultReq gameCode
         * @property {number|null} [winnerSeat] ResultReq winnerSeat
         * @property {Array.<carrom.ISeatState>|null} [seatStates] ResultReq seatStates
         * @property {number|null} [rounds] ResultReq rounds
         */

        /**
         * Constructs a new ResultReq.
         * @memberof carrom
         * @classdesc Represents a ResultReq.
         * @implements IResultReq
         * @constructor
         * @param {carrom.IResultReq=} [properties] Properties to set
         */
        function ResultReq(properties) {
            this.seatStates = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ResultReq gameCode.
         * @member {string} gameCode
         * @memberof carrom.ResultReq
         * @instance
         */
        ResultReq.prototype.gameCode = "";

        /**
         * ResultReq winnerSeat.
         * @member {number} winnerSeat
         * @memberof carrom.ResultReq
         * @instance
         */
        ResultReq.prototype.winnerSeat = 0;

        /**
         * ResultReq seatStates.
         * @member {Array.<carrom.ISeatState>} seatStates
         * @memberof carrom.ResultReq
         * @instance
         */
        ResultReq.prototype.seatStates = $util.emptyArray;

        /**
         * ResultReq rounds.
         * @member {number} rounds
         * @memberof carrom.ResultReq
         * @instance
         */
        ResultReq.prototype.rounds = 0;

        /**
         * Creates a new ResultReq instance using the specified properties.
         * @function create
         * @memberof carrom.ResultReq
         * @static
         * @param {carrom.IResultReq=} [properties] Properties to set
         * @returns {carrom.ResultReq} ResultReq instance
         */
        ResultReq.create = function create(properties) {
            return new ResultReq(properties);
        };

        /**
         * Encodes the specified ResultReq message. Does not implicitly {@link carrom.ResultReq.verify|verify} messages.
         * @function encode
         * @memberof carrom.ResultReq
         * @static
         * @param {carrom.IResultReq} message ResultReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResultReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameCode != null && Object.hasOwnProperty.call(message, "gameCode"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameCode);
            if (message.winnerSeat != null && Object.hasOwnProperty.call(message, "winnerSeat"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.winnerSeat);
            if (message.seatStates != null && message.seatStates.length)
                for (let i = 0; i < message.seatStates.length; ++i)
                    $root.carrom.SeatState.encode(message.seatStates[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.rounds != null && Object.hasOwnProperty.call(message, "rounds"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.rounds);
            return writer;
        };

        /**
         * Encodes the specified ResultReq message, length delimited. Does not implicitly {@link carrom.ResultReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof carrom.ResultReq
         * @static
         * @param {carrom.IResultReq} message ResultReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResultReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ResultReq message from the specified reader or buffer.
         * @function decode
         * @memberof carrom.ResultReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {carrom.ResultReq} ResultReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResultReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.carrom.ResultReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameCode = reader.string();
                    break;
                case 2:
                    message.winnerSeat = reader.int32();
                    break;
                case 3:
                    if (!(message.seatStates && message.seatStates.length))
                        message.seatStates = [];
                    message.seatStates.push($root.carrom.SeatState.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.rounds = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ResultReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof carrom.ResultReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {carrom.ResultReq} ResultReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResultReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ResultReq message.
         * @function verify
         * @memberof carrom.ResultReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ResultReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                if (!$util.isString(message.gameCode))
                    return "gameCode: string expected";
            if (message.winnerSeat != null && message.hasOwnProperty("winnerSeat"))
                if (!$util.isInteger(message.winnerSeat))
                    return "winnerSeat: integer expected";
            if (message.seatStates != null && message.hasOwnProperty("seatStates")) {
                if (!Array.isArray(message.seatStates))
                    return "seatStates: array expected";
                for (let i = 0; i < message.seatStates.length; ++i) {
                    let error = $root.carrom.SeatState.verify(message.seatStates[i]);
                    if (error)
                        return "seatStates." + error;
                }
            }
            if (message.rounds != null && message.hasOwnProperty("rounds"))
                if (!$util.isInteger(message.rounds))
                    return "rounds: integer expected";
            return null;
        };

        /**
         * Creates a ResultReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof carrom.ResultReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {carrom.ResultReq} ResultReq
         */
        ResultReq.fromObject = function fromObject(object) {
            if (object instanceof $root.carrom.ResultReq)
                return object;
            let message = new $root.carrom.ResultReq();
            if (object.gameCode != null)
                message.gameCode = String(object.gameCode);
            if (object.winnerSeat != null)
                message.winnerSeat = object.winnerSeat | 0;
            if (object.seatStates) {
                if (!Array.isArray(object.seatStates))
                    throw TypeError(".carrom.ResultReq.seatStates: array expected");
                message.seatStates = [];
                for (let i = 0; i < object.seatStates.length; ++i) {
                    if (typeof object.seatStates[i] !== "object")
                        throw TypeError(".carrom.ResultReq.seatStates: object expected");
                    message.seatStates[i] = $root.carrom.SeatState.fromObject(object.seatStates[i]);
                }
            }
            if (object.rounds != null)
                message.rounds = object.rounds | 0;
            return message;
        };

        /**
         * Creates a plain object from a ResultReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof carrom.ResultReq
         * @static
         * @param {carrom.ResultReq} message ResultReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ResultReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.seatStates = [];
            if (options.defaults) {
                object.gameCode = "";
                object.winnerSeat = 0;
                object.rounds = 0;
            }
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                object.gameCode = message.gameCode;
            if (message.winnerSeat != null && message.hasOwnProperty("winnerSeat"))
                object.winnerSeat = message.winnerSeat;
            if (message.seatStates && message.seatStates.length) {
                object.seatStates = [];
                for (let j = 0; j < message.seatStates.length; ++j)
                    object.seatStates[j] = $root.carrom.SeatState.toObject(message.seatStates[j], options);
            }
            if (message.rounds != null && message.hasOwnProperty("rounds"))
                object.rounds = message.rounds;
            return object;
        };

        /**
         * Converts this ResultReq to JSON.
         * @function toJSON
         * @memberof carrom.ResultReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ResultReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ResultReq;
    })();

    carrom.HitReq = (function() {

        /**
         * Properties of a HitReq.
         * @memberof carrom
         * @interface IHitReq
         * @property {number|null} [seat] HitReq seat
         * @property {number|null} [roundSeat] HitReq roundSeat
         */

        /**
         * Constructs a new HitReq.
         * @memberof carrom
         * @classdesc Represents a HitReq.
         * @implements IHitReq
         * @constructor
         * @param {carrom.IHitReq=} [properties] Properties to set
         */
        function HitReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HitReq seat.
         * @member {number} seat
         * @memberof carrom.HitReq
         * @instance
         */
        HitReq.prototype.seat = 0;

        /**
         * HitReq roundSeat.
         * @member {number} roundSeat
         * @memberof carrom.HitReq
         * @instance
         */
        HitReq.prototype.roundSeat = 0;

        /**
         * Creates a new HitReq instance using the specified properties.
         * @function create
         * @memberof carrom.HitReq
         * @static
         * @param {carrom.IHitReq=} [properties] Properties to set
         * @returns {carrom.HitReq} HitReq instance
         */
        HitReq.create = function create(properties) {
            return new HitReq(properties);
        };

        /**
         * Encodes the specified HitReq message. Does not implicitly {@link carrom.HitReq.verify|verify} messages.
         * @function encode
         * @memberof carrom.HitReq
         * @static
         * @param {carrom.IHitReq} message HitReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HitReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            if (message.roundSeat != null && Object.hasOwnProperty.call(message, "roundSeat"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.roundSeat);
            return writer;
        };

        /**
         * Encodes the specified HitReq message, length delimited. Does not implicitly {@link carrom.HitReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof carrom.HitReq
         * @static
         * @param {carrom.IHitReq} message HitReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HitReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HitReq message from the specified reader or buffer.
         * @function decode
         * @memberof carrom.HitReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {carrom.HitReq} HitReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HitReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.carrom.HitReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat = reader.int32();
                    break;
                case 2:
                    message.roundSeat = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HitReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof carrom.HitReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {carrom.HitReq} HitReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HitReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HitReq message.
         * @function verify
         * @memberof carrom.HitReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HitReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            if (message.roundSeat != null && message.hasOwnProperty("roundSeat"))
                if (!$util.isInteger(message.roundSeat))
                    return "roundSeat: integer expected";
            return null;
        };

        /**
         * Creates a HitReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof carrom.HitReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {carrom.HitReq} HitReq
         */
        HitReq.fromObject = function fromObject(object) {
            if (object instanceof $root.carrom.HitReq)
                return object;
            let message = new $root.carrom.HitReq();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.roundSeat != null)
                message.roundSeat = object.roundSeat | 0;
            return message;
        };

        /**
         * Creates a plain object from a HitReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof carrom.HitReq
         * @static
         * @param {carrom.HitReq} message HitReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HitReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seat = 0;
                object.roundSeat = 0;
            }
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.roundSeat != null && message.hasOwnProperty("roundSeat"))
                object.roundSeat = message.roundSeat;
            return object;
        };

        /**
         * Converts this HitReq to JSON.
         * @function toJSON
         * @memberof carrom.HitReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HitReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HitReq;
    })();

    carrom.SyncGameDataReq = (function() {

        /**
         * Properties of a SyncGameDataReq.
         * @memberof carrom
         * @interface ISyncGameDataReq
         * @property {string|null} [gameCode] SyncGameDataReq gameCode
         * @property {Array.<carrom.ISeatState>|null} [seatStates] SyncGameDataReq seatStates
         * @property {number|null} [rounds] SyncGameDataReq rounds
         * @property {number|null} [seat] SyncGameDataReq seat
         */

        /**
         * Constructs a new SyncGameDataReq.
         * @memberof carrom
         * @classdesc Represents a SyncGameDataReq.
         * @implements ISyncGameDataReq
         * @constructor
         * @param {carrom.ISyncGameDataReq=} [properties] Properties to set
         */
        function SyncGameDataReq(properties) {
            this.seatStates = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SyncGameDataReq gameCode.
         * @member {string} gameCode
         * @memberof carrom.SyncGameDataReq
         * @instance
         */
        SyncGameDataReq.prototype.gameCode = "";

        /**
         * SyncGameDataReq seatStates.
         * @member {Array.<carrom.ISeatState>} seatStates
         * @memberof carrom.SyncGameDataReq
         * @instance
         */
        SyncGameDataReq.prototype.seatStates = $util.emptyArray;

        /**
         * SyncGameDataReq rounds.
         * @member {number} rounds
         * @memberof carrom.SyncGameDataReq
         * @instance
         */
        SyncGameDataReq.prototype.rounds = 0;

        /**
         * SyncGameDataReq seat.
         * @member {number} seat
         * @memberof carrom.SyncGameDataReq
         * @instance
         */
        SyncGameDataReq.prototype.seat = 0;

        /**
         * Creates a new SyncGameDataReq instance using the specified properties.
         * @function create
         * @memberof carrom.SyncGameDataReq
         * @static
         * @param {carrom.ISyncGameDataReq=} [properties] Properties to set
         * @returns {carrom.SyncGameDataReq} SyncGameDataReq instance
         */
        SyncGameDataReq.create = function create(properties) {
            return new SyncGameDataReq(properties);
        };

        /**
         * Encodes the specified SyncGameDataReq message. Does not implicitly {@link carrom.SyncGameDataReq.verify|verify} messages.
         * @function encode
         * @memberof carrom.SyncGameDataReq
         * @static
         * @param {carrom.ISyncGameDataReq} message SyncGameDataReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncGameDataReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameCode != null && Object.hasOwnProperty.call(message, "gameCode"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameCode);
            if (message.seatStates != null && message.seatStates.length)
                for (let i = 0; i < message.seatStates.length; ++i)
                    $root.carrom.SeatState.encode(message.seatStates[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.rounds != null && Object.hasOwnProperty.call(message, "rounds"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.rounds);
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.seat);
            return writer;
        };

        /**
         * Encodes the specified SyncGameDataReq message, length delimited. Does not implicitly {@link carrom.SyncGameDataReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof carrom.SyncGameDataReq
         * @static
         * @param {carrom.ISyncGameDataReq} message SyncGameDataReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncGameDataReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SyncGameDataReq message from the specified reader or buffer.
         * @function decode
         * @memberof carrom.SyncGameDataReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {carrom.SyncGameDataReq} SyncGameDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncGameDataReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.carrom.SyncGameDataReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameCode = reader.string();
                    break;
                case 2:
                    if (!(message.seatStates && message.seatStates.length))
                        message.seatStates = [];
                    message.seatStates.push($root.carrom.SeatState.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.rounds = reader.int32();
                    break;
                case 4:
                    message.seat = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SyncGameDataReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof carrom.SyncGameDataReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {carrom.SyncGameDataReq} SyncGameDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncGameDataReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SyncGameDataReq message.
         * @function verify
         * @memberof carrom.SyncGameDataReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SyncGameDataReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                if (!$util.isString(message.gameCode))
                    return "gameCode: string expected";
            if (message.seatStates != null && message.hasOwnProperty("seatStates")) {
                if (!Array.isArray(message.seatStates))
                    return "seatStates: array expected";
                for (let i = 0; i < message.seatStates.length; ++i) {
                    let error = $root.carrom.SeatState.verify(message.seatStates[i]);
                    if (error)
                        return "seatStates." + error;
                }
            }
            if (message.rounds != null && message.hasOwnProperty("rounds"))
                if (!$util.isInteger(message.rounds))
                    return "rounds: integer expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            return null;
        };

        /**
         * Creates a SyncGameDataReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof carrom.SyncGameDataReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {carrom.SyncGameDataReq} SyncGameDataReq
         */
        SyncGameDataReq.fromObject = function fromObject(object) {
            if (object instanceof $root.carrom.SyncGameDataReq)
                return object;
            let message = new $root.carrom.SyncGameDataReq();
            if (object.gameCode != null)
                message.gameCode = String(object.gameCode);
            if (object.seatStates) {
                if (!Array.isArray(object.seatStates))
                    throw TypeError(".carrom.SyncGameDataReq.seatStates: array expected");
                message.seatStates = [];
                for (let i = 0; i < object.seatStates.length; ++i) {
                    if (typeof object.seatStates[i] !== "object")
                        throw TypeError(".carrom.SyncGameDataReq.seatStates: object expected");
                    message.seatStates[i] = $root.carrom.SeatState.fromObject(object.seatStates[i]);
                }
            }
            if (object.rounds != null)
                message.rounds = object.rounds | 0;
            if (object.seat != null)
                message.seat = object.seat | 0;
            return message;
        };

        /**
         * Creates a plain object from a SyncGameDataReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof carrom.SyncGameDataReq
         * @static
         * @param {carrom.SyncGameDataReq} message SyncGameDataReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SyncGameDataReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.seatStates = [];
            if (options.defaults) {
                object.gameCode = "";
                object.rounds = 0;
                object.seat = 0;
            }
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                object.gameCode = message.gameCode;
            if (message.seatStates && message.seatStates.length) {
                object.seatStates = [];
                for (let j = 0; j < message.seatStates.length; ++j)
                    object.seatStates[j] = $root.carrom.SeatState.toObject(message.seatStates[j], options);
            }
            if (message.rounds != null && message.hasOwnProperty("rounds"))
                object.rounds = message.rounds;
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            return object;
        };

        /**
         * Converts this SyncGameDataReq to JSON.
         * @function toJSON
         * @memberof carrom.SyncGameDataReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SyncGameDataReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SyncGameDataReq;
    })();

    carrom.GameEndEvent = (function() {

        /**
         * Properties of a GameEndEvent.
         * @memberof carrom
         * @interface IGameEndEvent
         * @property {number|null} [winBet] GameEndEvent winBet
         * @property {number|null} [winnerSeat] GameEndEvent winnerSeat
         */

        /**
         * Constructs a new GameEndEvent.
         * @memberof carrom
         * @classdesc Represents a GameEndEvent.
         * @implements IGameEndEvent
         * @constructor
         * @param {carrom.IGameEndEvent=} [properties] Properties to set
         */
        function GameEndEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameEndEvent winBet.
         * @member {number} winBet
         * @memberof carrom.GameEndEvent
         * @instance
         */
        GameEndEvent.prototype.winBet = 0;

        /**
         * GameEndEvent winnerSeat.
         * @member {number} winnerSeat
         * @memberof carrom.GameEndEvent
         * @instance
         */
        GameEndEvent.prototype.winnerSeat = 0;

        /**
         * Creates a new GameEndEvent instance using the specified properties.
         * @function create
         * @memberof carrom.GameEndEvent
         * @static
         * @param {carrom.IGameEndEvent=} [properties] Properties to set
         * @returns {carrom.GameEndEvent} GameEndEvent instance
         */
        GameEndEvent.create = function create(properties) {
            return new GameEndEvent(properties);
        };

        /**
         * Encodes the specified GameEndEvent message. Does not implicitly {@link carrom.GameEndEvent.verify|verify} messages.
         * @function encode
         * @memberof carrom.GameEndEvent
         * @static
         * @param {carrom.IGameEndEvent} message GameEndEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameEndEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.winBet != null && Object.hasOwnProperty.call(message, "winBet"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.winBet);
            if (message.winnerSeat != null && Object.hasOwnProperty.call(message, "winnerSeat"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.winnerSeat);
            return writer;
        };

        /**
         * Encodes the specified GameEndEvent message, length delimited. Does not implicitly {@link carrom.GameEndEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof carrom.GameEndEvent
         * @static
         * @param {carrom.IGameEndEvent} message GameEndEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameEndEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameEndEvent message from the specified reader or buffer.
         * @function decode
         * @memberof carrom.GameEndEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {carrom.GameEndEvent} GameEndEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameEndEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.carrom.GameEndEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.winBet = reader.int32();
                    break;
                case 2:
                    message.winnerSeat = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameEndEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof carrom.GameEndEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {carrom.GameEndEvent} GameEndEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameEndEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameEndEvent message.
         * @function verify
         * @memberof carrom.GameEndEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameEndEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.winBet != null && message.hasOwnProperty("winBet"))
                if (!$util.isInteger(message.winBet))
                    return "winBet: integer expected";
            if (message.winnerSeat != null && message.hasOwnProperty("winnerSeat"))
                if (!$util.isInteger(message.winnerSeat))
                    return "winnerSeat: integer expected";
            return null;
        };

        /**
         * Creates a GameEndEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof carrom.GameEndEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {carrom.GameEndEvent} GameEndEvent
         */
        GameEndEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.carrom.GameEndEvent)
                return object;
            let message = new $root.carrom.GameEndEvent();
            if (object.winBet != null)
                message.winBet = object.winBet | 0;
            if (object.winnerSeat != null)
                message.winnerSeat = object.winnerSeat | 0;
            return message;
        };

        /**
         * Creates a plain object from a GameEndEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof carrom.GameEndEvent
         * @static
         * @param {carrom.GameEndEvent} message GameEndEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameEndEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.winBet = 0;
                object.winnerSeat = 0;
            }
            if (message.winBet != null && message.hasOwnProperty("winBet"))
                object.winBet = message.winBet;
            if (message.winnerSeat != null && message.hasOwnProperty("winnerSeat"))
                object.winnerSeat = message.winnerSeat;
            return object;
        };

        /**
         * Converts this GameEndEvent to JSON.
         * @function toJSON
         * @memberof carrom.GameEndEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameEndEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameEndEvent;
    })();

    carrom.GuideReply = (function() {

        /**
         * Properties of a GuideReply.
         * @memberof carrom
         * @interface IGuideReply
         * @property {boolean|null} [isGuide] GuideReply isGuide
         */

        /**
         * Constructs a new GuideReply.
         * @memberof carrom
         * @classdesc Represents a GuideReply.
         * @implements IGuideReply
         * @constructor
         * @param {carrom.IGuideReply=} [properties] Properties to set
         */
        function GuideReply(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GuideReply isGuide.
         * @member {boolean} isGuide
         * @memberof carrom.GuideReply
         * @instance
         */
        GuideReply.prototype.isGuide = false;

        /**
         * Creates a new GuideReply instance using the specified properties.
         * @function create
         * @memberof carrom.GuideReply
         * @static
         * @param {carrom.IGuideReply=} [properties] Properties to set
         * @returns {carrom.GuideReply} GuideReply instance
         */
        GuideReply.create = function create(properties) {
            return new GuideReply(properties);
        };

        /**
         * Encodes the specified GuideReply message. Does not implicitly {@link carrom.GuideReply.verify|verify} messages.
         * @function encode
         * @memberof carrom.GuideReply
         * @static
         * @param {carrom.IGuideReply} message GuideReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GuideReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.isGuide != null && Object.hasOwnProperty.call(message, "isGuide"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isGuide);
            return writer;
        };

        /**
         * Encodes the specified GuideReply message, length delimited. Does not implicitly {@link carrom.GuideReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof carrom.GuideReply
         * @static
         * @param {carrom.IGuideReply} message GuideReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GuideReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GuideReply message from the specified reader or buffer.
         * @function decode
         * @memberof carrom.GuideReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {carrom.GuideReply} GuideReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GuideReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.carrom.GuideReply();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.isGuide = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GuideReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof carrom.GuideReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {carrom.GuideReply} GuideReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GuideReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GuideReply message.
         * @function verify
         * @memberof carrom.GuideReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GuideReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.isGuide != null && message.hasOwnProperty("isGuide"))
                if (typeof message.isGuide !== "boolean")
                    return "isGuide: boolean expected";
            return null;
        };

        /**
         * Creates a GuideReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof carrom.GuideReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {carrom.GuideReply} GuideReply
         */
        GuideReply.fromObject = function fromObject(object) {
            if (object instanceof $root.carrom.GuideReply)
                return object;
            let message = new $root.carrom.GuideReply();
            if (object.isGuide != null)
                message.isGuide = Boolean(object.isGuide);
            return message;
        };

        /**
         * Creates a plain object from a GuideReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof carrom.GuideReply
         * @static
         * @param {carrom.GuideReply} message GuideReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GuideReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.isGuide = false;
            if (message.isGuide != null && message.hasOwnProperty("isGuide"))
                object.isGuide = message.isGuide;
            return object;
        };

        /**
         * Converts this GuideReply to JSON.
         * @function toJSON
         * @memberof carrom.GuideReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GuideReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GuideReply;
    })();

    return carrom;
})();

export { $root as default };
