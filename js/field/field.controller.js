"use strict";

class FieldController {

    constructor() {
        this.field = {};
    }

    generateField(size) {
        for (let i = 0; i < size; i++) {
            this.field[i] = {};
            for (let j = 0; j < size; j++) {
                this.field[i][FieldController.LITERALS.charAt(j)] = FieldController.EMPTY_FIELD;
            }
        }
    }

    setFieldValue(key, value, callback) {
        this.field[key.substr(1)][key.charAt(0)] = value;
        callback(key, value, this.field);
    };

    getFieldValue(key, callback) {
        let value = this.field[key.substr(1)][key.charAt(0)];
        callback(key, value, this.field);
    };

     getField() {
        return this.field;
    }

}

//static fields(THIS IS SICK!)
FieldController.EMPTY_FIELD = 0;
FieldController.HIDDEN_FIELD = 1;
FieldController.FILLED_FIELD = 2;
FieldController.DESTROYED_FIELD = 3;
FieldController.LITERALS = 'ABCDEFGHIJKLMNOPQRSTVXYZ';
