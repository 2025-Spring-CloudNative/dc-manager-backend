ALTER TABLE "ip_address" DROP CONSTRAINT "ip_address_pool_id_ip_pool_id_fk";
--> statement-breakpoint
ALTER TABLE "ip_address" ADD CONSTRAINT "ip_address_pool_id_ip_pool_id_fk" FOREIGN KEY ("pool_id") REFERENCES "public"."ip_pool"("id") ON DELETE cascade ON UPDATE no action;