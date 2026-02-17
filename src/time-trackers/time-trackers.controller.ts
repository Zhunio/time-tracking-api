import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { MessageResponseDto } from '../common/dto/message-response.dto';
import { CreateTimeTrackerDto } from './dto/create-time-tracker.dto';
import { TimeTrackerResponseDto } from './dto/time-tracker-response.dto';
import { UpdateTimeTrackerDto } from './dto/update-time-tracker.dto';
import { TimeTrackersService } from './time-trackers.service';

@ApiTags('Time Trackers')
@ApiBearerAuth()
@Controller('time-trackers')
export class TimeTrackersController {
  constructor(private readonly timeTrackersService: TimeTrackersService) {}

  @Post()
  @ApiOperation({ summary: 'Create time tracker' })
  @ApiBody({ type: CreateTimeTrackerDto })
  @ApiCreatedResponse({
    description: 'Time tracker created',
    type: TimeTrackerResponseDto,
  })
  create(@Body() createTimeTrackerDto: CreateTimeTrackerDto) {
    return this.timeTrackersService.create(createTimeTrackerDto);
  }

  @Get()
  @ApiOperation({ summary: 'List time trackers' })
  @ApiOkResponse({
    description: 'Time trackers list',
    type: TimeTrackerResponseDto,
    isArray: true,
  })
  findAll() {
    return this.timeTrackersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get time tracker by id' })
  @ApiParam({ name: 'id', description: 'Time tracker id' })
  @ApiOkResponse({
    description: 'Time tracker details',
    type: TimeTrackerResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Time tracker not found' })
  findOne(@Param('id') id: string) {
    return this.timeTrackersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update time tracker by id' })
  @ApiParam({ name: 'id', description: 'Time tracker id' })
  @ApiBody({ type: UpdateTimeTrackerDto })
  @ApiOkResponse({
    description: 'Updated time tracker',
    type: TimeTrackerResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Time tracker not found' })
  update(
    @Param('id') id: string,
    @Body() updateTimeTrackerDto: UpdateTimeTrackerDto,
  ) {
    return this.timeTrackersService.update(id, updateTimeTrackerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete time tracker by id' })
  @ApiParam({ name: 'id', description: 'Time tracker id' })
  @ApiOkResponse({ description: 'Delete confirmation', type: MessageResponseDto })
  @ApiNotFoundResponse({ description: 'Time tracker not found' })
  remove(@Param('id') id: string) {
    return this.timeTrackersService.remove(id);
  }
}
