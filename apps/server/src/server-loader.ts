import { serverLoader } from 'lupine.api/server-loader';
import path from 'path';

serverLoader.startApp(path.join(__dirname, './index.js'));
