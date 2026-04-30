"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding database...');
    const org1 = await prisma.organization.create({
        data: { name: 'Acme Corp' }
    });
    const org2 = await prisma.organization.create({
        data: { name: 'Globex Inc' }
    });
    console.log(`Created Organizations: ${org1.name}, ${org2.name}`);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash('password123', salt);
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@acmecorp.com',
            name: 'Admin User',
            passwordHash,
            role: 'ADMIN',
            organizationId: org1.id
        }
    });
    const memberUser = await prisma.user.create({
        data: {
            email: 'member@globex.com',
            name: 'Standard Member',
            passwordHash,
            role: 'MEMBER',
            organizationId: org2.id
        }
    });
    console.log(`Created Users: ${adminUser.email}, ${memberUser.email}`);
    await prisma.contact.createMany({
        data: [
            { name: 'Alice Johnson', email: 'alice@example.com', pipelineStage: 'Lead', organizationId: org1.id },
            { name: 'Bob Smith', email: 'bob@example.com', pipelineStage: 'Customer', organizationId: org1.id },
            { name: 'Charlie Davis', email: 'charlie@example.com', pipelineStage: 'Negotiation', organizationId: org2.id }
        ]
    });
    console.log('Created Contacts');
    await prisma.subscription.create({
        data: {
            organizationId: org1.id,
            plan: 'PRO',
            status: 'active'
        }
    });
    await prisma.subscription.create({
        data: {
            organizationId: org2.id,
            plan: 'STARTER',
            status: 'active'
        }
    });
    console.log('Created Subscriptions');
    console.log('Database seeded successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map