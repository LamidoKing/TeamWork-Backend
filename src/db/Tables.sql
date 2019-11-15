
-- Users Table

CREATE TABLE users
(
    user_id serial NOT NULL,
	rolenumber int NOT NULL,
	email character varying(50) NOT NULL,
	password character varying NOT NULL,
    firstName character varying(50),
    lastName character varying(50),
	gender character varying(50),
	jobRole character varying(50),
	department character varying(50),
    address character varying(50),
    PRIMARY KEY(user_id)
)

-- Articles Table
CREATE TABLE articles
(
    article_id serial NOT NULL,
	user_id int REFERENCES users(user_id),
    title character varying(50) NOT NULL,
    article text NOT NULL,
    created_on timestamp(4) with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (article_id)
)

-- Gifs Table
CREATE TABLE gifs
(
    gif_id serial NOT NULL,
	user_id int REFERENCES users(user_id),
	title character varying(50) NOT NULL,
    gif_url character varying NOT NULL,
    created_On timestamp(4) with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (gif_id)
)

-- Comments Table
CREATE TABLE comments
(
    comment_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id),
    comment text NOT NULL,
    gif_id INT REFERENCES gifs(gif_id),
    article_id INT REFERENCES articles(article_id),
    created_on timestamp(4) with time zone DEFAULT now() NOT NULL,

    -- constraint to make sure this comment appears in only one place
    CONSTRAINT comments_entity_check CHECK(
    (gif_id IS NOT NULL)::INT
    +
    (article_id IS NOT NULL)::INT
    = 1
    )
);

-- Flags Table
CREATE TABLE flags
(
    flag_id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users(user_id),
    flag boolean NOT NULL,
    created_on timestamp(4) with time zone DEFAULT now() NOT NULL,

    -- commentable sections
    gif_id INT REFERENCES gifs(gif_id),
    article_id INT REFERENCES articles(article_id),
    comment_id INT REFERENCES comments(comment_id)

        -- constraint to make sure this comment appears in only one place
        CONSTRAINT flags_entity_check CHECK(
            (comment_id IS NOT NULL)::INT
            +
            (gif_id IS NOT NULL)::INT
            +
            (article_id IS NOT NULL)::INT
            = 1
            )
);
