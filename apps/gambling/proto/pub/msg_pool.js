/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const pool = $root.pool = (() => {

    /**
     * Namespace pool.
     * @exports pool
     * @namespace
     */
    const pool = {};

    /**
     * DEADLINE_TYPE enum.
     * @name pool.DEADLINE_TYPE
     * @enum {number}
     * @property {number} DT_NONE=0 DT_NONE value
     * @property {number} OPERATION=1 OPERATION value
     * @property {number} RESULT=2 RESULT value
     */
    pool.DEADLINE_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DT_NONE"] = 0;
        values[valuesById[1] = "OPERATION"] = 1;
        values[valuesById[2] = "RESULT"] = 2;
        return values;
    })();

    pool.PoolPlayerInfo = (function() {

        /**
         * Properties of a PoolPlayerInfo.
         * @memberof pool
         * @interface IPoolPlayerInfo
         * @property {number|Long|null} [playerId] PoolPlayerInfo playerId
         * @property {string|null} [nickname] PoolPlayerInfo nickname
         * @property {string|null} [headId] PoolPlayerInfo headId
         * @property {string|null} [headUrl] PoolPlayerInfo headUrl
         * @property {number|null} [tag] PoolPlayerInfo tag
         * @property {number|null} [balance] PoolPlayerInfo balance
         * @property {number|null} [seat] PoolPlayerInfo seat
         */

        /**
         * Constructs a new PoolPlayerInfo.
         * @memberof pool
         * @classdesc Represents a PoolPlayerInfo.
         * @implements IPoolPlayerInfo
         * @constructor
         * @param {pool.IPoolPlayerInfo=} [properties] Properties to set
         */
        function PoolPlayerInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PoolPlayerInfo playerId.
         * @member {number|Long} playerId
         * @memberof pool.PoolPlayerInfo
         * @instance
         */
        PoolPlayerInfo.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PoolPlayerInfo nickname.
         * @member {string} nickname
         * @memberof pool.PoolPlayerInfo
         * @instance
         */
        PoolPlayerInfo.prototype.nickname = "";

        /**
         * PoolPlayerInfo headId.
         * @member {string} headId
         * @memberof pool.PoolPlayerInfo
         * @instance
         */
        PoolPlayerInfo.prototype.headId = "";

        /**
         * PoolPlayerInfo headUrl.
         * @member {string} headUrl
         * @memberof pool.PoolPlayerInfo
         * @instance
         */
        PoolPlayerInfo.prototype.headUrl = "";

        /**
         * PoolPlayerInfo tag.
         * @member {number} tag
         * @memberof pool.PoolPlayerInfo
         * @instance
         */
        PoolPlayerInfo.prototype.tag = 0;

        /**
         * PoolPlayerInfo balance.
         * @member {number} balance
         * @memberof pool.PoolPlayerInfo
         * @instance
         */
        PoolPlayerInfo.prototype.balance = 0;

        /**
         * PoolPlayerInfo seat.
         * @member {number} seat
         * @memberof pool.PoolPlayerInfo
         * @instance
         */
        PoolPlayerInfo.prototype.seat = 0;

        /**
         * Creates a new PoolPlayerInfo instance using the specified properties.
         * @function create
         * @memberof pool.PoolPlayerInfo
         * @static
         * @param {pool.IPoolPlayerInfo=} [properties] Properties to set
         * @returns {pool.PoolPlayerInfo} PoolPlayerInfo instance
         */
        PoolPlayerInfo.create = function create(properties) {
            return new PoolPlayerInfo(properties);
        };

        /**
         * Encodes the specified PoolPlayerInfo message. Does not implicitly {@link pool.PoolPlayerInfo.verify|verify} messages.
         * @function encode
         * @memberof pool.PoolPlayerInfo
         * @static
         * @param {pool.IPoolPlayerInfo} message PoolPlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PoolPlayerInfo.encode = function encode(message, writer) {
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
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.balance);
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.seat);
            return writer;
        };

        /**
         * Encodes the specified PoolPlayerInfo message, length delimited. Does not implicitly {@link pool.PoolPlayerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.PoolPlayerInfo
         * @static
         * @param {pool.IPoolPlayerInfo} message PoolPlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PoolPlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PoolPlayerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof pool.PoolPlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.PoolPlayerInfo} PoolPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PoolPlayerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.PoolPlayerInfo();
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
                    message.balance = reader.int32();
                    break;
                case 7:
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
         * Decodes a PoolPlayerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.PoolPlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.PoolPlayerInfo} PoolPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PoolPlayerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PoolPlayerInfo message.
         * @function verify
         * @memberof pool.PoolPlayerInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PoolPlayerInfo.verify = function verify(message) {
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
            if (message.balance != null && message.hasOwnProperty("balance"))
                if (!$util.isInteger(message.balance))
                    return "balance: integer expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            return null;
        };

        /**
         * Creates a PoolPlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.PoolPlayerInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.PoolPlayerInfo} PoolPlayerInfo
         */
        PoolPlayerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.PoolPlayerInfo)
                return object;
            let message = new $root.pool.PoolPlayerInfo();
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
            if (object.balance != null)
                message.balance = object.balance | 0;
            if (object.seat != null)
                message.seat = object.seat | 0;
            return message;
        };

        /**
         * Creates a plain object from a PoolPlayerInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.PoolPlayerInfo
         * @static
         * @param {pool.PoolPlayerInfo} message PoolPlayerInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PoolPlayerInfo.toObject = function toObject(message, options) {
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
                object.balance = 0;
                object.seat = 0;
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
            if (message.balance != null && message.hasOwnProperty("balance"))
                object.balance = message.balance;
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            return object;
        };

        /**
         * Converts this PoolPlayerInfo to JSON.
         * @function toJSON
         * @memberof pool.PoolPlayerInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PoolPlayerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PoolPlayerInfo;
    })();

    pool.PoolSeatState = (function() {

        /**
         * Properties of a PoolSeatState.
         * @memberof pool
         * @interface IPoolSeatState
         * @property {number|null} [seat] PoolSeatState seat
         * @property {number|null} [color] PoolSeatState color
         * @property {number|null} [selectColor] PoolSeatState selectColor
         * @property {number|null} [foulCount] PoolSeatState foulCount
         * @property {Array.<number>|null} [inHoleList] PoolSeatState inHoleList
         * @property {Array.<number>|null} [targetList] PoolSeatState targetList
         * @property {Array.<pool.IPraise>|null} [praises] PoolSeatState praises
         */

        /**
         * Constructs a new PoolSeatState.
         * @memberof pool
         * @classdesc Represents a PoolSeatState.
         * @implements IPoolSeatState
         * @constructor
         * @param {pool.IPoolSeatState=} [properties] Properties to set
         */
        function PoolSeatState(properties) {
            this.inHoleList = [];
            this.targetList = [];
            this.praises = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PoolSeatState seat.
         * @member {number} seat
         * @memberof pool.PoolSeatState
         * @instance
         */
        PoolSeatState.prototype.seat = 0;

        /**
         * PoolSeatState color.
         * @member {number} color
         * @memberof pool.PoolSeatState
         * @instance
         */
        PoolSeatState.prototype.color = 0;

        /**
         * PoolSeatState selectColor.
         * @member {number} selectColor
         * @memberof pool.PoolSeatState
         * @instance
         */
        PoolSeatState.prototype.selectColor = 0;

        /**
         * PoolSeatState foulCount.
         * @member {number} foulCount
         * @memberof pool.PoolSeatState
         * @instance
         */
        PoolSeatState.prototype.foulCount = 0;

        /**
         * PoolSeatState inHoleList.
         * @member {Array.<number>} inHoleList
         * @memberof pool.PoolSeatState
         * @instance
         */
        PoolSeatState.prototype.inHoleList = $util.emptyArray;

        /**
         * PoolSeatState targetList.
         * @member {Array.<number>} targetList
         * @memberof pool.PoolSeatState
         * @instance
         */
        PoolSeatState.prototype.targetList = $util.emptyArray;

        /**
         * PoolSeatState praises.
         * @member {Array.<pool.IPraise>} praises
         * @memberof pool.PoolSeatState
         * @instance
         */
        PoolSeatState.prototype.praises = $util.emptyArray;

        /**
         * Creates a new PoolSeatState instance using the specified properties.
         * @function create
         * @memberof pool.PoolSeatState
         * @static
         * @param {pool.IPoolSeatState=} [properties] Properties to set
         * @returns {pool.PoolSeatState} PoolSeatState instance
         */
        PoolSeatState.create = function create(properties) {
            return new PoolSeatState(properties);
        };

        /**
         * Encodes the specified PoolSeatState message. Does not implicitly {@link pool.PoolSeatState.verify|verify} messages.
         * @function encode
         * @memberof pool.PoolSeatState
         * @static
         * @param {pool.IPoolSeatState} message PoolSeatState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PoolSeatState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            if (message.color != null && Object.hasOwnProperty.call(message, "color"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.color);
            if (message.selectColor != null && Object.hasOwnProperty.call(message, "selectColor"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.selectColor);
            if (message.foulCount != null && Object.hasOwnProperty.call(message, "foulCount"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.foulCount);
            if (message.inHoleList != null && message.inHoleList.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (let i = 0; i < message.inHoleList.length; ++i)
                    writer.int32(message.inHoleList[i]);
                writer.ldelim();
            }
            if (message.targetList != null && message.targetList.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (let i = 0; i < message.targetList.length; ++i)
                    writer.int32(message.targetList[i]);
                writer.ldelim();
            }
            if (message.praises != null && message.praises.length)
                for (let i = 0; i < message.praises.length; ++i)
                    $root.pool.Praise.encode(message.praises[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PoolSeatState message, length delimited. Does not implicitly {@link pool.PoolSeatState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.PoolSeatState
         * @static
         * @param {pool.IPoolSeatState} message PoolSeatState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PoolSeatState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PoolSeatState message from the specified reader or buffer.
         * @function decode
         * @memberof pool.PoolSeatState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.PoolSeatState} PoolSeatState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PoolSeatState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.PoolSeatState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat = reader.int32();
                    break;
                case 2:
                    message.color = reader.int32();
                    break;
                case 3:
                    message.selectColor = reader.int32();
                    break;
                case 4:
                    message.foulCount = reader.int32();
                    break;
                case 5:
                    if (!(message.inHoleList && message.inHoleList.length))
                        message.inHoleList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.inHoleList.push(reader.int32());
                    } else
                        message.inHoleList.push(reader.int32());
                    break;
                case 6:
                    if (!(message.targetList && message.targetList.length))
                        message.targetList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.targetList.push(reader.int32());
                    } else
                        message.targetList.push(reader.int32());
                    break;
                case 7:
                    if (!(message.praises && message.praises.length))
                        message.praises = [];
                    message.praises.push($root.pool.Praise.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PoolSeatState message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.PoolSeatState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.PoolSeatState} PoolSeatState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PoolSeatState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PoolSeatState message.
         * @function verify
         * @memberof pool.PoolSeatState
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PoolSeatState.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            if (message.color != null && message.hasOwnProperty("color"))
                if (!$util.isInteger(message.color))
                    return "color: integer expected";
            if (message.selectColor != null && message.hasOwnProperty("selectColor"))
                if (!$util.isInteger(message.selectColor))
                    return "selectColor: integer expected";
            if (message.foulCount != null && message.hasOwnProperty("foulCount"))
                if (!$util.isInteger(message.foulCount))
                    return "foulCount: integer expected";
            if (message.inHoleList != null && message.hasOwnProperty("inHoleList")) {
                if (!Array.isArray(message.inHoleList))
                    return "inHoleList: array expected";
                for (let i = 0; i < message.inHoleList.length; ++i)
                    if (!$util.isInteger(message.inHoleList[i]))
                        return "inHoleList: integer[] expected";
            }
            if (message.targetList != null && message.hasOwnProperty("targetList")) {
                if (!Array.isArray(message.targetList))
                    return "targetList: array expected";
                for (let i = 0; i < message.targetList.length; ++i)
                    if (!$util.isInteger(message.targetList[i]))
                        return "targetList: integer[] expected";
            }
            if (message.praises != null && message.hasOwnProperty("praises")) {
                if (!Array.isArray(message.praises))
                    return "praises: array expected";
                for (let i = 0; i < message.praises.length; ++i) {
                    let error = $root.pool.Praise.verify(message.praises[i]);
                    if (error)
                        return "praises." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PoolSeatState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.PoolSeatState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.PoolSeatState} PoolSeatState
         */
        PoolSeatState.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.PoolSeatState)
                return object;
            let message = new $root.pool.PoolSeatState();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.color != null)
                message.color = object.color | 0;
            if (object.selectColor != null)
                message.selectColor = object.selectColor | 0;
            if (object.foulCount != null)
                message.foulCount = object.foulCount | 0;
            if (object.inHoleList) {
                if (!Array.isArray(object.inHoleList))
                    throw TypeError(".pool.PoolSeatState.inHoleList: array expected");
                message.inHoleList = [];
                for (let i = 0; i < object.inHoleList.length; ++i)
                    message.inHoleList[i] = object.inHoleList[i] | 0;
            }
            if (object.targetList) {
                if (!Array.isArray(object.targetList))
                    throw TypeError(".pool.PoolSeatState.targetList: array expected");
                message.targetList = [];
                for (let i = 0; i < object.targetList.length; ++i)
                    message.targetList[i] = object.targetList[i] | 0;
            }
            if (object.praises) {
                if (!Array.isArray(object.praises))
                    throw TypeError(".pool.PoolSeatState.praises: array expected");
                message.praises = [];
                for (let i = 0; i < object.praises.length; ++i) {
                    if (typeof object.praises[i] !== "object")
                        throw TypeError(".pool.PoolSeatState.praises: object expected");
                    message.praises[i] = $root.pool.Praise.fromObject(object.praises[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PoolSeatState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.PoolSeatState
         * @static
         * @param {pool.PoolSeatState} message PoolSeatState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PoolSeatState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.inHoleList = [];
                object.targetList = [];
                object.praises = [];
            }
            if (options.defaults) {
                object.seat = 0;
                object.color = 0;
                object.selectColor = 0;
                object.foulCount = 0;
            }
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.color != null && message.hasOwnProperty("color"))
                object.color = message.color;
            if (message.selectColor != null && message.hasOwnProperty("selectColor"))
                object.selectColor = message.selectColor;
            if (message.foulCount != null && message.hasOwnProperty("foulCount"))
                object.foulCount = message.foulCount;
            if (message.inHoleList && message.inHoleList.length) {
                object.inHoleList = [];
                for (let j = 0; j < message.inHoleList.length; ++j)
                    object.inHoleList[j] = message.inHoleList[j];
            }
            if (message.targetList && message.targetList.length) {
                object.targetList = [];
                for (let j = 0; j < message.targetList.length; ++j)
                    object.targetList[j] = message.targetList[j];
            }
            if (message.praises && message.praises.length) {
                object.praises = [];
                for (let j = 0; j < message.praises.length; ++j)
                    object.praises[j] = $root.pool.Praise.toObject(message.praises[j], options);
            }
            return object;
        };

        /**
         * Converts this PoolSeatState to JSON.
         * @function toJSON
         * @memberof pool.PoolSeatState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PoolSeatState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PoolSeatState;
    })();

    pool.GameBattle = (function() {

        /**
         * Properties of a GameBattle.
         * @memberof pool
         * @interface IGameBattle
         * @property {pool.IScene|null} [map] GameBattle map
         * @property {pool.IPoolPlayerInfo|null} [mine] GameBattle mine
         * @property {pool.IPoolPlayerInfo|null} [enemy] GameBattle enemy
         * @property {boolean|null} [useAimTool] GameBattle useAimTool
         * @property {string|null} [gameCode] GameBattle gameCode
         * @property {number|null} [ai] GameBattle ai
         * @property {pool.IGameRecord|null} [gameRecord] GameBattle gameRecord
         */

        /**
         * Constructs a new GameBattle.
         * @memberof pool
         * @classdesc Represents a GameBattle.
         * @implements IGameBattle
         * @constructor
         * @param {pool.IGameBattle=} [properties] Properties to set
         */
        function GameBattle(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameBattle map.
         * @member {pool.IScene|null|undefined} map
         * @memberof pool.GameBattle
         * @instance
         */
        GameBattle.prototype.map = null;

        /**
         * GameBattle mine.
         * @member {pool.IPoolPlayerInfo|null|undefined} mine
         * @memberof pool.GameBattle
         * @instance
         */
        GameBattle.prototype.mine = null;

        /**
         * GameBattle enemy.
         * @member {pool.IPoolPlayerInfo|null|undefined} enemy
         * @memberof pool.GameBattle
         * @instance
         */
        GameBattle.prototype.enemy = null;

        /**
         * GameBattle useAimTool.
         * @member {boolean} useAimTool
         * @memberof pool.GameBattle
         * @instance
         */
        GameBattle.prototype.useAimTool = false;

        /**
         * GameBattle gameCode.
         * @member {string} gameCode
         * @memberof pool.GameBattle
         * @instance
         */
        GameBattle.prototype.gameCode = "";

        /**
         * GameBattle ai.
         * @member {number} ai
         * @memberof pool.GameBattle
         * @instance
         */
        GameBattle.prototype.ai = 0;

        /**
         * GameBattle gameRecord.
         * @member {pool.IGameRecord|null|undefined} gameRecord
         * @memberof pool.GameBattle
         * @instance
         */
        GameBattle.prototype.gameRecord = null;

        /**
         * Creates a new GameBattle instance using the specified properties.
         * @function create
         * @memberof pool.GameBattle
         * @static
         * @param {pool.IGameBattle=} [properties] Properties to set
         * @returns {pool.GameBattle} GameBattle instance
         */
        GameBattle.create = function create(properties) {
            return new GameBattle(properties);
        };

        /**
         * Encodes the specified GameBattle message. Does not implicitly {@link pool.GameBattle.verify|verify} messages.
         * @function encode
         * @memberof pool.GameBattle
         * @static
         * @param {pool.IGameBattle} message GameBattle message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameBattle.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.map != null && Object.hasOwnProperty.call(message, "map"))
                $root.pool.Scene.encode(message.map, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.mine != null && Object.hasOwnProperty.call(message, "mine"))
                $root.pool.PoolPlayerInfo.encode(message.mine, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.enemy != null && Object.hasOwnProperty.call(message, "enemy"))
                $root.pool.PoolPlayerInfo.encode(message.enemy, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.useAimTool != null && Object.hasOwnProperty.call(message, "useAimTool"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.useAimTool);
            if (message.gameCode != null && Object.hasOwnProperty.call(message, "gameCode"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.gameCode);
            if (message.ai != null && Object.hasOwnProperty.call(message, "ai"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.ai);
            if (message.gameRecord != null && Object.hasOwnProperty.call(message, "gameRecord"))
                $root.pool.GameRecord.encode(message.gameRecord, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GameBattle message, length delimited. Does not implicitly {@link pool.GameBattle.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.GameBattle
         * @static
         * @param {pool.IGameBattle} message GameBattle message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameBattle.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameBattle message from the specified reader or buffer.
         * @function decode
         * @memberof pool.GameBattle
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.GameBattle} GameBattle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameBattle.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.GameBattle();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.map = $root.pool.Scene.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.mine = $root.pool.PoolPlayerInfo.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.enemy = $root.pool.PoolPlayerInfo.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.useAimTool = reader.bool();
                    break;
                case 5:
                    message.gameCode = reader.string();
                    break;
                case 6:
                    message.ai = reader.int32();
                    break;
                case 7:
                    message.gameRecord = $root.pool.GameRecord.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameBattle message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.GameBattle
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.GameBattle} GameBattle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameBattle.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameBattle message.
         * @function verify
         * @memberof pool.GameBattle
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameBattle.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.map != null && message.hasOwnProperty("map")) {
                let error = $root.pool.Scene.verify(message.map);
                if (error)
                    return "map." + error;
            }
            if (message.mine != null && message.hasOwnProperty("mine")) {
                let error = $root.pool.PoolPlayerInfo.verify(message.mine);
                if (error)
                    return "mine." + error;
            }
            if (message.enemy != null && message.hasOwnProperty("enemy")) {
                let error = $root.pool.PoolPlayerInfo.verify(message.enemy);
                if (error)
                    return "enemy." + error;
            }
            if (message.useAimTool != null && message.hasOwnProperty("useAimTool"))
                if (typeof message.useAimTool !== "boolean")
                    return "useAimTool: boolean expected";
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                if (!$util.isString(message.gameCode))
                    return "gameCode: string expected";
            if (message.ai != null && message.hasOwnProperty("ai"))
                if (!$util.isInteger(message.ai))
                    return "ai: integer expected";
            if (message.gameRecord != null && message.hasOwnProperty("gameRecord")) {
                let error = $root.pool.GameRecord.verify(message.gameRecord);
                if (error)
                    return "gameRecord." + error;
            }
            return null;
        };

        /**
         * Creates a GameBattle message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.GameBattle
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.GameBattle} GameBattle
         */
        GameBattle.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.GameBattle)
                return object;
            let message = new $root.pool.GameBattle();
            if (object.map != null) {
                if (typeof object.map !== "object")
                    throw TypeError(".pool.GameBattle.map: object expected");
                message.map = $root.pool.Scene.fromObject(object.map);
            }
            if (object.mine != null) {
                if (typeof object.mine !== "object")
                    throw TypeError(".pool.GameBattle.mine: object expected");
                message.mine = $root.pool.PoolPlayerInfo.fromObject(object.mine);
            }
            if (object.enemy != null) {
                if (typeof object.enemy !== "object")
                    throw TypeError(".pool.GameBattle.enemy: object expected");
                message.enemy = $root.pool.PoolPlayerInfo.fromObject(object.enemy);
            }
            if (object.useAimTool != null)
                message.useAimTool = Boolean(object.useAimTool);
            if (object.gameCode != null)
                message.gameCode = String(object.gameCode);
            if (object.ai != null)
                message.ai = object.ai | 0;
            if (object.gameRecord != null) {
                if (typeof object.gameRecord !== "object")
                    throw TypeError(".pool.GameBattle.gameRecord: object expected");
                message.gameRecord = $root.pool.GameRecord.fromObject(object.gameRecord);
            }
            return message;
        };

        /**
         * Creates a plain object from a GameBattle message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.GameBattle
         * @static
         * @param {pool.GameBattle} message GameBattle
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameBattle.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.map = null;
                object.mine = null;
                object.enemy = null;
                object.useAimTool = false;
                object.gameCode = "";
                object.ai = 0;
                object.gameRecord = null;
            }
            if (message.map != null && message.hasOwnProperty("map"))
                object.map = $root.pool.Scene.toObject(message.map, options);
            if (message.mine != null && message.hasOwnProperty("mine"))
                object.mine = $root.pool.PoolPlayerInfo.toObject(message.mine, options);
            if (message.enemy != null && message.hasOwnProperty("enemy"))
                object.enemy = $root.pool.PoolPlayerInfo.toObject(message.enemy, options);
            if (message.useAimTool != null && message.hasOwnProperty("useAimTool"))
                object.useAimTool = message.useAimTool;
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                object.gameCode = message.gameCode;
            if (message.ai != null && message.hasOwnProperty("ai"))
                object.ai = message.ai;
            if (message.gameRecord != null && message.hasOwnProperty("gameRecord"))
                object.gameRecord = $root.pool.GameRecord.toObject(message.gameRecord, options);
            return object;
        };

        /**
         * Converts this GameBattle to JSON.
         * @function toJSON
         * @memberof pool.GameBattle
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameBattle.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameBattle;
    })();

    pool.BallConfig = (function() {

        /**
         * Properties of a BallConfig.
         * @memberof pool
         * @interface IBallConfig
         * @property {number|null} [id] BallConfig id
         * @property {number|null} [x] BallConfig x
         * @property {number|null} [y] BallConfig y
         * @property {boolean|null} [alive] BallConfig alive
         */

        /**
         * Constructs a new BallConfig.
         * @memberof pool
         * @classdesc Represents a BallConfig.
         * @implements IBallConfig
         * @constructor
         * @param {pool.IBallConfig=} [properties] Properties to set
         */
        function BallConfig(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BallConfig id.
         * @member {number} id
         * @memberof pool.BallConfig
         * @instance
         */
        BallConfig.prototype.id = 0;

        /**
         * BallConfig x.
         * @member {number} x
         * @memberof pool.BallConfig
         * @instance
         */
        BallConfig.prototype.x = 0;

        /**
         * BallConfig y.
         * @member {number} y
         * @memberof pool.BallConfig
         * @instance
         */
        BallConfig.prototype.y = 0;

        /**
         * BallConfig alive.
         * @member {boolean} alive
         * @memberof pool.BallConfig
         * @instance
         */
        BallConfig.prototype.alive = false;

        /**
         * Creates a new BallConfig instance using the specified properties.
         * @function create
         * @memberof pool.BallConfig
         * @static
         * @param {pool.IBallConfig=} [properties] Properties to set
         * @returns {pool.BallConfig} BallConfig instance
         */
        BallConfig.create = function create(properties) {
            return new BallConfig(properties);
        };

        /**
         * Encodes the specified BallConfig message. Does not implicitly {@link pool.BallConfig.verify|verify} messages.
         * @function encode
         * @memberof pool.BallConfig
         * @static
         * @param {pool.IBallConfig} message BallConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BallConfig.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.y);
            if (message.alive != null && Object.hasOwnProperty.call(message, "alive"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.alive);
            return writer;
        };

        /**
         * Encodes the specified BallConfig message, length delimited. Does not implicitly {@link pool.BallConfig.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.BallConfig
         * @static
         * @param {pool.IBallConfig} message BallConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BallConfig.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BallConfig message from the specified reader or buffer.
         * @function decode
         * @memberof pool.BallConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.BallConfig} BallConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BallConfig.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.BallConfig();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.x = reader.int32();
                    break;
                case 3:
                    message.y = reader.int32();
                    break;
                case 4:
                    message.alive = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BallConfig message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.BallConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.BallConfig} BallConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BallConfig.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BallConfig message.
         * @function verify
         * @memberof pool.BallConfig
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BallConfig.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.alive != null && message.hasOwnProperty("alive"))
                if (typeof message.alive !== "boolean")
                    return "alive: boolean expected";
            return null;
        };

        /**
         * Creates a BallConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.BallConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.BallConfig} BallConfig
         */
        BallConfig.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.BallConfig)
                return object;
            let message = new $root.pool.BallConfig();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            if (object.alive != null)
                message.alive = Boolean(object.alive);
            return message;
        };

        /**
         * Creates a plain object from a BallConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.BallConfig
         * @static
         * @param {pool.BallConfig} message BallConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BallConfig.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.x = 0;
                object.y = 0;
                object.alive = false;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.alive != null && message.hasOwnProperty("alive"))
                object.alive = message.alive;
            return object;
        };

        /**
         * Converts this BallConfig to JSON.
         * @function toJSON
         * @memberof pool.BallConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BallConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BallConfig;
    })();

    pool.Scene = (function() {

        /**
         * Properties of a Scene.
         * @memberof pool
         * @interface IScene
         * @property {Array.<pool.IBallConfig>|null} [balls] Scene balls
         */

        /**
         * Constructs a new Scene.
         * @memberof pool
         * @classdesc Represents a Scene.
         * @implements IScene
         * @constructor
         * @param {pool.IScene=} [properties] Properties to set
         */
        function Scene(properties) {
            this.balls = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Scene balls.
         * @member {Array.<pool.IBallConfig>} balls
         * @memberof pool.Scene
         * @instance
         */
        Scene.prototype.balls = $util.emptyArray;

        /**
         * Creates a new Scene instance using the specified properties.
         * @function create
         * @memberof pool.Scene
         * @static
         * @param {pool.IScene=} [properties] Properties to set
         * @returns {pool.Scene} Scene instance
         */
        Scene.create = function create(properties) {
            return new Scene(properties);
        };

        /**
         * Encodes the specified Scene message. Does not implicitly {@link pool.Scene.verify|verify} messages.
         * @function encode
         * @memberof pool.Scene
         * @static
         * @param {pool.IScene} message Scene message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Scene.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.balls != null && message.balls.length)
                for (let i = 0; i < message.balls.length; ++i)
                    $root.pool.BallConfig.encode(message.balls[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Scene message, length delimited. Does not implicitly {@link pool.Scene.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.Scene
         * @static
         * @param {pool.IScene} message Scene message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Scene.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Scene message from the specified reader or buffer.
         * @function decode
         * @memberof pool.Scene
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.Scene} Scene
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Scene.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.Scene();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.balls && message.balls.length))
                        message.balls = [];
                    message.balls.push($root.pool.BallConfig.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Scene message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.Scene
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.Scene} Scene
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Scene.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Scene message.
         * @function verify
         * @memberof pool.Scene
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Scene.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.balls != null && message.hasOwnProperty("balls")) {
                if (!Array.isArray(message.balls))
                    return "balls: array expected";
                for (let i = 0; i < message.balls.length; ++i) {
                    let error = $root.pool.BallConfig.verify(message.balls[i]);
                    if (error)
                        return "balls." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Scene message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.Scene
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.Scene} Scene
         */
        Scene.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.Scene)
                return object;
            let message = new $root.pool.Scene();
            if (object.balls) {
                if (!Array.isArray(object.balls))
                    throw TypeError(".pool.Scene.balls: array expected");
                message.balls = [];
                for (let i = 0; i < object.balls.length; ++i) {
                    if (typeof object.balls[i] !== "object")
                        throw TypeError(".pool.Scene.balls: object expected");
                    message.balls[i] = $root.pool.BallConfig.fromObject(object.balls[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Scene message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.Scene
         * @static
         * @param {pool.Scene} message Scene
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Scene.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.balls = [];
            if (message.balls && message.balls.length) {
                object.balls = [];
                for (let j = 0; j < message.balls.length; ++j)
                    object.balls[j] = $root.pool.BallConfig.toObject(message.balls[j], options);
            }
            return object;
        };

        /**
         * Converts this Scene to JSON.
         * @function toJSON
         * @memberof pool.Scene
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Scene.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Scene;
    })();

    pool.TurnState = (function() {

        /**
         * Properties of a TurnState.
         * @memberof pool
         * @interface ITurnState
         * @property {pool.IScene|null} [map] TurnState map
         * @property {number|null} [color] TurnState color
         * @property {number|null} [enemyColor] TurnState enemyColor
         * @property {boolean|null} [isFreeBall] TurnState isFreeBall
         * @property {boolean|null} [isBreak] TurnState isBreak
         * @property {boolean|null} [isNeedSelectHole] TurnState isNeedSelectHole
         * @property {boolean|null} [isNeedSelectBall] TurnState isNeedSelectBall
         * @property {pool.TurnDetail|null} [turnDetail] TurnState turnDetail
         * @property {number|null} [currentPlayerIdx] TurnState currentPlayerIdx
         * @property {number|null} [roundTime] TurnState roundTime
         * @property {number|null} [tick] TurnState tick
         * @property {number|null} [enemyRoundTime] TurnState enemyRoundTime
         * @property {boolean|null} [isNeedResetCueBall] TurnState isNeedResetCueBall
         * @property {number|null} [resetBallX] TurnState resetBallX
         * @property {number|null} [resetBallY] TurnState resetBallY
         * @property {number|null} [myFoulCount] TurnState myFoulCount
         * @property {number|null} [enemyFoulCount] TurnState enemyFoulCount
         * @property {Array.<number>|null} [myInHoleList] TurnState myInHoleList
         * @property {Array.<number>|null} [enemyInHoleList] TurnState enemyInHoleList
         * @property {number|null} [selectedColor] TurnState selectedColor
         * @property {number|null} [enemySelectedColor] TurnState enemySelectedColor
         * @property {Array.<pool.IPoolSeatState>|null} [states] TurnState states
         * @property {pool.TurnOperate|null} [turnOperate] TurnState turnOperate
         * @property {number|null} [winBallCount] TurnState winBallCount
         * @property {pool.BattleFinishReason|null} [finishReason] TurnState finishReason
         * @property {Array.<number>|null} [inHoleList] TurnState inHoleList
         */

        /**
         * Constructs a new TurnState.
         * @memberof pool
         * @classdesc Represents a TurnState.
         * @implements ITurnState
         * @constructor
         * @param {pool.ITurnState=} [properties] Properties to set
         */
        function TurnState(properties) {
            this.myInHoleList = [];
            this.enemyInHoleList = [];
            this.states = [];
            this.inHoleList = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TurnState map.
         * @member {pool.IScene|null|undefined} map
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.map = null;

        /**
         * TurnState color.
         * @member {number} color
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.color = 0;

        /**
         * TurnState enemyColor.
         * @member {number} enemyColor
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.enemyColor = 0;

        /**
         * TurnState isFreeBall.
         * @member {boolean} isFreeBall
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.isFreeBall = false;

        /**
         * TurnState isBreak.
         * @member {boolean} isBreak
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.isBreak = false;

        /**
         * TurnState isNeedSelectHole.
         * @member {boolean} isNeedSelectHole
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.isNeedSelectHole = false;

        /**
         * TurnState isNeedSelectBall.
         * @member {boolean} isNeedSelectBall
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.isNeedSelectBall = false;

        /**
         * TurnState turnDetail.
         * @member {pool.TurnDetail} turnDetail
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.turnDetail = 0;

        /**
         * TurnState currentPlayerIdx.
         * @member {number} currentPlayerIdx
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.currentPlayerIdx = 0;

        /**
         * TurnState roundTime.
         * @member {number} roundTime
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.roundTime = 0;

        /**
         * TurnState tick.
         * @member {number} tick
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.tick = 0;

        /**
         * TurnState enemyRoundTime.
         * @member {number} enemyRoundTime
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.enemyRoundTime = 0;

        /**
         * TurnState isNeedResetCueBall.
         * @member {boolean} isNeedResetCueBall
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.isNeedResetCueBall = false;

        /**
         * TurnState resetBallX.
         * @member {number} resetBallX
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.resetBallX = 0;

        /**
         * TurnState resetBallY.
         * @member {number} resetBallY
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.resetBallY = 0;

        /**
         * TurnState myFoulCount.
         * @member {number} myFoulCount
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.myFoulCount = 0;

        /**
         * TurnState enemyFoulCount.
         * @member {number} enemyFoulCount
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.enemyFoulCount = 0;

        /**
         * TurnState myInHoleList.
         * @member {Array.<number>} myInHoleList
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.myInHoleList = $util.emptyArray;

        /**
         * TurnState enemyInHoleList.
         * @member {Array.<number>} enemyInHoleList
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.enemyInHoleList = $util.emptyArray;

        /**
         * TurnState selectedColor.
         * @member {number} selectedColor
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.selectedColor = 0;

        /**
         * TurnState enemySelectedColor.
         * @member {number} enemySelectedColor
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.enemySelectedColor = 0;

        /**
         * TurnState states.
         * @member {Array.<pool.IPoolSeatState>} states
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.states = $util.emptyArray;

        /**
         * TurnState turnOperate.
         * @member {pool.TurnOperate} turnOperate
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.turnOperate = 0;

        /**
         * TurnState winBallCount.
         * @member {number} winBallCount
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.winBallCount = 0;

        /**
         * TurnState finishReason.
         * @member {pool.BattleFinishReason} finishReason
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.finishReason = 0;

        /**
         * TurnState inHoleList.
         * @member {Array.<number>} inHoleList
         * @memberof pool.TurnState
         * @instance
         */
        TurnState.prototype.inHoleList = $util.emptyArray;

        /**
         * Creates a new TurnState instance using the specified properties.
         * @function create
         * @memberof pool.TurnState
         * @static
         * @param {pool.ITurnState=} [properties] Properties to set
         * @returns {pool.TurnState} TurnState instance
         */
        TurnState.create = function create(properties) {
            return new TurnState(properties);
        };

        /**
         * Encodes the specified TurnState message. Does not implicitly {@link pool.TurnState.verify|verify} messages.
         * @function encode
         * @memberof pool.TurnState
         * @static
         * @param {pool.ITurnState} message TurnState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TurnState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.map != null && Object.hasOwnProperty.call(message, "map"))
                $root.pool.Scene.encode(message.map, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.color != null && Object.hasOwnProperty.call(message, "color"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.color);
            if (message.enemyColor != null && Object.hasOwnProperty.call(message, "enemyColor"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.enemyColor);
            if (message.isFreeBall != null && Object.hasOwnProperty.call(message, "isFreeBall"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isFreeBall);
            if (message.isBreak != null && Object.hasOwnProperty.call(message, "isBreak"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isBreak);
            if (message.isNeedSelectHole != null && Object.hasOwnProperty.call(message, "isNeedSelectHole"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.isNeedSelectHole);
            if (message.isNeedSelectBall != null && Object.hasOwnProperty.call(message, "isNeedSelectBall"))
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.isNeedSelectBall);
            if (message.turnDetail != null && Object.hasOwnProperty.call(message, "turnDetail"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.turnDetail);
            if (message.currentPlayerIdx != null && Object.hasOwnProperty.call(message, "currentPlayerIdx"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.currentPlayerIdx);
            if (message.roundTime != null && Object.hasOwnProperty.call(message, "roundTime"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.roundTime);
            if (message.tick != null && Object.hasOwnProperty.call(message, "tick"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.tick);
            if (message.enemyRoundTime != null && Object.hasOwnProperty.call(message, "enemyRoundTime"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.enemyRoundTime);
            if (message.isNeedResetCueBall != null && Object.hasOwnProperty.call(message, "isNeedResetCueBall"))
                writer.uint32(/* id 14, wireType 0 =*/112).bool(message.isNeedResetCueBall);
            if (message.resetBallX != null && Object.hasOwnProperty.call(message, "resetBallX"))
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.resetBallX);
            if (message.resetBallY != null && Object.hasOwnProperty.call(message, "resetBallY"))
                writer.uint32(/* id 16, wireType 0 =*/128).int32(message.resetBallY);
            if (message.myFoulCount != null && Object.hasOwnProperty.call(message, "myFoulCount"))
                writer.uint32(/* id 17, wireType 0 =*/136).int32(message.myFoulCount);
            if (message.enemyFoulCount != null && Object.hasOwnProperty.call(message, "enemyFoulCount"))
                writer.uint32(/* id 18, wireType 0 =*/144).int32(message.enemyFoulCount);
            if (message.myInHoleList != null && message.myInHoleList.length) {
                writer.uint32(/* id 19, wireType 2 =*/154).fork();
                for (let i = 0; i < message.myInHoleList.length; ++i)
                    writer.int32(message.myInHoleList[i]);
                writer.ldelim();
            }
            if (message.enemyInHoleList != null && message.enemyInHoleList.length) {
                writer.uint32(/* id 20, wireType 2 =*/162).fork();
                for (let i = 0; i < message.enemyInHoleList.length; ++i)
                    writer.int32(message.enemyInHoleList[i]);
                writer.ldelim();
            }
            if (message.selectedColor != null && Object.hasOwnProperty.call(message, "selectedColor"))
                writer.uint32(/* id 21, wireType 0 =*/168).int32(message.selectedColor);
            if (message.enemySelectedColor != null && Object.hasOwnProperty.call(message, "enemySelectedColor"))
                writer.uint32(/* id 22, wireType 0 =*/176).int32(message.enemySelectedColor);
            if (message.states != null && message.states.length)
                for (let i = 0; i < message.states.length; ++i)
                    $root.pool.PoolSeatState.encode(message.states[i], writer.uint32(/* id 23, wireType 2 =*/186).fork()).ldelim();
            if (message.turnOperate != null && Object.hasOwnProperty.call(message, "turnOperate"))
                writer.uint32(/* id 24, wireType 0 =*/192).int32(message.turnOperate);
            if (message.winBallCount != null && Object.hasOwnProperty.call(message, "winBallCount"))
                writer.uint32(/* id 25, wireType 0 =*/200).int32(message.winBallCount);
            if (message.finishReason != null && Object.hasOwnProperty.call(message, "finishReason"))
                writer.uint32(/* id 26, wireType 0 =*/208).int32(message.finishReason);
            if (message.inHoleList != null && message.inHoleList.length) {
                writer.uint32(/* id 27, wireType 2 =*/218).fork();
                for (let i = 0; i < message.inHoleList.length; ++i)
                    writer.int32(message.inHoleList[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified TurnState message, length delimited. Does not implicitly {@link pool.TurnState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.TurnState
         * @static
         * @param {pool.ITurnState} message TurnState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TurnState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TurnState message from the specified reader or buffer.
         * @function decode
         * @memberof pool.TurnState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.TurnState} TurnState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TurnState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.TurnState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.map = $root.pool.Scene.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.color = reader.int32();
                    break;
                case 3:
                    message.enemyColor = reader.int32();
                    break;
                case 4:
                    message.isFreeBall = reader.bool();
                    break;
                case 5:
                    message.isBreak = reader.bool();
                    break;
                case 6:
                    message.isNeedSelectHole = reader.bool();
                    break;
                case 7:
                    message.isNeedSelectBall = reader.bool();
                    break;
                case 8:
                    message.turnDetail = reader.int32();
                    break;
                case 10:
                    message.currentPlayerIdx = reader.int32();
                    break;
                case 11:
                    message.roundTime = reader.int32();
                    break;
                case 12:
                    message.tick = reader.int32();
                    break;
                case 13:
                    message.enemyRoundTime = reader.int32();
                    break;
                case 14:
                    message.isNeedResetCueBall = reader.bool();
                    break;
                case 15:
                    message.resetBallX = reader.int32();
                    break;
                case 16:
                    message.resetBallY = reader.int32();
                    break;
                case 17:
                    message.myFoulCount = reader.int32();
                    break;
                case 18:
                    message.enemyFoulCount = reader.int32();
                    break;
                case 19:
                    if (!(message.myInHoleList && message.myInHoleList.length))
                        message.myInHoleList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.myInHoleList.push(reader.int32());
                    } else
                        message.myInHoleList.push(reader.int32());
                    break;
                case 20:
                    if (!(message.enemyInHoleList && message.enemyInHoleList.length))
                        message.enemyInHoleList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.enemyInHoleList.push(reader.int32());
                    } else
                        message.enemyInHoleList.push(reader.int32());
                    break;
                case 21:
                    message.selectedColor = reader.int32();
                    break;
                case 22:
                    message.enemySelectedColor = reader.int32();
                    break;
                case 23:
                    if (!(message.states && message.states.length))
                        message.states = [];
                    message.states.push($root.pool.PoolSeatState.decode(reader, reader.uint32()));
                    break;
                case 24:
                    message.turnOperate = reader.int32();
                    break;
                case 25:
                    message.winBallCount = reader.int32();
                    break;
                case 26:
                    message.finishReason = reader.int32();
                    break;
                case 27:
                    if (!(message.inHoleList && message.inHoleList.length))
                        message.inHoleList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.inHoleList.push(reader.int32());
                    } else
                        message.inHoleList.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TurnState message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.TurnState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.TurnState} TurnState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TurnState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TurnState message.
         * @function verify
         * @memberof pool.TurnState
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TurnState.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.map != null && message.hasOwnProperty("map")) {
                let error = $root.pool.Scene.verify(message.map);
                if (error)
                    return "map." + error;
            }
            if (message.color != null && message.hasOwnProperty("color"))
                if (!$util.isInteger(message.color))
                    return "color: integer expected";
            if (message.enemyColor != null && message.hasOwnProperty("enemyColor"))
                if (!$util.isInteger(message.enemyColor))
                    return "enemyColor: integer expected";
            if (message.isFreeBall != null && message.hasOwnProperty("isFreeBall"))
                if (typeof message.isFreeBall !== "boolean")
                    return "isFreeBall: boolean expected";
            if (message.isBreak != null && message.hasOwnProperty("isBreak"))
                if (typeof message.isBreak !== "boolean")
                    return "isBreak: boolean expected";
            if (message.isNeedSelectHole != null && message.hasOwnProperty("isNeedSelectHole"))
                if (typeof message.isNeedSelectHole !== "boolean")
                    return "isNeedSelectHole: boolean expected";
            if (message.isNeedSelectBall != null && message.hasOwnProperty("isNeedSelectBall"))
                if (typeof message.isNeedSelectBall !== "boolean")
                    return "isNeedSelectBall: boolean expected";
            if (message.turnDetail != null && message.hasOwnProperty("turnDetail"))
                switch (message.turnDetail) {
                default:
                    return "turnDetail: enum value expected";
                case 0:
                case 101001:
                case 101002:
                case 104003:
                case 104004:
                case 102000:
                case 102001:
                case 102002:
                case 107001:
                case 107002:
                case 103001:
                case 103002:
                case 103003:
                case 103004:
                case 104001:
                case 104002:
                case 105001:
                case 105002:
                case 105003:
                case 105004:
                case 105005:
                case 105006:
                case 105007:
                case 105008:
                case 105009:
                case 105010:
                case 106001:
                case 106002:
                case 108001:
                case 108002:
                case 10800:
                    break;
                }
            if (message.currentPlayerIdx != null && message.hasOwnProperty("currentPlayerIdx"))
                if (!$util.isInteger(message.currentPlayerIdx))
                    return "currentPlayerIdx: integer expected";
            if (message.roundTime != null && message.hasOwnProperty("roundTime"))
                if (!$util.isInteger(message.roundTime))
                    return "roundTime: integer expected";
            if (message.tick != null && message.hasOwnProperty("tick"))
                if (!$util.isInteger(message.tick))
                    return "tick: integer expected";
            if (message.enemyRoundTime != null && message.hasOwnProperty("enemyRoundTime"))
                if (!$util.isInteger(message.enemyRoundTime))
                    return "enemyRoundTime: integer expected";
            if (message.isNeedResetCueBall != null && message.hasOwnProperty("isNeedResetCueBall"))
                if (typeof message.isNeedResetCueBall !== "boolean")
                    return "isNeedResetCueBall: boolean expected";
            if (message.resetBallX != null && message.hasOwnProperty("resetBallX"))
                if (!$util.isInteger(message.resetBallX))
                    return "resetBallX: integer expected";
            if (message.resetBallY != null && message.hasOwnProperty("resetBallY"))
                if (!$util.isInteger(message.resetBallY))
                    return "resetBallY: integer expected";
            if (message.myFoulCount != null && message.hasOwnProperty("myFoulCount"))
                if (!$util.isInteger(message.myFoulCount))
                    return "myFoulCount: integer expected";
            if (message.enemyFoulCount != null && message.hasOwnProperty("enemyFoulCount"))
                if (!$util.isInteger(message.enemyFoulCount))
                    return "enemyFoulCount: integer expected";
            if (message.myInHoleList != null && message.hasOwnProperty("myInHoleList")) {
                if (!Array.isArray(message.myInHoleList))
                    return "myInHoleList: array expected";
                for (let i = 0; i < message.myInHoleList.length; ++i)
                    if (!$util.isInteger(message.myInHoleList[i]))
                        return "myInHoleList: integer[] expected";
            }
            if (message.enemyInHoleList != null && message.hasOwnProperty("enemyInHoleList")) {
                if (!Array.isArray(message.enemyInHoleList))
                    return "enemyInHoleList: array expected";
                for (let i = 0; i < message.enemyInHoleList.length; ++i)
                    if (!$util.isInteger(message.enemyInHoleList[i]))
                        return "enemyInHoleList: integer[] expected";
            }
            if (message.selectedColor != null && message.hasOwnProperty("selectedColor"))
                if (!$util.isInteger(message.selectedColor))
                    return "selectedColor: integer expected";
            if (message.enemySelectedColor != null && message.hasOwnProperty("enemySelectedColor"))
                if (!$util.isInteger(message.enemySelectedColor))
                    return "enemySelectedColor: integer expected";
            if (message.states != null && message.hasOwnProperty("states")) {
                if (!Array.isArray(message.states))
                    return "states: array expected";
                for (let i = 0; i < message.states.length; ++i) {
                    let error = $root.pool.PoolSeatState.verify(message.states[i]);
                    if (error)
                        return "states." + error;
                }
            }
            if (message.turnOperate != null && message.hasOwnProperty("turnOperate"))
                switch (message.turnOperate) {
                default:
                    return "turnOperate: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.winBallCount != null && message.hasOwnProperty("winBallCount"))
                if (!$util.isInteger(message.winBallCount))
                    return "winBallCount: integer expected";
            if (message.finishReason != null && message.hasOwnProperty("finishReason"))
                switch (message.finishReason) {
                default:
                    return "finishReason: enum value expected";
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
                    break;
                }
            if (message.inHoleList != null && message.hasOwnProperty("inHoleList")) {
                if (!Array.isArray(message.inHoleList))
                    return "inHoleList: array expected";
                for (let i = 0; i < message.inHoleList.length; ++i)
                    if (!$util.isInteger(message.inHoleList[i]))
                        return "inHoleList: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a TurnState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.TurnState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.TurnState} TurnState
         */
        TurnState.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.TurnState)
                return object;
            let message = new $root.pool.TurnState();
            if (object.map != null) {
                if (typeof object.map !== "object")
                    throw TypeError(".pool.TurnState.map: object expected");
                message.map = $root.pool.Scene.fromObject(object.map);
            }
            if (object.color != null)
                message.color = object.color | 0;
            if (object.enemyColor != null)
                message.enemyColor = object.enemyColor | 0;
            if (object.isFreeBall != null)
                message.isFreeBall = Boolean(object.isFreeBall);
            if (object.isBreak != null)
                message.isBreak = Boolean(object.isBreak);
            if (object.isNeedSelectHole != null)
                message.isNeedSelectHole = Boolean(object.isNeedSelectHole);
            if (object.isNeedSelectBall != null)
                message.isNeedSelectBall = Boolean(object.isNeedSelectBall);
            switch (object.turnDetail) {
            case "TD_DEFUALT":
            case 0:
                message.turnDetail = 0;
                break;
            case "START_MINE":
            case 101001:
                message.turnDetail = 101001;
                break;
            case "START_ENEMY":
            case 101002:
                message.turnDetail = 101002;
                break;
            case "WIN_GOLDENBREAK":
            case 104003:
                message.turnDetail = 104003;
                break;
            case "LOSE_GOLDENBREAK":
            case 104004:
                message.turnDetail = 104004;
                break;
            case "TURN_NO_COLOR":
            case 102000:
                message.turnDetail = 102000;
                break;
            case "SELECT_FULLCOLOR":
            case 102001:
                message.turnDetail = 102001;
                break;
            case "SELECT_UNFULLCOLOR":
            case 102002:
                message.turnDetail = 102002;
                break;
            case "FREEBALL_MINE":
            case 107001:
                message.turnDetail = 107001;
                break;
            case "FREEBALL_ENEMY":
            case 107002:
                message.turnDetail = 107002;
                break;
            case "TURN_MINE":
            case 103001:
                message.turnDetail = 103001;
                break;
            case "TURN_ENEMY":
            case 103002:
                message.turnDetail = 103002;
                break;
            case "CONTINUE_MINE":
            case 103003:
                message.turnDetail = 103003;
                break;
            case "CONTINUE_ENEMY":
            case 103004:
                message.turnDetail = 103004;
                break;
            case "SELECTHOLE_MINE":
            case 104001:
                message.turnDetail = 104001;
                break;
            case "SELECTHOLE_ENEMY":
            case 104002:
                message.turnDetail = 104002;
                break;
            case "FOUL_BREAK":
            case 105001:
                message.turnDetail = 105001;
                break;
            case "FOUL_BALL_WHITE_INBAG":
            case 105002:
                message.turnDetail = 105002;
                break;
            case "FOUL_CRASH_INVAILD":
            case 105003:
                message.turnDetail = 105003;
                break;
            case "FOUL_INVALID_TOUCHBALL":
            case 105004:
                message.turnDetail = 105004;
                break;
            case "FOUL_INVALID_TOUCH8":
            case 105005:
                message.turnDetail = 105005;
                break;
            case "FOUL_8BALL_ININVAILDBAG":
            case 105006:
                message.turnDetail = 105006;
                break;
            case "FOUL_BALL_EIGHT_INBAG":
            case 105007:
                message.turnDetail = 105007;
                break;
            case "FOUL_BALL_TARGET_ININVAILDBAG":
            case 105008:
                message.turnDetail = 105008;
                break;
            case "FOUL_TIMEOUT":
            case 105009:
                message.turnDetail = 105009;
                break;
            case "FOUL_NOTOUCH":
            case 105010:
                message.turnDetail = 105010;
                break;
            case "FOUL_FULLTIME_MINE":
            case 106001:
                message.turnDetail = 106001;
                break;
            case "FOUL_FULLTIME_ENEMY":
            case 106002:
                message.turnDetail = 106002;
                break;
            case "RESULT_WIN":
            case 108001:
                message.turnDetail = 108001;
                break;
            case "RESULT_LOSE":
            case 108002:
                message.turnDetail = 108002;
                break;
            case "RESULT_GIVEUP":
            case 10800:
                message.turnDetail = 10800;
                break;
            }
            if (object.currentPlayerIdx != null)
                message.currentPlayerIdx = object.currentPlayerIdx | 0;
            if (object.roundTime != null)
                message.roundTime = object.roundTime | 0;
            if (object.tick != null)
                message.tick = object.tick | 0;
            if (object.enemyRoundTime != null)
                message.enemyRoundTime = object.enemyRoundTime | 0;
            if (object.isNeedResetCueBall != null)
                message.isNeedResetCueBall = Boolean(object.isNeedResetCueBall);
            if (object.resetBallX != null)
                message.resetBallX = object.resetBallX | 0;
            if (object.resetBallY != null)
                message.resetBallY = object.resetBallY | 0;
            if (object.myFoulCount != null)
                message.myFoulCount = object.myFoulCount | 0;
            if (object.enemyFoulCount != null)
                message.enemyFoulCount = object.enemyFoulCount | 0;
            if (object.myInHoleList) {
                if (!Array.isArray(object.myInHoleList))
                    throw TypeError(".pool.TurnState.myInHoleList: array expected");
                message.myInHoleList = [];
                for (let i = 0; i < object.myInHoleList.length; ++i)
                    message.myInHoleList[i] = object.myInHoleList[i] | 0;
            }
            if (object.enemyInHoleList) {
                if (!Array.isArray(object.enemyInHoleList))
                    throw TypeError(".pool.TurnState.enemyInHoleList: array expected");
                message.enemyInHoleList = [];
                for (let i = 0; i < object.enemyInHoleList.length; ++i)
                    message.enemyInHoleList[i] = object.enemyInHoleList[i] | 0;
            }
            if (object.selectedColor != null)
                message.selectedColor = object.selectedColor | 0;
            if (object.enemySelectedColor != null)
                message.enemySelectedColor = object.enemySelectedColor | 0;
            if (object.states) {
                if (!Array.isArray(object.states))
                    throw TypeError(".pool.TurnState.states: array expected");
                message.states = [];
                for (let i = 0; i < object.states.length; ++i) {
                    if (typeof object.states[i] !== "object")
                        throw TypeError(".pool.TurnState.states: object expected");
                    message.states[i] = $root.pool.PoolSeatState.fromObject(object.states[i]);
                }
            }
            switch (object.turnOperate) {
            case "CONTINUE":
            case 0:
                message.turnOperate = 0;
                break;
            case "TURN":
            case 1:
                message.turnOperate = 1;
                break;
            case "FOUL":
            case 2:
                message.turnOperate = 2;
                break;
            case "SELECT":
            case 3:
                message.turnOperate = 3;
                break;
            case "WIN":
            case 4:
                message.turnOperate = 4;
                break;
            case "LOSE":
            case 5:
                message.turnOperate = 5;
                break;
            }
            if (object.winBallCount != null)
                message.winBallCount = object.winBallCount | 0;
            switch (object.finishReason) {
            case "NORMAL":
            case 0:
                message.finishReason = 0;
                break;
            case "FULLFOUL":
            case 1:
                message.finishReason = 1;
                break;
            case "TWO_NO_READY":
            case 2:
                message.finishReason = 2;
                break;
            case "TIMEOUT":
            case 3:
                message.finishReason = 3;
                break;
            case "CLEARANCE":
            case 4:
                message.finishReason = 4;
                break;
            case "PERFECT_BREAK":
            case 5:
                message.finishReason = 5;
                break;
            case "BALL8LOSE":
            case 6:
                message.finishReason = 6;
                break;
            case "BALL8NOTINSELECTHOLELOSE":
            case 7:
                message.finishReason = 7;
                break;
            case "DISCONNECTED":
            case 8:
                message.finishReason = 8;
                break;
            case "GIVE_UP":
            case 9:
                message.finishReason = 9;
                break;
            }
            if (object.inHoleList) {
                if (!Array.isArray(object.inHoleList))
                    throw TypeError(".pool.TurnState.inHoleList: array expected");
                message.inHoleList = [];
                for (let i = 0; i < object.inHoleList.length; ++i)
                    message.inHoleList[i] = object.inHoleList[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a TurnState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.TurnState
         * @static
         * @param {pool.TurnState} message TurnState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TurnState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.myInHoleList = [];
                object.enemyInHoleList = [];
                object.states = [];
                object.inHoleList = [];
            }
            if (options.defaults) {
                object.map = null;
                object.color = 0;
                object.enemyColor = 0;
                object.isFreeBall = false;
                object.isBreak = false;
                object.isNeedSelectHole = false;
                object.isNeedSelectBall = false;
                object.turnDetail = options.enums === String ? "TD_DEFUALT" : 0;
                object.currentPlayerIdx = 0;
                object.roundTime = 0;
                object.tick = 0;
                object.enemyRoundTime = 0;
                object.isNeedResetCueBall = false;
                object.resetBallX = 0;
                object.resetBallY = 0;
                object.myFoulCount = 0;
                object.enemyFoulCount = 0;
                object.selectedColor = 0;
                object.enemySelectedColor = 0;
                object.turnOperate = options.enums === String ? "CONTINUE" : 0;
                object.winBallCount = 0;
                object.finishReason = options.enums === String ? "NORMAL" : 0;
            }
            if (message.map != null && message.hasOwnProperty("map"))
                object.map = $root.pool.Scene.toObject(message.map, options);
            if (message.color != null && message.hasOwnProperty("color"))
                object.color = message.color;
            if (message.enemyColor != null && message.hasOwnProperty("enemyColor"))
                object.enemyColor = message.enemyColor;
            if (message.isFreeBall != null && message.hasOwnProperty("isFreeBall"))
                object.isFreeBall = message.isFreeBall;
            if (message.isBreak != null && message.hasOwnProperty("isBreak"))
                object.isBreak = message.isBreak;
            if (message.isNeedSelectHole != null && message.hasOwnProperty("isNeedSelectHole"))
                object.isNeedSelectHole = message.isNeedSelectHole;
            if (message.isNeedSelectBall != null && message.hasOwnProperty("isNeedSelectBall"))
                object.isNeedSelectBall = message.isNeedSelectBall;
            if (message.turnDetail != null && message.hasOwnProperty("turnDetail"))
                object.turnDetail = options.enums === String ? $root.pool.TurnDetail[message.turnDetail] : message.turnDetail;
            if (message.currentPlayerIdx != null && message.hasOwnProperty("currentPlayerIdx"))
                object.currentPlayerIdx = message.currentPlayerIdx;
            if (message.roundTime != null && message.hasOwnProperty("roundTime"))
                object.roundTime = message.roundTime;
            if (message.tick != null && message.hasOwnProperty("tick"))
                object.tick = message.tick;
            if (message.enemyRoundTime != null && message.hasOwnProperty("enemyRoundTime"))
                object.enemyRoundTime = message.enemyRoundTime;
            if (message.isNeedResetCueBall != null && message.hasOwnProperty("isNeedResetCueBall"))
                object.isNeedResetCueBall = message.isNeedResetCueBall;
            if (message.resetBallX != null && message.hasOwnProperty("resetBallX"))
                object.resetBallX = message.resetBallX;
            if (message.resetBallY != null && message.hasOwnProperty("resetBallY"))
                object.resetBallY = message.resetBallY;
            if (message.myFoulCount != null && message.hasOwnProperty("myFoulCount"))
                object.myFoulCount = message.myFoulCount;
            if (message.enemyFoulCount != null && message.hasOwnProperty("enemyFoulCount"))
                object.enemyFoulCount = message.enemyFoulCount;
            if (message.myInHoleList && message.myInHoleList.length) {
                object.myInHoleList = [];
                for (let j = 0; j < message.myInHoleList.length; ++j)
                    object.myInHoleList[j] = message.myInHoleList[j];
            }
            if (message.enemyInHoleList && message.enemyInHoleList.length) {
                object.enemyInHoleList = [];
                for (let j = 0; j < message.enemyInHoleList.length; ++j)
                    object.enemyInHoleList[j] = message.enemyInHoleList[j];
            }
            if (message.selectedColor != null && message.hasOwnProperty("selectedColor"))
                object.selectedColor = message.selectedColor;
            if (message.enemySelectedColor != null && message.hasOwnProperty("enemySelectedColor"))
                object.enemySelectedColor = message.enemySelectedColor;
            if (message.states && message.states.length) {
                object.states = [];
                for (let j = 0; j < message.states.length; ++j)
                    object.states[j] = $root.pool.PoolSeatState.toObject(message.states[j], options);
            }
            if (message.turnOperate != null && message.hasOwnProperty("turnOperate"))
                object.turnOperate = options.enums === String ? $root.pool.TurnOperate[message.turnOperate] : message.turnOperate;
            if (message.winBallCount != null && message.hasOwnProperty("winBallCount"))
                object.winBallCount = message.winBallCount;
            if (message.finishReason != null && message.hasOwnProperty("finishReason"))
                object.finishReason = options.enums === String ? $root.pool.BattleFinishReason[message.finishReason] : message.finishReason;
            if (message.inHoleList && message.inHoleList.length) {
                object.inHoleList = [];
                for (let j = 0; j < message.inHoleList.length; ++j)
                    object.inHoleList[j] = message.inHoleList[j];
            }
            return object;
        };

        /**
         * Converts this TurnState to JSON.
         * @function toJSON
         * @memberof pool.TurnState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TurnState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TurnState;
    })();

    pool.Operate = (function() {

        /**
         * Properties of an Operate.
         * @memberof pool
         * @interface IOperate
         * @property {number|null} [x] Operate x
         * @property {number|null} [y] Operate y
         * @property {number|null} [force] Operate force
         * @property {number|null} [id] Operate id
         * @property {pool.OperateState|null} [state] Operate state
         * @property {pool.SyncTag|null} [syntag] Operate syntag
         */

        /**
         * Constructs a new Operate.
         * @memberof pool
         * @classdesc Represents an Operate.
         * @implements IOperate
         * @constructor
         * @param {pool.IOperate=} [properties] Properties to set
         */
        function Operate(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Operate x.
         * @member {number} x
         * @memberof pool.Operate
         * @instance
         */
        Operate.prototype.x = 0;

        /**
         * Operate y.
         * @member {number} y
         * @memberof pool.Operate
         * @instance
         */
        Operate.prototype.y = 0;

        /**
         * Operate force.
         * @member {number} force
         * @memberof pool.Operate
         * @instance
         */
        Operate.prototype.force = 0;

        /**
         * Operate id.
         * @member {number} id
         * @memberof pool.Operate
         * @instance
         */
        Operate.prototype.id = 0;

        /**
         * Operate state.
         * @member {pool.OperateState} state
         * @memberof pool.Operate
         * @instance
         */
        Operate.prototype.state = 0;

        /**
         * Operate syntag.
         * @member {pool.SyncTag} syntag
         * @memberof pool.Operate
         * @instance
         */
        Operate.prototype.syntag = 0;

        /**
         * Creates a new Operate instance using the specified properties.
         * @function create
         * @memberof pool.Operate
         * @static
         * @param {pool.IOperate=} [properties] Properties to set
         * @returns {pool.Operate} Operate instance
         */
        Operate.create = function create(properties) {
            return new Operate(properties);
        };

        /**
         * Encodes the specified Operate message. Does not implicitly {@link pool.Operate.verify|verify} messages.
         * @function encode
         * @memberof pool.Operate
         * @static
         * @param {pool.IOperate} message Operate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Operate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.y);
            if (message.force != null && Object.hasOwnProperty.call(message, "force"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.force);
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.id);
            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.state);
            if (message.syntag != null && Object.hasOwnProperty.call(message, "syntag"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.syntag);
            return writer;
        };

        /**
         * Encodes the specified Operate message, length delimited. Does not implicitly {@link pool.Operate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.Operate
         * @static
         * @param {pool.IOperate} message Operate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Operate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Operate message from the specified reader or buffer.
         * @function decode
         * @memberof pool.Operate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.Operate} Operate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Operate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.Operate();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.x = reader.int32();
                    break;
                case 2:
                    message.y = reader.int32();
                    break;
                case 3:
                    message.force = reader.int32();
                    break;
                case 4:
                    message.id = reader.int32();
                    break;
                case 5:
                    message.state = reader.int32();
                    break;
                case 6:
                    message.syntag = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Operate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.Operate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.Operate} Operate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Operate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Operate message.
         * @function verify
         * @memberof pool.Operate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Operate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.force != null && message.hasOwnProperty("force"))
                if (!$util.isInteger(message.force))
                    return "force: integer expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.state != null && message.hasOwnProperty("state"))
                switch (message.state) {
                default:
                    return "state: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.syntag != null && message.hasOwnProperty("syntag"))
                switch (message.syntag) {
                default:
                    return "syntag: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            return null;
        };

        /**
         * Creates an Operate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.Operate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.Operate} Operate
         */
        Operate.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.Operate)
                return object;
            let message = new $root.pool.Operate();
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            if (object.force != null)
                message.force = object.force | 0;
            if (object.id != null)
                message.id = object.id | 0;
            switch (object.state) {
            case "OS_DEFUALT":
            case 0:
                message.state = 0;
                break;
            case "MOVE":
            case 1:
                message.state = 1;
                break;
            }
            switch (object.syntag) {
            case "NONE":
            case 0:
                message.syntag = 0;
                break;
            case "BEGIN":
            case 1:
                message.syntag = 1;
                break;
            case "INTER":
            case 2:
                message.syntag = 2;
                break;
            case "FINISH":
            case 3:
                message.syntag = 3;
                break;
            case "IMMEDIATE":
            case 4:
                message.syntag = 4;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an Operate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.Operate
         * @static
         * @param {pool.Operate} message Operate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Operate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.force = 0;
                object.id = 0;
                object.state = options.enums === String ? "OS_DEFUALT" : 0;
                object.syntag = options.enums === String ? "NONE" : 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.force != null && message.hasOwnProperty("force"))
                object.force = message.force;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = options.enums === String ? $root.pool.OperateState[message.state] : message.state;
            if (message.syntag != null && message.hasOwnProperty("syntag"))
                object.syntag = options.enums === String ? $root.pool.SyncTag[message.syntag] : message.syntag;
            return object;
        };

        /**
         * Converts this Operate to JSON.
         * @function toJSON
         * @memberof pool.Operate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Operate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Operate;
    })();

    pool.OperateHit = (function() {

        /**
         * Properties of an OperateHit.
         * @memberof pool
         * @interface IOperateHit
         * @property {pool.IScene|null} [map] OperateHit map
         * @property {number|null} [vigor] OperateHit vigor
         * @property {number|null} [rx] OperateHit rx
         * @property {number|null} [ry] OperateHit ry
         * @property {number|null} [tx] OperateHit tx
         * @property {number|null} [ty] OperateHit ty
         * @property {number|null} [prerx] OperateHit prerx
         * @property {number|null} [prery] OperateHit prery
         * @property {pool.AimResult|null} [aimResult] OperateHit aimResult
         * @property {pool.ITurnState|null} [turnState] OperateHit turnState
         * @property {number|null} [tick] OperateHit tick
         */

        /**
         * Constructs a new OperateHit.
         * @memberof pool
         * @classdesc Represents an OperateHit.
         * @implements IOperateHit
         * @constructor
         * @param {pool.IOperateHit=} [properties] Properties to set
         */
        function OperateHit(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OperateHit map.
         * @member {pool.IScene|null|undefined} map
         * @memberof pool.OperateHit
         * @instance
         */
        OperateHit.prototype.map = null;

        /**
         * OperateHit vigor.
         * @member {number} vigor
         * @memberof pool.OperateHit
         * @instance
         */
        OperateHit.prototype.vigor = 0;

        /**
         * OperateHit rx.
         * @member {number} rx
         * @memberof pool.OperateHit
         * @instance
         */
        OperateHit.prototype.rx = 0;

        /**
         * OperateHit ry.
         * @member {number} ry
         * @memberof pool.OperateHit
         * @instance
         */
        OperateHit.prototype.ry = 0;

        /**
         * OperateHit tx.
         * @member {number} tx
         * @memberof pool.OperateHit
         * @instance
         */
        OperateHit.prototype.tx = 0;

        /**
         * OperateHit ty.
         * @member {number} ty
         * @memberof pool.OperateHit
         * @instance
         */
        OperateHit.prototype.ty = 0;

        /**
         * OperateHit prerx.
         * @member {number} prerx
         * @memberof pool.OperateHit
         * @instance
         */
        OperateHit.prototype.prerx = 0;

        /**
         * OperateHit prery.
         * @member {number} prery
         * @memberof pool.OperateHit
         * @instance
         */
        OperateHit.prototype.prery = 0;

        /**
         * OperateHit aimResult.
         * @member {pool.AimResult} aimResult
         * @memberof pool.OperateHit
         * @instance
         */
        OperateHit.prototype.aimResult = 0;

        /**
         * OperateHit turnState.
         * @member {pool.ITurnState|null|undefined} turnState
         * @memberof pool.OperateHit
         * @instance
         */
        OperateHit.prototype.turnState = null;

        /**
         * OperateHit tick.
         * @member {number} tick
         * @memberof pool.OperateHit
         * @instance
         */
        OperateHit.prototype.tick = 0;

        /**
         * Creates a new OperateHit instance using the specified properties.
         * @function create
         * @memberof pool.OperateHit
         * @static
         * @param {pool.IOperateHit=} [properties] Properties to set
         * @returns {pool.OperateHit} OperateHit instance
         */
        OperateHit.create = function create(properties) {
            return new OperateHit(properties);
        };

        /**
         * Encodes the specified OperateHit message. Does not implicitly {@link pool.OperateHit.verify|verify} messages.
         * @function encode
         * @memberof pool.OperateHit
         * @static
         * @param {pool.IOperateHit} message OperateHit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperateHit.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.map != null && Object.hasOwnProperty.call(message, "map"))
                $root.pool.Scene.encode(message.map, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.vigor != null && Object.hasOwnProperty.call(message, "vigor"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.vigor);
            if (message.rx != null && Object.hasOwnProperty.call(message, "rx"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.rx);
            if (message.ry != null && Object.hasOwnProperty.call(message, "ry"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.ry);
            if (message.tx != null && Object.hasOwnProperty.call(message, "tx"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.tx);
            if (message.ty != null && Object.hasOwnProperty.call(message, "ty"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.ty);
            if (message.prerx != null && Object.hasOwnProperty.call(message, "prerx"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.prerx);
            if (message.prery != null && Object.hasOwnProperty.call(message, "prery"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.prery);
            if (message.aimResult != null && Object.hasOwnProperty.call(message, "aimResult"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.aimResult);
            if (message.turnState != null && Object.hasOwnProperty.call(message, "turnState"))
                $root.pool.TurnState.encode(message.turnState, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.tick != null && Object.hasOwnProperty.call(message, "tick"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.tick);
            return writer;
        };

        /**
         * Encodes the specified OperateHit message, length delimited. Does not implicitly {@link pool.OperateHit.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.OperateHit
         * @static
         * @param {pool.IOperateHit} message OperateHit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperateHit.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OperateHit message from the specified reader or buffer.
         * @function decode
         * @memberof pool.OperateHit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.OperateHit} OperateHit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OperateHit.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.OperateHit();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.map = $root.pool.Scene.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.vigor = reader.int32();
                    break;
                case 3:
                    message.rx = reader.int32();
                    break;
                case 4:
                    message.ry = reader.int32();
                    break;
                case 5:
                    message.tx = reader.int32();
                    break;
                case 6:
                    message.ty = reader.int32();
                    break;
                case 7:
                    message.prerx = reader.int32();
                    break;
                case 8:
                    message.prery = reader.int32();
                    break;
                case 9:
                    message.aimResult = reader.int32();
                    break;
                case 10:
                    message.turnState = $root.pool.TurnState.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.tick = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OperateHit message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.OperateHit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.OperateHit} OperateHit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OperateHit.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OperateHit message.
         * @function verify
         * @memberof pool.OperateHit
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OperateHit.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.map != null && message.hasOwnProperty("map")) {
                let error = $root.pool.Scene.verify(message.map);
                if (error)
                    return "map." + error;
            }
            if (message.vigor != null && message.hasOwnProperty("vigor"))
                if (!$util.isInteger(message.vigor))
                    return "vigor: integer expected";
            if (message.rx != null && message.hasOwnProperty("rx"))
                if (!$util.isInteger(message.rx))
                    return "rx: integer expected";
            if (message.ry != null && message.hasOwnProperty("ry"))
                if (!$util.isInteger(message.ry))
                    return "ry: integer expected";
            if (message.tx != null && message.hasOwnProperty("tx"))
                if (!$util.isInteger(message.tx))
                    return "tx: integer expected";
            if (message.ty != null && message.hasOwnProperty("ty"))
                if (!$util.isInteger(message.ty))
                    return "ty: integer expected";
            if (message.prerx != null && message.hasOwnProperty("prerx"))
                if (!$util.isInteger(message.prerx))
                    return "prerx: integer expected";
            if (message.prery != null && message.hasOwnProperty("prery"))
                if (!$util.isInteger(message.prery))
                    return "prery: integer expected";
            if (message.aimResult != null && message.hasOwnProperty("aimResult"))
                switch (message.aimResult) {
                default:
                    return "aimResult: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.turnState != null && message.hasOwnProperty("turnState")) {
                let error = $root.pool.TurnState.verify(message.turnState);
                if (error)
                    return "turnState." + error;
            }
            if (message.tick != null && message.hasOwnProperty("tick"))
                if (!$util.isInteger(message.tick))
                    return "tick: integer expected";
            return null;
        };

        /**
         * Creates an OperateHit message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.OperateHit
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.OperateHit} OperateHit
         */
        OperateHit.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.OperateHit)
                return object;
            let message = new $root.pool.OperateHit();
            if (object.map != null) {
                if (typeof object.map !== "object")
                    throw TypeError(".pool.OperateHit.map: object expected");
                message.map = $root.pool.Scene.fromObject(object.map);
            }
            if (object.vigor != null)
                message.vigor = object.vigor | 0;
            if (object.rx != null)
                message.rx = object.rx | 0;
            if (object.ry != null)
                message.ry = object.ry | 0;
            if (object.tx != null)
                message.tx = object.tx | 0;
            if (object.ty != null)
                message.ty = object.ty | 0;
            if (object.prerx != null)
                message.prerx = object.prerx | 0;
            if (object.prery != null)
                message.prery = object.prery | 0;
            switch (object.aimResult) {
            case "GOOD":
            case 0:
                message.aimResult = 0;
                break;
            case "BAD":
            case 1:
                message.aimResult = 1;
                break;
            case "FAILED":
            case 2:
                message.aimResult = 2;
                break;
            }
            if (object.turnState != null) {
                if (typeof object.turnState !== "object")
                    throw TypeError(".pool.OperateHit.turnState: object expected");
                message.turnState = $root.pool.TurnState.fromObject(object.turnState);
            }
            if (object.tick != null)
                message.tick = object.tick | 0;
            return message;
        };

        /**
         * Creates a plain object from an OperateHit message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.OperateHit
         * @static
         * @param {pool.OperateHit} message OperateHit
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OperateHit.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.map = null;
                object.vigor = 0;
                object.rx = 0;
                object.ry = 0;
                object.tx = 0;
                object.ty = 0;
                object.prerx = 0;
                object.prery = 0;
                object.aimResult = options.enums === String ? "GOOD" : 0;
                object.turnState = null;
                object.tick = 0;
            }
            if (message.map != null && message.hasOwnProperty("map"))
                object.map = $root.pool.Scene.toObject(message.map, options);
            if (message.vigor != null && message.hasOwnProperty("vigor"))
                object.vigor = message.vigor;
            if (message.rx != null && message.hasOwnProperty("rx"))
                object.rx = message.rx;
            if (message.ry != null && message.hasOwnProperty("ry"))
                object.ry = message.ry;
            if (message.tx != null && message.hasOwnProperty("tx"))
                object.tx = message.tx;
            if (message.ty != null && message.hasOwnProperty("ty"))
                object.ty = message.ty;
            if (message.prerx != null && message.hasOwnProperty("prerx"))
                object.prerx = message.prerx;
            if (message.prery != null && message.hasOwnProperty("prery"))
                object.prery = message.prery;
            if (message.aimResult != null && message.hasOwnProperty("aimResult"))
                object.aimResult = options.enums === String ? $root.pool.AimResult[message.aimResult] : message.aimResult;
            if (message.turnState != null && message.hasOwnProperty("turnState"))
                object.turnState = $root.pool.TurnState.toObject(message.turnState, options);
            if (message.tick != null && message.hasOwnProperty("tick"))
                object.tick = message.tick;
            return object;
        };

        /**
         * Converts this OperateHit to JSON.
         * @function toJSON
         * @memberof pool.OperateHit
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OperateHit.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OperateHit;
    })();

    pool.Talk = (function() {

        /**
         * Properties of a Talk.
         * @memberof pool
         * @interface ITalk
         * @property {string|null} [id] Talk id
         * @property {number|null} [playerIdx] Talk playerIdx
         */

        /**
         * Constructs a new Talk.
         * @memberof pool
         * @classdesc Represents a Talk.
         * @implements ITalk
         * @constructor
         * @param {pool.ITalk=} [properties] Properties to set
         */
        function Talk(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Talk id.
         * @member {string} id
         * @memberof pool.Talk
         * @instance
         */
        Talk.prototype.id = "";

        /**
         * Talk playerIdx.
         * @member {number} playerIdx
         * @memberof pool.Talk
         * @instance
         */
        Talk.prototype.playerIdx = 0;

        /**
         * Creates a new Talk instance using the specified properties.
         * @function create
         * @memberof pool.Talk
         * @static
         * @param {pool.ITalk=} [properties] Properties to set
         * @returns {pool.Talk} Talk instance
         */
        Talk.create = function create(properties) {
            return new Talk(properties);
        };

        /**
         * Encodes the specified Talk message. Does not implicitly {@link pool.Talk.verify|verify} messages.
         * @function encode
         * @memberof pool.Talk
         * @static
         * @param {pool.ITalk} message Talk message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Talk.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.playerIdx != null && Object.hasOwnProperty.call(message, "playerIdx"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.playerIdx);
            return writer;
        };

        /**
         * Encodes the specified Talk message, length delimited. Does not implicitly {@link pool.Talk.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.Talk
         * @static
         * @param {pool.ITalk} message Talk message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Talk.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Talk message from the specified reader or buffer.
         * @function decode
         * @memberof pool.Talk
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.Talk} Talk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Talk.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.Talk();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.playerIdx = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Talk message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.Talk
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.Talk} Talk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Talk.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Talk message.
         * @function verify
         * @memberof pool.Talk
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Talk.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.playerIdx != null && message.hasOwnProperty("playerIdx"))
                if (!$util.isInteger(message.playerIdx))
                    return "playerIdx: integer expected";
            return null;
        };

        /**
         * Creates a Talk message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.Talk
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.Talk} Talk
         */
        Talk.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.Talk)
                return object;
            let message = new $root.pool.Talk();
            if (object.id != null)
                message.id = String(object.id);
            if (object.playerIdx != null)
                message.playerIdx = object.playerIdx | 0;
            return message;
        };

        /**
         * Creates a plain object from a Talk message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.Talk
         * @static
         * @param {pool.Talk} message Talk
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Talk.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.playerIdx = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.playerIdx != null && message.hasOwnProperty("playerIdx"))
                object.playerIdx = message.playerIdx;
            return object;
        };

        /**
         * Converts this Talk to JSON.
         * @function toJSON
         * @memberof pool.Talk
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Talk.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Talk;
    })();

    pool.PraiseData = (function() {

        /**
         * Properties of a PraiseData.
         * @memberof pool
         * @interface IPraiseData
         * @property {Array.<pool.IPraise>|null} [myPraise] PraiseData myPraise
         * @property {Array.<pool.IPraise>|null} [enemyPraise] PraiseData enemyPraise
         */

        /**
         * Constructs a new PraiseData.
         * @memberof pool
         * @classdesc Represents a PraiseData.
         * @implements IPraiseData
         * @constructor
         * @param {pool.IPraiseData=} [properties] Properties to set
         */
        function PraiseData(properties) {
            this.myPraise = [];
            this.enemyPraise = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PraiseData myPraise.
         * @member {Array.<pool.IPraise>} myPraise
         * @memberof pool.PraiseData
         * @instance
         */
        PraiseData.prototype.myPraise = $util.emptyArray;

        /**
         * PraiseData enemyPraise.
         * @member {Array.<pool.IPraise>} enemyPraise
         * @memberof pool.PraiseData
         * @instance
         */
        PraiseData.prototype.enemyPraise = $util.emptyArray;

        /**
         * Creates a new PraiseData instance using the specified properties.
         * @function create
         * @memberof pool.PraiseData
         * @static
         * @param {pool.IPraiseData=} [properties] Properties to set
         * @returns {pool.PraiseData} PraiseData instance
         */
        PraiseData.create = function create(properties) {
            return new PraiseData(properties);
        };

        /**
         * Encodes the specified PraiseData message. Does not implicitly {@link pool.PraiseData.verify|verify} messages.
         * @function encode
         * @memberof pool.PraiseData
         * @static
         * @param {pool.IPraiseData} message PraiseData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PraiseData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.myPraise != null && message.myPraise.length)
                for (let i = 0; i < message.myPraise.length; ++i)
                    $root.pool.Praise.encode(message.myPraise[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.enemyPraise != null && message.enemyPraise.length)
                for (let i = 0; i < message.enemyPraise.length; ++i)
                    $root.pool.Praise.encode(message.enemyPraise[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PraiseData message, length delimited. Does not implicitly {@link pool.PraiseData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.PraiseData
         * @static
         * @param {pool.IPraiseData} message PraiseData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PraiseData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PraiseData message from the specified reader or buffer.
         * @function decode
         * @memberof pool.PraiseData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.PraiseData} PraiseData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PraiseData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.PraiseData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.myPraise && message.myPraise.length))
                        message.myPraise = [];
                    message.myPraise.push($root.pool.Praise.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message.enemyPraise && message.enemyPraise.length))
                        message.enemyPraise = [];
                    message.enemyPraise.push($root.pool.Praise.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PraiseData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.PraiseData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.PraiseData} PraiseData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PraiseData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PraiseData message.
         * @function verify
         * @memberof pool.PraiseData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PraiseData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.myPraise != null && message.hasOwnProperty("myPraise")) {
                if (!Array.isArray(message.myPraise))
                    return "myPraise: array expected";
                for (let i = 0; i < message.myPraise.length; ++i) {
                    let error = $root.pool.Praise.verify(message.myPraise[i]);
                    if (error)
                        return "myPraise." + error;
                }
            }
            if (message.enemyPraise != null && message.hasOwnProperty("enemyPraise")) {
                if (!Array.isArray(message.enemyPraise))
                    return "enemyPraise: array expected";
                for (let i = 0; i < message.enemyPraise.length; ++i) {
                    let error = $root.pool.Praise.verify(message.enemyPraise[i]);
                    if (error)
                        return "enemyPraise." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PraiseData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.PraiseData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.PraiseData} PraiseData
         */
        PraiseData.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.PraiseData)
                return object;
            let message = new $root.pool.PraiseData();
            if (object.myPraise) {
                if (!Array.isArray(object.myPraise))
                    throw TypeError(".pool.PraiseData.myPraise: array expected");
                message.myPraise = [];
                for (let i = 0; i < object.myPraise.length; ++i) {
                    if (typeof object.myPraise[i] !== "object")
                        throw TypeError(".pool.PraiseData.myPraise: object expected");
                    message.myPraise[i] = $root.pool.Praise.fromObject(object.myPraise[i]);
                }
            }
            if (object.enemyPraise) {
                if (!Array.isArray(object.enemyPraise))
                    throw TypeError(".pool.PraiseData.enemyPraise: array expected");
                message.enemyPraise = [];
                for (let i = 0; i < object.enemyPraise.length; ++i) {
                    if (typeof object.enemyPraise[i] !== "object")
                        throw TypeError(".pool.PraiseData.enemyPraise: object expected");
                    message.enemyPraise[i] = $root.pool.Praise.fromObject(object.enemyPraise[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PraiseData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.PraiseData
         * @static
         * @param {pool.PraiseData} message PraiseData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PraiseData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.myPraise = [];
                object.enemyPraise = [];
            }
            if (message.myPraise && message.myPraise.length) {
                object.myPraise = [];
                for (let j = 0; j < message.myPraise.length; ++j)
                    object.myPraise[j] = $root.pool.Praise.toObject(message.myPraise[j], options);
            }
            if (message.enemyPraise && message.enemyPraise.length) {
                object.enemyPraise = [];
                for (let j = 0; j < message.enemyPraise.length; ++j)
                    object.enemyPraise[j] = $root.pool.Praise.toObject(message.enemyPraise[j], options);
            }
            return object;
        };

        /**
         * Converts this PraiseData to JSON.
         * @function toJSON
         * @memberof pool.PraiseData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PraiseData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PraiseData;
    })();

    pool.Praise = (function() {

        /**
         * Properties of a Praise.
         * @memberof pool
         * @interface IPraise
         * @property {pool.PraiseType|null} [type] Praise type
         * @property {pool.PraiseQuality|null} [quality] Praise quality
         */

        /**
         * Constructs a new Praise.
         * @memberof pool
         * @classdesc Represents a Praise.
         * @implements IPraise
         * @constructor
         * @param {pool.IPraise=} [properties] Properties to set
         */
        function Praise(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Praise type.
         * @member {pool.PraiseType} type
         * @memberof pool.Praise
         * @instance
         */
        Praise.prototype.type = 0;

        /**
         * Praise quality.
         * @member {pool.PraiseQuality} quality
         * @memberof pool.Praise
         * @instance
         */
        Praise.prototype.quality = 0;

        /**
         * Creates a new Praise instance using the specified properties.
         * @function create
         * @memberof pool.Praise
         * @static
         * @param {pool.IPraise=} [properties] Properties to set
         * @returns {pool.Praise} Praise instance
         */
        Praise.create = function create(properties) {
            return new Praise(properties);
        };

        /**
         * Encodes the specified Praise message. Does not implicitly {@link pool.Praise.verify|verify} messages.
         * @function encode
         * @memberof pool.Praise
         * @static
         * @param {pool.IPraise} message Praise message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Praise.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.quality != null && Object.hasOwnProperty.call(message, "quality"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.quality);
            return writer;
        };

        /**
         * Encodes the specified Praise message, length delimited. Does not implicitly {@link pool.Praise.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.Praise
         * @static
         * @param {pool.IPraise} message Praise message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Praise.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Praise message from the specified reader or buffer.
         * @function decode
         * @memberof pool.Praise
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.Praise} Praise
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Praise.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.Praise();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.quality = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Praise message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.Praise
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.Praise} Praise
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Praise.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Praise message.
         * @function verify
         * @memberof pool.Praise
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Praise.verify = function verify(message) {
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
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                    break;
                }
            if (message.quality != null && message.hasOwnProperty("quality"))
                switch (message.quality) {
                default:
                    return "quality: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case -1:
                    break;
                }
            return null;
        };

        /**
         * Creates a Praise message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.Praise
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.Praise} Praise
         */
        Praise.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.Praise)
                return object;
            let message = new $root.pool.Praise();
            switch (object.type) {
            case "PT_NONE":
            case 0:
                message.type = 0;
                break;
            case "REVERT":
            case 1:
                message.type = 1;
                break;
            case "STUN":
            case 2:
                message.type = 2;
                break;
            case "PASS":
            case 3:
                message.type = 3;
                break;
            case "BORROW":
            case 4:
                message.type = 4;
                break;
            case "SNOOKER":
            case 5:
                message.type = 5;
                break;
            case "KICK":
            case 6:
                message.type = 6;
                break;
            case "TOP_SPIN":
            case 7:
                message.type = 7;
                break;
            case "BACK_SPIN":
            case 8:
                message.type = 8;
                break;
            case "CURVE":
            case 9:
                message.type = 9;
                break;
            case "LONG":
            case 10:
                message.type = 10;
                break;
            case "THIN_CUT":
            case 11:
                message.type = 11;
                break;
            case "BREAK":
            case 12:
                message.type = 12;
                break;
            case "PT_FAIL":
            case 13:
                message.type = 13;
                break;
            case "LUCK":
            case 14:
                message.type = 14;
                break;
            }
            switch (object.quality) {
            case "PQ_NONE":
            case 0:
                message.quality = 0;
                break;
            case "NICE":
            case 1:
                message.quality = 1;
                break;
            case "GREAT":
            case 2:
                message.quality = 2;
                break;
            case "AMAZING":
            case 3:
                message.quality = 3;
                break;
            case "UNBELIEVABLE":
            case 4:
                message.quality = 4;
                break;
            case "PQ_FAIL":
            case -1:
                message.quality = -1;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a Praise message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.Praise
         * @static
         * @param {pool.Praise} message Praise
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Praise.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "PT_NONE" : 0;
                object.quality = options.enums === String ? "PQ_NONE" : 0;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.pool.PraiseType[message.type] : message.type;
            if (message.quality != null && message.hasOwnProperty("quality"))
                object.quality = options.enums === String ? $root.pool.PraiseQuality[message.quality] : message.quality;
            return object;
        };

        /**
         * Converts this Praise to JSON.
         * @function toJSON
         * @memberof pool.Praise
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Praise.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Praise;
    })();

    pool.FoulData = (function() {

        /**
         * Properties of a FoulData.
         * @memberof pool
         * @interface IFoulData
         * @property {number|null} [myFoulCount] FoulData myFoulCount
         * @property {number|null} [enemyFoulCount] FoulData enemyFoulCount
         */

        /**
         * Constructs a new FoulData.
         * @memberof pool
         * @classdesc Represents a FoulData.
         * @implements IFoulData
         * @constructor
         * @param {pool.IFoulData=} [properties] Properties to set
         */
        function FoulData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FoulData myFoulCount.
         * @member {number} myFoulCount
         * @memberof pool.FoulData
         * @instance
         */
        FoulData.prototype.myFoulCount = 0;

        /**
         * FoulData enemyFoulCount.
         * @member {number} enemyFoulCount
         * @memberof pool.FoulData
         * @instance
         */
        FoulData.prototype.enemyFoulCount = 0;

        /**
         * Creates a new FoulData instance using the specified properties.
         * @function create
         * @memberof pool.FoulData
         * @static
         * @param {pool.IFoulData=} [properties] Properties to set
         * @returns {pool.FoulData} FoulData instance
         */
        FoulData.create = function create(properties) {
            return new FoulData(properties);
        };

        /**
         * Encodes the specified FoulData message. Does not implicitly {@link pool.FoulData.verify|verify} messages.
         * @function encode
         * @memberof pool.FoulData
         * @static
         * @param {pool.IFoulData} message FoulData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FoulData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.myFoulCount != null && Object.hasOwnProperty.call(message, "myFoulCount"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.myFoulCount);
            if (message.enemyFoulCount != null && Object.hasOwnProperty.call(message, "enemyFoulCount"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.enemyFoulCount);
            return writer;
        };

        /**
         * Encodes the specified FoulData message, length delimited. Does not implicitly {@link pool.FoulData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.FoulData
         * @static
         * @param {pool.IFoulData} message FoulData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FoulData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FoulData message from the specified reader or buffer.
         * @function decode
         * @memberof pool.FoulData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.FoulData} FoulData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FoulData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.FoulData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.myFoulCount = reader.int32();
                    break;
                case 2:
                    message.enemyFoulCount = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FoulData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.FoulData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.FoulData} FoulData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FoulData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FoulData message.
         * @function verify
         * @memberof pool.FoulData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FoulData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.myFoulCount != null && message.hasOwnProperty("myFoulCount"))
                if (!$util.isInteger(message.myFoulCount))
                    return "myFoulCount: integer expected";
            if (message.enemyFoulCount != null && message.hasOwnProperty("enemyFoulCount"))
                if (!$util.isInteger(message.enemyFoulCount))
                    return "enemyFoulCount: integer expected";
            return null;
        };

        /**
         * Creates a FoulData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.FoulData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.FoulData} FoulData
         */
        FoulData.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.FoulData)
                return object;
            let message = new $root.pool.FoulData();
            if (object.myFoulCount != null)
                message.myFoulCount = object.myFoulCount | 0;
            if (object.enemyFoulCount != null)
                message.enemyFoulCount = object.enemyFoulCount | 0;
            return message;
        };

        /**
         * Creates a plain object from a FoulData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.FoulData
         * @static
         * @param {pool.FoulData} message FoulData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FoulData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.myFoulCount = 0;
                object.enemyFoulCount = 0;
            }
            if (message.myFoulCount != null && message.hasOwnProperty("myFoulCount"))
                object.myFoulCount = message.myFoulCount;
            if (message.enemyFoulCount != null && message.hasOwnProperty("enemyFoulCount"))
                object.enemyFoulCount = message.enemyFoulCount;
            return object;
        };

        /**
         * Converts this FoulData to JSON.
         * @function toJSON
         * @memberof pool.FoulData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FoulData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return FoulData;
    })();

    pool.ResultInfo = (function() {

        /**
         * Properties of a ResultInfo.
         * @memberof pool
         * @interface IResultInfo
         * @property {pool.BattleFinishReason|null} [reason] ResultInfo reason
         * @property {number|null} [winBallCount] ResultInfo winBallCount
         */

        /**
         * Constructs a new ResultInfo.
         * @memberof pool
         * @classdesc Represents a ResultInfo.
         * @implements IResultInfo
         * @constructor
         * @param {pool.IResultInfo=} [properties] Properties to set
         */
        function ResultInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ResultInfo reason.
         * @member {pool.BattleFinishReason} reason
         * @memberof pool.ResultInfo
         * @instance
         */
        ResultInfo.prototype.reason = 0;

        /**
         * ResultInfo winBallCount.
         * @member {number} winBallCount
         * @memberof pool.ResultInfo
         * @instance
         */
        ResultInfo.prototype.winBallCount = 0;

        /**
         * Creates a new ResultInfo instance using the specified properties.
         * @function create
         * @memberof pool.ResultInfo
         * @static
         * @param {pool.IResultInfo=} [properties] Properties to set
         * @returns {pool.ResultInfo} ResultInfo instance
         */
        ResultInfo.create = function create(properties) {
            return new ResultInfo(properties);
        };

        /**
         * Encodes the specified ResultInfo message. Does not implicitly {@link pool.ResultInfo.verify|verify} messages.
         * @function encode
         * @memberof pool.ResultInfo
         * @static
         * @param {pool.IResultInfo} message ResultInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResultInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.reason);
            if (message.winBallCount != null && Object.hasOwnProperty.call(message, "winBallCount"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.winBallCount);
            return writer;
        };

        /**
         * Encodes the specified ResultInfo message, length delimited. Does not implicitly {@link pool.ResultInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.ResultInfo
         * @static
         * @param {pool.IResultInfo} message ResultInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResultInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ResultInfo message from the specified reader or buffer.
         * @function decode
         * @memberof pool.ResultInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.ResultInfo} ResultInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResultInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.ResultInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reason = reader.int32();
                    break;
                case 2:
                    message.winBallCount = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ResultInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.ResultInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.ResultInfo} ResultInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResultInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ResultInfo message.
         * @function verify
         * @memberof pool.ResultInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ResultInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reason != null && message.hasOwnProperty("reason"))
                switch (message.reason) {
                default:
                    return "reason: enum value expected";
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
                    break;
                }
            if (message.winBallCount != null && message.hasOwnProperty("winBallCount"))
                if (!$util.isInteger(message.winBallCount))
                    return "winBallCount: integer expected";
            return null;
        };

        /**
         * Creates a ResultInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.ResultInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.ResultInfo} ResultInfo
         */
        ResultInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.ResultInfo)
                return object;
            let message = new $root.pool.ResultInfo();
            switch (object.reason) {
            case "NORMAL":
            case 0:
                message.reason = 0;
                break;
            case "FULLFOUL":
            case 1:
                message.reason = 1;
                break;
            case "TWO_NO_READY":
            case 2:
                message.reason = 2;
                break;
            case "TIMEOUT":
            case 3:
                message.reason = 3;
                break;
            case "CLEARANCE":
            case 4:
                message.reason = 4;
                break;
            case "PERFECT_BREAK":
            case 5:
                message.reason = 5;
                break;
            case "BALL8LOSE":
            case 6:
                message.reason = 6;
                break;
            case "BALL8NOTINSELECTHOLELOSE":
            case 7:
                message.reason = 7;
                break;
            case "DISCONNECTED":
            case 8:
                message.reason = 8;
                break;
            case "GIVE_UP":
            case 9:
                message.reason = 9;
                break;
            }
            if (object.winBallCount != null)
                message.winBallCount = object.winBallCount | 0;
            return message;
        };

        /**
         * Creates a plain object from a ResultInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.ResultInfo
         * @static
         * @param {pool.ResultInfo} message ResultInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ResultInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.reason = options.enums === String ? "NORMAL" : 0;
                object.winBallCount = 0;
            }
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = options.enums === String ? $root.pool.BattleFinishReason[message.reason] : message.reason;
            if (message.winBallCount != null && message.hasOwnProperty("winBallCount"))
                object.winBallCount = message.winBallCount;
            return object;
        };

        /**
         * Converts this ResultInfo to JSON.
         * @function toJSON
         * @memberof pool.ResultInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ResultInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ResultInfo;
    })();

    pool.TimeOutEvent = (function() {

        /**
         * Properties of a TimeOutEvent.
         * @memberof pool
         * @interface ITimeOutEvent
         * @property {number|null} [seat] TimeOutEvent seat
         */

        /**
         * Constructs a new TimeOutEvent.
         * @memberof pool
         * @classdesc Represents a TimeOutEvent.
         * @implements ITimeOutEvent
         * @constructor
         * @param {pool.ITimeOutEvent=} [properties] Properties to set
         */
        function TimeOutEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TimeOutEvent seat.
         * @member {number} seat
         * @memberof pool.TimeOutEvent
         * @instance
         */
        TimeOutEvent.prototype.seat = 0;

        /**
         * Creates a new TimeOutEvent instance using the specified properties.
         * @function create
         * @memberof pool.TimeOutEvent
         * @static
         * @param {pool.ITimeOutEvent=} [properties] Properties to set
         * @returns {pool.TimeOutEvent} TimeOutEvent instance
         */
        TimeOutEvent.create = function create(properties) {
            return new TimeOutEvent(properties);
        };

        /**
         * Encodes the specified TimeOutEvent message. Does not implicitly {@link pool.TimeOutEvent.verify|verify} messages.
         * @function encode
         * @memberof pool.TimeOutEvent
         * @static
         * @param {pool.ITimeOutEvent} message TimeOutEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TimeOutEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            return writer;
        };

        /**
         * Encodes the specified TimeOutEvent message, length delimited. Does not implicitly {@link pool.TimeOutEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.TimeOutEvent
         * @static
         * @param {pool.ITimeOutEvent} message TimeOutEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TimeOutEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TimeOutEvent message from the specified reader or buffer.
         * @function decode
         * @memberof pool.TimeOutEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.TimeOutEvent} TimeOutEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TimeOutEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.TimeOutEvent();
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
         * Decodes a TimeOutEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.TimeOutEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.TimeOutEvent} TimeOutEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TimeOutEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TimeOutEvent message.
         * @function verify
         * @memberof pool.TimeOutEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TimeOutEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            return null;
        };

        /**
         * Creates a TimeOutEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.TimeOutEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.TimeOutEvent} TimeOutEvent
         */
        TimeOutEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.TimeOutEvent)
                return object;
            let message = new $root.pool.TimeOutEvent();
            if (object.seat != null)
                message.seat = object.seat | 0;
            return message;
        };

        /**
         * Creates a plain object from a TimeOutEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.TimeOutEvent
         * @static
         * @param {pool.TimeOutEvent} message TimeOutEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TimeOutEvent.toObject = function toObject(message, options) {
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
         * Converts this TimeOutEvent to JSON.
         * @function toJSON
         * @memberof pool.TimeOutEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TimeOutEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TimeOutEvent;
    })();

    /**
     * AimResult enum.
     * @name pool.AimResult
     * @enum {number}
     * @property {number} GOOD=0 GOOD value
     * @property {number} BAD=1 BAD value
     * @property {number} FAILED=2 FAILED value
     */
    pool.AimResult = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "GOOD"] = 0;
        values[valuesById[1] = "BAD"] = 1;
        values[valuesById[2] = "FAILED"] = 2;
        return values;
    })();

    /**
     * OperateState enum.
     * @name pool.OperateState
     * @enum {number}
     * @property {number} OS_DEFUALT=0 OS_DEFUALT value
     * @property {number} MOVE=1 MOVE value
     */
    pool.OperateState = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "OS_DEFUALT"] = 0;
        values[valuesById[1] = "MOVE"] = 1;
        return values;
    })();

    /**
     * SyncTag enum.
     * @name pool.SyncTag
     * @enum {number}
     * @property {number} NONE=0 NONE value
     * @property {number} BEGIN=1 BEGIN value
     * @property {number} INTER=2 INTER value
     * @property {number} FINISH=3 FINISH value
     * @property {number} IMMEDIATE=4 IMMEDIATE value
     */
    pool.SyncTag = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NONE"] = 0;
        values[valuesById[1] = "BEGIN"] = 1;
        values[valuesById[2] = "INTER"] = 2;
        values[valuesById[3] = "FINISH"] = 3;
        values[valuesById[4] = "IMMEDIATE"] = 4;
        return values;
    })();

    /**
     * TurnOperate enum.
     * @name pool.TurnOperate
     * @enum {number}
     * @property {number} CONTINUE=0 CONTINUE value
     * @property {number} TURN=1 TURN value
     * @property {number} FOUL=2 FOUL value
     * @property {number} SELECT=3 SELECT value
     * @property {number} WIN=4 WIN value
     * @property {number} LOSE=5 LOSE value
     */
    pool.TurnOperate = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "CONTINUE"] = 0;
        values[valuesById[1] = "TURN"] = 1;
        values[valuesById[2] = "FOUL"] = 2;
        values[valuesById[3] = "SELECT"] = 3;
        values[valuesById[4] = "WIN"] = 4;
        values[valuesById[5] = "LOSE"] = 5;
        return values;
    })();

    /**
     * TurnDetail enum.
     * @name pool.TurnDetail
     * @enum {number}
     * @property {number} TD_DEFUALT=0 TD_DEFUALT value
     * @property {number} START_MINE=101001 START_MINE value
     * @property {number} START_ENEMY=101002 START_ENEMY value
     * @property {number} WIN_GOLDENBREAK=104003 WIN_GOLDENBREAK value
     * @property {number} LOSE_GOLDENBREAK=104004 LOSE_GOLDENBREAK value
     * @property {number} TURN_NO_COLOR=102000 TURN_NO_COLOR value
     * @property {number} SELECT_FULLCOLOR=102001 SELECT_FULLCOLOR value
     * @property {number} SELECT_UNFULLCOLOR=102002 SELECT_UNFULLCOLOR value
     * @property {number} FREEBALL_MINE=107001 FREEBALL_MINE value
     * @property {number} FREEBALL_ENEMY=107002 FREEBALL_ENEMY value
     * @property {number} TURN_MINE=103001 TURN_MINE value
     * @property {number} TURN_ENEMY=103002 TURN_ENEMY value
     * @property {number} CONTINUE_MINE=103003 CONTINUE_MINE value
     * @property {number} CONTINUE_ENEMY=103004 CONTINUE_ENEMY value
     * @property {number} SELECTHOLE_MINE=104001 SELECTHOLE_MINE value
     * @property {number} SELECTHOLE_ENEMY=104002 SELECTHOLE_ENEMY value
     * @property {number} FOUL_BREAK=105001 FOUL_BREAK value
     * @property {number} FOUL_BALL_WHITE_INBAG=105002 FOUL_BALL_WHITE_INBAG value
     * @property {number} FOUL_CRASH_INVAILD=105003 FOUL_CRASH_INVAILD value
     * @property {number} FOUL_INVALID_TOUCHBALL=105004 FOUL_INVALID_TOUCHBALL value
     * @property {number} FOUL_INVALID_TOUCH8=105005 FOUL_INVALID_TOUCH8 value
     * @property {number} FOUL_8BALL_ININVAILDBAG=105006 FOUL_8BALL_ININVAILDBAG value
     * @property {number} FOUL_BALL_EIGHT_INBAG=105007 FOUL_BALL_EIGHT_INBAG value
     * @property {number} FOUL_BALL_TARGET_ININVAILDBAG=105008 FOUL_BALL_TARGET_ININVAILDBAG value
     * @property {number} FOUL_TIMEOUT=105009 FOUL_TIMEOUT value
     * @property {number} FOUL_NOTOUCH=105010 FOUL_NOTOUCH value
     * @property {number} FOUL_FULLTIME_MINE=106001 FOUL_FULLTIME_MINE value
     * @property {number} FOUL_FULLTIME_ENEMY=106002 FOUL_FULLTIME_ENEMY value
     * @property {number} RESULT_WIN=108001 RESULT_WIN value
     * @property {number} RESULT_LOSE=108002 RESULT_LOSE value
     * @property {number} RESULT_GIVEUP=10800 RESULT_GIVEUP value
     */
    pool.TurnDetail = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "TD_DEFUALT"] = 0;
        values[valuesById[101001] = "START_MINE"] = 101001;
        values[valuesById[101002] = "START_ENEMY"] = 101002;
        values[valuesById[104003] = "WIN_GOLDENBREAK"] = 104003;
        values[valuesById[104004] = "LOSE_GOLDENBREAK"] = 104004;
        values[valuesById[102000] = "TURN_NO_COLOR"] = 102000;
        values[valuesById[102001] = "SELECT_FULLCOLOR"] = 102001;
        values[valuesById[102002] = "SELECT_UNFULLCOLOR"] = 102002;
        values[valuesById[107001] = "FREEBALL_MINE"] = 107001;
        values[valuesById[107002] = "FREEBALL_ENEMY"] = 107002;
        values[valuesById[103001] = "TURN_MINE"] = 103001;
        values[valuesById[103002] = "TURN_ENEMY"] = 103002;
        values[valuesById[103003] = "CONTINUE_MINE"] = 103003;
        values[valuesById[103004] = "CONTINUE_ENEMY"] = 103004;
        values[valuesById[104001] = "SELECTHOLE_MINE"] = 104001;
        values[valuesById[104002] = "SELECTHOLE_ENEMY"] = 104002;
        values[valuesById[105001] = "FOUL_BREAK"] = 105001;
        values[valuesById[105002] = "FOUL_BALL_WHITE_INBAG"] = 105002;
        values[valuesById[105003] = "FOUL_CRASH_INVAILD"] = 105003;
        values[valuesById[105004] = "FOUL_INVALID_TOUCHBALL"] = 105004;
        values[valuesById[105005] = "FOUL_INVALID_TOUCH8"] = 105005;
        values[valuesById[105006] = "FOUL_8BALL_ININVAILDBAG"] = 105006;
        values[valuesById[105007] = "FOUL_BALL_EIGHT_INBAG"] = 105007;
        values[valuesById[105008] = "FOUL_BALL_TARGET_ININVAILDBAG"] = 105008;
        values[valuesById[105009] = "FOUL_TIMEOUT"] = 105009;
        values[valuesById[105010] = "FOUL_NOTOUCH"] = 105010;
        values[valuesById[106001] = "FOUL_FULLTIME_MINE"] = 106001;
        values[valuesById[106002] = "FOUL_FULLTIME_ENEMY"] = 106002;
        values[valuesById[108001] = "RESULT_WIN"] = 108001;
        values[valuesById[108002] = "RESULT_LOSE"] = 108002;
        values[valuesById[10800] = "RESULT_GIVEUP"] = 10800;
        return values;
    })();

    /**
     * BattleFinishReason enum.
     * @name pool.BattleFinishReason
     * @enum {number}
     * @property {number} NORMAL=0 NORMAL value
     * @property {number} FULLFOUL=1 FULLFOUL value
     * @property {number} TWO_NO_READY=2 TWO_NO_READY value
     * @property {number} TIMEOUT=3 TIMEOUT value
     * @property {number} CLEARANCE=4 CLEARANCE value
     * @property {number} PERFECT_BREAK=5 PERFECT_BREAK value
     * @property {number} BALL8LOSE=6 BALL8LOSE value
     * @property {number} BALL8NOTINSELECTHOLELOSE=7 BALL8NOTINSELECTHOLELOSE value
     * @property {number} DISCONNECTED=8 DISCONNECTED value
     * @property {number} GIVE_UP=9 GIVE_UP value
     */
    pool.BattleFinishReason = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NORMAL"] = 0;
        values[valuesById[1] = "FULLFOUL"] = 1;
        values[valuesById[2] = "TWO_NO_READY"] = 2;
        values[valuesById[3] = "TIMEOUT"] = 3;
        values[valuesById[4] = "CLEARANCE"] = 4;
        values[valuesById[5] = "PERFECT_BREAK"] = 5;
        values[valuesById[6] = "BALL8LOSE"] = 6;
        values[valuesById[7] = "BALL8NOTINSELECTHOLELOSE"] = 7;
        values[valuesById[8] = "DISCONNECTED"] = 8;
        values[valuesById[9] = "GIVE_UP"] = 9;
        return values;
    })();

    /**
     * PraiseType enum.
     * @name pool.PraiseType
     * @enum {number}
     * @property {number} PT_NONE=0 PT_NONE value
     * @property {number} REVERT=1 REVERT value
     * @property {number} STUN=2 STUN value
     * @property {number} PASS=3 PASS value
     * @property {number} BORROW=4 BORROW value
     * @property {number} SNOOKER=5 SNOOKER value
     * @property {number} KICK=6 KICK value
     * @property {number} TOP_SPIN=7 TOP_SPIN value
     * @property {number} BACK_SPIN=8 BACK_SPIN value
     * @property {number} CURVE=9 CURVE value
     * @property {number} LONG=10 LONG value
     * @property {number} THIN_CUT=11 THIN_CUT value
     * @property {number} BREAK=12 BREAK value
     * @property {number} PT_FAIL=13 PT_FAIL value
     * @property {number} LUCK=14 LUCK value
     */
    pool.PraiseType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "PT_NONE"] = 0;
        values[valuesById[1] = "REVERT"] = 1;
        values[valuesById[2] = "STUN"] = 2;
        values[valuesById[3] = "PASS"] = 3;
        values[valuesById[4] = "BORROW"] = 4;
        values[valuesById[5] = "SNOOKER"] = 5;
        values[valuesById[6] = "KICK"] = 6;
        values[valuesById[7] = "TOP_SPIN"] = 7;
        values[valuesById[8] = "BACK_SPIN"] = 8;
        values[valuesById[9] = "CURVE"] = 9;
        values[valuesById[10] = "LONG"] = 10;
        values[valuesById[11] = "THIN_CUT"] = 11;
        values[valuesById[12] = "BREAK"] = 12;
        values[valuesById[13] = "PT_FAIL"] = 13;
        values[valuesById[14] = "LUCK"] = 14;
        return values;
    })();

    /**
     * PraiseQuality enum.
     * @name pool.PraiseQuality
     * @enum {number}
     * @property {number} PQ_NONE=0 PQ_NONE value
     * @property {number} NICE=1 NICE value
     * @property {number} GREAT=2 GREAT value
     * @property {number} AMAZING=3 AMAZING value
     * @property {number} UNBELIEVABLE=4 UNBELIEVABLE value
     * @property {number} PQ_FAIL=-1 PQ_FAIL value
     */
    pool.PraiseQuality = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "PQ_NONE"] = 0;
        values[valuesById[1] = "NICE"] = 1;
        values[valuesById[2] = "GREAT"] = 2;
        values[valuesById[3] = "AMAZING"] = 3;
        values[valuesById[4] = "UNBELIEVABLE"] = 4;
        values[valuesById[-1] = "PQ_FAIL"] = -1;
        return values;
    })();

    pool.GameSettle = (function() {

        /**
         * Properties of a GameSettle.
         * @memberof pool
         * @interface IGameSettle
         * @property {number|null} [winBet] GameSettle winBet
         * @property {number|null} [winnerSeat] GameSettle winnerSeat
         * @property {number|Long|null} [winnerPlayerId] GameSettle winnerPlayerId
         * @property {pool.ITurnState|null} [turnState] GameSettle turnState
         */

        /**
         * Constructs a new GameSettle.
         * @memberof pool
         * @classdesc Represents a GameSettle.
         * @implements IGameSettle
         * @constructor
         * @param {pool.IGameSettle=} [properties] Properties to set
         */
        function GameSettle(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameSettle winBet.
         * @member {number} winBet
         * @memberof pool.GameSettle
         * @instance
         */
        GameSettle.prototype.winBet = 0;

        /**
         * GameSettle winnerSeat.
         * @member {number} winnerSeat
         * @memberof pool.GameSettle
         * @instance
         */
        GameSettle.prototype.winnerSeat = 0;

        /**
         * GameSettle winnerPlayerId.
         * @member {number|Long} winnerPlayerId
         * @memberof pool.GameSettle
         * @instance
         */
        GameSettle.prototype.winnerPlayerId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * GameSettle turnState.
         * @member {pool.ITurnState|null|undefined} turnState
         * @memberof pool.GameSettle
         * @instance
         */
        GameSettle.prototype.turnState = null;

        /**
         * Creates a new GameSettle instance using the specified properties.
         * @function create
         * @memberof pool.GameSettle
         * @static
         * @param {pool.IGameSettle=} [properties] Properties to set
         * @returns {pool.GameSettle} GameSettle instance
         */
        GameSettle.create = function create(properties) {
            return new GameSettle(properties);
        };

        /**
         * Encodes the specified GameSettle message. Does not implicitly {@link pool.GameSettle.verify|verify} messages.
         * @function encode
         * @memberof pool.GameSettle
         * @static
         * @param {pool.IGameSettle} message GameSettle message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameSettle.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.winBet != null && Object.hasOwnProperty.call(message, "winBet"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.winBet);
            if (message.winnerSeat != null && Object.hasOwnProperty.call(message, "winnerSeat"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.winnerSeat);
            if (message.winnerPlayerId != null && Object.hasOwnProperty.call(message, "winnerPlayerId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.winnerPlayerId);
            if (message.turnState != null && Object.hasOwnProperty.call(message, "turnState"))
                $root.pool.TurnState.encode(message.turnState, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GameSettle message, length delimited. Does not implicitly {@link pool.GameSettle.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.GameSettle
         * @static
         * @param {pool.IGameSettle} message GameSettle message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameSettle.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameSettle message from the specified reader or buffer.
         * @function decode
         * @memberof pool.GameSettle
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.GameSettle} GameSettle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameSettle.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.GameSettle();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.winBet = reader.int32();
                    break;
                case 2:
                    message.winnerSeat = reader.int32();
                    break;
                case 3:
                    message.winnerPlayerId = reader.uint64();
                    break;
                case 4:
                    message.turnState = $root.pool.TurnState.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameSettle message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.GameSettle
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.GameSettle} GameSettle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameSettle.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameSettle message.
         * @function verify
         * @memberof pool.GameSettle
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameSettle.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.winBet != null && message.hasOwnProperty("winBet"))
                if (!$util.isInteger(message.winBet))
                    return "winBet: integer expected";
            if (message.winnerSeat != null && message.hasOwnProperty("winnerSeat"))
                if (!$util.isInteger(message.winnerSeat))
                    return "winnerSeat: integer expected";
            if (message.winnerPlayerId != null && message.hasOwnProperty("winnerPlayerId"))
                if (!$util.isInteger(message.winnerPlayerId) && !(message.winnerPlayerId && $util.isInteger(message.winnerPlayerId.low) && $util.isInteger(message.winnerPlayerId.high)))
                    return "winnerPlayerId: integer|Long expected";
            if (message.turnState != null && message.hasOwnProperty("turnState")) {
                let error = $root.pool.TurnState.verify(message.turnState);
                if (error)
                    return "turnState." + error;
            }
            return null;
        };

        /**
         * Creates a GameSettle message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.GameSettle
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.GameSettle} GameSettle
         */
        GameSettle.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.GameSettle)
                return object;
            let message = new $root.pool.GameSettle();
            if (object.winBet != null)
                message.winBet = object.winBet | 0;
            if (object.winnerSeat != null)
                message.winnerSeat = object.winnerSeat | 0;
            if (object.winnerPlayerId != null)
                if ($util.Long)
                    (message.winnerPlayerId = $util.Long.fromValue(object.winnerPlayerId)).unsigned = true;
                else if (typeof object.winnerPlayerId === "string")
                    message.winnerPlayerId = parseInt(object.winnerPlayerId, 10);
                else if (typeof object.winnerPlayerId === "number")
                    message.winnerPlayerId = object.winnerPlayerId;
                else if (typeof object.winnerPlayerId === "object")
                    message.winnerPlayerId = new $util.LongBits(object.winnerPlayerId.low >>> 0, object.winnerPlayerId.high >>> 0).toNumber(true);
            if (object.turnState != null) {
                if (typeof object.turnState !== "object")
                    throw TypeError(".pool.GameSettle.turnState: object expected");
                message.turnState = $root.pool.TurnState.fromObject(object.turnState);
            }
            return message;
        };

        /**
         * Creates a plain object from a GameSettle message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.GameSettle
         * @static
         * @param {pool.GameSettle} message GameSettle
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameSettle.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.winBet = 0;
                object.winnerSeat = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.winnerPlayerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.winnerPlayerId = options.longs === String ? "0" : 0;
                object.turnState = null;
            }
            if (message.winBet != null && message.hasOwnProperty("winBet"))
                object.winBet = message.winBet;
            if (message.winnerSeat != null && message.hasOwnProperty("winnerSeat"))
                object.winnerSeat = message.winnerSeat;
            if (message.winnerPlayerId != null && message.hasOwnProperty("winnerPlayerId"))
                if (typeof message.winnerPlayerId === "number")
                    object.winnerPlayerId = options.longs === String ? String(message.winnerPlayerId) : message.winnerPlayerId;
                else
                    object.winnerPlayerId = options.longs === String ? $util.Long.prototype.toString.call(message.winnerPlayerId) : options.longs === Number ? new $util.LongBits(message.winnerPlayerId.low >>> 0, message.winnerPlayerId.high >>> 0).toNumber(true) : message.winnerPlayerId;
            if (message.turnState != null && message.hasOwnProperty("turnState"))
                object.turnState = $root.pool.TurnState.toObject(message.turnState, options);
            return object;
        };

        /**
         * Converts this GameSettle to JSON.
         * @function toJSON
         * @memberof pool.GameSettle
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameSettle.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameSettle;
    })();

    pool.GameRecord = (function() {

        /**
         * Properties of a GameRecord.
         * @memberof pool
         * @interface IGameRecord
         * @property {pool.IScene|null} [map] GameRecord map
         * @property {Array.<pool.ITurnRecord>|null} [record] GameRecord record
         */

        /**
         * Constructs a new GameRecord.
         * @memberof pool
         * @classdesc Represents a GameRecord.
         * @implements IGameRecord
         * @constructor
         * @param {pool.IGameRecord=} [properties] Properties to set
         */
        function GameRecord(properties) {
            this.record = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameRecord map.
         * @member {pool.IScene|null|undefined} map
         * @memberof pool.GameRecord
         * @instance
         */
        GameRecord.prototype.map = null;

        /**
         * GameRecord record.
         * @member {Array.<pool.ITurnRecord>} record
         * @memberof pool.GameRecord
         * @instance
         */
        GameRecord.prototype.record = $util.emptyArray;

        /**
         * Creates a new GameRecord instance using the specified properties.
         * @function create
         * @memberof pool.GameRecord
         * @static
         * @param {pool.IGameRecord=} [properties] Properties to set
         * @returns {pool.GameRecord} GameRecord instance
         */
        GameRecord.create = function create(properties) {
            return new GameRecord(properties);
        };

        /**
         * Encodes the specified GameRecord message. Does not implicitly {@link pool.GameRecord.verify|verify} messages.
         * @function encode
         * @memberof pool.GameRecord
         * @static
         * @param {pool.IGameRecord} message GameRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameRecord.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.map != null && Object.hasOwnProperty.call(message, "map"))
                $root.pool.Scene.encode(message.map, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.record != null && message.record.length)
                for (let i = 0; i < message.record.length; ++i)
                    $root.pool.TurnRecord.encode(message.record[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GameRecord message, length delimited. Does not implicitly {@link pool.GameRecord.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.GameRecord
         * @static
         * @param {pool.IGameRecord} message GameRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameRecord.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameRecord message from the specified reader or buffer.
         * @function decode
         * @memberof pool.GameRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.GameRecord} GameRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameRecord.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.GameRecord();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.map = $root.pool.Scene.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.record && message.record.length))
                        message.record = [];
                    message.record.push($root.pool.TurnRecord.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameRecord message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.GameRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.GameRecord} GameRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameRecord.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameRecord message.
         * @function verify
         * @memberof pool.GameRecord
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameRecord.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.map != null && message.hasOwnProperty("map")) {
                let error = $root.pool.Scene.verify(message.map);
                if (error)
                    return "map." + error;
            }
            if (message.record != null && message.hasOwnProperty("record")) {
                if (!Array.isArray(message.record))
                    return "record: array expected";
                for (let i = 0; i < message.record.length; ++i) {
                    let error = $root.pool.TurnRecord.verify(message.record[i]);
                    if (error)
                        return "record." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GameRecord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.GameRecord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.GameRecord} GameRecord
         */
        GameRecord.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.GameRecord)
                return object;
            let message = new $root.pool.GameRecord();
            if (object.map != null) {
                if (typeof object.map !== "object")
                    throw TypeError(".pool.GameRecord.map: object expected");
                message.map = $root.pool.Scene.fromObject(object.map);
            }
            if (object.record) {
                if (!Array.isArray(object.record))
                    throw TypeError(".pool.GameRecord.record: array expected");
                message.record = [];
                for (let i = 0; i < object.record.length; ++i) {
                    if (typeof object.record[i] !== "object")
                        throw TypeError(".pool.GameRecord.record: object expected");
                    message.record[i] = $root.pool.TurnRecord.fromObject(object.record[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GameRecord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.GameRecord
         * @static
         * @param {pool.GameRecord} message GameRecord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameRecord.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.record = [];
            if (options.defaults)
                object.map = null;
            if (message.map != null && message.hasOwnProperty("map"))
                object.map = $root.pool.Scene.toObject(message.map, options);
            if (message.record && message.record.length) {
                object.record = [];
                for (let j = 0; j < message.record.length; ++j)
                    object.record[j] = $root.pool.TurnRecord.toObject(message.record[j], options);
            }
            return object;
        };

        /**
         * Converts this GameRecord to JSON.
         * @function toJSON
         * @memberof pool.GameRecord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameRecord;
    })();

    pool.TurnRecord = (function() {

        /**
         * Properties of a TurnRecord.
         * @memberof pool
         * @interface ITurnRecord
         * @property {number|null} [turnIdx] TurnRecord turnIdx
         * @property {Array.<pool.IAction>|null} [actions] TurnRecord actions
         */

        /**
         * Constructs a new TurnRecord.
         * @memberof pool
         * @classdesc Represents a TurnRecord.
         * @implements ITurnRecord
         * @constructor
         * @param {pool.ITurnRecord=} [properties] Properties to set
         */
        function TurnRecord(properties) {
            this.actions = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TurnRecord turnIdx.
         * @member {number} turnIdx
         * @memberof pool.TurnRecord
         * @instance
         */
        TurnRecord.prototype.turnIdx = 0;

        /**
         * TurnRecord actions.
         * @member {Array.<pool.IAction>} actions
         * @memberof pool.TurnRecord
         * @instance
         */
        TurnRecord.prototype.actions = $util.emptyArray;

        /**
         * Creates a new TurnRecord instance using the specified properties.
         * @function create
         * @memberof pool.TurnRecord
         * @static
         * @param {pool.ITurnRecord=} [properties] Properties to set
         * @returns {pool.TurnRecord} TurnRecord instance
         */
        TurnRecord.create = function create(properties) {
            return new TurnRecord(properties);
        };

        /**
         * Encodes the specified TurnRecord message. Does not implicitly {@link pool.TurnRecord.verify|verify} messages.
         * @function encode
         * @memberof pool.TurnRecord
         * @static
         * @param {pool.ITurnRecord} message TurnRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TurnRecord.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.turnIdx != null && Object.hasOwnProperty.call(message, "turnIdx"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.turnIdx);
            if (message.actions != null && message.actions.length)
                for (let i = 0; i < message.actions.length; ++i)
                    $root.pool.Action.encode(message.actions[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TurnRecord message, length delimited. Does not implicitly {@link pool.TurnRecord.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.TurnRecord
         * @static
         * @param {pool.ITurnRecord} message TurnRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TurnRecord.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TurnRecord message from the specified reader or buffer.
         * @function decode
         * @memberof pool.TurnRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.TurnRecord} TurnRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TurnRecord.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.TurnRecord();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.turnIdx = reader.int32();
                    break;
                case 2:
                    if (!(message.actions && message.actions.length))
                        message.actions = [];
                    message.actions.push($root.pool.Action.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TurnRecord message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.TurnRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.TurnRecord} TurnRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TurnRecord.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TurnRecord message.
         * @function verify
         * @memberof pool.TurnRecord
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TurnRecord.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.turnIdx != null && message.hasOwnProperty("turnIdx"))
                if (!$util.isInteger(message.turnIdx))
                    return "turnIdx: integer expected";
            if (message.actions != null && message.hasOwnProperty("actions")) {
                if (!Array.isArray(message.actions))
                    return "actions: array expected";
                for (let i = 0; i < message.actions.length; ++i) {
                    let error = $root.pool.Action.verify(message.actions[i]);
                    if (error)
                        return "actions." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TurnRecord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.TurnRecord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.TurnRecord} TurnRecord
         */
        TurnRecord.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.TurnRecord)
                return object;
            let message = new $root.pool.TurnRecord();
            if (object.turnIdx != null)
                message.turnIdx = object.turnIdx | 0;
            if (object.actions) {
                if (!Array.isArray(object.actions))
                    throw TypeError(".pool.TurnRecord.actions: array expected");
                message.actions = [];
                for (let i = 0; i < object.actions.length; ++i) {
                    if (typeof object.actions[i] !== "object")
                        throw TypeError(".pool.TurnRecord.actions: object expected");
                    message.actions[i] = $root.pool.Action.fromObject(object.actions[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TurnRecord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.TurnRecord
         * @static
         * @param {pool.TurnRecord} message TurnRecord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TurnRecord.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.actions = [];
            if (options.defaults)
                object.turnIdx = 0;
            if (message.turnIdx != null && message.hasOwnProperty("turnIdx"))
                object.turnIdx = message.turnIdx;
            if (message.actions && message.actions.length) {
                object.actions = [];
                for (let j = 0; j < message.actions.length; ++j)
                    object.actions[j] = $root.pool.Action.toObject(message.actions[j], options);
            }
            return object;
        };

        /**
         * Converts this TurnRecord to JSON.
         * @function toJSON
         * @memberof pool.TurnRecord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TurnRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TurnRecord;
    })();

    pool.Action = (function() {

        /**
         * Properties of an Action.
         * @memberof pool
         * @interface IAction
         * @property {number|null} [time] Action time
         * @property {string|null} [type] Action type
         * @property {number|null} [player] Action player
         * @property {number|null} [x] Action x
         * @property {number|null} [y] Action y
         * @property {number|null} [rx] Action rx
         * @property {number|null} [ry] Action ry
         * @property {number|null} [tx] Action tx
         * @property {number|null} [ty] Action ty
         * @property {number|null} [force] Action force
         * @property {number|null} [pointer] Action pointer
         * @property {number|null} [phase] Action phase
         * @property {number|null} [id] Action id
         * @property {number|null} [vigor] Action vigor
         * @property {number|null} [foulDetail] Action foulDetail
         * @property {boolean|null} [isNeedSelectHole] Action isNeedSelectHole
         * @property {number|null} [holeIdx] Action holeIdx
         * @property {number|null} [syncTag] Action syncTag
         * @property {number|null} [aimResult] Action aimResult
         */

        /**
         * Constructs a new Action.
         * @memberof pool
         * @classdesc Represents an Action.
         * @implements IAction
         * @constructor
         * @param {pool.IAction=} [properties] Properties to set
         */
        function Action(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Action time.
         * @member {number} time
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.time = 0;

        /**
         * Action type.
         * @member {string} type
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.type = "";

        /**
         * Action player.
         * @member {number} player
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.player = 0;

        /**
         * Action x.
         * @member {number} x
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.x = 0;

        /**
         * Action y.
         * @member {number} y
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.y = 0;

        /**
         * Action rx.
         * @member {number} rx
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.rx = 0;

        /**
         * Action ry.
         * @member {number} ry
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.ry = 0;

        /**
         * Action tx.
         * @member {number} tx
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.tx = 0;

        /**
         * Action ty.
         * @member {number} ty
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.ty = 0;

        /**
         * Action force.
         * @member {number} force
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.force = 0;

        /**
         * Action pointer.
         * @member {number} pointer
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.pointer = 0;

        /**
         * Action phase.
         * @member {number} phase
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.phase = 0;

        /**
         * Action id.
         * @member {number} id
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.id = 0;

        /**
         * Action vigor.
         * @member {number} vigor
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.vigor = 0;

        /**
         * Action foulDetail.
         * @member {number} foulDetail
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.foulDetail = 0;

        /**
         * Action isNeedSelectHole.
         * @member {boolean} isNeedSelectHole
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.isNeedSelectHole = false;

        /**
         * Action holeIdx.
         * @member {number} holeIdx
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.holeIdx = 0;

        /**
         * Action syncTag.
         * @member {number} syncTag
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.syncTag = 0;

        /**
         * Action aimResult.
         * @member {number} aimResult
         * @memberof pool.Action
         * @instance
         */
        Action.prototype.aimResult = 0;

        /**
         * Creates a new Action instance using the specified properties.
         * @function create
         * @memberof pool.Action
         * @static
         * @param {pool.IAction=} [properties] Properties to set
         * @returns {pool.Action} Action instance
         */
        Action.create = function create(properties) {
            return new Action(properties);
        };

        /**
         * Encodes the specified Action message. Does not implicitly {@link pool.Action.verify|verify} messages.
         * @function encode
         * @memberof pool.Action
         * @static
         * @param {pool.IAction} message Action message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Action.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.time);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.type);
            if (message.player != null && Object.hasOwnProperty.call(message, "player"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.player);
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.y);
            if (message.rx != null && Object.hasOwnProperty.call(message, "rx"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.rx);
            if (message.ry != null && Object.hasOwnProperty.call(message, "ry"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.ry);
            if (message.tx != null && Object.hasOwnProperty.call(message, "tx"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.tx);
            if (message.ty != null && Object.hasOwnProperty.call(message, "ty"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.ty);
            if (message.force != null && Object.hasOwnProperty.call(message, "force"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.force);
            if (message.pointer != null && Object.hasOwnProperty.call(message, "pointer"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.pointer);
            if (message.phase != null && Object.hasOwnProperty.call(message, "phase"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.phase);
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.id);
            if (message.vigor != null && Object.hasOwnProperty.call(message, "vigor"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.vigor);
            if (message.foulDetail != null && Object.hasOwnProperty.call(message, "foulDetail"))
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.foulDetail);
            if (message.isNeedSelectHole != null && Object.hasOwnProperty.call(message, "isNeedSelectHole"))
                writer.uint32(/* id 16, wireType 0 =*/128).bool(message.isNeedSelectHole);
            if (message.holeIdx != null && Object.hasOwnProperty.call(message, "holeIdx"))
                writer.uint32(/* id 17, wireType 0 =*/136).int32(message.holeIdx);
            if (message.syncTag != null && Object.hasOwnProperty.call(message, "syncTag"))
                writer.uint32(/* id 18, wireType 0 =*/144).int32(message.syncTag);
            if (message.aimResult != null && Object.hasOwnProperty.call(message, "aimResult"))
                writer.uint32(/* id 19, wireType 0 =*/152).int32(message.aimResult);
            return writer;
        };

        /**
         * Encodes the specified Action message, length delimited. Does not implicitly {@link pool.Action.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pool.Action
         * @static
         * @param {pool.IAction} message Action message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Action.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Action message from the specified reader or buffer.
         * @function decode
         * @memberof pool.Action
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pool.Action} Action
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Action.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pool.Action();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.time = reader.int32();
                    break;
                case 2:
                    message.type = reader.string();
                    break;
                case 3:
                    message.player = reader.int32();
                    break;
                case 4:
                    message.x = reader.int32();
                    break;
                case 5:
                    message.y = reader.int32();
                    break;
                case 6:
                    message.rx = reader.int32();
                    break;
                case 7:
                    message.ry = reader.int32();
                    break;
                case 8:
                    message.tx = reader.int32();
                    break;
                case 9:
                    message.ty = reader.int32();
                    break;
                case 10:
                    message.force = reader.int32();
                    break;
                case 11:
                    message.pointer = reader.int32();
                    break;
                case 12:
                    message.phase = reader.int32();
                    break;
                case 13:
                    message.id = reader.int32();
                    break;
                case 14:
                    message.vigor = reader.int32();
                    break;
                case 15:
                    message.foulDetail = reader.int32();
                    break;
                case 16:
                    message.isNeedSelectHole = reader.bool();
                    break;
                case 17:
                    message.holeIdx = reader.int32();
                    break;
                case 18:
                    message.syncTag = reader.int32();
                    break;
                case 19:
                    message.aimResult = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Action message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pool.Action
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pool.Action} Action
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Action.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Action message.
         * @function verify
         * @memberof pool.Action
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Action.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time))
                    return "time: integer expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            if (message.player != null && message.hasOwnProperty("player"))
                if (!$util.isInteger(message.player))
                    return "player: integer expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.rx != null && message.hasOwnProperty("rx"))
                if (!$util.isInteger(message.rx))
                    return "rx: integer expected";
            if (message.ry != null && message.hasOwnProperty("ry"))
                if (!$util.isInteger(message.ry))
                    return "ry: integer expected";
            if (message.tx != null && message.hasOwnProperty("tx"))
                if (!$util.isInteger(message.tx))
                    return "tx: integer expected";
            if (message.ty != null && message.hasOwnProperty("ty"))
                if (!$util.isInteger(message.ty))
                    return "ty: integer expected";
            if (message.force != null && message.hasOwnProperty("force"))
                if (!$util.isInteger(message.force))
                    return "force: integer expected";
            if (message.pointer != null && message.hasOwnProperty("pointer"))
                if (!$util.isInteger(message.pointer))
                    return "pointer: integer expected";
            if (message.phase != null && message.hasOwnProperty("phase"))
                if (!$util.isInteger(message.phase))
                    return "phase: integer expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.vigor != null && message.hasOwnProperty("vigor"))
                if (!$util.isInteger(message.vigor))
                    return "vigor: integer expected";
            if (message.foulDetail != null && message.hasOwnProperty("foulDetail"))
                if (!$util.isInteger(message.foulDetail))
                    return "foulDetail: integer expected";
            if (message.isNeedSelectHole != null && message.hasOwnProperty("isNeedSelectHole"))
                if (typeof message.isNeedSelectHole !== "boolean")
                    return "isNeedSelectHole: boolean expected";
            if (message.holeIdx != null && message.hasOwnProperty("holeIdx"))
                if (!$util.isInteger(message.holeIdx))
                    return "holeIdx: integer expected";
            if (message.syncTag != null && message.hasOwnProperty("syncTag"))
                if (!$util.isInteger(message.syncTag))
                    return "syncTag: integer expected";
            if (message.aimResult != null && message.hasOwnProperty("aimResult"))
                if (!$util.isInteger(message.aimResult))
                    return "aimResult: integer expected";
            return null;
        };

        /**
         * Creates an Action message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pool.Action
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pool.Action} Action
         */
        Action.fromObject = function fromObject(object) {
            if (object instanceof $root.pool.Action)
                return object;
            let message = new $root.pool.Action();
            if (object.time != null)
                message.time = object.time | 0;
            if (object.type != null)
                message.type = String(object.type);
            if (object.player != null)
                message.player = object.player | 0;
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            if (object.rx != null)
                message.rx = object.rx | 0;
            if (object.ry != null)
                message.ry = object.ry | 0;
            if (object.tx != null)
                message.tx = object.tx | 0;
            if (object.ty != null)
                message.ty = object.ty | 0;
            if (object.force != null)
                message.force = object.force | 0;
            if (object.pointer != null)
                message.pointer = object.pointer | 0;
            if (object.phase != null)
                message.phase = object.phase | 0;
            if (object.id != null)
                message.id = object.id | 0;
            if (object.vigor != null)
                message.vigor = object.vigor | 0;
            if (object.foulDetail != null)
                message.foulDetail = object.foulDetail | 0;
            if (object.isNeedSelectHole != null)
                message.isNeedSelectHole = Boolean(object.isNeedSelectHole);
            if (object.holeIdx != null)
                message.holeIdx = object.holeIdx | 0;
            if (object.syncTag != null)
                message.syncTag = object.syncTag | 0;
            if (object.aimResult != null)
                message.aimResult = object.aimResult | 0;
            return message;
        };

        /**
         * Creates a plain object from an Action message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pool.Action
         * @static
         * @param {pool.Action} message Action
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Action.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.time = 0;
                object.type = "";
                object.player = 0;
                object.x = 0;
                object.y = 0;
                object.rx = 0;
                object.ry = 0;
                object.tx = 0;
                object.ty = 0;
                object.force = 0;
                object.pointer = 0;
                object.phase = 0;
                object.id = 0;
                object.vigor = 0;
                object.foulDetail = 0;
                object.isNeedSelectHole = false;
                object.holeIdx = 0;
                object.syncTag = 0;
                object.aimResult = 0;
            }
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = message.time;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.player != null && message.hasOwnProperty("player"))
                object.player = message.player;
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.rx != null && message.hasOwnProperty("rx"))
                object.rx = message.rx;
            if (message.ry != null && message.hasOwnProperty("ry"))
                object.ry = message.ry;
            if (message.tx != null && message.hasOwnProperty("tx"))
                object.tx = message.tx;
            if (message.ty != null && message.hasOwnProperty("ty"))
                object.ty = message.ty;
            if (message.force != null && message.hasOwnProperty("force"))
                object.force = message.force;
            if (message.pointer != null && message.hasOwnProperty("pointer"))
                object.pointer = message.pointer;
            if (message.phase != null && message.hasOwnProperty("phase"))
                object.phase = message.phase;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.vigor != null && message.hasOwnProperty("vigor"))
                object.vigor = message.vigor;
            if (message.foulDetail != null && message.hasOwnProperty("foulDetail"))
                object.foulDetail = message.foulDetail;
            if (message.isNeedSelectHole != null && message.hasOwnProperty("isNeedSelectHole"))
                object.isNeedSelectHole = message.isNeedSelectHole;
            if (message.holeIdx != null && message.hasOwnProperty("holeIdx"))
                object.holeIdx = message.holeIdx;
            if (message.syncTag != null && message.hasOwnProperty("syncTag"))
                object.syncTag = message.syncTag;
            if (message.aimResult != null && message.hasOwnProperty("aimResult"))
                object.aimResult = message.aimResult;
            return object;
        };

        /**
         * Converts this Action to JSON.
         * @function toJSON
         * @memberof pool.Action
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Action.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Action;
    })();

    return pool;
})();

export { $root as default };
