CREATE TABLE IF NOT EXISTS wTUserData (
    id SERIAL PRIMARY KEY,
    userId TEXT,
    measurement VARCHAR(20),
    currentWeightKg REAL,
    currentWeightLb REAL,
    goalWeightKg REAL,
    goalWeightLb REAL,
    lastEntry TIMESTAMPTZ,
    goalsReached INTEGER
);

CREATE TABLE IF NOT EXISTS wTWeightEntry (
    id SERIAL PRIMARY KEY,
    userId TEXT,
    weightEntryKg REAL,
    weightEntryLb REAL,
    timeOfEntry TIMESTAMPTZ
);