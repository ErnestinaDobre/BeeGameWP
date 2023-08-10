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
        console.log(queenBee);
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
        console.log('LOADED GAME:', this.board);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBbUIsQ0FBQztBQUV0RSw0RkFBZSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmVlLWdhbWUvLi9zcmMvZGF0YS9tZW0udHMiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvLi9zcmMvbW9kZWwvYm9hcmQudHMiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvLi9zcmMvbW9kZWwvZW50aXR5VHlwZXMudHMiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvLi9zcmMvbW9kZWwvZW50aXR5RmFjdG9yeS50cyIsIndlYnBhY2s6Ly9iZWUtZ2FtZS8uL3NyYy9tb2RlbC9kcm9uZS50cyIsIndlYnBhY2s6Ly9iZWUtZ2FtZS8uL3NyYy9tb2RlbC9iYXNlRW50aXR5LnRzIiwid2VicGFjazovL2JlZS1nYW1lLy4vc3JjL21vZGVsL3F1ZWVuLnRzIiwid2VicGFjazovL2JlZS1nYW1lLy4vc3JjL21vZGVsL3dvcmtlci50cyIsIndlYnBhY2s6Ly9iZWUtZ2FtZS8uL3NyYy91aS91aS50cyIsIndlYnBhY2s6Ly9iZWUtZ2FtZS8uL3NyYy9ldmVudGhhbmRsZXJzL2hpdEJ1dHRvbkV2ZW50SGFuZGxlci50cyIsIndlYnBhY2s6Ly9iZWUtZ2FtZS8uL3NyYy9ldmVudGhhbmRsZXJzL3Jlc2V0QnV0dG9uRXZlbnRIYW5kbGVyLnRzIiwid2VicGFjazovL2JlZS1nYW1lLy4vc3JjL2V2ZW50aGFuZGxlcnMvYWRkQmVlQnV0dG9uRXZlbnRIYW5kbGVyLnRzIiwid2VicGFjazovL2JlZS1nYW1lLy4vc3JjL2V2ZW50aGFuZGxlcnMvaW5wdXRQbGF5ZXJzTmFtZUV2ZW50SGFuZGxlci50cyIsIndlYnBhY2s6Ly9iZWUtZ2FtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iZWUtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmVlLWdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iZWUtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JlZS1nYW1lLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvYXJkIH0gZnJvbSBcIi4uL21vZGVsL2JvYXJkXCI7XHJcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuLi9tb2RlbC9lbnRpdHlJbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB7IEVudGl0eVR5cGUgfSBmcm9tICcuLi9tb2RlbC9lbnRpdHlUeXBlcyc7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyB0aGUgZ2FtZSBtZW1vcnkgYW5kIGl0cyBzdGF0ZS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBHYW1lTWVtIHtcclxuICAgIGJvYXJkOiBCb2FyZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGdhbWUgYm9hcmQuXHJcbiAgICAgKiBAcGFyYW0ge0JvYXJkfSBib2FyZCAtIFRoZSBnYW1lIGJvYXJkLlxyXG4gICAgICovXHJcbiAgICBzZXRCb2FyZChib2FyZDogQm9hcmQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBnYW1lIGJvYXJkLlxyXG4gICAgICogQHJldHVybnMge0JvYXJkfSBUaGUgZ2FtZSBib2FyZC5cclxuICAgICAqL1xyXG4gICAgZ2V0Qm9hcmQoKTogQm9hcmQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJvYXJkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBnYW1lIGlzIG92ZXIgKFF1ZWVuIGlzIGRlYWQgb3IgYWxsIHRoZSBvdGhlciBiZWVzIGFyZSBkZWFkKS5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZSBnYW1lIGlzIG92ZXIgb3Igbm90LlxyXG4gICAgICovXHJcbiAgICBpc0dhbWVPdmVyKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHF1ZWVuQmVlID0gdGhpcy5ib2FyZC5hbGxCZWVzLmZpbHRlcigoYmVlOiBFbnRpdHkpID0+IGJlZS5nZXRUeXBlKCkgPT09IEVudGl0eVR5cGUuUVVFRU4pO1xyXG4gICAgICAgIGNvbnN0IHJlc3RPZkJlZXMgPSB0aGlzLmJvYXJkLmFsbEJlZXMuZmluZCgoYmVlOiBFbnRpdHkpID0+IGJlZS5nZXRUeXBlKCkgIT09IEVudGl0eVR5cGUuUVVFRU4gJiYgYmVlLmdldFR5cGUoKSAhPT0gdW5kZWZpbmVkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhxdWVlbkJlZSlcclxuICAgICAgICBcclxuICAgICAgICBpZiAoKHF1ZWVuQmVlICYmIHF1ZWVuQmVlLnNvbWUocXVlZW4gPT4gcXVlZW4uZ2V0SHAoKSA8PSAwKSkgfHwgIXJlc3RPZkJlZXMuaXNBbGl2ZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiBcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2F2ZXMgdGhlIGN1cnJlbnQgZ2FtZSBzdGF0ZSB0byBsb2NhbCBzdG9yYWdlLlxyXG4gICAgICovXHJcbiAgICBzYXZlR2FtZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5ib2FyZC5hbGxCZWVzLnNvbWUoKGJlZTogRW50aXR5KSA9PiBiZWUuaXNBbGl2ZSgpKSkge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnR0FNRV9TVEFURScsIEpTT04uc3RyaW5naWZ5KHRoaXMuYm9hcmQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgZ2FtZSBzdGF0ZSBmcm9tIGxvY2FsIHN0b3JhZ2UuXHJcbiAgICAgKi9cclxuICAgIGxvYWRHYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNhdmVkQm9hcmQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdHQU1FX1NUQVRFJykpO1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcclxuICAgICAgICB0aGlzLmJvYXJkLmluaXRGcm9tTG9hZChzYXZlZEJvYXJkLl9hbGxCZWVzKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ0xPQURFRCBHQU1FOicsIHRoaXMuYm9hcmQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXRzIHRoZSBnYW1lIHN0YXRlLlxyXG4gICAgICovXHJcbiAgICByZXNldEdhbWUoKTogdm9pZCB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ0dBTUVfU1RBVEUnKTtcclxuXHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuaW5pdERlZmF1bHQoKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnR0FNRV9TVEFURScsIEpTT04uc3RyaW5naWZ5KHRoaXMuYm9hcmQpKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnLi9lbnRpdHlUeXBlcyc7XHJcbmltcG9ydCB7IEVudGl0eUZhY3RvcnkgfSBmcm9tICcuL2VudGl0eUZhY3RvcnknO1xyXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICcuL2VudGl0eUludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIGdhbWUgYm9hcmQgY29udGFpbmluZyBiZWUgZW50aXRpZXMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQm9hcmQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbiBhcnJheSBjb250YWluaW5nIGFsbCBiZWUgZW50aXRpZXMgb24gdGhlIGJvYXJkLlxyXG4gICAgICovXHJcbiAgICBfYWxsQmVlczogQXJyYXk8RW50aXR5PiA9IG5ldyBBcnJheTxFbnRpdHk+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgZ2FtZSBib2FyZCBmcm9tIGEgc2F2ZWQgc3RhdGUuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBib2FyZEpTT04gLSBUaGUgc2F2ZWQgc3RhdGUgb2YgdGhlIGdhbWUgYm9hcmQuXHJcbiAgICAgKi9cclxuICAgIGluaXRGcm9tTG9hZChib2FyZEpTT046IGFueVtdKSB7XHJcbiAgICAgICAgZm9yIChsZXQgYmVlIG9mIGJvYXJkSlNPTikge1xyXG4gICAgICAgICAgICBsZXQgYmVlT0s6IEVudGl0eSA9IEVudGl0eUZhY3RvcnkuY3JlYXRlRW50aXR5KGJlZS5lbnRpdHlUeXBlKTtcclxuICAgICAgICAgICAgYmVlT0suc2V0SHAoYmVlLmhwKTtcclxuICAgICAgICAgICAgdGhpcy5fYWxsQmVlcy5wdXNoKGJlZU9LKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgZ2FtZSBib2FyZCB3aXRoIGRlZmF1bHQgYmVlIGVudGl0aWVzLlxyXG4gICAgICovXHJcbiAgICBpbml0RGVmYXVsdCgpIHtcclxuICAgICAgICB0aGlzLmFkZEVudGl0aWVzKEVudGl0eVR5cGUuUVVFRU4pO1xyXG4gICAgICAgIHRoaXMuYWRkRW50aXRpZXNPZlR5cGUoRW50aXR5VHlwZS5XT1JLRVIsIDUpO1xyXG4gICAgICAgIHRoaXMuYWRkRW50aXRpZXNPZlR5cGUoRW50aXR5VHlwZS5EUk9ORSwgOCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRW50aXRpZXMoLi4uZW50aXR5VHlwZXM6IEVudGl0eVR5cGVbXSkge1xyXG4gICAgICAgIGZvciAoY29uc3QgZXQgb2YgZW50aXR5VHlwZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFbnRpdHkoZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIGJlZSBlbnRpdGllcyBvZiBhIGdpdmVuIHR5cGUgdG8gdGhlIGdhbWUgYm9hcmQuXHJcbiAgICAgKiBAcGFyYW0ge0VudGl0eVR5cGV9IGVudGl0eVR5cGUgLSBUaGUgdHlwZSBvZiBiZWUgZW50aXR5IHRvIGFkZC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJPZkVudGl0aWVzIC0gVGhlIG51bWJlciBvZiBlbnRpdGllcyB0byBhZGQuXHJcbiAgICAgKi9cclxuICAgIGFkZEVudGl0aWVzT2ZUeXBlKGVudGl0eVR5cGU6IEVudGl0eVR5cGUsIG51bWJlck9mRW50aXRpZXM6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZFbnRpdGllczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRW50aXR5KGVudGl0eVR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBiZWUgZW50aXR5IG9mIGEgc3BlY2lmaWVkIHR5cGUgdG8gdGhlIGdhbWUgYm9hcmQuXHJcbiAgICAgKiBAcGFyYW0ge0VudGl0eVR5cGV9IGVudGl0eVR5cGUgLSBUaGUgdHlwZSBvZiBiZWUgZW50aXR5IHRvIGFkZC5cclxuICAgICAqL1xyXG4gICAgYWRkRW50aXR5KGVudGl0eVR5cGU6IEVudGl0eVR5cGUpIHtcclxuICAgICAgICB0aGlzLl9hbGxCZWVzLnB1c2goRW50aXR5RmFjdG9yeS5jcmVhdGVFbnRpdHkoZW50aXR5VHlwZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHdvcmtlciBiZWUgZW50aXR5IHRvIHRoZSBnYW1lIGJvYXJkLlxyXG4gICAgICovXHJcbiAgICBhZGRXb3JrZXJCZWUoKSB7XHJcbiAgICAgICAgdGhpcy5hZGRFbnRpdGllc09mVHlwZShFbnRpdHlUeXBlLldPUktFUiwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgZHJvbmUgYmVlIGVudGl0eSB0byB0aGUgZ2FtZSBib2FyZC5cclxuICAgICAqL1xyXG4gICAgYWRkRHJvbmVCZWUoKSB7XHJcbiAgICAgICAgdGhpcy5hZGRFbnRpdGllc09mVHlwZShFbnRpdHlUeXBlLkRST05FLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgYmVlIGVudGl0aWVzIG9uIHRoZSBib2FyZC5cclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxFbnRpdHk+fSBBbiBhcnJheSBvZiBiZWUgZW50aXRpZXMgb24gdGhlIGJvYXJkLlxyXG4gICAgICovXHJcbiAgICBnZXQgYWxsQmVlcygpOiBBcnJheTxFbnRpdHk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWxsQmVlcztcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZW51bSBFbnRpdHlUeXBlIHtcclxuICAgIFFVRUVOLFxyXG4gICAgV09SS0VSLFxyXG4gICAgRFJPTkVcclxufSIsImltcG9ydCB7IEVudGl0eVR5cGUgfSBmcm9tICcuL2VudGl0eVR5cGVzJztcclxuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnLi9lbnRpdHlJbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRHJvbmUgfSBmcm9tICcuL2Ryb25lJztcclxuaW1wb3J0IHsgUXVlZW4gfSBmcm9tICcuL3F1ZWVuJztcclxuaW1wb3J0IHsgV29ya2VyIH0gZnJvbSAnLi93b3JrZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVudGl0eUZhY3Rvcnkge1xyXG4gICAgc3RhdGljIGNyZWF0ZUVudGl0eShlbnRpdHlUeXBlOiBFbnRpdHlUeXBlKTogRW50aXR5IHtcclxuICAgICAgICBzd2l0Y2ggKGVudGl0eVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBFbnRpdHlUeXBlLkRST05FOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEcm9uZSgpO1xyXG4gICAgICAgICAgICBjYXNlIEVudGl0eVR5cGUuUVVFRU46XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFF1ZWVuKCk7XHJcbiAgICAgICAgICAgIGNhc2UgRW50aXR5VHlwZS5XT1JLRVI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmtlcigpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVudGl0eSB0eXBlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEVudGl0eVR5cGUgfSBmcm9tICcuL2VudGl0eVR5cGVzJztcclxuaW1wb3J0IHsgQmFzZUVudGl0eSB9IGZyb20gJy4vYmFzZUVudGl0eSc7XHJcblxyXG5leHBvcnQgY2xhc3MgRHJvbmUgZXh0ZW5kcyBCYXNlRW50aXR5IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKDUwLCBFbnRpdHlUeXBlLkRST05FKTtcclxuICAgIH1cclxuXHJcbiAgICB0YWtlRGFtYWdlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaHAgLT0gMTI7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gJy4vZW50aXR5VHlwZXMnO1xyXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICcuL2VudGl0eUludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIGJhc2UgZW50aXR5IGNsYXNzIGZvciBiZWVzLlxyXG4gKiBAaW1wbGVtZW50cyBFbnRpdHlcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlRW50aXR5IGltcGxlbWVudHMgRW50aXR5IHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGhpdCBwb2ludHMgKEhQKSBvZiB0aGUgYmVlIGVudGl0eS5cclxuICAgICAqL1xyXG4gICAgaHA6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0eXBlIG9mIHRoZSBiZWUgZW50aXR5LlxyXG4gICAgICovXHJcbiAgICBlbnRpdHlUeXBlOiBFbnRpdHlUeXBlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCYXNlRW50aXR5LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhwIC0gVGhlIGluaXRpYWwgaGl0IHBvaW50cyAoSFApIG9mIHRoZSBiZWUuXHJcbiAgICAgKiBAcGFyYW0ge0VudGl0eVR5cGV9IGVudGl0eVR5cGUgLSBUaGUgdHlwZSBvZiB0aGUgYmVlIGVudGl0eS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaHA6IG51bWJlciwgZW50aXR5VHlwZTogRW50aXR5VHlwZSkge1xyXG4gICAgICAgIHRoaXMuaHAgPSBocDtcclxuICAgICAgICB0aGlzLmVudGl0eVR5cGUgPSBlbnRpdHlUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdHlwZSBvZiB0aGUgYmVlIGVudGl0eS5cclxuICAgICAqIEByZXR1cm5zIHtFbnRpdHlUeXBlfSBUaGUgdHlwZSBvZiB0aGUgYmVlIGVudGl0eS5cclxuICAgICAqL1xyXG4gICAgZ2V0VHlwZSgpOiBFbnRpdHlUeXBlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHlUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgaGl0IHBvaW50cyAoSFApIG9mIHRoZSBiZWUgZW50aXR5LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhwIC0gVGhlIG5ldyBoaXQgcG9pbnRzIChIUCkgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIHNldEhwKGhwOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhwID0gaHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IGhpdCBwb2ludHMgKEhQKSBvZiB0aGUgYmVlIGVudGl0eS5cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjdXJyZW50IGhpdCBwb2ludHMgKEhQKSB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgZ2V0SHAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ocDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFic3RyYWN0IG1ldGhvZCBmb3IgY2F1c2luZyBkYW1hZ2UgdG8gdGhlIGJlZSBlbnRpdHkuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHRha2VEYW1hZ2UoKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgYmVlIGVudGl0eSBpcyBhbGl2ZSBiYXNlZCBvbiBpdHMgaGl0IHBvaW50cyAoSFApLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgYmVlIGVudGl0eSBpcyBhbGl2ZSwgb3RoZXJ3aXNlIGBmYWxzZWAuXHJcbiAgICAgKi9cclxuICAgIGlzQWxpdmUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHAgPiAwO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEVudGl0eVR5cGUgfSBmcm9tICcuL2VudGl0eVR5cGVzJztcclxuaW1wb3J0IHsgQmFzZUVudGl0eSB9IGZyb20gJy4vYmFzZUVudGl0eSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlZW4gZXh0ZW5kcyBCYXNlRW50aXR5IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKDEwMCwgRW50aXR5VHlwZS5RVUVFTik7XHJcbiAgICB9XHJcblxyXG4gICAgdGFrZURhbWFnZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhwIC09IDg7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gJy4vZW50aXR5VHlwZXMnO1xyXG5pbXBvcnQgeyBCYXNlRW50aXR5IH0gZnJvbSAnLi9iYXNlRW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBXb3JrZXIgZXh0ZW5kcyBCYXNlRW50aXR5IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKDc1LCBFbnRpdHlUeXBlLldPUktFUik7XHJcbiAgICB9XHJcblxyXG4gICAgdGFrZURhbWFnZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhwIC09IDEwO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEdhbWVNZW0gfSBmcm9tIFwiLi4vZGF0YS9tZW1cIjtcclxuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcIi4uL21vZGVsL2VudGl0eUludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gJy4uL21vZGVsL2VudGl0eVR5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSB1c2VyIGludGVyZmFjZSBmb3IgZGlzcGxheWluZyBiZWUgaW5mb3JtYXRpb24uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmVlVUkge1xyXG4gICAgcHJpdmF0ZSBiZWU6IEVudGl0eTtcclxuICAgIHByaXZhdGUgdWk6IFVJO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCZWVVSS5cclxuICAgICAqIEBwYXJhbSB7RW50aXR5fSBiZWUgLSBUaGUgYmVlIGVudGl0eS5cclxuICAgICAqIEBwYXJhbSB7VUl9IHVpIC0gVGhlIHVzZXIgaW50ZXJmYWNlLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihiZWU6IEVudGl0eSwgdWk6IFVJKSB7XHJcbiAgICAgICAgdGhpcy5iZWUgPSBiZWU7XHJcbiAgICAgICAgdGhpcy51aSA9IHVpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGVzIHRoZSBIVE1MIGVsZW1lbnQgZm9yIGRpc3BsYXlpbmcgYmVlIGluZm9ybWF0aW9uLlxyXG4gICAgICogQHJldHVybnMge0hUTUxFbGVtZW50fSBUaGUgSFRNTCBlbGVtZW50IHJlcHJlc2VudGluZyB0aGUgYmVlLlxyXG4gICAgICovXHJcbiAgICBkaXNwbGF5KCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb25zdCBoMkhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICAgICAgbGV0IGJ0eXBlID0gJyc7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5iZWUuZ2V0VHlwZSgpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgRW50aXR5VHlwZS5EUk9ORTpcclxuICAgICAgICAgICAgICAgIGJ0eXBlID0gJ0RST05FJztcclxuICAgICAgICAgICAgICAgIGgySGVhZGVyLmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPVwiZHJvbmVpbWdcIiBzcmM9XCJkcm9uZS5wbmdcIiBhbHQ9XCJEcm9uZVwiPmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBFbnRpdHlUeXBlLlFVRUVOOlxyXG4gICAgICAgICAgICAgICAgYnR5cGUgPSAnUVVFRU4nO1xyXG4gICAgICAgICAgICAgICAgaDJIZWFkZXIuaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9XCJxdWVlbmltZ1wiIHNyYz1cInF1ZWVuLnBuZ1wiIGFsdD1cIlF1ZWVuXCI+YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVudGl0eVR5cGUuV09SS0VSOlxyXG4gICAgICAgICAgICAgICAgYnR5cGUgPSAnV09SS0VSJztcclxuICAgICAgICAgICAgICAgIGgySGVhZGVyLmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPVwid29ya2VyaW1nXCIgc3JjPVwid29ya2VyLnBuZ1wiIGFsdD1cIldvcmtlclwiPmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBFbnRpdHkgVHlwZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdWx0LmFwcGVuZENoaWxkKGgySGVhZGVyKTtcclxuICAgICAgICByZXN1bHQuY2xhc3NOYW1lID0gYnR5cGUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYmVlLmlzQWxpdmUoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBocEluZGljYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgaHBJbmRpY2F0b3IuaW5uZXJIVE1MID0gJ0hQOiAnICsgdGhpcy5iZWUuZ2V0SHAoKTtcclxuICAgICAgICAgICAgcmVzdWx0LmFwcGVuZENoaWxkKGhwSW5kaWNhdG9yKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBiZWVTdGF0dXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgICAgIGJlZVN0YXR1cy5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cImRlYWRcIiBzcmM9XCJkZWFkLnBuZ1wiIGFsdD1cImRlYWRcIj48cD5ERUFEPC9wPmA7XHJcbiAgICAgICAgICAgIHJlc3VsdC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgcmVzdWx0LmFwcGVuZENoaWxkKGJlZVN0YXR1cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyB0aGUgbWFpbiB1c2VyIGludGVyZmFjZSBmb3IgdGhlIGdhbWUuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVUkge1xyXG4gICAgZ2FtZU1lbTogR2FtZU1lbTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVUkuXHJcbiAgICAgKiBAcGFyYW0ge0dhbWVNZW19IGdhbWVNZW0gLSBUaGUgZ2FtZSBtZW1vcnkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGdhbWVNZW06IEdhbWVNZW0pIHtcclxuICAgICAgICB0aGlzLmdhbWVNZW0gPSBnYW1lTWVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGVzIHRoZSBVSSBlbGVtZW50cyBmb3IgdGhlIGdhbWUgYm9hcmQuXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SFRNTEVsZW1lbnQ+fSBBbiBhcnJheSBvZiBIVE1MIGVsZW1lbnRzIHJlcHJlc2VudGluZyBiZWVzLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdlbmVyYXRlQm9hcmRVSSgpOiBBcnJheTxIVE1MRWxlbWVudD4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzOiBBcnJheTxIVE1MRWxlbWVudD4gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBiZWUgb2YgdGhpcy5nYW1lTWVtLmdldEJvYXJkKCkuYWxsQmVlcykge1xyXG4gICAgICAgICAgICBjb25zdCBiZWVVSSA9IG5ldyBCZWVVSShiZWUsIHRoaXMpO1xyXG4gICAgICAgICAgICBlbGVtZW50cy5wdXNoKGJlZVVJLmRpc3BsYXkoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB0b3RhbCBIUCBkaXNwbGF5IGluIHRoZSBVSS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0b3RhbEhwIC0gVGhlIHRvdGFsIEhQIHZhbHVlLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRvdGFsSHBEaXNwbGF5KHRvdGFsSHA6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHRvdGFsSHBEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpdmVoZWFsdGgnKTtcclxuICAgICAgICBpZiAodG90YWxIcERpc3BsYXkpIHtcclxuICAgICAgICAgICAgdG90YWxIcERpc3BsYXkudGV4dENvbnRlbnQgPSBgVG90YWwgaGl2ZSBIUDogJHt0b3RhbEhwfWA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVmcmVzaGVzIHRoZSBnYW1lIGJvYXJkIFVJLlxyXG4gICAgICovXHJcbiAgICByZWZyZXNoQm9hcmQoKSB7XHJcbiAgICAgICAgY29uc3QgZHJvbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJvbmUnKTtcclxuICAgICAgICBjb25zdCB3b3JrZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd29ya2VyJyk7XHJcbiAgICAgICAgY29uc3QgcXVlZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncXVlZW4nKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDbGVhciB0aGUgY29udGFpbmVycyBiZWZvcmUgYWRkaW5nIG5ldyBlbGVtZW50c1xyXG4gICAgICAgIGRyb25lLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHdvcmtlci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBxdWVlbi5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAgICAgLy8gR2VuZXJhdGUgYW5kIGRpc3BsYXkgVUkgZWxlbWVudHMgZm9yIGJlZXNcclxuICAgICAgICBjb25zdCBib2FyZFVJID0gdGhpcy5nZW5lcmF0ZUJvYXJkVUkoKTtcclxuXHJcbiAgICAgICAgYm9hcmRVSS5mb3JFYWNoKGJlZVVJID0+IHtcclxuICAgICAgICAgICAgaWYgKGJlZVVJLmNsYXNzTmFtZSA9PT0gJ3dvcmtlcicpIHtcclxuICAgICAgICAgICAgICAgIHdvcmtlci5hcHBlbmRDaGlsZChiZWVVSSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYmVlVUkuY2xhc3NOYW1lID09PSAnZHJvbmUnKSB7XHJcbiAgICAgICAgICAgICAgICBkcm9uZS5hcHBlbmRDaGlsZChiZWVVSSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBxdWVlbi5hcHBlbmRDaGlsZChiZWVVSSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gU2F2ZSBnYW1lIHN0YXRlIGFuZCB1cGRhdGUgdG90YWwgSFAgZGlzcGxheVxyXG4gICAgICAgIGlmICh0aGlzLmdhbWVNZW0uYm9hcmQuYWxsQmVlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lTWVtLnNhdmVHYW1lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0b3RhbEhwID0gdGhpcy5nYW1lTWVtLmJvYXJkLmFsbEJlZXNcclxuICAgICAgICAgICAgLmZpbHRlcigoYmVlOiBFbnRpdHkpID0+IGJlZS5pc0FsaXZlKCkpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjYzogbnVtYmVyLCBlbnRpdHk6IEVudGl0eSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYyArIGVudGl0eS5nZXRIcCgpO1xyXG4gICAgICAgICAgICB9LCAwKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVUb3RhbEhwRGlzcGxheSh0b3RhbEhwKTtcclxuICAgIH1cclxufVxyXG4iLCIvLyBoaXQgQnV0dG9uIEV2ZW50IEhhbmRsZXJcclxuaW1wb3J0IHsgR2FtZU1lbSB9IGZyb20gJy4uL2RhdGEvbWVtJztcclxuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnLi4vbW9kZWwvZW50aXR5SW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEVudGl0eVR5cGUgfSBmcm9tICcuLi9tb2RlbC9lbnRpdHlUeXBlcyc7XHJcbmltcG9ydCB7IFVJIH0gZnJvbSAnLi4vdWkvdWknO1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZUhpdEJ1dHRvbkNsaWNrID0gKGdhbWU6IEdhbWVNZW0sIHVpR3JhcGhpY3M6IFVJKSA9PiB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgYWxpdmVCZWVzID0gZ2FtZS5ib2FyZC5hbGxCZWVzLmZpbHRlcigoYmVlOiBFbnRpdHkpID0+IGJlZS5pc0FsaXZlKCkpO1xyXG4gICAgY29uc3QgcXVlZW4gPSBhbGl2ZUJlZXMuc29tZShiZWUgPT4gYmVlLmdldFR5cGUoKSA9PT0gRW50aXR5VHlwZS5RVUVFTilcclxuICAgIGNvbnN0IGJlZXMgPSBhbGl2ZUJlZXMuc29tZShiZWUgPT4gYmVlLmdldFR5cGUoKSAhPT0gRW50aXR5VHlwZS5RVUVFTilcclxuXHJcbiAgICBpZiAoYmVlcyAmJiBxdWVlbikge1xyXG4gICAgICBjb25zdCByYW5kb21CZWUgPSBhbGl2ZUJlZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWxpdmVCZWVzLmxlbmd0aCldO1xyXG4gICAgICByYW5kb21CZWUudGFrZURhbWFnZSgpO1xyXG4gICAgICB1aUdyYXBoaWNzLnJlZnJlc2hCb2FyZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZ2FtZS5yZXNldEdhbWUoKTtcclxuICAgICAgYWxlcnQoJ0dhbWUgaXMgb3ZlcicpO1xyXG4gICAgICB1aUdyYXBoaWNzLnJlZnJlc2hCb2FyZCgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59OyIsIi8vIHJlc2V0QnV0dG9uIEV2ZW50IEhhbmRsZXJcclxuaW1wb3J0IHsgR2FtZU1lbSB9IGZyb20gJy4uL2RhdGEvbWVtJztcclxuaW1wb3J0IHsgVUkgfSBmcm9tICcuLi91aS91aSc7XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlUmVzZXRCdXR0b25DbGljayA9IChnYW1lOiBHYW1lTWVtLCB1aUdyYXBoaWNzOiBVSSkgPT4ge1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKTtcclxuICAgIHVpR3JhcGhpY3MucmVmcmVzaEJvYXJkKCk7XHJcbiAgfSk7XHJcbn07IiwiLy8gYWRkQmVlIEJ1dHRvbiBFdmVudEhhbmRsZXJcclxuaW1wb3J0IHsgR2FtZU1lbSB9IGZyb20gJy4uL2RhdGEvbWVtJztcclxuaW1wb3J0IHsgVUkgfSBmcm9tICcuLi91aS91aSc7XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlQWRkQmVlQnV0dG9uQ2xpY2sgPSAoZ2FtZTogR2FtZU1lbSwgdWlHcmFwaGljczogVUksIGJlZVR5cGU6IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IGFkZEJ1dHRvbklkID0gYmVlVHlwZSA9PT0gXCJ3b3JrZXJcIiA/ICdhZGR3b3JrZXInIDogJ2FkZGRyb25lJztcclxuXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYWRkQnV0dG9uSWQpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGJlZVR5cGUgPT09IFwid29ya2VyXCIpIHtcclxuICAgICAgdWlHcmFwaGljcy5nYW1lTWVtLmJvYXJkLmFkZFdvcmtlckJlZSgpO1xyXG4gICAgfSBlbHNlIGlmIChiZWVUeXBlID09PSBcImRyb25lXCIpIHtcclxuICAgICAgdWlHcmFwaGljcy5nYW1lTWVtLmJvYXJkLmFkZERyb25lQmVlKCk7XHJcbiAgICB9XHJcbiAgICB1aUdyYXBoaWNzLnJlZnJlc2hCb2FyZCgpO1xyXG4gIH0pO1xyXG59O1xyXG4iLCIvL0lucHV0IHBsYXllcidzIG5hbWUgZXZlbnQgSGFuZGxlclxyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZU5hbWVJbnB1dCA9IChpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsIGVkaXRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50LCBzdWJtaXRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50LCBvdXRwdXREaXY6IEhUTUxEaXZFbGVtZW50KSA9PiB7XHJcbiAgICBpZiAoaW5wdXRFbGVtZW50ICYmIGVkaXRCdXR0b24gJiYgc3VibWl0QnV0dG9uICYmIG91dHB1dERpdikge1xyXG4gICAgICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlZGl0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGxheWVyTmFtZSA9IGlucHV0RWxlbWVudC52YWx1ZTtcclxuICAgICAgICAgICAgb3V0cHV0RGl2LnRleHRDb250ZW50ID0gYFBsYXllcjogJHtwbGF5ZXJOYW1lfWA7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBlZGl0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWVNZW0gfSBmcm9tIFwiLi9kYXRhL21lbVwiO1xyXG5pbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuL21vZGVsL2JvYXJkXCI7XHJcbmltcG9ydCB7IFVJIH0gZnJvbSBcIi4vdWkvdWlcIjtcclxuaW1wb3J0IHsgaGFuZGxlSGl0QnV0dG9uQ2xpY2sgfSBmcm9tIFwiLi9ldmVudGhhbmRsZXJzL2hpdEJ1dHRvbkV2ZW50SGFuZGxlclwiO1xyXG5pbXBvcnQgeyBoYW5kbGVSZXNldEJ1dHRvbkNsaWNrIH0gZnJvbSBcIi4vZXZlbnRoYW5kbGVycy9yZXNldEJ1dHRvbkV2ZW50SGFuZGxlclwiXHJcbmltcG9ydCB7IGhhbmRsZUFkZEJlZUJ1dHRvbkNsaWNrIH0gZnJvbSBcIi4vZXZlbnRoYW5kbGVycy9hZGRCZWVCdXR0b25FdmVudEhhbmRsZXJcIlxyXG5pbXBvcnQgeyBoYW5kbGVOYW1lSW5wdXQgfSBmcm9tIFwiLi9ldmVudGhhbmRsZXJzL2lucHV0UGxheWVyc05hbWVFdmVudEhhbmRsZXJcIjtcclxuXHJcbi8vIEluaXRpYWxpemUgdGhlIGdhbWVcclxubGV0IGdhbWU6IEdhbWVNZW07XHJcblxyXG5pZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0dBTUVfU1RBVEUnKSkge1xyXG4gICAgZ2FtZSA9IG5ldyBHYW1lTWVtKCk7XHJcbiAgICBnYW1lLmxvYWRHYW1lKCk7XHJcbn0gZWxzZSB7XHJcbiAgICBnYW1lID0gbmV3IEdhbWVNZW0oKTtcclxuICAgIGNvbnN0IGJvYXJkOiBCb2FyZCA9IG5ldyBCb2FyZCgpO1xyXG4gICAgYm9hcmQuaW5pdERlZmF1bHQoKTtcclxuICAgIGdhbWUuc2V0Qm9hcmQoYm9hcmQpO1xyXG59XHJcblxyXG5jb25zdCB1aUdyYXBoaWNzOiBVSSA9IG5ldyBVSShnYW1lKTtcclxudWlHcmFwaGljcy5yZWZyZXNoQm9hcmQoKTtcclxuXHJcbi8vIEluaXRpYWxpemUgZXZlbnQgaGFuZGxlcnNcclxuaGFuZGxlSGl0QnV0dG9uQ2xpY2soZ2FtZSwgdWlHcmFwaGljcyk7XHJcbmhhbmRsZVJlc2V0QnV0dG9uQ2xpY2soZ2FtZSwgdWlHcmFwaGljcyk7XHJcbmhhbmRsZUFkZEJlZUJ1dHRvbkNsaWNrKGdhbWUsIHVpR3JhcGhpY3MsICdkcm9uZScpO1xyXG5oYW5kbGVBZGRCZWVCdXR0b25DbGljayhnYW1lLCB1aUdyYXBoaWNzLCAnd29ya2VyJyk7XHJcblxyXG4vLyBJbnB1dCBwbGF5ZXIncyBuYW1lXHJcbmNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lSW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5jb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXRCdXR0b24nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdEJ1dHRvbicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG5jb25zdCBvdXRwdXREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0JykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5oYW5kbGVOYW1lSW5wdXQobmFtZUlucHV0LCBlZGl0QnV0dG9uLCBzdWJtaXRCdXR0b24sIG91dHB1dERpdik7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==