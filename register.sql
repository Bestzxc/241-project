-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql_db_840:3306
-- Generation Time: Apr 03, 2025 at 08:20 AM
-- Server version: 5.7.44
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) CHARACTER SET utf8 NOT NULL,
  `lastname` varchar(255) CHARACTER SET utf8 NOT NULL,
  `tel` varchar(10) CHARACTER SET utf8mb4 NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `type` enum('รับ-ส่งถึงที่','รับเอง') CHARACTER SET utf8 NOT NULL,
  `address` text CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`id`, `firstname`, `lastname`, `tel`, `email`, `type`, `address`) VALUES
(1, 'โกโก้', 'สีเข้ม', '0895554444', 'red@gmail.com', 'รับ-ส่งถึงที่', 'ระยอง'),
(2, 'สมหญิง', 'ยิ่งใหญ่', '0623125588', 'cocoa@gmail.com', 'รับเอง', ''),
(4, 'โย่งย่าง', 'ยิ่งยาว', '0659854789', 'dodo@gmail.com', 'รับ-ส่งถึงที่', 'กรุงเทพ'),
(6, 'สิงกิ่ง', 'หมิงหมิง', '0895647410', 'tano@gmail.com', 'รับ-ส่งถึงที่', 'นครปฐม'),
(7, 'กุ้งกิ้ง', 'กลางกลาง', '0612223548', 'cat@gmail.com', 'รับเอง', ''),
(8, 'อย่างยิ่ง', 'ยุ่งย่าง', '0645897412', 'koko@hotmail.com', 'รับเอง', ''),
(10, 'ยำยำ', 'เเซ่บ', '0623127415', 'toto@hotmail.com', 'รับ-ส่งถึงที่', 'กรุงเทพ'),
(11, 'โลล่า', 'ป่าปิง', '0632587532', 'hahala@hotmail.com', 'รับ-ส่งถึงที่', 'ระยอง'),
(12, 'ปาป้า', 'กรองลัง', '0658741236', 'papa@hotmail.com', 'รับ-ส่งถึงที่', 'ยะลา'),
(13, 'สมชิง', 'ช้างน้อย', '0639851987', 'somch@hotmail.com', 'รับเอง', ''),
(14, 'สมชาย', 'ใหม่ยำ', '0647851234', 'boybot@hotmail.com', 'รับ-ส่งถึงที่', 'เชียงใหม่'),
(15, 'กำลัง', 'เเรงดี', '0844645829', 'mada@gmail.com', 'รับ-ส่งถึงที่', 'เชียงราย'),
(17, 'สิบเจ็ด', 'เป็ดน้ำ', '0875691234', 'seven@outlook.com', 'รับ-ส่งถึงที่', 'กรุงเทพ'),
(18, 'ป่ายปีน', 'ปีนป่าย', '096478123', 'hiking@gmail.com', 'รับเอง', ''),
(19, 'ยำยำ', 'ช้างน้อย', '0678941238', 'yumyum@hotmail.com', 'รับ-ส่งถึงที่', 'นนทบุรี'),
(21, 'โคโน', '78', '0315589746', 'koonoo@gmail.com', 'รับ-ส่งถึงที่', 'ยะลา'),
(22, 'โอเค', 'โกก้า', '0638479512', 'letgo@gmail.com', 'รับเอง', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
