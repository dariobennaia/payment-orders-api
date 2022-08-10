/* eslint-disable no-console */
import { MongoHelper } from '@/infra/db';
import { main } from '@/main/config/app';
import env from '@/main/config/env';

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    main().listen(env.port);
  })
  .catch(console.error);
