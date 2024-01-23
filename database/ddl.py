CREATE_TABLE_FILE = """
    CREATE TABLE IF NOT EXISTS files (
        path VARCHAR(255) PRIMARY KEY,
        content TEXT NOT NULL,
        contentlength INTEGER NOT NULL,
        uploaded TIMESTAMP NOT NULL
    );
"""

CREATE_TABLE_COMPARISON = """
    CREATE TABLE IF NOT EXISTS comparisons (
        file_1 REFERENCES files(name),
        file_2 REFERENCES files(name),
        result TEXT NOT NULL,
        time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
"""