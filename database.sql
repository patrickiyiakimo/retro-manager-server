CREATE DATABASE retro_manager;

CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teams(
    team_id BIGSERIAL PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL
);

CREATE TABLE inviteteams(
    invite_id BIGSERIAL PRIMARY KEY,
    team_id INTEGER NOT NULL,
    invited_by INTEGER NOT NULL,
    invited_email VARCHAR(255) NOT NULL,
    invited_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    uuid UUID NOT NULL,
    FOREIGN KEY (team_id) REFERENCES teams (team_id),
    FOREIGN KEY (invited_by) REFERENCES users (user_id)
);

CREATE TABLE standups(
    standup_id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    team_id INTEGER REFERENCES teams(team_id),
    accomplished TEXT,
    not_well TEXT,
    working_on TEXT,
    improvement TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
