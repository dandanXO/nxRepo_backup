/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const tp = $root.tp = (() => {

    /**
     * Namespace tp.
     * @exports tp
     * @namespace
     */
    const tp = {};

    /**
     * DEADLINE_TYPE enum.
     * @name tp.DEADLINE_TYPE
     * @enum {number}
     * @property {number} DT_NONE=0 DT_NONE value
     * @property {number} START=1 START value
     * @property {number} OPERATION=2 OPERATION value
     * @property {number} SIDE_SHOW=3 SIDE_SHOW value
     * @property {number} WAIT_NEXT=4 WAIT_NEXT value
     * @property {number} WAIT_END=5 WAIT_END value
     */
    tp.DEADLINE_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DT_NONE"] = 0;
        values[valuesById[1] = "START"] = 1;
        values[valuesById[2] = "OPERATION"] = 2;
        values[valuesById[3] = "SIDE_SHOW"] = 3;
        values[valuesById[4] = "WAIT_NEXT"] = 4;
        values[valuesById[5] = "WAIT_END"] = 5;
        return values;
    })();

    tp.GameStartEvent = (function() {

        /**
         * Properties of a GameStartEvent.
         * @memberof tp
         * @interface IGameStartEvent
         * @property {number|null} [buttonSeat] GameStartEvent buttonSeat
         * @property {Array.<number>|null} [seats] GameStartEvent seats
         * @property {number|null} [upDown] GameStartEvent upDown
         * @property {number|null} [limitType] GameStartEvent limitType
         */

        /**
         * Constructs a new GameStartEvent.
         * @memberof tp
         * @classdesc Represents a GameStartEvent.
         * @implements IGameStartEvent
         * @constructor
         * @param {tp.IGameStartEvent=} [properties] Properties to set
         */
        function GameStartEvent(properties) {
            this.seats = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameStartEvent buttonSeat.
         * @member {number} buttonSeat
         * @memberof tp.GameStartEvent
         * @instance
         */
        GameStartEvent.prototype.buttonSeat = 0;

        /**
         * GameStartEvent seats.
         * @member {Array.<number>} seats
         * @memberof tp.GameStartEvent
         * @instance
         */
        GameStartEvent.prototype.seats = $util.emptyArray;

        /**
         * GameStartEvent upDown.
         * @member {number} upDown
         * @memberof tp.GameStartEvent
         * @instance
         */
        GameStartEvent.prototype.upDown = 0;

        /**
         * GameStartEvent limitType.
         * @member {number} limitType
         * @memberof tp.GameStartEvent
         * @instance
         */
        GameStartEvent.prototype.limitType = 0;

        /**
         * Creates a new GameStartEvent instance using the specified properties.
         * @function create
         * @memberof tp.GameStartEvent
         * @static
         * @param {tp.IGameStartEvent=} [properties] Properties to set
         * @returns {tp.GameStartEvent} GameStartEvent instance
         */
        GameStartEvent.create = function create(properties) {
            return new GameStartEvent(properties);
        };

        /**
         * Encodes the specified GameStartEvent message. Does not implicitly {@link tp.GameStartEvent.verify|verify} messages.
         * @function encode
         * @memberof tp.GameStartEvent
         * @static
         * @param {tp.IGameStartEvent} message GameStartEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStartEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.buttonSeat != null && Object.hasOwnProperty.call(message, "buttonSeat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.buttonSeat);
            if (message.seats != null && message.seats.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.seats.length; ++i)
                    writer.int32(message.seats[i]);
                writer.ldelim();
            }
            if (message.upDown != null && Object.hasOwnProperty.call(message, "upDown"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.upDown);
            if (message.limitType != null && Object.hasOwnProperty.call(message, "limitType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.limitType);
            return writer;
        };

        /**
         * Encodes the specified GameStartEvent message, length delimited. Does not implicitly {@link tp.GameStartEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tp.GameStartEvent
         * @static
         * @param {tp.IGameStartEvent} message GameStartEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStartEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameStartEvent message from the specified reader or buffer.
         * @function decode
         * @memberof tp.GameStartEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tp.GameStartEvent} GameStartEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStartEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tp.GameStartEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.buttonSeat = reader.int32();
                    break;
                case 2:
                    if (!(message.seats && message.seats.length))
                        message.seats = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.seats.push(reader.int32());
                    } else
                        message.seats.push(reader.int32());
                    break;
                case 3:
                    message.upDown = reader.int32();
                    break;
                case 4:
                    message.limitType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameStartEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tp.GameStartEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tp.GameStartEvent} GameStartEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStartEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameStartEvent message.
         * @function verify
         * @memberof tp.GameStartEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameStartEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.buttonSeat != null && message.hasOwnProperty("buttonSeat"))
                if (!$util.isInteger(message.buttonSeat))
                    return "buttonSeat: integer expected";
            if (message.seats != null && message.hasOwnProperty("seats")) {
                if (!Array.isArray(message.seats))
                    return "seats: array expected";
                for (let i = 0; i < message.seats.length; ++i)
                    if (!$util.isInteger(message.seats[i]))
                        return "seats: integer[] expected";
            }
            if (message.upDown != null && message.hasOwnProperty("upDown"))
                if (!$util.isInteger(message.upDown))
                    return "upDown: integer expected";
            if (message.limitType != null && message.hasOwnProperty("limitType"))
                if (!$util.isInteger(message.limitType))
                    return "limitType: integer expected";
            return null;
        };

        /**
         * Creates a GameStartEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tp.GameStartEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tp.GameStartEvent} GameStartEvent
         */
        GameStartEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.tp.GameStartEvent)
                return object;
            let message = new $root.tp.GameStartEvent();
            if (object.buttonSeat != null)
                message.buttonSeat = object.buttonSeat | 0;
            if (object.seats) {
                if (!Array.isArray(object.seats))
                    throw TypeError(".tp.GameStartEvent.seats: array expected");
                message.seats = [];
                for (let i = 0; i < object.seats.length; ++i)
                    message.seats[i] = object.seats[i] | 0;
            }
            if (object.upDown != null)
                message.upDown = object.upDown | 0;
            if (object.limitType != null)
                message.limitType = object.limitType | 0;
            return message;
        };

        /**
         * Creates a plain object from a GameStartEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tp.GameStartEvent
         * @static
         * @param {tp.GameStartEvent} message GameStartEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameStartEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.seats = [];
            if (options.defaults) {
                object.buttonSeat = 0;
                object.upDown = 0;
                object.limitType = 0;
            }
            if (message.buttonSeat != null && message.hasOwnProperty("buttonSeat"))
                object.buttonSeat = message.buttonSeat;
            if (message.seats && message.seats.length) {
                object.seats = [];
                for (let j = 0; j < message.seats.length; ++j)
                    object.seats[j] = message.seats[j];
            }
            if (message.upDown != null && message.hasOwnProperty("upDown"))
                object.upDown = message.upDown;
            if (message.limitType != null && message.hasOwnProperty("limitType"))
                object.limitType = message.limitType;
            return object;
        };

        /**
         * Converts this GameStartEvent to JSON.
         * @function toJSON
         * @memberof tp.GameStartEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameStartEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameStartEvent;
    })();

    tp.ButtonSeatEvent = (function() {

        /**
         * Properties of a ButtonSeatEvent.
         * @memberof tp
         * @interface IButtonSeatEvent
         * @property {number|null} [seat] ButtonSeatEvent seat
         */

        /**
         * Constructs a new ButtonSeatEvent.
         * @memberof tp
         * @classdesc Represents a ButtonSeatEvent.
         * @implements IButtonSeatEvent
         * @constructor
         * @param {tp.IButtonSeatEvent=} [properties] Properties to set
         */
        function ButtonSeatEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ButtonSeatEvent seat.
         * @member {number} seat
         * @memberof tp.ButtonSeatEvent
         * @instance
         */
        ButtonSeatEvent.prototype.seat = 0;

        /**
         * Creates a new ButtonSeatEvent instance using the specified properties.
         * @function create
         * @memberof tp.ButtonSeatEvent
         * @static
         * @param {tp.IButtonSeatEvent=} [properties] Properties to set
         * @returns {tp.ButtonSeatEvent} ButtonSeatEvent instance
         */
        ButtonSeatEvent.create = function create(properties) {
            return new ButtonSeatEvent(properties);
        };

        /**
         * Encodes the specified ButtonSeatEvent message. Does not implicitly {@link tp.ButtonSeatEvent.verify|verify} messages.
         * @function encode
         * @memberof tp.ButtonSeatEvent
         * @static
         * @param {tp.IButtonSeatEvent} message ButtonSeatEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ButtonSeatEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            return writer;
        };

        /**
         * Encodes the specified ButtonSeatEvent message, length delimited. Does not implicitly {@link tp.ButtonSeatEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tp.ButtonSeatEvent
         * @static
         * @param {tp.IButtonSeatEvent} message ButtonSeatEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ButtonSeatEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ButtonSeatEvent message from the specified reader or buffer.
         * @function decode
         * @memberof tp.ButtonSeatEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tp.ButtonSeatEvent} ButtonSeatEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ButtonSeatEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tp.ButtonSeatEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
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
         * Decodes a ButtonSeatEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tp.ButtonSeatEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tp.ButtonSeatEvent} ButtonSeatEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ButtonSeatEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ButtonSeatEvent message.
         * @function verify
         * @memberof tp.ButtonSeatEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ButtonSeatEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            return null;
        };

        /**
         * Creates a ButtonSeatEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tp.ButtonSeatEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tp.ButtonSeatEvent} ButtonSeatEvent
         */
        ButtonSeatEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.tp.ButtonSeatEvent)
                return object;
            let message = new $root.tp.ButtonSeatEvent();
            if (object.seat != null)
                message.seat = object.seat | 0;
            return message;
        };

        /**
         * Creates a plain object from a ButtonSeatEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tp.ButtonSeatEvent
         * @static
         * @param {tp.ButtonSeatEvent} message ButtonSeatEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ButtonSeatEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.seat = 0;
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            return object;
        };

        /**
         * Converts this ButtonSeatEvent to JSON.
         * @function toJSON
         * @memberof tp.ButtonSeatEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ButtonSeatEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ButtonSeatEvent;
    })();

    tp.TableStateEvent = (function() {

        /**
         * Properties of a TableStateEvent.
         * @memberof tp
         * @interface ITableStateEvent
         * @property {string|null} [gameCode] TableStateEvent gameCode
         * @property {number|null} [totalBet] TableStateEvent totalBet
         * @property {number|null} [currentBet] TableStateEvent currentBet
         * @property {Array.<tp.ISeatState>|null} [seatStates] TableStateEvent seatStates
         */

        /**
         * Constructs a new TableStateEvent.
         * @memberof tp
         * @classdesc Represents a TableStateEvent.
         * @implements ITableStateEvent
         * @constructor
         * @param {tp.ITableStateEvent=} [properties] Properties to set
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
         * @memberof tp.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.gameCode = "";

        /**
         * TableStateEvent totalBet.
         * @member {number} totalBet
         * @memberof tp.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.totalBet = 0;

        /**
         * TableStateEvent currentBet.
         * @member {number} currentBet
         * @memberof tp.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.currentBet = 0;

        /**
         * TableStateEvent seatStates.
         * @member {Array.<tp.ISeatState>} seatStates
         * @memberof tp.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.seatStates = $util.emptyArray;

        /**
         * Creates a new TableStateEvent instance using the specified properties.
         * @function create
         * @memberof tp.TableStateEvent
         * @static
         * @param {tp.ITableStateEvent=} [properties] Properties to set
         * @returns {tp.TableStateEvent} TableStateEvent instance
         */
        TableStateEvent.create = function create(properties) {
            return new TableStateEvent(properties);
        };

        /**
         * Encodes the specified TableStateEvent message. Does not implicitly {@link tp.TableStateEvent.verify|verify} messages.
         * @function encode
         * @memberof tp.TableStateEvent
         * @static
         * @param {tp.ITableStateEvent} message TableStateEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableStateEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameCode != null && Object.hasOwnProperty.call(message, "gameCode"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameCode);
            if (message.totalBet != null && Object.hasOwnProperty.call(message, "totalBet"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.totalBet);
            if (message.currentBet != null && Object.hasOwnProperty.call(message, "currentBet"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.currentBet);
            if (message.seatStates != null && message.seatStates.length)
                for (let i = 0; i < message.seatStates.length; ++i)
                    $root.tp.SeatState.encode(message.seatStates[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TableStateEvent message, length delimited. Does not implicitly {@link tp.TableStateEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tp.TableStateEvent
         * @static
         * @param {tp.ITableStateEvent} message TableStateEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableStateEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TableStateEvent message from the specified reader or buffer.
         * @function decode
         * @memberof tp.TableStateEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tp.TableStateEvent} TableStateEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableStateEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tp.TableStateEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameCode = reader.string();
                    break;
                case 2:
                    message.totalBet = reader.int32();
                    break;
                case 3:
                    message.currentBet = reader.int32();
                    break;
                case 4:
                    if (!(message.seatStates && message.seatStates.length))
                        message.seatStates = [];
                    message.seatStates.push($root.tp.SeatState.decode(reader, reader.uint32()));
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
         * @memberof tp.TableStateEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tp.TableStateEvent} TableStateEvent
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
         * @memberof tp.TableStateEvent
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
            if (message.totalBet != null && message.hasOwnProperty("totalBet"))
                if (!$util.isInteger(message.totalBet))
                    return "totalBet: integer expected";
            if (message.currentBet != null && message.hasOwnProperty("currentBet"))
                if (!$util.isInteger(message.currentBet))
                    return "currentBet: integer expected";
            if (message.seatStates != null && message.hasOwnProperty("seatStates")) {
                if (!Array.isArray(message.seatStates))
                    return "seatStates: array expected";
                for (let i = 0; i < message.seatStates.length; ++i) {
                    let error = $root.tp.SeatState.verify(message.seatStates[i]);
                    if (error)
                        return "seatStates." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TableStateEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tp.TableStateEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tp.TableStateEvent} TableStateEvent
         */
        TableStateEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.tp.TableStateEvent)
                return object;
            let message = new $root.tp.TableStateEvent();
            if (object.gameCode != null)
                message.gameCode = String(object.gameCode);
            if (object.totalBet != null)
                message.totalBet = object.totalBet | 0;
            if (object.currentBet != null)
                message.currentBet = object.currentBet | 0;
            if (object.seatStates) {
                if (!Array.isArray(object.seatStates))
                    throw TypeError(".tp.TableStateEvent.seatStates: array expected");
                message.seatStates = [];
                for (let i = 0; i < object.seatStates.length; ++i) {
                    if (typeof object.seatStates[i] !== "object")
                        throw TypeError(".tp.TableStateEvent.seatStates: object expected");
                    message.seatStates[i] = $root.tp.SeatState.fromObject(object.seatStates[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TableStateEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tp.TableStateEvent
         * @static
         * @param {tp.TableStateEvent} message TableStateEvent
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
                object.totalBet = 0;
                object.currentBet = 0;
            }
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                object.gameCode = message.gameCode;
            if (message.totalBet != null && message.hasOwnProperty("totalBet"))
                object.totalBet = message.totalBet;
            if (message.currentBet != null && message.hasOwnProperty("currentBet"))
                object.currentBet = message.currentBet;
            if (message.seatStates && message.seatStates.length) {
                object.seatStates = [];
                for (let j = 0; j < message.seatStates.length; ++j)
                    object.seatStates[j] = $root.tp.SeatState.toObject(message.seatStates[j], options);
            }
            return object;
        };

        /**
         * Converts this TableStateEvent to JSON.
         * @function toJSON
         * @memberof tp.TableStateEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TableStateEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TableStateEvent;
    })();

    tp.SeatState = (function() {

        /**
         * Properties of a SeatState.
         * @memberof tp
         * @interface ISeatState
         * @property {number|null} [seat] SeatState seat
         * @property {tp.ICardSet|null} [cardSet] SeatState cardSet
         * @property {boolean|null} [opened] SeatState opened
         * @property {boolean|null} [packed] SeatState packed
         * @property {Array.<number>|null} [bets] SeatState bets
         * @property {boolean|null} [left] SeatState left
         */

        /**
         * Constructs a new SeatState.
         * @memberof tp
         * @classdesc Represents a SeatState.
         * @implements ISeatState
         * @constructor
         * @param {tp.ISeatState=} [properties] Properties to set
         */
        function SeatState(properties) {
            this.bets = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SeatState seat.
         * @member {number} seat
         * @memberof tp.SeatState
         * @instance
         */
        SeatState.prototype.seat = 0;

        /**
         * SeatState cardSet.
         * @member {tp.ICardSet|null|undefined} cardSet
         * @memberof tp.SeatState
         * @instance
         */
        SeatState.prototype.cardSet = null;

        /**
         * SeatState opened.
         * @member {boolean} opened
         * @memberof tp.SeatState
         * @instance
         */
        SeatState.prototype.opened = false;

        /**
         * SeatState packed.
         * @member {boolean} packed
         * @memberof tp.SeatState
         * @instance
         */
        SeatState.prototype.packed = false;

        /**
         * SeatState bets.
         * @member {Array.<number>} bets
         * @memberof tp.SeatState
         * @instance
         */
        SeatState.prototype.bets = $util.emptyArray;

        /**
         * SeatState left.
         * @member {boolean} left
         * @memberof tp.SeatState
         * @instance
         */
        SeatState.prototype.left = false;

        /**
         * Creates a new SeatState instance using the specified properties.
         * @function create
         * @memberof tp.SeatState
         * @static
         * @param {tp.ISeatState=} [properties] Properties to set
         * @returns {tp.SeatState} SeatState instance
         */
        SeatState.create = function create(properties) {
            return new SeatState(properties);
        };

        /**
         * Encodes the specified SeatState message. Does not implicitly {@link tp.SeatState.verify|verify} messages.
         * @function encode
         * @memberof tp.SeatState
         * @static
         * @param {tp.ISeatState} message SeatState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            if (message.cardSet != null && Object.hasOwnProperty.call(message, "cardSet"))
                $root.tp.CardSet.encode(message.cardSet, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.opened != null && Object.hasOwnProperty.call(message, "opened"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.opened);
            if (message.packed != null && Object.hasOwnProperty.call(message, "packed"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.packed);
            if (message.bets != null && message.bets.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (let i = 0; i < message.bets.length; ++i)
                    writer.int32(message.bets[i]);
                writer.ldelim();
            }
            if (message.left != null && Object.hasOwnProperty.call(message, "left"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.left);
            return writer;
        };

        /**
         * Encodes the specified SeatState message, length delimited. Does not implicitly {@link tp.SeatState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tp.SeatState
         * @static
         * @param {tp.ISeatState} message SeatState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeatState message from the specified reader or buffer.
         * @function decode
         * @memberof tp.SeatState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tp.SeatState} SeatState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tp.SeatState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat = reader.int32();
                    break;
                case 2:
                    message.cardSet = $root.tp.CardSet.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.opened = reader.bool();
                    break;
                case 4:
                    message.packed = reader.bool();
                    break;
                case 5:
                    if (!(message.bets && message.bets.length))
                        message.bets = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.bets.push(reader.int32());
                    } else
                        message.bets.push(reader.int32());
                    break;
                case 6:
                    message.left = reader.bool();
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
         * @memberof tp.SeatState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tp.SeatState} SeatState
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
         * @memberof tp.SeatState
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
            if (message.cardSet != null && message.hasOwnProperty("cardSet")) {
                let error = $root.tp.CardSet.verify(message.cardSet);
                if (error)
                    return "cardSet." + error;
            }
            if (message.opened != null && message.hasOwnProperty("opened"))
                if (typeof message.opened !== "boolean")
                    return "opened: boolean expected";
            if (message.packed != null && message.hasOwnProperty("packed"))
                if (typeof message.packed !== "boolean")
                    return "packed: boolean expected";
            if (message.bets != null && message.hasOwnProperty("bets")) {
                if (!Array.isArray(message.bets))
                    return "bets: array expected";
                for (let i = 0; i < message.bets.length; ++i)
                    if (!$util.isInteger(message.bets[i]))
                        return "bets: integer[] expected";
            }
            if (message.left != null && message.hasOwnProperty("left"))
                if (typeof message.left !== "boolean")
                    return "left: boolean expected";
            return null;
        };

        /**
         * Creates a SeatState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tp.SeatState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tp.SeatState} SeatState
         */
        SeatState.fromObject = function fromObject(object) {
            if (object instanceof $root.tp.SeatState)
                return object;
            let message = new $root.tp.SeatState();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.cardSet != null) {
                if (typeof object.cardSet !== "object")
                    throw TypeError(".tp.SeatState.cardSet: object expected");
                message.cardSet = $root.tp.CardSet.fromObject(object.cardSet);
            }
            if (object.opened != null)
                message.opened = Boolean(object.opened);
            if (object.packed != null)
                message.packed = Boolean(object.packed);
            if (object.bets) {
                if (!Array.isArray(object.bets))
                    throw TypeError(".tp.SeatState.bets: array expected");
                message.bets = [];
                for (let i = 0; i < object.bets.length; ++i)
                    message.bets[i] = object.bets[i] | 0;
            }
            if (object.left != null)
                message.left = Boolean(object.left);
            return message;
        };

        /**
         * Creates a plain object from a SeatState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tp.SeatState
         * @static
         * @param {tp.SeatState} message SeatState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeatState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.bets = [];
            if (options.defaults) {
                object.seat = 0;
                object.cardSet = null;
                object.opened = false;
                object.packed = false;
                object.left = false;
            }
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.cardSet != null && message.hasOwnProperty("cardSet"))
                object.cardSet = $root.tp.CardSet.toObject(message.cardSet, options);
            if (message.opened != null && message.hasOwnProperty("opened"))
                object.opened = message.opened;
            if (message.packed != null && message.hasOwnProperty("packed"))
                object.packed = message.packed;
            if (message.bets && message.bets.length) {
                object.bets = [];
                for (let j = 0; j < message.bets.length; ++j)
                    object.bets[j] = message.bets[j];
            }
            if (message.left != null && message.hasOwnProperty("left"))
                object.left = message.left;
            return object;
        };

        /**
         * Converts this SeatState to JSON.
         * @function toJSON
         * @memberof tp.SeatState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeatState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeatState;
    })();

    tp.AllSeatCards = (function() {

        /**
         * Properties of an AllSeatCards.
         * @memberof tp
         * @interface IAllSeatCards
         * @property {number|null} [handsNum] AllSeatCards handsNum
         * @property {Array.<tp.ISeatCards>|null} [seatCards] AllSeatCards seatCards
         * @property {number|null} [initBet] AllSeatCards initBet
         */

        /**
         * Constructs a new AllSeatCards.
         * @memberof tp
         * @classdesc Represents an AllSeatCards.
         * @implements IAllSeatCards
         * @constructor
         * @param {tp.IAllSeatCards=} [properties] Properties to set
         */
        function AllSeatCards(properties) {
            this.seatCards = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AllSeatCards handsNum.
         * @member {number} handsNum
         * @memberof tp.AllSeatCards
         * @instance
         */
        AllSeatCards.prototype.handsNum = 0;

        /**
         * AllSeatCards seatCards.
         * @member {Array.<tp.ISeatCards>} seatCards
         * @memberof tp.AllSeatCards
         * @instance
         */
        AllSeatCards.prototype.seatCards = $util.emptyArray;

        /**
         * AllSeatCards initBet.
         * @member {number} initBet
         * @memberof tp.AllSeatCards
         * @instance
         */
        AllSeatCards.prototype.initBet = 0;

        /**
         * Creates a new AllSeatCards instance using the specified properties.
         * @function create
         * @memberof tp.AllSeatCards
         * @static
         * @param {tp.IAllSeatCards=} [properties] Properties to set
         * @returns {tp.AllSeatCards} AllSeatCards instance
         */
        AllSeatCards.create = function create(properties) {
            return new AllSeatCards(properties);
        };

        /**
         * Encodes the specified AllSeatCards message. Does not implicitly {@link tp.AllSeatCards.verify|verify} messages.
         * @function encode
         * @memberof tp.AllSeatCards
         * @static
         * @param {tp.IAllSeatCards} message AllSeatCards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AllSeatCards.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handsNum != null && Object.hasOwnProperty.call(message, "handsNum"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handsNum);
            if (message.seatCards != null && message.seatCards.length)
                for (let i = 0; i < message.seatCards.length; ++i)
                    $root.tp.SeatCards.encode(message.seatCards[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.initBet != null && Object.hasOwnProperty.call(message, "initBet"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.initBet);
            return writer;
        };

        /**
         * Encodes the specified AllSeatCards message, length delimited. Does not implicitly {@link tp.AllSeatCards.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tp.AllSeatCards
         * @static
         * @param {tp.IAllSeatCards} message AllSeatCards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AllSeatCards.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AllSeatCards message from the specified reader or buffer.
         * @function decode
         * @memberof tp.AllSeatCards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tp.AllSeatCards} AllSeatCards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AllSeatCards.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tp.AllSeatCards();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handsNum = reader.int32();
                    break;
                case 2:
                    if (!(message.seatCards && message.seatCards.length))
                        message.seatCards = [];
                    message.seatCards.push($root.tp.SeatCards.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.initBet = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AllSeatCards message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tp.AllSeatCards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tp.AllSeatCards} AllSeatCards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AllSeatCards.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AllSeatCards message.
         * @function verify
         * @memberof tp.AllSeatCards
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AllSeatCards.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handsNum != null && message.hasOwnProperty("handsNum"))
                if (!$util.isInteger(message.handsNum))
                    return "handsNum: integer expected";
            if (message.seatCards != null && message.hasOwnProperty("seatCards")) {
                if (!Array.isArray(message.seatCards))
                    return "seatCards: array expected";
                for (let i = 0; i < message.seatCards.length; ++i) {
                    let error = $root.tp.SeatCards.verify(message.seatCards[i]);
                    if (error)
                        return "seatCards." + error;
                }
            }
            if (message.initBet != null && message.hasOwnProperty("initBet"))
                if (!$util.isInteger(message.initBet))
                    return "initBet: integer expected";
            return null;
        };

        /**
         * Creates an AllSeatCards message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tp.AllSeatCards
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tp.AllSeatCards} AllSeatCards
         */
        AllSeatCards.fromObject = function fromObject(object) {
            if (object instanceof $root.tp.AllSeatCards)
                return object;
            let message = new $root.tp.AllSeatCards();
            if (object.handsNum != null)
                message.handsNum = object.handsNum | 0;
            if (object.seatCards) {
                if (!Array.isArray(object.seatCards))
                    throw TypeError(".tp.AllSeatCards.seatCards: array expected");
                message.seatCards = [];
                for (let i = 0; i < object.seatCards.length; ++i) {
                    if (typeof object.seatCards[i] !== "object")
                        throw TypeError(".tp.AllSeatCards.seatCards: object expected");
                    message.seatCards[i] = $root.tp.SeatCards.fromObject(object.seatCards[i]);
                }
            }
            if (object.initBet != null)
                message.initBet = object.initBet | 0;
            return message;
        };

        /**
         * Creates a plain object from an AllSeatCards message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tp.AllSeatCards
         * @static
         * @param {tp.AllSeatCards} message AllSeatCards
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AllSeatCards.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.seatCards = [];
            if (options.defaults) {
                object.handsNum = 0;
                object.initBet = 0;
            }
            if (message.handsNum != null && message.hasOwnProperty("handsNum"))
                object.handsNum = message.handsNum;
            if (message.seatCards && message.seatCards.length) {
                object.seatCards = [];
                for (let j = 0; j < message.seatCards.length; ++j)
                    object.seatCards[j] = $root.tp.SeatCards.toObject(message.seatCards[j], options);
            }
            if (message.initBet != null && message.hasOwnProperty("initBet"))
                object.initBet = message.initBet;
            return object;
        };

        /**
         * Converts this AllSeatCards to JSON.
         * @function toJSON
         * @memberof tp.AllSeatCards
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AllSeatCards.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AllSeatCards;
    })();

    tp.DealCardsEvent = (function() {

        /**
         * Properties of a DealCardsEvent.
         * @memberof tp
         * @interface IDealCardsEvent
         * @property {tp.ICardSet|null} [cardSet] DealCardsEvent cardSet
         * @property {boolean|null} [isBest] DealCardsEvent isBest
         * @property {tp.ICardSet|null} [dealedCardSet] DealCardsEvent dealedCardSet
         */

        /**
         * Constructs a new DealCardsEvent.
         * @memberof tp
         * @classdesc Represents a DealCardsEvent.
         * @implements IDealCardsEvent
         * @constructor
         * @param {tp.IDealCardsEvent=} [properties] Properties to set
         */
        function DealCardsEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DealCardsEvent cardSet.
         * @member {tp.ICardSet|null|undefined} cardSet
         * @memberof tp.DealCardsEvent
         * @instance
         */
        DealCardsEvent.prototype.cardSet = null;

        /**
         * DealCardsEvent isBest.
         * @member {boolean} isBest
         * @memberof tp.DealCardsEvent
         * @instance
         */
        DealCardsEvent.prototype.isBest = false;

        /**
         * DealCardsEvent dealedCardSet.
         * @member {tp.ICardSet|null|undefined} dealedCardSet
         * @memberof tp.DealCardsEvent
         * @instance
         */
        DealCardsEvent.prototype.dealedCardSet = null;

        /**
         * Creates a new DealCardsEvent instance using the specified properties.
         * @function create
         * @memberof tp.DealCardsEvent
         * @static
         * @param {tp.IDealCardsEvent=} [properties] Properties to set
         * @returns {tp.DealCardsEvent} DealCardsEvent instance
         */
        DealCardsEvent.create = function create(properties) {
            return new DealCardsEvent(properties);
        };

        /**
         * Encodes the specified DealCardsEvent message. Does not implicitly {@link tp.DealCardsEvent.verify|verify} messages.
         * @function encode
         * @memberof tp.DealCardsEvent
         * @static
         * @param {tp.IDealCardsEvent} message DealCardsEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DealCardsEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cardSet != null && Object.hasOwnProperty.call(message, "cardSet"))
                $root.tp.CardSet.encode(message.cardSet, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.isBest != null && Object.hasOwnProperty.call(message, "isBest"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isBest);
            if (message.dealedCardSet != null && Object.hasOwnProperty.call(message, "dealedCardSet"))
                $root.tp.CardSet.encode(message.dealedCardSet, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified DealCardsEvent message, length delimited. Does not implicitly {@link tp.DealCardsEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tp.DealCardsEvent
         * @static
         * @param {tp.IDealCardsEvent} message DealCardsEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DealCardsEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DealCardsEvent message from the specified reader or buffer.
         * @function decode
         * @memberof tp.DealCardsEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tp.DealCardsEvent} DealCardsEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DealCardsEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tp.DealCardsEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.cardSet = $root.tp.CardSet.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.isBest = reader.bool();
                    break;
                case 3:
                    message.dealedCardSet = $root.tp.CardSet.decode(reader, reader.uint32());
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
         * @memberof tp.DealCardsEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tp.DealCardsEvent} DealCardsEvent
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
         * @memberof tp.DealCardsEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DealCardsEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cardSet != null && message.hasOwnProperty("cardSet")) {
                let error = $root.tp.CardSet.verify(message.cardSet);
                if (error)
                    return "cardSet." + error;
            }
            if (message.isBest != null && message.hasOwnProperty("isBest"))
                if (typeof message.isBest !== "boolean")
                    return "isBest: boolean expected";
            if (message.dealedCardSet != null && message.hasOwnProperty("dealedCardSet")) {
                let error = $root.tp.CardSet.verify(message.dealedCardSet);
                if (error)
                    return "dealedCardSet." + error;
            }
            return null;
        };

        /**
         * Creates a DealCardsEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tp.DealCardsEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tp.DealCardsEvent} DealCardsEvent
         */
        DealCardsEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.tp.DealCardsEvent)
                return object;
            let message = new $root.tp.DealCardsEvent();
            if (object.cardSet != null) {
                if (typeof object.cardSet !== "object")
                    throw TypeError(".tp.DealCardsEvent.cardSet: object expected");
                message.cardSet = $root.tp.CardSet.fromObject(object.cardSet);
            }
            if (object.isBest != null)
                message.isBest = Boolean(object.isBest);
            if (object.dealedCardSet != null) {
                if (typeof object.dealedCardSet !== "object")
                    throw TypeError(".tp.DealCardsEvent.dealedCardSet: object expected");
                message.dealedCardSet = $root.tp.CardSet.fromObject(object.dealedCardSet);
            }
            return message;
        };

        /**
         * Creates a plain object from a DealCardsEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tp.DealCardsEvent
         * @static
         * @param {tp.DealCardsEvent} message DealCardsEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DealCardsEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.cardSet = null;
                object.isBest = false;
                object.dealedCardSet = null;
            }
            if (message.cardSet != null && message.hasOwnProperty("cardSet"))
                object.cardSet = $root.tp.CardSet.toObject(message.cardSet, options);
            if (message.isBest != null && message.hasOwnProperty("isBest"))
                object.isBest = message.isBest;
            if (message.dealedCardSet != null && message.hasOwnProperty("dealedCardSet"))
                object.dealedCardSet = $root.tp.CardSet.toObject(message.dealedCardSet, options);
            return object;
        };

        /**
         * Converts this DealCardsEvent to JSON.
         * @function toJSON
         * @memberof tp.DealCardsEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DealCardsEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DealCardsEvent;
    })();

    tp.CardSet = (function() {

        /**
         * Properties of a CardSet.
         * @memberof tp
         * @interface ICardSet
         * @property {number|null} [type] CardSet type
         * @property {Array.<number>|null} [cards] CardSet cards
         * @property {Array.<number>|null} [originalCards] CardSet originalCards
         */

        /**
         * Constructs a new CardSet.
         * @memberof tp
         * @classdesc Represents a CardSet.
         * @implements ICardSet
         * @constructor
         * @param {tp.ICardSet=} [properties] Properties to set
         */
        function CardSet(properties) {
            this.cards = [];
            this.originalCards = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CardSet type.
         * @member {number} type
         * @memberof tp.CardSet
         * @instance
         */
        CardSet.prototype.type = 0;

        /**
         * CardSet cards.
         * @member {Array.<number>} cards
         * @memberof tp.CardSet
         * @instance
         */
        CardSet.prototype.cards = $util.emptyArray;

        /**
         * CardSet originalCards.
         * @member {Array.<number>} originalCards
         * @memberof tp.CardSet
         * @instance
         */
        CardSet.prototype.originalCards = $util.emptyArray;

        /**
         * Creates a new CardSet instance using the specified properties.
         * @function create
         * @memberof tp.CardSet
         * @static
         * @param {tp.ICardSet=} [properties] Properties to set
         * @returns {tp.CardSet} CardSet instance
         */
        CardSet.create = function create(properties) {
            return new CardSet(properties);
        };

        /**
         * Encodes the specified CardSet message. Does not implicitly {@link tp.CardSet.verify|verify} messages.
         * @function encode
         * @memberof tp.CardSet
         * @static
         * @param {tp.ICardSet} message CardSet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CardSet.encode = function encode(message, writer) {
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
            if (message.originalCards != null && message.originalCards.length) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork();
                for (let i = 0; i < message.originalCards.length; ++i)
                    writer.int32(message.originalCards[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified CardSet message, length delimited. Does not implicitly {@link tp.CardSet.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tp.CardSet
         * @static
         * @param {tp.ICardSet} message CardSet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CardSet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CardSet message from the specified reader or buffer.
         * @function decode
         * @memberof tp.CardSet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tp.CardSet} CardSet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CardSet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tp.CardSet();
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
                case 3:
                    if (!(message.originalCards && message.originalCards.length))
                        message.originalCards = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.originalCards.push(reader.int32());
                    } else
                        message.originalCards.push(reader.int32());
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
         * @memberof tp.CardSet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tp.CardSet} CardSet
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
         * @memberof tp.CardSet
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CardSet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            if (message.cards != null && message.hasOwnProperty("cards")) {
                if (!Array.isArray(message.cards))
                    return "cards: array expected";
                for (let i = 0; i < message.cards.length; ++i)
                    if (!$util.isInteger(message.cards[i]))
                        return "cards: integer[] expected";
            }
            if (message.originalCards != null && message.hasOwnProperty("originalCards")) {
                if (!Array.isArray(message.originalCards))
                    return "originalCards: array expected";
                for (let i = 0; i < message.originalCards.length; ++i)
                    if (!$util.isInteger(message.originalCards[i]))
                        return "originalCards: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a CardSet message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tp.CardSet
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tp.CardSet} CardSet
         */
        CardSet.fromObject = function fromObject(object) {
            if (object instanceof $root.tp.CardSet)
                return object;
            let message = new $root.tp.CardSet();
            if (object.type != null)
                message.type = object.type | 0;
            if (object.cards) {
                if (!Array.isArray(object.cards))
                    throw TypeError(".tp.CardSet.cards: array expected");
                message.cards = [];
                for (let i = 0; i < object.cards.length; ++i)
                    message.cards[i] = object.cards[i] | 0;
            }
            if (object.originalCards) {
                if (!Array.isArray(object.originalCards))
                    throw TypeError(".tp.CardSet.originalCards: array expected");
                message.originalCards = [];
                for (let i = 0; i < object.originalCards.length; ++i)
                    message.originalCards[i] = object.originalCards[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a CardSet message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tp.CardSet
         * @static
         * @param {tp.CardSet} message CardSet
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CardSet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.cards = [];
                object.originalCards = [];
            }
            if (options.defaults)
                object.type = 0;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.cards && message.cards.length) {
                object.cards = [];
                for (let j = 0; j < message.cards.length; ++j)
                    object.cards[j] = message.cards[j];
            }
            if (message.originalCards && message.originalCards.length) {
                object.originalCards = [];
                for (let j = 0; j < message.originalCards.length; ++j)
                    object.originalCards[j] = message.originalCards[j];
            }
            return object;
        };

        /**
         * Converts this CardSet to JSON.
         * @function toJSON
         * @memberof tp.CardSet
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CardSet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CardSet;
    })();

    /**
     * CARD_TYPE enum.
     * @name tp.CARD_TYPE
     * @enum {number}
     * @property {number} CT_NONE=0 CT_NONE value
     * @property {number} CT_THREE=1 CT_THREE value
     * @property {number} CT_STRAIGHT_FLUSH=2 CT_STRAIGHT_FLUSH value
     * @property {number} CT_STRAIGHT=3 CT_STRAIGHT value
     * @property {number} CT_FLUSH=4 CT_FLUSH value
     * @property {number} CT_PAIR=5 CT_PAIR value
     * @property {number} CT_HIGH=6 CT_HIGH value
     * @property {number} CT_UNKNOWN=7 CT_UNKNOWN value
     */
    tp.CARD_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "CT_NONE"] = 0;
        values[valuesById[1] = "CT_THREE"] = 1;
        values[valuesById[2] = "CT_STRAIGHT_FLUSH"] = 2;
        values[valuesById[3] = "CT_STRAIGHT"] = 3;
        values[valuesById[4] = "CT_FLUSH"] = 4;
        values[valuesById[5] = "CT_PAIR"] = 5;
        values[valuesById[6] = "CT_HIGH"] = 6;
        values[valuesById[7] = "CT_UNKNOWN"] = 7;
        return values;
    })();

    tp.OperationReq = (function() {

        /**
         * Properties of an OperationReq.
         * @memberof tp
         * @interface IOperationReq
         * @property {number|null} [type] OperationReq type
         */

        /**
         * Constructs a new OperationReq.
         * @memberof tp
         * @classdesc Represents an OperationReq.
         * @implements IOperationReq
         * @constructor
         * @param {tp.IOperationReq=} [properties] Properties to set
         */
        function OperationReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OperationReq type.
         * @member {number} type
         * @memberof tp.OperationReq
         * @instance
         */
        OperationReq.prototype.type = 0;

        /**
         * Creates a new OperationReq instance using the specified properties.
         * @function create
         * @memberof tp.OperationReq
         * @static
         * @param {tp.IOperationReq=} [properties] Properties to set
         * @returns {tp.OperationReq} OperationReq instance
         */
        OperationReq.create = function create(properties) {
            return new OperationReq(properties);
        };

        /**
         * Encodes the specified OperationReq message. Does not implicitly {@link tp.OperationReq.verify|verify} messages.
         * @function encode
         * @memberof tp.OperationReq
         * @static
         * @param {tp.IOperationReq} message OperationReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperationReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            return writer;
        };

        /**
         * Encodes the specified OperationReq message, length delimited. Does not implicitly {@link tp.OperationReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tp.OperationReq
         * @static
         * @param {tp.IOperationReq} message OperationReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperationReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OperationReq message from the specified reader or buffer.
         * @function decode
         * @memberof tp.OperationReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tp.OperationReq} OperationReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OperationReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tp.OperationReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
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
         * @memberof tp.OperationReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tp.OperationReq} OperationReq
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
         * @memberof tp.OperationReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OperationReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            return null;
        };

        /**
         * Creates an OperationReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tp.OperationReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tp.OperationReq} OperationReq
         */
        OperationReq.fromObject = function fromObject(object) {
            if (object instanceof $root.tp.OperationReq)
                return object;
            let message = new $root.tp.OperationReq();
            if (object.type != null)
                message.type = object.type | 0;
            return message;
        };

        /**
         * Creates a plain object from an OperationReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tp.OperationReq
         * @static
         * @param {tp.OperationReq} message OperationReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OperationReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.type = 0;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            return object;
        };

        /**
         * Converts this OperationReq to JSON.
         * @function toJSON
         * @memberof tp.OperationReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OperationReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OperationReq;
    })();

    /**
     * OPERATION_TYPE enum.
     * @name tp.OPERATION_TYPE
     * @enum {number}
     * @property {number} OT_NONE=0 OT_NONE value
     * @property {number} OT_OPEN=1 OT_OPEN value
     * @property {number} OT_PACK=2 OT_PACK value
     * @property {number} OT_BET=3 OT_BET value
     * @property {number} OT_DOUBLE=4 OT_DOUBLE value
     * @property {number} OT_SHOW=5 OT_SHOW value
     * @property {number} OT_SIDESHOW=6 OT_SIDESHOW value
     * @property {number} OT_ACCEPT=7 OT_ACCEPT value
     * @property {number} OT_REJECT=8 OT_REJECT value
     */
    tp.OPERATION_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "OT_NONE"] = 0;
        values[valuesById[1] = "OT_OPEN"] = 1;
        values[valuesById[2] = "OT_PACK"] = 2;
        values[valuesById[3] = "OT_BET"] = 3;
        values[valuesById[4] = "OT_DOUBLE"] = 4;
        values[valuesById[5] = "OT_SHOW"] = 5;
        values[valuesById[6] = "OT_SIDESHOW"] = 6;
        values[valuesById[7] = "OT_ACCEPT"] = 7;
        values[valuesById[8] = "OT_REJECT"] = 8;
        return values;
    })();

    tp.OperationEvent = (function() {

        /**
         * Properties of an OperationEvent.
         * @memberof tp
         * @interface IOperationEvent
         * @property {number|null} [seat] OperationEvent seat
         * @property {number|null} [type] OperationEvent type
         * @property {number|null} [showSeat] OperationEvent showSeat
         * @property {number|null} [packReason] OperationEvent packReason
         */

        /**
         * Constructs a new OperationEvent.
         * @memberof tp
         * @classdesc Represents an OperationEvent.
         * @implements IOperationEvent
         * @constructor
         * @param {tp.IOperationEvent=} [properties] Properties to set
         */
        function OperationEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OperationEvent seat.
         * @member {number} seat
         * @memberof tp.OperationEvent
         * @instance
         */
        OperationEvent.prototype.seat = 0;

        /**
         * OperationEvent type.
         * @member {number} type
         * @memberof tp.OperationEvent
         * @instance
         */
        OperationEvent.prototype.type = 0;

        /**
         * OperationEvent showSeat.
         * @member {number} showSeat
         * @memberof tp.OperationEvent
         * @instance
         */
        OperationEvent.prototype.showSeat = 0;

        /**
         * OperationEvent packReason.
         * @member {number} packReason
         * @memberof tp.OperationEvent
         * @instance
         */
        OperationEvent.prototype.packReason = 0;

        /**
         * Creates a new OperationEvent instance using the specified properties.
         * @function create
         * @memberof tp.OperationEvent
         * @static
         * @param {tp.IOperationEvent=} [properties] Properties to set
         * @returns {tp.OperationEvent} OperationEvent instance
         */
        OperationEvent.create = function create(properties) {
            return new OperationEvent(properties);
        };

        /**
         * Encodes the specified OperationEvent message. Does not implicitly {@link tp.OperationEvent.verify|verify} messages.
         * @function encode
         * @memberof tp.OperationEvent
         * @static
         * @param {tp.IOperationEvent} message OperationEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperationEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.showSeat != null && Object.hasOwnProperty.call(message, "showSeat"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.showSeat);
            if (message.packReason != null && Object.hasOwnProperty.call(message, "packReason"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.packReason);
            return writer;
        };

        /**
         * Encodes the specified OperationEvent message, length delimited. Does not implicitly {@link tp.OperationEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tp.OperationEvent
         * @static
         * @param {tp.IOperationEvent} message OperationEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperationEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OperationEvent message from the specified reader or buffer.
         * @function decode
         * @memberof tp.OperationEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tp.OperationEvent} OperationEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OperationEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tp.OperationEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat = reader.int32();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    message.showSeat = reader.int32();
                    break;
                case 4:
                    message.packReason = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OperationEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tp.OperationEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tp.OperationEvent} OperationEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OperationEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OperationEvent message.
         * @function verify
         * @memberof tp.OperationEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OperationEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            if (message.showSeat != null && message.hasOwnProperty("showSeat"))
                if (!$util.isInteger(message.showSeat))
                    return "showSeat: integer expected";
            if (message.packReason != null && message.hasOwnProperty("packReason"))
                if (!$util.isInteger(message.packReason))
                    return "packReason: integer expected";
            return null;
        };

        /**
         * Creates an OperationEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tp.OperationEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tp.OperationEvent} OperationEvent
         */
        OperationEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.tp.OperationEvent)
                return object;
            let message = new $root.tp.OperationEvent();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.type != null)
                message.type = object.type | 0;
            if (object.showSeat != null)
                message.showSeat = object.showSeat | 0;
            if (object.packReason != null)
                message.packReason = object.packReason | 0;
            return message;
        };

        /**
         * Creates a plain object from an OperationEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tp.OperationEvent
         * @static
         * @param {tp.OperationEvent} message OperationEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OperationEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seat = 0;
                object.type = 0;
                object.showSeat = 0;
                object.packReason = 0;
            }
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.showSeat != null && message.hasOwnProperty("showSeat"))
                object.showSeat = message.showSeat;
            if (message.packReason != null && message.hasOwnProperty("packReason"))
                object.packReason = message.packReason;
            return object;
        };

        /**
         * Converts this OperationEvent to JSON.
         * @function toJSON
         * @memberof tp.OperationEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OperationEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OperationEvent;
    })();

    /**
     * PACK_REASON enum.
     * @name tp.PACK_REASON
     * @enum {number}
     * @property {number} PR_NONE=0 PR_NONE value
     * @property {number} PR_PLAYER=1 PR_PLAYER value
     * @property {number} PR_EXIT=2 PR_EXIT value
     * @property {number} PR_TIMEOUT=3 PR_TIMEOUT value
     * @property {number} PR_LOSE=4 PR_LOSE value
     * @property {number} PR_BALANCE=5 PR_BALANCE value
     */
    tp.PACK_REASON = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "PR_NONE"] = 0;
        values[valuesById[1] = "PR_PLAYER"] = 1;
        values[valuesById[2] = "PR_EXIT"] = 2;
        values[valuesById[3] = "PR_TIMEOUT"] = 3;
        values[valuesById[4] = "PR_LOSE"] = 4;
        values[valuesById[5] = "PR_BALANCE"] = 5;
        return values;
    })();

    tp.ShowCardsEvent = (function() {

        /**
         * Properties of a ShowCardsEvent.
         * @memberof tp
         * @interface IShowCardsEvent
         * @property {Array.<number>|null} [winnerSeats] ShowCardsEvent winnerSeats
         * @property {Array.<tp.ISeatCards>|null} [seatCards] ShowCardsEvent seatCards
         */

        /**
         * Constructs a new ShowCardsEvent.
         * @memberof tp
         * @classdesc Represents a ShowCardsEvent.
         * @implements IShowCardsEvent
         * @constructor
         * @param {tp.IShowCardsEvent=} [properties] Properties to set
         */
        function ShowCardsEvent(properties) {
            this.winnerSeats = [];
            this.seatCards = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ShowCardsEvent winnerSeats.
         * @member {Array.<number>} winnerSeats
         * @memberof tp.ShowCardsEvent
         * @instance
         */
        ShowCardsEvent.prototype.winnerSeats = $util.emptyArray;

        /**
         * ShowCardsEvent seatCards.
         * @member {Array.<tp.ISeatCards>} seatCards
         * @memberof tp.ShowCardsEvent
         * @instance
         */
        ShowCardsEvent.prototype.seatCards = $util.emptyArray;

        /**
         * Creates a new ShowCardsEvent instance using the specified properties.
         * @function create
         * @memberof tp.ShowCardsEvent
         * @static
         * @param {tp.IShowCardsEvent=} [properties] Properties to set
         * @returns {tp.ShowCardsEvent} ShowCardsEvent instance
         */
        ShowCardsEvent.create = function create(properties) {
            return new ShowCardsEvent(properties);
        };

        /**
         * Encodes the specified ShowCardsEvent message. Does not implicitly {@link tp.ShowCardsEvent.verify|verify} messages.
         * @function encode
         * @memberof tp.ShowCardsEvent
         * @static
         * @param {tp.IShowCardsEvent} message ShowCardsEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ShowCardsEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.winnerSeats != null && message.winnerSeats.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.winnerSeats.length; ++i)
                    writer.int32(message.winnerSeats[i]);
                writer.ldelim();
            }
            if (message.seatCards != null && message.seatCards.length)
                for (let i = 0; i < message.seatCards.length; ++i)
                    $root.tp.SeatCards.encode(message.seatCards[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ShowCardsEvent message, length delimited. Does not implicitly {@link tp.ShowCardsEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tp.ShowCardsEvent
         * @static
         * @param {tp.IShowCardsEvent} message ShowCardsEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ShowCardsEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ShowCardsEvent message from the specified reader or buffer.
         * @function decode
         * @memberof tp.ShowCardsEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tp.ShowCardsEvent} ShowCardsEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ShowCardsEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tp.ShowCardsEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.winnerSeats && message.winnerSeats.length))
                        message.winnerSeats = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.winnerSeats.push(reader.int32());
                    } else
                        message.winnerSeats.push(reader.int32());
                    break;
                case 2:
                    if (!(message.seatCards && message.seatCards.length))
                        message.seatCards = [];
                    message.seatCards.push($root.tp.SeatCards.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ShowCardsEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tp.ShowCardsEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tp.ShowCardsEvent} ShowCardsEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ShowCardsEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ShowCardsEvent message.
         * @function verify
         * @memberof tp.ShowCardsEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ShowCardsEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.winnerSeats != null && message.hasOwnProperty("winnerSeats")) {
                if (!Array.isArray(message.winnerSeats))
                    return "winnerSeats: array expected";
                for (let i = 0; i < message.winnerSeats.length; ++i)
                    if (!$util.isInteger(message.winnerSeats[i]))
                        return "winnerSeats: integer[] expected";
            }
            if (message.seatCards != null && message.hasOwnProperty("seatCards")) {
                if (!Array.isArray(message.seatCards))
                    return "seatCards: array expected";
                for (let i = 0; i < message.seatCards.length; ++i) {
                    let error = $root.tp.SeatCards.verify(message.seatCards[i]);
                    if (error)
                        return "seatCards." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ShowCardsEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tp.ShowCardsEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tp.ShowCardsEvent} ShowCardsEvent
         */
        ShowCardsEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.tp.ShowCardsEvent)
                return object;
            let message = new $root.tp.ShowCardsEvent();
            if (object.winnerSeats) {
                if (!Array.isArray(object.winnerSeats))
                    throw TypeError(".tp.ShowCardsEvent.winnerSeats: array expected");
                message.winnerSeats = [];
                for (let i = 0; i < object.winnerSeats.length; ++i)
                    message.winnerSeats[i] = object.winnerSeats[i] | 0;
            }
            if (object.seatCards) {
                if (!Array.isArray(object.seatCards))
                    throw TypeError(".tp.ShowCardsEvent.seatCards: array expected");
                message.seatCards = [];
                for (let i = 0; i < object.seatCards.length; ++i) {
                    if (typeof object.seatCards[i] !== "object")
                        throw TypeError(".tp.ShowCardsEvent.seatCards: object expected");
                    message.seatCards[i] = $root.tp.SeatCards.fromObject(object.seatCards[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ShowCardsEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tp.ShowCardsEvent
         * @static
         * @param {tp.ShowCardsEvent} message ShowCardsEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ShowCardsEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.winnerSeats = [];
                object.seatCards = [];
            }
            if (message.winnerSeats && message.winnerSeats.length) {
                object.winnerSeats = [];
                for (let j = 0; j < message.winnerSeats.length; ++j)
                    object.winnerSeats[j] = message.winnerSeats[j];
            }
            if (message.seatCards && message.seatCards.length) {
                object.seatCards = [];
                for (let j = 0; j < message.seatCards.length; ++j)
                    object.seatCards[j] = $root.tp.SeatCards.toObject(message.seatCards[j], options);
            }
            return object;
        };

        /**
         * Converts this ShowCardsEvent to JSON.
         * @function toJSON
         * @memberof tp.ShowCardsEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ShowCardsEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ShowCardsEvent;
    })();

    tp.SeatCards = (function() {

        /**
         * Properties of a SeatCards.
         * @memberof tp
         * @interface ISeatCards
         * @property {number|null} [seat] SeatCards seat
         * @property {tp.ICardSet|null} [cardSet] SeatCards cardSet
         */

        /**
         * Constructs a new SeatCards.
         * @memberof tp
         * @classdesc Represents a SeatCards.
         * @implements ISeatCards
         * @constructor
         * @param {tp.ISeatCards=} [properties] Properties to set
         */
        function SeatCards(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SeatCards seat.
         * @member {number} seat
         * @memberof tp.SeatCards
         * @instance
         */
        SeatCards.prototype.seat = 0;

        /**
         * SeatCards cardSet.
         * @member {tp.ICardSet|null|undefined} cardSet
         * @memberof tp.SeatCards
         * @instance
         */
        SeatCards.prototype.cardSet = null;

        /**
         * Creates a new SeatCards instance using the specified properties.
         * @function create
         * @memberof tp.SeatCards
         * @static
         * @param {tp.ISeatCards=} [properties] Properties to set
         * @returns {tp.SeatCards} SeatCards instance
         */
        SeatCards.create = function create(properties) {
            return new SeatCards(properties);
        };

        /**
         * Encodes the specified SeatCards message. Does not implicitly {@link tp.SeatCards.verify|verify} messages.
         * @function encode
         * @memberof tp.SeatCards
         * @static
         * @param {tp.ISeatCards} message SeatCards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatCards.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            if (message.cardSet != null && Object.hasOwnProperty.call(message, "cardSet"))
                $root.tp.CardSet.encode(message.cardSet, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SeatCards message, length delimited. Does not implicitly {@link tp.SeatCards.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tp.SeatCards
         * @static
         * @param {tp.ISeatCards} message SeatCards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatCards.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeatCards message from the specified reader or buffer.
         * @function decode
         * @memberof tp.SeatCards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tp.SeatCards} SeatCards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatCards.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tp.SeatCards();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat = reader.int32();
                    break;
                case 2:
                    message.cardSet = $root.tp.CardSet.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SeatCards message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tp.SeatCards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tp.SeatCards} SeatCards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatCards.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SeatCards message.
         * @function verify
         * @memberof tp.SeatCards
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SeatCards.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            if (message.cardSet != null && message.hasOwnProperty("cardSet")) {
                let error = $root.tp.CardSet.verify(message.cardSet);
                if (error)
                    return "cardSet." + error;
            }
            return null;
        };

        /**
         * Creates a SeatCards message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tp.SeatCards
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tp.SeatCards} SeatCards
         */
        SeatCards.fromObject = function fromObject(object) {
            if (object instanceof $root.tp.SeatCards)
                return object;
            let message = new $root.tp.SeatCards();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.cardSet != null) {
                if (typeof object.cardSet !== "object")
                    throw TypeError(".tp.SeatCards.cardSet: object expected");
                message.cardSet = $root.tp.CardSet.fromObject(object.cardSet);
            }
            return message;
        };

        /**
         * Creates a plain object from a SeatCards message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tp.SeatCards
         * @static
         * @param {tp.SeatCards} message SeatCards
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeatCards.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seat = 0;
                object.cardSet = null;
            }
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.cardSet != null && message.hasOwnProperty("cardSet"))
                object.cardSet = $root.tp.CardSet.toObject(message.cardSet, options);
            return object;
        };

        /**
         * Converts this SeatCards to JSON.
         * @function toJSON
         * @memberof tp.SeatCards
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeatCards.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeatCards;
    })();

    tp.GameEndEvent = (function() {

        /**
         * Properties of a GameEndEvent.
         * @memberof tp
         * @interface IGameEndEvent
         * @property {number|null} [winBet] GameEndEvent winBet
         * @property {Array.<number>|null} [winnerSeats] GameEndEvent winnerSeats
         * @property {Array.<number>|null} [winBets] GameEndEvent winBets
         */

        /**
         * Constructs a new GameEndEvent.
         * @memberof tp
         * @classdesc Represents a GameEndEvent.
         * @implements IGameEndEvent
         * @constructor
         * @param {tp.IGameEndEvent=} [properties] Properties to set
         */
        function GameEndEvent(properties) {
            this.winnerSeats = [];
            this.winBets = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameEndEvent winBet.
         * @member {number} winBet
         * @memberof tp.GameEndEvent
         * @instance
         */
        GameEndEvent.prototype.winBet = 0;

        /**
         * GameEndEvent winnerSeats.
         * @member {Array.<number>} winnerSeats
         * @memberof tp.GameEndEvent
         * @instance
         */
        GameEndEvent.prototype.winnerSeats = $util.emptyArray;

        /**
         * GameEndEvent winBets.
         * @member {Array.<number>} winBets
         * @memberof tp.GameEndEvent
         * @instance
         */
        GameEndEvent.prototype.winBets = $util.emptyArray;

        /**
         * Creates a new GameEndEvent instance using the specified properties.
         * @function create
         * @memberof tp.GameEndEvent
         * @static
         * @param {tp.IGameEndEvent=} [properties] Properties to set
         * @returns {tp.GameEndEvent} GameEndEvent instance
         */
        GameEndEvent.create = function create(properties) {
            return new GameEndEvent(properties);
        };

        /**
         * Encodes the specified GameEndEvent message. Does not implicitly {@link tp.GameEndEvent.verify|verify} messages.
         * @function encode
         * @memberof tp.GameEndEvent
         * @static
         * @param {tp.IGameEndEvent} message GameEndEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameEndEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.winBet != null && Object.hasOwnProperty.call(message, "winBet"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.winBet);
            if (message.winnerSeats != null && message.winnerSeats.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.winnerSeats.length; ++i)
                    writer.int32(message.winnerSeats[i]);
                writer.ldelim();
            }
            if (message.winBets != null && message.winBets.length) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork();
                for (let i = 0; i < message.winBets.length; ++i)
                    writer.int32(message.winBets[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified GameEndEvent message, length delimited. Does not implicitly {@link tp.GameEndEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tp.GameEndEvent
         * @static
         * @param {tp.IGameEndEvent} message GameEndEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameEndEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameEndEvent message from the specified reader or buffer.
         * @function decode
         * @memberof tp.GameEndEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tp.GameEndEvent} GameEndEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameEndEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tp.GameEndEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.winBet = reader.int32();
                    break;
                case 2:
                    if (!(message.winnerSeats && message.winnerSeats.length))
                        message.winnerSeats = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.winnerSeats.push(reader.int32());
                    } else
                        message.winnerSeats.push(reader.int32());
                    break;
                case 3:
                    if (!(message.winBets && message.winBets.length))
                        message.winBets = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.winBets.push(reader.int32());
                    } else
                        message.winBets.push(reader.int32());
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
         * @memberof tp.GameEndEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tp.GameEndEvent} GameEndEvent
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
         * @memberof tp.GameEndEvent
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
            if (message.winnerSeats != null && message.hasOwnProperty("winnerSeats")) {
                if (!Array.isArray(message.winnerSeats))
                    return "winnerSeats: array expected";
                for (let i = 0; i < message.winnerSeats.length; ++i)
                    if (!$util.isInteger(message.winnerSeats[i]))
                        return "winnerSeats: integer[] expected";
            }
            if (message.winBets != null && message.hasOwnProperty("winBets")) {
                if (!Array.isArray(message.winBets))
                    return "winBets: array expected";
                for (let i = 0; i < message.winBets.length; ++i)
                    if (!$util.isInteger(message.winBets[i]))
                        return "winBets: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a GameEndEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tp.GameEndEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tp.GameEndEvent} GameEndEvent
         */
        GameEndEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.tp.GameEndEvent)
                return object;
            let message = new $root.tp.GameEndEvent();
            if (object.winBet != null)
                message.winBet = object.winBet | 0;
            if (object.winnerSeats) {
                if (!Array.isArray(object.winnerSeats))
                    throw TypeError(".tp.GameEndEvent.winnerSeats: array expected");
                message.winnerSeats = [];
                for (let i = 0; i < object.winnerSeats.length; ++i)
                    message.winnerSeats[i] = object.winnerSeats[i] | 0;
            }
            if (object.winBets) {
                if (!Array.isArray(object.winBets))
                    throw TypeError(".tp.GameEndEvent.winBets: array expected");
                message.winBets = [];
                for (let i = 0; i < object.winBets.length; ++i)
                    message.winBets[i] = object.winBets[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a GameEndEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tp.GameEndEvent
         * @static
         * @param {tp.GameEndEvent} message GameEndEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameEndEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.winnerSeats = [];
                object.winBets = [];
            }
            if (options.defaults)
                object.winBet = 0;
            if (message.winBet != null && message.hasOwnProperty("winBet"))
                object.winBet = message.winBet;
            if (message.winnerSeats && message.winnerSeats.length) {
                object.winnerSeats = [];
                for (let j = 0; j < message.winnerSeats.length; ++j)
                    object.winnerSeats[j] = message.winnerSeats[j];
            }
            if (message.winBets && message.winBets.length) {
                object.winBets = [];
                for (let j = 0; j < message.winBets.length; ++j)
                    object.winBets[j] = message.winBets[j];
            }
            return object;
        };

        /**
         * Converts this GameEndEvent to JSON.
         * @function toJSON
         * @memberof tp.GameEndEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameEndEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameEndEvent;
    })();

    return tp;
})();

export { $root as default };
