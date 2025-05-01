CREATE TYPE "public"."ip_address_status" AS ENUM('created', 'allocated', 'released');--> statement-breakpoint
CREATE TYPE "public"."machine_status" AS ENUM('created', 'active', 'inactive', 'removed');--> statement-breakpoint
ALTER TABLE "ip_address" ALTER COLUMN "status" SET DATA TYPE "public"."ip_address_status" USING status::"ip_address_status";--> statement-breakpoint
ALTER TABLE "machine" ALTER COLUMN "status" SET DATA TYPE "public"."machine_status" USING status::"machine_status";