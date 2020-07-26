import Model from '../Schema'
import Class from './Class'
import Users from '../Users/Users'
import { raw } from 'objection'
export default class Post extends Model {
    static get tableName() {
        return 'Post'
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
       await Class.query().where({ID: this.Class_Id}).patch({PostAmount: raw('PostAmount + 1')})
    }
    // To do validate 
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['Title', 'Content'],
            properties: {
                ID: {
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