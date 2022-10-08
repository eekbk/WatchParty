-- CreateEnum
CREATE TYPE "Party_Type" AS ENUM ('DM', 'PARTY');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ARCHIVED', 'UPCOMING', 'LIVE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CREATOR', 'ADMIN', 'NORMIE');

-- CreateEnum
CREATE TYPE "Message_Type" AS ENUM ('DM', 'COMMENT');

-- CreateEnum
CREATE TYPE "Relation_Type" AS ENUM ('BLOCK', 'FOLLOW');

-- CreateEnum
CREATE TYPE "Action_Type" AS ENUM ('START', 'STOP', 'MOVE', 'SKIP', 'SELECT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "follows" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relation" (
    "id" TEXT NOT NULL,
    "relator_id" TEXT NOT NULL,
    "relatee_id" TEXT NOT NULL,
    "type" "Relation_Type" NOT NULL,

    CONSTRAINT "Relation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "room_timestamp" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "party_id" TEXT NOT NULL,
    "type" "Message_Type" NOT NULL,
    "upvotes_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Party" (
    "id" TEXT NOT NULL,
    "playlist_id" TEXT NOT NULL,
    "is_private" BOOLEAN NOT NULL DEFAULT false,
    "is_recurring" BOOLEAN NOT NULL DEFAULT false,
    "date_time" TIMESTAMP(3) NOT NULL,
    "likes_count" INTEGER NOT NULL DEFAULT 0,
    "type" "Party_Type" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'UPCOMING',

    CONSTRAINT "Party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlist_Video" (
    "id" TEXT NOT NULL,
    "playlist_id" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,

    CONSTRAINT "Playlist_Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Party" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "party_id" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_Party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "party_id" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "type" "Action_Type" NOT NULL,
    "action_timestamp" TIMESTAMP(3) NOT NULL,
    "move_video_timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "party_id" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Upvote" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,

    CONSTRAINT "Upvote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_relator_id_fkey" FOREIGN KEY ("relator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_relatee_id_fkey" FOREIGN KEY ("relatee_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist_Video" ADD CONSTRAINT "Playlist_Video_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist_Video" ADD CONSTRAINT "Playlist_Video_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Party" ADD CONSTRAINT "User_Party_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Party" ADD CONSTRAINT "User_Party_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
