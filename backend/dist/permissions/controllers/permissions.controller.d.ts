/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { PermisstionsService } from '../services/permisstions.service';
import { PermisstionsDTO } from '../dto/permisstions.dto';
export declare class PermisstionsController {
    private readonly permisstionsService;
    constructor(permisstionsService: PermisstionsService);
    createRole(roleDto: PermisstionsDTO): Promise<import("../schema/permisstion.schema").PermisstionDocument>;
    findAll(pagination: any, filter: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../schema/permisstion.schema").PermisstionDocument> & import("../schema/permisstion.schema").Permisstion & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        paginations: {
            page: any;
            pageSize: any;
            total: number;
            totalPage: number;
        };
        messenger: string;
    }>;
    findRoleById(id: string): Promise<import("../schema/permisstion.schema").PermisstionDocument>;
    updateRole(id: string, roleDto: PermisstionsDTO): Promise<import("../schema/permisstion.schema").PermisstionDocument>;
    deleteRole(id: string): Promise<import("../schema/permisstion.schema").PermisstionDocument>;
}
