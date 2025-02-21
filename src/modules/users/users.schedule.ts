import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from './users.service';

type CronJobName = 'userCleanup' | 'userMetrics';

@Injectable()
export class UsersSchedule {
  private readonly logger = new Logger(UsersSchedule.name);
  private cronStatus = {
    userCleanup: true,
    userMetrics: true
  };
  
  constructor(private readonly usersService: UsersService) {}

  toggleCronJob(jobName: CronJobName, enable: boolean) {
    this.cronStatus[jobName] = enable;
    this.logger.log(`${jobName} ${enable ? 'enabled' : 'disabled'}`);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'userCleanup'
  })
  async handleDailyUserCleanup() {
    if (!this.cronStatus.userCleanup) {
      this.logger.warn('User cleanup is disabled');
      return;
    }
    this.logger.log('Running daily user cleanup');
    // Add your cleanup logic here
  }

  @Cron(CronExpression.EVERY_SECOND, {
    name: 'userMetrics'
  })
  async handleUserMetricsUpdate() {
    if (!this.cronStatus.userMetrics) {
      this.logger.warn('Metrics update is disabled');
      return;
    }
    this.logger.log('Updating user metrics');
    // Add your metrics update logic here
  }

} 