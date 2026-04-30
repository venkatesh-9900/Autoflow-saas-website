import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostStatus } from '@prisma/client';

@Injectable()
export class InstagramService {
  constructor(private prisma: PrismaService) {}

  async handleWebhook(payload: any) {
    // Logic to handle Instagram DMs/Comments webhooks
    console.log('Instagram Webhook received:', payload);
    return { status: 'success' };
  }

  async sendDirectMessage(
    recipientId: string,
    content: string,
    organizationId: string,
  ) {
    // Logic to send DM via Meta Graph API
    console.log(`Sending Instagram DM to ${recipientId}: ${content}`);

    return this.prisma.message.create({
      data: {
        channel: 'INSTAGRAM',
        to: recipientId,
        content,
        organizationId,
        status: 'SENT',
      },
    });
  }

  async createPost(
    organizationId: string,
    data: {
      integrationId: string;
      caption?: string;
      mediaAssetIds: string[];
      scheduledFor?: string;
      platforms?: any[];
    },
  ) {
    if (!data.mediaAssetIds || data.mediaAssetIds.length === 0) {
      throw new BadRequestException(
        'At least one media asset is required for a post',
      );
    }

    const scheduledTime = data.scheduledFor
      ? new Date(data.scheduledFor)
      : null;
    const status = scheduledTime ? PostStatus.SCHEDULED : PostStatus.DRAFT;

    const post = await this.prisma.socialPost.create({
      data: {
        organizationId,
        integrationId: data.integrationId,
        caption: data.caption,
        scheduledFor: scheduledTime,
        status,
        platforms: data.platforms || ['INSTAGRAM'],
        mediaAssets: {
          create: data.mediaAssetIds.map((mediaAssetId, index) => ({
            mediaAssetId,
            orderIndex: index,
          })),
        },
      },
      include: { mediaAssets: { include: { mediaAsset: true } } },
    });

    return post;
  }

  async getPosts(organizationId: string) {
    return this.prisma.socialPost.findMany({
      where: { organizationId },
      include: { mediaAssets: { include: { mediaAsset: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async syncPostMetrics(postId: string) {
    const post = await this.prisma.socialPost.findUnique({
      where: { id: postId },
    });
    if (!post || post.status !== PostStatus.PUBLISHED || !post.externalPostId)
      return null;

    // Mock fetching from Meta Graph API
    const mockMetrics = {
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 50),
      reach: Math.floor(Math.random() * 5000),
      saved: Math.floor(Math.random() * 20),
      lastSyncedAt: new Date().toISOString(),
    };

    return this.prisma.socialPost.update({
      where: { id: post.id },
      data: {
        metrics: mockMetrics,
      },
    });
  }

  async createBulkPosts(
    organizationId: string,
    data: {
      integrationId: string;
      posts: {
        caption?: string;
        mediaAssetIds: string[];
        scheduledFor?: string;
        platforms?: any[];
      }[];
    },
  ) {
    if (!data.posts || data.posts.length === 0) {
      throw new BadRequestException('No posts provided for bulk schedule.');
    }

    const createdPosts = [];
    const baseDate = new Date();

    for (let i = 0; i < data.posts.length; i++) {
      const postData = data.posts[i];

      if (!postData.mediaAssetIds || postData.mediaAssetIds.length === 0) {
        continue;
      }

      let scheduledTime = postData.scheduledFor
        ? new Date(postData.scheduledFor)
        : null;
      if (!scheduledTime) {
        // Auto schedule distributing 1 post per day
        scheduledTime = new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000);
      }

      const post = await this.prisma.socialPost.create({
        data: {
          organizationId,
          integrationId: data.integrationId,
          caption: postData.caption,
          scheduledFor: scheduledTime,
          status: PostStatus.SCHEDULED,
          platforms: postData.platforms || ['INSTAGRAM'],
          mediaAssets: {
            create: postData.mediaAssetIds.map((mediaAssetId, index) => ({
              mediaAssetId,
              orderIndex: index,
            })),
          },
        },
        include: { mediaAssets: { include: { mediaAsset: true } } },
      });

      createdPosts.push(post);
    }

    return { count: createdPosts.length, posts: createdPosts };
  }
}
