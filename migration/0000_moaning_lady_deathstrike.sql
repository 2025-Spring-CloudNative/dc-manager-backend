CREATE TYPE "public"."ip_address_status" AS ENUM('created', 'allocated', 'released');--> statement-breakpoint
CREATE TYPE "public"."machine_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "data_center" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"subnet_id" integer,
	CONSTRAINT "data_center_subnet_id_unique" UNIQUE("subnet_id")
);
--> statement-breakpoint
CREATE TABLE "ip_address" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" varchar(15) NOT NULL,
	"status" "ip_address_status" NOT NULL,
	"pool_id" integer NOT NULL,
	"machine_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"allocated_at" timestamp,
	"released_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "ip_pool" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"cidr" varchar(18) NOT NULL,
	"subnet_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "machine" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"start_unit" integer NOT NULL,
	"unit" integer NOT NULL,
	"mac_address" varchar(17) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"rack_id" integer NOT NULL,
	"status" "machine_status" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rack" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"height" integer NOT NULL,
	"tag" varchar(255) NOT NULL,
	"room_id" integer NOT NULL,
	"service_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "refresh_token" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"token" varchar(512) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expired_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "room" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"unit" integer NOT NULL,
	"data_center_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"pool_id" integer
);
--> statement-breakpoint
CREATE TABLE "subnet" (
	"id" serial PRIMARY KEY NOT NULL,
	"cidr" varchar(18) NOT NULL,
	"netmask" varchar(15) NOT NULL,
	"gateway" varchar(15) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" "user_role" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "data_center" ADD CONSTRAINT "data_center_subnet_id_subnet_id_fk" FOREIGN KEY ("subnet_id") REFERENCES "public"."subnet"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ip_address" ADD CONSTRAINT "ip_address_pool_id_ip_pool_id_fk" FOREIGN KEY ("pool_id") REFERENCES "public"."ip_pool"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ip_address" ADD CONSTRAINT "ip_address_machine_id_machine_id_fk" FOREIGN KEY ("machine_id") REFERENCES "public"."machine"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ip_pool" ADD CONSTRAINT "ip_pool_subnet_id_subnet_id_fk" FOREIGN KEY ("subnet_id") REFERENCES "public"."subnet"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "machine" ADD CONSTRAINT "machine_rack_id_rack_id_fk" FOREIGN KEY ("rack_id") REFERENCES "public"."rack"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rack" ADD CONSTRAINT "rack_room_id_room_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."room"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rack" ADD CONSTRAINT "rack_service_id_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "room" ADD CONSTRAINT "room_data_center_id_data_center_id_fk" FOREIGN KEY ("data_center_id") REFERENCES "public"."data_center"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service" ADD CONSTRAINT "service_pool_id_ip_pool_id_fk" FOREIGN KEY ("pool_id") REFERENCES "public"."ip_pool"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "token_idx" ON "refresh_token" USING btree ("token");