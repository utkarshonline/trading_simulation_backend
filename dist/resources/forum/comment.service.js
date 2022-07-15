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
const comment_model_1 = __importDefault(require("../forum/comment.model"));
/**
 * Author: Sanika Tamhankar
 * BannerID: B00909848
 * Email: sn295037@dal.ca
 */
class CommentService {
    constructor() {
        this.comment = comment_model_1.default;
    }
    addComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdComment = yield this.comment.create(comment);
                return createdComment;
            }
            catch (err) {
                console.log(err.message);
                throw new Error("Unable to create a comment.");
            }
        });
    }
    getCommentsList(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield this.comment.find({ symbol: symbol });
                return comments;
            }
            catch (err) {
                console.log(err.message);
                throw new Error("Unable to get comments.");
            }
        });
    }
    updateComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(comment);
                const comm = yield this.comment.findOneAndUpdate({ symbol: comment.symbol, commentID: comment.commentID }, { comment: comment.comment, creation_date: comment.creation_date });
                console.log("Success");
                return comm;
            }
            catch (err) {
                console.log(err.message);
                throw new Error("Unable to update comment.");
            }
        });
    }
    deleteComment(symbol, commentID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(commentID);
                const comm = yield this.comment.findOneAndDelete({ symbol: symbol, commentID: commentID });
                console.log("Success");
                return comm;
            }
            catch (err) {
                console.log(err.message);
                throw new Error("Unable to delete comment.");
            }
        });
    }
}
exports.default = CommentService;
