"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentPipelineManager = void 0;
var PromptRegistry_1 = require("./PromptRegistry");
var node_fetch_1 = __importDefault(require("node-fetch"));
var AgentPipelineManager = /** @class */ (function () {
    function AgentPipelineManager(steps) {
        this.steps = steps;
    }
    AgentPipelineManager.prototype.runPipeline = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, step, prompt_1, output;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.steps;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        step = _a[_i];
                        return [4 /*yield*/, PromptRegistry_1.PromptRegistry.getPrompt(step.promptName)];
                    case 2:
                        prompt_1 = _b.sent();
                        if (!prompt_1)
                            throw new Error("Prompt ".concat(step.promptName, " not found"));
                        return [4 /*yield*/, callGeminiAgent(prompt_1.system_prompt, step.input, prompt_1.function_schema)];
                    case 3:
                        output = _b.sent();
                        step.output = output;
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, this.steps];
                }
            });
        });
    };
    return AgentPipelineManager;
}());
exports.AgentPipelineManager = AgentPipelineManager;
function callGeminiAgent(systemPrompt, userPayload, functionSchema) {
    return __awaiter(this, void 0, void 0, function () {
        var GEMINI, GEMINI_KEY, messages, res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    GEMINI = process.env.GEMINI_API_URL || 'https://api.gemini.com/v2/chat';
                    GEMINI_KEY = process.env.GEMINI_API_KEY;
                    messages = [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: JSON.stringify(userPayload) }
                    ];
                    return [4 /*yield*/, (0, node_fetch_1.default)(GEMINI, {
                            method: 'POST',
                            headers: {
                                'Authorization': "Bearer ".concat(GEMINI_KEY),
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ model: 'gemini-2.5-pro', messages: messages, function_call: 'auto', functions: [functionSchema] })
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
