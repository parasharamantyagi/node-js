-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2021 at 08:43 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api`
--

-- --------------------------------------------------------

--
-- Table structure for table `agents`
--

CREATE TABLE `agents` (
  `id` int(11) NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar_icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `identity_card` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `social_security_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cv` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iban` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `agent_type` int(11) NOT NULL DEFAULT 0,
  `cnaps_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `home_address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `work_location_address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_vehicle` tinyint(4) NOT NULL,
  `is_subcontractor` tinyint(4) NOT NULL,
  `supplier_company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `terms_conditions` tinyint(11) NOT NULL,
  `work_location_latitude` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `work_location_longitude` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `current_location_lat_long` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(4) NOT NULL COMMENT '0 => Pending, 1 => Verified, 2 => Rejected',
  `available` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0=>Not Available, 1=>Available, 2=>On Mission',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `g-recaptcha-response` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `agents`
--

INSERT INTO `agents` (`id`, `user_id`, `first_name`, `last_name`, `phone`, `username`, `avatar_icon`, `image`, `identity_card`, `social_security_number`, `cv`, `iban`, `agent_type`, `cnaps_number`, `home_address`, `work_location_address`, `is_vehicle`, `is_subcontractor`, `supplier_company`, `terms_conditions`, `work_location_latitude`, `work_location_longitude`, `current_location_lat_long`, `status`, `available`, `created_at`, `updated_at`, `g-recaptcha-response`) VALUES
(1, '3', 'antoine', 'agent', '+330623160435', 'agent32238', 'dummy_avatar.jpg', '', 'agent32238_id_1595343638.PNG', 'agent32238_ssn_1595343638.png', 'agent32238_cv_1595343638.jpeg', 'FR76 1820 6000 6744 0188 8000 133', 0, 'FR010101', 'rue de paris versailles', 'Avenue de Paris, Versailles, France', 1, 1, 'MESNIL GARDIENNAGE', 2, '48.79931149999999', '2.1424114', '48.831013, 2.0847955', 3, 1, '2020-07-21 15:00:38', '2020-09-23 07:50:06', NULL),
(2, '2', 'adrein', 'schacht', '+330617300345', 'agent59294', 'dummy_avatar.jpg', '', 'agent59294_id_1596722122.jpeg', 'agent59294_ssn_1596722122.pdf', 'agent59294_cv_1596722122.pdf', 'fr79000787878878', 0, 'CAR-091-2022-03-15-20170246610', '10 rue edouard branly 78700 conflans', '10 Rue Edouard Branly, 78700 Conflans-Sainte-Honorine, France', 1, 0, NULL, 2, '48.9957065', '2.1129103', ', ', 3, 1, '2020-08-06 13:55:22', '2020-09-23 07:49:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_stripe_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_type` int(11) NOT NULL,
  `home_address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `terms_conditions` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0 => Pending, 1 => Verified, 2 => Rejected',
  `company_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `add_bank` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g-recaptcha-response` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `user_id`, `customer_stripe_id`, `first_name`, `last_name`, `phone`, `image`, `customer_type`, `home_address`, `terms_conditions`, `status`, `company_name`, `add_bank`, `g-recaptcha-response`, `updated_at`, `created_at`) VALUES
(1, '1', NULL, 'aman', 'tyagi', '789456123', NULL, 4, 'mohali 5 phase', 0, 1, NULL, NULL, NULL, '2020-12-29 20:31:54', '2020-12-29 20:31:54'),
(3, '5', NULL, 'aman', 'tyagi', '789456123', NULL, 4, 'mohali 5 phase', 0, 1, NULL, NULL, NULL, '2021-01-06 05:10:28', '2021-01-06 05:10:28');

-- --------------------------------------------------------

--
-- Table structure for table `missions`
--

CREATE TABLE `missions` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `agent_id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `longitude` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date_time` datetime DEFAULT NULL,
  `agent_type` int(11) NOT NULL DEFAULT 0,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quick_book` tinyint(4) NOT NULL DEFAULT 0,
  `vehicle_required` int(11) NOT NULL,
  `total_hours` int(11) NOT NULL DEFAULT 0,
  `amount` double(8,2) NOT NULL DEFAULT 0.00,
  `vat` double(8,2) NOT NULL,
  `payment_status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0=>Not Paid, 1=>Paid',
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `step` int(11) NOT NULL DEFAULT 0,
  `parent_id` int(11) NOT NULL,
  `assigned_at` datetime DEFAULT NULL,
  `started_at` timestamp NULL DEFAULT NULL,
  `ended_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `intervention` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `repetitive_mission` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mission_finish_time` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time_intervel` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoice_status` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `missions`
--

INSERT INTO `missions` (`id`, `customer_id`, `agent_id`, `title`, `location`, `latitude`, `longitude`, `start_date_time`, `agent_type`, `description`, `quick_book`, `vehicle_required`, `total_hours`, `amount`, `vat`, `payment_status`, `status`, `step`, `parent_id`, `assigned_at`, `started_at`, `ended_at`, `created_at`, `updated_at`, `intervention`, `repetitive_mission`, `mission_finish_time`, `time_intervel`, `invoice_status`) VALUES
(1, 2, 49, 'aman', 'admin', NULL, NULL, '0000-00-00 00:00:00', 0, 'world is best', 1, 0, 0, 0.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Guard service', NULL, NULL, NULL, 0),
(2, 2, 0, 'aman', 'admin', NULL, NULL, NULL, 0, NULL, 0, 0, 0, 0.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(3, 2, 0, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0, 0, 0, 0.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(4, 2, 4, 'aman', 'admin', '48.745193', '2.401373', '2020-11-27 12:34:27', 0, 'world is best', 1, 0, 1, 0.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Guard service', NULL, NULL, NULL, 0),
(5, 2, 0, 'aman', 'admin', '48.745193', '2.401373', '2020-11-27 12:34:27', 0, 'world is best', 1, 0, 1, 0.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Guard service', NULL, NULL, NULL, 0),
(6, 2, 0, 'aman', 'admin', '48.745193', '2.401373', '2020-11-27 12:34:27', 0, 'world is best', 1, 0, 1, 0.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Guard service', NULL, NULL, NULL, 0),
(7, 2, 0, 'aman', 'admin', '48.745193', '2.401373', '2020-11-27 12:34:27', 0, 'world is best', 1, 0, 1, 0.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Guard service', NULL, NULL, NULL, 0),
(8, 2, 0, 'aman', 'admin', '48.745193', '2.401373', '2020-11-27 12:34:27', 0, 'world is best', 1, 0, 1, 0.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Guard service', NULL, NULL, NULL, 0),
(9, 2, 0, 'aman', 'admin', '48.745193', '2.401373', '2020-11-27 12:34:27', 0, 'world is best', 1, 0, 1, 0.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Guard service', NULL, NULL, NULL, 0),
(10, 2, 0, 'aman', 'admin', '48.745193', '2.401373', '2020-11-27 12:34:27', 0, 'world is best', 1, 0, 1, 0.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Guard service', NULL, NULL, NULL, 0),
(11, 2, 0, 'aman', 'admin', '48.745193', '2.401373', '2020-11-27 12:34:27', 0, 'world is best', 1, 0, 1, 0.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Guard service', NULL, NULL, NULL, 0),
(12, 2, 0, 'aman', 'admin', '48.745193', '2.401373', '2020-11-27 12:34:27', 0, 'world is best', 1, 0, 1, 0.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Guard service', NULL, NULL, NULL, 0),
(13, 2, 0, 'aman', 'admin', '48.745193', '2.401373', '2020-11-27 12:34:27', 0, 'world is best', 1, 0, 1, 0.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Guard service', NULL, NULL, NULL, 0),
(14, 2, 0, 'aman', 'admin', '48.745193', '2.401373', '2020-11-27 12:34:27', 0, 'world is best', 1, 0, 1, 0.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Guard service', NULL, NULL, NULL, 0),
(15, 2, 0, 'aman', 'admin', '48.745193', '2.401373', '2020-11-27 12:34:27', 0, 'world is best', 1, 0, 1, 0.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Guard service', NULL, NULL, NULL, 0),
(16, 2, 49, 'aman', 'admin', '48.745193', '2.401373', '2020-11-27 12:34:27', 1, 'world is best', 1, 0, 1, 100.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Guard service', NULL, NULL, NULL, 0),
(17, 2, 0, '4-jan', 'admin', '48.745193', '2.401373', '2020-11-27 12:34:27', 1, 'world is best', 1, 3, 1, 100.00, 0.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 'Guard service', NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role_id` int(191) NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `email`, `password`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 1, 'aman@gmail.com', 'bc9a2aa1aaf47fdff24db9798f188a61', NULL, NULL, '2020-12-29 19:48:03', '2020-12-29 19:48:03'),
(2, 2, 'amanqw@gmail.com', 'bc9a2aa1aaf47fdff24db9798f188a61', NULL, NULL, '2020-12-29 19:55:01', '2020-12-29 19:55:01'),
(3, 2, 'amanq1@gmail.com', 'bc9a2aa1aaf47fdff24db9798f188a61', NULL, NULL, '2020-12-29 19:55:11', '2020-12-29 19:55:11'),
(5, 1, 'amanq11@gmail.com', 'bc9a2aa1aaf47fdff24db9798f188a61', NULL, NULL, '2021-01-06 05:09:28', '2021-01-06 05:09:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `missions`
--
ALTER TABLE `missions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agents`
--
ALTER TABLE `agents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
