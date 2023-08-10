/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameMem: () => (/* binding */ GameMem)
/* harmony export */ });
/* harmony import */ var _model_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _model_entityTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);


/**
 * Represents the game memory and its state.
 */
var GameMem = /** @class */ (function () {
    function GameMem() {
    }
    /**
     * Sets the game board.
     * @param {Board} board - The game board.
     */
    GameMem.prototype.setBoard = function (board) {
        this.board = board;
    };
    /**
     * Gets the game board.
     * @returns {Board} The game board.
     */
    GameMem.prototype.getBoard = function () {
        return this.board;
    };
    /**
     * Checks if the game is over (Queen is dead or all the other bees are dead).
     * @returns {boolean} Whether the game is over or not.
     */
    GameMem.prototype.isGameOver = function () {
        var queenBee = this.board.allBees.filter(function (bee) { return bee.getType() === _model_entityTypes__WEBPACK_IMPORTED_MODULE_1__.EntityType.QUEEN; });
        var restOfBees = this.board.allBees.find(function (bee) { return bee.getType() !== _model_entityTypes__WEBPACK_IMPORTED_MODULE_1__.EntityType.QUEEN && bee.getType() !== undefined; });
        if ((queenBee && queenBee.some(function (queen) { return queen.getHp() <= 0; })) || !restOfBees.isAlive()) {
            return true;
        }
        return false;
    };
    /**
     * Saves the current game state to local storage.
     */
    GameMem.prototype.saveGame = function () {
        if (this.board.allBees.some(function (bee) { return bee.isAlive(); })) {
            localStorage.setItem('GAME_STATE', JSON.stringify(this.board));
        }
    };
    /**
     * Loads the game state from local storage.
     */
    GameMem.prototype.loadGame = function () {
        var savedBoard = JSON.parse(localStorage.getItem('GAME_STATE'));
        this.board = new _model_board__WEBPACK_IMPORTED_MODULE_0__.Board();
        this.board.initFromLoad(savedBoard._allBees);
    };
    /**
     * Resets the game state.
     */
    GameMem.prototype.resetGame = function () {
        localStorage.removeItem('GAME_STATE');
        this.board = new _model_board__WEBPACK_IMPORTED_MODULE_0__.Board();
        this.board.initDefault();
        localStorage.setItem('GAME_STATE', JSON.stringify(this.board));
    };
    return GameMem;
}());



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Board: () => (/* binding */ Board)
/* harmony export */ });
/* harmony import */ var _entityTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _entityFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);


/**
 * Represents the game board containing bee entities.
 */
var Board = /** @class */ (function () {
    function Board() {
        /**
         * An array containing all bee entities on the board.
         */
        this._allBees = new Array();
    }
    /**
     * Initializes the game board from a saved state.
     * @param {Array} boardJSON - The saved state of the game board.
     */
    Board.prototype.initFromLoad = function (boardJSON) {
        for (var _i = 0, boardJSON_1 = boardJSON; _i < boardJSON_1.length; _i++) {
            var bee = boardJSON_1[_i];
            var beeOK = _entityFactory__WEBPACK_IMPORTED_MODULE_1__.EntityFactory.createEntity(bee.entityType);
            beeOK.setHp(bee.hp);
            this._allBees.push(beeOK);
        }
    };
    /**
     * Initializes the game board with default bee entities.
     */
    Board.prototype.initDefault = function () {
        this.addEntities(_entityTypes__WEBPACK_IMPORTED_MODULE_0__.EntityType.QUEEN);
        this.addEntitiesOfType(_entityTypes__WEBPACK_IMPORTED_MODULE_0__.EntityType.WORKER, 5);
        this.addEntitiesOfType(_entityTypes__WEBPACK_IMPORTED_MODULE_0__.EntityType.DRONE, 8);
    };
    Board.prototype.addEntities = function () {
        var entityTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entityTypes[_i] = arguments[_i];
        }
        for (var _a = 0, entityTypes_1 = entityTypes; _a < entityTypes_1.length; _a++) {
            var et = entityTypes_1[_a];
            this.addEntity(et);
        }
    };
    /**
     * Adds a specified number of bee entities of a given type to the game board.
     * @param {EntityType} entityType - The type of bee entity to add.
     * @param {number} numberOfEntities - The number of entities to add.
     */
    Board.prototype.addEntitiesOfType = function (entityType, numberOfEntities) {
        for (var i = 0; i < numberOfEntities; i++) {
            this.addEntity(entityType);
        }
    };
    /**
     * Adds a bee entity of a specified type to the game board.
     * @param {EntityType} entityType - The type of bee entity to add.
     */
    Board.prototype.addEntity = function (entityType) {
        this._allBees.push(_entityFactory__WEBPACK_IMPORTED_MODULE_1__.EntityFactory.createEntity(entityType));
    };
    /**
     * Adds a worker bee entity to the game board.
     */
    Board.prototype.addWorkerBee = function () {
        this.addEntitiesOfType(_entityTypes__WEBPACK_IMPORTED_MODULE_0__.EntityType.WORKER, 1);
    };
    /**
     * Adds a drone bee entity to the game board.
     */
    Board.prototype.addDroneBee = function () {
        this.addEntitiesOfType(_entityTypes__WEBPACK_IMPORTED_MODULE_0__.EntityType.DRONE, 1);
    };
    Object.defineProperty(Board.prototype, "allBees", {
        /**
         * Returns an array containing all bee entities on the board.
         * @returns {Array<Entity>} An array of bee entities on the board.
         */
        get: function () {
            return this._allBees;
        },
        enumerable: false,
        configurable: true
    });
    return Board;
}());



/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EntityType: () => (/* binding */ EntityType)
/* harmony export */ });
var EntityType;
(function (EntityType) {
    EntityType[EntityType["QUEEN"] = 0] = "QUEEN";
    EntityType[EntityType["WORKER"] = 1] = "WORKER";
    EntityType[EntityType["DRONE"] = 2] = "DRONE";
})(EntityType || (EntityType = {}));


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EntityFactory: () => (/* binding */ EntityFactory)
/* harmony export */ });
/* harmony import */ var _entityTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _drone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _queen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _worker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);




var EntityFactory = /** @class */ (function () {
    function EntityFactory() {
    }
    EntityFactory.createEntity = function (entityType) {
        switch (entityType) {
            case _entityTypes__WEBPACK_IMPORTED_MODULE_0__.EntityType.DRONE:
                return new _drone__WEBPACK_IMPORTED_MODULE_1__.Drone();
            case _entityTypes__WEBPACK_IMPORTED_MODULE_0__.EntityType.QUEEN:
                return new _queen__WEBPACK_IMPORTED_MODULE_2__.Queen();
            case _entityTypes__WEBPACK_IMPORTED_MODULE_0__.EntityType.WORKER:
                return new _worker__WEBPACK_IMPORTED_MODULE_3__.Worker();
            default:
                throw new Error('Unknown entity type');
        }
    };
    return EntityFactory;
}());



/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Drone: () => (/* binding */ Drone)
/* harmony export */ });
/* harmony import */ var _entityTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _baseEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Drone = /** @class */ (function (_super) {
    __extends(Drone, _super);
    function Drone() {
        return _super.call(this, 50, _entityTypes__WEBPACK_IMPORTED_MODULE_0__.EntityType.DRONE) || this;
    }
    Drone.prototype.takeDamage = function () {
        this.hp -= 12;
    };
    return Drone;
}(_baseEntity__WEBPACK_IMPORTED_MODULE_1__.BaseEntity));



/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseEntity: () => (/* binding */ BaseEntity)
/* harmony export */ });
/**
 * Represents the base entity class for bees.
 * @implements Entity
 */
var BaseEntity = /** @class */ (function () {
    /**
     * Creates an instance of BaseEntity.
     * @param {number} hp - The initial hit points (HP) of the bee.
     * @param {EntityType} entityType - The type of the bee entity.
     */
    function BaseEntity(hp, entityType) {
        this.hp = hp;
        this.entityType = entityType;
    }
    /**
     * Gets the type of the bee entity.
     * @returns {EntityType} The type of the bee entity.
     */
    BaseEntity.prototype.getType = function () {
        return this.entityType;
    };
    /**
     * Sets the hit points (HP) of the bee entity.
     * @param {number} hp - The new hit points (HP) value.
     */
    BaseEntity.prototype.setHp = function (hp) {
        this.hp = hp;
    };
    /**
     * Gets the current hit points (HP) of the bee entity.
     * @returns {number} The current hit points (HP) value.
     */
    BaseEntity.prototype.getHp = function () {
        return this.hp;
    };
    /**
     * Checks if the bee entity is alive based on its hit points (HP).
     * @returns {boolean} `true` if the bee entity is alive, otherwise `false`.
     */
    BaseEntity.prototype.isAlive = function () {
        return this.hp > 0;
    };
    return BaseEntity;
}());



/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Queen: () => (/* binding */ Queen)
/* harmony export */ });
/* harmony import */ var _entityTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _baseEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen() {
        return _super.call(this, 100, _entityTypes__WEBPACK_IMPORTED_MODULE_0__.EntityType.QUEEN) || this;
    }
    Queen.prototype.takeDamage = function () {
        this.hp -= 8;
    };
    return Queen;
}(_baseEntity__WEBPACK_IMPORTED_MODULE_1__.BaseEntity));



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Worker: () => (/* binding */ Worker)
/* harmony export */ });
/* harmony import */ var _entityTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _baseEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Worker = /** @class */ (function (_super) {
    __extends(Worker, _super);
    function Worker() {
        return _super.call(this, 75, _entityTypes__WEBPACK_IMPORTED_MODULE_0__.EntityType.WORKER) || this;
    }
    Worker.prototype.takeDamage = function () {
        this.hp -= 10;
    };
    return Worker;
}(_baseEntity__WEBPACK_IMPORTED_MODULE_1__.BaseEntity));



/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BeeUI: () => (/* binding */ BeeUI),
/* harmony export */   UI: () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _model_entityTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

/**
 * Represents the user interface for displaying bee information.
 */
var BeeUI = /** @class */ (function () {
    /**
     * Creates an instance of BeeUI.
     * @param {Entity} bee - The bee entity.
     * @param {UI} ui - The user interface.
     */
    function BeeUI(bee, ui) {
        this.bee = bee;
        this.ui = ui;
    }
    /**
     * Generates the HTML element for displaying bee information.
     * @returns {HTMLElement} The HTML element representing the bee.
     */
    BeeUI.prototype.display = function () {
        var result = document.createElement('div');
        var h2Header = document.createElement('h2');
        var btype = '';
        switch (this.bee.getType()) {
            case _model_entityTypes__WEBPACK_IMPORTED_MODULE_0__.EntityType.DRONE:
                btype = 'DRONE';
                h2Header.innerHTML = "<img class=\"droneimg\" src=\"drone.png\" alt=\"Drone\">";
                break;
            case _model_entityTypes__WEBPACK_IMPORTED_MODULE_0__.EntityType.QUEEN:
                btype = 'QUEEN';
                h2Header.innerHTML = "<img class=\"queenimg\" src=\"queen.png\" alt=\"Queen\">";
                break;
            case _model_entityTypes__WEBPACK_IMPORTED_MODULE_0__.EntityType.WORKER:
                btype = 'WORKER';
                h2Header.innerHTML = "<img class=\"workerimg\" src=\"worker.png\" alt=\"Worker\">";
                break;
            default:
                throw new Error('Unknown Entity Type');
        }
        result.appendChild(h2Header);
        result.className = btype.toLowerCase();
        if (this.bee.isAlive()) {
            var hpIndicator = document.createElement('span');
            hpIndicator.innerHTML = 'HP: ' + this.bee.getHp();
            result.appendChild(hpIndicator);
        }
        else {
            var beeStatus = document.createElement('p');
            beeStatus.innerHTML = "<img class=\"dead\" src=\"dead.png\" alt=\"dead\"><p>DEAD</p>";
            result.innerHTML = '';
            result.appendChild(beeStatus);
        }
        return result;
    };
    return BeeUI;
}());

/**
 * Represents the main user interface for the game.
 */
var UI = /** @class */ (function () {
    /**
     * Creates an instance of UI.
     * @param {GameMem} gameMem - The game memory.
     */
    function UI(gameMem) {
        this.gameMem = gameMem;
    }
    /**
     * Generates the UI elements for the game board.
     * @returns {Array<HTMLElement>} An array of HTML elements representing bees.
     */
    UI.prototype.generateBoardUI = function () {
        var elements = [];
        for (var _i = 0, _a = this.gameMem.getBoard().allBees; _i < _a.length; _i++) {
            var bee = _a[_i];
            var beeUI = new BeeUI(bee, this);
            elements.push(beeUI.display());
        }
        return elements;
    };
    /**
     * Updates the total HP display in the UI.
     * @param {number} totalHp - The total HP value.
     */
    UI.prototype.updateTotalHpDisplay = function (totalHp) {
        var totalHpDisplay = document.getElementById('hivehealth');
        if (totalHpDisplay) {
            totalHpDisplay.textContent = "Total hive HP: ".concat(totalHp);
        }
    };
    /**
     * Refreshes the game board UI.
     */
    UI.prototype.refreshBoard = function () {
        var drone = document.getElementById('drone');
        var worker = document.getElementById('worker');
        var queen = document.getElementById('queen');
        // Clear the containers before adding new elements
        drone.innerHTML = '';
        worker.innerHTML = '';
        queen.innerHTML = '';
        // Generate and display UI elements for bees
        var boardUI = this.generateBoardUI();
        boardUI.forEach(function (beeUI) {
            if (beeUI.className === 'worker') {
                worker.appendChild(beeUI);
            }
            else if (beeUI.className === 'drone') {
                drone.appendChild(beeUI);
            }
            else {
                queen.appendChild(beeUI);
            }
        });
        // Save game state and update total HP display
        if (this.gameMem.board.allBees.length) {
            this.gameMem.saveGame();
        }
        var totalHp = this.gameMem.board.allBees
            .filter(function (bee) { return bee.isAlive(); })
            .reduce(function (acc, entity) {
            return acc + entity.getHp();
        }, 0);
        this.updateTotalHpDisplay(totalHp);
    };
    return UI;
}());



/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleHitButtonClick: () => (/* binding */ handleHitButtonClick)
/* harmony export */ });
/* harmony import */ var _model_entityTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

var handleHitButtonClick = function (game, uiGraphics) {
    document.getElementById('hit').addEventListener('click', function () {
        var aliveBees = game.board.allBees.filter(function (bee) { return bee.isAlive(); });
        var queen = aliveBees.some(function (bee) { return bee.getType() === _model_entityTypes__WEBPACK_IMPORTED_MODULE_0__.EntityType.QUEEN; });
        var bees = aliveBees.some(function (bee) { return bee.getType() !== _model_entityTypes__WEBPACK_IMPORTED_MODULE_0__.EntityType.QUEEN; });
        if (bees && queen) {
            var randomBee = aliveBees[Math.floor(Math.random() * aliveBees.length)];
            randomBee.takeDamage();
            uiGraphics.refreshBoard();
        }
        else {
            game.resetGame();
            alert('Game is over');
            uiGraphics.refreshBoard();
        }
    });
};


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleResetButtonClick: () => (/* binding */ handleResetButtonClick)
/* harmony export */ });
var handleResetButtonClick = function (game, uiGraphics) {
    document.getElementById('reset').addEventListener('click', function () {
        game.resetGame();
        uiGraphics.refreshBoard();
    });
};


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleAddBeeButtonClick: () => (/* binding */ handleAddBeeButtonClick)
/* harmony export */ });
var handleAddBeeButtonClick = function (game, uiGraphics, beeType) {
    var addButtonId = beeType === "worker" ? 'addworker' : 'adddrone';
    document.getElementById(addButtonId).addEventListener('click', function () {
        if (beeType === "worker") {
            uiGraphics.gameMem.board.addWorkerBee();
        }
        else if (beeType === "drone") {
            uiGraphics.gameMem.board.addDroneBee();
        }
        uiGraphics.refreshBoard();
    });
};


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleNameInput: () => (/* binding */ handleNameInput)
/* harmony export */ });
//Input player's name event Handler
var handleNameInput = function (inputElement, editButton, submitButton, outputDiv) {
    if (inputElement && editButton && submitButton && outputDiv) {
        editButton.addEventListener('click', function () {
            inputElement.disabled = false;
            editButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        });
        submitButton.addEventListener('click', function () {
            var playerName = inputElement.value;
            outputDiv.textContent = "Player: ".concat(playerName);
            inputElement.disabled = true;
            submitButton.style.display = 'none';
            editButton.style.display = 'inline-block';
        });
    }
};


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_mem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _model_board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _ui_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _eventhandlers_hitButtonEventHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _eventhandlers_resetButtonEventHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _eventhandlers_addBeeButtonEventHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var _eventhandlers_inputPlayersNameEventHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);







// Initialize the game
var game;
if (localStorage.getItem('GAME_STATE')) {
    game = new _data_mem__WEBPACK_IMPORTED_MODULE_0__.GameMem();
    game.loadGame();
}
else {
    game = new _data_mem__WEBPACK_IMPORTED_MODULE_0__.GameMem();
    var board = new _model_board__WEBPACK_IMPORTED_MODULE_1__.Board();
    board.initDefault();
    game.setBoard(board);
}
var uiGraphics = new _ui_ui__WEBPACK_IMPORTED_MODULE_2__.UI(game);
uiGraphics.refreshBoard();
// Initialize event handlers
(0,_eventhandlers_hitButtonEventHandler__WEBPACK_IMPORTED_MODULE_3__.handleHitButtonClick)(game, uiGraphics);
(0,_eventhandlers_resetButtonEventHandler__WEBPACK_IMPORTED_MODULE_4__.handleResetButtonClick)(game, uiGraphics);
(0,_eventhandlers_addBeeButtonEventHandler__WEBPACK_IMPORTED_MODULE_5__.handleAddBeeButtonClick)(game, uiGraphics, 'drone');
(0,_eventhandlers_addBeeButtonEventHandler__WEBPACK_IMPORTED_MODULE_5__.handleAddBeeButtonClick)(game, uiGraphics, 'worker');
// Input player's name
var nameInput = document.getElementById('nameInput');
var editButton = document.getElementById('editButton');
var submitButton = document.getElementById('submitButton');
var outputDiv = document.getElementById('output');
(0,_eventhandlers_inputPlayersNameEventHandler__WEBPACK_IMPORTED_MODULE_6__.handleNameInput)(nameInput, editButton, submitButton, outputDiv);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U0FBUyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iZWUtZ2FtZS8uL3NyYy9kYXRhL21lbS50cyIsIndlYnBhY2s6Ly9iZWUtZ2FtZS8uL3NyYy9tb2RlbC9ib2FyZC50cyIsIndlYnBhY2s6Ly9iZWUtZ2FtZS8uL3NyYy9tb2RlbC9lbnRpdHlUeXBlcy50cyIsIndlYnBhY2s6Ly9iZWUtZ2FtZS8uL3NyYy9tb2RlbC9lbnRpdHlGYWN0b3J5LnRzIiwid2VicGFjazovL2JlZS1nYW1lLy4vc3JjL21vZGVsL2Ryb25lLnRzIiwid2VicGFjazovL2JlZS1nYW1lLy4vc3JjL21vZGVsL2Jhc2VFbnRpdHkudHMiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvLi9zcmMvbW9kZWwvcXVlZW4udHMiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvLi9zcmMvbW9kZWwvd29ya2VyLnRzIiwid2VicGFjazovL2JlZS1nYW1lLy4vc3JjL3VpL3VpLnRzIiwid2VicGFjazovL2JlZS1nYW1lLy4vc3JjL2V2ZW50aGFuZGxlcnMvaGl0QnV0dG9uRXZlbnRIYW5kbGVyLnRzIiwid2VicGFjazovL2JlZS1nYW1lLy4vc3JjL2V2ZW50aGFuZGxlcnMvcmVzZXRCdXR0b25FdmVudEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvLi9zcmMvZXZlbnRoYW5kbGVycy9hZGRCZWVCdXR0b25FdmVudEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvLi9zcmMvZXZlbnRoYW5kbGVycy9pbnB1dFBsYXllcnNOYW1lRXZlbnRIYW5kbGVyLnRzIiwid2VicGFjazovL2JlZS1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JlZS1nYW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iZWUtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JlZS1nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm9hcmQgfSBmcm9tIFwiLi4vbW9kZWwvYm9hcmRcIjtcclxuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcIi4uL21vZGVsL2VudGl0eUludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gJy4uL21vZGVsL2VudGl0eVR5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBnYW1lIG1lbW9yeSBhbmQgaXRzIHN0YXRlLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdhbWVNZW0ge1xyXG4gICAgYm9hcmQ6IEJvYXJkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZ2FtZSBib2FyZC5cclxuICAgICAqIEBwYXJhbSB7Qm9hcmR9IGJvYXJkIC0gVGhlIGdhbWUgYm9hcmQuXHJcbiAgICAgKi9cclxuICAgIHNldEJvYXJkKGJvYXJkOiBCb2FyZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGdhbWUgYm9hcmQuXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9hcmR9IFRoZSBnYW1lIGJvYXJkLlxyXG4gICAgICovXHJcbiAgICBnZXRCb2FyZCgpOiBCb2FyZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGdhbWUgaXMgb3ZlciAoUXVlZW4gaXMgZGVhZCBvciBhbGwgdGhlIG90aGVyIGJlZXMgYXJlIGRlYWQpLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlIGdhbWUgaXMgb3ZlciBvciBub3QuXHJcbiAgICAgKi9cclxuICAgIGlzR2FtZU92ZXIoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgcXVlZW5CZWUgPSB0aGlzLmJvYXJkLmFsbEJlZXMuZmlsdGVyKChiZWU6IEVudGl0eSkgPT4gYmVlLmdldFR5cGUoKSA9PT0gRW50aXR5VHlwZS5RVUVFTik7XHJcbiAgICAgICAgY29uc3QgcmVzdE9mQmVlcyA9IHRoaXMuYm9hcmQuYWxsQmVlcy5maW5kKChiZWU6IEVudGl0eSkgPT4gYmVlLmdldFR5cGUoKSAhPT0gRW50aXR5VHlwZS5RVUVFTiAmJiBiZWUuZ2V0VHlwZSgpICE9PSB1bmRlZmluZWQpO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBpZiAoKHF1ZWVuQmVlICYmIHF1ZWVuQmVlLnNvbWUocXVlZW4gPT4gcXVlZW4uZ2V0SHAoKSA8PSAwKSkgfHwgIXJlc3RPZkJlZXMuaXNBbGl2ZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiBcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2F2ZXMgdGhlIGN1cnJlbnQgZ2FtZSBzdGF0ZSB0byBsb2NhbCBzdG9yYWdlLlxyXG4gICAgICovXHJcbiAgICBzYXZlR2FtZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5ib2FyZC5hbGxCZWVzLnNvbWUoKGJlZTogRW50aXR5KSA9PiBiZWUuaXNBbGl2ZSgpKSkge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnR0FNRV9TVEFURScsIEpTT04uc3RyaW5naWZ5KHRoaXMuYm9hcmQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgZ2FtZSBzdGF0ZSBmcm9tIGxvY2FsIHN0b3JhZ2UuXHJcbiAgICAgKi9cclxuICAgIGxvYWRHYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNhdmVkQm9hcmQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdHQU1FX1NUQVRFJykpO1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcclxuICAgICAgICB0aGlzLmJvYXJkLmluaXRGcm9tTG9hZChzYXZlZEJvYXJkLl9hbGxCZWVzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldHMgdGhlIGdhbWUgc3RhdGUuXHJcbiAgICAgKi9cclxuICAgIHJlc2V0R2FtZSgpOiB2b2lkIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnR0FNRV9TVEFURScpO1xyXG5cclxuICAgICAgICB0aGlzLmJvYXJkID0gbmV3IEJvYXJkKCk7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5pbml0RGVmYXVsdCgpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdHQU1FX1NUQVRFJywgSlNPTi5zdHJpbmdpZnkodGhpcy5ib2FyZCkpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEVudGl0eVR5cGUgfSBmcm9tICcuL2VudGl0eVR5cGVzJztcclxuaW1wb3J0IHsgRW50aXR5RmFjdG9yeSB9IGZyb20gJy4vZW50aXR5RmFjdG9yeSc7XHJcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJy4vZW50aXR5SW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyB0aGUgZ2FtZSBib2FyZCBjb250YWluaW5nIGJlZSBlbnRpdGllcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBCb2FyZCB7XHJcbiAgICAvKipcclxuICAgICAqIEFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIGJlZSBlbnRpdGllcyBvbiB0aGUgYm9hcmQuXHJcbiAgICAgKi9cclxuICAgIF9hbGxCZWVzOiBBcnJheTxFbnRpdHk+ID0gbmV3IEFycmF5PEVudGl0eT4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBnYW1lIGJvYXJkIGZyb20gYSBzYXZlZCBzdGF0ZS5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGJvYXJkSlNPTiAtIFRoZSBzYXZlZCBzdGF0ZSBvZiB0aGUgZ2FtZSBib2FyZC5cclxuICAgICAqL1xyXG4gICAgaW5pdEZyb21Mb2FkKGJvYXJkSlNPTjogYW55W10pIHtcclxuICAgICAgICBmb3IgKGxldCBiZWUgb2YgYm9hcmRKU09OKSB7XHJcbiAgICAgICAgICAgIGxldCBiZWVPSzogRW50aXR5ID0gRW50aXR5RmFjdG9yeS5jcmVhdGVFbnRpdHkoYmVlLmVudGl0eVR5cGUpO1xyXG4gICAgICAgICAgICBiZWVPSy5zZXRIcChiZWUuaHApO1xyXG4gICAgICAgICAgICB0aGlzLl9hbGxCZWVzLnB1c2goYmVlT0spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBnYW1lIGJvYXJkIHdpdGggZGVmYXVsdCBiZWUgZW50aXRpZXMuXHJcbiAgICAgKi9cclxuICAgIGluaXREZWZhdWx0KCkge1xyXG4gICAgICAgIHRoaXMuYWRkRW50aXRpZXMoRW50aXR5VHlwZS5RVUVFTik7XHJcbiAgICAgICAgdGhpcy5hZGRFbnRpdGllc09mVHlwZShFbnRpdHlUeXBlLldPUktFUiwgNSk7XHJcbiAgICAgICAgdGhpcy5hZGRFbnRpdGllc09mVHlwZShFbnRpdHlUeXBlLkRST05FLCA4KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFbnRpdGllcyguLi5lbnRpdHlUeXBlczogRW50aXR5VHlwZVtdKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBldCBvZiBlbnRpdHlUeXBlcykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVudGl0eShldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHNwZWNpZmllZCBudW1iZXIgb2YgYmVlIGVudGl0aWVzIG9mIGEgZ2l2ZW4gdHlwZSB0byB0aGUgZ2FtZSBib2FyZC5cclxuICAgICAqIEBwYXJhbSB7RW50aXR5VHlwZX0gZW50aXR5VHlwZSAtIFRoZSB0eXBlIG9mIGJlZSBlbnRpdHkgdG8gYWRkLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlck9mRW50aXRpZXMgLSBUaGUgbnVtYmVyIG9mIGVudGl0aWVzIHRvIGFkZC5cclxuICAgICAqL1xyXG4gICAgYWRkRW50aXRpZXNPZlR5cGUoZW50aXR5VHlwZTogRW50aXR5VHlwZSwgbnVtYmVyT2ZFbnRpdGllczogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZkVudGl0aWVzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFbnRpdHkoZW50aXR5VHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGJlZSBlbnRpdHkgb2YgYSBzcGVjaWZpZWQgdHlwZSB0byB0aGUgZ2FtZSBib2FyZC5cclxuICAgICAqIEBwYXJhbSB7RW50aXR5VHlwZX0gZW50aXR5VHlwZSAtIFRoZSB0eXBlIG9mIGJlZSBlbnRpdHkgdG8gYWRkLlxyXG4gICAgICovXHJcbiAgICBhZGRFbnRpdHkoZW50aXR5VHlwZTogRW50aXR5VHlwZSkge1xyXG4gICAgICAgIHRoaXMuX2FsbEJlZXMucHVzaChFbnRpdHlGYWN0b3J5LmNyZWF0ZUVudGl0eShlbnRpdHlUeXBlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgd29ya2VyIGJlZSBlbnRpdHkgdG8gdGhlIGdhbWUgYm9hcmQuXHJcbiAgICAgKi9cclxuICAgIGFkZFdvcmtlckJlZSgpIHtcclxuICAgICAgICB0aGlzLmFkZEVudGl0aWVzT2ZUeXBlKEVudGl0eVR5cGUuV09SS0VSLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBkcm9uZSBiZWUgZW50aXR5IHRvIHRoZSBnYW1lIGJvYXJkLlxyXG4gICAgICovXHJcbiAgICBhZGREcm9uZUJlZSgpIHtcclxuICAgICAgICB0aGlzLmFkZEVudGl0aWVzT2ZUeXBlKEVudGl0eVR5cGUuRFJPTkUsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBiZWUgZW50aXRpZXMgb24gdGhlIGJvYXJkLlxyXG4gICAgICogQHJldHVybnMge0FycmF5PEVudGl0eT59IEFuIGFycmF5IG9mIGJlZSBlbnRpdGllcyBvbiB0aGUgYm9hcmQuXHJcbiAgICAgKi9cclxuICAgIGdldCBhbGxCZWVzKCk6IEFycmF5PEVudGl0eT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hbGxCZWVzO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBlbnVtIEVudGl0eVR5cGUge1xyXG4gICAgUVVFRU4sXHJcbiAgICBXT1JLRVIsXHJcbiAgICBEUk9ORVxyXG59IiwiaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gJy4vZW50aXR5VHlwZXMnO1xyXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICcuL2VudGl0eUludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBEcm9uZSB9IGZyb20gJy4vZHJvbmUnO1xyXG5pbXBvcnQgeyBRdWVlbiB9IGZyb20gJy4vcXVlZW4nO1xyXG5pbXBvcnQgeyBXb3JrZXIgfSBmcm9tICcuL3dvcmtlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgRW50aXR5RmFjdG9yeSB7XHJcbiAgICBzdGF0aWMgY3JlYXRlRW50aXR5KGVudGl0eVR5cGU6IEVudGl0eVR5cGUpOiBFbnRpdHkge1xyXG4gICAgICAgIHN3aXRjaCAoZW50aXR5VHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIEVudGl0eVR5cGUuRFJPTkU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERyb25lKCk7XHJcbiAgICAgICAgICAgIGNhc2UgRW50aXR5VHlwZS5RVUVFTjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUXVlZW4oKTtcclxuICAgICAgICAgICAgY2FzZSBFbnRpdHlUeXBlLldPUktFUjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgV29ya2VyKCk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW50aXR5IHR5cGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gJy4vZW50aXR5VHlwZXMnO1xyXG5pbXBvcnQgeyBCYXNlRW50aXR5IH0gZnJvbSAnLi9iYXNlRW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBEcm9uZSBleHRlbmRzIEJhc2VFbnRpdHkge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoNTAsIEVudGl0eVR5cGUuRFJPTkUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRha2VEYW1hZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ocCAtPSAxMjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnLi9lbnRpdHlUeXBlcyc7XHJcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJy4vZW50aXR5SW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyB0aGUgYmFzZSBlbnRpdHkgY2xhc3MgZm9yIGJlZXMuXHJcbiAqIEBpbXBsZW1lbnRzIEVudGl0eVxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VFbnRpdHkgaW1wbGVtZW50cyBFbnRpdHkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaGl0IHBvaW50cyAoSFApIG9mIHRoZSBiZWUgZW50aXR5LlxyXG4gICAgICovXHJcbiAgICBocDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHR5cGUgb2YgdGhlIGJlZSBlbnRpdHkuXHJcbiAgICAgKi9cclxuICAgIGVudGl0eVR5cGU6IEVudGl0eVR5cGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJhc2VFbnRpdHkuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaHAgLSBUaGUgaW5pdGlhbCBoaXQgcG9pbnRzIChIUCkgb2YgdGhlIGJlZS5cclxuICAgICAqIEBwYXJhbSB7RW50aXR5VHlwZX0gZW50aXR5VHlwZSAtIFRoZSB0eXBlIG9mIHRoZSBiZWUgZW50aXR5LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihocDogbnVtYmVyLCBlbnRpdHlUeXBlOiBFbnRpdHlUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5ocCA9IGhwO1xyXG4gICAgICAgIHRoaXMuZW50aXR5VHlwZSA9IGVudGl0eVR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB0eXBlIG9mIHRoZSBiZWUgZW50aXR5LlxyXG4gICAgICogQHJldHVybnMge0VudGl0eVR5cGV9IFRoZSB0eXBlIG9mIHRoZSBiZWUgZW50aXR5LlxyXG4gICAgICovXHJcbiAgICBnZXRUeXBlKCk6IEVudGl0eVR5cGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVudGl0eVR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBoaXQgcG9pbnRzIChIUCkgb2YgdGhlIGJlZSBlbnRpdHkuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaHAgLSBUaGUgbmV3IGhpdCBwb2ludHMgKEhQKSB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgc2V0SHAoaHA6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaHAgPSBocDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgaGl0IHBvaW50cyAoSFApIG9mIHRoZSBiZWUgZW50aXR5LlxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIGN1cnJlbnQgaGl0IHBvaW50cyAoSFApIHZhbHVlLlxyXG4gICAgICovXHJcbiAgICBnZXRIcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWJzdHJhY3QgbWV0aG9kIGZvciBjYXVzaW5nIGRhbWFnZSB0byB0aGUgYmVlIGVudGl0eS5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgdGFrZURhbWFnZSgpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBiZWUgZW50aXR5IGlzIGFsaXZlIGJhc2VkIG9uIGl0cyBoaXQgcG9pbnRzIChIUCkuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSBiZWUgZW50aXR5IGlzIGFsaXZlLCBvdGhlcndpc2UgYGZhbHNlYC5cclxuICAgICAqL1xyXG4gICAgaXNBbGl2ZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ocCA+IDA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gJy4vZW50aXR5VHlwZXMnO1xyXG5pbXBvcnQgeyBCYXNlRW50aXR5IH0gZnJvbSAnLi9iYXNlRW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVlbiBleHRlbmRzIEJhc2VFbnRpdHkge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoMTAwLCBFbnRpdHlUeXBlLlFVRUVOKTtcclxuICAgIH1cclxuXHJcbiAgICB0YWtlRGFtYWdlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaHAgLT0gODtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnLi9lbnRpdHlUeXBlcyc7XHJcbmltcG9ydCB7IEJhc2VFbnRpdHkgfSBmcm9tICcuL2Jhc2VFbnRpdHknO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmtlciBleHRlbmRzIEJhc2VFbnRpdHkge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoNzUsIEVudGl0eVR5cGUuV09SS0VSKTtcclxuICAgIH1cclxuXHJcbiAgICB0YWtlRGFtYWdlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaHAgLT0gMTA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgR2FtZU1lbSB9IGZyb20gXCIuLi9kYXRhL21lbVwiO1xyXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi4vbW9kZWwvZW50aXR5SW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnLi4vbW9kZWwvZW50aXR5VHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIHVzZXIgaW50ZXJmYWNlIGZvciBkaXNwbGF5aW5nIGJlZSBpbmZvcm1hdGlvbi5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBCZWVVSSB7XHJcbiAgICBwcml2YXRlIGJlZTogRW50aXR5O1xyXG4gICAgcHJpdmF0ZSB1aTogVUk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJlZVVJLlxyXG4gICAgICogQHBhcmFtIHtFbnRpdHl9IGJlZSAtIFRoZSBiZWUgZW50aXR5LlxyXG4gICAgICogQHBhcmFtIHtVSX0gdWkgLSBUaGUgdXNlciBpbnRlcmZhY2UuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGJlZTogRW50aXR5LCB1aTogVUkpIHtcclxuICAgICAgICB0aGlzLmJlZSA9IGJlZTtcclxuICAgICAgICB0aGlzLnVpID0gdWk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZXMgdGhlIEhUTUwgZWxlbWVudCBmb3IgZGlzcGxheWluZyBiZWUgaW5mb3JtYXRpb24uXHJcbiAgICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IFRoZSBIVE1MIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBiZWUuXHJcbiAgICAgKi9cclxuICAgIGRpc3BsYXkoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbnN0IGgySGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgICAgICBsZXQgYnR5cGUgPSAnJztcclxuXHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmJlZS5nZXRUeXBlKCkpIHtcclxuICAgICAgICAgICAgY2FzZSBFbnRpdHlUeXBlLkRST05FOlxyXG4gICAgICAgICAgICAgICAgYnR5cGUgPSAnRFJPTkUnO1xyXG4gICAgICAgICAgICAgICAgaDJIZWFkZXIuaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9XCJkcm9uZWltZ1wiIHNyYz1cImRyb25lLnBuZ1wiIGFsdD1cIkRyb25lXCI+YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVudGl0eVR5cGUuUVVFRU46XHJcbiAgICAgICAgICAgICAgICBidHlwZSA9ICdRVUVFTic7XHJcbiAgICAgICAgICAgICAgICBoMkhlYWRlci5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cInF1ZWVuaW1nXCIgc3JjPVwicXVlZW4ucG5nXCIgYWx0PVwiUXVlZW5cIj5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRW50aXR5VHlwZS5XT1JLRVI6XHJcbiAgICAgICAgICAgICAgICBidHlwZSA9ICdXT1JLRVInO1xyXG4gICAgICAgICAgICAgICAgaDJIZWFkZXIuaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9XCJ3b3JrZXJpbWdcIiBzcmM9XCJ3b3JrZXIucG5nXCIgYWx0PVwiV29ya2VyXCI+YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIEVudGl0eSBUeXBlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bHQuYXBwZW5kQ2hpbGQoaDJIZWFkZXIpO1xyXG4gICAgICAgIHJlc3VsdC5jbGFzc05hbWUgPSBidHlwZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5iZWUuaXNBbGl2ZSgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhwSW5kaWNhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICBocEluZGljYXRvci5pbm5lckhUTUwgPSAnSFA6ICcgKyB0aGlzLmJlZS5nZXRIcCgpO1xyXG4gICAgICAgICAgICByZXN1bHQuYXBwZW5kQ2hpbGQoaHBJbmRpY2F0b3IpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJlZVN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICAgICAgYmVlU3RhdHVzLmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPVwiZGVhZFwiIHNyYz1cImRlYWQucG5nXCIgYWx0PVwiZGVhZFwiPjxwPkRFQUQ8L3A+YDtcclxuICAgICAgICAgICAgcmVzdWx0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICByZXN1bHQuYXBwZW5kQ2hpbGQoYmVlU3RhdHVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBtYWluIHVzZXIgaW50ZXJmYWNlIGZvciB0aGUgZ2FtZS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBVSSB7XHJcbiAgICBnYW1lTWVtOiBHYW1lTWVtO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBVSS5cclxuICAgICAqIEBwYXJhbSB7R2FtZU1lbX0gZ2FtZU1lbSAtIFRoZSBnYW1lIG1lbW9yeS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZU1lbTogR2FtZU1lbSkge1xyXG4gICAgICAgIHRoaXMuZ2FtZU1lbSA9IGdhbWVNZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZXMgdGhlIFVJIGVsZW1lbnRzIGZvciB0aGUgZ2FtZSBib2FyZC5cclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxIVE1MRWxlbWVudD59IEFuIGFycmF5IG9mIEhUTUwgZWxlbWVudHMgcmVwcmVzZW50aW5nIGJlZXMuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2VuZXJhdGVCb2FyZFVJKCk6IEFycmF5PEhUTUxFbGVtZW50PiB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudHM6IEFycmF5PEhUTUxFbGVtZW50PiA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGJlZSBvZiB0aGlzLmdhbWVNZW0uZ2V0Qm9hcmQoKS5hbGxCZWVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJlZVVJID0gbmV3IEJlZVVJKGJlZSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goYmVlVUkuZGlzcGxheSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHRvdGFsIEhQIGRpc3BsYXkgaW4gdGhlIFVJLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsSHAgLSBUaGUgdG90YWwgSFAgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlVG90YWxIcERpc3BsYXkodG90YWxIcDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdG90YWxIcERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGl2ZWhlYWx0aCcpO1xyXG4gICAgICAgIGlmICh0b3RhbEhwRGlzcGxheSkge1xyXG4gICAgICAgICAgICB0b3RhbEhwRGlzcGxheS50ZXh0Q29udGVudCA9IGBUb3RhbCBoaXZlIEhQOiAke3RvdGFsSHB9YDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZyZXNoZXMgdGhlIGdhbWUgYm9hcmQgVUkuXHJcbiAgICAgKi9cclxuICAgIHJlZnJlc2hCb2FyZCgpIHtcclxuICAgICAgICBjb25zdCBkcm9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcm9uZScpO1xyXG4gICAgICAgIGNvbnN0IHdvcmtlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JrZXInKTtcclxuICAgICAgICBjb25zdCBxdWVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWVlbicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENsZWFyIHRoZSBjb250YWluZXJzIGJlZm9yZSBhZGRpbmcgbmV3IGVsZW1lbnRzXHJcbiAgICAgICAgZHJvbmUuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgd29ya2VyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHF1ZWVuLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICAvLyBHZW5lcmF0ZSBhbmQgZGlzcGxheSBVSSBlbGVtZW50cyBmb3IgYmVlc1xyXG4gICAgICAgIGNvbnN0IGJvYXJkVUkgPSB0aGlzLmdlbmVyYXRlQm9hcmRVSSgpO1xyXG5cclxuICAgICAgICBib2FyZFVJLmZvckVhY2goYmVlVUkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYmVlVUkuY2xhc3NOYW1lID09PSAnd29ya2VyJykge1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLmFwcGVuZENoaWxkKGJlZVVJKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChiZWVVSS5jbGFzc05hbWUgPT09ICdkcm9uZScpIHtcclxuICAgICAgICAgICAgICAgIGRyb25lLmFwcGVuZENoaWxkKGJlZVVJKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHF1ZWVuLmFwcGVuZENoaWxkKGJlZVVJKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBTYXZlIGdhbWUgc3RhdGUgYW5kIHVwZGF0ZSB0b3RhbCBIUCBkaXNwbGF5XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZU1lbS5ib2FyZC5hbGxCZWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVNZW0uc2F2ZUdhbWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRvdGFsSHAgPSB0aGlzLmdhbWVNZW0uYm9hcmQuYWxsQmVlc1xyXG4gICAgICAgICAgICAuZmlsdGVyKChiZWU6IEVudGl0eSkgPT4gYmVlLmlzQWxpdmUoKSlcclxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjOiBudW1iZXIsIGVudGl0eTogRW50aXR5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjICsgZW50aXR5LmdldEhwKCk7XHJcbiAgICAgICAgICAgIH0sIDApO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVRvdGFsSHBEaXNwbGF5KHRvdGFsSHApO1xyXG4gICAgfVxyXG59XHJcbiIsIi8vIGhpdCBCdXR0b24gRXZlbnQgSGFuZGxlclxyXG5pbXBvcnQgeyBHYW1lTWVtIH0gZnJvbSAnLi4vZGF0YS9tZW0nO1xyXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICcuLi9tb2RlbC9lbnRpdHlJbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gJy4uL21vZGVsL2VudGl0eVR5cGVzJztcclxuaW1wb3J0IHsgVUkgfSBmcm9tICcuLi91aS91aSc7XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlSGl0QnV0dG9uQ2xpY2sgPSAoZ2FtZTogR2FtZU1lbSwgdWlHcmFwaGljczogVUkpID0+IHtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGl0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBhbGl2ZUJlZXMgPSBnYW1lLmJvYXJkLmFsbEJlZXMuZmlsdGVyKChiZWU6IEVudGl0eSkgPT4gYmVlLmlzQWxpdmUoKSk7XHJcbiAgICBjb25zdCBxdWVlbiA9IGFsaXZlQmVlcy5zb21lKGJlZSA9PiBiZWUuZ2V0VHlwZSgpID09PSBFbnRpdHlUeXBlLlFVRUVOKVxyXG4gICAgY29uc3QgYmVlcyA9IGFsaXZlQmVlcy5zb21lKGJlZSA9PiBiZWUuZ2V0VHlwZSgpICE9PSBFbnRpdHlUeXBlLlFVRUVOKVxyXG5cclxuICAgIGlmIChiZWVzICYmIHF1ZWVuKSB7XHJcbiAgICAgIGNvbnN0IHJhbmRvbUJlZSA9IGFsaXZlQmVlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbGl2ZUJlZXMubGVuZ3RoKV07XHJcbiAgICAgIHJhbmRvbUJlZS50YWtlRGFtYWdlKCk7XHJcbiAgICAgIHVpR3JhcGhpY3MucmVmcmVzaEJvYXJkKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBnYW1lLnJlc2V0R2FtZSgpO1xyXG4gICAgICBhbGVydCgnR2FtZSBpcyBvdmVyJyk7XHJcbiAgICAgIHVpR3JhcGhpY3MucmVmcmVzaEJvYXJkKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07IiwiLy8gcmVzZXRCdXR0b24gRXZlbnQgSGFuZGxlclxyXG5pbXBvcnQgeyBHYW1lTWVtIH0gZnJvbSAnLi4vZGF0YS9tZW0nO1xyXG5pbXBvcnQgeyBVSSB9IGZyb20gJy4uL3VpL3VpJztcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVSZXNldEJ1dHRvbkNsaWNrID0gKGdhbWU6IEdhbWVNZW0sIHVpR3JhcGhpY3M6IFVJKSA9PiB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpO1xyXG4gICAgdWlHcmFwaGljcy5yZWZyZXNoQm9hcmQoKTtcclxuICB9KTtcclxufTsiLCIvLyBhZGRCZWUgQnV0dG9uIEV2ZW50SGFuZGxlclxyXG5pbXBvcnQgeyBHYW1lTWVtIH0gZnJvbSAnLi4vZGF0YS9tZW0nO1xyXG5pbXBvcnQgeyBVSSB9IGZyb20gJy4uL3VpL3VpJztcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVBZGRCZWVCdXR0b25DbGljayA9IChnYW1lOiBHYW1lTWVtLCB1aUdyYXBoaWNzOiBVSSwgYmVlVHlwZTogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3QgYWRkQnV0dG9uSWQgPSBiZWVUeXBlID09PSBcIndvcmtlclwiID8gJ2FkZHdvcmtlcicgOiAnYWRkZHJvbmUnO1xyXG5cclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhZGRCdXR0b25JZCkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoYmVlVHlwZSA9PT0gXCJ3b3JrZXJcIikge1xyXG4gICAgICB1aUdyYXBoaWNzLmdhbWVNZW0uYm9hcmQuYWRkV29ya2VyQmVlKCk7XHJcbiAgICB9IGVsc2UgaWYgKGJlZVR5cGUgPT09IFwiZHJvbmVcIikge1xyXG4gICAgICB1aUdyYXBoaWNzLmdhbWVNZW0uYm9hcmQuYWRkRHJvbmVCZWUoKTtcclxuICAgIH1cclxuICAgIHVpR3JhcGhpY3MucmVmcmVzaEJvYXJkKCk7XHJcbiAgfSk7XHJcbn07XHJcbiIsIi8vSW5wdXQgcGxheWVyJ3MgbmFtZSBldmVudCBIYW5kbGVyXHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlTmFtZUlucHV0ID0gKGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCwgZWRpdEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQsIHN1Ym1pdEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQsIG91dHB1dERpdjogSFRNTERpdkVsZW1lbnQpID0+IHtcclxuICAgIGlmIChpbnB1dEVsZW1lbnQgJiYgZWRpdEJ1dHRvbiAmJiBzdWJtaXRCdXR0b24gJiYgb3V0cHV0RGl2KSB7XHJcbiAgICAgICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVkaXRCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJOYW1lID0gaW5wdXRFbGVtZW50LnZhbHVlO1xyXG4gICAgICAgICAgICBvdXRwdXREaXYudGV4dENvbnRlbnQgPSBgUGxheWVyOiAke3BsYXllck5hbWV9YDtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGVkaXRCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgR2FtZU1lbSB9IGZyb20gXCIuL2RhdGEvbWVtXCI7XHJcbmltcG9ydCB7IEJvYXJkIH0gZnJvbSBcIi4vbW9kZWwvYm9hcmRcIjtcclxuaW1wb3J0IHsgVUkgfSBmcm9tIFwiLi91aS91aVwiO1xyXG5pbXBvcnQgeyBoYW5kbGVIaXRCdXR0b25DbGljayB9IGZyb20gXCIuL2V2ZW50aGFuZGxlcnMvaGl0QnV0dG9uRXZlbnRIYW5kbGVyXCI7XHJcbmltcG9ydCB7IGhhbmRsZVJlc2V0QnV0dG9uQ2xpY2sgfSBmcm9tIFwiLi9ldmVudGhhbmRsZXJzL3Jlc2V0QnV0dG9uRXZlbnRIYW5kbGVyXCJcclxuaW1wb3J0IHsgaGFuZGxlQWRkQmVlQnV0dG9uQ2xpY2sgfSBmcm9tIFwiLi9ldmVudGhhbmRsZXJzL2FkZEJlZUJ1dHRvbkV2ZW50SGFuZGxlclwiXHJcbmltcG9ydCB7IGhhbmRsZU5hbWVJbnB1dCB9IGZyb20gXCIuL2V2ZW50aGFuZGxlcnMvaW5wdXRQbGF5ZXJzTmFtZUV2ZW50SGFuZGxlclwiO1xyXG5cclxuLy8gSW5pdGlhbGl6ZSB0aGUgZ2FtZVxyXG5sZXQgZ2FtZTogR2FtZU1lbTtcclxuXHJcbmlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnR0FNRV9TVEFURScpKSB7XHJcbiAgICBnYW1lID0gbmV3IEdhbWVNZW0oKTtcclxuICAgIGdhbWUubG9hZEdhbWUoKTtcclxufSBlbHNlIHtcclxuICAgIGdhbWUgPSBuZXcgR2FtZU1lbSgpO1xyXG4gICAgY29uc3QgYm9hcmQ6IEJvYXJkID0gbmV3IEJvYXJkKCk7XHJcbiAgICBib2FyZC5pbml0RGVmYXVsdCgpO1xyXG4gICAgZ2FtZS5zZXRCb2FyZChib2FyZCk7XHJcbn1cclxuXHJcbmNvbnN0IHVpR3JhcGhpY3M6IFVJID0gbmV3IFVJKGdhbWUpO1xyXG51aUdyYXBoaWNzLnJlZnJlc2hCb2FyZCgpO1xyXG5cclxuLy8gSW5pdGlhbGl6ZSBldmVudCBoYW5kbGVyc1xyXG5oYW5kbGVIaXRCdXR0b25DbGljayhnYW1lLCB1aUdyYXBoaWNzKTtcclxuaGFuZGxlUmVzZXRCdXR0b25DbGljayhnYW1lLCB1aUdyYXBoaWNzKTtcclxuaGFuZGxlQWRkQmVlQnV0dG9uQ2xpY2soZ2FtZSwgdWlHcmFwaGljcywgJ2Ryb25lJyk7XHJcbmhhbmRsZUFkZEJlZUJ1dHRvbkNsaWNrKGdhbWUsIHVpR3JhcGhpY3MsICd3b3JrZXInKTtcclxuXHJcbi8vIElucHV0IHBsYXllcidzIG5hbWVcclxuY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWVJbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbmNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdEJ1dHRvbicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG5jb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0QnV0dG9uJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbmNvbnN0IG91dHB1dERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXQnKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuXHJcbmhhbmRsZU5hbWVJbnB1dChuYW1lSW5wdXQsIGVkaXRCdXR0b24sIHN1Ym1pdEJ1dHRvbiwgb3V0cHV0RGl2KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9