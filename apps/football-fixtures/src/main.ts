import { bootstrap } from '@app/common/utils/boostrap.util';
import { AppModule } from '@app/football-fixtures/app.module';

bootstrap(AppModule, { title: 'Football Fixtures API', server: '/ws-football-fixtures-api' });
