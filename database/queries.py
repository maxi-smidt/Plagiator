INSERT_INTO_FILES = """
    INSERT OR IGNORE INTO files (name, file) VALUES (:name, :file);
"""

INSERT_INTO_COMPARISONS = """
    INSERT INTO comparisons (file_1, file_2, result) VALUES (:file_1, :file_2, :result);
"""

SELECT_ALL_COMPARISONS = """
    SELECT * FROM comparisons ORDER BY time_stamp DESC;
"""