import Model from '../Schema' 
import Permissions from './Permission'
export default class Methods extends Model {
    static get tableName() {
        return 'Methods'
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
                    from: 'Methods.ID',
                    to: 'Permissions.Method_Id'
                }
            }
        }
    }
}
