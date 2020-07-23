import Model from '../Schema'
import Roles from './Roles'
import Class from '../Class/Class'
import Post from '../Class/Post'
import Subject from '../Class/Subject'
export default class Users extends Model {
    static get tableName() {
        return 'Users'
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
            required: ['Email', 'Password'],
            properties: {
                ID: {
                    type: 'integer'
                },
                Email: {
                    type: "string",
                    format: "email"
                },
                Password: {
                    type: "string",
                    minLength: 6
                },
                Name: {
                    type: "string",
                    minLength: 1,
                    maxLength: 255
                },
                Gender: {
                    type: "boolean",
                },
                Avatar: {
                    type: "string"
                },
            },
        }
    }
    static get relationMappings() {

        return {
            roles: {
                relation: Model.HasOneRelation,
                modelClass: Roles,
                join: {
                    from: 'Users.Role_Id',
                    to: 'Roles.ID'
                }
            },
            class: {
                relation: Model.ManyToManyRelation,
                modelClass: Class,
                join: {
                    from: 'Users.ID',
                    through: {
                        from: 'User_Class.User_Id',
                        to: 'User_Class.Class_Id'
                    },
                    to: 'Class.ID'
                }
            },
            post: {
                relation: Model.HasManyRelation,
                modelClass: Post,
                join: {
                    from: 'Users.ID',
                    to: 'Post.User_Id'
                }
            },
            subject: {
                relation: Model.HasOneRelation,
                modelClass: Subject,
                join: {
                    from: 'Users.Subject_Id',
                    to: 'Subject.ID'
                }
            }
        }
    }
}