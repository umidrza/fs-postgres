CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES
('Dan Abramov', 'https://example.com/blog1', 'On let vs const', 5),
('Umid Rza', 'https://example.com/blog2', 'Second Blog', 2);