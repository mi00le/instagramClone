CREATE TABLE `Users` (
    `ID` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    `Email` TEXT NOT NULL UNIQUE,
    `Password` TEXT NOT NULL,
    `Salt` TEXT NOT NULL,
    `DisplayName` TEXT NOT NULL UNIQUE,
    `Token` TEXT
);

CREATE TABLE `Posts` (
    `ID` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    `AuthorID` INTEGER NOT NULL,
    `AuthorName` TEXT,
    `Url` TEXT NOT NULL,
    `CreatedAt` DATE NOT NULL,
    `Title` TEXT,
    `Description` TEXT,
    `Tags` TEXT,
    FOREIGN KEY(`AuthorID`) REFERENCES Users(ID)
);