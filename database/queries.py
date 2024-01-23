INSERT_INTO_FILES = """
    INSERT OR IGNORE INTO files (path, content, contentlength, uploaded) 
    VALUES (:path, :content, :contentLength, :uploaded);
"""

INSERT_INTO_COMPARISONS = """
    INSERT INTO comparisons (file_1, file_2, result) VALUES (:file_1, :file_2, :result);
"""

SELECT_ALL_COMPARISONS = """
    SELECT * FROM comparisons ORDER BY time_stamp DESC;
"""

SELECT_FILE = """
    SELECT * FROM files WHERE path = :path;
"""