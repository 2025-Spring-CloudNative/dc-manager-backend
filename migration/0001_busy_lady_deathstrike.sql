ALTER TABLE "data_center" ALTER COLUMN "subnet_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "subnet" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "subnet" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "machine" ADD COLUMN "start_unit" integer NOT NULL;