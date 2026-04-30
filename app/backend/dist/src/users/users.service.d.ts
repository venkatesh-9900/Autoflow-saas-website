import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getMe(userId: string): Promise<{
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
    updateOnboardingStep(orgId: string, step: number): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        onboardingStep: number;
    }>;
}
