// import * as envServer from '@/config/envServer';
import { BOT_TOKEN, WEBHOOK_HOST } from '@/config/envServer';

class ServerStartUp {
  // private static envServer: typeof envServer = envServer;
  private static instance: ServerStartUp;
  private started = false;

  private constructor() {
    // console.log('ServerStartUp process initialized.');
    this.start();
  }

  public static getInstance(): ServerStartUp {
    if (!ServerStartUp.instance) {
      ServerStartUp.instance = new ServerStartUp();
    }
    return ServerStartUp.instance;
  }

  private start() {
    if (!this.started) {
      this.started = true;
      // eslint-disable-next-line no-console
      console.log('[src/app/serverStartUp] ServerStartUp process started.', {
        BOT_TOKEN,
        WEBHOOK_HOST,
      });
      // Start recurring jobs or other server-side tasks
    }
  }
}

export const serverStartUp = ServerStartUp.getInstance();
