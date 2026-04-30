import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(req: any): Promise<{
        organization: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            onboardingStep: number;
        };
    } & {
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        passwordHash: string;
        role: import("@prisma/client").$Enums.Role;
        organizationId: string;
    }>;
    updateOnboarding(req: any, step: number): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        onboardingStep: number;
    }>;
}
