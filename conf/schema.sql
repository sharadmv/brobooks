DROP TABLE IF EXISTS `action`;
CREATE TABLE `action` (
  `action_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `status` varchar(20) NOT NULL,
  `code` int(11) NOT NULL,
  `error` varchar(255) DEFAULT NULL,
  `service` varchar(20) NOT NULL,
  `start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `end` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `params` blob,
  PRIMARY KEY (`action_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `fill`;
CREATE TABLE `fill` (
  `fill_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `offer_id` int(11) unsigned NOT NULL,
  `loc` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`fill_id`),
  KEY `user_id` (`user_id`),
  KEY `offer_id` (`offer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `offer`;
CREATE TABLE `offer` (
  `offer_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `dept` varchar(30) NOT NULL,
  `course` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `loc` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `edition` varchar(20) NOT NULL,
  `fulfilled` tinyint(1) DEFAULT '0',
  `condition` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`offer_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fb_id` varchar(255) NOT NULL,
  `access_token` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `fb_id` (`fb_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

alter table offer add isbn varchar(30) default null after `condition`;
alter table offer add column `contact` varchar(255) default null after time;
alter table fill add column `contact` varchar(255) default null after time;
