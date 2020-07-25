import Model from '../Schema'
import Class from '../Class/Class'
import Users from '../Users/Users'
export default class User_Class extends Model {
    static get tableName() {
        return 'User_Class'
    }
    static get idColumn() {
        return 'ID'
    }
    // To do validate 
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                ID: {
                    type: 'integer'
                },
                User_Id: {
                    type: 'integer'
                },
                Class_Id: {
                    type: 'integer'
                }
            },
        }
    }
    static get relationMappings() {
        return {
            users: {
                relation: Model.HasOneRelation,
                modelClass: Users,
                join: {
                    from: 'User_Class.User_Id',
                    to: 'Users.ID'
                }
            },
            class: {
                relation: Model.HasOneRelation,
                modelClass: Class,
                join: {
                    from: 'User_Class.Class_Id',
                    to: 'Class.ID'
                }
            }
        }
    }
}