// utils/logger.js

export const logInfo = (message) => {
  console.log(`INFO: ${message}`);
};

export const logError = (message) => {
  console.error(`ERROR: ${message}`);
};

export const logDebug = (message) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`DEBUG: ${message}`);
  }
};
