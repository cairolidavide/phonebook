CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
);

CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    phone_number VARCHAR(255),
    favorite BOOLEAN DEFAULT FALSE,
    group_id INTEGER REFERENCES groups(id)
);

