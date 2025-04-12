CREATE TABLE "data_center" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "machine" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"unit" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"rack_id" integer NOT NULL,
	"status" varchar(255) NOT NULL,
	"service_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rack" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"height" integer NOT NULL,
	"tag" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"room_id" integer NOT NULL
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
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "machine" ADD CONSTRAINT "machine_rack_id_rack_id_fk" FOREIGN KEY ("rack_id") REFERENCES "public"."rack"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "machine" ADD CONSTRAINT "machine_service_id_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rack" ADD CONSTRAINT "rack_room_id_room_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."room"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "room" ADD CONSTRAINT "room_data_center_id_data_center_id_fk" FOREIGN KEY ("data_center_id") REFERENCES "public"."data_center"("id") ON DELETE no action ON UPDATE no action;