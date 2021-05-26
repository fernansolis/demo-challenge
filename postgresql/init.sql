/* GENERATE TABLE */
CREATE TABLE "user"(
	"id" BIGSERIAL UNIQUE NOT NULL,
    "email" VARCHAR(100) NOT NULL,
	"first_name" VARCHAR(100) NOT NULL,
	"last_name" VARCHAR(100) NOT NULL,
	"company" VARCHAR(100) NOT NULL,
	"url" VARCHAR(100) NOT NULL,
    "text" VARCHAR(200) NULL,
	PRIMARY KEY(id)
);

CREATE INDEX ON "user"("id");

/* FUNCTION CREATE-INSERT USER */
CREATE OR REPLACE FUNCTION insert_user(_first_name VARCHAR(100),_last_name VARCHAR(100),_email VARCHAR(100), _company VARCHAR(100), _url VARCHAR(100), _text VARCHAR(200))
	RETURNS JSON
	LANGUAGE 'plpgsql' AS $$
	DECLARE
		message VARCHAR;
		data JSON DEFAULT NULL;
		status_code INT DEFAULT 400;
		success BOOLEAN DEFAULT false;
		_id INT;
	BEGIN
		IF EXISTS(SELECT * FROM "user" WHERE (email) = (_email)) THEN
			message := 'This user already exists.';
			RETURN JSON_BUILD_OBJECT('success',success,'message',message,'statusCode',status_code,'data',data);
		END IF;
		INSERT INTO "user"("first_name","last_name","email","company","url","text") VALUES(_first_name,_last_name,_email,_company,_url,_text) RETURNING id INTO _id;
		success := true;
		message := 'User has been added successfully';
		status_code := 201;
		data := JSON_BUILD_OBJECT('id',_id,'firstName',_first_name,'lastName',_last_name,'email',_email,'company',_company,'url',_url,'text',_text);
		RETURN JSON_BUILD_OBJECT('success',success,'message',message,'statusCode',status_code,'data',data);
	END;
$$;

/* FUNCTION GET USERS */
CREATE OR REPLACE FUNCTION get_all_users(int[])
	RETURNS JSON
	LANGUAGE 'plpgsql' AS $$
	BEGIN
		RETURN JSON_BUILD_OBJECT('success',true,'message','OK','statusCode',200,'data',
						(SELECT ARRAY_TO_JSON(ARRAY_AGG(dt))
	FROM (SELECT *
		 FROM "user" 
		 WHERE ( $1 IS NULL OR id = ANY  ($1))
		 ORDER BY id ASC) AS dt));
	END;
$$;

/* FUNCTION UPDATE USER */
CREATE OR REPLACE FUNCTION update_user(_id INT,_first_name VARCHAR(100),_last_name VARCHAR(100),
									   _email VARCHAR(100),_company VARCHAR(100),_url VARCHAR(100), _text VARCHAR(200))
	RETURNS JSON
	LANGUAGE 'plpgsql' AS $$
	DECLARE
		message VARCHAR;
		data JSON DEFAULT NULL;
		status_code INT DEFAULT 400;
		success BOOLEAN DEFAULT false;
		current_id INT;
	BEGIN
	IF EXISTS(SELECT * FROM "user" where id = _id) THEN
		IF NOT EXISTS(SELECT * FROM "user" where id  != _id AND email = _email) THEN
			UPDATE "user" set first_name = _first_name, last_name = _last_name, email = _email,
			company = _company, url = _url, text = _text WHERE id = _id RETURNING id INTO current_id;
			success := true;
			message := 'User has been updated successfully';
			status_code := 200;
			data := JSON_BUILD_OBJECT('id',current_id,'firstName',_first_name,'lastName',_last_name,'email',_email,'company',_company,'url',_url,'text',_text);
			RETURN JSON_BUILD_OBJECT('success',success,'message',message,'statusCode',status_code,'data',data);
		END IF;
		message := 'This email already exists';
		RETURN JSON_BUILD_OBJECT('success',success,'message',message,'statusCode',status_code,'data',data);
	END IF;
	status_code := 404;
	message := 'This user does not exist';
	RETURN JSON_BUILD_OBJECT('success',success,'message',message,'statusCode',status_code,'data',data);
	END;
$$;

/* FUNCTION DELETE USER */
CREATE OR REPLACE FUNCTION delete_user(_id INT)
	RETURNS JSON
	LANGUAGE 'plpgsql' AS $$
	DECLARE
		message VARCHAR;
		data JSON DEFAULT NULL;
		status_code INT DEFAULT 400;
		success BOOLEAN DEFAULT false;
	BEGIN
		IF EXISTS(SELECT * FROM "user" where id = _id) THEN
			DELETE FROM "user" where id = _id;
			success := true;
			message := 'User has been deleted successfully';
			status_code := 200;
			RETURN JSON_BUILD_OBJECT('success',success,'message',message,'statusCode',status_code,'data',NULL);
		END IF;
		status_code := 404;
		message := 'This user does not exist';
		RETURN JSON_BUILD_OBJECT('success',success,'message',message,'statusCode',status_code,'data',data);
	END;
$$;

/* TESTS -----------------------------------------*/
--select insert_user('Jesus', 'Rodriguez', 'jesus.rdz@gmail.com', 'PepsiCo', 'pepsico.com.mx', NULL);
--select get_all_users(ARRAY[1]);
--select get_all_users(null);
--select update_user(1, 'Fernan', 'Solis', 'fernan.solis@gmail.com', 'Cocacola', 'cocacola.com.mx', null);
--select delete_user(3);
