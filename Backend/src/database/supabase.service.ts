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
}
