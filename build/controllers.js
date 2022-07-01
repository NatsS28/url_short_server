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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirect = exports.create = void 0;
const model_1 = __importDefault(require("./model"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const existing = yield model_1.default.findOne({ full: req.body.url }).lean();
    if (existing) {
        res.json({ url: existing });
        return;
    }
    const url = new model_1.default({
        full: req.body.url,
    });
    const savedUrl = yield url.save();
    res.json({ url: savedUrl });
});
exports.create = create;
const redirect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const url = yield model_1.default.findOne({
        short: req.params.shortUrl
    }).lean();
    if (url) {
        res.status(200).json(url.full);
        return;
    }
    res.status(200).json({ error: "URL not found" });
});
exports.redirect = redirect;
