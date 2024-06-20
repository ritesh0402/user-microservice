"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/signup', userController_1.signup);
router.post('/login', userController_1.login);
router.put('/:userId', userController_1.updateUser);
router.delete('/:userId', userController_1.deleteUser);
router.get('/', userController_1.listUsers);
router.get('/search', userController_1.searchUser);
exports.default = router;
