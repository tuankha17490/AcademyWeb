import Model from '../Schema'
import Class from './Class'
export default class Subject extends Model {
    static get tableName() {
        return 'Subject'
    }
    static get idColumn() {
        return 'id'
    }
    // Modifiers are reusable query snippets that can be used in various places.
    static get Modifier() {
        return {
            searchByName(query, name) {
                // ......
            }
        }
    }
    // To do validate 
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['Name'],
            properties: {
                id: {
                    type: 'integer'
                },
                Name: {
                    type: "string",
                    minLength: 1,
                    maxLength: 255
                },
                
            },
        }
    }
    static get relationMappings() {

        return {
            class: {
                relation: Model.HasManyRelation,
                modelClass: Class,
                join: {
                    from: 'Subject.ID',
                    to: 'Class.Subject_Id'
                }
            }
        }
    }
}