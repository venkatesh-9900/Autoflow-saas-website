import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Create Organizations
    const org1 = await prisma.organization.create({
        data: { name: 'Acme Corp' }
    });

    const org2 = await prisma.organization.create({
        data: { name: 'Globex Inc' }
    });

    console.log(`Created Organizations: ${org1.name}, ${org2.name}`);

    // Create Users
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

    // Create Contacts
    await prisma.contact.createMany({
        data: [
            { name: 'Alice Johnson', email: 'alice@example.com', pipelineStage: 'Lead', organizationId: org1.id },
            { name: 'Bob Smith', email: 'bob@example.com', pipelineStage: 'Customer', organizationId: org1.id },
            { name: 'Charlie Davis', email: 'charlie@example.com', pipelineStage: 'Negotiation', organizationId: org2.id }
        ]
    });

    console.log('Created Contacts');

    // Create Subscriptions
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
