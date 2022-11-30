-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 30 Lis 2022, 22:15
-- Wersja serwera: 5.7.39-0ubuntu0.18.04.2
-- Wersja PHP: 7.2.24-0ubuntu0.18.04.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `CRM`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `clients`
--

CREATE TABLE `clients` (
  `ID` int(11) NOT NULL,
  `Name` varchar(300) COLLATE utf8_polish_ci NOT NULL,
  `DescName` varchar(300) COLLATE utf8_polish_ci DEFAULT NULL,
  `Contacs` json DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `events`
--

CREATE TABLE `events` (
  `ID` int(11) NOT NULL,
  `State` int(11) NOT NULL DEFAULT '1',
  `ClientID` int(11) NOT NULL,
  `title` varchar(300) COLLATE utf8_polish_ci NOT NULL,
  `description` text COLLATE utf8_polish_ci,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ETA` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `events_state`
--

CREATE TABLE `events_state` (
  `ID` int(11) NOT NULL,
  `EventID` int(11) DEFAULT NULL,
  `Type` int(11) NOT NULL,
  `Title` varchar(300) COLLATE utf8_polish_ci DEFAULT NULL,
  `EComment` varchar(500) COLLATE utf8_polish_ci DEFAULT NULL,
  `Added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Sessions`
--

CREATE TABLE `Sessions` (
  `User_ID` int(11) NOT NULL,
  `Ses_ID` text COLLATE utf8_polish_ci NOT NULL,
  `User_IP` varchar(16) COLLATE utf8_polish_ci NOT NULL,
  `User_Device` text COLLATE utf8_polish_ci NOT NULL,
  `Auto_login` tinyint(1) NOT NULL DEFAULT '0',
  `Expires` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `Sessions`
--

INSERT INTO `Sessions` (`User_ID`, `Ses_ID`, `User_IP`, `User_Device`, `Auto_login`, `Expires`, `Created`) VALUES
(1, 'c4ca4238a0b923820dcc509a6f75849b', '10.0.2.2', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:107.0) Gecko/20100101 Firefox/107.0', 0, '2022-12-01 22:01:45', '2022-11-30 17:24:38');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Users`
--

CREATE TABLE `Users` (
  `ID` int(11) NOT NULL,
  `Login` text COLLATE utf8_polish_ci NOT NULL,
  `Email` text COLLATE utf8_polish_ci NOT NULL,
  `Password` text COLLATE utf8_polish_ci NOT NULL,
  `Rank_type` int(11) NOT NULL DEFAULT '1',
  `Created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `Users`
--

INSERT INTO `Users` (`ID`, `Login`, `Email`, `Password`, `Rank_type`, `Created`) VALUES
(1, 'root', '', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 2, '2022-11-30 16:26:14');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ClientID` (`ClientID`);

--
-- Indeksy dla tabeli `events_state`
--
ALTER TABLE `events_state`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `EventID` (`EventID`);

--
-- Indeksy dla tabeli `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `clients`
--
ALTER TABLE `clients`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `events`
--
ALTER TABLE `events`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `events_state`
--
ALTER TABLE `events_state`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `Users`
--
ALTER TABLE `Users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`ClientID`) REFERENCES `clients` (`ID`);

--
-- Ograniczenia dla tabeli `events_state`
--
ALTER TABLE `events_state`
  ADD CONSTRAINT `events_state_ibfk_1` FOREIGN KEY (`EventID`) REFERENCES `events` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
