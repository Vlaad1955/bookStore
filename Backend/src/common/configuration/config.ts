import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('config', () => ({
  databaseUrl:
    process.env.DATABASE_URL ??
    'postgresql://postgres.ziqxesyaovpowhccmwiw:Wylf1312@aws-0-eu-central-1.pooler.supabase.com:6543/postgres',
  supabase: {
    url: process.env.SUPABASE_URL ?? 'https://ziqxesyaovpowhccmwiw.supabase.co',
    key:
      process.env.SUPABASE_KEY ??
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppcXhlc3lhb3Zwb3doY2Ntd2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MTA2MzksImV4cCI6MjA1NzE4NjYzOX0.bf_Pi9ZMeeXkfBnpQh4gQeq9hDbt-Rs9W9Y2M47HUjc',
    bucket: process.env.SUPABASE_BUCKET ?? 'user-covers',
  },
  redis: {
    userKey: process.env.REDIS_USER_KEY ?? 'user-token',
    userTime: Number(process.env.REDIS_USER_TIME ?? '3600'),
    refreshKey: process.env.REDIS_REFRESH_KEY ?? 'refresh-token',
    refreshTime: Number(process.env.REDIS_REFRESH_TIME ?? '604800'),
    blacklistKey: process.env.REDIS_BLACKLIST_KEY ?? 'black-token',
  },
  jwt: {
    strategyKey: process.env.JWT_STRATEGY_KEY ?? 'secret',
  },
}));
