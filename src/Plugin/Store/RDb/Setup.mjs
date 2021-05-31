class Fl32_Ap_Plugin_Store_RDb_Setup {
    constructor(spec) {
        const {
            /** @function {@type TeqFw_Core_App_Back_Util_RDb.nameFK} */
            nameFK,
            /** @function {@type TeqFw_Core_App_Back_Util_RDb.nameNX} */
            nameNX,
            /** @function {@type TeqFw_Core_App_Back_Util_RDb.nameUQ} */
            nameUQ
        } = spec['TeqFw_Core_App_Back_Util_RDb']; // ES6 module destructing

        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr} */
        const EAttr = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value} */
        const EAttrValue = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Datetime} */
        const EAttrValueDatetime = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Datetime#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Dec} */
        const EAttrValueDec = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Dec#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Int} */
        const EAttrValueInt = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Int#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text} */
        const EAttrValueText = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text_I18n} */
        const EAttrValueTextI18n = spec['Fl32_Ap_Back_Store_RDb_Schema_Attr_Value_Text_I18n#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Card} */
        const EProdCard = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Card#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Card_Attr_Value} */
        const EProdCardAttrValue = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Card_Attr_Value#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Unit} */
        const EProdUnit = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Unit#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Attr_Value} */
        const EProdUnitAttrValue = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Attr_Value#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price} */
        const EProdUnitPrice = spec['Fl32_Ap_Back_Store_RDb_Schema_Product_Unit_Price#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Price_List} */
        const EPriceList = spec['Fl32_Ap_Back_Store_RDb_Schema_Price_List#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Sale} */
        const ESale = spec['Fl32_Ap_Back_Store_RDb_Schema_Sale#']; // class
        /** @type {typeof Fl32_Ap_Back_Store_RDb_Schema_Sale_Item} */
        const ESaleItem = spec['Fl32_Ap_Back_Store_RDb_Schema_Sale_Item#']; // class
        /** @type {typeof Fl32_Ap_User_Back_Store_RDb_Schema_User} */
        const EUser = spec['Fl32_Ap_User_Back_Store_RDb_Schema_User#']; // class


        /**
         * TODO: tables drop should be ordered according to relations between tables (DEM).
         * For the moment I use levels for drop: N, ..., 2, 1, 0.
         *
         * @param schemaBuilder
         */
        this.dropTables0 = function (schemaBuilder) {
            schemaBuilder.dropTableIfExists(EAttr.ENTITY);
            schemaBuilder.dropTableIfExists(EProdCard.ENTITY);
        };
        this.dropTables1 = function (schemaBuilder) {
            /* drop related tables (foreign keys) */
            schemaBuilder.dropTableIfExists(EProdCardAttrValue.ENTITY);
            schemaBuilder.dropTableIfExists(EProdUnitAttrValue.ENTITY);
            schemaBuilder.dropTableIfExists(EAttrValueTextI18n.ENTITY);
            schemaBuilder.dropTableIfExists(EAttrValueText.ENTITY);
            schemaBuilder.dropTableIfExists(EAttrValueDatetime.ENTITY);
            schemaBuilder.dropTableIfExists(EAttrValueDec.ENTITY);
            schemaBuilder.dropTableIfExists(EAttrValueInt.ENTITY);
            schemaBuilder.dropTableIfExists(EAttrValue.ENTITY);
            schemaBuilder.dropTableIfExists(EProdUnitPrice.ENTITY);
            schemaBuilder.dropTableIfExists(EPriceList.ENTITY);
            schemaBuilder.dropTableIfExists(ESaleItem.ENTITY);
            schemaBuilder.dropTableIfExists(EProdUnit.ENTITY);
            schemaBuilder.dropTableIfExists(ESale.ENTITY);
        };

        /**
         * Upgrade database structure (drop/create tables).
         *
         * @param knex
         * @param {SchemaBuilder} schemaBuilder
         */
        this.createStructure = function (knex, schemaBuilder) {

            // DEFINE INNER FUNCTIONS

            function createTblAttr(schemaBuilder, knex) {
                schemaBuilder.createTable(EAttr.ENTITY, (table) => {
                    table.increments(EAttr.A_ID);
                    table.string(EAttr.A_CODE).notNullable()
                        .comment('Unique code for attribute.');
                    table.dateTime(EAttr.A_DATE_CREATED).notNullable().defaultTo(knex.fn.now())
                        .comment('Date-time for registration of the attribute.');
                    table.enu(EAttr.A_TYPE, [
                        EAttr.DATA_TYPE_DATETIME,
                        EAttr.DATA_TYPE_DECIMAL,
                        EAttr.DATA_TYPE_INTEGER,
                        EAttr.DATA_TYPE_OPTION,
                        EAttr.DATA_TYPE_TEXT,
                    ]).notNullable()
                        .comment('Attribute type (decimal, string, option, ...).');
                    table.unique(EAttr.A_CODE, nameUQ(EAttr.ENTITY, EAttr.A_CODE));
                    table.comment('Attributes registry.');
                });
            }

            function createTblAttrValue(schemaBuilder, knex) {
                schemaBuilder.createTable(EAttrValue.ENTITY, (table) => {
                    table.increments(EAttrValue.A_ID);
                    table.integer(EAttrValue.A_ATTR_REF).unsigned().notNullable()
                        .comment('Reference to attribute.');
                    table.foreign(EAttrValue.A_ATTR_REF).references(EAttr.A_ID).inTable(EAttr.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(EAttrValue.ENTITY, EAttrValue.A_ATTR_REF, EAttr.ENTITY, EAttr.A_ID));
                    table.comment('Registry for attribute values.');
                });
            }

            function createTblAttrValueDatetime(schemaBuilder, knex) {
                schemaBuilder.createTable(EAttrValueDatetime.ENTITY, (table) => {
                    table.integer(EAttrValueDatetime.A_VALUE_REF).unsigned().notNullable()
                        .comment('Reference to value.');
                    table.text(EAttrValueDatetime.A_VALUE).notNullable()
                        .comment('Value for datetime attribute.');
                    table.primary([EAttrValueDatetime.A_VALUE_REF]);
                    table.foreign(EAttrValueDatetime.A_VALUE_REF).references(EAttrValue.A_ID).inTable(EAttrValue.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(
                            EAttrValueDatetime.ENTITY, EAttrValueDatetime.A_VALUE_REF, EAttrValue.ENTITY, EAttrValue.A_ID
                        ));
                    table.comment('Values for datetime attributes.');
                });
            }

            function createTblAttrValueDec(schemaBuilder, knex) {
                schemaBuilder.createTable(EAttrValueDec.ENTITY, (table) => {
                    table.integer(EAttrValueDec.A_VALUE_REF).unsigned().notNullable()
                        .comment('Reference to value.');
                    table.text(EAttrValueDec.A_VALUE).notNullable()
                        .comment('Value for decimal attribute.');
                    table.primary([EAttrValueDec.A_VALUE_REF]);
                    table.foreign(EAttrValueDec.A_VALUE_REF).references(EAttrValue.A_ID).inTable(EAttrValue.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(
                            EAttrValueDec.ENTITY, EAttrValueDec.A_VALUE_REF, EAttrValue.ENTITY, EAttrValue.A_ID
                        ));
                    table.comment('Values for decimal attributes.');
                });
            }

            function createTblAttrValueInt(schemaBuilder, knex) {
                schemaBuilder.createTable(EAttrValueInt.ENTITY, (table) => {
                    table.integer(EAttrValueInt.A_VALUE_REF).unsigned().notNullable()
                        .comment('Reference to value.');
                    table.text(EAttrValueInt.A_VALUE).notNullable()
                        .comment('Value for decimal attribute.');
                    table.primary([EAttrValueInt.A_VALUE_REF]);
                    table.foreign(EAttrValueInt.A_VALUE_REF).references(EAttrValue.A_ID).inTable(EAttrValue.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(
                            EAttrValueInt.ENTITY, EAttrValueInt.A_VALUE_REF, EAttrValue.ENTITY, EAttrValue.A_ID
                        ));
                    table.comment('Values for decimal attributes.');
                });
            }

            function createTblAttrValueText(schemaBuilder, knex) {
                schemaBuilder.createTable(EAttrValueText.ENTITY, (table) => {
                    table.integer(EAttrValueText.A_VALUE_REF).unsigned().notNullable()
                        .comment('Reference to value.');
                    table.text(EAttrValueText.A_VALUE).notNullable()
                        .comment('Default value for text attribute.');
                    table.primary([EAttrValueText.A_VALUE_REF]);
                    table.foreign(EAttrValueText.A_VALUE_REF).references(EAttrValue.A_ID).inTable(EAttrValue.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(
                            EAttrValueText.ENTITY, EAttrValueText.A_VALUE_REF, EAttrValue.ENTITY, EAttrValue.A_ID
                        ));
                    table.comment('Text attributes values (defaults).');
                });
            }

            function createTblAttrValueTextI18n(schemaBuilder, knex) {
                schemaBuilder.createTable(EAttrValueTextI18n.ENTITY, (table) => {
                    table.string(EAttrValueTextI18n.A_LANG).notNullable()
                        .comment('Language code by IANA registry (az-Latn).');
                    table.integer(EAttrValueTextI18n.A_VALUE_REF).unsigned().notNullable()
                        .comment('Reference to default value.');
                    table.text(EAttrValueTextI18n.A_TRANSLATION).notNullable()
                        .comment('Translation for default value..');
                    table.foreign(EAttrValueTextI18n.A_VALUE_REF)
                        .references(EAttrValueText.A_VALUE_REF).inTable(EAttrValueText.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(
                            EAttrValueTextI18n.ENTITY,
                            EAttrValueTextI18n.A_VALUE_REF,
                            EAttrValueText.ENTITY,
                            EAttrValueText.A_VALUE_REF
                        ));
                    table.comment('Translations for default values of text attributes.');
                });
            }

            function createTblProdCard(schemaBuilder, knex) {
                schemaBuilder.createTable(EProdCard.ENTITY, (table) => {
                    table.increments(EProdCard.A_ID);
                    table.dateTime(EProdCard.A_DATE_CREATED).notNullable().defaultTo(knex.fn.now())
                        .comment('Date-time for registration of the product card.');
                    table.enu(EProdCard.A_TYPE, [
                        EProdCard.DATA_TYPE_DRAFT,
                        EProdCard.DATA_TYPE_SIMPLE,
                    ]).notNullable().defaultTo(EProdCard.DATA_TYPE_SIMPLE)
                        .comment('Product type (simple, grouped, configurable, ...).');
                    table.comment('Product cards registry.');
                });
            }

            function createTblProdCardAttrValue(schemaBuilder, knex) {
                schemaBuilder.createTable(EProdCardAttrValue.ENTITY, (table) => {
                    table.integer(EProdCardAttrValue.A_CARD_REF).unsigned().notNullable()
                        .comment('Reference to the product card.');
                    table.integer(EProdCardAttrValue.A_VALUE_REF).unsigned().notNullable()
                        .comment('Reference to the attribute value.');
                    table.primary([EProdCardAttrValue.A_CARD_REF, EProdCardAttrValue.A_VALUE_REF]);
                    table.foreign(EProdCardAttrValue.A_CARD_REF)
                        .references(EProdCard.A_ID).inTable(EProdCard.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(
                            EProdCardAttrValue.ENTITY, EProdCardAttrValue.A_CARD_REF,
                            EProdCard.ENTITY, EProdCard.A_ID
                        ));
                    table.foreign(EProdCardAttrValue.A_VALUE_REF)
                        .references(EAttrValue.A_ID).inTable(EAttrValue.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(
                            EProdCardAttrValue.ENTITY, EProdCardAttrValue.A_VALUE_REF,
                            EAttrValue.ENTITY, EAttrValue.A_ID
                        ));
                    table.comment("Relations between product card and it''s attributes values.");
                });
            }

            function createTblProdUnit(schemaBuilder, knex) {
                schemaBuilder.createTable(EProdUnit.ENTITY, (table) => {
                    table.increments(EProdUnit.A_ID);
                    table.integer(EProdUnit.A_CARD_REF).unsigned().notNullable()
                        .comment('Reference to product card with name & description.');
                    table.string(EProdUnit.A_SKU).notNullable()
                        .comment('Stock-keeping unit number.');
                    table.unique(EProdUnit.A_SKU, nameUQ(EProdUnit.ENTITY, EProdUnit.A_SKU));
                    table.foreign(EProdUnit.A_CARD_REF).references(EProdCard.A_ID).inTable(EProdCard.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(EProdUnit.ENTITY, EProdUnit.A_CARD_REF, EProdCard.ENTITY, EProdCard.A_ID));
                    table.comment('Simple product with unique SKU.');
                });
            }

            function createTblProdUnitAttrValue(schemaBuilder, knex) {
                schemaBuilder.createTable(EProdUnitAttrValue.ENTITY, (table) => {
                    table.integer(EProdUnitAttrValue.A_UNIT_REF).unsigned().notNullable()
                        .comment('Reference to the product unit.');
                    table.integer(EProdUnitAttrValue.A_VALUE_REF).unsigned().notNullable()
                        .comment('Reference to the attribute value.');
                    table.primary([EProdUnitAttrValue.A_UNIT_REF, EProdUnitAttrValue.A_VALUE_REF]);
                    table.foreign(EProdUnitAttrValue.A_UNIT_REF)
                        .references(EProdUnit.A_ID).inTable(EProdUnit.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(
                            EProdUnitAttrValue.ENTITY, EProdUnitAttrValue.A_UNIT_REF,
                            EProdUnit.ENTITY, EProdUnit.A_ID
                        ));
                    table.foreign(EProdUnitAttrValue.A_VALUE_REF)
                        .references(EAttrValue.A_ID).inTable(EAttrValue.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(
                            EProdUnitAttrValue.ENTITY, EProdUnitAttrValue.A_VALUE_REF,
                            EAttrValue.ENTITY, EAttrValue.A_ID
                        ));
                    table.comment("Relations between product unit and it''s attributes values.");
                });
            }

            function createTblProdUnitPrice(schemaBuilder, knex) {
                schemaBuilder.createTable(EProdUnitPrice.ENTITY, (table) => {
                    table.integer(EProdUnitPrice.A_UNIT_REF).unsigned().notNullable()
                        .comment('Reference to the product unit.');
                    table.integer(EProdUnitPrice.A_LIST_REF).unsigned().notNullable()
                        .comment('Reference to the price list.');
                    table.decimal(EProdUnitPrice.A_PRICE, 20, 6).unsigned().notNullable()
                        .comment('Price value in the currency of the price list.');
                    table.primary([EProdUnitPrice.A_LIST_REF, EProdUnitPrice.A_UNIT_REF]);
                    table.foreign(EProdUnitPrice.A_LIST_REF)
                        .references(EPriceList.A_ID).inTable(EPriceList.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(
                            EProdUnitPrice.ENTITY, EProdUnitPrice.A_LIST_REF,
                            EPriceList.ENTITY, EPriceList.A_ID
                        ));
                    table.foreign(EProdUnitPrice.A_UNIT_REF)
                        .references(EProdUnit.A_ID).inTable(EProdUnit.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(
                            EProdUnitPrice.ENTITY, EProdUnitPrice.A_UNIT_REF,
                            EProdUnit.ENTITY, EProdUnit.A_ID
                        ));
                    table.comment('Price for the product unit in the list of prices.');
                });
            }

            function createTblProdUnitPriceList(schemaBuilder, knex) {
                schemaBuilder.createTable(EPriceList.ENTITY, (table) => {
                    table.increments(EPriceList.A_ID);
                    table.string(EPriceList.A_NAME).notNullable()
                        .comment('Name for the price list.');
                    table.string(EPriceList.A_CURRENCY).notNullable()
                        .comment('Currency for the price list.');
                    table.unique(
                        EPriceList.A_NAME,
                        nameUQ(EPriceList.ENTITY, EPriceList.A_NAME)
                    );
                    table.comment('Price list can be bound to group, store, date range, etc.');
                });
            }

            function createTblSale(schemaBuilder, knex) {
                schemaBuilder.createTable(ESale.ENTITY, (table) => {
                    table.increments(ESale.A_ID);
                    table.integer(ESale.A_USER_REF).unsigned().notNullable()
                        .comment('Reference to user that created the sale.');
                    table.dateTime(ESale.A_DATE_CREATED).notNullable().defaultTo(knex.fn.now())
                        .comment('Date-time for sale registration.');
                    table.dateTime(ESale.A_DATE_RECEIVING).notNullable().defaultTo(knex.fn.now())
                        .comment('Date-time for sale receiving.');
                    table.enu(ESale.A_STATE, [
                        ESale.DATA_STATE_NEW,
                        ESale.DATA_STATE_COLLECTED,
                        ESale.DATA_STATE_COMPLETE,
                        ESale.DATA_STATE_CANCELLED,
                    ]).notNullable()
                        .comment('Current state of the sale order.');
                    table.decimal(ESale.A_AMOUNT_TOTAL, 20, 6).unsigned().notNullable()
                        .comment('Total amount of the sale order.');
                    table.string(ESale.A_CURRENCY).notNullable()
                        .comment('Currency for the sale order.');
                    table.foreign(ESale.A_USER_REF).references(EUser.A_ID).inTable(EUser.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(ESale.ENTITY, ESale.A_USER_REF, EUser.ENTITY, EUser.A_ID));
                    table.comment('Registry for sales orders.');
                });
            }

            function createTblSaleItem(schemaBuilder, knex) {
                schemaBuilder.createTable(ESaleItem.ENTITY, (table) => {
                    table.increments(ESaleItem.A_ID);
                    table.integer(ESaleItem.A_SALE_REF).unsigned().notNullable()
                        .comment('Reference to the sale.');
                    table.integer(ESaleItem.A_UNIT_REF).unsigned().notNullable()
                        .comment('Reference to the product unit.');
                    table.integer(ESaleItem.A_QTY).unsigned().notNullable()
                        .comment('Product unit quantity.');
                    table.decimal(ESaleItem.A_UNIT_PRICE, 20, 6).unsigned().notNullable()
                        .comment('Product unit price.');
                    table.decimal(ESale.A_AMOUNT_TOTAL, 20, 6).unsigned().notNullable()
                        .comment('Total amount of the sale item.');
                    table.foreign(ESaleItem.A_SALE_REF).references(ESale.A_ID).inTable(ESale.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(ESaleItem.ENTITY, ESaleItem.A_SALE_REF, ESale.ENTITY, ESale.A_ID));
                    table.foreign(ESaleItem.A_UNIT_REF).references(EProdUnit.A_ID).inTable(EProdUnit.ENTITY)
                        .onDelete('CASCADE').onUpdate('CASCADE')
                        .withKeyName(nameFK(ESaleItem.ENTITY, ESaleItem.A_UNIT_REF, EProdUnit.ENTITY, EProdUnit.A_ID));
                    table.comment('Registry for sales orders.');
                });
            }


            // MAIN FUNCTIONALITY
            // compose queries to create main tables (registries)
            createTblAttr(schemaBuilder, knex);
            createTblProdCard(schemaBuilder, knex);
            // compose queries to create additional tables (relations and details)
            createTblAttrValue(schemaBuilder, knex);
            createTblAttrValueDatetime(schemaBuilder, knex);
            createTblAttrValueDec(schemaBuilder, knex);
            createTblAttrValueInt(schemaBuilder, knex);
            createTblAttrValueText(schemaBuilder, knex);
            createTblAttrValueTextI18n(schemaBuilder, knex);
            createTblProdCardAttrValue(schemaBuilder, knex);
            createTblProdUnit(schemaBuilder, knex);
            createTblProdUnitAttrValue(schemaBuilder, knex);
            createTblProdUnitPriceList(schemaBuilder, knex);
            createTblProdUnitPrice(schemaBuilder, knex);
            createTblSale(schemaBuilder, knex);
            createTblSaleItem(schemaBuilder, knex);
        };
    }
}

export default Fl32_Ap_Plugin_Store_RDb_Setup;
