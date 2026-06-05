INSERT INTO episodes (season, episode_number, title, description)
VALUES (
	5, 
	2, 
	'Darmok', 
	'Picard is captured, then trapped on a planet with an alien captain who speaks a metaphorical language incompatible with the universal translator.
 	They must learn to communicate with each other before a deadly planetary beast overwhelms them.'
	),
	(
	4, 
	5, 
	'Remember Me', 
	'Following an anomaly in a warp bubble experiment, Dr. Crusher finds that crewmembers are beginning to disappear, while she is the only one who seems to notice.'
	),
	(
	7, 
	8, 
	'Attached', 
	'After escaping imprisonment on an alien world, Picard and Dr. Crusher find that their thoughts are connected by brain implants.'
	);

INSERT INTO characters (name)
VALUES 
	('Picard'),
	('Crusher')

INSERT INTO themes (name)
VALUES
	('Action'),
	('Problem Solving')

INSERT INTO episode_characters (episode_id, character_id)
VALUES 
(1, 1), -- darmok, picard
(2, 2), -- remember me, crusher
(3, 1), -- attached, picard
(3, 2); -- attached, crusher

INSERT INTO episode_themes (episode_id, theme_id)
VALUES
(1, 1), -- darmok, action
(1, 2), -- darmok, problem solving
(2, 1), -- remember me, action
(2, 2), -- remmber me, problem solving
(3, 2); -- attached, action



SELECT * FROM episodes

SELECT * FROM characters

SELECT * FROM themes

SELECT * FROM episode_characters

SELECT * FROM episode_themes

