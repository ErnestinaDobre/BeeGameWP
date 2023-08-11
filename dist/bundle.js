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
            alert('Humans have killed all bees. Game over');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxTQUFTLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JlZS1nYW1lLy4vc3JjL2RhdGEvbWVtLnRzIiwid2VicGFjazovL2JlZS1nYW1lLy4vc3JjL21vZGVsL2JvYXJkLnRzIiwid2VicGFjazovL2JlZS1nYW1lLy4vc3JjL21vZGVsL2VudGl0eVR5cGVzLnRzIiwid2VicGFjazovL2JlZS1nYW1lLy4vc3JjL21vZGVsL2VudGl0eUZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvLi9zcmMvbW9kZWwvZHJvbmUudHMiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvLi9zcmMvbW9kZWwvYmFzZUVudGl0eS50cyIsIndlYnBhY2s6Ly9iZWUtZ2FtZS8uL3NyYy9tb2RlbC9xdWVlbi50cyIsIndlYnBhY2s6Ly9iZWUtZ2FtZS8uL3NyYy9tb2RlbC93b3JrZXIudHMiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvLi9zcmMvdWkvdWkudHMiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvLi9zcmMvZXZlbnRoYW5kbGVycy9oaXRCdXR0b25FdmVudEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvLi9zcmMvZXZlbnRoYW5kbGVycy9yZXNldEJ1dHRvbkV2ZW50SGFuZGxlci50cyIsIndlYnBhY2s6Ly9iZWUtZ2FtZS8uL3NyYy9ldmVudGhhbmRsZXJzL2FkZEJlZUJ1dHRvbkV2ZW50SGFuZGxlci50cyIsIndlYnBhY2s6Ly9iZWUtZ2FtZS8uL3NyYy9ldmVudGhhbmRsZXJzL2lucHV0UGxheWVyc05hbWVFdmVudEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JlZS1nYW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iZWUtZ2FtZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuLi9tb2RlbC9ib2FyZFwiO1xyXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi4vbW9kZWwvZW50aXR5SW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnLi4vbW9kZWwvZW50aXR5VHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIGdhbWUgbWVtb3J5IGFuZCBpdHMgc3RhdGUuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2FtZU1lbSB7XHJcbiAgICBib2FyZDogQm9hcmQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnYW1lIGJvYXJkLlxyXG4gICAgICogQHBhcmFtIHtCb2FyZH0gYm9hcmQgLSBUaGUgZ2FtZSBib2FyZC5cclxuICAgICAqL1xyXG4gICAgc2V0Qm9hcmQoYm9hcmQ6IEJvYXJkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZ2FtZSBib2FyZC5cclxuICAgICAqIEByZXR1cm5zIHtCb2FyZH0gVGhlIGdhbWUgYm9hcmQuXHJcbiAgICAgKi9cclxuICAgIGdldEJvYXJkKCk6IEJvYXJkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ib2FyZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgZ2FtZSBpcyBvdmVyIChRdWVlbiBpcyBkZWFkIG9yIGFsbCB0aGUgb3RoZXIgYmVlcyBhcmUgZGVhZCkuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciB0aGUgZ2FtZSBpcyBvdmVyIG9yIG5vdC5cclxuICAgICAqL1xyXG4gICAgaXNHYW1lT3ZlcigpOiBib29sZWFuIHtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBxdWVlbkJlZSA9IHRoaXMuYm9hcmQuYWxsQmVlcy5maWx0ZXIoKGJlZTogRW50aXR5KSA9PiBiZWUuZ2V0VHlwZSgpID09PSBFbnRpdHlUeXBlLlFVRUVOKTtcclxuICAgICAgICBjb25zdCByZXN0T2ZCZWVzID0gdGhpcy5ib2FyZC5hbGxCZWVzLmZpbmQoKGJlZTogRW50aXR5KSA9PiBiZWUuZ2V0VHlwZSgpICE9PSBFbnRpdHlUeXBlLlFVRUVOICYmIGJlZS5nZXRUeXBlKCkgIT09IHVuZGVmaW5lZCk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICgocXVlZW5CZWUgJiYgcXVlZW5CZWUuc29tZShxdWVlbiA9PiBxdWVlbi5nZXRIcCgpIDw9IDApKSB8fCAhcmVzdE9mQmVlcy5pc0FsaXZlKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuIFxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTYXZlcyB0aGUgY3VycmVudCBnYW1lIHN0YXRlIHRvIGxvY2FsIHN0b3JhZ2UuXHJcbiAgICAgKi9cclxuICAgIHNhdmVHYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmJvYXJkLmFsbEJlZXMuc29tZSgoYmVlOiBFbnRpdHkpID0+IGJlZS5pc0FsaXZlKCkpKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdHQU1FX1NUQVRFJywgSlNPTi5zdHJpbmdpZnkodGhpcy5ib2FyZCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBnYW1lIHN0YXRlIGZyb20gbG9jYWwgc3RvcmFnZS5cclxuICAgICAqL1xyXG4gICAgbG9hZEdhbWUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2F2ZWRCb2FyZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0dBTUVfU1RBVEUnKSk7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuaW5pdEZyb21Mb2FkKHNhdmVkQm9hcmQuX2FsbEJlZXMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0cyB0aGUgZ2FtZSBzdGF0ZS5cclxuICAgICAqL1xyXG4gICAgcmVzZXRHYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdHQU1FX1NUQVRFJyk7XHJcblxyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcclxuICAgICAgICB0aGlzLmJvYXJkLmluaXREZWZhdWx0KCk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0dBTUVfU1RBVEUnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmJvYXJkKSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gJy4vZW50aXR5VHlwZXMnO1xyXG5pbXBvcnQgeyBFbnRpdHlGYWN0b3J5IH0gZnJvbSAnLi9lbnRpdHlGYWN0b3J5JztcclxuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnLi9lbnRpdHlJbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBnYW1lIGJvYXJkIGNvbnRhaW5pbmcgYmVlIGVudGl0aWVzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJvYXJkIHtcclxuICAgIC8qKlxyXG4gICAgICogQW4gYXJyYXkgY29udGFpbmluZyBhbGwgYmVlIGVudGl0aWVzIG9uIHRoZSBib2FyZC5cclxuICAgICAqL1xyXG4gICAgX2FsbEJlZXM6IEFycmF5PEVudGl0eT4gPSBuZXcgQXJyYXk8RW50aXR5PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGdhbWUgYm9hcmQgZnJvbSBhIHNhdmVkIHN0YXRlLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gYm9hcmRKU09OIC0gVGhlIHNhdmVkIHN0YXRlIG9mIHRoZSBnYW1lIGJvYXJkLlxyXG4gICAgICovXHJcbiAgICBpbml0RnJvbUxvYWQoYm9hcmRKU09OOiBhbnlbXSkge1xyXG4gICAgICAgIGZvciAobGV0IGJlZSBvZiBib2FyZEpTT04pIHtcclxuICAgICAgICAgICAgbGV0IGJlZU9LOiBFbnRpdHkgPSBFbnRpdHlGYWN0b3J5LmNyZWF0ZUVudGl0eShiZWUuZW50aXR5VHlwZSk7XHJcbiAgICAgICAgICAgIGJlZU9LLnNldEhwKGJlZS5ocCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FsbEJlZXMucHVzaChiZWVPSyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGdhbWUgYm9hcmQgd2l0aCBkZWZhdWx0IGJlZSBlbnRpdGllcy5cclxuICAgICAqL1xyXG4gICAgaW5pdERlZmF1bHQoKSB7XHJcbiAgICAgICAgdGhpcy5hZGRFbnRpdGllcyhFbnRpdHlUeXBlLlFVRUVOKTtcclxuICAgICAgICB0aGlzLmFkZEVudGl0aWVzT2ZUeXBlKEVudGl0eVR5cGUuV09SS0VSLCA1KTtcclxuICAgICAgICB0aGlzLmFkZEVudGl0aWVzT2ZUeXBlKEVudGl0eVR5cGUuRFJPTkUsIDgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEVudGl0aWVzKC4uLmVudGl0eVR5cGVzOiBFbnRpdHlUeXBlW10pIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGV0IG9mIGVudGl0eVR5cGVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRW50aXR5KGV0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgc3BlY2lmaWVkIG51bWJlciBvZiBiZWUgZW50aXRpZXMgb2YgYSBnaXZlbiB0eXBlIHRvIHRoZSBnYW1lIGJvYXJkLlxyXG4gICAgICogQHBhcmFtIHtFbnRpdHlUeXBlfSBlbnRpdHlUeXBlIC0gVGhlIHR5cGUgb2YgYmVlIGVudGl0eSB0byBhZGQuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyT2ZFbnRpdGllcyAtIFRoZSBudW1iZXIgb2YgZW50aXRpZXMgdG8gYWRkLlxyXG4gICAgICovXHJcbiAgICBhZGRFbnRpdGllc09mVHlwZShlbnRpdHlUeXBlOiBFbnRpdHlUeXBlLCBudW1iZXJPZkVudGl0aWVzOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mRW50aXRpZXM7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVudGl0eShlbnRpdHlUeXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgYmVlIGVudGl0eSBvZiBhIHNwZWNpZmllZCB0eXBlIHRvIHRoZSBnYW1lIGJvYXJkLlxyXG4gICAgICogQHBhcmFtIHtFbnRpdHlUeXBlfSBlbnRpdHlUeXBlIC0gVGhlIHR5cGUgb2YgYmVlIGVudGl0eSB0byBhZGQuXHJcbiAgICAgKi9cclxuICAgIGFkZEVudGl0eShlbnRpdHlUeXBlOiBFbnRpdHlUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5fYWxsQmVlcy5wdXNoKEVudGl0eUZhY3RvcnkuY3JlYXRlRW50aXR5KGVudGl0eVR5cGUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSB3b3JrZXIgYmVlIGVudGl0eSB0byB0aGUgZ2FtZSBib2FyZC5cclxuICAgICAqL1xyXG4gICAgYWRkV29ya2VyQmVlKCkge1xyXG4gICAgICAgIHRoaXMuYWRkRW50aXRpZXNPZlR5cGUoRW50aXR5VHlwZS5XT1JLRVIsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGRyb25lIGJlZSBlbnRpdHkgdG8gdGhlIGdhbWUgYm9hcmQuXHJcbiAgICAgKi9cclxuICAgIGFkZERyb25lQmVlKCkge1xyXG4gICAgICAgIHRoaXMuYWRkRW50aXRpZXNPZlR5cGUoRW50aXR5VHlwZS5EUk9ORSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIGJlZSBlbnRpdGllcyBvbiB0aGUgYm9hcmQuXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8RW50aXR5Pn0gQW4gYXJyYXkgb2YgYmVlIGVudGl0aWVzIG9uIHRoZSBib2FyZC5cclxuICAgICAqL1xyXG4gICAgZ2V0IGFsbEJlZXMoKTogQXJyYXk8RW50aXR5PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FsbEJlZXM7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGVudW0gRW50aXR5VHlwZSB7XHJcbiAgICBRVUVFTixcclxuICAgIFdPUktFUixcclxuICAgIERST05FXHJcbn0iLCJpbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnLi9lbnRpdHlUeXBlcyc7XHJcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJy4vZW50aXR5SW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IERyb25lIH0gZnJvbSAnLi9kcm9uZSc7XHJcbmltcG9ydCB7IFF1ZWVuIH0gZnJvbSAnLi9xdWVlbic7XHJcbmltcG9ydCB7IFdvcmtlciB9IGZyb20gJy4vd29ya2VyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBFbnRpdHlGYWN0b3J5IHtcclxuICAgIHN0YXRpYyBjcmVhdGVFbnRpdHkoZW50aXR5VHlwZTogRW50aXR5VHlwZSk6IEVudGl0eSB7XHJcbiAgICAgICAgc3dpdGNoIChlbnRpdHlUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgRW50aXR5VHlwZS5EUk9ORTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRHJvbmUoKTtcclxuICAgICAgICAgICAgY2FzZSBFbnRpdHlUeXBlLlFVRUVOOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBRdWVlbigpO1xyXG4gICAgICAgICAgICBjYXNlIEVudGl0eVR5cGUuV09SS0VSOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JrZXIoKTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbnRpdHkgdHlwZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnLi9lbnRpdHlUeXBlcyc7XHJcbmltcG9ydCB7IEJhc2VFbnRpdHkgfSBmcm9tICcuL2Jhc2VFbnRpdHknO1xyXG5cclxuZXhwb3J0IGNsYXNzIERyb25lIGV4dGVuZHMgQmFzZUVudGl0eSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcig1MCwgRW50aXR5VHlwZS5EUk9ORSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGFrZURhbWFnZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhwIC09IDEyO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEVudGl0eVR5cGUgfSBmcm9tICcuL2VudGl0eVR5cGVzJztcclxuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnLi9lbnRpdHlJbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBiYXNlIGVudGl0eSBjbGFzcyBmb3IgYmVlcy5cclxuICogQGltcGxlbWVudHMgRW50aXR5XHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUVudGl0eSBpbXBsZW1lbnRzIEVudGl0eSB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBoaXQgcG9pbnRzIChIUCkgb2YgdGhlIGJlZSBlbnRpdHkuXHJcbiAgICAgKi9cclxuICAgIGhwOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdHlwZSBvZiB0aGUgYmVlIGVudGl0eS5cclxuICAgICAqL1xyXG4gICAgZW50aXR5VHlwZTogRW50aXR5VHlwZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmFzZUVudGl0eS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBocCAtIFRoZSBpbml0aWFsIGhpdCBwb2ludHMgKEhQKSBvZiB0aGUgYmVlLlxyXG4gICAgICogQHBhcmFtIHtFbnRpdHlUeXBlfSBlbnRpdHlUeXBlIC0gVGhlIHR5cGUgb2YgdGhlIGJlZSBlbnRpdHkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGhwOiBudW1iZXIsIGVudGl0eVR5cGU6IEVudGl0eVR5cGUpIHtcclxuICAgICAgICB0aGlzLmhwID0gaHA7XHJcbiAgICAgICAgdGhpcy5lbnRpdHlUeXBlID0gZW50aXR5VHlwZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHR5cGUgb2YgdGhlIGJlZSBlbnRpdHkuXHJcbiAgICAgKiBAcmV0dXJucyB7RW50aXR5VHlwZX0gVGhlIHR5cGUgb2YgdGhlIGJlZSBlbnRpdHkuXHJcbiAgICAgKi9cclxuICAgIGdldFR5cGUoKTogRW50aXR5VHlwZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50aXR5VHlwZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGhpdCBwb2ludHMgKEhQKSBvZiB0aGUgYmVlIGVudGl0eS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBocCAtIFRoZSBuZXcgaGl0IHBvaW50cyAoSFApIHZhbHVlLlxyXG4gICAgICovXHJcbiAgICBzZXRIcChocDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ocCA9IGhwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3VycmVudCBoaXQgcG9pbnRzIChIUCkgb2YgdGhlIGJlZSBlbnRpdHkuXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgY3VycmVudCBoaXQgcG9pbnRzIChIUCkgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGdldEhwKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBYnN0cmFjdCBtZXRob2QgZm9yIGNhdXNpbmcgZGFtYWdlIHRvIHRoZSBiZWUgZW50aXR5LlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCB0YWtlRGFtYWdlKCk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGJlZSBlbnRpdHkgaXMgYWxpdmUgYmFzZWQgb24gaXRzIGhpdCBwb2ludHMgKEhQKS5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIGJlZSBlbnRpdHkgaXMgYWxpdmUsIG90aGVyd2lzZSBgZmFsc2VgLlxyXG4gICAgICovXHJcbiAgICBpc0FsaXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhwID4gMDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnLi9lbnRpdHlUeXBlcyc7XHJcbmltcG9ydCB7IEJhc2VFbnRpdHkgfSBmcm9tICcuL2Jhc2VFbnRpdHknO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZWVuIGV4dGVuZHMgQmFzZUVudGl0eSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigxMDAsIEVudGl0eVR5cGUuUVVFRU4pO1xyXG4gICAgfVxyXG5cclxuICAgIHRha2VEYW1hZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ocCAtPSA4O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEVudGl0eVR5cGUgfSBmcm9tICcuL2VudGl0eVR5cGVzJztcclxuaW1wb3J0IHsgQmFzZUVudGl0eSB9IGZyb20gJy4vYmFzZUVudGl0eSc7XHJcblxyXG5leHBvcnQgY2xhc3MgV29ya2VyIGV4dGVuZHMgQmFzZUVudGl0eSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcig3NSwgRW50aXR5VHlwZS5XT1JLRVIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRha2VEYW1hZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ocCAtPSAxMDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBHYW1lTWVtIH0gZnJvbSBcIi4uL2RhdGEvbWVtXCI7XHJcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuLi9tb2RlbC9lbnRpdHlJbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB7IEVudGl0eVR5cGUgfSBmcm9tICcuLi9tb2RlbC9lbnRpdHlUeXBlcyc7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyB0aGUgdXNlciBpbnRlcmZhY2UgZm9yIGRpc3BsYXlpbmcgYmVlIGluZm9ybWF0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJlZVVJIHtcclxuICAgIHByaXZhdGUgYmVlOiBFbnRpdHk7XHJcbiAgICBwcml2YXRlIHVpOiBVSTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmVlVUkuXHJcbiAgICAgKiBAcGFyYW0ge0VudGl0eX0gYmVlIC0gVGhlIGJlZSBlbnRpdHkuXHJcbiAgICAgKiBAcGFyYW0ge1VJfSB1aSAtIFRoZSB1c2VyIGludGVyZmFjZS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYmVlOiBFbnRpdHksIHVpOiBVSSkge1xyXG4gICAgICAgIHRoaXMuYmVlID0gYmVlO1xyXG4gICAgICAgIHRoaXMudWkgPSB1aTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlcyB0aGUgSFRNTCBlbGVtZW50IGZvciBkaXNwbGF5aW5nIGJlZSBpbmZvcm1hdGlvbi5cclxuICAgICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gVGhlIEhUTUwgZWxlbWVudCByZXByZXNlbnRpbmcgdGhlIGJlZS5cclxuICAgICAqL1xyXG4gICAgZGlzcGxheSgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29uc3QgaDJIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xyXG4gICAgICAgIGxldCBidHlwZSA9ICcnO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHRoaXMuYmVlLmdldFR5cGUoKSkge1xyXG4gICAgICAgICAgICBjYXNlIEVudGl0eVR5cGUuRFJPTkU6XHJcbiAgICAgICAgICAgICAgICBidHlwZSA9ICdEUk9ORSc7XHJcbiAgICAgICAgICAgICAgICBoMkhlYWRlci5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cImRyb25laW1nXCIgc3JjPVwiZHJvbmUucG5nXCIgYWx0PVwiRHJvbmVcIj5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRW50aXR5VHlwZS5RVUVFTjpcclxuICAgICAgICAgICAgICAgIGJ0eXBlID0gJ1FVRUVOJztcclxuICAgICAgICAgICAgICAgIGgySGVhZGVyLmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPVwicXVlZW5pbWdcIiBzcmM9XCJxdWVlbi5wbmdcIiBhbHQ9XCJRdWVlblwiPmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBFbnRpdHlUeXBlLldPUktFUjpcclxuICAgICAgICAgICAgICAgIGJ0eXBlID0gJ1dPUktFUic7XHJcbiAgICAgICAgICAgICAgICBoMkhlYWRlci5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cIndvcmtlcmltZ1wiIHNyYz1cIndvcmtlci5wbmdcIiBhbHQ9XCJXb3JrZXJcIj5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gRW50aXR5IFR5cGUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc3VsdC5hcHBlbmRDaGlsZChoMkhlYWRlcik7XHJcbiAgICAgICAgcmVzdWx0LmNsYXNzTmFtZSA9IGJ0eXBlLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmJlZS5pc0FsaXZlKCkpIHtcclxuICAgICAgICAgICAgY29uc3QgaHBJbmRpY2F0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIGhwSW5kaWNhdG9yLmlubmVySFRNTCA9ICdIUDogJyArIHRoaXMuYmVlLmdldEhwKCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5hcHBlbmRDaGlsZChocEluZGljYXRvcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgYmVlU3RhdHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgICAgICBiZWVTdGF0dXMuaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9XCJkZWFkXCIgc3JjPVwiZGVhZC5wbmdcIiBhbHQ9XCJkZWFkXCI+PHA+REVBRDwvcD5gO1xyXG4gICAgICAgICAgICByZXN1bHQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgIHJlc3VsdC5hcHBlbmRDaGlsZChiZWVTdGF0dXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIG1haW4gdXNlciBpbnRlcmZhY2UgZm9yIHRoZSBnYW1lLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFVJIHtcclxuICAgIGdhbWVNZW06IEdhbWVNZW07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFVJLlxyXG4gICAgICogQHBhcmFtIHtHYW1lTWVtfSBnYW1lTWVtIC0gVGhlIGdhbWUgbWVtb3J5LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lTWVtOiBHYW1lTWVtKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lTWVtID0gZ2FtZU1lbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlcyB0aGUgVUkgZWxlbWVudHMgZm9yIHRoZSBnYW1lIGJvYXJkLlxyXG4gICAgICogQHJldHVybnMge0FycmF5PEhUTUxFbGVtZW50Pn0gQW4gYXJyYXkgb2YgSFRNTCBlbGVtZW50cyByZXByZXNlbnRpbmcgYmVlcy5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZUJvYXJkVUkoKTogQXJyYXk8SFRNTEVsZW1lbnQ+IHtcclxuICAgICAgICBjb25zdCBlbGVtZW50czogQXJyYXk8SFRNTEVsZW1lbnQ+ID0gW107XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgYmVlIG9mIHRoaXMuZ2FtZU1lbS5nZXRCb2FyZCgpLmFsbEJlZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgYmVlVUkgPSBuZXcgQmVlVUkoYmVlLCB0aGlzKTtcclxuICAgICAgICAgICAgZWxlbWVudHMucHVzaChiZWVVSS5kaXNwbGF5KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdG90YWwgSFAgZGlzcGxheSBpbiB0aGUgVUkuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdG90YWxIcCAtIFRoZSB0b3RhbCBIUCB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVUb3RhbEhwRGlzcGxheSh0b3RhbEhwOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB0b3RhbEhwRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaXZlaGVhbHRoJyk7XHJcbiAgICAgICAgaWYgKHRvdGFsSHBEaXNwbGF5KSB7XHJcbiAgICAgICAgICAgIHRvdGFsSHBEaXNwbGF5LnRleHRDb250ZW50ID0gYFRvdGFsIGhpdmUgSFA6ICR7dG90YWxIcH1gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZnJlc2hlcyB0aGUgZ2FtZSBib2FyZCBVSS5cclxuICAgICAqL1xyXG4gICAgcmVmcmVzaEJvYXJkKCkge1xyXG4gICAgICAgIGNvbnN0IGRyb25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Ryb25lJyk7XHJcbiAgICAgICAgY29uc3Qgd29ya2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmtlcicpO1xyXG4gICAgICAgIGNvbnN0IHF1ZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F1ZWVuJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ2xlYXIgdGhlIGNvbnRhaW5lcnMgYmVmb3JlIGFkZGluZyBuZXcgZWxlbWVudHNcclxuICAgICAgICBkcm9uZS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB3b3JrZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgcXVlZW4uaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgICAgIC8vIEdlbmVyYXRlIGFuZCBkaXNwbGF5IFVJIGVsZW1lbnRzIGZvciBiZWVzXHJcbiAgICAgICAgY29uc3QgYm9hcmRVSSA9IHRoaXMuZ2VuZXJhdGVCb2FyZFVJKCk7XHJcblxyXG4gICAgICAgIGJvYXJkVUkuZm9yRWFjaChiZWVVSSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChiZWVVSS5jbGFzc05hbWUgPT09ICd3b3JrZXInKSB7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuYXBwZW5kQ2hpbGQoYmVlVUkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGJlZVVJLmNsYXNzTmFtZSA9PT0gJ2Ryb25lJykge1xyXG4gICAgICAgICAgICAgICAgZHJvbmUuYXBwZW5kQ2hpbGQoYmVlVUkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcXVlZW4uYXBwZW5kQ2hpbGQoYmVlVUkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNhdmUgZ2FtZSBzdGF0ZSBhbmQgdXBkYXRlIHRvdGFsIEhQIGRpc3BsYXlcclxuICAgICAgICBpZiAodGhpcy5nYW1lTWVtLmJvYXJkLmFsbEJlZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZU1lbS5zYXZlR2FtZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdG90YWxIcCA9IHRoaXMuZ2FtZU1lbS5ib2FyZC5hbGxCZWVzXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGJlZTogRW50aXR5KSA9PiBiZWUuaXNBbGl2ZSgpKVxyXG4gICAgICAgICAgICAucmVkdWNlKChhY2M6IG51bWJlciwgZW50aXR5OiBFbnRpdHkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhY2MgKyBlbnRpdHkuZ2V0SHAoKTtcclxuICAgICAgICAgICAgfSwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlVG90YWxIcERpc3BsYXkodG90YWxIcCk7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gaGl0IEJ1dHRvbiBFdmVudCBIYW5kbGVyXHJcbmltcG9ydCB7IEdhbWVNZW0gfSBmcm9tICcuLi9kYXRhL21lbSc7XHJcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJy4uL21vZGVsL2VudGl0eUludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnLi4vbW9kZWwvZW50aXR5VHlwZXMnO1xyXG5pbXBvcnQgeyBVSSB9IGZyb20gJy4uL3VpL3VpJztcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVIaXRCdXR0b25DbGljayA9IChnYW1lOiBHYW1lTWVtLCB1aUdyYXBoaWNzOiBVSSkgPT4ge1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaXQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGFsaXZlQmVlcyA9IGdhbWUuYm9hcmQuYWxsQmVlcy5maWx0ZXIoKGJlZTogRW50aXR5KSA9PiBiZWUuaXNBbGl2ZSgpKTtcclxuICAgIGNvbnN0IHF1ZWVuID0gYWxpdmVCZWVzLnNvbWUoYmVlID0+IGJlZS5nZXRUeXBlKCkgPT09IEVudGl0eVR5cGUuUVVFRU4pXHJcbiAgICBjb25zdCBiZWVzID0gYWxpdmVCZWVzLnNvbWUoYmVlID0+IGJlZS5nZXRUeXBlKCkgIT09IEVudGl0eVR5cGUuUVVFRU4pXHJcblxyXG4gICAgaWYgKGJlZXMgJiYgcXVlZW4pIHtcclxuICAgICAgY29uc3QgcmFuZG9tQmVlID0gYWxpdmVCZWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFsaXZlQmVlcy5sZW5ndGgpXTtcclxuICAgICAgcmFuZG9tQmVlLnRha2VEYW1hZ2UoKTtcclxuICAgICAgdWlHcmFwaGljcy5yZWZyZXNoQm9hcmQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdhbWUucmVzZXRHYW1lKCk7XHJcbiAgICAgIGFsZXJ0KCdIdW1hbnMgaGF2ZSBraWxsZWQgYWxsIGJlZXMuIEdhbWUgb3ZlcicpO1xyXG4gICAgICB1aUdyYXBoaWNzLnJlZnJlc2hCb2FyZCgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59OyIsIi8vIHJlc2V0QnV0dG9uIEV2ZW50IEhhbmRsZXJcclxuaW1wb3J0IHsgR2FtZU1lbSB9IGZyb20gJy4uL2RhdGEvbWVtJztcclxuaW1wb3J0IHsgVUkgfSBmcm9tICcuLi91aS91aSc7XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlUmVzZXRCdXR0b25DbGljayA9IChnYW1lOiBHYW1lTWVtLCB1aUdyYXBoaWNzOiBVSSkgPT4ge1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKTtcclxuICAgIHVpR3JhcGhpY3MucmVmcmVzaEJvYXJkKCk7XHJcbiAgfSk7XHJcbn07IiwiLy8gYWRkQmVlIEJ1dHRvbiBFdmVudEhhbmRsZXJcclxuaW1wb3J0IHsgR2FtZU1lbSB9IGZyb20gJy4uL2RhdGEvbWVtJztcclxuaW1wb3J0IHsgVUkgfSBmcm9tICcuLi91aS91aSc7XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlQWRkQmVlQnV0dG9uQ2xpY2sgPSAoZ2FtZTogR2FtZU1lbSwgdWlHcmFwaGljczogVUksIGJlZVR5cGU6IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IGFkZEJ1dHRvbklkID0gYmVlVHlwZSA9PT0gXCJ3b3JrZXJcIiA/ICdhZGR3b3JrZXInIDogJ2FkZGRyb25lJztcclxuXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYWRkQnV0dG9uSWQpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGJlZVR5cGUgPT09IFwid29ya2VyXCIpIHtcclxuICAgICAgdWlHcmFwaGljcy5nYW1lTWVtLmJvYXJkLmFkZFdvcmtlckJlZSgpO1xyXG4gICAgfSBlbHNlIGlmIChiZWVUeXBlID09PSBcImRyb25lXCIpIHtcclxuICAgICAgdWlHcmFwaGljcy5nYW1lTWVtLmJvYXJkLmFkZERyb25lQmVlKCk7XHJcbiAgICB9XHJcbiAgICB1aUdyYXBoaWNzLnJlZnJlc2hCb2FyZCgpO1xyXG4gIH0pO1xyXG59O1xyXG4iLCIvL0lucHV0IHBsYXllcidzIG5hbWUgZXZlbnQgSGFuZGxlclxyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZU5hbWVJbnB1dCA9IChpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsIGVkaXRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50LCBzdWJtaXRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50LCBvdXRwdXREaXY6IEhUTUxEaXZFbGVtZW50KSA9PiB7XHJcbiAgICBpZiAoaW5wdXRFbGVtZW50ICYmIGVkaXRCdXR0b24gJiYgc3VibWl0QnV0dG9uICYmIG91dHB1dERpdikge1xyXG4gICAgICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlZGl0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGxheWVyTmFtZSA9IGlucHV0RWxlbWVudC52YWx1ZTtcclxuICAgICAgICAgICAgb3V0cHV0RGl2LnRleHRDb250ZW50ID0gYFBsYXllcjogJHtwbGF5ZXJOYW1lfWA7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBlZGl0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWVNZW0gfSBmcm9tIFwiLi9kYXRhL21lbVwiO1xyXG5pbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuL21vZGVsL2JvYXJkXCI7XHJcbmltcG9ydCB7IFVJIH0gZnJvbSBcIi4vdWkvdWlcIjtcclxuaW1wb3J0IHsgaGFuZGxlSGl0QnV0dG9uQ2xpY2sgfSBmcm9tIFwiLi9ldmVudGhhbmRsZXJzL2hpdEJ1dHRvbkV2ZW50SGFuZGxlclwiO1xyXG5pbXBvcnQgeyBoYW5kbGVSZXNldEJ1dHRvbkNsaWNrIH0gZnJvbSBcIi4vZXZlbnRoYW5kbGVycy9yZXNldEJ1dHRvbkV2ZW50SGFuZGxlclwiXHJcbmltcG9ydCB7IGhhbmRsZUFkZEJlZUJ1dHRvbkNsaWNrIH0gZnJvbSBcIi4vZXZlbnRoYW5kbGVycy9hZGRCZWVCdXR0b25FdmVudEhhbmRsZXJcIlxyXG5pbXBvcnQgeyBoYW5kbGVOYW1lSW5wdXQgfSBmcm9tIFwiLi9ldmVudGhhbmRsZXJzL2lucHV0UGxheWVyc05hbWVFdmVudEhhbmRsZXJcIjtcclxuXHJcbi8vIEluaXRpYWxpemUgdGhlIGdhbWVcclxubGV0IGdhbWU6IEdhbWVNZW07XHJcblxyXG5pZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0dBTUVfU1RBVEUnKSkge1xyXG4gICAgZ2FtZSA9IG5ldyBHYW1lTWVtKCk7XHJcbiAgICBnYW1lLmxvYWRHYW1lKCk7XHJcbn0gZWxzZSB7XHJcbiAgICBnYW1lID0gbmV3IEdhbWVNZW0oKTtcclxuICAgIGNvbnN0IGJvYXJkOiBCb2FyZCA9IG5ldyBCb2FyZCgpO1xyXG4gICAgYm9hcmQuaW5pdERlZmF1bHQoKTtcclxuICAgIGdhbWUuc2V0Qm9hcmQoYm9hcmQpO1xyXG59XHJcblxyXG5jb25zdCB1aUdyYXBoaWNzOiBVSSA9IG5ldyBVSShnYW1lKTtcclxudWlHcmFwaGljcy5yZWZyZXNoQm9hcmQoKTtcclxuXHJcbi8vIEluaXRpYWxpemUgZXZlbnQgaGFuZGxlcnNcclxuaGFuZGxlSGl0QnV0dG9uQ2xpY2soZ2FtZSwgdWlHcmFwaGljcyk7XHJcbmhhbmRsZVJlc2V0QnV0dG9uQ2xpY2soZ2FtZSwgdWlHcmFwaGljcyk7XHJcbmhhbmRsZUFkZEJlZUJ1dHRvbkNsaWNrKGdhbWUsIHVpR3JhcGhpY3MsICdkcm9uZScpO1xyXG5oYW5kbGVBZGRCZWVCdXR0b25DbGljayhnYW1lLCB1aUdyYXBoaWNzLCAnd29ya2VyJyk7XHJcblxyXG4vLyBJbnB1dCBwbGF5ZXIncyBuYW1lXHJcbmNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lSW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5jb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXRCdXR0b24nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdEJ1dHRvbicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG5jb25zdCBvdXRwdXREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0JykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5oYW5kbGVOYW1lSW5wdXQobmFtZUlucHV0LCBlZGl0QnV0dG9uLCBzdWJtaXRCdXR0b24sIG91dHB1dERpdik7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==