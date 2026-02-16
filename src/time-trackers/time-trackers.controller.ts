import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTimeTrackerDto } from './dto/create-time-tracker.dto';
import { UpdateTimeTrackerDto } from './dto/update-time-tracker.dto';
import { TimeTrackersService } from './time-trackers.service';

@Controller('time-trackers')
export class TimeTrackersController {
  constructor(private readonly timeTrackersService: TimeTrackersService) {}

  @Post()
  create(@Body() createTimeTrackerDto: CreateTimeTrackerDto) {
    return this.timeTrackersService.create(createTimeTrackerDto);
  }

  @Get()
  findAll() {
    return this.timeTrackersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeTrackersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeTrackerDto: UpdateTimeTrackerDto,
  ) {
    return this.timeTrackersService.update(id, updateTimeTrackerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeTrackersService.remove(id);
  }
}
