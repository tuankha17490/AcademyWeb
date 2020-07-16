import Model from '../Schema'
import Class from './Class'
import Users from '../Users/Users'
export default class Post extends Model {
    static get tableName() {
        return 'Post'
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
            required: ['Name', 'Detail'],
            properties: {
                id: {
                    type: 'integer'
                },
                Title: {
                    type: "string",
                    minLength: 1,
                    maxLength: 50
                },
                Content: {
                    type: "string",
                    minLength: 1,
                    maxLength: 255
                },
            },
        }
    }
    static get relationMappings() {

        return {
            users: {
                relation: Model.HasOneRelation,
                modelClass: Users,
                join: {
                    from: 'Post.User_Id',
                    to: 'Users.ID'
                }
            },
            class: {
                relation: Model.HasOneRelation,
                modelClass: Class,
                join: {
                    from: 'Post.Class_Id',
                    to: 'Class.ID'
                }
            }
        }
    }
}