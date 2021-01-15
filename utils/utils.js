import moment from 'moment';

/**
 * Utils module
 * @module
 */

/**
 * Generating TimeStamp
 * @function
 * @returns {string} TimeStamp in format D-MMM-h_mm_ss
 */
export const getTimeStamp = () => {
  return moment().format('D-MMM-h_mm_ss');
}

/**
 * Checking if tests are running locally
 * @function
 * @returns {boolean} Whether tests are running locally
 */
export const isRunningLocally = () => { return testEnv === 'local'};