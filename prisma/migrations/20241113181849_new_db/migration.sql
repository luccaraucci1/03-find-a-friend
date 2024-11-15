-- CreateEnum
CREATE TYPE "Age" AS ENUM ('puppy', 'adult', 'elder');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('small', 'medium', 'big');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "Independency_Level" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('small', 'big');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" "Age" NOT NULL,
    "size" "Size" NOT NULL,
    "energy" "Energy" NOT NULL,
    "independency_level" "Independency_Level" NOT NULL,
    "environment" "Environment" NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
