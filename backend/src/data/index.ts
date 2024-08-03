import {AppDataSource} from './data-source';

async function initialize() {
  try {
    console.log('Initializing Data Source...');
    await AppDataSource.initialize();

  } catch (error) {
    console.error('Error during Data Source initialization:', error);
  }
}

initialize();
