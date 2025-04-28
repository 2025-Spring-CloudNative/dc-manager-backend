ALTER TABLE "rack" DROP CONSTRAINT "rack_service_id_service_id_fk";
--> statement-breakpoint
ALTER TABLE "service" DROP CONSTRAINT "service_pool_id_ip_pool_id_fk";
--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "pool_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "rack" ADD CONSTRAINT "rack_service_id_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service" ADD CONSTRAINT "service_pool_id_ip_pool_id_fk" FOREIGN KEY ("pool_id") REFERENCES "public"."ip_pool"("id") ON DELETE set null ON UPDATE no action;