import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TimeTrackersController } from './time-trackers.controller';
import { TimeTrackersService } from './time-trackers.service';

@Module({
  imports: [AuthModule],
  controllers: [TimeTrackersController],
  providers: [TimeTrackersService],
})
export class TimeTrackersModule {}
