import 'reflect-metadata';
import { Vue, Component } from 'vue-property-decorator';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/**
 * This mixin grafts an undo redo stack on any component that incorporates it.
 */
var UndoRedoStackMixin = /*@__PURE__*/(function (Vue) {
    function UndoRedoStackMixin() {
        Vue.apply(this, arguments);
        this.isUndoRedoStack = true;
        this.undoStack = [];
        this.redoStack = [];
        this.saved = null;
    }

    if ( Vue ) UndoRedoStackMixin.__proto__ = Vue;
    UndoRedoStackMixin.prototype = Object.create( Vue && Vue.prototype );
    UndoRedoStackMixin.prototype.constructor = UndoRedoStackMixin;

    var prototypeAccessors = { canUndo: { configurable: true },undoLabel: { configurable: true },canRedo: { configurable: true },redoLabel: { configurable: true },dirty: { configurable: true } };
    prototypeAccessors.canUndo.get = function () {
        return this.undoStack.length > 0;
    };
    prototypeAccessors.undoLabel.get = function () {
        return this.undoStack[this.undoStack.length - 1].label();
    };
    UndoRedoStackMixin.prototype.undo = function undo () {
        var command = this.undoStack[this.undoStack.length - 1];
        this.undoStack = this.undoStack.slice(0, this.undoStack.length - 1);
        this.redoStack.push(command);
        command.undo();
    };
    prototypeAccessors.canRedo.get = function () {
        return this.redoStack.length > 0;
    };
    prototypeAccessors.redoLabel.get = function () {
        return this.redoStack[this.redoStack.length - 1].label();
    };
    prototypeAccessors.dirty.get = function () {
        if (this.saved === null) {
            return this.undoStack.length !== 0;
        }
        else {
            return this.undoStack[this.undoStack.length - 1] !== this.saved;
        }
    };
    UndoRedoStackMixin.prototype.redo = function redo () {
        var command = this.redoStack[this.redoStack.length - 1];
        this.redoStack = this.redoStack.slice(0, this.redoStack.length - 1);
        this.undoStack.push(command);
        command.redo(false);
    };
    UndoRedoStackMixin.prototype.execute = function execute (command) {
        command.redo(true);
        this.redoStack = [];
        this.undoStack.push(command);
    };
    UndoRedoStackMixin.prototype.markSaved = function markSaved () {
        this.saved = this.undoStack[this.undoStack.length - 1];
    };
    UndoRedoStackMixin.prototype.reset = function reset () {
        this.undoStack = [];
        this.redoStack = [];
        this.saved = null;
    };

    Object.defineProperties( UndoRedoStackMixin.prototype, prototypeAccessors );

    return UndoRedoStackMixin;
}(Vue));
UndoRedoStackMixin = __decorate([
    Component({})
], UndoRedoStackMixin);
var UndoRedoStackMixin$1 = UndoRedoStackMixin;

/**
 * This mixin provide easy access to the nearest undo redo stack in the ancestor chain of components that incorporate it.
 */
var UndoRedoClientMixin = /*@__PURE__*/(function (Vue) {
    function UndoRedoClientMixin () {
        Vue.apply(this, arguments);
    }

    if ( Vue ) UndoRedoClientMixin.__proto__ = Vue;
    UndoRedoClientMixin.prototype = Object.create( Vue && Vue.prototype );
    UndoRedoClientMixin.prototype.constructor = UndoRedoClientMixin;

    var prototypeAccessors = { undoRedoStack: { configurable: true } };

    prototypeAccessors.undoRedoStack.get = function () {
        return this.getAncestorWithProperty("isUndoRedoStack");
    };
    UndoRedoClientMixin.prototype.getAncestorWithProperty = function getAncestorWithProperty (propertyName) {
        var comp = this;
        do {
            if (propertyName in comp["_data"])
                { break; }
            else
                { comp = comp.$parent; }
        } while (comp);
        return comp;
    };

    Object.defineProperties( UndoRedoClientMixin.prototype, prototypeAccessors );

    return UndoRedoClientMixin;
}(Vue));
UndoRedoClientMixin = __decorate([
    Component({})
], UndoRedoClientMixin);
var UndoRedoClientMixin$1 = UndoRedoClientMixin;

export { UndoRedoClientMixin$1 as UndoRedoClientMixin, UndoRedoStackMixin$1 as UndoRedoStackMixin };
