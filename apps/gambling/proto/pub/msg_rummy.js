/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const rummy = $root.rummy = (() => {

    /**
     * Namespace rummy.
     * @exports rummy
     * @namespace
     */
    const rummy = {};

    /**
     * DEADLINE_TYPE enum.
     * @name rummy.DEADLINE_TYPE
     * @enum {number}
     * @property {number} DT_NONE=0 DT_NONE value
     * @property {number} START=1 START value
     * @property {number} OPERATION=2 OPERATION value
     * @property {number} DECLARE=3 DECLARE value
     * @property {number} DISPLAY=4 DISPLAY value
     */
    rummy.DEADLINE_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DT_NONE"] = 0;
        values[valuesById[1] = "START"] = 1;
        values[valuesById[2] = "OPERATION"] = 2;
        values[valuesById[3] = "DECLARE"] = 3;
        values[valuesById[4] = "DISPLAY"] = 4;
        return values;
    })();

    rummy.GameStartEvent = (function() {

        /**
         * Properties of a GameStartEvent.
         * @memberof rummy
         * @interface IGameStartEvent
         * @property {number|null} [buttonSeat] GameStartEvent buttonSeat
         * @property {Array.<number>|null} [seats] GameStartEvent seats
         * @property {number|null} [winLose] GameStartEvent winLose
         * @property {number|null} [maxPlayer] GameStartEvent maxPlayer
         * @property {number|null} [realSeat] GameStartEvent realSeat
         */

        /**
         * Constructs a new GameStartEvent.
         * @memberof rummy
         * @classdesc Represents a GameStartEvent.
         * @implements IGameStartEvent
         * @constructor
         * @param {rummy.IGameStartEvent=} [properties] Properties to set
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
         * @memberof rummy.GameStartEvent
         * @instance
         */
        GameStartEvent.prototype.buttonSeat = 0;

        /**
         * GameStartEvent seats.
         * @member {Array.<number>} seats
         * @memberof rummy.GameStartEvent
         * @instance
         */
        GameStartEvent.prototype.seats = $util.emptyArray;

        /**
         * GameStartEvent winLose.
         * @member {number} winLose
         * @memberof rummy.GameStartEvent
         * @instance
         */
        GameStartEvent.prototype.winLose = 0;

        /**
         * GameStartEvent maxPlayer.
         * @member {number} maxPlayer
         * @memberof rummy.GameStartEvent
         * @instance
         */
        GameStartEvent.prototype.maxPlayer = 0;

        /**
         * GameStartEvent realSeat.
         * @member {number} realSeat
         * @memberof rummy.GameStartEvent
         * @instance
         */
        GameStartEvent.prototype.realSeat = 0;

        /**
         * Creates a new GameStartEvent instance using the specified properties.
         * @function create
         * @memberof rummy.GameStartEvent
         * @static
         * @param {rummy.IGameStartEvent=} [properties] Properties to set
         * @returns {rummy.GameStartEvent} GameStartEvent instance
         */
        GameStartEvent.create = function create(properties) {
            return new GameStartEvent(properties);
        };

        /**
         * Encodes the specified GameStartEvent message. Does not implicitly {@link rummy.GameStartEvent.verify|verify} messages.
         * @function encode
         * @memberof rummy.GameStartEvent
         * @static
         * @param {rummy.IGameStartEvent} message GameStartEvent message or plain object to encode
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
            if (message.winLose != null && Object.hasOwnProperty.call(message, "winLose"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.winLose);
            if (message.maxPlayer != null && Object.hasOwnProperty.call(message, "maxPlayer"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.maxPlayer);
            if (message.realSeat != null && Object.hasOwnProperty.call(message, "realSeat"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.realSeat);
            return writer;
        };

        /**
         * Encodes the specified GameStartEvent message, length delimited. Does not implicitly {@link rummy.GameStartEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rummy.GameStartEvent
         * @static
         * @param {rummy.IGameStartEvent} message GameStartEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStartEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameStartEvent message from the specified reader or buffer.
         * @function decode
         * @memberof rummy.GameStartEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rummy.GameStartEvent} GameStartEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStartEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rummy.GameStartEvent();
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
                    message.winLose = reader.int32();
                    break;
                case 4:
                    message.maxPlayer = reader.int32();
                    break;
                case 5:
                    message.realSeat = reader.int32();
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
         * @memberof rummy.GameStartEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rummy.GameStartEvent} GameStartEvent
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
         * @memberof rummy.GameStartEvent
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
            if (message.winLose != null && message.hasOwnProperty("winLose"))
                if (!$util.isInteger(message.winLose))
                    return "winLose: integer expected";
            if (message.maxPlayer != null && message.hasOwnProperty("maxPlayer"))
                if (!$util.isInteger(message.maxPlayer))
                    return "maxPlayer: integer expected";
            if (message.realSeat != null && message.hasOwnProperty("realSeat"))
                if (!$util.isInteger(message.realSeat))
                    return "realSeat: integer expected";
            return null;
        };

        /**
         * Creates a GameStartEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rummy.GameStartEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rummy.GameStartEvent} GameStartEvent
         */
        GameStartEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.rummy.GameStartEvent)
                return object;
            let message = new $root.rummy.GameStartEvent();
            if (object.buttonSeat != null)
                message.buttonSeat = object.buttonSeat | 0;
            if (object.seats) {
                if (!Array.isArray(object.seats))
                    throw TypeError(".rummy.GameStartEvent.seats: array expected");
                message.seats = [];
                for (let i = 0; i < object.seats.length; ++i)
                    message.seats[i] = object.seats[i] | 0;
            }
            if (object.winLose != null)
                message.winLose = object.winLose | 0;
            if (object.maxPlayer != null)
                message.maxPlayer = object.maxPlayer | 0;
            if (object.realSeat != null)
                message.realSeat = object.realSeat | 0;
            return message;
        };

        /**
         * Creates a plain object from a GameStartEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rummy.GameStartEvent
         * @static
         * @param {rummy.GameStartEvent} message GameStartEvent
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
                object.winLose = 0;
                object.maxPlayer = 0;
                object.realSeat = 0;
            }
            if (message.buttonSeat != null && message.hasOwnProperty("buttonSeat"))
                object.buttonSeat = message.buttonSeat;
            if (message.seats && message.seats.length) {
                object.seats = [];
                for (let j = 0; j < message.seats.length; ++j)
                    object.seats[j] = message.seats[j];
            }
            if (message.winLose != null && message.hasOwnProperty("winLose"))
                object.winLose = message.winLose;
            if (message.maxPlayer != null && message.hasOwnProperty("maxPlayer"))
                object.maxPlayer = message.maxPlayer;
            if (message.realSeat != null && message.hasOwnProperty("realSeat"))
                object.realSeat = message.realSeat;
            return object;
        };

        /**
         * Converts this GameStartEvent to JSON.
         * @function toJSON
         * @memberof rummy.GameStartEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameStartEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameStartEvent;
    })();

    rummy.ButtonSeatEvent = (function() {

        /**
         * Properties of a ButtonSeatEvent.
         * @memberof rummy
         * @interface IButtonSeatEvent
         * @property {number|null} [seat] ButtonSeatEvent seat
         */

        /**
         * Constructs a new ButtonSeatEvent.
         * @memberof rummy
         * @classdesc Represents a ButtonSeatEvent.
         * @implements IButtonSeatEvent
         * @constructor
         * @param {rummy.IButtonSeatEvent=} [properties] Properties to set
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
         * @memberof rummy.ButtonSeatEvent
         * @instance
         */
        ButtonSeatEvent.prototype.seat = 0;

        /**
         * Creates a new ButtonSeatEvent instance using the specified properties.
         * @function create
         * @memberof rummy.ButtonSeatEvent
         * @static
         * @param {rummy.IButtonSeatEvent=} [properties] Properties to set
         * @returns {rummy.ButtonSeatEvent} ButtonSeatEvent instance
         */
        ButtonSeatEvent.create = function create(properties) {
            return new ButtonSeatEvent(properties);
        };

        /**
         * Encodes the specified ButtonSeatEvent message. Does not implicitly {@link rummy.ButtonSeatEvent.verify|verify} messages.
         * @function encode
         * @memberof rummy.ButtonSeatEvent
         * @static
         * @param {rummy.IButtonSeatEvent} message ButtonSeatEvent message or plain object to encode
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
         * Encodes the specified ButtonSeatEvent message, length delimited. Does not implicitly {@link rummy.ButtonSeatEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rummy.ButtonSeatEvent
         * @static
         * @param {rummy.IButtonSeatEvent} message ButtonSeatEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ButtonSeatEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ButtonSeatEvent message from the specified reader or buffer.
         * @function decode
         * @memberof rummy.ButtonSeatEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rummy.ButtonSeatEvent} ButtonSeatEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ButtonSeatEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rummy.ButtonSeatEvent();
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
         * @memberof rummy.ButtonSeatEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rummy.ButtonSeatEvent} ButtonSeatEvent
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
         * @memberof rummy.ButtonSeatEvent
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
         * @memberof rummy.ButtonSeatEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rummy.ButtonSeatEvent} ButtonSeatEvent
         */
        ButtonSeatEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.rummy.ButtonSeatEvent)
                return object;
            let message = new $root.rummy.ButtonSeatEvent();
            if (object.seat != null)
                message.seat = object.seat | 0;
            return message;
        };

        /**
         * Creates a plain object from a ButtonSeatEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rummy.ButtonSeatEvent
         * @static
         * @param {rummy.ButtonSeatEvent} message ButtonSeatEvent
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
         * @memberof rummy.ButtonSeatEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ButtonSeatEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ButtonSeatEvent;
    })();

    rummy.TableStateEvent = (function() {

        /**
         * Properties of a TableStateEvent.
         * @memberof rummy
         * @interface ITableStateEvent
         * @property {string|null} [gameCode] TableStateEvent gameCode
         * @property {number|null} [versatileCard] TableStateEvent versatileCard
         * @property {Array.<number>|null} [discardPile] TableStateEvent discardPile
         * @property {boolean|null} [canDrawDiscard] TableStateEvent canDrawDiscard
         * @property {Array.<rummy.ISeatState>|null} [seatStates] TableStateEvent seatStates
         * @property {number|null} [nextReal] TableStateEvent nextReal
         * @property {number|null} [playerDraw] TableStateEvent playerDraw
         */

        /**
         * Constructs a new TableStateEvent.
         * @memberof rummy
         * @classdesc Represents a TableStateEvent.
         * @implements ITableStateEvent
         * @constructor
         * @param {rummy.ITableStateEvent=} [properties] Properties to set
         */
        function TableStateEvent(properties) {
            this.discardPile = [];
            this.seatStates = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TableStateEvent gameCode.
         * @member {string} gameCode
         * @memberof rummy.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.gameCode = "";

        /**
         * TableStateEvent versatileCard.
         * @member {number} versatileCard
         * @memberof rummy.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.versatileCard = 0;

        /**
         * TableStateEvent discardPile.
         * @member {Array.<number>} discardPile
         * @memberof rummy.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.discardPile = $util.emptyArray;

        /**
         * TableStateEvent canDrawDiscard.
         * @member {boolean} canDrawDiscard
         * @memberof rummy.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.canDrawDiscard = false;

        /**
         * TableStateEvent seatStates.
         * @member {Array.<rummy.ISeatState>} seatStates
         * @memberof rummy.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.seatStates = $util.emptyArray;

        /**
         * TableStateEvent nextReal.
         * @member {number} nextReal
         * @memberof rummy.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.nextReal = 0;

        /**
         * TableStateEvent playerDraw.
         * @member {number} playerDraw
         * @memberof rummy.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.playerDraw = 0;

        /**
         * Creates a new TableStateEvent instance using the specified properties.
         * @function create
         * @memberof rummy.TableStateEvent
         * @static
         * @param {rummy.ITableStateEvent=} [properties] Properties to set
         * @returns {rummy.TableStateEvent} TableStateEvent instance
         */
        TableStateEvent.create = function create(properties) {
            return new TableStateEvent(properties);
        };

        /**
         * Encodes the specified TableStateEvent message. Does not implicitly {@link rummy.TableStateEvent.verify|verify} messages.
         * @function encode
         * @memberof rummy.TableStateEvent
         * @static
         * @param {rummy.ITableStateEvent} message TableStateEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableStateEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameCode != null && Object.hasOwnProperty.call(message, "gameCode"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameCode);
            if (message.versatileCard != null && Object.hasOwnProperty.call(message, "versatileCard"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.versatileCard);
            if (message.discardPile != null && message.discardPile.length) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork();
                for (let i = 0; i < message.discardPile.length; ++i)
                    writer.int32(message.discardPile[i]);
                writer.ldelim();
            }
            if (message.canDrawDiscard != null && Object.hasOwnProperty.call(message, "canDrawDiscard"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.canDrawDiscard);
            if (message.seatStates != null && message.seatStates.length)
                for (let i = 0; i < message.seatStates.length; ++i)
                    $root.rummy.SeatState.encode(message.seatStates[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.nextReal != null && Object.hasOwnProperty.call(message, "nextReal"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.nextReal);
            if (message.playerDraw != null && Object.hasOwnProperty.call(message, "playerDraw"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.playerDraw);
            return writer;
        };

        /**
         * Encodes the specified TableStateEvent message, length delimited. Does not implicitly {@link rummy.TableStateEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rummy.TableStateEvent
         * @static
         * @param {rummy.ITableStateEvent} message TableStateEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableStateEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TableStateEvent message from the specified reader or buffer.
         * @function decode
         * @memberof rummy.TableStateEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rummy.TableStateEvent} TableStateEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableStateEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rummy.TableStateEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameCode = reader.string();
                    break;
                case 2:
                    message.versatileCard = reader.int32();
                    break;
                case 3:
                    if (!(message.discardPile && message.discardPile.length))
                        message.discardPile = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.discardPile.push(reader.int32());
                    } else
                        message.discardPile.push(reader.int32());
                    break;
                case 4:
                    message.canDrawDiscard = reader.bool();
                    break;
                case 5:
                    if (!(message.seatStates && message.seatStates.length))
                        message.seatStates = [];
                    message.seatStates.push($root.rummy.SeatState.decode(reader, reader.uint32()));
                    break;
                case 6:
                    message.nextReal = reader.int32();
                    break;
                case 7:
                    message.playerDraw = reader.int32();
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
         * @memberof rummy.TableStateEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rummy.TableStateEvent} TableStateEvent
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
         * @memberof rummy.TableStateEvent
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
            if (message.versatileCard != null && message.hasOwnProperty("versatileCard"))
                if (!$util.isInteger(message.versatileCard))
                    return "versatileCard: integer expected";
            if (message.discardPile != null && message.hasOwnProperty("discardPile")) {
                if (!Array.isArray(message.discardPile))
                    return "discardPile: array expected";
                for (let i = 0; i < message.discardPile.length; ++i)
                    if (!$util.isInteger(message.discardPile[i]))
                        return "discardPile: integer[] expected";
            }
            if (message.canDrawDiscard != null && message.hasOwnProperty("canDrawDiscard"))
                if (typeof message.canDrawDiscard !== "boolean")
                    return "canDrawDiscard: boolean expected";
            if (message.seatStates != null && message.hasOwnProperty("seatStates")) {
                if (!Array.isArray(message.seatStates))
                    return "seatStates: array expected";
                for (let i = 0; i < message.seatStates.length; ++i) {
                    let error = $root.rummy.SeatState.verify(message.seatStates[i]);
                    if (error)
                        return "seatStates." + error;
                }
            }
            if (message.nextReal != null && message.hasOwnProperty("nextReal"))
                if (!$util.isInteger(message.nextReal))
                    return "nextReal: integer expected";
            if (message.playerDraw != null && message.hasOwnProperty("playerDraw"))
                if (!$util.isInteger(message.playerDraw))
                    return "playerDraw: integer expected";
            return null;
        };

        /**
         * Creates a TableStateEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rummy.TableStateEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rummy.TableStateEvent} TableStateEvent
         */
        TableStateEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.rummy.TableStateEvent)
                return object;
            let message = new $root.rummy.TableStateEvent();
            if (object.gameCode != null)
                message.gameCode = String(object.gameCode);
            if (object.versatileCard != null)
                message.versatileCard = object.versatileCard | 0;
            if (object.discardPile) {
                if (!Array.isArray(object.discardPile))
                    throw TypeError(".rummy.TableStateEvent.discardPile: array expected");
                message.discardPile = [];
                for (let i = 0; i < object.discardPile.length; ++i)
                    message.discardPile[i] = object.discardPile[i] | 0;
            }
            if (object.canDrawDiscard != null)
                message.canDrawDiscard = Boolean(object.canDrawDiscard);
            if (object.seatStates) {
                if (!Array.isArray(object.seatStates))
                    throw TypeError(".rummy.TableStateEvent.seatStates: array expected");
                message.seatStates = [];
                for (let i = 0; i < object.seatStates.length; ++i) {
                    if (typeof object.seatStates[i] !== "object")
                        throw TypeError(".rummy.TableStateEvent.seatStates: object expected");
                    message.seatStates[i] = $root.rummy.SeatState.fromObject(object.seatStates[i]);
                }
            }
            if (object.nextReal != null)
                message.nextReal = object.nextReal | 0;
            if (object.playerDraw != null)
                message.playerDraw = object.playerDraw | 0;
            return message;
        };

        /**
         * Creates a plain object from a TableStateEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rummy.TableStateEvent
         * @static
         * @param {rummy.TableStateEvent} message TableStateEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TableStateEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.discardPile = [];
                object.seatStates = [];
            }
            if (options.defaults) {
                object.gameCode = "";
                object.versatileCard = 0;
                object.canDrawDiscard = false;
                object.nextReal = 0;
                object.playerDraw = 0;
            }
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                object.gameCode = message.gameCode;
            if (message.versatileCard != null && message.hasOwnProperty("versatileCard"))
                object.versatileCard = message.versatileCard;
            if (message.discardPile && message.discardPile.length) {
                object.discardPile = [];
                for (let j = 0; j < message.discardPile.length; ++j)
                    object.discardPile[j] = message.discardPile[j];
            }
            if (message.canDrawDiscard != null && message.hasOwnProperty("canDrawDiscard"))
                object.canDrawDiscard = message.canDrawDiscard;
            if (message.seatStates && message.seatStates.length) {
                object.seatStates = [];
                for (let j = 0; j < message.seatStates.length; ++j)
                    object.seatStates[j] = $root.rummy.SeatState.toObject(message.seatStates[j], options);
            }
            if (message.nextReal != null && message.hasOwnProperty("nextReal"))
                object.nextReal = message.nextReal;
            if (message.playerDraw != null && message.hasOwnProperty("playerDraw"))
                object.playerDraw = message.playerDraw;
            return object;
        };

        /**
         * Converts this TableStateEvent to JSON.
         * @function toJSON
         * @memberof rummy.TableStateEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TableStateEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TableStateEvent;
    })();

    rummy.SeatState = (function() {

        /**
         * Properties of a SeatState.
         * @memberof rummy
         * @interface ISeatState
         * @property {number|null} [seat] SeatState seat
         * @property {number|null} [state] SeatState state
         * @property {number|null} [dropAmount] SeatState dropAmount
         * @property {number|null} [settledAmount] SeatState settledAmount
         */

        /**
         * Constructs a new SeatState.
         * @memberof rummy
         * @classdesc Represents a SeatState.
         * @implements ISeatState
         * @constructor
         * @param {rummy.ISeatState=} [properties] Properties to set
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
         * @memberof rummy.SeatState
         * @instance
         */
        SeatState.prototype.seat = 0;

        /**
         * SeatState state.
         * @member {number} state
         * @memberof rummy.SeatState
         * @instance
         */
        SeatState.prototype.state = 0;

        /**
         * SeatState dropAmount.
         * @member {number} dropAmount
         * @memberof rummy.SeatState
         * @instance
         */
        SeatState.prototype.dropAmount = 0;

        /**
         * SeatState settledAmount.
         * @member {number} settledAmount
         * @memberof rummy.SeatState
         * @instance
         */
        SeatState.prototype.settledAmount = 0;

        /**
         * Creates a new SeatState instance using the specified properties.
         * @function create
         * @memberof rummy.SeatState
         * @static
         * @param {rummy.ISeatState=} [properties] Properties to set
         * @returns {rummy.SeatState} SeatState instance
         */
        SeatState.create = function create(properties) {
            return new SeatState(properties);
        };

        /**
         * Encodes the specified SeatState message. Does not implicitly {@link rummy.SeatState.verify|verify} messages.
         * @function encode
         * @memberof rummy.SeatState
         * @static
         * @param {rummy.ISeatState} message SeatState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.state);
            if (message.dropAmount != null && Object.hasOwnProperty.call(message, "dropAmount"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.dropAmount);
            if (message.settledAmount != null && Object.hasOwnProperty.call(message, "settledAmount"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.settledAmount);
            return writer;
        };

        /**
         * Encodes the specified SeatState message, length delimited. Does not implicitly {@link rummy.SeatState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rummy.SeatState
         * @static
         * @param {rummy.ISeatState} message SeatState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeatState message from the specified reader or buffer.
         * @function decode
         * @memberof rummy.SeatState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rummy.SeatState} SeatState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rummy.SeatState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat = reader.int32();
                    break;
                case 2:
                    message.state = reader.int32();
                    break;
                case 3:
                    message.dropAmount = reader.int32();
                    break;
                case 4:
                    message.settledAmount = reader.int32();
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
         * @memberof rummy.SeatState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rummy.SeatState} SeatState
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
         * @memberof rummy.SeatState
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
            if (message.state != null && message.hasOwnProperty("state"))
                if (!$util.isInteger(message.state))
                    return "state: integer expected";
            if (message.dropAmount != null && message.hasOwnProperty("dropAmount"))
                if (!$util.isInteger(message.dropAmount))
                    return "dropAmount: integer expected";
            if (message.settledAmount != null && message.hasOwnProperty("settledAmount"))
                if (!$util.isInteger(message.settledAmount))
                    return "settledAmount: integer expected";
            return null;
        };

        /**
         * Creates a SeatState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rummy.SeatState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rummy.SeatState} SeatState
         */
        SeatState.fromObject = function fromObject(object) {
            if (object instanceof $root.rummy.SeatState)
                return object;
            let message = new $root.rummy.SeatState();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.state != null)
                message.state = object.state | 0;
            if (object.dropAmount != null)
                message.dropAmount = object.dropAmount | 0;
            if (object.settledAmount != null)
                message.settledAmount = object.settledAmount | 0;
            return message;
        };

        /**
         * Creates a plain object from a SeatState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rummy.SeatState
         * @static
         * @param {rummy.SeatState} message SeatState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeatState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seat = 0;
                object.state = 0;
                object.dropAmount = 0;
                object.settledAmount = 0;
            }
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = message.state;
            if (message.dropAmount != null && message.hasOwnProperty("dropAmount"))
                object.dropAmount = message.dropAmount;
            if (message.settledAmount != null && message.hasOwnProperty("settledAmount"))
                object.settledAmount = message.settledAmount;
            return object;
        };

        /**
         * Converts this SeatState to JSON.
         * @function toJSON
         * @memberof rummy.SeatState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeatState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeatState;
    })();

    /**
     * STATE_TYPE enum.
     * @name rummy.STATE_TYPE
     * @enum {number}
     * @property {number} ST_NONE=0 ST_NONE value
     * @property {number} ST_PLAYING=1 ST_PLAYING value
     * @property {number} ST_DROPPED=2 ST_DROPPED value
     * @property {number} ST_DECLARED=3 ST_DECLARED value
     * @property {number} ST_FINISHED=4 ST_FINISHED value
     * @property {number} ST_CONFIRMED=5 ST_CONFIRMED value
     */
    rummy.STATE_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ST_NONE"] = 0;
        values[valuesById[1] = "ST_PLAYING"] = 1;
        values[valuesById[2] = "ST_DROPPED"] = 2;
        values[valuesById[3] = "ST_DECLARED"] = 3;
        values[valuesById[4] = "ST_FINISHED"] = 4;
        values[valuesById[5] = "ST_CONFIRMED"] = 5;
        return values;
    })();

    rummy.DealCardsEvent = (function() {

        /**
         * Properties of a DealCardsEvent.
         * @memberof rummy
         * @interface IDealCardsEvent
         * @property {Array.<number>|null} [cards] DealCardsEvent cards
         * @property {number|null} [drop] DealCardsEvent drop
         */

        /**
         * Constructs a new DealCardsEvent.
         * @memberof rummy
         * @classdesc Represents a DealCardsEvent.
         * @implements IDealCardsEvent
         * @constructor
         * @param {rummy.IDealCardsEvent=} [properties] Properties to set
         */
        function DealCardsEvent(properties) {
            this.cards = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DealCardsEvent cards.
         * @member {Array.<number>} cards
         * @memberof rummy.DealCardsEvent
         * @instance
         */
        DealCardsEvent.prototype.cards = $util.emptyArray;

        /**
         * DealCardsEvent drop.
         * @member {number} drop
         * @memberof rummy.DealCardsEvent
         * @instance
         */
        DealCardsEvent.prototype.drop = 0;

        /**
         * Creates a new DealCardsEvent instance using the specified properties.
         * @function create
         * @memberof rummy.DealCardsEvent
         * @static
         * @param {rummy.IDealCardsEvent=} [properties] Properties to set
         * @returns {rummy.DealCardsEvent} DealCardsEvent instance
         */
        DealCardsEvent.create = function create(properties) {
            return new DealCardsEvent(properties);
        };

        /**
         * Encodes the specified DealCardsEvent message. Does not implicitly {@link rummy.DealCardsEvent.verify|verify} messages.
         * @function encode
         * @memberof rummy.DealCardsEvent
         * @static
         * @param {rummy.IDealCardsEvent} message DealCardsEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DealCardsEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cards != null && message.cards.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.cards.length; ++i)
                    writer.int32(message.cards[i]);
                writer.ldelim();
            }
            if (message.drop != null && Object.hasOwnProperty.call(message, "drop"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.drop);
            return writer;
        };

        /**
         * Encodes the specified DealCardsEvent message, length delimited. Does not implicitly {@link rummy.DealCardsEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rummy.DealCardsEvent
         * @static
         * @param {rummy.IDealCardsEvent} message DealCardsEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DealCardsEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DealCardsEvent message from the specified reader or buffer.
         * @function decode
         * @memberof rummy.DealCardsEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rummy.DealCardsEvent} DealCardsEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DealCardsEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rummy.DealCardsEvent();
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
                    message.drop = reader.int32();
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
         * @memberof rummy.DealCardsEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rummy.DealCardsEvent} DealCardsEvent
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
         * @memberof rummy.DealCardsEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DealCardsEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cards != null && message.hasOwnProperty("cards")) {
                if (!Array.isArray(message.cards))
                    return "cards: array expected";
                for (let i = 0; i < message.cards.length; ++i)
                    if (!$util.isInteger(message.cards[i]))
                        return "cards: integer[] expected";
            }
            if (message.drop != null && message.hasOwnProperty("drop"))
                if (!$util.isInteger(message.drop))
                    return "drop: integer expected";
            return null;
        };

        /**
         * Creates a DealCardsEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rummy.DealCardsEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rummy.DealCardsEvent} DealCardsEvent
         */
        DealCardsEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.rummy.DealCardsEvent)
                return object;
            let message = new $root.rummy.DealCardsEvent();
            if (object.cards) {
                if (!Array.isArray(object.cards))
                    throw TypeError(".rummy.DealCardsEvent.cards: array expected");
                message.cards = [];
                for (let i = 0; i < object.cards.length; ++i)
                    message.cards[i] = object.cards[i] | 0;
            }
            if (object.drop != null)
                message.drop = object.drop | 0;
            return message;
        };

        /**
         * Creates a plain object from a DealCardsEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rummy.DealCardsEvent
         * @static
         * @param {rummy.DealCardsEvent} message DealCardsEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DealCardsEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.cards = [];
            if (options.defaults)
                object.drop = 0;
            if (message.cards && message.cards.length) {
                object.cards = [];
                for (let j = 0; j < message.cards.length; ++j)
                    object.cards[j] = message.cards[j];
            }
            if (message.drop != null && message.hasOwnProperty("drop"))
                object.drop = message.drop;
            return object;
        };

        /**
         * Converts this DealCardsEvent to JSON.
         * @function toJSON
         * @memberof rummy.DealCardsEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DealCardsEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DealCardsEvent;
    })();

    rummy.OperationReq = (function() {

        /**
         * Properties of an OperationReq.
         * @memberof rummy
         * @interface IOperationReq
         * @property {number|null} [type] OperationReq type
         * @property {number|null} [card] OperationReq card
         * @property {Array.<rummy.ICardSet>|null} [cards] OperationReq cards
         * @property {Array.<number>|null} [bestCards] OperationReq bestCards
         */

        /**
         * Constructs a new OperationReq.
         * @memberof rummy
         * @classdesc Represents an OperationReq.
         * @implements IOperationReq
         * @constructor
         * @param {rummy.IOperationReq=} [properties] Properties to set
         */
        function OperationReq(properties) {
            this.cards = [];
            this.bestCards = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OperationReq type.
         * @member {number} type
         * @memberof rummy.OperationReq
         * @instance
         */
        OperationReq.prototype.type = 0;

        /**
         * OperationReq card.
         * @member {number} card
         * @memberof rummy.OperationReq
         * @instance
         */
        OperationReq.prototype.card = 0;

        /**
         * OperationReq cards.
         * @member {Array.<rummy.ICardSet>} cards
         * @memberof rummy.OperationReq
         * @instance
         */
        OperationReq.prototype.cards = $util.emptyArray;

        /**
         * OperationReq bestCards.
         * @member {Array.<number>} bestCards
         * @memberof rummy.OperationReq
         * @instance
         */
        OperationReq.prototype.bestCards = $util.emptyArray;

        /**
         * Creates a new OperationReq instance using the specified properties.
         * @function create
         * @memberof rummy.OperationReq
         * @static
         * @param {rummy.IOperationReq=} [properties] Properties to set
         * @returns {rummy.OperationReq} OperationReq instance
         */
        OperationReq.create = function create(properties) {
            return new OperationReq(properties);
        };

        /**
         * Encodes the specified OperationReq message. Does not implicitly {@link rummy.OperationReq.verify|verify} messages.
         * @function encode
         * @memberof rummy.OperationReq
         * @static
         * @param {rummy.IOperationReq} message OperationReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperationReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.card != null && Object.hasOwnProperty.call(message, "card"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.card);
            if (message.cards != null && message.cards.length)
                for (let i = 0; i < message.cards.length; ++i)
                    $root.rummy.CardSet.encode(message.cards[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.bestCards != null && message.bestCards.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (let i = 0; i < message.bestCards.length; ++i)
                    writer.int32(message.bestCards[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified OperationReq message, length delimited. Does not implicitly {@link rummy.OperationReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rummy.OperationReq
         * @static
         * @param {rummy.IOperationReq} message OperationReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperationReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OperationReq message from the specified reader or buffer.
         * @function decode
         * @memberof rummy.OperationReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rummy.OperationReq} OperationReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OperationReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rummy.OperationReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.card = reader.int32();
                    break;
                case 3:
                    if (!(message.cards && message.cards.length))
                        message.cards = [];
                    message.cards.push($root.rummy.CardSet.decode(reader, reader.uint32()));
                    break;
                case 4:
                    if (!(message.bestCards && message.bestCards.length))
                        message.bestCards = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.bestCards.push(reader.int32());
                    } else
                        message.bestCards.push(reader.int32());
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
         * @memberof rummy.OperationReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rummy.OperationReq} OperationReq
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
         * @memberof rummy.OperationReq
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
            if (message.card != null && message.hasOwnProperty("card"))
                if (!$util.isInteger(message.card))
                    return "card: integer expected";
            if (message.cards != null && message.hasOwnProperty("cards")) {
                if (!Array.isArray(message.cards))
                    return "cards: array expected";
                for (let i = 0; i < message.cards.length; ++i) {
                    let error = $root.rummy.CardSet.verify(message.cards[i]);
                    if (error)
                        return "cards." + error;
                }
            }
            if (message.bestCards != null && message.hasOwnProperty("bestCards")) {
                if (!Array.isArray(message.bestCards))
                    return "bestCards: array expected";
                for (let i = 0; i < message.bestCards.length; ++i)
                    if (!$util.isInteger(message.bestCards[i]))
                        return "bestCards: integer[] expected";
            }
            return null;
        };

        /**
         * Creates an OperationReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rummy.OperationReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rummy.OperationReq} OperationReq
         */
        OperationReq.fromObject = function fromObject(object) {
            if (object instanceof $root.rummy.OperationReq)
                return object;
            let message = new $root.rummy.OperationReq();
            if (object.type != null)
                message.type = object.type | 0;
            if (object.card != null)
                message.card = object.card | 0;
            if (object.cards) {
                if (!Array.isArray(object.cards))
                    throw TypeError(".rummy.OperationReq.cards: array expected");
                message.cards = [];
                for (let i = 0; i < object.cards.length; ++i) {
                    if (typeof object.cards[i] !== "object")
                        throw TypeError(".rummy.OperationReq.cards: object expected");
                    message.cards[i] = $root.rummy.CardSet.fromObject(object.cards[i]);
                }
            }
            if (object.bestCards) {
                if (!Array.isArray(object.bestCards))
                    throw TypeError(".rummy.OperationReq.bestCards: array expected");
                message.bestCards = [];
                for (let i = 0; i < object.bestCards.length; ++i)
                    message.bestCards[i] = object.bestCards[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from an OperationReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rummy.OperationReq
         * @static
         * @param {rummy.OperationReq} message OperationReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OperationReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.cards = [];
                object.bestCards = [];
            }
            if (options.defaults) {
                object.type = 0;
                object.card = 0;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.card != null && message.hasOwnProperty("card"))
                object.card = message.card;
            if (message.cards && message.cards.length) {
                object.cards = [];
                for (let j = 0; j < message.cards.length; ++j)
                    object.cards[j] = $root.rummy.CardSet.toObject(message.cards[j], options);
            }
            if (message.bestCards && message.bestCards.length) {
                object.bestCards = [];
                for (let j = 0; j < message.bestCards.length; ++j)
                    object.bestCards[j] = message.bestCards[j];
            }
            return object;
        };

        /**
         * Converts this OperationReq to JSON.
         * @function toJSON
         * @memberof rummy.OperationReq
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
     * @name rummy.OPERATION_TYPE
     * @enum {number}
     * @property {number} OT_NONE=0 OT_NONE value
     * @property {number} OT_DRAW_RANDOM=1 OT_DRAW_RANDOM value
     * @property {number} OT_DRAW_DISCARD=2 OT_DRAW_DISCARD value
     * @property {number} OT_DISCARD=3 OT_DISCARD value
     * @property {number} OT_DROP=4 OT_DROP value
     * @property {number} OT_FINISH=5 OT_FINISH value
     */
    rummy.OPERATION_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "OT_NONE"] = 0;
        values[valuesById[1] = "OT_DRAW_RANDOM"] = 1;
        values[valuesById[2] = "OT_DRAW_DISCARD"] = 2;
        values[valuesById[3] = "OT_DISCARD"] = 3;
        values[valuesById[4] = "OT_DROP"] = 4;
        values[valuesById[5] = "OT_FINISH"] = 5;
        return values;
    })();

    rummy.OperationEvent = (function() {

        /**
         * Properties of an OperationEvent.
         * @memberof rummy
         * @interface IOperationEvent
         * @property {number|null} [seat] OperationEvent seat
         * @property {number|null} [type] OperationEvent type
         * @property {number|null} [card] OperationEvent card
         * @property {number|null} [dropReason] OperationEvent dropReason
         * @property {boolean|null} [timeout] OperationEvent timeout
         */

        /**
         * Constructs a new OperationEvent.
         * @memberof rummy
         * @classdesc Represents an OperationEvent.
         * @implements IOperationEvent
         * @constructor
         * @param {rummy.IOperationEvent=} [properties] Properties to set
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
         * @memberof rummy.OperationEvent
         * @instance
         */
        OperationEvent.prototype.seat = 0;

        /**
         * OperationEvent type.
         * @member {number} type
         * @memberof rummy.OperationEvent
         * @instance
         */
        OperationEvent.prototype.type = 0;

        /**
         * OperationEvent card.
         * @member {number} card
         * @memberof rummy.OperationEvent
         * @instance
         */
        OperationEvent.prototype.card = 0;

        /**
         * OperationEvent dropReason.
         * @member {number} dropReason
         * @memberof rummy.OperationEvent
         * @instance
         */
        OperationEvent.prototype.dropReason = 0;

        /**
         * OperationEvent timeout.
         * @member {boolean} timeout
         * @memberof rummy.OperationEvent
         * @instance
         */
        OperationEvent.prototype.timeout = false;

        /**
         * Creates a new OperationEvent instance using the specified properties.
         * @function create
         * @memberof rummy.OperationEvent
         * @static
         * @param {rummy.IOperationEvent=} [properties] Properties to set
         * @returns {rummy.OperationEvent} OperationEvent instance
         */
        OperationEvent.create = function create(properties) {
            return new OperationEvent(properties);
        };

        /**
         * Encodes the specified OperationEvent message. Does not implicitly {@link rummy.OperationEvent.verify|verify} messages.
         * @function encode
         * @memberof rummy.OperationEvent
         * @static
         * @param {rummy.IOperationEvent} message OperationEvent message or plain object to encode
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
            if (message.card != null && Object.hasOwnProperty.call(message, "card"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.card);
            if (message.dropReason != null && Object.hasOwnProperty.call(message, "dropReason"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.dropReason);
            if (message.timeout != null && Object.hasOwnProperty.call(message, "timeout"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.timeout);
            return writer;
        };

        /**
         * Encodes the specified OperationEvent message, length delimited. Does not implicitly {@link rummy.OperationEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rummy.OperationEvent
         * @static
         * @param {rummy.IOperationEvent} message OperationEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperationEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OperationEvent message from the specified reader or buffer.
         * @function decode
         * @memberof rummy.OperationEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rummy.OperationEvent} OperationEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OperationEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rummy.OperationEvent();
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
                    message.card = reader.int32();
                    break;
                case 4:
                    message.dropReason = reader.int32();
                    break;
                case 5:
                    message.timeout = reader.bool();
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
         * @memberof rummy.OperationEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rummy.OperationEvent} OperationEvent
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
         * @memberof rummy.OperationEvent
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
            if (message.card != null && message.hasOwnProperty("card"))
                if (!$util.isInteger(message.card))
                    return "card: integer expected";
            if (message.dropReason != null && message.hasOwnProperty("dropReason"))
                if (!$util.isInteger(message.dropReason))
                    return "dropReason: integer expected";
            if (message.timeout != null && message.hasOwnProperty("timeout"))
                if (typeof message.timeout !== "boolean")
                    return "timeout: boolean expected";
            return null;
        };

        /**
         * Creates an OperationEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rummy.OperationEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rummy.OperationEvent} OperationEvent
         */
        OperationEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.rummy.OperationEvent)
                return object;
            let message = new $root.rummy.OperationEvent();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.type != null)
                message.type = object.type | 0;
            if (object.card != null)
                message.card = object.card | 0;
            if (object.dropReason != null)
                message.dropReason = object.dropReason | 0;
            if (object.timeout != null)
                message.timeout = Boolean(object.timeout);
            return message;
        };

        /**
         * Creates a plain object from an OperationEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rummy.OperationEvent
         * @static
         * @param {rummy.OperationEvent} message OperationEvent
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
                object.card = 0;
                object.dropReason = 0;
                object.timeout = false;
            }
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.card != null && message.hasOwnProperty("card"))
                object.card = message.card;
            if (message.dropReason != null && message.hasOwnProperty("dropReason"))
                object.dropReason = message.dropReason;
            if (message.timeout != null && message.hasOwnProperty("timeout"))
                object.timeout = message.timeout;
            return object;
        };

        /**
         * Converts this OperationEvent to JSON.
         * @function toJSON
         * @memberof rummy.OperationEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OperationEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OperationEvent;
    })();

    /**
     * DROP_REASON enum.
     * @name rummy.DROP_REASON
     * @enum {number}
     * @property {number} DR_NONE=0 DR_NONE value
     * @property {number} DR_PLAYER=1 DR_PLAYER value
     * @property {number} DR_EXIT=2 DR_EXIT value
     * @property {number} DR_TIMEOUT=3 DR_TIMEOUT value
     */
    rummy.DROP_REASON = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DR_NONE"] = 0;
        values[valuesById[1] = "DR_PLAYER"] = 1;
        values[valuesById[2] = "DR_EXIT"] = 2;
        values[valuesById[3] = "DR_TIMEOUT"] = 3;
        return values;
    })();

    rummy.DeclareEvent = (function() {

        /**
         * Properties of a DeclareEvent.
         * @memberof rummy
         * @interface IDeclareEvent
         * @property {number|null} [seat] DeclareEvent seat
         * @property {number|null} [settledAmount] DeclareEvent settledAmount
         */

        /**
         * Constructs a new DeclareEvent.
         * @memberof rummy
         * @classdesc Represents a DeclareEvent.
         * @implements IDeclareEvent
         * @constructor
         * @param {rummy.IDeclareEvent=} [properties] Properties to set
         */
        function DeclareEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DeclareEvent seat.
         * @member {number} seat
         * @memberof rummy.DeclareEvent
         * @instance
         */
        DeclareEvent.prototype.seat = 0;

        /**
         * DeclareEvent settledAmount.
         * @member {number} settledAmount
         * @memberof rummy.DeclareEvent
         * @instance
         */
        DeclareEvent.prototype.settledAmount = 0;

        /**
         * Creates a new DeclareEvent instance using the specified properties.
         * @function create
         * @memberof rummy.DeclareEvent
         * @static
         * @param {rummy.IDeclareEvent=} [properties] Properties to set
         * @returns {rummy.DeclareEvent} DeclareEvent instance
         */
        DeclareEvent.create = function create(properties) {
            return new DeclareEvent(properties);
        };

        /**
         * Encodes the specified DeclareEvent message. Does not implicitly {@link rummy.DeclareEvent.verify|verify} messages.
         * @function encode
         * @memberof rummy.DeclareEvent
         * @static
         * @param {rummy.IDeclareEvent} message DeclareEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeclareEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            if (message.settledAmount != null && Object.hasOwnProperty.call(message, "settledAmount"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.settledAmount);
            return writer;
        };

        /**
         * Encodes the specified DeclareEvent message, length delimited. Does not implicitly {@link rummy.DeclareEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rummy.DeclareEvent
         * @static
         * @param {rummy.IDeclareEvent} message DeclareEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeclareEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DeclareEvent message from the specified reader or buffer.
         * @function decode
         * @memberof rummy.DeclareEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rummy.DeclareEvent} DeclareEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeclareEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rummy.DeclareEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat = reader.int32();
                    break;
                case 2:
                    message.settledAmount = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DeclareEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rummy.DeclareEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rummy.DeclareEvent} DeclareEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeclareEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DeclareEvent message.
         * @function verify
         * @memberof rummy.DeclareEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeclareEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            if (message.settledAmount != null && message.hasOwnProperty("settledAmount"))
                if (!$util.isInteger(message.settledAmount))
                    return "settledAmount: integer expected";
            return null;
        };

        /**
         * Creates a DeclareEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rummy.DeclareEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rummy.DeclareEvent} DeclareEvent
         */
        DeclareEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.rummy.DeclareEvent)
                return object;
            let message = new $root.rummy.DeclareEvent();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.settledAmount != null)
                message.settledAmount = object.settledAmount | 0;
            return message;
        };

        /**
         * Creates a plain object from a DeclareEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rummy.DeclareEvent
         * @static
         * @param {rummy.DeclareEvent} message DeclareEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeclareEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seat = 0;
                object.settledAmount = 0;
            }
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.settledAmount != null && message.hasOwnProperty("settledAmount"))
                object.settledAmount = message.settledAmount;
            return object;
        };

        /**
         * Converts this DeclareEvent to JSON.
         * @function toJSON
         * @memberof rummy.DeclareEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeclareEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DeclareEvent;
    })();

    rummy.GroupReq = (function() {

        /**
         * Properties of a GroupReq.
         * @memberof rummy
         * @interface IGroupReq
         * @property {Array.<rummy.ICardSet>|null} [cards] GroupReq cards
         * @property {number|null} [score] GroupReq score
         */

        /**
         * Constructs a new GroupReq.
         * @memberof rummy
         * @classdesc Represents a GroupReq.
         * @implements IGroupReq
         * @constructor
         * @param {rummy.IGroupReq=} [properties] Properties to set
         */
        function GroupReq(properties) {
            this.cards = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GroupReq cards.
         * @member {Array.<rummy.ICardSet>} cards
         * @memberof rummy.GroupReq
         * @instance
         */
        GroupReq.prototype.cards = $util.emptyArray;

        /**
         * GroupReq score.
         * @member {number} score
         * @memberof rummy.GroupReq
         * @instance
         */
        GroupReq.prototype.score = 0;

        /**
         * Creates a new GroupReq instance using the specified properties.
         * @function create
         * @memberof rummy.GroupReq
         * @static
         * @param {rummy.IGroupReq=} [properties] Properties to set
         * @returns {rummy.GroupReq} GroupReq instance
         */
        GroupReq.create = function create(properties) {
            return new GroupReq(properties);
        };

        /**
         * Encodes the specified GroupReq message. Does not implicitly {@link rummy.GroupReq.verify|verify} messages.
         * @function encode
         * @memberof rummy.GroupReq
         * @static
         * @param {rummy.IGroupReq} message GroupReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GroupReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cards != null && message.cards.length)
                for (let i = 0; i < message.cards.length; ++i)
                    $root.rummy.CardSet.encode(message.cards[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.score);
            return writer;
        };

        /**
         * Encodes the specified GroupReq message, length delimited. Does not implicitly {@link rummy.GroupReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rummy.GroupReq
         * @static
         * @param {rummy.IGroupReq} message GroupReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GroupReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GroupReq message from the specified reader or buffer.
         * @function decode
         * @memberof rummy.GroupReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rummy.GroupReq} GroupReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GroupReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rummy.GroupReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.cards && message.cards.length))
                        message.cards = [];
                    message.cards.push($root.rummy.CardSet.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.score = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GroupReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rummy.GroupReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rummy.GroupReq} GroupReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GroupReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GroupReq message.
         * @function verify
         * @memberof rummy.GroupReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GroupReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cards != null && message.hasOwnProperty("cards")) {
                if (!Array.isArray(message.cards))
                    return "cards: array expected";
                for (let i = 0; i < message.cards.length; ++i) {
                    let error = $root.rummy.CardSet.verify(message.cards[i]);
                    if (error)
                        return "cards." + error;
                }
            }
            if (message.score != null && message.hasOwnProperty("score"))
                if (!$util.isInteger(message.score))
                    return "score: integer expected";
            return null;
        };

        /**
         * Creates a GroupReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rummy.GroupReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rummy.GroupReq} GroupReq
         */
        GroupReq.fromObject = function fromObject(object) {
            if (object instanceof $root.rummy.GroupReq)
                return object;
            let message = new $root.rummy.GroupReq();
            if (object.cards) {
                if (!Array.isArray(object.cards))
                    throw TypeError(".rummy.GroupReq.cards: array expected");
                message.cards = [];
                for (let i = 0; i < object.cards.length; ++i) {
                    if (typeof object.cards[i] !== "object")
                        throw TypeError(".rummy.GroupReq.cards: object expected");
                    message.cards[i] = $root.rummy.CardSet.fromObject(object.cards[i]);
                }
            }
            if (object.score != null)
                message.score = object.score | 0;
            return message;
        };

        /**
         * Creates a plain object from a GroupReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rummy.GroupReq
         * @static
         * @param {rummy.GroupReq} message GroupReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GroupReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.cards = [];
            if (options.defaults)
                object.score = 0;
            if (message.cards && message.cards.length) {
                object.cards = [];
                for (let j = 0; j < message.cards.length; ++j)
                    object.cards[j] = $root.rummy.CardSet.toObject(message.cards[j], options);
            }
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = message.score;
            return object;
        };

        /**
         * Converts this GroupReq to JSON.
         * @function toJSON
         * @memberof rummy.GroupReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GroupReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GroupReq;
    })();

    rummy.CardSet = (function() {

        /**
         * Properties of a CardSet.
         * @memberof rummy
         * @interface ICardSet
         * @property {number|null} [type] CardSet type
         * @property {Array.<number>|null} [cards] CardSet cards
         */

        /**
         * Constructs a new CardSet.
         * @memberof rummy
         * @classdesc Represents a CardSet.
         * @implements ICardSet
         * @constructor
         * @param {rummy.ICardSet=} [properties] Properties to set
         */
        function CardSet(properties) {
            this.cards = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CardSet type.
         * @member {number} type
         * @memberof rummy.CardSet
         * @instance
         */
        CardSet.prototype.type = 0;

        /**
         * CardSet cards.
         * @member {Array.<number>} cards
         * @memberof rummy.CardSet
         * @instance
         */
        CardSet.prototype.cards = $util.emptyArray;

        /**
         * Creates a new CardSet instance using the specified properties.
         * @function create
         * @memberof rummy.CardSet
         * @static
         * @param {rummy.ICardSet=} [properties] Properties to set
         * @returns {rummy.CardSet} CardSet instance
         */
        CardSet.create = function create(properties) {
            return new CardSet(properties);
        };

        /**
         * Encodes the specified CardSet message. Does not implicitly {@link rummy.CardSet.verify|verify} messages.
         * @function encode
         * @memberof rummy.CardSet
         * @static
         * @param {rummy.ICardSet} message CardSet message or plain object to encode
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
            return writer;
        };

        /**
         * Encodes the specified CardSet message, length delimited. Does not implicitly {@link rummy.CardSet.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rummy.CardSet
         * @static
         * @param {rummy.ICardSet} message CardSet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CardSet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CardSet message from the specified reader or buffer.
         * @function decode
         * @memberof rummy.CardSet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rummy.CardSet} CardSet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CardSet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rummy.CardSet();
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
         * Decodes a CardSet message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rummy.CardSet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rummy.CardSet} CardSet
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
         * @memberof rummy.CardSet
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
            return null;
        };

        /**
         * Creates a CardSet message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rummy.CardSet
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rummy.CardSet} CardSet
         */
        CardSet.fromObject = function fromObject(object) {
            if (object instanceof $root.rummy.CardSet)
                return object;
            let message = new $root.rummy.CardSet();
            if (object.type != null)
                message.type = object.type | 0;
            if (object.cards) {
                if (!Array.isArray(object.cards))
                    throw TypeError(".rummy.CardSet.cards: array expected");
                message.cards = [];
                for (let i = 0; i < object.cards.length; ++i)
                    message.cards[i] = object.cards[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a CardSet message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rummy.CardSet
         * @static
         * @param {rummy.CardSet} message CardSet
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CardSet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.cards = [];
            if (options.defaults)
                object.type = 0;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.cards && message.cards.length) {
                object.cards = [];
                for (let j = 0; j < message.cards.length; ++j)
                    object.cards[j] = message.cards[j];
            }
            return object;
        };

        /**
         * Converts this CardSet to JSON.
         * @function toJSON
         * @memberof rummy.CardSet
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CardSet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CardSet;
    })();

    rummy.GameEndEvent = (function() {

        /**
         * Properties of a GameEndEvent.
         * @memberof rummy
         * @interface IGameEndEvent
         * @property {number|null} [winnerSeat] GameEndEvent winnerSeat
         * @property {Array.<rummy.ISeatResult>|null} [seatResults] GameEndEvent seatResults
         * @property {number|null} [versatileCard] GameEndEvent versatileCard
         */

        /**
         * Constructs a new GameEndEvent.
         * @memberof rummy
         * @classdesc Represents a GameEndEvent.
         * @implements IGameEndEvent
         * @constructor
         * @param {rummy.IGameEndEvent=} [properties] Properties to set
         */
        function GameEndEvent(properties) {
            this.seatResults = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameEndEvent winnerSeat.
         * @member {number} winnerSeat
         * @memberof rummy.GameEndEvent
         * @instance
         */
        GameEndEvent.prototype.winnerSeat = 0;

        /**
         * GameEndEvent seatResults.
         * @member {Array.<rummy.ISeatResult>} seatResults
         * @memberof rummy.GameEndEvent
         * @instance
         */
        GameEndEvent.prototype.seatResults = $util.emptyArray;

        /**
         * GameEndEvent versatileCard.
         * @member {number} versatileCard
         * @memberof rummy.GameEndEvent
         * @instance
         */
        GameEndEvent.prototype.versatileCard = 0;

        /**
         * Creates a new GameEndEvent instance using the specified properties.
         * @function create
         * @memberof rummy.GameEndEvent
         * @static
         * @param {rummy.IGameEndEvent=} [properties] Properties to set
         * @returns {rummy.GameEndEvent} GameEndEvent instance
         */
        GameEndEvent.create = function create(properties) {
            return new GameEndEvent(properties);
        };

        /**
         * Encodes the specified GameEndEvent message. Does not implicitly {@link rummy.GameEndEvent.verify|verify} messages.
         * @function encode
         * @memberof rummy.GameEndEvent
         * @static
         * @param {rummy.IGameEndEvent} message GameEndEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameEndEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.winnerSeat != null && Object.hasOwnProperty.call(message, "winnerSeat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.winnerSeat);
            if (message.seatResults != null && message.seatResults.length)
                for (let i = 0; i < message.seatResults.length; ++i)
                    $root.rummy.SeatResult.encode(message.seatResults[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.versatileCard != null && Object.hasOwnProperty.call(message, "versatileCard"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.versatileCard);
            return writer;
        };

        /**
         * Encodes the specified GameEndEvent message, length delimited. Does not implicitly {@link rummy.GameEndEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rummy.GameEndEvent
         * @static
         * @param {rummy.IGameEndEvent} message GameEndEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameEndEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameEndEvent message from the specified reader or buffer.
         * @function decode
         * @memberof rummy.GameEndEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rummy.GameEndEvent} GameEndEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameEndEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rummy.GameEndEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.winnerSeat = reader.int32();
                    break;
                case 2:
                    if (!(message.seatResults && message.seatResults.length))
                        message.seatResults = [];
                    message.seatResults.push($root.rummy.SeatResult.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.versatileCard = reader.int32();
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
         * @memberof rummy.GameEndEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rummy.GameEndEvent} GameEndEvent
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
         * @memberof rummy.GameEndEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameEndEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.winnerSeat != null && message.hasOwnProperty("winnerSeat"))
                if (!$util.isInteger(message.winnerSeat))
                    return "winnerSeat: integer expected";
            if (message.seatResults != null && message.hasOwnProperty("seatResults")) {
                if (!Array.isArray(message.seatResults))
                    return "seatResults: array expected";
                for (let i = 0; i < message.seatResults.length; ++i) {
                    let error = $root.rummy.SeatResult.verify(message.seatResults[i]);
                    if (error)
                        return "seatResults." + error;
                }
            }
            if (message.versatileCard != null && message.hasOwnProperty("versatileCard"))
                if (!$util.isInteger(message.versatileCard))
                    return "versatileCard: integer expected";
            return null;
        };

        /**
         * Creates a GameEndEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rummy.GameEndEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rummy.GameEndEvent} GameEndEvent
         */
        GameEndEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.rummy.GameEndEvent)
                return object;
            let message = new $root.rummy.GameEndEvent();
            if (object.winnerSeat != null)
                message.winnerSeat = object.winnerSeat | 0;
            if (object.seatResults) {
                if (!Array.isArray(object.seatResults))
                    throw TypeError(".rummy.GameEndEvent.seatResults: array expected");
                message.seatResults = [];
                for (let i = 0; i < object.seatResults.length; ++i) {
                    if (typeof object.seatResults[i] !== "object")
                        throw TypeError(".rummy.GameEndEvent.seatResults: object expected");
                    message.seatResults[i] = $root.rummy.SeatResult.fromObject(object.seatResults[i]);
                }
            }
            if (object.versatileCard != null)
                message.versatileCard = object.versatileCard | 0;
            return message;
        };

        /**
         * Creates a plain object from a GameEndEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rummy.GameEndEvent
         * @static
         * @param {rummy.GameEndEvent} message GameEndEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameEndEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.seatResults = [];
            if (options.defaults) {
                object.winnerSeat = 0;
                object.versatileCard = 0;
            }
            if (message.winnerSeat != null && message.hasOwnProperty("winnerSeat"))
                object.winnerSeat = message.winnerSeat;
            if (message.seatResults && message.seatResults.length) {
                object.seatResults = [];
                for (let j = 0; j < message.seatResults.length; ++j)
                    object.seatResults[j] = $root.rummy.SeatResult.toObject(message.seatResults[j], options);
            }
            if (message.versatileCard != null && message.hasOwnProperty("versatileCard"))
                object.versatileCard = message.versatileCard;
            return object;
        };

        /**
         * Converts this GameEndEvent to JSON.
         * @function toJSON
         * @memberof rummy.GameEndEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameEndEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameEndEvent;
    })();

    rummy.SeatResult = (function() {

        /**
         * Properties of a SeatResult.
         * @memberof rummy
         * @interface ISeatResult
         * @property {number|null} [seat] SeatResult seat
         * @property {number|null} [state] SeatResult state
         * @property {number|null} [settledAmount] SeatResult settledAmount
         * @property {Array.<rummy.ICardSet>|null} [cards] SeatResult cards
         * @property {number|null} [score] SeatResult score
         * @property {base.IPlayerBaseInfo|null} [baseInfo] SeatResult baseInfo
         */

        /**
         * Constructs a new SeatResult.
         * @memberof rummy
         * @classdesc Represents a SeatResult.
         * @implements ISeatResult
         * @constructor
         * @param {rummy.ISeatResult=} [properties] Properties to set
         */
        function SeatResult(properties) {
            this.cards = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SeatResult seat.
         * @member {number} seat
         * @memberof rummy.SeatResult
         * @instance
         */
        SeatResult.prototype.seat = 0;

        /**
         * SeatResult state.
         * @member {number} state
         * @memberof rummy.SeatResult
         * @instance
         */
        SeatResult.prototype.state = 0;

        /**
         * SeatResult settledAmount.
         * @member {number} settledAmount
         * @memberof rummy.SeatResult
         * @instance
         */
        SeatResult.prototype.settledAmount = 0;

        /**
         * SeatResult cards.
         * @member {Array.<rummy.ICardSet>} cards
         * @memberof rummy.SeatResult
         * @instance
         */
        SeatResult.prototype.cards = $util.emptyArray;

        /**
         * SeatResult score.
         * @member {number} score
         * @memberof rummy.SeatResult
         * @instance
         */
        SeatResult.prototype.score = 0;

        /**
         * SeatResult baseInfo.
         * @member {base.IPlayerBaseInfo|null|undefined} baseInfo
         * @memberof rummy.SeatResult
         * @instance
         */
        SeatResult.prototype.baseInfo = null;

        /**
         * Creates a new SeatResult instance using the specified properties.
         * @function create
         * @memberof rummy.SeatResult
         * @static
         * @param {rummy.ISeatResult=} [properties] Properties to set
         * @returns {rummy.SeatResult} SeatResult instance
         */
        SeatResult.create = function create(properties) {
            return new SeatResult(properties);
        };

        /**
         * Encodes the specified SeatResult message. Does not implicitly {@link rummy.SeatResult.verify|verify} messages.
         * @function encode
         * @memberof rummy.SeatResult
         * @static
         * @param {rummy.ISeatResult} message SeatResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.state);
            if (message.settledAmount != null && Object.hasOwnProperty.call(message, "settledAmount"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.settledAmount);
            if (message.cards != null && message.cards.length)
                for (let i = 0; i < message.cards.length; ++i)
                    $root.rummy.CardSet.encode(message.cards[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.score);
            if (message.baseInfo != null && Object.hasOwnProperty.call(message, "baseInfo"))
                $root.base.PlayerBaseInfo.encode(message.baseInfo, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SeatResult message, length delimited. Does not implicitly {@link rummy.SeatResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rummy.SeatResult
         * @static
         * @param {rummy.ISeatResult} message SeatResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeatResult message from the specified reader or buffer.
         * @function decode
         * @memberof rummy.SeatResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rummy.SeatResult} SeatResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatResult.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rummy.SeatResult();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat = reader.int32();
                    break;
                case 2:
                    message.state = reader.int32();
                    break;
                case 3:
                    message.settledAmount = reader.int32();
                    break;
                case 4:
                    if (!(message.cards && message.cards.length))
                        message.cards = [];
                    message.cards.push($root.rummy.CardSet.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.score = reader.int32();
                    break;
                case 6:
                    message.baseInfo = $root.base.PlayerBaseInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SeatResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rummy.SeatResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rummy.SeatResult} SeatResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SeatResult message.
         * @function verify
         * @memberof rummy.SeatResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SeatResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            if (message.state != null && message.hasOwnProperty("state"))
                if (!$util.isInteger(message.state))
                    return "state: integer expected";
            if (message.settledAmount != null && message.hasOwnProperty("settledAmount"))
                if (!$util.isInteger(message.settledAmount))
                    return "settledAmount: integer expected";
            if (message.cards != null && message.hasOwnProperty("cards")) {
                if (!Array.isArray(message.cards))
                    return "cards: array expected";
                for (let i = 0; i < message.cards.length; ++i) {
                    let error = $root.rummy.CardSet.verify(message.cards[i]);
                    if (error)
                        return "cards." + error;
                }
            }
            if (message.score != null && message.hasOwnProperty("score"))
                if (!$util.isInteger(message.score))
                    return "score: integer expected";
            if (message.baseInfo != null && message.hasOwnProperty("baseInfo")) {
                let error = $root.base.PlayerBaseInfo.verify(message.baseInfo);
                if (error)
                    return "baseInfo." + error;
            }
            return null;
        };

        /**
         * Creates a SeatResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rummy.SeatResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rummy.SeatResult} SeatResult
         */
        SeatResult.fromObject = function fromObject(object) {
            if (object instanceof $root.rummy.SeatResult)
                return object;
            let message = new $root.rummy.SeatResult();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.state != null)
                message.state = object.state | 0;
            if (object.settledAmount != null)
                message.settledAmount = object.settledAmount | 0;
            if (object.cards) {
                if (!Array.isArray(object.cards))
                    throw TypeError(".rummy.SeatResult.cards: array expected");
                message.cards = [];
                for (let i = 0; i < object.cards.length; ++i) {
                    if (typeof object.cards[i] !== "object")
                        throw TypeError(".rummy.SeatResult.cards: object expected");
                    message.cards[i] = $root.rummy.CardSet.fromObject(object.cards[i]);
                }
            }
            if (object.score != null)
                message.score = object.score | 0;
            if (object.baseInfo != null) {
                if (typeof object.baseInfo !== "object")
                    throw TypeError(".rummy.SeatResult.baseInfo: object expected");
                message.baseInfo = $root.base.PlayerBaseInfo.fromObject(object.baseInfo);
            }
            return message;
        };

        /**
         * Creates a plain object from a SeatResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rummy.SeatResult
         * @static
         * @param {rummy.SeatResult} message SeatResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeatResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.cards = [];
            if (options.defaults) {
                object.seat = 0;
                object.state = 0;
                object.settledAmount = 0;
                object.score = 0;
                object.baseInfo = null;
            }
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = message.state;
            if (message.settledAmount != null && message.hasOwnProperty("settledAmount"))
                object.settledAmount = message.settledAmount;
            if (message.cards && message.cards.length) {
                object.cards = [];
                for (let j = 0; j < message.cards.length; ++j)
                    object.cards[j] = $root.rummy.CardSet.toObject(message.cards[j], options);
            }
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = message.score;
            if (message.baseInfo != null && message.hasOwnProperty("baseInfo"))
                object.baseInfo = $root.base.PlayerBaseInfo.toObject(message.baseInfo, options);
            return object;
        };

        /**
         * Converts this SeatResult to JSON.
         * @function toJSON
         * @memberof rummy.SeatResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeatResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeatResult;
    })();

    rummy.SeatCardsEvent = (function() {

        /**
         * Properties of a SeatCardsEvent.
         * @memberof rummy
         * @interface ISeatCardsEvent
         * @property {Array.<rummy.ISeatCards>|null} [seatCards] SeatCardsEvent seatCards
         * @property {number|null} [finalTag] SeatCardsEvent finalTag
         */

        /**
         * Constructs a new SeatCardsEvent.
         * @memberof rummy
         * @classdesc Represents a SeatCardsEvent.
         * @implements ISeatCardsEvent
         * @constructor
         * @param {rummy.ISeatCardsEvent=} [properties] Properties to set
         */
        function SeatCardsEvent(properties) {
            this.seatCards = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SeatCardsEvent seatCards.
         * @member {Array.<rummy.ISeatCards>} seatCards
         * @memberof rummy.SeatCardsEvent
         * @instance
         */
        SeatCardsEvent.prototype.seatCards = $util.emptyArray;

        /**
         * SeatCardsEvent finalTag.
         * @member {number} finalTag
         * @memberof rummy.SeatCardsEvent
         * @instance
         */
        SeatCardsEvent.prototype.finalTag = 0;

        /**
         * Creates a new SeatCardsEvent instance using the specified properties.
         * @function create
         * @memberof rummy.SeatCardsEvent
         * @static
         * @param {rummy.ISeatCardsEvent=} [properties] Properties to set
         * @returns {rummy.SeatCardsEvent} SeatCardsEvent instance
         */
        SeatCardsEvent.create = function create(properties) {
            return new SeatCardsEvent(properties);
        };

        /**
         * Encodes the specified SeatCardsEvent message. Does not implicitly {@link rummy.SeatCardsEvent.verify|verify} messages.
         * @function encode
         * @memberof rummy.SeatCardsEvent
         * @static
         * @param {rummy.ISeatCardsEvent} message SeatCardsEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatCardsEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seatCards != null && message.seatCards.length)
                for (let i = 0; i < message.seatCards.length; ++i)
                    $root.rummy.SeatCards.encode(message.seatCards[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.finalTag != null && Object.hasOwnProperty.call(message, "finalTag"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.finalTag);
            return writer;
        };

        /**
         * Encodes the specified SeatCardsEvent message, length delimited. Does not implicitly {@link rummy.SeatCardsEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rummy.SeatCardsEvent
         * @static
         * @param {rummy.ISeatCardsEvent} message SeatCardsEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatCardsEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeatCardsEvent message from the specified reader or buffer.
         * @function decode
         * @memberof rummy.SeatCardsEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rummy.SeatCardsEvent} SeatCardsEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatCardsEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rummy.SeatCardsEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.seatCards && message.seatCards.length))
                        message.seatCards = [];
                    message.seatCards.push($root.rummy.SeatCards.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.finalTag = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SeatCardsEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rummy.SeatCardsEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rummy.SeatCardsEvent} SeatCardsEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatCardsEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SeatCardsEvent message.
         * @function verify
         * @memberof rummy.SeatCardsEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SeatCardsEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seatCards != null && message.hasOwnProperty("seatCards")) {
                if (!Array.isArray(message.seatCards))
                    return "seatCards: array expected";
                for (let i = 0; i < message.seatCards.length; ++i) {
                    let error = $root.rummy.SeatCards.verify(message.seatCards[i]);
                    if (error)
                        return "seatCards." + error;
                }
            }
            if (message.finalTag != null && message.hasOwnProperty("finalTag"))
                if (!$util.isInteger(message.finalTag))
                    return "finalTag: integer expected";
            return null;
        };

        /**
         * Creates a SeatCardsEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rummy.SeatCardsEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rummy.SeatCardsEvent} SeatCardsEvent
         */
        SeatCardsEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.rummy.SeatCardsEvent)
                return object;
            let message = new $root.rummy.SeatCardsEvent();
            if (object.seatCards) {
                if (!Array.isArray(object.seatCards))
                    throw TypeError(".rummy.SeatCardsEvent.seatCards: array expected");
                message.seatCards = [];
                for (let i = 0; i < object.seatCards.length; ++i) {
                    if (typeof object.seatCards[i] !== "object")
                        throw TypeError(".rummy.SeatCardsEvent.seatCards: object expected");
                    message.seatCards[i] = $root.rummy.SeatCards.fromObject(object.seatCards[i]);
                }
            }
            if (object.finalTag != null)
                message.finalTag = object.finalTag | 0;
            return message;
        };

        /**
         * Creates a plain object from a SeatCardsEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rummy.SeatCardsEvent
         * @static
         * @param {rummy.SeatCardsEvent} message SeatCardsEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeatCardsEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.seatCards = [];
            if (options.defaults)
                object.finalTag = 0;
            if (message.seatCards && message.seatCards.length) {
                object.seatCards = [];
                for (let j = 0; j < message.seatCards.length; ++j)
                    object.seatCards[j] = $root.rummy.SeatCards.toObject(message.seatCards[j], options);
            }
            if (message.finalTag != null && message.hasOwnProperty("finalTag"))
                object.finalTag = message.finalTag;
            return object;
        };

        /**
         * Converts this SeatCardsEvent to JSON.
         * @function toJSON
         * @memberof rummy.SeatCardsEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeatCardsEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeatCardsEvent;
    })();

    rummy.SeatCards = (function() {

        /**
         * Properties of a SeatCards.
         * @memberof rummy
         * @interface ISeatCards
         * @property {number|null} [seat] SeatCards seat
         * @property {Array.<number>|null} [cards] SeatCards cards
         */

        /**
         * Constructs a new SeatCards.
         * @memberof rummy
         * @classdesc Represents a SeatCards.
         * @implements ISeatCards
         * @constructor
         * @param {rummy.ISeatCards=} [properties] Properties to set
         */
        function SeatCards(properties) {
            this.cards = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SeatCards seat.
         * @member {number} seat
         * @memberof rummy.SeatCards
         * @instance
         */
        SeatCards.prototype.seat = 0;

        /**
         * SeatCards cards.
         * @member {Array.<number>} cards
         * @memberof rummy.SeatCards
         * @instance
         */
        SeatCards.prototype.cards = $util.emptyArray;

        /**
         * Creates a new SeatCards instance using the specified properties.
         * @function create
         * @memberof rummy.SeatCards
         * @static
         * @param {rummy.ISeatCards=} [properties] Properties to set
         * @returns {rummy.SeatCards} SeatCards instance
         */
        SeatCards.create = function create(properties) {
            return new SeatCards(properties);
        };

        /**
         * Encodes the specified SeatCards message. Does not implicitly {@link rummy.SeatCards.verify|verify} messages.
         * @function encode
         * @memberof rummy.SeatCards
         * @static
         * @param {rummy.ISeatCards} message SeatCards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatCards.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            if (message.cards != null && message.cards.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.cards.length; ++i)
                    writer.int32(message.cards[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified SeatCards message, length delimited. Does not implicitly {@link rummy.SeatCards.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rummy.SeatCards
         * @static
         * @param {rummy.ISeatCards} message SeatCards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatCards.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeatCards message from the specified reader or buffer.
         * @function decode
         * @memberof rummy.SeatCards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rummy.SeatCards} SeatCards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatCards.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rummy.SeatCards();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat = reader.int32();
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
         * Decodes a SeatCards message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rummy.SeatCards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rummy.SeatCards} SeatCards
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
         * @memberof rummy.SeatCards
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
         * Creates a SeatCards message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rummy.SeatCards
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rummy.SeatCards} SeatCards
         */
        SeatCards.fromObject = function fromObject(object) {
            if (object instanceof $root.rummy.SeatCards)
                return object;
            let message = new $root.rummy.SeatCards();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.cards) {
                if (!Array.isArray(object.cards))
                    throw TypeError(".rummy.SeatCards.cards: array expected");
                message.cards = [];
                for (let i = 0; i < object.cards.length; ++i)
                    message.cards[i] = object.cards[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a SeatCards message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rummy.SeatCards
         * @static
         * @param {rummy.SeatCards} message SeatCards
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeatCards.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.cards = [];
            if (options.defaults)
                object.seat = 0;
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.cards && message.cards.length) {
                object.cards = [];
                for (let j = 0; j < message.cards.length; ++j)
                    object.cards[j] = message.cards[j];
            }
            return object;
        };

        /**
         * Converts this SeatCards to JSON.
         * @function toJSON
         * @memberof rummy.SeatCards
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeatCards.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeatCards;
    })();

    rummy.SeatScoreEvent = (function() {

        /**
         * Properties of a SeatScoreEvent.
         * @memberof rummy
         * @interface ISeatScoreEvent
         * @property {number|null} [seat] SeatScoreEvent seat
         * @property {number|null} [score] SeatScoreEvent score
         */

        /**
         * Constructs a new SeatScoreEvent.
         * @memberof rummy
         * @classdesc Represents a SeatScoreEvent.
         * @implements ISeatScoreEvent
         * @constructor
         * @param {rummy.ISeatScoreEvent=} [properties] Properties to set
         */
        function SeatScoreEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SeatScoreEvent seat.
         * @member {number} seat
         * @memberof rummy.SeatScoreEvent
         * @instance
         */
        SeatScoreEvent.prototype.seat = 0;

        /**
         * SeatScoreEvent score.
         * @member {number} score
         * @memberof rummy.SeatScoreEvent
         * @instance
         */
        SeatScoreEvent.prototype.score = 0;

        /**
         * Creates a new SeatScoreEvent instance using the specified properties.
         * @function create
         * @memberof rummy.SeatScoreEvent
         * @static
         * @param {rummy.ISeatScoreEvent=} [properties] Properties to set
         * @returns {rummy.SeatScoreEvent} SeatScoreEvent instance
         */
        SeatScoreEvent.create = function create(properties) {
            return new SeatScoreEvent(properties);
        };

        /**
         * Encodes the specified SeatScoreEvent message. Does not implicitly {@link rummy.SeatScoreEvent.verify|verify} messages.
         * @function encode
         * @memberof rummy.SeatScoreEvent
         * @static
         * @param {rummy.ISeatScoreEvent} message SeatScoreEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatScoreEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.score);
            return writer;
        };

        /**
         * Encodes the specified SeatScoreEvent message, length delimited. Does not implicitly {@link rummy.SeatScoreEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rummy.SeatScoreEvent
         * @static
         * @param {rummy.ISeatScoreEvent} message SeatScoreEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatScoreEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeatScoreEvent message from the specified reader or buffer.
         * @function decode
         * @memberof rummy.SeatScoreEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rummy.SeatScoreEvent} SeatScoreEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatScoreEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rummy.SeatScoreEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat = reader.int32();
                    break;
                case 2:
                    message.score = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SeatScoreEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rummy.SeatScoreEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rummy.SeatScoreEvent} SeatScoreEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatScoreEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SeatScoreEvent message.
         * @function verify
         * @memberof rummy.SeatScoreEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SeatScoreEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (!$util.isInteger(message.score))
                    return "score: integer expected";
            return null;
        };

        /**
         * Creates a SeatScoreEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rummy.SeatScoreEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rummy.SeatScoreEvent} SeatScoreEvent
         */
        SeatScoreEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.rummy.SeatScoreEvent)
                return object;
            let message = new $root.rummy.SeatScoreEvent();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.score != null)
                message.score = object.score | 0;
            return message;
        };

        /**
         * Creates a plain object from a SeatScoreEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rummy.SeatScoreEvent
         * @static
         * @param {rummy.SeatScoreEvent} message SeatScoreEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeatScoreEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seat = 0;
                object.score = 0;
            }
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = message.score;
            return object;
        };

        /**
         * Converts this SeatScoreEvent to JSON.
         * @function toJSON
         * @memberof rummy.SeatScoreEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeatScoreEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeatScoreEvent;
    })();

    rummy.HistoryEvent = (function() {

        /**
         * Properties of a HistoryEvent.
         * @memberof rummy
         * @interface IHistoryEvent
         * @property {Array.<rummy.IGameEndEvent>|null} [records] HistoryEvent records
         */

        /**
         * Constructs a new HistoryEvent.
         * @memberof rummy
         * @classdesc Represents a HistoryEvent.
         * @implements IHistoryEvent
         * @constructor
         * @param {rummy.IHistoryEvent=} [properties] Properties to set
         */
        function HistoryEvent(properties) {
            this.records = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HistoryEvent records.
         * @member {Array.<rummy.IGameEndEvent>} records
         * @memberof rummy.HistoryEvent
         * @instance
         */
        HistoryEvent.prototype.records = $util.emptyArray;

        /**
         * Creates a new HistoryEvent instance using the specified properties.
         * @function create
         * @memberof rummy.HistoryEvent
         * @static
         * @param {rummy.IHistoryEvent=} [properties] Properties to set
         * @returns {rummy.HistoryEvent} HistoryEvent instance
         */
        HistoryEvent.create = function create(properties) {
            return new HistoryEvent(properties);
        };

        /**
         * Encodes the specified HistoryEvent message. Does not implicitly {@link rummy.HistoryEvent.verify|verify} messages.
         * @function encode
         * @memberof rummy.HistoryEvent
         * @static
         * @param {rummy.IHistoryEvent} message HistoryEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HistoryEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.records != null && message.records.length)
                for (let i = 0; i < message.records.length; ++i)
                    $root.rummy.GameEndEvent.encode(message.records[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified HistoryEvent message, length delimited. Does not implicitly {@link rummy.HistoryEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rummy.HistoryEvent
         * @static
         * @param {rummy.IHistoryEvent} message HistoryEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HistoryEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HistoryEvent message from the specified reader or buffer.
         * @function decode
         * @memberof rummy.HistoryEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rummy.HistoryEvent} HistoryEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HistoryEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rummy.HistoryEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.records && message.records.length))
                        message.records = [];
                    message.records.push($root.rummy.GameEndEvent.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HistoryEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rummy.HistoryEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rummy.HistoryEvent} HistoryEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HistoryEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HistoryEvent message.
         * @function verify
         * @memberof rummy.HistoryEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HistoryEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.records != null && message.hasOwnProperty("records")) {
                if (!Array.isArray(message.records))
                    return "records: array expected";
                for (let i = 0; i < message.records.length; ++i) {
                    let error = $root.rummy.GameEndEvent.verify(message.records[i]);
                    if (error)
                        return "records." + error;
                }
            }
            return null;
        };

        /**
         * Creates a HistoryEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rummy.HistoryEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rummy.HistoryEvent} HistoryEvent
         */
        HistoryEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.rummy.HistoryEvent)
                return object;
            let message = new $root.rummy.HistoryEvent();
            if (object.records) {
                if (!Array.isArray(object.records))
                    throw TypeError(".rummy.HistoryEvent.records: array expected");
                message.records = [];
                for (let i = 0; i < object.records.length; ++i) {
                    if (typeof object.records[i] !== "object")
                        throw TypeError(".rummy.HistoryEvent.records: object expected");
                    message.records[i] = $root.rummy.GameEndEvent.fromObject(object.records[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a HistoryEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rummy.HistoryEvent
         * @static
         * @param {rummy.HistoryEvent} message HistoryEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HistoryEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.records = [];
            if (message.records && message.records.length) {
                object.records = [];
                for (let j = 0; j < message.records.length; ++j)
                    object.records[j] = $root.rummy.GameEndEvent.toObject(message.records[j], options);
            }
            return object;
        };

        /**
         * Converts this HistoryEvent to JSON.
         * @function toJSON
         * @memberof rummy.HistoryEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HistoryEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HistoryEvent;
    })();

    return rummy;
})();

export const base = $root.base = (() => {

    /**
     * Namespace base.
     * @exports base
     * @namespace
     */
    const base = {};

    base.Connected = (function() {

        /**
         * Properties of a Connected.
         * @memberof base
         * @interface IConnected
         * @property {number|Long|null} [nowTime] Connected nowTime
         */

        /**
         * Constructs a new Connected.
         * @memberof base
         * @classdesc Represents a Connected.
         * @implements IConnected
         * @constructor
         * @param {base.IConnected=} [properties] Properties to set
         */
        function Connected(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Connected nowTime.
         * @member {number|Long} nowTime
         * @memberof base.Connected
         * @instance
         */
        Connected.prototype.nowTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Connected instance using the specified properties.
         * @function create
         * @memberof base.Connected
         * @static
         * @param {base.IConnected=} [properties] Properties to set
         * @returns {base.Connected} Connected instance
         */
        Connected.create = function create(properties) {
            return new Connected(properties);
        };

        /**
         * Encodes the specified Connected message. Does not implicitly {@link base.Connected.verify|verify} messages.
         * @function encode
         * @memberof base.Connected
         * @static
         * @param {base.IConnected} message Connected message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Connected.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nowTime != null && Object.hasOwnProperty.call(message, "nowTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.nowTime);
            return writer;
        };

        /**
         * Encodes the specified Connected message, length delimited. Does not implicitly {@link base.Connected.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.Connected
         * @static
         * @param {base.IConnected} message Connected message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Connected.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Connected message from the specified reader or buffer.
         * @function decode
         * @memberof base.Connected
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.Connected} Connected
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Connected.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.Connected();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.nowTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Connected message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.Connected
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.Connected} Connected
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Connected.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Connected message.
         * @function verify
         * @memberof base.Connected
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Connected.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.nowTime != null && message.hasOwnProperty("nowTime"))
                if (!$util.isInteger(message.nowTime) && !(message.nowTime && $util.isInteger(message.nowTime.low) && $util.isInteger(message.nowTime.high)))
                    return "nowTime: integer|Long expected";
            return null;
        };

        /**
         * Creates a Connected message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.Connected
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.Connected} Connected
         */
        Connected.fromObject = function fromObject(object) {
            if (object instanceof $root.base.Connected)
                return object;
            let message = new $root.base.Connected();
            if (object.nowTime != null)
                if ($util.Long)
                    (message.nowTime = $util.Long.fromValue(object.nowTime)).unsigned = false;
                else if (typeof object.nowTime === "string")
                    message.nowTime = parseInt(object.nowTime, 10);
                else if (typeof object.nowTime === "number")
                    message.nowTime = object.nowTime;
                else if (typeof object.nowTime === "object")
                    message.nowTime = new $util.LongBits(object.nowTime.low >>> 0, object.nowTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a Connected message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.Connected
         * @static
         * @param {base.Connected} message Connected
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Connected.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.nowTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.nowTime = options.longs === String ? "0" : 0;
            if (message.nowTime != null && message.hasOwnProperty("nowTime"))
                if (typeof message.nowTime === "number")
                    object.nowTime = options.longs === String ? String(message.nowTime) : message.nowTime;
                else
                    object.nowTime = options.longs === String ? $util.Long.prototype.toString.call(message.nowTime) : options.longs === Number ? new $util.LongBits(message.nowTime.low >>> 0, message.nowTime.high >>> 0).toNumber() : message.nowTime;
            return object;
        };

        /**
         * Converts this Connected to JSON.
         * @function toJSON
         * @memberof base.Connected
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Connected.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Connected;
    })();

    base.ServerAuth = (function() {

        /**
         * Properties of a ServerAuth.
         * @memberof base
         * @interface IServerAuth
         * @property {number|null} [handlerType] ServerAuth handlerType
         * @property {string|null} [sign] ServerAuth sign
         * @property {number|null} [gameId] ServerAuth gameId
         * @property {string|null} [url] ServerAuth url
         * @property {Array.<number>|null} [roomIds] ServerAuth roomIds
         */

        /**
         * Constructs a new ServerAuth.
         * @memberof base
         * @classdesc Represents a ServerAuth.
         * @implements IServerAuth
         * @constructor
         * @param {base.IServerAuth=} [properties] Properties to set
         */
        function ServerAuth(properties) {
            this.roomIds = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServerAuth handlerType.
         * @member {number} handlerType
         * @memberof base.ServerAuth
         * @instance
         */
        ServerAuth.prototype.handlerType = 0;

        /**
         * ServerAuth sign.
         * @member {string} sign
         * @memberof base.ServerAuth
         * @instance
         */
        ServerAuth.prototype.sign = "";

        /**
         * ServerAuth gameId.
         * @member {number} gameId
         * @memberof base.ServerAuth
         * @instance
         */
        ServerAuth.prototype.gameId = 0;

        /**
         * ServerAuth url.
         * @member {string} url
         * @memberof base.ServerAuth
         * @instance
         */
        ServerAuth.prototype.url = "";

        /**
         * ServerAuth roomIds.
         * @member {Array.<number>} roomIds
         * @memberof base.ServerAuth
         * @instance
         */
        ServerAuth.prototype.roomIds = $util.emptyArray;

        /**
         * Creates a new ServerAuth instance using the specified properties.
         * @function create
         * @memberof base.ServerAuth
         * @static
         * @param {base.IServerAuth=} [properties] Properties to set
         * @returns {base.ServerAuth} ServerAuth instance
         */
        ServerAuth.create = function create(properties) {
            return new ServerAuth(properties);
        };

        /**
         * Encodes the specified ServerAuth message. Does not implicitly {@link base.ServerAuth.verify|verify} messages.
         * @function encode
         * @memberof base.ServerAuth
         * @static
         * @param {base.IServerAuth} message ServerAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerAuth.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handlerType != null && Object.hasOwnProperty.call(message, "handlerType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handlerType);
            if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.sign);
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.gameId);
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.url);
            if (message.roomIds != null && message.roomIds.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (let i = 0; i < message.roomIds.length; ++i)
                    writer.int32(message.roomIds[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified ServerAuth message, length delimited. Does not implicitly {@link base.ServerAuth.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.ServerAuth
         * @static
         * @param {base.IServerAuth} message ServerAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerAuth.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ServerAuth message from the specified reader or buffer.
         * @function decode
         * @memberof base.ServerAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.ServerAuth} ServerAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerAuth.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.ServerAuth();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handlerType = reader.int32();
                    break;
                case 2:
                    message.sign = reader.string();
                    break;
                case 3:
                    message.gameId = reader.int32();
                    break;
                case 4:
                    message.url = reader.string();
                    break;
                case 5:
                    if (!(message.roomIds && message.roomIds.length))
                        message.roomIds = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.roomIds.push(reader.int32());
                    } else
                        message.roomIds.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ServerAuth message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.ServerAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.ServerAuth} ServerAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerAuth.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServerAuth message.
         * @function verify
         * @memberof base.ServerAuth
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServerAuth.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handlerType != null && message.hasOwnProperty("handlerType"))
                if (!$util.isInteger(message.handlerType))
                    return "handlerType: integer expected";
            if (message.sign != null && message.hasOwnProperty("sign"))
                if (!$util.isString(message.sign))
                    return "sign: string expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.url != null && message.hasOwnProperty("url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            if (message.roomIds != null && message.hasOwnProperty("roomIds")) {
                if (!Array.isArray(message.roomIds))
                    return "roomIds: array expected";
                for (let i = 0; i < message.roomIds.length; ++i)
                    if (!$util.isInteger(message.roomIds[i]))
                        return "roomIds: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a ServerAuth message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.ServerAuth
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.ServerAuth} ServerAuth
         */
        ServerAuth.fromObject = function fromObject(object) {
            if (object instanceof $root.base.ServerAuth)
                return object;
            let message = new $root.base.ServerAuth();
            if (object.handlerType != null)
                message.handlerType = object.handlerType | 0;
            if (object.sign != null)
                message.sign = String(object.sign);
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.url != null)
                message.url = String(object.url);
            if (object.roomIds) {
                if (!Array.isArray(object.roomIds))
                    throw TypeError(".base.ServerAuth.roomIds: array expected");
                message.roomIds = [];
                for (let i = 0; i < object.roomIds.length; ++i)
                    message.roomIds[i] = object.roomIds[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a ServerAuth message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.ServerAuth
         * @static
         * @param {base.ServerAuth} message ServerAuth
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServerAuth.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.roomIds = [];
            if (options.defaults) {
                object.handlerType = 0;
                object.sign = "";
                object.gameId = 0;
                object.url = "";
            }
            if (message.handlerType != null && message.hasOwnProperty("handlerType"))
                object.handlerType = message.handlerType;
            if (message.sign != null && message.hasOwnProperty("sign"))
                object.sign = message.sign;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            if (message.roomIds && message.roomIds.length) {
                object.roomIds = [];
                for (let j = 0; j < message.roomIds.length; ++j)
                    object.roomIds[j] = message.roomIds[j];
            }
            return object;
        };

        /**
         * Converts this ServerAuth to JSON.
         * @function toJSON
         * @memberof base.ServerAuth
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServerAuth.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ServerAuth;
    })();

    base.RegistrySyncServerData = (function() {

        /**
         * Properties of a RegistrySyncServerData.
         * @memberof base
         * @interface IRegistrySyncServerData
         * @property {Array.<base.IServerData>|null} [servers] RegistrySyncServerData servers
         */

        /**
         * Constructs a new RegistrySyncServerData.
         * @memberof base
         * @classdesc Represents a RegistrySyncServerData.
         * @implements IRegistrySyncServerData
         * @constructor
         * @param {base.IRegistrySyncServerData=} [properties] Properties to set
         */
        function RegistrySyncServerData(properties) {
            this.servers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RegistrySyncServerData servers.
         * @member {Array.<base.IServerData>} servers
         * @memberof base.RegistrySyncServerData
         * @instance
         */
        RegistrySyncServerData.prototype.servers = $util.emptyArray;

        /**
         * Creates a new RegistrySyncServerData instance using the specified properties.
         * @function create
         * @memberof base.RegistrySyncServerData
         * @static
         * @param {base.IRegistrySyncServerData=} [properties] Properties to set
         * @returns {base.RegistrySyncServerData} RegistrySyncServerData instance
         */
        RegistrySyncServerData.create = function create(properties) {
            return new RegistrySyncServerData(properties);
        };

        /**
         * Encodes the specified RegistrySyncServerData message. Does not implicitly {@link base.RegistrySyncServerData.verify|verify} messages.
         * @function encode
         * @memberof base.RegistrySyncServerData
         * @static
         * @param {base.IRegistrySyncServerData} message RegistrySyncServerData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RegistrySyncServerData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.servers != null && message.servers.length)
                for (let i = 0; i < message.servers.length; ++i)
                    $root.base.ServerData.encode(message.servers[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RegistrySyncServerData message, length delimited. Does not implicitly {@link base.RegistrySyncServerData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.RegistrySyncServerData
         * @static
         * @param {base.IRegistrySyncServerData} message RegistrySyncServerData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RegistrySyncServerData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RegistrySyncServerData message from the specified reader or buffer.
         * @function decode
         * @memberof base.RegistrySyncServerData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.RegistrySyncServerData} RegistrySyncServerData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RegistrySyncServerData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.RegistrySyncServerData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.servers && message.servers.length))
                        message.servers = [];
                    message.servers.push($root.base.ServerData.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RegistrySyncServerData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.RegistrySyncServerData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.RegistrySyncServerData} RegistrySyncServerData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RegistrySyncServerData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RegistrySyncServerData message.
         * @function verify
         * @memberof base.RegistrySyncServerData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RegistrySyncServerData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.servers != null && message.hasOwnProperty("servers")) {
                if (!Array.isArray(message.servers))
                    return "servers: array expected";
                for (let i = 0; i < message.servers.length; ++i) {
                    let error = $root.base.ServerData.verify(message.servers[i]);
                    if (error)
                        return "servers." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RegistrySyncServerData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.RegistrySyncServerData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.RegistrySyncServerData} RegistrySyncServerData
         */
        RegistrySyncServerData.fromObject = function fromObject(object) {
            if (object instanceof $root.base.RegistrySyncServerData)
                return object;
            let message = new $root.base.RegistrySyncServerData();
            if (object.servers) {
                if (!Array.isArray(object.servers))
                    throw TypeError(".base.RegistrySyncServerData.servers: array expected");
                message.servers = [];
                for (let i = 0; i < object.servers.length; ++i) {
                    if (typeof object.servers[i] !== "object")
                        throw TypeError(".base.RegistrySyncServerData.servers: object expected");
                    message.servers[i] = $root.base.ServerData.fromObject(object.servers[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a RegistrySyncServerData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.RegistrySyncServerData
         * @static
         * @param {base.RegistrySyncServerData} message RegistrySyncServerData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RegistrySyncServerData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.servers = [];
            if (message.servers && message.servers.length) {
                object.servers = [];
                for (let j = 0; j < message.servers.length; ++j)
                    object.servers[j] = $root.base.ServerData.toObject(message.servers[j], options);
            }
            return object;
        };

        /**
         * Converts this RegistrySyncServerData to JSON.
         * @function toJSON
         * @memberof base.RegistrySyncServerData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RegistrySyncServerData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RegistrySyncServerData;
    })();

    base.ServerData = (function() {

        /**
         * Properties of a ServerData.
         * @memberof base
         * @interface IServerData
         * @property {number|null} [handlerType] ServerData handlerType
         * @property {string|null} [url] ServerData url
         * @property {number|null} [gameId] ServerData gameId
         * @property {Array.<number>|null} [roomIds] ServerData roomIds
         */

        /**
         * Constructs a new ServerData.
         * @memberof base
         * @classdesc Represents a ServerData.
         * @implements IServerData
         * @constructor
         * @param {base.IServerData=} [properties] Properties to set
         */
        function ServerData(properties) {
            this.roomIds = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServerData handlerType.
         * @member {number} handlerType
         * @memberof base.ServerData
         * @instance
         */
        ServerData.prototype.handlerType = 0;

        /**
         * ServerData url.
         * @member {string} url
         * @memberof base.ServerData
         * @instance
         */
        ServerData.prototype.url = "";

        /**
         * ServerData gameId.
         * @member {number} gameId
         * @memberof base.ServerData
         * @instance
         */
        ServerData.prototype.gameId = 0;

        /**
         * ServerData roomIds.
         * @member {Array.<number>} roomIds
         * @memberof base.ServerData
         * @instance
         */
        ServerData.prototype.roomIds = $util.emptyArray;

        /**
         * Creates a new ServerData instance using the specified properties.
         * @function create
         * @memberof base.ServerData
         * @static
         * @param {base.IServerData=} [properties] Properties to set
         * @returns {base.ServerData} ServerData instance
         */
        ServerData.create = function create(properties) {
            return new ServerData(properties);
        };

        /**
         * Encodes the specified ServerData message. Does not implicitly {@link base.ServerData.verify|verify} messages.
         * @function encode
         * @memberof base.ServerData
         * @static
         * @param {base.IServerData} message ServerData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handlerType != null && Object.hasOwnProperty.call(message, "handlerType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handlerType);
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.url);
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.gameId);
            if (message.roomIds != null && message.roomIds.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (let i = 0; i < message.roomIds.length; ++i)
                    writer.int32(message.roomIds[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified ServerData message, length delimited. Does not implicitly {@link base.ServerData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.ServerData
         * @static
         * @param {base.IServerData} message ServerData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ServerData message from the specified reader or buffer.
         * @function decode
         * @memberof base.ServerData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.ServerData} ServerData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.ServerData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handlerType = reader.int32();
                    break;
                case 2:
                    message.url = reader.string();
                    break;
                case 3:
                    message.gameId = reader.int32();
                    break;
                case 4:
                    if (!(message.roomIds && message.roomIds.length))
                        message.roomIds = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.roomIds.push(reader.int32());
                    } else
                        message.roomIds.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ServerData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.ServerData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.ServerData} ServerData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServerData message.
         * @function verify
         * @memberof base.ServerData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServerData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handlerType != null && message.hasOwnProperty("handlerType"))
                if (!$util.isInteger(message.handlerType))
                    return "handlerType: integer expected";
            if (message.url != null && message.hasOwnProperty("url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.roomIds != null && message.hasOwnProperty("roomIds")) {
                if (!Array.isArray(message.roomIds))
                    return "roomIds: array expected";
                for (let i = 0; i < message.roomIds.length; ++i)
                    if (!$util.isInteger(message.roomIds[i]))
                        return "roomIds: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a ServerData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.ServerData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.ServerData} ServerData
         */
        ServerData.fromObject = function fromObject(object) {
            if (object instanceof $root.base.ServerData)
                return object;
            let message = new $root.base.ServerData();
            if (object.handlerType != null)
                message.handlerType = object.handlerType | 0;
            if (object.url != null)
                message.url = String(object.url);
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.roomIds) {
                if (!Array.isArray(object.roomIds))
                    throw TypeError(".base.ServerData.roomIds: array expected");
                message.roomIds = [];
                for (let i = 0; i < object.roomIds.length; ++i)
                    message.roomIds[i] = object.roomIds[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a ServerData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.ServerData
         * @static
         * @param {base.ServerData} message ServerData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServerData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.roomIds = [];
            if (options.defaults) {
                object.handlerType = 0;
                object.url = "";
                object.gameId = 0;
            }
            if (message.handlerType != null && message.hasOwnProperty("handlerType"))
                object.handlerType = message.handlerType;
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.roomIds && message.roomIds.length) {
                object.roomIds = [];
                for (let j = 0; j < message.roomIds.length; ++j)
                    object.roomIds[j] = message.roomIds[j];
            }
            return object;
        };

        /**
         * Converts this ServerData to JSON.
         * @function toJSON
         * @memberof base.ServerData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServerData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ServerData;
    })();

    base.GameServerData = (function() {

        /**
         * Properties of a GameServerData.
         * @memberof base
         * @interface IGameServerData
         * @property {number|null} [gameId] GameServerData gameId
         * @property {string|null} [url] GameServerData url
         * @property {Array.<base.IRoomInfo>|null} [roomInfos] GameServerData roomInfos
         * @property {boolean|null} [running] GameServerData running
         */

        /**
         * Constructs a new GameServerData.
         * @memberof base
         * @classdesc Represents a GameServerData.
         * @implements IGameServerData
         * @constructor
         * @param {base.IGameServerData=} [properties] Properties to set
         */
        function GameServerData(properties) {
            this.roomInfos = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameServerData gameId.
         * @member {number} gameId
         * @memberof base.GameServerData
         * @instance
         */
        GameServerData.prototype.gameId = 0;

        /**
         * GameServerData url.
         * @member {string} url
         * @memberof base.GameServerData
         * @instance
         */
        GameServerData.prototype.url = "";

        /**
         * GameServerData roomInfos.
         * @member {Array.<base.IRoomInfo>} roomInfos
         * @memberof base.GameServerData
         * @instance
         */
        GameServerData.prototype.roomInfos = $util.emptyArray;

        /**
         * GameServerData running.
         * @member {boolean} running
         * @memberof base.GameServerData
         * @instance
         */
        GameServerData.prototype.running = false;

        /**
         * Creates a new GameServerData instance using the specified properties.
         * @function create
         * @memberof base.GameServerData
         * @static
         * @param {base.IGameServerData=} [properties] Properties to set
         * @returns {base.GameServerData} GameServerData instance
         */
        GameServerData.create = function create(properties) {
            return new GameServerData(properties);
        };

        /**
         * Encodes the specified GameServerData message. Does not implicitly {@link base.GameServerData.verify|verify} messages.
         * @function encode
         * @memberof base.GameServerData
         * @static
         * @param {base.IGameServerData} message GameServerData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameServerData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.url);
            if (message.roomInfos != null && message.roomInfos.length)
                for (let i = 0; i < message.roomInfos.length; ++i)
                    $root.base.RoomInfo.encode(message.roomInfos[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.running != null && Object.hasOwnProperty.call(message, "running"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.running);
            return writer;
        };

        /**
         * Encodes the specified GameServerData message, length delimited. Does not implicitly {@link base.GameServerData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.GameServerData
         * @static
         * @param {base.IGameServerData} message GameServerData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameServerData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameServerData message from the specified reader or buffer.
         * @function decode
         * @memberof base.GameServerData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.GameServerData} GameServerData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameServerData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.GameServerData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameId = reader.int32();
                    break;
                case 2:
                    message.url = reader.string();
                    break;
                case 3:
                    if (!(message.roomInfos && message.roomInfos.length))
                        message.roomInfos = [];
                    message.roomInfos.push($root.base.RoomInfo.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.running = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameServerData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.GameServerData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.GameServerData} GameServerData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameServerData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameServerData message.
         * @function verify
         * @memberof base.GameServerData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameServerData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.url != null && message.hasOwnProperty("url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            if (message.roomInfos != null && message.hasOwnProperty("roomInfos")) {
                if (!Array.isArray(message.roomInfos))
                    return "roomInfos: array expected";
                for (let i = 0; i < message.roomInfos.length; ++i) {
                    let error = $root.base.RoomInfo.verify(message.roomInfos[i]);
                    if (error)
                        return "roomInfos." + error;
                }
            }
            if (message.running != null && message.hasOwnProperty("running"))
                if (typeof message.running !== "boolean")
                    return "running: boolean expected";
            return null;
        };

        /**
         * Creates a GameServerData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.GameServerData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.GameServerData} GameServerData
         */
        GameServerData.fromObject = function fromObject(object) {
            if (object instanceof $root.base.GameServerData)
                return object;
            let message = new $root.base.GameServerData();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.url != null)
                message.url = String(object.url);
            if (object.roomInfos) {
                if (!Array.isArray(object.roomInfos))
                    throw TypeError(".base.GameServerData.roomInfos: array expected");
                message.roomInfos = [];
                for (let i = 0; i < object.roomInfos.length; ++i) {
                    if (typeof object.roomInfos[i] !== "object")
                        throw TypeError(".base.GameServerData.roomInfos: object expected");
                    message.roomInfos[i] = $root.base.RoomInfo.fromObject(object.roomInfos[i]);
                }
            }
            if (object.running != null)
                message.running = Boolean(object.running);
            return message;
        };

        /**
         * Creates a plain object from a GameServerData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.GameServerData
         * @static
         * @param {base.GameServerData} message GameServerData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameServerData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.roomInfos = [];
            if (options.defaults) {
                object.gameId = 0;
                object.url = "";
                object.running = false;
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            if (message.roomInfos && message.roomInfos.length) {
                object.roomInfos = [];
                for (let j = 0; j < message.roomInfos.length; ++j)
                    object.roomInfos[j] = $root.base.RoomInfo.toObject(message.roomInfos[j], options);
            }
            if (message.running != null && message.hasOwnProperty("running"))
                object.running = message.running;
            return object;
        };

        /**
         * Converts this GameServerData to JSON.
         * @function toJSON
         * @memberof base.GameServerData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameServerData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameServerData;
    })();

    /**
     * GAME_ID enum.
     * @name base.GAME_ID
     * @enum {number}
     * @property {number} GID_NONE=0 GID_NONE value
     * @property {number} GID_TP=1 GID_TP value
     * @property {number} GID_RUMMY=2 GID_RUMMY value
     * @property {number} GID_TEXAS=3 GID_TEXAS value
     * @property {number} GID_TPJOKER=4 GID_TPJOKER value
     * @property {number} GID_TPAK47=5 GID_TPAK47 value
     * @property {number} GID_RUMMY_2=6 GID_RUMMY_2 value
     * @property {number} GID_AB=8 GID_AB value
     * @property {number} GID_SEVEN=9 GID_SEVEN value
     * @property {number} GID_DRAGON_TIGER=10 GID_DRAGON_TIGER value
     * @property {number} GID_WINGO=11 GID_WINGO value
     * @property {number} GID_FOREST_PARTY=12 GID_FOREST_PARTY value
     * @property {number} GID_CARROM=13 GID_CARROM value
     * @property {number} GID_DISC_POOL=14 GID_DISC_POOL value
     * @property {number} GID_FREESTYLE=15 GID_FREESTYLE value
     * @property {number} GID_POOL=16 GID_POOL value
     * @property {number} GID_POOL_AIM=17 GID_POOL_AIM value
     * @property {number} GID_QA_1=18 GID_QA_1 value
     * @property {number} GID_QA_2=19 GID_QA_2 value
     * @property {number} GID_QA_RANDOM=20 GID_QA_RANDOM value
     * @property {number} GID_LUCKY_SHOT=21 GID_LUCKY_SHOT value
     * @property {number} GID_POOL2=22 GID_POOL2 value
     * @property {number} GID_POOL2_AIM=23 GID_POOL2_AIM value
     * @property {number} GID_RED_BLACK=24 GID_RED_BLACK value
     * @property {number} GID_TRUCO=25 GID_TRUCO value
     * @property {number} GID_TRUCO_CLEAN=26 GID_TRUCO_CLEAN value
     * @property {number} GID_CRASH=30 GID_CRASH value
     * @property {number} GID_SLOTS1=31 GID_SLOTS1 value
     * @property {number} GID_SLOTS2=32 GID_SLOTS2 value
     * @property {number} GID_SLOTS3=33 GID_SLOTS3 value
     * @property {number} GID_PRIVATE_TABLE_TRUCO=40 GID_PRIVATE_TABLE_TRUCO value
     * @property {number} GID_PRIVATE_TABLE_TRUCO_CLEAN=41 GID_PRIVATE_TABLE_TRUCO_CLEAN value
     * @property {number} GID_SLOTS4=50 GID_SLOTS4 value
     * @property {number} GID_EGYPT_SLOTS=51 GID_EGYPT_SLOTS value
     * @property {number} GID_AZTEC_SLOTS=52 GID_AZTEC_SLOTS value
     * @property {number} GID_JLB_SLOTS=53 GID_JLB_SLOTS value
     * @property {number} GID_DRAGON_SLOTS=54 GID_DRAGON_SLOTS value
     * @property {number} GID_ZEUS_SLOTS=55 GID_ZEUS_SLOTS value
     * @property {number} GID_FRUIT_SLOTS=56 GID_FRUIT_SLOTS value
     * @property {number} GID_SJB02_SLOTS=57 GID_SJB02_SLOTS value
     * @property {number} GID_SPARTA_SLOTS=58 GID_SPARTA_SLOTS value
     * @property {number} GID_MONEY_SLOTS=59 GID_MONEY_SLOTS value
     * @property {number} GID_TIGER_SLOTS=60 GID_TIGER_SLOTS value
     * @property {number} GID_ZEUS02_SLOTS=61 GID_ZEUS02_SLOTS value
     * @property {number} GID_BULL_SLOTS=62 GID_BULL_SLOTS value
     * @property {number} GID_WOLF_SLOTS=63 GID_WOLF_SLOTS value
     * @property {number} GID_TIGER02_SLOTS=64 GID_TIGER02_SLOTS value
     * @property {number} GID_LPIG_SLOTS=65 GID_LPIG_SLOTS value
     * @property {number} GID_NMOUSE_SLOTS=66 GID_NMOUSE_SLOTS value
     * @property {number} GID_NCOW_SLOTS=67 GID_NCOW_SLOTS value
     * @property {number} GID_NTIGER_SLOTS=68 GID_NTIGER_SLOTS value
     * @property {number} GID_NRABIT_SLOTS=69 GID_NRABIT_SLOTS value
     * @property {number} GID_POTIONSPELLS_SLOTS=10001 GID_POTIONSPELLS_SLOTS value
     * @property {number} GID_SWEETRUSHMEGAWAYS_SLOTS=10002 GID_SWEETRUSHMEGAWAYS_SLOTS value
     * @property {number} GID_ROAD2RICHES_SLOTS=10003 GID_ROAD2RICHES_SLOTS value
     * @property {number} GID_LUCKYLADYMOONMEGAWAYS_SLOTS=10004 GID_LUCKYLADYMOONMEGAWAYS_SLOTS value
     * @property {number} GID_DOMNITORSTREASURE_SLOTS=10005 GID_DOMNITORSTREASURE_SLOTS value
     * @property {number} GID_TREE_OF_LIGHT_SLOTS=20001 GID_TREE_OF_LIGHT_SLOTS value
     * @property {number} GID_FOREST_DREAMS_SLOTS=20002 GID_FOREST_DREAMS_SLOTS value
     * @property {number} GID_NUKE_WORLD_SLOTS=20003 GID_NUKE_WORLD_SLOTS value
     * @property {number} GID_RUEDA_DE_CHILE_SLOTS=20004 GID_RUEDA_DE_CHILE_SLOTS value
     * @property {number} GID_PACHIN_GIRL_SLOTS=20005 GID_PACHIN_GIRL_SLOTS value
     * @property {number} GID_PENALTYSHOOTOUT_SLOTS=20006 GID_PENALTYSHOOTOUT_SLOTS value
     * @property {number} GID_THEGREATESTCATCH_SLOTS=20007 GID_THEGREATESTCATCH_SLOTS value
     * @property {number} GID_EUROPEANROULETTE_SLOTS=20008 GID_EUROPEANROULETTE_SLOTS value
     * @property {number} GID_HOTVOLCANO_SLOTS=20009 GID_HOTVOLCANO_SLOTS value
     * @property {number} GID_SOLDIT_SLOTS=20010 GID_SOLDIT_SLOTS value
     * @property {number} GID_FRUITBURST_SLOTS=20011 GID_FRUITBURST_SLOTS value
     * @property {number} GID_HOTRIONIGHTS_SLOTS=20012 GID_HOTRIONIGHTS_SLOTS value
     * @property {number} GID_IRISHWEEKEND_SLOTS=20013 GID_IRISHWEEKEND_SLOTS value
     * @property {number} GID_OLDWEST_SLOTS=20014 GID_OLDWEST_SLOTS value
     * @property {number} GID_PATRICKSMAGICFIELD_SLOTS=20015 GID_PATRICKSMAGICFIELD_SLOTS value
     * @property {number} GID_CAMINODECHILIBONUSBUY_SLOTS=20016 GID_CAMINODECHILIBONUSBUY_SLOTS value
     * @property {number} GID_EGYPTGODS_SLOTS=20017 GID_EGYPTGODS_SLOTS value
     * @property {number} GID_BASKETBALL_SLOTS=20018 GID_BASKETBALL_SLOTS value
     * @property {number} GID_TALISMANSOFFORTUNE_SLOTS=20019 GID_TALISMANSOFFORTUNE_SLOTS value
     * @property {number} GID_THEGREATWALLTREASURE_SLOTS=20020 GID_THEGREATWALLTREASURE_SLOTS value
     * @property {number} GID_ROBINHOOD_SLOTS=20021 GID_ROBINHOOD_SLOTS value
     * @property {number} GID_CLASHOFPIRATES_SLOTS=20022 GID_CLASHOFPIRATES_SLOTS value
     * @property {number} GID_JOURNEYTOTHEWEST_SLOTS=20023 GID_JOURNEYTOTHEWEST_SLOTS value
     * @property {number} GID_VEGASNIGHTS_SLOTS=20024 GID_VEGASNIGHTS_SLOTS value
     * @property {number} GID_JEWELLERYSTORE_SLOTS=20025 GID_JEWELLERYSTORE_SLOTS value
     * @property {number} GID_REDCLIFF_SLOTS=20026 GID_REDCLIFF_SLOTS value
     * @property {number} GID_ACEROUND_SLOTS=20027 GID_ACEROUND_SLOTS value
     * @property {number} GID_ELVENPRINCESSES_SLOTS=20028 GID_ELVENPRINCESSES_SLOTS value
     * @property {number} GID_LEGENDOFRA_SLOTS=20029 GID_LEGENDOFRA_SLOTS value
     * @property {number} GID_THEEMPERORSTOMB_SLOTS=20030 GID_THEEMPERORSTOMB_SLOTS value
     * @property {number} GID_NECROMANCER_SLOTS=20031 GID_NECROMANCER_SLOTS value
     * @property {number} GID_NAUGHTYGIRLSCABARET_SLOTS=20032 GID_NAUGHTYGIRLSCABARET_SLOTS value
     * @property {number} GID_ATLANTIS_SLOTS=20033 GID_ATLANTIS_SLOTS value
     * @property {number} GID_ROBINSON_SLOTS=20034 GID_ROBINSON_SLOTS value
     * @property {number} GID_CANDYDREAMS_SLOTS=20035 GID_CANDYDREAMS_SLOTS value
     * @property {number} GID_HEADSTAILS_SLOTS=20036 GID_HEADSTAILS_SLOTS value
     * @property {number} GID_MOREORLESS_SLOTS=20037 GID_MOREORLESS_SLOTS value
     * @property {number} GID_OASISPOKERCLASSIC_SLOTS=20038 GID_OASISPOKERCLASSIC_SLOTS value
     * @property {number} GID_BLACKJACKLUCKYSEVENS_SLOTS=20039 GID_BLACKJACKLUCKYSEVENS_SLOTS value
     * @property {number} GID_USSRSEVENTIES_SLOTS=20040 GID_USSRSEVENTIES_SLOTS value
     * @property {number} GID_THESLAVS_SLOTS=20041 GID_THESLAVS_SLOTS value
     * @property {number} GID_FOURACES_SLOTS=20042 GID_FOURACES_SLOTS value
     * @property {number} GID_REDQUEEN_SLOTS=20043 GID_REDQUEEN_SLOTS value
     * @property {number} GID_LEPRECHAUN_RICHES_SLOTS=30001 GID_LEPRECHAUN_RICHES_SLOTS value
     * @property {number} GID_TREE_FORTUNE_SLOTS=30002 GID_TREE_FORTUNE_SLOTS value
     * @property {number} GID_GEM_SAVIOUR_SLOTS=30003 GID_GEM_SAVIOUR_SLOTS value
     * @property {number} GID_BIKINI_PARADISE_SLOTS=30004 GID_BIKINI_PARADISE_SLOTS value
     * @property {number} GID_LUCKY_PIGGY_SLOTS=30005 GID_LUCKY_PIGGY_SLOTS value
     * @property {number} GID_TREASURES_AZTEC_SLOTS=30006 GID_TREASURES_AZTEC_SLOTS value
     * @property {number} GID_CAPTAIN_BOUNTY_SLOTS=30007 GID_CAPTAIN_BOUNTY_SLOTS value
     * @property {number} GID_QUEEN_BOUNTY_SLOTS=30008 GID_QUEEN_BOUNTY_SLOTS value
     * @property {number} GID_WILD_BANDITO_SLOTS=30009 GID_WILD_BANDITO_SLOTS value
     * @property {number} GID_DRAGON_HATCH_SLOTS=30010 GID_DRAGON_HATCH_SLOTS value
     * @property {number} GID_GREAT_ICESCAPE_SLOTS=30011 GID_GREAT_ICESCAPE_SLOTS value
     * @property {number} GID_GANESHA_FORTUNE_SLOTS=30012 GID_GANESHA_FORTUNE_SLOTS value
     * @property {number} GID_DREAMS_MACAU_SLOTS=30013 GID_DREAMS_MACAU_SLOTS value
     * @property {number} GID_WILD_BOUNTY_SHOWDOWN_SLOTS=30014 GID_WILD_BOUNTY_SHOWDOWN_SLOTS value
     * @property {number} GID_PROSPERITY_FORTUNE_SLOTS=30015 GID_PROSPERITY_FORTUNE_SLOTS value
     * @property {number} GID_DINER_DELIGHTS_SLOTS=30016 GID_DINER_DELIGHTS_SLOTS value
     * @property {number} GID_EGYPT_BOOK_MYSTERY_SLOTS=30017 GID_EGYPT_BOOK_MYSTERY_SLOTS value
     * @property {number} GID_WILD_FIREWORKS_SLOTS=30018 GID_WILD_FIREWORKS_SLOTS value
     * @property {number} GID_THAI_RIVER_WONDERS_SLOTS=30019 GID_THAI_RIVER_WONDERS_SLOTS value
     * @property {number} GID_BALI_VACATION_SLOTS=30020 GID_BALI_VACATION_SLOTS value
     * @property {number} GID_CRYPTO_GOLD_SLOTS=30021 GID_CRYPTO_GOLD_SLOTS value
     * @property {number} GID_JURASSIC_KINGDOM_SLOTS=30022 GID_JURASSIC_KINGDOM_SLOTS value
     * @property {number} GID_COCKTAIL_NIGHTS_SLOTS=30023 GID_COCKTAIL_NIGHTS_SLOTS value
     * @property {number} GID_FORTUNE_TIGER_SLOTS=30024 GID_FORTUNE_TIGER_SLOTS value
     * @property {number} GID_SPEED_WINNER_SLOTS=30025 GID_SPEED_WINNER_SLOTS value
     * @property {number} GID_LEGEND_PERSEUS_SLOTS=30026 GID_LEGEND_PERSEUS_SLOTS value
     * @property {number} GID_WINWIN_WON_SLOTS=30027 GID_WINWIN_WON_SLOTS value
     * @property {number} GID_MEDUSA_II_SLOTS=30028 GID_MEDUSA_II_SLOTS value
     * @property {number} GID_MEDUSA_SLOTS=30029 GID_MEDUSA_SLOTS value
     * @property {number} GID_PLUSHIE_FRENZY_SLOTS=30030 GID_PLUSHIE_FRENZY_SLOTS value
     * @property {number} GID_WIZDOM_WONDERS_SLOTS=30031 GID_WIZDOM_WONDERS_SLOTS value
     * @property {number} GID_HOOD_WOLF_SLOTS=30032 GID_HOOD_WOLF_SLOTS value
     * @property {number} GID_HALLOW_WIN_SLOTS=30033 GID_HALLOW_WIN_SLOTS value
     * @property {number} GID_SANTA_GIFT_RUSH_SLOTS=30034 GID_SANTA_GIFT_RUSH_SLOTS value
     * @property {number} GID_GEM_SAVIOUR_SWORD_SLOTS=30035 GID_GEM_SAVIOUR_SWORD_SLOTS value
     * @property {number} GID_SYMBOLS_EGYPT_SLOTS=30036 GID_SYMBOLS_EGYPT_SLOTS value
     * @property {number} GID_GANESHA_GOLD_SLOTS=30037 GID_GANESHA_GOLD_SLOTS value
     * @property {number} GID_THREE_MONKEYS_SLOTS=30038 GID_THREE_MONKEYS_SLOTS value
     * @property {number} GID_JUNGLE_DELIGHT_SLOTS=30039 GID_JUNGLE_DELIGHT_SLOTS value
     * @property {number} GID_NINJA_SAMURAI_SLOTS=30040 GID_NINJA_SAMURAI_SLOTS value
     * @property {number} GID_MUAY_THAI_SLOTS=30041 GID_MUAY_THAI_SLOTS value
     * @property {number} GID_REEL_LOVE_SLOTS=30042 GID_REEL_LOVE_SLOTS value
     * @property {number} GID_GEM_SAVIOUR_CONQUEST_SLOTS=30043 GID_GEM_SAVIOUR_CONQUEST_SLOTS value
     * @property {number} GID_CANDY_BURST_SLOTS=30044 GID_CANDY_BURST_SLOTS value
     * @property {number} GID_GENIE_WISHES_SLOTS=30045 GID_GENIE_WISHES_SLOTS value
     * @property {number} GID_CIRCUS_DELIGHT_SLOTS=30046 GID_CIRCUS_DELIGHT_SLOTS value
     * @property {number} GID_SECRETS_CLEOPATRA_SLOTS=30047 GID_SECRETS_CLEOPATRA_SLOTS value
     * @property {number} GID_VAMPIRE_CHARM_SLOTS=30048 GID_VAMPIRE_CHARM_SLOTS value
     * @property {number} GID_JEWELS_PROSPERITY_SLOTS=30049 GID_JEWELS_PROSPERITY_SLOTS value
     * @property {number} GID_JACK_FROST_SLOTS=30050 GID_JACK_FROST_SLOTS value
     * @property {number} GID_GALACTIC_GEMS_SLOTS=30051 GID_GALACTIC_GEMS_SLOTS value
     * @property {number} GID_GUARDIANS_FIRE_SLOTS=30052 GID_GUARDIANS_FIRE_SLOTS value
     * @property {number} GID_MAJESTIC_TREASURES_SLOTS=30053 GID_MAJESTIC_TREASURES_SLOTS value
     * @property {number} GID_CANDY_BONANZA_SLOTS=30054 GID_CANDY_BONANZA_SLOTS value
     * @property {number} GID_HEIST_STAKES_SLOTS=30055 GID_HEIST_STAKES_SLOTS value
     * @property {number} GID_RISE_APOLLO_SLOTS=30056 GID_RISE_APOLLO_SLOTS value
     * @property {number} GID_MERMAID_RICHES_SLOTS=30057 GID_MERMAID_RICHES_SLOTS value
     * @property {number} GID_RAIDER_JANE_SLOTS=30058 GID_RAIDER_JANE_SLOTS value
     * @property {number} GID_SUPERMARKET_SPREE_SLOTS=30059 GID_SUPERMARKET_SPREE_SLOTS value
     * @property {number} GID_BUFFALO_WIN_SLOTS=30060 GID_BUFFALO_WIN_SLOTS value
     * @property {number} GID_LEGENDARY_MONKEY_KING_SLOTS=30061 GID_LEGENDARY_MONKEY_KING_SLOTS value
     * @property {number} GID_SPIRITED_WONDERS_SLOTS=30062 GID_SPIRITED_WONDERS_SLOTS value
     * @property {number} GID_FARM_INVADERS_SLOTS=30063 GID_FARM_INVADERS_SLOTS value
     * @property {number} GID_EMOJI_RICHES_SLOTS=30064 GID_EMOJI_RICHES_SLOTS value
     * @property {number} GID_MASK_CARNIVAL_SLOTS=30065 GID_MASK_CARNIVAL_SLOTS value
     * @property {number} GID_GARUDA_GEMS_SLOTS=30066 GID_GARUDA_GEMS_SLOTS value
     * @property {number} GID_DESTINY_MOON_SLOTS=30067 GID_DESTINY_MOON_SLOTS value
     * @property {number} GID_BUTTERFLY_BLOSSOM_SLOTS=30068 GID_BUTTERFLY_BLOSSOM_SLOTS value
     * @property {number} GID_ROOSTER_RUMBLE_SLOTS=30069 GID_ROOSTER_RUMBLE_SLOTS value
     * @property {number} GID_QUEEN_BANQUET_SLOTS=30070 GID_QUEEN_BANQUET_SLOTS value
     * @property {number} GID_BATTLEGROUND_ROYALE_SLOTS=30071 GID_BATTLEGROUND_ROYALE_SLOTS value
     * @property {number} GID_WILD_COASTER_SLOTS=30072 GID_WILD_COASTER_SLOTS value
     * @property {number} GID_TOTEM_WONDERS_SLOTS=30073 GID_TOTEM_WONDERS_SLOTS value
     * @property {number} GID_ALCHEMY_GOLD_SLOTS=30074 GID_ALCHEMY_GOLD_SLOTS value
     * @property {number} GID_ASGARDIAN_RISING_SLOTS=30075 GID_ASGARDIAN_RISING_SLOTS value
     * @property {number} GID_MIDAS_FORTUNE_SLOTS=30076 GID_MIDAS_FORTUNE_SLOTS value
     * @property {number} GID_FORTUNE_RABBIT_SLOTS=30077 GID_FORTUNE_RABBIT_SLOTS value
     * @property {number} GID_RAVE_PARTY_FEVER_SLOTS=30078 GID_RAVE_PARTY_FEVER_SLOTS value
     * @property {number} GID_HAWAIIAN_TIKI_SLOTS=30079 GID_HAWAIIAN_TIKI_SLOTS value
     * @property {number} GID_BAKERY_BONANZA_SLOTS=30080 GID_BAKERY_BONANZA_SLOTS value
     * @property {number} GID_FURY_ODIN_MEGAWAYS_SLOTS=40001 GID_FURY_ODIN_MEGAWAYS_SLOTS value
     * @property {number} GID_GATES_OLYMPUS_SLOTS=40002 GID_GATES_OLYMPUS_SLOTS value
     * @property {number} GID_SWEET_BONANZA_SLOTS=40003 GID_SWEET_BONANZA_SLOTS value
     * @property {number} GID_BIG_BASS_SPLASH_SLOTS=40004 GID_BIG_BASS_SPLASH_SLOTS value
     * @property {number} GID_BIG_BASS_BONANZA_SLOTS=40005 GID_BIG_BASS_BONANZA_SLOTS value
     * @property {number} GID_JOKER_JEWELS_SLOTS=40006 GID_JOKER_JEWELS_SLOTS value
     * @property {number} GID_GEMS_BONANZA_SLOTS=40007 GID_GEMS_BONANZA_SLOTS value
     * @property {number} GID_BIGGER_BASS_BONANZA_SLOTS=40008 GID_BIGGER_BASS_BONANZA_SLOTS value
     * @property {number} GID_RELEASE_THE_KRAKEN_SLOTS=40009 GID_RELEASE_THE_KRAKEN_SLOTS value
     * @property {number} GID_SWEET_BONANZA_XMAS_SLOTS=40010 GID_SWEET_BONANZA_XMAS_SLOTS value
     * @property {number} GID_WOLF_GOLD_SLOTS=40011 GID_WOLF_GOLD_SLOTS value
     * @property {number} GID_SUPER7S_SLOTS=40012 GID_SUPER7S_SLOTS value
     * @property {number} GID_WILD_WILD_RICHES_SLOTS=40013 GID_WILD_WILD_RICHES_SLOTS value
     * @property {number} GID_FRUIT_PARTY_SLOTS=40014 GID_FRUIT_PARTY_SLOTS value
     * @property {number} GID_STARLIGHT_PRINCESS_SLOTS=40015 GID_STARLIGHT_PRINCESS_SLOTS value
     * @property {number} GID_DIAMOND_STRIKE_SLOTS=40016 GID_DIAMOND_STRIKE_SLOTS value
     * @property {number} GID_MUSTANG_GOLD_SLOTS=40017 GID_MUSTANG_GOLD_SLOTS value
     * @property {number} GID_FLOATINGDRAGON_SLOTS=40018 GID_FLOATINGDRAGON_SLOTS value
     * @property {number} GID_BONANZA_KEEPING_REEL_SLOTS=40019 GID_BONANZA_KEEPING_REEL_SLOTS value
     * @property {number} GID_CHRISTMAS_CATCH_SLOTS=40020 GID_CHRISTMAS_CATCH_SLOTS value
     * @property {number} GID_888GOLD_SLOTS=40021 GID_888GOLD_SLOTS value
     * @property {number} GID_GOLDPARTY_SLOTS=40022 GID_GOLDPARTY_SLOTS value
     * @property {number} GID_5LIONS_MEGAWAYS_SLOTS=40023 GID_5LIONS_MEGAWAYS_SLOTS value
     * @property {number} GID_WILD_WEST_GOLD_SLOTS=40024 GID_WILD_WEST_GOLD_SLOTS value
     * @property {number} GID_CHRISTMAS_BASS_BONANZA_SLOTS=40025 GID_CHRISTMAS_BASS_BONANZA_SLOTS value
     * @property {number} GID_BUFFALO_KING_MEGAWAYS_SLOTS=40026 GID_BUFFALO_KING_MEGAWAYS_SLOTS value
     * @property {number} GID_POWER_THOR_MEGAWAYS_SLOTS=40027 GID_POWER_THOR_MEGAWAYS_SLOTS value
     * @property {number} GID_DOG_HOUSE_MEGAWAYS_SLOTS=40028 GID_DOG_HOUSE_MEGAWAYS_SLOTS value
     * @property {number} GID_MASTER_CHEN_FORTUNE_SLOTS=40029 GID_MASTER_CHEN_FORTUNE_SLOTS value
     * @property {number} GID_MADAME_DESTINY_MEGAWAYS_SLOTS=40030 GID_MADAME_DESTINY_MEGAWAYS_SLOTS value
     * @property {number} GID_SANTA_GREAT_GIFTS_SLOTS=40031 GID_SANTA_GREAT_GIFTS_SLOTS value
     * @property {number} GID_ULTRA_HOLD_SPIN_SLOTS=40032 GID_ULTRA_HOLD_SPIN_SLOTS value
     * @property {number} GID_BLACK_BULL_SLOTS=40033 GID_BLACK_BULL_SLOTS value
     * @property {number} GID_JUICY_FRUITS_SLOTS=40034 GID_JUICY_FRUITS_SLOTS value
     * @property {number} GID_SPIRIT_ADVENTURE_SLOTS=40035 GID_SPIRIT_ADVENTURE_SLOTS value
     * @property {number} GID_WILD_WEST_DUELS_SLOTS=40036 GID_WILD_WEST_DUELS_SLOTS value
     * @property {number} GID_OCTOBEER_FORTUNES_SLOTS=40037 GID_OCTOBEER_FORTUNES_SLOTS value
     * @property {number} GID_FRUIT_PARTY2_SLOTS=40038 GID_FRUIT_PARTY2_SLOTS value
     * @property {number} GID_HEART_RIO_SLOTS=40039 GID_HEART_RIO_SLOTS value
     * @property {number} GID_MADAME_DESTINY_SLOTS=40040 GID_MADAME_DESTINY_SLOTS value
     * @property {number} GID_RELEASE_KRAKEN2_SLOTS=40041 GID_RELEASE_KRAKEN2_SLOTS value
     * @property {number} GID_COSMICCASH_SLOTS=40042 GID_COSMICCASH_SLOTS value
     * @property {number} GID_DRAGON_HERO_SLOTS=40043 GID_DRAGON_HERO_SLOTS value
     * @property {number} GID_HOT_PEPPER_SLOTS=40044 GID_HOT_PEPPER_SLOTS value
     * @property {number} GID_GOLDEN_BEAUTY_SLOTS=40045 GID_GOLDEN_BEAUTY_SLOTS value
     * @property {number} GID_CLUBTROPICANA_SLOTS=40046 GID_CLUBTROPICANA_SLOTS value
     * @property {number} GID_THEDOGHOUSE_SLOTS=40047 GID_THEDOGHOUSE_SLOTS value
     * @property {number} GID_WILDWILD_BANANAS_SLOTS=40048 GID_WILDWILD_BANANAS_SLOTS value
     * @property {number} GID_FIRESTRIKE_SLOTS=40049 GID_FIRESTRIKE_SLOTS value
     * @property {number} GID_LUCKYLIGHTNING_SLOTS=40050 GID_LUCKYLIGHTNING_SLOTS value
     * @property {number} GID_PIZZAPIZZAPIZZA_SLOTS=40051 GID_PIZZAPIZZAPIZZA_SLOTS value
     * @property {number} GID_HOTFIESTA_SLOTS=40052 GID_HOTFIESTA_SLOTS value
     * @property {number} GID_FISHEYE_SLOTS=40053 GID_FISHEYE_SLOTS value
     * @property {number} GID_MASTER_JOKER_SLOTS=40054 GID_MASTER_JOKER_SLOTS value
     * @property {number} GID_MUERTOS_MULTIPLIER_SLOTS=40055 GID_MUERTOS_MULTIPLIER_SLOTS value
     * @property {number} GID_EXTRAMEGAWAYS_SLOTS=40056 GID_EXTRAMEGAWAYS_SLOTS value
     * @property {number} GID_CASH_PATROL_SLOTS=40057 GID_CASH_PATROL_SLOTS value
     * @property {number} GID_MONSTERSUPERLANCHE_SLOTS=40058 GID_MONSTERSUPERLANCHE_SLOTS value
     * @property {number} GID_GREAT_RHINO_MEGAWAYS_SLOTS=40059 GID_GREAT_RHINO_MEGAWAYS_SLOTS value
     * @property {number} GID_WILDWILDRICHES_SLOTS=40060 GID_WILDWILDRICHES_SLOTS value
     * @property {number} GID_BIGBASSBONANZAM_SLOTS=40061 GID_BIGBASSBONANZAM_SLOTS value
     * @property {number} GID_BRONCO_SPIRIT_SLOTS=40062 GID_BRONCO_SPIRIT_SLOTS value
     * @property {number} GID_888DRAGONS_SLOTS=40063 GID_888DRAGONS_SLOTS value
     * @property {number} GID_LUCKY_FISHING_SLOTS=40064 GID_LUCKY_FISHING_SLOTS value
     * @property {number} GID_LEGEND_HEROESM_SLOTS=40065 GID_LEGEND_HEROESM_SLOTS value
     * @property {number} GID_RABBIT_GARDEN_SLOTS=40066 GID_RABBIT_GARDEN_SLOTS value
     * @property {number} GID_JOHN_HUNTER_SLOTS=40067 GID_JOHN_HUNTER_SLOTS value
     * @property {number} GID_MOCHIMON_SLOTS=40068 GID_MOCHIMON_SLOTS value
     * @property {number} GID_SECRETCITYGOLD_SLOTS=40069 GID_SECRETCITYGOLD_SLOTS value
     * @property {number} GID_HAND_MIDAS_SLOTS=40070 GID_HAND_MIDAS_SLOTS value
     * @property {number} GID_FIRE88_SLOTS=40071 GID_FIRE88_SLOTS value
     * @property {number} GID_TEMUJIN_TREASURES_SLOTS=40072 GID_TEMUJIN_TREASURES_SLOTS value
     * @property {number} GID_CLEOCATRA_SLOTS=40073 GID_CLEOCATRA_SLOTS value
     * @property {number} GID_CHILLI_HEAT_SLOTS=40074 GID_CHILLI_HEAT_SLOTS value
     * @property {number} GID_GORILLA_MAYHEM_SLOTS=40075 GID_GORILLA_MAYHEM_SLOTS value
     * @property {number} GID_SWEET_POWERNUDGE_SLOTS=40076 GID_SWEET_POWERNUDGE_SLOTS value
     * @property {number} GID_BARN_FESTIVAL_SLOTS=40077 GID_BARN_FESTIVAL_SLOTS value
     * @property {number} GID_MAMMOTH_GOLD_SLOTS=40078 GID_MAMMOTH_GOLD_SLOTS value
     * @property {number} GID_GREAT_RHINO_SLOTS=40079 GID_GREAT_RHINO_SLOTS value
     * @property {number} GID_FIREBIRD_SPIRIT_SLOTS=40080 GID_FIREBIRD_SPIRIT_SLOTS value
     * @property {number} GID_SWORD_ARES_SLOTS=40081 GID_SWORD_ARES_SLOTS value
     * @property {number} GID_QUEENIE_SLOTS=40082 GID_QUEENIE_SLOTS value
     * @property {number} GID_WILD_WEST_MEGAWAYS_SLOTS=40083 GID_WILD_WEST_MEGAWAYS_SLOTS value
     * @property {number} GID_DOG_HOUSE_MULTIHOLD_SLOTS=40084 GID_DOG_HOUSE_MULTIHOLD_SLOTS value
     * @property {number} GID_STARLIGHT_CHRISTMAS_SLOTS=40085 GID_STARLIGHT_CHRISTMAS_SLOTS value
     * @property {number} GID_FLOATING_DRAGON_SLOTS=40086 GID_FLOATING_DRAGON_SLOTS value
     * @property {number} GID_WILD_BOOSTER_SLOTS=40087 GID_WILD_BOOSTER_SLOTS value
     * @property {number} GID_BOOK_GOLDEN_SANDS_SLOTS=40088 GID_BOOK_GOLDEN_SANDS_SLOTS value
     * @property {number} GID_FIRE_STRIKE_SLOTS=40089 GID_FIRE_STRIKE_SLOTS value
     * @property {number} GID_BOOK_TUT_SLOTS=40090 GID_BOOK_TUT_SLOTS value
     * @property {number} GID_MYSTERIOUS_EGYPT_SLOTS=40091 GID_MYSTERIOUS_EGYPT_SLOTS value
     * @property {number} GID_FORTUNE_GIZA_SLOTS=40092 GID_FORTUNE_GIZA_SLOTS value
     * @property {number} GID_SUPERX_SLOTS=40093 GID_SUPERX_SLOTS value
     * @property {number} GID_CHRISTMAS_CAROLM_SLOTS=40094 GID_CHRISTMAS_CAROLM_SLOTS value
     * @property {number} GID_MYSTERY_THEORIENT_SLOTS=40095 GID_MYSTERY_THEORIENT_SLOTS value
     * @property {number} GID_TIGERTREASURES_SLOTS=40096 GID_TIGERTREASURES_SLOTS value
     * @property {number} GID_BOOK_FALLEN_SLOTS=40097 GID_BOOK_FALLEN_SLOTS value
     * @property {number} GID_ZOMBIE_CARNIVAL_SLOTS=40098 GID_ZOMBIE_CARNIVAL_SLOTS value
     * @property {number} GID_GOLD_TRAIN_SLOTS=40099 GID_GOLD_TRAIN_SLOTS value
     * @property {number} GID_MONEY_MOUSE_SLOTS=40100 GID_MONEY_MOUSE_SLOTS value
     * @property {number} GID_5LIONS_GOLD_SLOTS=40101 GID_5LIONS_GOLD_SLOTS value
     * @property {number} GID_LUCKY_YEAR_SLOTS=40102 GID_LUCKY_YEAR_SLOTS value
     * @property {number} GID_CLOVERGOLD_SLOTS=40103 GID_CLOVERGOLD_SLOTS value
     * @property {number} GID_GATESGATOT_KACA_SLOTS=40104 GID_GATESGATOT_KACA_SLOTS value
     * @property {number} GID_AZTECGEMS_SLOTS=40105 GID_AZTECGEMS_SLOTS value
     * @property {number} GID_CROWN_FIRE_SLOTS=40106 GID_CROWN_FIRE_SLOTS value
     * @property {number} GID_GREAT_RHINO_DELUXE_SLOTS=40107 GID_GREAT_RHINO_DELUXE_SLOTS value
     * @property {number} GID_GOBLIN_HEIST_POWERNUDGE_SLOTS=40108 GID_GOBLIN_HEIST_POWERNUDGE_SLOTS value
     * @property {number} GID_SUPER_JOKER_SLOTS=40109 GID_SUPER_JOKER_SLOTS value
     * @property {number} GID_REEL_BANKS_SLOTS=40110 GID_REEL_BANKS_SLOTS value
     * @property {number} GID_TREE_RICHES_SLOTS=40111 GID_TREE_RICHES_SLOTS value
     * @property {number} GID_AZTECGEMS_DELUXE_SLOTS=40112 GID_AZTECGEMS_DELUXE_SLOTS value
     * @property {number} GID_DOWN_RAILS_SLOTS=40113 GID_DOWN_RAILS_SLOTS value
     * @property {number} GID_HOT_BURN_HOLD_SPIN_SLOTS=40114 GID_HOT_BURN_HOLD_SPIN_SLOTS value
     * @property {number} GID_VEGAS_SLOTS=40115 GID_VEGAS_SLOTS value
     * @property {number} GID_TROPICALTIKI_SLOTS=40116 GID_TROPICALTIKI_SLOTS value
     * @property {number} GID_RAINBOWGOLD_SLOTS=40117 GID_RAINBOWGOLD_SLOTS value
     * @property {number} GID_DRAGONKINGDOM_SLOTS=40118 GID_DRAGONKINGDOM_SLOTS value
     * @property {number} GID_DRAGONS_SLOTS=40119 GID_DRAGONS_SLOTS value
     * @property {number} GID_BIG_JUAN_SLOTS=40120 GID_BIG_JUAN_SLOTS value
     * @property {number} GID_AMAZING_MONEYMACHINE_SLOTS=40121 GID_AMAZING_MONEYMACHINE_SLOTS value
     * @property {number} GID_LITTLEGEM_HOLD_SPIN_SLOTS=40122 GID_LITTLEGEM_HOLD_SPIN_SLOTS value
     * @property {number} GID_FIREARCHER_SLOTS=40123 GID_FIREARCHER_SLOTS value
     * @property {number} GID_WILDHOP_DROP_SLOTS=40124 GID_WILDHOP_DROP_SLOTS value
     * @property {number} GID_DRAGON_KINGDOMEYES_SLOTS=40125 GID_DRAGON_KINGDOMEYES_SLOTS value
     * @property {number} GID_MONKEYS_SLOTS=40126 GID_MONKEYS_SLOTS value
     * @property {number} GID_BOOKTUT_RESPIN_SLOTS=40127 GID_BOOKTUT_RESPIN_SLOTS value
     * @property {number} GID_PANDA_FORTUNE_SLOTS=40128 GID_PANDA_FORTUNE_SLOTS value
     * @property {number} GID_CONGO_CASH_SLOTS=40129 GID_CONGO_CASH_SLOTS value
     * @property {number} GID_ELEMENTAL_GEMS_SLOTS=40130 GID_ELEMENTAL_GEMS_SLOTS value
     * @property {number} GID_COWBOYS_GOLD_SLOTS=40131 GID_COWBOYS_GOLD_SLOTS value
     * @property {number} GID_PHOENIX_FORGE_SLOTS=40132 GID_PHOENIX_FORGE_SLOTS value
     * @property {number} GID_MAGICIAN_SECRETS_SLOTS=40133 GID_MAGICIAN_SECRETS_SLOTS value
     * @property {number} GID_VEGAS_MAGIC_SLOTS=40134 GID_VEGAS_MAGIC_SLOTS value
     * @property {number} GID_GATES_VALHALLA_SLOTS=40135 GID_GATES_VALHALLA_SLOTS value
     * @property {number} GID_TRIPLE_TIGERS_SLOTS=40136 GID_TRIPLE_TIGERS_SLOTS value
     * @property {number} GID_RISE_GIZA_POWERNUDGE_SLOTS=40137 GID_RISE_GIZA_POWERNUDGE_SLOTS value
     * @property {number} GID_SPIN_SCORE_MEGAWAYS_SLOTS=40138 GID_SPIN_SCORE_MEGAWAYS_SLOTS value
     * @property {number} GID_PIRATE_GOLD_SLOTS=40139 GID_PIRATE_GOLD_SLOTS value
     * @property {number} GID_PIGGIES_SLOTS=40140 GID_PIGGIES_SLOTS value
     * @property {number} GID_STRIKINGHOT_SLOTS=40141 GID_STRIKINGHOT_SLOTS value
     * @property {number} GID_PIGGYBANKBILLS_SLOTS=40142 GID_PIGGYBANKBILLS_SLOTS value
     * @property {number} GID_EMPERORCAISHEN_SLOTS=40143 GID_EMPERORCAISHEN_SLOTS value
     * @property {number} GID_MIGHTRA_SLOTS=40144 GID_MIGHTRA_SLOTS value
     * @property {number} GID_QUEENGODS_SLOTS=40145 GID_QUEENGODS_SLOTS value
     * @property {number} GID_WILDBEACHPARTY_SLOTS=40146 GID_WILDBEACHPARTY_SLOTS value
     * @property {number} GID_CAISHENGOLD_SLOTS=40147 GID_CAISHENGOLD_SLOTS value
     * @property {number} GID_HOTBURN_SLOTS=40148 GID_HOTBURN_SLOTS value
     * @property {number} GID_GOLDENOX_SLOTS=40149 GID_GOLDENOX_SLOTS value
     * @property {number} GID_BOMBBONANZA_SLOTS=40150 GID_BOMBBONANZA_SLOTS value
     * @property {number} GID_CASHELEVATOR_SLOTS=40151 GID_CASHELEVATOR_SLOTS value
     * @property {number} GID_DRAGOJEWELSFORTUNE_SLOTS=40152 GID_DRAGOJEWELSFORTUNE_SLOTS value
     * @property {number} GID_EMERALD_KING_SLOTS=40153 GID_EMERALD_KING_SLOTS value
     * @property {number} GID_EXTRA_JUICY_SLOTS=40154 GID_EXTRA_JUICY_SLOTS value
     * @property {number} GID_CHICKENDROP_SLOTS=40155 GID_CHICKENDROP_SLOTS value
     * @property {number} GID_PINUPGIRLS_SLOTS=40156 GID_PINUPGIRLS_SLOTS value
     * @property {number} GID_CURSE_WEREWOLF_SLOTS=40157 GID_CURSE_WEREWOLF_SLOTS value
     * @property {number} GID_PIRATE_GOLD_DELUXE_SLOTS=40158 GID_PIRATE_GOLD_DELUXE_SLOTS value
     * @property {number} GID_WILD_PIXIES_SLOTS=40159 GID_WILD_PIXIES_SLOTS value
     * @property {number} GID_CAISHEN_CASH_SLOTS=40160 GID_CAISHEN_CASH_SLOTS value
     * @property {number} GID_DRAGON_TIGER_SLOTS=40161 GID_DRAGON_TIGER_SLOTS value
     * @property {number} GID_LUCKY_DRAGONS_SLOTS=40162 GID_LUCKY_DRAGONS_SLOTS value
     * @property {number} GID_GREEDY_WOLF_SLOTS=40163 GID_GREEDY_WOLF_SLOTS value
     * @property {number} GID_FIREHOT_SLOTS=40164 GID_FIREHOT_SLOTS value
     * @property {number} GID_GATESAZTEC_SLOTS=40165 GID_GATESAZTEC_SLOTS value
     * @property {number} GID_SHININGHOT100_SLOTS=40166 GID_SHININGHOT100_SLOTS value
     * @property {number} GID_CRYSTAL_CAVERNS_SLOTS=40167 GID_CRYSTAL_CAVERNS_SLOTS value
     * @property {number} GID_SHIELDSPARTA_SLOTS=40168 GID_SHIELDSPARTA_SLOTS value
     * @property {number} GID_GREATSTICKUP_SLOTS=40169 GID_GREATSTICKUP_SLOTS value
     * @property {number} GID_AZTECBONANZA_SLOTS=40170 GID_AZTECBONANZA_SLOTS value
     * @property {number} GID_VOODOOMAGIC_SLOTS=40171 GID_VOODOOMAGIC_SLOTS value
     * @property {number} GID_HOKKAIDOWOLF_SLOTS=40172 GID_HOKKAIDOWOLF_SLOTS value
     * @property {number} GID_MAGICMONEYMAZE_SLOTS=40173 GID_MAGICMONEYMAZE_SLOTS value
     * @property {number} GID_YUMYUMPOWERWAYS_SLOTS=40174 GID_YUMYUMPOWERWAYS_SLOTS value
     * @property {number} GID_EMPTYHEBANK_SLOTS=40175 GID_EMPTYHEBANK_SLOTS value
     * @property {number} GID_HOTCHILLI_SLOTS=40176 GID_HOTCHILLI_SLOTS value
     * @property {number} GID_BOUNTYGOLD_SLOTS=40177 GID_BOUNTYGOLD_SLOTS value
     * @property {number} GID_WILDWALKER_SLOTS=40178 GID_WILDWALKER_SLOTS value
     * @property {number} GID_BERMUDARICHES_SLOTS=40179 GID_BERMUDARICHES_SLOTS value
     * @property {number} GID_EYECLEOPATRA_SLOTS=40180 GID_EYECLEOPATRA_SLOTS value
     * @property {number} GID_WILDSPELLS_SLOTS=40181 GID_WILDSPELLS_SLOTS value
     * @property {number} GID_THETWEETYHOUSE_SLOTS=40182 GID_THETWEETYHOUSE_SLOTS value
     * @property {number} GID_MYSTERIOUS_SLOTS=40183 GID_MYSTERIOUS_SLOTS value
     * @property {number} GID_DIAMONDSAREFOREVER_SLOTS=40184 GID_DIAMONDSAREFOREVER_SLOTS value
     * @property {number} GID_CANDYSTARS_SLOTS=40185 GID_CANDYSTARS_SLOTS value
     * @property {number} GID_ASGARD_SLOTS=40186 GID_ASGARD_SLOTS value
     * @property {number} GID_FIREHOT100_SLOTS=40187 GID_FIREHOT100_SLOTS value
     * @property {number} GID_RAGINGBULL_SLOTS=40188 GID_RAGINGBULL_SLOTS value
     * @property {number} GID_SANTAWONDERLAND_SLOTS=40189 GID_SANTAWONDERLAND_SLOTS value
     * @property {number} GID_LEPRECHAUNSONG_SLOTS=40190 GID_LEPRECHAUNSONG_SLOTS value
     * @property {number} GID_FISHINREELS_SLOTS=40191 GID_FISHINREELS_SLOTS value
     * @property {number} GID_TREASUREWILD_SLOTS=40192 GID_TREASUREWILD_SLOTS value
     * @property {number} GID_GENIEWISHES_SLOTS=40193 GID_GENIEWISHES_SLOTS value
     * @property {number} GID_SNAKEEYES_SLOTS=40194 GID_SNAKEEYES_SLOTS value
     * @property {number} GID_MONEYMONEYMONEY_SLOTS=40195 GID_MONEYMONEYMONEY_SLOTS value
     * @property {number} GID_HOTBURNEXTREME_SLOTS=40196 GID_HOTBURNEXTREME_SLOTS value
     * @property {number} GID_ULTIMATE_SLOTS=40197 GID_ULTIMATE_SLOTS value
     * @property {number} GID_GOLDENPIG_SLOTS=40198 GID_GOLDENPIG_SLOTS value
     * @property {number} GID_PIRATEGOLDENAGE_SLOTS=40199 GID_PIRATEGOLDENAGE_SLOTS value
     * @property {number} GID_EGYPTIANFORTUNES_SLOTS=40200 GID_EGYPTIANFORTUNES_SLOTS value
     * @property {number} GID_BACCARAT_LOBBY_SLOTS=41001 GID_BACCARAT_LOBBY_SLOTS value
     * @property {number} GID_SPEEDBACCARAT1_SLOTS=41002 GID_SPEEDBACCARAT1_SLOTS value
     * @property {number} GID_SPEEDBACCARAT2_SLOTS=41003 GID_SPEEDBACCARAT2_SLOTS value
     * @property {number} GID_SPEEDBACCARAT3_SLOTS=41004 GID_SPEEDBACCARAT3_SLOTS value
     * @property {number} GID_SPEEDBACCARAT5_SLOTS=41005 GID_SPEEDBACCARAT5_SLOTS value
     * @property {number} GID_SPEEDBACCARAT6_SLOTS=41006 GID_SPEEDBACCARAT6_SLOTS value
     * @property {number} GID_SPEEDBACCARAT7_SLOTS=41007 GID_SPEEDBACCARAT7_SLOTS value
     * @property {number} GID_SPEEDBACCARAT8_SLOTS=41008 GID_SPEEDBACCARAT8_SLOTS value
     * @property {number} GID_SPEEDBACCARAT9_SLOTS=41009 GID_SPEEDBACCARAT9_SLOTS value
     * @property {number} GID_SPEEDBACCARAT10_SLOTS=41010 GID_SPEEDBACCARAT10_SLOTS value
     * @property {number} GID_SUPER8BACCARAT_SLOTS=41011 GID_SUPER8BACCARAT_SLOTS value
     * @property {number} GID_FORTUNE6BACCARAT_SLOTS=41012 GID_FORTUNE6BACCARAT_SLOTS value
     * @property {number} GID_ROULETTE_LOBBY_SLOTS=41013 GID_ROULETTE_LOBBY_SLOTS value
     * @property {number} GID_ROULETTE1_AZURE_SLOTS=41014 GID_ROULETTE1_AZURE_SLOTS value
     * @property {number} GID_ROULETTE2_SLOTS=41015 GID_ROULETTE2_SLOTS value
     * @property {number} GID_ROULETTE9_THECLUB_SLOTS=41016 GID_ROULETTE9_THECLUB_SLOTS value
     * @property {number} GID_ROULETTE10_RUBY_SLOTS=41017 GID_ROULETTE10_RUBY_SLOTS value
     * @property {number} GID_MEGAROULETTE_SLOTS=41018 GID_MEGAROULETTE_SLOTS value
     * @property {number} GID_AUTOROULETTE1_SLOTS=41019 GID_AUTOROULETTE1_SLOTS value
     * @property {number} GID_SPEED_ROULETTE1_SLOTS=41020 GID_SPEED_ROULETTE1_SLOTS value
     * @property {number} GID_SPEED_ROULETTE2_SLOTS=41021 GID_SPEED_ROULETTE2_SLOTS value
     * @property {number} GID_POWERUP_ROULETTE_SLOTS=41022 GID_POWERUP_ROULETTE_SLOTS value
     * @property {number} GID_GAMESHOWS_LOBBY_SLOTS=41023 GID_GAMESHOWS_LOBBY_SLOTS value
     * @property {number} GID_BOOMCITY_SLOTS=41024 GID_BOOMCITY_SLOTS value
     * @property {number} GID_SWEET_BONANZACANDYLAND_SLOTS=41025 GID_SWEET_BONANZACANDYLAND_SLOTS value
     * @property {number} GID_MEGAWHEEL_SLOTS=41026 GID_MEGAWHEEL_SLOTS value
     * @property {number} GID_MEGASICBOLOBBY_SLOTS=41027 GID_MEGASICBOLOBBY_SLOTS value
     * @property {number} GID_MEGA_SICBO_SLOTS=41028 GID_MEGA_SICBO_SLOTS value
     * @property {number} GID_BLACKJACKLOBBY_SLOTS=41029 GID_BLACKJACKLOBBY_SLOTS value
     * @property {number} GID_ONE_BLACKJACK_SLOTS=41030 GID_ONE_BLACKJACK_SLOTS value
     * @property {number} GID_ONE_BLACKJACK2_RUBY_SLOTS=41031 GID_ONE_BLACKJACK2_RUBY_SLOTS value
     * @property {number} GID_BACCARAT1_SLOTS=41032 GID_BACCARAT1_SLOTS value
     * @property {number} GID_BACCARAT2_SLOTS=41033 GID_BACCARAT2_SLOTS value
     * @property {number} GID_BACCARAT3_SLOTS=41034 GID_BACCARAT3_SLOTS value
     * @property {number} GID_BACCARAT5_SLOTS=41035 GID_BACCARAT5_SLOTS value
     * @property {number} GID_BACCARAT6_SLOTS=41036 GID_BACCARAT6_SLOTS value
     * @property {number} GID_BACCARAT7_SLOTS=41037 GID_BACCARAT7_SLOTS value
     * @property {number} GID_BACCARAT8_SLOTS=41038 GID_BACCARAT8_SLOTS value
     * @property {number} GID_ROULETTE3_MACAO_SLOTS=41039 GID_ROULETTE3_MACAO_SLOTS value
     * @property {number} GID_ROULETTE4_RUSSIAN_SLOTS=41040 GID_ROULETTE4_RUSSIAN_SLOTS value
     * @property {number} GID_ROULETTE5_GERMAN_SLOTS=41041 GID_ROULETTE5_GERMAN_SLOTS value
     * @property {number} GID_ROULETTE6_TURKISH_SLOTS=41042 GID_ROULETTE6_TURKISH_SLOTS value
     * @property {number} GID_ROULETTE7_ITALIAN_SLOTS=41043 GID_ROULETTE7_ITALIAN_SLOTS value
     * @property {number} GID_ROULETTE8_INDIAN_SLOTS=41044 GID_ROULETTE8_INDIAN_SLOTS value
     * @property {number} GID_ONEBLACKJACK3_DUTCH_SLOTS=41045 GID_ONEBLACKJACK3_DUTCH_SLOTS value
     * @property {number} GID_ONEBLACKJACK5_TURKISH_SLOTS=41046 GID_ONEBLACKJACK5_TURKISH_SLOTS value
     * @property {number} GID_SPEEDBLACKJACK1_RUBY_SLOTS=41047 GID_SPEEDBLACKJACK1_RUBY_SLOTS value
     * @property {number} GID_SPEEDBLACKJACK2_RUBY_SLOTS=41048 GID_SPEEDBLACKJACK2_RUBY_SLOTS value
     * @property {number} GID_SPEED_BLACKJACK3_RUBY_SLOTS=41049 GID_SPEED_BLACKJACK3_RUBY_SLOTS value
     * @property {number} GID_SPEED_BLACKJACK4_RUBY_SLOTS=41050 GID_SPEED_BLACKJACK4_RUBY_SLOTS value
     * @property {number} GID_SPEEDBLACKJACK5_RUBY_SLOTS=41051 GID_SPEEDBLACKJACK5_RUBY_SLOTS value
     * @property {number} GID_VIPBLACKJACK1_RUBY_SLOTS=41052 GID_VIPBLACKJACK1_RUBY_SLOTS value
     * @property {number} GID_VIPBLACKJACK2_RUBY_SLOTS=41053 GID_VIPBLACKJACK2_RUBY_SLOTS value
     * @property {number} GID_VIPBLACKJACK3_RUBY_SLOTS=41054 GID_VIPBLACKJACK3_RUBY_SLOTS value
     * @property {number} GID_VIPBLACKJACK4_RUBY_SLOTS=41055 GID_VIPBLACKJACK4_RUBY_SLOTS value
     * @property {number} GID_VIPBLACKJACK5_RUBY_SLOTS=41056 GID_VIPBLACKJACK5_RUBY_SLOTS value
     * @property {number} GID_PENALTYSHOOTOUTL_SLOTS=42001 GID_PENALTYSHOOTOUTL_SLOTS value
     * @property {number} GID_HORSE_RACING_SLOTS=42002 GID_HORSE_RACING_SLOTS value
     * @property {number} GID_FANTASTICLEAGUE_SLOTS=42003 GID_FANTASTICLEAGUE_SLOTS value
     * @property {number} GID_GREYHOUND_RACING_SLOTS=42004 GID_GREYHOUND_RACING_SLOTS value
     * @property {number} GID_FORCE1_SLOTS=42005 GID_FORCE1_SLOTS value
     * @property {number} GID_DARTS_SLOTS=42006 GID_DARTS_SLOTS value
     * @property {number} GID_WOLFGOLD1000000_SLOTS=42007 GID_WOLFGOLD1000000_SLOTS value
     * @property {number} GID_GOLDRUSH500000_SLOTS=42008 GID_GOLDRUSH500000_SLOTS value
     * @property {number} GID_DIAMONDSTRIKE250000_SLOTS=42009 GID_DIAMONDSTRIKE250000_SLOTS value
     * @property {number} GID_HOTSAFARI75000_SLOTS=420010 GID_HOTSAFARI75000_SLOTS value
     * @property {number} GID_QUEENGOLD100000_SLOTS=42011 GID_QUEENGOLD100000_SLOTS value
     * @property {number} GID_PANDAGOLD50000_SLOTS=42012 GID_PANDAGOLD50000_SLOTS value
     * @property {number} GID_7PIGGIES25000_SLOTS=42013 GID_7PIGGIES25000_SLOTS value
     * @property {number} GID_ROYALFISHING_SLOTS=50001 GID_ROYALFISHING_SLOTS value
     */
    base.GAME_ID = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "GID_NONE"] = 0;
        values[valuesById[1] = "GID_TP"] = 1;
        values[valuesById[2] = "GID_RUMMY"] = 2;
        values[valuesById[3] = "GID_TEXAS"] = 3;
        values[valuesById[4] = "GID_TPJOKER"] = 4;
        values[valuesById[5] = "GID_TPAK47"] = 5;
        values[valuesById[6] = "GID_RUMMY_2"] = 6;
        values[valuesById[8] = "GID_AB"] = 8;
        values[valuesById[9] = "GID_SEVEN"] = 9;
        values[valuesById[10] = "GID_DRAGON_TIGER"] = 10;
        values[valuesById[11] = "GID_WINGO"] = 11;
        values[valuesById[12] = "GID_FOREST_PARTY"] = 12;
        values[valuesById[13] = "GID_CARROM"] = 13;
        values[valuesById[14] = "GID_DISC_POOL"] = 14;
        values[valuesById[15] = "GID_FREESTYLE"] = 15;
        values[valuesById[16] = "GID_POOL"] = 16;
        values[valuesById[17] = "GID_POOL_AIM"] = 17;
        values[valuesById[18] = "GID_QA_1"] = 18;
        values[valuesById[19] = "GID_QA_2"] = 19;
        values[valuesById[20] = "GID_QA_RANDOM"] = 20;
        values[valuesById[21] = "GID_LUCKY_SHOT"] = 21;
        values[valuesById[22] = "GID_POOL2"] = 22;
        values[valuesById[23] = "GID_POOL2_AIM"] = 23;
        values[valuesById[24] = "GID_RED_BLACK"] = 24;
        values[valuesById[25] = "GID_TRUCO"] = 25;
        values[valuesById[26] = "GID_TRUCO_CLEAN"] = 26;
        values[valuesById[30] = "GID_CRASH"] = 30;
        values[valuesById[31] = "GID_SLOTS1"] = 31;
        values[valuesById[32] = "GID_SLOTS2"] = 32;
        values[valuesById[33] = "GID_SLOTS3"] = 33;
        values[valuesById[40] = "GID_PRIVATE_TABLE_TRUCO"] = 40;
        values[valuesById[41] = "GID_PRIVATE_TABLE_TRUCO_CLEAN"] = 41;
        values[valuesById[50] = "GID_SLOTS4"] = 50;
        values[valuesById[51] = "GID_EGYPT_SLOTS"] = 51;
        values[valuesById[52] = "GID_AZTEC_SLOTS"] = 52;
        values[valuesById[53] = "GID_JLB_SLOTS"] = 53;
        values[valuesById[54] = "GID_DRAGON_SLOTS"] = 54;
        values[valuesById[55] = "GID_ZEUS_SLOTS"] = 55;
        values[valuesById[56] = "GID_FRUIT_SLOTS"] = 56;
        values[valuesById[57] = "GID_SJB02_SLOTS"] = 57;
        values[valuesById[58] = "GID_SPARTA_SLOTS"] = 58;
        values[valuesById[59] = "GID_MONEY_SLOTS"] = 59;
        values[valuesById[60] = "GID_TIGER_SLOTS"] = 60;
        values[valuesById[61] = "GID_ZEUS02_SLOTS"] = 61;
        values[valuesById[62] = "GID_BULL_SLOTS"] = 62;
        values[valuesById[63] = "GID_WOLF_SLOTS"] = 63;
        values[valuesById[64] = "GID_TIGER02_SLOTS"] = 64;
        values[valuesById[65] = "GID_LPIG_SLOTS"] = 65;
        values[valuesById[66] = "GID_NMOUSE_SLOTS"] = 66;
        values[valuesById[67] = "GID_NCOW_SLOTS"] = 67;
        values[valuesById[68] = "GID_NTIGER_SLOTS"] = 68;
        values[valuesById[69] = "GID_NRABIT_SLOTS"] = 69;
        values[valuesById[10001] = "GID_POTIONSPELLS_SLOTS"] = 10001;
        values[valuesById[10002] = "GID_SWEETRUSHMEGAWAYS_SLOTS"] = 10002;
        values[valuesById[10003] = "GID_ROAD2RICHES_SLOTS"] = 10003;
        values[valuesById[10004] = "GID_LUCKYLADYMOONMEGAWAYS_SLOTS"] = 10004;
        values[valuesById[10005] = "GID_DOMNITORSTREASURE_SLOTS"] = 10005;
        values[valuesById[20001] = "GID_TREE_OF_LIGHT_SLOTS"] = 20001;
        values[valuesById[20002] = "GID_FOREST_DREAMS_SLOTS"] = 20002;
        values[valuesById[20003] = "GID_NUKE_WORLD_SLOTS"] = 20003;
        values[valuesById[20004] = "GID_RUEDA_DE_CHILE_SLOTS"] = 20004;
        values[valuesById[20005] = "GID_PACHIN_GIRL_SLOTS"] = 20005;
        values[valuesById[20006] = "GID_PENALTYSHOOTOUT_SLOTS"] = 20006;
        values[valuesById[20007] = "GID_THEGREATESTCATCH_SLOTS"] = 20007;
        values[valuesById[20008] = "GID_EUROPEANROULETTE_SLOTS"] = 20008;
        values[valuesById[20009] = "GID_HOTVOLCANO_SLOTS"] = 20009;
        values[valuesById[20010] = "GID_SOLDIT_SLOTS"] = 20010;
        values[valuesById[20011] = "GID_FRUITBURST_SLOTS"] = 20011;
        values[valuesById[20012] = "GID_HOTRIONIGHTS_SLOTS"] = 20012;
        values[valuesById[20013] = "GID_IRISHWEEKEND_SLOTS"] = 20013;
        values[valuesById[20014] = "GID_OLDWEST_SLOTS"] = 20014;
        values[valuesById[20015] = "GID_PATRICKSMAGICFIELD_SLOTS"] = 20015;
        values[valuesById[20016] = "GID_CAMINODECHILIBONUSBUY_SLOTS"] = 20016;
        values[valuesById[20017] = "GID_EGYPTGODS_SLOTS"] = 20017;
        values[valuesById[20018] = "GID_BASKETBALL_SLOTS"] = 20018;
        values[valuesById[20019] = "GID_TALISMANSOFFORTUNE_SLOTS"] = 20019;
        values[valuesById[20020] = "GID_THEGREATWALLTREASURE_SLOTS"] = 20020;
        values[valuesById[20021] = "GID_ROBINHOOD_SLOTS"] = 20021;
        values[valuesById[20022] = "GID_CLASHOFPIRATES_SLOTS"] = 20022;
        values[valuesById[20023] = "GID_JOURNEYTOTHEWEST_SLOTS"] = 20023;
        values[valuesById[20024] = "GID_VEGASNIGHTS_SLOTS"] = 20024;
        values[valuesById[20025] = "GID_JEWELLERYSTORE_SLOTS"] = 20025;
        values[valuesById[20026] = "GID_REDCLIFF_SLOTS"] = 20026;
        values[valuesById[20027] = "GID_ACEROUND_SLOTS"] = 20027;
        values[valuesById[20028] = "GID_ELVENPRINCESSES_SLOTS"] = 20028;
        values[valuesById[20029] = "GID_LEGENDOFRA_SLOTS"] = 20029;
        values[valuesById[20030] = "GID_THEEMPERORSTOMB_SLOTS"] = 20030;
        values[valuesById[20031] = "GID_NECROMANCER_SLOTS"] = 20031;
        values[valuesById[20032] = "GID_NAUGHTYGIRLSCABARET_SLOTS"] = 20032;
        values[valuesById[20033] = "GID_ATLANTIS_SLOTS"] = 20033;
        values[valuesById[20034] = "GID_ROBINSON_SLOTS"] = 20034;
        values[valuesById[20035] = "GID_CANDYDREAMS_SLOTS"] = 20035;
        values[valuesById[20036] = "GID_HEADSTAILS_SLOTS"] = 20036;
        values[valuesById[20037] = "GID_MOREORLESS_SLOTS"] = 20037;
        values[valuesById[20038] = "GID_OASISPOKERCLASSIC_SLOTS"] = 20038;
        values[valuesById[20039] = "GID_BLACKJACKLUCKYSEVENS_SLOTS"] = 20039;
        values[valuesById[20040] = "GID_USSRSEVENTIES_SLOTS"] = 20040;
        values[valuesById[20041] = "GID_THESLAVS_SLOTS"] = 20041;
        values[valuesById[20042] = "GID_FOURACES_SLOTS"] = 20042;
        values[valuesById[20043] = "GID_REDQUEEN_SLOTS"] = 20043;
        values[valuesById[30001] = "GID_LEPRECHAUN_RICHES_SLOTS"] = 30001;
        values[valuesById[30002] = "GID_TREE_FORTUNE_SLOTS"] = 30002;
        values[valuesById[30003] = "GID_GEM_SAVIOUR_SLOTS"] = 30003;
        values[valuesById[30004] = "GID_BIKINI_PARADISE_SLOTS"] = 30004;
        values[valuesById[30005] = "GID_LUCKY_PIGGY_SLOTS"] = 30005;
        values[valuesById[30006] = "GID_TREASURES_AZTEC_SLOTS"] = 30006;
        values[valuesById[30007] = "GID_CAPTAIN_BOUNTY_SLOTS"] = 30007;
        values[valuesById[30008] = "GID_QUEEN_BOUNTY_SLOTS"] = 30008;
        values[valuesById[30009] = "GID_WILD_BANDITO_SLOTS"] = 30009;
        values[valuesById[30010] = "GID_DRAGON_HATCH_SLOTS"] = 30010;
        values[valuesById[30011] = "GID_GREAT_ICESCAPE_SLOTS"] = 30011;
        values[valuesById[30012] = "GID_GANESHA_FORTUNE_SLOTS"] = 30012;
        values[valuesById[30013] = "GID_DREAMS_MACAU_SLOTS"] = 30013;
        values[valuesById[30014] = "GID_WILD_BOUNTY_SHOWDOWN_SLOTS"] = 30014;
        values[valuesById[30015] = "GID_PROSPERITY_FORTUNE_SLOTS"] = 30015;
        values[valuesById[30016] = "GID_DINER_DELIGHTS_SLOTS"] = 30016;
        values[valuesById[30017] = "GID_EGYPT_BOOK_MYSTERY_SLOTS"] = 30017;
        values[valuesById[30018] = "GID_WILD_FIREWORKS_SLOTS"] = 30018;
        values[valuesById[30019] = "GID_THAI_RIVER_WONDERS_SLOTS"] = 30019;
        values[valuesById[30020] = "GID_BALI_VACATION_SLOTS"] = 30020;
        values[valuesById[30021] = "GID_CRYPTO_GOLD_SLOTS"] = 30021;
        values[valuesById[30022] = "GID_JURASSIC_KINGDOM_SLOTS"] = 30022;
        values[valuesById[30023] = "GID_COCKTAIL_NIGHTS_SLOTS"] = 30023;
        values[valuesById[30024] = "GID_FORTUNE_TIGER_SLOTS"] = 30024;
        values[valuesById[30025] = "GID_SPEED_WINNER_SLOTS"] = 30025;
        values[valuesById[30026] = "GID_LEGEND_PERSEUS_SLOTS"] = 30026;
        values[valuesById[30027] = "GID_WINWIN_WON_SLOTS"] = 30027;
        values[valuesById[30028] = "GID_MEDUSA_II_SLOTS"] = 30028;
        values[valuesById[30029] = "GID_MEDUSA_SLOTS"] = 30029;
        values[valuesById[30030] = "GID_PLUSHIE_FRENZY_SLOTS"] = 30030;
        values[valuesById[30031] = "GID_WIZDOM_WONDERS_SLOTS"] = 30031;
        values[valuesById[30032] = "GID_HOOD_WOLF_SLOTS"] = 30032;
        values[valuesById[30033] = "GID_HALLOW_WIN_SLOTS"] = 30033;
        values[valuesById[30034] = "GID_SANTA_GIFT_RUSH_SLOTS"] = 30034;
        values[valuesById[30035] = "GID_GEM_SAVIOUR_SWORD_SLOTS"] = 30035;
        values[valuesById[30036] = "GID_SYMBOLS_EGYPT_SLOTS"] = 30036;
        values[valuesById[30037] = "GID_GANESHA_GOLD_SLOTS"] = 30037;
        values[valuesById[30038] = "GID_THREE_MONKEYS_SLOTS"] = 30038;
        values[valuesById[30039] = "GID_JUNGLE_DELIGHT_SLOTS"] = 30039;
        values[valuesById[30040] = "GID_NINJA_SAMURAI_SLOTS"] = 30040;
        values[valuesById[30041] = "GID_MUAY_THAI_SLOTS"] = 30041;
        values[valuesById[30042] = "GID_REEL_LOVE_SLOTS"] = 30042;
        values[valuesById[30043] = "GID_GEM_SAVIOUR_CONQUEST_SLOTS"] = 30043;
        values[valuesById[30044] = "GID_CANDY_BURST_SLOTS"] = 30044;
        values[valuesById[30045] = "GID_GENIE_WISHES_SLOTS"] = 30045;
        values[valuesById[30046] = "GID_CIRCUS_DELIGHT_SLOTS"] = 30046;
        values[valuesById[30047] = "GID_SECRETS_CLEOPATRA_SLOTS"] = 30047;
        values[valuesById[30048] = "GID_VAMPIRE_CHARM_SLOTS"] = 30048;
        values[valuesById[30049] = "GID_JEWELS_PROSPERITY_SLOTS"] = 30049;
        values[valuesById[30050] = "GID_JACK_FROST_SLOTS"] = 30050;
        values[valuesById[30051] = "GID_GALACTIC_GEMS_SLOTS"] = 30051;
        values[valuesById[30052] = "GID_GUARDIANS_FIRE_SLOTS"] = 30052;
        values[valuesById[30053] = "GID_MAJESTIC_TREASURES_SLOTS"] = 30053;
        values[valuesById[30054] = "GID_CANDY_BONANZA_SLOTS"] = 30054;
        values[valuesById[30055] = "GID_HEIST_STAKES_SLOTS"] = 30055;
        values[valuesById[30056] = "GID_RISE_APOLLO_SLOTS"] = 30056;
        values[valuesById[30057] = "GID_MERMAID_RICHES_SLOTS"] = 30057;
        values[valuesById[30058] = "GID_RAIDER_JANE_SLOTS"] = 30058;
        values[valuesById[30059] = "GID_SUPERMARKET_SPREE_SLOTS"] = 30059;
        values[valuesById[30060] = "GID_BUFFALO_WIN_SLOTS"] = 30060;
        values[valuesById[30061] = "GID_LEGENDARY_MONKEY_KING_SLOTS"] = 30061;
        values[valuesById[30062] = "GID_SPIRITED_WONDERS_SLOTS"] = 30062;
        values[valuesById[30063] = "GID_FARM_INVADERS_SLOTS"] = 30063;
        values[valuesById[30064] = "GID_EMOJI_RICHES_SLOTS"] = 30064;
        values[valuesById[30065] = "GID_MASK_CARNIVAL_SLOTS"] = 30065;
        values[valuesById[30066] = "GID_GARUDA_GEMS_SLOTS"] = 30066;
        values[valuesById[30067] = "GID_DESTINY_MOON_SLOTS"] = 30067;
        values[valuesById[30068] = "GID_BUTTERFLY_BLOSSOM_SLOTS"] = 30068;
        values[valuesById[30069] = "GID_ROOSTER_RUMBLE_SLOTS"] = 30069;
        values[valuesById[30070] = "GID_QUEEN_BANQUET_SLOTS"] = 30070;
        values[valuesById[30071] = "GID_BATTLEGROUND_ROYALE_SLOTS"] = 30071;
        values[valuesById[30072] = "GID_WILD_COASTER_SLOTS"] = 30072;
        values[valuesById[30073] = "GID_TOTEM_WONDERS_SLOTS"] = 30073;
        values[valuesById[30074] = "GID_ALCHEMY_GOLD_SLOTS"] = 30074;
        values[valuesById[30075] = "GID_ASGARDIAN_RISING_SLOTS"] = 30075;
        values[valuesById[30076] = "GID_MIDAS_FORTUNE_SLOTS"] = 30076;
        values[valuesById[30077] = "GID_FORTUNE_RABBIT_SLOTS"] = 30077;
        values[valuesById[30078] = "GID_RAVE_PARTY_FEVER_SLOTS"] = 30078;
        values[valuesById[30079] = "GID_HAWAIIAN_TIKI_SLOTS"] = 30079;
        values[valuesById[30080] = "GID_BAKERY_BONANZA_SLOTS"] = 30080;
        values[valuesById[40001] = "GID_FURY_ODIN_MEGAWAYS_SLOTS"] = 40001;
        values[valuesById[40002] = "GID_GATES_OLYMPUS_SLOTS"] = 40002;
        values[valuesById[40003] = "GID_SWEET_BONANZA_SLOTS"] = 40003;
        values[valuesById[40004] = "GID_BIG_BASS_SPLASH_SLOTS"] = 40004;
        values[valuesById[40005] = "GID_BIG_BASS_BONANZA_SLOTS"] = 40005;
        values[valuesById[40006] = "GID_JOKER_JEWELS_SLOTS"] = 40006;
        values[valuesById[40007] = "GID_GEMS_BONANZA_SLOTS"] = 40007;
        values[valuesById[40008] = "GID_BIGGER_BASS_BONANZA_SLOTS"] = 40008;
        values[valuesById[40009] = "GID_RELEASE_THE_KRAKEN_SLOTS"] = 40009;
        values[valuesById[40010] = "GID_SWEET_BONANZA_XMAS_SLOTS"] = 40010;
        values[valuesById[40011] = "GID_WOLF_GOLD_SLOTS"] = 40011;
        values[valuesById[40012] = "GID_SUPER7S_SLOTS"] = 40012;
        values[valuesById[40013] = "GID_WILD_WILD_RICHES_SLOTS"] = 40013;
        values[valuesById[40014] = "GID_FRUIT_PARTY_SLOTS"] = 40014;
        values[valuesById[40015] = "GID_STARLIGHT_PRINCESS_SLOTS"] = 40015;
        values[valuesById[40016] = "GID_DIAMOND_STRIKE_SLOTS"] = 40016;
        values[valuesById[40017] = "GID_MUSTANG_GOLD_SLOTS"] = 40017;
        values[valuesById[40018] = "GID_FLOATINGDRAGON_SLOTS"] = 40018;
        values[valuesById[40019] = "GID_BONANZA_KEEPING_REEL_SLOTS"] = 40019;
        values[valuesById[40020] = "GID_CHRISTMAS_CATCH_SLOTS"] = 40020;
        values[valuesById[40021] = "GID_888GOLD_SLOTS"] = 40021;
        values[valuesById[40022] = "GID_GOLDPARTY_SLOTS"] = 40022;
        values[valuesById[40023] = "GID_5LIONS_MEGAWAYS_SLOTS"] = 40023;
        values[valuesById[40024] = "GID_WILD_WEST_GOLD_SLOTS"] = 40024;
        values[valuesById[40025] = "GID_CHRISTMAS_BASS_BONANZA_SLOTS"] = 40025;
        values[valuesById[40026] = "GID_BUFFALO_KING_MEGAWAYS_SLOTS"] = 40026;
        values[valuesById[40027] = "GID_POWER_THOR_MEGAWAYS_SLOTS"] = 40027;
        values[valuesById[40028] = "GID_DOG_HOUSE_MEGAWAYS_SLOTS"] = 40028;
        values[valuesById[40029] = "GID_MASTER_CHEN_FORTUNE_SLOTS"] = 40029;
        values[valuesById[40030] = "GID_MADAME_DESTINY_MEGAWAYS_SLOTS"] = 40030;
        values[valuesById[40031] = "GID_SANTA_GREAT_GIFTS_SLOTS"] = 40031;
        values[valuesById[40032] = "GID_ULTRA_HOLD_SPIN_SLOTS"] = 40032;
        values[valuesById[40033] = "GID_BLACK_BULL_SLOTS"] = 40033;
        values[valuesById[40034] = "GID_JUICY_FRUITS_SLOTS"] = 40034;
        values[valuesById[40035] = "GID_SPIRIT_ADVENTURE_SLOTS"] = 40035;
        values[valuesById[40036] = "GID_WILD_WEST_DUELS_SLOTS"] = 40036;
        values[valuesById[40037] = "GID_OCTOBEER_FORTUNES_SLOTS"] = 40037;
        values[valuesById[40038] = "GID_FRUIT_PARTY2_SLOTS"] = 40038;
        values[valuesById[40039] = "GID_HEART_RIO_SLOTS"] = 40039;
        values[valuesById[40040] = "GID_MADAME_DESTINY_SLOTS"] = 40040;
        values[valuesById[40041] = "GID_RELEASE_KRAKEN2_SLOTS"] = 40041;
        values[valuesById[40042] = "GID_COSMICCASH_SLOTS"] = 40042;
        values[valuesById[40043] = "GID_DRAGON_HERO_SLOTS"] = 40043;
        values[valuesById[40044] = "GID_HOT_PEPPER_SLOTS"] = 40044;
        values[valuesById[40045] = "GID_GOLDEN_BEAUTY_SLOTS"] = 40045;
        values[valuesById[40046] = "GID_CLUBTROPICANA_SLOTS"] = 40046;
        values[valuesById[40047] = "GID_THEDOGHOUSE_SLOTS"] = 40047;
        values[valuesById[40048] = "GID_WILDWILD_BANANAS_SLOTS"] = 40048;
        values[valuesById[40049] = "GID_FIRESTRIKE_SLOTS"] = 40049;
        values[valuesById[40050] = "GID_LUCKYLIGHTNING_SLOTS"] = 40050;
        values[valuesById[40051] = "GID_PIZZAPIZZAPIZZA_SLOTS"] = 40051;
        values[valuesById[40052] = "GID_HOTFIESTA_SLOTS"] = 40052;
        values[valuesById[40053] = "GID_FISHEYE_SLOTS"] = 40053;
        values[valuesById[40054] = "GID_MASTER_JOKER_SLOTS"] = 40054;
        values[valuesById[40055] = "GID_MUERTOS_MULTIPLIER_SLOTS"] = 40055;
        values[valuesById[40056] = "GID_EXTRAMEGAWAYS_SLOTS"] = 40056;
        values[valuesById[40057] = "GID_CASH_PATROL_SLOTS"] = 40057;
        values[valuesById[40058] = "GID_MONSTERSUPERLANCHE_SLOTS"] = 40058;
        values[valuesById[40059] = "GID_GREAT_RHINO_MEGAWAYS_SLOTS"] = 40059;
        values[valuesById[40060] = "GID_WILDWILDRICHES_SLOTS"] = 40060;
        values[valuesById[40061] = "GID_BIGBASSBONANZAM_SLOTS"] = 40061;
        values[valuesById[40062] = "GID_BRONCO_SPIRIT_SLOTS"] = 40062;
        values[valuesById[40063] = "GID_888DRAGONS_SLOTS"] = 40063;
        values[valuesById[40064] = "GID_LUCKY_FISHING_SLOTS"] = 40064;
        values[valuesById[40065] = "GID_LEGEND_HEROESM_SLOTS"] = 40065;
        values[valuesById[40066] = "GID_RABBIT_GARDEN_SLOTS"] = 40066;
        values[valuesById[40067] = "GID_JOHN_HUNTER_SLOTS"] = 40067;
        values[valuesById[40068] = "GID_MOCHIMON_SLOTS"] = 40068;
        values[valuesById[40069] = "GID_SECRETCITYGOLD_SLOTS"] = 40069;
        values[valuesById[40070] = "GID_HAND_MIDAS_SLOTS"] = 40070;
        values[valuesById[40071] = "GID_FIRE88_SLOTS"] = 40071;
        values[valuesById[40072] = "GID_TEMUJIN_TREASURES_SLOTS"] = 40072;
        values[valuesById[40073] = "GID_CLEOCATRA_SLOTS"] = 40073;
        values[valuesById[40074] = "GID_CHILLI_HEAT_SLOTS"] = 40074;
        values[valuesById[40075] = "GID_GORILLA_MAYHEM_SLOTS"] = 40075;
        values[valuesById[40076] = "GID_SWEET_POWERNUDGE_SLOTS"] = 40076;
        values[valuesById[40077] = "GID_BARN_FESTIVAL_SLOTS"] = 40077;
        values[valuesById[40078] = "GID_MAMMOTH_GOLD_SLOTS"] = 40078;
        values[valuesById[40079] = "GID_GREAT_RHINO_SLOTS"] = 40079;
        values[valuesById[40080] = "GID_FIREBIRD_SPIRIT_SLOTS"] = 40080;
        values[valuesById[40081] = "GID_SWORD_ARES_SLOTS"] = 40081;
        values[valuesById[40082] = "GID_QUEENIE_SLOTS"] = 40082;
        values[valuesById[40083] = "GID_WILD_WEST_MEGAWAYS_SLOTS"] = 40083;
        values[valuesById[40084] = "GID_DOG_HOUSE_MULTIHOLD_SLOTS"] = 40084;
        values[valuesById[40085] = "GID_STARLIGHT_CHRISTMAS_SLOTS"] = 40085;
        values[valuesById[40086] = "GID_FLOATING_DRAGON_SLOTS"] = 40086;
        values[valuesById[40087] = "GID_WILD_BOOSTER_SLOTS"] = 40087;
        values[valuesById[40088] = "GID_BOOK_GOLDEN_SANDS_SLOTS"] = 40088;
        values[valuesById[40089] = "GID_FIRE_STRIKE_SLOTS"] = 40089;
        values[valuesById[40090] = "GID_BOOK_TUT_SLOTS"] = 40090;
        values[valuesById[40091] = "GID_MYSTERIOUS_EGYPT_SLOTS"] = 40091;
        values[valuesById[40092] = "GID_FORTUNE_GIZA_SLOTS"] = 40092;
        values[valuesById[40093] = "GID_SUPERX_SLOTS"] = 40093;
        values[valuesById[40094] = "GID_CHRISTMAS_CAROLM_SLOTS"] = 40094;
        values[valuesById[40095] = "GID_MYSTERY_THEORIENT_SLOTS"] = 40095;
        values[valuesById[40096] = "GID_TIGERTREASURES_SLOTS"] = 40096;
        values[valuesById[40097] = "GID_BOOK_FALLEN_SLOTS"] = 40097;
        values[valuesById[40098] = "GID_ZOMBIE_CARNIVAL_SLOTS"] = 40098;
        values[valuesById[40099] = "GID_GOLD_TRAIN_SLOTS"] = 40099;
        values[valuesById[40100] = "GID_MONEY_MOUSE_SLOTS"] = 40100;
        values[valuesById[40101] = "GID_5LIONS_GOLD_SLOTS"] = 40101;
        values[valuesById[40102] = "GID_LUCKY_YEAR_SLOTS"] = 40102;
        values[valuesById[40103] = "GID_CLOVERGOLD_SLOTS"] = 40103;
        values[valuesById[40104] = "GID_GATESGATOT_KACA_SLOTS"] = 40104;
        values[valuesById[40105] = "GID_AZTECGEMS_SLOTS"] = 40105;
        values[valuesById[40106] = "GID_CROWN_FIRE_SLOTS"] = 40106;
        values[valuesById[40107] = "GID_GREAT_RHINO_DELUXE_SLOTS"] = 40107;
        values[valuesById[40108] = "GID_GOBLIN_HEIST_POWERNUDGE_SLOTS"] = 40108;
        values[valuesById[40109] = "GID_SUPER_JOKER_SLOTS"] = 40109;
        values[valuesById[40110] = "GID_REEL_BANKS_SLOTS"] = 40110;
        values[valuesById[40111] = "GID_TREE_RICHES_SLOTS"] = 40111;
        values[valuesById[40112] = "GID_AZTECGEMS_DELUXE_SLOTS"] = 40112;
        values[valuesById[40113] = "GID_DOWN_RAILS_SLOTS"] = 40113;
        values[valuesById[40114] = "GID_HOT_BURN_HOLD_SPIN_SLOTS"] = 40114;
        values[valuesById[40115] = "GID_VEGAS_SLOTS"] = 40115;
        values[valuesById[40116] = "GID_TROPICALTIKI_SLOTS"] = 40116;
        values[valuesById[40117] = "GID_RAINBOWGOLD_SLOTS"] = 40117;
        values[valuesById[40118] = "GID_DRAGONKINGDOM_SLOTS"] = 40118;
        values[valuesById[40119] = "GID_DRAGONS_SLOTS"] = 40119;
        values[valuesById[40120] = "GID_BIG_JUAN_SLOTS"] = 40120;
        values[valuesById[40121] = "GID_AMAZING_MONEYMACHINE_SLOTS"] = 40121;
        values[valuesById[40122] = "GID_LITTLEGEM_HOLD_SPIN_SLOTS"] = 40122;
        values[valuesById[40123] = "GID_FIREARCHER_SLOTS"] = 40123;
        values[valuesById[40124] = "GID_WILDHOP_DROP_SLOTS"] = 40124;
        values[valuesById[40125] = "GID_DRAGON_KINGDOMEYES_SLOTS"] = 40125;
        values[valuesById[40126] = "GID_MONKEYS_SLOTS"] = 40126;
        values[valuesById[40127] = "GID_BOOKTUT_RESPIN_SLOTS"] = 40127;
        values[valuesById[40128] = "GID_PANDA_FORTUNE_SLOTS"] = 40128;
        values[valuesById[40129] = "GID_CONGO_CASH_SLOTS"] = 40129;
        values[valuesById[40130] = "GID_ELEMENTAL_GEMS_SLOTS"] = 40130;
        values[valuesById[40131] = "GID_COWBOYS_GOLD_SLOTS"] = 40131;
        values[valuesById[40132] = "GID_PHOENIX_FORGE_SLOTS"] = 40132;
        values[valuesById[40133] = "GID_MAGICIAN_SECRETS_SLOTS"] = 40133;
        values[valuesById[40134] = "GID_VEGAS_MAGIC_SLOTS"] = 40134;
        values[valuesById[40135] = "GID_GATES_VALHALLA_SLOTS"] = 40135;
        values[valuesById[40136] = "GID_TRIPLE_TIGERS_SLOTS"] = 40136;
        values[valuesById[40137] = "GID_RISE_GIZA_POWERNUDGE_SLOTS"] = 40137;
        values[valuesById[40138] = "GID_SPIN_SCORE_MEGAWAYS_SLOTS"] = 40138;
        values[valuesById[40139] = "GID_PIRATE_GOLD_SLOTS"] = 40139;
        values[valuesById[40140] = "GID_PIGGIES_SLOTS"] = 40140;
        values[valuesById[40141] = "GID_STRIKINGHOT_SLOTS"] = 40141;
        values[valuesById[40142] = "GID_PIGGYBANKBILLS_SLOTS"] = 40142;
        values[valuesById[40143] = "GID_EMPERORCAISHEN_SLOTS"] = 40143;
        values[valuesById[40144] = "GID_MIGHTRA_SLOTS"] = 40144;
        values[valuesById[40145] = "GID_QUEENGODS_SLOTS"] = 40145;
        values[valuesById[40146] = "GID_WILDBEACHPARTY_SLOTS"] = 40146;
        values[valuesById[40147] = "GID_CAISHENGOLD_SLOTS"] = 40147;
        values[valuesById[40148] = "GID_HOTBURN_SLOTS"] = 40148;
        values[valuesById[40149] = "GID_GOLDENOX_SLOTS"] = 40149;
        values[valuesById[40150] = "GID_BOMBBONANZA_SLOTS"] = 40150;
        values[valuesById[40151] = "GID_CASHELEVATOR_SLOTS"] = 40151;
        values[valuesById[40152] = "GID_DRAGOJEWELSFORTUNE_SLOTS"] = 40152;
        values[valuesById[40153] = "GID_EMERALD_KING_SLOTS"] = 40153;
        values[valuesById[40154] = "GID_EXTRA_JUICY_SLOTS"] = 40154;
        values[valuesById[40155] = "GID_CHICKENDROP_SLOTS"] = 40155;
        values[valuesById[40156] = "GID_PINUPGIRLS_SLOTS"] = 40156;
        values[valuesById[40157] = "GID_CURSE_WEREWOLF_SLOTS"] = 40157;
        values[valuesById[40158] = "GID_PIRATE_GOLD_DELUXE_SLOTS"] = 40158;
        values[valuesById[40159] = "GID_WILD_PIXIES_SLOTS"] = 40159;
        values[valuesById[40160] = "GID_CAISHEN_CASH_SLOTS"] = 40160;
        values[valuesById[40161] = "GID_DRAGON_TIGER_SLOTS"] = 40161;
        values[valuesById[40162] = "GID_LUCKY_DRAGONS_SLOTS"] = 40162;
        values[valuesById[40163] = "GID_GREEDY_WOLF_SLOTS"] = 40163;
        values[valuesById[40164] = "GID_FIREHOT_SLOTS"] = 40164;
        values[valuesById[40165] = "GID_GATESAZTEC_SLOTS"] = 40165;
        values[valuesById[40166] = "GID_SHININGHOT100_SLOTS"] = 40166;
        values[valuesById[40167] = "GID_CRYSTAL_CAVERNS_SLOTS"] = 40167;
        values[valuesById[40168] = "GID_SHIELDSPARTA_SLOTS"] = 40168;
        values[valuesById[40169] = "GID_GREATSTICKUP_SLOTS"] = 40169;
        values[valuesById[40170] = "GID_AZTECBONANZA_SLOTS"] = 40170;
        values[valuesById[40171] = "GID_VOODOOMAGIC_SLOTS"] = 40171;
        values[valuesById[40172] = "GID_HOKKAIDOWOLF_SLOTS"] = 40172;
        values[valuesById[40173] = "GID_MAGICMONEYMAZE_SLOTS"] = 40173;
        values[valuesById[40174] = "GID_YUMYUMPOWERWAYS_SLOTS"] = 40174;
        values[valuesById[40175] = "GID_EMPTYHEBANK_SLOTS"] = 40175;
        values[valuesById[40176] = "GID_HOTCHILLI_SLOTS"] = 40176;
        values[valuesById[40177] = "GID_BOUNTYGOLD_SLOTS"] = 40177;
        values[valuesById[40178] = "GID_WILDWALKER_SLOTS"] = 40178;
        values[valuesById[40179] = "GID_BERMUDARICHES_SLOTS"] = 40179;
        values[valuesById[40180] = "GID_EYECLEOPATRA_SLOTS"] = 40180;
        values[valuesById[40181] = "GID_WILDSPELLS_SLOTS"] = 40181;
        values[valuesById[40182] = "GID_THETWEETYHOUSE_SLOTS"] = 40182;
        values[valuesById[40183] = "GID_MYSTERIOUS_SLOTS"] = 40183;
        values[valuesById[40184] = "GID_DIAMONDSAREFOREVER_SLOTS"] = 40184;
        values[valuesById[40185] = "GID_CANDYSTARS_SLOTS"] = 40185;
        values[valuesById[40186] = "GID_ASGARD_SLOTS"] = 40186;
        values[valuesById[40187] = "GID_FIREHOT100_SLOTS"] = 40187;
        values[valuesById[40188] = "GID_RAGINGBULL_SLOTS"] = 40188;
        values[valuesById[40189] = "GID_SANTAWONDERLAND_SLOTS"] = 40189;
        values[valuesById[40190] = "GID_LEPRECHAUNSONG_SLOTS"] = 40190;
        values[valuesById[40191] = "GID_FISHINREELS_SLOTS"] = 40191;
        values[valuesById[40192] = "GID_TREASUREWILD_SLOTS"] = 40192;
        values[valuesById[40193] = "GID_GENIEWISHES_SLOTS"] = 40193;
        values[valuesById[40194] = "GID_SNAKEEYES_SLOTS"] = 40194;
        values[valuesById[40195] = "GID_MONEYMONEYMONEY_SLOTS"] = 40195;
        values[valuesById[40196] = "GID_HOTBURNEXTREME_SLOTS"] = 40196;
        values[valuesById[40197] = "GID_ULTIMATE_SLOTS"] = 40197;
        values[valuesById[40198] = "GID_GOLDENPIG_SLOTS"] = 40198;
        values[valuesById[40199] = "GID_PIRATEGOLDENAGE_SLOTS"] = 40199;
        values[valuesById[40200] = "GID_EGYPTIANFORTUNES_SLOTS"] = 40200;
        values[valuesById[41001] = "GID_BACCARAT_LOBBY_SLOTS"] = 41001;
        values[valuesById[41002] = "GID_SPEEDBACCARAT1_SLOTS"] = 41002;
        values[valuesById[41003] = "GID_SPEEDBACCARAT2_SLOTS"] = 41003;
        values[valuesById[41004] = "GID_SPEEDBACCARAT3_SLOTS"] = 41004;
        values[valuesById[41005] = "GID_SPEEDBACCARAT5_SLOTS"] = 41005;
        values[valuesById[41006] = "GID_SPEEDBACCARAT6_SLOTS"] = 41006;
        values[valuesById[41007] = "GID_SPEEDBACCARAT7_SLOTS"] = 41007;
        values[valuesById[41008] = "GID_SPEEDBACCARAT8_SLOTS"] = 41008;
        values[valuesById[41009] = "GID_SPEEDBACCARAT9_SLOTS"] = 41009;
        values[valuesById[41010] = "GID_SPEEDBACCARAT10_SLOTS"] = 41010;
        values[valuesById[41011] = "GID_SUPER8BACCARAT_SLOTS"] = 41011;
        values[valuesById[41012] = "GID_FORTUNE6BACCARAT_SLOTS"] = 41012;
        values[valuesById[41013] = "GID_ROULETTE_LOBBY_SLOTS"] = 41013;
        values[valuesById[41014] = "GID_ROULETTE1_AZURE_SLOTS"] = 41014;
        values[valuesById[41015] = "GID_ROULETTE2_SLOTS"] = 41015;
        values[valuesById[41016] = "GID_ROULETTE9_THECLUB_SLOTS"] = 41016;
        values[valuesById[41017] = "GID_ROULETTE10_RUBY_SLOTS"] = 41017;
        values[valuesById[41018] = "GID_MEGAROULETTE_SLOTS"] = 41018;
        values[valuesById[41019] = "GID_AUTOROULETTE1_SLOTS"] = 41019;
        values[valuesById[41020] = "GID_SPEED_ROULETTE1_SLOTS"] = 41020;
        values[valuesById[41021] = "GID_SPEED_ROULETTE2_SLOTS"] = 41021;
        values[valuesById[41022] = "GID_POWERUP_ROULETTE_SLOTS"] = 41022;
        values[valuesById[41023] = "GID_GAMESHOWS_LOBBY_SLOTS"] = 41023;
        values[valuesById[41024] = "GID_BOOMCITY_SLOTS"] = 41024;
        values[valuesById[41025] = "GID_SWEET_BONANZACANDYLAND_SLOTS"] = 41025;
        values[valuesById[41026] = "GID_MEGAWHEEL_SLOTS"] = 41026;
        values[valuesById[41027] = "GID_MEGASICBOLOBBY_SLOTS"] = 41027;
        values[valuesById[41028] = "GID_MEGA_SICBO_SLOTS"] = 41028;
        values[valuesById[41029] = "GID_BLACKJACKLOBBY_SLOTS"] = 41029;
        values[valuesById[41030] = "GID_ONE_BLACKJACK_SLOTS"] = 41030;
        values[valuesById[41031] = "GID_ONE_BLACKJACK2_RUBY_SLOTS"] = 41031;
        values[valuesById[41032] = "GID_BACCARAT1_SLOTS"] = 41032;
        values[valuesById[41033] = "GID_BACCARAT2_SLOTS"] = 41033;
        values[valuesById[41034] = "GID_BACCARAT3_SLOTS"] = 41034;
        values[valuesById[41035] = "GID_BACCARAT5_SLOTS"] = 41035;
        values[valuesById[41036] = "GID_BACCARAT6_SLOTS"] = 41036;
        values[valuesById[41037] = "GID_BACCARAT7_SLOTS"] = 41037;
        values[valuesById[41038] = "GID_BACCARAT8_SLOTS"] = 41038;
        values[valuesById[41039] = "GID_ROULETTE3_MACAO_SLOTS"] = 41039;
        values[valuesById[41040] = "GID_ROULETTE4_RUSSIAN_SLOTS"] = 41040;
        values[valuesById[41041] = "GID_ROULETTE5_GERMAN_SLOTS"] = 41041;
        values[valuesById[41042] = "GID_ROULETTE6_TURKISH_SLOTS"] = 41042;
        values[valuesById[41043] = "GID_ROULETTE7_ITALIAN_SLOTS"] = 41043;
        values[valuesById[41044] = "GID_ROULETTE8_INDIAN_SLOTS"] = 41044;
        values[valuesById[41045] = "GID_ONEBLACKJACK3_DUTCH_SLOTS"] = 41045;
        values[valuesById[41046] = "GID_ONEBLACKJACK5_TURKISH_SLOTS"] = 41046;
        values[valuesById[41047] = "GID_SPEEDBLACKJACK1_RUBY_SLOTS"] = 41047;
        values[valuesById[41048] = "GID_SPEEDBLACKJACK2_RUBY_SLOTS"] = 41048;
        values[valuesById[41049] = "GID_SPEED_BLACKJACK3_RUBY_SLOTS"] = 41049;
        values[valuesById[41050] = "GID_SPEED_BLACKJACK4_RUBY_SLOTS"] = 41050;
        values[valuesById[41051] = "GID_SPEEDBLACKJACK5_RUBY_SLOTS"] = 41051;
        values[valuesById[41052] = "GID_VIPBLACKJACK1_RUBY_SLOTS"] = 41052;
        values[valuesById[41053] = "GID_VIPBLACKJACK2_RUBY_SLOTS"] = 41053;
        values[valuesById[41054] = "GID_VIPBLACKJACK3_RUBY_SLOTS"] = 41054;
        values[valuesById[41055] = "GID_VIPBLACKJACK4_RUBY_SLOTS"] = 41055;
        values[valuesById[41056] = "GID_VIPBLACKJACK5_RUBY_SLOTS"] = 41056;
        values[valuesById[42001] = "GID_PENALTYSHOOTOUTL_SLOTS"] = 42001;
        values[valuesById[42002] = "GID_HORSE_RACING_SLOTS"] = 42002;
        values[valuesById[42003] = "GID_FANTASTICLEAGUE_SLOTS"] = 42003;
        values[valuesById[42004] = "GID_GREYHOUND_RACING_SLOTS"] = 42004;
        values[valuesById[42005] = "GID_FORCE1_SLOTS"] = 42005;
        values[valuesById[42006] = "GID_DARTS_SLOTS"] = 42006;
        values[valuesById[42007] = "GID_WOLFGOLD1000000_SLOTS"] = 42007;
        values[valuesById[42008] = "GID_GOLDRUSH500000_SLOTS"] = 42008;
        values[valuesById[42009] = "GID_DIAMONDSTRIKE250000_SLOTS"] = 42009;
        values[valuesById[420010] = "GID_HOTSAFARI75000_SLOTS"] = 420010;
        values[valuesById[42011] = "GID_QUEENGOLD100000_SLOTS"] = 42011;
        values[valuesById[42012] = "GID_PANDAGOLD50000_SLOTS"] = 42012;
        values[valuesById[42013] = "GID_7PIGGIES25000_SLOTS"] = 42013;
        values[valuesById[50001] = "GID_ROYALFISHING_SLOTS"] = 50001;
        return values;
    })();

    base.SyncOnlineStatus = (function() {

        /**
         * Properties of a SyncOnlineStatus.
         * @memberof base
         * @interface ISyncOnlineStatus
         * @property {number|null} [online] SyncOnlineStatus online
         */

        /**
         * Constructs a new SyncOnlineStatus.
         * @memberof base
         * @classdesc Represents a SyncOnlineStatus.
         * @implements ISyncOnlineStatus
         * @constructor
         * @param {base.ISyncOnlineStatus=} [properties] Properties to set
         */
        function SyncOnlineStatus(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SyncOnlineStatus online.
         * @member {number} online
         * @memberof base.SyncOnlineStatus
         * @instance
         */
        SyncOnlineStatus.prototype.online = 0;

        /**
         * Creates a new SyncOnlineStatus instance using the specified properties.
         * @function create
         * @memberof base.SyncOnlineStatus
         * @static
         * @param {base.ISyncOnlineStatus=} [properties] Properties to set
         * @returns {base.SyncOnlineStatus} SyncOnlineStatus instance
         */
        SyncOnlineStatus.create = function create(properties) {
            return new SyncOnlineStatus(properties);
        };

        /**
         * Encodes the specified SyncOnlineStatus message. Does not implicitly {@link base.SyncOnlineStatus.verify|verify} messages.
         * @function encode
         * @memberof base.SyncOnlineStatus
         * @static
         * @param {base.ISyncOnlineStatus} message SyncOnlineStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncOnlineStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.online != null && Object.hasOwnProperty.call(message, "online"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.online);
            return writer;
        };

        /**
         * Encodes the specified SyncOnlineStatus message, length delimited. Does not implicitly {@link base.SyncOnlineStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.SyncOnlineStatus
         * @static
         * @param {base.ISyncOnlineStatus} message SyncOnlineStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncOnlineStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SyncOnlineStatus message from the specified reader or buffer.
         * @function decode
         * @memberof base.SyncOnlineStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.SyncOnlineStatus} SyncOnlineStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncOnlineStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.SyncOnlineStatus();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.online = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SyncOnlineStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.SyncOnlineStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.SyncOnlineStatus} SyncOnlineStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncOnlineStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SyncOnlineStatus message.
         * @function verify
         * @memberof base.SyncOnlineStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SyncOnlineStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.online != null && message.hasOwnProperty("online"))
                if (!$util.isInteger(message.online))
                    return "online: integer expected";
            return null;
        };

        /**
         * Creates a SyncOnlineStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.SyncOnlineStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.SyncOnlineStatus} SyncOnlineStatus
         */
        SyncOnlineStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.base.SyncOnlineStatus)
                return object;
            let message = new $root.base.SyncOnlineStatus();
            if (object.online != null)
                message.online = object.online | 0;
            return message;
        };

        /**
         * Creates a plain object from a SyncOnlineStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.SyncOnlineStatus
         * @static
         * @param {base.SyncOnlineStatus} message SyncOnlineStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SyncOnlineStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.online = 0;
            if (message.online != null && message.hasOwnProperty("online"))
                object.online = message.online;
            return object;
        };

        /**
         * Converts this SyncOnlineStatus to JSON.
         * @function toJSON
         * @memberof base.SyncOnlineStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SyncOnlineStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SyncOnlineStatus;
    })();

    base.SyncPlayerBalance = (function() {

        /**
         * Properties of a SyncPlayerBalance.
         * @memberof base
         * @interface ISyncPlayerBalance
         * @property {number|null} [balance] SyncPlayerBalance balance
         * @property {number|null} [withdrawBalance] SyncPlayerBalance withdrawBalance
         */

        /**
         * Constructs a new SyncPlayerBalance.
         * @memberof base
         * @classdesc Represents a SyncPlayerBalance.
         * @implements ISyncPlayerBalance
         * @constructor
         * @param {base.ISyncPlayerBalance=} [properties] Properties to set
         */
        function SyncPlayerBalance(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SyncPlayerBalance balance.
         * @member {number} balance
         * @memberof base.SyncPlayerBalance
         * @instance
         */
        SyncPlayerBalance.prototype.balance = 0;

        /**
         * SyncPlayerBalance withdrawBalance.
         * @member {number} withdrawBalance
         * @memberof base.SyncPlayerBalance
         * @instance
         */
        SyncPlayerBalance.prototype.withdrawBalance = 0;

        /**
         * Creates a new SyncPlayerBalance instance using the specified properties.
         * @function create
         * @memberof base.SyncPlayerBalance
         * @static
         * @param {base.ISyncPlayerBalance=} [properties] Properties to set
         * @returns {base.SyncPlayerBalance} SyncPlayerBalance instance
         */
        SyncPlayerBalance.create = function create(properties) {
            return new SyncPlayerBalance(properties);
        };

        /**
         * Encodes the specified SyncPlayerBalance message. Does not implicitly {@link base.SyncPlayerBalance.verify|verify} messages.
         * @function encode
         * @memberof base.SyncPlayerBalance
         * @static
         * @param {base.ISyncPlayerBalance} message SyncPlayerBalance message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncPlayerBalance.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.balance);
            if (message.withdrawBalance != null && Object.hasOwnProperty.call(message, "withdrawBalance"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.withdrawBalance);
            return writer;
        };

        /**
         * Encodes the specified SyncPlayerBalance message, length delimited. Does not implicitly {@link base.SyncPlayerBalance.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.SyncPlayerBalance
         * @static
         * @param {base.ISyncPlayerBalance} message SyncPlayerBalance message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncPlayerBalance.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SyncPlayerBalance message from the specified reader or buffer.
         * @function decode
         * @memberof base.SyncPlayerBalance
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.SyncPlayerBalance} SyncPlayerBalance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncPlayerBalance.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.SyncPlayerBalance();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.balance = reader.int32();
                    break;
                case 2:
                    message.withdrawBalance = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SyncPlayerBalance message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.SyncPlayerBalance
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.SyncPlayerBalance} SyncPlayerBalance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncPlayerBalance.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SyncPlayerBalance message.
         * @function verify
         * @memberof base.SyncPlayerBalance
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SyncPlayerBalance.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.balance != null && message.hasOwnProperty("balance"))
                if (!$util.isInteger(message.balance))
                    return "balance: integer expected";
            if (message.withdrawBalance != null && message.hasOwnProperty("withdrawBalance"))
                if (!$util.isInteger(message.withdrawBalance))
                    return "withdrawBalance: integer expected";
            return null;
        };

        /**
         * Creates a SyncPlayerBalance message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.SyncPlayerBalance
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.SyncPlayerBalance} SyncPlayerBalance
         */
        SyncPlayerBalance.fromObject = function fromObject(object) {
            if (object instanceof $root.base.SyncPlayerBalance)
                return object;
            let message = new $root.base.SyncPlayerBalance();
            if (object.balance != null)
                message.balance = object.balance | 0;
            if (object.withdrawBalance != null)
                message.withdrawBalance = object.withdrawBalance | 0;
            return message;
        };

        /**
         * Creates a plain object from a SyncPlayerBalance message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.SyncPlayerBalance
         * @static
         * @param {base.SyncPlayerBalance} message SyncPlayerBalance
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SyncPlayerBalance.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.balance = 0;
                object.withdrawBalance = 0;
            }
            if (message.balance != null && message.hasOwnProperty("balance"))
                object.balance = message.balance;
            if (message.withdrawBalance != null && message.hasOwnProperty("withdrawBalance"))
                object.withdrawBalance = message.withdrawBalance;
            return object;
        };

        /**
         * Converts this SyncPlayerBalance to JSON.
         * @function toJSON
         * @memberof base.SyncPlayerBalance
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SyncPlayerBalance.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SyncPlayerBalance;
    })();

    base.GamePlayerSettled = (function() {

        /**
         * Properties of a GamePlayerSettled.
         * @memberof base
         * @interface IGamePlayerSettled
         * @property {string|null} [gameCode] GamePlayerSettled gameCode
         * @property {number|null} [maxBonus] GamePlayerSettled maxBonus
         * @property {number|null} [amount] GamePlayerSettled amount
         * @property {number|null} [total] GamePlayerSettled total
         * @property {number|null} [clubId] GamePlayerSettled clubId
         * @property {string|null} [detail] GamePlayerSettled detail
         * @property {number|null} [feeRate] GamePlayerSettled feeRate
         * @property {number|null} [gameId] GamePlayerSettled gameId
         * @property {number|null} [withdrawRate] GamePlayerSettled withdrawRate
         * @property {base.BALANCE_UPDATE_TYPE|null} [updateType] GamePlayerSettled updateType
         */

        /**
         * Constructs a new GamePlayerSettled.
         * @memberof base
         * @classdesc Represents a GamePlayerSettled.
         * @implements IGamePlayerSettled
         * @constructor
         * @param {base.IGamePlayerSettled=} [properties] Properties to set
         */
        function GamePlayerSettled(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GamePlayerSettled gameCode.
         * @member {string} gameCode
         * @memberof base.GamePlayerSettled
         * @instance
         */
        GamePlayerSettled.prototype.gameCode = "";

        /**
         * GamePlayerSettled maxBonus.
         * @member {number} maxBonus
         * @memberof base.GamePlayerSettled
         * @instance
         */
        GamePlayerSettled.prototype.maxBonus = 0;

        /**
         * GamePlayerSettled amount.
         * @member {number} amount
         * @memberof base.GamePlayerSettled
         * @instance
         */
        GamePlayerSettled.prototype.amount = 0;

        /**
         * GamePlayerSettled total.
         * @member {number} total
         * @memberof base.GamePlayerSettled
         * @instance
         */
        GamePlayerSettled.prototype.total = 0;

        /**
         * GamePlayerSettled clubId.
         * @member {number} clubId
         * @memberof base.GamePlayerSettled
         * @instance
         */
        GamePlayerSettled.prototype.clubId = 0;

        /**
         * GamePlayerSettled detail.
         * @member {string} detail
         * @memberof base.GamePlayerSettled
         * @instance
         */
        GamePlayerSettled.prototype.detail = "";

        /**
         * GamePlayerSettled feeRate.
         * @member {number} feeRate
         * @memberof base.GamePlayerSettled
         * @instance
         */
        GamePlayerSettled.prototype.feeRate = 0;

        /**
         * GamePlayerSettled gameId.
         * @member {number} gameId
         * @memberof base.GamePlayerSettled
         * @instance
         */
        GamePlayerSettled.prototype.gameId = 0;

        /**
         * GamePlayerSettled withdrawRate.
         * @member {number} withdrawRate
         * @memberof base.GamePlayerSettled
         * @instance
         */
        GamePlayerSettled.prototype.withdrawRate = 0;

        /**
         * GamePlayerSettled updateType.
         * @member {base.BALANCE_UPDATE_TYPE} updateType
         * @memberof base.GamePlayerSettled
         * @instance
         */
        GamePlayerSettled.prototype.updateType = 0;

        /**
         * Creates a new GamePlayerSettled instance using the specified properties.
         * @function create
         * @memberof base.GamePlayerSettled
         * @static
         * @param {base.IGamePlayerSettled=} [properties] Properties to set
         * @returns {base.GamePlayerSettled} GamePlayerSettled instance
         */
        GamePlayerSettled.create = function create(properties) {
            return new GamePlayerSettled(properties);
        };

        /**
         * Encodes the specified GamePlayerSettled message. Does not implicitly {@link base.GamePlayerSettled.verify|verify} messages.
         * @function encode
         * @memberof base.GamePlayerSettled
         * @static
         * @param {base.IGamePlayerSettled} message GamePlayerSettled message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GamePlayerSettled.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameCode != null && Object.hasOwnProperty.call(message, "gameCode"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gameCode);
            if (message.maxBonus != null && Object.hasOwnProperty.call(message, "maxBonus"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.maxBonus);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.amount);
            if (message.total != null && Object.hasOwnProperty.call(message, "total"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.total);
            if (message.clubId != null && Object.hasOwnProperty.call(message, "clubId"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.clubId);
            if (message.detail != null && Object.hasOwnProperty.call(message, "detail"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.detail);
            if (message.feeRate != null && Object.hasOwnProperty.call(message, "feeRate"))
                writer.uint32(/* id 7, wireType 5 =*/61).float(message.feeRate);
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.gameId);
            if (message.withdrawRate != null && Object.hasOwnProperty.call(message, "withdrawRate"))
                writer.uint32(/* id 9, wireType 5 =*/77).float(message.withdrawRate);
            if (message.updateType != null && Object.hasOwnProperty.call(message, "updateType"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.updateType);
            return writer;
        };

        /**
         * Encodes the specified GamePlayerSettled message, length delimited. Does not implicitly {@link base.GamePlayerSettled.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.GamePlayerSettled
         * @static
         * @param {base.IGamePlayerSettled} message GamePlayerSettled message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GamePlayerSettled.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GamePlayerSettled message from the specified reader or buffer.
         * @function decode
         * @memberof base.GamePlayerSettled
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.GamePlayerSettled} GamePlayerSettled
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GamePlayerSettled.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.GamePlayerSettled();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameCode = reader.string();
                    break;
                case 2:
                    message.maxBonus = reader.int32();
                    break;
                case 3:
                    message.amount = reader.int32();
                    break;
                case 4:
                    message.total = reader.int32();
                    break;
                case 5:
                    message.clubId = reader.int32();
                    break;
                case 6:
                    message.detail = reader.string();
                    break;
                case 7:
                    message.feeRate = reader.float();
                    break;
                case 8:
                    message.gameId = reader.int32();
                    break;
                case 9:
                    message.withdrawRate = reader.float();
                    break;
                case 10:
                    message.updateType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GamePlayerSettled message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.GamePlayerSettled
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.GamePlayerSettled} GamePlayerSettled
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GamePlayerSettled.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GamePlayerSettled message.
         * @function verify
         * @memberof base.GamePlayerSettled
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GamePlayerSettled.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                if (!$util.isString(message.gameCode))
                    return "gameCode: string expected";
            if (message.maxBonus != null && message.hasOwnProperty("maxBonus"))
                if (!$util.isInteger(message.maxBonus))
                    return "maxBonus: integer expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount))
                    return "amount: integer expected";
            if (message.total != null && message.hasOwnProperty("total"))
                if (!$util.isInteger(message.total))
                    return "total: integer expected";
            if (message.clubId != null && message.hasOwnProperty("clubId"))
                if (!$util.isInteger(message.clubId))
                    return "clubId: integer expected";
            if (message.detail != null && message.hasOwnProperty("detail"))
                if (!$util.isString(message.detail))
                    return "detail: string expected";
            if (message.feeRate != null && message.hasOwnProperty("feeRate"))
                if (typeof message.feeRate !== "number")
                    return "feeRate: number expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.withdrawRate != null && message.hasOwnProperty("withdrawRate"))
                if (typeof message.withdrawRate !== "number")
                    return "withdrawRate: number expected";
            if (message.updateType != null && message.hasOwnProperty("updateType"))
                switch (message.updateType) {
                default:
                    return "updateType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 11:
                case 21:
                case 22:
                case 36:
                case 51:
                case 41:
                case 31:
                case 32:
                case 33:
                case 34:
                case 35:
                case 61:
                case 62:
                case 63:
                case 64:
                case 71:
                case 72:
                case 1000:
                case 1001:
                    break;
                }
            return null;
        };

        /**
         * Creates a GamePlayerSettled message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.GamePlayerSettled
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.GamePlayerSettled} GamePlayerSettled
         */
        GamePlayerSettled.fromObject = function fromObject(object) {
            if (object instanceof $root.base.GamePlayerSettled)
                return object;
            let message = new $root.base.GamePlayerSettled();
            if (object.gameCode != null)
                message.gameCode = String(object.gameCode);
            if (object.maxBonus != null)
                message.maxBonus = object.maxBonus | 0;
            if (object.amount != null)
                message.amount = object.amount | 0;
            if (object.total != null)
                message.total = object.total | 0;
            if (object.clubId != null)
                message.clubId = object.clubId | 0;
            if (object.detail != null)
                message.detail = String(object.detail);
            if (object.feeRate != null)
                message.feeRate = Number(object.feeRate);
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.withdrawRate != null)
                message.withdrawRate = Number(object.withdrawRate);
            switch (object.updateType) {
            case "BU_NONE":
            case 0:
                message.updateType = 0;
                break;
            case "BU_GAME":
            case 1:
                message.updateType = 1;
                break;
            case "BU_LOGIN":
            case 2:
                message.updateType = 2;
                break;
            case "BU_FEE_BACK":
            case 3:
                message.updateType = 3;
                break;
            case "SOURCE_RECHARGE":
            case 11:
                message.updateType = 11;
                break;
            case "SOURCE_WITHDRAW":
            case 21:
                message.updateType = 21;
                break;
            case "SOURCE_WITHDRAW_FAIL":
            case 22:
                message.updateType = 22;
                break;
            case "SOURCE_ACTIVITY":
            case 36:
                message.updateType = 36;
                break;
            case "SOURCE_MAIL":
            case 51:
                message.updateType = 51;
                break;
            case "SOURCE_ADMIN":
            case 41:
                message.updateType = 41;
                break;
            case "SOURCE_RECHARGE_GIVE":
            case 31:
                message.updateType = 31;
                break;
            case "SOURCE_GIFT":
            case 32:
                message.updateType = 32;
                break;
            case "SOURCE_FREE_LUCK":
            case 33:
                message.updateType = 33;
                break;
            case "SOURCE_PAY_LUCK":
            case 34:
                message.updateType = 34;
                break;
            case "SOURCE_PAY_LUCK_PAY":
            case 35:
                message.updateType = 35;
                break;
            case "SOURCE_CASH_BACK":
            case 61:
                message.updateType = 61;
                break;
            case "SOURCE_BONUS":
            case 62:
                message.updateType = 62;
                break;
            case "SOURCE_TRANSFER":
            case 63:
                message.updateType = 63;
                break;
            case "SOURCE_SEND_MAIL":
            case 64:
                message.updateType = 64;
                break;
            case "SOURCE_SIGN":
            case 71:
                message.updateType = 71;
                break;
            case "SOURCE_VIP_UP":
            case 72:
                message.updateType = 72;
                break;
            case "SOURCE_LUCKY_SHOT":
            case 1000:
                message.updateType = 1000;
                break;
            case "SOURCE_PRIVATE_TABLE_CREATE":
            case 1001:
                message.updateType = 1001;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a GamePlayerSettled message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.GamePlayerSettled
         * @static
         * @param {base.GamePlayerSettled} message GamePlayerSettled
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GamePlayerSettled.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.gameCode = "";
                object.maxBonus = 0;
                object.amount = 0;
                object.total = 0;
                object.clubId = 0;
                object.detail = "";
                object.feeRate = 0;
                object.gameId = 0;
                object.withdrawRate = 0;
                object.updateType = options.enums === String ? "BU_NONE" : 0;
            }
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                object.gameCode = message.gameCode;
            if (message.maxBonus != null && message.hasOwnProperty("maxBonus"))
                object.maxBonus = message.maxBonus;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = message.amount;
            if (message.total != null && message.hasOwnProperty("total"))
                object.total = message.total;
            if (message.clubId != null && message.hasOwnProperty("clubId"))
                object.clubId = message.clubId;
            if (message.detail != null && message.hasOwnProperty("detail"))
                object.detail = message.detail;
            if (message.feeRate != null && message.hasOwnProperty("feeRate"))
                object.feeRate = options.json && !isFinite(message.feeRate) ? String(message.feeRate) : message.feeRate;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.withdrawRate != null && message.hasOwnProperty("withdrawRate"))
                object.withdrawRate = options.json && !isFinite(message.withdrawRate) ? String(message.withdrawRate) : message.withdrawRate;
            if (message.updateType != null && message.hasOwnProperty("updateType"))
                object.updateType = options.enums === String ? $root.base.BALANCE_UPDATE_TYPE[message.updateType] : message.updateType;
            return object;
        };

        /**
         * Converts this GamePlayerSettled to JSON.
         * @function toJSON
         * @memberof base.GamePlayerSettled
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GamePlayerSettled.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GamePlayerSettled;
    })();

    base.SyncPlayerGameData = (function() {

        /**
         * Properties of a SyncPlayerGameData.
         * @memberof base
         * @interface ISyncPlayerGameData
         * @property {number|null} [gameId] SyncPlayerGameData gameId
         * @property {string|null} [data] SyncPlayerGameData data
         */

        /**
         * Constructs a new SyncPlayerGameData.
         * @memberof base
         * @classdesc Represents a SyncPlayerGameData.
         * @implements ISyncPlayerGameData
         * @constructor
         * @param {base.ISyncPlayerGameData=} [properties] Properties to set
         */
        function SyncPlayerGameData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SyncPlayerGameData gameId.
         * @member {number} gameId
         * @memberof base.SyncPlayerGameData
         * @instance
         */
        SyncPlayerGameData.prototype.gameId = 0;

        /**
         * SyncPlayerGameData data.
         * @member {string} data
         * @memberof base.SyncPlayerGameData
         * @instance
         */
        SyncPlayerGameData.prototype.data = "";

        /**
         * Creates a new SyncPlayerGameData instance using the specified properties.
         * @function create
         * @memberof base.SyncPlayerGameData
         * @static
         * @param {base.ISyncPlayerGameData=} [properties] Properties to set
         * @returns {base.SyncPlayerGameData} SyncPlayerGameData instance
         */
        SyncPlayerGameData.create = function create(properties) {
            return new SyncPlayerGameData(properties);
        };

        /**
         * Encodes the specified SyncPlayerGameData message. Does not implicitly {@link base.SyncPlayerGameData.verify|verify} messages.
         * @function encode
         * @memberof base.SyncPlayerGameData
         * @static
         * @param {base.ISyncPlayerGameData} message SyncPlayerGameData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncPlayerGameData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
            return writer;
        };

        /**
         * Encodes the specified SyncPlayerGameData message, length delimited. Does not implicitly {@link base.SyncPlayerGameData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.SyncPlayerGameData
         * @static
         * @param {base.ISyncPlayerGameData} message SyncPlayerGameData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncPlayerGameData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SyncPlayerGameData message from the specified reader or buffer.
         * @function decode
         * @memberof base.SyncPlayerGameData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.SyncPlayerGameData} SyncPlayerGameData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncPlayerGameData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.SyncPlayerGameData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameId = reader.int32();
                    break;
                case 2:
                    message.data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SyncPlayerGameData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.SyncPlayerGameData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.SyncPlayerGameData} SyncPlayerGameData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncPlayerGameData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SyncPlayerGameData message.
         * @function verify
         * @memberof base.SyncPlayerGameData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SyncPlayerGameData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!$util.isString(message.data))
                    return "data: string expected";
            return null;
        };

        /**
         * Creates a SyncPlayerGameData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.SyncPlayerGameData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.SyncPlayerGameData} SyncPlayerGameData
         */
        SyncPlayerGameData.fromObject = function fromObject(object) {
            if (object instanceof $root.base.SyncPlayerGameData)
                return object;
            let message = new $root.base.SyncPlayerGameData();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.data != null)
                message.data = String(object.data);
            return message;
        };

        /**
         * Creates a plain object from a SyncPlayerGameData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.SyncPlayerGameData
         * @static
         * @param {base.SyncPlayerGameData} message SyncPlayerGameData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SyncPlayerGameData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.gameId = 0;
                object.data = "";
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = message.data;
            return object;
        };

        /**
         * Converts this SyncPlayerGameData to JSON.
         * @function toJSON
         * @memberof base.SyncPlayerGameData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SyncPlayerGameData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SyncPlayerGameData;
    })();

    base.AddPlayerBonus = (function() {

        /**
         * Properties of an AddPlayerBonus.
         * @memberof base
         * @interface IAddPlayerBonus
         * @property {number|null} [amount] AddPlayerBonus amount
         * @property {number|null} [expireTime] AddPlayerBonus expireTime
         * @property {string|null} [detail] AddPlayerBonus detail
         */

        /**
         * Constructs a new AddPlayerBonus.
         * @memberof base
         * @classdesc Represents an AddPlayerBonus.
         * @implements IAddPlayerBonus
         * @constructor
         * @param {base.IAddPlayerBonus=} [properties] Properties to set
         */
        function AddPlayerBonus(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AddPlayerBonus amount.
         * @member {number} amount
         * @memberof base.AddPlayerBonus
         * @instance
         */
        AddPlayerBonus.prototype.amount = 0;

        /**
         * AddPlayerBonus expireTime.
         * @member {number} expireTime
         * @memberof base.AddPlayerBonus
         * @instance
         */
        AddPlayerBonus.prototype.expireTime = 0;

        /**
         * AddPlayerBonus detail.
         * @member {string} detail
         * @memberof base.AddPlayerBonus
         * @instance
         */
        AddPlayerBonus.prototype.detail = "";

        /**
         * Creates a new AddPlayerBonus instance using the specified properties.
         * @function create
         * @memberof base.AddPlayerBonus
         * @static
         * @param {base.IAddPlayerBonus=} [properties] Properties to set
         * @returns {base.AddPlayerBonus} AddPlayerBonus instance
         */
        AddPlayerBonus.create = function create(properties) {
            return new AddPlayerBonus(properties);
        };

        /**
         * Encodes the specified AddPlayerBonus message. Does not implicitly {@link base.AddPlayerBonus.verify|verify} messages.
         * @function encode
         * @memberof base.AddPlayerBonus
         * @static
         * @param {base.IAddPlayerBonus} message AddPlayerBonus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddPlayerBonus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.amount);
            if (message.expireTime != null && Object.hasOwnProperty.call(message, "expireTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.expireTime);
            if (message.detail != null && Object.hasOwnProperty.call(message, "detail"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.detail);
            return writer;
        };

        /**
         * Encodes the specified AddPlayerBonus message, length delimited. Does not implicitly {@link base.AddPlayerBonus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.AddPlayerBonus
         * @static
         * @param {base.IAddPlayerBonus} message AddPlayerBonus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddPlayerBonus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AddPlayerBonus message from the specified reader or buffer.
         * @function decode
         * @memberof base.AddPlayerBonus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.AddPlayerBonus} AddPlayerBonus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddPlayerBonus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.AddPlayerBonus();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.amount = reader.int32();
                    break;
                case 2:
                    message.expireTime = reader.int32();
                    break;
                case 3:
                    message.detail = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AddPlayerBonus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.AddPlayerBonus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.AddPlayerBonus} AddPlayerBonus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddPlayerBonus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AddPlayerBonus message.
         * @function verify
         * @memberof base.AddPlayerBonus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AddPlayerBonus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount))
                    return "amount: integer expected";
            if (message.expireTime != null && message.hasOwnProperty("expireTime"))
                if (!$util.isInteger(message.expireTime))
                    return "expireTime: integer expected";
            if (message.detail != null && message.hasOwnProperty("detail"))
                if (!$util.isString(message.detail))
                    return "detail: string expected";
            return null;
        };

        /**
         * Creates an AddPlayerBonus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.AddPlayerBonus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.AddPlayerBonus} AddPlayerBonus
         */
        AddPlayerBonus.fromObject = function fromObject(object) {
            if (object instanceof $root.base.AddPlayerBonus)
                return object;
            let message = new $root.base.AddPlayerBonus();
            if (object.amount != null)
                message.amount = object.amount | 0;
            if (object.expireTime != null)
                message.expireTime = object.expireTime | 0;
            if (object.detail != null)
                message.detail = String(object.detail);
            return message;
        };

        /**
         * Creates a plain object from an AddPlayerBonus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.AddPlayerBonus
         * @static
         * @param {base.AddPlayerBonus} message AddPlayerBonus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AddPlayerBonus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.amount = 0;
                object.expireTime = 0;
                object.detail = "";
            }
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = message.amount;
            if (message.expireTime != null && message.hasOwnProperty("expireTime"))
                object.expireTime = message.expireTime;
            if (message.detail != null && message.hasOwnProperty("detail"))
                object.detail = message.detail;
            return object;
        };

        /**
         * Converts this AddPlayerBonus to JSON.
         * @function toJSON
         * @memberof base.AddPlayerBonus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AddPlayerBonus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AddPlayerBonus;
    })();

    base.FreezeBalance = (function() {

        /**
         * Properties of a FreezeBalance.
         * @memberof base
         * @interface IFreezeBalance
         * @property {number|null} [gameId] FreezeBalance gameId
         * @property {number|null} [amount] FreezeBalance amount
         */

        /**
         * Constructs a new FreezeBalance.
         * @memberof base
         * @classdesc Represents a FreezeBalance.
         * @implements IFreezeBalance
         * @constructor
         * @param {base.IFreezeBalance=} [properties] Properties to set
         */
        function FreezeBalance(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FreezeBalance gameId.
         * @member {number} gameId
         * @memberof base.FreezeBalance
         * @instance
         */
        FreezeBalance.prototype.gameId = 0;

        /**
         * FreezeBalance amount.
         * @member {number} amount
         * @memberof base.FreezeBalance
         * @instance
         */
        FreezeBalance.prototype.amount = 0;

        /**
         * Creates a new FreezeBalance instance using the specified properties.
         * @function create
         * @memberof base.FreezeBalance
         * @static
         * @param {base.IFreezeBalance=} [properties] Properties to set
         * @returns {base.FreezeBalance} FreezeBalance instance
         */
        FreezeBalance.create = function create(properties) {
            return new FreezeBalance(properties);
        };

        /**
         * Encodes the specified FreezeBalance message. Does not implicitly {@link base.FreezeBalance.verify|verify} messages.
         * @function encode
         * @memberof base.FreezeBalance
         * @static
         * @param {base.IFreezeBalance} message FreezeBalance message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FreezeBalance.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.amount);
            return writer;
        };

        /**
         * Encodes the specified FreezeBalance message, length delimited. Does not implicitly {@link base.FreezeBalance.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.FreezeBalance
         * @static
         * @param {base.IFreezeBalance} message FreezeBalance message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FreezeBalance.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FreezeBalance message from the specified reader or buffer.
         * @function decode
         * @memberof base.FreezeBalance
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.FreezeBalance} FreezeBalance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FreezeBalance.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.FreezeBalance();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameId = reader.int32();
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
         * Decodes a FreezeBalance message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.FreezeBalance
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.FreezeBalance} FreezeBalance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FreezeBalance.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FreezeBalance message.
         * @function verify
         * @memberof base.FreezeBalance
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FreezeBalance.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount))
                    return "amount: integer expected";
            return null;
        };

        /**
         * Creates a FreezeBalance message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.FreezeBalance
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.FreezeBalance} FreezeBalance
         */
        FreezeBalance.fromObject = function fromObject(object) {
            if (object instanceof $root.base.FreezeBalance)
                return object;
            let message = new $root.base.FreezeBalance();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.amount != null)
                message.amount = object.amount | 0;
            return message;
        };

        /**
         * Creates a plain object from a FreezeBalance message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.FreezeBalance
         * @static
         * @param {base.FreezeBalance} message FreezeBalance
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FreezeBalance.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.gameId = 0;
                object.amount = 0;
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = message.amount;
            return object;
        };

        /**
         * Converts this FreezeBalance to JSON.
         * @function toJSON
         * @memberof base.FreezeBalance
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FreezeBalance.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return FreezeBalance;
    })();

    base.PlayerLoginReq = (function() {

        /**
         * Properties of a PlayerLoginReq.
         * @memberof base
         * @interface IPlayerLoginReq
         * @property {string|null} [token] PlayerLoginReq token
         */

        /**
         * Constructs a new PlayerLoginReq.
         * @memberof base
         * @classdesc Represents a PlayerLoginReq.
         * @implements IPlayerLoginReq
         * @constructor
         * @param {base.IPlayerLoginReq=} [properties] Properties to set
         */
        function PlayerLoginReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerLoginReq token.
         * @member {string} token
         * @memberof base.PlayerLoginReq
         * @instance
         */
        PlayerLoginReq.prototype.token = "";

        /**
         * Creates a new PlayerLoginReq instance using the specified properties.
         * @function create
         * @memberof base.PlayerLoginReq
         * @static
         * @param {base.IPlayerLoginReq=} [properties] Properties to set
         * @returns {base.PlayerLoginReq} PlayerLoginReq instance
         */
        PlayerLoginReq.create = function create(properties) {
            return new PlayerLoginReq(properties);
        };

        /**
         * Encodes the specified PlayerLoginReq message. Does not implicitly {@link base.PlayerLoginReq.verify|verify} messages.
         * @function encode
         * @memberof base.PlayerLoginReq
         * @static
         * @param {base.IPlayerLoginReq} message PlayerLoginReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerLoginReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
            return writer;
        };

        /**
         * Encodes the specified PlayerLoginReq message, length delimited. Does not implicitly {@link base.PlayerLoginReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.PlayerLoginReq
         * @static
         * @param {base.IPlayerLoginReq} message PlayerLoginReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerLoginReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerLoginReq message from the specified reader or buffer.
         * @function decode
         * @memberof base.PlayerLoginReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.PlayerLoginReq} PlayerLoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerLoginReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.PlayerLoginReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.token = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerLoginReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.PlayerLoginReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.PlayerLoginReq} PlayerLoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerLoginReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerLoginReq message.
         * @function verify
         * @memberof base.PlayerLoginReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerLoginReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            return null;
        };

        /**
         * Creates a PlayerLoginReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.PlayerLoginReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.PlayerLoginReq} PlayerLoginReq
         */
        PlayerLoginReq.fromObject = function fromObject(object) {
            if (object instanceof $root.base.PlayerLoginReq)
                return object;
            let message = new $root.base.PlayerLoginReq();
            if (object.token != null)
                message.token = String(object.token);
            return message;
        };

        /**
         * Creates a plain object from a PlayerLoginReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.PlayerLoginReq
         * @static
         * @param {base.PlayerLoginReq} message PlayerLoginReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerLoginReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.token = "";
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            return object;
        };

        /**
         * Converts this PlayerLoginReq to JSON.
         * @function toJSON
         * @memberof base.PlayerLoginReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerLoginReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerLoginReq;
    })();

    base.PlayerLoginReply = (function() {

        /**
         * Properties of a PlayerLoginReply.
         * @memberof base
         * @interface IPlayerLoginReply
         * @property {base.IPlayerBaseInfo|null} [baseInfo] PlayerLoginReply baseInfo
         * @property {Array.<base.IBalanceInfo>|null} [balances] PlayerLoginReply balances
         * @property {Array.<base.IBonusInfo>|null} [bonuses] PlayerLoginReply bonuses
         * @property {Array.<base.IBalanceClubInfo>|null} [balancesClub] PlayerLoginReply balancesClub
         * @property {Array.<number>|null} [gameList] PlayerLoginReply gameList
         * @property {Array.<number>|null} [inGame] PlayerLoginReply inGame
         */

        /**
         * Constructs a new PlayerLoginReply.
         * @memberof base
         * @classdesc Represents a PlayerLoginReply.
         * @implements IPlayerLoginReply
         * @constructor
         * @param {base.IPlayerLoginReply=} [properties] Properties to set
         */
        function PlayerLoginReply(properties) {
            this.balances = [];
            this.bonuses = [];
            this.balancesClub = [];
            this.gameList = [];
            this.inGame = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerLoginReply baseInfo.
         * @member {base.IPlayerBaseInfo|null|undefined} baseInfo
         * @memberof base.PlayerLoginReply
         * @instance
         */
        PlayerLoginReply.prototype.baseInfo = null;

        /**
         * PlayerLoginReply balances.
         * @member {Array.<base.IBalanceInfo>} balances
         * @memberof base.PlayerLoginReply
         * @instance
         */
        PlayerLoginReply.prototype.balances = $util.emptyArray;

        /**
         * PlayerLoginReply bonuses.
         * @member {Array.<base.IBonusInfo>} bonuses
         * @memberof base.PlayerLoginReply
         * @instance
         */
        PlayerLoginReply.prototype.bonuses = $util.emptyArray;

        /**
         * PlayerLoginReply balancesClub.
         * @member {Array.<base.IBalanceClubInfo>} balancesClub
         * @memberof base.PlayerLoginReply
         * @instance
         */
        PlayerLoginReply.prototype.balancesClub = $util.emptyArray;

        /**
         * PlayerLoginReply gameList.
         * @member {Array.<number>} gameList
         * @memberof base.PlayerLoginReply
         * @instance
         */
        PlayerLoginReply.prototype.gameList = $util.emptyArray;

        /**
         * PlayerLoginReply inGame.
         * @member {Array.<number>} inGame
         * @memberof base.PlayerLoginReply
         * @instance
         */
        PlayerLoginReply.prototype.inGame = $util.emptyArray;

        /**
         * Creates a new PlayerLoginReply instance using the specified properties.
         * @function create
         * @memberof base.PlayerLoginReply
         * @static
         * @param {base.IPlayerLoginReply=} [properties] Properties to set
         * @returns {base.PlayerLoginReply} PlayerLoginReply instance
         */
        PlayerLoginReply.create = function create(properties) {
            return new PlayerLoginReply(properties);
        };

        /**
         * Encodes the specified PlayerLoginReply message. Does not implicitly {@link base.PlayerLoginReply.verify|verify} messages.
         * @function encode
         * @memberof base.PlayerLoginReply
         * @static
         * @param {base.IPlayerLoginReply} message PlayerLoginReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerLoginReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.baseInfo != null && Object.hasOwnProperty.call(message, "baseInfo"))
                $root.base.PlayerBaseInfo.encode(message.baseInfo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.balances != null && message.balances.length)
                for (let i = 0; i < message.balances.length; ++i)
                    $root.base.BalanceInfo.encode(message.balances[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.bonuses != null && message.bonuses.length)
                for (let i = 0; i < message.bonuses.length; ++i)
                    $root.base.BonusInfo.encode(message.bonuses[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.balancesClub != null && message.balancesClub.length)
                for (let i = 0; i < message.balancesClub.length; ++i)
                    $root.base.BalanceClubInfo.encode(message.balancesClub[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.gameList != null && message.gameList.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (let i = 0; i < message.gameList.length; ++i)
                    writer.int32(message.gameList[i]);
                writer.ldelim();
            }
            if (message.inGame != null && message.inGame.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (let i = 0; i < message.inGame.length; ++i)
                    writer.int32(message.inGame[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified PlayerLoginReply message, length delimited. Does not implicitly {@link base.PlayerLoginReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.PlayerLoginReply
         * @static
         * @param {base.IPlayerLoginReply} message PlayerLoginReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerLoginReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerLoginReply message from the specified reader or buffer.
         * @function decode
         * @memberof base.PlayerLoginReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.PlayerLoginReply} PlayerLoginReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerLoginReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.PlayerLoginReply();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.baseInfo = $root.base.PlayerBaseInfo.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.balances && message.balances.length))
                        message.balances = [];
                    message.balances.push($root.base.BalanceInfo.decode(reader, reader.uint32()));
                    break;
                case 3:
                    if (!(message.bonuses && message.bonuses.length))
                        message.bonuses = [];
                    message.bonuses.push($root.base.BonusInfo.decode(reader, reader.uint32()));
                    break;
                case 4:
                    if (!(message.balancesClub && message.balancesClub.length))
                        message.balancesClub = [];
                    message.balancesClub.push($root.base.BalanceClubInfo.decode(reader, reader.uint32()));
                    break;
                case 5:
                    if (!(message.gameList && message.gameList.length))
                        message.gameList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.gameList.push(reader.int32());
                    } else
                        message.gameList.push(reader.int32());
                    break;
                case 6:
                    if (!(message.inGame && message.inGame.length))
                        message.inGame = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.inGame.push(reader.int32());
                    } else
                        message.inGame.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerLoginReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.PlayerLoginReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.PlayerLoginReply} PlayerLoginReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerLoginReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerLoginReply message.
         * @function verify
         * @memberof base.PlayerLoginReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerLoginReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.baseInfo != null && message.hasOwnProperty("baseInfo")) {
                let error = $root.base.PlayerBaseInfo.verify(message.baseInfo);
                if (error)
                    return "baseInfo." + error;
            }
            if (message.balances != null && message.hasOwnProperty("balances")) {
                if (!Array.isArray(message.balances))
                    return "balances: array expected";
                for (let i = 0; i < message.balances.length; ++i) {
                    let error = $root.base.BalanceInfo.verify(message.balances[i]);
                    if (error)
                        return "balances." + error;
                }
            }
            if (message.bonuses != null && message.hasOwnProperty("bonuses")) {
                if (!Array.isArray(message.bonuses))
                    return "bonuses: array expected";
                for (let i = 0; i < message.bonuses.length; ++i) {
                    let error = $root.base.BonusInfo.verify(message.bonuses[i]);
                    if (error)
                        return "bonuses." + error;
                }
            }
            if (message.balancesClub != null && message.hasOwnProperty("balancesClub")) {
                if (!Array.isArray(message.balancesClub))
                    return "balancesClub: array expected";
                for (let i = 0; i < message.balancesClub.length; ++i) {
                    let error = $root.base.BalanceClubInfo.verify(message.balancesClub[i]);
                    if (error)
                        return "balancesClub." + error;
                }
            }
            if (message.gameList != null && message.hasOwnProperty("gameList")) {
                if (!Array.isArray(message.gameList))
                    return "gameList: array expected";
                for (let i = 0; i < message.gameList.length; ++i)
                    if (!$util.isInteger(message.gameList[i]))
                        return "gameList: integer[] expected";
            }
            if (message.inGame != null && message.hasOwnProperty("inGame")) {
                if (!Array.isArray(message.inGame))
                    return "inGame: array expected";
                for (let i = 0; i < message.inGame.length; ++i)
                    if (!$util.isInteger(message.inGame[i]))
                        return "inGame: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a PlayerLoginReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.PlayerLoginReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.PlayerLoginReply} PlayerLoginReply
         */
        PlayerLoginReply.fromObject = function fromObject(object) {
            if (object instanceof $root.base.PlayerLoginReply)
                return object;
            let message = new $root.base.PlayerLoginReply();
            if (object.baseInfo != null) {
                if (typeof object.baseInfo !== "object")
                    throw TypeError(".base.PlayerLoginReply.baseInfo: object expected");
                message.baseInfo = $root.base.PlayerBaseInfo.fromObject(object.baseInfo);
            }
            if (object.balances) {
                if (!Array.isArray(object.balances))
                    throw TypeError(".base.PlayerLoginReply.balances: array expected");
                message.balances = [];
                for (let i = 0; i < object.balances.length; ++i) {
                    if (typeof object.balances[i] !== "object")
                        throw TypeError(".base.PlayerLoginReply.balances: object expected");
                    message.balances[i] = $root.base.BalanceInfo.fromObject(object.balances[i]);
                }
            }
            if (object.bonuses) {
                if (!Array.isArray(object.bonuses))
                    throw TypeError(".base.PlayerLoginReply.bonuses: array expected");
                message.bonuses = [];
                for (let i = 0; i < object.bonuses.length; ++i) {
                    if (typeof object.bonuses[i] !== "object")
                        throw TypeError(".base.PlayerLoginReply.bonuses: object expected");
                    message.bonuses[i] = $root.base.BonusInfo.fromObject(object.bonuses[i]);
                }
            }
            if (object.balancesClub) {
                if (!Array.isArray(object.balancesClub))
                    throw TypeError(".base.PlayerLoginReply.balancesClub: array expected");
                message.balancesClub = [];
                for (let i = 0; i < object.balancesClub.length; ++i) {
                    if (typeof object.balancesClub[i] !== "object")
                        throw TypeError(".base.PlayerLoginReply.balancesClub: object expected");
                    message.balancesClub[i] = $root.base.BalanceClubInfo.fromObject(object.balancesClub[i]);
                }
            }
            if (object.gameList) {
                if (!Array.isArray(object.gameList))
                    throw TypeError(".base.PlayerLoginReply.gameList: array expected");
                message.gameList = [];
                for (let i = 0; i < object.gameList.length; ++i)
                    message.gameList[i] = object.gameList[i] | 0;
            }
            if (object.inGame) {
                if (!Array.isArray(object.inGame))
                    throw TypeError(".base.PlayerLoginReply.inGame: array expected");
                message.inGame = [];
                for (let i = 0; i < object.inGame.length; ++i)
                    message.inGame[i] = object.inGame[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerLoginReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.PlayerLoginReply
         * @static
         * @param {base.PlayerLoginReply} message PlayerLoginReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerLoginReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.balances = [];
                object.bonuses = [];
                object.balancesClub = [];
                object.gameList = [];
                object.inGame = [];
            }
            if (options.defaults)
                object.baseInfo = null;
            if (message.baseInfo != null && message.hasOwnProperty("baseInfo"))
                object.baseInfo = $root.base.PlayerBaseInfo.toObject(message.baseInfo, options);
            if (message.balances && message.balances.length) {
                object.balances = [];
                for (let j = 0; j < message.balances.length; ++j)
                    object.balances[j] = $root.base.BalanceInfo.toObject(message.balances[j], options);
            }
            if (message.bonuses && message.bonuses.length) {
                object.bonuses = [];
                for (let j = 0; j < message.bonuses.length; ++j)
                    object.bonuses[j] = $root.base.BonusInfo.toObject(message.bonuses[j], options);
            }
            if (message.balancesClub && message.balancesClub.length) {
                object.balancesClub = [];
                for (let j = 0; j < message.balancesClub.length; ++j)
                    object.balancesClub[j] = $root.base.BalanceClubInfo.toObject(message.balancesClub[j], options);
            }
            if (message.gameList && message.gameList.length) {
                object.gameList = [];
                for (let j = 0; j < message.gameList.length; ++j)
                    object.gameList[j] = message.gameList[j];
            }
            if (message.inGame && message.inGame.length) {
                object.inGame = [];
                for (let j = 0; j < message.inGame.length; ++j)
                    object.inGame[j] = message.inGame[j];
            }
            return object;
        };

        /**
         * Converts this PlayerLoginReply to JSON.
         * @function toJSON
         * @memberof base.PlayerLoginReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerLoginReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerLoginReply;
    })();

    base.PlayerBalanceEvent = (function() {

        /**
         * Properties of a PlayerBalanceEvent.
         * @memberof base
         * @interface IPlayerBalanceEvent
         * @property {Array.<base.IBalanceInfo>|null} [balances] PlayerBalanceEvent balances
         * @property {Array.<base.IBonusInfo>|null} [bonuses] PlayerBalanceEvent bonuses
         * @property {Array.<base.IBalanceClubInfo>|null} [balancesClub] PlayerBalanceEvent balancesClub
         * @property {number|null} [availableBalance] PlayerBalanceEvent availableBalance
         */

        /**
         * Constructs a new PlayerBalanceEvent.
         * @memberof base
         * @classdesc Represents a PlayerBalanceEvent.
         * @implements IPlayerBalanceEvent
         * @constructor
         * @param {base.IPlayerBalanceEvent=} [properties] Properties to set
         */
        function PlayerBalanceEvent(properties) {
            this.balances = [];
            this.bonuses = [];
            this.balancesClub = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerBalanceEvent balances.
         * @member {Array.<base.IBalanceInfo>} balances
         * @memberof base.PlayerBalanceEvent
         * @instance
         */
        PlayerBalanceEvent.prototype.balances = $util.emptyArray;

        /**
         * PlayerBalanceEvent bonuses.
         * @member {Array.<base.IBonusInfo>} bonuses
         * @memberof base.PlayerBalanceEvent
         * @instance
         */
        PlayerBalanceEvent.prototype.bonuses = $util.emptyArray;

        /**
         * PlayerBalanceEvent balancesClub.
         * @member {Array.<base.IBalanceClubInfo>} balancesClub
         * @memberof base.PlayerBalanceEvent
         * @instance
         */
        PlayerBalanceEvent.prototype.balancesClub = $util.emptyArray;

        /**
         * PlayerBalanceEvent availableBalance.
         * @member {number} availableBalance
         * @memberof base.PlayerBalanceEvent
         * @instance
         */
        PlayerBalanceEvent.prototype.availableBalance = 0;

        /**
         * Creates a new PlayerBalanceEvent instance using the specified properties.
         * @function create
         * @memberof base.PlayerBalanceEvent
         * @static
         * @param {base.IPlayerBalanceEvent=} [properties] Properties to set
         * @returns {base.PlayerBalanceEvent} PlayerBalanceEvent instance
         */
        PlayerBalanceEvent.create = function create(properties) {
            return new PlayerBalanceEvent(properties);
        };

        /**
         * Encodes the specified PlayerBalanceEvent message. Does not implicitly {@link base.PlayerBalanceEvent.verify|verify} messages.
         * @function encode
         * @memberof base.PlayerBalanceEvent
         * @static
         * @param {base.IPlayerBalanceEvent} message PlayerBalanceEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBalanceEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.balances != null && message.balances.length)
                for (let i = 0; i < message.balances.length; ++i)
                    $root.base.BalanceInfo.encode(message.balances[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.bonuses != null && message.bonuses.length)
                for (let i = 0; i < message.bonuses.length; ++i)
                    $root.base.BonusInfo.encode(message.bonuses[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.balancesClub != null && message.balancesClub.length)
                for (let i = 0; i < message.balancesClub.length; ++i)
                    $root.base.BalanceClubInfo.encode(message.balancesClub[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.availableBalance != null && Object.hasOwnProperty.call(message, "availableBalance"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.availableBalance);
            return writer;
        };

        /**
         * Encodes the specified PlayerBalanceEvent message, length delimited. Does not implicitly {@link base.PlayerBalanceEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.PlayerBalanceEvent
         * @static
         * @param {base.IPlayerBalanceEvent} message PlayerBalanceEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBalanceEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerBalanceEvent message from the specified reader or buffer.
         * @function decode
         * @memberof base.PlayerBalanceEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.PlayerBalanceEvent} PlayerBalanceEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBalanceEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.PlayerBalanceEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.balances && message.balances.length))
                        message.balances = [];
                    message.balances.push($root.base.BalanceInfo.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message.bonuses && message.bonuses.length))
                        message.bonuses = [];
                    message.bonuses.push($root.base.BonusInfo.decode(reader, reader.uint32()));
                    break;
                case 3:
                    if (!(message.balancesClub && message.balancesClub.length))
                        message.balancesClub = [];
                    message.balancesClub.push($root.base.BalanceClubInfo.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.availableBalance = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerBalanceEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.PlayerBalanceEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.PlayerBalanceEvent} PlayerBalanceEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBalanceEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerBalanceEvent message.
         * @function verify
         * @memberof base.PlayerBalanceEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerBalanceEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.balances != null && message.hasOwnProperty("balances")) {
                if (!Array.isArray(message.balances))
                    return "balances: array expected";
                for (let i = 0; i < message.balances.length; ++i) {
                    let error = $root.base.BalanceInfo.verify(message.balances[i]);
                    if (error)
                        return "balances." + error;
                }
            }
            if (message.bonuses != null && message.hasOwnProperty("bonuses")) {
                if (!Array.isArray(message.bonuses))
                    return "bonuses: array expected";
                for (let i = 0; i < message.bonuses.length; ++i) {
                    let error = $root.base.BonusInfo.verify(message.bonuses[i]);
                    if (error)
                        return "bonuses." + error;
                }
            }
            if (message.balancesClub != null && message.hasOwnProperty("balancesClub")) {
                if (!Array.isArray(message.balancesClub))
                    return "balancesClub: array expected";
                for (let i = 0; i < message.balancesClub.length; ++i) {
                    let error = $root.base.BalanceClubInfo.verify(message.balancesClub[i]);
                    if (error)
                        return "balancesClub." + error;
                }
            }
            if (message.availableBalance != null && message.hasOwnProperty("availableBalance"))
                if (!$util.isInteger(message.availableBalance))
                    return "availableBalance: integer expected";
            return null;
        };

        /**
         * Creates a PlayerBalanceEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.PlayerBalanceEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.PlayerBalanceEvent} PlayerBalanceEvent
         */
        PlayerBalanceEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.base.PlayerBalanceEvent)
                return object;
            let message = new $root.base.PlayerBalanceEvent();
            if (object.balances) {
                if (!Array.isArray(object.balances))
                    throw TypeError(".base.PlayerBalanceEvent.balances: array expected");
                message.balances = [];
                for (let i = 0; i < object.balances.length; ++i) {
                    if (typeof object.balances[i] !== "object")
                        throw TypeError(".base.PlayerBalanceEvent.balances: object expected");
                    message.balances[i] = $root.base.BalanceInfo.fromObject(object.balances[i]);
                }
            }
            if (object.bonuses) {
                if (!Array.isArray(object.bonuses))
                    throw TypeError(".base.PlayerBalanceEvent.bonuses: array expected");
                message.bonuses = [];
                for (let i = 0; i < object.bonuses.length; ++i) {
                    if (typeof object.bonuses[i] !== "object")
                        throw TypeError(".base.PlayerBalanceEvent.bonuses: object expected");
                    message.bonuses[i] = $root.base.BonusInfo.fromObject(object.bonuses[i]);
                }
            }
            if (object.balancesClub) {
                if (!Array.isArray(object.balancesClub))
                    throw TypeError(".base.PlayerBalanceEvent.balancesClub: array expected");
                message.balancesClub = [];
                for (let i = 0; i < object.balancesClub.length; ++i) {
                    if (typeof object.balancesClub[i] !== "object")
                        throw TypeError(".base.PlayerBalanceEvent.balancesClub: object expected");
                    message.balancesClub[i] = $root.base.BalanceClubInfo.fromObject(object.balancesClub[i]);
                }
            }
            if (object.availableBalance != null)
                message.availableBalance = object.availableBalance | 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerBalanceEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.PlayerBalanceEvent
         * @static
         * @param {base.PlayerBalanceEvent} message PlayerBalanceEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerBalanceEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.balances = [];
                object.bonuses = [];
                object.balancesClub = [];
            }
            if (options.defaults)
                object.availableBalance = 0;
            if (message.balances && message.balances.length) {
                object.balances = [];
                for (let j = 0; j < message.balances.length; ++j)
                    object.balances[j] = $root.base.BalanceInfo.toObject(message.balances[j], options);
            }
            if (message.bonuses && message.bonuses.length) {
                object.bonuses = [];
                for (let j = 0; j < message.bonuses.length; ++j)
                    object.bonuses[j] = $root.base.BonusInfo.toObject(message.bonuses[j], options);
            }
            if (message.balancesClub && message.balancesClub.length) {
                object.balancesClub = [];
                for (let j = 0; j < message.balancesClub.length; ++j)
                    object.balancesClub[j] = $root.base.BalanceClubInfo.toObject(message.balancesClub[j], options);
            }
            if (message.availableBalance != null && message.hasOwnProperty("availableBalance"))
                object.availableBalance = message.availableBalance;
            return object;
        };

        /**
         * Converts this PlayerBalanceEvent to JSON.
         * @function toJSON
         * @memberof base.PlayerBalanceEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerBalanceEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerBalanceEvent;
    })();

    base.PlayerBaseInfo = (function() {

        /**
         * Properties of a PlayerBaseInfo.
         * @memberof base
         * @interface IPlayerBaseInfo
         * @property {number|Long|null} [playerId] PlayerBaseInfo playerId
         * @property {string|null} [nickname] PlayerBaseInfo nickname
         * @property {string|null} [headId] PlayerBaseInfo headId
         * @property {string|null} [headUrl] PlayerBaseInfo headUrl
         * @property {number|null} [tag] PlayerBaseInfo tag
         * @property {number|null} [avatarFrame] PlayerBaseInfo avatarFrame
         * @property {number|null} [cardBack] PlayerBaseInfo cardBack
         * @property {number|null} [vipLevel] PlayerBaseInfo vipLevel
         */

        /**
         * Constructs a new PlayerBaseInfo.
         * @memberof base
         * @classdesc Represents a PlayerBaseInfo.
         * @implements IPlayerBaseInfo
         * @constructor
         * @param {base.IPlayerBaseInfo=} [properties] Properties to set
         */
        function PlayerBaseInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerBaseInfo playerId.
         * @member {number|Long} playerId
         * @memberof base.PlayerBaseInfo
         * @instance
         */
        PlayerBaseInfo.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PlayerBaseInfo nickname.
         * @member {string} nickname
         * @memberof base.PlayerBaseInfo
         * @instance
         */
        PlayerBaseInfo.prototype.nickname = "";

        /**
         * PlayerBaseInfo headId.
         * @member {string} headId
         * @memberof base.PlayerBaseInfo
         * @instance
         */
        PlayerBaseInfo.prototype.headId = "";

        /**
         * PlayerBaseInfo headUrl.
         * @member {string} headUrl
         * @memberof base.PlayerBaseInfo
         * @instance
         */
        PlayerBaseInfo.prototype.headUrl = "";

        /**
         * PlayerBaseInfo tag.
         * @member {number} tag
         * @memberof base.PlayerBaseInfo
         * @instance
         */
        PlayerBaseInfo.prototype.tag = 0;

        /**
         * PlayerBaseInfo avatarFrame.
         * @member {number} avatarFrame
         * @memberof base.PlayerBaseInfo
         * @instance
         */
        PlayerBaseInfo.prototype.avatarFrame = 0;

        /**
         * PlayerBaseInfo cardBack.
         * @member {number} cardBack
         * @memberof base.PlayerBaseInfo
         * @instance
         */
        PlayerBaseInfo.prototype.cardBack = 0;

        /**
         * PlayerBaseInfo vipLevel.
         * @member {number} vipLevel
         * @memberof base.PlayerBaseInfo
         * @instance
         */
        PlayerBaseInfo.prototype.vipLevel = 0;

        /**
         * Creates a new PlayerBaseInfo instance using the specified properties.
         * @function create
         * @memberof base.PlayerBaseInfo
         * @static
         * @param {base.IPlayerBaseInfo=} [properties] Properties to set
         * @returns {base.PlayerBaseInfo} PlayerBaseInfo instance
         */
        PlayerBaseInfo.create = function create(properties) {
            return new PlayerBaseInfo(properties);
        };

        /**
         * Encodes the specified PlayerBaseInfo message. Does not implicitly {@link base.PlayerBaseInfo.verify|verify} messages.
         * @function encode
         * @memberof base.PlayerBaseInfo
         * @static
         * @param {base.IPlayerBaseInfo} message PlayerBaseInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBaseInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.playerId);
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nickname);
            if (message.headId != null && Object.hasOwnProperty.call(message, "headId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.headId);
            if (message.headUrl != null && Object.hasOwnProperty.call(message, "headUrl"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.headUrl);
            if (message.tag != null && Object.hasOwnProperty.call(message, "tag"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.tag);
            if (message.avatarFrame != null && Object.hasOwnProperty.call(message, "avatarFrame"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.avatarFrame);
            if (message.cardBack != null && Object.hasOwnProperty.call(message, "cardBack"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.cardBack);
            if (message.vipLevel != null && Object.hasOwnProperty.call(message, "vipLevel"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.vipLevel);
            return writer;
        };

        /**
         * Encodes the specified PlayerBaseInfo message, length delimited. Does not implicitly {@link base.PlayerBaseInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.PlayerBaseInfo
         * @static
         * @param {base.IPlayerBaseInfo} message PlayerBaseInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBaseInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerBaseInfo message from the specified reader or buffer.
         * @function decode
         * @memberof base.PlayerBaseInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.PlayerBaseInfo} PlayerBaseInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBaseInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.PlayerBaseInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.playerId = reader.uint64();
                    break;
                case 2:
                    message.nickname = reader.string();
                    break;
                case 3:
                    message.headId = reader.string();
                    break;
                case 4:
                    message.headUrl = reader.string();
                    break;
                case 5:
                    message.tag = reader.int32();
                    break;
                case 6:
                    message.avatarFrame = reader.int32();
                    break;
                case 7:
                    message.cardBack = reader.int32();
                    break;
                case 8:
                    message.vipLevel = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerBaseInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.PlayerBaseInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.PlayerBaseInfo} PlayerBaseInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBaseInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerBaseInfo message.
         * @function verify
         * @memberof base.PlayerBaseInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerBaseInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.headId != null && message.hasOwnProperty("headId"))
                if (!$util.isString(message.headId))
                    return "headId: string expected";
            if (message.headUrl != null && message.hasOwnProperty("headUrl"))
                if (!$util.isString(message.headUrl))
                    return "headUrl: string expected";
            if (message.tag != null && message.hasOwnProperty("tag"))
                if (!$util.isInteger(message.tag))
                    return "tag: integer expected";
            if (message.avatarFrame != null && message.hasOwnProperty("avatarFrame"))
                if (!$util.isInteger(message.avatarFrame))
                    return "avatarFrame: integer expected";
            if (message.cardBack != null && message.hasOwnProperty("cardBack"))
                if (!$util.isInteger(message.cardBack))
                    return "cardBack: integer expected";
            if (message.vipLevel != null && message.hasOwnProperty("vipLevel"))
                if (!$util.isInteger(message.vipLevel))
                    return "vipLevel: integer expected";
            return null;
        };

        /**
         * Creates a PlayerBaseInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.PlayerBaseInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.PlayerBaseInfo} PlayerBaseInfo
         */
        PlayerBaseInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.base.PlayerBaseInfo)
                return object;
            let message = new $root.base.PlayerBaseInfo();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = true;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber(true);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.headId != null)
                message.headId = String(object.headId);
            if (object.headUrl != null)
                message.headUrl = String(object.headUrl);
            if (object.tag != null)
                message.tag = object.tag | 0;
            if (object.avatarFrame != null)
                message.avatarFrame = object.avatarFrame | 0;
            if (object.cardBack != null)
                message.cardBack = object.cardBack | 0;
            if (object.vipLevel != null)
                message.vipLevel = object.vipLevel | 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerBaseInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.PlayerBaseInfo
         * @static
         * @param {base.PlayerBaseInfo} message PlayerBaseInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerBaseInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
                object.nickname = "";
                object.headId = "";
                object.headUrl = "";
                object.tag = 0;
                object.avatarFrame = 0;
                object.cardBack = 0;
                object.vipLevel = 0;
            }
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber(true) : message.playerId;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.headId != null && message.hasOwnProperty("headId"))
                object.headId = message.headId;
            if (message.headUrl != null && message.hasOwnProperty("headUrl"))
                object.headUrl = message.headUrl;
            if (message.tag != null && message.hasOwnProperty("tag"))
                object.tag = message.tag;
            if (message.avatarFrame != null && message.hasOwnProperty("avatarFrame"))
                object.avatarFrame = message.avatarFrame;
            if (message.cardBack != null && message.hasOwnProperty("cardBack"))
                object.cardBack = message.cardBack;
            if (message.vipLevel != null && message.hasOwnProperty("vipLevel"))
                object.vipLevel = message.vipLevel;
            return object;
        };

        /**
         * Converts this PlayerBaseInfo to JSON.
         * @function toJSON
         * @memberof base.PlayerBaseInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerBaseInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerBaseInfo;
    })();

    /**
     * TAG_TYPE enum.
     * @name base.TAG_TYPE
     * @enum {number}
     * @property {number} TT_NORMAL=0 TT_NORMAL value
     * @property {number} TT_SUPPER_FAKE=1 TT_SUPPER_FAKE value
     * @property {number} TT_CHEAT=2 TT_CHEAT value
     * @property {number} TT_GENERAL_FAKE=3 TT_GENERAL_FAKE value
     * @property {number} TT_GANG=4 TT_GANG value
     * @property {number} TT_WINNER=5 TT_WINNER value
     * @property {number} TT_LOSER=6 TT_LOSER value
     * @property {number} TT_ONLY_NORMAL=7 TT_ONLY_NORMAL value
     * @property {number} TT_ONLY_ROBOT=8 TT_ONLY_ROBOT value
     * @property {number} TT_ONLY_FAKE=9 TT_ONLY_FAKE value
     * @property {number} TT_AB_GAME=10 TT_AB_GAME value
     * @property {number} TT_NO_BC=11 TT_NO_BC value
     * @property {number} TT_CHARGE_RISK=12 TT_CHARGE_RISK value
     * @property {number} TT_BC_FLOW=13 TT_BC_FLOW value
     * @property {number} TT_CARROM_RISK=14 TT_CARROM_RISK value
     * @property {number} TT_ROBOT=99 TT_ROBOT value
     */
    base.TAG_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "TT_NORMAL"] = 0;
        values[valuesById[1] = "TT_SUPPER_FAKE"] = 1;
        values[valuesById[2] = "TT_CHEAT"] = 2;
        values[valuesById[3] = "TT_GENERAL_FAKE"] = 3;
        values[valuesById[4] = "TT_GANG"] = 4;
        values[valuesById[5] = "TT_WINNER"] = 5;
        values[valuesById[6] = "TT_LOSER"] = 6;
        values[valuesById[7] = "TT_ONLY_NORMAL"] = 7;
        values[valuesById[8] = "TT_ONLY_ROBOT"] = 8;
        values[valuesById[9] = "TT_ONLY_FAKE"] = 9;
        values[valuesById[10] = "TT_AB_GAME"] = 10;
        values[valuesById[11] = "TT_NO_BC"] = 11;
        values[valuesById[12] = "TT_CHARGE_RISK"] = 12;
        values[valuesById[13] = "TT_BC_FLOW"] = 13;
        values[valuesById[14] = "TT_CARROM_RISK"] = 14;
        values[valuesById[99] = "TT_ROBOT"] = 99;
        return values;
    })();

    base.BalanceInfo = (function() {

        /**
         * Properties of a BalanceInfo.
         * @memberof base
         * @interface IBalanceInfo
         * @property {number|null} [type] BalanceInfo type
         * @property {number|null} [amount] BalanceInfo amount
         */

        /**
         * Constructs a new BalanceInfo.
         * @memberof base
         * @classdesc Represents a BalanceInfo.
         * @implements IBalanceInfo
         * @constructor
         * @param {base.IBalanceInfo=} [properties] Properties to set
         */
        function BalanceInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BalanceInfo type.
         * @member {number} type
         * @memberof base.BalanceInfo
         * @instance
         */
        BalanceInfo.prototype.type = 0;

        /**
         * BalanceInfo amount.
         * @member {number} amount
         * @memberof base.BalanceInfo
         * @instance
         */
        BalanceInfo.prototype.amount = 0;

        /**
         * Creates a new BalanceInfo instance using the specified properties.
         * @function create
         * @memberof base.BalanceInfo
         * @static
         * @param {base.IBalanceInfo=} [properties] Properties to set
         * @returns {base.BalanceInfo} BalanceInfo instance
         */
        BalanceInfo.create = function create(properties) {
            return new BalanceInfo(properties);
        };

        /**
         * Encodes the specified BalanceInfo message. Does not implicitly {@link base.BalanceInfo.verify|verify} messages.
         * @function encode
         * @memberof base.BalanceInfo
         * @static
         * @param {base.IBalanceInfo} message BalanceInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BalanceInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.amount);
            return writer;
        };

        /**
         * Encodes the specified BalanceInfo message, length delimited. Does not implicitly {@link base.BalanceInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.BalanceInfo
         * @static
         * @param {base.IBalanceInfo} message BalanceInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BalanceInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BalanceInfo message from the specified reader or buffer.
         * @function decode
         * @memberof base.BalanceInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.BalanceInfo} BalanceInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BalanceInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.BalanceInfo();
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
         * Decodes a BalanceInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.BalanceInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.BalanceInfo} BalanceInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BalanceInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BalanceInfo message.
         * @function verify
         * @memberof base.BalanceInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BalanceInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount))
                    return "amount: integer expected";
            return null;
        };

        /**
         * Creates a BalanceInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.BalanceInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.BalanceInfo} BalanceInfo
         */
        BalanceInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.base.BalanceInfo)
                return object;
            let message = new $root.base.BalanceInfo();
            if (object.type != null)
                message.type = object.type | 0;
            if (object.amount != null)
                message.amount = object.amount | 0;
            return message;
        };

        /**
         * Creates a plain object from a BalanceInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.BalanceInfo
         * @static
         * @param {base.BalanceInfo} message BalanceInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BalanceInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = 0;
                object.amount = 0;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = message.amount;
            return object;
        };

        /**
         * Converts this BalanceInfo to JSON.
         * @function toJSON
         * @memberof base.BalanceInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BalanceInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BalanceInfo;
    })();

    base.BalanceClubInfo = (function() {

        /**
         * Properties of a BalanceClubInfo.
         * @memberof base
         * @interface IBalanceClubInfo
         * @property {number|null} [clubId] BalanceClubInfo clubId
         * @property {number|null} [amount] BalanceClubInfo amount
         */

        /**
         * Constructs a new BalanceClubInfo.
         * @memberof base
         * @classdesc Represents a BalanceClubInfo.
         * @implements IBalanceClubInfo
         * @constructor
         * @param {base.IBalanceClubInfo=} [properties] Properties to set
         */
        function BalanceClubInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BalanceClubInfo clubId.
         * @member {number} clubId
         * @memberof base.BalanceClubInfo
         * @instance
         */
        BalanceClubInfo.prototype.clubId = 0;

        /**
         * BalanceClubInfo amount.
         * @member {number} amount
         * @memberof base.BalanceClubInfo
         * @instance
         */
        BalanceClubInfo.prototype.amount = 0;

        /**
         * Creates a new BalanceClubInfo instance using the specified properties.
         * @function create
         * @memberof base.BalanceClubInfo
         * @static
         * @param {base.IBalanceClubInfo=} [properties] Properties to set
         * @returns {base.BalanceClubInfo} BalanceClubInfo instance
         */
        BalanceClubInfo.create = function create(properties) {
            return new BalanceClubInfo(properties);
        };

        /**
         * Encodes the specified BalanceClubInfo message. Does not implicitly {@link base.BalanceClubInfo.verify|verify} messages.
         * @function encode
         * @memberof base.BalanceClubInfo
         * @static
         * @param {base.IBalanceClubInfo} message BalanceClubInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BalanceClubInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.clubId != null && Object.hasOwnProperty.call(message, "clubId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.clubId);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.amount);
            return writer;
        };

        /**
         * Encodes the specified BalanceClubInfo message, length delimited. Does not implicitly {@link base.BalanceClubInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.BalanceClubInfo
         * @static
         * @param {base.IBalanceClubInfo} message BalanceClubInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BalanceClubInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BalanceClubInfo message from the specified reader or buffer.
         * @function decode
         * @memberof base.BalanceClubInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.BalanceClubInfo} BalanceClubInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BalanceClubInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.BalanceClubInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.clubId = reader.int32();
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
         * Decodes a BalanceClubInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.BalanceClubInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.BalanceClubInfo} BalanceClubInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BalanceClubInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BalanceClubInfo message.
         * @function verify
         * @memberof base.BalanceClubInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BalanceClubInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.clubId != null && message.hasOwnProperty("clubId"))
                if (!$util.isInteger(message.clubId))
                    return "clubId: integer expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount))
                    return "amount: integer expected";
            return null;
        };

        /**
         * Creates a BalanceClubInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.BalanceClubInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.BalanceClubInfo} BalanceClubInfo
         */
        BalanceClubInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.base.BalanceClubInfo)
                return object;
            let message = new $root.base.BalanceClubInfo();
            if (object.clubId != null)
                message.clubId = object.clubId | 0;
            if (object.amount != null)
                message.amount = object.amount | 0;
            return message;
        };

        /**
         * Creates a plain object from a BalanceClubInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.BalanceClubInfo
         * @static
         * @param {base.BalanceClubInfo} message BalanceClubInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BalanceClubInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.clubId = 0;
                object.amount = 0;
            }
            if (message.clubId != null && message.hasOwnProperty("clubId"))
                object.clubId = message.clubId;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = message.amount;
            return object;
        };

        /**
         * Converts this BalanceClubInfo to JSON.
         * @function toJSON
         * @memberof base.BalanceClubInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BalanceClubInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BalanceClubInfo;
    })();

    /**
     * MONEY_TYPE enum.
     * @name base.MONEY_TYPE
     * @enum {number}
     * @property {number} MT_NONE=0 MT_NONE value
     * @property {number} MT_RECHARGE=1 MT_RECHARGE value
     * @property {number} MT_WITHDRAW=2 MT_WITHDRAW value
     * @property {number} MT_GIFT=3 MT_GIFT value
     * @property {number} MT_CLUB=4 MT_CLUB value
     * @property {number} MT_BONUS=99 MT_BONUS value
     */
    base.MONEY_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "MT_NONE"] = 0;
        values[valuesById[1] = "MT_RECHARGE"] = 1;
        values[valuesById[2] = "MT_WITHDRAW"] = 2;
        values[valuesById[3] = "MT_GIFT"] = 3;
        values[valuesById[4] = "MT_CLUB"] = 4;
        values[valuesById[99] = "MT_BONUS"] = 99;
        return values;
    })();

    base.BonusInfo = (function() {

        /**
         * Properties of a BonusInfo.
         * @memberof base
         * @interface IBonusInfo
         * @property {number|null} [amount] BonusInfo amount
         * @property {number|null} [expireTime] BonusInfo expireTime
         */

        /**
         * Constructs a new BonusInfo.
         * @memberof base
         * @classdesc Represents a BonusInfo.
         * @implements IBonusInfo
         * @constructor
         * @param {base.IBonusInfo=} [properties] Properties to set
         */
        function BonusInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BonusInfo amount.
         * @member {number} amount
         * @memberof base.BonusInfo
         * @instance
         */
        BonusInfo.prototype.amount = 0;

        /**
         * BonusInfo expireTime.
         * @member {number} expireTime
         * @memberof base.BonusInfo
         * @instance
         */
        BonusInfo.prototype.expireTime = 0;

        /**
         * Creates a new BonusInfo instance using the specified properties.
         * @function create
         * @memberof base.BonusInfo
         * @static
         * @param {base.IBonusInfo=} [properties] Properties to set
         * @returns {base.BonusInfo} BonusInfo instance
         */
        BonusInfo.create = function create(properties) {
            return new BonusInfo(properties);
        };

        /**
         * Encodes the specified BonusInfo message. Does not implicitly {@link base.BonusInfo.verify|verify} messages.
         * @function encode
         * @memberof base.BonusInfo
         * @static
         * @param {base.IBonusInfo} message BonusInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BonusInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.amount);
            if (message.expireTime != null && Object.hasOwnProperty.call(message, "expireTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.expireTime);
            return writer;
        };

        /**
         * Encodes the specified BonusInfo message, length delimited. Does not implicitly {@link base.BonusInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.BonusInfo
         * @static
         * @param {base.IBonusInfo} message BonusInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BonusInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BonusInfo message from the specified reader or buffer.
         * @function decode
         * @memberof base.BonusInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.BonusInfo} BonusInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BonusInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.BonusInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.amount = reader.int32();
                    break;
                case 2:
                    message.expireTime = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BonusInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.BonusInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.BonusInfo} BonusInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BonusInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BonusInfo message.
         * @function verify
         * @memberof base.BonusInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BonusInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount))
                    return "amount: integer expected";
            if (message.expireTime != null && message.hasOwnProperty("expireTime"))
                if (!$util.isInteger(message.expireTime))
                    return "expireTime: integer expected";
            return null;
        };

        /**
         * Creates a BonusInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.BonusInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.BonusInfo} BonusInfo
         */
        BonusInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.base.BonusInfo)
                return object;
            let message = new $root.base.BonusInfo();
            if (object.amount != null)
                message.amount = object.amount | 0;
            if (object.expireTime != null)
                message.expireTime = object.expireTime | 0;
            return message;
        };

        /**
         * Creates a plain object from a BonusInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.BonusInfo
         * @static
         * @param {base.BonusInfo} message BonusInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BonusInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.amount = 0;
                object.expireTime = 0;
            }
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = message.amount;
            if (message.expireTime != null && message.hasOwnProperty("expireTime"))
                object.expireTime = message.expireTime;
            return object;
        };

        /**
         * Converts this BonusInfo to JSON.
         * @function toJSON
         * @memberof base.BonusInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BonusInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BonusInfo;
    })();

    base.BalanceHistory = (function() {

        /**
         * Properties of a BalanceHistory.
         * @memberof base
         * @interface IBalanceHistory
         * @property {Array.<base.IBalanceRecord>|null} [records] BalanceHistory records
         */

        /**
         * Constructs a new BalanceHistory.
         * @memberof base
         * @classdesc Represents a BalanceHistory.
         * @implements IBalanceHistory
         * @constructor
         * @param {base.IBalanceHistory=} [properties] Properties to set
         */
        function BalanceHistory(properties) {
            this.records = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BalanceHistory records.
         * @member {Array.<base.IBalanceRecord>} records
         * @memberof base.BalanceHistory
         * @instance
         */
        BalanceHistory.prototype.records = $util.emptyArray;

        /**
         * Creates a new BalanceHistory instance using the specified properties.
         * @function create
         * @memberof base.BalanceHistory
         * @static
         * @param {base.IBalanceHistory=} [properties] Properties to set
         * @returns {base.BalanceHistory} BalanceHistory instance
         */
        BalanceHistory.create = function create(properties) {
            return new BalanceHistory(properties);
        };

        /**
         * Encodes the specified BalanceHistory message. Does not implicitly {@link base.BalanceHistory.verify|verify} messages.
         * @function encode
         * @memberof base.BalanceHistory
         * @static
         * @param {base.IBalanceHistory} message BalanceHistory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BalanceHistory.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.records != null && message.records.length)
                for (let i = 0; i < message.records.length; ++i)
                    $root.base.BalanceRecord.encode(message.records[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BalanceHistory message, length delimited. Does not implicitly {@link base.BalanceHistory.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.BalanceHistory
         * @static
         * @param {base.IBalanceHistory} message BalanceHistory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BalanceHistory.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BalanceHistory message from the specified reader or buffer.
         * @function decode
         * @memberof base.BalanceHistory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.BalanceHistory} BalanceHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BalanceHistory.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.BalanceHistory();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.records && message.records.length))
                        message.records = [];
                    message.records.push($root.base.BalanceRecord.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BalanceHistory message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.BalanceHistory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.BalanceHistory} BalanceHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BalanceHistory.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BalanceHistory message.
         * @function verify
         * @memberof base.BalanceHistory
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BalanceHistory.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.records != null && message.hasOwnProperty("records")) {
                if (!Array.isArray(message.records))
                    return "records: array expected";
                for (let i = 0; i < message.records.length; ++i) {
                    let error = $root.base.BalanceRecord.verify(message.records[i]);
                    if (error)
                        return "records." + error;
                }
            }
            return null;
        };

        /**
         * Creates a BalanceHistory message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.BalanceHistory
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.BalanceHistory} BalanceHistory
         */
        BalanceHistory.fromObject = function fromObject(object) {
            if (object instanceof $root.base.BalanceHistory)
                return object;
            let message = new $root.base.BalanceHistory();
            if (object.records) {
                if (!Array.isArray(object.records))
                    throw TypeError(".base.BalanceHistory.records: array expected");
                message.records = [];
                for (let i = 0; i < object.records.length; ++i) {
                    if (typeof object.records[i] !== "object")
                        throw TypeError(".base.BalanceHistory.records: object expected");
                    message.records[i] = $root.base.BalanceRecord.fromObject(object.records[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a BalanceHistory message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.BalanceHistory
         * @static
         * @param {base.BalanceHistory} message BalanceHistory
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BalanceHistory.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.records = [];
            if (message.records && message.records.length) {
                object.records = [];
                for (let j = 0; j < message.records.length; ++j)
                    object.records[j] = $root.base.BalanceRecord.toObject(message.records[j], options);
            }
            return object;
        };

        /**
         * Converts this BalanceHistory to JSON.
         * @function toJSON
         * @memberof base.BalanceHistory
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BalanceHistory.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BalanceHistory;
    })();

    base.BalanceRecord = (function() {

        /**
         * Properties of a BalanceRecord.
         * @memberof base
         * @interface IBalanceRecord
         * @property {number|null} [time] BalanceRecord time
         * @property {number|null} [updateType] BalanceRecord updateType
         * @property {number|null} [amount] BalanceRecord amount
         * @property {string|null} [changed] BalanceRecord changed
         */

        /**
         * Constructs a new BalanceRecord.
         * @memberof base
         * @classdesc Represents a BalanceRecord.
         * @implements IBalanceRecord
         * @constructor
         * @param {base.IBalanceRecord=} [properties] Properties to set
         */
        function BalanceRecord(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BalanceRecord time.
         * @member {number} time
         * @memberof base.BalanceRecord
         * @instance
         */
        BalanceRecord.prototype.time = 0;

        /**
         * BalanceRecord updateType.
         * @member {number} updateType
         * @memberof base.BalanceRecord
         * @instance
         */
        BalanceRecord.prototype.updateType = 0;

        /**
         * BalanceRecord amount.
         * @member {number} amount
         * @memberof base.BalanceRecord
         * @instance
         */
        BalanceRecord.prototype.amount = 0;

        /**
         * BalanceRecord changed.
         * @member {string} changed
         * @memberof base.BalanceRecord
         * @instance
         */
        BalanceRecord.prototype.changed = "";

        /**
         * Creates a new BalanceRecord instance using the specified properties.
         * @function create
         * @memberof base.BalanceRecord
         * @static
         * @param {base.IBalanceRecord=} [properties] Properties to set
         * @returns {base.BalanceRecord} BalanceRecord instance
         */
        BalanceRecord.create = function create(properties) {
            return new BalanceRecord(properties);
        };

        /**
         * Encodes the specified BalanceRecord message. Does not implicitly {@link base.BalanceRecord.verify|verify} messages.
         * @function encode
         * @memberof base.BalanceRecord
         * @static
         * @param {base.IBalanceRecord} message BalanceRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BalanceRecord.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.time);
            if (message.updateType != null && Object.hasOwnProperty.call(message, "updateType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.updateType);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.amount);
            if (message.changed != null && Object.hasOwnProperty.call(message, "changed"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.changed);
            return writer;
        };

        /**
         * Encodes the specified BalanceRecord message, length delimited. Does not implicitly {@link base.BalanceRecord.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.BalanceRecord
         * @static
         * @param {base.IBalanceRecord} message BalanceRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BalanceRecord.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BalanceRecord message from the specified reader or buffer.
         * @function decode
         * @memberof base.BalanceRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.BalanceRecord} BalanceRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BalanceRecord.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.BalanceRecord();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.time = reader.int32();
                    break;
                case 2:
                    message.updateType = reader.int32();
                    break;
                case 3:
                    message.amount = reader.int32();
                    break;
                case 4:
                    message.changed = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BalanceRecord message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.BalanceRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.BalanceRecord} BalanceRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BalanceRecord.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BalanceRecord message.
         * @function verify
         * @memberof base.BalanceRecord
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BalanceRecord.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time))
                    return "time: integer expected";
            if (message.updateType != null && message.hasOwnProperty("updateType"))
                if (!$util.isInteger(message.updateType))
                    return "updateType: integer expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount))
                    return "amount: integer expected";
            if (message.changed != null && message.hasOwnProperty("changed"))
                if (!$util.isString(message.changed))
                    return "changed: string expected";
            return null;
        };

        /**
         * Creates a BalanceRecord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.BalanceRecord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.BalanceRecord} BalanceRecord
         */
        BalanceRecord.fromObject = function fromObject(object) {
            if (object instanceof $root.base.BalanceRecord)
                return object;
            let message = new $root.base.BalanceRecord();
            if (object.time != null)
                message.time = object.time | 0;
            if (object.updateType != null)
                message.updateType = object.updateType | 0;
            if (object.amount != null)
                message.amount = object.amount | 0;
            if (object.changed != null)
                message.changed = String(object.changed);
            return message;
        };

        /**
         * Creates a plain object from a BalanceRecord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.BalanceRecord
         * @static
         * @param {base.BalanceRecord} message BalanceRecord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BalanceRecord.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.time = 0;
                object.updateType = 0;
                object.amount = 0;
                object.changed = "";
            }
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = message.time;
            if (message.updateType != null && message.hasOwnProperty("updateType"))
                object.updateType = message.updateType;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = message.amount;
            if (message.changed != null && message.hasOwnProperty("changed"))
                object.changed = message.changed;
            return object;
        };

        /**
         * Converts this BalanceRecord to JSON.
         * @function toJSON
         * @memberof base.BalanceRecord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BalanceRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BalanceRecord;
    })();

    /**
     * BALANCE_UPDATE_TYPE enum.
     * @name base.BALANCE_UPDATE_TYPE
     * @enum {number}
     * @property {number} BU_NONE=0 BU_NONE value
     * @property {number} BU_GAME=1 BU_GAME value
     * @property {number} BU_LOGIN=2 BU_LOGIN value
     * @property {number} BU_FEE_BACK=3 BU_FEE_BACK value
     * @property {number} SOURCE_RECHARGE=11 SOURCE_RECHARGE value
     * @property {number} SOURCE_WITHDRAW=21 SOURCE_WITHDRAW value
     * @property {number} SOURCE_WITHDRAW_FAIL=22 SOURCE_WITHDRAW_FAIL value
     * @property {number} SOURCE_ACTIVITY=36 SOURCE_ACTIVITY value
     * @property {number} SOURCE_MAIL=51 SOURCE_MAIL value
     * @property {number} SOURCE_ADMIN=41 SOURCE_ADMIN value
     * @property {number} SOURCE_RECHARGE_GIVE=31 SOURCE_RECHARGE_GIVE value
     * @property {number} SOURCE_GIFT=32 SOURCE_GIFT value
     * @property {number} SOURCE_FREE_LUCK=33 SOURCE_FREE_LUCK value
     * @property {number} SOURCE_PAY_LUCK=34 SOURCE_PAY_LUCK value
     * @property {number} SOURCE_PAY_LUCK_PAY=35 SOURCE_PAY_LUCK_PAY value
     * @property {number} SOURCE_CASH_BACK=61 SOURCE_CASH_BACK value
     * @property {number} SOURCE_BONUS=62 SOURCE_BONUS value
     * @property {number} SOURCE_TRANSFER=63 SOURCE_TRANSFER value
     * @property {number} SOURCE_SEND_MAIL=64 SOURCE_SEND_MAIL value
     * @property {number} SOURCE_SIGN=71 SOURCE_SIGN value
     * @property {number} SOURCE_VIP_UP=72 SOURCE_VIP_UP value
     * @property {number} SOURCE_LUCKY_SHOT=1000 SOURCE_LUCKY_SHOT value
     * @property {number} SOURCE_PRIVATE_TABLE_CREATE=1001 SOURCE_PRIVATE_TABLE_CREATE value
     */
    base.BALANCE_UPDATE_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "BU_NONE"] = 0;
        values[valuesById[1] = "BU_GAME"] = 1;
        values[valuesById[2] = "BU_LOGIN"] = 2;
        values[valuesById[3] = "BU_FEE_BACK"] = 3;
        values[valuesById[11] = "SOURCE_RECHARGE"] = 11;
        values[valuesById[21] = "SOURCE_WITHDRAW"] = 21;
        values[valuesById[22] = "SOURCE_WITHDRAW_FAIL"] = 22;
        values[valuesById[36] = "SOURCE_ACTIVITY"] = 36;
        values[valuesById[51] = "SOURCE_MAIL"] = 51;
        values[valuesById[41] = "SOURCE_ADMIN"] = 41;
        values[valuesById[31] = "SOURCE_RECHARGE_GIVE"] = 31;
        values[valuesById[32] = "SOURCE_GIFT"] = 32;
        values[valuesById[33] = "SOURCE_FREE_LUCK"] = 33;
        values[valuesById[34] = "SOURCE_PAY_LUCK"] = 34;
        values[valuesById[35] = "SOURCE_PAY_LUCK_PAY"] = 35;
        values[valuesById[61] = "SOURCE_CASH_BACK"] = 61;
        values[valuesById[62] = "SOURCE_BONUS"] = 62;
        values[valuesById[63] = "SOURCE_TRANSFER"] = 63;
        values[valuesById[64] = "SOURCE_SEND_MAIL"] = 64;
        values[valuesById[71] = "SOURCE_SIGN"] = 71;
        values[valuesById[72] = "SOURCE_VIP_UP"] = 72;
        values[valuesById[1000] = "SOURCE_LUCKY_SHOT"] = 1000;
        values[valuesById[1001] = "SOURCE_PRIVATE_TABLE_CREATE"] = 1001;
        return values;
    })();

    base.BonusHistory = (function() {

        /**
         * Properties of a BonusHistory.
         * @memberof base
         * @interface IBonusHistory
         * @property {Array.<base.IBonusDetail>|null} [bonuses] BonusHistory bonuses
         */

        /**
         * Constructs a new BonusHistory.
         * @memberof base
         * @classdesc Represents a BonusHistory.
         * @implements IBonusHistory
         * @constructor
         * @param {base.IBonusHistory=} [properties] Properties to set
         */
        function BonusHistory(properties) {
            this.bonuses = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BonusHistory bonuses.
         * @member {Array.<base.IBonusDetail>} bonuses
         * @memberof base.BonusHistory
         * @instance
         */
        BonusHistory.prototype.bonuses = $util.emptyArray;

        /**
         * Creates a new BonusHistory instance using the specified properties.
         * @function create
         * @memberof base.BonusHistory
         * @static
         * @param {base.IBonusHistory=} [properties] Properties to set
         * @returns {base.BonusHistory} BonusHistory instance
         */
        BonusHistory.create = function create(properties) {
            return new BonusHistory(properties);
        };

        /**
         * Encodes the specified BonusHistory message. Does not implicitly {@link base.BonusHistory.verify|verify} messages.
         * @function encode
         * @memberof base.BonusHistory
         * @static
         * @param {base.IBonusHistory} message BonusHistory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BonusHistory.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.bonuses != null && message.bonuses.length)
                for (let i = 0; i < message.bonuses.length; ++i)
                    $root.base.BonusDetail.encode(message.bonuses[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BonusHistory message, length delimited. Does not implicitly {@link base.BonusHistory.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.BonusHistory
         * @static
         * @param {base.IBonusHistory} message BonusHistory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BonusHistory.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BonusHistory message from the specified reader or buffer.
         * @function decode
         * @memberof base.BonusHistory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.BonusHistory} BonusHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BonusHistory.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.BonusHistory();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.bonuses && message.bonuses.length))
                        message.bonuses = [];
                    message.bonuses.push($root.base.BonusDetail.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BonusHistory message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.BonusHistory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.BonusHistory} BonusHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BonusHistory.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BonusHistory message.
         * @function verify
         * @memberof base.BonusHistory
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BonusHistory.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.bonuses != null && message.hasOwnProperty("bonuses")) {
                if (!Array.isArray(message.bonuses))
                    return "bonuses: array expected";
                for (let i = 0; i < message.bonuses.length; ++i) {
                    let error = $root.base.BonusDetail.verify(message.bonuses[i]);
                    if (error)
                        return "bonuses." + error;
                }
            }
            return null;
        };

        /**
         * Creates a BonusHistory message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.BonusHistory
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.BonusHistory} BonusHistory
         */
        BonusHistory.fromObject = function fromObject(object) {
            if (object instanceof $root.base.BonusHistory)
                return object;
            let message = new $root.base.BonusHistory();
            if (object.bonuses) {
                if (!Array.isArray(object.bonuses))
                    throw TypeError(".base.BonusHistory.bonuses: array expected");
                message.bonuses = [];
                for (let i = 0; i < object.bonuses.length; ++i) {
                    if (typeof object.bonuses[i] !== "object")
                        throw TypeError(".base.BonusHistory.bonuses: object expected");
                    message.bonuses[i] = $root.base.BonusDetail.fromObject(object.bonuses[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a BonusHistory message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.BonusHistory
         * @static
         * @param {base.BonusHistory} message BonusHistory
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BonusHistory.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.bonuses = [];
            if (message.bonuses && message.bonuses.length) {
                object.bonuses = [];
                for (let j = 0; j < message.bonuses.length; ++j)
                    object.bonuses[j] = $root.base.BonusDetail.toObject(message.bonuses[j], options);
            }
            return object;
        };

        /**
         * Converts this BonusHistory to JSON.
         * @function toJSON
         * @memberof base.BonusHistory
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BonusHistory.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BonusHistory;
    })();

    base.BonusDetail = (function() {

        /**
         * Properties of a BonusDetail.
         * @memberof base
         * @interface IBonusDetail
         * @property {number|null} [createTime] BonusDetail createTime
         * @property {number|null} [total] BonusDetail total
         * @property {number|null} [balance] BonusDetail balance
         * @property {number|null} [expireTime] BonusDetail expireTime
         */

        /**
         * Constructs a new BonusDetail.
         * @memberof base
         * @classdesc Represents a BonusDetail.
         * @implements IBonusDetail
         * @constructor
         * @param {base.IBonusDetail=} [properties] Properties to set
         */
        function BonusDetail(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BonusDetail createTime.
         * @member {number} createTime
         * @memberof base.BonusDetail
         * @instance
         */
        BonusDetail.prototype.createTime = 0;

        /**
         * BonusDetail total.
         * @member {number} total
         * @memberof base.BonusDetail
         * @instance
         */
        BonusDetail.prototype.total = 0;

        /**
         * BonusDetail balance.
         * @member {number} balance
         * @memberof base.BonusDetail
         * @instance
         */
        BonusDetail.prototype.balance = 0;

        /**
         * BonusDetail expireTime.
         * @member {number} expireTime
         * @memberof base.BonusDetail
         * @instance
         */
        BonusDetail.prototype.expireTime = 0;

        /**
         * Creates a new BonusDetail instance using the specified properties.
         * @function create
         * @memberof base.BonusDetail
         * @static
         * @param {base.IBonusDetail=} [properties] Properties to set
         * @returns {base.BonusDetail} BonusDetail instance
         */
        BonusDetail.create = function create(properties) {
            return new BonusDetail(properties);
        };

        /**
         * Encodes the specified BonusDetail message. Does not implicitly {@link base.BonusDetail.verify|verify} messages.
         * @function encode
         * @memberof base.BonusDetail
         * @static
         * @param {base.IBonusDetail} message BonusDetail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BonusDetail.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.createTime != null && Object.hasOwnProperty.call(message, "createTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.createTime);
            if (message.total != null && Object.hasOwnProperty.call(message, "total"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.total);
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.balance);
            if (message.expireTime != null && Object.hasOwnProperty.call(message, "expireTime"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.expireTime);
            return writer;
        };

        /**
         * Encodes the specified BonusDetail message, length delimited. Does not implicitly {@link base.BonusDetail.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.BonusDetail
         * @static
         * @param {base.IBonusDetail} message BonusDetail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BonusDetail.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BonusDetail message from the specified reader or buffer.
         * @function decode
         * @memberof base.BonusDetail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.BonusDetail} BonusDetail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BonusDetail.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.BonusDetail();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.createTime = reader.int32();
                    break;
                case 2:
                    message.total = reader.int32();
                    break;
                case 3:
                    message.balance = reader.int32();
                    break;
                case 4:
                    message.expireTime = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BonusDetail message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.BonusDetail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.BonusDetail} BonusDetail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BonusDetail.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BonusDetail message.
         * @function verify
         * @memberof base.BonusDetail
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BonusDetail.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                if (!$util.isInteger(message.createTime))
                    return "createTime: integer expected";
            if (message.total != null && message.hasOwnProperty("total"))
                if (!$util.isInteger(message.total))
                    return "total: integer expected";
            if (message.balance != null && message.hasOwnProperty("balance"))
                if (!$util.isInteger(message.balance))
                    return "balance: integer expected";
            if (message.expireTime != null && message.hasOwnProperty("expireTime"))
                if (!$util.isInteger(message.expireTime))
                    return "expireTime: integer expected";
            return null;
        };

        /**
         * Creates a BonusDetail message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.BonusDetail
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.BonusDetail} BonusDetail
         */
        BonusDetail.fromObject = function fromObject(object) {
            if (object instanceof $root.base.BonusDetail)
                return object;
            let message = new $root.base.BonusDetail();
            if (object.createTime != null)
                message.createTime = object.createTime | 0;
            if (object.total != null)
                message.total = object.total | 0;
            if (object.balance != null)
                message.balance = object.balance | 0;
            if (object.expireTime != null)
                message.expireTime = object.expireTime | 0;
            return message;
        };

        /**
         * Creates a plain object from a BonusDetail message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.BonusDetail
         * @static
         * @param {base.BonusDetail} message BonusDetail
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BonusDetail.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.createTime = 0;
                object.total = 0;
                object.balance = 0;
                object.expireTime = 0;
            }
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                object.createTime = message.createTime;
            if (message.total != null && message.hasOwnProperty("total"))
                object.total = message.total;
            if (message.balance != null && message.hasOwnProperty("balance"))
                object.balance = message.balance;
            if (message.expireTime != null && message.hasOwnProperty("expireTime"))
                object.expireTime = message.expireTime;
            return object;
        };

        /**
         * Converts this BonusDetail to JSON.
         * @function toJSON
         * @memberof base.BonusDetail
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BonusDetail.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BonusDetail;
    })();

    base.PlayerInfoChange = (function() {

        /**
         * Properties of a PlayerInfoChange.
         * @memberof base
         * @interface IPlayerInfoChange
         * @property {number|null} [vipLevel] PlayerInfoChange vipLevel
         * @property {number|null} [vipLevelBefore] PlayerInfoChange vipLevelBefore
         * @property {string|null} [headId] PlayerInfoChange headId
         * @property {string|null} [headUrl] PlayerInfoChange headUrl
         * @property {number|null} [tag] PlayerInfoChange tag
         * @property {number|null} [avatarFrame] PlayerInfoChange avatarFrame
         * @property {number|null} [cardBack] PlayerInfoChange cardBack
         */

        /**
         * Constructs a new PlayerInfoChange.
         * @memberof base
         * @classdesc Represents a PlayerInfoChange.
         * @implements IPlayerInfoChange
         * @constructor
         * @param {base.IPlayerInfoChange=} [properties] Properties to set
         */
        function PlayerInfoChange(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerInfoChange vipLevel.
         * @member {number} vipLevel
         * @memberof base.PlayerInfoChange
         * @instance
         */
        PlayerInfoChange.prototype.vipLevel = 0;

        /**
         * PlayerInfoChange vipLevelBefore.
         * @member {number} vipLevelBefore
         * @memberof base.PlayerInfoChange
         * @instance
         */
        PlayerInfoChange.prototype.vipLevelBefore = 0;

        /**
         * PlayerInfoChange headId.
         * @member {string} headId
         * @memberof base.PlayerInfoChange
         * @instance
         */
        PlayerInfoChange.prototype.headId = "";

        /**
         * PlayerInfoChange headUrl.
         * @member {string} headUrl
         * @memberof base.PlayerInfoChange
         * @instance
         */
        PlayerInfoChange.prototype.headUrl = "";

        /**
         * PlayerInfoChange tag.
         * @member {number} tag
         * @memberof base.PlayerInfoChange
         * @instance
         */
        PlayerInfoChange.prototype.tag = 0;

        /**
         * PlayerInfoChange avatarFrame.
         * @member {number} avatarFrame
         * @memberof base.PlayerInfoChange
         * @instance
         */
        PlayerInfoChange.prototype.avatarFrame = 0;

        /**
         * PlayerInfoChange cardBack.
         * @member {number} cardBack
         * @memberof base.PlayerInfoChange
         * @instance
         */
        PlayerInfoChange.prototype.cardBack = 0;

        /**
         * Creates a new PlayerInfoChange instance using the specified properties.
         * @function create
         * @memberof base.PlayerInfoChange
         * @static
         * @param {base.IPlayerInfoChange=} [properties] Properties to set
         * @returns {base.PlayerInfoChange} PlayerInfoChange instance
         */
        PlayerInfoChange.create = function create(properties) {
            return new PlayerInfoChange(properties);
        };

        /**
         * Encodes the specified PlayerInfoChange message. Does not implicitly {@link base.PlayerInfoChange.verify|verify} messages.
         * @function encode
         * @memberof base.PlayerInfoChange
         * @static
         * @param {base.IPlayerInfoChange} message PlayerInfoChange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfoChange.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.vipLevel != null && Object.hasOwnProperty.call(message, "vipLevel"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.vipLevel);
            if (message.vipLevelBefore != null && Object.hasOwnProperty.call(message, "vipLevelBefore"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.vipLevelBefore);
            if (message.headId != null && Object.hasOwnProperty.call(message, "headId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.headId);
            if (message.headUrl != null && Object.hasOwnProperty.call(message, "headUrl"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.headUrl);
            if (message.tag != null && Object.hasOwnProperty.call(message, "tag"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.tag);
            if (message.avatarFrame != null && Object.hasOwnProperty.call(message, "avatarFrame"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.avatarFrame);
            if (message.cardBack != null && Object.hasOwnProperty.call(message, "cardBack"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.cardBack);
            return writer;
        };

        /**
         * Encodes the specified PlayerInfoChange message, length delimited. Does not implicitly {@link base.PlayerInfoChange.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.PlayerInfoChange
         * @static
         * @param {base.IPlayerInfoChange} message PlayerInfoChange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfoChange.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerInfoChange message from the specified reader or buffer.
         * @function decode
         * @memberof base.PlayerInfoChange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.PlayerInfoChange} PlayerInfoChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfoChange.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.PlayerInfoChange();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.vipLevel = reader.int32();
                    break;
                case 2:
                    message.vipLevelBefore = reader.int32();
                    break;
                case 3:
                    message.headId = reader.string();
                    break;
                case 4:
                    message.headUrl = reader.string();
                    break;
                case 5:
                    message.tag = reader.int32();
                    break;
                case 6:
                    message.avatarFrame = reader.int32();
                    break;
                case 7:
                    message.cardBack = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerInfoChange message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.PlayerInfoChange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.PlayerInfoChange} PlayerInfoChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfoChange.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerInfoChange message.
         * @function verify
         * @memberof base.PlayerInfoChange
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerInfoChange.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.vipLevel != null && message.hasOwnProperty("vipLevel"))
                if (!$util.isInteger(message.vipLevel))
                    return "vipLevel: integer expected";
            if (message.vipLevelBefore != null && message.hasOwnProperty("vipLevelBefore"))
                if (!$util.isInteger(message.vipLevelBefore))
                    return "vipLevelBefore: integer expected";
            if (message.headId != null && message.hasOwnProperty("headId"))
                if (!$util.isString(message.headId))
                    return "headId: string expected";
            if (message.headUrl != null && message.hasOwnProperty("headUrl"))
                if (!$util.isString(message.headUrl))
                    return "headUrl: string expected";
            if (message.tag != null && message.hasOwnProperty("tag"))
                if (!$util.isInteger(message.tag))
                    return "tag: integer expected";
            if (message.avatarFrame != null && message.hasOwnProperty("avatarFrame"))
                if (!$util.isInteger(message.avatarFrame))
                    return "avatarFrame: integer expected";
            if (message.cardBack != null && message.hasOwnProperty("cardBack"))
                if (!$util.isInteger(message.cardBack))
                    return "cardBack: integer expected";
            return null;
        };

        /**
         * Creates a PlayerInfoChange message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.PlayerInfoChange
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.PlayerInfoChange} PlayerInfoChange
         */
        PlayerInfoChange.fromObject = function fromObject(object) {
            if (object instanceof $root.base.PlayerInfoChange)
                return object;
            let message = new $root.base.PlayerInfoChange();
            if (object.vipLevel != null)
                message.vipLevel = object.vipLevel | 0;
            if (object.vipLevelBefore != null)
                message.vipLevelBefore = object.vipLevelBefore | 0;
            if (object.headId != null)
                message.headId = String(object.headId);
            if (object.headUrl != null)
                message.headUrl = String(object.headUrl);
            if (object.tag != null)
                message.tag = object.tag | 0;
            if (object.avatarFrame != null)
                message.avatarFrame = object.avatarFrame | 0;
            if (object.cardBack != null)
                message.cardBack = object.cardBack | 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerInfoChange message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.PlayerInfoChange
         * @static
         * @param {base.PlayerInfoChange} message PlayerInfoChange
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerInfoChange.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.vipLevel = 0;
                object.vipLevelBefore = 0;
                object.headId = "";
                object.headUrl = "";
                object.tag = 0;
                object.avatarFrame = 0;
                object.cardBack = 0;
            }
            if (message.vipLevel != null && message.hasOwnProperty("vipLevel"))
                object.vipLevel = message.vipLevel;
            if (message.vipLevelBefore != null && message.hasOwnProperty("vipLevelBefore"))
                object.vipLevelBefore = message.vipLevelBefore;
            if (message.headId != null && message.hasOwnProperty("headId"))
                object.headId = message.headId;
            if (message.headUrl != null && message.hasOwnProperty("headUrl"))
                object.headUrl = message.headUrl;
            if (message.tag != null && message.hasOwnProperty("tag"))
                object.tag = message.tag;
            if (message.avatarFrame != null && message.hasOwnProperty("avatarFrame"))
                object.avatarFrame = message.avatarFrame;
            if (message.cardBack != null && message.hasOwnProperty("cardBack"))
                object.cardBack = message.cardBack;
            return object;
        };

        /**
         * Converts this PlayerInfoChange to JSON.
         * @function toJSON
         * @memberof base.PlayerInfoChange
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerInfoChange.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerInfoChange;
    })();

    base.PlayerGameDataReq = (function() {

        /**
         * Properties of a PlayerGameDataReq.
         * @memberof base
         * @interface IPlayerGameDataReq
         * @property {Array.<number>|null} [gameIds] PlayerGameDataReq gameIds
         */

        /**
         * Constructs a new PlayerGameDataReq.
         * @memberof base
         * @classdesc Represents a PlayerGameDataReq.
         * @implements IPlayerGameDataReq
         * @constructor
         * @param {base.IPlayerGameDataReq=} [properties] Properties to set
         */
        function PlayerGameDataReq(properties) {
            this.gameIds = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerGameDataReq gameIds.
         * @member {Array.<number>} gameIds
         * @memberof base.PlayerGameDataReq
         * @instance
         */
        PlayerGameDataReq.prototype.gameIds = $util.emptyArray;

        /**
         * Creates a new PlayerGameDataReq instance using the specified properties.
         * @function create
         * @memberof base.PlayerGameDataReq
         * @static
         * @param {base.IPlayerGameDataReq=} [properties] Properties to set
         * @returns {base.PlayerGameDataReq} PlayerGameDataReq instance
         */
        PlayerGameDataReq.create = function create(properties) {
            return new PlayerGameDataReq(properties);
        };

        /**
         * Encodes the specified PlayerGameDataReq message. Does not implicitly {@link base.PlayerGameDataReq.verify|verify} messages.
         * @function encode
         * @memberof base.PlayerGameDataReq
         * @static
         * @param {base.IPlayerGameDataReq} message PlayerGameDataReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerGameDataReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameIds != null && message.gameIds.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.gameIds.length; ++i)
                    writer.int32(message.gameIds[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified PlayerGameDataReq message, length delimited. Does not implicitly {@link base.PlayerGameDataReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.PlayerGameDataReq
         * @static
         * @param {base.IPlayerGameDataReq} message PlayerGameDataReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerGameDataReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerGameDataReq message from the specified reader or buffer.
         * @function decode
         * @memberof base.PlayerGameDataReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.PlayerGameDataReq} PlayerGameDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerGameDataReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.PlayerGameDataReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.gameIds && message.gameIds.length))
                        message.gameIds = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.gameIds.push(reader.int32());
                    } else
                        message.gameIds.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerGameDataReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.PlayerGameDataReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.PlayerGameDataReq} PlayerGameDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerGameDataReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerGameDataReq message.
         * @function verify
         * @memberof base.PlayerGameDataReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerGameDataReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameIds != null && message.hasOwnProperty("gameIds")) {
                if (!Array.isArray(message.gameIds))
                    return "gameIds: array expected";
                for (let i = 0; i < message.gameIds.length; ++i)
                    if (!$util.isInteger(message.gameIds[i]))
                        return "gameIds: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a PlayerGameDataReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.PlayerGameDataReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.PlayerGameDataReq} PlayerGameDataReq
         */
        PlayerGameDataReq.fromObject = function fromObject(object) {
            if (object instanceof $root.base.PlayerGameDataReq)
                return object;
            let message = new $root.base.PlayerGameDataReq();
            if (object.gameIds) {
                if (!Array.isArray(object.gameIds))
                    throw TypeError(".base.PlayerGameDataReq.gameIds: array expected");
                message.gameIds = [];
                for (let i = 0; i < object.gameIds.length; ++i)
                    message.gameIds[i] = object.gameIds[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerGameDataReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.PlayerGameDataReq
         * @static
         * @param {base.PlayerGameDataReq} message PlayerGameDataReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerGameDataReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.gameIds = [];
            if (message.gameIds && message.gameIds.length) {
                object.gameIds = [];
                for (let j = 0; j < message.gameIds.length; ++j)
                    object.gameIds[j] = message.gameIds[j];
            }
            return object;
        };

        /**
         * Converts this PlayerGameDataReq to JSON.
         * @function toJSON
         * @memberof base.PlayerGameDataReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerGameDataReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerGameDataReq;
    })();

    base.PlayerGameDataReply = (function() {

        /**
         * Properties of a PlayerGameDataReply.
         * @memberof base
         * @interface IPlayerGameDataReply
         * @property {Array.<base.IGameDataDetail>|null} [gameData] PlayerGameDataReply gameData
         */

        /**
         * Constructs a new PlayerGameDataReply.
         * @memberof base
         * @classdesc Represents a PlayerGameDataReply.
         * @implements IPlayerGameDataReply
         * @constructor
         * @param {base.IPlayerGameDataReply=} [properties] Properties to set
         */
        function PlayerGameDataReply(properties) {
            this.gameData = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerGameDataReply gameData.
         * @member {Array.<base.IGameDataDetail>} gameData
         * @memberof base.PlayerGameDataReply
         * @instance
         */
        PlayerGameDataReply.prototype.gameData = $util.emptyArray;

        /**
         * Creates a new PlayerGameDataReply instance using the specified properties.
         * @function create
         * @memberof base.PlayerGameDataReply
         * @static
         * @param {base.IPlayerGameDataReply=} [properties] Properties to set
         * @returns {base.PlayerGameDataReply} PlayerGameDataReply instance
         */
        PlayerGameDataReply.create = function create(properties) {
            return new PlayerGameDataReply(properties);
        };

        /**
         * Encodes the specified PlayerGameDataReply message. Does not implicitly {@link base.PlayerGameDataReply.verify|verify} messages.
         * @function encode
         * @memberof base.PlayerGameDataReply
         * @static
         * @param {base.IPlayerGameDataReply} message PlayerGameDataReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerGameDataReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameData != null && message.gameData.length)
                for (let i = 0; i < message.gameData.length; ++i)
                    $root.base.GameDataDetail.encode(message.gameData[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PlayerGameDataReply message, length delimited. Does not implicitly {@link base.PlayerGameDataReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.PlayerGameDataReply
         * @static
         * @param {base.IPlayerGameDataReply} message PlayerGameDataReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerGameDataReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerGameDataReply message from the specified reader or buffer.
         * @function decode
         * @memberof base.PlayerGameDataReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.PlayerGameDataReply} PlayerGameDataReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerGameDataReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.PlayerGameDataReply();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.gameData && message.gameData.length))
                        message.gameData = [];
                    message.gameData.push($root.base.GameDataDetail.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerGameDataReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.PlayerGameDataReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.PlayerGameDataReply} PlayerGameDataReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerGameDataReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerGameDataReply message.
         * @function verify
         * @memberof base.PlayerGameDataReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerGameDataReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameData != null && message.hasOwnProperty("gameData")) {
                if (!Array.isArray(message.gameData))
                    return "gameData: array expected";
                for (let i = 0; i < message.gameData.length; ++i) {
                    let error = $root.base.GameDataDetail.verify(message.gameData[i]);
                    if (error)
                        return "gameData." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PlayerGameDataReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.PlayerGameDataReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.PlayerGameDataReply} PlayerGameDataReply
         */
        PlayerGameDataReply.fromObject = function fromObject(object) {
            if (object instanceof $root.base.PlayerGameDataReply)
                return object;
            let message = new $root.base.PlayerGameDataReply();
            if (object.gameData) {
                if (!Array.isArray(object.gameData))
                    throw TypeError(".base.PlayerGameDataReply.gameData: array expected");
                message.gameData = [];
                for (let i = 0; i < object.gameData.length; ++i) {
                    if (typeof object.gameData[i] !== "object")
                        throw TypeError(".base.PlayerGameDataReply.gameData: object expected");
                    message.gameData[i] = $root.base.GameDataDetail.fromObject(object.gameData[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerGameDataReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.PlayerGameDataReply
         * @static
         * @param {base.PlayerGameDataReply} message PlayerGameDataReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerGameDataReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.gameData = [];
            if (message.gameData && message.gameData.length) {
                object.gameData = [];
                for (let j = 0; j < message.gameData.length; ++j)
                    object.gameData[j] = $root.base.GameDataDetail.toObject(message.gameData[j], options);
            }
            return object;
        };

        /**
         * Converts this PlayerGameDataReply to JSON.
         * @function toJSON
         * @memberof base.PlayerGameDataReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerGameDataReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerGameDataReply;
    })();

    base.GameDataDetail = (function() {

        /**
         * Properties of a GameDataDetail.
         * @memberof base
         * @interface IGameDataDetail
         * @property {number|null} [gameId] GameDataDetail gameId
         * @property {string|null} [data] GameDataDetail data
         */

        /**
         * Constructs a new GameDataDetail.
         * @memberof base
         * @classdesc Represents a GameDataDetail.
         * @implements IGameDataDetail
         * @constructor
         * @param {base.IGameDataDetail=} [properties] Properties to set
         */
        function GameDataDetail(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameDataDetail gameId.
         * @member {number} gameId
         * @memberof base.GameDataDetail
         * @instance
         */
        GameDataDetail.prototype.gameId = 0;

        /**
         * GameDataDetail data.
         * @member {string} data
         * @memberof base.GameDataDetail
         * @instance
         */
        GameDataDetail.prototype.data = "";

        /**
         * Creates a new GameDataDetail instance using the specified properties.
         * @function create
         * @memberof base.GameDataDetail
         * @static
         * @param {base.IGameDataDetail=} [properties] Properties to set
         * @returns {base.GameDataDetail} GameDataDetail instance
         */
        GameDataDetail.create = function create(properties) {
            return new GameDataDetail(properties);
        };

        /**
         * Encodes the specified GameDataDetail message. Does not implicitly {@link base.GameDataDetail.verify|verify} messages.
         * @function encode
         * @memberof base.GameDataDetail
         * @static
         * @param {base.IGameDataDetail} message GameDataDetail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameDataDetail.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
            return writer;
        };

        /**
         * Encodes the specified GameDataDetail message, length delimited. Does not implicitly {@link base.GameDataDetail.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.GameDataDetail
         * @static
         * @param {base.IGameDataDetail} message GameDataDetail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameDataDetail.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameDataDetail message from the specified reader or buffer.
         * @function decode
         * @memberof base.GameDataDetail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.GameDataDetail} GameDataDetail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameDataDetail.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.GameDataDetail();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameId = reader.int32();
                    break;
                case 2:
                    message.data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameDataDetail message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.GameDataDetail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.GameDataDetail} GameDataDetail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameDataDetail.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameDataDetail message.
         * @function verify
         * @memberof base.GameDataDetail
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameDataDetail.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!$util.isString(message.data))
                    return "data: string expected";
            return null;
        };

        /**
         * Creates a GameDataDetail message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.GameDataDetail
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.GameDataDetail} GameDataDetail
         */
        GameDataDetail.fromObject = function fromObject(object) {
            if (object instanceof $root.base.GameDataDetail)
                return object;
            let message = new $root.base.GameDataDetail();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.data != null)
                message.data = String(object.data);
            return message;
        };

        /**
         * Creates a plain object from a GameDataDetail message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.GameDataDetail
         * @static
         * @param {base.GameDataDetail} message GameDataDetail
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameDataDetail.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.gameId = 0;
                object.data = "";
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = message.data;
            return object;
        };

        /**
         * Converts this GameDataDetail to JSON.
         * @function toJSON
         * @memberof base.GameDataDetail
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameDataDetail.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameDataDetail;
    })();

    base.RoomListReq = (function() {

        /**
         * Properties of a RoomListReq.
         * @memberof base
         * @interface IRoomListReq
         * @property {number|null} [gameId] RoomListReq gameId
         */

        /**
         * Constructs a new RoomListReq.
         * @memberof base
         * @classdesc Represents a RoomListReq.
         * @implements IRoomListReq
         * @constructor
         * @param {base.IRoomListReq=} [properties] Properties to set
         */
        function RoomListReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomListReq gameId.
         * @member {number} gameId
         * @memberof base.RoomListReq
         * @instance
         */
        RoomListReq.prototype.gameId = 0;

        /**
         * Creates a new RoomListReq instance using the specified properties.
         * @function create
         * @memberof base.RoomListReq
         * @static
         * @param {base.IRoomListReq=} [properties] Properties to set
         * @returns {base.RoomListReq} RoomListReq instance
         */
        RoomListReq.create = function create(properties) {
            return new RoomListReq(properties);
        };

        /**
         * Encodes the specified RoomListReq message. Does not implicitly {@link base.RoomListReq.verify|verify} messages.
         * @function encode
         * @memberof base.RoomListReq
         * @static
         * @param {base.IRoomListReq} message RoomListReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomListReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            return writer;
        };

        /**
         * Encodes the specified RoomListReq message, length delimited. Does not implicitly {@link base.RoomListReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.RoomListReq
         * @static
         * @param {base.IRoomListReq} message RoomListReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomListReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomListReq message from the specified reader or buffer.
         * @function decode
         * @memberof base.RoomListReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.RoomListReq} RoomListReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomListReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.RoomListReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomListReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.RoomListReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.RoomListReq} RoomListReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomListReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomListReq message.
         * @function verify
         * @memberof base.RoomListReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomListReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            return null;
        };

        /**
         * Creates a RoomListReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.RoomListReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.RoomListReq} RoomListReq
         */
        RoomListReq.fromObject = function fromObject(object) {
            if (object instanceof $root.base.RoomListReq)
                return object;
            let message = new $root.base.RoomListReq();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            return message;
        };

        /**
         * Creates a plain object from a RoomListReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.RoomListReq
         * @static
         * @param {base.RoomListReq} message RoomListReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomListReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.gameId = 0;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            return object;
        };

        /**
         * Converts this RoomListReq to JSON.
         * @function toJSON
         * @memberof base.RoomListReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomListReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoomListReq;
    })();

    base.RoomListReply = (function() {

        /**
         * Properties of a RoomListReply.
         * @memberof base
         * @interface IRoomListReply
         * @property {number|null} [gameId] RoomListReply gameId
         * @property {Array.<base.IRoomInfo>|null} [roomInfos] RoomListReply roomInfos
         */

        /**
         * Constructs a new RoomListReply.
         * @memberof base
         * @classdesc Represents a RoomListReply.
         * @implements IRoomListReply
         * @constructor
         * @param {base.IRoomListReply=} [properties] Properties to set
         */
        function RoomListReply(properties) {
            this.roomInfos = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomListReply gameId.
         * @member {number} gameId
         * @memberof base.RoomListReply
         * @instance
         */
        RoomListReply.prototype.gameId = 0;

        /**
         * RoomListReply roomInfos.
         * @member {Array.<base.IRoomInfo>} roomInfos
         * @memberof base.RoomListReply
         * @instance
         */
        RoomListReply.prototype.roomInfos = $util.emptyArray;

        /**
         * Creates a new RoomListReply instance using the specified properties.
         * @function create
         * @memberof base.RoomListReply
         * @static
         * @param {base.IRoomListReply=} [properties] Properties to set
         * @returns {base.RoomListReply} RoomListReply instance
         */
        RoomListReply.create = function create(properties) {
            return new RoomListReply(properties);
        };

        /**
         * Encodes the specified RoomListReply message. Does not implicitly {@link base.RoomListReply.verify|verify} messages.
         * @function encode
         * @memberof base.RoomListReply
         * @static
         * @param {base.IRoomListReply} message RoomListReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomListReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.roomInfos != null && message.roomInfos.length)
                for (let i = 0; i < message.roomInfos.length; ++i)
                    $root.base.RoomInfo.encode(message.roomInfos[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RoomListReply message, length delimited. Does not implicitly {@link base.RoomListReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.RoomListReply
         * @static
         * @param {base.IRoomListReply} message RoomListReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomListReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomListReply message from the specified reader or buffer.
         * @function decode
         * @memberof base.RoomListReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.RoomListReply} RoomListReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomListReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.RoomListReply();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameId = reader.int32();
                    break;
                case 2:
                    if (!(message.roomInfos && message.roomInfos.length))
                        message.roomInfos = [];
                    message.roomInfos.push($root.base.RoomInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomListReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.RoomListReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.RoomListReply} RoomListReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomListReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomListReply message.
         * @function verify
         * @memberof base.RoomListReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomListReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.roomInfos != null && message.hasOwnProperty("roomInfos")) {
                if (!Array.isArray(message.roomInfos))
                    return "roomInfos: array expected";
                for (let i = 0; i < message.roomInfos.length; ++i) {
                    let error = $root.base.RoomInfo.verify(message.roomInfos[i]);
                    if (error)
                        return "roomInfos." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RoomListReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.RoomListReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.RoomListReply} RoomListReply
         */
        RoomListReply.fromObject = function fromObject(object) {
            if (object instanceof $root.base.RoomListReply)
                return object;
            let message = new $root.base.RoomListReply();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.roomInfos) {
                if (!Array.isArray(object.roomInfos))
                    throw TypeError(".base.RoomListReply.roomInfos: array expected");
                message.roomInfos = [];
                for (let i = 0; i < object.roomInfos.length; ++i) {
                    if (typeof object.roomInfos[i] !== "object")
                        throw TypeError(".base.RoomListReply.roomInfos: object expected");
                    message.roomInfos[i] = $root.base.RoomInfo.fromObject(object.roomInfos[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a RoomListReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.RoomListReply
         * @static
         * @param {base.RoomListReply} message RoomListReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomListReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.roomInfos = [];
            if (options.defaults)
                object.gameId = 0;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.roomInfos && message.roomInfos.length) {
                object.roomInfos = [];
                for (let j = 0; j < message.roomInfos.length; ++j)
                    object.roomInfos[j] = $root.base.RoomInfo.toObject(message.roomInfos[j], options);
            }
            return object;
        };

        /**
         * Converts this RoomListReply to JSON.
         * @function toJSON
         * @memberof base.RoomListReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomListReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoomListReply;
    })();

    base.TableListReq = (function() {

        /**
         * Properties of a TableListReq.
         * @memberof base
         * @interface ITableListReq
         * @property {number|null} [gameId] TableListReq gameId
         * @property {number|null} [roomType] TableListReq roomType
         * @property {number|null} [clubId] TableListReq clubId
         */

        /**
         * Constructs a new TableListReq.
         * @memberof base
         * @classdesc Represents a TableListReq.
         * @implements ITableListReq
         * @constructor
         * @param {base.ITableListReq=} [properties] Properties to set
         */
        function TableListReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TableListReq gameId.
         * @member {number} gameId
         * @memberof base.TableListReq
         * @instance
         */
        TableListReq.prototype.gameId = 0;

        /**
         * TableListReq roomType.
         * @member {number} roomType
         * @memberof base.TableListReq
         * @instance
         */
        TableListReq.prototype.roomType = 0;

        /**
         * TableListReq clubId.
         * @member {number} clubId
         * @memberof base.TableListReq
         * @instance
         */
        TableListReq.prototype.clubId = 0;

        /**
         * Creates a new TableListReq instance using the specified properties.
         * @function create
         * @memberof base.TableListReq
         * @static
         * @param {base.ITableListReq=} [properties] Properties to set
         * @returns {base.TableListReq} TableListReq instance
         */
        TableListReq.create = function create(properties) {
            return new TableListReq(properties);
        };

        /**
         * Encodes the specified TableListReq message. Does not implicitly {@link base.TableListReq.verify|verify} messages.
         * @function encode
         * @memberof base.TableListReq
         * @static
         * @param {base.ITableListReq} message TableListReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableListReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.roomType != null && Object.hasOwnProperty.call(message, "roomType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.roomType);
            if (message.clubId != null && Object.hasOwnProperty.call(message, "clubId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.clubId);
            return writer;
        };

        /**
         * Encodes the specified TableListReq message, length delimited. Does not implicitly {@link base.TableListReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.TableListReq
         * @static
         * @param {base.ITableListReq} message TableListReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableListReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TableListReq message from the specified reader or buffer.
         * @function decode
         * @memberof base.TableListReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.TableListReq} TableListReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableListReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.TableListReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameId = reader.int32();
                    break;
                case 2:
                    message.roomType = reader.int32();
                    break;
                case 3:
                    message.clubId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TableListReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.TableListReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.TableListReq} TableListReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableListReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TableListReq message.
         * @function verify
         * @memberof base.TableListReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TableListReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.roomType != null && message.hasOwnProperty("roomType"))
                if (!$util.isInteger(message.roomType))
                    return "roomType: integer expected";
            if (message.clubId != null && message.hasOwnProperty("clubId"))
                if (!$util.isInteger(message.clubId))
                    return "clubId: integer expected";
            return null;
        };

        /**
         * Creates a TableListReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.TableListReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.TableListReq} TableListReq
         */
        TableListReq.fromObject = function fromObject(object) {
            if (object instanceof $root.base.TableListReq)
                return object;
            let message = new $root.base.TableListReq();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.roomType != null)
                message.roomType = object.roomType | 0;
            if (object.clubId != null)
                message.clubId = object.clubId | 0;
            return message;
        };

        /**
         * Creates a plain object from a TableListReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.TableListReq
         * @static
         * @param {base.TableListReq} message TableListReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TableListReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.gameId = 0;
                object.roomType = 0;
                object.clubId = 0;
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.roomType != null && message.hasOwnProperty("roomType"))
                object.roomType = message.roomType;
            if (message.clubId != null && message.hasOwnProperty("clubId"))
                object.clubId = message.clubId;
            return object;
        };

        /**
         * Converts this TableListReq to JSON.
         * @function toJSON
         * @memberof base.TableListReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TableListReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TableListReq;
    })();

    base.TableListReply = (function() {

        /**
         * Properties of a TableListReply.
         * @memberof base
         * @interface ITableListReply
         * @property {number|null} [gameId] TableListReply gameId
         * @property {Array.<base.ITableInfo>|null} [tableInfos] TableListReply tableInfos
         */

        /**
         * Constructs a new TableListReply.
         * @memberof base
         * @classdesc Represents a TableListReply.
         * @implements ITableListReply
         * @constructor
         * @param {base.ITableListReply=} [properties] Properties to set
         */
        function TableListReply(properties) {
            this.tableInfos = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TableListReply gameId.
         * @member {number} gameId
         * @memberof base.TableListReply
         * @instance
         */
        TableListReply.prototype.gameId = 0;

        /**
         * TableListReply tableInfos.
         * @member {Array.<base.ITableInfo>} tableInfos
         * @memberof base.TableListReply
         * @instance
         */
        TableListReply.prototype.tableInfos = $util.emptyArray;

        /**
         * Creates a new TableListReply instance using the specified properties.
         * @function create
         * @memberof base.TableListReply
         * @static
         * @param {base.ITableListReply=} [properties] Properties to set
         * @returns {base.TableListReply} TableListReply instance
         */
        TableListReply.create = function create(properties) {
            return new TableListReply(properties);
        };

        /**
         * Encodes the specified TableListReply message. Does not implicitly {@link base.TableListReply.verify|verify} messages.
         * @function encode
         * @memberof base.TableListReply
         * @static
         * @param {base.ITableListReply} message TableListReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableListReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.tableInfos != null && message.tableInfos.length)
                for (let i = 0; i < message.tableInfos.length; ++i)
                    $root.base.TableInfo.encode(message.tableInfos[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TableListReply message, length delimited. Does not implicitly {@link base.TableListReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.TableListReply
         * @static
         * @param {base.ITableListReply} message TableListReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableListReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TableListReply message from the specified reader or buffer.
         * @function decode
         * @memberof base.TableListReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.TableListReply} TableListReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableListReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.TableListReply();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameId = reader.int32();
                    break;
                case 2:
                    if (!(message.tableInfos && message.tableInfos.length))
                        message.tableInfos = [];
                    message.tableInfos.push($root.base.TableInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TableListReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.TableListReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.TableListReply} TableListReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableListReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TableListReply message.
         * @function verify
         * @memberof base.TableListReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TableListReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.tableInfos != null && message.hasOwnProperty("tableInfos")) {
                if (!Array.isArray(message.tableInfos))
                    return "tableInfos: array expected";
                for (let i = 0; i < message.tableInfos.length; ++i) {
                    let error = $root.base.TableInfo.verify(message.tableInfos[i]);
                    if (error)
                        return "tableInfos." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TableListReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.TableListReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.TableListReply} TableListReply
         */
        TableListReply.fromObject = function fromObject(object) {
            if (object instanceof $root.base.TableListReply)
                return object;
            let message = new $root.base.TableListReply();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.tableInfos) {
                if (!Array.isArray(object.tableInfos))
                    throw TypeError(".base.TableListReply.tableInfos: array expected");
                message.tableInfos = [];
                for (let i = 0; i < object.tableInfos.length; ++i) {
                    if (typeof object.tableInfos[i] !== "object")
                        throw TypeError(".base.TableListReply.tableInfos: object expected");
                    message.tableInfos[i] = $root.base.TableInfo.fromObject(object.tableInfos[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TableListReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.TableListReply
         * @static
         * @param {base.TableListReply} message TableListReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TableListReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.tableInfos = [];
            if (options.defaults)
                object.gameId = 0;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.tableInfos && message.tableInfos.length) {
                object.tableInfos = [];
                for (let j = 0; j < message.tableInfos.length; ++j)
                    object.tableInfos[j] = $root.base.TableInfo.toObject(message.tableInfos[j], options);
            }
            return object;
        };

        /**
         * Converts this TableListReply to JSON.
         * @function toJSON
         * @memberof base.TableListReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TableListReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TableListReply;
    })();

    base.TableInfo = (function() {

        /**
         * Properties of a TableInfo.
         * @memberof base
         * @interface ITableInfo
         * @property {number|null} [tableId] TableInfo tableId
         * @property {base.IRoomInfo|null} [roomInfos] TableInfo roomInfos
         * @property {Array.<base.IPlayerBaseInfo>|null} [players] TableInfo players
         */

        /**
         * Constructs a new TableInfo.
         * @memberof base
         * @classdesc Represents a TableInfo.
         * @implements ITableInfo
         * @constructor
         * @param {base.ITableInfo=} [properties] Properties to set
         */
        function TableInfo(properties) {
            this.players = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TableInfo tableId.
         * @member {number} tableId
         * @memberof base.TableInfo
         * @instance
         */
        TableInfo.prototype.tableId = 0;

        /**
         * TableInfo roomInfos.
         * @member {base.IRoomInfo|null|undefined} roomInfos
         * @memberof base.TableInfo
         * @instance
         */
        TableInfo.prototype.roomInfos = null;

        /**
         * TableInfo players.
         * @member {Array.<base.IPlayerBaseInfo>} players
         * @memberof base.TableInfo
         * @instance
         */
        TableInfo.prototype.players = $util.emptyArray;

        /**
         * Creates a new TableInfo instance using the specified properties.
         * @function create
         * @memberof base.TableInfo
         * @static
         * @param {base.ITableInfo=} [properties] Properties to set
         * @returns {base.TableInfo} TableInfo instance
         */
        TableInfo.create = function create(properties) {
            return new TableInfo(properties);
        };

        /**
         * Encodes the specified TableInfo message. Does not implicitly {@link base.TableInfo.verify|verify} messages.
         * @function encode
         * @memberof base.TableInfo
         * @static
         * @param {base.ITableInfo} message TableInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.tableId != null && Object.hasOwnProperty.call(message, "tableId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.tableId);
            if (message.roomInfos != null && Object.hasOwnProperty.call(message, "roomInfos"))
                $root.base.RoomInfo.encode(message.roomInfos, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.players != null && message.players.length)
                for (let i = 0; i < message.players.length; ++i)
                    $root.base.PlayerBaseInfo.encode(message.players[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TableInfo message, length delimited. Does not implicitly {@link base.TableInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.TableInfo
         * @static
         * @param {base.ITableInfo} message TableInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TableInfo message from the specified reader or buffer.
         * @function decode
         * @memberof base.TableInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.TableInfo} TableInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.TableInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.tableId = reader.int32();
                    break;
                case 2:
                    message.roomInfos = $root.base.RoomInfo.decode(reader, reader.uint32());
                    break;
                case 3:
                    if (!(message.players && message.players.length))
                        message.players = [];
                    message.players.push($root.base.PlayerBaseInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TableInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.TableInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.TableInfo} TableInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TableInfo message.
         * @function verify
         * @memberof base.TableInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TableInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.tableId != null && message.hasOwnProperty("tableId"))
                if (!$util.isInteger(message.tableId))
                    return "tableId: integer expected";
            if (message.roomInfos != null && message.hasOwnProperty("roomInfos")) {
                let error = $root.base.RoomInfo.verify(message.roomInfos);
                if (error)
                    return "roomInfos." + error;
            }
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (let i = 0; i < message.players.length; ++i) {
                    let error = $root.base.PlayerBaseInfo.verify(message.players[i]);
                    if (error)
                        return "players." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TableInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.TableInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.TableInfo} TableInfo
         */
        TableInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.base.TableInfo)
                return object;
            let message = new $root.base.TableInfo();
            if (object.tableId != null)
                message.tableId = object.tableId | 0;
            if (object.roomInfos != null) {
                if (typeof object.roomInfos !== "object")
                    throw TypeError(".base.TableInfo.roomInfos: object expected");
                message.roomInfos = $root.base.RoomInfo.fromObject(object.roomInfos);
            }
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".base.TableInfo.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i) {
                    if (typeof object.players[i] !== "object")
                        throw TypeError(".base.TableInfo.players: object expected");
                    message.players[i] = $root.base.PlayerBaseInfo.fromObject(object.players[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TableInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.TableInfo
         * @static
         * @param {base.TableInfo} message TableInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TableInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.players = [];
            if (options.defaults) {
                object.tableId = 0;
                object.roomInfos = null;
            }
            if (message.tableId != null && message.hasOwnProperty("tableId"))
                object.tableId = message.tableId;
            if (message.roomInfos != null && message.hasOwnProperty("roomInfos"))
                object.roomInfos = $root.base.RoomInfo.toObject(message.roomInfos, options);
            if (message.players && message.players.length) {
                object.players = [];
                for (let j = 0; j < message.players.length; ++j)
                    object.players[j] = $root.base.PlayerBaseInfo.toObject(message.players[j], options);
            }
            return object;
        };

        /**
         * Converts this TableInfo to JSON.
         * @function toJSON
         * @memberof base.TableInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TableInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TableInfo;
    })();

    base.RoomInfo = (function() {

        /**
         * Properties of a RoomInfo.
         * @memberof base
         * @interface IRoomInfo
         * @property {number|null} [roomId] RoomInfo roomId
         * @property {string|null} [roomName] RoomInfo roomName
         * @property {number|null} [initBet] RoomInfo initBet
         * @property {number|null} [minEnter] RoomInfo minEnter
         * @property {number|null} [minPlayerNum] RoomInfo minPlayerNum
         * @property {number|null} [maxPlayerNum] RoomInfo maxPlayerNum
         * @property {number|null} [playerNumLimit] RoomInfo playerNumLimit
         * @property {number|null} [playerNum] RoomInfo playerNum
         * @property {string|null} [roomParams] RoomInfo roomParams
         */

        /**
         * Constructs a new RoomInfo.
         * @memberof base
         * @classdesc Represents a RoomInfo.
         * @implements IRoomInfo
         * @constructor
         * @param {base.IRoomInfo=} [properties] Properties to set
         */
        function RoomInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomInfo roomId.
         * @member {number} roomId
         * @memberof base.RoomInfo
         * @instance
         */
        RoomInfo.prototype.roomId = 0;

        /**
         * RoomInfo roomName.
         * @member {string} roomName
         * @memberof base.RoomInfo
         * @instance
         */
        RoomInfo.prototype.roomName = "";

        /**
         * RoomInfo initBet.
         * @member {number} initBet
         * @memberof base.RoomInfo
         * @instance
         */
        RoomInfo.prototype.initBet = 0;

        /**
         * RoomInfo minEnter.
         * @member {number} minEnter
         * @memberof base.RoomInfo
         * @instance
         */
        RoomInfo.prototype.minEnter = 0;

        /**
         * RoomInfo minPlayerNum.
         * @member {number} minPlayerNum
         * @memberof base.RoomInfo
         * @instance
         */
        RoomInfo.prototype.minPlayerNum = 0;

        /**
         * RoomInfo maxPlayerNum.
         * @member {number} maxPlayerNum
         * @memberof base.RoomInfo
         * @instance
         */
        RoomInfo.prototype.maxPlayerNum = 0;

        /**
         * RoomInfo playerNumLimit.
         * @member {number} playerNumLimit
         * @memberof base.RoomInfo
         * @instance
         */
        RoomInfo.prototype.playerNumLimit = 0;

        /**
         * RoomInfo playerNum.
         * @member {number} playerNum
         * @memberof base.RoomInfo
         * @instance
         */
        RoomInfo.prototype.playerNum = 0;

        /**
         * RoomInfo roomParams.
         * @member {string} roomParams
         * @memberof base.RoomInfo
         * @instance
         */
        RoomInfo.prototype.roomParams = "";

        /**
         * Creates a new RoomInfo instance using the specified properties.
         * @function create
         * @memberof base.RoomInfo
         * @static
         * @param {base.IRoomInfo=} [properties] Properties to set
         * @returns {base.RoomInfo} RoomInfo instance
         */
        RoomInfo.create = function create(properties) {
            return new RoomInfo(properties);
        };

        /**
         * Encodes the specified RoomInfo message. Does not implicitly {@link base.RoomInfo.verify|verify} messages.
         * @function encode
         * @memberof base.RoomInfo
         * @static
         * @param {base.IRoomInfo} message RoomInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roomId);
            if (message.roomName != null && Object.hasOwnProperty.call(message, "roomName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.roomName);
            if (message.initBet != null && Object.hasOwnProperty.call(message, "initBet"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.initBet);
            if (message.minEnter != null && Object.hasOwnProperty.call(message, "minEnter"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.minEnter);
            if (message.minPlayerNum != null && Object.hasOwnProperty.call(message, "minPlayerNum"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.minPlayerNum);
            if (message.maxPlayerNum != null && Object.hasOwnProperty.call(message, "maxPlayerNum"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.maxPlayerNum);
            if (message.playerNumLimit != null && Object.hasOwnProperty.call(message, "playerNumLimit"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.playerNumLimit);
            if (message.playerNum != null && Object.hasOwnProperty.call(message, "playerNum"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.playerNum);
            if (message.roomParams != null && Object.hasOwnProperty.call(message, "roomParams"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.roomParams);
            return writer;
        };

        /**
         * Encodes the specified RoomInfo message, length delimited. Does not implicitly {@link base.RoomInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.RoomInfo
         * @static
         * @param {base.IRoomInfo} message RoomInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomInfo message from the specified reader or buffer.
         * @function decode
         * @memberof base.RoomInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.RoomInfo} RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.RoomInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomId = reader.int32();
                    break;
                case 2:
                    message.roomName = reader.string();
                    break;
                case 3:
                    message.initBet = reader.int32();
                    break;
                case 4:
                    message.minEnter = reader.int32();
                    break;
                case 5:
                    message.minPlayerNum = reader.int32();
                    break;
                case 6:
                    message.maxPlayerNum = reader.int32();
                    break;
                case 7:
                    message.playerNumLimit = reader.int32();
                    break;
                case 8:
                    message.playerNum = reader.int32();
                    break;
                case 9:
                    message.roomParams = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.RoomInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.RoomInfo} RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomInfo message.
         * @function verify
         * @memberof base.RoomInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isInteger(message.roomId))
                    return "roomId: integer expected";
            if (message.roomName != null && message.hasOwnProperty("roomName"))
                if (!$util.isString(message.roomName))
                    return "roomName: string expected";
            if (message.initBet != null && message.hasOwnProperty("initBet"))
                if (!$util.isInteger(message.initBet))
                    return "initBet: integer expected";
            if (message.minEnter != null && message.hasOwnProperty("minEnter"))
                if (!$util.isInteger(message.minEnter))
                    return "minEnter: integer expected";
            if (message.minPlayerNum != null && message.hasOwnProperty("minPlayerNum"))
                if (!$util.isInteger(message.minPlayerNum))
                    return "minPlayerNum: integer expected";
            if (message.maxPlayerNum != null && message.hasOwnProperty("maxPlayerNum"))
                if (!$util.isInteger(message.maxPlayerNum))
                    return "maxPlayerNum: integer expected";
            if (message.playerNumLimit != null && message.hasOwnProperty("playerNumLimit"))
                if (!$util.isInteger(message.playerNumLimit))
                    return "playerNumLimit: integer expected";
            if (message.playerNum != null && message.hasOwnProperty("playerNum"))
                if (!$util.isInteger(message.playerNum))
                    return "playerNum: integer expected";
            if (message.roomParams != null && message.hasOwnProperty("roomParams"))
                if (!$util.isString(message.roomParams))
                    return "roomParams: string expected";
            return null;
        };

        /**
         * Creates a RoomInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.RoomInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.RoomInfo} RoomInfo
         */
        RoomInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.base.RoomInfo)
                return object;
            let message = new $root.base.RoomInfo();
            if (object.roomId != null)
                message.roomId = object.roomId | 0;
            if (object.roomName != null)
                message.roomName = String(object.roomName);
            if (object.initBet != null)
                message.initBet = object.initBet | 0;
            if (object.minEnter != null)
                message.minEnter = object.minEnter | 0;
            if (object.minPlayerNum != null)
                message.minPlayerNum = object.minPlayerNum | 0;
            if (object.maxPlayerNum != null)
                message.maxPlayerNum = object.maxPlayerNum | 0;
            if (object.playerNumLimit != null)
                message.playerNumLimit = object.playerNumLimit | 0;
            if (object.playerNum != null)
                message.playerNum = object.playerNum | 0;
            if (object.roomParams != null)
                message.roomParams = String(object.roomParams);
            return message;
        };

        /**
         * Creates a plain object from a RoomInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.RoomInfo
         * @static
         * @param {base.RoomInfo} message RoomInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.roomId = 0;
                object.roomName = "";
                object.initBet = 0;
                object.minEnter = 0;
                object.minPlayerNum = 0;
                object.maxPlayerNum = 0;
                object.playerNumLimit = 0;
                object.playerNum = 0;
                object.roomParams = "";
            }
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.roomName != null && message.hasOwnProperty("roomName"))
                object.roomName = message.roomName;
            if (message.initBet != null && message.hasOwnProperty("initBet"))
                object.initBet = message.initBet;
            if (message.minEnter != null && message.hasOwnProperty("minEnter"))
                object.minEnter = message.minEnter;
            if (message.minPlayerNum != null && message.hasOwnProperty("minPlayerNum"))
                object.minPlayerNum = message.minPlayerNum;
            if (message.maxPlayerNum != null && message.hasOwnProperty("maxPlayerNum"))
                object.maxPlayerNum = message.maxPlayerNum;
            if (message.playerNumLimit != null && message.hasOwnProperty("playerNumLimit"))
                object.playerNumLimit = message.playerNumLimit;
            if (message.playerNum != null && message.hasOwnProperty("playerNum"))
                object.playerNum = message.playerNum;
            if (message.roomParams != null && message.hasOwnProperty("roomParams"))
                object.roomParams = message.roomParams;
            return object;
        };

        /**
         * Converts this RoomInfo to JSON.
         * @function toJSON
         * @memberof base.RoomInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoomInfo;
    })();

    base.EnterRoomReq = (function() {

        /**
         * Properties of an EnterRoomReq.
         * @memberof base
         * @interface IEnterRoomReq
         * @property {number|null} [gameId] EnterRoomReq gameId
         * @property {number|null} [roomId] EnterRoomReq roomId
         * @property {number|null} [clubId] EnterRoomReq clubId
         * @property {number|null} [roomType] EnterRoomReq roomType
         * @property {number|null} [matchType] EnterRoomReq matchType
         * @property {number|null} [tableId] EnterRoomReq tableId
         * @property {number|null} [tableNo] EnterRoomReq tableNo
         * @property {number|null} [initBet] EnterRoomReq initBet
         * @property {number|null} [minPlayer] EnterRoomReq minPlayer
         * @property {number|null} [maxPlayer] EnterRoomReq maxPlayer
         */

        /**
         * Constructs a new EnterRoomReq.
         * @memberof base
         * @classdesc Represents an EnterRoomReq.
         * @implements IEnterRoomReq
         * @constructor
         * @param {base.IEnterRoomReq=} [properties] Properties to set
         */
        function EnterRoomReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnterRoomReq gameId.
         * @member {number} gameId
         * @memberof base.EnterRoomReq
         * @instance
         */
        EnterRoomReq.prototype.gameId = 0;

        /**
         * EnterRoomReq roomId.
         * @member {number} roomId
         * @memberof base.EnterRoomReq
         * @instance
         */
        EnterRoomReq.prototype.roomId = 0;

        /**
         * EnterRoomReq clubId.
         * @member {number} clubId
         * @memberof base.EnterRoomReq
         * @instance
         */
        EnterRoomReq.prototype.clubId = 0;

        /**
         * EnterRoomReq roomType.
         * @member {number} roomType
         * @memberof base.EnterRoomReq
         * @instance
         */
        EnterRoomReq.prototype.roomType = 0;

        /**
         * EnterRoomReq matchType.
         * @member {number} matchType
         * @memberof base.EnterRoomReq
         * @instance
         */
        EnterRoomReq.prototype.matchType = 0;

        /**
         * EnterRoomReq tableId.
         * @member {number} tableId
         * @memberof base.EnterRoomReq
         * @instance
         */
        EnterRoomReq.prototype.tableId = 0;

        /**
         * EnterRoomReq tableNo.
         * @member {number} tableNo
         * @memberof base.EnterRoomReq
         * @instance
         */
        EnterRoomReq.prototype.tableNo = 0;

        /**
         * EnterRoomReq initBet.
         * @member {number} initBet
         * @memberof base.EnterRoomReq
         * @instance
         */
        EnterRoomReq.prototype.initBet = 0;

        /**
         * EnterRoomReq minPlayer.
         * @member {number} minPlayer
         * @memberof base.EnterRoomReq
         * @instance
         */
        EnterRoomReq.prototype.minPlayer = 0;

        /**
         * EnterRoomReq maxPlayer.
         * @member {number} maxPlayer
         * @memberof base.EnterRoomReq
         * @instance
         */
        EnterRoomReq.prototype.maxPlayer = 0;

        /**
         * Creates a new EnterRoomReq instance using the specified properties.
         * @function create
         * @memberof base.EnterRoomReq
         * @static
         * @param {base.IEnterRoomReq=} [properties] Properties to set
         * @returns {base.EnterRoomReq} EnterRoomReq instance
         */
        EnterRoomReq.create = function create(properties) {
            return new EnterRoomReq(properties);
        };

        /**
         * Encodes the specified EnterRoomReq message. Does not implicitly {@link base.EnterRoomReq.verify|verify} messages.
         * @function encode
         * @memberof base.EnterRoomReq
         * @static
         * @param {base.IEnterRoomReq} message EnterRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterRoomReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.roomId);
            if (message.clubId != null && Object.hasOwnProperty.call(message, "clubId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.clubId);
            if (message.roomType != null && Object.hasOwnProperty.call(message, "roomType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.roomType);
            if (message.matchType != null && Object.hasOwnProperty.call(message, "matchType"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.matchType);
            if (message.tableId != null && Object.hasOwnProperty.call(message, "tableId"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.tableId);
            if (message.tableNo != null && Object.hasOwnProperty.call(message, "tableNo"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.tableNo);
            if (message.initBet != null && Object.hasOwnProperty.call(message, "initBet"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.initBet);
            if (message.minPlayer != null && Object.hasOwnProperty.call(message, "minPlayer"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.minPlayer);
            if (message.maxPlayer != null && Object.hasOwnProperty.call(message, "maxPlayer"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.maxPlayer);
            return writer;
        };

        /**
         * Encodes the specified EnterRoomReq message, length delimited. Does not implicitly {@link base.EnterRoomReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.EnterRoomReq
         * @static
         * @param {base.IEnterRoomReq} message EnterRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterRoomReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnterRoomReq message from the specified reader or buffer.
         * @function decode
         * @memberof base.EnterRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.EnterRoomReq} EnterRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterRoomReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.EnterRoomReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameId = reader.int32();
                    break;
                case 2:
                    message.roomId = reader.int32();
                    break;
                case 3:
                    message.clubId = reader.int32();
                    break;
                case 4:
                    message.roomType = reader.int32();
                    break;
                case 5:
                    message.matchType = reader.int32();
                    break;
                case 6:
                    message.tableId = reader.int32();
                    break;
                case 7:
                    message.tableNo = reader.int32();
                    break;
                case 8:
                    message.initBet = reader.int32();
                    break;
                case 9:
                    message.minPlayer = reader.int32();
                    break;
                case 10:
                    message.maxPlayer = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EnterRoomReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.EnterRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.EnterRoomReq} EnterRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterRoomReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnterRoomReq message.
         * @function verify
         * @memberof base.EnterRoomReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnterRoomReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isInteger(message.roomId))
                    return "roomId: integer expected";
            if (message.clubId != null && message.hasOwnProperty("clubId"))
                if (!$util.isInteger(message.clubId))
                    return "clubId: integer expected";
            if (message.roomType != null && message.hasOwnProperty("roomType"))
                if (!$util.isInteger(message.roomType))
                    return "roomType: integer expected";
            if (message.matchType != null && message.hasOwnProperty("matchType"))
                if (!$util.isInteger(message.matchType))
                    return "matchType: integer expected";
            if (message.tableId != null && message.hasOwnProperty("tableId"))
                if (!$util.isInteger(message.tableId))
                    return "tableId: integer expected";
            if (message.tableNo != null && message.hasOwnProperty("tableNo"))
                if (!$util.isInteger(message.tableNo))
                    return "tableNo: integer expected";
            if (message.initBet != null && message.hasOwnProperty("initBet"))
                if (!$util.isInteger(message.initBet))
                    return "initBet: integer expected";
            if (message.minPlayer != null && message.hasOwnProperty("minPlayer"))
                if (!$util.isInteger(message.minPlayer))
                    return "minPlayer: integer expected";
            if (message.maxPlayer != null && message.hasOwnProperty("maxPlayer"))
                if (!$util.isInteger(message.maxPlayer))
                    return "maxPlayer: integer expected";
            return null;
        };

        /**
         * Creates an EnterRoomReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.EnterRoomReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.EnterRoomReq} EnterRoomReq
         */
        EnterRoomReq.fromObject = function fromObject(object) {
            if (object instanceof $root.base.EnterRoomReq)
                return object;
            let message = new $root.base.EnterRoomReq();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.roomId != null)
                message.roomId = object.roomId | 0;
            if (object.clubId != null)
                message.clubId = object.clubId | 0;
            if (object.roomType != null)
                message.roomType = object.roomType | 0;
            if (object.matchType != null)
                message.matchType = object.matchType | 0;
            if (object.tableId != null)
                message.tableId = object.tableId | 0;
            if (object.tableNo != null)
                message.tableNo = object.tableNo | 0;
            if (object.initBet != null)
                message.initBet = object.initBet | 0;
            if (object.minPlayer != null)
                message.minPlayer = object.minPlayer | 0;
            if (object.maxPlayer != null)
                message.maxPlayer = object.maxPlayer | 0;
            return message;
        };

        /**
         * Creates a plain object from an EnterRoomReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.EnterRoomReq
         * @static
         * @param {base.EnterRoomReq} message EnterRoomReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnterRoomReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.gameId = 0;
                object.roomId = 0;
                object.clubId = 0;
                object.roomType = 0;
                object.matchType = 0;
                object.tableId = 0;
                object.tableNo = 0;
                object.initBet = 0;
                object.minPlayer = 0;
                object.maxPlayer = 0;
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.clubId != null && message.hasOwnProperty("clubId"))
                object.clubId = message.clubId;
            if (message.roomType != null && message.hasOwnProperty("roomType"))
                object.roomType = message.roomType;
            if (message.matchType != null && message.hasOwnProperty("matchType"))
                object.matchType = message.matchType;
            if (message.tableId != null && message.hasOwnProperty("tableId"))
                object.tableId = message.tableId;
            if (message.tableNo != null && message.hasOwnProperty("tableNo"))
                object.tableNo = message.tableNo;
            if (message.initBet != null && message.hasOwnProperty("initBet"))
                object.initBet = message.initBet;
            if (message.minPlayer != null && message.hasOwnProperty("minPlayer"))
                object.minPlayer = message.minPlayer;
            if (message.maxPlayer != null && message.hasOwnProperty("maxPlayer"))
                object.maxPlayer = message.maxPlayer;
            return object;
        };

        /**
         * Converts this EnterRoomReq to JSON.
         * @function toJSON
         * @memberof base.EnterRoomReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnterRoomReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EnterRoomReq;
    })();

    base.EnterRoomReply = (function() {

        /**
         * Properties of an EnterRoomReply.
         * @memberof base
         * @interface IEnterRoomReply
         * @property {number|null} [gameId] EnterRoomReply gameId
         * @property {number|null} [roomId] EnterRoomReply roomId
         * @property {base.IRoomInfo|null} [roomInfo] EnterRoomReply roomInfo
         * @property {number|null} [tableId] EnterRoomReply tableId
         * @property {number|null} [seat] EnterRoomReply seat
         * @property {number|null} [enterReason] EnterRoomReply enterReason
         * @property {number|null} [roomType] EnterRoomReply roomType
         * @property {number|null} [clubId] EnterRoomReply clubId
         * @property {string|null} [gameUrl] EnterRoomReply gameUrl
         * @property {number|null} [tableNo] EnterRoomReply tableNo
         */

        /**
         * Constructs a new EnterRoomReply.
         * @memberof base
         * @classdesc Represents an EnterRoomReply.
         * @implements IEnterRoomReply
         * @constructor
         * @param {base.IEnterRoomReply=} [properties] Properties to set
         */
        function EnterRoomReply(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnterRoomReply gameId.
         * @member {number} gameId
         * @memberof base.EnterRoomReply
         * @instance
         */
        EnterRoomReply.prototype.gameId = 0;

        /**
         * EnterRoomReply roomId.
         * @member {number} roomId
         * @memberof base.EnterRoomReply
         * @instance
         */
        EnterRoomReply.prototype.roomId = 0;

        /**
         * EnterRoomReply roomInfo.
         * @member {base.IRoomInfo|null|undefined} roomInfo
         * @memberof base.EnterRoomReply
         * @instance
         */
        EnterRoomReply.prototype.roomInfo = null;

        /**
         * EnterRoomReply tableId.
         * @member {number} tableId
         * @memberof base.EnterRoomReply
         * @instance
         */
        EnterRoomReply.prototype.tableId = 0;

        /**
         * EnterRoomReply seat.
         * @member {number} seat
         * @memberof base.EnterRoomReply
         * @instance
         */
        EnterRoomReply.prototype.seat = 0;

        /**
         * EnterRoomReply enterReason.
         * @member {number} enterReason
         * @memberof base.EnterRoomReply
         * @instance
         */
        EnterRoomReply.prototype.enterReason = 0;

        /**
         * EnterRoomReply roomType.
         * @member {number} roomType
         * @memberof base.EnterRoomReply
         * @instance
         */
        EnterRoomReply.prototype.roomType = 0;

        /**
         * EnterRoomReply clubId.
         * @member {number} clubId
         * @memberof base.EnterRoomReply
         * @instance
         */
        EnterRoomReply.prototype.clubId = 0;

        /**
         * EnterRoomReply gameUrl.
         * @member {string} gameUrl
         * @memberof base.EnterRoomReply
         * @instance
         */
        EnterRoomReply.prototype.gameUrl = "";

        /**
         * EnterRoomReply tableNo.
         * @member {number} tableNo
         * @memberof base.EnterRoomReply
         * @instance
         */
        EnterRoomReply.prototype.tableNo = 0;

        /**
         * Creates a new EnterRoomReply instance using the specified properties.
         * @function create
         * @memberof base.EnterRoomReply
         * @static
         * @param {base.IEnterRoomReply=} [properties] Properties to set
         * @returns {base.EnterRoomReply} EnterRoomReply instance
         */
        EnterRoomReply.create = function create(properties) {
            return new EnterRoomReply(properties);
        };

        /**
         * Encodes the specified EnterRoomReply message. Does not implicitly {@link base.EnterRoomReply.verify|verify} messages.
         * @function encode
         * @memberof base.EnterRoomReply
         * @static
         * @param {base.IEnterRoomReply} message EnterRoomReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterRoomReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.roomId);
            if (message.roomInfo != null && Object.hasOwnProperty.call(message, "roomInfo"))
                $root.base.RoomInfo.encode(message.roomInfo, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.tableId != null && Object.hasOwnProperty.call(message, "tableId"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.tableId);
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.seat);
            if (message.enterReason != null && Object.hasOwnProperty.call(message, "enterReason"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.enterReason);
            if (message.roomType != null && Object.hasOwnProperty.call(message, "roomType"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.roomType);
            if (message.clubId != null && Object.hasOwnProperty.call(message, "clubId"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.clubId);
            if (message.gameUrl != null && Object.hasOwnProperty.call(message, "gameUrl"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.gameUrl);
            if (message.tableNo != null && Object.hasOwnProperty.call(message, "tableNo"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.tableNo);
            return writer;
        };

        /**
         * Encodes the specified EnterRoomReply message, length delimited. Does not implicitly {@link base.EnterRoomReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.EnterRoomReply
         * @static
         * @param {base.IEnterRoomReply} message EnterRoomReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterRoomReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnterRoomReply message from the specified reader or buffer.
         * @function decode
         * @memberof base.EnterRoomReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.EnterRoomReply} EnterRoomReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterRoomReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.EnterRoomReply();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameId = reader.int32();
                    break;
                case 2:
                    message.roomId = reader.int32();
                    break;
                case 3:
                    message.roomInfo = $root.base.RoomInfo.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.tableId = reader.int32();
                    break;
                case 5:
                    message.seat = reader.int32();
                    break;
                case 6:
                    message.enterReason = reader.int32();
                    break;
                case 7:
                    message.roomType = reader.int32();
                    break;
                case 8:
                    message.clubId = reader.int32();
                    break;
                case 9:
                    message.gameUrl = reader.string();
                    break;
                case 10:
                    message.tableNo = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EnterRoomReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.EnterRoomReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.EnterRoomReply} EnterRoomReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterRoomReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnterRoomReply message.
         * @function verify
         * @memberof base.EnterRoomReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnterRoomReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isInteger(message.roomId))
                    return "roomId: integer expected";
            if (message.roomInfo != null && message.hasOwnProperty("roomInfo")) {
                let error = $root.base.RoomInfo.verify(message.roomInfo);
                if (error)
                    return "roomInfo." + error;
            }
            if (message.tableId != null && message.hasOwnProperty("tableId"))
                if (!$util.isInteger(message.tableId))
                    return "tableId: integer expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            if (message.enterReason != null && message.hasOwnProperty("enterReason"))
                if (!$util.isInteger(message.enterReason))
                    return "enterReason: integer expected";
            if (message.roomType != null && message.hasOwnProperty("roomType"))
                if (!$util.isInteger(message.roomType))
                    return "roomType: integer expected";
            if (message.clubId != null && message.hasOwnProperty("clubId"))
                if (!$util.isInteger(message.clubId))
                    return "clubId: integer expected";
            if (message.gameUrl != null && message.hasOwnProperty("gameUrl"))
                if (!$util.isString(message.gameUrl))
                    return "gameUrl: string expected";
            if (message.tableNo != null && message.hasOwnProperty("tableNo"))
                if (!$util.isInteger(message.tableNo))
                    return "tableNo: integer expected";
            return null;
        };

        /**
         * Creates an EnterRoomReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.EnterRoomReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.EnterRoomReply} EnterRoomReply
         */
        EnterRoomReply.fromObject = function fromObject(object) {
            if (object instanceof $root.base.EnterRoomReply)
                return object;
            let message = new $root.base.EnterRoomReply();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.roomId != null)
                message.roomId = object.roomId | 0;
            if (object.roomInfo != null) {
                if (typeof object.roomInfo !== "object")
                    throw TypeError(".base.EnterRoomReply.roomInfo: object expected");
                message.roomInfo = $root.base.RoomInfo.fromObject(object.roomInfo);
            }
            if (object.tableId != null)
                message.tableId = object.tableId | 0;
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.enterReason != null)
                message.enterReason = object.enterReason | 0;
            if (object.roomType != null)
                message.roomType = object.roomType | 0;
            if (object.clubId != null)
                message.clubId = object.clubId | 0;
            if (object.gameUrl != null)
                message.gameUrl = String(object.gameUrl);
            if (object.tableNo != null)
                message.tableNo = object.tableNo | 0;
            return message;
        };

        /**
         * Creates a plain object from an EnterRoomReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.EnterRoomReply
         * @static
         * @param {base.EnterRoomReply} message EnterRoomReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnterRoomReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.gameId = 0;
                object.roomId = 0;
                object.roomInfo = null;
                object.tableId = 0;
                object.seat = 0;
                object.enterReason = 0;
                object.roomType = 0;
                object.clubId = 0;
                object.gameUrl = "";
                object.tableNo = 0;
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.roomInfo != null && message.hasOwnProperty("roomInfo"))
                object.roomInfo = $root.base.RoomInfo.toObject(message.roomInfo, options);
            if (message.tableId != null && message.hasOwnProperty("tableId"))
                object.tableId = message.tableId;
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.enterReason != null && message.hasOwnProperty("enterReason"))
                object.enterReason = message.enterReason;
            if (message.roomType != null && message.hasOwnProperty("roomType"))
                object.roomType = message.roomType;
            if (message.clubId != null && message.hasOwnProperty("clubId"))
                object.clubId = message.clubId;
            if (message.gameUrl != null && message.hasOwnProperty("gameUrl"))
                object.gameUrl = message.gameUrl;
            if (message.tableNo != null && message.hasOwnProperty("tableNo"))
                object.tableNo = message.tableNo;
            return object;
        };

        /**
         * Converts this EnterRoomReply to JSON.
         * @function toJSON
         * @memberof base.EnterRoomReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnterRoomReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EnterRoomReply;
    })();

    /**
     * ENTER_REASON enum.
     * @name base.ENTER_REASON
     * @enum {number}
     * @property {number} ENTER_NONE=0 ENTER_NONE value
     * @property {number} ENTER_PLAYER=1 ENTER_PLAYER value
     * @property {number} ENTER_SWITCH=2 ENTER_SWITCH value
     * @property {number} ENTER_ONLINE=3 ENTER_ONLINE value
     */
    base.ENTER_REASON = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ENTER_NONE"] = 0;
        values[valuesById[1] = "ENTER_PLAYER"] = 1;
        values[valuesById[2] = "ENTER_SWITCH"] = 2;
        values[valuesById[3] = "ENTER_ONLINE"] = 3;
        return values;
    })();

    base.ExitRoomReq = (function() {

        /**
         * Properties of an ExitRoomReq.
         * @memberof base
         * @interface IExitRoomReq
         * @property {number|null} [gameId] ExitRoomReq gameId
         * @property {number|null} [roomId] ExitRoomReq roomId
         */

        /**
         * Constructs a new ExitRoomReq.
         * @memberof base
         * @classdesc Represents an ExitRoomReq.
         * @implements IExitRoomReq
         * @constructor
         * @param {base.IExitRoomReq=} [properties] Properties to set
         */
        function ExitRoomReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ExitRoomReq gameId.
         * @member {number} gameId
         * @memberof base.ExitRoomReq
         * @instance
         */
        ExitRoomReq.prototype.gameId = 0;

        /**
         * ExitRoomReq roomId.
         * @member {number} roomId
         * @memberof base.ExitRoomReq
         * @instance
         */
        ExitRoomReq.prototype.roomId = 0;

        /**
         * Creates a new ExitRoomReq instance using the specified properties.
         * @function create
         * @memberof base.ExitRoomReq
         * @static
         * @param {base.IExitRoomReq=} [properties] Properties to set
         * @returns {base.ExitRoomReq} ExitRoomReq instance
         */
        ExitRoomReq.create = function create(properties) {
            return new ExitRoomReq(properties);
        };

        /**
         * Encodes the specified ExitRoomReq message. Does not implicitly {@link base.ExitRoomReq.verify|verify} messages.
         * @function encode
         * @memberof base.ExitRoomReq
         * @static
         * @param {base.IExitRoomReq} message ExitRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExitRoomReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.roomId);
            return writer;
        };

        /**
         * Encodes the specified ExitRoomReq message, length delimited. Does not implicitly {@link base.ExitRoomReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.ExitRoomReq
         * @static
         * @param {base.IExitRoomReq} message ExitRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExitRoomReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ExitRoomReq message from the specified reader or buffer.
         * @function decode
         * @memberof base.ExitRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.ExitRoomReq} ExitRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExitRoomReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.ExitRoomReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameId = reader.int32();
                    break;
                case 2:
                    message.roomId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ExitRoomReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.ExitRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.ExitRoomReq} ExitRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExitRoomReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ExitRoomReq message.
         * @function verify
         * @memberof base.ExitRoomReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ExitRoomReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isInteger(message.roomId))
                    return "roomId: integer expected";
            return null;
        };

        /**
         * Creates an ExitRoomReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.ExitRoomReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.ExitRoomReq} ExitRoomReq
         */
        ExitRoomReq.fromObject = function fromObject(object) {
            if (object instanceof $root.base.ExitRoomReq)
                return object;
            let message = new $root.base.ExitRoomReq();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.roomId != null)
                message.roomId = object.roomId | 0;
            return message;
        };

        /**
         * Creates a plain object from an ExitRoomReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.ExitRoomReq
         * @static
         * @param {base.ExitRoomReq} message ExitRoomReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ExitRoomReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.gameId = 0;
                object.roomId = 0;
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            return object;
        };

        /**
         * Converts this ExitRoomReq to JSON.
         * @function toJSON
         * @memberof base.ExitRoomReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ExitRoomReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ExitRoomReq;
    })();

    base.ExitRoomReply = (function() {

        /**
         * Properties of an ExitRoomReply.
         * @memberof base
         * @interface IExitRoomReply
         * @property {number|null} [gameId] ExitRoomReply gameId
         * @property {number|null} [roomId] ExitRoomReply roomId
         * @property {number|null} [exitReason] ExitRoomReply exitReason
         * @property {Array.<number>|null} [gameList] ExitRoomReply gameList
         * @property {number|null} [totalRounds] ExitRoomReply totalRounds
         */

        /**
         * Constructs a new ExitRoomReply.
         * @memberof base
         * @classdesc Represents an ExitRoomReply.
         * @implements IExitRoomReply
         * @constructor
         * @param {base.IExitRoomReply=} [properties] Properties to set
         */
        function ExitRoomReply(properties) {
            this.gameList = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ExitRoomReply gameId.
         * @member {number} gameId
         * @memberof base.ExitRoomReply
         * @instance
         */
        ExitRoomReply.prototype.gameId = 0;

        /**
         * ExitRoomReply roomId.
         * @member {number} roomId
         * @memberof base.ExitRoomReply
         * @instance
         */
        ExitRoomReply.prototype.roomId = 0;

        /**
         * ExitRoomReply exitReason.
         * @member {number} exitReason
         * @memberof base.ExitRoomReply
         * @instance
         */
        ExitRoomReply.prototype.exitReason = 0;

        /**
         * ExitRoomReply gameList.
         * @member {Array.<number>} gameList
         * @memberof base.ExitRoomReply
         * @instance
         */
        ExitRoomReply.prototype.gameList = $util.emptyArray;

        /**
         * ExitRoomReply totalRounds.
         * @member {number} totalRounds
         * @memberof base.ExitRoomReply
         * @instance
         */
        ExitRoomReply.prototype.totalRounds = 0;

        /**
         * Creates a new ExitRoomReply instance using the specified properties.
         * @function create
         * @memberof base.ExitRoomReply
         * @static
         * @param {base.IExitRoomReply=} [properties] Properties to set
         * @returns {base.ExitRoomReply} ExitRoomReply instance
         */
        ExitRoomReply.create = function create(properties) {
            return new ExitRoomReply(properties);
        };

        /**
         * Encodes the specified ExitRoomReply message. Does not implicitly {@link base.ExitRoomReply.verify|verify} messages.
         * @function encode
         * @memberof base.ExitRoomReply
         * @static
         * @param {base.IExitRoomReply} message ExitRoomReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExitRoomReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.roomId);
            if (message.exitReason != null && Object.hasOwnProperty.call(message, "exitReason"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.exitReason);
            if (message.gameList != null && message.gameList.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (let i = 0; i < message.gameList.length; ++i)
                    writer.int32(message.gameList[i]);
                writer.ldelim();
            }
            if (message.totalRounds != null && Object.hasOwnProperty.call(message, "totalRounds"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.totalRounds);
            return writer;
        };

        /**
         * Encodes the specified ExitRoomReply message, length delimited. Does not implicitly {@link base.ExitRoomReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.ExitRoomReply
         * @static
         * @param {base.IExitRoomReply} message ExitRoomReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExitRoomReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ExitRoomReply message from the specified reader or buffer.
         * @function decode
         * @memberof base.ExitRoomReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.ExitRoomReply} ExitRoomReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExitRoomReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.ExitRoomReply();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameId = reader.int32();
                    break;
                case 2:
                    message.roomId = reader.int32();
                    break;
                case 3:
                    message.exitReason = reader.int32();
                    break;
                case 4:
                    if (!(message.gameList && message.gameList.length))
                        message.gameList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.gameList.push(reader.int32());
                    } else
                        message.gameList.push(reader.int32());
                    break;
                case 5:
                    message.totalRounds = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ExitRoomReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.ExitRoomReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.ExitRoomReply} ExitRoomReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExitRoomReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ExitRoomReply message.
         * @function verify
         * @memberof base.ExitRoomReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ExitRoomReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isInteger(message.roomId))
                    return "roomId: integer expected";
            if (message.exitReason != null && message.hasOwnProperty("exitReason"))
                if (!$util.isInteger(message.exitReason))
                    return "exitReason: integer expected";
            if (message.gameList != null && message.hasOwnProperty("gameList")) {
                if (!Array.isArray(message.gameList))
                    return "gameList: array expected";
                for (let i = 0; i < message.gameList.length; ++i)
                    if (!$util.isInteger(message.gameList[i]))
                        return "gameList: integer[] expected";
            }
            if (message.totalRounds != null && message.hasOwnProperty("totalRounds"))
                if (!$util.isInteger(message.totalRounds))
                    return "totalRounds: integer expected";
            return null;
        };

        /**
         * Creates an ExitRoomReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.ExitRoomReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.ExitRoomReply} ExitRoomReply
         */
        ExitRoomReply.fromObject = function fromObject(object) {
            if (object instanceof $root.base.ExitRoomReply)
                return object;
            let message = new $root.base.ExitRoomReply();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.roomId != null)
                message.roomId = object.roomId | 0;
            if (object.exitReason != null)
                message.exitReason = object.exitReason | 0;
            if (object.gameList) {
                if (!Array.isArray(object.gameList))
                    throw TypeError(".base.ExitRoomReply.gameList: array expected");
                message.gameList = [];
                for (let i = 0; i < object.gameList.length; ++i)
                    message.gameList[i] = object.gameList[i] | 0;
            }
            if (object.totalRounds != null)
                message.totalRounds = object.totalRounds | 0;
            return message;
        };

        /**
         * Creates a plain object from an ExitRoomReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.ExitRoomReply
         * @static
         * @param {base.ExitRoomReply} message ExitRoomReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ExitRoomReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.gameList = [];
            if (options.defaults) {
                object.gameId = 0;
                object.roomId = 0;
                object.exitReason = 0;
                object.totalRounds = 0;
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.exitReason != null && message.hasOwnProperty("exitReason"))
                object.exitReason = message.exitReason;
            if (message.gameList && message.gameList.length) {
                object.gameList = [];
                for (let j = 0; j < message.gameList.length; ++j)
                    object.gameList[j] = message.gameList[j];
            }
            if (message.totalRounds != null && message.hasOwnProperty("totalRounds"))
                object.totalRounds = message.totalRounds;
            return object;
        };

        /**
         * Converts this ExitRoomReply to JSON.
         * @function toJSON
         * @memberof base.ExitRoomReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ExitRoomReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ExitRoomReply;
    })();

    /**
     * EXIT_REASON enum.
     * @name base.EXIT_REASON
     * @enum {number}
     * @property {number} EXIT_NONE=0 EXIT_NONE value
     * @property {number} EXIT_PLAYER=1 EXIT_PLAYER value
     * @property {number} EXIT_SWITCH=2 EXIT_SWITCH value
     * @property {number} EXIT_BALANCE=3 EXIT_BALANCE value
     * @property {number} EXIT_ERROR=4 EXIT_ERROR value
     * @property {number} EXIT_OFFLINE=5 EXIT_OFFLINE value
     * @property {number} EXIT_TIMEOUT=6 EXIT_TIMEOUT value
     * @property {number} EXIT_CLUB_FORBID=7 EXIT_CLUB_FORBID value
     * @property {number} EXIT_GAME_OVER=8 EXIT_GAME_OVER value
     * @property {number} EXIT_SERVER_MAINTAIN=9 EXIT_SERVER_MAINTAIN value
     */
    base.EXIT_REASON = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "EXIT_NONE"] = 0;
        values[valuesById[1] = "EXIT_PLAYER"] = 1;
        values[valuesById[2] = "EXIT_SWITCH"] = 2;
        values[valuesById[3] = "EXIT_BALANCE"] = 3;
        values[valuesById[4] = "EXIT_ERROR"] = 4;
        values[valuesById[5] = "EXIT_OFFLINE"] = 5;
        values[valuesById[6] = "EXIT_TIMEOUT"] = 6;
        values[valuesById[7] = "EXIT_CLUB_FORBID"] = 7;
        values[valuesById[8] = "EXIT_GAME_OVER"] = 8;
        values[valuesById[9] = "EXIT_SERVER_MAINTAIN"] = 9;
        return values;
    })();

    base.SwitchTableReq = (function() {

        /**
         * Properties of a SwitchTableReq.
         * @memberof base
         * @interface ISwitchTableReq
         * @property {number|null} [gameId] SwitchTableReq gameId
         * @property {number|null} [roomId] SwitchTableReq roomId
         */

        /**
         * Constructs a new SwitchTableReq.
         * @memberof base
         * @classdesc Represents a SwitchTableReq.
         * @implements ISwitchTableReq
         * @constructor
         * @param {base.ISwitchTableReq=} [properties] Properties to set
         */
        function SwitchTableReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SwitchTableReq gameId.
         * @member {number} gameId
         * @memberof base.SwitchTableReq
         * @instance
         */
        SwitchTableReq.prototype.gameId = 0;

        /**
         * SwitchTableReq roomId.
         * @member {number} roomId
         * @memberof base.SwitchTableReq
         * @instance
         */
        SwitchTableReq.prototype.roomId = 0;

        /**
         * Creates a new SwitchTableReq instance using the specified properties.
         * @function create
         * @memberof base.SwitchTableReq
         * @static
         * @param {base.ISwitchTableReq=} [properties] Properties to set
         * @returns {base.SwitchTableReq} SwitchTableReq instance
         */
        SwitchTableReq.create = function create(properties) {
            return new SwitchTableReq(properties);
        };

        /**
         * Encodes the specified SwitchTableReq message. Does not implicitly {@link base.SwitchTableReq.verify|verify} messages.
         * @function encode
         * @memberof base.SwitchTableReq
         * @static
         * @param {base.ISwitchTableReq} message SwitchTableReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SwitchTableReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.roomId);
            return writer;
        };

        /**
         * Encodes the specified SwitchTableReq message, length delimited. Does not implicitly {@link base.SwitchTableReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.SwitchTableReq
         * @static
         * @param {base.ISwitchTableReq} message SwitchTableReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SwitchTableReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SwitchTableReq message from the specified reader or buffer.
         * @function decode
         * @memberof base.SwitchTableReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.SwitchTableReq} SwitchTableReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SwitchTableReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.SwitchTableReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameId = reader.int32();
                    break;
                case 2:
                    message.roomId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SwitchTableReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.SwitchTableReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.SwitchTableReq} SwitchTableReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SwitchTableReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SwitchTableReq message.
         * @function verify
         * @memberof base.SwitchTableReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SwitchTableReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isInteger(message.roomId))
                    return "roomId: integer expected";
            return null;
        };

        /**
         * Creates a SwitchTableReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.SwitchTableReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.SwitchTableReq} SwitchTableReq
         */
        SwitchTableReq.fromObject = function fromObject(object) {
            if (object instanceof $root.base.SwitchTableReq)
                return object;
            let message = new $root.base.SwitchTableReq();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.roomId != null)
                message.roomId = object.roomId | 0;
            return message;
        };

        /**
         * Creates a plain object from a SwitchTableReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.SwitchTableReq
         * @static
         * @param {base.SwitchTableReq} message SwitchTableReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SwitchTableReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.gameId = 0;
                object.roomId = 0;
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            return object;
        };

        /**
         * Converts this SwitchTableReq to JSON.
         * @function toJSON
         * @memberof base.SwitchTableReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SwitchTableReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SwitchTableReq;
    })();

    /**
     * ROOM_TYPE enum.
     * @name base.ROOM_TYPE
     * @enum {number}
     * @property {number} NORMAL=0 NORMAL value
     * @property {number} IN_CLUB=1 IN_CLUB value
     */
    base.ROOM_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NORMAL"] = 0;
        values[valuesById[1] = "IN_CLUB"] = 1;
        return values;
    })();

    /**
     * MATCH_TYPE enum.
     * @name base.MATCH_TYPE
     * @enum {number}
     * @property {number} AUTO=0 AUTO value
     * @property {number} ENTER_TABLE=1 ENTER_TABLE value
     * @property {number} CREATE_TABLE=2 CREATE_TABLE value
     */
    base.MATCH_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "AUTO"] = 0;
        values[valuesById[1] = "ENTER_TABLE"] = 1;
        values[valuesById[2] = "CREATE_TABLE"] = 2;
        return values;
    })();

    /**
     * NOTIFY_TYPE enum.
     * @name base.NOTIFY_TYPE
     * @enum {number}
     * @property {number} NONE=0 NONE value
     * @property {number} INIT=1 INIT value
     * @property {number} UPDATE=2 UPDATE value
     * @property {number} DELETE=3 DELETE value
     */
    base.NOTIFY_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NONE"] = 0;
        values[valuesById[1] = "INIT"] = 1;
        values[valuesById[2] = "UPDATE"] = 2;
        values[valuesById[3] = "DELETE"] = 3;
        return values;
    })();

    base.TablePlayersEvent = (function() {

        /**
         * Properties of a TablePlayersEvent.
         * @memberof base
         * @interface ITablePlayersEvent
         * @property {number|null} [notifyType] TablePlayersEvent notifyType
         * @property {Array.<base.ISeatPlayer>|null} [tablePlayers] TablePlayersEvent tablePlayers
         */

        /**
         * Constructs a new TablePlayersEvent.
         * @memberof base
         * @classdesc Represents a TablePlayersEvent.
         * @implements ITablePlayersEvent
         * @constructor
         * @param {base.ITablePlayersEvent=} [properties] Properties to set
         */
        function TablePlayersEvent(properties) {
            this.tablePlayers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TablePlayersEvent notifyType.
         * @member {number} notifyType
         * @memberof base.TablePlayersEvent
         * @instance
         */
        TablePlayersEvent.prototype.notifyType = 0;

        /**
         * TablePlayersEvent tablePlayers.
         * @member {Array.<base.ISeatPlayer>} tablePlayers
         * @memberof base.TablePlayersEvent
         * @instance
         */
        TablePlayersEvent.prototype.tablePlayers = $util.emptyArray;

        /**
         * Creates a new TablePlayersEvent instance using the specified properties.
         * @function create
         * @memberof base.TablePlayersEvent
         * @static
         * @param {base.ITablePlayersEvent=} [properties] Properties to set
         * @returns {base.TablePlayersEvent} TablePlayersEvent instance
         */
        TablePlayersEvent.create = function create(properties) {
            return new TablePlayersEvent(properties);
        };

        /**
         * Encodes the specified TablePlayersEvent message. Does not implicitly {@link base.TablePlayersEvent.verify|verify} messages.
         * @function encode
         * @memberof base.TablePlayersEvent
         * @static
         * @param {base.ITablePlayersEvent} message TablePlayersEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TablePlayersEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.notifyType != null && Object.hasOwnProperty.call(message, "notifyType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.notifyType);
            if (message.tablePlayers != null && message.tablePlayers.length)
                for (let i = 0; i < message.tablePlayers.length; ++i)
                    $root.base.SeatPlayer.encode(message.tablePlayers[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TablePlayersEvent message, length delimited. Does not implicitly {@link base.TablePlayersEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.TablePlayersEvent
         * @static
         * @param {base.ITablePlayersEvent} message TablePlayersEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TablePlayersEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TablePlayersEvent message from the specified reader or buffer.
         * @function decode
         * @memberof base.TablePlayersEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.TablePlayersEvent} TablePlayersEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TablePlayersEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.TablePlayersEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.notifyType = reader.int32();
                    break;
                case 2:
                    if (!(message.tablePlayers && message.tablePlayers.length))
                        message.tablePlayers = [];
                    message.tablePlayers.push($root.base.SeatPlayer.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TablePlayersEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.TablePlayersEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.TablePlayersEvent} TablePlayersEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TablePlayersEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TablePlayersEvent message.
         * @function verify
         * @memberof base.TablePlayersEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TablePlayersEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.notifyType != null && message.hasOwnProperty("notifyType"))
                if (!$util.isInteger(message.notifyType))
                    return "notifyType: integer expected";
            if (message.tablePlayers != null && message.hasOwnProperty("tablePlayers")) {
                if (!Array.isArray(message.tablePlayers))
                    return "tablePlayers: array expected";
                for (let i = 0; i < message.tablePlayers.length; ++i) {
                    let error = $root.base.SeatPlayer.verify(message.tablePlayers[i]);
                    if (error)
                        return "tablePlayers." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TablePlayersEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.TablePlayersEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.TablePlayersEvent} TablePlayersEvent
         */
        TablePlayersEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.base.TablePlayersEvent)
                return object;
            let message = new $root.base.TablePlayersEvent();
            if (object.notifyType != null)
                message.notifyType = object.notifyType | 0;
            if (object.tablePlayers) {
                if (!Array.isArray(object.tablePlayers))
                    throw TypeError(".base.TablePlayersEvent.tablePlayers: array expected");
                message.tablePlayers = [];
                for (let i = 0; i < object.tablePlayers.length; ++i) {
                    if (typeof object.tablePlayers[i] !== "object")
                        throw TypeError(".base.TablePlayersEvent.tablePlayers: object expected");
                    message.tablePlayers[i] = $root.base.SeatPlayer.fromObject(object.tablePlayers[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TablePlayersEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.TablePlayersEvent
         * @static
         * @param {base.TablePlayersEvent} message TablePlayersEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TablePlayersEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.tablePlayers = [];
            if (options.defaults)
                object.notifyType = 0;
            if (message.notifyType != null && message.hasOwnProperty("notifyType"))
                object.notifyType = message.notifyType;
            if (message.tablePlayers && message.tablePlayers.length) {
                object.tablePlayers = [];
                for (let j = 0; j < message.tablePlayers.length; ++j)
                    object.tablePlayers[j] = $root.base.SeatPlayer.toObject(message.tablePlayers[j], options);
            }
            return object;
        };

        /**
         * Converts this TablePlayersEvent to JSON.
         * @function toJSON
         * @memberof base.TablePlayersEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TablePlayersEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TablePlayersEvent;
    })();

    base.SeatPlayer = (function() {

        /**
         * Properties of a SeatPlayer.
         * @memberof base
         * @interface ISeatPlayer
         * @property {number|null} [seat] SeatPlayer seat
         * @property {base.IPlayerBaseInfo|null} [baseInfo] SeatPlayer baseInfo
         * @property {boolean|null} [online] SeatPlayer online
         * @property {number|null} [balance] SeatPlayer balance
         * @property {boolean|null} [ready] SeatPlayer ready
         * @property {boolean|null} [open] SeatPlayer open
         */

        /**
         * Constructs a new SeatPlayer.
         * @memberof base
         * @classdesc Represents a SeatPlayer.
         * @implements ISeatPlayer
         * @constructor
         * @param {base.ISeatPlayer=} [properties] Properties to set
         */
        function SeatPlayer(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SeatPlayer seat.
         * @member {number} seat
         * @memberof base.SeatPlayer
         * @instance
         */
        SeatPlayer.prototype.seat = 0;

        /**
         * SeatPlayer baseInfo.
         * @member {base.IPlayerBaseInfo|null|undefined} baseInfo
         * @memberof base.SeatPlayer
         * @instance
         */
        SeatPlayer.prototype.baseInfo = null;

        /**
         * SeatPlayer online.
         * @member {boolean} online
         * @memberof base.SeatPlayer
         * @instance
         */
        SeatPlayer.prototype.online = false;

        /**
         * SeatPlayer balance.
         * @member {number} balance
         * @memberof base.SeatPlayer
         * @instance
         */
        SeatPlayer.prototype.balance = 0;

        /**
         * SeatPlayer ready.
         * @member {boolean} ready
         * @memberof base.SeatPlayer
         * @instance
         */
        SeatPlayer.prototype.ready = false;

        /**
         * SeatPlayer open.
         * @member {boolean} open
         * @memberof base.SeatPlayer
         * @instance
         */
        SeatPlayer.prototype.open = false;

        /**
         * Creates a new SeatPlayer instance using the specified properties.
         * @function create
         * @memberof base.SeatPlayer
         * @static
         * @param {base.ISeatPlayer=} [properties] Properties to set
         * @returns {base.SeatPlayer} SeatPlayer instance
         */
        SeatPlayer.create = function create(properties) {
            return new SeatPlayer(properties);
        };

        /**
         * Encodes the specified SeatPlayer message. Does not implicitly {@link base.SeatPlayer.verify|verify} messages.
         * @function encode
         * @memberof base.SeatPlayer
         * @static
         * @param {base.ISeatPlayer} message SeatPlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatPlayer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            if (message.baseInfo != null && Object.hasOwnProperty.call(message, "baseInfo"))
                $root.base.PlayerBaseInfo.encode(message.baseInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.online != null && Object.hasOwnProperty.call(message, "online"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.online);
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.balance);
            if (message.ready != null && Object.hasOwnProperty.call(message, "ready"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.ready);
            if (message.open != null && Object.hasOwnProperty.call(message, "open"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.open);
            return writer;
        };

        /**
         * Encodes the specified SeatPlayer message, length delimited. Does not implicitly {@link base.SeatPlayer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.SeatPlayer
         * @static
         * @param {base.ISeatPlayer} message SeatPlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatPlayer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeatPlayer message from the specified reader or buffer.
         * @function decode
         * @memberof base.SeatPlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.SeatPlayer} SeatPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatPlayer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.SeatPlayer();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat = reader.int32();
                    break;
                case 2:
                    message.baseInfo = $root.base.PlayerBaseInfo.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.online = reader.bool();
                    break;
                case 4:
                    message.balance = reader.int32();
                    break;
                case 5:
                    message.ready = reader.bool();
                    break;
                case 6:
                    message.open = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SeatPlayer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.SeatPlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.SeatPlayer} SeatPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatPlayer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SeatPlayer message.
         * @function verify
         * @memberof base.SeatPlayer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SeatPlayer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            if (message.baseInfo != null && message.hasOwnProperty("baseInfo")) {
                let error = $root.base.PlayerBaseInfo.verify(message.baseInfo);
                if (error)
                    return "baseInfo." + error;
            }
            if (message.online != null && message.hasOwnProperty("online"))
                if (typeof message.online !== "boolean")
                    return "online: boolean expected";
            if (message.balance != null && message.hasOwnProperty("balance"))
                if (!$util.isInteger(message.balance))
                    return "balance: integer expected";
            if (message.ready != null && message.hasOwnProperty("ready"))
                if (typeof message.ready !== "boolean")
                    return "ready: boolean expected";
            if (message.open != null && message.hasOwnProperty("open"))
                if (typeof message.open !== "boolean")
                    return "open: boolean expected";
            return null;
        };

        /**
         * Creates a SeatPlayer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.SeatPlayer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.SeatPlayer} SeatPlayer
         */
        SeatPlayer.fromObject = function fromObject(object) {
            if (object instanceof $root.base.SeatPlayer)
                return object;
            let message = new $root.base.SeatPlayer();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.baseInfo != null) {
                if (typeof object.baseInfo !== "object")
                    throw TypeError(".base.SeatPlayer.baseInfo: object expected");
                message.baseInfo = $root.base.PlayerBaseInfo.fromObject(object.baseInfo);
            }
            if (object.online != null)
                message.online = Boolean(object.online);
            if (object.balance != null)
                message.balance = object.balance | 0;
            if (object.ready != null)
                message.ready = Boolean(object.ready);
            if (object.open != null)
                message.open = Boolean(object.open);
            return message;
        };

        /**
         * Creates a plain object from a SeatPlayer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.SeatPlayer
         * @static
         * @param {base.SeatPlayer} message SeatPlayer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeatPlayer.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seat = 0;
                object.baseInfo = null;
                object.online = false;
                object.balance = 0;
                object.ready = false;
                object.open = false;
            }
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.baseInfo != null && message.hasOwnProperty("baseInfo"))
                object.baseInfo = $root.base.PlayerBaseInfo.toObject(message.baseInfo, options);
            if (message.online != null && message.hasOwnProperty("online"))
                object.online = message.online;
            if (message.balance != null && message.hasOwnProperty("balance"))
                object.balance = message.balance;
            if (message.ready != null && message.hasOwnProperty("ready"))
                object.ready = message.ready;
            if (message.open != null && message.hasOwnProperty("open"))
                object.open = message.open;
            return object;
        };

        /**
         * Converts this SeatPlayer to JSON.
         * @function toJSON
         * @memberof base.SeatPlayer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeatPlayer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeatPlayer;
    })();

    /**
     * SEAT enum.
     * @name base.SEAT
     * @enum {number}
     * @property {number} SEAT_NONE=0 SEAT_NONE value
     * @property {number} SEAT_1=1 SEAT_1 value
     * @property {number} SEAT_2=2 SEAT_2 value
     * @property {number} SEAT_3=3 SEAT_3 value
     * @property {number} SEAT_4=4 SEAT_4 value
     * @property {number} SEAT_5=5 SEAT_5 value
     * @property {number} SEAT_6=6 SEAT_6 value
     */
    base.SEAT = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SEAT_NONE"] = 0;
        values[valuesById[1] = "SEAT_1"] = 1;
        values[valuesById[2] = "SEAT_2"] = 2;
        values[valuesById[3] = "SEAT_3"] = 3;
        values[valuesById[4] = "SEAT_4"] = 4;
        values[valuesById[5] = "SEAT_5"] = 5;
        values[valuesById[6] = "SEAT_6"] = 6;
        return values;
    })();

    base.TableTimeEvent = (function() {

        /**
         * Properties of a TableTimeEvent.
         * @memberof base
         * @interface ITableTimeEvent
         * @property {number|null} [round] TableTimeEvent round
         * @property {Array.<base.ISeatDeadline>|null} [tableDeadlines] TableTimeEvent tableDeadlines
         * @property {number|null} [curBet] TableTimeEvent curBet
         */

        /**
         * Constructs a new TableTimeEvent.
         * @memberof base
         * @classdesc Represents a TableTimeEvent.
         * @implements ITableTimeEvent
         * @constructor
         * @param {base.ITableTimeEvent=} [properties] Properties to set
         */
        function TableTimeEvent(properties) {
            this.tableDeadlines = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TableTimeEvent round.
         * @member {number} round
         * @memberof base.TableTimeEvent
         * @instance
         */
        TableTimeEvent.prototype.round = 0;

        /**
         * TableTimeEvent tableDeadlines.
         * @member {Array.<base.ISeatDeadline>} tableDeadlines
         * @memberof base.TableTimeEvent
         * @instance
         */
        TableTimeEvent.prototype.tableDeadlines = $util.emptyArray;

        /**
         * TableTimeEvent curBet.
         * @member {number} curBet
         * @memberof base.TableTimeEvent
         * @instance
         */
        TableTimeEvent.prototype.curBet = 0;

        /**
         * Creates a new TableTimeEvent instance using the specified properties.
         * @function create
         * @memberof base.TableTimeEvent
         * @static
         * @param {base.ITableTimeEvent=} [properties] Properties to set
         * @returns {base.TableTimeEvent} TableTimeEvent instance
         */
        TableTimeEvent.create = function create(properties) {
            return new TableTimeEvent(properties);
        };

        /**
         * Encodes the specified TableTimeEvent message. Does not implicitly {@link base.TableTimeEvent.verify|verify} messages.
         * @function encode
         * @memberof base.TableTimeEvent
         * @static
         * @param {base.ITableTimeEvent} message TableTimeEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableTimeEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.round != null && Object.hasOwnProperty.call(message, "round"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.round);
            if (message.tableDeadlines != null && message.tableDeadlines.length)
                for (let i = 0; i < message.tableDeadlines.length; ++i)
                    $root.base.SeatDeadline.encode(message.tableDeadlines[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.curBet != null && Object.hasOwnProperty.call(message, "curBet"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.curBet);
            return writer;
        };

        /**
         * Encodes the specified TableTimeEvent message, length delimited. Does not implicitly {@link base.TableTimeEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.TableTimeEvent
         * @static
         * @param {base.ITableTimeEvent} message TableTimeEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableTimeEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TableTimeEvent message from the specified reader or buffer.
         * @function decode
         * @memberof base.TableTimeEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.TableTimeEvent} TableTimeEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableTimeEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.TableTimeEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.round = reader.int32();
                    break;
                case 2:
                    if (!(message.tableDeadlines && message.tableDeadlines.length))
                        message.tableDeadlines = [];
                    message.tableDeadlines.push($root.base.SeatDeadline.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.curBet = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TableTimeEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.TableTimeEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.TableTimeEvent} TableTimeEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableTimeEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TableTimeEvent message.
         * @function verify
         * @memberof base.TableTimeEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TableTimeEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.round != null && message.hasOwnProperty("round"))
                if (!$util.isInteger(message.round))
                    return "round: integer expected";
            if (message.tableDeadlines != null && message.hasOwnProperty("tableDeadlines")) {
                if (!Array.isArray(message.tableDeadlines))
                    return "tableDeadlines: array expected";
                for (let i = 0; i < message.tableDeadlines.length; ++i) {
                    let error = $root.base.SeatDeadline.verify(message.tableDeadlines[i]);
                    if (error)
                        return "tableDeadlines." + error;
                }
            }
            if (message.curBet != null && message.hasOwnProperty("curBet"))
                if (!$util.isInteger(message.curBet))
                    return "curBet: integer expected";
            return null;
        };

        /**
         * Creates a TableTimeEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.TableTimeEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.TableTimeEvent} TableTimeEvent
         */
        TableTimeEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.base.TableTimeEvent)
                return object;
            let message = new $root.base.TableTimeEvent();
            if (object.round != null)
                message.round = object.round | 0;
            if (object.tableDeadlines) {
                if (!Array.isArray(object.tableDeadlines))
                    throw TypeError(".base.TableTimeEvent.tableDeadlines: array expected");
                message.tableDeadlines = [];
                for (let i = 0; i < object.tableDeadlines.length; ++i) {
                    if (typeof object.tableDeadlines[i] !== "object")
                        throw TypeError(".base.TableTimeEvent.tableDeadlines: object expected");
                    message.tableDeadlines[i] = $root.base.SeatDeadline.fromObject(object.tableDeadlines[i]);
                }
            }
            if (object.curBet != null)
                message.curBet = object.curBet | 0;
            return message;
        };

        /**
         * Creates a plain object from a TableTimeEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.TableTimeEvent
         * @static
         * @param {base.TableTimeEvent} message TableTimeEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TableTimeEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.tableDeadlines = [];
            if (options.defaults) {
                object.round = 0;
                object.curBet = 0;
            }
            if (message.round != null && message.hasOwnProperty("round"))
                object.round = message.round;
            if (message.tableDeadlines && message.tableDeadlines.length) {
                object.tableDeadlines = [];
                for (let j = 0; j < message.tableDeadlines.length; ++j)
                    object.tableDeadlines[j] = $root.base.SeatDeadline.toObject(message.tableDeadlines[j], options);
            }
            if (message.curBet != null && message.hasOwnProperty("curBet"))
                object.curBet = message.curBet;
            return object;
        };

        /**
         * Converts this TableTimeEvent to JSON.
         * @function toJSON
         * @memberof base.TableTimeEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TableTimeEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TableTimeEvent;
    })();

    base.SeatDeadline = (function() {

        /**
         * Properties of a SeatDeadline.
         * @memberof base
         * @interface ISeatDeadline
         * @property {number|null} [type] SeatDeadline type
         * @property {number|null} [seat] SeatDeadline seat
         * @property {number|Long|null} [startTime] SeatDeadline startTime
         * @property {number|null} [seconds] SeatDeadline seconds
         */

        /**
         * Constructs a new SeatDeadline.
         * @memberof base
         * @classdesc Represents a SeatDeadline.
         * @implements ISeatDeadline
         * @constructor
         * @param {base.ISeatDeadline=} [properties] Properties to set
         */
        function SeatDeadline(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SeatDeadline type.
         * @member {number} type
         * @memberof base.SeatDeadline
         * @instance
         */
        SeatDeadline.prototype.type = 0;

        /**
         * SeatDeadline seat.
         * @member {number} seat
         * @memberof base.SeatDeadline
         * @instance
         */
        SeatDeadline.prototype.seat = 0;

        /**
         * SeatDeadline startTime.
         * @member {number|Long} startTime
         * @memberof base.SeatDeadline
         * @instance
         */
        SeatDeadline.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SeatDeadline seconds.
         * @member {number} seconds
         * @memberof base.SeatDeadline
         * @instance
         */
        SeatDeadline.prototype.seconds = 0;

        /**
         * Creates a new SeatDeadline instance using the specified properties.
         * @function create
         * @memberof base.SeatDeadline
         * @static
         * @param {base.ISeatDeadline=} [properties] Properties to set
         * @returns {base.SeatDeadline} SeatDeadline instance
         */
        SeatDeadline.create = function create(properties) {
            return new SeatDeadline(properties);
        };

        /**
         * Encodes the specified SeatDeadline message. Does not implicitly {@link base.SeatDeadline.verify|verify} messages.
         * @function encode
         * @memberof base.SeatDeadline
         * @static
         * @param {base.ISeatDeadline} message SeatDeadline message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatDeadline.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.seat);
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.startTime);
            if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.seconds);
            return writer;
        };

        /**
         * Encodes the specified SeatDeadline message, length delimited. Does not implicitly {@link base.SeatDeadline.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.SeatDeadline
         * @static
         * @param {base.ISeatDeadline} message SeatDeadline message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatDeadline.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeatDeadline message from the specified reader or buffer.
         * @function decode
         * @memberof base.SeatDeadline
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.SeatDeadline} SeatDeadline
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatDeadline.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.SeatDeadline();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.seat = reader.int32();
                    break;
                case 3:
                    message.startTime = reader.int64();
                    break;
                case 4:
                    message.seconds = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SeatDeadline message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.SeatDeadline
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.SeatDeadline} SeatDeadline
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatDeadline.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SeatDeadline message.
         * @function verify
         * @memberof base.SeatDeadline
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SeatDeadline.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (!$util.isInteger(message.startTime) && !(message.startTime && $util.isInteger(message.startTime.low) && $util.isInteger(message.startTime.high)))
                    return "startTime: integer|Long expected";
            if (message.seconds != null && message.hasOwnProperty("seconds"))
                if (!$util.isInteger(message.seconds))
                    return "seconds: integer expected";
            return null;
        };

        /**
         * Creates a SeatDeadline message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.SeatDeadline
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.SeatDeadline} SeatDeadline
         */
        SeatDeadline.fromObject = function fromObject(object) {
            if (object instanceof $root.base.SeatDeadline)
                return object;
            let message = new $root.base.SeatDeadline();
            if (object.type != null)
                message.type = object.type | 0;
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.startTime != null)
                if ($util.Long)
                    (message.startTime = $util.Long.fromValue(object.startTime)).unsigned = false;
                else if (typeof object.startTime === "string")
                    message.startTime = parseInt(object.startTime, 10);
                else if (typeof object.startTime === "number")
                    message.startTime = object.startTime;
                else if (typeof object.startTime === "object")
                    message.startTime = new $util.LongBits(object.startTime.low >>> 0, object.startTime.high >>> 0).toNumber();
            if (object.seconds != null)
                message.seconds = object.seconds | 0;
            return message;
        };

        /**
         * Creates a plain object from a SeatDeadline message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.SeatDeadline
         * @static
         * @param {base.SeatDeadline} message SeatDeadline
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeatDeadline.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = 0;
                object.seat = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.startTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.startTime = options.longs === String ? "0" : 0;
                object.seconds = 0;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (typeof message.startTime === "number")
                    object.startTime = options.longs === String ? String(message.startTime) : message.startTime;
                else
                    object.startTime = options.longs === String ? $util.Long.prototype.toString.call(message.startTime) : options.longs === Number ? new $util.LongBits(message.startTime.low >>> 0, message.startTime.high >>> 0).toNumber() : message.startTime;
            if (message.seconds != null && message.hasOwnProperty("seconds"))
                object.seconds = message.seconds;
            return object;
        };

        /**
         * Converts this SeatDeadline to JSON.
         * @function toJSON
         * @memberof base.SeatDeadline
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeatDeadline.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeatDeadline;
    })();

    base.GameBalanceEvent = (function() {

        /**
         * Properties of a GameBalanceEvent.
         * @memberof base
         * @interface IGameBalanceEvent
         * @property {number|null} [balance] GameBalanceEvent balance
         * @property {string|null} [changed] GameBalanceEvent changed
         * @property {number|null} [updateType] GameBalanceEvent updateType
         */

        /**
         * Constructs a new GameBalanceEvent.
         * @memberof base
         * @classdesc Represents a GameBalanceEvent.
         * @implements IGameBalanceEvent
         * @constructor
         * @param {base.IGameBalanceEvent=} [properties] Properties to set
         */
        function GameBalanceEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameBalanceEvent balance.
         * @member {number} balance
         * @memberof base.GameBalanceEvent
         * @instance
         */
        GameBalanceEvent.prototype.balance = 0;

        /**
         * GameBalanceEvent changed.
         * @member {string} changed
         * @memberof base.GameBalanceEvent
         * @instance
         */
        GameBalanceEvent.prototype.changed = "";

        /**
         * GameBalanceEvent updateType.
         * @member {number} updateType
         * @memberof base.GameBalanceEvent
         * @instance
         */
        GameBalanceEvent.prototype.updateType = 0;

        /**
         * Creates a new GameBalanceEvent instance using the specified properties.
         * @function create
         * @memberof base.GameBalanceEvent
         * @static
         * @param {base.IGameBalanceEvent=} [properties] Properties to set
         * @returns {base.GameBalanceEvent} GameBalanceEvent instance
         */
        GameBalanceEvent.create = function create(properties) {
            return new GameBalanceEvent(properties);
        };

        /**
         * Encodes the specified GameBalanceEvent message. Does not implicitly {@link base.GameBalanceEvent.verify|verify} messages.
         * @function encode
         * @memberof base.GameBalanceEvent
         * @static
         * @param {base.IGameBalanceEvent} message GameBalanceEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameBalanceEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.balance);
            if (message.changed != null && Object.hasOwnProperty.call(message, "changed"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.changed);
            if (message.updateType != null && Object.hasOwnProperty.call(message, "updateType"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.updateType);
            return writer;
        };

        /**
         * Encodes the specified GameBalanceEvent message, length delimited. Does not implicitly {@link base.GameBalanceEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.GameBalanceEvent
         * @static
         * @param {base.IGameBalanceEvent} message GameBalanceEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameBalanceEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameBalanceEvent message from the specified reader or buffer.
         * @function decode
         * @memberof base.GameBalanceEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.GameBalanceEvent} GameBalanceEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameBalanceEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.GameBalanceEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.balance = reader.int32();
                    break;
                case 2:
                    message.changed = reader.string();
                    break;
                case 3:
                    message.updateType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameBalanceEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.GameBalanceEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.GameBalanceEvent} GameBalanceEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameBalanceEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameBalanceEvent message.
         * @function verify
         * @memberof base.GameBalanceEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameBalanceEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.balance != null && message.hasOwnProperty("balance"))
                if (!$util.isInteger(message.balance))
                    return "balance: integer expected";
            if (message.changed != null && message.hasOwnProperty("changed"))
                if (!$util.isString(message.changed))
                    return "changed: string expected";
            if (message.updateType != null && message.hasOwnProperty("updateType"))
                if (!$util.isInteger(message.updateType))
                    return "updateType: integer expected";
            return null;
        };

        /**
         * Creates a GameBalanceEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.GameBalanceEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.GameBalanceEvent} GameBalanceEvent
         */
        GameBalanceEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.base.GameBalanceEvent)
                return object;
            let message = new $root.base.GameBalanceEvent();
            if (object.balance != null)
                message.balance = object.balance | 0;
            if (object.changed != null)
                message.changed = String(object.changed);
            if (object.updateType != null)
                message.updateType = object.updateType | 0;
            return message;
        };

        /**
         * Creates a plain object from a GameBalanceEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.GameBalanceEvent
         * @static
         * @param {base.GameBalanceEvent} message GameBalanceEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameBalanceEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.balance = 0;
                object.changed = "";
                object.updateType = 0;
            }
            if (message.balance != null && message.hasOwnProperty("balance"))
                object.balance = message.balance;
            if (message.changed != null && message.hasOwnProperty("changed"))
                object.changed = message.changed;
            if (message.updateType != null && message.hasOwnProperty("updateType"))
                object.updateType = message.updateType;
            return object;
        };

        /**
         * Converts this GameBalanceEvent to JSON.
         * @function toJSON
         * @memberof base.GameBalanceEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameBalanceEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameBalanceEvent;
    })();

    base.ChatExpressionReq = (function() {

        /**
         * Properties of a ChatExpressionReq.
         * @memberof base
         * @interface IChatExpressionReq
         * @property {number|null} [seat] ChatExpressionReq seat
         * @property {number|null} [expression] ChatExpressionReq expression
         */

        /**
         * Constructs a new ChatExpressionReq.
         * @memberof base
         * @classdesc Represents a ChatExpressionReq.
         * @implements IChatExpressionReq
         * @constructor
         * @param {base.IChatExpressionReq=} [properties] Properties to set
         */
        function ChatExpressionReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChatExpressionReq seat.
         * @member {number} seat
         * @memberof base.ChatExpressionReq
         * @instance
         */
        ChatExpressionReq.prototype.seat = 0;

        /**
         * ChatExpressionReq expression.
         * @member {number} expression
         * @memberof base.ChatExpressionReq
         * @instance
         */
        ChatExpressionReq.prototype.expression = 0;

        /**
         * Creates a new ChatExpressionReq instance using the specified properties.
         * @function create
         * @memberof base.ChatExpressionReq
         * @static
         * @param {base.IChatExpressionReq=} [properties] Properties to set
         * @returns {base.ChatExpressionReq} ChatExpressionReq instance
         */
        ChatExpressionReq.create = function create(properties) {
            return new ChatExpressionReq(properties);
        };

        /**
         * Encodes the specified ChatExpressionReq message. Does not implicitly {@link base.ChatExpressionReq.verify|verify} messages.
         * @function encode
         * @memberof base.ChatExpressionReq
         * @static
         * @param {base.IChatExpressionReq} message ChatExpressionReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatExpressionReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            if (message.expression != null && Object.hasOwnProperty.call(message, "expression"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.expression);
            return writer;
        };

        /**
         * Encodes the specified ChatExpressionReq message, length delimited. Does not implicitly {@link base.ChatExpressionReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.ChatExpressionReq
         * @static
         * @param {base.IChatExpressionReq} message ChatExpressionReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatExpressionReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChatExpressionReq message from the specified reader or buffer.
         * @function decode
         * @memberof base.ChatExpressionReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.ChatExpressionReq} ChatExpressionReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatExpressionReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.ChatExpressionReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat = reader.int32();
                    break;
                case 2:
                    message.expression = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChatExpressionReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.ChatExpressionReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.ChatExpressionReq} ChatExpressionReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatExpressionReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChatExpressionReq message.
         * @function verify
         * @memberof base.ChatExpressionReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChatExpressionReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            if (message.expression != null && message.hasOwnProperty("expression"))
                if (!$util.isInteger(message.expression))
                    return "expression: integer expected";
            return null;
        };

        /**
         * Creates a ChatExpressionReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.ChatExpressionReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.ChatExpressionReq} ChatExpressionReq
         */
        ChatExpressionReq.fromObject = function fromObject(object) {
            if (object instanceof $root.base.ChatExpressionReq)
                return object;
            let message = new $root.base.ChatExpressionReq();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.expression != null)
                message.expression = object.expression | 0;
            return message;
        };

        /**
         * Creates a plain object from a ChatExpressionReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.ChatExpressionReq
         * @static
         * @param {base.ChatExpressionReq} message ChatExpressionReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChatExpressionReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seat = 0;
                object.expression = 0;
            }
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.expression != null && message.hasOwnProperty("expression"))
                object.expression = message.expression;
            return object;
        };

        /**
         * Converts this ChatExpressionReq to JSON.
         * @function toJSON
         * @memberof base.ChatExpressionReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChatExpressionReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ChatExpressionReq;
    })();

    base.ChatExpressionEvent = (function() {

        /**
         * Properties of a ChatExpressionEvent.
         * @memberof base
         * @interface IChatExpressionEvent
         * @property {number|null} [fromSeat] ChatExpressionEvent fromSeat
         * @property {number|null} [toSeat] ChatExpressionEvent toSeat
         * @property {number|null} [expression] ChatExpressionEvent expression
         */

        /**
         * Constructs a new ChatExpressionEvent.
         * @memberof base
         * @classdesc Represents a ChatExpressionEvent.
         * @implements IChatExpressionEvent
         * @constructor
         * @param {base.IChatExpressionEvent=} [properties] Properties to set
         */
        function ChatExpressionEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChatExpressionEvent fromSeat.
         * @member {number} fromSeat
         * @memberof base.ChatExpressionEvent
         * @instance
         */
        ChatExpressionEvent.prototype.fromSeat = 0;

        /**
         * ChatExpressionEvent toSeat.
         * @member {number} toSeat
         * @memberof base.ChatExpressionEvent
         * @instance
         */
        ChatExpressionEvent.prototype.toSeat = 0;

        /**
         * ChatExpressionEvent expression.
         * @member {number} expression
         * @memberof base.ChatExpressionEvent
         * @instance
         */
        ChatExpressionEvent.prototype.expression = 0;

        /**
         * Creates a new ChatExpressionEvent instance using the specified properties.
         * @function create
         * @memberof base.ChatExpressionEvent
         * @static
         * @param {base.IChatExpressionEvent=} [properties] Properties to set
         * @returns {base.ChatExpressionEvent} ChatExpressionEvent instance
         */
        ChatExpressionEvent.create = function create(properties) {
            return new ChatExpressionEvent(properties);
        };

        /**
         * Encodes the specified ChatExpressionEvent message. Does not implicitly {@link base.ChatExpressionEvent.verify|verify} messages.
         * @function encode
         * @memberof base.ChatExpressionEvent
         * @static
         * @param {base.IChatExpressionEvent} message ChatExpressionEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatExpressionEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.fromSeat != null && Object.hasOwnProperty.call(message, "fromSeat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.fromSeat);
            if (message.toSeat != null && Object.hasOwnProperty.call(message, "toSeat"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.toSeat);
            if (message.expression != null && Object.hasOwnProperty.call(message, "expression"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.expression);
            return writer;
        };

        /**
         * Encodes the specified ChatExpressionEvent message, length delimited. Does not implicitly {@link base.ChatExpressionEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.ChatExpressionEvent
         * @static
         * @param {base.IChatExpressionEvent} message ChatExpressionEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatExpressionEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChatExpressionEvent message from the specified reader or buffer.
         * @function decode
         * @memberof base.ChatExpressionEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.ChatExpressionEvent} ChatExpressionEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatExpressionEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.ChatExpressionEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.fromSeat = reader.int32();
                    break;
                case 2:
                    message.toSeat = reader.int32();
                    break;
                case 3:
                    message.expression = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChatExpressionEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.ChatExpressionEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.ChatExpressionEvent} ChatExpressionEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatExpressionEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChatExpressionEvent message.
         * @function verify
         * @memberof base.ChatExpressionEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChatExpressionEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.fromSeat != null && message.hasOwnProperty("fromSeat"))
                if (!$util.isInteger(message.fromSeat))
                    return "fromSeat: integer expected";
            if (message.toSeat != null && message.hasOwnProperty("toSeat"))
                if (!$util.isInteger(message.toSeat))
                    return "toSeat: integer expected";
            if (message.expression != null && message.hasOwnProperty("expression"))
                if (!$util.isInteger(message.expression))
                    return "expression: integer expected";
            return null;
        };

        /**
         * Creates a ChatExpressionEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.ChatExpressionEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.ChatExpressionEvent} ChatExpressionEvent
         */
        ChatExpressionEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.base.ChatExpressionEvent)
                return object;
            let message = new $root.base.ChatExpressionEvent();
            if (object.fromSeat != null)
                message.fromSeat = object.fromSeat | 0;
            if (object.toSeat != null)
                message.toSeat = object.toSeat | 0;
            if (object.expression != null)
                message.expression = object.expression | 0;
            return message;
        };

        /**
         * Creates a plain object from a ChatExpressionEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.ChatExpressionEvent
         * @static
         * @param {base.ChatExpressionEvent} message ChatExpressionEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChatExpressionEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.fromSeat = 0;
                object.toSeat = 0;
                object.expression = 0;
            }
            if (message.fromSeat != null && message.hasOwnProperty("fromSeat"))
                object.fromSeat = message.fromSeat;
            if (message.toSeat != null && message.hasOwnProperty("toSeat"))
                object.toSeat = message.toSeat;
            if (message.expression != null && message.hasOwnProperty("expression"))
                object.expression = message.expression;
            return object;
        };

        /**
         * Converts this ChatExpressionEvent to JSON.
         * @function toJSON
         * @memberof base.ChatExpressionEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChatExpressionEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ChatExpressionEvent;
    })();

    base.ChatVoiceReq = (function() {

        /**
         * Properties of a ChatVoiceReq.
         * @memberof base
         * @interface IChatVoiceReq
         * @property {number|null} [seat] ChatVoiceReq seat
         * @property {string|null} [content] ChatVoiceReq content
         * @property {number|null} [time] ChatVoiceReq time
         */

        /**
         * Constructs a new ChatVoiceReq.
         * @memberof base
         * @classdesc Represents a ChatVoiceReq.
         * @implements IChatVoiceReq
         * @constructor
         * @param {base.IChatVoiceReq=} [properties] Properties to set
         */
        function ChatVoiceReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChatVoiceReq seat.
         * @member {number} seat
         * @memberof base.ChatVoiceReq
         * @instance
         */
        ChatVoiceReq.prototype.seat = 0;

        /**
         * ChatVoiceReq content.
         * @member {string} content
         * @memberof base.ChatVoiceReq
         * @instance
         */
        ChatVoiceReq.prototype.content = "";

        /**
         * ChatVoiceReq time.
         * @member {number} time
         * @memberof base.ChatVoiceReq
         * @instance
         */
        ChatVoiceReq.prototype.time = 0;

        /**
         * Creates a new ChatVoiceReq instance using the specified properties.
         * @function create
         * @memberof base.ChatVoiceReq
         * @static
         * @param {base.IChatVoiceReq=} [properties] Properties to set
         * @returns {base.ChatVoiceReq} ChatVoiceReq instance
         */
        ChatVoiceReq.create = function create(properties) {
            return new ChatVoiceReq(properties);
        };

        /**
         * Encodes the specified ChatVoiceReq message. Does not implicitly {@link base.ChatVoiceReq.verify|verify} messages.
         * @function encode
         * @memberof base.ChatVoiceReq
         * @static
         * @param {base.IChatVoiceReq} message ChatVoiceReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatVoiceReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.content);
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.time);
            return writer;
        };

        /**
         * Encodes the specified ChatVoiceReq message, length delimited. Does not implicitly {@link base.ChatVoiceReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.ChatVoiceReq
         * @static
         * @param {base.IChatVoiceReq} message ChatVoiceReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatVoiceReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChatVoiceReq message from the specified reader or buffer.
         * @function decode
         * @memberof base.ChatVoiceReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.ChatVoiceReq} ChatVoiceReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatVoiceReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.ChatVoiceReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat = reader.int32();
                    break;
                case 2:
                    message.content = reader.string();
                    break;
                case 3:
                    message.time = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChatVoiceReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.ChatVoiceReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.ChatVoiceReq} ChatVoiceReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatVoiceReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChatVoiceReq message.
         * @function verify
         * @memberof base.ChatVoiceReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChatVoiceReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time))
                    return "time: integer expected";
            return null;
        };

        /**
         * Creates a ChatVoiceReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.ChatVoiceReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.ChatVoiceReq} ChatVoiceReq
         */
        ChatVoiceReq.fromObject = function fromObject(object) {
            if (object instanceof $root.base.ChatVoiceReq)
                return object;
            let message = new $root.base.ChatVoiceReq();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.content != null)
                message.content = String(object.content);
            if (object.time != null)
                message.time = object.time | 0;
            return message;
        };

        /**
         * Creates a plain object from a ChatVoiceReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.ChatVoiceReq
         * @static
         * @param {base.ChatVoiceReq} message ChatVoiceReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChatVoiceReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seat = 0;
                object.content = "";
                object.time = 0;
            }
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = message.time;
            return object;
        };

        /**
         * Converts this ChatVoiceReq to JSON.
         * @function toJSON
         * @memberof base.ChatVoiceReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChatVoiceReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ChatVoiceReq;
    })();

    base.ChatVoiceEvent = (function() {

        /**
         * Properties of a ChatVoiceEvent.
         * @memberof base
         * @interface IChatVoiceEvent
         * @property {number|null} [fromSeat] ChatVoiceEvent fromSeat
         * @property {number|null} [toSeat] ChatVoiceEvent toSeat
         * @property {string|null} [content] ChatVoiceEvent content
         * @property {number|null} [time] ChatVoiceEvent time
         */

        /**
         * Constructs a new ChatVoiceEvent.
         * @memberof base
         * @classdesc Represents a ChatVoiceEvent.
         * @implements IChatVoiceEvent
         * @constructor
         * @param {base.IChatVoiceEvent=} [properties] Properties to set
         */
        function ChatVoiceEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChatVoiceEvent fromSeat.
         * @member {number} fromSeat
         * @memberof base.ChatVoiceEvent
         * @instance
         */
        ChatVoiceEvent.prototype.fromSeat = 0;

        /**
         * ChatVoiceEvent toSeat.
         * @member {number} toSeat
         * @memberof base.ChatVoiceEvent
         * @instance
         */
        ChatVoiceEvent.prototype.toSeat = 0;

        /**
         * ChatVoiceEvent content.
         * @member {string} content
         * @memberof base.ChatVoiceEvent
         * @instance
         */
        ChatVoiceEvent.prototype.content = "";

        /**
         * ChatVoiceEvent time.
         * @member {number} time
         * @memberof base.ChatVoiceEvent
         * @instance
         */
        ChatVoiceEvent.prototype.time = 0;

        /**
         * Creates a new ChatVoiceEvent instance using the specified properties.
         * @function create
         * @memberof base.ChatVoiceEvent
         * @static
         * @param {base.IChatVoiceEvent=} [properties] Properties to set
         * @returns {base.ChatVoiceEvent} ChatVoiceEvent instance
         */
        ChatVoiceEvent.create = function create(properties) {
            return new ChatVoiceEvent(properties);
        };

        /**
         * Encodes the specified ChatVoiceEvent message. Does not implicitly {@link base.ChatVoiceEvent.verify|verify} messages.
         * @function encode
         * @memberof base.ChatVoiceEvent
         * @static
         * @param {base.IChatVoiceEvent} message ChatVoiceEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatVoiceEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.fromSeat != null && Object.hasOwnProperty.call(message, "fromSeat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.fromSeat);
            if (message.toSeat != null && Object.hasOwnProperty.call(message, "toSeat"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.toSeat);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.content);
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.time);
            return writer;
        };

        /**
         * Encodes the specified ChatVoiceEvent message, length delimited. Does not implicitly {@link base.ChatVoiceEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.ChatVoiceEvent
         * @static
         * @param {base.IChatVoiceEvent} message ChatVoiceEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatVoiceEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChatVoiceEvent message from the specified reader or buffer.
         * @function decode
         * @memberof base.ChatVoiceEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.ChatVoiceEvent} ChatVoiceEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatVoiceEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.ChatVoiceEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.fromSeat = reader.int32();
                    break;
                case 2:
                    message.toSeat = reader.int32();
                    break;
                case 3:
                    message.content = reader.string();
                    break;
                case 4:
                    message.time = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChatVoiceEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.ChatVoiceEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.ChatVoiceEvent} ChatVoiceEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatVoiceEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChatVoiceEvent message.
         * @function verify
         * @memberof base.ChatVoiceEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChatVoiceEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.fromSeat != null && message.hasOwnProperty("fromSeat"))
                if (!$util.isInteger(message.fromSeat))
                    return "fromSeat: integer expected";
            if (message.toSeat != null && message.hasOwnProperty("toSeat"))
                if (!$util.isInteger(message.toSeat))
                    return "toSeat: integer expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time))
                    return "time: integer expected";
            return null;
        };

        /**
         * Creates a ChatVoiceEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.ChatVoiceEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.ChatVoiceEvent} ChatVoiceEvent
         */
        ChatVoiceEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.base.ChatVoiceEvent)
                return object;
            let message = new $root.base.ChatVoiceEvent();
            if (object.fromSeat != null)
                message.fromSeat = object.fromSeat | 0;
            if (object.toSeat != null)
                message.toSeat = object.toSeat | 0;
            if (object.content != null)
                message.content = String(object.content);
            if (object.time != null)
                message.time = object.time | 0;
            return message;
        };

        /**
         * Creates a plain object from a ChatVoiceEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.ChatVoiceEvent
         * @static
         * @param {base.ChatVoiceEvent} message ChatVoiceEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChatVoiceEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.fromSeat = 0;
                object.toSeat = 0;
                object.content = "";
                object.time = 0;
            }
            if (message.fromSeat != null && message.hasOwnProperty("fromSeat"))
                object.fromSeat = message.fromSeat;
            if (message.toSeat != null && message.hasOwnProperty("toSeat"))
                object.toSeat = message.toSeat;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = message.time;
            return object;
        };

        /**
         * Converts this ChatVoiceEvent to JSON.
         * @function toJSON
         * @memberof base.ChatVoiceEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChatVoiceEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ChatVoiceEvent;
    })();

    base.SendCommand = (function() {

        /**
         * Properties of a SendCommand.
         * @memberof base
         * @interface ISendCommand
         * @property {number|null} [type] SendCommand type
         * @property {string|null} [param] SendCommand param
         */

        /**
         * Constructs a new SendCommand.
         * @memberof base
         * @classdesc Represents a SendCommand.
         * @implements ISendCommand
         * @constructor
         * @param {base.ISendCommand=} [properties] Properties to set
         */
        function SendCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SendCommand type.
         * @member {number} type
         * @memberof base.SendCommand
         * @instance
         */
        SendCommand.prototype.type = 0;

        /**
         * SendCommand param.
         * @member {string} param
         * @memberof base.SendCommand
         * @instance
         */
        SendCommand.prototype.param = "";

        /**
         * Creates a new SendCommand instance using the specified properties.
         * @function create
         * @memberof base.SendCommand
         * @static
         * @param {base.ISendCommand=} [properties] Properties to set
         * @returns {base.SendCommand} SendCommand instance
         */
        SendCommand.create = function create(properties) {
            return new SendCommand(properties);
        };

        /**
         * Encodes the specified SendCommand message. Does not implicitly {@link base.SendCommand.verify|verify} messages.
         * @function encode
         * @memberof base.SendCommand
         * @static
         * @param {base.ISendCommand} message SendCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SendCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.param != null && Object.hasOwnProperty.call(message, "param"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.param);
            return writer;
        };

        /**
         * Encodes the specified SendCommand message, length delimited. Does not implicitly {@link base.SendCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.SendCommand
         * @static
         * @param {base.ISendCommand} message SendCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SendCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SendCommand message from the specified reader or buffer.
         * @function decode
         * @memberof base.SendCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.SendCommand} SendCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SendCommand.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.SendCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.param = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SendCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.SendCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.SendCommand} SendCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SendCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SendCommand message.
         * @function verify
         * @memberof base.SendCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SendCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            if (message.param != null && message.hasOwnProperty("param"))
                if (!$util.isString(message.param))
                    return "param: string expected";
            return null;
        };

        /**
         * Creates a SendCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.SendCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.SendCommand} SendCommand
         */
        SendCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.base.SendCommand)
                return object;
            let message = new $root.base.SendCommand();
            if (object.type != null)
                message.type = object.type | 0;
            if (object.param != null)
                message.param = String(object.param);
            return message;
        };

        /**
         * Creates a plain object from a SendCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.SendCommand
         * @static
         * @param {base.SendCommand} message SendCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SendCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = 0;
                object.param = "";
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.param != null && message.hasOwnProperty("param"))
                object.param = message.param;
            return object;
        };

        /**
         * Converts this SendCommand to JSON.
         * @function toJSON
         * @memberof base.SendCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SendCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SendCommand;
    })();

    /**
     * NOTICE_TYPE enum.
     * @name base.NOTICE_TYPE
     * @enum {number}
     * @property {number} NT_NONE=0 NT_NONE value
     * @property {number} NT_WITHDRAW=1 NT_WITHDRAW value
     * @property {number} NT_GAME_WIN=2 NT_GAME_WIN value
     * @property {number} NT_WHEEL=3 NT_WHEEL value
     */
    base.NOTICE_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NT_NONE"] = 0;
        values[valuesById[1] = "NT_WITHDRAW"] = 1;
        values[valuesById[2] = "NT_GAME_WIN"] = 2;
        values[valuesById[3] = "NT_WHEEL"] = 3;
        return values;
    })();

    base.GlobalNotice = (function() {

        /**
         * Properties of a GlobalNotice.
         * @memberof base
         * @interface IGlobalNotice
         * @property {Array.<base.INoticeMsg>|null} [noticeMsgs] GlobalNotice noticeMsgs
         */

        /**
         * Constructs a new GlobalNotice.
         * @memberof base
         * @classdesc Represents a GlobalNotice.
         * @implements IGlobalNotice
         * @constructor
         * @param {base.IGlobalNotice=} [properties] Properties to set
         */
        function GlobalNotice(properties) {
            this.noticeMsgs = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GlobalNotice noticeMsgs.
         * @member {Array.<base.INoticeMsg>} noticeMsgs
         * @memberof base.GlobalNotice
         * @instance
         */
        GlobalNotice.prototype.noticeMsgs = $util.emptyArray;

        /**
         * Creates a new GlobalNotice instance using the specified properties.
         * @function create
         * @memberof base.GlobalNotice
         * @static
         * @param {base.IGlobalNotice=} [properties] Properties to set
         * @returns {base.GlobalNotice} GlobalNotice instance
         */
        GlobalNotice.create = function create(properties) {
            return new GlobalNotice(properties);
        };

        /**
         * Encodes the specified GlobalNotice message. Does not implicitly {@link base.GlobalNotice.verify|verify} messages.
         * @function encode
         * @memberof base.GlobalNotice
         * @static
         * @param {base.IGlobalNotice} message GlobalNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GlobalNotice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.noticeMsgs != null && message.noticeMsgs.length)
                for (let i = 0; i < message.noticeMsgs.length; ++i)
                    $root.base.NoticeMsg.encode(message.noticeMsgs[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GlobalNotice message, length delimited. Does not implicitly {@link base.GlobalNotice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.GlobalNotice
         * @static
         * @param {base.IGlobalNotice} message GlobalNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GlobalNotice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GlobalNotice message from the specified reader or buffer.
         * @function decode
         * @memberof base.GlobalNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.GlobalNotice} GlobalNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GlobalNotice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.GlobalNotice();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.noticeMsgs && message.noticeMsgs.length))
                        message.noticeMsgs = [];
                    message.noticeMsgs.push($root.base.NoticeMsg.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GlobalNotice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.GlobalNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.GlobalNotice} GlobalNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GlobalNotice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GlobalNotice message.
         * @function verify
         * @memberof base.GlobalNotice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GlobalNotice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.noticeMsgs != null && message.hasOwnProperty("noticeMsgs")) {
                if (!Array.isArray(message.noticeMsgs))
                    return "noticeMsgs: array expected";
                for (let i = 0; i < message.noticeMsgs.length; ++i) {
                    let error = $root.base.NoticeMsg.verify(message.noticeMsgs[i]);
                    if (error)
                        return "noticeMsgs." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GlobalNotice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.GlobalNotice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.GlobalNotice} GlobalNotice
         */
        GlobalNotice.fromObject = function fromObject(object) {
            if (object instanceof $root.base.GlobalNotice)
                return object;
            let message = new $root.base.GlobalNotice();
            if (object.noticeMsgs) {
                if (!Array.isArray(object.noticeMsgs))
                    throw TypeError(".base.GlobalNotice.noticeMsgs: array expected");
                message.noticeMsgs = [];
                for (let i = 0; i < object.noticeMsgs.length; ++i) {
                    if (typeof object.noticeMsgs[i] !== "object")
                        throw TypeError(".base.GlobalNotice.noticeMsgs: object expected");
                    message.noticeMsgs[i] = $root.base.NoticeMsg.fromObject(object.noticeMsgs[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GlobalNotice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.GlobalNotice
         * @static
         * @param {base.GlobalNotice} message GlobalNotice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GlobalNotice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.noticeMsgs = [];
            if (message.noticeMsgs && message.noticeMsgs.length) {
                object.noticeMsgs = [];
                for (let j = 0; j < message.noticeMsgs.length; ++j)
                    object.noticeMsgs[j] = $root.base.NoticeMsg.toObject(message.noticeMsgs[j], options);
            }
            return object;
        };

        /**
         * Converts this GlobalNotice to JSON.
         * @function toJSON
         * @memberof base.GlobalNotice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GlobalNotice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GlobalNotice;
    })();

    base.NoticeMsg = (function() {

        /**
         * Properties of a NoticeMsg.
         * @memberof base
         * @interface INoticeMsg
         * @property {number|null} [noticeType] NoticeMsg noticeType
         * @property {string|null} [content] NoticeMsg content
         */

        /**
         * Constructs a new NoticeMsg.
         * @memberof base
         * @classdesc Represents a NoticeMsg.
         * @implements INoticeMsg
         * @constructor
         * @param {base.INoticeMsg=} [properties] Properties to set
         */
        function NoticeMsg(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NoticeMsg noticeType.
         * @member {number} noticeType
         * @memberof base.NoticeMsg
         * @instance
         */
        NoticeMsg.prototype.noticeType = 0;

        /**
         * NoticeMsg content.
         * @member {string} content
         * @memberof base.NoticeMsg
         * @instance
         */
        NoticeMsg.prototype.content = "";

        /**
         * Creates a new NoticeMsg instance using the specified properties.
         * @function create
         * @memberof base.NoticeMsg
         * @static
         * @param {base.INoticeMsg=} [properties] Properties to set
         * @returns {base.NoticeMsg} NoticeMsg instance
         */
        NoticeMsg.create = function create(properties) {
            return new NoticeMsg(properties);
        };

        /**
         * Encodes the specified NoticeMsg message. Does not implicitly {@link base.NoticeMsg.verify|verify} messages.
         * @function encode
         * @memberof base.NoticeMsg
         * @static
         * @param {base.INoticeMsg} message NoticeMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NoticeMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.noticeType != null && Object.hasOwnProperty.call(message, "noticeType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.noticeType);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.content);
            return writer;
        };

        /**
         * Encodes the specified NoticeMsg message, length delimited. Does not implicitly {@link base.NoticeMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.NoticeMsg
         * @static
         * @param {base.INoticeMsg} message NoticeMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NoticeMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NoticeMsg message from the specified reader or buffer.
         * @function decode
         * @memberof base.NoticeMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.NoticeMsg} NoticeMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NoticeMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.NoticeMsg();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.noticeType = reader.int32();
                    break;
                case 2:
                    message.content = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NoticeMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.NoticeMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.NoticeMsg} NoticeMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NoticeMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NoticeMsg message.
         * @function verify
         * @memberof base.NoticeMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NoticeMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.noticeType != null && message.hasOwnProperty("noticeType"))
                if (!$util.isInteger(message.noticeType))
                    return "noticeType: integer expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            return null;
        };

        /**
         * Creates a NoticeMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.NoticeMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.NoticeMsg} NoticeMsg
         */
        NoticeMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.base.NoticeMsg)
                return object;
            let message = new $root.base.NoticeMsg();
            if (object.noticeType != null)
                message.noticeType = object.noticeType | 0;
            if (object.content != null)
                message.content = String(object.content);
            return message;
        };

        /**
         * Creates a plain object from a NoticeMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.NoticeMsg
         * @static
         * @param {base.NoticeMsg} message NoticeMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NoticeMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.noticeType = 0;
                object.content = "";
            }
            if (message.noticeType != null && message.hasOwnProperty("noticeType"))
                object.noticeType = message.noticeType;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            return object;
        };

        /**
         * Converts this NoticeMsg to JSON.
         * @function toJSON
         * @memberof base.NoticeMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NoticeMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NoticeMsg;
    })();

    base.PlayerWinMsg = (function() {

        /**
         * Properties of a PlayerWinMsg.
         * @memberof base
         * @interface IPlayerWinMsg
         * @property {Array.<base.IPlayerWinInfo>|null} [infos] PlayerWinMsg infos
         */

        /**
         * Constructs a new PlayerWinMsg.
         * @memberof base
         * @classdesc Represents a PlayerWinMsg.
         * @implements IPlayerWinMsg
         * @constructor
         * @param {base.IPlayerWinMsg=} [properties] Properties to set
         */
        function PlayerWinMsg(properties) {
            this.infos = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerWinMsg infos.
         * @member {Array.<base.IPlayerWinInfo>} infos
         * @memberof base.PlayerWinMsg
         * @instance
         */
        PlayerWinMsg.prototype.infos = $util.emptyArray;

        /**
         * Creates a new PlayerWinMsg instance using the specified properties.
         * @function create
         * @memberof base.PlayerWinMsg
         * @static
         * @param {base.IPlayerWinMsg=} [properties] Properties to set
         * @returns {base.PlayerWinMsg} PlayerWinMsg instance
         */
        PlayerWinMsg.create = function create(properties) {
            return new PlayerWinMsg(properties);
        };

        /**
         * Encodes the specified PlayerWinMsg message. Does not implicitly {@link base.PlayerWinMsg.verify|verify} messages.
         * @function encode
         * @memberof base.PlayerWinMsg
         * @static
         * @param {base.IPlayerWinMsg} message PlayerWinMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerWinMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.infos != null && message.infos.length)
                for (let i = 0; i < message.infos.length; ++i)
                    $root.base.PlayerWinInfo.encode(message.infos[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PlayerWinMsg message, length delimited. Does not implicitly {@link base.PlayerWinMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.PlayerWinMsg
         * @static
         * @param {base.IPlayerWinMsg} message PlayerWinMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerWinMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerWinMsg message from the specified reader or buffer.
         * @function decode
         * @memberof base.PlayerWinMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.PlayerWinMsg} PlayerWinMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerWinMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.PlayerWinMsg();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.infos && message.infos.length))
                        message.infos = [];
                    message.infos.push($root.base.PlayerWinInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerWinMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.PlayerWinMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.PlayerWinMsg} PlayerWinMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerWinMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerWinMsg message.
         * @function verify
         * @memberof base.PlayerWinMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerWinMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.infos != null && message.hasOwnProperty("infos")) {
                if (!Array.isArray(message.infos))
                    return "infos: array expected";
                for (let i = 0; i < message.infos.length; ++i) {
                    let error = $root.base.PlayerWinInfo.verify(message.infos[i]);
                    if (error)
                        return "infos." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PlayerWinMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.PlayerWinMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.PlayerWinMsg} PlayerWinMsg
         */
        PlayerWinMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.base.PlayerWinMsg)
                return object;
            let message = new $root.base.PlayerWinMsg();
            if (object.infos) {
                if (!Array.isArray(object.infos))
                    throw TypeError(".base.PlayerWinMsg.infos: array expected");
                message.infos = [];
                for (let i = 0; i < object.infos.length; ++i) {
                    if (typeof object.infos[i] !== "object")
                        throw TypeError(".base.PlayerWinMsg.infos: object expected");
                    message.infos[i] = $root.base.PlayerWinInfo.fromObject(object.infos[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerWinMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.PlayerWinMsg
         * @static
         * @param {base.PlayerWinMsg} message PlayerWinMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerWinMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.infos = [];
            if (message.infos && message.infos.length) {
                object.infos = [];
                for (let j = 0; j < message.infos.length; ++j)
                    object.infos[j] = $root.base.PlayerWinInfo.toObject(message.infos[j], options);
            }
            return object;
        };

        /**
         * Converts this PlayerWinMsg to JSON.
         * @function toJSON
         * @memberof base.PlayerWinMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerWinMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerWinMsg;
    })();

    base.PlayerWinInfo = (function() {

        /**
         * Properties of a PlayerWinInfo.
         * @memberof base
         * @interface IPlayerWinInfo
         * @property {string|null} [nickName] PlayerWinInfo nickName
         * @property {number|null} [amount] PlayerWinInfo amount
         * @property {number|null} [gameId] PlayerWinInfo gameId
         * @property {string|null} [gameName] PlayerWinInfo gameName
         * @property {number|null} [initBet] PlayerWinInfo initBet
         */

        /**
         * Constructs a new PlayerWinInfo.
         * @memberof base
         * @classdesc Represents a PlayerWinInfo.
         * @implements IPlayerWinInfo
         * @constructor
         * @param {base.IPlayerWinInfo=} [properties] Properties to set
         */
        function PlayerWinInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerWinInfo nickName.
         * @member {string} nickName
         * @memberof base.PlayerWinInfo
         * @instance
         */
        PlayerWinInfo.prototype.nickName = "";

        /**
         * PlayerWinInfo amount.
         * @member {number} amount
         * @memberof base.PlayerWinInfo
         * @instance
         */
        PlayerWinInfo.prototype.amount = 0;

        /**
         * PlayerWinInfo gameId.
         * @member {number} gameId
         * @memberof base.PlayerWinInfo
         * @instance
         */
        PlayerWinInfo.prototype.gameId = 0;

        /**
         * PlayerWinInfo gameName.
         * @member {string} gameName
         * @memberof base.PlayerWinInfo
         * @instance
         */
        PlayerWinInfo.prototype.gameName = "";

        /**
         * PlayerWinInfo initBet.
         * @member {number} initBet
         * @memberof base.PlayerWinInfo
         * @instance
         */
        PlayerWinInfo.prototype.initBet = 0;

        /**
         * Creates a new PlayerWinInfo instance using the specified properties.
         * @function create
         * @memberof base.PlayerWinInfo
         * @static
         * @param {base.IPlayerWinInfo=} [properties] Properties to set
         * @returns {base.PlayerWinInfo} PlayerWinInfo instance
         */
        PlayerWinInfo.create = function create(properties) {
            return new PlayerWinInfo(properties);
        };

        /**
         * Encodes the specified PlayerWinInfo message. Does not implicitly {@link base.PlayerWinInfo.verify|verify} messages.
         * @function encode
         * @memberof base.PlayerWinInfo
         * @static
         * @param {base.IPlayerWinInfo} message PlayerWinInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerWinInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nickName != null && Object.hasOwnProperty.call(message, "nickName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.nickName);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.amount);
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.gameId);
            if (message.gameName != null && Object.hasOwnProperty.call(message, "gameName"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.gameName);
            if (message.initBet != null && Object.hasOwnProperty.call(message, "initBet"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.initBet);
            return writer;
        };

        /**
         * Encodes the specified PlayerWinInfo message, length delimited. Does not implicitly {@link base.PlayerWinInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.PlayerWinInfo
         * @static
         * @param {base.IPlayerWinInfo} message PlayerWinInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerWinInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerWinInfo message from the specified reader or buffer.
         * @function decode
         * @memberof base.PlayerWinInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.PlayerWinInfo} PlayerWinInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerWinInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.PlayerWinInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.nickName = reader.string();
                    break;
                case 2:
                    message.amount = reader.int32();
                    break;
                case 3:
                    message.gameId = reader.int32();
                    break;
                case 4:
                    message.gameName = reader.string();
                    break;
                case 5:
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
         * Decodes a PlayerWinInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.PlayerWinInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.PlayerWinInfo} PlayerWinInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerWinInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerWinInfo message.
         * @function verify
         * @memberof base.PlayerWinInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerWinInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.nickName != null && message.hasOwnProperty("nickName"))
                if (!$util.isString(message.nickName))
                    return "nickName: string expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount))
                    return "amount: integer expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.gameName != null && message.hasOwnProperty("gameName"))
                if (!$util.isString(message.gameName))
                    return "gameName: string expected";
            if (message.initBet != null && message.hasOwnProperty("initBet"))
                if (!$util.isInteger(message.initBet))
                    return "initBet: integer expected";
            return null;
        };

        /**
         * Creates a PlayerWinInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.PlayerWinInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.PlayerWinInfo} PlayerWinInfo
         */
        PlayerWinInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.base.PlayerWinInfo)
                return object;
            let message = new $root.base.PlayerWinInfo();
            if (object.nickName != null)
                message.nickName = String(object.nickName);
            if (object.amount != null)
                message.amount = object.amount | 0;
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.gameName != null)
                message.gameName = String(object.gameName);
            if (object.initBet != null)
                message.initBet = object.initBet | 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerWinInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.PlayerWinInfo
         * @static
         * @param {base.PlayerWinInfo} message PlayerWinInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerWinInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.nickName = "";
                object.amount = 0;
                object.gameId = 0;
                object.gameName = "";
                object.initBet = 0;
            }
            if (message.nickName != null && message.hasOwnProperty("nickName"))
                object.nickName = message.nickName;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = message.amount;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.gameName != null && message.hasOwnProperty("gameName"))
                object.gameName = message.gameName;
            if (message.initBet != null && message.hasOwnProperty("initBet"))
                object.initBet = message.initBet;
            return object;
        };

        /**
         * Converts this PlayerWinInfo to JSON.
         * @function toJSON
         * @memberof base.PlayerWinInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerWinInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerWinInfo;
    })();

    base.PrivateTableReadyReq = (function() {

        /**
         * Properties of a PrivateTableReadyReq.
         * @memberof base
         * @interface IPrivateTableReadyReq
         * @property {number|null} [seat] PrivateTableReadyReq seat
         */

        /**
         * Constructs a new PrivateTableReadyReq.
         * @memberof base
         * @classdesc Represents a PrivateTableReadyReq.
         * @implements IPrivateTableReadyReq
         * @constructor
         * @param {base.IPrivateTableReadyReq=} [properties] Properties to set
         */
        function PrivateTableReadyReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PrivateTableReadyReq seat.
         * @member {number} seat
         * @memberof base.PrivateTableReadyReq
         * @instance
         */
        PrivateTableReadyReq.prototype.seat = 0;

        /**
         * Creates a new PrivateTableReadyReq instance using the specified properties.
         * @function create
         * @memberof base.PrivateTableReadyReq
         * @static
         * @param {base.IPrivateTableReadyReq=} [properties] Properties to set
         * @returns {base.PrivateTableReadyReq} PrivateTableReadyReq instance
         */
        PrivateTableReadyReq.create = function create(properties) {
            return new PrivateTableReadyReq(properties);
        };

        /**
         * Encodes the specified PrivateTableReadyReq message. Does not implicitly {@link base.PrivateTableReadyReq.verify|verify} messages.
         * @function encode
         * @memberof base.PrivateTableReadyReq
         * @static
         * @param {base.IPrivateTableReadyReq} message PrivateTableReadyReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PrivateTableReadyReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            return writer;
        };

        /**
         * Encodes the specified PrivateTableReadyReq message, length delimited. Does not implicitly {@link base.PrivateTableReadyReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.PrivateTableReadyReq
         * @static
         * @param {base.IPrivateTableReadyReq} message PrivateTableReadyReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PrivateTableReadyReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PrivateTableReadyReq message from the specified reader or buffer.
         * @function decode
         * @memberof base.PrivateTableReadyReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.PrivateTableReadyReq} PrivateTableReadyReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PrivateTableReadyReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.PrivateTableReadyReq();
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
         * Decodes a PrivateTableReadyReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.PrivateTableReadyReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.PrivateTableReadyReq} PrivateTableReadyReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PrivateTableReadyReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PrivateTableReadyReq message.
         * @function verify
         * @memberof base.PrivateTableReadyReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PrivateTableReadyReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            return null;
        };

        /**
         * Creates a PrivateTableReadyReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.PrivateTableReadyReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.PrivateTableReadyReq} PrivateTableReadyReq
         */
        PrivateTableReadyReq.fromObject = function fromObject(object) {
            if (object instanceof $root.base.PrivateTableReadyReq)
                return object;
            let message = new $root.base.PrivateTableReadyReq();
            if (object.seat != null)
                message.seat = object.seat | 0;
            return message;
        };

        /**
         * Creates a plain object from a PrivateTableReadyReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.PrivateTableReadyReq
         * @static
         * @param {base.PrivateTableReadyReq} message PrivateTableReadyReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PrivateTableReadyReq.toObject = function toObject(message, options) {
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
         * Converts this PrivateTableReadyReq to JSON.
         * @function toJSON
         * @memberof base.PrivateTableReadyReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PrivateTableReadyReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PrivateTableReadyReq;
    })();

    base.PrivateTableReadyEvent = (function() {

        /**
         * Properties of a PrivateTableReadyEvent.
         * @memberof base
         * @interface IPrivateTableReadyEvent
         * @property {number|null} [seat] PrivateTableReadyEvent seat
         */

        /**
         * Constructs a new PrivateTableReadyEvent.
         * @memberof base
         * @classdesc Represents a PrivateTableReadyEvent.
         * @implements IPrivateTableReadyEvent
         * @constructor
         * @param {base.IPrivateTableReadyEvent=} [properties] Properties to set
         */
        function PrivateTableReadyEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PrivateTableReadyEvent seat.
         * @member {number} seat
         * @memberof base.PrivateTableReadyEvent
         * @instance
         */
        PrivateTableReadyEvent.prototype.seat = 0;

        /**
         * Creates a new PrivateTableReadyEvent instance using the specified properties.
         * @function create
         * @memberof base.PrivateTableReadyEvent
         * @static
         * @param {base.IPrivateTableReadyEvent=} [properties] Properties to set
         * @returns {base.PrivateTableReadyEvent} PrivateTableReadyEvent instance
         */
        PrivateTableReadyEvent.create = function create(properties) {
            return new PrivateTableReadyEvent(properties);
        };

        /**
         * Encodes the specified PrivateTableReadyEvent message. Does not implicitly {@link base.PrivateTableReadyEvent.verify|verify} messages.
         * @function encode
         * @memberof base.PrivateTableReadyEvent
         * @static
         * @param {base.IPrivateTableReadyEvent} message PrivateTableReadyEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PrivateTableReadyEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            return writer;
        };

        /**
         * Encodes the specified PrivateTableReadyEvent message, length delimited. Does not implicitly {@link base.PrivateTableReadyEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.PrivateTableReadyEvent
         * @static
         * @param {base.IPrivateTableReadyEvent} message PrivateTableReadyEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PrivateTableReadyEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PrivateTableReadyEvent message from the specified reader or buffer.
         * @function decode
         * @memberof base.PrivateTableReadyEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.PrivateTableReadyEvent} PrivateTableReadyEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PrivateTableReadyEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.PrivateTableReadyEvent();
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
         * Decodes a PrivateTableReadyEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.PrivateTableReadyEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.PrivateTableReadyEvent} PrivateTableReadyEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PrivateTableReadyEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PrivateTableReadyEvent message.
         * @function verify
         * @memberof base.PrivateTableReadyEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PrivateTableReadyEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            return null;
        };

        /**
         * Creates a PrivateTableReadyEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.PrivateTableReadyEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.PrivateTableReadyEvent} PrivateTableReadyEvent
         */
        PrivateTableReadyEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.base.PrivateTableReadyEvent)
                return object;
            let message = new $root.base.PrivateTableReadyEvent();
            if (object.seat != null)
                message.seat = object.seat | 0;
            return message;
        };

        /**
         * Creates a plain object from a PrivateTableReadyEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.PrivateTableReadyEvent
         * @static
         * @param {base.PrivateTableReadyEvent} message PrivateTableReadyEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PrivateTableReadyEvent.toObject = function toObject(message, options) {
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
         * Converts this PrivateTableReadyEvent to JSON.
         * @function toJSON
         * @memberof base.PrivateTableReadyEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PrivateTableReadyEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PrivateTableReadyEvent;
    })();

    return base;
})();

export { $root as default };
