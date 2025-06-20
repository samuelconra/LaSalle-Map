DROP TABLE IF EXISTS Places CASCADE;
DROP TABLE IF EXISTS Roads CASCADE;
DROP TABLE IF EXISTS Zones CASCADE;

-- PLACES TABLES
CREATE TABLE Places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    careers TEXT[] NULL,
    building VARCHAR(255) NULL,
    description VARCHAR(255) NULL,
    classrooms INT NULL,
    floors INT NULL,
    coordinates GEOMETRY(POINT, 4326)
);

-- ROADS TABLE
CREATE TABLE Roads (
    id SERIAL PRIMARY KEY,
    source INT,
    target INT,
    cost INT,
    geom GEOMETRY(MULTILINESTRING, 4326),
    
    CONSTRAINT fk_place_source
        FOREIGN KEY (source)
            REFERENCES Places(id),
    
    CONSTRAINT fk_place_target
        FOREIGN KEY (target)
            REFERENCES Places(id)
);

-- ZONES TABLE
CREATE TABLE Zones (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NULL,
    geom GEOMETRY(MULTIPOLYGON, 4326)
);


GRANT SELECT ON Places TO geo_admin;
GRANT SELECT ON Roads TO geo_admin;
GRANT SELECT ON Zones TO geo_admin;