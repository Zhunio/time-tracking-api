import { Module } from '@nestjs/common';
import { TimeTrackersController } from './time-trackers.controller';
import { TimeTrackersService } from './time-trackers.service';

@Module({
  controllers: [TimeTrackersController],
  providers: [TimeTrackersService],
})
export class TimeTrackersModule {}
