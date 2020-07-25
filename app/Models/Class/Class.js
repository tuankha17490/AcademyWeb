import Model from '../Schema'
import Users from '../Users/Users'
import Subject from './Subject'
import Post from './Post'
import User_Class from './User_Class'
import { raw } from 'objection'
export default class Class extends Model {
    static get tableName() {
        return 'Class'
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
    async $beforeInsert() {
        this.created_at = new Date()
        this.updated_at = new Date()
    }

    async $beforeUpdate() {
        this.updated_at = new Date()
    }
    async $afterInsert() {
        await Subject.query().where({ID: this.Subject_Id}).patch({ClassAmount: raw('ClassAmount + 1')})
    }
    // To do validate 
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['Name', 'Detail'],
            properties: {
                ID: {
                    type: 'integer'
                },
                Name: {
                    type: "string",
                    minLength: 1,
                    maxLength: 255
                },
                Detail: {
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
                relation: Model.ManyToManyRelation,
                modelClass: Users,
                join: {
                    from: 'Class.ID',
                    through: {
                        from: 'User_Class.Class_Id',
                        to: 'User_Class.User_Id'
                    },
                    to: 'Users.ID'
                }
            },
            subject: {
                relation: Model.HasOneRelation,
                modelClass: Subject,
                join: {
                    from: 'Class.Subject_Id',
                    to: 'Subject.ID'
                }
            },
            post: {
                relation: Model.HasManyRelation,
                modelClass: Post,
                join: {
                    from: 'Class.ID',
                    to: 'Post.Class_Id'
                }
            },
            user_class: {
                relation: Model.HasManyRelation,
                modelClass: User_Class,
                join: {
                    from: 'Class.ID',
                    to: 'User_Class.Class_Id'
                }
            }
        }
    }
}