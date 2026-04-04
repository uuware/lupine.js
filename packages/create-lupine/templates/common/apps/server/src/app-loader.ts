import { appLoader } from 'lupine.api/app-loader';
import path from 'path';

appLoader.startApp(path.join(__dirname, './index.js'));
