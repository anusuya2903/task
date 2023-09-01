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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var cors = require('cors');
var mssql = require('mssql');
var app = express();
app.use(cors());
app.use(express.json());
var port = 8000;
var config = {
    user: 'jmanassessment',
    password: 'JMD##230',
    server: 'jmanassessment.database.windows.net',
    database: 'jmanassessment',
};
var pool = new mssql.ConnectionPool(config);
var userData = /** @class */ (function () {
    function userData() {
    }
    userData.prototype.createTable = function (tableName) {
        return __awaiter(this, void 0, void 0, function () {
            var checkTable, query, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, pool.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.tableExist(tableName)];
                    case 2:
                        checkTable = _a.sent();
                        if (checkTable === false) {
                            query = "Create Table ".concat(tableName, " (Id int primary key IDENTITY(1,1), Name varchar(30), Email varchar(50), Password varchar(50))");
                            pool.request().query(query);
                            console.log("table created");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    userData.prototype.tableExist = function (tableName) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, pool.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, pool.request().query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '".concat(tableName, "'"))];
                    case 2:
                        result = _a.sent();
                        // console.log(result);
                        return [2 /*return*/, result.recordset.length > 0]; // Error may occur here
                    case 3:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userData.prototype.userInput = function (tableName, userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var query, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, pool.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.tableExist(tableName)];
                    case 2:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        query = "INSERT INTO ".concat(tableName, "(Name , Email, Password) VALUES ('").concat(userInfo.username, "', '").concat(userInfo.email, "', '").concat(userInfo.password, "')");
                        return [4 /*yield*/, pool.request().query(query)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return userData;
}());
var obj = new userData();
app.get('/signin', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pool.connect()
                // if (pool.connected) {
                //     console.log('Connected to the database');
                // }
            ];
            case 1:
                _a.sent();
                // if (pool.connected) {
                //     console.log('Connected to the database');
                // }
                return [4 /*yield*/, obj.createTable("UsersData")];
            case 2:
                // if (pool.connected) {
                //     console.log('Connected to the database');
                // }
                _a.sent();
                res.send("Hello World");
                return [2 /*return*/];
        }
    });
}); });
app.post('/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, existUserQuery, userExistData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                if (!(data.username && data.email && data.password)) return [3 /*break*/, 7];
                return [4 /*yield*/, obj.createTable("UsersData")];
            case 1:
                _a.sent();
                return [4 /*yield*/, pool.connect()];
            case 2:
                _a.sent();
                existUserQuery = "SELECT * FROM UsersData WHERE Email = '".concat(data.email, "'");
                return [4 /*yield*/, pool.request().query(existUserQuery)];
            case 3:
                userExistData = _a.sent();
                console.log(userExistData.recordset.length);
                if (!(userExistData.recordset.length > 0)) return [3 /*break*/, 4];
                res.json({ message: "User already exist" });
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, obj.userInput("UsersData", data).then(function () {
                    res.json({ message: "userCreated" });
                })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                res.json({ message: "All fields are required!" });
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); });
app.post('/signin', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, userQuery, userData_1, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                console.log(data.password);
                console.log(data.email);
                if (!(data.email && data.password)) return [3 /*break*/, 6];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, pool.connect()];
            case 2:
                _a.sent();
                userQuery = "SELECT * FROM UsersData WHERE Email = '".concat(data.email, "'");
                return [4 /*yield*/, pool.request().query(userQuery)];
            case 3:
                userData_1 = _a.sent();
                console.log(userData_1);
                if (userData_1.recordset.length > 0) {
                    user = userData_1.recordset[0];
                    if (user.Password === data.password) {
                        console.log(user.Password, data.password);
                        res.json({ message: "Sign-in successful" });
                    }
                    else {
                        res.json({ message: "Invalid credentials" });
                    }
                }
                else {
                    res.json({ message: "User not found" });
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error("Error during sign-in:", error_1);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                res.status(400).json({ message: "All fields are required" });
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); });
app.post('/myprofile', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var employeeEmail, employeeQuery, employeeData, employee, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                employeeEmail = req.params.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, pool.connect()];
            case 2:
                _a.sent();
                employeeQuery = "SELECT * FROM Employees WHERE Email = ".concat(employeeEmail);
                return [4 /*yield*/, pool.request().query(employeeQuery)];
            case 3:
                employeeData = _a.sent();
                if (employeeData.recordset.length !== 0) {
                    employee = employeeData.recordset[0];
                    res.json(employee);
                }
                else {
                    res.json({ message: "Employee not found" });
                }
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error("Error fetching employee profile:", error_2);
                res.json({ message: "Internal server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
