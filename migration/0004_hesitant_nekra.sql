ALTER TABLE "data_center" DROP CONSTRAINT "data_center_subnet_id_subnet_id_fk";
--> statement-breakpoint
ALTER TABLE "data_center" ADD CONSTRAINT "data_center_subnet_id_subnet_id_fk" FOREIGN KEY ("subnet_id") REFERENCES "public"."subnet"("id") ON DELETE no action ON UPDATE no action;