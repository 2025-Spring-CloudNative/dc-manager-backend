ALTER TABLE "ip_address" ALTER COLUMN "machine_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "ip_address" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "ip_address" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ip_pool" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "ip_pool" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "rack" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "rack" ALTER COLUMN "updated_at" SET NOT NULL;