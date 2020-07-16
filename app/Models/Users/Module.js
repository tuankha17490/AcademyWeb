import Model from '../Schema' 
import Permissions from './Permission'
export default class Modules extends Model {
    static get tableName() {
        return 'Modules'
    }
    static get idColumn() {
        return 'ID'
    }
    static get relationMappings() {
        return {
            permission: {
                relation: Model.HasOneRelation,
                modelClass: Permissions,
                join: {
                    from: 'Modules.ID',
                    to: 'Permissions.Module_Id'
                }
            }
        }
    }
}