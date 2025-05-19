ALTER TABLE "data_center" DROP CONSTRAINT "data_center_subnet_id_subnet_id_fk";
--> statement-breakpoint
ALTER TABLE "data_center" ADD CONSTRAINT "data_center_subnet_id_subnet_id_fk" FOREIGN KEY ("subnet_id") REFERENCES "public"."subnet"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");