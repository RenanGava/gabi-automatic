-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "refreshToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expireIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "refreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refreshToken_userId_key" ON "refreshToken"("userId");
