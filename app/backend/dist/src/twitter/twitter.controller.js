"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterController = void 0;
const common_1 = require("@nestjs/common");
const twitter_service_1 = require("./twitter.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let TwitterController = class TwitterController {
    twitterService;
    constructor(twitterService) {
        this.twitterService = twitterService;
    }
    async scheduleTweet(req, body) {
        return this.twitterService.scheduleTweet(req.user.organizationId, body);
    }
    async replyToMention(req, body) {
        return this.twitterService.autoReplyToMention(req.user.organizationId, body);
    }
    async getTrending(req) {
        return this.twitterService.detectTrendingHashtags(req.user.organizationId);
    }
    async getEngagement(req) {
        return this.twitterService.getEngagementMetrics(req.user.organizationId);
    }
    async handleWebhook(payload) {
        return this.twitterService.handleWebhook(payload);
    }
};
exports.TwitterController = TwitterController;
__decorate([
    (0, common_1.Post)('tweet'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TwitterController.prototype, "scheduleTweet", null);
__decorate([
    (0, common_1.Post)('reply-mention'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TwitterController.prototype, "replyToMention", null);
__decorate([
    (0, common_1.Get)('trending'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TwitterController.prototype, "getTrending", null);
__decorate([
    (0, common_1.Get)('engagement'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TwitterController.prototype, "getEngagement", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TwitterController.prototype, "handleWebhook", null);
exports.TwitterController = TwitterController = __decorate([
    (0, common_1.Controller)('twitter'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [twitter_service_1.TwitterService])
], TwitterController);
//# sourceMappingURL=twitter.controller.js.map