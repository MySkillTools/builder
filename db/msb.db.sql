BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "category" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT,
	"color"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "skill" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	INTEGER,
	"category"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("category") REFERENCES "category"("id")
);
INSERT INTO "category" VALUES (1,'Web Development','#ff7f50');
INSERT INTO "category" VALUES (2,'Backend Development','#6495ed');
INSERT INTO "category" VALUES (3,'Database Management','#3cb371');
INSERT INTO "category" VALUES (4,'Mobile Development','#f08080');
INSERT INTO "category" VALUES (5,'Cloud and DevOps','#4682b4');
INSERT INTO "category" VALUES (6,'Machine Learning/AI','#6a5acd');
INSERT INTO "category" VALUES (7,'Design and UI/UX','#ffb6c1');
INSERT INTO "skill" VALUES (1,'HTML',1);
INSERT INTO "skill" VALUES (2,'CSS',1);
INSERT INTO "skill" VALUES (3,'JavaScript',1);
INSERT INTO "skill" VALUES (4,'React',1);
INSERT INTO "skill" VALUES (5,'Node.js',1);
INSERT INTO "skill" VALUES (6,'Express.js',1);
INSERT INTO "skill" VALUES (7,'Angular',1);
INSERT INTO "skill" VALUES (8,'Vue.js',1);
INSERT INTO "skill" VALUES (9,'TypeScript',1);
INSERT INTO "skill" VALUES (10,'GraphQL',1);
INSERT INTO "skill" VALUES (11,'REST API',1);
INSERT INTO "skill" VALUES (12,'Python',2);
INSERT INTO "skill" VALUES (13,'Django',2);
INSERT INTO "skill" VALUES (14,'Flask',2);
INSERT INTO "skill" VALUES (15,'Java',2);
INSERT INTO "skill" VALUES (16,'Spring Boot',2);
INSERT INTO "skill" VALUES (17,'C#',2);
INSERT INTO "skill" VALUES (18,'.NET',2);
INSERT INTO "skill" VALUES (19,'Go',2);
INSERT INTO "skill" VALUES (20,'Rust',2);
INSERT INTO "skill" VALUES (21,'Scala',2);
INSERT INTO "skill" VALUES (22,'SQL',3);
INSERT INTO "skill" VALUES (23,'MongoDB',3);
INSERT INTO "skill" VALUES (24,'Big Data',3);
INSERT INTO "skill" VALUES (25,'Hadoop',3);
INSERT INTO "skill" VALUES (26,'Spark',3);
INSERT INTO "skill" VALUES (27,'iOS Development',4);
INSERT INTO "skill" VALUES (28,'Android Development',4);
INSERT INTO "skill" VALUES (29,'React Native',4);
INSERT INTO "skill" VALUES (30,'Swift',4);
INSERT INTO "skill" VALUES (31,'Kotlin',4);
INSERT INTO "skill" VALUES (32,'Flutter',4);
INSERT INTO "skill" VALUES (33,'Docker',5);
INSERT INTO "skill" VALUES (34,'Kubernetes',5);
INSERT INTO "skill" VALUES (35,'AWS',5);
INSERT INTO "skill" VALUES (36,'Azure',5);
INSERT INTO "skill" VALUES (37,'Google Cloud',5);
INSERT INTO "skill" VALUES (38,'Machine Learning',6);
INSERT INTO "skill" VALUES (39,'TensorFlow',6);
INSERT INTO "skill" VALUES (40,'PyTorch',6);
INSERT INTO "skill" VALUES (41,'OpenCV',6);
INSERT INTO "skill" VALUES (42,'Data Science',6);
INSERT INTO "skill" VALUES (43,'UI/UX Design',7);
INSERT INTO "skill" VALUES (44,'Figma',7);
INSERT INTO "skill" VALUES (45,'Sketch',7);
INSERT INTO "skill" VALUES (46,'Adobe XD',7);
INSERT INTO "skill" VALUES (47,'Photoshop',7);
INSERT INTO "skill" VALUES (48,'Illustrator',7);
INSERT INTO "skill" VALUES (49,'SEO',7);
COMMIT;
