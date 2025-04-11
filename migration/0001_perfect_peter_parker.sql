CREATE TABLE "room" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"unit" integer NOT NULL,
	"dataCenterId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "room" ADD CONSTRAINT "room_dataCenterId_data_center_id_fk" FOREIGN KEY ("dataCenterId") REFERENCES "public"."data_center"("id") ON DELETE no action ON UPDATE no action;