"use strict";

class Field {

    constructor(scene, fieldName, fieldSize) {
        this.scene = scene;
        this.fieldName = fieldName;
        this.viewObject = "";
        this.controller = new FieldController();
        this.controller.generateField(fieldSize);
    }

    renderField() {

        let field = this.controller.getField();

        let viewObject = $('<table id="' + this.fieldName + '"></table>');

        viewObject.append(this.generateColumnHeader(field));

        Object.keys(field).forEach(function (key) {
            let viewRow = $('<tr class="' + Field.FIELD_ROW_CLASS + '" aria-rowindex="' + key + '"></tr>');

            viewRow.prepend('<th class="' + Field.ROW_HEADER_CLASS + '">' + key + '</th>');

            Object.keys(field[key]).forEach(function (subkey) {

                let viewCell = $('<td class="' + Field.FIELD_CELL_CLASS + '" aria-colindex="' + subkey + '"></td>');

                viewRow.append(viewCell);
            });

            viewObject.append(viewRow);
        });

        this.viewObject = viewObject;
        this.scene.append(viewObject);
        this.registerCallbacks(this);
    };

    registerCallbacks(context) {

        let fieldNameId = "#" + this.fieldName;
        let fieldRowClass = fieldNameId + " ." + Field.FIELD_ROW_CLASS;
        let fieldCellClass = fieldRowClass + " ." + Field.FIELD_CELL_CLASS;

        $(document).on("click", fieldCellClass, function () {
            context.onCellClick($(this), context.viewObject);
        });
    }

    generateColumnHeader(field) {
        let columnHeader = $('<tr class="' + Field.COLUMN_HEADER_ROW_CLASS + '"><th>\\</th></tr>');

        Object.keys(field[0]).forEach(function (key) {
            columnHeader.append('<th>' + key + '</th>');
        });

        return columnHeader;
    }

    //CALLBACKS

    onCellClick(element, view) {
        element.html("123");
        console.log(element);
        console.log(view);
    }

}

Field.FIELD_ROW_CLASS = "fieldRow";
Field.FIELD_CELL_CLASS = "fieldCell";
Field.ROW_HEADER_CLASS = "rowHeader";
Field.COLUMN_HEADER_CLASS = "columnHeader";
Field.COLUMN_HEADER_ROW_CLASS = "columnHeaderRow";
