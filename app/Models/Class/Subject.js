import Model from '../Schema'
import Class from './Class'
import Users from '../Users/Users'
export default class Subject extends Model {
    static get tableName() {
        return 'Subject'
    }
    static get idColumn() {
        return 'ID'
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
                ID: {
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
            },
            users: {
                relation: Model.HasManyRelation,
                modelClass: Users,
                join: {
                    from: 'Subject.ID',
                    to: 'Users.Subject_Id'
                }
            }
        }
    }
}