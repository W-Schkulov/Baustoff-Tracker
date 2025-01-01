import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Die Umgebungsvariable MONGODB_URI ist nicht definiert. Bitte definiere sie in der .env.local-Datei."
  );
}

let cachedConnection = global.mongoose?.conn || null;
let cachedConnectionPromise = global.mongoose?.promise || null;

const databaseConnect = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!cachedConnectionPromise) {
    const databaseConnectionOptions = {
      bufferCommands: false,
    };

    cachedConnectionPromise = mongoose
      .connect(MONGODB_URI, databaseConnectionOptions)
      .then((mongooseInstance) => mongooseInstance);
  }

  cachedConnection = await cachedConnectionPromise;
  return cachedConnection;
};

export default databaseConnect;
