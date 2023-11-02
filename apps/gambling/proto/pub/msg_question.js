/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const question = $root.question = (() => {

    /**
     * Namespace question.
     * @exports question
     * @namespace
     */
    const question = {};

    /**
     * DEADLINE_TYPE enum.
     * @name question.DEADLINE_TYPE
     * @enum {number}
     * @property {number} DT_NONE=0 DT_NONE value
     * @property {number} START=1 START value
     * @property {number} OPERATION=2 OPERATION value
     * @property {number} END=3 END value
     */
    question.DEADLINE_TYPE = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DT_NONE"] = 0;
        values[valuesById[1] = "START"] = 1;
        values[valuesById[2] = "OPERATION"] = 2;
        values[valuesById[3] = "END"] = 3;
        return values;
    })();

    question.TableStateEvent = (function() {

        /**
         * Properties of a TableStateEvent.
         * @memberof question
         * @interface ITableStateEvent
         * @property {string|null} [gameCode] TableStateEvent gameCode
         * @property {number|null} [winBet] TableStateEvent winBet
         * @property {number|null} [questionNums] TableStateEvent questionNums
         * @property {number|null} [current] TableStateEvent current
         * @property {Array.<question.ISeatState>|null} [seatStates] TableStateEvent seatStates
         */

        /**
         * Constructs a new TableStateEvent.
         * @memberof question
         * @classdesc Represents a TableStateEvent.
         * @implements ITableStateEvent
         * @constructor
         * @param {question.ITableStateEvent=} [properties] Properties to set
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
         * @memberof question.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.gameCode = "";

        /**
         * TableStateEvent winBet.
         * @member {number} winBet
         * @memberof question.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.winBet = 0;

        /**
         * TableStateEvent questionNums.
         * @member {number} questionNums
         * @memberof question.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.questionNums = 0;

        /**
         * TableStateEvent current.
         * @member {number} current
         * @memberof question.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.current = 0;

        /**
         * TableStateEvent seatStates.
         * @member {Array.<question.ISeatState>} seatStates
         * @memberof question.TableStateEvent
         * @instance
         */
        TableStateEvent.prototype.seatStates = $util.emptyArray;

        /**
         * Creates a new TableStateEvent instance using the specified properties.
         * @function create
         * @memberof question.TableStateEvent
         * @static
         * @param {question.ITableStateEvent=} [properties] Properties to set
         * @returns {question.TableStateEvent} TableStateEvent instance
         */
        TableStateEvent.create = function create(properties) {
            return new TableStateEvent(properties);
        };

        /**
         * Encodes the specified TableStateEvent message. Does not implicitly {@link question.TableStateEvent.verify|verify} messages.
         * @function encode
         * @memberof question.TableStateEvent
         * @static
         * @param {question.ITableStateEvent} message TableStateEvent message or plain object to encode
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
            if (message.questionNums != null && Object.hasOwnProperty.call(message, "questionNums"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.questionNums);
            if (message.current != null && Object.hasOwnProperty.call(message, "current"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.current);
            if (message.seatStates != null && message.seatStates.length)
                for (let i = 0; i < message.seatStates.length; ++i)
                    $root.question.SeatState.encode(message.seatStates[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TableStateEvent message, length delimited. Does not implicitly {@link question.TableStateEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof question.TableStateEvent
         * @static
         * @param {question.ITableStateEvent} message TableStateEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableStateEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TableStateEvent message from the specified reader or buffer.
         * @function decode
         * @memberof question.TableStateEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {question.TableStateEvent} TableStateEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableStateEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.question.TableStateEvent();
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
                    message.questionNums = reader.int32();
                    break;
                case 4:
                    message.current = reader.int32();
                    break;
                case 5:
                    if (!(message.seatStates && message.seatStates.length))
                        message.seatStates = [];
                    message.seatStates.push($root.question.SeatState.decode(reader, reader.uint32()));
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
         * @memberof question.TableStateEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {question.TableStateEvent} TableStateEvent
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
         * @memberof question.TableStateEvent
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
            if (message.questionNums != null && message.hasOwnProperty("questionNums"))
                if (!$util.isInteger(message.questionNums))
                    return "questionNums: integer expected";
            if (message.current != null && message.hasOwnProperty("current"))
                if (!$util.isInteger(message.current))
                    return "current: integer expected";
            if (message.seatStates != null && message.hasOwnProperty("seatStates")) {
                if (!Array.isArray(message.seatStates))
                    return "seatStates: array expected";
                for (let i = 0; i < message.seatStates.length; ++i) {
                    let error = $root.question.SeatState.verify(message.seatStates[i]);
                    if (error)
                        return "seatStates." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TableStateEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof question.TableStateEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {question.TableStateEvent} TableStateEvent
         */
        TableStateEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.question.TableStateEvent)
                return object;
            let message = new $root.question.TableStateEvent();
            if (object.gameCode != null)
                message.gameCode = String(object.gameCode);
            if (object.winBet != null)
                message.winBet = object.winBet | 0;
            if (object.questionNums != null)
                message.questionNums = object.questionNums | 0;
            if (object.current != null)
                message.current = object.current | 0;
            if (object.seatStates) {
                if (!Array.isArray(object.seatStates))
                    throw TypeError(".question.TableStateEvent.seatStates: array expected");
                message.seatStates = [];
                for (let i = 0; i < object.seatStates.length; ++i) {
                    if (typeof object.seatStates[i] !== "object")
                        throw TypeError(".question.TableStateEvent.seatStates: object expected");
                    message.seatStates[i] = $root.question.SeatState.fromObject(object.seatStates[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TableStateEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof question.TableStateEvent
         * @static
         * @param {question.TableStateEvent} message TableStateEvent
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
                object.questionNums = 0;
                object.current = 0;
            }
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                object.gameCode = message.gameCode;
            if (message.winBet != null && message.hasOwnProperty("winBet"))
                object.winBet = message.winBet;
            if (message.questionNums != null && message.hasOwnProperty("questionNums"))
                object.questionNums = message.questionNums;
            if (message.current != null && message.hasOwnProperty("current"))
                object.current = message.current;
            if (message.seatStates && message.seatStates.length) {
                object.seatStates = [];
                for (let j = 0; j < message.seatStates.length; ++j)
                    object.seatStates[j] = $root.question.SeatState.toObject(message.seatStates[j], options);
            }
            return object;
        };

        /**
         * Converts this TableStateEvent to JSON.
         * @function toJSON
         * @memberof question.TableStateEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TableStateEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TableStateEvent;
    })();

    question.SeatState = (function() {

        /**
         * Properties of a SeatState.
         * @memberof question
         * @interface ISeatState
         * @property {number|null} [seat] SeatState seat
         * @property {number|null} [correct] SeatState correct
         * @property {number|null} [wrong] SeatState wrong
         * @property {Array.<boolean>|null} [answers] SeatState answers
         * @property {string|null} [currentOption] SeatState currentOption
         * @property {boolean|null} [currentCorrect] SeatState currentCorrect
         */

        /**
         * Constructs a new SeatState.
         * @memberof question
         * @classdesc Represents a SeatState.
         * @implements ISeatState
         * @constructor
         * @param {question.ISeatState=} [properties] Properties to set
         */
        function SeatState(properties) {
            this.answers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SeatState seat.
         * @member {number} seat
         * @memberof question.SeatState
         * @instance
         */
        SeatState.prototype.seat = 0;

        /**
         * SeatState correct.
         * @member {number} correct
         * @memberof question.SeatState
         * @instance
         */
        SeatState.prototype.correct = 0;

        /**
         * SeatState wrong.
         * @member {number} wrong
         * @memberof question.SeatState
         * @instance
         */
        SeatState.prototype.wrong = 0;

        /**
         * SeatState answers.
         * @member {Array.<boolean>} answers
         * @memberof question.SeatState
         * @instance
         */
        SeatState.prototype.answers = $util.emptyArray;

        /**
         * SeatState currentOption.
         * @member {string} currentOption
         * @memberof question.SeatState
         * @instance
         */
        SeatState.prototype.currentOption = "";

        /**
         * SeatState currentCorrect.
         * @member {boolean} currentCorrect
         * @memberof question.SeatState
         * @instance
         */
        SeatState.prototype.currentCorrect = false;

        /**
         * Creates a new SeatState instance using the specified properties.
         * @function create
         * @memberof question.SeatState
         * @static
         * @param {question.ISeatState=} [properties] Properties to set
         * @returns {question.SeatState} SeatState instance
         */
        SeatState.create = function create(properties) {
            return new SeatState(properties);
        };

        /**
         * Encodes the specified SeatState message. Does not implicitly {@link question.SeatState.verify|verify} messages.
         * @function encode
         * @memberof question.SeatState
         * @static
         * @param {question.ISeatState} message SeatState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            if (message.correct != null && Object.hasOwnProperty.call(message, "correct"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.correct);
            if (message.wrong != null && Object.hasOwnProperty.call(message, "wrong"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.wrong);
            if (message.answers != null && message.answers.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (let i = 0; i < message.answers.length; ++i)
                    writer.bool(message.answers[i]);
                writer.ldelim();
            }
            if (message.currentOption != null && Object.hasOwnProperty.call(message, "currentOption"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.currentOption);
            if (message.currentCorrect != null && Object.hasOwnProperty.call(message, "currentCorrect"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.currentCorrect);
            return writer;
        };

        /**
         * Encodes the specified SeatState message, length delimited. Does not implicitly {@link question.SeatState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof question.SeatState
         * @static
         * @param {question.ISeatState} message SeatState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeatState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeatState message from the specified reader or buffer.
         * @function decode
         * @memberof question.SeatState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {question.SeatState} SeatState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeatState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.question.SeatState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat = reader.int32();
                    break;
                case 2:
                    message.correct = reader.int32();
                    break;
                case 3:
                    message.wrong = reader.int32();
                    break;
                case 4:
                    if (!(message.answers && message.answers.length))
                        message.answers = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.answers.push(reader.bool());
                    } else
                        message.answers.push(reader.bool());
                    break;
                case 5:
                    message.currentOption = reader.string();
                    break;
                case 6:
                    message.currentCorrect = reader.bool();
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
         * @memberof question.SeatState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {question.SeatState} SeatState
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
         * @memberof question.SeatState
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
            if (message.correct != null && message.hasOwnProperty("correct"))
                if (!$util.isInteger(message.correct))
                    return "correct: integer expected";
            if (message.wrong != null && message.hasOwnProperty("wrong"))
                if (!$util.isInteger(message.wrong))
                    return "wrong: integer expected";
            if (message.answers != null && message.hasOwnProperty("answers")) {
                if (!Array.isArray(message.answers))
                    return "answers: array expected";
                for (let i = 0; i < message.answers.length; ++i)
                    if (typeof message.answers[i] !== "boolean")
                        return "answers: boolean[] expected";
            }
            if (message.currentOption != null && message.hasOwnProperty("currentOption"))
                if (!$util.isString(message.currentOption))
                    return "currentOption: string expected";
            if (message.currentCorrect != null && message.hasOwnProperty("currentCorrect"))
                if (typeof message.currentCorrect !== "boolean")
                    return "currentCorrect: boolean expected";
            return null;
        };

        /**
         * Creates a SeatState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof question.SeatState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {question.SeatState} SeatState
         */
        SeatState.fromObject = function fromObject(object) {
            if (object instanceof $root.question.SeatState)
                return object;
            let message = new $root.question.SeatState();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.correct != null)
                message.correct = object.correct | 0;
            if (object.wrong != null)
                message.wrong = object.wrong | 0;
            if (object.answers) {
                if (!Array.isArray(object.answers))
                    throw TypeError(".question.SeatState.answers: array expected");
                message.answers = [];
                for (let i = 0; i < object.answers.length; ++i)
                    message.answers[i] = Boolean(object.answers[i]);
            }
            if (object.currentOption != null)
                message.currentOption = String(object.currentOption);
            if (object.currentCorrect != null)
                message.currentCorrect = Boolean(object.currentCorrect);
            return message;
        };

        /**
         * Creates a plain object from a SeatState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof question.SeatState
         * @static
         * @param {question.SeatState} message SeatState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeatState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.answers = [];
            if (options.defaults) {
                object.seat = 0;
                object.correct = 0;
                object.wrong = 0;
                object.currentOption = "";
                object.currentCorrect = false;
            }
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.correct != null && message.hasOwnProperty("correct"))
                object.correct = message.correct;
            if (message.wrong != null && message.hasOwnProperty("wrong"))
                object.wrong = message.wrong;
            if (message.answers && message.answers.length) {
                object.answers = [];
                for (let j = 0; j < message.answers.length; ++j)
                    object.answers[j] = message.answers[j];
            }
            if (message.currentOption != null && message.hasOwnProperty("currentOption"))
                object.currentOption = message.currentOption;
            if (message.currentCorrect != null && message.hasOwnProperty("currentCorrect"))
                object.currentCorrect = message.currentCorrect;
            return object;
        };

        /**
         * Converts this SeatState to JSON.
         * @function toJSON
         * @memberof question.SeatState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeatState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeatState;
    })();

    question.QuestionEvent = (function() {

        /**
         * Properties of a QuestionEvent.
         * @memberof question
         * @interface IQuestionEvent
         * @property {number|null} [current] QuestionEvent current
         * @property {string|null} [title] QuestionEvent title
         * @property {Array.<question.IOption>|null} [options] QuestionEvent options
         */

        /**
         * Constructs a new QuestionEvent.
         * @memberof question
         * @classdesc Represents a QuestionEvent.
         * @implements IQuestionEvent
         * @constructor
         * @param {question.IQuestionEvent=} [properties] Properties to set
         */
        function QuestionEvent(properties) {
            this.options = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * QuestionEvent current.
         * @member {number} current
         * @memberof question.QuestionEvent
         * @instance
         */
        QuestionEvent.prototype.current = 0;

        /**
         * QuestionEvent title.
         * @member {string} title
         * @memberof question.QuestionEvent
         * @instance
         */
        QuestionEvent.prototype.title = "";

        /**
         * QuestionEvent options.
         * @member {Array.<question.IOption>} options
         * @memberof question.QuestionEvent
         * @instance
         */
        QuestionEvent.prototype.options = $util.emptyArray;

        /**
         * Creates a new QuestionEvent instance using the specified properties.
         * @function create
         * @memberof question.QuestionEvent
         * @static
         * @param {question.IQuestionEvent=} [properties] Properties to set
         * @returns {question.QuestionEvent} QuestionEvent instance
         */
        QuestionEvent.create = function create(properties) {
            return new QuestionEvent(properties);
        };

        /**
         * Encodes the specified QuestionEvent message. Does not implicitly {@link question.QuestionEvent.verify|verify} messages.
         * @function encode
         * @memberof question.QuestionEvent
         * @static
         * @param {question.IQuestionEvent} message QuestionEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QuestionEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.current != null && Object.hasOwnProperty.call(message, "current"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.current);
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.title);
            if (message.options != null && message.options.length)
                for (let i = 0; i < message.options.length; ++i)
                    $root.question.Option.encode(message.options[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified QuestionEvent message, length delimited. Does not implicitly {@link question.QuestionEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof question.QuestionEvent
         * @static
         * @param {question.IQuestionEvent} message QuestionEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QuestionEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a QuestionEvent message from the specified reader or buffer.
         * @function decode
         * @memberof question.QuestionEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {question.QuestionEvent} QuestionEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QuestionEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.question.QuestionEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.current = reader.int32();
                    break;
                case 2:
                    message.title = reader.string();
                    break;
                case 3:
                    if (!(message.options && message.options.length))
                        message.options = [];
                    message.options.push($root.question.Option.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a QuestionEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof question.QuestionEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {question.QuestionEvent} QuestionEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QuestionEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a QuestionEvent message.
         * @function verify
         * @memberof question.QuestionEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        QuestionEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.current != null && message.hasOwnProperty("current"))
                if (!$util.isInteger(message.current))
                    return "current: integer expected";
            if (message.title != null && message.hasOwnProperty("title"))
                if (!$util.isString(message.title))
                    return "title: string expected";
            if (message.options != null && message.hasOwnProperty("options")) {
                if (!Array.isArray(message.options))
                    return "options: array expected";
                for (let i = 0; i < message.options.length; ++i) {
                    let error = $root.question.Option.verify(message.options[i]);
                    if (error)
                        return "options." + error;
                }
            }
            return null;
        };

        /**
         * Creates a QuestionEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof question.QuestionEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {question.QuestionEvent} QuestionEvent
         */
        QuestionEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.question.QuestionEvent)
                return object;
            let message = new $root.question.QuestionEvent();
            if (object.current != null)
                message.current = object.current | 0;
            if (object.title != null)
                message.title = String(object.title);
            if (object.options) {
                if (!Array.isArray(object.options))
                    throw TypeError(".question.QuestionEvent.options: array expected");
                message.options = [];
                for (let i = 0; i < object.options.length; ++i) {
                    if (typeof object.options[i] !== "object")
                        throw TypeError(".question.QuestionEvent.options: object expected");
                    message.options[i] = $root.question.Option.fromObject(object.options[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a QuestionEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof question.QuestionEvent
         * @static
         * @param {question.QuestionEvent} message QuestionEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        QuestionEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.options = [];
            if (options.defaults) {
                object.current = 0;
                object.title = "";
            }
            if (message.current != null && message.hasOwnProperty("current"))
                object.current = message.current;
            if (message.title != null && message.hasOwnProperty("title"))
                object.title = message.title;
            if (message.options && message.options.length) {
                object.options = [];
                for (let j = 0; j < message.options.length; ++j)
                    object.options[j] = $root.question.Option.toObject(message.options[j], options);
            }
            return object;
        };

        /**
         * Converts this QuestionEvent to JSON.
         * @function toJSON
         * @memberof question.QuestionEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        QuestionEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return QuestionEvent;
    })();

    question.Option = (function() {

        /**
         * Properties of an Option.
         * @memberof question
         * @interface IOption
         * @property {string|null} [id] Option id
         * @property {string|null} [content] Option content
         */

        /**
         * Constructs a new Option.
         * @memberof question
         * @classdesc Represents an Option.
         * @implements IOption
         * @constructor
         * @param {question.IOption=} [properties] Properties to set
         */
        function Option(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Option id.
         * @member {string} id
         * @memberof question.Option
         * @instance
         */
        Option.prototype.id = "";

        /**
         * Option content.
         * @member {string} content
         * @memberof question.Option
         * @instance
         */
        Option.prototype.content = "";

        /**
         * Creates a new Option instance using the specified properties.
         * @function create
         * @memberof question.Option
         * @static
         * @param {question.IOption=} [properties] Properties to set
         * @returns {question.Option} Option instance
         */
        Option.create = function create(properties) {
            return new Option(properties);
        };

        /**
         * Encodes the specified Option message. Does not implicitly {@link question.Option.verify|verify} messages.
         * @function encode
         * @memberof question.Option
         * @static
         * @param {question.IOption} message Option message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Option.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.content);
            return writer;
        };

        /**
         * Encodes the specified Option message, length delimited. Does not implicitly {@link question.Option.verify|verify} messages.
         * @function encodeDelimited
         * @memberof question.Option
         * @static
         * @param {question.IOption} message Option message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Option.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Option message from the specified reader or buffer.
         * @function decode
         * @memberof question.Option
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {question.Option} Option
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Option.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.question.Option();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
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
         * Decodes an Option message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof question.Option
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {question.Option} Option
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Option.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Option message.
         * @function verify
         * @memberof question.Option
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Option.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            return null;
        };

        /**
         * Creates an Option message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof question.Option
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {question.Option} Option
         */
        Option.fromObject = function fromObject(object) {
            if (object instanceof $root.question.Option)
                return object;
            let message = new $root.question.Option();
            if (object.id != null)
                message.id = String(object.id);
            if (object.content != null)
                message.content = String(object.content);
            return message;
        };

        /**
         * Creates a plain object from an Option message. Also converts values to other types if specified.
         * @function toObject
         * @memberof question.Option
         * @static
         * @param {question.Option} message Option
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Option.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.content = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            return object;
        };

        /**
         * Converts this Option to JSON.
         * @function toJSON
         * @memberof question.Option
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Option.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Option;
    })();

    question.AnswerReq = (function() {

        /**
         * Properties of an AnswerReq.
         * @memberof question
         * @interface IAnswerReq
         * @property {string|null} [optionId] AnswerReq optionId
         */

        /**
         * Constructs a new AnswerReq.
         * @memberof question
         * @classdesc Represents an AnswerReq.
         * @implements IAnswerReq
         * @constructor
         * @param {question.IAnswerReq=} [properties] Properties to set
         */
        function AnswerReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AnswerReq optionId.
         * @member {string} optionId
         * @memberof question.AnswerReq
         * @instance
         */
        AnswerReq.prototype.optionId = "";

        /**
         * Creates a new AnswerReq instance using the specified properties.
         * @function create
         * @memberof question.AnswerReq
         * @static
         * @param {question.IAnswerReq=} [properties] Properties to set
         * @returns {question.AnswerReq} AnswerReq instance
         */
        AnswerReq.create = function create(properties) {
            return new AnswerReq(properties);
        };

        /**
         * Encodes the specified AnswerReq message. Does not implicitly {@link question.AnswerReq.verify|verify} messages.
         * @function encode
         * @memberof question.AnswerReq
         * @static
         * @param {question.IAnswerReq} message AnswerReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AnswerReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.optionId != null && Object.hasOwnProperty.call(message, "optionId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.optionId);
            return writer;
        };

        /**
         * Encodes the specified AnswerReq message, length delimited. Does not implicitly {@link question.AnswerReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof question.AnswerReq
         * @static
         * @param {question.IAnswerReq} message AnswerReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AnswerReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AnswerReq message from the specified reader or buffer.
         * @function decode
         * @memberof question.AnswerReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {question.AnswerReq} AnswerReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AnswerReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.question.AnswerReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.optionId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AnswerReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof question.AnswerReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {question.AnswerReq} AnswerReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AnswerReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AnswerReq message.
         * @function verify
         * @memberof question.AnswerReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AnswerReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.optionId != null && message.hasOwnProperty("optionId"))
                if (!$util.isString(message.optionId))
                    return "optionId: string expected";
            return null;
        };

        /**
         * Creates an AnswerReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof question.AnswerReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {question.AnswerReq} AnswerReq
         */
        AnswerReq.fromObject = function fromObject(object) {
            if (object instanceof $root.question.AnswerReq)
                return object;
            let message = new $root.question.AnswerReq();
            if (object.optionId != null)
                message.optionId = String(object.optionId);
            return message;
        };

        /**
         * Creates a plain object from an AnswerReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof question.AnswerReq
         * @static
         * @param {question.AnswerReq} message AnswerReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AnswerReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.optionId = "";
            if (message.optionId != null && message.hasOwnProperty("optionId"))
                object.optionId = message.optionId;
            return object;
        };

        /**
         * Converts this AnswerReq to JSON.
         * @function toJSON
         * @memberof question.AnswerReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AnswerReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AnswerReq;
    })();

    question.AnswerEvent = (function() {

        /**
         * Properties of an AnswerEvent.
         * @memberof question
         * @interface IAnswerEvent
         * @property {number|null} [seat] AnswerEvent seat
         * @property {string|null} [optionId] AnswerEvent optionId
         * @property {boolean|null} [isCorrect] AnswerEvent isCorrect
         * @property {string|null} [correctOptionId] AnswerEvent correctOptionId
         */

        /**
         * Constructs a new AnswerEvent.
         * @memberof question
         * @classdesc Represents an AnswerEvent.
         * @implements IAnswerEvent
         * @constructor
         * @param {question.IAnswerEvent=} [properties] Properties to set
         */
        function AnswerEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AnswerEvent seat.
         * @member {number} seat
         * @memberof question.AnswerEvent
         * @instance
         */
        AnswerEvent.prototype.seat = 0;

        /**
         * AnswerEvent optionId.
         * @member {string} optionId
         * @memberof question.AnswerEvent
         * @instance
         */
        AnswerEvent.prototype.optionId = "";

        /**
         * AnswerEvent isCorrect.
         * @member {boolean} isCorrect
         * @memberof question.AnswerEvent
         * @instance
         */
        AnswerEvent.prototype.isCorrect = false;

        /**
         * AnswerEvent correctOptionId.
         * @member {string} correctOptionId
         * @memberof question.AnswerEvent
         * @instance
         */
        AnswerEvent.prototype.correctOptionId = "";

        /**
         * Creates a new AnswerEvent instance using the specified properties.
         * @function create
         * @memberof question.AnswerEvent
         * @static
         * @param {question.IAnswerEvent=} [properties] Properties to set
         * @returns {question.AnswerEvent} AnswerEvent instance
         */
        AnswerEvent.create = function create(properties) {
            return new AnswerEvent(properties);
        };

        /**
         * Encodes the specified AnswerEvent message. Does not implicitly {@link question.AnswerEvent.verify|verify} messages.
         * @function encode
         * @memberof question.AnswerEvent
         * @static
         * @param {question.IAnswerEvent} message AnswerEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AnswerEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seat != null && Object.hasOwnProperty.call(message, "seat"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seat);
            if (message.optionId != null && Object.hasOwnProperty.call(message, "optionId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.optionId);
            if (message.isCorrect != null && Object.hasOwnProperty.call(message, "isCorrect"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isCorrect);
            if (message.correctOptionId != null && Object.hasOwnProperty.call(message, "correctOptionId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.correctOptionId);
            return writer;
        };

        /**
         * Encodes the specified AnswerEvent message, length delimited. Does not implicitly {@link question.AnswerEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof question.AnswerEvent
         * @static
         * @param {question.IAnswerEvent} message AnswerEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AnswerEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AnswerEvent message from the specified reader or buffer.
         * @function decode
         * @memberof question.AnswerEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {question.AnswerEvent} AnswerEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AnswerEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.question.AnswerEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seat = reader.int32();
                    break;
                case 2:
                    message.optionId = reader.string();
                    break;
                case 3:
                    message.isCorrect = reader.bool();
                    break;
                case 4:
                    message.correctOptionId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AnswerEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof question.AnswerEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {question.AnswerEvent} AnswerEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AnswerEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AnswerEvent message.
         * @function verify
         * @memberof question.AnswerEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AnswerEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seat != null && message.hasOwnProperty("seat"))
                if (!$util.isInteger(message.seat))
                    return "seat: integer expected";
            if (message.optionId != null && message.hasOwnProperty("optionId"))
                if (!$util.isString(message.optionId))
                    return "optionId: string expected";
            if (message.isCorrect != null && message.hasOwnProperty("isCorrect"))
                if (typeof message.isCorrect !== "boolean")
                    return "isCorrect: boolean expected";
            if (message.correctOptionId != null && message.hasOwnProperty("correctOptionId"))
                if (!$util.isString(message.correctOptionId))
                    return "correctOptionId: string expected";
            return null;
        };

        /**
         * Creates an AnswerEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof question.AnswerEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {question.AnswerEvent} AnswerEvent
         */
        AnswerEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.question.AnswerEvent)
                return object;
            let message = new $root.question.AnswerEvent();
            if (object.seat != null)
                message.seat = object.seat | 0;
            if (object.optionId != null)
                message.optionId = String(object.optionId);
            if (object.isCorrect != null)
                message.isCorrect = Boolean(object.isCorrect);
            if (object.correctOptionId != null)
                message.correctOptionId = String(object.correctOptionId);
            return message;
        };

        /**
         * Creates a plain object from an AnswerEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof question.AnswerEvent
         * @static
         * @param {question.AnswerEvent} message AnswerEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AnswerEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seat = 0;
                object.optionId = "";
                object.isCorrect = false;
                object.correctOptionId = "";
            }
            if (message.seat != null && message.hasOwnProperty("seat"))
                object.seat = message.seat;
            if (message.optionId != null && message.hasOwnProperty("optionId"))
                object.optionId = message.optionId;
            if (message.isCorrect != null && message.hasOwnProperty("isCorrect"))
                object.isCorrect = message.isCorrect;
            if (message.correctOptionId != null && message.hasOwnProperty("correctOptionId"))
                object.correctOptionId = message.correctOptionId;
            return object;
        };

        /**
         * Converts this AnswerEvent to JSON.
         * @function toJSON
         * @memberof question.AnswerEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AnswerEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AnswerEvent;
    })();

    question.GameEndEvent = (function() {

        /**
         * Properties of a GameEndEvent.
         * @memberof question
         * @interface IGameEndEvent
         * @property {Array.<number>|null} [winnerSeats] GameEndEvent winnerSeats
         * @property {Array.<number>|null} [winBets] GameEndEvent winBets
         * @property {Array.<question.ISeatState>|null} [seatStates] GameEndEvent seatStates
         */

        /**
         * Constructs a new GameEndEvent.
         * @memberof question
         * @classdesc Represents a GameEndEvent.
         * @implements IGameEndEvent
         * @constructor
         * @param {question.IGameEndEvent=} [properties] Properties to set
         */
        function GameEndEvent(properties) {
            this.winnerSeats = [];
            this.winBets = [];
            this.seatStates = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameEndEvent winnerSeats.
         * @member {Array.<number>} winnerSeats
         * @memberof question.GameEndEvent
         * @instance
         */
        GameEndEvent.prototype.winnerSeats = $util.emptyArray;

        /**
         * GameEndEvent winBets.
         * @member {Array.<number>} winBets
         * @memberof question.GameEndEvent
         * @instance
         */
        GameEndEvent.prototype.winBets = $util.emptyArray;

        /**
         * GameEndEvent seatStates.
         * @member {Array.<question.ISeatState>} seatStates
         * @memberof question.GameEndEvent
         * @instance
         */
        GameEndEvent.prototype.seatStates = $util.emptyArray;

        /**
         * Creates a new GameEndEvent instance using the specified properties.
         * @function create
         * @memberof question.GameEndEvent
         * @static
         * @param {question.IGameEndEvent=} [properties] Properties to set
         * @returns {question.GameEndEvent} GameEndEvent instance
         */
        GameEndEvent.create = function create(properties) {
            return new GameEndEvent(properties);
        };

        /**
         * Encodes the specified GameEndEvent message. Does not implicitly {@link question.GameEndEvent.verify|verify} messages.
         * @function encode
         * @memberof question.GameEndEvent
         * @static
         * @param {question.IGameEndEvent} message GameEndEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameEndEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.winnerSeats != null && message.winnerSeats.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.winnerSeats.length; ++i)
                    writer.int32(message.winnerSeats[i]);
                writer.ldelim();
            }
            if (message.winBets != null && message.winBets.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.winBets.length; ++i)
                    writer.int32(message.winBets[i]);
                writer.ldelim();
            }
            if (message.seatStates != null && message.seatStates.length)
                for (let i = 0; i < message.seatStates.length; ++i)
                    $root.question.SeatState.encode(message.seatStates[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GameEndEvent message, length delimited. Does not implicitly {@link question.GameEndEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof question.GameEndEvent
         * @static
         * @param {question.IGameEndEvent} message GameEndEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameEndEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameEndEvent message from the specified reader or buffer.
         * @function decode
         * @memberof question.GameEndEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {question.GameEndEvent} GameEndEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameEndEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.question.GameEndEvent();
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
                    if (!(message.winBets && message.winBets.length))
                        message.winBets = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.winBets.push(reader.int32());
                    } else
                        message.winBets.push(reader.int32());
                    break;
                case 5:
                    if (!(message.seatStates && message.seatStates.length))
                        message.seatStates = [];
                    message.seatStates.push($root.question.SeatState.decode(reader, reader.uint32()));
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
         * @memberof question.GameEndEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {question.GameEndEvent} GameEndEvent
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
         * @memberof question.GameEndEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameEndEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
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
            if (message.seatStates != null && message.hasOwnProperty("seatStates")) {
                if (!Array.isArray(message.seatStates))
                    return "seatStates: array expected";
                for (let i = 0; i < message.seatStates.length; ++i) {
                    let error = $root.question.SeatState.verify(message.seatStates[i]);
                    if (error)
                        return "seatStates." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GameEndEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof question.GameEndEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {question.GameEndEvent} GameEndEvent
         */
        GameEndEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.question.GameEndEvent)
                return object;
            let message = new $root.question.GameEndEvent();
            if (object.winnerSeats) {
                if (!Array.isArray(object.winnerSeats))
                    throw TypeError(".question.GameEndEvent.winnerSeats: array expected");
                message.winnerSeats = [];
                for (let i = 0; i < object.winnerSeats.length; ++i)
                    message.winnerSeats[i] = object.winnerSeats[i] | 0;
            }
            if (object.winBets) {
                if (!Array.isArray(object.winBets))
                    throw TypeError(".question.GameEndEvent.winBets: array expected");
                message.winBets = [];
                for (let i = 0; i < object.winBets.length; ++i)
                    message.winBets[i] = object.winBets[i] | 0;
            }
            if (object.seatStates) {
                if (!Array.isArray(object.seatStates))
                    throw TypeError(".question.GameEndEvent.seatStates: array expected");
                message.seatStates = [];
                for (let i = 0; i < object.seatStates.length; ++i) {
                    if (typeof object.seatStates[i] !== "object")
                        throw TypeError(".question.GameEndEvent.seatStates: object expected");
                    message.seatStates[i] = $root.question.SeatState.fromObject(object.seatStates[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GameEndEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof question.GameEndEvent
         * @static
         * @param {question.GameEndEvent} message GameEndEvent
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
                object.seatStates = [];
            }
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
            if (message.seatStates && message.seatStates.length) {
                object.seatStates = [];
                for (let j = 0; j < message.seatStates.length; ++j)
                    object.seatStates[j] = $root.question.SeatState.toObject(message.seatStates[j], options);
            }
            return object;
        };

        /**
         * Converts this GameEndEvent to JSON.
         * @function toJSON
         * @memberof question.GameEndEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameEndEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameEndEvent;
    })();

    question.SendRobotEvent = (function() {

        /**
         * Properties of a SendRobotEvent.
         * @memberof question
         * @interface ISendRobotEvent
         * @property {Array.<question.IQuestionEvent>|null} [questions] SendRobotEvent questions
         * @property {Array.<question.IOption>|null} [answers] SendRobotEvent answers
         * @property {number|null} [correctRate] SendRobotEvent correctRate
         */

        /**
         * Constructs a new SendRobotEvent.
         * @memberof question
         * @classdesc Represents a SendRobotEvent.
         * @implements ISendRobotEvent
         * @constructor
         * @param {question.ISendRobotEvent=} [properties] Properties to set
         */
        function SendRobotEvent(properties) {
            this.questions = [];
            this.answers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SendRobotEvent questions.
         * @member {Array.<question.IQuestionEvent>} questions
         * @memberof question.SendRobotEvent
         * @instance
         */
        SendRobotEvent.prototype.questions = $util.emptyArray;

        /**
         * SendRobotEvent answers.
         * @member {Array.<question.IOption>} answers
         * @memberof question.SendRobotEvent
         * @instance
         */
        SendRobotEvent.prototype.answers = $util.emptyArray;

        /**
         * SendRobotEvent correctRate.
         * @member {number} correctRate
         * @memberof question.SendRobotEvent
         * @instance
         */
        SendRobotEvent.prototype.correctRate = 0;

        /**
         * Creates a new SendRobotEvent instance using the specified properties.
         * @function create
         * @memberof question.SendRobotEvent
         * @static
         * @param {question.ISendRobotEvent=} [properties] Properties to set
         * @returns {question.SendRobotEvent} SendRobotEvent instance
         */
        SendRobotEvent.create = function create(properties) {
            return new SendRobotEvent(properties);
        };

        /**
         * Encodes the specified SendRobotEvent message. Does not implicitly {@link question.SendRobotEvent.verify|verify} messages.
         * @function encode
         * @memberof question.SendRobotEvent
         * @static
         * @param {question.ISendRobotEvent} message SendRobotEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SendRobotEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.questions != null && message.questions.length)
                for (let i = 0; i < message.questions.length; ++i)
                    $root.question.QuestionEvent.encode(message.questions[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.answers != null && message.answers.length)
                for (let i = 0; i < message.answers.length; ++i)
                    $root.question.Option.encode(message.answers[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.correctRate != null && Object.hasOwnProperty.call(message, "correctRate"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.correctRate);
            return writer;
        };

        /**
         * Encodes the specified SendRobotEvent message, length delimited. Does not implicitly {@link question.SendRobotEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof question.SendRobotEvent
         * @static
         * @param {question.ISendRobotEvent} message SendRobotEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SendRobotEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SendRobotEvent message from the specified reader or buffer.
         * @function decode
         * @memberof question.SendRobotEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {question.SendRobotEvent} SendRobotEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SendRobotEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.question.SendRobotEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.questions && message.questions.length))
                        message.questions = [];
                    message.questions.push($root.question.QuestionEvent.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message.answers && message.answers.length))
                        message.answers = [];
                    message.answers.push($root.question.Option.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.correctRate = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SendRobotEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof question.SendRobotEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {question.SendRobotEvent} SendRobotEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SendRobotEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SendRobotEvent message.
         * @function verify
         * @memberof question.SendRobotEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SendRobotEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.questions != null && message.hasOwnProperty("questions")) {
                if (!Array.isArray(message.questions))
                    return "questions: array expected";
                for (let i = 0; i < message.questions.length; ++i) {
                    let error = $root.question.QuestionEvent.verify(message.questions[i]);
                    if (error)
                        return "questions." + error;
                }
            }
            if (message.answers != null && message.hasOwnProperty("answers")) {
                if (!Array.isArray(message.answers))
                    return "answers: array expected";
                for (let i = 0; i < message.answers.length; ++i) {
                    let error = $root.question.Option.verify(message.answers[i]);
                    if (error)
                        return "answers." + error;
                }
            }
            if (message.correctRate != null && message.hasOwnProperty("correctRate"))
                if (typeof message.correctRate !== "number")
                    return "correctRate: number expected";
            return null;
        };

        /**
         * Creates a SendRobotEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof question.SendRobotEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {question.SendRobotEvent} SendRobotEvent
         */
        SendRobotEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.question.SendRobotEvent)
                return object;
            let message = new $root.question.SendRobotEvent();
            if (object.questions) {
                if (!Array.isArray(object.questions))
                    throw TypeError(".question.SendRobotEvent.questions: array expected");
                message.questions = [];
                for (let i = 0; i < object.questions.length; ++i) {
                    if (typeof object.questions[i] !== "object")
                        throw TypeError(".question.SendRobotEvent.questions: object expected");
                    message.questions[i] = $root.question.QuestionEvent.fromObject(object.questions[i]);
                }
            }
            if (object.answers) {
                if (!Array.isArray(object.answers))
                    throw TypeError(".question.SendRobotEvent.answers: array expected");
                message.answers = [];
                for (let i = 0; i < object.answers.length; ++i) {
                    if (typeof object.answers[i] !== "object")
                        throw TypeError(".question.SendRobotEvent.answers: object expected");
                    message.answers[i] = $root.question.Option.fromObject(object.answers[i]);
                }
            }
            if (object.correctRate != null)
                message.correctRate = Number(object.correctRate);
            return message;
        };

        /**
         * Creates a plain object from a SendRobotEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof question.SendRobotEvent
         * @static
         * @param {question.SendRobotEvent} message SendRobotEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SendRobotEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.questions = [];
                object.answers = [];
            }
            if (options.defaults)
                object.correctRate = 0;
            if (message.questions && message.questions.length) {
                object.questions = [];
                for (let j = 0; j < message.questions.length; ++j)
                    object.questions[j] = $root.question.QuestionEvent.toObject(message.questions[j], options);
            }
            if (message.answers && message.answers.length) {
                object.answers = [];
                for (let j = 0; j < message.answers.length; ++j)
                    object.answers[j] = $root.question.Option.toObject(message.answers[j], options);
            }
            if (message.correctRate != null && message.hasOwnProperty("correctRate"))
                object.correctRate = options.json && !isFinite(message.correctRate) ? String(message.correctRate) : message.correctRate;
            return object;
        };

        /**
         * Converts this SendRobotEvent to JSON.
         * @function toJSON
         * @memberof question.SendRobotEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SendRobotEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SendRobotEvent;
    })();

    return question;
})();

export { $root as default };
