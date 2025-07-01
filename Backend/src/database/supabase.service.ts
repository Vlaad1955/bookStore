import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private supabase: SupabaseClient;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const supabaseUrl = this.configService.get<string>('config.supabase.url');
    const supabaseKey = this.configService.get<string>('config.supabase.key');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'The Supabase URL and keys are required to initialize the client',
      );
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient {
    if (!this.supabase) {
      throw new Error('Supabase client is not initialized');
    }
    return this.supabase;
  }

  async removeFile(publicUrl: string, bucketName: string): Promise<void> {
    try {
      const url = new URL(publicUrl);
      const path = decodeURIComponent(
        url.pathname.replace(`/storage/v1/object/public/${bucketName}/`, ''),
      );

      const { error } = await this.supabase.storage
        .from(bucketName)
        .remove([path]);

      if (error) {
        console.warn(
          `⚠️ Failed to delete file from Supabase: ${error.message}`,
        );
      }
    } catch (err) {
      console.error('❌ Error removing file from Supabase:', err);
    }
  }
}
