/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const slots = $root.slots = (() => {

    /**
     * Namespace slots.
     * @exports slots
     * @namespace
     */
    const slots = {};

    slots.GameStartReq = (function() {

        /**
         * Properties of a GameStartReq.
         * @memberof slots
         * @interface IGameStartReq
         * @property {string|null} [name] GameStartReq name
         */

        /**
         * Constructs a new GameStartReq.
         * @memberof slots
         * @classdesc Represents a GameStartReq.
         * @implements IGameStartReq
         * @constructor
         * @param {slots.IGameStartReq=} [properties] Properties to set
         */
        function GameStartReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameStartReq name.
         * @member {string} name
         * @memberof slots.GameStartReq
         * @instance
         */
        GameStartReq.prototype.name = "";

        /**
         * Creates a new GameStartReq instance using the specified properties.
         * @function create
         * @memberof slots.GameStartReq
         * @static
         * @param {slots.IGameStartReq=} [properties] Properties to set
         * @returns {slots.GameStartReq} GameStartReq instance
         */
        GameStartReq.create = function create(properties) {
            return new GameStartReq(properties);
        };

        /**
         * Encodes the specified GameStartReq message. Does not implicitly {@link slots.GameStartReq.verify|verify} messages.
         * @function encode
         * @memberof slots.GameStartReq
         * @static
         * @param {slots.IGameStartReq} message GameStartReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStartReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified GameStartReq message, length delimited. Does not implicitly {@link slots.GameStartReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof slots.GameStartReq
         * @static
         * @param {slots.IGameStartReq} message GameStartReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStartReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameStartReq message from the specified reader or buffer.
         * @function decode
         * @memberof slots.GameStartReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {slots.GameStartReq} GameStartReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStartReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.slots.GameStartReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameStartReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof slots.GameStartReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {slots.GameStartReq} GameStartReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStartReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameStartReq message.
         * @function verify
         * @memberof slots.GameStartReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameStartReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a GameStartReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof slots.GameStartReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {slots.GameStartReq} GameStartReq
         */
        GameStartReq.fromObject = function fromObject(object) {
            if (object instanceof $root.slots.GameStartReq)
                return object;
            let message = new $root.slots.GameStartReq();
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a GameStartReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof slots.GameStartReq
         * @static
         * @param {slots.GameStartReq} message GameStartReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameStartReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.name = "";
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this GameStartReq to JSON.
         * @function toJSON
         * @memberof slots.GameStartReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameStartReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameStartReq;
    })();

    slots.GameStartResp = (function() {

        /**
         * Properties of a GameStartResp.
         * @memberof slots
         * @interface IGameStartResp
         * @property {number|null} [state] GameStartResp state
         */

        /**
         * Constructs a new GameStartResp.
         * @memberof slots
         * @classdesc Represents a GameStartResp.
         * @implements IGameStartResp
         * @constructor
         * @param {slots.IGameStartResp=} [properties] Properties to set
         */
        function GameStartResp(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameStartResp state.
         * @member {number} state
         * @memberof slots.GameStartResp
         * @instance
         */
        GameStartResp.prototype.state = 0;

        /**
         * Creates a new GameStartResp instance using the specified properties.
         * @function create
         * @memberof slots.GameStartResp
         * @static
         * @param {slots.IGameStartResp=} [properties] Properties to set
         * @returns {slots.GameStartResp} GameStartResp instance
         */
        GameStartResp.create = function create(properties) {
            return new GameStartResp(properties);
        };

        /**
         * Encodes the specified GameStartResp message. Does not implicitly {@link slots.GameStartResp.verify|verify} messages.
         * @function encode
         * @memberof slots.GameStartResp
         * @static
         * @param {slots.IGameStartResp} message GameStartResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStartResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
            return writer;
        };

        /**
         * Encodes the specified GameStartResp message, length delimited. Does not implicitly {@link slots.GameStartResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof slots.GameStartResp
         * @static
         * @param {slots.IGameStartResp} message GameStartResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStartResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameStartResp message from the specified reader or buffer.
         * @function decode
         * @memberof slots.GameStartResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {slots.GameStartResp} GameStartResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStartResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.slots.GameStartResp();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.state = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameStartResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof slots.GameStartResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {slots.GameStartResp} GameStartResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStartResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameStartResp message.
         * @function verify
         * @memberof slots.GameStartResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameStartResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.state != null && message.hasOwnProperty("state"))
                if (!$util.isInteger(message.state))
                    return "state: integer expected";
            return null;
        };

        /**
         * Creates a GameStartResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof slots.GameStartResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {slots.GameStartResp} GameStartResp
         */
        GameStartResp.fromObject = function fromObject(object) {
            if (object instanceof $root.slots.GameStartResp)
                return object;
            let message = new $root.slots.GameStartResp();
            if (object.state != null)
                message.state = object.state | 0;
            return message;
        };

        /**
         * Creates a plain object from a GameStartResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof slots.GameStartResp
         * @static
         * @param {slots.GameStartResp} message GameStartResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameStartResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.state = 0;
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = message.state;
            return object;
        };

        /**
         * Converts this GameStartResp to JSON.
         * @function toJSON
         * @memberof slots.GameStartResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameStartResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameStartResp;
    })();

    slots.GameTestReq = (function() {

        /**
         * Properties of a GameTestReq.
         * @memberof slots
         * @interface IGameTestReq
         * @property {string|null} [name] GameTestReq name
         */

        /**
         * Constructs a new GameTestReq.
         * @memberof slots
         * @classdesc Represents a GameTestReq.
         * @implements IGameTestReq
         * @constructor
         * @param {slots.IGameTestReq=} [properties] Properties to set
         */
        function GameTestReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameTestReq name.
         * @member {string} name
         * @memberof slots.GameTestReq
         * @instance
         */
        GameTestReq.prototype.name = "";

        /**
         * Creates a new GameTestReq instance using the specified properties.
         * @function create
         * @memberof slots.GameTestReq
         * @static
         * @param {slots.IGameTestReq=} [properties] Properties to set
         * @returns {slots.GameTestReq} GameTestReq instance
         */
        GameTestReq.create = function create(properties) {
            return new GameTestReq(properties);
        };

        /**
         * Encodes the specified GameTestReq message. Does not implicitly {@link slots.GameTestReq.verify|verify} messages.
         * @function encode
         * @memberof slots.GameTestReq
         * @static
         * @param {slots.IGameTestReq} message GameTestReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameTestReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified GameTestReq message, length delimited. Does not implicitly {@link slots.GameTestReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof slots.GameTestReq
         * @static
         * @param {slots.IGameTestReq} message GameTestReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameTestReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameTestReq message from the specified reader or buffer.
         * @function decode
         * @memberof slots.GameTestReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {slots.GameTestReq} GameTestReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameTestReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.slots.GameTestReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameTestReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof slots.GameTestReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {slots.GameTestReq} GameTestReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameTestReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameTestReq message.
         * @function verify
         * @memberof slots.GameTestReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameTestReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a GameTestReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof slots.GameTestReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {slots.GameTestReq} GameTestReq
         */
        GameTestReq.fromObject = function fromObject(object) {
            if (object instanceof $root.slots.GameTestReq)
                return object;
            let message = new $root.slots.GameTestReq();
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a GameTestReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof slots.GameTestReq
         * @static
         * @param {slots.GameTestReq} message GameTestReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameTestReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.name = "";
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this GameTestReq to JSON.
         * @function toJSON
         * @memberof slots.GameTestReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameTestReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameTestReq;
    })();

    slots.GameTestResp = (function() {

        /**
         * Properties of a GameTestResp.
         * @memberof slots
         * @interface IGameTestResp
         * @property {number|null} [state] GameTestResp state
         */

        /**
         * Constructs a new GameTestResp.
         * @memberof slots
         * @classdesc Represents a GameTestResp.
         * @implements IGameTestResp
         * @constructor
         * @param {slots.IGameTestResp=} [properties] Properties to set
         */
        function GameTestResp(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameTestResp state.
         * @member {number} state
         * @memberof slots.GameTestResp
         * @instance
         */
        GameTestResp.prototype.state = 0;

        /**
         * Creates a new GameTestResp instance using the specified properties.
         * @function create
         * @memberof slots.GameTestResp
         * @static
         * @param {slots.IGameTestResp=} [properties] Properties to set
         * @returns {slots.GameTestResp} GameTestResp instance
         */
        GameTestResp.create = function create(properties) {
            return new GameTestResp(properties);
        };

        /**
         * Encodes the specified GameTestResp message. Does not implicitly {@link slots.GameTestResp.verify|verify} messages.
         * @function encode
         * @memberof slots.GameTestResp
         * @static
         * @param {slots.IGameTestResp} message GameTestResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameTestResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
            return writer;
        };

        /**
         * Encodes the specified GameTestResp message, length delimited. Does not implicitly {@link slots.GameTestResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof slots.GameTestResp
         * @static
         * @param {slots.IGameTestResp} message GameTestResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameTestResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameTestResp message from the specified reader or buffer.
         * @function decode
         * @memberof slots.GameTestResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {slots.GameTestResp} GameTestResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameTestResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.slots.GameTestResp();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.state = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameTestResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof slots.GameTestResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {slots.GameTestResp} GameTestResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameTestResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameTestResp message.
         * @function verify
         * @memberof slots.GameTestResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameTestResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.state != null && message.hasOwnProperty("state"))
                if (!$util.isInteger(message.state))
                    return "state: integer expected";
            return null;
        };

        /**
         * Creates a GameTestResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof slots.GameTestResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {slots.GameTestResp} GameTestResp
         */
        GameTestResp.fromObject = function fromObject(object) {
            if (object instanceof $root.slots.GameTestResp)
                return object;
            let message = new $root.slots.GameTestResp();
            if (object.state != null)
                message.state = object.state | 0;
            return message;
        };

        /**
         * Creates a plain object from a GameTestResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof slots.GameTestResp
         * @static
         * @param {slots.GameTestResp} message GameTestResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameTestResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.state = 0;
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = message.state;
            return object;
        };

        /**
         * Converts this GameTestResp to JSON.
         * @function toJSON
         * @memberof slots.GameTestResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameTestResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameTestResp;
    })();

    return slots;
})();

export { $root as default };
